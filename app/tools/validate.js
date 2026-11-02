// Content validator: checks every unit file against CONTENT_SCHEMA.md.
// Used by test/content.test.js and runnable on its own:
//   node app/tools/validate.js                 (all units, example included)
//   node app/tools/validate.js app/src/units/u9.js
const path = require("node:path");
const { Engine: E } = require("../src/engine.js");

const KINDS = E.KINDS;
const STATUS = ["book", "exam", "general", "unsure"];
const SUBJECTS = E.SUBJECT_IDS.concat(E.OTHER_SUBJECTS);
const EXAMS = ["mbe", "nextgen"];
const LANGS = ["latin", "french", "english"];
const PAIR_MODES = ["case-holding", "rule-number", "number", "term", "concept", "overruled"];
const SORT_MODES = ["yesno", "category", "split", "scrutiny", "hearsay"];
const TRAP_CATS = Object.keys(E.TRAP_TYPES).concat(Object.keys(E.SELF_TAGS));
const CITE = /^(FRE|FRCP|FRAP|UCC|28 U\.S\.C\.|18 U\.S\.C\.|42 U\.S\.C\.|U\.S\. Const\.|Rest\.|MPC|NCBE|[A-Z][\w.'’ ]+ v\. [\w.'’ ]+)/;
const GREEK = /[Ͱ-Ͽἀ-῿]/;
// Words that may be capitalised inside a stem without being a proper name.
const STEM_OK = new Set("I A An The State States Rule Rules Article Amendment Act Code Federal United Uniform Commercial Congress Constitution Court Supreme District Circuit Restatement Model Penal UCC FRE FRCP FRAP Miranda Monday Tuesday Wednesday Thursday Friday Saturday Sunday January February March April May June July August September October November December Yes No Assume City County Board Department Agency Company Corporation Inc Co LLC Doe Officer Judge Justice Dr Mr Ms Mrs".split(" "));

const isStr = (x) => typeof x === "string" && x.trim().length > 0;
const isArr = (x, min = 0) => Array.isArray(x) && x.length >= min;
const n = E.norm;

/**
 * Validate one unit. Returns { errors: string[], warnings: string[] }.
 * `ctx.ids` (a Set) accumulates ids across units; `ctx.rules` maps rule ids to unit ids for cross-references.
 */
