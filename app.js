/* CODEX app — MPA : vraies URLs, contenu pré-rendu, JS = améliorations */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const ALL = window.ALL || [];
const CATS = window.CATS || {};
const PAGE = window.PAGE || { type: "home" };
const byId = id => ALL.find(a => a.id === id);
const fmt = n => n.toLocaleString("fr-FR");
const TOTAL = ALL.length;
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── Compat anciennes URLs #/… → vraies URLs ── */
(function () {
  const h = location.hash;
  const m = h.match(/^#\/(article|legal|categorie)\/([^/?]+)\/?/) || h.match(/^#\/(explorer|index|menaces)\/?/);
  if (m) location.replace("/" + m[1] + "/" + (m[2] ? m[2] + "/" : ""));
})();

/* ── HORLOGE ── */
setInterval(() => {
  const d = new Date();
  const t = [d.getHours(), d.getMinutes(), d.getSeconds()].map(x => String(x).padStart(2, "0")).join(":");
  const c = $("#clock"); if (c) c.textContent = t;
  const tc = $("#termClock"); if (tc) tc.textContent = t;
}, 1000);

/* ── THÈME ── */
{ const b = $("#themeToggle"); if (b) b.onclick = () => { const h = document.documentElement; h.dataset.theme = h.dataset.theme === "nuit" ? "papier" : "nuit"; }; }

/* ── CURSEUR + MAGNÉTIQUE ── */
(function () {
  const dot = $("#cursorDot"), ring = $("#cursorRing");
  if (!dot || !ring) return;
  let x = 0, y = 0, rx = 0, ry = 0;
  addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; dot.style.left = x + "px"; dot.style.top = y + "px"; });
  (function loop() { rx += (x - rx) * .16; ry += (y - ry) * .16; ring.style.left = rx + "px"; ring.style.top = ry + "px"; requestAnimationFrame(loop); })();
  document.addEventListener("mouseover", e => {
    if (e.target.closest && e.target.closest("a,button,.card,.threat,.rail")) ring.classList.add("on"); else ring.classList.remove("on");
  });
  $$(".magnetic").forEach(el => {
    el.addEventListener("mousemove", e => { const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .1}px,${(e.clientY - r.top - r.height / 2) * .1}px)`; });
    el.addEventListener("mouseleave", () => el.style.transform = "");
  });
})();

/* ── SPLIT HERO (immédiat, non bloquant) ── */
(function splitHero() {
  $$("[data-split]").forEach((el, i) => {
    const txt = el.textContent; el.textContent = "";
    [...txt].forEach((ch, j) => {
      const s = document.createElement("span"); s.className = "char"; s.textContent = ch === " " ? "\u00A0" : ch;
      s.style.animationDelay = (i * .25 + j * .022) + "s"; el.appendChild(s);
    });
  });
})();

/* ── ROTATOR (mots issus du corpus) ── */
(function () {
  const el = $("#rotWord"); if (!el || REDUCED) return;
  const words = ["PYTHON", "RUST", "XSS", "HTTP", "DOCKER", "AUTHENTIFICATION", "LINUX", "TYPESCRIPT", "PHISHING", "SQL"];
  if (!words.length) return;
  let i = 0;
  setInterval(() => {
    el.classList.add("out");
    setTimeout(() => {
      i = (i + 1) % words.length;
      el.textContent = words[i];
      el.classList.add("pre");
      requestAnimationFrame(() => requestAnimationFrame(() => el.classList.remove("out", "pre")));
    }, 460);
  }, 2300);
})();

/* ── DÉCODE ── */
(function () {
  const CHARS = "░▒▓█01#/\\|";
  const els = $$("[data-decode]");
  if (!els.length) return;
  const dio = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; dio.unobserve(e.target); decode(e.target);
  }), { threshold: .4 });
  els.forEach(el => { el.dataset.html = el.innerHTML; dio.observe(el); });
  function decode(el) {
    const full = el.textContent, html = el.dataset.html;
    if (REDUCED || full.length < 3) return;
    let f = 0; const total = Math.max(26, full.length * 2);
    const iv = setInterval(() => {
      f++;
      const done = Math.floor(full.length * f / total);
      let out = "";
      for (let i = 0; i < full.length; i++) {
        const ch = full[i];
        out += (ch.trim() === "" || i < done) ? ch : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      el.textContent = out;
      if (f >= total) { clearInterval(iv); el.innerHTML = html; }
    }, 30);
  }
})();

/* ── REVEAL + COMPTEURS + MANIFESTE ── */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
$$(".reveal:not(.in)").forEach(el => io.observe(el));

const cio = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return; cio.unobserve(e.target);
  const to = +e.target.dataset.to; const t0 = performance.now();
  (function tick(t) { const p = Math.min(1, (t - t0) / 1400);
    e.target.textContent = fmt(Math.floor(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(tick); })(t0);
}), { threshold: .4 });
$$(".counter").forEach(el => cio.observe(el));

(function manifesto() {
  const el = $("#manifestoText"); if (!el) return;
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map(w => `<span class="w">${w}</span>`).join(" ");
  const spans = [...el.querySelectorAll(".w")];
  if (REDUCED) { spans.forEach(s => s.classList.add("lit")); return; }
  let queued = false;
  function update() {
    queued = false;
    const r = el.getBoundingClientRect(); const prog = 1 - (r.top + r.height / 2 - innerHeight * .6) / (innerHeight * .7);
    const lit = Math.floor(prog * spans.length);
    spans.forEach((s, i) => s.classList.toggle("lit", i < lit));
  }
  addEventListener("scroll", () => { if (queued) return; queued = true; requestAnimationFrame(update); }, { passive: true });
  update();
})();

/* ── SCROLL GLOBAL : progress + parallax + footer ── */
(function () {
  let queued = false;
  const heroContent = $(".hero-content"), heroVideo = $(".hero-video"), fg = $(".foot-giant");
  const navEl = $("#nav");
  const bar = $("#readProgress i");
  addEventListener("scroll", () => {
    if (queued) return; queued = true;
    requestAnimationFrame(() => {
      queued = false;
      const h = document.documentElement, y = h.scrollTop;
      if (bar) bar.style.width = (y / (h.scrollHeight - h.clientHeight || 1) * 100) + "%";
      if (navEl) navEl.classList.toggle("scrolled", y > 40);
      if (REDUCED) return;
      if (heroContent && y < innerHeight * 1.2) {
        heroContent.style.transform = `translateY(${y * .13}px)`;
        if (heroVideo) heroVideo.style.transform = `translateY(${y * .07}px)`;
      }
      if (fg) {
        const d = Math.min(Math.max(innerHeight - fg.getBoundingClientRect().top, 0), 1400);
        fg.style.transform = `translateX(${-d * .08}px)`;
      }
    });
  }, { passive: true });
})();

/* ── TERMINAL LABO : CVE réelles (NIST NVD), repli éditorial ── */
(function () {
  const body = $("#termBody"), cur = $("#termCurrent"), src = $("#laboSource");
  if (!body || !cur) return;
  const FALLBACK = [
    { t: "veille éditoriale — 5 dossiers chauds", c: "ln-dim" },
    { t: "XSS : innerHTML + entrée utilisateur = faille", c: "" },
    { t: "SQLi : requêtes préparées, toujours", c: "" },
    { t: "ransomware : sauvegardes 3-2-1 testées", c: "ln-ok" },
    { t: "phishing : passkeys > mots de passe", c: "ln-ok" },
    { t: "zero-day : patcher < 48 h après correctif", c: "ln-warn" }
  ];
  let lines = [], li = 0, ci = 0, started = false, runId = 0;
  const CACHE_KEY = "codex-cve-cache", CACHE_TTL = 24 * 3600 * 1000;
  function readCache() {
    try {
      const j = JSON.parse(localStorage.getItem(CACHE_KEY));
      if (j && Date.now() - j.ts < CACHE_TTL && Array.isArray(j.items) && j.items.length) return j;
    } catch (e) {}
    return null;
  }
  function writeCache(items) {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), items })); } catch (e) {}
  }
  function day(ts) { try { return new Date(ts).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" }); } catch (e) { return ""; } }
  function push(text, cls) {
    const d = document.createElement("div");
    if (cls) d.className = cls;
    d.textContent = "$ " + text;
    body.appendChild(d);
    while (body.children.length > 6) body.removeChild(body.firstChild);
  }
  function tick(my) {
    if (my !== runId) return;
    const line = lines[li]; if (!line) return;
    if (ci <= line.t.length) { cur.textContent = line.t.slice(0, ci); ci++; setTimeout(() => tick(my), 20); }
    else { push(line.t, line.c); cur.textContent = ""; li = (li + 1) % lines.length; ci = 0; setTimeout(() => tick(my), 700); }
  }
  function start(data, label) {
    lines = data; li = 0; ci = 0; runId++;
    if (src) src.textContent = label;
    if (REDUCED) { body.innerHTML = ""; data.forEach(l => push(l.t, l.c)); cur.textContent = ""; return; }
    body.innerHTML = ""; tick(runId);
  }
  async function live() {
    try {
      const ctl = new AbortController(); const to = setTimeout(() => ctl.abort(), 7000);
      const r = await fetch("https://services.nvd.nist.gov/rest/json/cves/2.0?resultsPerPage=6&orderBy=published&sortOrder=desc", { signal: ctl.signal });
      clearTimeout(to);
      if (!r.ok) throw 0;
      const j = await r.json();
      const items = (j.vulnerabilities || []).map(v => {
        const c = v.cve;
        const m = (c.metrics && (c.metrics.cvssMetricV31 || c.metrics.cvssMetricV30 || []))[0];
        const sev = m ? m.cvssData.baseSeverity + " " + m.cvssData.baseScore : "n/a";
        const sum = ((c.descriptions || []).find(d => d.lang === "en") || {}).value || "";
        return { t: `${c.id} · ${sev} — ${sum.slice(0, 100)}`, c: String(sev).startsWith("CRITICAL") || String(sev).startsWith("HIGH") ? "ln-warn" : "" };
      }).filter(x => x.t.length > 12);
      if (!items.length) throw 0;
      writeCache(items);
      start(items, "SOURCE : NIST NVD · TEMPS RÉEL");
    } catch (e) { start(FALLBACK, "SOURCE : NIST NVD · HORS-LIGNE — VEILLE ÉDITORIALE"); }
  }
  new IntersectionObserver((es, obs) => es.forEach(e => {
    if (e.isIntersecting && !started) {
      started = true; obs.disconnect();
      const cached = readCache();
      if (cached) {
        start(cached.items, "SOURCE : NIST NVD · CACHE LOCAL DU " + day(cached.ts));
        live();
      } else {
        start(FALLBACK, "CONNEXION AU NIST…");
        live();
      }
    }
  }), { threshold: .3 }).observe(body);
})();

/* ── DRAG RAILS ── */
(function () {
  const r = $("#rails"); if (!r) return;
  let down = false, moved = false, sx = 0, sl = 0;
  r.addEventListener("pointerdown", e => { down = true; moved = false; sx = e.clientX; sl = r.scrollLeft; r.classList.add("dragging"); });
  addEventListener("pointermove", e => { if (!down) return; if (Math.abs(e.clientX - sx) > 8) moved = true; r.scrollLeft = sl - (e.clientX - sx); });
  addEventListener("pointerup", () => { down = false; r.classList.remove("dragging"); });
  r.addEventListener("click", e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
})();

/* ── FAQ ── */
$$(".faq-item").forEach(it => {
  it.querySelector(".faq-q").onclick = () => {
    const open = it.classList.contains("open");
    $$(".faq-item.open").forEach(o => o.classList.remove("open"));
    if (!open) it.classList.add("open");
  };
});

/* ── SOMMAIRE + COPIE (fiches pré-rendues) ── */
let tocObs = null;
(function () {
  const links = $$("#tocLinks a");
  if (links.length) {
    links.forEach(l => l.onclick = e => { e.preventDefault(); const t = $("#sec-" + l.dataset.sec); if (t) t.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" }); });
    tocObs = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) links.forEach(l => l.classList.toggle("act", l.dataset.sec === e.target.id.split("-")[1]));
    }), { rootMargin: "-30% 0px -60% 0px" });
    links.forEach(l => { const el = $("#sec-" + l.dataset.sec); if (el) tocObs.observe(el); });
  }
  $$("#articleBody .copy").forEach(b => b.onclick = () => {
    const code = b.closest(".codeblock").querySelector("code").innerText;
    navigator.clipboard.writeText(code).then(() => { b.textContent = "COPIÉ ✓"; setTimeout(() => b.textContent = "COPIER", 1400); }).catch(() => { b.textContent = "SÉLECTIONNEZ"; });
  });
})();

/* ── EXPLORER : filtre client ── */
(function () {
  const grid = $("#explorerGrid"); if (!grid) return;
  let cat = "all";
  const cards = [...grid.children];
  function lvl(n) { let s = '<span class="lvl">'; for (let i = 1; i <= 5; i++) s += `<i class="${i <= n ? "on" : ""}"></i>`; return s + "</span>"; }
  function badge(a) {
    if (a.danger >= 3) return '<span class="badge danger">Danger critique</span>';
    if (a.danger === 2) return '<span class="badge hot">Menace active</span>';
    if (a.cat === "cyber") return '<span class="badge">Cyber</span>';
    if (a.level <= 1) return '<span class="badge ok">Débutant</span>';
    return `<span class="badge">${CATS[a.cat] ? CATS[a.cat].name : "Fiche"}</span>`;
  }
  function draw(q) {
    q = (q || "").toLowerCase();
    const list = ALL.filter(a => (cat === "all" || a.cat === cat) && (!q || (a.title + " " + a.excerpt + " " + (a.tags || []).join(" ")).toLowerCase().includes(q)));
    grid.innerHTML = list.map((a, i) => `<article class="card reveal in">
      <span class="idx">${String(i + 1).padStart(2, "0")} — ${CATS[a.cat] ? CATS[a.cat].name : ""}</span>
      <h3><a href="/article/${a.id}/">${a.title}</a></h3><p>${a.excerpt}</p><div>${badge(a)}</div>
      <div class="card-foot"><span class="meta-row">◷ ${a.read} MIN</span>${lvl(a.level)}</div>
    </article>`).join("") || `<p class="mono dim">Aucun résultat — essayez « xss », « rust », « docker »…</p>`;
    const c = $("#explorerCount"); if (c) c.textContent = `${fmt(list.length)} FICHES AFFICHÉES / ${fmt(ALL.length)} AU TOTAL`;
  }
  $$("#explorerChips .chip").forEach(b => b.onclick = () => {
    $$("#explorerChips .chip").forEach(x => x.classList.remove("active")); b.classList.add("active");
    cat = b.dataset.c; draw($("#explorerSearch") ? $("#explorerSearch").value : "");
  });
  const inp = $("#explorerSearch"); if (inp) inp.addEventListener("input", e => draw(e.target.value));
})();

/* ── INDEX : filtre client ── */
(function () {
  const inp = $("#indexSearch"), list = $("#indexList"); if (!inp || !list) return;
  inp.addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    list.querySelectorAll(".il-row").forEach(r => { r.style.display = r.dataset.title.includes(q) ? "" : "none"; });
    list.querySelectorAll(".il-group").forEach(g => {
      g.style.display = [...g.querySelectorAll(".il-row")].some(r => r.style.display !== "none") ? "" : "none";
    });
  });
})();

/* ── RECHERCHE GLOBALE ── */
let sFilter = "all", selIdx = 0, opener = null;
function openSearch(from) { opener = from || null; $("#searchOverlay").classList.add("open"); $("#searchOverlay").setAttribute("aria-hidden", "false"); setTimeout(() => $("#searchInput").focus(), 60); doSearch(); }
function closeSearch() { $("#searchOverlay").classList.remove("open"); $("#searchOverlay").setAttribute("aria-hidden", "true"); if (opener && opener.focus) opener.focus(); }
{ const o = $("#searchOpen"); if (o) o.onclick = () => openSearch(o); }
{ const g = $("[data-goto-search]"); if (g) g.onclick = () => openSearch(g); }
{ const c = $("#searchClose"); if (c) c.onclick = closeSearch; }
{ const ov = $("#searchOverlay"); if (ov) ov.addEventListener("click", e => { if (e.target.id === "searchOverlay") closeSearch(); }); }
addEventListener("keydown", e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); openSearch(document.activeElement); }
  if (e.key === "Escape" && $("#searchOverlay") && $("#searchOverlay").classList.contains("open")) closeSearch();
  if ($("#searchOverlay") && $("#searchOverlay").classList.contains("open")) {
    const items = $$(".sr-item");
    if (e.key === "ArrowDown") { e.preventDefault(); selIdx = Math.min(items.length - 1, selIdx + 1); paintSel(items); }
    if (e.key === "ArrowUp") { e.preventDefault(); selIdx = Math.max(0, selIdx - 1); paintSel(items); }
    if (e.key === "Enter" && items[selIdx]) items[selIdx].click();
  }
});
function paintSel(items) { items.forEach((it, i) => it.classList.toggle("sel", i === selIdx)); if (items[selIdx]) items[selIdx].scrollIntoView({ block: "nearest" }); }
$$(".sf").forEach(b => b.onclick = () => { $$(".sf").forEach(x => x.classList.remove("active")); b.classList.add("active"); sFilter = b.dataset.f; doSearch(); });
{ const i = $("#searchInput"); if (i) i.addEventListener("input", doSearch); }
function score(a, q) {
  const t = a.title.toLowerCase(), ex = a.excerpt.toLowerCase(), tags = (a.tags || []).join(" ").toLowerCase();
  let s = 0;
  if (t.startsWith(q)) s += 100; if (t.includes(q)) s += 50; if (tags.includes(q)) s += 30; if (ex.includes(q)) s += 12;
  q.split(/\s+/).forEach(w => { if (w && t.includes(w)) s += 15; });
  return s;
}
function doSearch() {
  const inp = $("#searchInput"); if (!inp) return;
  const q = inp.value.trim().toLowerCase(); selIdx = 0;
  const pool = ALL.filter(a => sFilter === "all" || a.cat === sFilter);
  const res = q ? pool.map(a => ({ a, s: score(a, q) })).filter(x => x.s > 20).sort((x, y) => y.s - x.s).slice(0, 14).map(x => x.a)
    : [...pool].sort((x, y) => x.title.localeCompare(y.title, "fr")).slice(0, 8);
  $("#searchCount").textContent = fmt(res.length) + " RÉSULTATS";
  $("#searchResults").innerHTML = res.map(a => `
    <button class="sr-item" data-id="${a.id}">
      <span class="tag ${a.cat}">${CATS[a.cat].name.split(" ")[0].toUpperCase()}</span>
      <span><b>${a.title}</b><small>${a.excerpt.slice(0, 90)}… · ◷ ${a.read} min</small></span>
    </button>`).join("") || `<p class="mono dim" style="padding:20px">Aucune fiche — essayez « python », « xss », « docker »…</p>`;
  paintSel($$(".sr-item"));
  $$(".sr-item").forEach(b => b.onclick = () => { closeSearch(); location.href = "/article/" + b.dataset.id + "/"; });
}

/* ── ALÉATOIRE / DIVERS ── */
function randomGo() { const a = ALL[Math.floor(Math.random() * ALL.length)]; location.href = "/article/" + a.id + "/"; }
{ const b = $("#randomBtn"); if (b) b.onclick = randomGo; }
{ const b = $("#footRandom"); if (b) b.onclick = randomGo; }
{ const b = $("#tocRandom"); if (b) b.onclick = randomGo; }
{ const b = $("#burger"); if (b) b.onclick = () => $("#mobileMenu").classList.toggle("open"); }
$$("#mobileMenu a").forEach(a => a.onclick = () => $("#mobileMenu").classList.remove("open"));
{ const b = $("#muteBtn"); if (b) b.onclick = e => { const v = document.querySelector(".hero-video video"); if (!v) return; v.muted = !v.muted; e.target.textContent = v.muted ? "[ OFF ]" : "[ ON ]"; }; }

/* ── BANDEAU COOKIES ── */
(function () {
  const bar = $("#cookieBar"); if (!bar) return;
  let choice = null;
  try { choice = localStorage.getItem("codex-cookies"); } catch (e) {}
  if (!choice) setTimeout(() => { bar.classList.remove("hidden"); requestAnimationFrame(() => requestAnimationFrame(() => bar.classList.add("show"))); }, 1600);
  const ok = $("#cookieOk");
  if (ok) ok.onclick = () => {
    try { localStorage.setItem("codex-cookies", "ok"); } catch (e) {}
    bar.classList.remove("show");
    setTimeout(() => bar.classList.add("hidden"), 650);
  };
})();
