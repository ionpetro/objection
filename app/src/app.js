// UI for "Carpe". Depends on globals CARPE_UNITS (src/units/*.js) and Engine (engine.js).
(() => {
  "use strict";
  const E = Engine;
  const IX = E.indexCourse(typeof CARPE_UNITS !== "undefined" ? CARPE_UNITS : []);
  const LS_KEY = "carpe:v1";

  // ---------- helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const today = () => E.dayKey();
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const seed = () => Math.floor(Math.random() * 2 ** 31);
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

  /** Product analytics. Only the public website loads PostHog (see site.mjs); elsewhere this does nothing. */
  function track(event, props = {}) {
    try { if (window.posthog && typeof window.posthog.capture === "function") window.posthog.capture(event, props); } catch { /* analytics must never break the app */ }
  }
  const REPO = "https://github.com/ionpetro/carpe";
  /** Link to the open source code. `where` says which button was clicked, for analytics. */
  const ghLink = (cls, where, inner) => `<a class="${cls}" href="${REPO}" target="_blank" rel="noopener" data-gh="${where}" aria-label="Ο κώδικας του Carpe στο GitHub">${inner}</a>`;
  /** The promise shown on every main screen: free forever, open code, and the one thing we track. */
  const FREE_NOTE = "Το Carpe είναι δωρεάν και θα μείνει πάντα δωρεάν. Ο κώδικας είναι ανοιχτός (MIT). Το μόνο που κάνουμε: μετράμε με το PostHog πώς χρησιμοποιείται, για να το κάνουμε καλύτερο. Χωρίς λογαριασμό, χωρίς διαφημίσεις.";

  // ---------- icons ----------
  const I = {
    github: '<svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.22 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
    flame: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c1 3.5-1.6 5.3-2.9 7.3C7.6 11.5 7 13 7 14.6 7 18.1 9.3 21 12 21s5-2.6 5-6.2c0-2.1-.9-3.7-2-5 .1 1.6-.5 2.8-1.6 3.3.5-3.6-.6-7.6-1.4-11.1z"/></svg>',
    coin: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.5" fill="currentColor"/><text x="12" y="16" text-anchor="middle" font-family="Georgia,serif" font-size="11" font-weight="700" fill="var(--surface)">D</text></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 4 6v6c0 4.5 3.4 7.6 8 9 4.6-1.4 8-4.5 8-9V6z"/><path d="M12 7v10M8 12h8"/></svg>',
    road: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21 9 3h6l4 18"/><path d="M12 6v2M12 11v2.5M12 16.5V19"/></svg>',
    scroll: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4h11a2 2 0 0 1 2 2v1h-4M7 4a2 2 0 0 0-2 2v12a2 2 0 0 1-2 2h11a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M8.5 9h5M8.5 13h5"/></svg>',
    helmet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a8 8 0 0 0-8 8v9h5v-6h6v6h5v-9a8 8 0 0 0-8-8zM12 3v8M8 3.8C9 2 15 2 16 3.8"/></svg>',
    redo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7"/></svg>',
    sword: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 20 10-10M14 4l6 6-3 3-6-6zM7 17l-3 3M9 14l1 1"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
    paper: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 12h6M9 16h6"/></svg>',
    cards: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="6" width="12" height="15" rx="2"/><path d="M8 3h11a1 1 0 0 1 1 1v13"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    laurel: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3c-1 2-1 4 0 6 1-2 1-4 0-6zm-5 3c0 2 1 4 3 5-0-2-1-4-3-5zm10 0c-2 1-3 3-3 5 2-1 3-3 3-5zM5 11c1 2 3 3 5 3-1-2-3-3-5-3zm14 0c-2 0-4 1-5 3 2 0 4-1 5-3zM6 16c2 1 4 1 6 0-2-1-4-1-6 0zm12 0c-2-1-4-1-6 0 2 1 4 1 6 0z"/></svg>',
  };
  const remoIcon = `<span style="color:var(--brand)">${I.laurel}</span>`;
  function wreath(letter) {
    return `<svg viewBox="0 0 48 48" aria-hidden="true"><g fill="var(--gold)">${[...Array(6)].map((_, i) => {
      const a = (200 + i * 26) * Math.PI / 180, b = (-20 - i * 26) * Math.PI / 180;
      const p = (t) => [24 + 19 * Math.cos(t), 26 + 19 * Math.sin(t)];
      const [x1, y1] = p(a), [x2, y2] = p(b);
      return `<ellipse cx="${x1.toFixed(1)}" cy="${y1.toFixed(1)}" rx="3" ry="6" transform="rotate(${(a * 180 / Math.PI + 90).toFixed(0)} ${x1.toFixed(1)} ${y1.toFixed(1)})"/><ellipse cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" rx="3" ry="6" transform="rotate(${(b * 180 / Math.PI + 90).toFixed(0)} ${x2.toFixed(1)} ${y2.toFixed(1)})"/>`;
    }).join("")}</g><text x="24" y="31" text-anchor="middle" font-family="Cormorant Garamond, Georgia, serif" font-weight="700" font-size="19" fill="var(--ink)">${esc(letter)}</text></svg>`;
  }

  /** Remo the wolf cub, in a laurel wreath. mood: happy | sad | cheer | gladiator */
  function mascot(mood = "happy") {
    const sad = mood === "sad";
    const eyes = sad
      ? '<path d="M50 60q4-4 8 0M72 60q4-4 8 0" stroke="var(--m-ink)" stroke-width="2.6" fill="none" stroke-linecap="round"/>'
      : '<circle cx="54" cy="60" r="3.6" fill="var(--m-ink)"/><circle cx="76" cy="60" r="3.6" fill="var(--m-ink)"/><circle cx="55.3" cy="58.8" r="1.2" fill="#fff"/><circle cx="77.3" cy="58.8" r="1.2" fill="#fff"/>';
    const mouth = sad
      ? '<path d="M59 77q6-4 12 0" stroke="var(--m-ink)" stroke-width="2.4" fill="none" stroke-linecap="round"/>'
      : mood === "cheer"
        ? '<path d="M57 73q8 9 16 0z" fill="var(--m-ink)"/><path d="M61 76q4 4 8 0z" fill="var(--m-tongue)"/>'
        : '<path d="M58 74q7 6 14 0" stroke="var(--m-ink)" stroke-width="2.4" fill="none" stroke-linecap="round"/>';
    // tall pointed ears with a pink inner ear, and a pale muzzle under the nose: the cues that read «wolf» rather than «cat»
    const earL = sad ? "M36 44 29 20l21 16z" : "M37 42 27 8l25 26z";
    const earR = sad ? "M94 44l7-24-21 16z" : "M93 42l10-34-25 26z";
    const innerEars = sad ? "" : '<path d="M40 40 33 16l15 19z" fill="var(--m-tongue)" opacity="0.55"/><path d="M90 40l7-24-15 19z" fill="var(--m-tongue)" opacity="0.55"/>';
    const muzzle = '<ellipse cx="65" cy="72" rx="14" ry="10" fill="var(--m-belly)"/>';
    const paws = mood === "cheer"
      ? '<path d="M30 70q-10-12-4-26" stroke="var(--m-fur-dark)" stroke-width="8" stroke-linecap="round" fill="none"/><path d="M100 70q10-12 4-26" stroke="var(--m-fur-dark)" stroke-width="8" stroke-linecap="round" fill="none"/>'
      : '<ellipse cx="46" cy="104" rx="9" ry="6" fill="var(--m-fur-dark)"/><ellipse cx="84" cy="104" rx="9" ry="6" fill="var(--m-fur-dark)"/>';
    const leaves = [...Array(9)].map((_, i) => {
      const t = (176 + i * 23) * Math.PI / 180;
      const x = 65 + 30 * Math.cos(t), y = 42 + 16 * Math.sin(t);
      return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="3.2" ry="6.5" fill="var(--gold)" transform="rotate(${(t * 180 / Math.PI + 90).toFixed(0)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
    }).join("");
    const helmet = mood === "gladiator" ? '<path d="M36 44q29-26 58 0v-8q-29-24-58 0z" fill="var(--gold-deep)"/><path d="M60 30h10v-12h-10z" fill="var(--clay)"/>' : "";
    return `<svg class="mascot" viewBox="0 0 130 116" role="img" aria-label="Ο Remo, το λυκόπουλο">
      <ellipse cx="65" cy="108" rx="44" ry="5" fill="var(--line)"/>
      <path d="M38 100q-2-34 27-36 29 2 27 36z" fill="var(--m-fur)"/>
      <path d="M50 100q0-22 15-22t15 22z" fill="var(--m-belly)"/>
      ${paws}
      <path d="${earL}" fill="var(--m-fur-dark)"/><path d="${earR}" fill="var(--m-fur-dark)"/>${innerEars}
      <path d="M38 45q-4 24 10 36 17 10 34 0 14-12 10-36-27-18-54 0z" fill="var(--m-fur)"/>
      ${muzzle}
      <ellipse cx="65" cy="67" rx="6" ry="4.4" fill="var(--m-ink)"/><circle cx="63" cy="65.8" r="1.3" fill="#fff" opacity="0.7"/>
      ${eyes}${mouth}
      ${mood === "gladiator" ? helmet : leaves}
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
  const sfx = { right: () => tone([660, 990]), wrong: () => tone([196, 147], 0.16, "square", 0.1, 0.05), done: () => tone([523, 659, 784, 1047], 0.14, "triangle", 0.09), tick: () => tone([880], 0.03, "sine", 0, 0.04) };
  const buzz = (ms) => { try { navigator.vibrate && navigator.vibrate(ms); } catch { /* optional */ } };

  function confetti() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = document.createElement("canvas");
    c.id = "confetti"; document.body.appendChild(c);
    const ctx = c.getContext("2d"); const dpr = window.devicePixelRatio || 1;
    c.width = innerWidth * dpr; c.height = innerHeight * dpr; ctx.scale(dpr, dpr);
    const css = getComputedStyle(document.documentElement);
    const cols = ["--gold", "--brand", "--olive", "--flame", "--clay"].map((v) => css.getPropertyValue(v).trim());
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
      colosseum_best: S.colosseumBest, mocks_taken: (S.mocks || []).length, onboarded: !!S.onboarded };
  }
  function syncProgress() {
    try { if (window.posthog && typeof window.posthog.register === "function") window.posthog.register(progressProps()); } catch { /* optional */ }
  }
  const dayGap = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 864e5);
  const VISIT_KEY = "carpe.visit";
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
  /** After XP is added: goal and streak events. */
  function trackDayProgress(prevTodayXp, st) {
    const now = S.days[today()] || 0;
    if (prevTodayXp < S.goal && now >= S.goal) track("daily_goal_reached", { goal_xp: S.goal, today_xp: now });
    if (st && st.streakUp) track("streak_extended", { streak: S.streak, best_streak: S.bestStreak, used_freeze: st.usedFreeze > 0 });
  }
  /** Which run this is: attached to every lesson event. */
  const runProps = () => (run ? { mode: run.mode, node_id: run.node ? run.node.id : null, unit_id: run.node ? run.node.unitId || null : null, sitting: run.sitting ?? null, steps: run.steps.length } : {});
  /** What one question is (type, item, exam section), so answers can be cut per word and per Θέμα. */
  const stepProps = (q) => ({ step_index: run ? run.i : null, q_type: q.type, item_id: q.itemId || (q.itemIds || [])[0] || null, item_ids: q.itemIds || null, section: q.section || null, guess: !!q.guess, requeued: run ? run.requeued.has(run.i) : false, label: q.label || null });

  function save() {
    S.updatedAt = Date.now();
    try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch { /* private mode: progress lives for this session only */ }
  }

  // ---------- UI state ----------
  const ui = { tab: "learn", overlay: null, lexFilter: "all", lexQuery: "", confirmReset: false };
  const TABS = [{ id: "learn", label: "Μάθε", icon: I.road }, { id: "lex", label: "Λεξικό", icon: I.scroll }, { id: "me", label: "Εγώ", icon: I.helmet }];
  function setTab(id) { if (id !== ui.tab) track("tab_viewed", { tab: id }); ui.tab = id; if (location.hash !== `#${id}`) history.replaceState(null, "", `#${id}`); render(); scrollTo(0, 0); }
  addEventListener("hashchange", () => { const h = location.hash.slice(1); if (TABS.some((t) => t.id === h) && h !== ui.tab) { ui.tab = h; render(); } });
  const app = () => $("#app");

  function topbar() {
    const t = today(), st = E.liveStreak(S, t), active = S.lastDay === t;
    return `<header class="topbar">
      <div class="wordmark">Carpe<small>CARPE ΤΟ 20</small></div>
      <div class="stats">
        <span class="stat flame ${active ? "" : "cold"}" title="${active ? "Το σερί είναι ασφαλές για σήμερα" : "Κάνε ένα μάθημα για να κρατήσεις το σερί"}">${I.flame}<span>${st}</span></span>
        <span class="stat" title="Άδειες (streak freezes)" style="color:var(--brand)">${I.shield}<span>${S.freezes}</span></span>
        <span class="stat xp" title="Δηνάρια">${I.coin}<span>${S.xp}</span></span>
      </div>
      ${ghLink("gh", "topbar", `${I.github}<span class="gh-label">GitHub</span>`)}
    </header>`;
  }
  function tabbar() {
    return `<nav class="tabbar" aria-label="Ενότητες"><div class="tabbar-inner">${TABS.map((t) => `<button class="tab" data-tab="${t.id}" ${ui.tab === t.id ? 'aria-current="page"' : ""}>${t.icon}<span>${t.label}</span></button>`).join("")}</div></nav>`;
  }
  function siteNote() { return `<footer class="sitenote"><p><b>${FREE_NOTE}</b></p>${ghLink("btn ghost gh-cta", "footer", `${I.github}<span>Ο κώδικας στο GitHub</span>`)}<p>Η πρόοδος αποθηκεύεται σ' αυτή τη συσκευή. Οι τύποι ελέγχονται στη Γραμματική Τζάρτζανου και στο σχολικό βιβλίο· όπου υπάρχει αμφιβολία, η κάρτα το λέει.</p></footer>`; }

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
      <h1>Carpe</h1>
      <p class="tag-line">Carpe diem. Carpe <span class="el">το 20</span>.</p>
      <p class="lede">Είμαι ο Remo. Θα κάνουμε Λατινικά όπως παίζεις ένα παιχνίδι: τρία λεπτά τη φορά, με τις εκφωνήσεις που βάζουν στις Πανελλαδικές, χωρίς καρδιές και χωρίς τιμωρίες.</p>
      <div class="card col">
        <h3>Πώς σε λένε;</h3>
        <input type="text" id="ob-name" placeholder="Το όνομά σου" value="${esc(S.name)}" autocomplete="given-name" maxlength="30">
        <h3>Πόσο κάθε μέρα;</h3>
        <div class="goalopts">${E.GOALS.map((g) => `<button class="goalopt" data-goal="${g.xp}" aria-pressed="${S.goal === g.xp}"><b>${g.label}</b><small>${g.sub}</small></button>`).join("")}</div>
      </div>
      <button class="btn block gold" id="ob-go">Ξεκινάμε</button>
      <p class="muted" style="text-align:center;font-size:13px;font-weight:700">Τα Σαββατοκύριακα δεν σπάνε το σερί. Η πρόοδος μένει σ' αυτή τη συσκευή.</p>
      <footer class="sitenote"><p>${FREE_NOTE}</p>${ghLink("btn ghost gh-cta", "onboarding", `${I.github}<span>Ο κώδικας στο GitHub</span>`)}</footer>
    </div>`;
  }
  function bindOnboarding() {
    $$("[data-goal]").forEach((b) => b.addEventListener("click", () => { S.goal = +b.dataset.goal; S.name = $("#ob-name").value.trim(); render(); }));
    $$("[data-gh]").forEach((a) => a.addEventListener("click", () => track("github_clicked", { where: a.dataset.gh })));
    $("#ob-go").addEventListener("click", () => { S.name = $("#ob-name").value.trim(); S.onboarded = true; save(); track("onboarding_completed", { goal: S.goal }); render(); const n = E.nextNode(IX, S); if (n) startNode(n); });
  }

  // ---------- learn tab ----------
  function wordOfDay() {
    const pool = IX.byKind.word.length ? IX.byKind.word.filter((w) => !IX.isDup(w)) : [...IX.items.values()].filter((x) => x.kind === "hook");
    if (!pool.length) return null;
    return pool[(Math.abs(E.daysBetween("2026-01-01", today())) * 7) % pool.length];
  }
  const greetings = ["Έτοιμη για τρία λεπτά Λατινικά;", "Ένα μάθημα κρατάει το σερί ζωντανό.", "Alea iacta est. Πάμε.", "Gutta cavat lapidem: λίγο κάθε μέρα."];
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
    const wotd = wordOfDay();
    const name = S.name ? `${S.name}, ` : "";
    const greet = todayXp >= S.goal ? `${name}πέτυχες τον στόχο της ημέρας. Veni, vidi, vici.` : S.lastDay === t ? `${name}καλή δουλειά. Λίγο ακόμη και φτάνεις τον στόχο.` : `${name}${pick(greetings).toLowerCase()}`;
    const roadSeg = cd.phase.id === "foundations" ? 1 : cd.phase.id === "walls" ? 2 : 3;
    // honest pace: parts left on the road divided by the days left (weekdays only, since weekends are optional)
    const left = E.remainingSittings(IX, S);
    const perDay = cd.days > 0 ? Math.ceil((left / cd.days) * 2) / 2 : 0;
    const mins = Math.ceil((perDay * 4.5) / 5) * 5; // a part is about 4-5 minutes
    const paceLine = left === 0 ? "Η Via Appia τελείωσε: μόνο επανάληψη πια." : cd.days > 0 ? `Για όλη τη Via Appia ως τότε: ~${String(perDay).replace(".", ",")} μέρη τη μέρα, γύρω στα ${mins}′.` : "";
    return `
      <section class="hero">${mascot(todayXp >= S.goal ? "cheer" : "happy")}<div class="bubble">${esc(greet.charAt(0).toUpperCase() + greet.slice(1))}</div></section>
      <section class="countdown">
        <div class="n tnum">${cd.days >= 0 ? cd.days : 0}<small>${cd.days === 1 ? "μέρα" : "μέρες"}</small></div>
        <div><div class="ph">ως την ${esc(cd.label)}, ${cd.time}<b>${esc(cd.phase.label)} · ${esc(cd.phase.sub)}</b></div>
          <div class="road">${[1, 2, 3].map((k) => `<i class="${k <= roadSeg ? "on" : ""}"></i>`).join("")}</div>
          ${paceLine ? `<div class="pace">${esc(paceLine)}</div>` : ""}</div>
      </section>
      <section class="card goalring">
        <svg viewBox="0 0 58 58" aria-hidden="true"><circle class="track" cx="29" cy="29" r="24" fill="none" stroke-width="8"/><circle class="fill" cx="29" cy="29" r="24" fill="none" stroke-width="8" stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${(C * (1 - pct)).toFixed(1)}"/></svg>
        <div style="flex:1;min-width:0"><div class="eyebrow">Στόχος ημέρας</div><h3 class="tnum">${todayXp} / ${S.goal} δηνάρια</h3><p class="muted" style="font-weight:700;font-size:14px">${E.isWeekend(t) ? "Σαββατοκύριακο: προαιρετικό, το σερί είναι ασφαλές." : "Τα Σαββατοκύριακα δεν σπάνε το σερί."}</p></div>
        ${next ? `<button class="btn" data-start="${next.id}">${Object.keys(S.done).length || Object.keys(S.sittings).length ? "Συνέχεια" : "Ξεκίνα"}</button>` : ""}
      </section>
      <section class="quick">
        <button class="tile ${daily ? "done" : ""}" data-act="daily"><span style="color:var(--brand)">${I.cal}</span><b>Θέμα της ημέρας</b><span>${daily ? `σήμερα: ${daily.score}/${daily.marks}` : `${esc(dailyTitle(t))} · 3-4 λεπτά`}</span></button>
        <button class="tile" data-act="practice" ${learned < 3 ? "disabled" : ""}><span style="color:var(--olive)">${I.redo}</span><b>Επανάληψη</b><span>${learned < 3 ? "Ανοίγει μετά το πρώτο μάθημα" : due ? `${plural(due, "κάρτα", "κάρτες")} για σήμερα` : "Δυνάμωσε τα αδύναμα"}</span></button>
        <button class="tile" data-act="colosseum"><span style="color:var(--flame)">${I.sword}</span><b>Κολοσσαίο</b><span>20″ η ερώτηση · ρεκόρ ${S.colosseumBest}</span></button>
        <button class="tile" data-act="mock" ${learned < 10 ? "disabled" : ""}><span style="color:var(--gold-deep)">${I.paper}</span><b>Διαγώνισμα</b><span>${learned < 10 ? "Ανοίγει μετά από λίγα μαθήματα" : "Μικρό, 20 λεπτά, 7 Θέματα"}</span></button>
        <button class="tile" data-act="swipe" ${!IX.byKind.word.length ? "disabled" : ""}><span style="color:var(--brand)">${I.cards}</span><b>Λέξεις</b><span>25 κάρτες σε 2 λεπτά</span></button>
        <button class="tile" data-act="notebook" ${!E.notebookItems(S).length ? "disabled" : ""}><span style="color:var(--clay)">${I.scroll}</span><b>Τετράδιο λαθών</b><span>${plural(E.notebookItems(S).length, "κάρτα", "κάρτες")}</span></button>
      </section>
      ${wotd ? `<section class="card wotd col" style="gap:6px">
        <div class="eyebrow">Λέξη της ημέρας</div>
        <div class="row" style="flex-wrap:wrap;align-items:baseline;gap:4px 12px"><span class="big latin">${esc(wotd.la)}</span>${wotd.forms ? `<span class="sub">${esc(wotd.forms)}</span>` : ""}</div>
        <p style="font-weight:800">${esc(wotd.el)}</p>
        ${wotd.hook || wotd.story ? `<p class="muted" style="font-weight:700">${esc(wotd.hook || wotd.story)}</p>` : ""}
      </section>` : ""}
      ${via()}`;
  }
  function dailyTitle(t) { const sec = E.DAILY_BY_WEEKDAY[E.weekday(t)]; return sec === "mix" ? "Μικτό" : sec === "Β" ? "Θέμα Β1+Β2" : `Θέμα ${sec}`; }

  /** The Via Appia: one milestone per unit, stones per lesson. */
  function via() {
    if (!IX.course.units.length) return `<section class="card empty">${mascot("sad")}<h3>Δεν υπάρχει ακόμη περιεχόμενο</h3><p class="muted">Οι μονάδες γράφονται στο app/src/units/.</p></section>`;
    const nodes = E.pathNodes(IX);
    const next = E.nextNode(IX, S);
    return `<section class="via"><h2>Via Appia</h2>${IX.course.units.map((u, i) => {
      const uNodes = nodes.filter((n) => n.unitId === u.id);
      const pr = E.unitProgress(IX, S, u.id);
      const started = pr.done > 0 || uNodes.some((n) => S.sittings[n.id]);
      return `<div class="milestone">
        <div class="mile ${pr.done === pr.total ? "done" : started ? "open" : ""}">${["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"][i] || i + 1}</div>
        <div class="ucard">
          <div class="row" style="justify-content:space-between;align-items:flex-start"><h2>${esc(u.title)}</h2><div class="exam-tags">${(u.exam || []).map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div></div>
          <p>${esc(u.blurb)}</p>
          <div class="ubar"><i style="width:${pr.total ? (pr.done / pr.total) * 100 : 0}%"></i></div>
          <div class="stones">${uNodes.map((n) => {
            const done = !!S.done[n.id]; const open = E.isUnlocked(IX, S, n.id); const cur = next && next.id === n.id;
            const sits = n.kind === "lesson" ? E.lessonSittings(IX, n.id).length : 1; const did = S.sittings[n.id] || 0;
            return `<button class="stone ${n.kind === "roundup" ? "boss" : ""} ${done ? "done" : open ? "" : "locked"} ${cur ? "current" : ""}" ${open ? `data-start="${n.id}"` : "disabled"} title="${esc(n.title)}" aria-label="${esc(n.title)}${done ? " (ολοκληρώθηκε)" : open ? "" : " (κλειδωμένο)"}">${done ? I.check.replace('aria-hidden="true"', 'aria-hidden="true" width="22" height="22"') : n.letter}${sits > 1 && !done ? `<span class="sit">${did}/${sits}</span>` : ""}</button>`;
          }).join("")}</div>
        </div></div>`;
    }).join("")}</section>`;
  }

  // ---------- lexicon tab ----------
  const LEX_FILTERS = [["all", "Όλα"], ["word", "Λέξεις"], ["form", "Τύποι"], ["rule", "Κανόνες"], ["syntax", "Συντακτικό"], ["etym", "Ετυμολογία"], ["fact", "Εισαγωγή"], ["trap", "Παγίδες"], ["notebook", "Τετράδιο λαθών"], ["learned", "Τα έμαθα"]];
  function lexView() {
    const q = E.norm(ui.lexQuery);
    const nb = new Set(E.notebookItems(S));
    const items = [...IX.items.values()].filter((it) => {
      const f = ui.lexFilter;
      if (IX.isDup(it)) return false; // a headword taught in several units is listed once
      if (f === "syntax" && !["role", "clause", "transform"].includes(it.kind)) return false;
      if (f === "etym" && !["hook", "origin"].includes(it.kind)) return false;
      if (["word", "form", "rule", "fact", "trap"].includes(f) && it.kind !== f) return false;
      if (f === "notebook" && !nb.has(it.id)) return false;
      if (f === "learned" && !S.items[E.canon(it.id)]) return false;
      return !q || E.norm(JSON.stringify(it)).includes(q);
    });
    return `
      <section class="col" style="gap:6px"><div class="eyebrow">Λεξικό</div><h1>Όλα όσα διδάσκει το Carpe</h1><p class="muted" style="font-weight:700">Λέξεις, τύποι, κανόνες, συντακτικοί ρόλοι, ετυμολογία, Εισαγωγή και παγίδες. Κάθε κάρτα λέει από πού ελέγχθηκε.</p></section>
      <input class="search" id="lex-q" type="search" placeholder="Αναζήτηση: dos, γενική, cum…" value="${esc(ui.lexQuery)}" aria-label="Αναζήτηση">
      <div class="chips" role="group" aria-label="Φίλτρο">${LEX_FILTERS.map(([k, l]) => `<button class="fchip" data-filter="${k}" aria-pressed="${ui.lexFilter === k}">${l}</button>`).join("")}</div>
      <section class="lex">${items.length ? items.slice(0, 200).map(lexCard).join("") : `<div class="card empty">${mascot("sad")}<p class="muted">Δεν βρέθηκε κάτι. Δοκίμασε άλλη λέξη.</p></div>`}${items.length > 200 ? `<p class="muted" style="text-align:center;font-weight:700">Δείχνω τα πρώτα 200. Στένεψε την αναζήτηση.</p>` : ""}</section>`;
  }
  function statusPill(it) {
    const st = it.status === "exam" ? `<span class="pill exam">Παν. ${(it.exam || []).join(", ") || ""}</span>` : it.status === "unsure" ? '<span class="pill unsure">προς έλεγχο</span>' : it.status === "general" ? '<span class="pill">γενικό</span>' : '<span class="pill">βιβλίο</span>';
    return `${st}${S.items[E.canon(it.id)] ? '<span class="pill learned">το έμαθα</span>' : ""}`;
  }
  function lexCard(it) {
    const head = it.kind === "word" ? `<b>${esc(it.la)}</b><span class="sub">${esc(it.forms)}</span><span class="m">${esc(it.el)}</span>`
      : it.kind === "form" ? `<b>${esc(it.given)}</b><span class="m">${esc(it.ask)} → ${esc(it.answer[0])}</span>`
      : it.kind === "rule" ? `<b style="font-family:var(--font-ui);font-size:18px">${esc(it.title)}</b>`
      : it.kind === "role" ? `<b>${esc(it.w)}</b><span class="m">${esc(it.answer[0])} ${esc(it.dep)}</span>`
      : it.kind === "clause" ? `<b style="font-size:18px">${esc(it.la)}</b><span class="m">${esc(it.kind_el)}</span>`
      : it.kind === "transform" ? `<b style="font-size:18px">${esc(it.from)}</b><span class="m">→ ${esc(it.to[0])}</span>`
      : it.kind === "fact" ? `<b style="font-family:var(--font-ui);font-size:16px">${esc(it.q)}</b><span class="m">${it.t === "tf" ? (it.a ? "Σωστό" : "Λάθος") : esc(it.a)}</span>`
      : it.kind === "hook" ? `<b>${esc(it.la)}</b><span class="m">→ ${esc(it.el)}</span>`
      : it.kind === "origin" ? `<b style="font-family:var(--font-ui)">${esc(it.w)}</b><span class="m">${it.latin ? "λατινικό" : "όχι λατινικό"}</span>`
      : `<b style="font-family:var(--font-ui);font-size:16px">${esc(it.ask)}</b><span class="m"><span class="struck">${esc(it.wrong)}</span> → ${esc(it.right)}</span>`;
    return `<article class="card lexcard"><div class="lexhead">${head}</div><p class="say">${esc(it.say)}</p>${it.hook ? `<p class="ex">${esc(it.hook)}</p>` : ""}<div class="row" style="justify-content:space-between;flex-wrap:wrap"><div class="pills">${statusPill(it)}</div><span class="muted" style="font-size:12px;font-weight:700">${esc(E.cleanSrc(it.src))}</span></div></article>`;
  }

  // ---------- me tab ----------
  function meView() {
    const learned = Object.keys(S.items).length;
    const acc = S.answered ? Math.round((S.correct / S.answered) * 100) : 0;
    const total = [...IX.items.values()].filter((x) => !IX.isDup(x)).length;
    const lastMock = S.mocks[S.mocks.length - 1];
    return `
      <section class="hero">${mascot()}<div class="bubble">${learned ? `Έχεις μάθει ${learned} από ${total} κάρτες.` : "Κάνε ένα μάθημα για να αρχίσει η συλλογή."}${lastMock ? ` Τελευταίο διαγώνισμα: ${Math.round(lastMock.score)}/${lastMock.marks}.` : ""}</div></section>
      <section class="grid2">
        ${[["Δηνάρια", S.xp], ["Καλύτερο σερί", plural(S.bestStreak, "μέρα", "μέρες")], ["Ακρίβεια", `${acc}%`], ["Κολοσσαίο", S.colosseumBest], ["Θέματα ημέρας", Object.keys(S.dailies).length], ["Διαγωνίσματα", S.mocks.length]].map(([h, v]) => `<div class="card"><div class="eyebrow">${h}</div><h2 class="tnum">${v}</h2></div>`).join("")}
      </section>
      <section class="col"><h2>Βαθμοί και τιμές</h2><div class="badges">${E.BADGES.map((b) => `<div class="badge ${S.badges[b.id] ? "" : "off"}">${wreath(b.name[0])}<b>${esc(b.name)}</b><span>${esc(b.desc)}</span></div>`).join("")}</div></section>
      <section class="card">
        <div class="setting"><div><label for="set-name">Όνομα</label><small>Πώς σε χαιρετάει ο Remo</small></div><input type="text" id="set-name" value="${esc(S.name)}" maxlength="30"></div>
        <div class="setting" style="flex-direction:column;align-items:stretch"><label>Στόχος ημέρας</label><div class="goalopts">${E.GOALS.map((g) => `<button class="goalopt" data-goal="${g.xp}" aria-pressed="${S.goal === g.xp}"><b>${g.label}</b><small>${g.sub}</small></button>`).join("")}</div></div>
        <div class="setting"><div><label for="set-exam">Ημέρα εξέτασης</label><small>Προσωρινά ${E.fmtDayGr(E.EXAM_DATE)} 2027. Επιβεβαίωσέ την τον Μάρτιο.</small></div><input type="date" id="set-exam" value="${esc(E.examDate(S))}"></div>
        <div class="setting"><div><label for="set-school">Στο σχολείο είμαστε στο μάθημα</label><small>Κατευθύνει τις κάρτες λέξεων (16-50)</small></div><input type="number" id="set-school" min="16" max="50" value="${S.schoolLesson}"></div>
        <div class="setting"><div><label for="set-sound">Ήχοι</label><small>Κουδουνάκια και δονήσεις</small></div><input type="checkbox" class="switch" id="set-sound" ${S.sound ? "checked" : ""}></div>
        <div class="setting"><div><label>Άδειες: ${S.freezes}</label><small>Μία δωρεάν κάθε εβδομάδα· άλλη μία κάθε 7 μέρες σερί (έως 2)</small></div></div>
        <div class="setting"><div><label>Από την αρχή</label><small>Σβήνει την πρόοδο σ' αυτή τη συσκευή</small></div>${ui.confirmReset ? `<div class="row"><button class="btn clay small" id="reset-yes">Σβήσε</button><button class="btn ghost small" id="reset-no">Κράτα</button></div>` : `<button class="btn ghost small" id="reset">Επαναφορά</button>`}</div>
      </section>`;
  }

  // ---------- wiring ----------
  function bindCommon() {
    const root = app();
    $$("[data-gh]", root).forEach((a) => a.addEventListener("click", () => track("github_clicked", { where: a.dataset.gh })));
    $$("[data-tab]", root).forEach((b) => b.addEventListener("click", () => setTab(b.dataset.tab)));
    $$("[data-start]", root).forEach((b) => b.addEventListener("click", () => startNode(E.pathNodes(IX).find((n) => n.id === b.dataset.start))));
    $$("[data-goal]", root).forEach((b) => b.addEventListener("click", () => { const from = S.goal; S.goal = +b.dataset.goal; if (from !== S.goal) track("goal_changed", { from_xp: from, to_xp: S.goal }); save(); render(); }));
    $$("[data-filter]", root).forEach((b) => b.addEventListener("click", () => { ui.lexFilter = b.dataset.filter; render(); }));
    const act = (a, fn) => { const el = root.querySelector(`[data-act="${a}"]`); if (el) el.addEventListener("click", fn); };
    act("practice", () => startRun("practice"));
    act("notebook", () => startRun("notebook"));
    act("daily", () => startRun("daily"));
    act("mock", () => startRun("mock"));
    act("swipe", () => startRun("swipe"));
    act("colosseum", () => startColosseum());
    const q = $("#lex-q");
    if (q) q.addEventListener("input", (e) => { clearTimeout(ui.lexTimer); const v = e.target.value.trim(); ui.lexTimer = setTimeout(() => { if (v) track("lexicon_searched", { query: v.slice(0, 40), filter: ui.lexFilter || null }); }, 1200); ui.lexQuery = e.target.value; const pos = e.target.selectionStart; render(); const n = $("#lex-q"); n.focus(); n.setSelectionRange(pos, pos); });
    const on = (id, ev, fn) => { const el = $(id); if (el) el.addEventListener(ev, fn); };
    on("#set-name", "change", (e) => { S.name = e.target.value.trim(); save(); });
    on("#set-exam", "change", (e) => { if (/^\d{4}-\d{2}-\d{2}$/.test(e.target.value)) { track("setting_changed", { setting: "exam_date", value: e.target.value }); S.examDate = e.target.value; save(); render(); } });
    on("#set-school", "change", (e) => { const v = +e.target.value; if (v >= 16 && v <= 50) { track("setting_changed", { setting: "school_lesson", value: v }); S.schoolLesson = v; save(); } });
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
    else if (mode === "notebook") { const r = E.rng(sd); steps = E.notebookItems(S).map((id) => IX.items.get(id)).filter(Boolean).slice(0, 10).map((it) => E.qReview(IX, it, r)).filter(Boolean); }
    else if (mode === "daily") { const d = E.buildDaily(IX, S, today()); steps = d.steps; meta = { daily: d }; }
    else if (mode === "mock") { const m = E.buildMock(IX, S, sd); steps = m.steps; meta = { marks: m.marks }; }
    else if (mode === "swipe") { const sw = E.buildSwipe(IX, S, sd); steps = sw ? [sw] : []; }
    if (!steps.length) { toast("Δεν υπάρχει κάτι να κάνεις εδώ ακόμη"); return; }
    track("lesson_started", { mode, node_id: node ? node.id : null, unit_id: node ? node.unitId || null : null, steps: steps.length });
    run = { mode, node, steps, i: 0, misses: 0, combo: 0, maxCombo: 0, right: 0, scored: 0, requeued: new Set(), answered: false, start: Date.now(), results: [], ...meta };
    ui.overlay = "lesson";
    if (mode === "daily") introScreen(`Θέμα της ημέρας · ${esc(meta.daily.title)}`, `Όπως στις Πανελλαδικές: ${meta.daily.marks} μονάδες, ${plural(steps.length, "ερώτηση", "ερωτήσεις")}. Ίδιο θέμα όλη μέρα, αν το ξανανοίξεις.`, "Πάμε");
    else if (mode === "mock") introScreen("Μικρό διαγώνισμα", "Ένα ολόκληρο γραπτό σε μικρογραφία: τα 7 Θέματα με τις πραγματικές μονάδες τους. Στο τέλος βλέπεις πού χάνεις μονάδες.", "Ξεκίνα");
    else drawStep();
  }
  function introScreen(title, text, btn) {
    shell(`<div class="results">${mascot("happy")}<h1>${title}</h1><p class="story" style="max-width:36ch">${text}</p></div>`, footerBtn(btn, "gold"));
    $("#next").addEventListener("click", drawStep);
  }
  function closeRun() {
    run = null; ui.overlay = null;
    const o = $(".lesson"); if (o) o.remove();
    const qb = $(".quitbox"); if (qb) qb.remove();
    document.body.classList.remove("run-open");
    clearTimeout(timer);
    render();
  }
  /** X or Escape. A run with graded answers asks first; the Colosseum and an untouched run just close. */
  function requestClose() {
    const quitProps = () => ({ ...runProps(), at_step: run.i, answered: run.scored, right: run.right, seconds: Math.round((Date.now() - run.start) / 1000) });
    if (run && !run.finished && run.mode !== "colosseum" && run.scored === 0) track("lesson_quit", quitProps());
    if (!run || run.finished || run.mode === "colosseum" || run.scored === 0) return closeRun();
    if ($(".quitbox")) return;
    const box = document.createElement("div");
    box.className = "quitbox"; box.setAttribute("role", "alertdialog"); box.setAttribute("aria-label", "Έξοδος από το μάθημα");
    box.innerHTML = `<div class="card"><p>Φεύγεις; Ό,τι απάντησες μετράει στην επανάληψη, αλλά το μάθημα μένει στη μέση.</p><div class="row"><button class="btn ghost" id="quit-stay">Μένω</button><button class="btn clay" id="quit-go">Φεύγω</button></div></div>`;
    document.body.appendChild(box);
    $("#quit-stay").addEventListener("click", () => box.remove());
    $("#quit-go").addEventListener("click", () => { track("lesson_quit", quitProps()); save(); closeRun(); });
    box.addEventListener("click", (e) => { if (e.target === box) box.remove(); });
    $("#quit-stay").focus();
  }
  function shell(inner, footer = "") {
    let o = $(".lesson");
    if (!o) { o = document.createElement("div"); o.className = "lesson"; o.setAttribute("role", "dialog"); o.setAttribute("aria-modal", "true"); document.body.appendChild(o); document.body.classList.add("run-open"); }
    const prog = run.mode === "colosseum" ? 100 : (run.i / run.steps.length) * 100;
    o.innerHTML = `<div class="lesson-inner">
        <div class="lesson-top"><button class="xbtn" id="quit" aria-label="Έξοδος">${I.x}</button>
          ${run.mode === "colosseum" ? `<div style="flex:1;font-weight:900">Κολοσσαίο · <span class="tnum">${run.right}</span> ${run.right === 1 ? "νίκη" : "νίκες"}</div>` : `<div class="progress" aria-hidden="true"><i style="width:${prog}%"></i></div>`}
          <span class="combo">${run.combo >= 3 ? `${I.flame.replace("<svg", '<svg width="14" height="14"')} ${run.combo}` : ""}</span></div>
        ${run.mode === "colosseum" ? '<div class="timer"><i id="timer"></i></div>' : ""}
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
    const draw = { intro: drawIntro, mcq: drawMcq, tf: drawTf, build: drawBuild, match: drawMatch, slots: drawSlots, bucket: drawBucket, find: drawFind, steps: drawSteps, transform: drawTransform, spot: drawSpot, type: drawType, swipe: drawSwipe }[q.type];
    if (draw) draw(q); else advance();
  }
  function advance() { run.i += 1; drawStep(); }
  function header(q) {
    const marks = q.marks ? `<span class="marks">${q.section && q.section !== "mix" ? q.section + " · " : ""}${Math.round(q.marks * 10) / 10} μον.</span>` : "";
    return `<div class="qlabel ${q.guess ? "guess" : ""}">${esc(q.label)}${q.guess ? " · χωρίς βαθμό" : ""}${marks}</div>`;
  }
  /** Highlight a word inside a Latin sentence (case-insensitive, first match). */
  function hl(text, w) {
    if (!w) return esc(text);
    const i = text.toLowerCase().indexOf(String(w).toLowerCase());
    if (i < 0) return esc(text);
    return `${esc(text.slice(0, i))}<span class="hl">${esc(text.slice(i, i + w.length))}</span>${esc(text.slice(i + w.length))}`;
  }
  const wordBlock = (q) => (q.word ? `<div class="bigword ${q.word.length > 18 ? "sentence" : ""}">${hl(q.word, q.hl)}</div>${q.sub ? `<div class="sub">${esc(q.sub)}</div>` : ""}` : "");

  // ---------- intro cards ----------
  function drawIntro(q) {
    const it = IX.items.get(q.itemId);
    E.learn(S, it.id, today());
    const k = it.kind;
    const pills = (arr) => `<div class="pills">${arr.filter(Boolean).map((p) => `<span class="pill">${esc(p)}</span>`).join("")}</div>`;
    let inner = "";
    if (k === "word") {
      inner = `<div class="qlabel">Νέα λέξη</div><div class="headline"><span class="bigword">${esc(it.la)}</span><span class="sub">${esc(it.forms)}</span></div>
        ${pills([it.pos === "noun" ? E.GENDERS[it.gender] : null, it.decl ? (it.pos === "verb" ? (it.decl === "irreg" ? "ανώμαλο" : `${it.decl}η συζυγία`) : `${it.decl}η κλίση`) : null, it.dep ? "αποθετικό" : null, ...(it.lessons || []).map((l) => `μάθημα ${l}`)])}
        <p class="meaning">σημαίνει <em>${esc(it.el)}</em></p>
        ${it.hook ? `<div class="hookbox">${remoIcon}<span>${esc(it.hook)}</span></div>` : ""}
        ${it.trap ? `<div class="trapbox"><b>Παγίδα:</b> ${esc(it.trap)}</div>` : ""}
        ${it.etym && it.etym.length ? `<p class="muted" style="font-weight:700">Θέμα Β2: ${it.etym.map((e) => esc(e.el) + (e.official ? " (επίσημος κατάλογος)" : "")).join(", ")}</p>` : ""}`;
    } else if (k === "sentence") {
      inner = `<div class="qlabel">Από το κείμενο${it.lesson ? ` · μάθημα ${it.lesson}` : ""}${(it.exam || []).length ? ` · Παν. ${it.exam.join(", ")}` : ""}</div><div class="bigword sentence">${esc(it.la)}</div>
        ${it.gloss.length ? `<div class="exlist">${it.gloss.map((g) => `<div class="ex"><b>${esc(g.la)}</b><span>${esc(g.el)}</span></div>`).join("")}</div>` : ""}
        <p class="meaning" style="font-size:19px">${esc(it.el)}</p>
        ${it.notes.length ? `<div class="rulebox"><b>Συντακτικό:</b> ${it.notes.map((n) => `<span class="latin">${esc(n.w)}</span>: ${esc(n.role_el)} (${/^στο /.test(n.dep) ? esc(n.dep) : "στο " + esc(n.dep)})`).join(" · ")}</div>` : ""}`;
    } else if (k === "rule") {
      inner = `<div class="qlabel">Κανόνας</div><h1>${esc(it.title)}</h1><p class="story" style="font-weight:800">${esc(it.say)}</p>
        <div class="exlist">${it.ex.map((e) => `<div class="ex"><b>${esc(e.la)}</b><span>${esc(e.el)}</span></div>`).join("")}</div>${pills(it.terms)}`;
    } else if (k === "form") {
      inner = `<div class="qlabel">Τύπος</div><div class="bigword">${esc(it.given)}</div>${it.ctx ? `<div class="sub">${esc(it.ctx)}</div>` : ""}
        <p class="meaning">${esc(it.ask)} → <em class="latin">${esc(it.answer.join(" / "))}</em></p>
        <div class="rulebox"><b>Κανόνας:</b> ${esc(it.rule)}</div><p class="story">${esc(it.why)}</p>${(it.exam || []).length ? pills(it.exam.map((y) => `Παν. ${y}`)) : ""}`;
    } else if (k === "role") {
      inner = `<div class="qlabel">Συντακτικός ρόλος</div><div class="bigword sentence">${hl(it.la, it.w)}</div>
        <p class="meaning" style="font-size:19px"><span class="latin">${esc(it.w)}</span>: είναι <em>${esc(it.answer[0])}</em> ${esc(it.dep)}</p><p class="story">${esc(it.why)}</p>`;
    } else if (k === "clause") {
      inner = `<div class="qlabel">Δευτερεύουσα πρόταση</div><div class="bigword sentence">${esc(it.la)}</div>
        <ol class="steplist"><li><b>Είδος:</b> ${esc(it.kind_el)}</li><li><b>Λειτουργία:</b> ${esc(it.fn_el)}</li><li><b>Εισαγωγή:</b> ${esc(it.intro_el)}</li><li><b>Έγκλιση:</b> ${esc(it.mood_el)}</li><li><b>Χρόνος:</b> ${esc(it.tense_el)}</li></ol>${it.why ? `<p class="story">${esc(it.why)}</p>` : ""}`;
    } else if (k === "transform") {
      inner = `<div class="qlabel">Μετατροπή</div><p class="prompt">${esc(it.ask)}</p><div class="bigword sentence">${esc(it.from)}</div>
        <p class="meaning" style="font-size:19px">→ <em class="latin">${esc(it.to[0])}</em></p>
        ${it.steps.length ? `<ol class="steplist">${it.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>` : ""}<p class="story">${esc(it.why)}</p>`;
    } else if (k === "fact") {
      inner = `<div class="qlabel">Εισαγωγή</div><p class="prompt">${esc(it.q)}</p><p class="meaning"><em>${it.t === "tf" ? (it.a ? "Σωστό" : "Λάθος") : esc(it.a)}</em></p><p class="story">${esc(it.why)}</p>${pills([`τράπεζα: ${it.bankId}`])}`;
    } else if (k === "hook") {
      const T = { cognate: "ίδια ρίζα", loan: "δάνειο", official: "επίσημος κατάλογος", phrase: "φράση", calque: "μεταφραστικό δάνειο" };
      inner = `<div class="qlabel">Ετυμολογία · ${esc(T[it.type] || it.type)}</div><div class="headline"><span class="bigword">${esc(it.la)}</span><span class="prompt">→ ${esc(it.el)}</span></div><div class="hookbox">${remoIcon}<span>${esc(it.story)}</span></div>`;
    } else if (k === "origin") {
      inner = `<div class="qlabel">Λατινικό ή όχι;</div><div class="bigword" style="font-family:var(--font-ui)">${esc(it.w)}</div><p class="meaning"><em>${it.latin ? "Λατινικό" : "Όχι λατινικό"}</em></p><p class="story">${esc(it.from)}</p>`;
    } else if (k === "trap") {
      inner = `<div class="qlabel">Παγίδα</div><p class="prompt">${esc(it.ask)}</p><div class="answerbox"><span class="struck">${esc(it.wrong)}</span> → ${esc(it.right)}</div><p class="story">${esc(it.why)}</p>`;
    }
    shell(`<div class="intro">${inner}${it.say && k !== "rule" ? `<p class="muted" style="font-weight:800">Σε μια ανάσα: ${esc(it.say)}</p>` : ""}</div>`, footerBtn("Το 'πιασα"));
    $("#next").addEventListener("click", advance);
    $("#next").focus();
  }

  // ---------- mcq / tf ----------
  function drawMcq(q) {
    const inner = `${header(q)}<p class="prompt">${q.prompt}</p>${wordBlock(q)}<div class="options" role="group">${q.options.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${i + 1}</span><span>${esc(o)}</span></button>`).join("")}</div>`;
    shell(inner, "");
    $$(".opt").forEach((b) => b.addEventListener("click", () => answerMcq(q, +b.dataset.i)));
    if (run.mode === "colosseum") startTimer(() => answerMcq(q, -1));
  }
  function answerMcq(q, idx) {
    if (run.answered) return;
    run.answered = true;
    const ok = idx >= 0 && q.options[idx] === q.answer;
    $$(".opt").forEach((b, i) => { b.disabled = true; if (q.options[i] === q.answer) b.classList.add("right"); else if (i === idx) b.classList.add("wrong"); else b.classList.add("dim"); });
    resolve(q, ok, idx < 0 ? "Τέλος χρόνου!" : null);
  }
  function drawTf(q) {
    const inner = `${header(q)}<p class="prompt">${esc(q.prompt)}</p>${wordBlock(q)}<div class="tfrow"><button class="opt" data-v="1"><span class="k">1</span>${esc(q.yes)}</button><button class="opt" data-v="0"><span class="k">2</span>${esc(q.no)}</button></div>`;
    shell(inner, "");
    $$(".opt").forEach((b) => b.addEventListener("click", () => answerTf(q, b.dataset.v === "1", b)));
    if (run.mode === "colosseum") startTimer(() => answerTf(q, null, null));
  }
  function answerTf(q, v, btn) {
    if (run.answered) return;
    run.answered = true;
    const ok = v === q.answer;
    $$(".opt").forEach((b) => { b.disabled = true; if ((b.dataset.v === "1") === q.answer) b.classList.add("right"); else if (b === btn) b.classList.add("wrong"); });
    resolve(q, ok, v === null ? "Τέλος χρόνου!" : null);
  }

  // ---------- build (ordered or free) ----------
  function drawBuild(q) {
    const placed = [];
    const la = q.joiner === "" || /^[A-Za-zÀ-ɏ\s.,;:!?'’()-]+$/.test(q.tiles.join(""));
    const inner = `${header(q)}<p class="prompt">${q.prompt}</p>${wordBlock(q)}<div class="slots ${q.orderFree ? "free" : ""}" id="slots" aria-live="polite"></div>
      <div class="bank" id="bank">${q.tiles.map((t, i) => `<button class="chip ${la ? "la" : ""}" data-i="${i}">${esc(t)}</button>`).join("")}</div>`;
    shell(inner, footerBtn("Έλεγχος", "", "check", true));
    const slots = $("#slots"), check = $("#check");
    const redraw = () => {
      slots.innerHTML = placed.map((i, k) => `<button class="chip placed ${la ? "la" : ""}" data-k="${k}">${esc(q.tiles[i])}</button>`).join(q.joiner === "" ? "" : "");
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

  // ---------- transform (pick all the right tiles) ----------
  function drawTransform(q) {
    const placed = [];
    const inner = `${header(q)}<p class="prompt">${esc(q.prompt)}</p><div class="bigword sentence">${esc(q.word)}</div>
      ${q.hints.length ? `<div class="hints">${q.hints.map((h) => `<div class="hint">${esc(h)}</div>`).join("")}</div>` : ""}
      ${q.changed ? `<div class="changed">Αλλάζουν ${plural(q.changed, "λέξη", "λέξεις")}.</div>` : ""}
      <div class="slots ${q.orderFree ? "free" : ""}" id="slots" aria-live="polite"></div>
      <div class="bank" id="bank">${q.tiles.map((t, i) => `<button class="chip la" data-i="${i}">${esc(t)}</button>`).join("")}</div>`;
    shell(inner, footerBtn("Έλεγχος", "", "check", true));
    const slots = $("#slots"), check = $("#check");
    const redraw = () => {
      slots.innerHTML = placed.map((i, k) => `<button class="chip placed la" data-k="${k}">${esc(q.tiles[i])}</button>`).join("");
      $$("#bank .chip").forEach((b) => b.classList.toggle("used", placed.includes(+b.dataset.i)));
      $$(".chip", slots).forEach((b) => b.addEventListener("click", () => { if (run.answered) return; placed.splice(+b.dataset.k, 1); redraw(); }));
      check.disabled = placed.length === 0;
    };
    $$("#bank .chip").forEach((b) => b.addEventListener("click", () => { if (run.answered || placed.includes(+b.dataset.i)) return; placed.push(+b.dataset.i); sfx.tick(); redraw(); }));
    check.addEventListener("click", () => {
      if (run.answered) return;
      run.answered = true;
      const got = placed.map((i) => E.stripMarks(q.tiles[i]));
      const want = q.answer.map(E.stripMarks);
      const sameSet = got.length === want.length && want.every((w) => got.includes(w)) && got.every((g) => want.includes(g));
      const sameSeq = got.length === want.length && got.every((g, i) => g === want[i]);
      const typed = placed.map((i) => q.tiles[i]).join(" ");
      const ok = q.orderFree ? sameSet : (sameSeq || (q.accepted || []).some((a) => E.norm(a) === E.norm(typed)));
      resolve(q, ok);
    });
  }

  // ---------- slots (principal parts) ----------
  function drawSlots(q) {
    const filled = q.slots.map(() => null);
    const inner = `${header(q)}<p class="prompt">${q.prompt}</p><div class="slotgrid" id="slotgrid"></div><div class="bank" id="bank">${q.tiles.map((t, i) => `<button class="chip la" data-i="${i}">${esc(t)}</button>`).join("")}</div>`;
    shell(inner, footerBtn("Έλεγχος", "", "check", true));
    const grid = $("#slotgrid"), check = $("#check");
    const redraw = () => {
      grid.innerHTML = q.slots.map((s, k) => `<div class="slot"><span class="sl">${esc(s.label)}</span><div class="sv ${filled[k] != null ? "filled" : ""}" data-k="${k}" role="button" tabindex="0">${filled[k] != null ? esc(q.tiles[filled[k]]) : ""}</div></div>`).join("");
      $$("#bank .chip").forEach((b) => b.classList.toggle("used", filled.includes(+b.dataset.i)));
      $$(".sv", grid).forEach((d) => d.addEventListener("click", () => { if (run.answered) return; filled[+d.dataset.k] = null; redraw(); }));
      check.disabled = filled.some((x) => x == null);
    };
    $$("#bank .chip").forEach((b) => b.addEventListener("click", () => { if (run.answered || filled.includes(+b.dataset.i)) return; const k = filled.indexOf(null); if (k < 0) return; filled[k] = +b.dataset.i; sfx.tick(); redraw(); }));
    check.addEventListener("click", () => {
      if (run.answered) return;
      run.answered = true;
      let ok = true;
      $$(".sv", grid).forEach((d, k) => { const good = E.norm(q.tiles[filled[k]]) === E.norm(q.answer[k]); d.classList.add(good ? "ok" : "bad"); if (!good) ok = false; });
      resolve(q, ok);
    });
    redraw();
  }

  // ---------- bucket (sort one by one) ----------
  function drawBucket(q) {
    let i = 0, bad = false, busy = false;
    const inner = `${header(q)}<p class="prompt">${esc(q.prompt)}</p><div class="bucketcard" id="bcard"></div><div class="buckets" id="buckets">${q.buckets.map((b, k) => `<button class="bucketbtn" data-b="${k}"><span class="k">${k + 1}</span>${esc(b)}</button>`).join("")}</div><div class="bcount" id="bcount"></div>`;
    shell(inner, "");
    const card = $("#bcard"), count = $("#bcount");
    const show = () => { card.textContent = q.items[i].text; card.className = "bucketcard"; count.textContent = `${i + 1} / ${q.items.length}`; busy = false; };
    $$(".bucketbtn").forEach((b) => b.addEventListener("click", () => {
      if (run.answered || busy) return; // a second tap while the card flashes must not skip an item
      busy = true;
      const good = q.buckets[+b.dataset.b] === q.items[i].bucket;
      card.classList.add(good ? "ok" : "bad");
      if (good) sfx.right(); else { sfx.wrong(); bad = true; }
      setTimeout(() => { i += 1; if (i >= q.items.length) { run.answered = true; resolve(q, !bad, bad ? "Κάποια πήγαν σε λάθος κουτί." : null); } else show(); }, 420);
    }));
    show();
  }

  // ---------- find (tap words) ----------
  function drawFind(q) {
    const sel = new Set();
    const inner = `${header(q)}<p class="prompt">${esc(q.prompt)}</p><div class="findtext" id="find">${q.words.map((w, i) => `<button class="tok" data-i="${i}">${esc(w)}</button>`).join("")}</div>`;
    shell(inner, footerBtn("Έλεγχος", "", "check", true));
    const check = $("#check");
    $$(".tok").forEach((b) => b.addEventListener("click", () => { if (run.answered) return; const i = +b.dataset.i; if (sel.has(i)) sel.delete(i); else sel.add(i); b.classList.toggle("sel", sel.has(i)); check.disabled = sel.size === 0; }));
    check.addEventListener("click", () => {
      if (run.answered) return;
      run.answered = true;
      const want = new Set(q.answer);
      let ok = sel.size === want.size;
      $$(".tok").forEach((b) => { const i = +b.dataset.i; b.classList.remove("sel"); if (want.has(i) && sel.has(i)) b.classList.add("ok"); else if (sel.has(i)) { b.classList.add("bad"); ok = false; } else if (want.has(i)) { b.classList.add("miss"); ok = false; } });
      resolve(q, ok);
    });
  }

  // ---------- steps (clause justification, scored per step) ----------
  function drawSteps(q) {
    let k = 0, got = 0; const total = q.steps.reduce((a, s) => a + s.marks, 0); const parts = [];
    const render1 = () => {
      const st = q.steps[k];
      const inner = `${header(q)}<div class="bigword sentence">${esc(q.word)}</div><div class="para" id="para">${parts.join(" ") || '<span class="muted">Η απάντησή σου χτίζεται εδώ…</span>'}</div>
        <div class="stepq"><p class="prompt" style="font-size:18px">${k + 1}. ${esc(st.q)}</p><span class="m">${st.marks} μον.</span></div>
        <div class="options">${st.options.map((o, i) => `<button class="opt" data-i="${i}"><span class="k">${i + 1}</span><span>${esc(o)}</span></button>`).join("")}</div>`;
      shell(inner, "");
      $$(".opt").forEach((b) => b.addEventListener("click", () => {
        if (run.answered) return;
        const ok = st.options[+b.dataset.i] === st.answer;
        $$(".opt").forEach((x, i) => { x.disabled = true; if (st.options[i] === st.answer) x.classList.add("right"); else if (i === +b.dataset.i) x.classList.add("wrong"); else x.classList.add("dim"); });
        if (ok) { got += st.marks; sfx.right(); } else { sfx.wrong(); buzz(30); }
        parts.push(`<span class="${ok ? "ok" : "bad"}">${esc(ok ? st.answer : st.options[+b.dataset.i])}</span>${ok ? "" : ` <span class="ok">${esc(st.answer)}</span>`}`);
        setTimeout(() => { k += 1; if (k >= q.steps.length) { run.answered = true; resolve(q, got === total, got === total ? null : `${got}/${total} μονάδες`, got / total); } else render1(); }, 650);
      }));
    };
    render1();
  }

  // ---------- spot the trap ----------
  function drawSpot(q) {
    const inner = `${header(q)}<p class="prompt">${esc(q.prompt)}</p><div class="answerbox">${esc(q.shown)}</div><p class="muted" style="font-weight:800">Αυτή η απάντηση είναι…</p>
      <div class="tfrow"><button class="opt" data-v="1"><span class="k">1</span>Σωστή</button><button class="opt" data-v="0"><span class="k">2</span>Λάθος</button></div>`;
    shell(inner, "");
    $$(".opt").forEach((b) => b.addEventListener("click", () => {
      if (run.answered) return;
      const saysRight = b.dataset.v === "1";
      const ok1 = saysRight === q.isRight;
      $$(".opt").forEach((x) => { x.disabled = true; if ((x.dataset.v === "1") === q.isRight) x.classList.add("right"); else if (x === b) x.classList.add("wrong"); });
      if (q.isRight || !ok1) { run.answered = true; resolve(q, ok1); return; }
      sfx.right();
      setTimeout(() => {
        const inner2 = `${header(q)}<p class="prompt">${esc(q.prompt)}</p><div class="answerbox"><span class="struck">${esc(q.shown)}</span></div><p class="muted" style="font-weight:800">Σωστά, είναι λάθος. Ποια είναι η σωστή;</p>
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

  // ---------- typed answer, with tiles fallback ----------
  function drawType(q) {
    const inner = `${header(q)}<p class="prompt">${q.prompt}</p>${wordBlock(q)}<input class="typein" id="typein" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="γράψε τον τύπο" aria-label="Απάντηση" lang="la">
      ${q.tiles ? `<button class="linkbtn" id="show-tiles" style="align-self:center">Δείξε μου πλακίδια</button>` : ""}`;
    shell(inner, footerBtn("Έλεγχος", "", "check", true));
    const inp = $("#typein"), check = $("#check");
    inp.addEventListener("input", () => { check.disabled = !inp.value.trim(); });
    inp.addEventListener("keydown", (e) => { if (e.key === "Enter" && !check.disabled) check.click(); });
    const st = $("#show-tiles");
    // «Δείξε μου πλακίδια»: downgrade to the build game, no penalty.
    if (st) st.addEventListener("click", () => { run.steps[run.i] = { ...q, type: "build", label: `${q.label} · πλακίδια`, answer: tilesAnswer(q), joiner: "" }; drawStep(); });
    check.addEventListener("click", () => {
      if (run.answered) return;
      run.answered = true;
      const ok = E.accepts(q.answer, inp.value);
      inp.classList.add(ok ? "ok" : "bad"); inp.disabled = true;
      resolve(q, ok);
    });
    setTimeout(() => inp.focus(), 50);
  }
  /** The ordered tiles that spell the first accepted answer (the item's own tiles, in order). */
  function tilesAnswer(q) {
    const it = IX.items.get(q.itemId);
    return it && it.tiles ? it.tiles : q.tiles;
  }

  // ---------- swipe (self-graded flashcards) ----------
  function drawSwipe(q) {
    let i = 0, flipped = false, known = 0;
    const show = () => {
      const c = q.cards[i];
      shell(`${header(q)}<p class="prompt" style="font-size:17px">${esc(q.prompt)}</p>
        <div class="flashcard" id="card" role="button" tabindex="0">${flipped ? `<div class="front" style="font-size:28px;color:var(--muted)">${esc(c.front)}</div><div class="back">${esc(c.back)}</div>${c.hook ? `<div class="hk">${esc(c.hook)}</div>` : ""}` : `<div class="front">${esc(c.front)}</div>${c.sub ? `<div class="sub">${esc(c.sub)}</div>` : ""}<div class="hk">πάτα για να γυρίσει</div>`}</div>
        <div class="swipecount">${i + 1} / ${q.cards.length}</div>`,
      `<div class="footer-inner"><div class="swipebar"><button class="btn clay" id="no" ${flipped ? "" : "disabled"}>Όχι ακόμη</button><button class="btn olive" id="yes" ${flipped ? "" : "disabled"}>Το ξέρω</button></div></div>`);
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
      if (ok) { sfx.right(); [lb, rb].forEach((b) => { b.classList.remove("sel"); b.classList.add("ok"); b.disabled = true; }); done++; if (done === q.pairs.length) { run.answered = true; resolve(q, !bad, bad ? "Με κάποια λάθη στη διαδρομή." : null); } }
      else { bad = true; sfx.wrong(); buzz(40); [lb, rb].forEach((b) => { b.classList.remove("sel"); b.classList.add("bad"); setTimeout(() => b.classList.remove("bad"), 350); }); }
      selL = selR = null;
    };
    $$("[data-l]").forEach((b) => b.addEventListener("click", () => { $$("[data-l]").forEach((x) => x.classList.remove("sel")); selL = b.dataset.l; b.classList.add("sel"); tryPair(); }));
    $$("[data-r]").forEach((b) => b.addEventListener("click", () => { $$("[data-r]").forEach((x) => x.classList.remove("sel")); selR = b.dataset.r; b.classList.add("sel"); tryPair(); }));
  }

  // ---------- grading and feedback ----------
  const RIGHT = ["Σωστά!", "Ακριβώς.", "Bene! Έτσι γράφεται το 20.", "Ο Κικέρων θα χαμογελούσε.", "Σαν βαθμολογητής.", "Recte!"];
  const WRONG = ["Σχεδόν. Θα ξανάρθει στο τέλος.", "Όχι ακόμη. Δες το γιατί.", "Θα το ξαναδούμε. Έτσι μαθαίνεται.", "Αυτό το γράφουμε στο Τετράδιο λαθών."];
  const GUESS = ["Καλή μαντεψιά! Τώρα το μαθαίνουμε.", "Το να μαντεύεις πρώτα το κάνει να κολλάει. Ορίστε η απάντηση."];

  function resolve(q, ok, why = null, score = ok ? 1 : 0) {
    clearTimeout(timer);
    track("question_answered", { ...runProps(), ...stepProps(q), correct: !!ok, score, graded: !q.guess, ms: run.stepAt ? Date.now() - run.stepAt : null, combo: ok ? run.combo + 1 : 0 });
    const t = today();
    if (q.guess) { (ok ? sfx.right : sfx.tick)(); showFeedback(true, ok ? "Καλό ένστικτο!" : pick(GUESS), q, true); return; }
    run.scored += 1; S.answered += 1;
    if (ok) { run.right += 1; S.correct += 1; run.combo += 1; run.maxCombo = Math.max(run.maxCombo, run.combo); sfx.right(); buzz(15); }
    else { run.misses += 1; run.combo = 0; sfx.wrong(); buzz([30, 40, 30]); }
    const ids = q.itemIds || (q.itemId ? [q.itemId] : []);
    for (const id of ids) E.grade(S, id, ok, t);
    run.results.push({ q, score });
    if (run.mode === "colosseum") { showFeedback(ok, ok ? pick(RIGHT) : why || "Ήττα στην αρένα!", q); return; }
    if (!ok && !run.requeued.has(run.i) && run.mode !== "daily" && run.mode !== "mock") {
      run.requeued.add(run.steps.length);
      run.steps.push({ ...q, label: E.L.again, marks: undefined });
    }
    showFeedback(ok, ok ? (run.combo >= 3 ? `${run.combo} στη σειρά!` : pick(RIGHT)) : why || pick(WRONG), q);
  }
  function answerText(q) {
    if (q.type === "mcq") return esc(q.answer);
    if (q.type === "build") return esc(q.answer.join(q.joiner === "" ? "-" : " "));
    if (q.type === "transform") return `<span class="la">${esc(q.accepted ? q.accepted[0] : q.answer.join(" "))}</span>`;
    if (q.type === "slots") return `<span class="la">${esc(q.answer.join(", "))}</span>`;
    if (q.type === "type") return `<span class="la">${esc(q.answer.join(" / "))}</span>`;
    if (q.type === "tf") return esc(q.answer ? q.yes : q.no);
    if (q.type === "find") return `<span class="la">${esc(q.answer.map((i) => q.words[i]).join(", "))}</span>`;
    if (q.type === "spot") return esc(q.fix);
    return "";
  }
  function showFeedback(ok, title, q, neutral = false) {
    const f = $("#footer");
    f.className = `footer ${ok ? "right" : "wrong"}`;
    const ans = !ok && answerText(q) ? `<b>Απάντηση:</b> ${answerText(q)}<br>` : "";
    const lastCol = run.mode === "colosseum" && !ok;
    f.innerHTML = `<div class="footer-inner" role="status">
      <div class="fb-remo">${mascot(ok || neutral ? "happy" : "sad")}<div><div class="fb-title">${ok || neutral ? I.check.replace("<svg", '<svg width="26" height="26"') : I.x.replace("<svg", '<svg width="26" height="26"')} ${esc(title)}</div>
      <div class="fb-body">${ans}${esc(q.explain || "")}</div></div></div>
      <button class="btn block ${ok || neutral ? "olive" : "clay"}" id="next">${lastCol ? "Δες το σκορ" : "Συνέχεια"}</button></div>`;
    const next = $("#next");
    next.addEventListener("click", () => (run.mode === "colosseum" ? (ok ? nextColosseum() : finishColosseum()) : advance()));
    next.focus();
  }

  function finishRun() {
    const t = today();
    const perfect = run.misses === 0;
    const base = { lesson: 10, roundup: 15, practice: 8, notebook: 8, daily: 10, mock: 15, swipe: 5 }[run.mode] || 8;
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
      else sittingLine = `Μέρος ${run.sitting + 1} από ${total}. Το επόμενο συνεχίζει από εκεί που έμεινες.`;
    }
    if (run.node && run.mode === "roundup") S.done[run.node.id] = { perfect, at: t };
    const sections = E.scoreSections(run.results);
    let scoreLine = "";
    if (run.mode === "daily") {
      const got = Object.values(sections).reduce((a, [g]) => a + g, 0);
      E.recordDaily(S, t, got, run.daily.marks, run.daily.section);
      scoreLine = `Σήμερα: ${Math.round(got * 10) / 10} / ${run.daily.marks} μονάδες.`;
    }
    if (run.mode === "mock") {
      const got = Object.values(sections).reduce((a, [g]) => a + g, 0);
      S.mocks.push({ at: t, score: Math.round(got * 10) / 10, marks: run.marks, sections });
      scoreLine = `Διαγώνισμα: ${Math.round(got)} / ${run.marks}.`;
    }
    const fresh = E.awardBadges(S, t, IX);
    save();
    run.finished = true;
    const marksGot = Object.values(sections).reduce((a, [g]) => a + g, 0), marksMax = Object.values(sections).reduce((a, [, m]) => a + m, 0);
    track("lesson_completed", { ...runProps(), accuracy: run.scored ? run.right / run.scored : 1, perfect, misses: run.misses, xp: gained, seconds: Math.round((Date.now() - run.start) / 1000), max_combo: run.maxCombo, streak: S.streak, used_freeze: !!(st && st.usedFreeze), marks_got: marksMax ? Math.round(marksGot * 10) / 10 : null, marks_max: marksMax || null, sections: marksMax ? sections : null });
    for (const b of fresh) track("badge_earned", { badge: b.id || b.name });
    syncProgress();
    const acc = run.scored ? Math.round((run.right / run.scored) * 100) : 100;
    const secs = Math.round((Date.now() - run.start) / 1000);
    sfx.done(); if (perfect || fresh.length || run.mode === "mock") confetti();
    const streakLine = !wasActive && st.streakUp ? (st.usedFreeze ? `Μια άδεια έσωσε το σερί. ${plural(S.streak, "μέρα", "μέρες")}!` : S.streak > 1 ? `Σερί ${plural(S.streak, "ημέρας", "ημερών")}!` : "Μέρα 1 του σερί. Τα λέμε αύριο.") : `Σερί: ${plural(S.streak, "μέρα", "μέρες")}.`;
    const bars = run.mode === "mock" || run.mode === "daily" ? `<div class="secbars">${Object.entries(sections).map(([sec, [g, m]]) => `<div class="secbar"><span>${esc(sec)}</span><div class="bar"><i style="width:${m ? (g / m) * 100 : 0}%"></i></div><span class="tnum">${Math.round(g * 10) / 10}/${Math.round(m * 10) / 10}</span></div>`).join("")}</div>` : "";
    shell(`<div class="results">
      ${mascot("cheer")}
      <h1>${perfect && run.scored ? "Sine errore!" : acc < 50 ? pick(["Gutta cavat lapidem.", "Τα λάθη μαθαίνονται πρώτα.", "Ξανά, με το Τετράδιο λαθών."]) : pick(["Bene factum!", "Μάθημα τέλος!", "Carpe diem."])}</h1>
      <div class="resgrid">
        <div class="res gold"><div class="h">Δηνάρια</div><div class="v">+${gained}</div></div>
        <div class="res olive"><div class="h">Ακρίβεια</div><div class="v">${acc}%</div></div>
        <div class="res flame"><div class="h">Χρόνος</div><div class="v">${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}</div></div>
      </div>
      ${bars}
      ${scoreLine ? `<p style="font-weight:900">${esc(scoreLine)}</p>` : ""}
      <p style="font-weight:800">${esc(streakLine)}</p>
      ${sittingLine ? `<p class="muted" style="font-weight:700">${esc(sittingLine)}</p>` : ""}
      ${fresh.map((b) => `<div class="newbadge">${wreath(b.name[0]).replace("<svg", '<svg width="40" height="40"')}<div>Νέος τίτλος: ${esc(b.name)}<br><span class="muted">${esc(b.desc)}</span></div></div>`).join("")}
    </div>`, footerBtn("Συνέχεια", "gold"));
    $(".progress > i") && ($(".progress > i").style.width = "100%");
    $("#next").addEventListener("click", closeRun);
    $("#next").focus();
  }

  // ---------- Κολοσσαίο ----------
  let timer = null;
  function startColosseum() {
    track("colosseum_started", { best: S.colosseumBest });
    run = { mode: "colosseum", node: null, steps: [], i: 0, misses: 0, combo: 0, maxCombo: 0, right: 0, scored: 0, requeued: new Set(), answered: false, start: Date.now(), results: [], r: E.rng(seed()) };
    ui.overlay = "lesson";
    shell(`<div class="results">${mascot("gladiator")}<h1>Κολοσσαίο</h1><p class="story" style="max-width:34ch">Κάθε ερώτηση είναι ένας μονομάχος: 20 δευτερόλεπτα, τρεις επιλογές. Ένα λάθος και η αρένα κλείνει. Πόσους θα νικήσεις;</p><p class="muted" style="font-weight:800">Ρεκόρ: ${S.colosseumBest}</p></div>`, footerBtn("Άνοιξε τις πύλες", "gold"));
    $("#next").addEventListener("click", nextColosseum);
  }
  function nextColosseum() {
    const q = E.colosseumQuestion(IX, S, run.r);
    if (!q) { toast("Δεν υπάρχουν ακόμη ερωτήσεις για την αρένα"); return closeRun(); }
    run.steps = [q]; run.i = 0;
    drawStep();
  }
  function startTimer(onTimeout) {
    const bar = $("#timer");
    if (bar) { bar.style.transition = "none"; bar.style.transform = "scaleX(1)"; requestAnimationFrame(() => requestAnimationFrame(() => { bar.style.transition = `transform ${E.COLOSSEUM_MS}ms linear`; bar.style.transform = "scaleX(0)"; })); }
    clearTimeout(timer);
    timer = setTimeout(onTimeout, E.COLOSSEUM_MS);
  }
  function finishColosseum() {
    const t = today();
    const score = run.right;
    const best = score > S.colosseumBest;
    if (best) S.colosseumBest = score;
    const gained = Math.min(score * 3, 30);
    const prevTodayXp = S.days[t] || 0;
    if (gained > 0) { E.addXp(S, t, gained); trackDayProgress(prevTodayXp, E.touchStreak(S, t)); }
    const fresh = E.awardBadges(S, t, IX);
    track("colosseum_finished", { wins: score, new_best: best && score > 0, best: S.colosseumBest, xp: gained, seconds: Math.round((Date.now() - run.start) / 1000) });
    for (const b of fresh) track("badge_earned", { badge: b.id || b.name });
    syncProgress();
    save();
    run.finished = true;
    if (best && score > 0) confetti();
    sfx.done();
    shell(`<div class="results">${mascot(score >= 5 ? "cheer" : "sad")}
      <h1>${score === 0 ? "Η αρένα έκλεισε" : best ? "Νέο ρεκόρ!" : `${plural(score, "νίκη", "νίκες")}!`}</h1>
      <div class="resgrid"><div class="res gold"><div class="h">Δηνάρια</div><div class="v">+${gained}</div></div><div class="res flame"><div class="h">Νίκες</div><div class="v">${score}</div></div><div class="res olive"><div class="h">Ρεκόρ</div><div class="v">${S.colosseumBest}</div></div></div>
      ${fresh.map((b) => `<div class="newbadge">${wreath(b.name[0]).replace("<svg", '<svg width="40" height="40"')}<div>Νέος τίτλος: ${esc(b.name)}</div></div>`).join("")}
    </div>`, `<div class="footer-inner"><button class="btn block gold" id="again">Ξανά στην αρένα</button><button class="btn block ghost" id="next">Τέλος</button></div>`);
    $("#again").addEventListener("click", startColosseum);
    $("#next").addEventListener("click", closeRun);
  }

  // ---------- keyboard ----------
  addEventListener("keydown", (e) => {
    if (ui.overlay !== "lesson" || !run) return;
    if (e.target && e.target.tagName === "INPUT" && e.key !== "Escape") return;
    const qb = $(".quitbox");
    if (qb) { if (e.key === "Escape") { e.preventDefault(); qb.remove(); } return; }
    if (e.key === "Escape") return requestClose();
    if (/^[1-4]$/.test(e.key) && !run.answered) { const opts = $$(".options .opt, .tfrow .opt, .buckets .bucketbtn"); const b = opts[+e.key - 1]; if (b) { e.preventDefault(); b.click(); } }
    if (e.key === "Enter") { const n = $("#next") || $("#check"); if (n && !n.disabled && document.activeElement !== n) { e.preventDefault(); n.click(); } }
  });

  // ---------- boot ----------
  const h = location.hash.slice(1);
  if (TABS.some((t) => t.id === h)) ui.tab = h;
  render();
  trackAppOpened();
})();
