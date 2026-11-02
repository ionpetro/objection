// Engine unit tests: streaks, spaced review, normalisers, unlocking, countdown, drills, mocks, ranks, badges.
const test = require("node:test");
const assert = require("node:assert/strict");
const { loadUnits } = require("../src/course.js");
const { Engine: E } = require("../src/engine.js");

const IX = E.indexCourse(loadUnits({ example: true }).filter((u) => u.id === "u0_example")); // fixture: the example unit only

test("weekends never break a streak", () => {
  const s = E.freshState();
  E.touchStreak(s, "2026-10-30"); // Fri
  E.touchStreak(s, "2026-11-02"); // Mon
  assert.equal(s.streak, 2);
  assert.equal(s.freezes, 1);
});

test("a missed weekday uses a continuance, two missed reset", () => {
  const s = E.freshState();
  E.touchStreak(s, "2026-11-02");
  const a = E.touchStreak(s, "2026-11-04");
  assert.equal(a.usedFreeze, 1);
  assert.equal(s.streak, 2);
  const b = E.touchStreak(s, "2026-11-07");
  assert.ok(b.reset);
  assert.equal(s.streak, 1);
});

test("same-day activity doesn't double count and a 7-day streak earns a continuance", () => {
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

test("a self-graded flash miss drops one box only", () => {
  const s = E.freshState();
  E.learn(s, "w", "2026-11-01");
  s.items.w.box = 4;
  E.grade(s, "w", false, "2026-11-01", { weight: 0.5 });
  assert.equal(s.items.w.box, 3);
});

test("no review is scheduled later than exam minus 3 days, and Closing argument pulls every card forward", () => {
  const s = E.freshState(); // exam 2027-07-28
  E.learn(s, "y", "2027-06-01");
  s.items.y.box = 5;
  E.grade(s, "y", true, "2027-07-01");
  assert.equal(s.items.y.due, "2027-07-25");
  E.grade(s, "y", true, "2027-07-26");
  assert.equal(s.items.y.due, "2027-07-27", "after the cap, review tomorrow");
  s.examDate = "2027-02-24";
  assert.equal(E.reviewCap(s), "2027-02-21");
  const t = E.freshState();
  E.learn(t, "a", "2027-07-01"); t.items.a.due = "2027-07-20";
  assert.deepEqual(E.dueItems(t, "2027-07-10"), [], "not due yet in Discovery");
  assert.deepEqual(E.dueItems(t, "2027-07-15"), ["a"], "Closing argument: every learned card is due");
});

test("the notebook holds items missed twice, worst first, and remembers the distractor type and the self-tag", () => {
  const s = E.freshState();
  E.grade(s, "a", false, "2026-11-01", { trap: 1 }); E.grade(s, "a", false, "2026-11-01", { trap: 1 }); E.grade(s, "a", false, "2026-11-01", { trap: 6 });
  E.grade(s, "b", false, "2026-11-01"); E.grade(s, "b", false, "2026-11-01");
  E.grade(s, "c", false, "2026-11-01");
  assert.deepEqual(E.notebookItems(s), ["a", "b"]);
  assert.deepEqual(s.items.a.traps, { 1: 2, 6: 1 });
  E.selfTag(s, "a", "misread");
  assert.equal(s.items.a.tag, "misread");
  assert.deepEqual(E.topTraps(s, "2026-11-03"), [["1", 2], ["6", 1]]);
  assert.deepEqual(E.topTraps(s, "2026-11-20"), [], "only the last seven days");
});

test("the English normaliser ignores case, punctuation and articles; the number normaliser reads dollars, days and words", () => {
  assert.ok(E.accepts(["the forum-defendant rule"], "Forum defendant rule."));
  assert.ok(E.accepts(["30 days"], "thirty days"));
  assert.ok(E.accepts(["30 days"], "30"));
  assert.ok(E.accepts(["$75,000"], "75000"));
  assert.ok(E.accepts(["$75,000"], "seventy-five thousand dollars"));
  assert.ok(E.accepts(["21 days"], "Twenty-one"));
  assert.ok(!E.accepts(["30 days"], "31 days"));
  assert.ok(!E.accepts(["$75,000"], "$75,001"));
  assert.equal(E.norm("An opposing party's statement, offered!"), "opposing partys statement offered");
  assert.ok(E.acceptsCite(["FRE 1006"], "1006"));
  assert.ok(E.acceptsCite(["FRE 1006"], "Rule 1006"));
  assert.ok(E.acceptsCite(["UCC 2-209(1)"], "2-209(1)"));
  assert.ok(E.acceptsCite(["28 U.S.C. §1441(b)(2)"], "1441(b)(2)"));
  assert.ok(!E.acceptsCite(["FRE 1006"], "1007"));
});

test("first lesson of every unit is open, the rest unlock in order, closing argument last", () => {
  const s = E.freshState();
  const u = IX.course.units[0];
  assert.ok(E.isUnlocked(IX, s, u.lessons[0].id));
  assert.ok(!E.isUnlocked(IX, s, u.lessons[1].id));
  assert.ok(!E.isUnlocked(IX, s, `${u.id}-review`));
  s.done[u.lessons[0].id] = { perfect: true, at: "2026-11-01" };
  assert.ok(E.isUnlocked(IX, s, u.lessons[1].id));
  s.done[u.lessons[1].id] = { perfect: false, at: "2026-11-01" };
  s.done[u.lessons[2].id] = { perfect: false, at: "2026-11-01" };
  assert.ok(E.isUnlocked(IX, s, `${u.id}-review`));
  assert.equal(E.nextNode(IX, s).id, `${u.id}-review`);
  assert.deepEqual(E.unitProgress(IX, s, u.id), { done: 3, total: 4 });
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
  const c = E.countdown(s, "2026-11-02");
  assert.equal(c.days, 268);
  assert.equal(c.phase.id, "foundations");
  assert.equal(c.label, "Wednesday, July 28, 2027");
  assert.match(c.note, /derived/);
  assert.equal(E.countdown(s, "2027-07-05").phase.id, "discovery");
  assert.equal(E.countdown(s, "2027-07-14").phase.id, "closing");
  assert.equal(E.countdown(s, "2027-07-29").phase.id, "after");
  s.examDate = "2027-02-24";
  assert.equal(E.countdown(s, "2027-02-17").days, 7);
  assert.equal(E.countdown(s, "2027-02-17").label, "Wednesday, February 24, 2027");
  assert.ok(E.EXAM_PRESETS.some((p) => p.date === "2027-02-24"));
});

test("the Question of the Day rotates subjects by weekday, is date-seeded, and records a daily streak", () => {
  assert.equal(E.DAILY_BY_WEEKDAY[E.weekday("2026-11-02")], "civpro"); // Monday
  assert.equal(E.DAILY_BY_WEEKDAY[E.weekday("2026-11-08")], "torts"); // Sunday
  const s = E.freshState();
  const d = E.buildDaily(IX, s, "2026-11-02");
  assert.ok(d.steps.length >= 1 && d.steps.length <= 5);
  assert.ok(d.title);
  E.recordDaily(s, "2026-11-02", 4, 5, "civpro", d.ids, 400000);
  E.recordDaily(s, "2026-11-03", 5, 5, "conlaw");
  assert.equal(s.dailyStreak, 2);
  E.recordDaily(s, "2026-11-03", 3, 5, "conlaw"); // redo same day: no change
  assert.equal(s.dailyStreak, 2);
  E.recordDaily(s, "2026-11-09", 2, 5, "civpro"); // Monday after a skipped week
  assert.equal(s.dailyStreak, 1);
});

test("a mock apportions questions across subjects with a seeded rotation and NCBE's category fractions", () => {
  assert.deepEqual(E.apportion(25, [1 / 7, 1 / 7, 1 / 7, 1 / 7, 1 / 7, 1 / 7, 1 / 7]).sort(), [3, 3, 3, 4, 4, 4, 4]);
  assert.deepEqual(E.apportion(5, [2 / 3, 1 / 3]), [3, 2]);
  assert.deepEqual(E.apportion(5, [1 / 4, 1 / 3, 1 / 4, 1 / 6]), [1, 2, 1, 1]);
  // a synthetic seven-subject course: 25 draws give 4-4-4-4-3-3-3 and the extra question rotates with the seed
  const mk = (sub, i) => ({ id: `u${i}`, title: sub, blurb: "x", subject: sub, assume: "x", exam: ["mbe"], lessons: [{ id: `u${i}l1`, title: "x", items: [...Array(8)].map((_, k) => ({ id: `u${i}-h${k}`, kind: "hypo", cat: ["I", "II", "III", "IV", "V", "VI", "VII"][k % 7], callType: "prevail", rule: "u0-r-x", issue: `issue ${k}`, stem: "s", call: "c?", options: [{ text: "a", why: "w" }, { text: "b", why: "w", trap: 1 }, { text: "c", why: "w", trap: 2 }, { text: "d", why: "w", trap: 3 }], answer: 0, say: "s", status: "general", src: "x" })) }] });
  const ix = E.indexCourse(E.SUBJECT_IDS.map(mk));
  const seen = new Set();
  for (let seed = 1; seed <= 20; seed++) {
    const m = E.buildMock(ix, E.freshState(), seed, 25);
    assert.equal(m.steps.length, 25);
    assert.equal(m.minutes, 45);
    const counts = {};
    for (const q of m.steps) counts[q.subject] = (counts[q.subject] || 0) + 1;
    assert.deepEqual(Object.values(counts).sort(), [3, 3, 3, 4, 4, 4, 4]);
    seen.add(Object.entries(counts).filter(([, c]) => c === 4).map(([k]) => k).sort().join(","));
  }
  assert.ok(seen.size > 1, "the seed decides which subjects get the extra question");
  const sub = E.buildSubjectSet(ix, E.freshState(), "evidence", 4, 8);
  assert.equal(sub.steps.length, 8);
  assert.equal(sub.minutes, 14);
});

test("subject scoring and the trap tally", () => {
  const res = [{ q: { subject: "torts", marks: 1 }, score: 1 }, { q: { subject: "torts", marks: 1 }, score: 0, trap: 6 }, { q: { subject: "evidence", marks: 1 }, score: 0, trap: 6 }, { q: { subject: "evidence", marks: 1 }, score: 0, trap: 4 }];
  assert.deepEqual(E.scoreSubjects(res), { torts: [1, 2], evidence: [0, 2] });
  assert.deepEqual(E.trapTally(res), { 6: 2, 4: 1 });
});

test("ranks climb with billable minutes", () => {
  const s = E.freshState();
  assert.equal(E.rankOf(s).rank.name, "1L");
  s.xp = 120;
  assert.equal(E.rankOf(s).rank.name, "2L");
  assert.equal(E.rankOf(s).next.name, "3L");
  s.xp = 9999;
  assert.equal(E.rankOf(s).rank.name, "Justice");
  assert.equal(E.rankOf(s).next, null);
  assert.equal(E.fmtMinutes(260), "4h 20m");
});

test("badges award once", () => {
  const s = E.freshState();
  s.done.x = { perfect: true, at: "2026-11-01" };
  assert.deepEqual(E.awardBadges(s, "2026-11-01", IX).map((b) => b.id), ["first_objection"]);
  assert.deepEqual(E.awardBadges(s, "2026-11-02", IX), []);
  s.crossExamBest = 15;
  assert.deepEqual(E.awardBadges(s, "2026-11-02", IX).map((b) => b.id), ["cross_examiner"]);
  s.mocks.push({ at: "2026-11-02", size: 25, score: 25, total: 25 });
  assert.deepEqual(E.awardBadges(s, "2026-11-02", IX).map((b) => b.id).sort(), ["moot_court", "sine_errore"]);
  s.done["u0_example-review"] = { perfect: true, at: "2026-11-02" };
  assert.deepEqual(E.awardBadges(s, "2026-11-02", IX).map((b) => b.id).sort(), ["closing_argument", "juris_doctor"]);
});

test("week xp only counts this week", () => {
  const s = E.freshState();
  E.addXp(s, "2026-10-30", 10);
  E.addXp(s, "2026-11-02", 15);
  assert.equal(E.weekXp(s, "2026-11-03"), 15);
  assert.equal(E.weekKey("2026-11-08"), "2026-11-02");
});

test("find marks the deciding facts in the stem despite punctuation", () => {
  const it = IX.items.get("u0-h-forum-defendant");
  const q = E.qFind(IX, it);
  assert.deepEqual(q.answer.map((i) => q.words[i]).join(" "), "State C state court principal place of business in State C.", "tokens come back in stem order");
  assert.equal(q.groups.length, it.facts.length, "one tap group per deciding fact");
  assert.deepEqual(q.groups.flat().slice().sort((a, b) => a - b), q.answer, "the groups cover exactly the answer tokens");
  assert.ok(!q.explain.includes(it.facts[0]), "the explanation does not repeat the facts the answer line already shows");
});

test("the grid question splits the options into two verdicts and keeps the key", () => {
  const it = IX.items.get("u0-h-habit");
  const q = E.qGrid(IX, it, E.rng(2));
  assert.deepEqual(q.verdicts.slice().sort(), ["No", "Yes"]);
  assert.equal(q.verdictAnswer, "Yes");
  assert.equal(q.options.filter((o) => E.verdictOf(o.text) === "Yes").length, 2);
});

test("hypo review prefers an unseen sibling with the same rule", () => {
  const s = E.freshState();
  const seen = IX.items.get("u0-h-forum-defendant");
  const sib = { ...seen, id: "u0-h-forum-defendant-2" };
  const ix = { ...IX, siblings: () => [seen, sib], items: new Map([...IX.items, [sib.id, sib]]) };
  E.learn(s, seen.id, "2026-11-01");
  const q = E.qReview(ix, seen, E.rng(1), s);
  assert.equal(q.itemId, sib.id);
  assert.equal(q.label, E.L.transfer);
});

test("the cite question accepts the bare number and offers options as a fallback", () => {
  const it = IX.items.get("u0-r-habit");
  const q = E.qCite(IX, it, E.rng(1));
  assert.equal(q.type, "type");
  assert.ok(E.acceptsCite(q.answer, "406"));
  assert.ok(q.fallbackOptions.includes("FRE 406"));
  assert.equal(E.qCite(IX, IX.items.get("u0-r-miranda"), E.rng(1)), null, "a case-name cite is not a number question");
});

test("source labels never show our research file names to the learner", () => {
  assert.equal(E.cleanSrc("28 U.S.C. §1441(b)(2); civpro.md §5.1"), "28 U.S.C. §1441(b)(2)");
  assert.equal(E.cleanSrc("FRE 406; evidence.md §3 [READ]"), "FRE 406");
  assert.equal(E.cleanSrc("torts.md §1"), "Objection");
  for (const it of IX.items.values()) assert.ok(!/\.(md|jsonl?|txt)\b/.test(E.cleanSrc(it.src)), `${it.id}: ${E.cleanSrc(it.src)}`);
});

test("remaining sittings count every part still to play and shrink as parts and closing arguments are done", () => {
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

test("the focus subject steers the next node", () => {
  const mk = (sub, i) => ({ id: `u${i}`, title: sub, blurb: "x", subject: sub, assume: "x", exam: ["mbe"], lessons: [{ id: `u${i}l1`, title: "x", items: [{ id: `u${i}-t`, kind: "term", term: `t${i}`, lang: "latin", meaning: `m${i}`, say: "s", status: "general", src: "x" }] }] });
  const ix = E.indexCourse([mk("civpro", 1), mk("evidence", 2)]);
  const s = E.freshState();
  assert.equal(E.nextNode(ix, s).unitId, "u1");
  s.focus = "evidence";
  assert.equal(E.nextNode(ix, s).unitId, "u2");
});
