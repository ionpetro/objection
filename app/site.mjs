// Public website for Vercel: the app at "/", a crawlable "Outline" page with every rule card, an about
// page, sitemap, robots, 404, web manifest, icons and og image. PostHog analytics only when POSTHOG_KEY is set.
import { writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { loadUnits } = require("./src/course.js");
const { Engine: E } = require("./src/engine.js");

export const SITE = process.env.SITE_URL || "https://objection-bar.vercel.app";
export const REPO = process.env.REPO_URL || "https://github.com/ionpetro/objection";

// The family of free, open-source learning apps. Keep this list the same in Skepsis, Carpe, Gnothi, Objection, Agora and Oikos (app.js and site.mjs).
const FAMILY = [
  { id: "skepsis", name: "Skepsis", url: "https://skepsis-greek.vercel.app", repo: "https://github.com/ionpetro/skepsis", en: "the Greek hiding in everyday English", el: "οι ελληνικές ρίζες που κρύβονται στα αγγλικά" },
  { id: "carpe", name: "Carpe", url: "https://carpe-latin.vercel.app", repo: "https://github.com/ionpetro/carpe", en: "Latin for Greece's national exams", el: "Λατινικά για τις Πανελλαδικές" },
  { id: "gnothi", name: "Gnothi", url: "https://gnothi-greek.vercel.app", repo: "https://github.com/ionpetro/gnothi", en: "Ancient Greek for Greece's national exams", el: "Αρχαία Ελληνικά για τις Πανελλαδικές" },
  { id: "objection", name: "Objection", url: "https://objection-bar.vercel.app", repo: "https://github.com/ionpetro/objection", en: "prep for the US bar exam", el: "προετοιμασία για τις εξετάσεις δικηγόρων των ΗΠΑ" },
  { id: "agora", name: "Agora", url: "https://agora-sales-xi.vercel.app", repo: "https://github.com/ionpetro/agora", en: "sales and negotiation, with ethics", el: "πωλήσεις και διαπραγμάτευση, με ηθική" },
  { id: "oikos", name: "Oikos", url: "https://oikos-azure-five.vercel.app", repo: "https://github.com/ionpetro/oikos", en: "economics and incentives", el: "οικονομικά και κίνητρα" },
];
const SISTERS = FAMILY.filter((a) => a.id !== "objection");
const sisterHref = (a) => `${a.url}/?utm_source=objection&amp;utm_medium=sister_link`;
// PostHog (optional): set POSTHOG_KEY in app/.env. Without it no analytics code ships at all.
const POSTHOG_KEY = process.env.POSTHOG_KEY || "";
const POSTHOG_HOST = process.env.POSTHOG_HOST || "https://us.i.posthog.com";
function analytics() {
  if (!POSTHOG_KEY) return "";
  if (!/^phc_[A-Za-z0-9]+$/.test(POSTHOG_KEY)) throw new Error("POSTHOG_KEY must be a PostHog project key (phc_...)");
  // Official PostHog loader. Anonymous visitors only (no person profiles), inputs masked in replays.
  return `<script>!function(t,e){var o,n,p,r;e.__SV||(window.posthog&&window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags identify setPersonProperties group resetGroups reset get_distinct_id get_session_id alias set_config startSessionRecording stopSessionRecording captureException opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
posthog.init(${JSON.stringify(POSTHOG_KEY)},{api_host:${JSON.stringify(POSTHOG_HOST)},defaults:"2025-05-24",person_profiles:"identified_only",session_recording:{maskAllInputs:true}});
posthog.register({app:"objection",surface:"web"});</script>`;
}

const NAME = "Objection";
const TAGLINE = "Objection sustained. Bar passed.";
const DESC = "Playful prep for the MBE, the 200-question multiple-choice part of the bar exam: our own fact patterns written the way NCBE writes them, four options, the best answer, every distractor explained, in ten-minute sittings. No hearts, no penalties.";

const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,400;0,6..12,700;0,6..12,800;0,6..12,900&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,600&family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;0,7..72,700;1,7..72,400&display=swap">';
const ICONS = '<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/icon.svg"><link rel="manifest" href="/manifest.webmanifest"><meta name="theme-color" content="#1f2f52">';

function head({ title, desc, path, type = "website", jsonld = [] }) {
  const url = SITE + path;
  return `<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="${type}"><meta property="og:site_name" content="${NAME}"><meta property="og:locale" content="en_US"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${SITE}/og.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="${esc(NAME)}: ${esc(TAGLINE)}">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(desc)}"><meta name="twitter:image" content="${SITE}/og.png">
${ICONS}${FONTS}${analytics()}
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`).join("\n")}`;
}

const PAGE_CSS = `:root{--bg:#f6f1e7;--surface:#fffdf8;--ink:#1e1a16;--muted:#6f655a;--line:#ddd2bf;--brand:#1f2f52;--brand-deep:#121d36;--brand-soft:#e5eaf4;--brass:#c9962b;--brass-soft:#f8edd1;--oak:#8a5a2b;--ok:#3f7d4e;--on:#fff;color-scheme:light}
@media (prefers-color-scheme:dark){:root{--bg:#17151a;--surface:#211d22;--ink:#f1ebe2;--muted:#ada397;--line:#3a3338;--brand:#9db3e6;--brand-deep:#5d79b8;--brand-soft:#27304a;--brass:#e2b54c;--brass-soft:#3a3017;--oak:#b07a45;--ok:#7fbf8e;--on:#17151a;color-scheme:dark}}
*{box-sizing:border-box}body{margin:0;font-feature-settings:"lnum";background:var(--bg);color:var(--ink);font:17px/1.6 "Nunito Sans",system-ui,-apple-system,"Segoe UI",sans-serif;-webkit-font-smoothing:antialiased}
.wrap{max-width:760px;margin:0 auto;padding:24px max(16px,env(safe-area-inset-right,0px)) 64px max(16px,env(safe-area-inset-left,0px))}
a{color:var(--brand);font-weight:800}nav.top{display:flex;align-items:center;gap:16px;flex-wrap:wrap;padding-bottom:16px;border-bottom:1px solid var(--line)}
nav.top .brand{font-family:Fraunces,Georgia,serif;font-weight:700;font-size:28px;text-decoration:none;margin-right:auto}nav.top a{text-decoration:none;font-size:15px}
h1{font-family:Fraunces,Georgia,serif;font-size:clamp(32px,7vw,48px);line-height:1.05;margin:18px 0 6px;font-weight:700;text-wrap:balance}h2{font-family:Fraunces,Georgia,serif;font-size:24px;margin:32px 0 8px;font-weight:700}h3{margin:18px 0 6px;font-family:Fraunces,Georgia,serif;font-size:20px}
.read{font-family:Literata,Georgia,serif}
.say{font-size:19px;font-weight:700}.card{background:var(--surface);border:1px solid var(--line);border-left:4px solid var(--oak);border-radius:16px;padding:16px 18px;margin:12px 0}
.card ol{margin:6px 0 0;padding-left:22px;font-weight:700}.card .cite{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);font-weight:800}
.cta{display:inline-flex;align-items:center;gap:8px;margin-top:20px;background:var(--brand);color:var(--on);text-decoration:none;font-weight:900;padding:14px 22px;border-radius:14px;box-shadow:0 4px 0 var(--brand-deep)}
table{width:100%;border-collapse:collapse;font-size:15px}td,th{padding:8px 6px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}th{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted)}
.pill{display:inline-block;font-size:11px;font-weight:900;letter-spacing:.05em;text-transform:uppercase;padding:2px 7px;border-radius:999px;background:var(--brand-soft);color:var(--brand)}
footer{margin-top:48px;padding-top:16px;border-top:1px solid var(--line);font-size:14px;color:var(--muted)}footer a{font-weight:700}`;

const nav = () => `<nav class="top" aria-label="Site"><a class="brand" href="/">Objection</a><a href="/outline">Outline</a><a href="/about">About</a><a href="${REPO}">GitHub</a></nav>`;
const foot = () => `<footer><p>${NAME}: ${TAGLINE} Every rule is checked against the primary text (FRE, FRCP, Title 28, UCC Articles 1 and 2, the Constitution, Supreme Court opinions) or marked as under review. No NCBE question text and no commercial-outline text appears here; the fact patterns are our own. <b>${NAME} is free and always will be. The code is open (MIT): <a href="${REPO}">GitHub</a></b> (a star helps others find it). The only thing we do is measure how it's used with PostHog, so we can make it better. No account, no ads. Not affiliated with NCBE. Not legal advice. More free, open-source apps like this: ${SISTERS.map((a) => `<a href="${sisterHref(a)}">${a.name}</a> (${a.en})`).join(" · ")}</p></footer>`;
const page = ({ title, desc, path, body, jsonld, type }) => `<!doctype html><html lang="en"><head>${head({ title, desc, path, jsonld, type })}<style>${PAGE_CSS}</style></head><body><div class="wrap">${nav()}${body}${foot()}</div></body></html>`;

/** Every rule card, with its unit, for the outline page. */
export function outline(units) {
  const out = [];
  for (const u of units) for (const l of u.lessons) for (const it of l.items) if (it.kind === "rule") out.push({ it, unit: u, lesson: l });
  return out;
}
const byKind = (units, kind) => units.flatMap((u) => u.lessons.flatMap((l) => l.items.filter((it) => it.kind === kind).map((it) => ({ it, unit: u }))));

function outlinePage(units) {
  const rules = outline(units);
  const terms = byKind(units, "term"), cases = byKind(units, "case"), nums = byKind(units, "num");
  const ruleCard = ({ it }) => `<article class="card"><div class="cite">${esc(it.cite || "")}${it.status === "unsure" ? ' · <span class="pill">under review</span>' : ""}</div><h3>${esc(it.title)}</h3><p class="read">${esc(it.say)}</p><ol>${it.elements.map((e) => `<li>${esc(e)}</li>`).join("")}</ol>${(it.exceptions || []).length ? `<p style="color:var(--muted);font-weight:700;margin:8px 0 0">Exceptions: ${it.exceptions.map(esc).join(" · ")}</p>` : ""}${it.split ? `<p style="margin:8px 0 0">${Object.entries(it.split).filter(([k]) => E.SPLIT_LABELS[k]).map(([k, v]) => `<b>${esc(E.SPLIT_LABELS[k])}:</b> ${esc(v)}`).join("<br>")}</p>` : ""}</article>`;
  const body = `<h1>The outline</h1><p class="say">${rules.length ? `${rules.length} rule cards with their elements, exceptions and the rule number the exam expects, plus ${cases.length} cases, ${terms.length} terms and ${nums.length} numbers.` : "The outline fills as the units are written."} The seven MBE subjects, 25 scored questions each, under the law NCBE's outline names.</p>
    ${units.filter((u) => rules.some((r) => r.unit.id === u.id)).map((u) => `<h2>${esc(u.title)}</h2>${u.assume ? `<p class="read" style="color:var(--muted)"><b>Assume:</b> ${esc(u.assume)}</p>` : ""}${rules.filter((r) => r.unit.id === u.id).map(ruleCard).join("")}`).join("")}
    ${cases.length ? `<h2>Cases</h2><table><thead><tr><th>Case</th><th>Holding</th></tr></thead><tbody>${cases.map(({ it }) => `<tr><td><b>${esc(it.name)}</b> (${it.year})</td><td class="read">${esc(it.holding)}</td></tr>`).join("")}</tbody></table>` : ""}
    ${terms.length ? `<h2>Terms</h2><table><thead><tr><th>Term</th><th>Meaning</th></tr></thead><tbody>${terms.map(({ it }) => `<tr><td><b class="read">${esc(it.term)}</b>${it.literal ? `<br><span style="color:var(--muted);font-size:13px">${esc(it.literal)}</span>` : ""}</td><td class="read">${esc(it.meaning)}</td></tr>`).join("")}</tbody></table>` : ""}
    ${nums.length ? `<h2>Numbers that get tested</h2><table><thead><tr><th>Question</th><th>Answer</th></tr></thead><tbody>${nums.map(({ it }) => `<tr><td>${esc(it.ask)}</td><td><b>${esc(it.answer)}</b></td></tr>`).join("")}</tbody></table>` : ""}
    <a class="cta" href="/">Drill them in Objection</a>`;
  const jsonld = [{ "@context": "https://schema.org", "@type": "DefinedTermSet", name: "Objection: MBE rule outline", inLanguage: "en", url: `${SITE}/outline`, hasDefinedTerm: rules.map(({ it }) => ({ "@type": "DefinedTerm", name: it.title, description: it.say, inLanguage: "en" })) }];
  return page({ title: `MBE outline: every rule, element and number | ${NAME}`, desc: "Every rule Objection drills for the MBE: elements in order, exceptions, majority and minority positions, the rule numbers, the cases and the numbers that get tested.", path: "/outline", body, jsonld });
}

function aboutPage(units) {
  const items = units.reduce((a, u) => a + u.lessons.reduce((b, l) => b + l.items.length, 0), 0);
  const body = `<h1>What Objection is</h1><p class="say">A game for the Multistate Bar Examination, built for a stressed law graduate with 8-12 weeks. Every question has the shape the examiners use: a fact pattern with no names, one call, four options, the best answer, and a reason every distractor is wrong.</p>
    <h2>What it covers</h2><p>${units.length} units and ${items} cards across the seven MBE subjects (Civil Procedure, Constitutional Law, Contracts, Criminal Law and Procedure, Evidence, Real Property, Torts: 25 scored questions each), plus a skills unit on reading the call, the vocabulary of the exam, and the traps. The weights inside each subject follow NCBE's own subject matter outline and nothing finer.</p>
    <h2>How it teaches</h2><ul>
      <li><b>Spot the issue first.</b> Every lesson opens with a question you have not been taught. Guessing before the rule makes the rule stick.</li>
      <li><b>New facts, same rule.</b> After the lesson's hypo comes one you have never seen that turns on the same rule.</li>
      <li><b>Verdict, then reason.</b> The Yes/No grid: the reason, not the result, is the answer.</li>
      <li><b>Spaced review.</b> Cards come back at 1, 3, 7, 14, 30 and 60 days; in the last two weeks every card comes forward.</li>
      <li><b>Question of the Day, Mini-MBE, Cross-Examination.</b> Exam pace, per-subject scores, and the distractor types you fall for.</li>
      <li><b>No punishment.</b> No hearts, no lives; weekends never break a streak.</li></ul>
    <h2>Accuracy</h2><p>Every card says where its rule was checked: the FRE, FRCP, Title 28, UCC Articles 1 and 2, the Constitution, a Restatement section, a Supreme Court opinion, or NCBE's own outline. Cards that have not been verified against primary text say "under review" and never appear in the Question of the Day or the mocks. We do not invent statistics; the only weights shown are NCBE's own fractions, in NCBE's words.</p>
    <h2>Which exam</h2><p>The legacy MBE is given through February 2028. In February and July 2027 most jurisdictions still sit it; about 22 will have moved to the NextGen UBE by July 2027. Seven of NextGen's eight concepts are the MBE subjects under the same law, so Objection carries over; it does not yet cover Business Associations, integrated question sets or performance tasks. Confirm your dates and exam with your board.</p>
    <h2>Free, open, and what we count</h2><p>${NAME} is free and always will be. No account, no ads. We count anonymously with <a href="https://posthog.com">PostHog</a> how the app is used (which lessons start and finish, where people get stuck) and watch session recordings where everything typed is hidden, to find what to fix. Your progress stays in your browser. The code is open under the MIT license: <a href="${REPO}">${REPO.replace("https://", "")}</a>.</p>
    <h2>The family</h2><p>${NAME} is one of six free, open-source learning apps, each one a short daily game:</p><ul>${FAMILY.map((a) => `<li>${a.id === "objection" ? `<b>${a.name}</b>` : `<a href="${sisterHref(a)}">${a.name}</a>`}: ${a.en} (<a href="${a.repo}">code</a>)</li>`).join("")}</ul><p>If one helps you, a star on GitHub helps other people find it.</p>
    <a class="cta" href="/">Open the docket</a>`;
  return page({ title: `About ${NAME}`, desc: DESC, path: "/about", body, jsonld: [{ "@context": "https://schema.org", "@type": "AboutPage", name: `About ${NAME}`, inLanguage: "en", url: `${SITE}/about` }] });
}

const notFound = () => page({ title: `Not found | ${NAME}`, desc: DESC, path: "/404", body: `<h1>Overruled</h1><p class="say">This page does not exist. Back to the docket.</p><a class="cta" href="/">Home</a>`, jsonld: [] });

function appPage(appMarkup, units) {
  const jsonld = [
    { "@context": "https://schema.org", "@type": "WebApplication", name: NAME, url: `${SITE}/`, description: DESC, applicationCategory: "EducationalApplication", operatingSystem: "Any (web browser)", inLanguage: "en", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    { "@context": "https://schema.org", "@type": "Course", name: `${NAME}: MBE prep`, description: DESC, isAccessibleForFree: true, inLanguage: "en", educationalLevel: "Law graduate", hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT10M" }, offers: { "@type": "Offer", price: "0", priceCurrency: "USD", category: "Free" } },
  ];
  // The app markup carries its own head bits; drop them so the SEO head wins.
  const app = appMarkup.replace(/<title>[^<]*<\/title>\s*/, "").replace(/<meta (charset|name="(description|viewport)")[^>]*>\s*/g, "").replace(/<link rel="(preconnect|stylesheet)"[^>]*>\s*/g, "");
  const n = outline(units).length;
  const fallback = `<noscript><div style="max-width:640px;margin:24px auto;padding:0 16px;font-family:system-ui"><h1>${NAME}: ${TAGLINE}</h1><p>${esc(DESC)}</p><p><a href="/outline">Outline (${n} rules)</a> · <a href="/about">About</a></p></div></noscript>`;
  const footer = `<footer class="site-foot" aria-label="More"><a href="/outline">Outline</a><a href="/about">About ${NAME}</a><a href="${REPO}">Free forever · open source on GitHub</a>${SISTERS.map((a) => `<a href="${sisterHref(a)}">Sister app: ${a.name}</a>`).join("")}</footer>`;
  return `<!doctype html><html lang="en"><head>${head({ title: `${NAME}: MBE prep, ten minutes a day`, desc: DESC, path: "/", jsonld })}
<style>:root{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}[hidden]{display:none!important}img{max-width:100%}
.site-foot{max-width:560px;margin:-8px auto 0;display:flex;flex-wrap:wrap;gap:6px 16px;justify-content:center;font:700 13px/1.4 "Nunito Sans",system-ui,sans-serif;padding:0 max(16px,env(safe-area-inset-right,0px)) calc(96px + env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px))}
.site-foot a{color:var(--muted,#6f655a);text-decoration:none}.site-foot a:hover{color:var(--brand,#1f2f52)}body:has(.lesson,.onboard) .site-foot{display:none}</style>
</head><body>${fallback}${app}${footer}</body></html>`;
}

/** Amicus in his bow tie, as a square icon. */
export function iconSvg(size = 512) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130" width="${size}" height="${size}"><rect width="130" height="130" rx="28" fill="#1f2f52"/>
<g transform="translate(0 4)"><ellipse cx="65" cy="108" rx="46" ry="5" fill="#2c3d63"/><path d="M102 92q14 4 20-6t2-16" stroke="#9d7a4f" stroke-width="6" stroke-linecap="round" fill="none"/><ellipse cx="65" cy="84" rx="42" ry="25" fill="#9d7a4f"/><path d="M27 72q38 12 76 0M25 82q40 13 80 0M29 93q36 11 72 0" stroke="#6f4f2c" stroke-width="3.2" fill="none" stroke-linecap="round" opacity="0.85"/><ellipse cx="44" cy="103" rx="9" ry="5" fill="#c7a77c"/><ellipse cx="86" cy="103" rx="9" ry="5" fill="#c7a77c"/><path d="M38 105v3M44 106v3M50 105v3M80 105v3M86 106v3M92 105v3" stroke="#2b2420" stroke-width="1.6" stroke-linecap="round" opacity="0.6"/><ellipse cx="50" cy="26" rx="5.2" ry="11" transform="rotate(-14 50 26)" fill="#c7a77c"/><ellipse cx="80" cy="26" rx="5.2" ry="11" transform="rotate(14 80 26)" fill="#c7a77c"/><ellipse cx="50.5" cy="27" rx="2.4" ry="7" transform="rotate(-14 50.5 27)" fill="#d98a7e" opacity="0.55"/><ellipse cx="79.5" cy="27" rx="2.4" ry="7" transform="rotate(14 79.5 27)" fill="#d98a7e" opacity="0.55"/><path d="M44 44q0-20 21-20t21 20q0 20-14 34q-4 5-7 7q-3-2-7-7q-14-14-14-34z" fill="#c7a77c"/><path d="M46 37q19-11 38 0l-1.5 4.5q-17.5-9.5-35 0z" fill="#9d7a4f"/><path d="M48.5 31.5q16.5-8.5 33 0" stroke="#6f4f2c" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.8"/><path d="M54 62q11-6 22 0q-1 14-11 22q-10-8-11-22z" fill="#e8d8bd"/><ellipse cx="65" cy="72" rx="4.6" ry="3.4" fill="#2b2420"/><circle cx="63.6" cy="71" r="1.1" fill="#fff" opacity="0.7"/><circle cx="56" cy="50" r="3.2" fill="#2b2420"/><circle cx="74" cy="50" r="3.2" fill="#2b2420"/><circle cx="57.2" cy="48.8" r="1.1" fill="#fff"/><circle cx="75.2" cy="48.8" r="1.1" fill="#fff"/><path d="M59.5 78.5q5.5 4.5 11 0" stroke="#2b2420" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M53 88l12 3.5 12-3.5v9l-12-3.5-12 3.5z" fill="#1f2f52"/><circle cx="65" cy="92" r="2.6" fill="#c9962b"/></g>
<text x="65" y="124" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="20" fill="#fff">Objection</text></svg>`;
}
export function ogSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630"><rect width="1200" height="630" fill="#1f2f52"/><rect x="40" y="40" width="1120" height="550" rx="36" fill="none" stroke="#c9962b" stroke-width="6"/>
<text x="110" y="290" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="140" fill="#fff">Objection</text>
<text x="110" y="380" font-family="Fraunces, Georgia, serif" font-style="italic" font-weight="600" font-size="52" fill="#f8edd1">Objection sustained. Bar passed.</text>
<text x="110" y="460" font-family="Nunito Sans, system-ui, sans-serif" font-weight="700" font-size="32" fill="#e5eaf4">MBE prep the way the examiners write it, ten minutes a day</text>
<g transform="translate(840 150) scale(2.4)">${iconSvg(130).replace(/^[^>]*>/, "").replace(/<rect[^>]*\/>/, "").replace(/<text[\s\S]*<\/text>/, "").replace(/<\/svg>\s*$/, "")}</g></svg>`;
}

export function buildSite(appMarkup, outDir) {
  const units = loadUnits({ example: false });
  const w = (rel, s) => { const f = new URL(rel, outDir); mkdirSync(new URL(".", f), { recursive: true }); writeFileSync(f, s); };
  w("index.html", appPage(appMarkup, units));
  w("outline.html", outlinePage(units));
  w("about.html", aboutPage(units));
  w("404.html", notFound());
  const today = new Date().toISOString().slice(0, 10);
  w("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${["/", "/outline", "/about"].map((u) => `  <url><loc>${SITE}${u === "/" ? "/" : u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
  w("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
  w("favicon.svg", iconSvg(64));
  w("icon.svg", iconSvg(512));
  w("og.svg", ogSvg());
  // X and most chat apps ignore SVG previews: ship the rendered PNG (brand/og.png, rendered from og.svg) when it exists
  const png = new URL("./brand/og.png", import.meta.url);
  if (existsSync(png)) copyFileSync(png, new URL("og.png", outDir));
  w("manifest.webmanifest", JSON.stringify({ name: `${NAME}: ${TAGLINE}`, short_name: NAME, lang: "en", description: DESC, start_url: "/", display: "standalone", background_color: "#f6f1e7", theme_color: "#1f2f52", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any maskable" }] }, null, 2));
  w("vercel.json", JSON.stringify({
    cleanUrls: true, trailingSlash: false,
    headers: [
      { source: "/(.*)", headers: [{ key: "X-Content-Type-Options", value: "nosniff" }, { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }, { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }] },
      { source: "/(.*)\\.(svg|webmanifest)", headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }] },
    ],
  }, null, 2));
  return outline(units).length;
}
