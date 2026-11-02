# Carpe content schema (authoritative)

This is the contract between content writers and the engine. One file per unit in `app/src/units/<id>.js`.
The complete worked example is [`src/units/u0_example.js`](src/units/u0_example.js): one item of every kind, every fact checked. Copy its shape.

Check your unit with `npm test` (runs the validator in `app/tools/validate.js` plus the engine on your items across 40 seeds) or `node app/tools/validate.js app/src/units/u3.js` for a readable report.

## 1. The unit file

```js
(function () {
  const unit = {
    id: "u3",                                  // u1 … u13 (u0_example is the fixture)
    title: "Ονόματα: κλίσεις, γενική πληθυντικού, κλητική, τα παράξενα",
    blurb: "Η γενική πληθυντικού κρίνει το Θέμα Γ1.",   // one line under the title on the Via Appia
    exam: ["Γ1"],                              // sections this unit feeds: Α1 Β1 Β2 Γ1 Γ2 Δ1 Δ2 (daily drill and mock draw from these)
    lessons: [
      { id: "u3l1", title: "Διάβασε την εκφώνηση", items: [ /* items */ ] },   // lesson ids are <unit>l<n>, numbered from 1
    ],
  };
  if (typeof CARPE_UNITS !== "undefined") CARPE_UNITS.push(unit);   // browser build
  if (typeof module !== "undefined") module.exports = unit;          // tests and site build
})();
```

Rules: plain JS object literal, no imports, no helper functions that generate items (the validator must see the literal data). Lessons are served in «sittings» of ~12 graded steps automatically, so a vocabulary lesson may hold 25-35 items.

## 2. Fields every item has

| field | required | what |
|---|---|---|
| `id` | yes | unique across the whole course, prefixed with the unit id and a dash: `u3-dos-genpl`, `u2-s24-nasica` |
| `kind` | yes | one of the 11 kinds below |
| `say` | yes | one-breath Greek teaching line, ≤ 160 characters, shown at the bottom of the card («Σε μια ανάσα») |
| `status` | yes | `"book"` checked in the school textbook / Τζάρτζανος · `"exam"` taken from a real paper or key · `"general"` standard Latin not in the school books (constructed examples) · `"unsure"` flag for a human reviewer (shows as «προς έλεγχο») |
| `src` | yes | free text: where you checked it (`"XXIV λεξιλόγιο"`, `"Παν. 2026 Γ1"`, `"Τζάρτζανος §26"`) |
| `exam` | optional (required on `sentence`) | list of years the item appeared in a paper, e.g. `[2026]`; shown as «Παν. 2026». Only from `research/pastpapers.md`, `morphology-past-items.json`, `passages-by-paper.json` |
| `lesson` / `lessons` | optional | textbook lesson(s) 16-50 the item belongs to; `lessons` on words drives the daily swipe set («στο σχολείο είμαστε στο μάθημα N») |
| `transfer` | optional | `true` on a `form` or `hook` item means: never shown on an intro card, asked cold as «Νέο: εφάρμοσε τον κανόνα» (decode an unseen item). Put it in the lesson that teaches the rule it needs |

Language: `la`/`forms`/`given`/`answer` are Latin; everything the student reads as explanation (`el`, `say`, `ask`, `why`, `rule`, `hook`, `story`, roles, clause parts) is modern Greek with school terminology. The validator rejects Greek letters in Latin fields and Latin-only text in Greek fields.

Macrons: write Latin **as the book prints it** (`dotem accepērunt`, `fero, tuli, lātum, ferre`) in `la`, `forms`, `given`, `ctx`, `from`. Answers (`form.answer`, `transform.to`, `tiles`) carry **no macrons**: the student never types them and the engine strips them anyway. Keep the book's typos in sentences (`proximan`, `Scibonianus`) and flag them in a `rule` or `trap` card.

## 3. The 11 item kinds

### `word` (u2, u5, u9)
```js
{ id: "u2-dos", kind: "word", la: "dos", forms: "dos, dotis", pos: "noun", gender: "f", decl: "3", el: "προίκα",
  hook: "dos ~ δίδωμι: η προίκα «δίνεται». Από την ίδια ρίζα η προ-δοσία.",   // Greek memory hook (from hooks.jsonl)
  etym: [{ el: "προδοσία", official: true }],    // optional, Β2 relatives; official = in the ministry list
  trap: "Γενική πληθυντικού dotium.",            // optional, the form fact that costs marks
  lesson: 35, lessons: [35], say: "…", status: "exam", src: "XXXV λεξιλόγιο· Παν. 2026" }
```
- `forms`: the dictionary form exactly as the book glosses it: nouns `lemma, genitive`; adjectives all genders (`bonus, -a, -um`); verbs 4 principal parts (`fero, tuli, lātum, ferre`), deponents 3 (`sequor, secutus sum, sequi`) with `dep: true`. The engine splits on commas to build the «αρχικοί χρόνοι» slots game and the genitive question.
- `pos`: `noun verb adj adv pron prep conj num phrase interj`. `gender` `m f n c` is required for nouns. `decl`: nouns `"1"`-`"5"`, adjectives `"2-1-2"` or `"3"`, verbs `"1" "2" "3" "3-io" "4" "irreg"`.
- Questions generated: meaning (mcq), reverse, gender, genitive, principal-parts slots, etymology, match, swipe.

