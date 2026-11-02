// Pure game logic for "Carpe": dates, streaks, spaced review, question builders, daily drill,
// Colosseum, mock exam, badges. No DOM access, so `npm test` can check everything.
// Content comes in as an array of unit objects (see CONTENT_SCHEMA.md); `indexCourse` makes it queryable.

const Engine = (() => {
  // ---------- constants ----------
  const EXAM_DATE = "2027-06-02"; // Wednesday 2 June 2027, 08:30 (news report of the ministry schedule; confirm in spring)
  const EXAM_TIME = "08:30";
  const REVIEW_CAP_DAYS_BEFORE = 7; // from May on, no review is scheduled later than exam - 7 days
  const SECTION_MARKS = { "Α1": 20, "Β1": 10, "Β2": 10, "Γ1": 15, "Γ2": 15, "Δ1": 15, "Δ2": 15 };
  const SECTIONS = Object.keys(SECTION_MARKS);
  const COLOSSEUM_MS = 20000;
  const SITTING_WEIGHT = 12; // estimated graded steps per sitting («συνέχεια»)

  // ---------- dates (local calendar days as "YYYY-MM-DD") ----------
  function dayKey(d = new Date()) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }
  function parseDay(key) {
    const [y, m, d] = key.split("-").map(Number);
    return new Date(y, m - 1, d, 12); // noon avoids DST edge cases
  }
  function addDays(key, n) {
    const d = parseDay(key);
    d.setDate(d.getDate() + n);
    return dayKey(d);
  }
  function daysBetween(a, b) {
    return Math.round((parseDay(b) - parseDay(a)) / 86400000);
  }
  /** Monday of the week that holds `key`. */
  function weekKey(key) {
    const d = parseDay(key);
    const dow = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - dow);
    return dayKey(d);
  }
  function isWeekend(key) {
    const dow = parseDay(key).getDay();
    return dow === 0 || dow === 6;
  }
  function weekday(key) { return parseDay(key).getDay(); } // 0 = Sunday
  /** Weekdays strictly between a and b. */
  function missedWeekdays(a, b) {
    let n = 0;
    for (let k = addDays(a, 1); k < b; k = addDays(k, 1)) if (!isWeekend(k)) n++;
    return n;
  }
  const GR_DAYS = ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"];
  const GR_MONTHS_GEN = ["Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαΐου", "Ιουνίου", "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωβρίου", "Νοεμβρίου", "Δεκεμβρίου"];
  function fmtDayGr(key) {
    const d = parseDay(key);
    return `${GR_DAYS[d.getDay()]} ${d.getDate()} ${GR_MONTHS_GEN[d.getMonth()]}`;
  }

  // ---------- state ----------
  const GOALS = [
    { xp: 10, id: "tiro", label: "Tiro", sub: "1 μάθημα · ~3′" },
    { xp: 20, id: "miles", label: "Miles", sub: "2 μαθήματα · ~7′" },
    { xp: 40, id: "centurio", label: "Centurio", sub: "4 μαθήματα · ~15′" },
  ];
  const MAX_FREEZES = 2;

  function freshState() {
    return {
      v: 1,
      onboarded: false,
      name: "",
      goal: 10,
      sound: true,
      examDate: EXAM_DATE,
      schoolLesson: 16, // «στο σχολείο είμαστε στο μάθημα N» (16-50)
      xp: 0, // δηνάρια
      days: {}, // dayKey -> xp earned that day
      streak: 0,
      bestStreak: 0,
      lastDay: null,
      freezes: 1,
      freezeWeek: null,
      done: {}, // lessonId | roundupId -> { perfect, at }
      sittings: {}, // lessonId -> sittings completed so far
      items: {}, // itemId -> { box, due, right, wrong }
      colosseumBest: 0,
      practices: 0,
      dailies: {}, // dayKey -> { section, score, marks }
      dailyStreak: 0,
      mocks: [], // { at, score, marks, sections: {Α1: [score, marks], ...} }
      answered: 0,
      correct: 0,
      badges: {}, // badgeId -> dayKey
      updatedAt: 0,
    };
  }

  /**
   * Record activity on `today` and update the streak («σερί»).
   * Weekends never break a streak. A missed weekday uses a freeze («άδεια») if one is left.
   * One free freeze per week (capped at MAX_FREEZES), +1 every 7-day streak.
   */
  function touchStreak(s, today) {
    const out = { streakUp: false, usedFreeze: 0, reset: false };
    const wk = weekKey(today);
    if (s.freezeWeek !== wk) {
      s.freezeWeek = wk;
      if (s.freezes < 1) s.freezes = 1;
    }
    if (s.lastDay === today) return out;
    if (!s.lastDay || s.lastDay > today) {
      s.streak = 1;
    } else {
      const missed = missedWeekdays(s.lastDay, today);
      if (missed === 0) s.streak += 1;
      else if (missed <= s.freezes) { s.freezes -= missed; out.usedFreeze = missed; s.streak += 1; }
      else { s.streak = 1; out.reset = true; }
    }
    out.streakUp = true;
    s.lastDay = today;
    if (s.streak > s.bestStreak) s.bestStreak = s.streak;
    if (s.streak > 0 && s.streak % 7 === 0 && s.freezes < MAX_FREEZES) s.freezes += 1;
    return out;
  }
  function liveStreak(s, today) {
    if (!s.lastDay) return 0;
    if (s.lastDay === today) return s.streak;
    const missed = missedWeekdays(s.lastDay, today);
    return missed <= s.freezes ? s.streak : 0;
  }
  function addXp(s, today, n) {
    s.xp += n;
    s.days[today] = (s.days[today] || 0) + n;
  }
  function weekXp(s, today) {
    const start = weekKey(today);
    let t = 0;
    for (const [k, v] of Object.entries(s.days)) if (k >= start && k <= today) t += v;
    return t;
  }

  // ---------- exam countdown ----------
  function examDate(s) { return (s && /^\d{4}-\d{2}-\d{2}$/.test(s.examDate || "") ? s.examDate : EXAM_DATE); }
  /** Days left and the study phase shown as a Roman road. */
  function countdown(s, today) {
    const date = examDate(s);
    const days = daysBetween(today, date);
    const phase = days > 120 ? { id: "foundations", label: "Θεμέλια", sub: "Μάθε τις μονάδες" }
      : days > 30 ? { id: "walls", label: "Οχύρωση", sub: "Επανάληψη και διαγωνίσματα" }
      : days >= 0 ? { id: "via", label: "Via Appia", sub: "Μόνο επανάληψη και Θέμα της ημέρας" }
      : { id: "after", label: "Μετά την εξέταση", sub: "Carpe diem." };
    return { days, date, label: fmtDayGr(date), time: EXAM_TIME, phase };
  }

  // ---------- spaced review (Leitner boxes) ----------
  const INTERVALS = [1, 3, 7, 14, 30, 60]; // days until the next review for box 1..6
  function reviewCap(s) { return addDays(examDate(s), -REVIEW_CAP_DAYS_BEFORE); }
  function capDue(s, due, today) {
    const cap = reviewCap(s);
    if (due <= cap) return due;
    return cap > today ? cap : addDays(today, 1);
  }
  /**
   * Many headwords are drilled in several units (the text vocabulary of lessons 16-27, then again as
   * principal parts in the verb unit). Progress for such a word is kept under ONE id, the first
   * occurrence in course order, so review, the Colosseum and the counters never double count it.
   */
  const CANON = new Map();
  const canon = (id) => CANON.get(id) || id;
  function learn(s, id, today) {
    id = canon(id);
    if (!s.items[id]) s.items[id] = { box: 1, due: capDue(s, addDays(today, INTERVALS[0]), today), right: 0, wrong: 0 };
  }
  /**
   * Grade one answer. A miss drops the item to box 1. `weight: 0.5` (self-graded swipe cards)
   * drops only one box on a miss and still promotes on a hit.
   */
  function grade(s, id, correct, today, { weight = 1 } = {}) {
    id = canon(id);
    learn(s, id, today);
    const it = s.items[id];
    if (correct) {
      it.right += 1;
      if (it.due <= today) it.box = Math.min(it.box + 1, INTERVALS.length);
    } else {
      it.wrong += 1;
      it.box = weight < 1 ? Math.max(1, it.box - 1) : 1;
    }
    it.due = capDue(s, addDays(today, INTERVALS[it.box - 1]), today);
  }
  function dueItems(s, today) {
    return Object.entries(s.items)
      .filter(([, v]) => v.due <= today)
      .sort((a, b) => (a[1].due < b[1].due ? -1 : a[1].due > b[1].due ? 1 : a[1].box - b[1].box))
      .map(([k]) => k);
  }
  /** Τετράδιο λαθών: items missed at least twice, worst first. */
  function notebookItems(s) {
    return Object.entries(s.items).filter(([, v]) => v.wrong >= 2).sort((a, b) => b[1].wrong - a[1].wrong || a[1].box - b[1].box).map(([k]) => k);
  }

  // ---------- source labels ----------
  /**
   * Cards carry a `src` written for the authors (it may name research notes such as «syntax.md §3.2»).
   * The student sees only the part that means something to her: the textbook lesson, the Panhellenic
   * year, the ministry list. File names and section numbers of our notes are dropped.
   */
  function cleanSrc(src) {
    const parts = String(src || "").split(/[·;]/).map((seg) => {
      let t = seg
        .replace(/\([^)]*(?:ctx|myth-busters)[^)]*\)/gi, " ")
        .replace(/\([≃⩽≈≤]\)/g, " ")
        .replace(/\b[\w.-]+\.(?:md|jsonl?|txt)\b(?:\s*§[\w.,§ ]*)?/gi, " ")
        .replace(/§[\w.,§ ]*/g, " ")
        .replace(/\bel\.wiktionary\b/gi, "Βικιλεξικό").replace(/\ben\.wiktionary\b/gi, "Wiktionary")
        .replace(/\bministry guidelines\b/i, "Οδηγίες ΥΠΑΙΘ")
        .replace(/\s+/g, " ").trim();
      const m = t.match(/^\((.*)\)$/);
      if (m) t = m[1];
      return t.replace(/(?:,\s*δεν υπάρχει|κλειδί όπως|όπως)?\s*στο$/, "").replace(/\(\s*\)/g, "").replace(/^[,\s]+|[,\s]+$/g, "").trim();
    }).filter(Boolean);
    return parts.join(" · ") || "Carpe";
  }

  // ---------- answer normalisation ----------
  /** Lowercase, strip macrons/breves/accents, collapse spaces, drop edge punctuation. v/u and i/j stay as typed. */
  const normCache = new Map();
  function norm(str) {
    const key = String(str || "");
    let out = normCache.get(key);
    if (out === undefined) {
      out = key
        .normalize("NFD").replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[.,;:!?«»"'()]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (normCache.size > 50000) normCache.clear();
      normCache.set(key, out);
    }
    return out;
  }
  function sameAnswer(a, b) { return norm(a) === norm(b); }
  function accepts(answers, typed) { return (Array.isArray(answers) ? answers : [answers]).some((a) => sameAnswer(a, typed)); }
  /** Latin sentence → display tokens (punctuation kept on the token) */
  function tokens(la) { return String(la).split(/\s+/).filter(Boolean); }
  const stripMarks = (w) => norm(w).replace(/\s/g, "");

  // ---------- course index ----------
  const VERB_CELL = /^(ind|subj|impv|inf|ptc|ger|gdv|sup|periph)/;
  const isVerbCell = (cell) => VERB_CELL.test(String(cell || ""));
  const WEIGHT = { word: 2, sentence: 2, form: 1.5, role: 2, clause: 1.5, transform: 1.5, fact: 1, hook: 1, origin: 1, trap: 1 };
  const itemWeight = (it) => (it.kind === "rule" ? 1 + ((it.quiz || []).length) : WEIGHT[it.kind] || 1);

  function sortUnits(units) {
    const n = (u) => (u.id === "u0_example" ? 0 : parseInt(String(u.id).replace(/^u/, ""), 10) || 999);
    return units.slice().sort((a, b) => n(a) - n(b));
  }

  function indexCourse(units) {
    const course = { units: sortUnits(units) };
    const items = new Map();
    const lessons = [];
    const byKind = {};
    for (const u of course.units) {
      for (const l of u.lessons) {
        lessons.push({ ...l, unitId: u.id });
        for (const it of l.items) {
          const full = { ...it, lessonId: l.id, unitId: u.id };
          items.set(it.id, full);
          (byKind[it.kind] = byKind[it.kind] || []).push(full);
        }
      }
    }
    for (const k of Object.keys(WEIGHT).concat("rule")) byKind[k] = byKind[k] || [];
    // the same headword in several lessons shares one progress id (the first in course order)
    const firstOf = new Map();
    for (const w of (byKind.word || []).concat(byKind.hook || [])) {
      const key = w.kind + "|" + norm(w.la) + (w.kind === "hook" ? "|" + norm(w.el) : "");
      if (!firstOf.has(key)) firstOf.set(key, w.id);
      else CANON.set(w.id, firstOf.get(key));
    }
    const isDup = (it) => CANON.has(it.id);
    const unitOf = (id) => course.units.find((u) => u.id === id);
    /** items of units that feed an exam section */
    const forSection = (sec, kind) => [...items.values()].filter((it) => (!kind || it.kind === kind) && (unitOf(it.unitId).exam || []).includes(sec));
    const sentenceChunks = [...new Set(byKind.sentence.flatMap((x) => x.chunks))];
    return { course, items, lessons, byKind, unitOf, forSection, sentenceChunks, isDup };
  }

  /** Items of a lesson split into sittings of roughly SITTING_WEIGHT graded steps. */
  function lessonSittings(ix, lessonId) {
    const l = ix.lessons.find((x) => x.id === lessonId);
    if (!l) return [];
    const out = [[]];
    let w = 0;
    for (const it of l.items) {
      const iw = itemWeight(it);
      if (w + iw > SITTING_WEIGHT && out[out.length - 1].length) { out.push([]); w = 0; }
      out[out.length - 1].push(it.id);
      w += iw;
    }
    return out;
  }

  // ---------- path: first lesson of every unit open, sequential inside, roundup last ----------
  const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  function pathNodes(ix) {
    const nodes = [];
    for (const u of ix.course.units) {
      u.lessons.forEach((l, i) => nodes.push({ id: l.id, unitId: u.id, title: l.title, letter: ROMAN[i] || "•", kind: "lesson", index: i }));
      nodes.push({ id: `${u.id}-review`, unitId: u.id, title: "Ανακεφαλαίωση", letter: "Ω", kind: "roundup", index: u.lessons.length });
    }
    return nodes;
  }
  function isUnlocked(ix, s, nodeId) {
    if (s.done[nodeId]) return true;
    const nodes = pathNodes(ix);
    const n = nodes.find((x) => x.id === nodeId);
    if (!n) return false;
    const unitNodes = nodes.filter((x) => x.unitId === n.unitId);
    if (n.kind === "roundup") return unitNodes.filter((x) => x.kind === "lesson").every((x) => s.done[x.id]);
    return n.index === 0 || !!s.done[unitNodes[n.index - 1].id];
  }
  /** Next thing to do: the unit in progress first, else the first open node. */
  function nextNode(ix, s) {
    const nodes = pathNodes(ix).filter((n) => !s.done[n.id] && isUnlocked(ix, s, n.id));
    const started = nodes.find((n) => n.index > 0 || (s.sittings[n.id] || 0) > 0);
    return started || nodes[0] || null;
  }
  function unitProgress(ix, s, unitId) {
    const nodes = pathNodes(ix).filter((n) => n.unitId === unitId);
    const done = nodes.filter((n) => s.done[n.id]).length;
    return { done, total: nodes.length };
  }
  /** Sittings still to play on the whole Via Appia (lessons count their remaining parts, a roundup counts one). */
  function remainingSittings(ix, s) {
    let n = 0;
    for (const node of pathNodes(ix)) {
      if (s.done[node.id]) continue;
      n += node.kind === "roundup" ? 1 : Math.max(0, lessonSittings(ix, node.id).length - (s.sittings[node.id] || 0));
    }
    return n;
  }

  // ---------- randomness ----------
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(arr, r) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function pickDistinct(pool, n, r, exclude = [], key = (x) => x) {
    const seen = new Set(exclude.map(key));
    const out = [];
    for (const x of shuffle(pool, r)) {
      if (seen.has(key(x))) continue;
      seen.add(key(x));
      out.push(x);
      if (out.length === n) break;
    }
    return out;
  }
  /** Seed from a date so «Θέμα της ημέρας» is the same if she reopens it. */
  function dateSeed(key) { let h = 7; for (const c of key) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h; }

  // ---------- labels and helpers ----------
  const L = {
    guess: "Μάντεψε πρώτα", newWord: "Νέα λέξη", meaning: "Σημασία", reverse: "Αντίστροφα", gender: "Γένος", genitive: "Γενική",
    parts: "Αρχικοί χρόνοι", hook: "Ετυμολογία", cell: "Ποιος τύπος;", type: "Γράψε τον τύπο", buildForm: "Χτίσε τον τύπο",
    translate: "Μετάφρασε", note: "Συντακτικό στο κείμενο", role: "Συντακτικός ρόλος", find: "Βρες στο κείμενο", bucket: "Ταξινόμησε",
    steps: "Αιτιολόγησε την εκφορά", transform: "Μετατροπή", tf: "Σωστό ή λάθος;", origin: "Λατινικό ή όχι;", spot: "Βρες την παγίδα",
    match: "Αντιστοίχισε", swipe: "Γρήγορη επανάληψη", decode: "Νέο: εφάρμοσε τον κανόνα", review: "Επανάληψη", again: "Ξανά",
    colosseum: "Κολοσσαίο", rule: "Κανόνας", quiz: "Έλεγχος",
  };
  const wrap = (s) => `<span class="w">${s}</span>`;
  const labelOf = (it) => ({ word: it.la, sentence: it.la, form: it.given, rule: it.title, role: it.w, clause: it.la, transform: it.from, fact: it.q, hook: it.la, origin: it.w, trap: it.ask }[it.kind] || it.id);
  const meaningOf = (it) => ({ word: it.el, hook: it.el, form: (it.answer || [])[0], role: (it.answer || [])[0], origin: it.latin ? "λατινικό" : "όχι λατινικό" }[it.kind] || "");
  const partsOf = (it) => String(it.forms || "").split(",").map((x) => x.trim()).filter(Boolean);

  // ---------- question builders ----------
  // Every question: { type, itemId, label, prompt, ..., answer, explain }.

  function distinctBy(pool, n, r, exclude, key) { return pickDistinct(pool, n, r, exclude, key); }

  // words
  function qWordMeaning(ix, it, r, { guess = false, label } = {}) {
    const same = ix.byKind.word.filter((x) => x.id !== it.id && x.pos === it.pos && norm(x.el) !== norm(it.el));
    const other = ix.byKind.word.filter((x) => x.id !== it.id && x.pos !== it.pos && norm(x.el) !== norm(it.el));
    let wrong = distinctBy(same.filter((x) => x.unitId === it.unitId), 2, r, [it], (x) => norm(x.el));
    wrong = wrong.concat(distinctBy(same.concat(other), 3 - wrong.length, r, [it, ...wrong], (x) => norm(x.el)));
    const options = shuffle([it.el, ...wrong.map((x) => x.el)], r);
    return {
      type: "mcq", itemId: it.id, guess, label: label || (guess ? L.guess : L.meaning),
      prompt: guess ? `Δεν την έχεις μάθει ακόμη. Τι μπορεί να σημαίνει το ${wrap(it.la)};` : `Τι σημαίνει το ${wrap(it.la)};`,
      word: it.la, sub: it.forms, options, answer: it.el, explain: `${it.forms || it.la}: ${it.el}.${it.hook ? " " + it.hook : ""}`,
    };
  }
  function qWordReverse(ix, it, r) {
    const pool = ix.byKind.word.filter((x) => x.id !== it.id && norm(x.el) !== norm(it.el));
    const wrong = distinctBy(pool.filter((x) => x.pos === it.pos), 3, r, [it], (x) => x.la);
    const more = wrong.length < 3 ? distinctBy(pool, 3 - wrong.length, r, [it, ...wrong], (x) => x.la) : [];
    const options = shuffle([it.la, ...wrong.concat(more).map((x) => x.la)], r);
    return { type: "mcq", itemId: it.id, label: L.reverse, prompt: `Ποια λατινική λέξη σημαίνει ${wrap("«" + it.el + "»")};`, options, answer: it.la, explain: `${it.forms || it.la}: ${it.el}.` };
  }
  const GENDERS = { m: "αρσενικό", f: "θηλυκό", n: "ουδέτερο", c: "αρσενικό και θηλυκό (κοινό)" };
  function qWordGender(ix, it, r) {
    const options = shuffle(["αρσενικό", "θηλυκό", "ουδέτερο"].concat(it.gender === "c" ? [GENDERS.c] : []), r);
    return { type: "mcq", itemId: it.id, label: L.gender, prompt: `Τι γένος είναι το ${wrap(it.la)};`, sub: it.forms, options, answer: GENDERS[it.gender], explain: `${it.forms}, ${GENDERS[it.gender]} (${it.decl ? it.decl + "η κλίση" : ""}). ${it.trap || ""}`.trim() };
  }
  function qWordGenitive(ix, it, r) {
    const gen = partsOf(it)[1];
    const pool = ix.byKind.word.filter((x) => x.pos === "noun" && x.id !== it.id).map((x) => partsOf(x)[1]).filter((g) => g && norm(g) !== norm(gen));
    const same = ix.byKind.word.filter((x) => x.pos === "noun" && x.id !== it.id && x.decl === it.decl).map((x) => partsOf(x)[1]).filter((g) => g && norm(g) !== norm(gen));
    let wrong = distinctBy(same, 3, r, [gen], norm);
    wrong = wrong.concat(distinctBy(pool, 3 - wrong.length, r, [gen, ...wrong], norm));
    if (wrong.length < 2) return null;
    return { type: "mcq", itemId: it.id, label: L.genitive, prompt: `Ποια είναι η γενική του ${wrap(it.la)};`, options: shuffle([gen, ...wrong], r), answer: gen, explain: `${it.forms}: ${it.el}.${it.trap ? " " + it.trap : ""}` };
  }
  const PART_LABELS = ["ενεστώτας", "παρακείμενος", "σουπίνο", "απαρέμφατο"];
  const PART_LABELS_DEP = ["ενεστώτας", "παρακείμενος", "απαρέμφατο"];
  /** αρχικοί χρόνοι builder: labelled slots filled from a pool with look-alike parts of other verbs. */
  function qPrincipalParts(ix, it, r) {
    const parts = partsOf(it);
    if (parts.length < 3) return null;
    const labels = parts.length === 4 ? PART_LABELS : PART_LABELS_DEP;
    const others = ix.byKind.word.filter((x) => x.pos === "verb" && x.id !== it.id).flatMap((x) => partsOf(x));
    const extra = distinctBy(others.filter((p) => !parts.some((q) => norm(q) === norm(p))), 4, r, parts, norm);
    return { type: "slots", itemId: it.id, label: L.parts, prompt: `Οι αρχικοί χρόνοι του ${wrap(it.la)}`, slots: labels.map((l) => ({ label: l })), tiles: shuffle([...parts, ...extra], r), answer: parts, explain: `${it.forms}: ${it.el}.${it.hook ? " " + it.hook : ""}` };
  }
  function qWordEtym(ix, it, r) {
    const target = (it.etym || [])[0];
    if (!target) return null;
    const pool = ix.byKind.word.flatMap((x) => (x.id === it.id ? [] : (x.etym || []).map((e) => e.el))).concat(ix.byKind.hook.filter((h) => norm(h.la) !== norm(it.la)).map((h) => h.el));
    const wrong = distinctBy(pool.filter((e) => norm(e) !== norm(target.el)), 3, r, [target.el], norm);
    if (wrong.length < 2) return null;
    return { type: "mcq", itemId: it.id, label: L.hook, prompt: `Ποια ελληνική λέξη συγγενεύει με το ${wrap(it.la)};`, options: shuffle([target.el, ...wrong], r), answer: target.el, explain: `${it.la} → ${target.el}.${target.official ? " Στον επίσημο κατάλογο του υπουργείου." : ""} ${it.hook || ""}`.trim() };
  }

  // sentences
  function qSentenceBuild(ix, it, r) {
    const pool = ix.sentenceChunks.filter((c) => !it.chunks.includes(c));
    let extra = distinctBy(pool, 2, r, it.chunks);
    if (extra.length < 1) extra = ["όμως", "και έτσι"].slice(0, 2);
    return { type: "build", itemId: it.id, label: L.translate, prompt: "Χτίσε τη μετάφραση με τη σειρά", word: it.la, tiles: shuffle([...it.chunks, ...extra], r), answer: it.chunks, explain: it.el };
  }
  function qSentenceNote(ix, it, r, n = 0) {
    const note = (it.notes || [])[n];
    if (!note) return null;
    const pool = ix.byKind.sentence.flatMap((s) => (s.notes || []).map((x) => x.role_el)).concat(ix.byKind.role.flatMap((x) => x.answer || []));
    const wrong = distinctBy(pool.filter((x) => norm(x) !== norm(note.role_el)), 3, r, [note.role_el], norm);
    if (wrong.length < 2) return null;
    return { type: "mcq", itemId: it.id, label: L.note, prompt: `${wrap(note.w)}: τι είναι συντακτικά;`, word: it.la, hl: note.w, options: shuffle([note.role_el, ...wrong], r), answer: note.role_el, explain: `${note.w}: ${note.role_el}${note.dep ? " (" + (/^στο /.test(note.dep) ? note.dep : "στο " + note.dep) + ")" : ""}.` };
  }
  function qFind(ix, it, r, f) {
    const spec = f || (it.find || [])[0];
    if (!spec) return null;
    const toks = tokens(it.la);
    const want = spec.words.map(stripMarks);
    const answer = toks.map((t, i) => (want.includes(stripMarks(t)) ? i : -1)).filter((i) => i >= 0);
    return { type: "find", itemId: it.id, label: L.find, prompt: spec.ask, words: toks, answer, explain: spec.why || `${spec.words.join(", ")}.` };
  }

  // forms (Γ1 / Γ2)
  function qCell(ix, it, r, { label, guess = false } = {}) {
    const wrong = distinctBy((it.distractors || []).filter((d) => !accepts(it.answer, d)), 3, r, it.answer, norm);
    return { type: "mcq", itemId: it.id, guess, label: label || (guess ? L.guess : it.transfer ? L.decode : L.cell), prompt: `${wrap(it.given)}: ${it.ask}`, word: it.given, sub: it.ctx || it.lemma, options: shuffle([it.answer[0], ...wrong], r), answer: it.answer[0], explain: `${it.answer.join(" / ")}. ${it.why || it.rule || ""}`.trim() };
  }
  function qType(ix, it, r) {
    return { type: "type", itemId: it.id, label: it.transfer ? L.decode : L.type, prompt: `${wrap(it.given)}: ${it.ask}`, word: it.given, sub: it.ctx || it.lemma, answer: it.answer, tiles: it.tiles ? shuffle([...it.tiles, ...distinctBy(["um", "ium", "is", "ibus", "e", "i", "o", "a", "ae", "arum", "orum", "ibus", "to", "te", "tote", "nto", "re", "ri", "isse", "nd"].filter((t) => !it.tiles.includes(t)), 3, r, it.tiles)], r) : null, explain: `${it.answer.join(" / ")}. ${it.why || it.rule || ""}`.trim() };
  }
  function qFormBuild(ix, it, r) {
    if (!it.tiles) return null;
    const bank = ["um", "ium", "is", "ibus", "e", "i", "o", "a", "ae", "arum", "orum", "to", "te", "tote", "nto", "re", "ri", "isse", "nd", "ur", "ba", "eba", "iss", "eri"];
    const extra = distinctBy(bank.filter((t) => !it.tiles.includes(t)), Math.max(2, 5 - it.tiles.length), r, it.tiles);
    return { type: "build", itemId: it.id, label: L.buildForm, prompt: `${wrap(it.given)}: ${it.ask}`, word: it.given, sub: it.ctx || it.lemma, tiles: shuffle([...it.tiles, ...extra], r), answer: it.tiles, joiner: "", explain: `${it.tiles.join("-")} = ${it.answer[0]}. ${it.why || it.rule || ""}`.trim() };
  }

  // rules (inline quiz)
  function qRuleQuiz(ix, it, r, i) {
    const q = (it.quiz || [])[i];
    if (!q) return null;
    const base = { itemId: it.id, label: L.quiz, explain: q.why || it.say };
    if (q.t === "mcq") return { ...base, type: "mcq", prompt: q.q, options: shuffle(q.options, r), answer: q.a };
    if (q.t === "tf") return { ...base, type: "tf", prompt: q.q, answer: q.a, yes: "Σωστό", no: "Λάθος" };
    if (q.t === "bucket") return { ...base, type: "bucket", label: L.bucket, prompt: q.q || "Βάλε το καθένα στο σωστό κουτί", buckets: q.buckets, items: shuffle(q.items, r), answer: q.items };
    return null;
  }

  // roles (Δ1α)
  function qRoleMcq(ix, it, r, { guess = false } = {}) {
    const wrong = distinctBy((it.distractors || []).filter((d) => !accepts(it.answer, d)), 3, r, it.answer, norm);
    return { type: "mcq", itemId: it.id, guess, label: guess ? L.guess : L.role, prompt: `${wrap(it.w)}: είναι …`, word: it.la, hl: it.w, options: shuffle([it.answer[0], ...wrong], r), answer: it.answer[0], explain: `${it.w}: ${it.answer[0]} ${it.dep}. ${it.why || ""}`.trim() };
  }
  function qRoleBuild(ix, it, r) {
    const others = ix.byKind.role.filter((x) => x.id !== it.id).flatMap((x) => x.tiles || []);
    const extra = distinctBy(others.filter((t) => !it.tiles.some((u) => norm(u) === norm(t))), 2, r, it.tiles, norm);
    const fallback = ["απρόθετη αφαιρετική", "γενική κτητική", "αντικείμενο"].filter((t) => !it.tiles.some((u) => norm(u) === norm(t)));
    const tiles = shuffle([...it.tiles, ...(extra.length >= 2 ? extra : extra.concat(fallback.slice(0, 2 - extra.length)))], r);
    return { type: "build", itemId: it.id, label: L.role, prompt: `${wrap(it.w)}: είναι …`, word: it.la, hl: it.w, tiles, answer: it.tiles, explain: `${it.w}: ${it.answer[0]} ${it.dep}. ${it.why || ""}`.trim() };
  }

  // clauses (Δ1β / Δ2α): four scored steps 1+1+1+2
  function qClauseSteps(ix, it, r) {
    const d = it.distractors || {};
    const step = (q, a, wrong, marks) => ({ q, options: shuffle([a, ...(wrong || []).slice(0, 3)], r), answer: a, marks });
    return {
      type: "steps", itemId: it.id, label: L.steps, prompt: "Χτίσε την απάντηση βήμα-βήμα, όπως τη βαθμολογεί η επιτροπή", word: it.la,
      steps: [
        step("Είδος της πρότασης", it.kind_el, d.kind, 1),
        step("Συντακτική λειτουργία", it.fn_el, d.fn, 1),
        step("Τρόπος εισαγωγής", it.intro_el, d.intro, 1),
        step("Έγκλιση και γιατί", it.mood_el, d.mood, 1),
        step("Χρόνος και γιατί (ακολουθία)", it.tense_el, d.tense, 1),
      ],
      explain: it.why || `${it.kind_el}· ${it.fn_el}· εισάγεται ${it.intro_el}· εκφέρεται με ${it.mood_el}· ${it.tense_el}.`,
    };
  }

  // transformations (Δ2)
  function qTransform(ix, it, r, { faded = 0 } = {}) {
    const answer = tokens(it.to[0]).map((t) => t.replace(/[.,;:!?«»]+$/g, ""));
    const hints = (it.steps || []).slice(0, faded);
    return { type: "transform", itemId: it.id, label: L.transform, prompt: it.ask, word: it.from, tiles: shuffle(it.tiles, r), answer, accepted: it.to, orderFree: !!it.orderFree, changed: it.changed, hints, explain: `${it.to[0]} ${it.why ? "— " + it.why : ""}`.trim() };
  }

  // facts (Β1)
  function qFact(ix, it, r, { guess = false } = {}) {
    if (it.t === "tf") return { type: "tf", itemId: it.id, guess, label: guess ? L.guess : L.tf, prompt: it.q, answer: !!it.a, yes: "Σωστό", no: "Λάθος", explain: it.why };
    return { type: "mcq", itemId: it.id, guess, label: guess ? L.guess : "Εισαγωγή", prompt: it.q, options: shuffle(it.options, r), answer: it.a, explain: it.why };
  }

  // hooks (Β2)
  function qHook(ix, it, r, { guess = false } = {}) {
    const pool = ix.byKind.hook.filter((x) => x.id !== it.id && norm(x.el) !== norm(it.el));
    const wrong = distinctBy(pool.filter((x) => x.unitId === it.unitId), 3, r, [it], (x) => norm(x.el));
    const more = wrong.length < 3 ? distinctBy(pool, 3 - wrong.length, r, [it, ...wrong], (x) => norm(x.el)) : [];
    return { type: "mcq", itemId: it.id, guess, label: guess ? L.guess : it.transfer ? L.decode : L.hook, prompt: guess ? `Ποια ελληνική λέξη μπορεί να συγγενεύει με το ${wrap(it.la)};` : `Ποια ελληνική λέξη συγγενεύει με το ${wrap(it.la)};`, word: it.la, options: shuffle([it.el, ...wrong.concat(more).map((x) => x.el)], r), answer: it.el, explain: `${it.la} → ${it.el}. ${it.story || ""}`.trim() };
  }
  /** Β2 exam shape: 5 Latin words left, 7 Greek right (2 spare). */
  function qMatchSpare(ix, hooks, r, n = 5, spareN = 2) {
    const picked = [];
    const seenL = new Set(), seenM = new Set();
    for (const x of shuffle(hooks, r)) {
      const a = norm(x.la), b = norm(x.el);
      if (seenL.has(a) || seenM.has(b)) continue;
      seenL.add(a); seenM.add(b); picked.push(x);
      if (picked.length === n) break;
    }
    if (picked.length < 3) return null;
    const pairs = picked.map((h) => [h.la, h.el, h.id]);
    const spare = distinctBy(ix.byKind.hook.filter((h) => !picked.includes(h) && !pairs.some((p) => norm(p[1]) === norm(h.el))).map((h) => h.el), spareN, r, [], norm);
    return { type: "match", itemId: null, itemIds: picked.map((h) => h.id), label: "Θέμα Β2", prompt: `Αντιστοίχισε τις λατινικές με τις ελληνικές λέξεις (${spare.length} ελληνικές περισσεύουν)`, pairs, left: shuffle(pairs.map((p) => p[0]), r), right: shuffle(pairs.map((p) => p[1]).concat(spare), r), spare };
  }
  function qMatch(ix, its, r) {
    // both columns must be unambiguous: no two rows may share a Latin label or a Greek meaning
    const uniq = [];
    const seenL = new Set(), seenM = new Set();
    for (const x of shuffle(its.filter((y) => labelOf(y) && meaningOf(y)), r)) {
      const a = norm(labelOf(x)), b = norm(meaningOf(x));
      if (seenL.has(a) || seenM.has(b)) continue;
      seenL.add(a); seenM.add(b); uniq.push(x);
      if (uniq.length === 4) break;
    }
    if (uniq.length < 3) return null;
    const pairs = uniq.map((it) => [labelOf(it), meaningOf(it), it.id]);
    return { type: "match", itemId: null, itemIds: uniq.map((x) => x.id), label: L.match, prompt: "Πάτα μια λέξη και μετά τη σημασία της", pairs, left: shuffle(pairs.map((p) => p[0]), r), right: shuffle(pairs.map((p) => p[1]), r), spare: [] };
  }

  // origins, traps, swipe
  function qOrigin(it, { guess = false } = {}) {
    return { type: "tf", itemId: it.id, guess, label: guess ? L.guess : L.origin, prompt: "Η λέξη έρχεται από τα Λατινικά;", word: it.w, answer: !!it.latin, yes: "Λατινικό", no: "Όχι λατινικό", explain: it.from };
  }
  function qSpot(ix, it, r) {
    const showWrong = r() < 0.6;
    // distractors must look like the real fix: a similar number of words and length, same unit first
    const words = (t) => String(t).trim().split(/\s+/).length;
    const like = (t) => Math.abs(words(t) - words(it.right)) <= 1 && String(t).length <= String(it.right).length * 2 + 6;
    const others = ix.byKind.trap.filter((x) => x.id !== it.id);
    const taken = (x) => norm(x) === norm(it.right) || norm(x) === norm(it.wrong);
    const fromUnit = others.filter((x) => x.unitId === it.unitId).flatMap((x) => [x.right, x.wrong]).filter((x) => like(x) && !taken(x));
    const fromAll = others.flatMap((x) => [x.right, x.wrong]).filter((x) => like(x) && !taken(x));
    let wrong = distinctBy(fromUnit, 2, r, [it.right, it.wrong], norm);
    if (wrong.length < 2) wrong = wrong.concat(distinctBy(fromAll, 2 - wrong.length, r, [it.right, it.wrong, ...wrong], norm));
    if (wrong.length < 2) wrong = wrong.concat(distinctBy(others.flatMap((x) => [x.right, x.wrong]).filter((x) => !taken(x)), 2 - wrong.length, r, [it.right, it.wrong, ...wrong], norm));
    const fixOptions = shuffle([it.right, it.wrong, ...wrong], r);
    return { type: "spot", itemId: it.id, label: L.spot, prompt: it.ask, shown: showWrong ? it.wrong : it.right, isRight: !showWrong, fixOptions, fix: it.right, explain: it.why };
  }
  function qSwipe(ix, words) {
    return { type: "swipe", itemId: null, itemIds: words.map((w) => w.id), label: L.swipe, prompt: "Ξέρεις τη σημασία; Γύρνα την κάρτα και πες την αλήθεια.", cards: words.map((w) => ({ itemId: w.id, front: w.la, sub: w.forms, back: w.el, hook: w.hook || "" })) };
  }

  /** The intro (teach) step for any item kind. */
  const qIntro = (it) => ({ type: "intro", itemId: it.id, kind: it.kind });

  /** The quick check right after an intro. */
  function qCheck(ix, it, r) {
    switch (it.kind) {
      case "word": return qWordMeaning(ix, it, r, { label: L.newWord });
      case "sentence": return qSentenceBuild(ix, it, r);
      case "form": return qCell(ix, it, r);
      case "role": return qRoleMcq(ix, it, r);
      case "clause": return qClauseSteps(ix, it, r);
      case "transform": return qTransform(ix, it, r, { faded: (it.steps || []).length });
      case "fact": return qFact(ix, it, r);
      case "hook": return qHook(ix, it, r);
      case "origin": return qOrigin(it);
      case "trap": return qSpot(ix, it, r);
      default: return null;
    }
  }
  /** Practice questions for an item (the harder ones). */
  function qPractice(ix, it, r) {
    const out = [];
    switch (it.kind) {
      case "word": {
        if (it.pos === "noun" && it.gender) out.push(qWordGender(ix, it, r));
        if (it.pos === "noun") out.push(qWordGenitive(ix, it, r));
        if (it.pos === "verb") out.push(qPrincipalParts(ix, it, r));
        out.push(qWordEtym(ix, it, r));
        out.push(qWordReverse(ix, it, r));
        break;
      }
      case "sentence": out.push(qSentenceNote(ix, it, r, 0)); out.push(qFind(ix, it, r)); break;
      case "form": out.push(qFormBuild(ix, it, r) || qType(ix, it, r)); break;
      case "role": out.push(qRoleBuild(ix, it, r)); break;
      case "transform": out.push(qTransform(ix, it, r, { faded: Math.max(0, (it.steps || []).length - 2) })); break;
      case "hook": out.push(qHook(ix, it, r)); break;
      case "fact": out.push(qFact(ix, it, r)); break;
      case "trap": out.push(qSpot(ix, it, r)); break;
      default: break;
    }
    return out.filter(Boolean);
  }
  /** One retrieval question for a learned item (review, Colosseum pool, daily mix). */
  function qReview(ix, it, r) {
    const roll = r();
    switch (it.kind) {
      case "word": {
        const alts = [() => qWordMeaning(ix, it, r, { label: L.review }), () => qWordReverse(ix, it, r)];
        if (it.pos === "noun" && it.gender) alts.push(() => qWordGender(ix, it, r));
        if (it.pos === "noun") alts.push(() => qWordGenitive(ix, it, r));
        if (it.pos === "verb") alts.push(() => qPrincipalParts(ix, it, r));
        if (it.etym && it.etym.length) alts.push(() => qWordEtym(ix, it, r));
        return alts[Math.floor(roll * alts.length)]() || qWordMeaning(ix, it, r, { label: L.review });
      }
      case "sentence": return roll < 0.6 ? qSentenceBuild(ix, it, r) : qSentenceNote(ix, it, r, 0) || qSentenceBuild(ix, it, r);
      case "form": return roll < 0.45 ? qCell(ix, it, r, { label: L.review }) : roll < 0.75 ? (qFormBuild(ix, it, r) || qType(ix, it, r)) : qType(ix, it, r);
      case "rule": return qRuleQuiz(ix, it, r, Math.floor(roll * (it.quiz || []).length)) || null;
      case "role": return roll < 0.5 ? qRoleMcq(ix, it, r) : qRoleBuild(ix, it, r);
      case "clause": return qClauseSteps(ix, it, r);
      case "transform": return qTransform(ix, it, r, { faded: 0 });
      case "fact": return qFact(ix, it, r);
      case "hook": return qHook(ix, it, r);
      case "origin": return qOrigin(it);
      case "trap": return qSpot(ix, it, r);
      default: return null;
    }
  }

  // ---------- lesson / roundup / practice ----------
  const quizzable = (it) => it.kind !== "rule";
  /** Which item kinds can open a lesson with a no-penalty guess. */
  function qGuess(ix, it, r) {
    switch (it.kind) {
      case "word": return qWordMeaning(ix, it, r, { guess: true });
      case "form": return qCell(ix, it, r, { guess: true });
      case "role": return qRoleMcq(ix, it, r, { guess: true });
      case "fact": return qFact(ix, it, r, { guess: true });
      case "hook": return qHook(ix, it, r, { guess: true });
      case "origin": return qOrigin(it, { guess: true });
      default: return null;
    }
  }

  /**
   * One sitting of a lesson: guess first (pretest, no penalty) -> each item's intro + quick check
   * (transfer items skip the intro) -> practice (held-back / harder questions) -> a match round
   * -> one or two older due items interleaved. Missed questions are re-queued by the UI.
   */
  function buildLesson(ix, s, lessonId, seed, sitting = 0) {
    const r = rng(seed);
    const sittings = lessonSittings(ix, lessonId);
    const ids = sittings[Math.min(sitting, sittings.length - 1)] || [];
    const its = ids.map((id) => ix.items.get(id));
    const steps = [];
    const guessable = its.find((x) => !x.transfer && x.kind !== "origin" && qGuess(ix, x, r));
    if (guessable) { const g = qGuess(ix, guessable, r); if (g) steps.push(g); }

    const practice = [];
    for (const it of its) {
      if (it.kind === "rule") {
        steps.push(qIntro(it));
        (it.quiz || []).forEach((_, i) => { const q = qRuleQuiz(ix, it, r, i); if (q) steps.push(q); });
        continue;
      }
      // «Λατινικό ή όχι;» is a sorting game: asked cold, the story comes with the feedback (an intro card would give the answer away)
      if (it.kind === "origin") { steps.push(qOrigin(it)); continue; }
      if (it.transfer) { practice.push(qCheck(ix, it, r)); continue; }
      // a headword she already met in an earlier unit is not re-taught: one retrieval question instead of the card
      if (it.kind === "word" && ix.isDup(it) && s.items[canon(it.id)]) { steps.push(qWordMeaning(ix, it, r, { label: L.review })); practice.push(...qPractice(ix, it, r)); continue; }
      steps.push(qIntro(it));
      const chk = qCheck(ix, it, r);
      if (chk) steps.push(chk);
      practice.push(...qPractice(ix, it, r));
    }
    const transfers = practice.filter((q) => q && q.label === L.decode);
    const rest = shuffle(practice.filter((q) => q && !transfers.includes(q)), r);
    steps.push(...shuffle([...transfers, ...rest.slice(0, Math.max(2, 5 - transfers.length))], r));

    const matchable = its.filter((x) => ["word", "hook", "form", "role"].includes(x.kind));
    if (matchable.length >= 3) { const m = matchable.every((x) => x.kind === "hook") && ix.byKind.hook.length >= 7 ? qMatchSpare(ix, matchable, r) : qMatch(ix, matchable, r); if (m) steps.push(m); }

    const own = new Set(its.map((x) => x.id));
    const older = dueItems(s, dayKey()).filter((id) => !own.has(id) && ix.items.has(id)).slice(0, 2);
    for (const id of older) { const q = qReview(ix, ix.items.get(id), r); if (q) steps.push({ ...q, label: L.review }); }
    return steps.filter(Boolean);
  }

  /** Ανακεφαλαίωση: 8-10 mixed retrieval questions from the unit, a match, and one «Λατινικό ή όχι;». */
  function buildRoundup(ix, s, unitId, seed) {
    const r = rng(seed);
    const unit = ix.unitOf(unitId);
    const its = unit.lessons.flatMap((l) => l.items.map((x) => ix.items.get(x.id))).filter(quizzable);
    const steps = [];
    const picks = interleave(shuffle(its, r), 8);
    for (const it of picks) { const q = qReview(ix, it, r); if (q) steps.push(q); }
    const matchable = its.filter((x) => ["word", "hook", "form", "role"].includes(x.kind));
    if (matchable.length >= 3) { const m = qMatch(ix, matchable, r); if (m) steps.push(m); }
    if (ix.byKind.origin.length) steps.splice(Math.floor(r() * (steps.length + 1)), 0, qOrigin(ix.byKind.origin[Math.floor(r() * ix.byKind.origin.length)]));
    return steps;
  }

  /** Never two items of the same kind (or the same lemma) in a row when it can be avoided. */
  function interleave(items, n = items.length) {
    const out = [];
    const pool = items.slice();
    const sig = (x) => `${x.kind}|${x.lemma || x.la || ""}`;
    while (pool.length && out.length < n) {
      const last = out[out.length - 1];
      let i = last ? pool.findIndex((x) => x.kind !== last.kind) : 0;
      if (i < 0) i = pool.findIndex((x) => sig(x) !== sig(last));
      if (i < 0) i = 0;
      out.push(pool.splice(i, 1)[0]);
    }
    return out;
  }

  /**
   * Επανάληψη: due items first (oldest due, lowest box), then 30% from the Τετράδιο λαθών, then the
   * weakest boxes; interleaved by kind. 10 questions.
   */
  function buildPractice(ix, s, seed, n = 10) {
    const r = rng(seed);
    const today = dayKey();
    const has = (id) => ix.items.has(id) && quizzable(ix.items.get(id));
    const due = dueItems(s, today).filter(has);
    const notebook = notebookItems(s).filter((id) => has(id) && !due.includes(id));
    const weak = Object.entries(s.items).filter(([id]) => has(id) && !due.includes(id) && !notebook.includes(id)).sort((a, b) => a[1].box - b[1].box || b[1].wrong - a[1].wrong).map(([id]) => id);
    const nb = Math.round(n * 0.3);
    let ids = due.slice(0, n - Math.min(nb, notebook.length)).concat(notebook.slice(0, nb));
    if (ids.length < n) ids = ids.concat(weak.slice(0, n - ids.length));
    const picked = interleave(ids.slice(0, n).map((id) => ix.items.get(id)));
    return picked.map((it) => qReview(ix, it, r)).filter(Boolean);
  }
  /** Daily vocabulary swipe set: due words + words of the school's current lesson. */
  function buildSwipe(ix, s, seed, n = 25) {
    const r = rng(seed);
    const today = dayKey();
    const words = ix.byKind.word.filter((w) => !ix.isDup(w));
    const due = dueItems(s, today).map((id) => ix.items.get(id)).filter((x) => x && x.kind === "word");
    const school = ix.byKind.word.filter((w) => (w.lessons || (w.lesson ? [w.lesson] : [])).includes(s.schoolLesson)).map((w) => ix.items.get(canon(w.id))).filter((w, i, a) => a.indexOf(w) === i && !due.includes(w));
    const learned = words.filter((w) => s.items[w.id] && !due.includes(w) && !school.includes(w));
    const set = due.slice(0, 15).concat(shuffle(school, r).slice(0, 10));
    const fill = shuffle(learned.length ? learned : words.filter((w) => !set.includes(w)), r);
    const cards = set.concat(fill).slice(0, n);
    return cards.length ? qSwipe(ix, shuffle(cards, r)) : null;
  }

  // ---------- Κολοσσαίο (speed round) ----------
  function colosseumPool(ix, s) {
    const kinds = new Set(["form", "role", "hook", "fact", "word"]);
    let pool = Object.keys(s.items).map((id) => ix.items.get(id)).filter((x) => x && kinds.has(x.kind));
    if (pool.length < 6) pool = ix.lessons.slice(0, 3).flatMap((l) => l.items.map((x) => ix.items.get(x.id))).filter((x) => kinds.has(x.kind));
    if (pool.length < 6) pool = [...ix.items.values()].filter((x) => kinds.has(x.kind));
    return pool;
  }
  /** Three options, 20 seconds, one miss ends the run. */
  function colosseumQuestion(ix, s, r) {
    const pool = colosseumPool(ix, s);
    if (!pool.length) return null;
    const it = pool[Math.floor(r() * pool.length)];
    let q;
    if (it.kind === "form") q = qCell(ix, it, r, { label: L.colosseum });
    else if (it.kind === "role") q = qRoleMcq(ix, it, r);
    else if (it.kind === "hook") q = qHook(ix, it, r);
    else if (it.kind === "fact") q = qFact(ix, it, r);
    else q = r() < 0.5 ? qWordMeaning(ix, it, r) : qWordReverse(ix, it, r);
    if (q.type === "mcq") {
      const wrong = q.options.filter((o) => o !== q.answer).slice(0, 2);
      q = { ...q, options: shuffle([q.answer, ...wrong], r) };
    }
    return { ...q, label: L.colosseum, ms: COLOSSEUM_MS };
  }

  // ---------- Θέμα της ημέρας and Προσομοίωση ----------
  const DAILY_BY_WEEKDAY = { 1: "Γ1", 2: "Γ2", 3: "Δ1", 4: "Δ2", 5: "Β", 6: "Α1", 0: "mix" };
  /** Items of a kind the student can be asked: from units she started, else the first lesson of the units feeding the section. */
  function drawPool(ix, s, kind, section, filter = () => true) {
    const started = new Set(Object.keys(s.items).map((id) => (ix.items.get(id) || {}).unitId).filter(Boolean));
    const all = ix.byKind[kind].filter(filter);
    let pool = all.filter((x) => started.has(x.unitId));
    if (pool.length < 2) pool = all.filter((x) => (ix.unitOf(x.unitId).exam || []).includes(section) && x.lessonId === ix.unitOf(x.unitId).lessons[0].id);
    if (pool.length < 2) pool = all;
    return pool;
  }
  const withMarks = (qs, marks, section) => { const each = marks / Math.max(1, qs.length); return qs.filter(Boolean).map((q) => ({ ...q, section, marks: each })); };
  /** One exam section as questions worth its real marks (scaled). */
  function buildSection(ix, s, section, r, size = 1) {
    const M = SECTION_MARKS;
    const pick = (pool, n) => shuffle(pool, r).slice(0, n);
    if (section === "Α1") return withMarks(pick(drawPool(ix, s, "sentence", "Α1"), 2 * size).map((it) => qSentenceBuild(ix, it, r)), M["Α1"], "Α1");
    if (section === "Β1") return withMarks(pick(drawPool(ix, s, "fact", "Β1"), size === 1 ? 3 : 5).map((it) => qFact(ix, it, r)), M["Β1"], "Β1");
    if (section === "Β2") { const m = qMatchSpare(ix, drawPool(ix, s, "hook", "Β2"), r); return withMarks(m ? [m] : [], M["Β2"], "Β2"); }
    if (section === "Γ1") return withMarks(pick(drawPool(ix, s, "form", "Γ1", (x) => !isVerbCell(x.cell)), 4 + 2 * (size - 1)).map((it) => (r() < 0.5 ? qCell(ix, it, r) : qType(ix, it, r))), M["Γ1"], "Γ1");
    if (section === "Γ2") {
      const f = pick(drawPool(ix, s, "sentence", "Γ2", (x) => x.find && x.find.length), 1).map((it) => qFind(ix, it, r));
      const forms = pick(drawPool(ix, s, "form", "Γ2", (x) => isVerbCell(x.cell)), 3 + (size - 1)).map((it) => (r() < 0.5 ? qCell(ix, it, r) : qType(ix, it, r)));
      return withMarks(f.concat(forms), M["Γ2"], "Γ2");
    }
    if (section === "Δ1") {
      const roles = pick(drawPool(ix, s, "role", "Δ1"), 3 + (size - 1)).map((it) => (r() < 0.5 ? qRoleMcq(ix, it, r) : qRoleBuild(ix, it, r)));
      const cl = pick(drawPool(ix, s, "clause", "Δ1"), 1).map((it) => qClauseSteps(ix, it, r));
      return withMarks(roles.concat(cl), M["Δ1"], "Δ1");
    }
    if (section === "Δ2") return withMarks(pick(drawPool(ix, s, "transform", "Δ2"), 1).map((it) => qTransform(ix, it, r, { faded: 0 })), M["Δ2"], "Δ2");
    return [];
  }
  /** Θέμα της ημέρας: date-seeded, one exam section per weekday, scored with that section's marks. */
  function buildDaily(ix, s, dateKey) {
    const r = rng(dateSeed(dateKey));
    const sec = DAILY_BY_WEEKDAY[weekday(dateKey)];
    let steps, title, marks;
    if (sec === "Β") { steps = buildSection(ix, s, "Β1", r).concat(buildSection(ix, s, "Β2", r)); title = "Θέμα Β1 + Β2"; marks = 20; }
    else if (sec === "mix") { steps = withMarks(buildPractice(ix, s, dateSeed(dateKey), 6), 20, "mix"); title = "Μικτό από τα αδύναμα κουτιά"; marks = 20; }
    else { steps = buildSection(ix, s, sec, r); title = `Θέμα ${sec}`; marks = SECTION_MARKS[sec]; }
    if (!steps.length) { steps = withMarks(buildPractice(ix, s, dateSeed(dateKey), 6), 20, "mix"); title = "Μικτό"; marks = 20; }
    return { section: sec, title, marks, steps, date: dateKey };
  }
  /** Μικρό διαγώνισμα: one paper scaled to ~20 minutes, every section with its real marks. */
  function buildMock(ix, s, seed) {
    const r = rng(seed);
    const steps = SECTIONS.flatMap((sec) => buildSection(ix, s, sec, r, sec === "Β1" ? 2 : 1));
    return { steps, marks: 100 };
  }
  /** Score a finished run of marked questions: per-section [got, total]. */
  function scoreSections(results) {
    const out = {};
    for (const { q, score } of results) {
      if (!q.section) continue;
      out[q.section] = out[q.section] || [0, 0];
      out[q.section][0] += (q.marks || 0) * score;
      out[q.section][1] += q.marks || 0;
    }
    return out;
  }
  function recordDaily(s, dateKey, score, marks, section) {
    const prev = addDays(dateKey, -1);
    const had = !!s.dailies[dateKey];
    s.dailies[dateKey] = { section, score: Math.round(score * 10) / 10, marks };
    if (!had) s.dailyStreak = s.dailies[prev] || (isWeekend(prev) && (s.dailies[addDays(prev, -1)] || s.dailies[addDays(prev, -2)])) ? s.dailyStreak + 1 : 1;
  }

  // ---------- badges: Roman ranks and honours ----------
  const BADGES = [
    { id: "tiro", name: "Tiro", desc: "Το πρώτο μάθημα", test: (s) => Object.keys(s.done).length >= 1 },
    { id: "sine_errore", name: "Sine errore", desc: "Μάθημα χωρίς λάθος", test: (s) => Object.values(s.done).some((d) => d.perfect) },
    { id: "miles", name: "Miles", desc: "Σερί 7 ημερών", test: (s) => s.bestStreak >= 7 },
    { id: "decurio", name: "Decurio", desc: "12 μαθήματα", test: (s) => Object.keys(s.done).length >= 12 },
    { id: "centurio", name: "Centurio", desc: "Σερί 30 ημερών", test: (s) => s.bestStreak >= 30 },
    { id: "tribunus", name: "Tribunus", desc: "50 τύποι σε κουτί 3+", test: (s, ix) => ix && Object.entries(s.items).filter(([id, v]) => v.box >= 3 && (ix.items.get(id) || {}).kind === "form").length >= 50 },
    { id: "philologus", name: "Philologus", desc: "100 λέξεις", test: (s, ix) => ix && Object.keys(s.items).filter((id) => (ix.items.get(id) || {}).kind === "word").length >= 100 },
    { id: "legatus", name: "Legatus", desc: "Όλα τα κείμενα (Α1)", test: (s, ix) => ix && ix.course.units.filter((u) => (u.exam || []).includes("Α1")).some(() => true) && ix.course.units.filter((u) => (u.exam || []).includes("Α1")).every((u) => u.lessons.every((l) => s.done[l.id])) },
    { id: "triumphator", name: "Triumphator", desc: "Κολοσσαίο 15+", test: (s) => s.colosseumBest >= 15 },
    { id: "pontifex", name: "Pontifex", desc: "Η Εισαγωγή (Β1) ολόκληρη", test: (s, ix) => ix && ix.course.units.filter((u) => (u.exam || []).includes("Β1") && !(u.exam || []).includes("Β2")).some((u) => s.done[`${u.id}-review`]) },
    { id: "augur", name: "Augur", desc: "10 Θέματα της ημέρας στη σειρά", test: (s) => s.dailyStreak >= 10 },
    { id: "carpe20", name: "Carpe το 20", desc: "Διαγώνισμα 20/20", test: (s) => s.mocks.some((m) => m.marks > 0 && m.score >= m.marks) },
  ];
  function awardBadges(s, today, ix) {
    const fresh = [];
    for (const b of BADGES) if (!s.badges[b.id] && b.test(s, ix)) { s.badges[b.id] = today; fresh.push(b); }
    return fresh;
  }

  return {
    EXAM_DATE, EXAM_TIME, SECTION_MARKS, SECTIONS, COLOSSEUM_MS, GOALS, MAX_FREEZES, INTERVALS, BADGES, L, GENDERS,
    dayKey, parseDay, addDays, daysBetween, weekKey, isWeekend, weekday, missedWeekdays, fmtDayGr,
    freshState, touchStreak, liveStreak, addXp, weekXp, countdown, examDate, reviewCap,
    learn, grade, canon, cleanSrc, dueItems, notebookItems,
    norm, sameAnswer, accepts, tokens, stripMarks, isVerbCell,
    indexCourse, sortUnits, lessonSittings, itemWeight, pathNodes, isUnlocked, nextNode, unitProgress, remainingSittings,
    rng, shuffle, pickDistinct, dateSeed, interleave,
    labelOf, meaningOf, partsOf,
    qWordMeaning, qWordReverse, qWordGender, qWordGenitive, qPrincipalParts, qWordEtym, qSentenceBuild, qSentenceNote, qFind,
    qCell, qType, qFormBuild, qRuleQuiz, qRoleMcq, qRoleBuild, qClauseSteps, qTransform, qFact, qHook, qMatchSpare, qMatch,
    qOrigin, qSpot, qSwipe, qIntro, qCheck, qPractice, qReview, qGuess,
    buildLesson, buildRoundup, buildPractice, buildSwipe, colosseumQuestion, colosseumPool,
    buildSection, buildDaily, buildMock, scoreSections, recordDaily, DAILY_BY_WEEKDAY, awardBadges,
  };
})();

if (typeof module !== "undefined") module.exports = { Engine };
