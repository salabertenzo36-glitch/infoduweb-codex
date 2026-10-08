/* CODEX — documents légaux */
const LEGAL_CONTACT = "contact@infoduweb-codex.pages.dev";

window.LEGAL = {
"mentions-legales":{title:"Mentions légales",updated:"2026-10-08",
lede:"Qui publie ce site, qui l'héberge, et à qui appartiennent les contenus. L'identité juridique de CODEX en une page.",
sections:[
{h:"Éditeur du site",body:"<p><b>InfoDuWeb — CODEX</b>, encyclopédie indépendante du code et de la cybersécurité.<br>Contact : <b>"+LEGAL_CONTACT+"</b><br>Objet : publication d'informations pédagogiques en accès libre et gratuit, sans compte ni abonnement.</p>"},
{h:"Hébergeur",body:"<p>Ce site est hébergé par <b>Cloudflare, Inc.</b> (101 Townsend Street, San Francisco, CA 94107, États-Unis), via le service <b>Cloudflare Pages</b> (adresse du site : infoduweb-codex.pages.dev). L'hébergeur assure la mise en ligne et la sécurité de l'infrastructure.</p>"},
{h:"Propriété intellectuelle",body:"<p>Les textes, illustrations générées et la structure du site sont des créations originales. <b>Courte citation autorisée</b> avec mention de la source et lien vers la fiche. Toute reproduction intégrale ou exploitation commerciale sans accord écrit est interdite. Les extraits de code publiés sont réutilisables librement, avec la prudence d'usage rappelée dans chaque fiche.</p>"},
{h:"Données personnelles",body:"<p>Ce site ne crée aucun compte et ne dépose aucun traceur publicitaire. Voir la <b>Politique de confidentialité</b> et la <b>Politique cookies</b> pour le détail (journaux techniques de l'hébergeur, stockage local du choix cookies).</p>"},
{h:"Droit applicable",body:"<p> Droit français. En cas de litige, les tribunaux français sont compétents. Pour toute demande (correction, retrait, droit de réponse) : <b>"+LEGAL_CONTACT+"</b>."}]},

"cgu":{title:"Conditions générales d'utilisation",updated:"2026-10-08",
lede:"Les règles du jeu : ce que CODEX promet, ce qu'il ne promet pas, et ce que vous vous engagez à respecter en le lisant.",
sections:[
{h:"1. Objet",body:"<p>Les présentes CGU encadrent l'accès à <b>InfoDuWeb — CODEX</b> et l'utilisation de ses fiches pédagogiques sur le code et la cybersécurité. Naviguer sur le site vaut acceptation de ces conditions.</p>"},
{h:"2. Accès au site",body:"<p>Accès <b>libre, gratuit, sans inscription</b>, 7 j/7 sous réserve de maintenance ou de cas de force majeure. Certaines ressources externes (vidéo d'ambiance, polices) dépendent de tiers et peuvent être indisponibles.</p>"},
{h:"3. Contenu pédagogique et limites",body:"<ul><li>Les fiches sont <b>informatives</b>, pas du conseil professionnel : vérifiez toujours avant d'appliquer en production (sauvegardes, environnements de test).</li><li>Les fiches « dangers » documentent les attaques <b>à but défensif</b> (comprendre, détecter, se protéger). Aucun mode d'emploi offensif n'est fourni.</li><li>Le contenu est mis à jour au fil de l'eau ; une erreur peut subsister — signalez-la à <b>"+LEGAL_CONTACT+"</b>.</li></ul>"},
{h:"4. Vos engagements",body:"<div class='warn'>⚠ Sont interdits : toute <b>attaque</b> contre le site ou son hébergeur, toute utilisation des connaissances du site pour <b>attaquer des systèmes sans autorisation</b> (infraction pénale, art. 323-1 et s. du Code pénal : 2 ans d'emprisonnement et 60 000 € d'amende), et tout scraping massif portant atteinte au service.</div>"},
{h:"5. Propriété intellectuelle",body:"<p>Voir Mentions légales. Vous pouvez citer et partager avec attribution ; la republication intégrale ou commerciale exige un accord écrit.</p>"},
{h:"6. Responsabilités",body:"<p>L'éditeur ne saurait être tenu responsable des dommages directs ou indirects liés à l'usage du site ou à l'application des exemples (perte de données, interruption de service). Les liens et fiches générées automatiquement sont fournis « en l'état ».</p>"},
{h:"7. Modifications",body:"<p>Ces CGU peuvent évoluer ; la version applicable est celle publiée à la date de votre visite. Date de dernière mise à jour indiquée en tête de page.</p>"},
{h:"8. Droit applicable et contact",body:"<p>Droit français, tribunaux français compétents. Questions, signalements, demandes de retrait : <b>"+LEGAL_CONTACT+"</b>."}]},

"confidentialite":{title:"Politique de confidentialité",updated:"2026-10-08",
lede:"Ce que ce site sait de vous : presque rien. Le détail honnête des (rares) données techniques et de vos droits RGPD.",
sections:[
{h:"1. Principe : sobriété maximale",body:"<p><b>Pas de compte, pas de formulaire, pas de traceur publicitaire, pas de mesure d'audience.</b> Votre lecture reste anonyme : nous ne savons pas qui lit quoi.</p>"},
{h:"2. Données techniques de l'hébergeur",body:"<p>Comme tout site, l'hébergeur <b>Cloudflare</b> traite des données techniques nécessaires à la sécurité et à la distribution : adresse IP, type de navigateur, pages demandées (journaux de connexion). Base légale : <b>intérêt légitime</b> (sécurité, lutte anti-abus). Durées : selon la politique de Cloudflare, avec anonymisation/rotation. Ces données ne sont ni revendues ni utilisées à des fins publicitaires.</p>"},
{h:"3. Stockage local",body:"<p>Le site mémorise <b>uniquement votre choix sur le bandeau cookies</b>, dans le stockage local de votre navigateur (<code>localStorage</code>), sur votre appareil exclusivement. Aucune donnée n'est envoyée à un serveur. Vider le stockage du site réinitialise ce choix.</p>"},
{h:"4. Cookies",body:"<p>Aucun cookie de suivi déposé par le site. D'éventuels cookies techniques de sécurité proviennent de l'hébergeur (ex. protection anti-bots) : détail dans la <b>Politique cookies</b>.</p>"},
{h:"5. Vos droits (RGPD)",body:"<ul><li>Droits d'<b>accès, rectification, suppression, opposition, limitation et portabilité</b> sur les données vous concernant.</li><li>Exercice : écrivez à <b>"+LEGAL_CONTACT+"</b> en précisant votre demande ; réponse sous un mois.</li><li>Réclamation : <b>CNIL</b> (cnil.fr), 3 place de Fontenoy, Paris.</li></ul>"},
{h:"6. Mineurs",body:"<p>Le contenu pédagogique est accessible à tous ; aucune donnée n'est collectée auprès des mineurs puisqu'aucune donnée n'est collectée du tout.</p>"},
{h:"7. Modifications",body:"<p>Cette politique peut évoluer avec le site (ex. ajout d'une newsletter) ; la version en ligne fait foi.</p>"}]},

"cookies":{title:"Politique cookies",updated:"2026-10-08",
lede:"Quels cookies dépose ce site ? Aucun de suivi. Le point complet, sans langue de bois.",
sections:[
{h:"1. Zéro traceur",body:"<p>CODEX ne dépose <b>aucun cookie publicitaire, analytique ou de partage social</b>. Il n'y a ni bannière publicitaire, ni bouton social traquant, ni lecteur vidéo tiers avec suivi.</p>"},
{h:"2. Stockage local fonctionnel",body:"<p>Seule information conservée : votre réponse au bandeau cookies (« compris »), enregistrée en <code>localStorage</code> sur votre appareil. Finalité : ne plus vous reposer la question. Durée : jusqu'à effacement par vos soins. Vous pouvez le supprimer à tout moment dans les paramètres du navigateur (données du site).</p>"},
{h:"3. Cookies de l'hébergeur",body:"<p>Cloudflare, qui distribue les pages, peut déposer des cookies <b>strictement techniques et de sécurité</b> (ex. distinction des visiteurs légitimes des robots, type <code>__cf_bm</code>). Ils sont exemptés de consentement car nécessaires à la fourniture du service et ne servent pas au suivi publicitaire.</p>"},
{h:"4. Garder la main",body:"<ul><li>Refusez ou effacez les cookies dans les réglages de votre navigateur (le site reste utilisable).</li><li>Le signal <b>Do Not Track</b> est respecté dans son esprit : nous ne suivons personne, avec ou sans signal.</li></ul>"},
{h:"5. Contact",body:"<p>Question sur ces règles : <b>"+LEGAL_CONTACT+"</b>. Voir aussi : Politique de confidentialité et Mentions légales.</p>"}]}
};
