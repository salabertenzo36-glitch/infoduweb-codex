/* CODEX SSG — vraies URLs, meta par fiche, sitemap. node build.mjs → dist/ */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, "dist");
globalThis.window = {};
await import("./data.js");
await import("./legal.js");
const { CATS, ALL } = globalThis.window;
const LEGAL = globalThis.window.LEGAL;

const SITE = "https://infoduweb-codex.pages.dev";
const fmt = n => n.toLocaleString("fr-FR");
const byId = id => ALL.find(a => a.id === id);
const TOTAL = ALL.length;
const STATS = {
  pages: TOTAL,
  langages: ALL.filter(a => a.cat === "langage").length,
  menaces: ALL.filter(a => a.cat === "cyber" && a.danger >= 2).length,
  extraits: ALL.reduce((s, a) => s + a.sections.filter(x => x.code).length, 0)
};
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const escA = s => esc(s).replace(/"/g, "&quot;");
function highlight(code, lang) {
  const h = esc(code);
  lang = (lang || "").toLowerCase();
  let comment;
  if (lang === "html") comment = "&lt;!--[\\s\\S]*?--&gt;";
  else if (lang === "css") comment = "/\\*[\\s\\S]*?\\*/";
  else if (/^(python|ruby|bash|dockerfile|shell)$/.test(lang)) comment = "#[^\\n]*";
  else if (lang === "sql") comment = "(?:--[^\\n]*|/\\*[\\s\\S]*?\\*/)";
  else comment = "(?://[^\\n]*|/\\*[\\s\\S]*?\\*/)";
  const re = new RegExp("(" + comment + ")|(\"(?:[^\"\\\\]|\\\\.)*\"|'(?:[^'\\\\]|\\\\.)*')|\\b(const|let|var|function|return|if|else|for|while|import|from|export|class|def|print|SELECT|FROM|WHERE|await|async|new|include|package|func|type|fn|use|pub|int|void|COPY|RUN|WORKDIR|CMD|USER)\\b", "g");
  return h.replace(re, (m, cmt, str, kw) => {
    if (cmt) return '<span class="c">' + cmt + "</span>";
    if (str) return '<span class="s">' + str + "</span>";
    if (kw) return '<span class="k">' + kw + "</span>";
    return m;
  });
}
function lvl(n) { let s = '<span class="lvl">'; for (let i = 1; i <= 5; i++) s += `<i class="${i <= n ? "on" : ""}"></i>`; return s + "</span>"; }
function badge(a) {
  if (a.danger >= 3) return '<span class="badge danger">Danger critique</span>';
  if (a.danger === 2) return '<span class="badge hot">Menace active</span>';
  if (a.cat === "cyber") return '<span class="badge">Cyber</span>';
  if (a.level <= 1) return '<span class="badge ok">Débutant</span>';
  return `<span class="badge">${CATS[a.cat] ? CATS[a.cat].name : "Fiche"}</span>`;
}
const artUrl = a => `/article/${a.id}/`;
function cardHTML(a, i) {
  return `<article class="card reveal in">
    <span class="idx">${String(i + 1).padStart(2, "0")} — ${CATS[a.cat] ? CATS[a.cat].name : ""}</span>
    <h3><a href="${artUrl(a)}">${a.title}</a></h3>
    <p>${a.excerpt}</p>
    <div>${badge(a)}${a.read <= 2 ? '<span class="badge">Synthèse</span>' : ""}</div>
    <div class="card-foot"><span class="meta-row">◷ ${a.read} MIN</span>${lvl(a.level)}</div>
  </article>`;
}

/* ── chrome ── */
function nav(active) {
  const L = (href, label, key) => `<a href="${href}" class="${active === key ? "active" : ""}">${label}</a>`;
  return `<header id="nav">
  <a href="/" class="brand magnetic">
    <span class="brand-mark">C.</span>
    <span class="brand-txt">InfoDuWeb<small>CODEX — encyclopédie code & cyber</small></span>
  </a>
  <nav class="nav-links" aria-label="Navigation principale">
    ${L("/", "Accueil", "home")}${L("/explorer/", "Explorer", "explorer")}${L("/index/", "Index A–Z", "index")}${L("/menaces/", "Menaces <em class=\"live-dot\"></em>", "menaces")}
    <button id="randomBtn" class="linklike">Aléatoire ⤨</button>
  </nav>
  <div class="nav-actions">
    <button id="searchOpen" class="search-pill magnetic"><span class="kbd">⌘K</span> Rechercher… <b>${fmt(TOTAL)} pages</b></button>
    <button id="themeToggle" class="icon-btn magnetic" title="Papier / Nuit" aria-label="Basculer le thème">◐</button>
  </div>
  <button id="burger" aria-label="Ouvrir le menu">—<br>—</button>
</header>
<div id="mobileMenu">
  <a href="/">Accueil</a><a href="/explorer/">Explorer</a><a href="/index/">Index A–Z</a><a href="/menaces/">Menaces</a>
</div>`;
}
const searchOverlay = `<div id="searchOverlay" aria-hidden="true" role="dialog" aria-label="Recherche globale">
  <div class="search-box">
    <div class="search-top"><span class="mono">RECHERCHE GLOBALE — ⌘K / Échap pour fermer</span><button id="searchClose" aria-label="Fermer">✕</button></div>
    <input id="searchInput" type="text" placeholder="python, xss, csrf, docker, rust…" autocomplete="off" aria-label="Rechercher une fiche">
    <div class="search-filters">
      <button class="sf active" data-f="all">Tout</button><button class="sf" data-f="langage">Langages</button><button class="sf" data-f="cyber">Cyber</button><button class="sf" data-f="web">Web</button><button class="sf" data-f="systeme">Système</button><button class="sf" data-f="concept">Concepts</button>
    </div>
    <div id="searchResults"></div>
    <div class="search-foot mono">↑↓ naviguer · ↵ ouvrir · <span id="searchCount"></span></div>
  </div>
</div>`;
function footer() {
  return `<footer>
    <div class="wrap foot-grid">
      <div class="foot-brand">
        <div class="foot-logo">InfoDuWeb<span>.</span>CODEX</div>
        <p>Encyclopédie indépendante du code & de la cybersécurité. Écrite pour les curieux, les devs, les pentesters et les insomniaques du terminal.</p>
        <div class="mono dim">CONTACT — <a href="https://github.com/salabertenzo36-glitch/infoduweb-codex/issues" style="text-decoration:underline">Signaler une erreur (GitHub)</a></div>
        <div class="mono dim"><span class="total-dynamic">${fmt(TOTAL)} PAGES</span> · 5 RAYONS · ERREURS BIENVENUES VIA LE CONTACT CI-DESSOUS</div>
      </div>
      <div class="foot-col"><div class="mono overline">RAYONS</div>
        <a href="/categorie/langage/">Langages</a><a href="/categorie/cyber/">Cybersécurité</a><a href="/categorie/web/">Web & API</a><a href="/categorie/systeme/">Système & Réseau</a><a href="/categorie/concept/">Concepts</a></div>
      <div class="foot-col"><div class="mono overline">DANGERS</div>
        <a href="/article/xss/">XSS</a><a href="/article/sql-injection/">SQL Injection</a><a href="/article/phishing/">Phishing</a><a href="/article/ransomware/">Ransomware</a><a href="/article/zero-day/">Zero-Day</a></div>
      <div class="foot-col"><div class="mono overline">LÉGAL</div>
        <a href="/legal/mentions-legales/">Mentions légales</a><a href="/legal/cgu/">CGU</a><a href="/legal/confidentialite/">Confidentialité</a><a href="/legal/cookies/">Cookies</a></div>
      <div class="foot-col"><div class="mono overline">CODEX</div>
        <a href="/index/">Index A–Z</a><a href="/explorer/">Explorer</a><a href="/">Manifeste</a><button class="linklike" id="footRandom">Page au hasard ⤨</button></div>
    </div>
    <div class="foot-giant" aria-hidden="true">CODEX·WEB</div>
    <div class="wrap foot-bottom mono"><span>© 2026 InfoDuWeb — savoir ouvert</span><span>Fait avec rigueur, sans néon.</span></div>
  </footer>`;
}
const cookieBar = `<div id="cookieBar" class="hidden" role="dialog" aria-label="Information cookies">
  <div><b class="mono">COOKIES — RAS.</b><p>Pas de traceurs, pas de pub. Votre choix est gardé sur votre appareil uniquement.</p></div>
  <div class="cookie-actions"><a href="/legal/cookies/">Détails</a><button id="cookieOk" class="btn-solid">Compris</button></div>
</div>`;

function layout({ title, desc, url, active, body, page = {}, ogType = "website", scripts = ["/data.js", "/app.js"] }) {
  const full = SITE + url;
  return `<!DOCTYPE html>
<html lang="fr" data-theme="nuit">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escA(title)}</title>
<meta name="description" content="${escA(desc)}">
<link rel="canonical" href="${full}">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="InfoDuWeb CODEX">
<meta property="og:title" content="${escA(title)}">
<meta property="og:description" content="${escA(desc)}">
<meta property="og:url" content="${full}">
<meta property="og:image" content="${SITE}/assets/hero-poster.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="preload" href="/assets/fonts/fraunces-900.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/style.css">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23FF4D00'/><text x='50' y='68' font-size='58' text-anchor='middle' fill='%230C0C0B' font-family='monospace' font-weight='bold'>C.</text></svg>">
</head>
<body>
<a class="skip" href="#contenu">Aller au contenu</a>
<div id="cursorDot" aria-hidden="true"></div>
<div id="cursorRing" aria-hidden="true"></div>
<div class="grain" aria-hidden="true"></div>
<div id="readProgress" aria-hidden="true"><i></i></div>
${nav(active)}
${searchOverlay}
<main id="app"><div id="contenu">${body}</div></main>
${footer()}
${cookieBar}
<script>window.PAGE=${JSON.stringify(page)};</script>
${scripts.map(s => `<script src="${s}" defer></script>`).join("\n")}
</body>
</html>`;
}

/* ── HOME ── */
function homeBody() {
  const counts = {}; ALL.forEach(a => counts[a.cat] = (counts[a.cat] || 0) + 1);
  const rails = Object.entries(CATS).map(([k, c], i) => `
    <a class="rail r-${k}" href="/categorie/${k}/">
      <span class="big">0${i + 1}</span>
      <span class="count">● ${fmt(counts[k] || 0)} PAGES</span>
      <h3>${c.name}</h3><p>${c.desc}</p>
      <span class="go">Ouvrir le rayon →</span>
    </a>`).join("");
  const feat = ["debut-informatique", "python", "xss", "rust", "sql-injection", "docker"].map(byId).filter(Boolean);
  const threats = ALL.filter(a => a.cat === "cyber" && a.danger >= 2).sort((x, y) => y.danger - x.danger || x.title.localeCompare(y.title, "fr")).slice(0, 7);
  const threatRows = threats.map((a, i) => `
    <a class="threat" href="${artUrl(a)}">
      <span class="num">${String(i + 1).padStart(2, "0")}</span>
      <h3>${a.title}<small>${a.excerpt.slice(0, 80)}…</small></h3>
      <span class="danger-meter">${[1, 2, 3].map(l => `<i class="${l <= a.danger ? "f" + a.danger : ""}"></i>`).join("")}</span>
      <span class="arrow" aria-hidden="true">→</span>
    </a>`).join("");
  const langs = ["python", "javascript", "typescript", "csharp", "cpp", "rust", "go", "java"].map(byId).filter(Boolean);
  const langCells = langs.map(a => `
    <a class="lang-cell" href="${artUrl(a)}">
      <span class="logo">${a.title.split(" ")[0].toUpperCase().slice(0, 4)}</span>
      <h3>${a.title}</h3><p>${a.excerpt}</p>
      <div class="card-foot"><span class="meta-row">NIVEAU ${"●".repeat(a.level)}${"○".repeat(5 - a.level)} · ◷ ${a.read} MIN</span></div>
    </a>`).join("");
  const az = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l => `<a href="/index/#lettre-${l}">${l}</a>`).join("");
  return `
    <section class="hero" id="view-home">
      <div class="hero-video">
        <video autoplay muted loop playsinline preload="metadata" poster="/assets/hero-poster.jpg">
          <source src="/assets/hero-planete.mp4" type="video/mp4">
        </video>
        <div class="hero-veil"></div><div class="hero-veil2"></div><div class="hero-grid" aria-hidden="true"></div>
      </div>
      <div class="hero-content">
        <div class="hero-meta mono reveal">
          <span class="pill-live"><i></i> BASE VIVANTE — <b id="totalPagesHero">${fmt(TOTAL)}</b> PAGES</span>
          <span>ÉDITION 2026 · FR · OPEN KNOWLEDGE</span>
        </div>
        <h1 class="hero-title">
          <span class="line" data-split>TOUT LE CODE.</span>
          <span class="line outline" data-split>TOUS LES DANGERS.</span>
          <span class="line"><em data-split>UNE SEULE</em> <span class="serif-it" data-split>encyclopédie.</span></span>
        </h1>
        <div class="rotator mono reveal" aria-hidden="true"><span class="rot-label">À l'affiche —</span><span class="rot-window"><span id="rotWord">PYTHON</span></span></div>
        <div class="hero-sub">
          <p class="reveal">Le Wikipédia du code & de la cybersécurité — Python, JavaScript, TypeScript, C#, C++, Rust, failles XSS, ransomware, OSINT… ${fmt(TOTAL)} fiches claires, avec exemples, niveaux & parades.</p>
          <div class="hero-cta reveal">
            <button class="btn-solid magnetic" data-goto-search>Explorer la base ⤵</button>
            <a href="/article/python/" class="btn-ghost magnetic">Commencer par Python →</a>
          </div>
        </div>
      </div>
      <div class="hero-side mono">
        <div class="hs-block"><b>SCROLL</b><i class="scroll-line"><span></span></i></div>
        <div class="hs-block">N 48°51′ — E 2°21′<br>PARIS // SERVEUR 07</div>
        <div class="hs-block">SON <button id="muteBtn">[ OFF ]</button></div>
      </div>
      <div class="hero-foot mono">
        <span>◉ REC — savoir en continu</span><span id="clock">00:00:00</span><span>VOL.07 — CODE / CYBER / SYSTÈME</span>
      </div>
    </section>
    <div class="marquee" aria-hidden="true"><div class="marquee-track">
      <span>PYTHON ✦ JAVASCRIPT ✦ TYPESCRIPT ✦ C# ✦ C++ ✦ RUST ✦ GO ✦ XSS ✦ SQL INJECTION ✦ PHISHING ✦ RANSOMWARE ✦ DOCKER ✦ LINUX ✦ OSINT ✦&nbsp;</span>
      <span>PYTHON ✦ JAVASCRIPT ✦ TYPESCRIPT ✦ C# ✦ C++ ✦ RUST ✦ GO ✦ XSS ✦ SQL INJECTION ✦ PHISHING ✦ RANSOMWARE ✦ DOCKER ✦ LINUX ✦ OSINT ✦&nbsp;</span>
    </div></div>
    <div class="marquee marquee-ghost" aria-hidden="true"><div class="marquee-track">
      <span>ENCYCLOPÉDIE VIVANTE — CODE · CYBER · SYSTÈME · RÉSEAU · ALGORITHMES —&nbsp;</span>
      <span>ENCYCLOPÉDIE VIVANTE — CODE · CYBER · SYSTÈME · RÉSEAU · ALGORITHMES —&nbsp;</span>
    </div></div>
    <section class="band"><div class="wrap"><div class="stats" id="statsGrid">
      <div class="stat reveal"><b><span class="counter" data-to="${STATS.pages}">${fmt(STATS.pages)}</span></b><span class="mono">pages indexées</span><small>fiches uniques</small></div>
      <div class="stat reveal"><b><span class="counter" data-to="${STATS.langages}">${fmt(STATS.langages)}</span></b><span class="mono">langages couverts</span><small>de Python à Rust</small></div>
      <div class="stat reveal"><b><span class="counter" data-to="${STATS.menaces}">${fmt(STATS.menaces)}</span></b><span class="mono">menaces documentées</span><small>du phishing au zero-day</small></div>
      <div class="stat reveal"><b><span class="counter" data-to="${STATS.extraits}">${fmt(STATS.extraits)}</span></b><span class="mono">extraits de code</span><small>copiables en 1 clic</small></div>
    </div></div></section>
    <section class="wrap sect-head has-ghost">
      <div class="ghost" aria-hidden="true">RAYONS</div>
      <div><div class="mono overline reveal">01 — RAYONNAGES</div>
      <h2 class="h2 reveal" data-decode>Cinq rayons.<br><span class="serif-it">Des dizaines</span> de fiches.</h2></div>
      <p class="sect-desc reveal">Cinq portes d'entrée vers des fiches rédigées avec l'aide de l'IA, relecture en cours. Sobre en surface, profond dedans.</p>
    </section>
    <section class="rails" id="rails">${rails}</section>
    <section class="band"><div class="wrap has-ghost">
      <div class="ghost" aria-hidden="true">SÉLECTION</div>
      <div class="sect-head"><div><div class="mono overline reveal">02 — À LA UNE</div>
      <h2 class="h2 reveal" data-decode>Fiches <span class="serif-it">fondatrices.</span></h2></div>
      <a href="/explorer/" class="btn-ghost magnetic">Tout explorer →</a></div>
      <div class="cards-grid" id="featuredGrid">${feat.map(cardHTML).join("")}</div>
    </div></section>
    <section class="manifesto"><div class="wrap">
      <div class="mono overline light">LE MANIFESTE</div>
      <p id="manifestoText">On ne vous vend pas du rêve néon. On documente le réel : comment le code fonctionne, comment il casse, comment on l'attaque — et comment on le protège. Chaque fiche va à l'essentiel en quelques minutes, avec du code concret et des parades documentées.</p>
      <div class="manifesto-foot mono"><span>— la rédaction CODEX</span><span>LECTURE ≈ 2 À 5 MIN / FICHE</span></div>
    </div></section>
    <section class="band"><div class="hazard" aria-hidden="true"></div><div class="wrap has-ghost">
      <div class="ghost" aria-hidden="true">DANGER</div>
      <div class="sect-head"><div><div class="mono overline reveal">03 — SALLE DES DANGERS</div>
      <h2 class="h2 reveal" data-decode>La cyber, <span class="danger-word">sans filtre.</span></h2></div>
      <a href="/menaces/" class="btn-ghost magnetic">Cartographie complète →</a></div>
      <div id="threatList" class="threat-list">${threatRows}</div>
    </div></section>
    <section class="wrap has-ghost">
      <div class="ghost" aria-hidden="true">CODE</div>
      <div class="sect-head"><div><div class="mono overline reveal">04 — LANGAGES</div>
      <h2 class="h2 reveal" data-decode>Parlez <span class="serif-it">machine couramment.</span></h2></div></div>
      <div id="langGrid" class="lang-grid">${langCells}</div>
    </section>
    <section class="labo">
      <div class="labo-orbs" aria-hidden="true"><i class="o1"></i><i class="o2"></i><i class="o3"></i></div>
      <div class="wrap labo-inner">
        <div><div class="mono overline light reveal">05 — EN DIRECT DU LABO</div>
        <h2 class="h2 light reveal" data-decode>La machine ne dort jamais.</h2>
        <p class="sect-desc light reveal">Dernières vulnérabilités publiées au NIST, rejouées en continu. Données publiques, en temps réel.</p>
        <div class="labo-chips mono reveal"><span>● REC</span><span id="termClock">00:00:00</span><span id="laboSource">CONNEXION AU NIST…</span></div></div>
        <div class="terminal reveal" role="log" aria-label="Dernières vulnérabilités du NIST">
          <div class="term-head"><i></i><i></i><i></i><span class="mono">labo — nvd</span></div>
          <div class="term-body" id="termBody"><div class="ln-dim"><span class="p">$</span>connexion à services.nvd.nist.gov…</div></div>
          <div class="term-line"><span class="prompt">$</span><span id="termCurrent"></span><span class="caret"></span></div>
        </div>
      </div>
    </section>
    <section class="index-cta">
      <div class="rings" aria-hidden="true"></div>
      <div class="wrap index-cta-inner"><div>
        <div class="mono overline">06 — INDEX A–Z</div>
        <div class="giant">A<span>→</span>Z</div>
        <p>Chaque lettre ouvre un tiroir de fiches. Tapez, filtrez, perdez-vous. C'est fait pour.</p>
        <a href="/index/" class="btn-solid magnetic">Ouvrir l'index complet</a>
      </div><div class="az-mini" id="azMini">${az}</div></div>
    </section>
    <section class="interlude">
      <img class="interlude-bg" src="/assets/fibres.webp" alt="" aria-hidden="true" loading="lazy">
      <div class="interlude-veil" aria-hidden="true"></div>
      <div class="wrap">
        <div class="mono overline light reveal">NOTE DE FOND</div>
        <blockquote class="reveal">« Comprendre le code, c'est comprendre le monde qui l'exécute. Comprendre l'attaque, c'est apprendre à le défendre. »</blockquote>
        <div class="mono dim reveal interlude-cap">FIG. 07 — NAPPES DE FIBRES · FOND ANIMÉ</div>
      </div>
    </section>
    <section class="band"><div class="wrap faq has-ghost">
      <div class="ghost" aria-hidden="true">FAQ</div>
      <div class="mono overline reveal">07 — QUESTIONS DU LABO</div>
      <h2 class="h2 reveal" data-decode>On vous dit tout.</h2>
      <div class="faq-list reveal">
        <div class="faq-item"><button class="faq-q">Par où commencer si je débute ?<span>+</span></button><div class="faq-a"><div class="faq-a-in"><p>Le <a href="/article/debut-informatique/" style="text-decoration:underline">Début de l'informatique</a>, puis Python, HTML & CSS, Git. Chaque fiche indique son niveau (1 à 5) : suivez les ●.</p></div></div></div>
        <div class="faq-item"><button class="faq-q">Les fiches « dangers » apprennent-elles à pirater ?<span>+</span></button><div class="faq-a"><div class="faq-a-in"><p>Non. Elles documentent les attaques <b>pour s'en défendre</b> : mécanismes, détection, parades. Aucun exploit opérationnel, et un rappel constant : toute intrusion non autorisée est illégale.</p></div></div></div>
        <div class="faq-item"><button class="faq-q">Combien de fiches, et qui les écrit ?<span>+</span></button><div class="faq-a"><div class="faq-a-in"><p>${fmt(TOTAL)} fiches uniques, rédigées avec l'aide de l'IA. La relecture experte est en cours : si vous repérez une erreur, signalez-la via le contact en bas de page — elle sera corrigée.</p></div></div></div>
        <div class="faq-item"><button class="faq-q">D'où viennent les vulnérabilités du labo ?<span>+</span></button><div class="faq-a"><div class="faq-a-in"><p>De la base publique du <b>NIST</b> (National Vulnerability Database, USA), interrogée en direct. Hors-ligne, le terminal affiche la dernière veille éditoriale.</p></div></div></div>
        <div class="faq-item"><button class="faq-q">Puis-je utiliser les extraits de code ?<span>+</span></button><div class="faq-a"><div class="faq-a-in"><p>Oui, bouton COPIER en un clic. Relisez quand même : les exemples pédagogiques sacrifient parfois la robustesse à la clarté — les fiches le signalent.</p></div></div></div>
      </div>
    </div></section>`;
}

