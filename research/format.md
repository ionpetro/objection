# Objection: official MBE / UBE format for 2027 (research notes)

Researched 2026-11-02. Primary sources: ncbex.org (NCBE), NCBE-published PDFs (read in full via text extraction), NCBE news releases. Secondary sources are marked. "DERIVED" = my arithmetic from a primary source, not a figure NCBE prints. "UNCERTAIN" = sources conflict or I could not confirm.

---

## 0. The headline: what a 2027 candidate actually sits

**The legacy UBE (MBE + MEE + MPT) is still the exam for most US candidates in Feb 2027 and July 2027.** NCBE: "The last administration of the current bar exam will be the February 2028 administration." (https://reports.ncbex.org/charts/chart-17/ and the "legacy Uniform Bar Examination, administered through February 2028" line on https://www.ncbex.org/exams/nextgen-ube/scores-score-portability/nextgen-ube-decisions-jurisdiction).

Old news that is now WRONG: a 2023 announcement (Law.com, "current bar exam will sunset after July 2027 administration") said July 2027 would be the last legacy exam. NCBE has since moved the end to February 2028. Do not use the 2023 date.

NextGen already exists and is live. The first NextGen UBE was given July 28-29, 2026 in 10 jurisdictions (Connecticut, Guam, Idaho, Maryland, Missouri, Northern Mariana Islands, Oregon, Palau, US Virgin Islands, Washington). Source: https://www.ncbex.org/news-resources/ten-jurisdictions-complete-inaugural-administration-nextgen-UBE

### Who sits what in 2027 (NCBE table "last updated October 23, 2026")
Source: https://www.ncbex.org/exams/nextgen-ube/scores-score-portability/nextgen-ube-decisions-jurisdiction (also https://reports.ncbex.org/charts/chart-17/)

| First NextGen administration | Jurisdictions |
|---|---|
| July 2026 (already live; these also give NextGen in Feb 2027) | Connecticut, Idaho, Maryland, Missouri, Oregon, Washington, Guam, N. Mariana Islands, Palau, Virgin Islands |
| **July 2027** (12 per the Oct 23 table) | Arizona, Iowa, Kentucky, Minnesota, Nebraska, New Mexico, North Dakota, Oklahoma, South Dakota, Tennessee, Vermont, Wyoming |
| February 2028 | Delaware, District of Columbia, Illinois, Montana |
| July 2028 | Alabama, Alaska, California, Colorado, Florida, Georgia, Hawaii, Indiana, Kansas, Maine, Massachusetts, Michigan, New Hampshire, New Jersey, New York, North Carolina, Ohio, Pennsylvania, Rhode Island, South Carolina, Texas, Utah, Virginia, Wisconsin, **West Virginia (see conflict)**  |
| TBA / not announced | Mississippi (TBA); Arkansas, Louisiana, Nevada, Puerto Rico have not announced plans (https://www.ncbex.org/exams/nextgen) |

**UNCERTAIN, West Virginia:** the NCBE press release of July 31, 2026 and NCBE's West Virginia jurisdiction page say July 2027 (13 jurisdictions join in July 2027), but the Oct 23, 2026 decisions table lists West Virginia as July 2028, and https://www.ncbex.org/exams/nextgen says "twelve more" in July 2027. The newer table (12 jurisdictions) is probably right. Verify with the WV Board of Law Examiners if it matters. It does not matter for the app design.

**Consequences for the target user:**
- **Feb 2027:** every jurisdiction except the 10 above sits the legacy exam (MBE/MEE/MPT, or a state's own exam). The 10 above sit NextGen on **Feb 23-24, 2027** (https://www.ncbex.org/exams/nextgen-july-2026: no new jurisdiction starts in Feb 2027).
- **July 2027:** the 12 jurisdictions above join NextGen (about 22 total). **Everyone else, including California, Texas, New York, Florida, Pennsylvania, Illinois, Georgia, New Jersey, Massachusetts, Ohio, North Carolina, Virginia, Michigan, Colorado, still sits the legacy MBE exam in July 2027** (and Feb 2028, and Illinois/DC/Delaware/Montana only until Feb 2028).
- The MBE is therefore the right primary target for 2027 (it covers the large majority of examinees), but it is NOT the whole story. About 22 jurisdictions will have NextGen by July 2027. The app should say clearly at the top: "Studying for the MBE? Great. In a NextGen state? Here is what carries over" (see section 6).
- Candidates can sometimes choose: NCBE help article "Can I choose to take either the NextGen UBE or the legacy UBE in my jurisdiction" (https://help2.ncbex.org/hc/en-us/articles/47602596542747). I could not open it; UNCERTAIN how often choice exists. Florida and New York will NOT accept NextGen transferred scores from before July 2028; Pennsylvania accepts legacy UBE transfers during its transition (chart-17 notes).
- Only Louisiana and Puerto Rico do not administer the MBE (secondary sources: jdadvising, BARBRI; NCBE page not opened). Oregon and Washington gave MBE before July 2026 and now give NextGen.

---

## 1. MBE format (legacy, what the app targets)

Source: https://www.ncbex.org/exams/mbe and https://ncbex.org/exams/mbe/preparing

- 200 multiple-choice questions, **175 scored + 25 unscored pretest**. "The pretest questions are indistinguishable from those that are scored, so examinees should answer all questions."
- Two 3-hour sessions, 100 questions each, no scheduled breaks. Six hours total (about 1.8 min per question, DERIVED: 180 min / 100).
- Four answer choices, one best answer. "Points are not subtracted for incorrect answers." Multiple answers marked = wrong.
- "The 175 scored questions on the MBE are distributed evenly, with 25 questions from each of the seven subject areas." Subjects: Civil Procedure, Constitutional Law, Contracts, Criminal Law and Procedure, Evidence, Real Property, Torts. Each = 1/7 = 14.3% of the scored total (DERIVED).
- Older sources saying "190 scored, 27 per subject" are obsolete (the 190-scored format ended; secondary sources only).
- Prompts are "best answer" style; NCBE posts free sample MBE questions at https://www.ncbex.org/sites/default/files/2025-06/MBE%20Sample%20Test%20Questions.pdf (copyrighted, do not copy into the app).
- Controlling-law assumptions stated in the outline (verbatim notes): Civil Procedure = FRCP as currently in effect + Title 28 sections on trial/appellate jurisdiction, venue, transfer. Constitutional Law = federal Constitution. Contracts = Official Text of UCC Articles 1 and 2. Evidence = Federal Rules of Evidence "as currently in effect". Torts = survival actions and wrongful death available; joint and several liability and pure comparative fault unless stated otherwise. Real Property and Criminal Law have no single code (common-law/majority rules; no MPC named in the outline, UNCERTAIN how much MPC the exam uses).

### 1.1 MBE Subject Matter Outline (official, topic weights inside each subject)
Source: https://www.ncbex.org/sites/default/files/2023-01/MBE_Subject_Matter_Outline.pdf (read in full; the document itself is marked "Copyright 2020 ... 11/16/20", posted to the site in Jan 2023; no newer MBE outline exists as of Nov 2026; the MBE page has no change notice). NCBE says: "each topic is not necessarily tested on each examination" and the outline "is not intended to list every aspect of a topic".

NCBE publishes weights only as the "approximately" fractions below. No source I found gives per-topic frequencies beyond these. **Do not invent finer percentages.** The question counts in the right column are DERIVED (fraction x 25).

| Subject (25 scored) | Official weight note | Roughly (DERIVED, of 25) |
|---|---|---|
| **Civil Procedure** | ~2/3 on categories I (Jurisdiction and venue), III (Pretrial procedures), V (Motions); ~1/3 on II (Law applied by federal courts), IV (Jury trials), VI (Verdicts and judgments), VII (Appealability and review) | ~17 / ~8 |
| **Constitutional Law** | ~1/2 on IV (Individual rights); ~1/2 on I (Judicial review), II (Separation of powers), III (Nation and states) | ~12-13 / ~12-13 |
| **Contracts** | ~1/2 on I (Formation) and IV (Performance, breach, discharge); ~1/2 on II (Defenses), III (Content and meaning), V (Remedies), VI (Third-party rights). **~1/4 of Contracts questions are on UCC Articles 1 and 2** | ~12-13 / ~12-13; UCC ~6 |
| **Criminal Law and Procedure** | ~1/2 on V (Constitutional protection of accused persons); ~1/2 on I Homicide, II Other crimes, III Inchoate crimes and parties, IV General principles | ~12-13 / ~12-13 |
| **Evidence** | ~1/4 on I (Presentation of evidence), ~1/3 on II (Relevancy and reasons for excluding relevant evidence), ~1/4 on V (Hearsay), remainder on III (Privileges and other policy exclusions) and IV (Writings, recordings, photographs) | I ~6, II ~8, V ~6, III+IV ~4-5 |
| **Real Property** | ~1/5 on each of I through V | ~5 each |
| **Torts** | ~1/2 on II (Negligence); ~1/2 on I (Intentional torts), III (Strict liability and products), IV (Other torts: nuisance, defamation/privacy, misrepresentation) | ~12-13 / ~12-13 |

Category lists per subject (the app's unit/topic spine; wording is NCBE's outline headings):

- **Civil Procedure.** I Jurisdiction and venue: federal SMJ (federal question, diversity, supplemental, removal); personal jurisdiction; service of process and notice; venue, forum non conveniens, transfer. II Law applied by federal courts: state law in federal court (Erie); federal common law. III Pretrial procedures: PI/TRO; pleadings, amendments, supplemental pleadings; Rule 11; joinder of parties and claims incl. class actions; discovery (incl. e-discovery), disclosure, sanctions; adjudication without trial; pretrial conference and order. IV Jury trials: right to jury; selection/composition; requests for and objections to instructions. V Motions: pretrial motions (face of pleadings, motions to dismiss, summary judgment); JMOL; posttrial motions (relief from judgment, new trial). VI Verdicts and judgments: defaults and dismissals; jury verdicts and challenges; judicial findings; effect, claim and issue preclusion. VII Appealability and review: interlocutory review; final judgment rule; scope of review.
- **Constitutional Law.** I Nature of judicial review: federal/state courts; jurisdiction (congressional power to limit; Eleventh Amendment and state sovereign immunity); judicial review in operation (case or controversy, standing, ripeness, mootness; adequate and independent state ground; political questions). II Separation of powers: powers of Congress (commerce, taxing, spending; war/defense/foreign affairs; enforcement of 13th/14th/15th Amendments); powers of the president (chief executive and Take Care, commander in chief, treaty/foreign affairs, appointment and removal); interbranch relationships (limits on executive, presentment and veto, nondelegation, immunities). III Nation and states: intergovernmental immunities (incl. 10th Amendment); federalism limits on state authority (dormant commerce clause, Supremacy Clause and preemption, authorization of otherwise invalid state action). IV Individual rights: state action; due process (substantive: fundamental rights, other rights; procedural); equal protection (fundamental rights, heightened-scrutiny classifications, rational basis); takings; other protections (privileges and immunities clauses, contracts clause, unconstitutional conditions, bills of attainder, ex post facto); First Amendment (free exercise, establishment, content-based and content-neutral regulation, unprotected expression, commercial speech, public school students/employment/benefits, expressive conduct, prior restraint, vagueness, overbreadth, press, association).
- **Contracts.** I Formation: mutual assent (offer, acceptance, unilateral/bilateral/implied-in-fact); indefiniteness and absence of terms; consideration; obligations enforceable without bargained-for exchange (reliance, restitution); modification. II Defenses: incapacity; duress and undue influence; mistake and misunderstanding; fraud, misrepresentation, nondisclosure; illegality, unconscionability, public policy; statute of frauds. III Content and meaning: parol evidence; interpretation; omitted and implied terms. IV Performance, breach, discharge: conditions (express, constructive); excuse of conditions; breach (material, partial, anticipatory repudiation); good faith; express and implied warranties in sale of goods; other performance (cure, identification, notice, risk of loss); impossibility, impracticability, frustration; discharge (accord and satisfaction, substituted contract, novation, rescission, release). V Remedies: expectation (direct, incidental, consequential); causation, certainty, foreseeability; liquidated damages and penalties, limitation of remedies; mitigation; rescission and reformation; specific performance and injunction; reliance and restitution; remedial rights of breaching parties. VI Third-party rights: beneficiaries; assignment and delegation.
- **Criminal Law and Procedure.** I Homicide: intended killings (premeditation/deliberation, provocation); unintended (intent to injure, reckless/negligent, felony murder, misdemeanor manslaughter). II Other crimes: theft/receiving, robbery, burglary, assault and battery, rape/statutory rape, kidnapping, arson, possession offenses. III Inchoate crimes; parties (attempt, conspiracy, solicitation; accomplice liability). IV General principles: acts and omissions; state of mind (required mental state, strict liability, mistake of fact or law); responsibility (mental disorder, intoxication); causation; justification and excuse; jurisdiction. V Constitutional protection of accused: arrest, search and seizure; confessions and self-incrimination; lineups/identification; right to counsel; fair trial and guilty pleas; double jeopardy; cruel and unusual punishment; burdens of proof and persuasion; appeal and error.
- **Evidence.** I Presentation: introduction of evidence (personal knowledge, refreshing recollection, objections and offers of proof, lay opinions, competency, judicial notice, judge and jury roles, limited admissibility); presumptions; mode and order; impeachment, contradiction, rehabilitation (9 methods); proceedings to which rules apply. II Relevancy and exclusion: relevancy and Rule 403; authentication; character (admissibility, methods of proof, habit/routine practice, other crimes/acts, prior sexual misconduct of a defendant); expert testimony; real, demonstrative, experimental evidence. III Privileges and policy exclusions: spousal immunity/marital communications; attorney-client and work product; physician/psychotherapist; other privileges; insurance; remedial measures; compromise, medical payments, plea negotiations; past sexual conduct of a victim. IV Writings, recordings, photographs: original, summaries, completeness. V Hearsay: definition (what is hearsay, prior statements by witness, party-opponent statements, multiple hearsay); present sense and excited utterance; mental/emotional/physical condition; medical diagnosis and treatment; past recollection recorded; business records; public records; learned treatises; former testimony; statements against interest; other exceptions; confrontation.
- **Real Property.** I Ownership: present estates and future interests (fees simple, defeasible fees, life estates; reversions, remainders, executory interests, possibilities of reverter/powers of termination; survivorship, class gifts, waste, cy pres); cotenancy; landlord-tenant; special problems (Rule Against Perpetuities and reforms; alienability/descendibility/devisability; fair housing; conflict of laws). II Rights in real property: restrictive covenants (incl. property owners' associations, common interest communities); easements, profits, licenses; fixtures; zoning (fundamentals other than regulatory taking). III Real estate contracts: brokerage; creation and construction (statute of frauds, essential terms, time, remedies); marketability of title; equitable conversion and risk of loss; options and rights of first refusal; fitness and suitability; merger. IV Mortgages/security devices: types (mortgages/deeds of trust, installment land contracts, absolute deeds as security); security relationships; transfers by mortgagor/mortgagee; discharge; foreclosure. V Titles: adverse possession; deeds (requirements, types and covenants for title, closing documents, persons authorized); transfer by operation of law and will (ademption, exoneration, lapse); title assurance (recording acts, chain of title, hidden risks, title insurance); special problems (estoppel by deed, judgment and tax liens).
- **Torts.** I Intentional torts: harms to person (assault, battery, false imprisonment, IIED) and property (trespass to land/chattels, conversion); defenses (consent; privileges and immunities: self/others, property, parental discipline, public interests, necessity, incomplete privilege). II Negligence: duty (failure to act, unforeseeable plaintiffs, control of third parties); standard of care (reasonably prudent person, children, impaired, professionals, special classes; statutes and custom); proof of fault incl. res ipsa; causation (but-for, substantial factor, multiple causes, apportionment, joint and several liability); limitations (remote/unforeseeable/proximate/superseding cause; owners and occupiers of land; NIED and intangible injuries; pure economic loss); liability for acts of others (employees/agents, independent contractors, nondelegable duties); defenses (contributory fault, last clear chance, comparative negligence; assumption of risk). III Strict liability and products liability. IV Other torts: nuisance; defamation and invasion of privacy with constitutional limits; misrepresentation.

**Currency flags the content agents must check (not in the outline, from my own knowledge; verify):** FRE amendments effective Dec 1, 2023 (Rule 107 illustrative aids; 613(b); 801(d)(2) successors in interest; 804(b)(3); 1006 summaries; 702 reliability burden) and Dec 1, 2024 (Rule 801(d)(1)(A) prior inconsistent statements as substantive evidence; 613(b); 1006); FRCP amendments Dec 2024-2025 (Rule 16(b)/26(f) privilege-log timing, Rule 81 etc.). The outline says "as currently in effect", so the app must use the version in force on the exam date. I did not verify these in primary text in this task.

---

## 2. Scoring, scaled scores, pass rates

### 2.1 MBE scoring
Source: https://www.ncbex.org/exams/mbe/scores
- MBE reported as a **scaled score of about 40 (low) to 200 (high)**, produced by equating raw scores across test dates. "It is not possible to know in advance how many questions must be answered correctly to reach a given scaled score." NCBE does not publish a raw-to-scaled table.
- Raw-score-to-scale rules of thumb you see online (about 60-65% correct for a mid-range score) are secondary and uncertain; do not state them as facts in the app.
- Unscored pretest questions look identical, so every question must be answered.

### 2.2 Legacy UBE scoring
Source: https://ncbex.org/exams/ube/scores
- Weights: **MBE 50%, MEE 30%, MPT 20%**. Total on a **400-point scale**. "The MEE and MPT scores are scaled to the MBE and UBE total scores are calculated by NCBE." MBE scored by NCBE; jurisdictions grade MEE/MPT. Score is portable; sit all parts in one jurisdiction and administration.
- A 266 UBE score is roughly 133 per half (DERIVED: 266/2).

### 2.3 Minimum passing UBE scores (legacy)
Source: https://www.ncbex.org/exams/ube/score-portability/minimum-scores
- **260:** Alabama, Iowa (260 for July 2026 and later; 266 earlier), Minnesota, Missouri, New Mexico, North Dakota, Oklahoma, Utah
- **264:** Indiana
- **266:** Connecticut, District of Columbia, Idaho, Illinois, Kansas, Kentucky, Maryland, Montana, New Jersey, New York, South Carolina, Washington, Virgin Islands
- **268:** Michigan
- **270:** Alaska, Arizona, Arkansas, Colorado, Maine, Massachusetts, Nebraska, New Hampshire, North Carolina, Ohio, Oregon, Pennsylvania, Rhode Island, Tennessee, Texas, Vermont, West Virginia, Wyoming
- Not on that NCBE list (not UBE, or not listed): California (own cut score on its own scale), Florida, Georgia, Louisiana, Nevada, Mississippi, Delaware, Hawaii, Virginia, Wisconsin (diploma privilege), Puerto Rico. UNCERTAIN: Delaware/Virginia/Hawaii/Georgia/Wisconsin/Mississippi status not confirmed here. Each jurisdiction sets its own score and may change it; always tell the user to check their board.
- Practical: UBE 260-270 means MBE needed is roughly 130-135 on the scaled MBE if written scores are equal (DERIVED, not an NCBE statement).

### 2.4 MBE national means (NCBE news releases, primary)
- Feb 2026: **131.2**, 18,063 examinees, ~71% repeaters (https://www.ncbex.org/news-resources/national-mean-february-2026-mbe)
- July 2026: **140.7**, 44,472 examinees; down 1.7 from July 2025's **142.4** (46,959 examinees); about 76% first-timers; only 44 jurisdictions gave the legacy exam in July 2026 (https://www.ncbex.org/news-resources/ncbe-announces-national-mean-july-2026-mbe). Feb 2025 mean 130.8.
- Reading: July is the first-time-heavy sitting (higher means and pass rates); February is repeater-heavy.

### 2.5 Pass rates
- 2025 overall (NCBE, https://thebarexaminer.ncbex.org/article/spring-2026/2025-statistics/): 67,442 examinees, **63% overall**; **Feb 2025 47%** (19,645 takers); **July 2025 69%** (47,797 takers). Non-ABA grads 33% (4% of takers); foreign-educated 35% (15%).
- 2025 mean UBE scaled scores (NCBE, https://thebarexaminer.ncbex.org/2025-statistics/the-uniform-bar-examination-ube): Feb 260.0, July 285.5, overall 278.6; 41 jurisdictions used the UBE in 2025.
- First-time vs repeater, 2025 nationwide: about **76% vs 34%** (SECONDARY: Casefleet citing NCBE; I could not open NCBE's own table. Treat as approximate).
- **Inaugural NextGen, July 2026** (https://www.ncbex.org/news-resources/inaugural-nextgen-ube-results, Sept 25, 2026): 2,630 examinees with an official score, 10 jurisdictions, **mean 640.6, median 640, pass rate 72.7%** (within 4.3 points of every July national rate 2021-2025), **first-timers 85.2%, repeaters 41.0%** (NCBE warns first-time is now defined as never having taken a bar exam anywhere, so not directly comparable to prior years).
- NextGen passing scores set so far: 610 to 620 (NCBE advisory panel recommended 610-620 on 500-750, corresponding to legacy 260-270: https://www.barbri.com/resources/understanding-the-nextgen-bar-exam-recommended-passing-score-range, secondary report of the NCBE recommendation). Table values: Washington/Missouri/New Mexico/Iowa/North Dakota 610; Connecticut/Idaho/Maryland/Kentucky/DC/Montana/Virgin Islands 616; Oregon 615 (July 2026, court order) then 620; Indiana 614; Alaska/Colorado/Illinois/Maine/Massachusetts/Nebraska/New Hampshire/NC/Ohio/Pennsylvania/Rhode Island/Vermont 620; many TBA.

### 2.6 Study time
- Common advice: **400-500 hours over 8-10 weeks, about 40-50 hours per week**; part-time/working candidates 15-20 weeks at about 20 hours per week; active practice beats passive reading ("350 hours of active practice can beat 500 hours of passive review"). Source: BARBRI (https://www.barbri.com/resources/how-many-hours-do-i-need-to-study-for-the-bar-exam), JD Advising, St. Francis Law. **These are prep-company rules of thumb with no cited data**; the BARBRI page itself cites no study. Label them as such in the app ("commonly recommended").
- The brief's 8-12 week audience matches this advice.

---

## 3. Exam dates

- Rule (NCBE): MBE on the **last Wednesday of February and July**; MEE and MPT on the Tuesday before (https://www.ncbex.org/exams/ube/about-ube). NextGen: same Tuesday + last-Wednesday pairing, but only 1.5 days of testing (three 3-hour sections; which day holds two sections is UNCERTAIN, see section 5).
- **February 2027: Tuesday-Wednesday, February 23-24, 2027** (confirmed on ncbex.org home page and NextGen blueprint: "July 28-29, 2026, and February 23-24, 2027").
- **July 2027: July 27-28, 2027** (DERIVED from the last-Wednesday rule: July 28, 2027 is the last Wednesday; I did not find NCBE printing it. UNCERTAIN until NCBE confirms).
- Feb 2028 (last legacy): last Wednesday = Feb 23, 2028 (DERIVED).
- Registration deadlines and fees are set by each jurisdiction (not researched; they vary by state).
- Results: MBE national mean is published about 4-5 weeks after (Aug 28, 2025; Sept 1, 2026; March 25, 2026); jurisdictions release individual results on their own schedule.

---

## 4. MEE and MPT (legacy written parts; not part of the app's MBE focus)

### MEE
Source: https://www.ncbex.org/exams/mee, https://www.ncbex.org/exams/mee/preparing, outline https://www.ncbex.org/sites/default/files/2025-07/NCBE%20MEE%20Subject%20Matter%20Outline.pdf
- **Six 30-minute essays** (3 hours). Weighted **30%** of the UBE. Graded by each jurisdiction, with NCBE grading guidance.
- **Changed from July 2026:** "the following areas will no longer be tested on the MEE: Conflict of Laws, Family Law, Trusts and Estates, and Secured Transactions." Family Law and Trusts and Estates "will be tested regularly through the Multistate Performance Test" from July 2026 through Feb 2028.
- Current MEE subjects (8): Business Associations (Agency and Partnership; Corporations and LLCs), Civil Procedure, Constitutional Law, Contracts (incl. UCC Art. 2), Criminal Law and Procedure, Evidence, Real Property, Torts. Questions can span more than one area. Older 12+ subject lists online are out of date.
- MEE is given in 37 states plus DC; not in California, Connecticut, Delaware, Florida, Georgia, Idaho, Louisiana, Maryland, Missouri, Nevada, Oregon, Virginia, Washington or the territories (the Connecticut/Idaho/Maryland/Missouri/Oregon/Washington entries partly reflect July 2026 NextGen switchers).
- Overlap with the MBE: the same 6 MBE subjects + Business Associations. Business Associations is NOT on the MBE; it IS on the MEE and on NextGen.

### MPT
Source: https://www.ncbex.org/exams/mpt
- **Two 90-minute tasks** (3 hours), weighted **20%** of the UBE. A File (facts: interview transcripts, pleadings, contracts, police reports) and a Library (law) plus an assignment memo from a supervising attorney. Tests lawyering skills, not memorized law. Family Law and Trusts and Estates now appear here through Feb 2028.

### California and non-UBE states
California runs its own exam. It used its own multiple-choice questions in Feb 2025 (per the NCBE Feb 2026 release) and the MBE is not necessarily part of it in every sitting. UNCERTAIN, not researched; California moves to NextGen in July 2028.

---

## 5. NextGen UBE (what it is, how it differs)

Primary source: NCBE NextGen UBE Blueprint, July 2026 - February 2027 (June 2, 2025), https://www.ncbex.org/sites/default/files/2025-07/NCBE-NextGen-UBE-Blueprint_5.pdf (read in full). Content: NCBE NextGen Content Scope, July 2026 - Feb 2027 (Aug 1, 2025), https://www.ncbex.org/sites/default/files/2025-07/NCBE%20NextGen%20UBE%20Content%20Scope-Aug%202025.pdf (read; 46 pages). Overview: https://www.ncbex.org/exams/nextgen.

**Structure.** Fully computer-based on the examinee's own laptop in a secure browser. **Three 3-hour sections over 1.5 days** (day 1 = the Tuesday, day 2 = the last Wednesday of Feb/July). UNCERTAIN which day has two sections: the blueprint's extracted schedule graphic reads Tuesday morning / Wednesday morning / Wednesday afternoon, while a secondary summary of an NCBE help article says two sections on day one and one on day two. Nine hours total vs 12 hours over 2 days for the legacy UBE. Questions within a section can be done in any order. Each section: **40 standalone multiple-choice + 2 integrated question sets + 1 performance task**. Totals: 120 standalone MCQs, 6 integrated sets, 3 performance tasks. Pretest: 20 of the 120 MCQs and 1 of 6 integrated sets are unscored and unlabeled; performance tasks are pretested separately.

**Score weights.** Standalone MCQ **49%**, integrated question sets **21%**, performance tasks **30%**. Standalone MCQs: select-one-of-four (0-1 pt) and **select-two-of-six (0-2 pts, partial credit)**; about 1.8 min each. Integrated sets: about 24 min each; drafting sets (medium-answer, 0-8) and counseling sets (MCQ + short answer). Performance tasks: about 60 min each; standard (one longer writing, 0-24) or legal-research format. Written parts graded by jurisdiction graders on NCBE rubrics, dual graded; all scaling/equating by NCBE.

**Score scale.** Single score **500-750**, portable; each jurisdiction sets its passing score (see 2.5). No separate component scores.

**What is tested.** Eight Foundational Concepts and Principles, "in approximately equal numbers" among the standalone MCQs: **Business Associations (incl. agency), Civil Procedure, Constitutional Law, Contracts, Criminal Law and Constitutional Protections of Accused Persons, Evidence, Real Property, Torts**. Family Law is added to this list starting July 2028. So **standalone MCQs are about 15 per concept** (120 / 8, with the unscored 20 included) (DERIVED). Seven Foundational Skills: legal research, legal writing and drafting, issue spotting and analysis, investigation and evaluation, client counseling and advising, negotiation and dispute resolution, client relationship and management. Family law and trusts and estates appear on every exam July 2026 to Feb 2028, but only in skills questions with the law provided (no memorization required).

**What changes versus the MBE.**
1. **Business Associations is added** (not on the MBE). This is the main new doctrinal subject. Agency and authority, vicarious liability, general partnerships, corporations and LLCs formation, promoters, fiduciary duties, etc. (Content Scope outline pp. 6-9).
2. **Professional responsibility appears only as selected ABA Model Rules** inside integrated question sets: Rules 1.0, 1.1, 1.2(a) and (d), 1.3, 1.4, 1.6(a) and (c), 1.7, 3.1, 3.3(a)(1)-(2), 4.1, 4.2, 4.3; "recalled knowledge", no comments, "not assessed in the sections ... consisting of standalone multiple-choice questions". (BARBRI lists "Professional Responsibility" as a ninth concept; NCBE's own blueprint does not, so follow NCBE.)
3. **Starred vs unstarred topics:** starred topics must be answered from recalled knowledge with no legal resources; unstarred topics may come with statutes/cases provided. A smaller memorization load than the MBE, more applying provided law.
4. **Select-two-of-six MCQs and written/skills items** replace pure four-option recall.
5. Content scope notes at the start of each concept say that "Where the applicable law is noted in this outline, that law is controlling." Contracts begins with "Identification of governing law": common law vs UCC Article 2 vs hybrid (UCC 2-102).
6. The NextGen content scope is about doctrine that overlaps heavily with the MBE for the 7 shared subjects; the Content Scope for Feb 2027 is the same document as for July 2026 (updates to the scope are published at least a year ahead). The Aug 2025 update starred more topics and added detail (https://www.ncbex.org/news-resources/ncbe-publishes-official-examinees-guide-and-updated-content-scope-nextgen-ube).
7. Optional state-specific component in some jurisdictions (https://www.barbri.com/resources/breaking-down-the-nextgen-ube, secondary).

**First results (July 2026):** mean 640.6, pass rate 72.7% overall, 85.2% first-time, 41.0% repeaters (see 2.5). 3,318 registered, 2,640 submitted; a venue problem in Washington (Yakima) cancelled testing for about 645 applicants (make-up Sept 1-2).

---

## 6. Implications for the Objection app

1. **Primary target: the legacy MBE for Feb and July 2027** (200 Qs, 175 scored, 25 per subject, 6 hours, 4 choices, best answer). Use the 7 subjects as the unit spine, each with the 2/3-1/3, half-half, quarter weights from the outline for how many lessons/drills. Exam-style timing: 1.8 min per question. Mock exam = 100 questions in 180 min, or a full 200 in 360 min.
2. **Weighting in the daily drill and mock** should mirror the official fractions only where NCBE gave them (see table). Do not create frequencies by topic that NCBE did not publish. If tagging "high-yield", base it on NCBE's own fractions (e.g., Constitutional Law individual rights ~half of Con Law; Criminal procedure ~half of Crim; negligence ~half of Torts; hearsay ~1/4 of Evidence; UCC ~1/4 of Contracts; Civ Pro I, III, V ~2/3).
3. **A "NextGen bridge" track** (optional, later): Business Associations unit; the select-two-of-six format; the Model Rules list; skills-flavored items (issue spotting, counseling). About 22 jurisdictions will be NextGen by July 2027. 7 of NextGen's 8 concepts match the MBE subjects, so a MBE-first app is about 7/8 of the way there for those states. Flag clearly that Objection is MBE practice and that NextGen also has written and skills parts that need other practice.
4. **Content to keep out:** MEE-only subjects dropped in 2026 (Conflict of Laws, Family Law, Trusts and Estates, Secured Transactions). Only touch Family Law and Trusts and Estates if a bridge track covers MPT/skills.
5. **Currency rules:** Evidence = current FRE; Civil Procedure = current FRCP + Title 28; Contracts = official UCC Arts 1-2; Torts = pure comparative fault and joint and several liability unless the fact pattern says otherwise; Con Law = federal. State these assumptions on the first screen of each unit, because the exam does.
6. **Numbers safe to show users** (all from primary sources above): 200/175/25, 25 per subject, 6 hours, 40-200 MBE scale, 400-point UBE scale (50/30/20), national means (131.2 Feb 2026, 140.7 July 2026), 2025 pass rates (47% Feb, 69% July, 63% overall), NextGen 500-750 and July 2026 pass rate 72.7%. Show "400-500 hours / 8-10 weeks" only as "commonly recommended by prep companies".
7. **Dates in the countdown:** Feb 23-24, 2027 (confirmed); July 27-28, 2027 (derived; show as "July 28, 2027 (MBE day), confirm with your board").

---

## 7. Open questions / things not verified

- NextGen in the 2027 jurisdictions: whether candidates there get a choice of legacy exam (they cannot after the switch; before the switch the legacy exam is the only one).
- West Virginia July 2027 vs July 2028 (conflict above).
- Exact July 2027 and Feb 2028 dates (derived).
- Official first-time pass rate for legacy 2025 (only secondary: 76%/34%).
- MBE raw-to-scaled approximations (NCBE publishes none).
- California exam composition in 2027.
- FRE/FRCP amendment currency (not checked in primary text here).
- NCBE MBE outline is the 2020 text; no 2026-27 revision found, but NCBE's outline page might be updated without notice.

## 8. Source list

NCBE primary:
- https://www.ncbex.org/exams/mbe (format, 175/25, 6 hours)
- https://ncbex.org/exams/mbe/preparing (25 per subject, scoring rules)
- https://www.ncbex.org/sites/default/files/2023-01/MBE_Subject_Matter_Outline.pdf (full outline, 2020 text)
- https://www.ncbex.org/exams/mbe/scores (40-200 scale, equating)
- https://ncbex.org/exams/ube/scores (50/30/20, 400 points)
- https://www.ncbex.org/exams/ube/about-ube (schedule rule, 35 UBE jurisdictions on that page; the 2025 statistics page says 41, pages conflict, UNCERTAIN)
- https://www.ncbex.org/exams/ube/score-portability/minimum-scores
- https://www.ncbex.org/exams/mee and https://www.ncbex.org/exams/mee/preparing and the MEE outline PDF
- https://www.ncbex.org/exams/mpt
- https://www.ncbex.org/exams/nextgen, https://www.ncbex.org/exams/nextgen/content-scope, https://www.ncbex.org/exams/nextgen-july-2026
- NextGen Blueprint PDF: https://www.ncbex.org/sites/default/files/2025-07/NCBE-NextGen-UBE-Blueprint_5.pdf
- NextGen Content Scope PDF: https://www.ncbex.org/sites/default/files/2025-07/NCBE%20NextGen%20UBE%20Content%20Scope-Aug%202025.pdf
- https://www.ncbex.org/exams/nextgen-ube/scores-score-portability/nextgen-ube-decisions-jurisdiction
- https://reports.ncbex.org/charts/chart-17/
- https://www.ncbex.org/news-resources/ten-jurisdictions-complete-inaugural-administration-nextgen-UBE
- https://www.ncbex.org/news-resources/inaugural-nextgen-ube-results
- https://www.ncbex.org/news-resources/ncbe-announces-national-mean-july-2026-mbe
- https://www.ncbex.org/news-resources/national-mean-february-2026-mbe
- https://www.ncbex.org/news-resources/ncbe-announces-national-mean-july-2025-mbe
- https://thebarexaminer.ncbex.org/article/spring-2026/2025-statistics/
- https://thebarexaminer.ncbex.org/2025-statistics/the-uniform-bar-examination-ube
Secondary (labeled in text): BARBRI (study hours, NextGen breakdown, recommended passing range), JD Advising, Casefleet (first-time/repeater 2025), UWorld, Kaplan, ABA Journal (July 2026 MBE, NextGen results).
