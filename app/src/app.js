// UI for "Objection". Depends on globals OBJECTION_UNITS (src/units/*.js) and Engine (engine.js).
(() => {
  "use strict";
  const E = Engine;
  const IX = E.indexCourse(typeof OBJECTION_UNITS !== "undefined" ? OBJECTION_UNITS : []);
  const LS_KEY = "objection:v1";

  // ---------- helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const today = () => E.dayKey();
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const seed = () => Math.floor(Math.random() * 2 ** 31);
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
  const LETTERS = ["A", "B", "C", "D"];
  const mmss = (ms) => { const s = Math.max(0, Math.round(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; };

  /** Product analytics. Only the public website loads PostHog (see site.mjs); elsewhere this does nothing. */
  function track(event, props = {}) {
    try { if (window.posthog && typeof window.posthog.capture === "function") window.posthog.capture(event, props); } catch { /* analytics must never break the app */ }
  }
  // ---------- sister apps ----------
  /** The family of free, open-source learning apps. Keep this list the same in Skepsis, Carpe, Gnothi, Objection, Agora and Oikos (app.js and site.mjs). */
  const FAMILY = [
    { id: "skepsis", name: "Skepsis", url: "https://skepsis-greek.vercel.app", repo: "https://github.com/ionpetro/skepsis", en: "the Greek hiding in everyday English", el: "οι ελληνικές ρίζες που κρύβονται στα αγγλικά" },
    { id: "carpe", name: "Carpe", url: "https://carpe-latin.vercel.app", repo: "https://github.com/ionpetro/carpe", en: "Latin for Greece's national exams", el: "Λατινικά για τις Πανελλαδικές" },
    { id: "gnothi", name: "Gnothi", url: "https://gnothi-greek.vercel.app", repo: "https://github.com/ionpetro/gnothi", en: "Ancient Greek for Greece's national exams", el: "Αρχαία Ελληνικά για τις Πανελλαδικές" },
    { id: "objection", name: "Objection", url: "https://objection-bar.vercel.app", repo: "https://github.com/ionpetro/objection", en: "prep for the US bar exam", el: "προετοιμασία για τις εξετάσεις δικηγόρων των ΗΠΑ" },
    { id: "agora", name: "Agora", url: "https://agora-sales-xi.vercel.app", repo: "https://github.com/ionpetro/agora", en: "sales and negotiation, with ethics", el: "πωλήσεις και διαπραγμάτευση, με ηθική" },
    { id: "oikos", name: "Oikos", url: "https://oikos-azure-five.vercel.app", repo: "https://github.com/ionpetro/oikos", en: "economics and incentives", el: "οικονομικά και κίνητρα" },
  ];
  /** Links to the other apps in the family, tagged so each app's analytics shows where visitors came from. */
  const sisterLinks = () => FAMILY.filter((a) => a.id !== "objection").map((a) => `<a href="${a.url}/?utm_source=objection&utm_medium=sister_link" target="_blank" rel="noopener" data-sister="${a.id}">${a.name}</a> (${a.en})`).join(" · ");
  const sisterNote = () => `<p class="sister">More free, open-source apps like this: ${sisterLinks()}</p>`;
  const REPO = "https://github.com/ionpetro/objection";
  const ghLink = (cls, where, inner) => (REPO ? `<a class="${cls}" href="${REPO}" target="_blank" rel="noopener" data-gh="${where}" aria-label="The Objection code on GitHub">${inner}</a>` : "");
  const FREE_NOTE = "Objection is free and always will be. The code is open (MIT). The only thing we do is measure how it's used with PostHog, so we can make it better. No account, no ads; your progress stays in this browser.";

  // ---------- GitHub star prompt ----------
  // Asked on the lesson-finished screen, never as a pop-up (same rules as Skepsis): ask after the
  // first finished lesson; if "Not now", ask once more on a later day after a perfect lesson
  // or the daily goal. Never more than twice, never again after a click.
  const STAR_KEY = "objection-star-v1";
  const starState = () => { try { return JSON.parse(localStorage.getItem(STAR_KEY) || "{}") || {}; } catch { return {}; } };
  const saveStar = (st) => { try { localStorage.setItem(STAR_KEY, JSON.stringify(st)); } catch { /* storage blocked: we just may ask again */ } };
  /** Counts this finished lesson and returns why to ask now ("first_lesson", "perfect", "daily_goal"), or null. */
  function starMoment({ perfect, goalHit }) {
    const st = starState();
    st.lessons = (st.lessons || 0) + 1;
    let why = null;
    if (!st.clicked && (st.asks || 0) === 0) why = "first_lesson";
    else if (!st.clicked && st.asks === 1 && st.lastAsk !== today() && (perfect || goalHit)) why = perfect ? "perfect" : "daily_goal";
    if (why) { st.asks = (st.asks || 0) + 1; st.lastAsk = today(); }
    saveStar(st);
    return why ? { why, lessons: st.lessons, ask: st.asks } : null;
  }
  const starCard = () => `<div class="starask" id="starask" role="note">
      <div class="starask-text"><b>Enjoying Objection?</b><span>It's free and open source. A star on GitHub helps other people find it.</span></div>
      <div class="starask-btns"><a class="btn gh-cta" id="star-go" href="${REPO}" target="_blank" rel="noopener">${I.github}<span>Star it on GitHub</span></a><button class="btn ghost" type="button" id="star-later">Not now</button></div>
    </div>`;
  function bindStarCard(star) {
    track("star_prompt_shown", { trigger: star.why, lessons: star.lessons, ask: star.ask });
    $("#star-go").addEventListener("click", () => { const st = starState(); st.clicked = true; saveStar(st); track("star_prompt_clicked", { trigger: star.why, lessons: star.lessons, ask: star.ask }); track("github_clicked", { where: "star_prompt" }); $("#starask").remove(); });
    $("#star-later").addEventListener("click", () => { track("star_prompt_dismissed", { trigger: star.why, lessons: star.lessons, ask: star.ask }); $("#starask").remove(); $("#next") && $("#next").focus(); });
  }

  // ---------- icons ----------
  const I = {
    github: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
    flame: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 3.5-1.6 5.3-2.9 7.3C7.6 11.5 7 13 7 14.6 7 18.1 9.3 21 12 21s5-2.6 5-6.2c0-2.1-.9-3.7-2-5 .1 1.6-.5 2.8-1.6 3.3.5-3.6-.6-7.6-1.4-11.1z"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 4 6v6c0 4.5 3.4 7.6 8 9 4.6-1.4 8-4.5 8-9V6z"/><path d="M12 7v10M8 12h8"/></svg>',
    gavel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14 4 6 6M8 10l6-6M10 12l-7 7M12 6l6 6M3 21h8"/></svg>',
    scales: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v18M6 21h12M4 8h16M6 8l-3 7h6zM18 8l-3 7h6z"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z"/></svg>',
    bench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11h18v3H3zM5 14v6M19 14v6M8 11V6h8v5"/></svg>',
    redo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    paper: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h6M9 16h6"/></svg>',
    cards: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="6" width="12" height="15" rx="2"/><path d="M8 3h11a1 1 0 0 1 1 1v13"/></svg>',
    mic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/></svg>',
    flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4h12l-2 4 2 4H5"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 2.9 6.6 7.1.7-5.4 4.8 1.6 7L12 17.5 5.8 21.1l1.6-7L2 9.3l7.1-.7z"/></svg>',
  };
  const amicusIcon = `<span style="color:var(--brand)">${I.scales}</span>`;
  /** A brass seal with a letter, for badges. */
  function seal(letter) {
    return `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" fill="var(--brass)"/><circle cx="24" cy="24" r="17" fill="none" stroke="var(--brass-deep)" stroke-width="2" stroke-dasharray="3 2"/><text x="24" y="31" text-anchor="middle" font-family="Fraunces, Georgia, serif" font-weight="700" font-size="20" fill="#1d1500">${esc(letter)}</text></svg>`;
  }

  /** Amicus, the armadillo in a bow tie. mood: happy | sad | cheer | robe | sleepy */
  function mascot(mood = "happy") {
    const sad = mood === "sad", sleepy = mood === "sleepy";
    // Eyes sit high on a long face; the snout runs down to the nose.
    const eyes = sleepy
      ? '<path d="M52 50q4 3 8 0M70 50q4 3 8 0" stroke="var(--m-ink)" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
      : sad
        ? '<path d="M51 48.5q4-4.5 9-2.5M70 46q5-2 9 2.5" stroke="var(--m-ink)" stroke-width="2.2" fill="none" stroke-linecap="round"/><circle cx="56" cy="52" r="2.4" fill="var(--m-ink)"/><circle cx="74" cy="52" r="2.4" fill="var(--m-ink)"/>'
        : '<circle cx="56" cy="50" r="3.2" fill="var(--m-ink)"/><circle cx="74" cy="50" r="3.2" fill="var(--m-ink)"/><circle cx="57.2" cy="48.8" r="1.1" fill="#fff"/><circle cx="75.2" cy="48.8" r="1.1" fill="#fff"/>';
    const mouth = sad
      ? '<path d="M60 82q5-3.5 10 0" stroke="var(--m-ink)" stroke-width="2.2" fill="none" stroke-linecap="round"/>'
      : mood === "cheer"
        ? '<path d="M58.5 78q6.5 7.5 13 0z" fill="var(--m-ink)"/><path d="M62 80.5q3 3 6 0z" fill="var(--m-tongue)"/>'
        : sleepy ? '<path d="M60 79.5q5 2 10 0" stroke="var(--m-ink)" stroke-width="2.2" fill="none" stroke-linecap="round"/>'
          : '<path d="M59.5 78.5q5.5 4.5 11 0" stroke="var(--m-ink)" stroke-width="2.2" fill="none" stroke-linecap="round"/>';
    // Amicus, front view: a big banded shell, a long face that narrows to a snout with the nose at its tip, tall oval
    // ears up top, a banded plate on the forehead, a tail curling out to the right, a bow tie under the chin.
    const bands = '<path d="M27 72q38 12 76 0M25 82q40 13 80 0M29 93q36 11 72 0" stroke="var(--m-band)" stroke-width="3.2" fill="none" stroke-linecap="round" opacity="0.85"/>';
    const arms = mood === "cheer"
      ? '<path d="M30 78q-12-8-8-24" stroke="var(--m-skin)" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M100 78q12-8 8-24" stroke="var(--m-skin)" stroke-width="7" stroke-linecap="round" fill="none"/>'
      : '<ellipse cx="44" cy="103" rx="9" ry="5" fill="var(--m-skin)"/><ellipse cx="86" cy="103" rx="9" ry="5" fill="var(--m-skin)"/><path d="M38 105v3M44 106v3M50 105v3M80 105v3M86 106v3M92 105v3" stroke="var(--m-ink)" stroke-width="1.6" stroke-linecap="round" opacity="0.6"/>';
    const robe = mood === "robe" ? '<path d="M32 90q33 14 66 0v18H32z" fill="#1a1a1f"/><path d="M58 90h14l-7 12z" fill="#fff"/>' : "";
    const zz = sleepy ? '<text x="98" y="30" font-family="Fraunces, Georgia, serif" font-style="italic" font-weight="700" font-size="14" fill="var(--muted)">z z</text>' : "";
    return `<svg class="mascot" viewBox="0 0 130 116" role="img" aria-label="Amicus, the armadillo">
      <ellipse cx="65" cy="108" rx="46" ry="5" fill="var(--line)"/>
      <path d="M102 92q14 4 20-6t2-16" stroke="var(--m-shell)" stroke-width="6" stroke-linecap="round" fill="none"/>
      <ellipse cx="65" cy="84" rx="42" ry="25" fill="var(--m-shell)"/>
      ${bands}
      ${arms}
      <ellipse cx="50" cy="26" rx="5.2" ry="11" transform="rotate(-14 50 26)" fill="var(--m-skin)"/><ellipse cx="80" cy="26" rx="5.2" ry="11" transform="rotate(14 80 26)" fill="var(--m-skin)"/>
      <ellipse cx="50.5" cy="27" rx="2.4" ry="7" transform="rotate(-14 50.5 27)" fill="var(--m-tongue)" opacity="0.55"/><ellipse cx="79.5" cy="27" rx="2.4" ry="7" transform="rotate(14 79.5 27)" fill="var(--m-tongue)" opacity="0.55"/>
      <path d="M44 44q0-20 21-20t21 20q0 20-14 34q-4 5-7 7q-3-2-7-7q-14-14-14-34z" fill="var(--m-skin)"/>
      <path d="M46 37q19-11 38 0l-1.5 4.5q-17.5-9.5-35 0z" fill="var(--m-shell)"/><path d="M48.5 31.5q16.5-8.5 33 0" stroke="var(--m-band)" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.8"/>
      <path d="M54 62q11-6 22 0q-1 14-11 22q-10-8-11-22z" fill="var(--m-belly)"/>
      <ellipse cx="65" cy="72" rx="4.6" ry="3.4" fill="var(--m-ink)"/><circle cx="63.6" cy="71" r="1.1" fill="#fff" opacity="0.7"/>
      ${eyes}${mouth}
      <path d="M53 88l12 3.5 12-3.5v9l-12-3.5-12 3.5z" fill="var(--brand)"/><circle cx="65" cy="92" r="2.6" fill="var(--brass)"/>
      ${robe}${zz}
    </svg>`;
  }

  // ---------- sound ----------
  let actx = null;
  function tone(freqs, dur = 0.09, type = "triangle", gap = 0.07, vol = 0.12) {
    if (!S.sound) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      freqs.forEach((f, i) => {
        const o = actx.createOscillator(), g = actx.createGain();
        o.type = type; o.frequency.value = f;
        const t0 = actx.currentTime + i * gap;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        o.connect(g).connect(actx.destination);
        o.start(t0); o.stop(t0 + dur + 0.02);
      });
    } catch { /* audio is optional */ }
  }
  const sfx = { right: () => tone([660, 990]), wrong: () => tone([196, 147], 0.16, "square", 0.1, 0.05), done: () => tone([523, 659, 784, 1047], 0.14, "triangle", 0.09), tick: () => tone([880], 0.03, "sine", 0, 0.04), gavel: () => tone([110, 90], 0.08, "square", 0.05, 0.08) };
  const buzz = (ms) => { try { navigator.vibrate && navigator.vibrate(ms); } catch { /* optional */ } };

  function confetti() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = document.createElement("canvas");
    c.id = "confetti"; document.body.appendChild(c);
    const ctx = c.getContext("2d"); const dpr = window.devicePixelRatio || 1;
    c.width = innerWidth * dpr; c.height = innerHeight * dpr; ctx.scale(dpr, dpr);
    const css = getComputedStyle(document.documentElement);
    const cols = ["--brass", "--brand", "--ok", "--flame", "--bad"].map((v) => css.getPropertyValue(v).trim());
    const ps = [...Array(110)].map(() => ({ x: innerWidth / 2 + (Math.random() - 0.5) * 120, y: innerHeight * 0.35, vx: (Math.random() - 0.5) * 11, vy: -Math.random() * 12 - 4, s: 5 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: pick(cols) }));
    let f = 0;
    (function step() {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (const p of ps) { p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.vx *= 0.99; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); ctx.restore(); }
      if (++f < 150) requestAnimationFrame(step); else c.remove();
    })();
  }
  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast"; t.setAttribute("role", "status"); t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }

  // ---------- state ----------
  function loadLocal() {
    try { const raw = localStorage.getItem(LS_KEY); if (raw) return Object.assign(E.freshState(), JSON.parse(raw)); } catch { /* storage can be blocked */ }
    return E.freshState();
  }
  let S = loadLocal();
  /** Progress numbers PostHog attaches to every event, so any event can be cut by how far along someone is. */
  function progressProps() {
    return { xp: S.xp, streak: S.streak, best_streak: S.bestStreak, goal_xp: S.goal, lessons_done: Object.keys(S.done || {}).length, answered: S.answered, correct: S.correct,
      accuracy_all: S.answered ? Math.round((S.correct / S.answered) * 100) / 100 : null, days_active: Object.keys(S.days || {}).length,
      cross_exam_best: S.crossExamBest, mocks_taken: (S.mocks || []).length, onboarded: !!S.onboarded, sits: S.sits, focus: S.focus || null, rank: E.rankOf(S).rank.id };
  }
  function syncProgress() {
    try { if (window.posthog && typeof window.posthog.register === "function") window.posthog.register(progressProps()); } catch { /* optional */ }
  }
  const dayGap = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 864e5);
  const VISIT_KEY = "objection.visit";
  /** Once per page load: new or returning, where they first came from, days to the exam, and whether the streak broke. */
  function trackAppOpened() {
    if (!window.posthog) return;
    let v = {};
    try { v = JSON.parse(localStorage.getItem(VISIT_KEY) || "{}") || {}; } catch { /* storage can be blocked */ }
    const t = today();
    const qs = new URLSearchParams(location.search);
    const campaign = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "ref"]) if (qs.get(k)) campaign[k] = qs.get(k);
    let refHost = null;
    try { refHost = document.referrer ? new URL(document.referrer).hostname : null; } catch { /* bad referrer */ }
    if (refHost === location.hostname) refHost = null;
    const firstVisit = !v.first;
    if (firstVisit) { v.first = t; v.source = campaign.utm_source || campaign.ref || refHost || "direct"; }
    const daysSinceLast = v.last ? dayGap(v.last, t) : null;
    v.last = t;
    try { localStorage.setItem(VISIT_KEY, JSON.stringify(v)); } catch { /* fine */ }
    try { window.posthog.register({ first_source: v.source, first_seen: v.first }); } catch { /* optional */ }
    syncProgress();
    const streakLost = S.streak > 0 && E.liveStreak(S, t) === 0;
    track("app_opened", { first_visit: firstVisit, days_since_last_visit: daysSinceLast, referrer_host: refHost, ...campaign, streak_lost: streakLost, entry_tab: location.hash.slice(1) || null, days_to_exam: S.examDate ? dayGap(t, S.examDate) : null });
    if (streakLost) track("streak_lost", { lost_streak: S.streak, last_active: S.lastDay });
  }
  function trackDayProgress(prevTodayXp, st) {
    const now = S.days[today()] || 0;
    if (prevTodayXp < S.goal && now >= S.goal) track("daily_goal_reached", { goal_xp: S.goal, today_xp: now });
    if (st && st.streakUp) track("streak_extended", { streak: S.streak, best_streak: S.bestStreak, used_freeze: st.usedFreeze > 0 });
  }
  const runProps = () => (run ? { mode: run.mode, node_id: run.node ? run.node.id : null, unit_id: run.node ? run.node.unitId || null : null, sitting: run.sitting ?? null, steps: run.steps.length, size: run.size || null } : {});
  const stepProps = (q) => ({ step_index: run ? run.i : null, q_type: q.type, item_id: q.itemId || (q.itemIds || [])[0] || null, item_ids: q.itemIds || null, subject: q.subject || null, guess: !!q.guess, requeued: run ? run.requeued.has(run.i) : false, label: q.label || null });

  function save() {
    S.updatedAt = Date.now();
    try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch { /* private mode: progress lives for this session only */ }
  }

  // ---------- UI state ----------
  const ui = { tab: "learn", overlay: null, lexFilter: "all", lexQuery: "", confirmReset: false };
  const TABS = [{ id: "learn", label: "Docket", icon: I.gavel }, { id: "lex", label: "Outline", icon: I.book }, { id: "me", label: "Chambers", icon: I.bench }];
  function setTab(id) { if (id !== ui.tab) track("tab_viewed", { tab: id }); ui.tab = id; if (location.hash !== `#${id}`) history.replaceState(null, "", `#${id}`); render(); scrollTo(0, 0); }
  addEventListener("hashchange", () => { const h = location.hash.slice(1); if (TABS.some((t) => t.id === h) && h !== ui.tab) { ui.tab = h; render(); } });
  const app = () => $("#app");

  function topbar() {
    const t = today(), st = E.liveStreak(S, t), active = S.lastDay === t;
    return `<header class="topbar">
      <div class="wordmark">Objection<small>SUSTAINED</small></div>
      <div class="stats">
        <span class="stat flame ${active ? "" : "cold"}" title="${active ? "Your streak is safe for today" : "Do one sitting to keep the streak"}">${I.flame}<span>${st}</span></span>
        <span class="stat" title="Continuances (streak freezes)" style="color:var(--brand)">${I.shield}<span>${S.freezes}</span></span>
        <span class="stat xp" title="Billable minutes">${I.clock}<span>${S.xp}</span></span>
      </div>
      ${ghLink("gh", "topbar", `${I.github}<span class="gh-label">GitHub</span>`)}
    </header>`;
  }
  function tabbar() {
    return `<nav class="tabbar" aria-label="Sections"><div class="tabbar-inner">${TABS.map((t) => `<button class="tab" data-tab="${t.id}" ${ui.tab === t.id ? 'aria-current="page"' : ""}>${t.icon}<span>${t.label}</span></button>`).join("")}</div></nav>`;
  }
  function siteNote() { return `<footer class="sitenote">${sisterNote()}<p><b>${FREE_NOTE}</b></p>${ghLink("btn ghost gh-cta", "footer", `${I.github}<span>Star it on GitHub</span>`)}<p class="sitenote-sub">A star helps other people find it.</p><p>Every card says where its rule was checked (FRE, FRCP, Title 28, UCC, the Constitution, a Supreme Court opinion). Cards still under review say so. Objection drills the MBE; it is not legal advice and it is not affiliated with NCBE.</p></footer>`; }

  function render() {
    if (!S.onboarded) { app().innerHTML = onboarding(); bindOnboarding(); return; }
    const body = { learn: learnView, lex: lexView, me: meView }[ui.tab]();
    app().innerHTML = topbar() + `<main class="view">${body}${siteNote()}</main>` + tabbar();
    bindCommon();
  }

  // ---------- onboarding ----------
  function onboarding() {
    return `<div class="onboard">
      ${mascot("cheer")}
      <h1>Objection</h1>
      <p class="tag-line">Objection sustained. Bar passed.</p>
      <p class="lede">I'm Amicus. We'll drill the MBE the way the examiners write it: real fact patterns, four options, the best answer, in sittings of ten minutes. No hearts, no penalties, and weekends never break a streak.</p>
      <div class="card col">
        <h3>What should I call you?</h3>
        <input type="text" id="ob-name" placeholder="Your name" value="${esc(S.name)}" autocomplete="given-name" maxlength="30">
        <h3>How much each day?</h3>
        <div class="goalopts">${E.GOALS.map((g) => `<button class="goalopt" data-goal="${g.xp}" aria-pressed="${S.goal === g.xp}"><b>${g.label}</b><small>${g.sub}</small></button>`).join("")}</div>
        <h3>When do you sit?</h3>
        <div class="goalopts">${E.EXAM_PRESETS.map((p) => `<button class="goalopt" data-exam="${p.date}" aria-pressed="${S.examDate === p.date}"><b>${p.label.replace(", 20", " '")}</b><small>${p.note.split(";")[0]}</small></button>`).join("")}</div>
      </div>
      <button class="btn block gold" id="ob-go">Open the docket</button>
      <p class="muted" style="text-align:center;font-size:13px;font-weight:700">Prep companies commonly recommend 400-500 hours over 8-10 weeks. Objection is the 30 minutes a day that make the rest stick. Progress stays on this device.</p>
      <footer class="sitenote"><p>${FREE_NOTE}</p>${ghLink("btn ghost gh-cta", "onboarding", `${I.github}<span>The code on GitHub</span>`)}</footer>
    </div>`;
  }
  function bindOnboarding() {
    $$("[data-goal]").forEach((b) => b.addEventListener("click", () => { S.goal = +b.dataset.goal; S.name = $("#ob-name").value.trim(); render(); }));
    $$("[data-exam]").forEach((b) => b.addEventListener("click", () => { S.examDate = b.dataset.exam; S.name = $("#ob-name").value.trim(); render(); }));
    $$("[data-gh]").forEach((a) => a.addEventListener("click", () => track("github_clicked", { where: a.dataset.gh })));
    $("#ob-go").addEventListener("click", () => { S.name = $("#ob-name").value.trim(); S.onboarded = true; save(); track("onboarding_completed", { goal: S.goal, exam_date: S.examDate }); render(); const n = E.nextNode(IX, S); if (n) startNode(n); });
  }

  // ---------- docket (learn) tab ----------
  function ruleOfDay() {
    const pool = IX.byKind.rule.length ? IX.byKind.rule : IX.byKind.term;
    if (!pool.length) return null;
    return pool[(Math.abs(E.daysBetween("2026-01-01", today())) * 7) % pool.length];
  }
  const greetings = ["Ten minutes on the docket?", "One sitting keeps the streak alive.", "The call of the question first. Always.", "Every sitting is a rep. Let's lift."];
  function learnView() {
    const t = today();
    const todayXp = S.days[t] || 0;
    const pct = Math.min(1, todayXp / S.goal);
    const C = 2 * Math.PI * 24;
    const next = E.nextNode(IX, S);
    const due = E.dueItems(S, t).length;
    const learned = Object.keys(S.items).length;
    const cd = E.countdown(S, t);
    const daily = S.dailies[t];
    const rod = ruleOfDay();
    const name = S.name ? `${S.name}, ` : "";
    const late = new Date().getHours() >= 23;
    const greet = late && cd.days <= 14 ? `${name}the exam is in the morning; so is the law. Sleep.` : todayXp >= S.goal ? `${name}goal billed for today. Sustained.` : S.lastDay === t ? `${name}good work. A little more reaches today's goal.` : `${name}${name ? (g => g.charAt(0).toLowerCase() + g.slice(1))(pick(greetings)) : pick(greetings)}`;
    const seg = cd.phase.id === "foundations" ? 1 : cd.phase.id === "discovery" ? 2 : 3;
    const left = E.remainingSittings(IX, S);
    const perDay = cd.days > 0 ? Math.ceil((left / cd.days) * 2) / 2 : 0;
    const paceLine = left === 0 ? "Every courtroom is done: review only from here." : cd.days > 0 ? `To finish every unit by then: ~${perDay} sittings a day, about ${Math.ceil((perDay * 5) / 5) * 5} minutes.` : "";
    const nb = E.notebookItems(S).length;
    const mockOpen = (Object.keys(S.done).length >= 1 || Object.keys(S.sittings).length >= 1) && learned >= 10; // one finished sitting is enough: a lesson can take 2-3
    const sessionOpen = Object.keys(S.done).filter((k) => k.endsWith("-review")).length >= 4;
    return `
      <section class="hero">${mascot(late && cd.days <= 14 ? "sleepy" : todayXp >= S.goal ? "cheer" : "happy")}<div class="bubble">${esc(greet.charAt(0).toUpperCase() + greet.slice(1))}</div></section>
      ${S.sits === "nextgen" ? `<section class="banner">NextGen candidate: Objection drills the seven MBE subjects that NextGen also tests. It does not cover Business Associations, integrated question sets or performance tasks yet.</section>` : ""}
      <section class="countdown">
        <div class="n tnum">${cd.days >= 0 ? cd.days : 0}<small>${cd.days === 1 ? "day" : "days"}</small></div>
        <div><div class="ph">to ${esc(cd.label)}<b>${esc(cd.phase.label)} · ${esc(cd.phase.sub)}</b></div>
          <div class="road">${[1, 2, 3].map((k) => `<i class="${k <= seg ? "on" : ""}"></i>`).join("")}</div>
          ${paceLine ? `<div class="pace">${esc(paceLine)}</div>` : ""}<div class="pace">${esc(cd.note)}.</div></div>
      </section>
      <section class="card goalring">
        <svg viewBox="0 0 58 58" aria-hidden="true"><circle class="track" cx="29" cy="29" r="24" fill="none" stroke-width="8"/><circle class="fill" cx="29" cy="29" r="24" fill="none" stroke-width="8" stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C * (1 - pct)).toFixed(1)}"/></svg>
        <div style="flex:1;min-width:0"><div class="eyebrow">Today's goal</div><h3 class="tnum">${todayXp} / ${S.goal} billable minutes</h3><p class="muted" style="font-weight:700;font-size:14px">${E.isWeekend(t) ? "Weekend: optional, the streak is safe." : "Weekends never break the streak."}</p></div>
        ${next ? `<button class="btn" data-start="${next.id}">${Object.keys(S.done).length || Object.keys(S.sittings).length ? "Continue" : "Start"}</button>` : ""}
      </section>
      <section class="quick">
        <button class="tile ${daily ? "done" : ""}" data-act="daily"><span style="color:var(--brand)">${I.cal}</span><b>Question of the Day</b><span>${daily ? `today: ${daily.score}/${daily.total}` : `${esc(E.subjectLabel(E.DAILY_BY_WEEKDAY[E.weekday(t)]))} · 5 questions, 9 minutes`}</span></button>
        <button class="tile" data-act="practice" ${learned < 3 ? "disabled" : ""}><span style="color:var(--ok)">${I.redo}</span><b>Review</b><span>${learned < 3 ? "Opens after your first sitting" : due ? `${plural(due, "card", "cards")} due today` : "Strengthen the weak boxes"}</span></button>
        <button class="tile" data-act="cross"><span style="color:var(--flame)">${I.mic}</span><b>Cross-Examination</b><span>15 s a question · best ${S.crossExamBest}</span></button>
        <button class="tile" data-act="mock" ${mockOpen ? "" : "disabled"}><span style="color:var(--brass-deep)">${I.paper}</span><b>Mini-MBE</b><span>${mockOpen ? "25 questions, 45 minutes" : "Opens after your first sitting and 10 cards"}</span></button>
        <button class="tile" data-act="swipe"><span style="color:var(--brand)">${I.cards}</span><b>Flash review</b><span>25 cards in 2 minutes</span></button>
        <button class="tile" data-act="notebook" ${!nb ? "disabled" : ""}><span style="color:var(--bad)">${I.book}</span><b>Overruled</b><span>${nb ? plural(nb, "card", "cards") + " in the notebook" : "Your missed cards land here"}</span></button>
        ${sessionOpen ? `<button class="tile" data-act="session"><span style="color:var(--brass-deep)">${I.bench}</span><b>Session</b><span>100 questions, 3 hours</span></button>` : ""}
      </section>
      ${rod ? `<section class="card wotd col" style="gap:6px">
        <div class="eyebrow">Rule of the day${rod.cite ? ` · ${esc(rod.cite)}` : ""}</div>
        <div class="big">${esc(rod.title || rod.term)}</div>
        <p style="font-weight:800">${esc(rod.say)}</p>
        ${rod.elements ? `<p class="muted" style="font-weight:700">${rod.elements.map(esc).join(" · ")}</p>` : rod.meaning ? `<p class="muted" style="font-weight:700">${esc(rod.meaning)}</p>` : ""}
      </section>` : ""}
      ${courthouse()}`;
  }

  /** The courthouse: one door per unit, a stone per lesson, the closing argument last. */
  function courthouse() {
    if (!IX.course.units.length) return `<section class="card empty">${mascot("sad")}<h3>No units yet</h3><p class="muted">Units are written in app/src/units/.</p></section>`;
    const nodes = E.pathNodes(IX);
    const next = E.nextNode(IX, S);
    return `<section class="via"><h2>Courthouse</h2>${IX.course.units.map((u, i) => {
      const uNodes = nodes.filter((n) => n.unitId === u.id);
      const pr = E.unitProgress(IX, S, u.id);
      const started = pr.done > 0 || uNodes.some((n) => S.sittings[n.id]);
      const focus = S.focus && u.subject === S.focus;
      return `<div class="milestone">
        <div class="mile ${pr.done === pr.total ? "done" : started ? "open" : ""}" title="Courtroom ${i + 1}">${i + 1}</div>
        <div class="ucard ${focus ? "focus" : ""}">
          <div class="row" style="justify-content:space-between;align-items:flex-start"><h2>${esc(u.title)}</h2><div class="exam-tags"><span class="tag">${esc(E.subjectLabel(u.subject))}</span>${(u.exam || []).includes("nextgen") ? "" : '<span class="tag">MBE only</span>'}${focus ? '<span class="tag focus">this week</span>' : ""}</div></div>
          <p>${esc(u.blurb)}</p>
          <div class="ubar"><i style="width:${pr.total ? (pr.done / pr.total) * 100 : 0}%"></i></div>
          <div class="stones">${uNodes.map((n) => {
            const done = !!S.done[n.id]; const open = E.isUnlocked(IX, S, n.id); const cur = next && next.id === n.id;
            const sits = n.kind === "lesson" ? E.lessonSittings(IX, n.id).length : 1; const did = S.sittings[n.id] || 0;
            return `<button class="stone ${n.kind === "roundup" ? "boss" : ""} ${done ? "done" : open ? "" : "locked"} ${cur ? "current" : ""}" ${open ? `data-start="${n.id}"` : "disabled"} title="${esc(n.title)}" aria-label="${esc(n.title)}${done ? " (done)" : open ? "" : " (locked)"}">${done ? I.check.replace('aria-hidden="true"', 'aria-hidden="true" width="22" height="22"') : n.letter}${sits > 1 && !done ? `<span class="sit">${did}/${sits}</span>` : ""}</button>`;
          }).join("")}</div>
        </div></div>`;
    }).join("")}</section>`;
  }

  // ---------- outline tab ----------
  const LEX_FILTERS = [["all", "All"], ["rule", "Rules"], ["hypo", "Hypos"], ["case", "Cases"], ["term", "Terms"], ["num", "Numbers"], ["trap", "Traps"], ["notebook", "Overruled"], ["learned", "Learned"]];
  function lexView() {
    const q = E.norm(ui.lexQuery);
    const nb = new Set(E.notebookItems(S));
    const items = [...IX.items.values()].filter((it) => {
      const f = ui.lexFilter;
      if (["rule", "hypo", "case", "term", "num", "trap"].includes(f) && it.kind !== f) return false;
      if (f === "notebook" && !nb.has(it.id)) return false;
      if (f === "learned" && !S.items[it.id]) return false;
      return !q || E.norm(JSON.stringify(it)).includes(q);
    });
    return `
      <section class="col" style="gap:6px"><div class="eyebrow">Outline</div><h1>Everything Objection teaches</h1><p class="muted" style="font-weight:700">Rules with their elements and numbers, the hypos that test them, cases, terms, numbers and traps. Every card says where it was checked.</p></section>
      <input class="search" id="lex-q" type="search" placeholder="Search: hearsay, 1441, habit, Erie…" value="${esc(ui.lexQuery)}" aria-label="Search">
      <div class="chips" role="group" aria-label="Filter">${LEX_FILTERS.map(([k, l]) => `<button class="fchip" data-filter="${k}" aria-pressed="${ui.lexFilter === k}">${l}</button>`).join("")}</div>
      <section class="lex">${items.length ? items.slice(0, 200).map(lexCard).join("") : `<div class="card empty">${mascot("sad")}<p class="muted">Nothing found. Try another word.</p></div>`}${items.length > 200 ? `<p class="muted" style="text-align:center;font-weight:700">Showing the first 200. Narrow the search.</p>` : ""}</section>`;
  }
  function statusPill(it) {
    const st = it.status === "exam" ? '<span class="pill exam">NCBE says so</span>' : it.status === "unsure" ? '<span class="pill unsure">under review</span>' : it.status === "general" ? '<span class="pill">black letter</span>' : '<span class="pill">primary text</span>';
    const extra = `${it.recent ? '<span class="pill unsure">new in 2025/26</span>' : ""}${it.lawVersion ? `<span class="pill">${esc(it.lawVersion)}</span>` : ""}`;
    return `${st}${extra}${S.items[it.id] ? '<span class="pill learned">learned</span>' : ""}`;
  }
  function lexCard(it) {
    const head = it.kind === "rule" ? `<b>${esc(it.title)}</b>${it.cite ? `<span class="m">${esc(it.cite)}</span>` : ""}`
      : it.kind === "hypo" || it.kind === "argue" ? `<b style="font-size:17px">${esc(it.issue || it.call)}</b><span class="m">${esc(E.subjectLabel(it.subject))} · ${esc(it.call)}</span>`
      : it.kind === "case" ? `<b>${esc(it.name)}</b><span class="m">${it.year}</span>`
      : it.kind === "term" ? `<b class="serif">${esc(it.term)}</b><span class="m">${esc(it.meaning)}</span>`
      : it.kind === "num" ? `<b style="font-size:17px">${esc(it.ask)}</b><span class="m">${esc(it.answer)}</span>`
      : it.kind === "steps" ? `<b>${esc(it.title)}</b><span class="m">${it.steps.length} steps</span>`
      : it.kind === "pairs" ? `<b>${esc(it.set || "Match set")}</b><span class="m">${it.pairs.length} pairs</span>`
      : it.kind === "sort" ? `<b>${esc(it.q)}</b><span class="m">${it.buckets.join(" / ")}</span>`
      : `<b style="font-size:16px">${esc(it.stem)}</b><span class="m"><span class="struck">${esc(it.wrong)}</span> → ${esc(it.right)}</span>`;
    const body = it.kind === "rule" ? `<p class="ex">${it.elements.map(esc).join(" · ")}</p>` : it.kind === "case" ? `<p class="ex">${esc(it.holding)}</p>` : "";
    return `<article class="card lexcard"><div class="lexhead">${head}</div>${body}<p class="say">${esc(it.say)}</p>${it.hook ? `<p class="ex">${esc(it.hook)}</p>` : ""}<div class="row" style="justify-content:space-between;flex-wrap:wrap"><div class="pills">${statusPill(it)}</div><span class="muted" style="font-size:12px;font-weight:700">${esc(E.cleanSrc(it.src))}</span></div></article>`;
  }

  // ---------- chambers (me) tab ----------
  function meView() {
    const t = today();
    const learned = Object.keys(S.items).length;
    const acc = S.answered ? Math.round((S.correct / S.answered) * 100) : 0;
    const total = IX.items.size;
    const lastMock = S.mocks[S.mocks.length - 1];
    const rk = E.rankOf(S);
    const traps = E.topTraps(S, t);
    const subjectOpts = [["", "No subject in focus"]].concat(E.SUBJECTS.map((s) => [s.id, s.label]));
    return `
      <section class="hero">${mascot()}<div class="bubble">${learned ? `You have met ${learned} of ${total} cards.` : "Do one lesson to start the collection."}${lastMock ? ` Last mock: ${Math.round(lastMock.score)}/${lastMock.total}.` : ""}</div></section>
      <section class="card rank"><div><div class="eyebrow">Rank</div><h2 class="serif">${esc(rk.rank.name)}</h2><p class="muted" style="font-weight:700;font-size:14px">${rk.next ? `${rk.toNext === 1 ? "1 billable minute" : `${rk.toNext} billable minutes`} to ${esc(rk.next.name)}` : "The highest bench there is."}</p></div><div><div class="eyebrow">Billed this week</div><h2 class="tnum">${E.fmtMinutes(E.weekXp(S, t))}</h2></div></section>
      <section class="grid2">
        ${[["Billable minutes", S.xp], ["Best streak", plural(S.bestStreak, "day", "days")], ["Accuracy", `${acc}%`], ["Cross-Examination", S.crossExamBest], ["Questions of the Day", Object.keys(S.dailies).length], ["Mocks", S.mocks.length]].map(([h, v]) => `<div class="card"><div class="eyebrow">${h}</div><h2 class="tnum">${v}</h2></div>`).join("")}
      </section>
      ${traps.length ? `<section class="card col" style="gap:6px"><div class="eyebrow">Your top trap this week</div><h3>${esc(E.TRAP_TYPES[traps[0][0]])} (${traps[0][1]})</h3><p class="muted" style="font-weight:700;font-size:14px">${traps.slice(1, 4).map(([k, n]) => `${esc(E.TRAP_TYPES[k])} (${n})`).join(" · ")}</p></section>` : ""}
      <section class="col"><h2>Badges</h2><div class="badges">${E.BADGES.map((b) => `<div class="badge ${S.badges[b.id] ? "" : "off"}">${seal(b.name[0])}<b>${esc(b.name)}</b><span>${esc(b.desc)}</span></div>`).join("")}</div></section>
      <section class="card">
        <div class="setting"><div><label for="set-name">Name</label><small>How Amicus greets you</small></div><input type="text" id="set-name" value="${esc(S.name)}" maxlength="30"></div>
        <div class="setting" style="flex-direction:column;align-items:stretch"><label>Daily goal</label><div class="goalopts">${E.GOALS.map((g) => `<button class="goalopt" data-goal="${g.xp}" aria-pressed="${S.goal === g.xp}"><b>${g.label}</b><small>${g.sub}</small></button>`).join("")}</div></div>
        <div class="setting" style="flex-direction:column;align-items:stretch"><label>Exam date</label><div class="goalopts">${E.EXAM_PRESETS.map((p) => `<button class="goalopt" data-exam="${p.date}" aria-pressed="${S.examDate === p.date}"><b>${p.label.replace(", 20", " '")}</b><small>${p.note.split(";")[0]}</small></button>`).join("")}</div><div class="row" style="margin-top:8px;justify-content:space-between"><small class="muted" style="font-weight:700">Custom date. The July 2027 date is derived from NCBE's last-Wednesday rule; confirm with your board.</small><input type="date" id="set-exam" value="${esc(E.examDate(S))}"></div></div>
        <div class="setting"><div><label for="set-sits">I sit</label><small>NextGen candidates see what carries over</small></div><select id="set-sits"><option value="mbe" ${S.sits === "mbe" ? "selected" : ""}>MBE (legacy UBE)</option><option value="nextgen" ${S.sits === "nextgen" ? "selected" : ""}>NextGen UBE</option></select></div>
        <div class="setting"><div><label for="set-focus">This week I'm on</label><small>Steers Continue and the flash cards</small></div><select id="set-focus">${subjectOpts.map(([v, l]) => `<option value="${v}" ${S.focus === v ? "selected" : ""}>${esc(l)}</option>`).join("")}</select></div>
        <div class="setting"><div><label for="set-sound">Sounds</label><small>Chimes and the gavel</small></div><input type="checkbox" class="switch" id="set-sound" ${S.sound ? "checked" : ""}></div>
        <div class="setting"><div><label>Continuances: ${S.freezes}</label><small>One free each week; another every 7-day streak (up to 2). A missed weekday uses one.</small></div></div>
        <div class="setting"><div><label>Start over</label><small>Erases the progress on this device</small></div>${ui.confirmReset ? `<div class="row"><button class="btn clay small" id="reset-yes">Erase</button><button class="btn ghost small" id="reset-no">Keep</button></div>` : `<button class="btn ghost small" id="reset">Reset</button>`}</div>
      </section>`;
  }

  // ---------- wiring ----------
  function bindCommon() {
    const root = app();
    $$("[data-gh]", root).forEach((a) => a.addEventListener("click", () => track("github_clicked", { where: a.dataset.gh })));
    $$("[data-sister]", root).forEach((a) => a.addEventListener("click", () => track("sister_app_clicked", { to: a.dataset.sister })));
    $$("[data-tab]", root).forEach((b) => b.addEventListener("click", () => setTab(b.dataset.tab)));
    $$("[data-start]", root).forEach((b) => b.addEventListener("click", () => startNode(E.pathNodes(IX).find((n) => n.id === b.dataset.start))));
    $$("[data-goal]", root).forEach((b) => b.addEventListener("click", () => { const from = S.goal; S.goal = +b.dataset.goal; if (from !== S.goal) track("goal_changed", { from_xp: from, to_xp: S.goal }); save(); render(); }));
    $$("[data-exam]", root).forEach((b) => b.addEventListener("click", () => { S.examDate = b.dataset.exam; track("setting_changed", { setting: "exam_date", value: S.examDate }); save(); render(); }));
    $$("[data-filter]", root).forEach((b) => b.addEventListener("click", () => { ui.lexFilter = b.dataset.filter; render(); }));
    const act = (a, fn) => { const el = root.querySelector(`[data-act="${a}"]`); if (el) el.addEventListener("click", fn); };
    act("practice", () => startRun("practice"));
    act("notebook", () => startRun("notebook"));
    act("daily", () => startRun("daily"));
    act("swipe", () => startRun("swipe"));
    act("cross", () => startCross());
    act("mock", () => startMock(25));
    act("session", () => startMock(100));
    const q = $("#lex-q");
    if (q) q.addEventListener("input", (e) => { clearTimeout(ui.lexTimer); const v = e.target.value.trim(); ui.lexTimer = setTimeout(() => { if (v) track("outline_searched", { query: v.slice(0, 40), filter: ui.lexFilter || null }); }, 1200); ui.lexQuery = e.target.value; const pos = e.target.selectionStart; render(); const n = $("#lex-q"); n.focus(); n.setSelectionRange(pos, pos); });
    const on = (id, ev, fn) => { const el = $(id); if (el) el.addEventListener(ev, fn); };
    on("#set-name", "change", (e) => { S.name = e.target.value.trim(); save(); });
    on("#set-exam", "change", (e) => { if (/^\d{4}-\d{2}-\d{2}$/.test(e.target.value)) { track("setting_changed", { setting: "exam_date", value: e.target.value }); S.examDate = e.target.value; save(); render(); } });
    on("#set-sits", "change", (e) => { S.sits = e.target.value === "nextgen" ? "nextgen" : "mbe"; track("setting_changed", { setting: "sits", value: S.sits }); save(); });
    on("#set-focus", "change", (e) => { S.focus = e.target.value; track("setting_changed", { setting: "focus", value: S.focus || null }); save(); });
    on("#set-sound", "change", (e) => { S.sound = e.target.checked; track("setting_changed", { setting: "sound", value: S.sound }); save(); });
    on("#reset", "click", () => { ui.confirmReset = true; render(); });
    on("#reset-no", "click", () => { ui.confirmReset = false; render(); });
    on("#reset-yes", "click", () => { track("progress_reset", progressProps()); const keep = { sound: S.sound, name: S.name }; S = Object.assign(E.freshState(), keep); ui.confirmReset = false; save(); render(); });
  }

  // ---------- runner ----------
  let run = null;
  function startNode(node) {
    if (!node) return;
    if (node.kind === "roundup") startRun("roundup", node);
    else startRun("lesson", node);
  }
  function startRun(mode, node = null) {
    const sd = seed();
    let steps = [], meta = {};
    if (mode === "lesson") { const sit = S.sittings[node.id] || 0; const total = E.lessonSittings(IX, node.id).length; steps = E.buildLesson(IX, S, node.id, sd, Math.min(sit, total - 1)); meta = { sitting: Math.min(sit, total - 1), sittings: total }; }
    else if (mode === "roundup") steps = E.buildRoundup(IX, S, node.unitId, sd);
    else if (mode === "practice") steps = E.buildPractice(IX, S, sd);
    else if (mode === "notebook") { const r = E.rng(sd); steps = E.notebookItems(S).map((id) => IX.items.get(id)).filter(Boolean).slice(0, 10).map((it) => E.qReview(IX, it, r, S)).filter(Boolean); }
    else if (mode === "daily") { const d = E.buildDaily(IX, S, today()); steps = d.steps; meta = { daily: d }; }
    else if (mode === "swipe") { const sw = E.buildSwipe(IX, S, sd); steps = sw ? [sw] : []; }
    if (!steps.length) { toast("Nothing to do here yet"); return; }
    track("lesson_started", { mode, node_id: node ? node.id : null, unit_id: node ? node.unitId || null : null, steps: steps.length });
    run = { mode, node, steps, i: 0, misses: 0, combo: 0, maxCombo: 0, right: 0, scored: 0, requeued: new Set(), answered: false, start: Date.now(), results: [], ...meta };
    ui.overlay = "lesson";
    if (mode === "daily") introScreen(`Question of the Day · ${esc(meta.daily.title)}`, `${plural(steps.length, "question", "questions")} at exam pace, about ${meta.daily.minutes} minutes. The same set all day if you reopen it. Answers are explained as you go.`, "Begin");
    else drawStep();
  }
  function introScreen(title, text, btn, mood = "happy") {
    shell(`<div class="results">${mascot(mood)}<h1>${title}</h1><p class="story" style="max-width:38ch">${text}</p></div>`, footerBtn(btn, "gold"));
    $("#next").addEventListener("click", drawStep);
  }
  function closeRun() {
    run = null; ui.overlay = null;
    const o = $(".lesson"); if (o) o.remove();
    const qb = $(".quitbox"); if (qb) qb.remove();
    document.body.classList.remove("run-open");
    clearTimeout(timer); clearInterval(mockTimer);
    render();
  }
  /** X or Escape. A run with graded answers asks first; Cross-Examination and an untouched run just close. */
  function requestClose() {
    const quitProps = () => ({ ...runProps(), at_step: run.i, answered: run.scored, right: run.right, seconds: Math.round((Date.now() - run.start) / 1000) });
    const untouched = run.mode === "mock" ? !run.choices.some((c) => c != null) : run.scored === 0;
    if (run && !run.finished && run.mode !== "cross" && untouched) track("lesson_quit", quitProps());
    if (!run || run.finished || run.mode === "cross" || untouched) return closeRun();
    if ($(".quitbox")) return;
    const box = document.createElement("div");
    box.className = "quitbox"; box.setAttribute("role", "alertdialog"); box.setAttribute("aria-label", "Leave the sitting");
    box.innerHTML = `<div class="card"><p>${run.mode === "mock" ? "Leave the mock? Nothing is scored until you submit." : "Leaving? What you answered counts for review, but the sitting stays unfinished."}</p><div class="row"><button class="btn ghost" id="quit-stay">Stay</button><button class="btn clay" id="quit-go">Leave</button></div></div>`;
    document.body.appendChild(box);
    $("#quit-stay").addEventListener("click", () => box.remove());
    $("#quit-go").addEventListener("click", () => { track("lesson_quit", quitProps()); save(); closeRun(); });
    box.addEventListener("click", (e) => { if (e.target === box) box.remove(); });
    $("#quit-stay").focus();
  }
  function shell(inner, footer = "") {
    let o = $(".lesson");
    if (!o) { o = document.createElement("div"); o.className = "lesson"; o.setAttribute("role", "dialog"); o.setAttribute("aria-modal", "true"); document.body.appendChild(o); document.body.classList.add("run-open"); }
    const prog = run.mode === "cross" ? 100 : (run.i / run.steps.length) * 100;
    const top = run.mode === "cross" ? `<div style="flex:1;font-weight:900">Cross-Examination · <span class="tnum">${run.right}</span> ${run.right === 1 ? "witness" : "witnesses"}</div>`
      : run.mode === "mock" ? `<div class="progress" aria-hidden="true"><i style="width:${prog}%"></i></div><span class="combo tnum" id="mock-clock">${run.finished ? "" : mmss(run.deadline - Date.now())}</span>`
      : `<div class="progress" aria-hidden="true"><i style="width:${prog}%"></i></div><span class="combo">${run.combo >= 3 ? `${I.flame.replace("<svg", '<svg width="14" height="14"')} ${run.combo}` : ""}</span>`;
    o.innerHTML = `<div class="lesson-inner">
        <div class="lesson-top"><button class="xbtn" id="quit" aria-label="Leave">${I.x}</button>${top}</div>
        ${run.mode === "cross" ? '<div class="timer"><i id="timer"></i></div>' : ""}
        <div class="stage" id="stage">${inner}</div>
      </div><div class="footer" id="footer">${footer}</div>`;
    $("#quit").addEventListener("click", requestClose);
    return o;
  }
  const footerBtn = (label, cls = "", id = "next", disabled = false) => `<div class="footer-inner"><button class="btn block ${cls}" id="${id}" ${disabled ? "disabled" : ""}>${label}</button></div>`;

  function drawStep() {
    if (run.i >= run.steps.length) return finishRun();
    run.answered = false;
    const q = run.steps[run.i];
    run.stepAt = Date.now();
    track("lesson_step_viewed", { ...runProps(), ...stepProps(q) });
    const draw = { intro: drawIntro, mcq: drawMcq, tf: drawTf, hypo: drawHypo, grid: drawGrid, build: drawBuild, match: drawMatch, bucket: drawBucket, find: drawFind, spot: drawSpot, type: drawType, swipe: drawSwipe }[q.type];
    if (draw) draw(q); else advance();
  }
  function advance() { run.i += 1; drawStep(); }
  function header(q) {
    const marks = q.marks && run.mode !== "mock" ? `<span class="marks">${q.subject ? esc(E.subjectLabel(q.subject)) : ""}</span>` : "";
    return `<div class="qlabel ${q.guess ? "guess" : ""}">${esc(q.label)}${q.guess ? " · no penalty" : ""}${marks}</div>`;
  }
  /** Highlight a phrase inside text (case-insensitive, first match). */
  function hl(text, w) {
    if (!w) return esc(text);
    const i = text.toLowerCase().indexOf(String(w).toLowerCase());
    if (i < 0) return esc(text);
    return `${esc(text.slice(0, i))}<span class="hl">${esc(text.slice(i, i + w.length))}</span>${esc(text.slice(i + w.length))}`;
  }
  const wordBlock = (q) => (q.word ? `<div class="bigword ${q.word.length > 18 ? "sentence" : ""}">${hl(q.word, q.hl)}</div>${q.sub ? `<div class="sub">${esc(q.sub)}</div>` : ""}` : "") + (q.stem ? `<div class="stemblock">${esc(q.stem)}</div>` : "");

  // ---------- intro cards ----------
  function drawIntro(q) {
    const pills = (arr) => `<div class="pills">${arr.filter(Boolean).map((p) => `<span class="pill">${esc(p)}</span>`).join("")}</div>`;
    let inner = "";
    if (q.kind === "assume") {
      const u = IX.unitOf(q.unitId);
      inner = `<div class="qlabel">Controlling law · ${esc(E.subjectLabel(u.subject))}</div><h1>${esc(u.title)}</h1><div class="rulebox"><b>Assume:</b> ${esc(u.assume)}</div><p class="story">${esc(u.blurb)}</p>${pills((u.exam || []).includes("nextgen") ? ["MBE", "NextGen"] : ["MBE only"])}`;
      shell(`<div class="intro">${inner}</div>`, footerBtn("Noted"));
      $("#next").addEventListener("click", advance); $("#next").focus();
      return;
    }
    const it = IX.items.get(q.itemId);
    E.learn(S, it.id, today());
    const k = it.kind;
    const prov = [it.recent ? "New in 2025/26: probably not scored on your 2027 MBE" : null, it.lawVersion ? `Law version ${it.lawVersion}` : null, it.status === "unsure" ? "Under review" : null, it.assume ? `Assume: ${it.assume}` : null];
    if (k === "rule") {
      const split = it.split ? Object.entries(it.split).filter(([key]) => E.SPLIT_LABELS[key]).map(([key, v]) => `<div class="ex"><b>${esc(E.SPLIT_LABELS[key])}</b><span>${esc(v)}</span></div>`).join("") : "";
      inner = `<div class="qlabel">Rule${it.cite ? ` · ${esc(it.cite)}` : ""}</div><h1>${esc(it.title)}</h1><p class="story" style="font-weight:800">${esc(it.say)}</p>
        <div class="rulebox"><b>${it.ordered === false ? "Elements" : "Elements, in order"}:</b><ol class="steplist" style="margin-top:6px">${it.elements.map((e) => `<li>${esc(e)}</li>`).join("")}</ol></div>
        ${(it.exceptions || []).length ? `<div class="trapbox"><b>Exceptions and limits:</b> ${it.exceptions.map(esc).join(" · ")}</div>` : ""}
        ${split ? `<div class="exlist">${split}</div>${it.splitNote ? `<p class="muted" style="font-weight:700">${esc(it.splitNote)}</p>` : ""}` : ""}
        ${(it.numbers || []).length ? `<div class="exlist">${it.numbers.map((n) => `<div class="ex"><b>${esc(n.value)}</b><span>${esc(n.label)}</span></div>`).join("")}</div>` : ""}
        <div class="exlist">${(it.ex || []).map((e) => `<div class="ex"><span>${esc(e.facts)}</span><b>${esc(e.result)}</b></div>`).join("")}</div>
        ${it.hook ? `<div class="hookbox">${amicusIcon}<span>${esc(it.hook)}</span></div>` : ""}${pills((it.terms || []).concat(prov))}`;
    } else if (k === "steps") {
      inner = `<div class="qlabel">Decision tree</div><h1>${esc(it.title)}</h1><ol class="steplist">${it.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol><p class="story">${esc(it.say)}</p>${pills(prov)}`;
    } else if (k === "case") {
      inner = `<div class="qlabel">Case · ${esc(E.subjectLabel(it.subject))}</div><div class="headline"><span class="bigword sentence">${esc(it.name)}</span><span class="sub">${it.year}</span></div>
        <p class="meaning" style="font-size:19px">${esc(it.holding)}</p>${it.facts ? `<p class="story">${esc(it.facts)}</p>` : ""}
        ${it.overrules ? `<div class="trapbox"><b>Replaces:</b> ${esc(it.overrules)}</div>` : ""}${it.overruledBy ? `<div class="trapbox"><b>No longer good law:</b> replaced by ${esc(it.overruledBy)}</div>` : ""}
        <p class="muted" style="font-weight:800">In one breath: ${esc(it.say)}</p>${pills(prov)}`;
    } else if (k === "term") {
      const LANG = { latin: "Latin", french: "Law French", english: "Term of art" };
      inner = `<div class="qlabel">${esc(LANG[it.lang] || "Term")}</div><div class="headline"><span class="bigword">${esc(it.term)}</span>${it.literal ? `<span class="sub">literally: ${esc(it.literal)}</span>` : ""}</div>
        <p class="meaning">${esc(it.meaning)}</p>${it.use ? `<div class="rulebox"><b>On the exam:</b> ${esc(it.use)}</div>` : ""}${it.hook ? `<div class="hookbox">${amicusIcon}<span>${esc(it.hook)}</span></div>` : ""}${it.pairWith ? `<p class="muted" style="font-weight:700">Contrast with: ${esc(it.pairWith)}</p>` : ""}${pills(prov)}`;
    } else if (k === "num") {
      inner = `<div class="qlabel">The number</div><p class="prompt">${esc(it.ask)}</p><div class="bigword">${esc(it.answer)}</div><p class="story">${esc(it.say)}</p>${pills(prov)}`;
    } else if (k === "trap") {
      inner = `<div class="qlabel">Trap · ${esc(E.TRAP_TYPES[it.cat] || E.SELF_TAGS[it.cat] || it.cat)}</div><div class="stemblock">${esc(it.stem)}</div><div class="answerbox"><span class="struck">${esc(it.wrong)}</span></div><div class="answerbox ok">${esc(it.right)}</div><p class="story">${esc(it.why)}</p>${pills(prov)}`;
    }
    shell(`<div class="intro">${inner}${it.say && k !== "rule" && k !== "case" ? `<p class="muted" style="font-weight:800">In one breath: ${esc(it.say)}</p>` : ""}<p class="muted" style="font-size:12px;font-weight:700">Checked: ${esc(E.cleanSrc(it.src))}</p></div>`, footerBtn("Got it"));
    $("#next").addEventListener("click", advance);
    $("#next").focus();
  }

  // ---------- mcq / tf ----------
  function drawMcq(q) {
    const inner = `${header(q)}<p class="prompt">${q.prompt}</p>${wordBlock(q)}<div class="options" role="group">${q.options.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${i + 1}</span><span>${esc(o)}</span></button>`).join("")}</div>`;
    shell(inner, "");
    $$(".opt").forEach((b) => b.addEventListener("click", () => answerMcq(q, +b.dataset.i)));
    if (run.mode === "cross") startTimer(() => answerMcq(q, -1));
  }
  function answerMcq(q, idx) {
    if (run.answered) return;
    run.answered = true;
    const ok = idx >= 0 && q.options[idx] === q.answer;
    $$(".opt").forEach((b, i) => { b.disabled = true; if (q.options[i] === q.answer) b.classList.add("right"); else if (i === idx) b.classList.add("wrong"); else b.classList.add("dim"); });
    resolve(q, ok, idx < 0 ? "Time's up." : null);
  }
  function drawTf(q) {
    const inner = `${header(q)}<p class="prompt">${esc(q.prompt)}</p>${wordBlock(q)}<div class="tfrow"><button class="opt" data-v="1"><span class="k">1</span>${esc(q.yes)}</button><button class="opt" data-v="0"><span class="k">2</span>${esc(q.no)}</button></div>`;
    shell(inner, "");
    $$(".opt").forEach((b) => b.addEventListener("click", () => answerTf(q, b.dataset.v === "1", b)));
    if (run.mode === "cross") startTimer(() => answerTf(q, null, null));
  }
  function answerTf(q, v, btn) {
    if (run.answered) return;
    run.answered = true;
    const ok = v === q.answer;
    $$(".opt").forEach((b) => { b.disabled = true; if ((b.dataset.v === "1") === q.answer) b.classList.add("right"); else if (b === btn) b.classList.add("wrong"); });
    resolve(q, ok, v === null ? "Time's up." : null);
  }

  // ---------- hypo: the MBE item ----------
  function hypoMarkup(q, { silent = false, chosen = null } = {}) {
    return `${silent ? `<div class="qlabel">Question ${run.i + 1} of ${run.steps.length}</div>` : header(q)}
      ${q.assume ? `<div class="assume">Assume: ${esc(q.assume)}</div>` : ""}
      <div class="stemblock">${esc(q.stem)}</div>
      <p class="call">${esc(q.call)}</p>
      ${silent ? "" : `<div class="pace" aria-hidden="true"><i id="pace"></i></div>`}
      <div class="options hypo-opts" role="group">${q.options.map((o, i) => `<button class="opt ${chosen === i ? "chosen" : ""}" data-i="${i}"><span class="k">${LETTERS[i]}</span><span>${esc(o.text)}</span></button>`).join("")}</div>`;
  }
  function drawHypo(q) {
    if (run.mode === "mock") return drawMockStep(q);
    shell(hypoMarkup(q), "");
    startPace();
    $$(".opt").forEach((b) => b.addEventListener("click", () => answerHypo(q, +b.dataset.i)));
  }
  function startPace() {
    const bar = $("#pace");
    if (!bar) return;
    bar.style.transition = "none"; bar.style.transform = "scaleX(1)";
    requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.transition = `transform ${E.HYPO_MS}ms linear`; bar.style.transform = "scaleX(0)"; }));
  }
  function revealOptions(q, idx) {
    $$(".opt").forEach((b, i) => {
      const o = q.options[i];
      b.disabled = true;
      if (o.text === q.answer) b.classList.add("right"); else if (i === idx) b.classList.add("wrong"); else b.classList.add("dim");
      if (o.why) b.insertAdjacentHTML("beforeend", `<span class="why">${o.trap ? `<b>${esc(E.TRAP_TYPES[o.trap] || "Distractor")}.</b> ` : ""}${esc(o.why)}</span>`);
    });
  }
  function answerHypo(q, idx) {
    if (run.answered) return;
    run.answered = true;
    const o = q.options[idx];
    const ok = o.text === q.answer;
    revealOptions(q, idx);
    resolve(q, ok, ok ? null : `${E.TRAP_TYPES[o.trap] ? E.TRAP_TYPES[o.trap] + "." : "Overruled."}`, ok ? 1 : 0, { trap: o.trap || null, selfTag: !ok });
  }
  /** Verdict first, then the reason among the two options that share it. */
  function drawGrid(q) {
    if (run.mode === "mock") return drawMockStep(q);
    const inner = `${header(q)}${q.assume ? `<div class="assume">Assume: ${esc(q.assume)}</div>` : ""}<div class="stemblock">${esc(q.stem)}</div><p class="call">${esc(q.call)}</p><div class="pace" aria-hidden="true"><i id="pace"></i></div>
      <p class="muted" style="font-weight:800">First the verdict, then the reason.</p><div class="tfrow">${q.verdicts.map((v, i) => `<button class="opt" data-v="${i}"><span class="k">${i + 1}</span>${esc(v)}</button>`).join("")}</div>`;
    shell(inner, "");
    startPace();
    $$(".opt").forEach((b) => b.addEventListener("click", () => {
      if (run.answered) return;
      const v = q.verdicts[+b.dataset.v];
      const okV = v === q.verdictAnswer;
      $$(".opt").forEach((x) => { x.disabled = true; if (q.verdicts[+x.dataset.v] === q.verdictAnswer) x.classList.add("right"); else if (x === b) x.classList.add("wrong"); });
      if (!okV) { run.answered = true; sfx.gavel(); const picked = q.options.find((o) => E.verdictOf(o.text) === v) || {}; resolve(q, false, "Wrong verdict.", 0, { trap: picked.trap || 4, selfTag: true }); return; }
      sfx.right();
      setTimeout(() => {
        const pair = q.options.map((o, i) => [o, i]).filter(([o]) => E.verdictOf(o.text) === v);
        const inner2 = `${header(q)}<div class="stemblock short">${esc(q.stem)}</div><p class="call">${esc(q.call)}</p><p class="muted" style="font-weight:800">${esc(v)}. Now the reason:</p>
          <div class="options hypo-opts">${pair.map(([o, i], k) => `<button class="opt" data-i="${i}"><span class="k">${k + 1}</span><span>${esc(o.text)}</span></button>`).join("")}</div>`;
        shell(inner2, "");
        $$(".opt").forEach((x) => x.addEventListener("click", () => {
          if (run.answered) return;
          run.answered = true;
          const o = q.options[+x.dataset.i];
          const ok = o.text === q.answer;
          $$(".opt").forEach((y) => { const oo = q.options[+y.dataset.i]; y.disabled = true; if (oo.text === q.answer) y.classList.add("right"); else if (y === x) y.classList.add("wrong"); if (oo.why) y.insertAdjacentHTML("beforeend", `<span class="why">${oo.trap ? `<b>${esc(E.TRAP_TYPES[oo.trap] || "Distractor")}.</b> ` : ""}${esc(oo.why)}</span>`); });
          resolve(q, ok, ok ? null : "Right verdict, wrong reason: the reason is the answer.", ok ? 1 : 0.5, { trap: o.trap || 1, selfTag: !ok });
        }));
      }, 450);
    }));
  }

  // ---------- build (ordered or free) ----------
  function drawBuild(q) {
    const placed = [];
    const inner = `${header(q)}<p class="prompt">${esc(q.prompt)}</p>${wordBlock(q)}<div class="slots ${q.orderFree ? "free" : ""}" id="slots" aria-live="polite"></div>
      <div class="bank" id="bank">${q.tiles.map((t, i) => `<button class="chip" data-i="${i}">${esc(t)}</button>`).join("")}</div>`;
    shell(inner, footerBtn("Check", "", "check", true));
    const slots = $("#slots"), check = $("#check");
    const redraw = () => {
      slots.innerHTML = placed.map((i, k) => `<button class="chip placed" data-k="${k}"><span class="n">${k + 1}</span>${esc(q.tiles[i])}</button>`).join("");
      $$("#bank .chip").forEach((b) => b.classList.toggle("used", placed.includes(+b.dataset.i)));
      $$(".chip", slots).forEach((b) => b.addEventListener("click", () => { if (run.answered) return; placed.splice(+b.dataset.k, 1); redraw(); }));
      check.disabled = placed.length === 0;
    };
    $$("#bank .chip").forEach((b) => b.addEventListener("click", () => { if (run.answered || placed.includes(+b.dataset.i)) return; placed.push(+b.dataset.i); sfx.tick(); redraw(); }));
    check.addEventListener("click", () => {
      if (run.answered) return;
      run.answered = true;
      const got = placed.map((i) => q.tiles[i]);
      const ok = q.orderFree ? got.length === q.answer.length && got.every((t) => q.answer.some((a) => E.norm(a) === E.norm(t))) : got.length === q.answer.length && got.every((t, i) => E.norm(t) === E.norm(q.answer[i]));
      resolve(q, ok);
    });
  }

  // ---------- bucket (sort one by one) ----------
  function drawBucket(q) {
    let i = 0, bad = false, busy = false;
    const inner = `${header(q)}<p class="prompt">${esc(q.prompt)}</p><div class="bucketcard" id="bcard"></div><div class="bwhy" id="bwhy"></div><div class="buckets" id="buckets">${q.buckets.map((b, k) => `<button class="bucketbtn" data-b="${k}"><span class="k">${k + 1}</span>${esc(b)}</button>`).join("")}</div><div class="bcount" id="bcount"></div>`;
    shell(inner, "");
    const card = $("#bcard"), count = $("#bcount"), why = $("#bwhy");
    const show = () => { card.textContent = q.items[i].text; card.className = "bucketcard"; why.textContent = ""; count.textContent = `${i + 1} / ${q.items.length}`; busy = false; };
    $$(".bucketbtn").forEach((b) => b.addEventListener("click", () => {
      if (run.answered || busy) return; // a second tap while the card flashes must not skip an item
      busy = true;
      const good = q.buckets[+b.dataset.b] === q.items[i].bucket;
      card.classList.add(good ? "ok" : "bad");
      if (!good && q.items[i].why) why.textContent = `${q.items[i].bucket}: ${q.items[i].why}`;
      if (good) sfx.right(); else { sfx.wrong(); bad = true; }
      setTimeout(() => { i += 1; if (i >= q.items.length) { run.answered = true; resolve(q, !bad, bad ? "Some landed in the wrong bucket." : null); } else show(); }, good ? 420 : 1500);
    }));
    show();
  }

  // ---------- find (tap words in the stem) ----------
  function drawFind(q) {
    const sel = new Set();
    const groups = q.groups && q.groups.length ? q.groups : [q.answer];
    const groupOf = (i) => groups.find((g) => g.includes(i)) || [i]; // a phrase is tapped as one: any word selects the whole fact
    const n = groups.length;
    const inner = `${header(q)}<p class="prompt">${esc(q.prompt)}</p><p class="muted" style="font-weight:700;font-size:14px">${n === 1 ? "One fact decides it. Tap a word in it." : `${["", "", "Two", "Three", "Four", "Five"][n] || n} facts decide it. Tap a word in each.`}</p><div class="findtext" id="find">${q.words.map((w, i) => `<button class="tok" data-i="${i}">${esc(w)}</button>`).join("")}</div>`;
    shell(inner, footerBtn("Check", "", "check", true));
    const check = $("#check");
    const toks = $$(".tok");
    toks.forEach((b) => b.addEventListener("click", () => {
      if (run.answered) return;
      const g = groupOf(+b.dataset.i);
      const on = !sel.has(g[0]);
      for (const i of g) { if (on) sel.add(i); else sel.delete(i); toks[i].classList.toggle("sel", on); }
      check.disabled = sel.size === 0;
    }));
    check.addEventListener("click", () => {
      if (run.answered) return;
      run.answered = true;
      const want = new Set(q.answer);
      let ok = sel.size === want.size;
      toks.forEach((b) => { const i = +b.dataset.i; b.classList.remove("sel"); if (want.has(i) && sel.has(i)) b.classList.add("ok"); else if (sel.has(i)) { b.classList.add("bad"); ok = false; } else if (want.has(i)) { b.classList.add("miss"); ok = false; } });
      resolve(q, ok);
    });
  }

  // ---------- spot the trap ----------
  function drawSpot(q) {
    const inner = `${header(q)}${q.stem ? `<div class="stemblock short">${esc(q.stem)}</div>` : ""}<p class="prompt" style="font-size:18px">${esc(q.prompt)}</p><div class="answerbox">${esc(q.shown)}</div><p class="muted" style="font-weight:800">This answer is…</p>
      <div class="tfrow"><button class="opt" data-v="1"><span class="k">1</span>The key</button><button class="opt" data-v="0"><span class="k">2</span>A distractor</button></div>`;
    shell(inner, "");
    $$(".opt").forEach((b) => b.addEventListener("click", () => {
      if (run.answered) return;
      const saysRight = b.dataset.v === "1";
      const ok1 = saysRight === q.isRight;
      $$(".opt").forEach((x) => { x.disabled = true; if ((x.dataset.v === "1") === q.isRight) x.classList.add("right"); else if (x === b) x.classList.add("wrong"); });
      if (q.isRight || !ok1) { run.answered = true; resolve(q, ok1); return; }
      sfx.right();
      setTimeout(() => {
        const inner2 = `${header(q)}${q.stem ? `<div class="stemblock short">${esc(q.stem)}</div>` : ""}<div class="answerbox"><span class="struck">${esc(q.shown)}</span></div><p class="muted" style="font-weight:800">Right, a distractor${q.trapType ? ` (${esc(E.TRAP_TYPES[q.trapType] || "")})` : ""}. Which is the key?</p>
          <div class="options">${q.fixOptions.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${i + 1}</span><span>${esc(o)}</span></button>`).join("")}</div>`;
        shell(inner2, "");
        $$(".opt").forEach((x) => x.addEventListener("click", () => {
          if (run.answered) return;
          run.answered = true;
          const ok = q.fixOptions[+x.dataset.i] === q.fix;
          $$(".opt").forEach((y, i) => { y.disabled = true; if (q.fixOptions[i] === q.fix) y.classList.add("right"); else if (y === x) y.classList.add("wrong"); else y.classList.add("dim"); });
          resolve(q, ok);
        }));
      }, 500);
    }));
  }

  // ---------- typed answer (numbers, rule numbers), with a «show me options» fallback ----------
  function drawType(q) {
    const inner = `${header(q)}<p class="prompt">${esc(q.prompt)}</p>${wordBlock(q)}<input class="typein" id="typein" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${esc(q.placeholder || "type the answer")}" aria-label="Answer" inputmode="${q.numeric ? "decimal" : "text"}">
      ${q.fallbackOptions ? `<button class="linkbtn" id="show-opts" style="align-self:center">Show me options</button>` : ""}`;
    shell(inner, footerBtn("Check", "", "check", true));
    const inp = $("#typein"), check = $("#check");
    inp.addEventListener("input", () => { check.disabled = !inp.value.trim(); });
    inp.addEventListener("keydown", (e) => { if (e.key === "Enter" && !check.disabled) check.click(); });
    const so = $("#show-opts");
    // «Show me options»: downgrade to a multiple-choice question, no penalty.
    if (so) so.addEventListener("click", () => { run.steps[run.i] = { ...q, type: "mcq", label: `${q.label} · options`, options: q.fallbackOptions, answer: q.answer[0] }; drawStep(); });
    check.addEventListener("click", () => {
      if (run.answered) return;
      run.answered = true;
      const ok = q.cite ? E.acceptsCite(q.answer, inp.value) : E.accepts(q.answer, inp.value);
      inp.classList.add(ok ? "ok" : "bad"); inp.disabled = true;
      resolve(q, ok);
    });
    setTimeout(() => inp.focus(), 50);
  }

  // ---------- swipe (self-graded flashcards) ----------
  function drawSwipe(q) {
    let i = 0, flipped = false, known = 0;
    const show = () => {
      const c = q.cards[i];
      shell(`${header(q)}<p class="prompt" style="font-size:17px">${esc(q.prompt)}</p>
        <div class="flashcard" id="card" role="button" tabindex="0">${flipped ? `<div class="front" style="font-size:20px;color:var(--muted)">${esc(c.front)}</div><div class="back">${esc(c.back)}</div>${c.hook ? `<div class="hk">${esc(c.hook)}</div>` : ""}` : `<div class="front">${esc(c.front)}</div>${c.sub ? `<div class="sub">${esc(c.sub)}</div>` : ""}<div class="hk">tap to flip</div>`}</div>
        <div class="swipecount">${i + 1} / ${q.cards.length}</div>`,
      `<div class="footer-inner"><div class="swipebar"><button class="btn clay" id="no" ${flipped ? "" : "disabled"}>Not yet</button><button class="btn olive" id="yes" ${flipped ? "" : "disabled"}>Knew it</button></div></div>`);
      $("#card").addEventListener("click", () => { flipped = true; sfx.tick(); show(); });
      const next = (ok) => { E.grade(S, c.itemId, ok, today(), { weight: 0.5 }); run.scored += 1; if (ok) { known += 1; run.right += 1; } else run.misses += 1; i += 1; flipped = false; if (i >= q.cards.length) { run.answered = true; run.results.push({ q, score: known / q.cards.length }); advance(); } else show(); };
      $("#yes").addEventListener("click", () => next(true));
      $("#no").addEventListener("click", () => next(false));
    };
    show();
  }

  // ---------- match (with spare right-hand items) ----------
  function drawMatch(q) {
    let selL = null, selR = null, done = 0, bad = false;
    const inner = `${header(q)}<p class="prompt" style="font-size:18px">${esc(q.prompt)}</p><div class="match">
      <div class="mcol">${q.left.map((l) => `<button class="mbtn left" data-l="${esc(l)}">${esc(l)}</button>`).join("")}</div>
      <div class="mcol">${q.right.map((r) => `<button class="mbtn" data-r="${esc(r)}">${esc(r)}</button>`).join("")}</div></div>`;
    shell(inner, "");
    const tryPair = () => {
      if (selL == null || selR == null) return;
      const lb = $(`[data-l="${CSS.escape(selL)}"]`), rb = $(`[data-r="${CSS.escape(selR)}"]`);
      const ok = q.pairs.some(([a, b]) => a === selL && b === selR);
      if (ok) { sfx.right(); [lb, rb].forEach((b) => { b.classList.remove("sel"); b.classList.add("ok"); b.disabled = true; }); done++; if (done === q.pairs.length) { run.answered = true; resolve(q, !bad, bad ? "With a few misses along the way." : null); } }
      else { bad = true; sfx.wrong(); buzz(40); [lb, rb].forEach((b) => { b.classList.remove("sel"); b.classList.add("bad"); setTimeout(() => b.classList.remove("bad"), 350); }); }
      selL = selR = null;
    };
    $$("[data-l]").forEach((b) => b.addEventListener("click", () => { $$("[data-l]").forEach((x) => x.classList.remove("sel")); selL = b.dataset.l; b.classList.add("sel"); tryPair(); }));
    $$("[data-r]").forEach((b) => b.addEventListener("click", () => { $$("[data-r]").forEach((x) => x.classList.remove("sel")); selR = b.dataset.r; b.classList.add("sel"); tryPair(); }));
  }

  // ---------- grading and feedback ----------
  const RIGHT = ["Sustained.", "Exactly.", "That is the best answer.", "Like an examiner.", "Clean.", "The reason, not just the result. Good."];
  const WRONG = ["Overruled. It comes back at the end.", "Not yet. Read why.", "We'll see it again. That is how it sticks.", "Into the notebook it goes."];
  const GUESS = ["Good instinct. Now we learn it.", "Guessing first makes it stick. Here is the rule."];

  function resolve(q, ok, why = null, score = ok ? 1 : 0, { trap = null, selfTag = false } = {}) {
    clearTimeout(timer);
    track("question_answered", { ...runProps(), ...stepProps(q), correct: !!ok, score, graded: !q.guess, ms: run.stepAt ? Date.now() - run.stepAt : null, combo: ok ? run.combo + 1 : 0, trap: trap || null });
    const t = today();
    if (q.guess) { (ok ? sfx.right : sfx.tick)(); showFeedback(true, ok ? "Good instinct." : pick(GUESS), q, true); return; }
    run.scored += 1; S.answered += 1;
    if (ok) { run.right += 1; S.correct += 1; run.combo += 1; run.maxCombo = Math.max(run.maxCombo, run.combo); sfx.right(); buzz(15); }
    else { run.misses += 1; run.combo = 0; sfx.wrong(); buzz([30, 40, 30]); }
    const ids = q.itemIds || (q.itemId ? [q.itemId] : []);
    for (const id of ids) E.grade(S, id, ok, t, { trap });
    run.results.push({ q, score, trap, ms: run.stepAt ? Date.now() - run.stepAt : 0 });
    if (run.mode === "cross") { showFeedback(ok, ok ? pick(RIGHT) : why || "The witness walks.", q); return; }
    if (!ok && !run.requeued.has(run.i) && run.mode !== "daily") {
      run.requeued.add(run.steps.length);
      run.steps.push({ ...q, label: E.L.again, marks: undefined });
    }
    showFeedback(ok, ok ? (run.combo >= 3 ? `${run.combo} in a row.` : pick(RIGHT)) : why || pick(WRONG), q, false, selfTag && !ok ? ids[0] : null);
  }
  function answerText(q) {
    if (q.type === "mcq") return esc(q.answer);
    if (q.type === "hypo" || q.type === "grid") return esc(q.answer);
    if (q.type === "build") return esc(q.answer.join(q.orderFree ? " · " : " → "));
    if (q.type === "type") return esc(q.answer[0]);
    if (q.type === "tf") return esc(q.answer ? q.yes : q.no);
    if (q.type === "find") return esc((q.groups && q.groups.length ? q.groups : [q.answer]).map((g) => g.map((i) => q.words[i]).join(" ")).join(" · "));
    if (q.type === "spot") return esc(q.fix);
    return "";
  }
  function showFeedback(ok, title, q, neutral = false, tagItem = null) {
    const f = $("#footer");
    f.className = `footer ${ok ? "right" : "wrong"}`;
    const ans = !ok && answerText(q) ? `<b>Best answer:</b> ${answerText(q)}<br>` : "";
    const lastCross = run.mode === "cross" && !ok;
    const tags = tagItem ? `<div class="selftags" role="group" aria-label="Why did you miss it?"><span>Why did you miss it?</span>${Object.entries(E.SELF_TAGS).map(([k, l]) => `<button class="fchip" data-tag="${k}">${esc(l)}</button>`).join("")}</div>` : "";
    f.innerHTML = `<div class="footer-inner" role="status">
      <div class="fb-amicus">${mascot(ok || neutral ? "happy" : "sad")}<div><div class="fb-title">${ok || neutral ? I.check.replace("<svg", '<svg width="26" height="26"') : I.x.replace("<svg", '<svg width="26" height="26"')} ${esc(title)}</div>
      <div class="fb-body">${ans}${esc(q.explain || "")}${q.lawVersion ? `<br><small>Law version ${esc(q.lawVersion)}: re-check on that date.</small>` : ""}</div></div></div>${tags}
      <button class="btn block ${ok || neutral ? "olive" : "clay"}" id="next">${lastCross ? "See the score" : "Continue"}</button></div>`;
    $$("[data-tag]", f).forEach((b) => b.addEventListener("click", () => { E.selfTag(S, tagItem, b.dataset.tag); track("miss_tagged", { item_id: tagItem, tag: b.dataset.tag }); $$("[data-tag]", f).forEach((x) => x.setAttribute("aria-pressed", x === b)); }));
    const next = $("#next");
    next.addEventListener("click", () => (run.mode === "cross" ? (ok ? nextCross() : finishCross()) : advance()));
    next.focus();
  }

  function finishRun() {
    const t = today();
    const perfect = run.misses === 0;
    const base = { lesson: 10, roundup: 15, practice: 8, notebook: 8, daily: run.scored, swipe: 5 }[run.mode] || 8;
    const gained = base + (perfect && run.scored > 0 ? 5 : 0) + (run.maxCombo >= 5 ? 2 : 0);
    const wasActive = S.lastDay === t;
    const prevTodayXp = S.days[t] || 0;
    E.addXp(S, t, gained);
    const st = E.touchStreak(S, t);
    trackDayProgress(prevTodayXp, st);
    if (run.mode === "practice" || run.mode === "notebook") S.practices += 1;
    let sittingLine = "";
    if (run.node && run.mode === "lesson") {
      const total = run.sittings;
      S.sittings[run.node.id] = Math.max(S.sittings[run.node.id] || 0, run.sitting + 1);
      if (S.sittings[run.node.id] >= total) S.done[run.node.id] = { perfect, at: t };
      else sittingLine = `Sitting ${run.sitting + 1} of ${total}. The next one picks up where you left off.`;
    }
    if (run.node && run.mode === "roundup") S.done[run.node.id] = { perfect, at: t };
    let scoreLine = "";
    if (run.mode === "daily") {
      const got = run.results.filter((x) => x.q.marks).reduce((a, x) => a + x.score, 0);
      const ms = run.results.reduce((a, x) => a + (x.ms || 0), 0);
      E.recordDaily(S, t, Math.round(got), run.daily.total, run.daily.subject, run.daily.ids, ms);
      scoreLine = `Today: ${Math.round(got)} / ${run.daily.total} in ${mmss(ms)} (${mmss(ms / Math.max(1, run.daily.total))} a question; the exam allows 1:48).`;
    }
    const fresh = E.awardBadges(S, t, IX);
    save();
    run.finished = true;
    track("lesson_completed", { ...runProps(), accuracy: run.scored ? run.right / run.scored : 1, perfect, misses: run.misses, xp: gained, seconds: Math.round((Date.now() - run.start) / 1000), max_combo: run.maxCombo, streak: S.streak, used_freeze: !!(st && st.usedFreeze), traps: E.trapTally(run.results) });
    for (const b of fresh) track("badge_earned", { badge: b.id || b.name });
    syncProgress();
    const acc = run.scored ? Math.round((run.right / run.scored) * 100) : 100;
    const secs = Math.round((Date.now() - run.start) / 1000);
    const star = starMoment({ perfect, goalHit: prevTodayXp < S.goal && (S.days[t] || 0) >= S.goal });
    sfx.done(); if (perfect || fresh.length) confetti();
    const streakLine = !wasActive && st.streakUp ? (st.usedFreeze ? `A continuance saved the streak. ${plural(S.streak, "day", "days")} on the docket.` : S.streak > 1 ? `${plural(S.streak, "day", "days")} on the docket.` : "Day 1 on the docket. See you tomorrow.") : `Streak: ${plural(S.streak, "day", "days")}.`;
    shell(`<div class="results">
      ${mascot("cheer")}
      <h1>${perfect && run.scored ? "No objections." : acc < 50 ? pick(["Overruled, for now.", "The notebook learns first.", "Again, with the notebook."]) : pick(["Sustained.", "Court is adjourned.", "Well argued."])}</h1>
      <div class="resgrid">
        <div class="res gold"><div class="h">Billed</div><div class="v">+${gained}m</div></div>
        <div class="res olive"><div class="h">Accuracy</div><div class="v">${acc}%</div></div>
        <div class="res flame"><div class="h">Time</div><div class="v">${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}</div></div>
      </div>
      ${scoreLine ? `<p style="font-weight:900">${esc(scoreLine)}</p>` : ""}
      <p style="font-weight:800">${esc(streakLine)}</p>
      ${sittingLine ? `<p class="muted" style="font-weight:700">${esc(sittingLine)}</p>` : ""}
      ${fresh.map((b) => `<div class="newbadge">${seal(b.name[0]).replace("<svg", '<svg width="40" height="40"')}<div>New badge: ${esc(b.name)}<br><span class="muted">${esc(b.desc)}</span></div></div>`).join("")}
      ${star ? starCard() : ""}
    </div>`, footerBtn("Continue", "gold"));
    $(".progress > i") && ($(".progress > i").style.width = "100%");
    $("#next").addEventListener("click", closeRun);
    $("#next").focus();
    if (star) bindStarCard(star);
  }

  // ---------- mocks: answers hidden until the end, mark and return, the clock enforced ----------
  let mockTimer = null;
  function startMock(size) {
    const m = E.buildMock(IX, S, seed(), size);
    if (!m.steps.length) { toast("No exam-shaped questions yet"); return; }
    track("mock_started", { size, questions: m.steps.length });
    run = { mode: "mock", node: null, size, steps: m.steps, i: 0, misses: 0, combo: 0, maxCombo: 0, right: 0, scored: 0, requeued: new Set(), answered: false, start: Date.now(), results: [], choices: m.steps.map(() => null), flags: new Set(), deadline: Date.now() + m.minutes * 60000, minutes: m.minutes };
    ui.overlay = "lesson";
    const name = size >= 200 ? "Full MBE" : size >= 100 ? "Session" : "Mini-MBE";
    shell(`<div class="results">${mascot("robe")}<h1>${name}</h1><p class="story" style="max-width:38ch">${m.steps.length} questions, ${m.minutes} minutes, the real pace. Answers are hidden until you submit; flag a question and come back to it. At the end: every subject, every distractor you fell for, and the rules to review.</p></div>`, footerBtn("Begin", "gold"));
    $("#next").addEventListener("click", () => { run.start = Date.now(); run.deadline = Date.now() + m.minutes * 60000; mockTimer = setInterval(tickMock, 1000); drawStep(); });
  }
  function tickMock() {
    const el = $("#mock-clock");
    if (el) el.textContent = mmss(run.deadline - Date.now());
    if (Date.now() >= run.deadline) { clearInterval(mockTimer); toast("Time. Pencils down."); submitMock(); }
  }
  function drawMockStep(q) {
    const chosen = run.choices[run.i];
    const flagged = run.flags.has(run.i);
    shell(hypoMarkup(q, { silent: true, chosen }), `<div class="footer-inner"><div class="mocknav">
      <button class="btn ghost" id="prev" ${run.i === 0 ? "disabled" : ""}>Back</button>
      <button class="btn ghost ${flagged ? "flagged" : ""}" id="flag">${I.flag}<span>${flagged ? "Flagged" : "Flag"}</span></button>
      <button class="btn" id="next">${run.i === run.steps.length - 1 ? "Review and submit" : "Next"}</button></div></div>`);
    $$(".opt").forEach((b) => b.addEventListener("click", () => { run.choices[run.i] = +b.dataset.i; $$(".opt").forEach((x) => x.classList.toggle("chosen", x === b)); sfx.tick(); }));
    $("#prev").addEventListener("click", () => { run.i -= 1; drawStep(); });
    $("#flag").addEventListener("click", () => { if (run.flags.has(run.i)) run.flags.delete(run.i); else run.flags.add(run.i); drawStep(); });
    $("#next").addEventListener("click", () => { if (run.i === run.steps.length - 1) mockReview(); else { run.i += 1; drawStep(); } });
  }
  function mockReview() {
    const blank = run.choices.filter((c) => c == null).length;
    shell(`<div class="intro"><div class="qlabel">Review</div><h1>${blank ? `${plural(blank, "question", "questions")} unanswered` : "Every question answered"}</h1><p class="story">Tap a number to go back. Never leave a blank: there is no penalty for guessing.</p>
      <div class="palette">${run.steps.map((_, i) => `<button class="pal ${run.choices[i] == null ? "blank" : ""} ${run.flags.has(i) ? "flagged" : ""}" data-go="${i}">${i + 1}</button>`).join("")}</div></div>`,
    `<div class="footer-inner"><button class="btn block gold" id="submit">Submit</button></div>`);
    $$("[data-go]").forEach((b) => b.addEventListener("click", () => { run.i = +b.dataset.go; drawStep(); }));
    $("#submit").addEventListener("click", submitMock);
  }
  function submitMock() {
    if (run.finished) return;
    clearInterval(mockTimer);
    const t = today();
    run.results = run.steps.map((q, i) => { const c = run.choices[i]; const o = c == null ? null : q.options[c]; const ok = !!o && o.text === q.answer; E.grade(S, q.itemId, ok, t, { trap: o && o.trap ? o.trap : null }); S.answered += 1; if (ok) S.correct += 1; return { q, score: ok ? 1 : 0, trap: o && !ok ? o.trap || null : null, chosen: c }; });
    const subjects = E.scoreSubjects(run.results);
    const traps = E.trapTally(run.results);
    const score = run.results.reduce((a, x) => a + x.score, 0);
    const ms = Date.now() - run.start;
    S.mocks.push({ at: t, size: run.size, score, total: run.steps.length, subjects, traps, ms });
    const gained = run.size >= 200 ? 60 : run.size >= 100 ? 30 : 15;
    const prevTodayXp = S.days[t] || 0;
    E.addXp(S, t, gained);
    const st = E.touchStreak(S, t);
    trackDayProgress(prevTodayXp, st);
    const fresh = E.awardBadges(S, t, IX);
    save();
    run.finished = true;
    track("mock_completed", { size: run.size, score, total: run.steps.length, seconds: Math.round(ms / 1000), subjects, traps, xp: gained });
    for (const b of fresh) track("badge_earned", { badge: b.id || b.name });
    syncProgress();
    sfx.done(); if (score === run.steps.length || fresh.length) confetti();
    const rules = [...new Set(run.results.filter((x) => !x.score).map((x) => x.q.ruleId).filter(Boolean))].slice(0, 6).map((id) => IX.rules.get(id)).filter(Boolean);
    const trapRows = Object.entries(traps).sort((a, b) => b[1] - a[1]);
    shell(`<div class="results">
      ${mascot(score / run.steps.length >= 0.7 ? "cheer" : "robe")}
      <h1>${score} / ${run.steps.length}</h1>
      <div class="resgrid"><div class="res gold"><div class="h">Billed</div><div class="v">+${gained}m</div></div><div class="res olive"><div class="h">Pace</div><div class="v">${mmss(ms / run.steps.length)}</div></div><div class="res flame"><div class="h">Allowed</div><div class="v">1:48</div></div></div>
      <div class="secbars">${Object.entries(subjects).map(([sub, [g, m]]) => `<div class="secbar"><span>${esc(E.subjectLabel(sub))}</span><div class="bar"><i style="width:${m ? (g / m) * 100 : 0}%"></i></div><span class="tnum">${Math.round(g)}/${Math.round(m)}</span></div>`).join("")}</div>
      ${trapRows.length ? `<div class="secbars"><div class="eyebrow" style="text-align:left">Distractors you fell for</div>${trapRows.map(([k, n]) => `<div class="secbar"><span>${esc(E.TRAP_TYPES[k] || k)}</span><div class="bar"><i style="width:${(n / run.steps.length) * 100}%;background:var(--bad)"></i></div><span class="tnum">${n}</span></div>`).join("")}</div>` : ""}
      ${rules.length ? `<div class="secbars"><div class="eyebrow" style="text-align:left">Review these rules</div>${rules.map((r) => `<div class="secbar" style="grid-template-columns:1fr"><span>${esc(r.title)}${r.cite ? ` · ${esc(r.cite)}` : ""}</span></div>`).join("")}</div>` : ""}
      ${fresh.map((b) => `<div class="newbadge">${seal(b.name[0]).replace("<svg", '<svg width="40" height="40"')}<div>New badge: ${esc(b.name)}</div></div>`).join("")}
    </div>`, `<div class="footer-inner"><button class="btn block gold" id="walk">Walk through the answers</button><button class="btn block ghost" id="next">Done</button></div>`);
    $("#next").addEventListener("click", closeRun);
    $("#walk").addEventListener("click", () => { run.i = 0; walkMock(); });
  }
  /** After a mock: every question with the chosen option, the key and every why. */
  function walkMock() {
    const q = run.steps[run.i];
    const chosen = run.choices[run.i];
    shell(hypoMarkup(q, { silent: true, chosen }), `<div class="footer-inner"><div class="mocknav"><button class="btn ghost" id="prev" ${run.i === 0 ? "disabled" : ""}>Back</button><button class="btn ghost" id="done">Done</button><button class="btn" id="next" ${run.i === run.steps.length - 1 ? "disabled" : ""}>Next</button></div></div>`);
    revealOptions(q, chosen == null ? -1 : chosen);
    $("#stage").insertAdjacentHTML("beforeend", `<p class="story">${esc(q.explain || "")}</p>`);
    $("#prev").addEventListener("click", () => { run.i -= 1; walkMock(); });
    $("#next").addEventListener("click", () => { run.i += 1; walkMock(); });
    $("#done").addEventListener("click", closeRun);
  }

  // ---------- Cross-Examination ----------
  let timer = null;
  function startCross() {
    track("cross_started", { best: S.crossExamBest });
    run = { mode: "cross", node: null, steps: [], i: 0, misses: 0, combo: 0, maxCombo: 0, right: 0, scored: 0, requeued: new Set(), answered: false, start: Date.now(), results: [], r: E.rng(seed()) };
    ui.overlay = "lesson";
    shell(`<div class="results">${mascot("robe")}<h1>Cross-Examination</h1><p class="story" style="max-width:34ch">Every question is a witness: 15 seconds to answer. One wrong answer and the witness walks. How many can you keep on the stand?</p><p class="muted" style="font-weight:800">Best: ${S.crossExamBest}</p></div>`, footerBtn("Call the first witness", "gold"));
    $("#next").addEventListener("click", nextCross);
  }
  function nextCross() {
    const q = E.crossExamQuestion(IX, S, run.r);
    if (!q) { toast("No witnesses to call yet"); return closeRun(); }
    run.steps = [q]; run.i = 0;
    drawStep();
  }
  function startTimer(onTimeout) {
    const bar = $("#timer");
    if (bar) { bar.style.transition = "none"; bar.style.transform = "scaleX(1)"; requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.transition = `transform ${E.CROSS_MS}ms linear`; bar.style.transform = "scaleX(0)"; })); }
    clearTimeout(timer);
    timer = setTimeout(onTimeout, E.CROSS_MS);
  }
  function finishCross() {
    const t = today();
    const score = run.right;
    const best = score > S.crossExamBest;
    if (best) S.crossExamBest = score;
    const gained = Math.min(score * 3, 30);
    const prevTodayXp = S.days[t] || 0;
    if (gained > 0) { E.addXp(S, t, gained); trackDayProgress(prevTodayXp, E.touchStreak(S, t)); }
    const fresh = E.awardBadges(S, t, IX);
    track("cross_finished", { witnesses: score, new_best: best && score > 0, best: S.crossExamBest, xp: gained, seconds: Math.round((Date.now() - run.start) / 1000) });
    for (const b of fresh) track("badge_earned", { badge: b.id || b.name });
    syncProgress();
    save();
    run.finished = true;
    if (best && score > 0) confetti();
    sfx.done();
    shell(`<div class="results">${mascot(score >= 5 ? "cheer" : "sad")}
      <h1>${score === 0 ? "The witness walked" : best ? "New best." : `${plural(score, "witness", "witnesses")} kept.`}</h1>
      <div class="resgrid"><div class="res gold"><div class="h">Billed</div><div class="v">+${gained}m</div></div><div class="res flame"><div class="h">Witnesses</div><div class="v">${score}</div></div><div class="res olive"><div class="h">Best</div><div class="v">${S.crossExamBest}</div></div></div>
      ${fresh.map((b) => `<div class="newbadge">${seal(b.name[0]).replace("<svg", '<svg width="40" height="40"')}<div>New badge: ${esc(b.name)}</div></div>`).join("")}
    </div>`, `<div class="footer-inner"><button class="btn block gold" id="again">Recall the witness</button><button class="btn block ghost" id="next">Done</button></div>`);
    $("#again").addEventListener("click", startCross);
    $("#next").addEventListener("click", closeRun);
  }

  // ---------- keyboard ----------
  addEventListener("keydown", (e) => {
    if (ui.overlay !== "lesson" || !run) return;
    if (e.target && e.target.tagName === "INPUT" && e.key !== "Escape") return;
    const qb = $(".quitbox");
    if (qb) { if (e.key === "Escape") { e.preventDefault(); qb.remove(); } return; }
    if (e.key === "Escape") return requestClose();
    const k = e.key.toLowerCase();
    if ((/^[1-4]$/.test(k) || /^[a-d]$/.test(k)) && !run.answered) { const opts = $$(".options .opt, .tfrow .opt, .buckets .bucketbtn"); const b = opts[/^[1-4]$/.test(k) ? +k - 1 : LETTERS.indexOf(k.toUpperCase())]; if (b) { e.preventDefault(); b.click(); } }
    if (e.key === "Enter") { const n = $("#next") || $("#check"); if (n && !n.disabled && document.activeElement !== n) { e.preventDefault(); n.click(); } }
  });

  // ---------- boot ----------
  const h = location.hash.slice(1);
  if (TABS.some((t) => t.id === h)) ui.tab = h;
  render();
  trackAppOpened();
})();