/* ── ARTICLE ── */
function articleBody(a) {
  const cat = CATS[a.cat];
  const rel = a.related ? a.related.map(byId).filter(Boolean)
    : ALL.filter(x => x.id !== a.id && (x.cat === a.cat || (x.tags || []).some(t => (a.tags || []).includes(t)))).sort((x, y) => x.title.localeCompare(y.title, "fr")).slice(0, 3);
  return `
    <div class="wrap article-layout">
      <aside class="toc" id="tocBox">
        <div class="mono overline">SOMMAIRE</div>
        <div id="tocLinks">${a.sections.map((s, i) => `<a href="#sec-${i}" data-sec="${i}">${String(i + 1).padStart(2, "0")} · ${s.h}</a>`).join("")}</div>
        <div class="toc-infobox" id="tocInfobox"><div class="mono overline">FICHE</div><dl>${Object.entries(a.infobox || {}).map(([k, v]) => `<dt>${esc(k.toUpperCase())}</dt><dd>${v}</dd>`).join("")}<dt>NIVEAU</dt><dd>${"●".repeat(a.level)}${"○".repeat(5 - a.level)}</dd><dt>LECTURE</dt><dd>◷ ${a.read} min · Niveau ${a.level}/5</dd></dl></div>
        <button class="btn-ghost" id="tocRandom">↻ Page au hasard</button>
      </aside>
      <article class="article" id="articleBody">
        <div class="crumb"><a href="/">CODEX</a> / <a href="/categorie/${a.cat}/">${cat.name.toUpperCase()}</a> / ${esc(a.title.toUpperCase())}</div>
        <h1>${a.title}</h1>
        <div class="art-meta">${badge(a)}${a.read <= 2 ? '<span class="badge">Synthèse</span>' : ""}<span class="meta-row">MAJ ${a.updated} · ${(a.tags || []).map(t => "#" + t).join(" ")}</span></div>
        <p class="lede">${a.excerpt}</p>
        ${a.danger >= 3 ? `<div class="warn">⚠ <b>Fiche danger.</b> Contenu documenté à but <b>défensif</b>. Toute attaque non autorisée contre un système est illégale (art. 323-1 et s. Code pénal).</div>` : ""}
        ${a.sections.map((s, i) => `
          <h2 id="sec-${i}">${s.h}</h2>
          <div>${s.body}</div>
          ${s.code ? `<div class="codeblock"><div class="cb-head"><span>◉ ${s.code.lang}</span><button class="copy">COPIER</button></div><pre><code>${highlight(s.code.code, s.code.lang)}</code></pre></div>` : ""}
        `).join("")}
        ${a.parent && byId(a.parent) ? `<div class="tip">✔ <b>Pour aller plus loin :</b> relisez la fiche <a href="${artUrl(byId(a.parent))}"><u>${byId(a.parent).title}</u></a>.</div>` : ""}
        ${(a.sources || []).length ? `<div class="sources"><div class="mono overline">SOURCES VÉRIFIABLES</div><ul>${a.sources.map(s => `<li><a href="${s.u}" target="_blank" rel="noopener">↗ ${s.t}</a></li>`).join("")}</ul></div>` : ""}
      </article>
    </div>
    <div class="wrap"><div class="related"><div class="mono overline">POURSUIVRE LA LECTURE</div><div id="relatedGrid" class="cards-grid">${rel.map(cardHTML).join("")}</div></div></div>`;
}
function jsonld(a, url) {
  return `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.excerpt, inLanguage: "fr", url: SITE + url }).replace(/<\//g, "<\\/")}</script>`;
}

