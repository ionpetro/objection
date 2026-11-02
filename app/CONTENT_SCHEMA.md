# Objection content schema (authoritative)

This is the contract between content writers and the engine. One file per unit in `app/src/units/<id>.js`.
The complete worked example is [`src/units/u0_example.js`](src/units/u0_example.js): one item of every kind, every rule checked against the primary text named in its `src`. Copy its shape.

Check your unit with `npm test` (runs the validator in `app/tools/validate.js` plus the engine on your items across 40 seeds) or `node app/tools/validate.js app/src/units/u9.js` for a readable report. Zero errors before you hand a unit in; read every warning.

## 1. The unit file

```js
(function () {
  const unit = {
    id: "u9",                                    // u1 … u14 (u0_example is the fixture)
    title: "Evidence (FRE)",
    blurb: "Hearsay is a quarter of the subject. Relevancy is a third.",   // one line under the title in the courthouse
    subject: "evidence",                         // civpro conlaw contracts crim evidence property torts · skills terms traps
    assume: "Federal Rules of Evidence as currently in effect (amended Dec 1, 2024; 801(d)(1)(A) changes Dec 1, 2026).",  // required on subject units: shown as the unit's first card, because the exam states it
    exam: ["mbe", "nextgen"],                    // which exams test this unit; ["mbe"] when the topic is not in the NextGen scope
    dep: ["u1"],                                 // optional: other units whose rule cards your hypos may reference
    lessons: [
      { id: "u9l1", title: "Is it hearsay?", items: [ /* items */ ] },   // lesson ids are <unit>l<n>, numbered from 1
    ],
  };
  if (typeof OBJECTION_UNITS !== "undefined") OBJECTION_UNITS.push(unit);   // browser build
  if (typeof module !== "undefined") module.exports = unit;                 // tests and site build
})();
```

Rules: plain JS object literal, no imports, no helper functions that generate items (the validator must see the literal data). Lessons are served in sittings of ~12 graded steps automatically (a `hypo` weighs 2, a `rule` weighs 1 + its quiz), so a lesson of 6-8 items with rule cards runs in two sittings. The first sitting of lesson 1 opens with the unit's `assume` card.

## 2. Fields every item has

| field | required | what |
|---|---|---|
| `id` | yes | unique across the whole course, prefixed with the unit id and a dash: `u9-803-6-outsider`, `u2-h-forum-defendant` |
| `kind` | yes | one of the 10 kinds below |
| `say` | yes | the teach-it-in-one-breath line, ≤ 160 characters, plain English, no abbreviations the exam does not use. Shown as "In one breath" on cards and in the feedback |
| `status` | yes | provenance, see below |
| `src` | yes | where you checked it: `"FRE 803(6)"`, `"28 U.S.C. §1441(b)(2); §1447(c)"`, `"Crawford v. Washington, 541 U.S. 36 (2004)"`, `"NCBE MBE Subject Matter Outline, Torts note"`. You may add our research file after a semicolon (`"; evidence.md §6"`): the learner never sees file names |
| `cat` | optional (recommended on every subject item) | NCBE outline category code: `"V.D"`, `"I.A"`, `"II"`. The roman numeral drives the Question of the Day and mock fractions (`Engine.CATEGORY_MIX`). On a `trap` the field means the distractor type instead (see `trap`) |
| `exam` | optional | `["mbe"]` when the topic is not in the NextGen scope; otherwise inherited from the unit |
| `recent` | optional | `true` on law decided after mid-2024: shown with the badge "New in 2025/26: probably not scored on your 2027 MBE"; never the only route to a skill |
| `lawVersion` | optional | `"fre-2026-12-01"` on anything whose answer changes with an amendment taking effect before the exam; the feedback shows the version note |
| `assume` | optional | the stem-stated rule the item depends on: `"race-notice statute"`, `"common law"`, `"MPC"`, `"lien theory"`. Shown above the stem |
| `hook` | optional | one memory line (story, mnemonic, etymology) from `research/hooks.jsonl`, reworded. Shown in Amicus's speech box |
| `transfer` | `hypo`/`argue` only | `true` means: never introduced, asked cold in the practice phase as "New facts, same rule". Put it in the lesson that teaches the rule it needs |
| `subject` | optional | overrides the unit's subject on a card (cross-subject units u13/u14 use it on cases, terms and traps) |

