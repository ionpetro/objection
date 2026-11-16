// True/false must not be answerable by always tapping "False": authored statements are mostly false,
// so the engine sometimes asks the card's own rule (true by construction). Checks the served mix.
const test = require("node:test");
const assert = require("node:assert/strict");
const { loadUnits } = require("../src/course.js");
const { Engine: E } = require("../src/engine.js");

const IX = E.indexCourse(loadUnits());
const rules = [...IX.items.values()].filter((it) => it.kind === "rule" && (it.quiz || []).some((q) => q.t === "tf"));

test("served true/false questions are roughly balanced (35-70% True)", () => {
  let yes = 0, n = 0;
  for (const it of rules) {
    it.quiz.forEach((q, i) => {
      if (q.t !== "tf") return;
      for (let seed = 1; seed <= 20; seed++) { const out = E.qQuiz(IX, it, E.rng(seed * 7919 + i), i); if (out && out.type === "tf") { n++; if (out.answer === true) yes++; } }
    });
  }
  const share = yes / n;
  assert.ok(n > 0, "no true/false questions found");
  assert.ok(share >= 0.35 && share <= 0.7, `True share ${(share * 100).toFixed(0)}% of ${n}`);
});

test("flash cards mix True and False", () => {
  let yes = 0, n = 0;
  for (const it of rules) for (let i = 0; i < 4; i++) { const c = E.swipeCard(it, i); if (c.sub === "True or false?") { n++; if (c.back === "True") yes++; } }
  assert.ok(yes / n >= 0.35 && yes / n <= 0.7, `True share ${((yes / n) * 100).toFixed(0)}% of ${n}`);
});

test("a true statement is only ever the card's own rule, never an unsure card", () => {
  for (const it of rules) for (let seed = 1; seed <= 10; seed++) {
    const out = E.qQuiz(IX, it, E.rng(seed), it.quiz.findIndex((q) => q.t === "tf"));
    if (out && out.answer === true && !it.quiz.some((q) => q.t === "tf" && q.a === true && q.q === out.prompt)) {
      assert.equal(out.prompt, it.say);
      assert.notEqual(it.status, "unsure");
    }
  }
});