/* ── build ── */
const write = (rel, content) => {
  const p = path.join(dist, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content);
  return rel;
};
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

const urls = [];
const add = (rel, content, lastmod, priority) => { write(rel, content); urls.push({ loc: SITE + "/" + rel.replace(/index\.html$/, ""), lastmod, priority }); };

/* home */
add("index.html", layout({
  title: "InfoDuWeb CODEX — L'encyclopédie du code & de la cybersécurité",
  desc: `CODEX : ${fmt(TOTAL)} fiches claires sur Python, JavaScript, Rust, XSS, ransomware, Docker, Linux… Exemples, niveaux et parades.`,
  url: "/", active: "home", body: homeBody(), page: { type: "home" }, ogType: "website"
}), "2026-10-09", "1.0");

/* articles */
for (const a of ALL) {
  const url = artUrl(a);
  add(`article/${a.id}/index.html`, layout({
    title: `${a.title} — CODEX`,
    desc: a.excerpt.length > 155 ? a.excerpt.slice(0, 152) + "…" : a.excerpt,
    url, active: "", body: articleBody(a), page: { type: "article", id: a.id }, ogType: "article",
    scripts: ["/data.js", "/app.js"]
  }).replace("</head>", jsonld(a, url) + "\n</head>"), a.updated, "0.8");
}

