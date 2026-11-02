// Engine unit tests: streaks, spaced review, normaliser, unlocking, countdown, scoring, badges.
const test = require("node:test");
const assert = require("node:assert/strict");
const { loadUnits } = require("../src/course.js");
const { Engine: E } = require("../src/engine.js");

const IX = E.indexCourse(loadUnits({ example: true }));

test("weekends never break a streak", () => {
  const s = E.freshState();
  E.touchStreak(s, "2026-10-30"); // Fri
  E.touchStreak(s, "2026-11-02"); // Mon
  assert.equal(s.streak, 2);
  assert.equal(s.freezes, 1);
});

test("a missed weekday uses a freeze, two missed reset", () => {
  const s = E.freshState();
  E.touchStreak(s, "2026-11-02");
  const a = E.touchStreak(s, "2026-11-04");
  assert.equal(a.usedFreeze, 1);
  assert.equal(s.streak, 2);
  const b = E.touchStreak(s, "2026-11-07");
  assert.ok(b.reset);
  assert.equal(s.streak, 1);
});

test("same-day activity doesn't double count and a 7-day streak earns a freeze", () => {
  const s = E.freshState();
  E.touchStreak(s, "2026-11-02");
  E.touchStreak(s, "2026-11-02");
  assert.equal(s.streak, 1);
  for (let d = 1; d < 7; d++) E.touchStreak(s, E.addDays("2026-11-02", d));
  assert.equal(s.streak, 7);
  assert.equal(s.freezes, 2);
});

test("leitner boxes climb on time, drop on a miss, and reach the 60-day box", () => {
  const s = E.freshState();
  E.learn(s, "x", "2026-11-02");
  assert.equal(s.items.x.due, "2026-11-03");
  E.grade(s, "x", true, "2026-11-03");
  assert.equal(s.items.x.box, 2);
  assert.equal(s.items.x.due, "2026-11-06");
  E.grade(s, "x", true, "2026-11-04"); // early: no promotion
  assert.equal(s.items.x.box, 2);
  E.grade(s, "x", false, "2026-11-06");
  assert.equal(s.items.x.box, 1);
  let day = "2026-11-07";
  for (let i = 0; i < 6; i++) { day = s.items.x.due; E.grade(s, "x", true, day); }
  assert.equal(s.items.x.box, 6);
  assert.equal(E.daysBetween(day, s.items.x.due), 60);
});

test("swipe grades count half: a miss drops one box, not to box 1", () => {
  const s = E.freshState();
  E.learn(s, "w", "2026-11-01");
  s.items.w.box = 4;
  E.grade(s, "w", false, "2026-11-01", { weight: 0.5 });
  assert.equal(s.items.w.box, 3);
});

test("from May every due date is capped at exam minus 7 days", () => {
  const s = E.freshState();
  E.learn(s, "y", "2027-04-20");
  s.items.y.box = 5;
  E.grade(s, "y", true, "2027-05-02");
  assert.equal(s.items.y.due, "2027-05-26");
  E.grade(s, "y", true, "2027-05-28");
  assert.equal(s.items.y.due, "2027-05-29", "after the cap, review tomorrow");
  s.examDate = "2027-06-09";
  assert.equal(E.reviewCap(s), "2027-06-02");
});

test("notebook holds items missed twice, worst first", () => {
  const s = E.freshState();
  E.grade(s, "a", false, "2026-11-01"); E.grade(s, "a", false, "2026-11-01"); E.grade(s, "a", false, "2026-11-01");
  E.grade(s, "b", false, "2026-11-01"); E.grade(s, "b", false, "2026-11-01");
  E.grade(s, "c", false, "2026-11-01");
  assert.deepEqual(E.notebookItems(s), ["a", "b"]);
});

test("answer normaliser ignores case, macrons and punctuation but not u/v", () => {
  assert.ok(E.accepts(["dotium"], "Dōtium"));
  assert.ok(E.accepts(["conferto"], " conferto. "));
  assert.ok(E.accepts(["iis", "eis", "is"], "EIS"));
  assert.ok(!E.accepts(["venit"], "uenit"));
  assert.equal(E.norm("Hoc dictum, paulo post!"), "hoc dictum paulo post");
});

