// Content validator: checks every unit file against CONTENT_SCHEMA.md.
// Used by test/content.test.js and runnable on its own:
//   node app/tools/validate.js                 (all units, example included)
//   node app/tools/validate.js app/src/units/u3.js
const path = require("node:path");
const { Engine: E } = require("../src/engine.js");

const KINDS = ["word", "sentence", "form", "rule", "role", "clause", "transform", "fact", "hook", "origin", "trap"];
const STATUS = ["book", "exam", "general", "unsure"];
const SECTIONS = ["Α1", "Β1", "Β2", "Γ1", "Γ2", "Δ1", "Δ2"];
const POS = ["noun", "verb", "adj", "adv", "pron", "prep", "conj", "num", "phrase", "interj"];
const HOOK_TYPES = ["cognate", "loan", "official", "phrase", "calque"];
const TRAP_CATS = ["read", "noun", "verb", "syntax", "marking"];
const GREEK = /[Ͱ-Ͽἀ-῿]/;
const LATIN_ONLY = /^[A-Za-zÀ-ɏḀ-ỿ\s.,;:!?'’«»()\-…]+$/;

const isStr = (x) => typeof x === "string" && x.trim().length > 0;
const isArr = (x, min = 0) => Array.isArray(x) && x.length >= min;
const n = E.norm;

/**
 * Validate one unit. Returns { errors: string[], warnings: string[] }.
 * `ctx.ids` (a Set) accumulates ids across units for course-wide uniqueness.
 */
function validateUnit(unit, ctx = { ids: new Set() }) {
  const errors = [];
  const warnings = [];
  const err = (where, msg) => errors.push(`${where}: ${msg}`);
  const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

  if (!unit || typeof unit !== "object") return { errors: ["unit: not an object (did the file set module.exports = unit?)"], warnings };
  const U = unit.id || "?";
  if (!/^u\d+(_example)?$/.test(String(unit.id))) err(U, "id must look like u3 (or u0_example)");
  if (!isStr(unit.title)) err(U, "title missing");
  if (!isStr(unit.blurb)) err(U, "blurb missing");
  if (!isArr(unit.exam, 1) || unit.exam.some((s) => !SECTIONS.includes(s))) err(U, `exam must list sections from ${SECTIONS.join(" ")}`);
  if (!isArr(unit.lessons, 1)) { err(U, "lessons missing"); return { errors, warnings }; }

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
      if (!KINDS.includes(it.kind)) { err(w, `unknown kind "${it.kind}"`); continue; }
      if (it.kind !== "rule") quizzable++;
      if (!isStr(it.say)) err(w, "say missing (one-breath Greek line)");
      else { if (it.say.length > 160) err(w, `say is ${it.say.length} chars (max 160)`); if (!GREEK.test(it.say)) err(w, "say must be in Greek"); }
      if (!STATUS.includes(it.status)) err(w, `status must be one of ${STATUS.join("/")}`);
      if (it.status === "unsure") warn(w, "status unsure: needs a human reviewer");
      if (!isStr(it.src)) err(w, "src missing (where the fact was checked)");
      if (it.exam !== undefined && (!Array.isArray(it.exam) || it.exam.some((y) => !Number.isInteger(y) || y < 2000 || y > 2030))) err(w, "exam must be a list of years");
      if (it.lesson !== undefined && !(Number.isInteger(it.lesson) && it.lesson >= 1 && it.lesson <= 50)) err(w, "lesson must be 1-50");
      if (it.lessons !== undefined && (!Array.isArray(it.lessons) || it.lessons.some((x) => !Number.isInteger(x) || x < 1 || x > 50))) err(w, "lessons must be a list of 1-50");
      try { CHECK[it.kind](it, err, warn, w); } catch (e) { err(w, `validator crashed on this item: ${e.message}`); }
    }
    if (quizzable === 0) err(Lid, "a lesson needs at least one quizzable item (anything but rule)");
  });
  return { errors, warnings };
}