function validateUnit(unit, ctx = { ids: new Set(), rules: new Map(), refs: [] }) {
  const errors = [];
  const warnings = [];
  const err = (where, msg) => errors.push(`${where}: ${msg}`);
  const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

  if (!unit || typeof unit !== "object") return { errors: ["unit: not an object (did the file set module.exports = unit?)"], warnings };
  const U = unit.id || "?";
  if (!/^u\d+(_example)?$/.test(String(unit.id))) err(U, "id must look like u9 (or u0_example)");
  if (!isStr(unit.title)) err(U, "title missing");
  if (!isStr(unit.blurb)) err(U, "blurb missing");
  if (!SUBJECTS.includes(unit.subject)) err(U, `subject must be one of ${SUBJECTS.join("/")}`);
  if (E.SUBJECT_IDS.includes(unit.subject) && !isStr(unit.assume)) err(U, "assume missing (the controlling-law assumption shown on the unit's first card)");
  if (!isArr(unit.exam, 1) || unit.exam.some((x) => !EXAMS.includes(x))) err(U, `exam must list ${EXAMS.join(" and/or ")}`);
  if (unit.dep !== undefined && (!Array.isArray(unit.dep) || unit.dep.some((d) => !/^u\d+$/.test(d)))) err(U, "dep must be a list of unit ids whose rule cards this unit may reference");
  if (!isArr(unit.lessons, 1)) { err(U, "lessons missing"); return { errors, warnings }; }
  const english = (v, w, field) => { if (!isStr(v)) err(w, `${field} missing`); else if (GREEK.test(v)) err(w, `${field} must be English (contains Greek letters)`); };

  unit.lessons.forEach((l, li) => {
    const Lid = l.id || `${U} lesson ${li + 1}`;
    if (l.id !== `${unit.id}l${li + 1}`) err(Lid, `lesson id must be ${unit.id}l${li + 1}`);
    if (!isStr(l.title)) err(Lid, "title missing");
    if (!isArr(l.items, 1)) { err(Lid, "items missing"); return; }
    let quizzable = 0;
    for (const it of l.items) {
      const id = it.id || "(no id)";
      const w = `${Lid} › ${id}`;
      if (!isStr(it.id)) err(w, "id missing");
      else {
        if (!it.id.startsWith(`${unit.id.replace(/_example$/, "")}-`)) err(w, `id must start with "${unit.id.replace(/_example$/, "")}-"`);
        if (ctx.ids.has(it.id)) err(w, "duplicate id (ids are unique across the whole course)");
        ctx.ids.add(it.id);
      }
      if (!KINDS.includes(it.kind)) { err(w, `unknown kind "${it.kind}" (one of ${KINDS.join("/")})`); continue; }
      if (it.kind !== "rule" || E.quizzable(it)) quizzable++;
      if (!isStr(it.say)) err(w, "say missing (the teach-it-in-one-breath line)");
      else { if (it.say.length > 160) err(w, `say is ${it.say.length} chars (max 160)`); if (GREEK.test(it.say)) err(w, "say must be English"); }
      if (!STATUS.includes(it.status)) err(w, `status must be one of ${STATUS.join("/")}`);
      if (it.status === "unsure") warn(w, "status unsure: shown as «under review», never drawn by the Question of the Day or mocks; needs a reviewer");
      if (!isStr(it.src)) err(w, "src missing (where the rule was checked)");
      else if (it.status === "exam" && !/NCBE/i.test(it.src)) err(w, 'status "exam" means NCBE itself states it: src must name the NCBE document');
      if (it.exam !== undefined && (!Array.isArray(it.exam) || it.exam.some((x) => !EXAMS.includes(x)))) err(w, `exam must be a list from ${EXAMS.join("/")}`);
      if (it.kind !== "trap" && it.cat !== undefined && !/^(I|II|III|IV|V|VI|VII)(\.[A-Z0-9.]+)?$/.test(String(it.cat))) err(w, `cat must be an NCBE outline code like "V.D" (got "${it.cat}")`);
      if (it.recent !== undefined && typeof it.recent !== "boolean") err(w, "recent must be true/false");
      if (it.lawVersion !== undefined && !/^[a-z]+-\d{4}-\d{2}-\d{2}$/.test(String(it.lawVersion))) err(w, 'lawVersion must look like "fre-2026-12-01"');
      if (it.transfer !== undefined) { if (typeof it.transfer !== "boolean") err(w, "transfer must be true/false"); if (!["hypo", "argue"].includes(it.kind)) err(w, "transfer belongs on hypo or argue items only"); }
      if (it.subject !== undefined && !SUBJECTS.includes(it.subject)) err(w, `subject must be one of ${SUBJECTS.join("/")}`);
      if (it.hook !== undefined) english(it.hook, w, "hook");
      try { CHECK[it.kind](it, err, warn, w, { unit, ctx, english }); } catch (e) { err(w, `validator crashed on this item: ${e.message}`); }
    }
    if (quizzable === 0) err(Lid, "a lesson needs at least one quizzable item");
  });
  return { errors, warnings };
}