### `sentence` (u2, u5, u9)
```js
{ id: "u5-s35-dotem", kind: "sentence", lesson: 35,
  la: "Scipiōnis filiae ex aerario dotem accepērunt, quia nihil illis reliquerat pater.",
  el: "Οι κόρες του Σκιπίωνα πήραν προίκα από το δημόσιο ταμείο, επειδή ο πατέρας τους δεν τους είχε αφήσει τίποτα.",
  chunks: ["Οι κόρες του Σκιπίωνα", "πήραν προίκα", "από το δημόσιο ταμείο,", "επειδή ο πατέρας τους", "δεν τους είχε αφήσει τίποτα."],
  gloss: [{ la: "aerarium", el: "δημόσιο ταμείο" }],                         // 0-4 hard words
  notes: [{ w: "illis", role_el: "έμμεσο αντικείμενο", dep: "reliquerat" }],  // 0-3 syntax facts; w must occur in la
  find: [{ ask: "Βρες το ρήμα της αιτιολογικής πρότασης", words: ["reliquerat"], why: "…" }],  // optional, Γ2α-style tap-the-words
  exam: [2026], say: "…", status: "exam", src: "XXXV· Παν. 2026 Α1" }
```
- `chunks` (3-9) must join with single spaces to exactly `el`: this is the tile-building translation. Translate literally, in the register markers accept.
- `find.words` are whole tokens of `la` (macrons and punctuation ignored).
- Only the 3-6 key sentences per lesson that `research/texts.md` already quotes, plus sentences in public exam papers. Full texts are © ΙΤΥΕ.

### `form` (u3, u4, u6, u7, u13)
```js
{ id: "u3-dos-genpl", kind: "form", lemma: "dos", given: "dotem", ctx: "Scipiōnis filiae ex aerario dotem accepērunt",
  ask: "τη γενική πτώση, στον άλλο αριθμό",       // exact exam wording
  cell: "gen.pl",                                   // machine key, see list below
  answer: ["dotium"],                               // accepted spellings, first = preferred, no macrons
  distractors: ["dotum", "dotis", "dotibus"],       // 3-5 wrong forms from neighbouring cells of the same lemma
  tiles: ["dot", "i", "um"],                        // optional stem + sign + ending for the build game; must join to answer[0]
  rule: "Το dos είναι εξαίρεση: γενική πληθυντικού dotium.",   // one breath
  why: "…",                                         // 2 lines shown after answering
  exam: [2026], say: "…", status: "exam", src: "Παν. 2026 Γ1· Τζάρτζανος §26" }
```
- `cell` keys: nominal `nom|gen|dat|acc|voc|abl` + `.sg|.pl` (+ `.m|.f|.n` for adjectives/pronouns, + `.comp|.sup` for degrees, `adv.pos|adv.comp|adv.sup`); verbal keys start with `ind|subj|impv|inf|ptc|ger|gdv|sup|periph`, e.g. `ind.fut.3pl.act`, `subj.plup.1pl.act`, `impv.fut.2sg.act`, `inf.perf.pass`, `ptc.pres.nom.sg.f`, `ger.gen`, `gdv.acc.sg.f`, `sup.acc`, `sup.abl`. The engine uses the prefix to tell Γ1 (nominal) from Γ2 (verbal) items.
- Accepted variants go in `answer`: `["iis", "eis", "is"]`, `["scivisse", "sciisse", "scisse"]`.
- Questions: cell mcq, typed answer (with tiles fallback), build, Colosseum.