const distinct = (arr, w, err, what) => { const seen = new Set(); for (const x of arr) { const k = n(x); if (seen.has(k)) err(w, `${what}: duplicate "${x}"`); seen.add(k); } };
const noOverlap = (answers, distractors, w, err, what = "distractors") => { for (const d of distractors) if (answers.some((a) => n(a) === n(d))) err(w, `${what}: "${d}" equals an accepted answer`); };
const hasGreek = (v, w, err, field) => { if (!isStr(v)) err(w, `${field} missing`); else if (!GREEK.test(v)) err(w, `${field} must be in Greek`); };
const latinish = (v, w, err, field) => { if (!isStr(v)) err(w, `${field} missing`); else if (GREEK.test(v)) err(w, `${field} must be Latin (contains Greek letters)`); };

const CHECK = {
  word(it, err, warn, w) {
    latinish(it.la, w, err, "la");
    if (!POS.includes(it.pos)) err(w, `pos must be one of ${POS.join("/")}`);
    hasGreek(it.el, w, err, "el");
    if (!isStr(it.forms)) err(w, "forms missing (dictionary form as the book prints it)");
    else {
      const parts = E.partsOf(it);
      if (n(parts[0]) !== n(it.la) && !parts[0].toLowerCase().startsWith(it.la.toLowerCase())) warn(w, `forms should start with the lemma (${parts[0]} vs ${it.la})`);
      if (it.pos === "noun" && parts.length < 2) err(w, "a noun needs lemma + genitive in forms");
      if (it.pos === "verb" && parts.length < 3 && !/irreg|defect|impers/.test(String(it.decl))) err(w, "a verb needs 3 (deponent) or 4 principal parts in forms, or decl irreg/defect/impers");
      if (it.pos === "verb" && parts.length === 3 && !it.dep && !/irreg|defect|impers/.test(String(it.decl))) warn(w, "3 principal parts but dep is not true");
    }
    if (it.pos === "noun" && !["m", "f", "n", "c"].includes(it.gender)) err(w, "gender must be m/f/n/c for a noun");
    if (["noun", "adj", "verb"].includes(it.pos) && !isStr(String(it.decl || ""))) err(w, "decl missing (noun 1-5, adj 2-1-2/3, verb 1/2/3/3-io/4/irreg)");
    if (!isStr(it.hook)) warn(w, "hook missing (memory hook in Greek)"); else if (!GREEK.test(it.hook)) err(w, "hook must be in Greek");
    if (it.etym !== undefined) {
      if (!Array.isArray(it.etym)) err(w, "etym must be a list of {el, official}");
      else for (const e of it.etym) { hasGreek(e.el, w, err, "etym.el"); if (typeof e.official !== "boolean") err(w, "etym.official must be true/false"); }
    }
    if (it.trap !== undefined && !GREEK.test(it.trap)) err(w, "trap must be in Greek");
  },
  sentence(it, err, warn, w) {
    latinish(it.la, w, err, "la");
    hasGreek(it.el, w, err, "el");
    if (!isArr(it.chunks, 3) || it.chunks.length > 9) err(w, "chunks must be 3-9 Greek tiles");
    else {
      if (n(it.chunks.join(" ")) !== n(it.el)) err(w, `chunks must join to el exactly: "${it.chunks.join(" ")}" vs "${it.el}"`);
      distinct(it.chunks, w, err, "chunks");
    }
    if (!Array.isArray(it.gloss) || it.gloss.length > 4) err(w, "gloss must be a list of 0-4 {la, el}");
    else for (const g of it.gloss) { latinish(g.la, w, err, "gloss.la"); hasGreek(g.el, w, err, "gloss.el"); }
    if (!Array.isArray(it.notes) || it.notes.length > 3) err(w, "notes must be a list of 0-3 {w, role_el, dep}");
    else for (const nt of it.notes) {
      if (!isStr(nt.w)) err(w, "note.w missing"); else if (!n(it.la).includes(n(nt.w))) err(w, `note.w "${nt.w}" is not in la`);
      hasGreek(nt.role_el, w, err, "note.role_el");
      if (!isStr(nt.dep)) err(w, "note.dep missing (the word it depends on)");
    }
    if (it.find !== undefined) {
      if (!Array.isArray(it.find)) err(w, "find must be a list of {ask, words}");
      else for (const f of it.find) {
        hasGreek(f.ask, w, err, "find.ask");
        if (!isArr(f.words, 1)) err(w, "find.words missing");
        else { const toks = E.tokens(it.la).map(E.stripMarks); for (const t of f.words) if (!toks.includes(E.stripMarks(t))) err(w, `find word "${t}" is not a token of la`); }
      }
    }
    if (!Array.isArray(it.exam)) err(w, "exam must be a list of years ([] if never in a paper)");
  },
  form(it, err, warn, w) {
    latinish(it.lemma, w, err, "lemma");
    latinish(it.given, w, err, "given");
    hasGreek(it.ask, w, err, "ask");
    if (!/^[a-z0-9.]+$/.test(String(it.cell || ""))) err(w, "cell must be a machine key like gen.pl or impv.fut.2sg.act");
    if (!isArr(it.answer, 1) || it.answer.some((a) => !isStr(a))) err(w, "answer must be a non-empty list of strings (first = preferred)");
    else {
      if (it.answer.some((a) => /[̀-ͯĀ-ſ]/.test(a.normalize("NFD")))) err(w, "answer must not carry macrons (the student never types them)");
      if (!isArr(it.distractors, 3)) err(w, "distractors: at least 3 wrong forms");
      else { distinct(it.distractors, w, err, "distractors"); noOverlap(it.answer, it.distractors, w, err); }
      if (it.tiles !== undefined) {
        if (!isArr(it.tiles, 2)) err(w, "tiles must have at least 2 pieces");
        else if (n(it.tiles.join("")) !== n(it.answer[0])) err(w, `tiles must join to the answer: ${it.tiles.join("+")} vs ${it.answer[0]}`);
      }
    }
    hasGreek(it.rule, w, err, "rule");
    hasGreek(it.why, w, err, "why");
    if (it.ctx !== undefined) latinish(it.ctx, w, err, "ctx");
    if (it.transfer !== undefined && typeof it.transfer !== "boolean") err(w, "transfer must be true/false");
  },
  rule(it, err, warn, w) {
    hasGreek(it.title, w, err, "title");
    if (!isArr(it.ex, 2) || it.ex.length > 4) err(w, "ex must be 2-4 {la, el} examples");
    else for (const e of it.ex) { if (!isStr(e.la)) err(w, "ex.la missing"); hasGreek(e.el, w, err, "ex.el"); }
    if (!Array.isArray(it.terms)) err(w, "terms must be a list (school terms the rule introduces)");
    if (!isArr(it.quiz, 1) || it.quiz.length > 5) err(w, "quiz must have 1-5 questions");
    else it.quiz.forEach((q, i) => {
      const qw = `${w} quiz[${i}]`;
      if (q.t === "mcq") {
        if (!isStr(q.q)) err(qw, "q missing");
        if (!isArr(q.options, 3)) err(qw, "options: at least 3");
        else { distinct(q.options, qw, err, "options"); if (!q.options.includes(q.a)) err(qw, "a must be one of the options"); }
        if (!isStr(q.why)) err(qw, "why missing");
      } else if (q.t === "tf") {
        if (!isStr(q.q)) err(qw, "q missing");
        if (typeof q.a !== "boolean") err(qw, "a must be true/false");
        if (!isStr(q.why)) err(qw, "why missing");
      } else if (q.t === "bucket") {
        if (!isArr(q.buckets, 2) || q.buckets.length > 4) err(qw, "buckets: 2-4");
        else distinct(q.buckets, qw, err, "buckets");
        if (!isArr(q.items, 3)) err(qw, "items: at least 3 {text, bucket}");
        else for (const x of q.items) { if (!isStr(x.text)) err(qw, "item.text missing"); if (!(q.buckets || []).includes(x.bucket)) err(qw, `item bucket "${x.bucket}" is not one of the buckets`); }
      } else err(qw, `t must be mcq/tf/bucket (got "${q.t}")`);
    });
  },
  role(it, err, warn, w) {
    latinish(it.la, w, err, "la");
    if (!isStr(it.w)) err(w, "w missing"); else if (!n(it.la).includes(n(it.w))) err(w, `w "${it.w}" is not in la`);
    if (!isArr(it.answer, 1)) err(w, "answer: list of accepted role phrases (first = marker phrase)");
    else for (const a of it.answer) hasGreek(a, w, err, "answer");
    if (!isStr(it.dep) || !/^στο /.test(it.dep)) err(w, 'dep must start with "στο " (the word the role attaches to)');
    if (!isArr(it.tiles, 2)) err(w, "tiles: at least 2 pieces");
    else if (isArr(it.answer, 1) && isStr(it.dep) && n(it.tiles.join(" ")) !== n(`${it.answer[0]} ${it.dep}`)) err(w, `tiles must join to "${it.answer[0]} ${it.dep}"`);
    if (!isArr(it.distractors, 3)) err(w, "distractors: 3 plausible wrong roles");
    else { distinct(it.distractors, w, err, "distractors"); if (isArr(it.answer, 1)) noOverlap(it.answer, it.distractors, w, err); for (const d of it.distractors) hasGreek(d, w, err, "distractor"); }
    hasGreek(it.why, w, err, "why");
  },
  clause(it, err, warn, w) {
    latinish(it.la, w, err, "la");
    if (isStr(it.la) && !/«[^»]+»/.test(it.la)) err(w, "la must mark the clause with « »");
    for (const f of ["kind_el", "fn_el", "intro_el", "mood_el", "tense_el"]) hasGreek(it[f], w, err, f);
    if (!it.distractors || typeof it.distractors !== "object") err(w, "distractors must be {kind, fn, intro, mood, tense} lists");
    else for (const [k, f] of [["kind", "kind_el"], ["fn", "fn_el"], ["intro", "intro_el"], ["mood", "mood_el"], ["tense", "tense_el"]]) {
      const d = it.distractors[k];
      if (!isArr(d, 2)) err(w, `distractors.${k}: at least 2`);
      else { distinct(d, w, err, `distractors.${k}`); noOverlap([it[f] || ""], d, w, err, `distractors.${k}`); }
    }
    if (it.contract !== undefined) latinish(it.contract, w, err, "contract");
    if (it.expand !== undefined && (!Array.isArray(it.expand) || it.expand.some((x) => !isStr(x)))) err(w, "expand must be a list of Latin strings");
  },
  transform(it, err, warn, w) {
    latinish(it.from, w, err, "from");
    hasGreek(it.ask, w, err, "ask");
    if (!isArr(it.to, 1) || it.to.some((x) => !isStr(x))) err(w, "to: list of accepted Latin answers (first = model)");
    else {
      const words = E.tokens(it.to[0]).map((t) => E.stripMarks(t.replace(/[.,;:!?«»]+$/g, "")));
      if (!isArr(it.tiles, words.length + 1)) err(w, "tiles must hold every word of to[0] plus at least one wrong-form tile");
      else {
        // a tile is used once in the game, so a word that repeats in to[0] («et … et», «aut … aut») needs as many tiles
        const tl = it.tiles.map(E.stripMarks);
        const count = (arr, x) => arr.filter((y) => y === x).length;
        for (const x of new Set(words)) {
          const need = count(words, x), have = count(tl, x);
          if (have < need) err(w, `tile "${x}" (from to[0]) ${need > 1 ? `is needed ${need} times but given ${have}` : "is missing"}`);
        }
        for (const x of new Set(tl)) if (count(tl, x) > Math.max(1, count(words, x))) err(w, `tiles: "${x}" repeats more often than to[0] needs it`);
      }
      if (n(it.to[0]) === n(it.from)) err(w, "to[0] equals from: nothing changes");
    }
    if (typeof it.orderFree !== "boolean") err(w, "orderFree must be true/false");
    if (it.changed !== undefined && !Number.isInteger(it.changed)) err(w, "changed must be an integer");
    if (!Array.isArray(it.steps) || it.steps.length > 6) err(w, "steps: 0-6 Greek micro-steps");
    else for (const s of it.steps) hasGreek(s, w, err, "step");
    hasGreek(it.why, w, err, "why");
  },
  fact(it, err, warn, w) {
    hasGreek(it.q, w, err, "q");
    if (it.t === "tf") { if (typeof it.a !== "boolean") err(w, "a must be true/false for tf"); }
    else if (it.t === "mcq") {
      if (!isArr(it.options, 3)) err(w, "options: at least 3 (the exam uses α/β/γ)");
      else { distinct(it.options, w, err, "options"); if (!it.options.includes(it.a)) err(w, "a must be one of the options"); }
    } else err(w, 't must be "tf" or "mcq"');
    hasGreek(it.why, w, err, "why");
    if (!isStr(String(it.bankId || ""))) err(w, 'bankId missing (number in the ministry bank, or "textbook")');
  },
  hook(it, err, warn, w) {
    latinish(it.la, w, err, "la");
    hasGreek(it.el, w, err, "el");
    if (!HOOK_TYPES.includes(it.type)) err(w, `type must be one of ${HOOK_TYPES.join("/")}`);
    hasGreek(it.story, w, err, "story");
  },
  origin(it, err, warn, w) {
    hasGreek(it.w, w, err, "w");
    if (typeof it.latin !== "boolean") err(w, "latin must be true/false");
    hasGreek(it.from, w, err, "from");
  },
  trap(it, err, warn, w) {
    if (!isStr(it.wrong)) err(w, "wrong missing");
    if (!isStr(it.right)) err(w, "right missing");
    if (isStr(it.wrong) && isStr(it.right) && n(it.wrong) === n(it.right)) err(w, "wrong equals right");
    hasGreek(it.ask, w, err, "ask");
    hasGreek(it.why, w, err, "why");
    if (!TRAP_CATS.includes(it.cat)) err(w, `cat must be one of ${TRAP_CATS.join("/")}`);
  },
};