const distinct = (arr, w, err, what) => { const seen = new Set(); for (const x of arr) { const k = n(x); if (seen.has(k)) err(w, `${what}: duplicate "${x}"`); seen.add(k); } };
const noOverlap = (answers, distractors, w, err, what = "distractors") => { for (const d of distractors) if (answers.some((a) => n(a) === n(d))) err(w, `${what}: "${d}" equals an accepted answer`); };
/** Capitalised words inside a stem that look like proper names (the exam uses "a man", "the retailer", "State A"). */
function properNames(stem) {
  const out = [];
  const sentences = String(stem).split(/(?<=[.!?])\s+/);
  for (const s of sentences) {
    const toks = s.split(/\s+/);
    toks.forEach((t, i) => {
      const bare = t.replace(/^[("'“‘]+|[)"'”’.,;:!?]+$/g, "");
      if (!/^[A-Z][a-z]+$/.test(bare) || i === 0 || STEM_OK.has(bare)) return;
      const prev = (toks[i - 1] || "").replace(/[^A-Za-z.]/g, "");
      const next = (toks[i + 1] || "").replace(/[^A-Za-z.]/g, "");
      if (prev === "v." || next === "v." || /^[A-Z]/.test(prev) || prev === "State" || /^\$?\d/.test(bare)) return;
      out.push(bare);
    });
  }
  return [...new Set(out)];
}
function checkOptions(it, err, warn, w, { needTrap }) {
  if (!isArr(it.options, 4) || it.options.length !== 4) { err(w, "options: exactly 4"); return; }
  const texts = it.options.map((o) => (typeof o === "string" ? o : o && o.text));
  if (texts.some((t) => !isStr(t))) { err(w, "every option needs text"); return; }
  distinct(texts, w, err, "options");
  if (!Number.isInteger(it.answer) || it.answer < 0 || it.answer > 3) { err(w, "answer must be the index 0-3 of the best option"); return; }
  it.options.forEach((o, i) => {
    if (typeof o === "string") { err(w, `option ${i}: must be {text, why${needTrap ? ", trap" : ""}}`); return; }
    if (!isStr(o.why)) err(w, `option ${i}: why missing (the reason it is right or wrong)`);
    else if (o.why.length > 240) err(w, `option ${i}: why is ${o.why.length} chars (max 240)`);
    if (i === it.answer) { if (o.trap !== undefined && o.trap !== null) err(w, `option ${i} is the key: it must not carry a trap type`); }
    else if (needTrap) { if (!E.TRAP_TYPES[o.trap]) err(w, `option ${i}: trap must be a distractor type 1-11 (got "${o.trap}")`); }
    else if (o.trap !== undefined && o.trap !== null && !E.TRAP_TYPES[o.trap]) err(w, `option ${i}: trap must be a distractor type 1-11`);
    if (texts[i].length > 260) warn(w, `option ${i} is ${texts[i].length} chars; the exam's options are 10-25 words`);
  });
}
function checkStem(it, err, warn, w, english) {
  english(it.stem, w, "stem");
  if (isStr(it.stem)) {
    const words = it.stem.trim().split(/\s+/).length;
    if (words < 25) warn(w, `stem is ${words} words; the exam's stems run 40-220`);
    if (words > 240) err(w, `stem is ${words} words (max 240)`);
    const names = properNames(it.stem);
    if (names.length) warn(w, `stem may contain proper names (${names.join(", ")}): the exam says "a man", "the retailer", "State A"`);
  }
  english(it.call, w, "call");
  if (isStr(it.call) && !/\?$/.test(it.call.trim())) warn(w, "call should be a question ending in ?");
}

const CHECK = {
  rule(it, err, warn, w, { english, unit, ctx }) {
    english(it.title, w, "title");
    if (!isArr(it.elements, 2) || it.elements.length > 7) err(w, "elements: 2-7 short strings (they build the tile game)");
    else { distinct(it.elements, w, err, "elements"); for (const e of it.elements) { english(e, w, "element"); if (isStr(e) && e.length > 120) warn(w, `element "${e.slice(0, 30)}…" is long for a tile`); } }
    if (it.ordered !== undefined && typeof it.ordered !== "boolean") err(w, "ordered must be true/false");
    if (it.distractorElements !== undefined) { if (!Array.isArray(it.distractorElements)) err(w, "distractorElements must be a list"); else noOverlap(it.elements || [], it.distractorElements, w, err, "distractorElements"); }
    if (it.exceptions !== undefined && (!Array.isArray(it.exceptions) || it.exceptions.some((x) => !isStr(x)))) err(w, "exceptions must be a list of strings");
    if (it.split !== undefined) {
      if (!it.split || typeof it.split !== "object") err(w, "split must be an object {majority, minority, mpc, ucc, commonLaw, …}");
      else { const keys = Object.keys(it.split); for (const k of keys) { if (!E.SPLIT_LABELS[k]) err(w, `split.${k}: unknown key (use ${Object.keys(E.SPLIT_LABELS).join("/")})`); else english(it.split[k], w, `split.${k}`); } if (keys.length < 2) err(w, "split needs at least two positions"); distinct(Object.values(it.split).filter(isStr), w, err, "split"); }
    }
    if (it.cite !== undefined) { if (!isStr(it.cite)) err(w, "cite must be a string"); else if (!CITE.test(it.cite)) err(w, `cite "${it.cite}" must start with FRE/FRCP/FRAP/UCC/28 U.S.C./U.S. Const./Rest./MPC/NCBE or be a case name "X v. Y"`); }
    else warn(w, "cite missing (the rule, statute or case the exam expects)");
    if (it.citeAsk !== undefined) english(it.citeAsk, w, "citeAsk");
    if (it.numbers !== undefined) { if (!Array.isArray(it.numbers)) err(w, "numbers must be a list of {label, value}"); else for (const x of it.numbers) { if (!isStr(x.label) || !isStr(x.value)) err(w, "numbers: each needs label and value"); } }
    if (!isArr(it.ex, 1) || it.ex.length > 3) err(w, "ex: 1-3 {facts, result} one-line applications");
    else for (const e of it.ex) { english(e.facts, w, "ex.facts"); english(e.result, w, "ex.result"); }
    if (it.terms !== undefined && !Array.isArray(it.terms)) err(w, "terms must be a list");
    if (!isArr(it.quiz, 2) || it.quiz.length > 5) err(w, "quiz: 2-5 inline checks");
    else it.quiz.forEach((q, i) => {
      const qw = `${w} quiz[${i}]`;
      if (q.t === "mcq") {
        english(q.q, qw, "q");
        if (!isArr(q.options, 3)) err(qw, "options: at least 3");
        else { distinct(q.options, qw, err, "options"); if (!q.options.includes(q.a)) err(qw, "a must be one of the options"); }
        english(q.why, qw, "why");
      } else if (q.t === "tf") {
        english(q.q, qw, "q");
        if (typeof q.a !== "boolean") err(qw, "a must be true/false");
        english(q.why, qw, "why");
      } else if (q.t === "bucket") {
        if (!isArr(q.buckets, 2) || q.buckets.length > 4) err(qw, "buckets: 2-4");
        else distinct(q.buckets, qw, err, "buckets");
        if (!isArr(q.items, 3)) err(qw, "items: at least 3 {text, bucket}");
        else for (const x of q.items) { if (!isStr(x.text)) err(qw, "item.text missing"); if (!(q.buckets || []).includes(x.bucket)) err(qw, `item bucket "${x.bucket}" is not one of the buckets`); }
      } else err(qw, `t must be mcq/tf/bucket (got "${q.t}")`);
    });
    if (isStr(it.id)) ctx.rules.set(it.id, unit.id);
  },
  hypo(it, err, warn, w, { english, unit, ctx }) {
    checkStem(it, err, warn, w, english);
    if (!E.CALL_TYPES.includes(it.callType)) err(w, `callType must be one of ${E.CALL_TYPES.join("/")}`);
    checkOptions(it, err, warn, w, { needTrap: true });
    english(it.issue, w, "issue");
    if (isStr(it.issue) && it.issue.split(/\s+/).length > 8) warn(w, "issue should be the doctrine in ≤ 6 words");
    if (!isStr(it.rule)) err(w, "rule missing (id of the rule card it applies)");
    else ctx.refs.push({ w, rule: it.rule, unit: unit.id, dep: unit.dep || [] });
    if (it.grid !== undefined) {
      if (typeof it.grid !== "boolean") err(w, "grid must be true/false");
      else if (it.grid && isArr(it.options, 4)) {
        const groups = {};
        it.options.forEach((o) => { const v = E.verdictOf(o); groups[v] = (groups[v] || 0) + 1; });
        if (Object.keys(groups).length !== 2 || Object.values(groups).some((c) => c !== 2)) err(w, `grid: options must split into two verdicts of two options each (got ${JSON.stringify(groups)})`);
      }
    }
    if (it.facts !== undefined) {
      if (!isArr(it.facts, 1) || it.facts.length > 3) err(w, "facts: 1-3 phrases copied from the stem");
      else if (isStr(it.stem)) { const toks = E.tokens(it.stem).map(E.stripMarks); for (const f of it.facts) { const want = E.tokens(f).map(E.stripMarks); let found = false; for (let i = 0; i + want.length <= toks.length && !found; i++) found = want.every((x, k) => toks[i + k] === x); if (!found) err(w, `facts: "${f}" does not occur word-for-word in the stem`); } }
    }
    if (it.short !== undefined) english(it.short, w, "short");
    if (it.assume !== undefined) english(it.assume, w, "assume");
    if (it.trapType !== undefined && !E.TRAP_TYPES[it.trapType]) err(w, "trapType must be a distractor type 1-11");
  },
  argue(it, err, warn, w, { english, unit, ctx }) {
    checkStem(it, err, warn, w, english);
    checkOptions(it, err, warn, w, { needTrap: false });
    if (it.rule !== undefined) { if (!isStr(it.rule)) err(w, "rule must be a rule id"); else ctx.refs.push({ w, rule: it.rule, unit: unit.id, dep: unit.dep || [] }); }
    if (it.issue !== undefined) english(it.issue, w, "issue");
  },
  steps(it, err, warn, w, { english }) {
    english(it.title, w, "title");
    if (!isArr(it.steps, 3) || it.steps.length > 6) err(w, "steps: 3-6 ordered strings");
    else { distinct(it.steps, w, err, "steps"); for (const s of it.steps) english(s, w, "step"); }
    if (!isArr(it.distractors, 2) || it.distractors.length > 4) err(w, "distractors: 2-4 wrong or out-of-order steps");
    else { distinct(it.distractors, w, err, "distractors"); noOverlap(it.steps || [], it.distractors, w, err); }
    if (it.applyTo !== undefined) {
      if (!it.applyTo || typeof it.applyTo !== "object") err(w, "applyTo must be {facts, stop, why}");
      else { english(it.applyTo.facts, w, "applyTo.facts"); if (!(it.steps || []).some((s) => n(s) === n(it.applyTo.stop))) err(w, "applyTo.stop must be one of the steps"); if (it.applyTo.why !== undefined) english(it.applyTo.why, w, "applyTo.why"); }
    }
  },
  pairs(it, err, warn, w, { english }) {
    if (it.set !== undefined) english(it.set, w, "set");
    if (!isArr(it.pairs, 3) || it.pairs.length > 8) err(w, "pairs: 3-8 {l, r}");
    else {
      if (it.pairs.length < 5) warn(w, "pairs: fewer than 5 (the exam-shaped match uses 5 + 2 spare)");
      for (const p of it.pairs) { english(p.l, w, "pair.l"); english(p.r, w, "pair.r"); }
      distinct(it.pairs.map((p) => p.l), w, err, "pairs.l");
      distinct(it.pairs.map((p) => p.r), w, err, "pairs.r");
      if (it.spare !== undefined) { if (!Array.isArray(it.spare) || it.spare.length > 2) err(w, "spare: 0-2 extra right-hand tiles"); else noOverlap(it.pairs.map((p) => p.r), it.spare, w, err, "spare"); }
    }
    if (!PAIR_MODES.includes(it.mode)) err(w, `mode must be one of ${PAIR_MODES.join("/")}`);
  },
  sort(it, err, warn, w, { english }) {
    english(it.q, w, "q");
    if (!isArr(it.buckets, 2) || it.buckets.length > 4) err(w, "buckets: 2-4 labels");
    else distinct(it.buckets, w, err, "buckets");
    if (!isArr(it.items, 4) || it.items.length > 12) err(w, "items: 4-12 {text, bucket, why}");
    else {
      if (it.items.length < 6) warn(w, "items: fewer than 6");
      for (const x of it.items) { english(x.text, w, "item.text"); if (!(it.buckets || []).includes(x.bucket)) err(w, `item bucket "${x.bucket}" is not one of the buckets`); if (x.why === undefined) warn(w, `item "${String(x.text).slice(0, 30)}…" has no why`); else english(x.why, w, "item.why"); }
      distinct(it.items.map((x) => x.text), w, err, "items");
      if (new Set(it.items.map((x) => x.bucket)).size < 2) warn(w, "every item lands in the same bucket");
    }
    if (!SORT_MODES.includes(it.mode)) err(w, `mode must be one of ${SORT_MODES.join("/")}`);
  },
  num(it, err, warn, w, { english }) {
    english(it.ask, w, "ask");
    if (!isStr(it.answer)) err(w, 'answer missing (e.g. "30 days", "$75,000")');
    else if (!/\d/.test(it.answer)) err(w, "answer must contain a number");
    if (it.alt !== undefined) { if (!Array.isArray(it.alt) || it.alt.some((x) => !isStr(x))) err(w, "alt must be a list of accepted spellings"); else for (const a of it.alt) if (isStr(it.answer) && E.normNum(a) !== E.normNum(it.answer) && n(a) !== n(it.answer)) warn(w, `alt "${a}" does not normalise to "${it.answer}" (it is still accepted as typed)`); }
  },
  case(it, err, warn, w, { english }) {
    english(it.name, w, "name");
    if (isStr(it.name) && !/\sv\.\s/.test(it.name) && !/\b(In re|Ex parte)\b/.test(it.name)) warn(w, `name "${it.name}" does not look like a case name (X v. Y)`);
    if (!Number.isInteger(it.year) || it.year < 1600 || it.year > 2030) err(w, "year must be an integer");
    english(it.holding, w, "holding");
    if (isStr(it.holding) && it.holding.length > 220) err(w, `holding is ${it.holding.length} chars (one line, max 220)`);
    if (it.facts !== undefined) english(it.facts, w, "facts");
    if (it.overruledBy !== undefined) english(it.overruledBy, w, "overruledBy");
    if (it.overrules !== undefined) english(it.overrules, w, "overrules");
  },
  term(it, err, warn, w, { english }) {
    english(it.term, w, "term");
    if (!LANGS.includes(it.lang)) err(w, `lang must be one of ${LANGS.join("/")}`);
    if (it.literal !== undefined) english(it.literal, w, "literal");
    english(it.meaning, w, "meaning");
    if (it.use !== undefined) english(it.use, w, "use");
    if (it.pairWith !== undefined) english(it.pairWith, w, "pairWith");
  },
  trap(it, err, warn, w, { english }) {
    english(it.wrong, w, "wrong");
    english(it.right, w, "right");
    if (isStr(it.wrong) && isStr(it.right) && n(it.wrong) === n(it.right)) err(w, "wrong equals right");
    english(it.stem, w, "stem");
    english(it.why, w, "why");
    if (!TRAP_CATS.includes(String(it.cat))) err(w, `cat must be a distractor type 1-11 or one of ${Object.keys(E.SELF_TAGS).join("/")}`);
    if (it.subject !== undefined && !SUBJECTS.includes(it.subject)) err(w, `subject must be one of ${SUBJECTS.join("/")}`);
  },
};

/** Validate a list of units together (course-wide id uniqueness, rule references). */
function validateCourse(units) {
  const ctx = { ids: new Set(), rules: new Map(), refs: [] };
  const all = { errors: [], warnings: [] };
  const unitIds = new Set();
  for (const u of units) {
    if (unitIds.has(u && u.id)) all.errors.push(`${u.id}: duplicate unit id`);
    unitIds.add(u && u.id);
    const r = validateUnit(u, ctx);
    all.errors.push(...r.errors);
    all.warnings.push(...r.warnings);
  }
  for (const ref of ctx.refs) {
    const owner = ctx.rules.get(ref.rule);
    if (!owner) all.errors.push(`${ref.w}: rule "${ref.rule}" is not a rule card anywhere in the course`);
    else if (owner !== ref.unit && !ref.dep.includes(owner)) all.warnings.push(`${ref.w}: rule "${ref.rule}" lives in ${owner}; list it in the unit's dep`);
  }
  return all;
}

module.exports = { validateUnit, validateCourse, properNames, KINDS, STATUS, SUBJECTS, EXAMS, LANGS, PAIR_MODES, SORT_MODES, TRAP_CATS, CITE };

if (require.main === module) {
  const { loadUnits } = require("../src/course.js");
  const args = process.argv.slice(2);
  const units = args.length ? args.map((f) => { const p = path.resolve(f); delete require.cache[p]; return require(p); }) : loadUnits({ example: true });
  const r = validateCourse(units);
  const items = units.reduce((a, u) => a + (u.lessons || []).reduce((b, l) => b + (l.items || []).length, 0), 0);
  const unsure = units.reduce((a, u) => a + (u.lessons || []).reduce((b, l) => b + (l.items || []).filter((i) => i.status === "unsure").length, 0), 0);
  for (const w of r.warnings) console.log(`warn  ${w}`);
  for (const e of r.errors) console.log(`ERROR ${e}`);
  console.log(`${units.length} unit(s), ${items} items (${unsure} under review), ${r.errors.length} error(s), ${r.warnings.length} warning(s)`);
  process.exit(r.errors.length ? 1 : 0);
}