### `rule` (any grammar/syntax unit)
```js
{ id: "u3-r-ium", kind: "rule", title: "-ium ή -um; η γενική πληθυντικού της γ΄ κλίσης",
  say: "Ισοσύλλαβα σε -is/-es και μονοσύλλαβα με δύο σύμφωνα πριν το -is παίρνουν -ium· τα υπόλοιπα -um.",
  ex: [{ la: "urbs, urbis → urbium", el: "μονοσύλλαβο, δύο σύμφωνα πριν το -is" }, { la: "dux, ducis → ducum", el: "ένα σύμφωνο" }],  // 2-4
  terms: ["ισοσύλλαβο", "γενική πληθυντικού"],
  quiz: [                                                            // 1-5 inline checks, asked right after the card
    { t: "tf", q: "nox, noctis → noctium", a: true, why: "…" },
    { t: "mcq", q: "rex, regis → γενική πληθυντικού;", options: ["regum", "regium", "regorum"], a: "regum", why: "…" },
    { t: "bucket", q: "Σε ποιο κουτί;", buckets: ["-ium", "-um"], items: [{ text: "civis, civis", bucket: "-ium" }, { text: "miles, militis", bucket: "-um" }, { text: "pars, partis", bucket: "-ium" }] },
  ], status: "book", src: "Τζάρτζανος §26" }
```
A `rule` is never graded as a card itself; its quiz questions are. A lesson needs at least one non-rule item.

### `role` (u8, u13): Θέμα Δ1α «X: είναι … στο …»
```js
{ id: "u8-abeo", kind: "role", la: "… mercenarium suum discessisse et ab eo desertum esse rus", w: "ab eo",
  answer: ["εμπρόθετος επιρρηματικός προσδιορισμός του ποιητικού αιτίου"],   // marker phrase first, near-synonyms after
  dep: "στο desertum esse",                                                  // always starts with «στο »
  tiles: ["εμπρόθετος επιρρηματικός προσδιορισμός", "του ποιητικού αιτίου", "στο desertum esse"],   // must join to `${answer[0]} ${dep}`
  distractors: ["εμπρόθετος προσδιορισμός της απομάκρυνσης", "απρόθετη αφαιρετική του ποιητικού αιτίου", "εμπρόθετος προσδιορισμός της προέλευσης"],
  why: "…", exam: [2026], say: "…", status: "exam", src: "Παν. 2026 Δ1α· κλειδί" }
```
Copy phrases from `research/syntax.md` §5.2.

### `clause` (u10, u11): Δ1β / Δ2α, scored in steps (1+1+1+2)
```js
{ id: "u10-cum-funderet", kind: "clause", la: "Atilius Rēgulus, «cum Poenos in Africā funderet», ad senātum scripsit …",   // clause in « »
  kind_el: "δευτερεύουσα επιρρηματική χρονική πρόταση",
  fn_el: "επιρρηματικός προσδιορισμός του χρόνου στο scripsit",
  intro_el: "με τον ιστορικό-διηγηματικό σύνδεσμο cum",
  mood_el: "υποτακτική, γιατί ο ιστορικός cum υπογραμμίζει τη βαθύτερη σχέση αιτίου-αιτιατού …",
  tense_el: "παρατατικός (funderet), γιατί εξαρτάται από ιστορικό χρόνο (scripsit) και δηλώνει το σύγχρονο στο παρελθόν",
  distractors: { kind: [2+], fn: [2+], intro: [2+], mood: [2+], tense: [2+] },   // plausible wrong answers per step
  contract: "…",      // optional: the participle / abl. abs. equivalent (Latin)
  expand: ["…"],      // optional: clause rewrites (Latin)
  why: "…", say: "…", status: "general", src: "syntax.md §5.1" }
```
Use the keys' Greek verbatim (`research/syntax.md` §5.1). Mark constructed justifications `status: "general"`.

### `transform` (u11, u10): Θέμα Δ2
```js
{ id: "u11-confirmavit", kind: "transform", from: "Hoc dictum paulo post res ipsa confirmavit.",
  ask: "Να μετατρέψετε την ενεργητική σύνταξη σε παθητική.",
  to: ["Hoc dictum paulo post re ipsa confirmatum est."],   // accepted answers, first = model
  tiles: ["Hoc", "dictum", "paulo", "post", "re", "ipsa", "confirmatum", "est", "res", "confirmata", "ab"],   // every word of to[0] + 2-4 wrong-form tiles
  orderFree: false,      // true when Latin word order may vary (the engine then checks the set of tiles)
  changed: 3,            // optional: words that change, shown as a hint
  steps: ["…", "…", "…"],   // 0-6 Greek micro-steps: all shown on the intro, faded in practice, none in review
  why: "…", exam: [2023], say: "…", status: "exam", src: "Παν. 2023 Δ1β" }
```