/** Validate a list of units together (course-wide id uniqueness, Β2 pool size). */
function validateCourse(units) {
  const ctx = { ids: new Set() };
  const all = { errors: [], warnings: [] };
  const unitIds = new Set();
  for (const u of units) {
    if (unitIds.has(u && u.id)) all.errors.push(`${u.id}: duplicate unit id`);
    unitIds.add(u && u.id);
    const r = validateUnit(u, ctx);
    all.errors.push(...r.errors);
    all.warnings.push(...r.warnings);
  }
  return all;
}

module.exports = { validateUnit, validateCourse, KINDS, STATUS, SECTIONS, POS, HOOK_TYPES, TRAP_CATS };

if (require.main === module) {
  const { loadUnits } = require("../src/course.js");
  const args = process.argv.slice(2);
  const units = args.length ? args.map((f) => { const p = path.resolve(f); delete require.cache[p]; return require(p); }) : loadUnits({ example: true });
  const r = validateCourse(units);
  const items = units.reduce((a, u) => a + (u.lessons || []).reduce((b, l) => b + (l.items || []).length, 0), 0);
  for (const w of r.warnings) console.log(`warn  ${w}`);
  for (const e of r.errors) console.log(`ERROR ${e}`);
  console.log(`${units.length} unit(s), ${items} items, ${r.errors.length} error(s), ${r.warnings.length} warning(s)`);
  process.exit(r.errors.length ? 1 : 0);
}
