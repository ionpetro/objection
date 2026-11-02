// Content checks: every unit file (example included) passes the validator, and the engine can build
// valid questions from it across many seeds. Writers run `npm test` after editing their unit.
const test = require("node:test");
const assert = require("node:assert/strict");
const { loadUnits, unitFiles } = require("../src/course.js");
const { validateCourse } = require("../tools/validate.js");
const { Engine: E } = require("../src/engine.js");

const units = loadUnits({ example: true });
const IX = E.indexCourse(units);

test("the example unit is present and every unit file exports its unit", () => {
  assert.ok(units.some((u) => u.id === "u0_example"), "u0_example.js must export the example unit");
  for (const u of units) assert.ok(u && u.id && Array.isArray(u.lessons), "unit must be an object with id and lessons");
  assert.equal(unitFiles({ example: false }).filter((f) => f.endsWith("u0_example.js")).length, 0, "the real build must skip the example");
});

test("every unit passes the content validator", () => {
  const r = validateCourse(units);
  assert.deepEqual(r.errors, [], `content errors:\n${r.errors.join("\n")}`);
});

test("the example unit uses every item kind", () => {
  const ex = units.find((u) => u.id === "u0_example");
  const kinds = new Set(ex.lessons.flatMap((l) => l.items.map((i) => i.kind)));
  for (const k of ["word", "sentence", "form", "rule", "role", "clause", "transform", "fact", "hook", "origin", "trap"]) assert.ok(kinds.has(k), `example lacks kind ${k}`);
});

/** Structural checks a rendered question must satisfy. */
function checkQ(q, where) {
  assert.ok(q && q.type, `${where}: empty question`);
  if (q.type === "intro") { assert.ok(IX.items.has(q.itemId), `${where}: intro of unknown item`); return; }
  assert.ok(q.label, `${where}: label`);
  if (q.type === "mcq") {
    assert.ok(q.options.includes(q.answer), `${where}: answer missing from options (${q.prompt})`);
    assert.equal(new Set(q.options.map(E.norm)).size, q.options.length, `${where}: duplicate options ${q.options.join("|")}`);
    assert.ok(q.options.length >= 3, `${where}: too few options`);
  } else if (q.type === "tf") {
    assert.equal(typeof q.answer, "boolean", where);
    assert.ok(q.yes && q.no, `${where}: tf needs yes/no labels`);
  } else if (q.type === "build") {
    for (const p of q.answer) assert.ok(q.tiles.includes(p), `${where}: tile "${p}" missing`);
    assert.ok(q.tiles.length > q.answer.length, `${where}: no distractor tiles`);
  } else if (q.type === "match") {
    assert.ok(q.pairs.length >= 3 && q.pairs.length <= 5, `${where}: ${q.pairs.length} pairs`);
    assert.equal(new Set(q.pairs.map((p) => E.norm(p[0]))).size, q.pairs.length, `${where}: duplicate left`);
    assert.equal(new Set(q.pairs.map((p) => E.norm(p[1]))).size, q.pairs.length, `${where}: duplicate right`);
    assert.equal(q.right.length, q.pairs.length + q.spare.length, `${where}: right column size`);
    for (const sp of q.spare) assert.ok(!q.pairs.some((p) => E.norm(p[1]) === E.norm(sp)), `${where}: spare "${sp}" is also an answer`);
  } else if (q.type === "slots") {
    assert.equal(q.slots.length, q.answer.length, `${where}: one answer per slot`);
    for (const a of q.answer) assert.ok(q.tiles.includes(a), `${where}: slot answer "${a}" not in tiles`);
    assert.ok(q.tiles.length > q.answer.length, `${where}: no distractor tiles`);
  } else if (q.type === "bucket") {
    assert.ok(q.buckets.length >= 2, where);
    for (const it of q.items) assert.ok(q.buckets.includes(it.bucket), `${where}: bucket ${it.bucket}`);
  } else if (q.type === "find") {
    assert.ok(q.answer.length >= 1, `${where}: find has no target`);
    for (const i of q.answer) assert.ok(q.words[i] !== undefined, `${where}: bad token index`);
  } else if (q.type === "steps") {
    assert.equal(q.steps.length, 5, where);
    for (const st of q.steps) { assert.ok(st.options.includes(st.answer), `${where}: step answer missing`); assert.ok(st.options.length >= 3, `${where}: step needs 3 options`); assert.equal(new Set(st.options.map(E.norm)).size, st.options.length, `${where}: duplicate step options`); }
  } else if (q.type === "transform") {
    // play it the way the UI does: each tile can be placed once, so a repeated word («et … et») needs two tiles
    const left = q.tiles.map(E.stripMarks);
    for (const a of q.answer) { const i = left.indexOf(E.stripMarks(a)); assert.ok(i >= 0, `${where}: tile "${a}" missing (or needed more than once)`); left.splice(i, 1); }
    assert.ok(q.tiles.length > q.answer.length, `${where}: no wrong-form tiles`);
  } else if (q.type === "spot") {
    assert.ok(q.fixOptions.includes(q.fix), `${where}: fix not among options`);
    assert.equal(typeof q.isRight, "boolean", where);
  } else if (q.type === "type") {
    assert.ok(Array.isArray(q.answer) && q.answer.length >= 1, where);
    if (q.tiles) for (const a of q.answer.slice(0, 1)) assert.ok(E.norm(q.tiles.filter((t) => !["um", "ium", "is", "ibus", "e", "i", "o", "a", "ae", "arum", "orum", "to", "te", "tote", "nto", "re", "ri", "isse", "nd"].includes(t) || true).join("")).length >= E.norm(a).length, where);
  } else if (q.type === "swipe") {
    assert.ok(q.cards.length >= 1, where);
  } else assert.fail(`${where}: unknown question type ${q.type}`);
}