/* catégories */
for (const [k, c] of Object.entries(CATS)) {
  const list = ALL.filter(a => a.cat === k).sort((x, y) => x.title.localeCompare(y.title, "fr"));
  add(`categorie/${k}/index.html`, layout({
    title: `${c.name} — CODEX`, desc: `${c.desc} (${list.length} fiches).`,
    url: `/categorie/${k}/`, active: "", body: `<div class="wrap page-top">
      <div class="mono overline">RAYON — ${c.name.toUpperCase()}</div>
      <h2 class="h2">${c.name}</h2>
      <p class="sect-desc">${c.desc} (${fmt(list.length)} pages)</p></div>
      <div class="wrap"><div class="cards-grid">${list.map(cardHTML).join("")}</div></div>`,
    page: { type: "category" }
  }), "2026-10-09", "0.6");
}

/* explorer */
{
  const chips = ["all", ...Object.keys(CATS)].map(c => `<button class="chip ${c === "all" ? "active" : ""}" data-c="${c}">${c === "all" ? "Tout" : CATS[c].name}</button>`).join("");
  add("explorer/index.html", layout({
    title: "Explorer toute la bibliothèque — CODEX",
    desc: `Parcourez les ${fmt(TOTAL)} fiches CODEX : langages, cybersécurité, web, système, concepts.`,
    url: "/explorer/", active: "explorer", body: `<div class="wrap page-top">
      <div class="mono overline">EXPLORER</div>
      <h2 class="h2">Toute la <span class="serif-it">bibliothèque.</span></h2>
      <div class="explorer-bar"><input id="explorerSearch" placeholder="Filtrer ${fmt(TOTAL)} pages… (ex : rust, xss, docker)" aria-label="Filtrer les fiches"><div class="chip-row" id="explorerChips">${chips}</div></div></div>
      <div class="wrap"><div id="explorerGrid" class="cards-grid">${ALL.map(cardHTML).join("")}</div>
      <div class="mono center dim" id="explorerCount">${fmt(ALL.length)} FICHES AFFICHÉES / ${fmt(TOTAL)} AU TOTAL</div></div>`,
    page: { type: "explorer" }
  }), "2026-10-09", "0.6");
}