test("first lesson of every unit is open, the rest unlock in order, roundup last", () => {
  const s = E.freshState();
  const u = IX.course.units[0];
  assert.ok(E.isUnlocked(IX, s, u.lessons[0].id));
  assert.ok(!E.isUnlocked(IX, s, u.lessons[1].id));
  assert.ok(!E.isUnlocked(IX, s, `${u.id}-review`));
  s.done[u.lessons[0].id] = { perfect: true, at: "2026-11-01" };
  assert.ok(E.isUnlocked(IX, s, u.lessons[1].id));
  s.done[u.lessons[1].id] = { perfect: false, at: "2026-11-01" };
  assert.ok(E.isUnlocked(IX, s, `${u.id}-review`));
  assert.equal(E.nextNode(IX, s).id, `${u.id}-review`);
  assert.deepEqual(E.unitProgress(IX, s, u.id), { done: 2, total: 3 });
});

test("lessons are split into sittings by weight and every item is served once", () => {
  for (const l of IX.lessons) {
    const sittings = E.lessonSittings(IX, l.id);
    assert.deepEqual(sittings.flat(), l.items.map((i) => i.id));
    for (const sit of sittings) assert.ok(sit.length >= 1);
  }
});

test("countdown counts days to the exam and names the phase", () => {
  const s = E.freshState();
  const c = E.countdown(s, "2026-11-01");
  assert.equal(c.days, 213);
  assert.equal(c.phase.id, "foundations");
  assert.equal(c.label, "Τετάρτη 2 Ιουνίου");
  assert.equal(E.countdown(s, "2027-04-01").phase.id, "walls");
  assert.equal(E.countdown(s, "2027-05-20").phase.id, "via");
  assert.equal(E.countdown(s, "2027-06-03").phase.id, "after");
  s.examDate = "2027-06-09";
  assert.equal(E.countdown(s, "2027-06-02").days, 7);
});

test("daily drill maps weekdays to exam sections and records a daily streak", () => {
  const s = E.freshState();
  assert.equal(E.buildDaily(IX, s, "2026-11-02").section, "Γ1"); // Monday
  assert.equal(E.buildDaily(IX, s, "2026-11-05").section, "Δ2"); // Thursday
  assert.equal(E.buildDaily(IX, s, "2026-11-08").section, "mix"); // Sunday
  E.recordDaily(s, "2026-11-02", 10, 15, "Γ1");
  E.recordDaily(s, "2026-11-03", 12, 15, "Γ2");
  assert.equal(s.dailyStreak, 2);
  E.recordDaily(s, "2026-11-03", 13, 15, "Γ2"); // redo same day: no change
  assert.equal(s.dailyStreak, 2);
  E.recordDaily(s, "2026-11-09", 5, 15, "Γ1"); // Monday after a skipped week
  assert.equal(s.dailyStreak, 1);
});

test("section scoring adds marks per section", () => {
  const res = [{ q: { section: "Γ1", marks: 5 }, score: 1 }, { q: { section: "Γ1", marks: 5 }, score: 0 }, { q: { section: "Δ1", marks: 3 }, score: 0.5 }];
  assert.deepEqual(E.scoreSections(res), { "Γ1": [5, 10], "Δ1": [1.5, 3] });
});

test("badges are Roman and award once", () => {
  const s = E.freshState();
  s.done.x = { perfect: true, at: "2026-11-01" };
  const fresh = E.awardBadges(s, "2026-11-01", IX);
  assert.deepEqual(fresh.map((b) => b.id).sort(), ["sine_errore", "tiro"]);
  assert.deepEqual(E.awardBadges(s, "2026-11-02", IX), []);
  s.colosseumBest = 15;
  assert.deepEqual(E.awardBadges(s, "2026-11-02", IX).map((b) => b.id), ["triumphator"]);
  s.mocks.push({ at: "2026-11-02", score: 100, marks: 100 });
  assert.deepEqual(E.awardBadges(s, "2026-11-02", IX).map((b) => b.id), ["carpe20"]);
});

test("week xp only counts this week", () => {
  const s = E.freshState();
  E.addXp(s, "2026-10-30", 10);
  E.addXp(s, "2026-11-02", 15);
  assert.equal(E.weekXp(s, "2026-11-03"), 15);
  assert.equal(E.weekKey("2026-11-08"), "2026-11-02");
});

test("sentence find marks the right tokens despite macrons and punctuation", () => {
  const it = IX.items.get("u0-s35-dotem");
  const q = E.qFind(IX, it, E.rng(1));
  assert.deepEqual(q.answer.map((i) => q.words[i]), ["reliquerat"]);
});