test("every lesson sitting and roundup builds valid questions across many seeds", () => {
  const s = E.freshState();
  for (let seed = 1; seed <= 40; seed++) {
    for (const l of IX.lessons) {
      const sittings = E.lessonSittings(IX, l.id);
      assert.ok(sittings.length >= 1, `${l.id}: no sittings`);
      sittings.forEach((_, k) => {
        const steps = E.buildLesson(IX, s, l.id, seed, k);
        const scored = steps.filter((q) => q.type !== "intro" && !q.guess);
        assert.ok(scored.length >= 3, `${l.id} sitting ${k}: only ${scored.length} scored steps`);
        assert.ok(scored.length <= 24, `${l.id} sitting ${k}: ${scored.length} scored steps is too long for one sitting`);
        steps.forEach((q, i) => checkQ(q, `${l.id} s${k} #${i} seed ${seed}`));
        const transfers = sittings[k].filter((id) => IX.items.get(id).transfer);
        for (const id of transfers) {
          assert.ok(steps.some((q) => q.itemId === id && q.label === E.L.decode), `${l.id}: transfer item ${id} never asked as decode`);
          assert.ok(!steps.some((q) => q.itemId === id && q.type === "intro"), `${l.id}: transfer item ${id} must not get an intro`);
        }
      });
    }
    for (const u of IX.course.units) E.buildRoundup(IX, s, u.id, seed).forEach((q, i) => checkQ(q, `${u.id} roundup #${i} seed ${seed}`));
  }
});

test("review questions exist for every quizzable item", () => {
  const r = E.rng(11);
  for (const it of IX.items.values()) {
    const q = E.qReview(IX, it, r);
    assert.ok(q, `${it.id}: no review question`);
    checkQ(q, `review ${it.id}`);
  }
});

test("practice, swipe, Colosseum, daily drill and mock build valid questions for a learner", () => {
  const s = E.freshState();
  for (const it of [...IX.items.values()].slice(0, 30)) E.learn(s, it.id, "2026-10-01");
  const steps = E.buildPractice(IX, s, 7);
  assert.ok(steps.length >= 5, "practice too short");
  steps.forEach((q, i) => checkQ(q, `practice #${i}`));
  const sw = E.buildSwipe(IX, s, 3);
  if (sw) checkQ(sw, "swipe");
  const r = E.rng(5);
  for (let i = 0; i < 200; i++) { const q = E.colosseumQuestion(IX, s, r); checkQ(q, `colosseum #${i}`); if (q.type === "mcq") assert.equal(q.options.length, 3, "colosseum has 3 options"); }
  for (let i = 0; i < 50; i++) checkQ(E.colosseumQuestion(IX, E.freshState(), r), `colosseum new #${i}`);
  for (let d = 0; d < 14; d++) {
    const day = E.addDays("2026-11-02", d);
    const daily = E.buildDaily(IX, s, day);
    assert.ok(daily.steps.length >= 1, `${day}: empty daily`);
    daily.steps.forEach((q, i) => { checkQ(q, `daily ${day} #${i}`); assert.ok(q.marks > 0, "daily question carries marks"); });
    assert.deepEqual(E.buildDaily(IX, s, day).steps.map((q) => q.itemId), daily.steps.map((q) => q.itemId), "daily is the same when reopened");
  }
  const mock = E.buildMock(IX, s, 9);
  assert.ok(mock.steps.length >= 5);
  mock.steps.forEach((q, i) => checkQ(q, `mock #${i}`));
});
