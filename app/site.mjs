// Public website for Vercel: the app at "/", a crawlable «Λεξιλόγιο» page with every word, an about
// page, sitemap, robots, 404, web manifest, icons and og image. Greek lang tags throughout. PostHog analytics when POSTHOG_KEY is set.
import { writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { loadUnits } = require("./src/course.js");

export const SITE = "https://carpe-latin.vercel.app";
export const REPO = "https://github.com/ionpetro/carpe";
// PostHog (optional): set POSTHOG_KEY in app/.env. Without it no analytics code ships at all.
const POSTHOG_KEY = process.env.POSTHOG_KEY || "";
const POSTHOG_HOST = process.env.POSTHOG_HOST || "https://us.i.posthog.com";
function analytics() {
  if (!POSTHOG_KEY) return "";
  if (!/^phc_[A-Za-z0-9]+$/.test(POSTHOG_KEY)) throw new Error("POSTHOG_KEY must be a PostHog project key (phc_...)");
  // Official PostHog loader. Anonymous visitors only (no person profiles), inputs masked in replays.
  return `<script>!function(t,e){var o,n,p,r;e.__SV||(window.posthog&&window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags identify setPersonProperties group resetGroups reset get_distinct_id get_session_id alias set_config startSessionRecording stopSessionRecording captureException opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init(${JSON.stringify(POSTHOG_KEY)},{api_host:${JSON.stringify(POSTHOG_HOST)},defaults:"2025-05-24",person_profiles:"identified_only",session_recording:{maskAllInputs:true}});
posthog.register({app:"carpe",surface:"web"});</script>`;
}

const NAME = "Carpe";
const TAGLINE = "Carpe diem. Carpe το 20.";
const DESC = "Λατινικά για τις Πανελλαδικές (Γ΄ Λυκείου, Ανθρωπιστικές Σπουδές) σαν παιχνίδι: λέξεις, τύποι, συντακτικό και μετατροπές με τις εκφωνήσεις των εξετάσεων, σε μαθήματα των τριών λεπτών. Χωρίς καρδιές, χωρίς τιμωρίες.";

const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap">';
const ICONS = '<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/icon.svg"><link rel="manifest" href="/manifest.webmanifest"><meta name="theme-color" content="#6d3fa6">';

function head({ title, desc, path, type = "website", jsonld = [] }) {
  const url = SITE + path;
  return `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${type}"><meta property="og:site_name" content="${NAME}"><meta property="og:locale" content="el_GR"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${SITE}/og.png"><meta property="og:image:width" content="1600"><meta property="og:image:height" content="900"><meta property="og:image:alt" content="${esc(NAME)}: ${esc(TAGLINE)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${SITE}/og.png">
${ICONS}${FONTS}${analytics()}
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`).join("\n")}`;
}

const PAGE_CSS = `:root{--bg:#f7f4ee;--surface:#fff;--ink:#23202b;--muted:#6b6677;--line:#e4ded2;--brand:#6d3fa6;--brand-deep:#4b2a76;--brand-soft:#efe7fa;--gold:#c9992b;--gold-soft:#faefd3;--olive:#4f8a2f;--on:#fff;color-scheme:light}
@media (prefers-color-scheme:dark){:root{--bg:#15121d;--surface:#1f1a2b;--ink:#f0ecf6;--muted:#a9a2b8;--line:#342d44;--brand:#a98ae0;--brand-deep:#6d4fb0;--brand-soft:#2d2342;--gold:#e6b84a;--gold-soft:#3a3017;--olive:#8cc766;--on:#15121d;color-scheme:dark}}
*{box-sizing:border-box}body{margin:0;font-feature-settings:"lnum";background:var(--bg);color:var(--ink);font:17px/1.6 Nunito,system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}
.wrap{max-width:760px;margin:0 auto;padding:24px max(16px,env(safe-area-inset-right,0px)) 64px max(16px,env(safe-area-inset-left,0px))}
a{color:var(--brand);font-weight:800}nav.top{display:flex;align-items:center;gap:16px;flex-wrap:wrap;padding-bottom:16px;border-bottom:1px solid var(--line)}
nav.top .brand{font-family:"Cormorant Garamond",Georgia,serif;font-style:italic;font-weight:700;font-size:28px;text-decoration:none;margin-right:auto}nav.top a{text-decoration:none;font-size:15px}
h1{font-size:clamp(32px,7vw,48px);line-height:1.05;margin:18px 0 6px;font-weight:900;text-wrap:balance}h2{font-size:22px;margin:32px 0 8px;font-weight:900}h3{margin:18px 0 6px}
.la{font-family:"Cormorant Garamond","Palatino Linotype",Palatino,Georgia,serif;font-weight:700}
.say{font-size:19px;font-weight:700}.card{background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:16px 18px;margin:12px 0}
.cta{display:inline-flex;align-items:center;gap:8px;margin-top:20px;background:var(--brand);color:var(--on);text-decoration:none;font-weight:900;padding:14px 22px;border-radius:14px;box-shadow:0 4px 0 var(--brand-deep)}
table{width:100%;border-collapse:collapse;font-size:15px}td,th{padding:8px 6px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}th{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}td.la{font-size:19px}
.pill{display:inline-block;font-size:11px;font-weight:900;letter-spacing:.05em;text-transform:uppercase;padding:2px 7px;border-radius:999px;background:var(--brand-soft);color:var(--brand)}
footer{margin-top:48px;padding-top:16px;border-top:1px solid var(--line);font-size:14px;color:var(--muted)}footer a{font-weight:700}`;

const nav = () => `<nav class="top" aria-label="Ιστότοπος"><a class="brand" href="/">Carpe</a><a href="/lexiko">Λεξιλόγιο</a><a href="/about">Τι είναι</a><a href="${REPO}">GitHub</a></nav>`;
const foot = () => `<footer><p>${NAME}: ${TAGLINE} Οι τύποι ελέγχονται στη Λατινική Γραμματική του Τζάρτζανου και στο σχολικό βιβλίο (Πασχάλης–Σαββαντίδης). Τα κείμενα των μαθημάτων είναι © ΙΤΥΕ «Διόφαντος»· εδώ εμφανίζονται μόνο σύντομα αποσπάσματα. Το ${NAME} είναι δωρεάν και θα μείνει πάντα δωρεάν· ο κώδικας είναι ανοιχτός (MIT): <a href="${REPO}">GitHub</a>. Το μόνο που κάνουμε είναι να μετράμε με το PostHog πώς χρησιμοποιείται, για να το βελτιώνουμε. Χωρίς λογαριασμό, χωρίς διαφημίσεις.</p></footer>`;
const page = ({ title, desc, path, body, jsonld, type }) => `<!doctype html><html lang="el"><head>${head({ title, desc, path, jsonld, type })}<style>${PAGE_CSS}</style></head><body><div class="wrap">${nav()}${body}${foot()}</div></body></html>`;

/** Every word, with its unit and lesson, for the lexicon page. */
export function lexicon(units) {
  const out = [];
  const seen = new Set(); // a headword taught in several units is listed once, where it first appears
  const key = (w) => w.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
  for (const u of units) for (const l of u.lessons) for (const it of l.items) if (it.kind === "word" && !seen.has(key(it.la))) { seen.add(key(it.la)); out.push({ it, unit: u, lesson: l }); }
  return out;
}

const GENDERS = { m: "αρσ.", f: "θηλ.", n: "ουδ.", c: "κοινό" };
function lexPage(units) {
  const words = lexicon(units);
  const body = `<h1>Λεξιλόγιο</h1><p class="say">${words.length ? `${words.length} λέξεις των μαθημάτων 16-50 όπως τις διδάσκει το Carpe: λημματικός τύπος, γένος, σημασία του βιβλίου και ένα γαντζάκι μνήμης.` : "Το λεξιλόγιο γεμίζει καθώς γράφονται οι μονάδες."}</p>
    ${units.filter((u) => words.some((w) => w.unit.id === u.id)).map((u) => `<h2>${esc(u.title)}</h2><table><thead><tr><th>Λέξη</th><th>Τύποι</th><th>Σημασία</th><th>Γαντζάκι</th></tr></thead><tbody>${words.filter((w) => w.unit.id === u.id).map(({ it }) => `<tr><td class="la" lang="la">${esc(it.la)}</td><td lang="la">${esc(it.forms)}${it.gender ? ` <span class="pill">${GENDERS[it.gender]}</span>` : ""}</td><td>${esc(it.el)}</td><td style="color:var(--muted)">${esc(it.hook || "")}</td></tr>`).join("")}</tbody></table>`).join("")}
    <a class="cta" href="/">Παίξε με τις λέξεις στο Carpe</a>`;
  const jsonld = [{ "@context": "https://schema.org", "@type": "DefinedTermSet", name: "Carpe: λεξιλόγιο Λατινικών Γ΄ Λυκείου", inLanguage: "el", url: `${SITE}/lexiko`, hasDefinedTerm: words.map(({ it }) => ({ "@type": "DefinedTerm", name: it.la, description: it.el, inLanguage: "la" })) }];
  return page({ title: `Λεξιλόγιο Λατινικών για τις Πανελλαδικές | ${NAME}`, desc: `Όλες οι λέξεις των μαθημάτων 16-50 που διδάσκει το Carpe, με γένος, αρχικούς χρόνους, σημασία και γαντζάκι μνήμης.`, path: "/lexiko", body, jsonld });
}

function aboutPage(units) {
  const items = units.reduce((a, u) => a + u.lessons.reduce((b, l) => b + l.items.length, 0), 0);
  const body = `<h1>Τι είναι το Carpe</h1><p class="say">Ένα παιχνίδι για τα Λατινικά της Γ΄ Λυκείου, φτιαγμένο για μία μαθήτρια που δίνει Πανελλαδικές τον Ιούνιο του 2027. Κάθε ερώτηση έχει τη μορφή και τη διατύπωση που χρησιμοποιούν τα θέματα: «τη γενική πτώση, στον άλλο αριθμό», «είναι … στο …», «να αιτιολογήσετε τον τρόπο εκφοράς».</p>
    <h2>Τι περιέχει</h2><p>${units.length} μονάδες και ${items} κάρτες: λέξεις και κείμενα (Θέμα Α1, Β2), Εισαγωγή (Β1), τύποι ονομάτων και ρημάτων (Γ1, Γ2), συντακτικοί ρόλοι, δευτερεύουσες και μετατροπές (Δ1, Δ2), και οι παγίδες της εκφώνησης.</p>
    <h2>Πώς διδάσκει</h2><ul>
      <li><b>Μάντεψε πρώτα.</b> Κάθε μάθημα ανοίγει με κάτι που δεν έχεις μάθει. Το να μαντεύεις πριν σου το πουν βοηθάει να κολλήσει.</li>
      <li><b>Εφάρμοσε τον κανόνα σε κάτι καινούργιο.</b> Μετά το dotium, σε ρωτάει το mentium.</li>
      <li><b>Επανάληψη σε αποστάσεις.</b> Οι κάρτες ξανάρχονται σε 1, 3, 7, 14, 30 και 60 μέρες· από τον Μάιο όλες πριν την εξέταση.</li>
      <li><b>Θέμα της ημέρας.</b> Κάθε μέρα ένα Θέμα των Πανελλαδικών, βαθμολογημένο με τις μονάδες του.</li>
      <li><b>Χωρίς τιμωρία.</b> Ούτε καρδιές ούτε ζωές. Τα Σαββατοκύριακα δεν σπάνε το σερί.</li></ul>
    <h2>Ακρίβεια</h2><p>Κάθε κάρτα δηλώνει πού ελέγχθηκε: στο σχολικό βιβλίο, στη Γραμματική Τζάρτζανου ή σε θέμα και κλειδί Πανελλαδικών (με τη χρονιά). Όσα δεν έχουν ελεγχθεί σημειώνονται «προς έλεγχο». Δεν λέμε «πιθανότητες»: λέμε μόνο τι ζητήθηκε στα διαγωνίσματα 2022-2026.</p>
    <h2>Δωρεάν, ανοιχτό, και τι μετράμε</h2><p>Το ${NAME} είναι δωρεάν και θα μείνει πάντα δωρεάν. Ο κώδικας είναι ανοιχτός με άδεια MIT: <a href="${REPO}">github.com/ionpetro/carpe</a>. Χωρίς λογαριασμό, χωρίς διαφημίσεις. Το μόνο που κάνουμε είναι να μετράμε ανώνυμα με το <a href="https://posthog.com">PostHog</a> πώς χρησιμοποιείται η εφαρμογή (ποια μαθήματα ξεκινάς και τελειώνεις, πού δυσκολεύεσαι) και να βλέπουμε καταγραφές συνεδριών όπου ό,τι πληκτρολογείς είναι κρυμμένο. Έτσι βρίσκουμε τι να διορθώσουμε. Η πρόοδός σου μένει στον περιηγητή σου.</p>
    <a class="cta" href="/">Ξεκίνα</a>`;
  return page({ title: `Τι είναι το ${NAME}`, desc: DESC, path: "/about", body, jsonld: [{ "@context": "https://schema.org", "@type": "AboutPage", name: `Τι είναι το ${NAME}`, inLanguage: "el", url: `${SITE}/about` }] });
}

const notFound = () => page({ title: `Δεν βρέθηκε | ${NAME}`, desc: DESC, path: "/404", body: `<h1>Errare humanum est</h1><p class="say">Αυτή η σελίδα δεν υπάρχει. Πίσω στη Via Appia.</p><a class="cta" href="/">Αρχική</a>`, jsonld: [] });

function appPage(appMarkup, units) {
  const jsonld = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: NAME, url: `${SITE}/`, description: DESC, applicationCategory: "EducationalApplication", operatingSystem: "Any (web browser)", inLanguage: "el", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" } },
    { "@context": "https://schema.org", "@type": "Course", name: `${NAME}: Λατινικά Γ΄ Λυκείου για τις Πανελλαδικές`, description: DESC, isAccessibleForFree: true, inLanguage: "el", educationalLevel: "Γ΄ Λυκείου", hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT3M" }, offers: { "@type": "Offer", price: "0", priceCurrency: "EUR", category: "Free" } },
  ];
  // The app markup carries its own head bits; drop them so the SEO head wins.
  const app = appMarkup.replace(/<title>[^<]*<\/title>\s*/, "").replace(/<meta (charset|name="(description|viewport)")[^>]*>\s*/g, "").replace(/<link rel="(preconnect|stylesheet)"[^>]*>\s*/g, "");
  const words = lexicon(units).length;
  const fallback = `<noscript><div style="max-width:640px;margin:24px auto;padding:0 16px;font-family:system-ui"><h1>${NAME}: ${TAGLINE}</h1><p>${esc(DESC)}</p><p><a href="/lexiko">Λεξιλόγιο (${words} λέξεις)</a> · <a href="/about">Τι είναι</a></p></div></noscript>`;
  const footer = `<footer class="site-foot" aria-label="Περισσότερα"><a href="/lexiko">Λεξιλόγιο</a><a href="/about">Τι είναι το Carpe</a><a href="${REPO}">Δωρεάν για πάντα · ανοιχτός κώδικας στο GitHub</a></footer>`;
  return `<!doctype html><html lang="el"><head>${head({ title: `${NAME}: Λατινικά για τις Πανελλαδικές, 3 λεπτά τη μέρα`, desc: DESC, path: "/", jsonld })}
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}[hidden]{display:none!important}img{max-width:100%}
.site-foot{max-width:560px;margin:-8px auto 0;display:flex;flex-wrap:wrap;gap:6px 16px;justify-content:center;font:700 13px/1.4 Nunito,system-ui,sans-serif;padding:0 max(16px,env(safe-area-inset-right,0px)) calc(96px + env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px))}
.site-foot a{color:var(--muted,#6b6677);text-decoration:none}.site-foot a:hover{color:var(--brand,#6d3fa6)}body:has(.lesson,.onboard) .site-foot{display:none}</style>
</head><body>${fallback}${app}${footer}</body></html>`;
}

/** Remo in a laurel wreath, as a square icon. */
function iconSvg(size = 512) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130" width="${size}" height="${size}"><rect width="130" height="130" rx="28" fill="#6d3fa6"/>
<g transform="translate(0 6)"><path d="M36 42 30 14l22 20z" fill="#5e606b"/><path d="M94 42l6-28-22 20z" fill="#5e606b"/>
<path d="M38 45q-4 24 10 36 17 10 34 0 14-12 10-36-27-18-54 0z" fill="#8d8f9a"/><path d="M48 72q17 16 34 0-6 12-17 12t-17-12z" fill="#e4e0d8"/>
<ellipse cx="65" cy="69" rx="5.5" ry="4" fill="#2b2a33"/><circle cx="54" cy="60" r="3.6" fill="#2b2a33"/><circle cx="76" cy="60" r="3.6" fill="#2b2a33"/><path d="M58 74q7 6 14 0" stroke="#2b2a33" stroke-width="2.4" fill="none" stroke-linecap="round"/>
${[...Array(9)].map((_, i) => { const t = (176 + i * 23) * Math.PI / 180; const x = 65 + 30 * Math.cos(t), y = 42 + 16 * Math.sin(t); return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="3.2" ry="6.5" fill="#c9992b" transform="rotate(${(t * 180 / Math.PI + 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; }).join("")}</g>
<text x="65" y="122" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-style="italic" font-weight="700" font-size="22" fill="#fff">Carpe</text></svg>`;
}
function ogSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630"><rect width="1200" height="630" fill="#6d3fa6"/><rect x="40" y="40" width="1120" height="550" rx="36" fill="none" stroke="#c9992b" stroke-width="6"/>
<text x="110" y="300" font-family="Cormorant Garamond, Georgia, serif" font-style="italic" font-weight="700" font-size="150" fill="#fff">Carpe</text>
<text x="110" y="390" font-family="Cormorant Garamond, Georgia, serif" font-weight="600" font-size="56" fill="#faefd3">Carpe diem. Carpe το 20.</text>
<text x="110" y="470" font-family="Nunito, system-ui, sans-serif" font-weight="700" font-size="34" fill="#efe7fa">Λατινικά για τις Πανελλαδικές, 3 λεπτά τη μέρα</text>
<g transform="translate(840 150) scale(2.4)">${iconSvg(130).replace(/^[^>]*>/, "").replace(/<rect[^>]*\/>/, "").replace(/<text[\s\S]*<\/text>/, "").replace(/<\/svg>\s*$/, "")}</g></svg>`;
}

export function buildSite(appMarkup, outDir) {
  const units = loadUnits({ example: false });
  const w = (rel, s) => { const f = new URL(rel, outDir); mkdirSync(new URL(".", f), { recursive: true }); writeFileSync(f, s); };
  w("index.html", appPage(appMarkup, units));
  w("lexiko.html", lexPage(units));
  w("about.html", aboutPage(units));
  w("404.html", notFound());
  const today = new Date().toISOString().slice(0, 10);
  w("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${["/", "/lexiko", "/about"].map((u) => `  <url><loc>${SITE}${u === "/" ? "/" : u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
  w("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
  w("favicon.svg", iconSvg(64));
  w("icon.svg", iconSvg(512));
  w("og.svg", ogSvg());
  // X and most chat apps ignore SVG previews: ship the rendered PNG from brand/og.html too
  copyFileSync(new URL("./brand/og.png", import.meta.url), new URL("og.png", outDir));
  w("manifest.webmanifest", JSON.stringify({ name: `${NAME}: ${TAGLINE}`, short_name: NAME, lang: "el", description: DESC, start_url: "/", display: "standalone", background_color: "#f7f4ee", theme_color: "#6d3fa6", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any maskable" }] }, null, 2));
  w("vercel.json", JSON.stringify({
    cleanUrls: true, trailingSlash: false,
    headers: [
      { source: "/(.*)", headers: [{ key: "X-Content-Type-Options", value: "nosniff" }, { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }, { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }] },
      { source: "/(.*)\\.(svg|webmanifest)", headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }] },
    ],
  }, null, 2));
  return lexicon(units).length;
}