test("clause steps carry 1+1+1+2 marks shape (five scored steps) and the right answers", () => {
  const it = IX.items.get("u0-c-cum-funderet");
  const q = E.qClauseSteps(IX, it, E.rng(2));
  assert.equal(q.steps[0].answer, it.kind_el);
  assert.equal(q.steps[4].answer, it.tense_el);
});

test("Β2 match has 5 pairs and 2 spare Greek words when the pool allows", () => {
  const q = E.qMatchSpare(IX, IX.byKind.hook, E.rng(4));
  assert.equal(q.pairs.length, 5);
  assert.equal(q.spare.length, 2);
  assert.equal(q.right.length, 7);
});

test("a headword taught in several units shares one progress id and is listed once", () => {
  const mk = (id, unit, lesson) => ({ id: unit, title: unit, exam: [], lessons: [{ id: lesson, title: lesson, items: [{ id, kind: "word", la: "gero", forms: "gero, gessi, gestum, gerĕre", el: "διεξάγω", pos: "verb", say: "x", src: "x", status: "book" }] }] });
  const IXd = E.indexCourse([mk("a-gero", "u1", "u1l1"), mk("b-gero", "u2", "u2l1")]);
  assert.equal(E.canon("b-gero"), "a-gero");
  assert.equal(IXd.isDup(IXd.items.get("b-gero")), true);
  assert.equal(IXd.isDup(IXd.items.get("a-gero")), false);
  const s = E.freshState();
  E.grade(s, "b-gero", true, "2026-11-02");
  assert.deepEqual(Object.keys(s.items), ["a-gero"]);
});

test("source labels never show our research file names to the student", () => {
  assert.equal(E.cleanSrc("Παν. 2024 Γ1· morphology.md §1.5"), "Παν. 2024 Γ1");
  assert.equal(E.cleanSrc("derivatives.md (el.wiktionary)"), "Βικιλεξικό");
  assert.equal(E.cleanSrc("syntax.md §3.5 (ctx δικό μας)"), "Carpe");
  for (const it of IX.items.values()) assert.ok(!/\.(md|jsonl?|txt)\b|§/.test(E.cleanSrc(it.src)), `${it.id}: ${E.cleanSrc(it.src)}`);
});

test("remaining sittings count every part still to play and shrink as parts and roundups are done", () => {
  const s = E.freshState();
  const total = E.remainingSittings(IX, s);
  const nodes = E.pathNodes(IX);
  const expected = nodes.reduce((a, n) => a + (n.kind === "roundup" ? 1 : E.lessonSittings(IX, n.id).length), 0);
  assert.equal(total, expected);
  const first = nodes.find((n) => n.kind === "lesson");
  s.sittings[first.id] = 1;
  assert.equal(E.remainingSittings(IX, s), total - 1);
  s.done[first.id] = { perfect: false, at: "2026-11-01" };
  assert.equal(E.remainingSittings(IX, s), total - E.lessonSittings(IX, first.id).length);
  const ru = nodes.find((n) => n.kind === "roundup");
  s.done[ru.id] = { perfect: true, at: "2026-11-01" };
  assert.equal(E.remainingSittings(IX, s), total - E.lessonSittings(IX, first.id).length - 1);
});

test("a lesson never re-teaches a headword already learned in an earlier unit, and the yes/no game is asked cold", () => {
  const dup = IX.byKind.word.find((w) => IX.isDup(w));
  if (dup) {
    const s = E.freshState();
    const sit = E.lessonSittings(IX, dup.lessonId).findIndex((ids) => ids.includes(dup.id));
    const before = E.buildLesson(IX, s, dup.lessonId, 3, sit);
    assert.ok(before.some((q) => q.type === "intro" && q.itemId === dup.id), "unlearned duplicate still gets its card");
    E.learn(s, dup.id, "2026-11-01");
    const after = E.buildLesson(IX, s, dup.lessonId, 3, sit);
    assert.ok(!after.some((q) => q.type === "intro" && q.itemId === dup.id), "learned duplicate gets no card");
    assert.ok(after.some((q) => q.itemId === dup.id && q.type === "mcq"), "but is still asked once");
  }
  const origin = IX.byKind.origin[0];
  const steps = E.buildLesson(IX, E.freshState(), origin.lessonId, 5, E.lessonSittings(IX, origin.lessonId).findIndex((ids) => ids.includes(origin.id)));
  assert.ok(!steps.some((q) => q.type === "intro" && q.itemId === origin.id), "origin items have no intro card");
  assert.ok(steps.some((q) => q.itemId === origin.id && q.type === "tf"), "origin items are asked as yes/no");
});