/* index A-Z */
{
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const groups = letters.map(l => ({ l, items: ALL.filter(a => a.title.toUpperCase().startsWith(l)).sort((x, y) => x.title.localeCompare(y.title, "fr")) })).filter(g => g.items.length);
  add("index/index.html", layout({
    title: "Index A–Z — CODEX", desc: `L'index intégral des ${fmt(TOTAL)} fiches CODEX, de A à Z.`,
    url: "/index/", active: "index", body: `<div class="wrap page-top">
      <div class="mono overline">INDEX A–Z — ${fmt(TOTAL)} ENTRÉES</div>
      <h2 class="h2">L'index <span class="serif-it">intégral.</span></h2>
      <div class="az-row" id="azRow">${letters.map(l => `<a href="#lettre-${l}" class="az-btn">${l}</a>`).join("")}</div>
      <input id="indexSearch" placeholder="Filtrer l'index…" aria-label="Filtrer l'index"></div>
      <div class="wrap"><div id="indexList" class="index-list">${groups.map(g => `
        <div class="il-group" id="lettre-${g.l}" data-letter="${g.l}">${g.items.map(a => `
          <a class="il-row" href="${artUrl(a)}" data-title="${escA(a.title.toLowerCase())}">
            <span class="il-letter">${g.l}</span>
            <span><b>${a.title}</b><br><small>${a.excerpt.slice(0, 90)}…</small></span>
            <small>${CATS[a.cat].name.toUpperCase()}</small>
            <small>◷ ${a.read} MIN</small>
          </a>`).join("")}</div>`).join("")}</div></div>`,
    page: { type: "index" }
  }), "2026-10-09", "0.6");
}