**`status` (provenance), what the learner sees in brackets:**
- `book` [primary text]: the rule was read in the primary text this project trusts: FRE, FRCP, Title 28, UCC Arts 1-2, the Constitution, a Restatement section, a Supreme Court opinion or syllabus, a federal statute on LII. `src` names it.
- `exam` [NCBE says so]: NCBE itself states it (an outline note or assumption, the outline heading, NCBE's own MEE analysis). `src` must contain "NCBE". **Never a copied NCBE question.**
- `general` [black letter]: standard doctrine from reliable secondary sources or legal knowledge, not re-read in primary text ([K], [M], [R], [SEC], [MEMORY] in the research files). Case holdings known from summaries go here.
- `unsure` [under review]: anything the research flags [?], [U], [UNSURE], VERIFY, or a real jurisdictional split the stem does not resolve. The Question of the Day and the mocks never draw `unsure` items. List every `unsure` in the unit's header comment with what a reviewer must check.

Every string the learner reads is English. The validator rejects Greek letters anywhere and flags capitalised words in a stem that look like proper names (the exam says "a man", "the retailer", "State A").

## 3. The 10 item kinds

### `rule` (every subject unit): the card, and four games
```js
{ id: "u9-r-406", kind: "rule", title: "Habit and routine practice (FRE 406)", cat: "II.C",
  say: "Habit is a specific, regular response to a particular situation and proves conformity; character is a general disposition and, in a civil case, does not.",
  elements: ["Specific conduct, not a general disposition", "Repeated regularly in response to a particular situation", "Offered to prove the person acted the same way on this occasion"],   // 2-7 short strings: the build-from-tiles game
  ordered: false,                                  // default true: tiles must be placed in order. false = any order (a set)
  distractorElements: ["Corroborated by an eyewitness"],   // optional wrong tiles; otherwise the engine borrows elements of other rules in the unit
  exceptions: ["No corroboration and no eyewitness are required", "An organization's routine practice counts the same way"],   // optional list
  split: { commonLaw: "…", ucc: "…" },             // optional, 2+ one-line positions keyed by majority minority mpc ucc commonLaw traditional restatement federal modern: the "Majority or minority?" sorting game
  splitNote: "The stem tells you which body of law governs by telling you what is sold.",   // optional: what the stem must say for the non-default to apply; shown after the stance game
  cite: "FRE 406",                                 // the rule number, statute or case the exam expects (pattern below). Numeric cites feed the typed "Which rule?" game and Cross-Examination; a case name is shown only
  citeAsk: "Which rule admits evidence of habit and routine practice?",   // optional prompt for the cite game (default: "Which rule or section: <title>?")
  numbers: [{ label: "Rule 11 safe harbor", value: "21 days" }],   // optional tested numbers shown on the card (make a `num` item too if it should be drilled)
  ex: [{ facts: "A driver stopped at the same sign on all 40 observed trips.", result: "Habit: admissible to prove he stopped that day." }],   // 1-3 one-line applications
  terms: ["habit", "routine practice"],            // optional vocabulary the card introduces (pills)
  quiz: [                                          // 2-5 inline checks, asked right after the card; `tf` rows also feed the flash review and Cross-Examination
    { t: "tf", q: "Under FRE 406, habit evidence is admissible only if corroborated.", a: false, why: "The rule says the court may admit it regardless." },
    { t: "mcq", q: "…", options: ["…", "…", "…"], a: "…", why: "…" },             // 3+ options, a must be one of them
    { t: "bucket", q: "Habit or character?", buckets: ["Habit", "Character"], items: [{ text: "Always fastens the seat belt", bucket: "Habit" }, { text: "Is a cautious driver", bucket: "Character" }, { text: "…", bucket: "Habit" }] },   // 2-4 buckets, 3+ items
  ],
  status: "book", src: "FRE 406; FRE 404(a)(1)" }
```
`cite` must start with `FRE`, `FRCP`, `FRAP`, `UCC`, `28 U.S.C.`, `18 U.S.C.`, `42 U.S.C.`, `U.S. Const.`, `Rest.`, `MPC`, `NCBE`, or be a case name `X v. Y`. A rule with no quiz, fewer than 2 elements, no split and no numeric cite is not quizzable; the validator insists on 2-5 quiz items anyway.

Questions generated: intro card → inline quiz; build the elements (ordered or set); Majority or minority? (from `split`); Which rule? (typed, "show me options" fallback; 3-option mcq in Cross-Examination); flash cards from the `tf` rows.

### `hypo` (every subject unit, u14): the MBE item
```js
{ id: "u9-h-habit-van", kind: "hypo", cat: "II.C", callType: "admissible", rule: "u9-r-406", issue: "habit versus character", grid: true,
  stem: "A pedestrian sued a delivery company for injuries suffered when one of its vans struck her in a crosswalk. … The pedestrian objects.",   // 40-220 words, no proper names ("a man", "the retailer", "State A"), one jurisdiction sentence when the rule is split
  short: "…",                                      // optional 1-3 sentence version of the stem for the "Spot the issue" opener
  call: "Is the supervisor's testimony admissible?",   // the lead-in, phrased as the exam phrases it
  options: [                                       // exactly 4, distinct texts; the key has why and NO trap; each distractor has why and trap 1-11
    { text: "No, because the supervisor did not witness the collision.", why: "FRE 406 says habit evidence may be admitted whether or not it is corroborated or there was an eyewitness.", trap: 5 },
    { text: "Yes, because evidence of a person's habit is admissible to prove that the person acted in accordance with it on a particular occasion.", why: "Forty observed stops at the same sign over six years is a specific, regular response: habit under FRE 406." },
    { text: "Yes, because a civil defendant may offer evidence of its employee's good character for carefulness.", why: "FRE 404(a)(1) bars character evidence to prove conduct in conformity, and the 404(a)(2) exception is criminal only.", trap: 5 },
    { text: "No, because evidence of prior conduct is never admissible to prove conduct on a particular occasion.", why: "Prior conduct that amounts to a habit is admissible for exactly that purpose.", trap: 7 },
  ],
  answer: 1,                                       // index of the key; the engine shuffles
  facts: ["every workday for six years", "came to a complete stop at that sign"],   // optional 1-3 phrases copied word for word from the stem: the tap-the-deciding-facts game
  findAsk: "…",                                    // optional prompt for that game
  assume: "…",                                     // optional stem-stated rule shown above the stem
  say: "Forty stops at one sign over six years is habit, not character; no eyewitness needed.",
  status: "book", src: "FRE 406; FRE 404(a)" }
```
- `callType`: one of the 14 lead-in families: `prevail admissible constitutional jurisdiction motion crime reverse status title accurate instruct argument remedy liable`.
- `issue`: the doctrine in ≤ 6 words; the guess-first opener shows the stem with four issues from the unit.
- `rule`: id of a `rule` card in this unit (or in a unit listed in `dep`). Review prefers an unseen sibling hypo with the same `rule`, so write 2-4 hypos per rule with different facts.
- `grid: true` only when the options form the Yes/No × because 2×2: two verdict words (the text before the first comma: Yes/No, Admissible/Inadmissible, Grant/Deny…), two options each. The engine then sometimes asks the verdict first and the reason second.
- `why` on the key is the explanation the learner reads after answering (≤ 240 chars); `why` on a distractor states the reason it fails. **Do not restate the trap label in `why`**: the feedback prints "Assumed fact." in front of it already.
- The eleven distractor types (`trap`): 1 right result, wrong reason · 2 right rule, missing element · 3 assumed fact · 4 wrong body of law or wrong standard · 5 misstated rule · 6 true, but does not answer the call · 7 absolute words · 8 sympathetic facts · 9 near-twin (less complete rule) · 10 impressive doctrine, wrong fit · 11 stale rule. The chosen distractor's type is logged automatically ("your top trap this week").

Questions generated: Spot the issue (guess opener), the item itself (110-second pace bar shown, never enforced in lessons), Verdict then reason (`grid`), tap the deciding facts (`facts`), a wrong option shown as a classmate's pick (spot the trap). Hypos never get an intro card: the feedback teaches.

### `argue` (1-2 per lesson, u1): the practice-oriented lead-in
```js
{ id: "u8-a-traffic-stop", kind: "argue", cat: "V.B", rule: "u8-r-miranda", issue: "custody for Miranda purposes",
  stem: "…", call: "What is the prosecutor's best response to the motion?",
  options: [ { text: "…", why: "…" }, { text: "…", why: "…" }, { text: "…", why: "…" }, { text: "…", why: "…" } ],   // 4; `trap` optional on the wrong ones
  answer: 0, say: "…", status: "general", src: "…" }
```
Lead-ins: best argument, best objection, best response, best option. The key is the argument the rule supports on these facts.

### `steps` (u3, u5, u6, u8, u9, u11): a decision tree in order
```js
{ id: "u9-st-hearsay", kind: "steps", cat: "V", title: "The hearsay analysis, in order",
  steps: ["Is it a statement?", "Was it made out of court?", "Is it offered for its truth?", "Is it exempt under FRE 801(d)?", "Does an exception in 803, 804 or 807 apply?", "Criminal case: is it testimonial (Confrontation Clause)?"],   // 3-6
  distractors: ["Is the declarant credible?", "Did the judge give a limiting instruction?"],   // 2-4 wrong or out-of-order steps
  applyTo: { facts: "A bystander's shout is offered to show why the driver swerved.", stop: "Is it offered for its truth?", why: "Effect on the listener: not hearsay at all." },   // optional: the "where does the analysis stop?" mcq; stop must be one of the steps
  say: "…", status: "book", src: "FRE 801-807" }
```

### `pairs` (all units, u13 heavily): a match set
```js
{ id: "u13-p-overruled", kind: "pairs", set: "Overruled and overruling", mode: "overruled",   // mode: case-holding rule-number number term concept overruled
  pairs: [{ l: "Lemon v. Kurtzman", r: "Kennedy v. Bremerton" }, { l: "Ohio v. Roberts", r: "Crawford v. Washington" }, /* 3-8 pairs, 5+ preferred */],
  spare: ["Vega v. Tekoh"],                       // optional 0-2 extra right-hand tiles (the exam's 5 + 2 shape)
  say: "…", status: "general", src: "…" }
```
Each draw shows up to 5 pairs; sets with more rotate. Rows also serve Cross-Examination as 3-option questions.

### `sort` (all units): yes/no or 2-4 bucket sorting
```js
{ id: "u9-so-hearsay", kind: "sort", cat: "V.A", mode: "hearsay", q: "Hearsay, or not?",   // mode: yesno category split scrutiny hearsay
  buckets: ["Hearsay", "Not hearsay"],            // 2-4
  items: [{ text: "…", bucket: "Hearsay", why: "…" }, /* 4-12, 6+ preferred, every bucket used */],
  say: "…", status: "book", src: "FRE 801(a)-(d)" }
```
A wrong sort shows the row's `why` for a moment. Two-bucket rows become true/false witnesses in Cross-Examination.

### `num` (u2, u3, u6, u9, u11, u13): a tested number or deadline
```js
{ id: "u2-n-removal", kind: "num", cat: "I.A", ask: "Days to file a notice of removal after service of the initial pleading", answer: "30 days", alt: ["30", "thirty days"], say: "…", status: "book", src: "28 U.S.C. §1446(b)(1)" }
```
`answer` must contain a number. The typed game accepts `answer`, every `alt`, and anything the number normaliser equates (`$75,000` = `75000` = `seventy-five thousand dollars`; `21 days` = `21` = `twenty-one`). Served as typed answer, 3-option mcq, flash card, match, Cross-Examination.

### `case` (u4, u5, u8, u9, u12, u13): a case with a one-line holding
```js
{ id: "u9-c-crawford", kind: "case", subject: "evidence", name: "Crawford v. Washington", year: 2004,
  holding: "Testimonial hearsay is inadmissible against a criminal defendant unless the declarant is unavailable and the defendant had a prior opportunity to cross-examine.",   // one line, ≤ 220 chars, the rule
  facts: "A wife's recorded police statement about a stabbing was used against her husband.",   // optional story hook
  overrules: "Ohio v. Roberts (1980)", overruledBy: "…", recent: false,   // optional
  say: "…", status: "general", src: "Crawford v. Washington, 541 U.S. 36 (2004)" }
```
Questions: holding mcq (also as a guess opener), which-case mcq, match, flash card. The MBE tests rules, not names: names belong in explanations, not stems.

### `term` (u13, 1-2 per subject unit): Latin, law French, terms of art
```js
{ id: "u13-t-nolo", kind: "term", subject: "evidence", term: "nolo contendere", lang: "latin",   // lang: latin french english
  literal: "I do not wish to contend", meaning: "A plea that accepts conviction without admitting guilt.",
  use: "FRE 410: a nolo contendere plea is not admissible against the defendant who made it.",   // the exam context, so the vocabulary is always a rule
  hook: "…", pairWith: "guilty plea",             // optional contrast term
  say: "…", status: "book", src: "FRE 410(a)(2)" }
```
Questions: meaning mcq (also as a guess opener), reverse mcq, match, flash card, Cross-Examination.

### `trap` (u14, 1-2 per subject unit): spot the trap
```js
{ id: "u14-tr-lemon", kind: "trap", cat: "11", subject: "conlaw",   // cat: distractor type 1-11, or a miss tag misread unknown misapplied nuance addedFact sympathy
  stem: "A public school district allows a coach to pray quietly at midfield after games. A parent sues under the Establishment Clause.",   // short facts (or a one-line reference to a hypo)
  wrong: "Apply the Lemon test: secular purpose, primary effect, no excessive entanglement.",
  right: "Judge the practice by reference to historical practices and understandings (Kennedy v. Bremerton, 2022).",
  why: "An answer key written before 2022 would reach for Lemon. The Court abandoned it.",
  say: "…", status: "general", src: "Kennedy v. Bremerton School District (2022)" }
```
Questions: a classmate's answer, key or distractor? then the fix among 4; name the distractor type (for `cat` 1-11). Items missed twice land in the Overruled notebook automatically.

## 4. How the engine turns items into a lesson

1. **Assume card** on the first sitting of lesson 1 (the unit's controlling law).
2. **Spot the issue**: the first hypo (or term/case/number) is asked cold, no penalty.
3. For each item in order: `rule` → card → its inline quiz · `case`/`term`/`num`/`steps`/`trap` → card → quick check · `hypo`/`argue`/`pairs`/`sort` → asked directly (no card). `transfer` items skip to practice.
4. **Practice**, shuffled: build the elements, Majority or minority?, Which rule?, tap the deciding facts, spot the trap, typed numbers, reverse terms; transfer hypos always included.
5. **Match** when the sitting holds ≥ 3 terms/cases/numbers.
6. **1-2 older due cards** interleaved. Missed questions return at the end ("Overruled: try again").

Question types the UI renders: `intro mcq tf hypo grid build match bucket find spot type swipe`. Spaced review: boxes 1/3/7/14/30/60 days; a miss → box 1; a flash-card miss → one box down; no review later than exam − 3 days; in the last 14 days every card is due. Hypo review prefers an unseen sibling with the same `rule`. Cross-Examination pools: `num`, numeric `cite`, `sort` rows, `pairs` rows, `term`, `case`, `rule` tf quiz. Question of the Day: Mon Civ Pro, Tue Con Law, Wed Contracts, Thu Crim, Fri Evidence, Sat Property, Sun Torts; 5 hypos/argues drawn by NCBE's category fractions from units the learner started (else the subject's first lessons), never `unsure`, no repeat within 14 days. Mini-MBE: 25 in 45 minutes (4-4-4-4-3-3-3 across subjects, seeded rotation), Session 100 in 3 hours, answers hidden until submission.

## 5. Rules for writers

1. **Never invent a rule, element, number, holding or majority position.** Sources in order of authority: the primary text (LII: FRE, FRCP, Title 28, UCC; supremecourt.gov / LII opinions and syllabi; Restatement sections where quoted in the research), then NCBE's own documents, then the research files' [V]/[READ]/[P] claims, then their [K]/[M]/[R]/[SEC] claims (`status: "general"`), then anything flagged [?]/[U]/[UNSURE]/VERIFY (`status: "unsure"`).
2. **State the rule set in the stem whenever it is split**, because the MBE does ("The jurisdiction defines crimes as at common law", "has a race-notice recording statute", "applies contributory negligence"). Never an item whose answer depends on an unstated minority rule. Silence means the default (joint and several liability and pure comparative fault in Torts; FRE; FRCP + Title 28; the federal Constitution; UCC Articles 1-2 for goods; common law + majority rule in Crim and Property).
3. **UCC or common law first.** Every Contracts hypo says what is sold (goods → Article 2) or done (services, land, employment → common law) in its first sentence; about a quarter of Contracts hypos are UCC.
4. **No statistics** in `say`/`why` beyond NCBE's own fractions in NCBE's words ("NCBE says about half of the Torts questions are on negligence"). Never "this is tested every year".
5. **No NCBE question text, no commercial-outline text.** Fact patterns are our own; the drafts in the research files are starting points to be rewritten with fresh facts and checked. The validator warns on proper names in stems.
6. **Stems the way the exam writes them:** no names, "State A / State B", 40-220 words, one call sentence ending in "?", four parallel options of 10-25 words, ≥ 60% in the "Yes/No, because" shape, "because / unless / if" as the hinge, the minimum facts that make the key right and the three distractors plausible. Each distractor is wrong for a stateable reason that `why` states and `trap` classifies. Set `answer` and let the engine shuffle.
7. **Recent law:** anything decided after mid-2024 is `recent: true`, shipped as an extension card, never the only path to a skill. Old rules an option could cite (Lemon, Humphrey's Executor, pre-Gant car searches, Roe) appear only as `trap` type 11.
8. **Currency flags:** `lawVersion: "fre-2026-12-01"` on any item whose answer or reason turns on FRE 801(d)(1)(A); write the key so its reason holds under both texts where possible.
9. Keep `say` ≤ 160 characters, warm and dry, never childish. Mascot lines never joke about failing.
10. Distractors must be plausible and wrong: neighbouring rules, the other body of law, the stale rule, the true-but-irrelevant statement. The validator rejects duplicate options, a key with a trap, a distractor without one, and a `facts` phrase that is not in the stem word for word.
11. Run `npm test` before handing the unit in. Zero errors; look at the warnings; every `unsure` is listed in the unit's header comment with what a reviewer must check.
