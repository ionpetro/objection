# How MBE questions work, and how to mirror them as game question types

Research for "Objection" (working name). Written 2026-11-02. Scope: the structure of an MBE question, the call-of-the-question patterns, how distractors are built, timing, the most-tested issues per subject, 36 question PATTERNS we can mirror, and the traps per subject.

Rules followed: no NCBE question text and no commercial outline text is copied here or in the app. The free NCBE PDFs I read are stored in `research/pastquestions-raw/` (gitignored). Everything marked **[OFFICIAL]** comes from ncbex.org or another primary source I opened. **[SECONDARY]** is a prep-company or law-school handout. **[MY SYNTHESIS]** is my own reading of the official material plus black-letter law I know; it must be verified against primary law (LII, Restatements) before it becomes an item. **[UNCERTAIN]** means conflicting or unconfirmed.

---

## 0. What exam do candidates actually sit in 2027? (decides the app's target)

- **February 2027 (Wed Feb 24):** the legacy MBE is still the multiple-choice exam almost everywhere. No jurisdiction is listed as a NEW NextGen adopter for Feb 2027; the 10 July-2026 NextGen jurisdictions simply continue. [OFFICIAL: https://www.ncbex.org/exams/nextgen-july-2026 ; https://www.ncbex.org/exams/mbe]
- **July 2027 (Wed Jul 28):** 12-13 more jurisdictions switch to NextGen (Arizona, Iowa, Kentucky, Minnesota, Nebraska, New Mexico, North Dakota, Oklahoma, South Dakota, Tennessee, Vermont, Wyoming; West Virginia is listed for July 2027 by some sources and for July 2028 by the NCBE page: **[UNCERTAIN]**). Everybody else still sits the MBE.
- **February 2028:** Delaware, DC, Illinois, Montana move. **July 2028:** 24-25 more, including California, New York, Texas, Florida, Pennsylvania, Georgia, Virginia, Massachusetts, New Jersey, Ohio. Feb 2028 is the final legacy UBE administration. [OFFICIAL, same NCBE page]
- NCBE's own MBE page says: "Between July 2026 and July 2028, most jurisdictions will transition from the MBE, MEE, and MPT to the NextGen UBE." [OFFICIAL: https://www.ncbex.org/exams/mbe]
- Who does NOT use the MBE today: Connecticut, Idaho, Louisiana, Maryland, Missouri, Oregon, Washington, Guam, N. Mariana Islands, Palau, Puerto Rico, US Virgin Islands. [OFFICIAL, MBE page]
- Inaugural NextGen (July 2026): 10 jurisdictions, 2,630 examinees, 72.7% pass, first-timers 85.2%, repeaters 41.0%, national mean 640.6 on the 500-750 scale. [OFFICIAL: https://www.ncbex.org/news-resources/inaugural-nextgen-ube-results]
- July 2026 MBE national mean 140.7 (44,472 examinees); Feb 2026 mean 131.2 (18,063). [OFFICIAL: https://www.ncbex.org/news-resources/ncbe-announces-national-mean-july-2026-mbe ; https://www.ncbex.org/news-resources/national-mean-february-2026-mbe]

**Recommendation:** build the core on the legacy MBE (200 Qs, 7 subjects, 4 options). It covers every February 2027 candidate and the large majority of July 2027 candidates, and the same law is the "Foundational Concepts" of NextGen. Add a later "NextGen mode" (see section 8) with select-two-of-six items and practice-oriented lead-ins. NextGen's standalone MCQ pacing is also 1.8 min per question. The app needs a settings field "my jurisdiction / exam" because the test format differs, not the law.

## 1. Official format facts [OFFICIAL]

Source: https://www.ncbex.org/exams/mbe/preparing and https://www.ncbex.org/exams/mbe
- 200 multiple-choice questions, two 3-hour sessions of 100, no scheduled breaks. 175 scored + 25 unscored pretest questions, indistinguishable, so answer everything.
- The 175 scored questions are split evenly: **25 per subject**: Civil Procedure, Constitutional Law, Contracts, Criminal Law and Procedure, Evidence, Real Property, Torts.
- Four options per question; "choose the best answer from the four stated alternatives." Only one answer marked; no penalty for wrong answers (never leave blank).
- "Each question ... is designed to be answered according to generally accepted fundamental legal principles, unless noted otherwise in the question."
- Only the answer sheet is scored; no extra time to transfer answers.
- MBE is 50% of the UBE score. Reported on a 200-point scaled score, equated across administrations.
- The free NCBE sample set (21 questions, all 7 subjects) states it should be done in about **38 minutes**, i.e. 1.8 min per question. [OFFICIAL sample PDF: https://www.ncbex.org/sites/default/files/2025-06/MBE%20Sample%20Test%20Questions.pdf]
- A conflict inside NCBE's own material: a 2015 Bar Examiner article says 190 scored / 10 pretest, with an update note saying 175/25 from Feb 2017. Use 175/25 (current MBE page).

## 2. Official subject weights inside each subject [OFFICIAL, computed from the NOTE lines of the MBE Subject Matter Outline]

Source: https://www.ncbex.org/sites/default/files/2023-01/MBE_Subject_Matter_Outline.pdf (copyright 2020; the outline says "each topic is not necessarily tested on each examination"). Counts are my arithmetic on 25 Qs: "approximately", not NCBE numbers.

| Subject | Official proportion statement | Approx. Qs of 25 |
|---|---|---|
| Civil Procedure | ~2/3 on I (jurisdiction & venue), III (pretrial procedures), V (motions); ~1/3 on II (law applied by federal courts), IV (jury trials), VI (verdicts & judgments), VII (appealability) | 16-17 on I, III, V (~5-6 each); 8-9 on the other four (~2 each) |
| Constitutional Law | ~1/2 on IV (individual rights); ~1/2 on I (judicial review), II (separation of powers), III (nation & states) | 12-13 individual rights; ~4 each for the other three |
| Contracts | ~1/2 on I (formation) and IV (performance, breach, discharge); ~1/2 on II, III, V, VI; **~1/4 of all Contracts Qs are on UCC Art. 1-2 official text** | ~6 each for I and IV; ~3 each for II, III, V, VI; ~6 on UCC |
| Criminal Law & Procedure | ~1/2 on V (constitutional protection of accused persons); ~1/2 on I-IV | 12-13 on V; ~3 each on homicide, other crimes, inchoate/parties, general principles |
| Evidence | ~1/4 on I (presentation), ~1/3 on II (relevancy & exclusion), ~1/4 on V (hearsay); rest on III (privileges/policy exclusions) and IV (writings) | I ~6; II ~8; V ~6; III + IV ~4-5 combined |
| Real Property | ~1/5 on each of I-V (ownership, rights in land, real estate contracts, mortgages/security, titles) | 5 each |
| Torts | ~1/2 on II (negligence); ~1/2 on I (intentional), III (strict & products), IV (other torts) | 12-13 negligence; ~4 each for the rest |

Finding: the "MBE frequency charts" sold by prep companies (JD Advising, UWorld) reproduce exactly these outline proportions (e.g. "Negligence 12-13", "Hearsay 6-7"). They are NOT independent counts of released questions. I found no published count of topics across released NCBE questions. So: weight our content by the outline proportions above, and say so honestly in the app ("NCBE says about half of Torts questions are negligence"). Do not claim topic-level frequencies beyond what the outline states.

Other official assumptions that appear in the outline's NOTE lines (they become "stem clauses" in our items):
- Civ Pro: assume current FRCP and Title 28 jurisdiction, venue, transfer statutes.
- Con Law: "Constitution" means the federal Constitution unless stated.
- Contracts: assume Official Text of UCC Articles 1 and 2.
- Evidence: Federal Rules of Evidence as currently in effect.
- Torts: assume survival and wrongful-death actions exist; **joint and several liability and pure comparative fault are the default** unless the question says otherwise.

## 3. Anatomy of one MBE item [OFFICIAL unless noted]

From NCBE's own item-writing articles: https://thebarexaminer.ncbex.org/article/september-2015/mbe-test-development-how-questions-are-written-reviewed-and-selected-for-test-administrations/ and https://thebarexaminer.ncbex.org/article/test-development/how-are-questions-written-for-ncbes-exams-part-one/
- Three parts: **stem** (factual scenario), **lead-in** (the call of the question), **options** (1 key + 3 distractors).
- Stems use the minimum number of actors and facts needed to support the key and make the distractors plausible. No proper names in the NCBE samples: parties are "a man", "the woman", "the retailer", "a protester" (I checked all 21 free samples). Jurisdictions are "State A / State B".
- Lead-ins are "positively framed complete sentences". NCBE names two families: **predictive-outcome lead-ins** (synthesize law + facts: who prevails, is it admissible) and **practice-oriented lead-ins** (build an analytical framework: best argument, best response, how should the judge rule).
- Options are concise, parallel, responsive to the lead-in; **each distractor must be plausible and supported by the stem, but cannot be a second or partial key**. The key must be unequivocally correct.
- Items test core concepts and legal reasoning, not trivia; target difficulty is "minimum competence of a newly licensed lawyer".
- Pretest items must not be too easy or too hard, and people who get them right should score high overall.
- Item life: about 3 years from drafting to scored use; seven drafting committees (one per subject), 5-7 members each (professors, practitioners, judges). Keys are verified against current law twice before scoring.

**Design consequence for Objection:** every distractor must be wrong for a stateable, teachable reason, never "trick wording". Our explanations should name the reason each wrong option fails (that is the learning).

## 4. Call-of-the-question patterns [my tally of the 21 free official samples; n=21 is small]

Observed lead-ins (paraphrased by category):
| Family | Count in 21 samples | Shapes seen |
|---|---|---|
| Will/is X likely to prevail? / Who will prevail? | 4 | torts, contracts, property |
| Is the evidence/testimony admissible? / How should the court rule on [evidence]? | 3 | habit, grand jury testimony, sequestration |
| Is the law constitutional? / Which statement is most accurate as a matter of constitutional law? | 2 | scrutiny, residency |
| Was it properly removed? / Does the Court have jurisdiction? / Is the court likely to grant the motion? / How should the court rule on these motions? | 4 | procedure validity |
| Of what crime, if any, can X be convicted? / Should the conviction be reversed? | 2 | with "No crime" as an option |
| What is the legal status of the transaction? / Is X entitled to reject? / Is X liable for the deficiency? | 3 | contract, mortgage |
| How should the judge instruct? / What is X's best option for challenging the judgment? | 2 | practice-oriented |
| Other | 1 | |

Option wording (my count over the 84 options): about **62% begin "Yes," or "No,"**, and **about 85% contain "because"**. The 2x2 grid (Yes/No x two different reasons) is the dominant shape. Three lead-ins in the samples include a built-in qualifier that changes the task ("if any", "most accurate", "best option"). Question stems mostly 40-220 words (my eyeball estimate); options 10-25 words.

Words that flip a question (all [SECONDARY]: https://jdadvising.com/a-guide-on-how-to-analyze-mbe-questions/ ; https://www.law.utexas.edu bar-prep handout): *because / unless / if*, *best / most likely / strongest / most effective*, *only / always / never*, *if any*. Whether these appear as "...unless" lead-ins on the real exam I cannot confirm from official material, so treat "unless" as a modifier inside options, not a lead-in family.

## 5. How distractors are built (taxonomy)

Official NCBE rules (plausible, not partial keys) plus the practitioner taxonomy [SECONDARY, consistent across getoncourse.ai, JD Advising, UT Austin handout, Pieper]:
1. **Right rule, wrong element** (rule stated correctly; facts fail one element).
2. **Right result, wrong reason** (the "because" clause is false or irrelevant).
3. **Assumed fact** (relies on something the stem never says).
4. **Wrong body of law / wrong standard** (common law vs UCC; strict instead of intermediate scrutiny; majority vs minority).
5. **Misstated rule / mistaken premise** (e.g. "a contract can't be modified without writing").
6. **True statement that does not answer the call** (correct law, wrong question).
7. **Absolute words** ("always", "never", "only"), usually wrong but not always.
8. **Emotionally attractive answer** (fairness, duress, "public policy") when the doctrine doesn't fit.
9. **Near-twins**: two options differ by one qualifier; the better one is the more precise/complete statement of the rule.
10. **Impressive-sounding doctrine that doesn't fit** (e.g. naming "abnormally dangerous activity" when a simpler rule governs).

## 6. Timing [OFFICIAL + SECONDARY]

- 1.8 minutes per question; 33 per hour; 9 per 15 minutes; 100 per 3-hour session. Checkpoints: 33 at 1:00, 66 at 2:00, 100 at 3:00. [OFFICIAL pace; checkpoints SECONDARY]
- Practice pacing chart: 25 Qs in 45 min, 34 in 1 h, 50 in 1.5 h, 75 in 2 h 15, 100 in 3 h. [SECONDARY, UT Austin]
- Soft cap about 2.5 min on a first pass; mark and return (answer sheet permits). Never blank.
- NextGen standalone MCQ expected time is also 1.8 min per item (OFFICIAL blueprint).

## 7. How strong candidates attack a question [SECONDARY, with disagreement flagged]

Consensus 5-step method (UT Austin / Basick; getoncourse; JD Advising): (1) call of the question, (2) facts with a purpose (underline legal qualifiers: "oral", "intentionally", "reasonably"), (3) name the issue and state the rule, (4) predict the answer BEFORE reading options, (5) eliminate options (wrong rule, misstated facts, faulty reasoning, right result wrong reason), then pick the best of what is left and re-read the call.
- **Disagreement:** ABA/National Jurist/UT say read the call first. JD Advising says read the facts first, then the call, then stop. Both agree: cover the options until you have a prediction. Sources: https://jdadvising.com/the-call-of-the-question-and-mbe-practice/ ; https://www.americanbar.org/groups/law_students/resources/student-lawyer/bar-admissions-and-exam/how-to-master-multiple-choice-section-bar-exam (403 for me, summarised from search) ; https://law.utexas.edu/wp-content/uploads/sites/3/2020/04/MBE-Prep-2020-1.pdf
- The UT error taxonomy (use as our mistakes-notebook tags): misread the question; didn't know the law; misapplied the law; knew the rule but not well enough for the nuance; added/assumed facts; let sympathy for "MBE people" override the rule.
- "Tests rule details, not broad concepts: the outer fringes of a rule element." (UT handout) That is why guess-first openers and apply-to-unseen-facts are the right game mechanics.
- Practice behaviours with the strongest consensus: timed sets of 25-33; review every miss and tag the reason; track by subtopic; at least one full 100-question block before test day; no-penalty guessing.
- Caution for our design: NCBE's own advice (via JD Advising) is that third-party questions "misleadingly portray how the MBE tests material". We cannot use NCBE questions, so the fidelity must come from the PATTERNS below and from the structural rules in section 3.

## 8. The 36 question patterns to mirror

Game types use Carpe's engine vocabulary: `mcq` (best answer, 4 options), `tf`, `build` (tiles), `match`, `bucket` (sorting), `find` (tap the key facts/words in the stem), `steps` (ordered decision steps), `spot` (spot-the-trap), `swipe` (fast yes/no), `slots`. "Cross-Exam" = speed round (one miss ends it).

### 8A. Lead-in (call of the question) patterns
| # | Pattern | Shape | Tests | Game type | Subjects |
|---|---|---|---|---|---|
| 1 | Will X prevail? | Yes/No x because grid | Elements of a claim/defense on given facts | mcq (grid) | Torts, Contracts, RP |
| 2 | Is it admissible? | Admit/Exclude, because [rule] | Hearsay definition, non-hearsay use, exception, relevance | mcq; also swipe | Evidence |
| 3 | Is the law constitutional? | Yes/No because [scrutiny tier / right] | Choose the standard first, then apply | mcq; bucket for tiers | Con Law |
| 4 | Was the proceeding/removal proper? | Yes/No because [statute] | Jurisdiction, venue, removal conditions | mcq | Civ Pro |
| 5 | How should the court rule on the motion? | Grant/Deny because | Which motion, which standard, who bears burden, timing | mcq; steps | Civ Pro, Evidence, Crim Pro |
| 6 | Of what crime, if any? | Menu of crimes including "No crime" | Mens rea per element, merger, defenses | mcq | Crim Law |
| 7 | Should the conviction be reversed? | Yes/No because | Appeal and error, harmless error, sufficiency | mcq | Crim Law/Pro |
| 8 | What is the legal status of X? | void / voidable / enforceable / unenforceable | Capacity, SoF, defenses | mcq; bucket | Contracts |
| 9 | Who will prevail in this action (title)? | Names of two claimants + reason | Estates, future interests, AP, recording | mcq | RP |
| 10 | Which statement is most accurate? | 4 statements of law | Rule recognition, spot the misstated one | mcq; spot | Con Law, any |
| 11 | How should the judge instruct/rule? | Practice-oriented, Give/Deny because | Burden of production vs persuasion; instruction standards | mcq | Crim, Civ Pro |
| 12 | What is X's best argument/option/objection/response? | Practice-oriented; pick the strongest | Choosing the strategy that actually fits the rule | mcq | all |
| 13 | Is X entitled to [remedy/rejection]? | Remedy x reason | UCC remedies, specific performance, perfect tender | mcq | Contracts, RP |
| 14 | Is X liable for [amount/deficiency]? | Yes/No because | Suretyship, assumption, apportionment | mcq | RP, Torts |

### 8B. Distractor-design patterns (turn each into a teachable item type)
| # | Pattern | How we mirror it | Game type |
|---|---|---|---|
| 15 | Result right, reason wrong | Two options share the outcome; only one has a valid because | mcq (pair) or `spot` ("which reason is wrong?") |
| 16 | Right rule, missing element | One fact fails an element; learner taps the failing fact | `find` |
| 17 | Wrong body of law | Same facts as goods vs services; flip the outcome | mcq with paired twin items |
| 18 | Assumed fact | Option needs a fact absent from stem; learner highlights the missing fact | `find`, `spot` |
| 19 | Wrong standard | Strict vs intermediate vs rational basis; preponderance vs clear and convincing | `bucket`, `match` |
| 20 | True but irrelevant | A correct rule that does not answer the call | `spot` |
| 21 | Absolute words | "always/never/only" option; teach when absolutes ARE right (e.g. "a statute of frauds writing must be signed by the party to be charged") | `spot`, `swipe` |
| 22 | Sympathetic facts | Stem makes the loser sympathetic; law decides | mcq with explanation naming the temptation |
| 23 | Near-twin options | Differ by one qualifier ("reasonable", "intent", "knowledge"); choose the more complete rule | mcq |
| 24 | Fancy doctrine, wrong fit | Doctrine name in an option that cannot apply to these facts | `spot` |
| 25 | Stale rule | Option correct under a superseded rule (see section 10) | `spot`; use sparingly |

### 8C. Reasoning and recall patterns (the Carpe-style tricks)
| # | Pattern | Shape | Game type |
|---|---|---|---|
| 26 | Name the issue | Short stem, learner picks the doctrine before options appear | `mcq` as guess-first opener |
| 27 | Elements in order | Assemble the elements of a claim, defense or test | `build` tiles |
| 28 | Apply rule to unseen facts | New fact pattern; same rule learned in lesson | mcq `transfer` |
| 29 | Sort by category | Hearsay / not hearsay; fixture / chattel; inherently dangerous felony / not; content-based / content-neutral | `bucket`, `swipe` |
| 30 | Match pairs | Rule to case; exception to trigger; crime to mens rea; case to holding | `match` |
| 31 | Standards and burdens | Level of scrutiny, standard of proof, standard of review, burden of persuasion vs production | `match`, `bucket` |
| 32 | Decision-tree order | Put steps in order: hearsay analysis, PJ analysis, Miranda, Rule 12 waiver | `steps`/`build` |
| 33 | Stem-stated variant overrides default | "The jurisdiction follows a race-notice statute", "defines crimes as at common law", "pure comparative negligence" | mcq paired by variant |
| 34 | Priority contest | Successive grantees, mortgagees, creditors; who wins and why | mcq; `steps` |
| 35 | Numbers that get tested | 21-day Rule 11 safe harbor; 30-day removal; 28-day Rule 50/59 motions; $75,000 amount in controversy; 10-year Rule 609 window | `type` / `match` |
| 36 | Limited-purpose evidence | Admissible for X but not Y; limiting instruction | mcq; `bucket` |

Cross-exam (speed round) works best with patterns 2, 15, 21, 29, 35, 36 (fast binary decisions). Timed 33-question "hour" sets and a 100-question "session" mock should use the real subject mix (4 questions from each subject cycle; 25 each in a full mock).

### 8D. NextGen mode (later) [OFFICIAL blueprint: https://www.ncbex.org/sites/default/files/2025-07/NCBE-NextGen-UBE-Blueprint_5.pdf]
- Three 3-hour sections; each has 40 standalone MCQ, 2 integrated question sets (about 24 min each), 1 performance task (about 60 min). 120 MCQ in total, 20 of them pretest.
- Score weights: standalone MCQ 49%, integrated sets 21%, performance tasks 30%. Scale 500-750.
- Two MCQ formats: select-one-of-four (0-1 pt) and **select-two-of-six (0-2 pts, partial credit)**.
- Content to July 2028: business associations, civil procedure, constitutional law, contract law, criminal law, evidence, real property, torts (family law added July 2028; trusts and estates and family law appear only as skills-context questions with resources supplied).
- Eight NextGen MCQ samples: lead-ins include research planning ("which topics are most important to research", "which search terms") and strategy ("best response to a summary judgment motion"). NCBE says early NextGen MCQ closely resemble MBE items and future administrations will vary more. [OFFICIAL: https://www.ncbex.org/exams/nextgen/sample-questions/multiple-choice]
- Extra patterns for NextGen mode: 37 select-two-of-six; 38 research-term selection; 39 counseling-set short answer. Not needed for launch.

## 9. Per-subject: most tested and traps

"Most tested" = what the official outline proportions and the NCBE sample set support. "Traps" = errors that the sample set and standard analyses show; rule statements marked [MY SYNTHESIS] need a primary-law check before use.

### Civil Procedure (25 Qs)
Most tested: federal subject-matter jurisdiction, personal jurisdiction, service, venue/transfer, removal; pleadings and joinder; discovery and sanctions; Rule 11; summary judgment; JMOL and post-trial motions; claim/issue preclusion; interlocutory review.
Traps:
- **Forum-defendant rule:** a diversity-only case "may not be removed if any of the parties in interest properly joined and served as defendants is a citizen of the State in which such action is brought" (28 U.S.C. 1441(b)(2)). A defendant sued at home cannot remove, even if diversity and amount exist. [OFFICIAL text, LII; the NCBE sample on removal turns on this]
- Corporation is a citizen of its state of incorporation AND its principal place of business. Amount in controversy must exceed $75,000 exclusive of interest and costs. Removal must be within 30 days of service (1446(b)(1)). [MY SYNTHESIS; statutes standard]
- **Rule 11 safe harbor:** the sanctions motion must be served on the other side and may not be filed if the paper is withdrawn or corrected within 21 days (Rule 11(c)(2)). No monetary sanction against a represented party for a Rule 11(b)(2) legal-contentions violation (11(c)(5)(A)). [OFFICIAL text, LII] (The sample item built on this has four options mixing failed pre-filing inquiry, unwarranted legal contention, and the safe harbor.)
- JMOL vs new trial: a legal-error instruction means Rule 59 new trial, not Rule 50 JMOL; Rule 50(b) renewal requires a prior Rule 50(a) motion. [MY SYNTHESIS]
- Rule 12(b) waiver: personal jurisdiction, venue, process and service defenses are waived if left out of the first Rule 12 motion or responsive pleading; subject-matter jurisdiction is never waived. [MY SYNTHESIS]
- Erie: state substantive law, federal procedure; state choice-of-law rules apply in federal diversity court. Supplemental jurisdiction 1367(b) limits plaintiffs' claims in diversity cases. [MY SYNTHESIS]
- Claim vs issue preclusion: valid final judgment on the merits; issue preclusion requires actually litigated and essential. [MY SYNTHESIS]
- Amendments effective Dec 1, 2025: Rule 16(b) and 26(f) privilege-log provisions and new Rule 16.1 for MDL. Low odds of being tested; flag only. [SECONDARY: https://www.arnoldporter.com/en/perspectives/blogs/edata-edge/2025/12/new-privilege-log-rules-are-here]

### Constitutional Law (25 Qs; about half individual rights)
Most tested: equal protection tiers, substantive due process, First Amendment (content-based vs neutral, unprotected categories), plus a block of structure: justiciability, commerce power, separation of powers, preemption, 10th Amendment.
Traps:
- Justiciability is a gate: standing, ripeness, mootness, political question; Eleventh Amendment. [OFFICIAL outline]
- **Adequate and independent state ground:** if the state court's decision rests on federal law and does not clearly rest on an independent state ground, the Supreme Court has jurisdiction (Michigan v. Long). The trap option is "state law could have been used". [MY SYNTHESIS; the NCBE sample on certiorari turns on this]
- Tier first, then apply. Sex classifications get intermediate scrutiny; facially neutral laws need discriminatory purpose, not just disparate impact, to trigger heightened scrutiny. [MY SYNTHESIS]
- Content-based restrictions on speech get strict scrutiny, even for "subject matter" distinctions; time/place/manner rules need content neutrality. The "privilege not a right" and "other channels exist" options are classic wrong answers. [MY SYNTHESIS; consistent with the NCBE sample on a barbershop poster ban]
- Right to travel / durational residency: heightened review of residency waiting periods for basic benefits (Saenz-type reasoning appears in the NCBE sample). [MY SYNTHESIS, unverified citation]
- Dormant commerce clause: discrimination against out-of-state commerce is nearly per se invalid; market participant exception. [MY SYNTHESIS]
- Recent cases (Dobbs 2022, Bruen 2022, SFFA 2023, Counterman 2023, Tyler v. Hennepin 2023, Sheetz 2024): NCBE says items take about 3 years to develop and drafters avoid concepts then before the Court (https://www.ncbex.org/news/ncbe-statement-on-scotus-decisions-and-the-bar-exam). Treat 2024+ decisions as low probability by July 2027; build items on settled doctrine.

### Contracts (25 scored Qs; about 1/4 on UCC Art. 1-2)
Most tested: formation (offer, acceptance, consideration, reliance), performance/breach/discharge, then defenses, parol evidence, remedies, third-party rights.
Traps:
- First decide **UCC (goods) or common law (services, land, employment)**. The most-cited cause of lost Contracts points (SECONDARY, unquantified).
- **Modification:** UCC 2-209(1) says a modification "needs no consideration to be binding" (good faith required); common law needs consideration unless a doctrine like Restatement (Second) 89 (unanticipated circumstances, fair and equitable) applies. Statute of frauds applies to the modification only if the modified contract is within it (2-209(3)). [OFFICIAL text, LII; NCBE sample on a construction price increase turns on the common-law/89 side]
- **Perfect tender:** in a sale of goods a buyer may reject for any non-conformity; seller's cure rights (2-508) arise after rejection if time remains. "No significant impact" and "must be allowed to cure first" are wrong-answer shapes. [MY SYNTHESIS; NCBE sample on posters]
- Capacity: a contract by a person under guardianship is void, not merely voidable, even if the other side was unaware and the person was lucid (the trap options use "reasonable person" and "fair terms"). [MY SYNTHESIS; NCBE sample]
- Mirror-image rule vs 2-207 battle of the forms; firm offers (2-205); statute of frauds (UCC 2-201 and MYLEGS list).
- Third parties: intended vs incidental beneficiaries; delegation does not discharge the delegator; assignee takes subject to defenses.

### Criminal Law and Procedure (half Constitutional protection of accused persons)
Most tested: search and seizure, Miranda/self-incrimination, right to counsel, confrontation, double jeopardy, burdens; then homicide, theft crimes, inchoate crimes, defenses.
Traps:
- When the stem says "the jurisdiction defines crimes as at common law" apply common-law definitions (burglary, larceny); otherwise the majority/common-law default. [OFFICIAL via NCBE sample stem]
- **Feigned accomplice:** a person who only pretends to help (to get another arrested) lacks the intent for conspiracy or accomplice liability ("No crime" is the key in the NCBE sample). [MY SYNTHESIS]
- **Causation:** hastening death of a terminally ill person is still causation; depraved-heart (reckless indifference) murder is a valid theory when the stem shows conscious disregard. Regulatory-offence and "strict liability" options are distractors. [MY SYNTHESIS; NCBE sample]
- **Self-defense instruction:** the court must give the instruction when the evidence is sufficient to raise the defense; the defense does not need to be the best theory or even likely to win. [MY SYNTHESIS; NCBE sample]
- Miranda needs custody AND interrogation; invocation must be unambiguous; Sixth Amendment counsel attaches at formal charge. Exclusionary rule exceptions: good faith, independent source, inevitable discovery, attenuation.
- Emergency aid exception to the warrant requirement: Case v. Montana (Jan 14, 2026) held the Brigham City objective-reasonableness standard applies "with no further gloss", no probable cause required. [SECONDARY via Ballotpedia/news: https://ballotpedia.org/Case_v._Montana ; treat as [UNCERTAIN] until the opinion is read, and as low-probability on 2027 exams under NCBE's lag]

### Evidence (FRE only)
Most tested: relevancy/403/character/habit/other acts/expert testimony; hearsay and its exceptions; presentation (witnesses, impeachment, refreshing, objections).
Traps:
- **Habit and routine practice (FRE 406):** "a person's habit or an organization's routine practice" is admissible to show conduct on a particular occasion, "regardless of whether it is corroborated or whether there was an eyewitness." The wrong options say habit applies only to persons, or require personal knowledge of the incident. [OFFICIAL text, LII; NCBE sample]
- **Prior inconsistent statements, FRE 801(d)(1)(A):** current text admits them substantively only if made under penalty of perjury at a trial, hearing, other proceeding or deposition (a grand jury counts). **An amendment removes that requirement: the Supreme Court adopted it on April 8, 2026, effective December 1, 2026**, so Feb 2027 and July 2027 candidates sit the exam under the amended rule. After the amendment, any prior inconsistent statement of a testifying witness subject to cross is non-hearsay (still subject to 403, and still must satisfy 613 foundation for extrinsic proof). [OFFICIAL: https://www.supremecourt.gov/orders/courtorders/frev26_da3i.pdf ; the order transmits the amendment to Congress; Congress could still act before Dec 1]
  Consequence: the NCBE sample question on grand jury testimony keeps its outcome (admit) but its keyed REASON (under oath at a formal proceeding) is outdated after Dec 1, 2026. Do not copy that reasoning; write items so the correct reason is valid under both versions, or avoid the issue until NCBE says what it will test. **[UNCERTAIN: no NCBE statement found on whether Feb/Jul 2027 MBE items will assume the amended text. The outline says "as currently in effect".]**
- Other FRE changes status: Rule 707 (machine-generated evidence) is NOT in force (Advisory Committee in May 2026 declined to recommend final action and plans more study); a Rule 609(a)(1)(B) amendment status is conflicting in sources. Do not test either as law. [SECONDARY, UNCERTAIN: https://www.uscourts.gov/sites/default/files/document/advisory_committee_on_evidence_rules_may_2026.pdf]
- Hearsay: ask first "offered for the truth of the matter asserted?" Non-hearsay uses: effect on listener, verbal acts, circumstantial state of mind. Opposing-party statements need no personal knowledge. Exceptions that need the declarant available (803) vs unavailable (804). Statement of memory or belief to prove the fact remembered is not covered by the then-existing-condition exception. [MY SYNTHESIS]
- Confrontation Clause is a separate gate for testimonial statements in criminal cases. [OFFICIAL outline V.L]
- Sequestration: designated representative of a non-natural party (e.g. the case agent for the government) may stay in the courtroom (FRE 615). [MY SYNTHESIS; NCBE sample]
- Character: propensity banned, but the accused may open the door; 404(b) other-acts for non-propensity purposes; 413-415 propensity for sexual assault and child molestation; 412 rape shield. [MY SYNTHESIS]
- Rule 407 (subsequent remedial measures), 408 (compromise), 409, 410, 411: admissible for other purposes such as ownership or control, feasibility if disputed, impeachment. [MY SYNTHESIS]
- Impeachment: 608(b) specific instances only on cross, no extrinsic proof; 609 convictions; 613(b) extrinsic proof of a prior inconsistent statement needs an opportunity to explain or deny.
- Expert testimony: FRE 702 (amended Dec 1, 2023) puts the burden on the proponent to show by a preponderance that the reliability conditions are met. [SECONDARY; verify]

### Real Property (5 Qs per category)
Most tested: present estates and future interests, concurrent ownership, landlord-tenant, easements/covenants, contracts and marketable title, mortgages, recording acts, adverse possession, deeds.
Traps:
- Classify the interest first (fee simple determinable has a possibility of reverter, automatic on breach; condition subsequent needs re-entry). **Adverse possession against a reverter interest runs only after the triggering event** (NCBE sample: clock starts when use turns commercial). [MY SYNTHESIS; NCBE sample]
- Rule Against Perpetuities: common-law "must vest, if at all, within 21 years after a life in being"; know the statutory reform (wait-and-see / USRAP). [OFFICIAL outline names both]
- **Mortgage assumption:** the grantee who assumed becomes the principal obligor; the original mortgagor becomes a surety; the lender's release of the surety does not release the assuming grantee (NCBE sample). Distractors: "clogging the equity of redemption", "release of one releases all". [MY SYNTHESIS; NCBE sample]
- **Fixtures:** annexation, adaptation and intent; items attached with screws and brackets can still be fixtures, and fixtures pass with a deed without being mentioned (NCBE sample). Warranty-deed covenants are not the issue. [MY SYNTHESIS]
- Recording acts: race, notice, race-notice; the bona fide purchaser for value without notice; shelter rule. State the type in the stem (pattern 33).
- Equitable conversion and risk of loss; marketable title; merger of the contract into the deed; options and rights of first refusal.
- Landlord-tenant: implied warranty of habitability (residential), constructive eviction, mitigation, assignment vs sublease.

### Torts (half negligence)
Most tested: negligence duty/breach/causation/limitations (including owners and occupiers, res ipsa, negligence per se), vicarious liability, comparative fault; then intentional torts, strict liability and products, defamation/privacy, nuisance, misrepresentation, economic torts.
Traps:
- Default assumptions: pure comparative fault and joint and several liability unless the stem says otherwise (OFFICIAL outline note). Wrong options use contributory negligence.
- Knowledge of a danger (assumption of risk) is a defense; the NCBE sample on a guard-dog attack turns on the plaintiff's knowledge, not on "abnormally dangerous activity" (dogs kept as guard animals are treated as domestic animals; the owner's liability depends on knowledge of vicious propensity). Option 24 pattern. [MY SYNTHESIS; verify with Restatement (Second) 506-518, 520]
- Duty: no general duty to rescue; special relationships; entrants on land (trespasser, licensee, invitee; Restatement (Second) 339 for child trespassers). A visit to retrieve one's own property is an invitee or licensee question; check facts. [MY SYNTHESIS]
- Superseding cause: unforeseeable intervening acts break the chain; foreseeable ones don't.
- Tavern/dram-shop style stems: a defendant who ejected an intoxicated patron who then walked into the street; check duty and breach before foreseeability. The NCBE sample uses JMOL as the call. [MY SYNTHESIS]
- Defamation and privacy: public disclosure of private facts fails if the matter is newsworthy (NCBE sample); public figure + public concern requires actual malice (NYT v. Sullivan); private figure/public concern needs at least negligence (Gertz). [MY SYNTHESIS]
- Products: manufacturing, design (reasonable alternative design), warning defects; strict liability for sellers in the chain. [MY SYNTHESIS]

## 10. Currency and how NCBE handles new law [OFFICIAL]

- NCBE says new Supreme Court decisions generally aren't tested right away because MBE items take about three years from drafting to scoring and drafters avoid concepts pending before the Court: https://www.ncbex.org/news/ncbe-statement-on-scotus-decisions-and-the-bar-exam (the full help-center article was blocked, 403).
- The exception that matters for 2027 is rules text, not cases: the FRE 801(d)(1)(A) change takes effect Dec 1, 2026 (see Evidence). Build a content flag `lawVersion: "post-2026-12-01"` for any item touching FRE or FRCP so we can update in one place.
- Keep "last verified" dates on the rules.

## 11. Mapping to Carpe's tricks (what carries over)

- **Guess-first opener** = pattern 26 (name the issue before options). **Apply-to-unseen-facts transfer** = 28. **Tiles** = 27 and 32. **Match** = 30, 31. **Yes/No sorting** = 29, 36. **Speed round "Cross-Examination"** = swipe over 2, 15, 21, 29, 35, 36. **Missed questions return** and **mistakes notebook**: tag each miss with the UT error taxonomy from section 7 (misread, didn't know, misapplied, nuance, added fact, sympathy).
- **Prompts phrased the way the real exam phrases them:** use the lead-in families in section 4, no proper names, "State A/State B", Yes/No-because grid, stem clauses for the jurisdiction's rule, 40-220 word stems.
- **Daily exam-style drill:** 9 questions per 15 minutes pace; **mock exam:** 100 questions / 3 hours with checkpoints at 33 and 66; **countdown:** Feb 24, 2027 and Jul 28, 2027.
- **Provenance fields:** use `src` for the primary law (e.g. "FRE 406", "UCC 2-209", "28 U.S.C. 1441(b)(2)", "Restatement (Second) of Contracts 89"). A `status` of "exam" can never be used because we cannot copy NCBE items; propose values `outline` (topic named in NCBE outline), `rule` (checked in primary text), `unsure`.

## 12. What I could not obtain, and conflicts

- **OPE-1 to OPE-4 / released exams are not offered for free.** The current NCBE catalogue sells "MBE Study Aid" (210 previous MBE questions, $100 PDF / $125 print), "MBE Practice Questions 1, 2, 3" (300 questions, $50 each), "MBE Complete Practice Exam" ($100) and "MBE Complete Bundle" ($200, 500 questions) through the BarNow platform (https://www.ncbex.org/study-aids/legacy-exam). I did not buy or download paid questions. The free official sets are the 21-question sample (read, kept locally) and, per JD Advising, a 10-question Civil Procedure set and 1990s released questions, whose NCBE links were dead when I tried (dmsdocument/16 and /17).
- No published count of topics across released NCBE questions exists that I could find. Commercial "frequency charts" reproduce the outline.
- No peer-reviewed study classifying MBE items by rule-recall vs application. One blog claim ("60% rule application") is unverified; ignore it.
- West Virginia July 2027 vs July 2028 conflict; Mississippi date TBD; Arkansas, Louisiana, Nevada, Puerto Rico not adopted per NCBE page.
- NCBE help-center pages and the NextGen Examinees' Guide returned 403 (Cloudflare); facts taken from the NextGen blueprint PDF and search summaries.
- All [MY SYNTHESIS] rule statements need primary-text verification before they become items. The subject agent writing content should cite LII for each.

## 13. Sources opened

Official (NCBE/US courts):
- MBE page: https://www.ncbex.org/exams/mbe and https://www.ncbex.org/exams/mbe/preparing
- MBE Subject Matter Outline (PDF): https://www.ncbex.org/sites/default/files/2023-01/MBE_Subject_Matter_Outline.pdf
- MBE Sample Test Questions (PDF, 21 Qs, key): https://www.ncbex.org/sites/default/files/2025-06/MBE%20Sample%20Test%20Questions.pdf
- NextGen: https://www.ncbex.org/exams/nextgen ; https://www.ncbex.org/exams/nextgen-july-2026 ; content scope https://www.ncbex.org/exams/nextgen/content-scope ; MCQ samples https://www.ncbex.org/exams/nextgen/sample-questions/multiple-choice ; study aids https://www.ncbex.org/study-aids/nextgen-ube ; Blueprint PDF https://www.ncbex.org/sites/default/files/2025-07/NCBE-NextGen-UBE-Blueprint_5.pdf
- Legacy study aids: https://www.ncbex.org/study-aids/legacy-exam
- Results: https://www.ncbex.org/news-resources/inaugural-nextgen-ube-results ; https://www.ncbex.org/news-resources/ncbe-announces-national-mean-july-2026-mbe ; https://www.ncbex.org/news-resources/national-mean-february-2026-mbe
- Item writing: https://thebarexaminer.ncbex.org/article/september-2015/mbe-test-development-how-questions-are-written-reviewed-and-selected-for-test-administrations/ ; https://thebarexaminer.ncbex.org/article/test-development/how-are-questions-written-for-ncbes-exams-part-one/
- SCOTUS policy statement: https://www.ncbex.org/news/ncbe-statement-on-scotus-decisions-and-the-bar-exam
- Supreme Court order on FRE 801: https://www.supremecourt.gov/orders/courtorders/frev26_da3i.pdf
- LII: https://www.law.cornell.edu/uscode/text/28/1441 ; https://www.law.cornell.edu/rules/frcp/rule_11 ; https://www.law.cornell.edu/ucc/2/2-209 ; https://www.law.cornell.edu/rules/fre/rule_406

Secondary (strategy and distractors):
- https://jdadvising.com/the-call-of-the-question-and-mbe-practice/ ; https://jdadvising.com/a-guide-on-how-to-analyze-mbe-questions/ ; https://jdadvising.com/7-tips-and-tricks-for-answering-mbe-questions/ ; https://jdadvising.com/free-sources-for-actual-official-mbe-sample-questions/ ; https://jdadvising.com/mbe-topic-frequency-chart/
- https://getoncourse.ai/blog/mbe-multiple-choice-strategy-bar-exam/ ; https://getoncourse.ai/blog/highest-yield-bar-exam-subjects/ (self-declared "not official predictions")
- https://www.pieperbar.com/news/how-to-approach-the-mbe
- UT Austin (Mary Basick): https://law.utexas.edu/wp-content/uploads/sites/3/2020/04/MBE-Prep-2020-1.pdf
- UWorld summary: https://legal.uworld.com/bar-exam/mbe-subjects-and-format/ (internal inconsistencies noted)
- Barbri jurisdictions: https://www.barbri.com/resources/nextgen-bar-exam-or-current-ube-which-will-i-take
- FRCP Dec 2025 amendments: https://www.arnoldporter.com/en/perspectives/blogs/edata-edge/2025/12/new-privilege-log-rules-are-here
- Case v. Montana: https://ballotpedia.org/Case_v._Montana

## 14. Local files
- `research/pastquestions-raw/MBE_SMO.pdf`, `MBE_SMO.txt` (outline), `MBE_Sample.pdf`, `MBE_Sample.txt` (21 sample Qs): gitignored, never copy into app.
- `research/source-data/nextgen_blueprint.pdf`: gitignored.