/* menaces */
{
  const list = ALL.filter(a => a.cat === "cyber").sort((x, y) => y.danger - x.danger || x.title.localeCompare(y.title, "fr"));
  add("menaces/index.html", layout({
    title: "Cartographie des menaces — CODEX",
    desc: "XSS, ransomware, phishing, zero-day… les menaces cyber documentées pour s'en défendre.",
    url: "/menaces/", active: "menaces", body: `<div class="wrap page-top">
      <div class="mono overline">CARTOGRAPHIE — MENACES ACTIVES</div>
      <h2 class="h2">La salle des <span class="serif-it">dangers.</span></h2>
      <p class="sect-desc">Failles et attaques documentées pour s'en défendre. Triées par criticité.</p></div>
      <div class="wrap"><div class="cards-grid">${list.map(cardHTML).join("")}</div></div>`,
    page: { type: "menaces" }
  }), "2026-10-09", "0.6");
}

/* légal */
for (const [k, d] of Object.entries(LEGAL)) {
  add(`legal/${k}/index.html`, layout({
    title: `${d.title} — CODEX`, desc: d.lede.length > 155 ? d.lede.slice(0, 152) + "…" : d.lede,
    url: `/legal/${k}/`, active: "", body: `<div class="wrap article-layout">
      <aside class="toc"><div class="mono overline">SOMMAIRE</div>
        <div id="tocLinks">${d.sections.map((s, i) => `<a href="#sec-${i}" data-sec="${i}">${String(i + 1).padStart(2, "0")} · ${s.h}</a>`).join("")}</div>
        <div class="toc-infobox"><div class="mono overline">DOCUMENT</div><dl><dt>TYPE</dt><dd>Document légal</dd><dt>MISE À JOUR</dt><dd>${d.updated}</dd></dl></div>
      </aside>
      <article class="article" id="articleBody">
        <div class="crumb"><a href="/">CODEX</a> / LÉGAL / ${esc(d.title.toUpperCase())}</div>
        <h1>${d.title}</h1><p class="lede">${d.lede}</p>
        ${d.sections.map((s, i) => `<h2 id="sec-${i}">${s.h}</h2><div>${s.body}</div>`).join("")}
      </article></div>
      <div class="wrap"><div class="related"><div class="mono overline">AUTRES DOCUMENTS</div><div class="cards-grid">${Object.entries(LEGAL).filter(([kk]) => kk !== k).map(([kk, o], i) => `
        <article class="card reveal in"><span class="idx">DOC — LÉGAL</span><h3><a href="/legal/${kk}/">${o.title}</a></h3><p>${o.lede}</p>
        <div><span class="badge">Légal</span></div><div class="card-foot"><span class="meta-row">MAJ ${o.updated}</span></div></article>`).join("")}</div></div></div>`,
    page: { type: "legal" }, scripts: ["/legal.js", "/data.js", "/app.js"]
  }), d.updated, "0.3");
}

/* sitemap + robots + headers */
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod><priority>${u.priority}</priority></url>`).join("\n")}\n</urlset>\n`);
write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
write("_headers", `/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  X-Frame-Options: SAMEORIGIN\n`);

/* assets statiques */
for (const f of ["style.css", "app.js", "data.js", "legal.js", "google5a5c22032efc081c.html"]) fs.copyFileSync(path.join(root, f), path.join(dist, f));
fs.mkdirSync(path.join(dist, "assets"), { recursive: true });
fs.cpSync(path.join(root, "assets"), path.join(dist, "assets"), { recursive: true });

console.log(`dist/ : ${urls.length} URLs · ${TOTAL} fiches · stats ${JSON.stringify(STATS)}`);