### `fact` (u12): Θέμα Β1
```js
{ id: "u12-andronicus", kind: "fact", q: "Ποιος απέδωσε στα Λατινικά την Οδύσσεια;", t: "mcq", options: ["Λίβιος Ανδρόνικος", "Βεργίλιος", "Έννιος"], a: "Λίβιος Ανδρόνικος", why: "…", bankId: "Σ/Λ 9", say: "…", status: "book", src: "Τράπεζα Β1" }
{ id: "u12-aeneid-first", kind: "fact", q: "Το πρώτο έργο της ρωμαϊκής λογοτεχνίας είναι η Αινειάδα.", t: "tf", a: false, why: "…", bankId: "Σ/Λ 8", … }
```
Every fact traces to `research/official-2026-27-literature-question-bank.txt` or the textbook Εισαγωγή (`bankId: "textbook"`). Nothing from memory.

### `hook` (u1): Θέμα Β2 etymology
```js
{ id: "u1-cerno", kind: "hook", la: "cerno", el: "διάκριση", type: "cognate", story: "cerno ~ κρίνω …", lessons: [16], say: "…", status: "exam", src: "Παν. 2022 Β2" }
```
`type`: `cognate` (same root) · `loan` (via Romance languages) · `official` (ministry list pair) · `phrase` · `calque`. The Β2 match (5 Latin, 7 Greek, 2 spare) needs ≥ 7 hooks in the course with distinct `el`.

### `origin` (u1, roundups): «Λατινικό ή όχι;»
```js
{ id: "u1-kastro", kind: "origin", w: "κάστρο", latin: true, from: "castra → κάστρο, μέσω της μεσαιωνικής ελληνικής.", say: "…", status: "book", src: "…" }
```

### `trap` (u13, and 1-2 per grammar unit): spot-the-trap
```js
{ id: "u13-certe", kind: "trap", wrong: "certius, certissime", right: "certe", ask: "certissimum: τον θετικό βαθμό του επιρρήματος", why: "…", cat: "read", exam: [2026], say: "…", status: "exam", src: "Παν. 2026 Γ1" }
```
`cat`: `read` (instruction reading) · `noun` · `verb` · `syntax` · `marking`. Items missed twice land in the student's Τετράδιο λαθών automatically.

## 4. How the engine turns items into a lesson

1. **Μάντεψε πρώτα**: the first guessable item (word, form, role, fact, hook, origin) is asked cold, no penalty.
2. For each item: **intro card → quick check** (word: meaning mcq · sentence: translation build · form: cell mcq · role: role mcq · clause: 5-step builder · transform: with all steps shown · fact/hook/origin/trap: their question). `rule` cards are followed by their inline quiz. `transfer` items skip the intro.
3. **Practice**: harder questions, shuffled (gender/genitive/principal parts/etymology/reverse · sentence note + find · form build or typed · role build · transform with fewer hints), transfer items always included.
4. **Match** when the sitting has ≥ 3 words/hooks/forms/roles (hooks → the Β2 5+2 shape).
5. **1-2 older due items** interleaved. Missed questions return at the end («Ξανά»).

Question types the UI renders: `intro mcq tf build match slots bucket find steps transform spot type swipe`. Spaced review: boxes 1/3/7/14/30/60 days, miss → box 1, swipe miss → one box down; from May every due date is capped at exam − 7 days. Colosseum pools: `form role hook fact word`. Θέμα της ημέρας: Δευτέρα Γ1, Τρίτη Γ2, Τετάρτη Δ1, Πέμπτη Δ2, Παρασκευή Β1+Β2, Σάββατο Α1, Κυριακή mixed; it draws from units the student has started, else from the first lesson of the units whose `exam` lists that section.

## 5. Rules for writers

- Never invent a form, meaning, gender or role. Sources in order: lesson ΛΕΞΙΛΟΓΙΟ / `research/vocab.jsonl`, Τζάρτζανος (`research/source-data/textbook-tzartzanos-latin-grammar.txt`), textbook ΠΑΡΑΤΗΡΗΣΕΙΣ, then a real paper's key (tutor keys contain errors; see `research/morphology.md` §1.5). Anything else is `general`; anything you could not confirm is `unsure`.
- «Seen in exam» (`exam: [year]`, `status: "exam"`) only from `research/pastpapers.md`, `morphology-past-items.json`, `passages-by-paper.json`, `syntax.md` §1.2.
- No statistics in `say`/`why` beyond «στα 5 διαγωνίσματα 2022-2026 ζητήθηκε …».
- Distractors must be plausible and wrong: neighbouring cells of the same lemma, roles from the same case, authors from the same period. The validator rejects distractors equal to an accepted answer.
- Greek `el` meanings for words: the book's gloss verbatim, senses separated by `;`.
- Keep `say` ≤ 160 characters, warm and dry, never childish.
- Run `npm test` before handing the unit in. Zero errors; look at the warnings.
