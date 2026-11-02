# Criminal Law and Procedure on the MBE: research for "Objection"

Researched 2026-11-02. Exam dates (official): MBE Wednesday **February 24, 2027** and **July 28, 2027** [V] https://www.ncbex.org/exams/mbe . Scope: the "Criminal Law and Procedure" subject of the Multistate Bar Examination (MBE), for a US law graduate sitting in February 2027 or July 2027.

**Copyright rule followed:** every fact pattern, rule statement and explanation below is my own, written from primary law (Supreme Court decisions, the Model Penal Code, common-law doctrine) and open sources. No NCBE released question and no Barbri/Themis/Kaplan text is copied. I downloaded NCBE's free public sample-question PDF only to learn how stems are phrased (it is kept in the session scratchpad, not in the repo). Nothing from it is reproduced.

## 0. How to read the confidence marks

- **[V]** = I opened the source in this session and the page said it (URL given).
- **[K]** = settled doctrine / a Supreme Court holding I know well, written from knowledge of the primary law, not re-opened this session. Case names are given so a content writer can check the opinion on law.cornell.edu/supremecourt or Justia.
- **[?]** = uncertain, split between jurisdictions, or only seen in a secondary source. Do not put a [?] item in the app as a bare fact without checking.
- Anything about the **Model Penal Code (MPC) text** is [K] cross-checked against secondary snippets only (the ALI text is paywalled; no free official copy found). Verify wording against the ALI Code before quoting section text.

---

## 1. What is actually tested in 2027

### 1.1 Format and weight (official)

- MBE = 200 multiple-choice questions, 175 scored + 25 unscored pretest, 6 hours, 100 questions per 3-hour session. [V] https://www.ncbex.org/exams/mbe
- Seven subjects, **25 scored questions each** (Civil Procedure, Constitutional Law, Contracts, Criminal Law and Procedure, Evidence, Real Property, Torts). [V] https://www.ncbex.org/exams/mbe/preparing
- Official directions: choose the single best answer of four; "Each question on the MBE is designed to be answered according to generally accepted fundamental legal principles" unless the question says otherwise. [V] https://www.ncbex.org/exams/mbe/preparing-mbe
- NCBE does **not** publish an instruction to assume common law or the MPC. The stem says so when it matters. NCBE's own free sample item for this subject begins its call with a sentence of the type "The jurisdiction defines crimes as at common law." [V] https://www.ncbex.org/sites/default/files/2025-06/MBE%20Sample%20Test%20Questions.pdf (I read the stem style; I am not reproducing the item). **Design consequence for the app:** teach common law / majority rule as the default, flag the MPC difference as a labelled "MPC twist" card, and put "The jurisdiction defines X as at common law" style preambles into our prompts so students learn to read them.
- **Subject Matter Outline (official, 2020 copyright, file dated Jan 2023).** The note says approximately **half of the Criminal Law and Procedure questions are on category V** (constitutional protection of accused persons) and approximately half on I-IV combined. The outline also says it "is not intended to list every aspect of a topic" and not every topic is tested on every exam. [V] https://www.ncbex.org/sites/default/files/2023-01/MBE_Subject_Matter_Outline.pdf (text extracted from the PDF)

Official outline, reproduced as a structure (headings are facts, not creative text):

```
I.   Homicide
     A. Intended killings: 1 premeditation, deliberation; 2 provocation
     B. Unintended killings: 1 intent to injure; 2 reckless and negligent killings;
        3 felony murder; 4 misdemeanor manslaughter
II.  Other crimes
     A theft and receiving stolen goods; B robbery; C burglary; D assault and battery;
     E rape; statutory rape; F kidnapping; G arson; H possession offenses
III. Inchoate crimes; parties
     A inchoate offenses: 1 attempts; 2 conspiracy; 3 solicitation;  B parties to crime
IV.  General principles
     A acts and omissions; B state of mind: 1 required mental state, 2 strict liability,
     3 mistake of fact or law; C responsibility: 1 mental disorder, 2 intoxication;
     D causation; E justification and excuse; F jurisdiction
V.   Constitutional protection of accused persons
     A arrest, search and seizure; B confessions and privilege against self-incrimination;
     C lineups and other forms of identification; D right to counsel;
     E fair trial and guilty pleas; F double jeopardy; G cruel and unusual punishment;
     H burdens of proof and persuasion; I appeal and error
```

- **Unofficial split of the 25** (not from NCBE): one test-prep site says roughly 12-13 questions are category V and about 3-4 each for the other four groups. [V as a claim by the site; method not disclosed] https://jdadvising.com/criminal-law-and-procedure-on-the-mbe-key-topics/ . It is consistent with the official "about half is V", but the 3-4 each is an inference by that site. **Do not present per-topic frequencies as NCBE data.** Another page by the same site gives no counts or method (https://jdadvising.com/criminal-law-and-procedure-highly-tested-mbe-topics-charts-and-a-checklist/), so I did not use any "highly tested topic" frequency chart. If we want frequency, we must count NCBE-released questions ourselves later (they cannot go in git).
- Practical weighting for unit design: category V (search and seizure, Miranda, counsel, pleas, double jeopardy, etc.) deserves about half of all content and half of the daily drill.

### 1.2 NextGen: what candidates really sit in 2027 (official)

- NCBE says the current ("legacy") bar exam (MBE, MEE, MPT) "will remain available to jurisdictions through the February 2028 administration"; the NextGen UBE is the replacement. [V] announcement dated Oct 25, 2023: https://www.ncbex.org/news-resources/update-nextgen-exam-content-extends-availability ; legacy UBE described as "administered through February 2028": https://www.ncbex.org/exams/nextgen/nextgen-ube-scores-score-portability/nextgen-ube-adoption-jurisdiction
- **First NextGen administration: July 2026**, 10 jurisdictions (Connecticut, Guam, Idaho, Maryland, Missouri, Northern Mariana Islands, Oregon, Palau, US Virgin Islands, Washington); 2,640 examinees completed it. [V] NCBE press release dated July 31, 2026: https://www.ncbex.org/news-resources/ten-jurisdictions-complete-inaugural-administration-nextgen-UBE
- **First-administration dates by jurisdiction** [V] https://reports.ncbex.org/charts/chart-17/ and the adoption page above:
  - July 2026 (10): the list above.
  - **February 2027: no jurisdiction is listed as a new NextGen starter.**
  - **July 2027 (12): Arizona, Iowa, Kentucky, Minnesota, Nebraska, New Mexico, North Dakota, Oklahoma, South Dakota, Tennessee, Vermont, Wyoming.** (One search summary of an NCBE page said 14 more and listed West Virginia in 2027; the chart and adoption page say West Virginia is July 2028. Treat West Virginia as July 2028 but [?].)
  - February 2028 (4): Delaware, DC, Illinois, Montana.
  - July 2028 (25): Alabama, Alaska, California, Colorado, Florida, Georgia, Hawaii, Indiana, Kansas, Maine, Massachusetts, Michigan, New Hampshire, New Jersey, New York, North Carolina, Ohio, Pennsylvania, Rhode Island, South Carolina, **Texas**, Utah, Virginia, West Virginia, Wisconsin. Mississippi: TBA.
  - New York and Florida will not accept NextGen score transfers from exams before July 2028.
- **Consequence for "Objection":** For February 2027 and July 2027, the MBE is still what most candidates sit, including Texas, New York, California and Florida (all July 2028 for NextGen). Jurisdictions that adopted NextGen in 2026 or July 2027 (roughly 22 of 52) no longer give the MBE to first-time takers from their start dates. I did not find a statement about whether a July-2026 NextGen jurisdiction still offers a legacy MBE sitting in Feb 2027 to repeaters [?]. **The product should target the MBE for 2027 and offer a clearly separate "NextGen" mode for the later cohort.**
- **NextGen criminal content (official):** the subject is "criminal law and constitutional protections of accused persons", listed as a foundational concept for July 2026 through February 2028 and for July 2028. [V] https://ncbex.org/exams/nextgen/content-scope and the content-scope PDF https://www.ncbex.org/sites/default/files/2025-07/NCBE%20NextGen%20UBE%20Content%20Scope-Aug%202025.pdf (text extracted). Differences that matter if we ever add a NextGen mode:
  1. "Elements of crimes and defenses will be tested on the basis of provided statutes" (so NextGen is statute-reading, not memorising common-law definitions).
  2. "Examinees should answer questions based on protections provided by the US Constitution only" (NextGen's constitutional-protection section).
  3. Topics marked with a star are tested from memory, without legal resources; unmarked topics may come with resources.
  4. Topics named in the NextGen outline text I could extract: voluntariness, omission as an act, possession as an act; intent or purpose; criminal negligence; defenses including voluntary and involuntary intoxication, lethal and nonlethal threat, stand-your-ground, duty to retreat, castle doctrine, initial aggressor, defense of others; jurisdiction; burdens of proof and persuasion (suspicion, probable cause, proof beyond a reasonable doubt, prosecution and defense burdens, right to present evidence); statutory crimes (homicide levels, felony murder, vehicular manslaughter, theft, burglary, robbery, possession crimes); conspiracy elements and coconspirator liability; accomplices and accessories before and after the fact; search (reasonable expectation of privacy, warrant requirement and exceptions listed as search incident to arrest, automobile, plain view, consent, stop-and-frisk, hot pursuit, exigent circumstances, community caretaking, knock-and-announce, border, inventory, airport, checkpoints), exclusionary rule and exceptions (fruits, independent source, inevitable discovery, good faith, knock-and-announce, impeachment), Miranda and Sixth Amendment counsel, and more. My text extraction of the tables was partial (the PDF is table-heavy), so [?] for anything not listed above. Interesting for us: NextGen explicitly lists **community caretaking** and **stand your ground / duty to retreat / castle doctrine** by name.
- Conclusion: **the MBE substantive criminal law the app teaches is common law plus the majority modern rule, with MPC deviations flagged.**

### 1.3 Reality check on "common law vs MPC" for the MBE

- No NCBE statement tells examinees to use the MPC. A test-prep source says the MBE focuses almost exclusively on common-law rules in criminal law and rarely tests the MPC [secondary only; it did not cite NCBE]. [?] https://open-exam-prep.com/study-guides/mbe/mbe-intro/about-mbe . In practice (my knowledge, [K]): the MPC matters in three places where the majority of modern state statutes follow it: (1) the "substantial step" test for attempt, (2) the unilateral approach to conspiracy / renunciation in some statutes, and (3) the culpability vocabulary (purposely, knowingly, recklessly, negligently) used in questions that say "under the Model Penal Code". If the stem does not say, answer under the common law / majority rule.
- Do not teach state-specific law as tested. Where states split (retreat, premeditation timing, words as provocation, merger doctrine, felony-murder causation), the MBE stem usually states the rule; the app should present the split as "if the stem says X, then Y".

---

## 2. Question format used below

Each question is my own. "Best answer" plus why the other three are wrong (the app's explanation screen and the "mistakes notebook" can reuse this). Unless the stem says otherwise: common law / majority rule. Ids (HOM-1, etc.) are for the content writers.

---

# PART A. SUBSTANTIVE CRIMINAL LAW

## 3. Homicide (outline I)

### 3.1 Rules [K unless marked]

- **Common-law murder** = unlawful killing of a human being with **malice aforethought**. Four kinds of malice: (1) intent to kill, (2) intent to inflict serious bodily harm, (3) "depraved heart" (extreme recklessness, conscious disregard of a very high risk to human life, "abandoned and malignant heart"), (4) felony murder (intent to commit a dangerous felony in which a death results). No malice = manslaughter (or no crime).
- **Degrees (statutory, majority of states):** first-degree = premeditated and deliberate intentional killing, plus poison, lying in wait, torture, and (usually) killings in perpetrating enumerated felonies (burglary, arson, rape, robbery, kidnapping: "BARK"); second-degree = every other murder. Premeditation = the defendant actually thought about the killing beforehand; deliberation = cool, reflective weighing. Length of time: jurisdictions split on whether "a moment" is enough. Courts look at planning, motive, manner (e.g., buying a weapon, lying in wait, a calm demeanour afterwards). The stem will show the planning. [?] on exact time requirement; teach "evidence of planning / time to reflect = first degree; sudden quarrel = not".
- **Voluntary manslaughter** = intentional killing mitigated by **adequate provocation** ("heat of passion"). Four requirements: (1) provocation that would arouse sudden and intense passion in a reasonable person (categories: serious battery or assault, mutual combat, an illegal arrest, discovery of spouse in the act of adultery, threat of deadly force); (2) the defendant was actually provoked; (3) not enough time for a reasonable person to cool off ("cooling time"); (4) the defendant did not actually cool off. **Words alone** are traditionally not adequate. Heat of passion never is a complete defense: it reduces murder to manslaughter. Burden: the state may not put the burden on the defendant to disprove the mitigation where it negates malice (Mullaney v. Wilbur, 1975; Patterson v. New York, 1977). "Imperfect self-defense" (honest but unreasonable belief in need for deadly force) reduces to voluntary manslaughter in a minority of states [?].
- **MPC twist:** the Code merges these into "extreme mental or emotional disturbance for which there is reasonable explanation or excuse" (MPC 210.3(1)(b)): no required "sudden" provocation, no categories, judged from the viewpoint of a person in the actor's situation as he believes it to be. MPC murder = purposely or knowingly, or recklessly under circumstances manifesting **extreme indifference to the value of human life**; reckless killing = manslaughter; **negligent homicide** is a separate lesser crime. [K; secondary checks only]
- **Involuntary manslaughter** = unintentional killing by **criminal (gross) negligence** (a gross deviation from reasonable care; most states: recklessness, MPC: recklessness) or by an **unlawful act** ("misdemeanor-manslaughter"; usually requires a malum in se or inherently dangerous misdemeanor or an act that causes the death; a mere regulatory violation unrelated to the death is not enough). **Vehicular homicide** is statutory.
- **Felony murder:** a killing in the course of committing or attempting a felony is murder, without proof of malice toward the victim. Limits: (a) the felony must be dangerous in the abstract or in the manner committed (list states: enumerated felonies only); (b) **merger doctrine**: a felony that is an integral part of the killing (assault, aggravated assault, manslaughter) cannot be the predicate; (c) death must be caused during the felony, including **immediate flight** until the felons reach a place of temporary safety ("res gestae"); (d) **agency rule (majority)**: the killing must be by a felon or accomplice in furtherance; a death caused by a victim, police or bystander is not felony murder, although the felons can be liable for murder under a "provocative act" theory in many states; the minority proximate-cause rule (Commonwealth v. Redline contrasted with Taylor) would impose liability for foreseeable resistance deaths; (e) the predicate must be a felony other than the killing; a defense to the felony (e.g., no intent because of claim of right) is a defense to felony murder; (f) killing of a co-felon by the victim is not felony murder in most states. **Eighth Amendment:** death penalty for a non-triggerman requires major participation plus reckless indifference (Enmund v. Florida, 1982; Tison v. Arizona, 1987). [V for Enmund/Tison: https://www.law.cornell.edu/wex/felony_murder_rule ; merger/co-felon exceptions mentioned there too]
- **MPC twist on felony murder:** no felony-murder rule; instead a **presumption** of recklessness and extreme indifference when the actor commits or flees from robbery, rape, arson, burglary, kidnapping or felonious escape (MPC 210.2(1)(b)). [K, from memory of the Code; flagged in a search as needing verification against the ALI text]
- **Traps:** (1) treating anger as the same as lack of premeditation; (2) forgetting cooling time; (3) believing "intent to scare" prevents murder (depraved heart); (4) using felony murder when the felony is assault (merger); (5) applying felony murder to a victim-killed co-felon under the agency rule; (6) forgetting that felony murder needs no mens rea for the death but needs the felony's mens rea.
- **Leading cases (for the "case match" card type, not tested by name):** Mullaney v. Wilbur (1975); Patterson v. New York (1977); Enmund (1982); Tison (1987). Casebook cases useful as memory hooks: People v. Ireland (merger), Commonwealth v. Redline (agency rule/ safe haven), State v. Forrest / Commonwealth v. Carroll (premeditation), Girouard v. State (words), Maher v. People (provocation).

### 3.2 Questions

**HOM-1 (premeditation).** A business owner learned on Monday that his partner had been skimming profits. Over two days he told a friend, "He's going to pay for this," bought a handgun, and learned when the partner got home each evening. On Wednesday night he waited in the dark beside the partner's garage and shot him as he stepped out of his car. The partner died. The jurisdiction defines first-degree murder as an intentional, premeditated and deliberate killing, and second-degree murder as any other murder.
Of what crime is the owner most likely guilty?
(A) First-degree murder, because he reflected on the killing and carried out a plan.
(B) Second-degree murder, because his intent to kill was formed out of anger.
(C) Voluntary manslaughter, because the discovery of the skimming was adequate provocation.
(D) Involuntary manslaughter, because he acted recklessly toward the partner's life.
**Best answer: A.** Buying the weapon, studying the routine and lying in wait show time to reflect and a plan. B: anger does not rule out deliberation. C: learning of a financial wrong two days earlier is not legally adequate provocation and he had time to cool. D: he intended to kill.

**HOM-2 (cooling time).** A man came home early and found his wife in bed with a neighbor. He walked out, drove calmly around the block for two hours, then went back inside and shot the neighbor, who was still in the house. Common law applies.
Of what crime is the man most likely guilty?
(A) Voluntary manslaughter, because discovering a spouse in adultery is adequate provocation.
(B) Voluntary manslaughter, because he was in fact enraged when he fired.
(C) Murder, because a reasonable person would have cooled off in two hours.
(D) Involuntary manslaughter, because the killing was not premeditated.
**Best answer: C.** Cooling time is judged objectively. A: the provocation category is adequate, but the passion test also requires no time to cool. B: actual passion is necessary, not sufficient. D: he intended to kill, so involuntary manslaughter is wrong.

**HOM-3 (words alone).** In a bar, a stranger insulted a man's family and called him a coward. The stranger never touched him. The man stood up, pulled a knife and stabbed the stranger, who died. Common law applies.
Of what crime is the man most likely guilty?
(A) Murder, because mere words are not adequate provocation.
(B) Voluntary manslaughter, because the insult in fact enraged him.
(C) Voluntary manslaughter, because killing in response to an insult is the classic heat of passion.
(D) No homicide, because he acted in the heat of passion.
**Best answer: A.** The traditional rule is that words alone do not suffice (the MPC's extreme emotional disturbance test is more flexible, but the stem says common law). B and C ignore the adequacy requirement. D: passion mitigates, it does not excuse.

**HOM-4 (provocation and transferred intent).** A man was punched in the face by a patron in a bar. Enraged, he grabbed a bottle and threw it at the patron intending to kill him. The bottle missed and struck the bartender, who died. A reasonable person would have been provoked by the punch.
Of what crime is the man most likely guilty in the bartender's death?
(A) Voluntary manslaughter, because his intent, and the mitigating provocation, transfer to the bartender.
(B) Murder, because the bartender did not provoke him.
(C) Involuntary manslaughter, because he did not intend the bartender's death.
(D) No homicide, because the bartender was not his intended victim.
**Best answer: A.** Transferred intent carries the mitigation with it. B: provocation is judged by the situation, not the victim's identity. C: he did intend to kill, so this is voluntary manslaughter. D: transferred intent applies.

**HOM-5 (intent to inflict serious harm).** A man, furious at a former friend, beat him repeatedly on the legs with a baseball bat, intending only to cripple him. The friend bled internally and died. The jurisdiction has no degree statute and uses common-law definitions.
Of what crime is the man most likely guilty?
(A) Murder, because intent to inflict serious bodily harm is malice.
(B) Voluntary manslaughter, because he did not intend to kill.
(C) Involuntary manslaughter, because death was unintended.
(D) Battery only, because he did not intend death.
**Best answer: A.** Malice includes intent to cause serious bodily harm. The others treat intent to kill as the only malice.

**HOM-6 (depraved heart).** Annoyed by a noisy crowd gathered outside his apartment, a man fired several rifle shots out of his window toward the crowd, intending only to frighten people. One bullet killed a bystander. Common law applies.
Of what crime is the man most likely guilty?
(A) Murder, because he acted with extreme recklessness toward human life.
(B) Voluntary manslaughter, because he acted in anger.
(C) Involuntary manslaughter only, because he did not intend to kill or hurt anyone.
(D) No homicide, because he lacked intent to kill.
**Best answer: A.** Depraved-heart murder. B: anger is not adequate provocation, and he gave no provocation facts. C: this is far more than gross negligence. D: malice does not require intent to kill.

**HOM-7 (criminal negligence).** A babysitter filled a bath for a two-year-old, left the room for fifteen minutes to watch the end of a television show, and the child drowned. The jurisdiction defines involuntary manslaughter as a killing caused by criminal negligence.
Which is the most serious crime of which the babysitter can be convicted?
(A) Involuntary manslaughter, because she grossly deviated from reasonable care.
(B) Murder, because she disregarded an extreme risk to life.
(C) Voluntary manslaughter, because she consciously left the child.
(D) No homicide, because she did not intend any harm.
**Best answer: A.** Leaving a toddler alone in water is gross negligence. B: nothing shows she was aware of an extreme risk of death or acted with indifference. C: no provocation, no intent to kill. D: criminal negligence is enough for involuntary manslaughter.

**HOM-8 (misdemeanor-manslaughter).** A man whose driver's license had expired was driving carefully at the speed limit when a pedestrian ran into the street from between parked cars and was killed. Nothing the man could have done would have avoided the collision. He is charged with involuntary manslaughter on a misdemeanor-manslaughter theory based on driving without a valid license.
Should he be convicted?
(A) Yes, because any death during a misdemeanor is manslaughter.
(B) Yes, because driving without a license is malum in se.
(C) No, because the licensing violation did not cause the death.
(D) No, because misdemeanor-manslaughter requires intent to kill.
**Best answer: C.** The unlawful act must be a cause of death, and a paperwork violation is not dangerous in itself. A and B state the rule too broadly. D confuses with murder.

**FM-1 (agency rule).** Two men robbed a store at gunpoint. The clerk pulled a pistol and shot and killed one robber. The surviving robber is charged with felony murder of his partner. The jurisdiction follows the majority agency rule.
Is the surviving robber guilty of felony murder?
(A) Yes, because the death occurred during a robbery.
(B) Yes, but only if he intended his partner's death.
(C) No, because the killing was not committed by the felons or in furtherance of the robbery.
(D) No, because he cannot be convicted of any crime arising from the incident.
**Best answer: C.** The surviving robber is still guilty of robbery (D is wrong). A applies the minority proximate-cause approach.

**FM-2 (flight).** Two men robbed a bank and sped away. Three blocks and one minute later, the getaway driver ran a red light at 80 mph and killed a pedestrian. Both robbers are charged with felony murder.
Are they guilty?
(A) Yes, because the death occurred during immediate flight from the robbery.
(B) Yes, but only the driver, who caused the death.
(C) No, because the robbery was complete when they left the bank.
(D) No, because they did not intend the pedestrian's death.
**Best answer: A.** The felony continues through immediate flight until the felons reach a place of temporary safety; the passenger is liable as a co-felon (B wrong). C and D are the traps.

**FM-3 (safe haven).** After robbing a jewelry store, two men drove to a rented hideaway and divided the proceeds. Three hours later they argued over the split and one shot and killed the other. The shooter is charged with felony murder.
Is a felony-murder conviction proper?
(A) Yes, because the shooting arose out of the robbery's proceeds.
(B) Yes, because any killing by a robber after a robbery is felony murder.
(C) No, because the robbery had ended and the killing was not in the course of it.
(D) No, because felony murder never applies to killings between co-felons.
**Best answer: C.** The felons reached temporary safety. (The shooter may still be liable for murder or manslaughter under ordinary rules.) D overstates: the rule is about the killing's connection to the felony, not victim identity alone.

**FM-4 (merger).** A man severely beat his wife with a belt buckle intending to hurt her badly. She died. The prosecutor charges felony murder, using aggravated assault as the underlying felony.
Can a felony-murder theory be sustained?
(A) Yes, because aggravated assault is an inherently dangerous felony.
(B) No, because the assault merges into the homicide.
(C) No, because felony murder applies only to killings of strangers.
(D) Yes, because he intended to commit a felony.
**Best answer: B.** Merger doctrine bars using an assault that is integral to the killing as the predicate. (The prosecutor may still prove ordinary murder based on intent to inflict serious bodily harm.) A and D ignore merger.

**FM-5 (eggshell victim).** A man pointed an unloaded-looking gun at a 78-year-old store clerk and demanded the cash. The clerk handed it over, then collapsed and died of a heart attack brought on by the fright. The jurisdiction recognises felony murder for robbery.
Is the man guilty of felony murder?
(A) Yes, because the death was caused by the robbery and the victim's fragility is no defense.
(B) No, because he did not intend to kill.
(C) No, because the robbery was complete when the clerk handed over the money.
(D) No, because the cause of death was a preexisting heart condition.
**Best answer: A.** The robber takes the victim as he finds her. B: felony murder needs no intent to kill. C: the death followed immediately; the felony was still in progress. D: eggshell-victim rule.

---

## 4. Other crimes (outline II)

### 4.1 Rules [K unless marked]

- **Larceny** = trespassory taking and carrying away (any movement) of personal property of another with intent to permanently deprive. Variants: **continuing trespass**; **larceny by trick** (consent to possession obtained by fraud, title does not pass); **custody vs possession** (an employee or servant with mere custody who converts commits larceny; a bailee with possession commits embezzlement); finder of lost property commits larceny if, when he picks it up, he intends to keep it and has reason to know the owner can be found. **Intent to permanently deprive** is lacking when the defendant means to return the thing within a short time, with no substantial risk of loss; or when he honestly believes the property is his (**claim of right**, even an unreasonable belief, because larceny is a specific-intent crime).
- **Embezzlement** = fraudulent conversion of property of another by one lawfully in possession.
- **False pretenses** = obtaining **title** to property of another by a knowingly false statement of past or existing fact, with intent to defraud. Larceny by trick vs false pretenses turns on whether title or only possession passed.
- **Receiving stolen property** = receiving possession or control of stolen property, knowing it was stolen, intending to deprive the owner. Property recovered by police is no longer "stolen"; the buyer in a sting is not guilty of receiving but is guilty of **attempt** (factual impossibility is no defense) [K; majority].
- **MPC twist:** consolidated theft (MPC 223.1) merges larceny, embezzlement, false pretenses.
- **Robbery** = larceny from the person or presence of another by force or by intimidation (fear of immediate bodily harm) used to take the property. Taking by sneak or pickpocket = larceny only. A threat of **future** harm is **extortion** (blackmail), not robbery. A fake gun can still cause reasonable fear. "Presence" = within the victim's reach or control, including a different room.
- **Burglary (common law)** = **breaking and entering** the **dwelling** of **another** at **night** with intent to commit a felony therein. Breaking = creating or enlarging an opening (opening a closed door, even unlocked; constructive breaking by fraud or threat); entry = any part of body or instrument (instrument counts only if used to commit the felony). Intent must exist **at the time of entry**. **Modern statutes** drop night, dwelling and breaking: unlawful entry into any building or structure with intent to commit a felony or theft. Consent to enter (including a guest) defeats entry unless the consent is obtained fraudulently/limited by scope depending on the statute [?].
- **Arson (common law)** = malicious burning of the **dwelling of another**. "Burning" requires some charring; smoke damage or scorching is not enough. Malice = intent or reckless disregard of an obvious risk; negligence is not enough. Modern statutes cover any structure and one's own property (insurance fraud). Burning one's own house is not common-law arson but may be arson as to a neighbor's house that burns with reckless disregard.
- **Assault** = (1) attempted battery (specific intent to batter), or (2) intentionally placing another in reasonable apprehension of immediate bodily harm. **Battery** = unlawful application of force to the person of another resulting in bodily injury or offensive touching. Mens rea: intent or criminal negligence (recklessness); ordinary civil negligence is not enough. Words alone are not an assault; apparent ability suffices (a victim does not need to know the weapon is unloaded).
- **Rape** (modern, gender-neutral) = sexual penetration without consent, accomplished by force, threat, or with a person incapable of consenting (unconscious, severely intoxicated, mentally incapacitated). Fraud in the inducement (lying to get consent) is not rape; fraud in the factum (victim does not know it is a sexual act) is. The marital exemption has been abolished. Mistake of fact about consent: a general-intent crime, so the mistake must be reasonable [?; jurisdictions vary, the stem controls]. **Statutory rape**: strict liability as to the victim's age in the majority; the victim's consent and the defendant's reasonable mistake about age are no defense. MPC twist: MPC 213.6(1) makes a reasonable mistake about age a defense when the critical age is above ten.
- **Kidnapping** (modern) = unlawful confinement involving movement ("asportation") or secrecy; movement or confinement that is merely **incidental** to another crime (e.g., robbery) does not count in many states [?]. A child or incompetent can be taken by deception. **False imprisonment** = unlawful confinement without consent (general intent).
- **Possession offenses:** knowing possession; actual or constructive (knowledge of presence plus dominion and control); mere proximity or presence is not enough. Most statutes require knowledge that the substance is a controlled substance; check the stem.
- **Traps:** treating larceny by trick as false pretenses; ignoring that robbery needs a larceny underneath; thinking an unlocked door is not a "breaking"; thinking any building is a common-law "dwelling"; applying arson to negligence; treating fraud in the inducement as rape.

### 4.2 Questions

**THEFT-1 (larceny by trick).** A man told a woman he was interested in her car and asked to take it for a short test drive. She handed him the keys, and he drove away and sold the car to a stranger in another state, never intending to return it.
Of what crime is the man most guilty?
(A) Larceny by trick, because he obtained possession by fraud intending to keep the car.
(B) False pretenses, because he lied to obtain the car.
(C) Embezzlement, because he was entrusted with the car.
(D) Robbery, because he took the car from the woman's presence.
**Best answer: A.** Only possession passed. B: false pretenses needs title to pass. C: embezzlement needs lawful possession first, without fraud at the outset. D: no force or fear.

**THEFT-2 (false pretenses).** A seller, who knew a painting was a forgery, told a buyer it was an original work by a famous painter. The buyer paid $5,000, and the seller handed over the painting and a signed bill of sale.
Of what crime is the seller most guilty?
(A) False pretenses.
(B) Larceny by trick.
(C) Embezzlement.
(D) Receiving stolen property.
**Best answer: A.** A knowing false statement of existing fact induced the buyer to pass title. B: title passed, not just possession. C and D lack the elements.

**THEFT-3 (embezzlement).** A lawyer held $20,000 of a client's settlement in her trust account for the client. She used the money to pay her own debts, intending to repay it later.
Of what crime is the lawyer most guilty?
(A) Embezzlement.
(B) Larceny, because she took the money without consent.
(C) False pretenses.
(D) Robbery.
**Best answer: A.** She lawfully possessed the funds and converted them. B: no trespassory taking. C: she did not obtain title by misrepresentation.

**THEFT-4 (claim of right).** A man walked into his neighbor's open garage, took a lawnmower, and wheeled it home, honestly but mistakenly believing that it was the mower he had lent the neighbor the week before. It was the neighbor's own mower. Common law applies.
Is the man guilty of larceny?
(A) No, because he lacked intent to deprive another of property, having honestly believed the mower was his.
(B) No, because he took the mower without force.
(C) Yes, because his mistake was unreasonable.
(D) Yes, because he trespassed in the garage.
**Best answer: A.** Larceny is a specific-intent crime, so an honest mistake, reasonable or not, negates it. B: force is irrelevant to larceny. C: reasonableness matters only for general-intent crimes. D: trespass alone is not larceny.

**THEFT-5 (sting; attempt).** Police recovered a stolen television, then arranged for an informant to offer it for sale to a man who believed it was stolen. He bought it. He is charged with receiving stolen property.
What is the best outcome?
(A) Not guilty of receiving stolen property because the television was no longer stolen, but guilty of attempted receiving.
(B) Guilty of receiving stolen property.
(C) Not guilty of any crime because it was impossible.
(D) Guilty of larceny.
**Best answer: A.** Factual impossibility is no defense to attempt. B: recovery by police removed stolen status. C: legally and factually impossible only if conduct would be lawful even on his beliefs. D: no taking.

**THEFT-6 (intent to permanently deprive).** A man took his neighbor's lawnmower without permission, intending to mow his own lawn that afternoon and return it that evening. He returned it clean that night.
Is the man guilty of larceny?
(A) No, because he did not intend to permanently deprive the neighbor of the mower.
(B) Yes, because he took the mower without consent.
(C) Yes, because he used the mower for his own benefit.
(D) No, because larceny requires force.
**Best answer: A.** Short-term borrowing with intent to return and no real risk of loss is not larceny (it may be a trespass or a statutory crime). Watch for stems where the property is consumed or left at risk, which changes the answer.

**ROB-1 (fear and a fake gun).** A man walked up to a cashier, kept his hand in his jacket pocket as though holding a gun, and said "Give me the money or I'll shoot." There was no gun. The cashier handed him the cash.
Of what crime is the man guilty?
(A) Robbery, because he took property by intimidation.
(B) Larceny only, because he had no gun.
(C) False pretenses, because he misrepresented that he had a gun.
(D) Extortion, because he threatened to shoot.
**Best answer: A.** Reasonable fear of immediate harm suffices. B ignores fear. C: title did not pass by misrepresentation of fact; it was fear. D: robbery covers immediate threats.

**ROB-2 (future threat = extortion).** A man told a restaurant owner, "Pay me $1,000 now or I will burn down your restaurant next month." The owner paid.
Of what crime is the man most likely guilty?
(A) Extortion, because the threat concerned future harm.
(B) Robbery, because he used a threat.
(C) Larceny by trick, because the owner consented to the payment.
(D) Embezzlement.
**Best answer: A.** Robbery needs a threat of immediate harm. The other labels fail on elements (C: fraud did not obtain possession).

**ROB-3 (presence).** Two men entered a house at night. One held a gun on the homeowner in the living room while the other went upstairs and took jewelry from a bedroom. They left together.
Of what crime are both men guilty?
(A) Robbery, because the property was taken from the owner's presence by force or fear.
(B) Larceny only, because the property was not in the victim's physical hands.
(C) Burglary only.
(D) False imprisonment only.
**Best answer: A.** "Presence" includes property within the victim's immediate control. Burglary is also likely, but the question asks for the crime for the taking.

**ROB-4 (pickpocket).** A man bumped into a stranger on a crowded train and lifted a wallet from his coat without the stranger noticing.
Of what crime is he guilty?
(A) Larceny.
(B) Robbery, because he took it from the person.
(C) False pretenses.
(D) Battery.
**Best answer: A.** No force or intimidation. B: force beyond the minimum needed to take is required, or fear.

**BURG-1 (breaking).** At 2 a.m., a man opened the closed but unlocked back door of a stranger's house intending to steal a television. He found nothing worth taking and left. Common law applies.
Is he guilty of burglary?
(A) Yes, because opening a closed door is a breaking and he entered a dwelling at night with intent to commit a felony.
(B) No, because the door was unlocked.
(C) No, because nothing was taken.
(D) No, because he was not armed.
**Best answer: A.** Burglary is complete at entry with the intent; no taking is needed.

**BURG-2 (intent after entry).** A woman who had been invited to a dinner party left the dining room, wandered into the bedroom, and took a necklace, deciding to do so only after she was inside the house.
Of what crime is she guilty?
(A) Larceny only.
(B) Burglary, because she committed a felony inside.
(C) Burglary, because she exceeded the scope of the invitation.
(D) Attempted burglary.
**Best answer: A.** No breaking and no intent at entry. B and C are tempting but wrong at common law; D has no unfinished crime.

**BURG-3 (not a dwelling).** At midnight, a man smashed a window of a closed hardware store and climbed in, intending to steal tools. He was arrested inside. The jurisdiction retains the common-law definition of burglary.
Is the man guilty of burglary?
(A) No, because a store is not a dwelling.
(B) Yes, because he broke and entered at night with intent to commit a felony.
(C) Yes, but only if he took tools.
(D) No, because he did not use force.
**Best answer: A.** Common-law burglary protects dwellings; most modern statutes extend to buildings (a common trap in the other direction). He may be guilty of attempted larceny. D: smashing a window is a breaking.

**ARSON-1 (own house).** A homeowner set fire to his own house to collect insurance. The fire spread and burned his neighbor's occupied house. Common law applies.
Of what crime is the homeowner guilty?
(A) Arson of the neighbor's house, because he acted with reckless disregard of an obvious risk.
(B) No arson, because he intended to burn only his own house.
(C) Arson of his own house only.
(D) Only criminal negligence.
**Best answer: A.** Malice includes reckless disregard. B and C: common-law arson requires the dwelling of another; his own house alone is not arson, but the neighbor's is.

**ARSON-2 (charring).** A woman set a small fire under a neighbor's porch that blackened the siding with smoke, scorched the wood, and caused no flames to catch, and went out on its own. Common law applies.
Is she guilty of arson?
(A) No, but she may be guilty of attempted arson, because there was no burning (charring).
(B) Yes, because she acted maliciously.
(C) Yes, because she damaged the dwelling.
(D) No crime at all.
**Best answer: A.** Common-law arson requires some charring of the structure. B and C overlook the actus reus.

**ARSON-3 (negligence).** A tenant left a candle burning on a windowsill while he went to sleep and the curtain caught fire, destroying the building. Common law applies.
Is the tenant guilty of arson?
(A) No, because arson requires malice, not mere negligence.
(B) Yes, because the fire destroyed a dwelling.
(C) Yes, because leaving the candle was reckless.
(D) No, because the tenant owned part of the building.
**Best answer: A.** Arson requires intent or reckless disregard of an obvious risk. (Ordinary negligence at most supports manslaughter if a person dies.)

**ASSAULT-1 (battery).** During an argument, a man spat in his neighbor's face. The neighbor was not hurt.
Of what crime, if any, is the man guilty?
(A) Battery, because an offensive touching suffices.
(B) Assault only, because there was no injury.
(C) Neither, because there was no bodily injury.
(D) Aggravated assault.
**Best answer: A.** Offensive contact is a battery.

**ASSAULT-2 (unloaded gun).** A man pointed a pistol at a store clerk and shouted, "Open the register." The clerk, seeing the gun, was terrified. The gun was unloaded, which the clerk could not know.
Of what crime is the man guilty as to the clerk, apart from any theft crime?
(A) Assault, because the clerk reasonably feared an immediate battery.
(B) No crime, because the gun was unloaded.
(C) Battery.
(D) Attempted murder.
**Best answer: A.** Apparent ability is enough. B: factual impossibility does not matter. C: no touching. D: no intent to kill.

**ASSAULT-3 (mens rea of battery).** A driver, looking at his phone for two seconds, drifted and clipped a cyclist, who suffered a broken arm. The driver had no prior drinking or speeding. Under the jurisdiction's law, battery requires intent or criminal negligence.
Is the driver guilty of battery?
(A) No, because ordinary negligence is not enough.
(B) Yes, because the cyclist was injured.
(C) Yes, because battery is a strict-liability crime.
(D) Yes, because use of a car is inherently dangerous.
**Best answer: A.** The facts show momentary carelessness, not a gross deviation. The cyclist's injury alone is not enough.

**RAPE-1 (fraud).** A man told a woman he was a film producer who could get her a role, and she agreed to sex because of that statement. He was not a producer.
Is the man guilty of rape?
(A) No, because her consent, though induced by fraud, was real and the fraud concerned a collateral matter.
(B) Yes, because her consent was not informed.
(C) Yes, because he made a false statement.
(D) No, because rape requires physical force in every case.
**Best answer: A.** Fraud in the inducement does not vitiate consent (contrast fraud in the factum). D: force is not required if consent is absent due to incapacity.

**RAPE-2 (statutory rape).** A 19-year-old man had intercourse with a 15-year-old girl who told him she was 18 and who looked 18. Age of consent in the jurisdiction is 16. The statute says nothing about the defendant's knowledge of the victim's age.
Is the man guilty of statutory rape?
(A) Yes, because statutory rape is a strict-liability crime as to age.
(B) No, because he reasonably believed she was 18.
(C) No, because she consented.
(D) Yes, but only if he knew she was under 16.
**Best answer: A.** Majority rule: no mistake-of-age defense. (The MPC allows a reasonable-mistake defense when the critical age is above ten.)

**RAPE-3 (incapacity).** A man had sexual intercourse with a woman who had passed out from drinking at a party. The woman did not resist and later said she would not have consented. The jurisdiction defines rape as intercourse without consent by force or threat, or with a person incapable of giving consent.
Is the man guilty of rape?
(A) Yes, because she was incapable of giving consent.
(B) No, because he used no force and she did not resist.
(C) No, because she did not say "no".
(D) Yes, only if he supplied the alcohol.
**Best answer: A.** B and C wrongly require force or protest. D adds an element not in the statute.

**KIDNAP-1 (incidental movement).** During a store robbery, a robber ordered the clerk to walk twenty feet to the back office and lie on the floor for ten minutes while he emptied the safe. The jurisdiction does not treat confinement or movement merely incidental to another crime as kidnapping.
Is the robber guilty of kidnapping?
(A) No, because the movement and confinement were incidental to the robbery.
(B) Yes, because he moved her against her will.
(C) Yes, because he confined her for ten minutes.
(D) No, because kidnapping requires a ransom demand.
**Best answer: A.** B and C ignore the stem's rule. D: ransom is not an element.

**KIDNAP-2 (deception).** A man promised a six-year-old girl he would show her puppies, walked her to his car, and drove her 30 miles away without her parents' knowledge.
Is the man guilty of kidnapping?
(A) Yes, because he moved a child away by deception without legal consent.
(B) No, because he used no force.
(C) No, because the child went voluntarily.
(D) No, because kidnapping requires a threat.
**Best answer: A.** A young child cannot give legal consent, and deception substitutes for force.

**POSS-1 (constructive possession).** Police stopped a car with three adult occupants and found a bag of cocaine under the front passenger seat. The passenger had been in the car for ten minutes, owned nothing else in it, and said he did not know about the bag. No other evidence linked him to the drugs.
Is the passenger guilty of possession of cocaine?
(A) No, because mere presence near contraband does not establish knowing possession.
(B) Yes, because the cocaine was within his reach.
(C) Yes, because possession is a strict-liability offense.
(D) Yes, because he was in the car.
**Best answer: A.** Constructive possession requires knowledge plus dominion and control.

**POSS-2 (knowledge).** A woman agreed to carry a sealed package for a friend from one city to another. Unknown to her, the package contained heroin. She was arrested at the bus station. The statute punishes "knowingly possessing a controlled substance."
Is she guilty?
(A) No, because she did not know the package contained a controlled substance.
(B) Yes, because she had physical possession.
(C) Yes, because she should have asked.
(D) Yes, because ignorance of the contents is no defense.
**Best answer: A.** The statute includes knowledge. C states a negligence standard. D confuses mistake of fact with mistake of law.

---
## 5. Inchoate crimes and parties (outline III)

### 5.1 Rules [K unless marked]

- **Attempt** = (1) specific intent to commit the target crime (so no attempted felony murder, no attempted depraved-heart murder, no attempt of a crime defined by recklessness or negligence) and (2) an act beyond mere preparation. Tests of the act: **last act** (oldest), **dangerous proximity** (how close to completion; Holmes), **unequivocality** (the act itself shows the criminal purpose), **MPC "substantial step" strongly corroborative of criminal purpose** (MPC 5.01(1)(c) and (2): lying in wait, searching for or following the victim, reconnoitering the scene, unlawful entry of the structure, possessing materials specially designed for the crime, soliciting an innocent agent). The MPC test catches more conduct; if the stem says MPC, use it. [Seen only as search-result snippets, not opened: the MPC substantial-step examples (lying in wait, luring the victim, gathering implements) from a federal pattern-instruction page https://www.mad.uscourts.gov/resources/pattern2003/html/patt2uwk.htm , and the statement that the First and Third Circuits adopted the MPC test from the CRS report https://www.everycrsreport.com/files/20150406_R42002_ce68520051f67520f13439382d4c11e3fb110c8b.html . The MPC 5.01(2) list itself is [K].]
  - **Impossibility:** *factual* impossibility (the crime was impossible because of facts unknown to the defendant: empty pocket, victim already dead, the goods were no longer stolen) is **not a defense**. *True legal impossibility* (what the defendant intended to do is not a crime at all, e.g., he believes a lawful act is illegal) **is a defense**. The MPC judges attempt by the circumstances as the defendant believes them to be.
  - **Abandonment:** at common law, voluntary abandonment after the attempt is complete is **not a defense**. MPC 5.01(4): affirmative defense of complete and voluntary renunciation (not if motivated by increased risk of detection or by postponement). Abandonment before the act went beyond mere preparation means there was no attempt.
  - **Merger:** attempt merges into the completed crime (no conviction for both).
- **Conspiracy** (common law) = **agreement** between two or more persons + **specific intent** to enter the agreement and to achieve its unlawful objective. Common law needs no overt act; many modern statutes (and federal law for most offenses) require one; the MPC requires an overt act only for lesser felonies/misdemeanors. **Bilateral** (traditional): at least two real parties, so no conspiracy if the only other party is an undercover officer feigning agreement; **unilateral** (MPC 5.03): one person who genuinely agrees can be guilty. **Wharton's Rule:** no conspiracy to commit a crime that by definition requires two participants (adultery, bigamy, dueling, incest), unless a third party takes part. **Pinkerton:** each conspirator is liable for substantive crimes by co-conspirators committed in furtherance of the conspiracy and reasonably foreseeable (Pinkerton v. United States, 1946). **Withdrawal:** not a defense to conspiracy already formed, but it ends liability for later crimes if the member communicates withdrawal to the co-conspirators in time (and some states require acts to thwart). **Merger:** conspiracy does **not** merge with the target crime; both can be punished (Callanan v. United States, 1961). **Scope:** a conspiracy lasts until its objectives are achieved or abandoned; hub-and-spoke vs chain conspiracies turn on common objectives (Kotteakos v. United States, 1946). Mere knowledge that a customer will commit a crime, or mere presence, is not agreement. Impossibility is generally no defense. MPC renunciation defense: thwarting the conspiracy's success under voluntary, complete renunciation (MPC 5.03(6)). [Unilateral/bilateral and renunciation: search-result snippets only, not opened: https://opencasebook.org/casebooks/981-balloberman-crim-law-casebook/resources/7.3.1-model-penal-code-sec-503/ . V (opened): https://www.law.cornell.edu/wex/inchoate_offense says attempt and solicitation merge into the target offense and conspiracy does not.]
- **Solicitation** = inciting, asking, commanding another to commit a crime, with intent that the crime be committed. Complete when the request is made; the other person need not agree or act. **Merges** into the completed offense or an attempt (if the solicitee commits it, the solicitor is guilty as an accomplice, not of both).
- **Parties.** *Principals* (commit the act, including via innocent agent); *accomplices* (aid, abet, counsel, encourage, with the **intent to assist** and the **intent that the crime be committed**, or in some states knowledge for serious crimes (State v. Hicks / People v. Lauria split) [?]). Accomplice liability reaches the planned crime and the **natural and probable consequences** (majority) [MPC limits to the crime the accomplice intended to facilitate]. Mere presence is not enough; encouragement by words counts; failure to act counts only with a legal duty. The accomplice can be convicted even if the principal is acquitted or unknown. *Withdrawal* requires timely repudiation of aid and, where aid was material, neutralising it. *Accessory after the fact* (helps a felon avoid arrest or punishment) commits a **separate, lesser crime**, is not liable for the underlying felony. Accomplice liability is derivative, not a separate crime.
- **Traps:** treating solicitation as needing agreement; convicting of both attempt and the completed offense; forgetting that conspiracy survives merger; using Pinkerton for crimes outside the scope; believing withdrawal erases the conspiracy; allowing an undercover officer to be a bilateral co-conspirator; using Wharton's rule where a third party participates.

### 5.2 Questions

**ATT-1 (MPC substantial step).** A man decided to rob a bank. He bought a ski mask, loaded a pistol, and drove to the bank, where he parked across the street and watched the entrance for an hour with the mask on the seat and the gun in his lap. Police, alerted by a passer-by, arrested him before he got out of the car. The jurisdiction applies the Model Penal Code test for attempt.
Is he guilty of attempted robbery?
(A) Yes, because he took a substantial step strongly corroborating his intent.
(B) No, because he had not entered the bank.
(C) No, because the acts were mere preparation.
(D) Yes, but only if he had actually pointed the gun at someone.
**Best answer: A.** Reconnoitering the target and possessing the tools of the crime are substantial steps. B and C use the narrower common-law tests. D requires a last act.

**ATT-2 (common-law: mere preparation).** A woman who wanted to poison her husband bought rat poison at a hardware store and put it on a kitchen shelf. A week later her husband found it. She had taken no further step. The jurisdiction applies the common-law "dangerous proximity" test.
Is she guilty of attempted murder?
(A) No, because buying and storing the poison was mere preparation.
(B) Yes, because she intended to kill and bought the poison.
(C) Yes, because she took an overt act.
(D) No, because poison cannot be an instrument of attempt.
**Best answer: A.** She was not dangerously close to completion. (Under the MPC she would likely be guilty only if the stem shows a substantial step.)

**ATT-3 (factual impossibility).** A pickpocket reached into a stranger's coat pocket intending to steal his wallet. The pocket was empty. He was arrested immediately.
Of what crime is the pickpocket guilty?
(A) Attempted larceny.
(B) Larceny.
(C) No crime, because there was nothing to steal.
(D) Burglary.
**Best answer: A.** Factual impossibility is no defense.

**ATT-4 (true legal impossibility).** A hunter wrongly believed that shooting rabbits in the month of May is a crime. He killed a rabbit in May intending to violate the law. In fact, no law prohibits it.
Is the hunter guilty of attempt to violate the hunting statute?
(A) No, because what he intended to do is not a crime.
(B) Yes, because he intended to break the law.
(C) Yes, because he took a substantial step.
(D) No, because he did not use a prohibited weapon.
**Best answer: A.** True legal impossibility is a defense. B and C ignore that no crime exists.

**ATT-5 (abandonment).** A man poured gasoline around a warehouse he intended to burn and lit a match. Seeing the flame in his hand, he was overcome by remorse, blew out the match and left. Common law applies.
Is he guilty of attempted arson?
(A) Yes, because voluntary abandonment after the attempt is complete is not a defense at common law.
(B) No, because he voluntarily abandoned the plan.
(C) No, because no fire occurred.
(D) Yes, but only if the warehouse was occupied.
**Best answer: A.** (Under the MPC he could raise renunciation as an affirmative defense.) C: a completed attempt does not need the fire.

**ATT-6 (attempt needs intent).** A drunk driver speeding down a crowded street at 80 mph struck and seriously injured a pedestrian, who survived. He is charged with attempted murder on the theory that he acted with extreme recklessness.
Should he be convicted of attempted murder?
(A) No, because attempted murder requires intent to kill.
(B) Yes, because depraved-heart murder is murder.
(C) Yes, because the victim was seriously injured.
(D) No, because the driver was intoxicated.
**Best answer: A.** Attempt is a specific-intent crime. B ignores that attempt of reckless murder is not recognised. D: voluntary intoxication is no defense to depraved heart.

**CONS-1 (common law: no overt act).** Under a statute that follows the common law of conspiracy, two men agreed to rob a bank and then did nothing further.
Are they guilty of conspiracy?
(A) Yes, because the agreement with intent to rob is the offense.
(B) No, because no overt act occurred.
(C) No, because the robbery was not attempted.
(D) Yes, but only if they bought weapons.
**Best answer: A.** B reflects the modern statutory overt-act requirement.

**CONS-2 (bilateral; undercover officer).** A man asked a woman to help him burn down his insured warehouse. The woman was an undercover police officer who pretended to agree. The jurisdiction follows the common-law (bilateral) rule.
Of what crime, if any, is the man guilty?
(A) Solicitation, but not conspiracy.
(B) Conspiracy.
(C) Attempted arson.
(D) No crime.
**Best answer: A.** No genuine agreement. (Under the MPC's unilateral approach he would be guilty of conspiracy.)

**CONS-3 (Wharton's Rule).** A state makes adultery a misdemeanor. A married woman and a man agreed to begin an affair. No third person was involved, and they never had relations. They are charged with conspiracy to commit adultery.
Can they be convicted of conspiracy?
(A) No, because under Wharton's Rule a crime that requires two participants cannot also be a conspiracy.
(B) Yes, because they agreed with the intent to commit a crime.
(C) Yes, because adultery is a misdemeanor.
(D) No, because adultery is not a specific-intent crime.
**Best answer: A.** B ignores the plurality rule. D confuses the issue.

**CONS-4 (Pinkerton).** Three men agreed to rob a convenience store. One stayed in the getaway car while the other two went inside. During the robbery, one of the men inside shot and killed the clerk, who had reached for a phone. The driver is charged with murder.
Is the driver guilty of murder?
(A) Yes, because the killing was a foreseeable act in furtherance of the conspiracy (and the felony-murder rule applies).
(B) No, because he did not shoot the clerk.
(C) No, because he had no intent to kill.
(D) Yes, but only if he knew the shooter had a gun.
**Best answer: A.** Pinkerton and felony murder both reach him.

**CONS-5 (withdrawal).** On Monday, three people agreed to rob a bank on Friday, and each bought a ski mask. On Wednesday, one of them told the other two, "I'm out. Don't count on me," and returned his mask. The other two robbed the bank on Friday and shot a guard.
Which statement is most accurate about the one who withdrew?
(A) He remains guilty of conspiracy but is not liable under Pinkerton for the Friday robbery and shooting.
(B) He is guilty of the robbery and the shooting because he joined the conspiracy.
(C) He is not guilty of anything because he withdrew.
(D) He is guilty of conspiracy only if the others succeeded.
**Best answer: A.** Withdrawal doesn't undo the completed agreement (and the purchase of a mask is an overt act), but it ends liability for later acts.

**CONS-6 (no merger).** A defendant was convicted of both conspiracy to commit armed robbery and the armed robbery itself.
May both convictions stand?
(A) Yes, because conspiracy does not merge with the completed crime.
(B) No, because conspiracy merges into the target offense.
(C) No, because double jeopardy forbids both.
(D) Yes, but only if the conspiracy included more than five people.
**Best answer: A.** (Contrast attempt, which merges.) C is a trap: Blockburger permits conspiracy and the substantive offense (Callanan).

**SOL-1.** A man asked his friend to burn his neighbor's barn and offered him $500. The friend refused and reported the request to the police. No burning occurred.
Of what crime is the man guilty?
(A) Solicitation.
(B) Conspiracy.
(C) Attempted arson.
(D) No crime.
**Best answer: A.** The crime is complete when the request is made. B needs an agreement. C: asking is not a step toward his own commission.

**SOL-2 (merger).** The friend in SOL-1 agreed and burned the barn. The man is charged with solicitation and with arson as an accomplice.
How should the court treat the two charges?
(A) The solicitation merges into the completed arson, so only one conviction can stand.
(B) Both convictions can stand because they are different crimes.
(C) Only the solicitation can stand.
(D) Neither can stand because the friend was a mere agent.
**Best answer: A.**

**ACC-1 (mere presence).** A man watched from a stool as his friend beat a stranger in a bar. He said nothing and did nothing, though he knew the friend and was glad the stranger was getting hurt. The friend is convicted of battery.
Is the man guilty as an accomplice?
(A) No, because mere presence without aid or encouragement is not enough.
(B) Yes, because he intended the battery.
(C) Yes, because he failed to stop the attack.
(D) Yes, because he was a friend of the attacker.
**Best answer: A.** No act, no duty.

**ACC-2 (encouragement).** The same man shouted "Hit him again!" while the friend beat the stranger.
Is the man guilty as an accomplice?
(A) Yes, because he encouraged the battery intending it to occur.
(B) No, because he did not touch the victim.
(C) No, because words are never enough.
(D) No, because the friend did not need help.
**Best answer: A.** Encouragement by words with the requisite intent is an act of aiding.

**ACC-3 (intent that the crime succeed).** A warehouse employee wanted to get a rival co-worker fired. The rival told the employee he planned to steal from the stockroom that night and asked him to leave the back door unlocked. The employee left the door unlocked as asked, but he also told the manager, who watched the rival take the goods. The rival is convicted of larceny.
Is the employee guilty as an accomplice to larceny?
(A) No, because he did not intend that the larceny succeed.
(B) Yes, because he knowingly helped.
(C) Yes, because he left the door unlocked.
(D) Yes, because he encouraged the rival to steal.
**Best answer: A.** An accomplice must intend that the crime be committed, not merely help it happen. B and C satisfy only knowledge and act.

**ACC-4 (natural and probable consequences).** A man gave a friend a handgun, saying "Use this to scare the clerk and clean out the register." The friend robbed a store and shot the clerk who resisted. The man was waiting at home.
Under the majority rule, is the man liable for the clerk's death?
(A) Yes, because the killing was a natural and probable consequence of the robbery he assisted.
(B) No, because he was not present.
(C) No, because he intended only robbery.
(D) No, because he lacked intent to kill.
**Best answer: A.** (Under the MPC he would answer only for the offenses he intended to facilitate, or for felony-murder presumption issues, so the result differs.)

**ACC-5 (accessory after the fact).** A woman drove her brother to a remote cabin and lied to the police about where he was, knowing he had just committed a murder. She had not known about the murder beforehand.
Of what crime is the woman guilty?
(A) Accessory after the fact (a separate, lesser offense).
(B) Murder, as an accomplice.
(C) Conspiracy to commit murder.
(D) No crime, because she is his sister.
**Best answer: A.** Accessories after the fact are not liable for the underlying offense.

---

## 6. General principles (outline IV)

### 6.1 Rules [K unless marked]

**A. Acts and omissions**
- There must be a **voluntary act** (or omission with a legal duty or a possession the defendant knowingly controls). Reflexes, convulsions, sleepwalking, acts during unconsciousness are not voluntary; but a prior voluntary act (driving while knowing one is prone to seizures) can supply the act. Status offenses are unconstitutional (Robinson v. California, 1962). **Possession** is an act if the defendant knowingly procured or received the item or was aware of control long enough to terminate possession (MPC 2.01(4)).
- **Omissions:** liability requires a **legal duty**: statute, relationship (parent-child, spouse), contract, voluntary assumption of care and secluding the helpless, or creating the peril. Moral duty and bystander status are not enough.

**B. State of mind**
- Common-law vocabulary: **specific intent** (purpose to cause a particular result: larceny, robbery, burglary, embezzlement, false pretenses, forgery, attempt, conspiracy, solicitation, assault with intent / attempted battery, first-degree premeditated murder, receiving stolen property), **malice** (murder, arson: intent or reckless disregard of obvious risk), **general intent** (battery, rape, false imprisonment, kidnapping, and the like: intent to do the act, awareness of the factual circumstances).
- **MPC 2.02:** purposely, knowingly, recklessly (conscious disregard of a substantial and unjustifiable risk), negligently (should have been aware of such a risk); a material element with no stated mens rea defaults to recklessness; higher includes lower. **Transferred intent** applies to unintended victims of the same kind of harm. **Concurrence:** mens rea must coincide with the act that causes the harm, but a series of acts as one transaction is treated as concurrent.
- **Strict liability:** public-welfare, regulatory, sale-of-liquor-to-minors, and statutory rape (majority) offenses; no mens rea as to the element. Due process limits punishment of a purely passive omission without notice (Lambert v. California, 1957). Federal presumption of mens rea: Morissette v. United States (1952), Staples v. United States (1994), Rehaif v. United States (2019).
- **Mistake of fact:** negates specific intent if honest; negates general intent only if reasonable; no defense to strict-liability elements. **Mistake of law:** generally no defense (even on the advice of private counsel). Exceptions: the statute makes knowledge of the law an element (Cheek v. United States, 1991 for tax); reasonable reliance on an official statement later held erroneous (MPC 2.04(3)); fair notice (Lambert); a mistake about civil law that negates an element (claim of right).

**C. Responsibility**
- **Insanity tests:** (1) **M'Naghten** (majority): as a result of a disease of the mind, the defendant did not know the nature and quality of the act, or did not know it was wrong; (2) **irresistible impulse** (minority, usually added to M'Naghten): could not control conduct; (3) **Durham/product test** (only New Hampshire) [?]; (4) **MPC/ALI**: lacks substantial capacity to appreciate the criminality (wrongfulness) of the conduct or to conform it to the law (MPC 4.01(1); the Code excludes abnormality manifested only by repeated criminal conduct) [MPC 4.01 wording seen in search snippets only (https://www.law.cornell.edu/wex/model_penal_code_insanity_defense appeared in results; I did not open it)]; federal Insanity Defense Reform Act: severe mental disease, unable to appreciate nature and quality or wrongfulness; defendant's burden clear and convincing. States may place the burden on the defendant (Leland v. Oregon, 1952). Due process doesn't require a moral-incapacity prong: **Kahler v. Kansas** (2020, 6-3, Kagan) held Kansas could limit mental illness to a mens rea defense. [V] https://en.wikipedia.org/wiki/Kahler_v._Kansas . Clark v. Arizona (2006) upheld limits on mental-disease evidence to negate mens rea. **Competency to stand trial** is a different question (Dusky v. United States, 1960: sufficient present ability to consult with counsel with a reasonable degree of rational understanding and a rational and factual understanding of the proceedings). A convicted prisoner who cannot understand why he's being executed can't be executed (Ford v. Wainwright, 1986).
- **Intoxication:** *voluntary*: a defense only to **specific-intent** crimes (negates the intent), not to malice/general-intent crimes (depraved-heart murder, battery, rape) or strict liability; not a defense to recklessness under the MPC (2.08(2): unawareness caused by voluntary intoxication is treated as awareness). *Involuntary* (unwitting, coerced, or an unexpected reaction to a prescribed drug): a defense to all crimes if it prevents the required mens rea or produces insanity. Due process does not require allowing intoxication evidence (Montana v. Egelhoff, 1996). [MPC 2.08(2): search snippet of https://penncerl.org/wp-content/uploads/2021/09/YaffeIntoxicationRecklessness.pdf and a law-school statute compilation https://www1.law.umkc.edu/suni/CrimLaw/calendar/Class_25_intoxication_statutes.htm ; not opened]

**D. Causation** — Actual (but-for) cause plus proximate cause. *Intervening causes:* **dependent/responsive** acts (victim's flight, medical treatment, rescue) are foreseeable and don't break the chain unless grossly abnormal; **independent** intervening acts break the chain if unforeseeable and unrelated ("coincidence": ambulance hit by a drunk driver). Victim's weakness or refusal of care doesn't break the chain ("take the victim as you find him"). Acceleration of death counts. Statutory "results from" crimes need but-for (Burrage v. United States, 2014).

**E. Justification and excuse**
- **Self-defense:** reasonable belief that unlawful force is imminent; force proportionate. **Deadly force** only against a threat of death or serious bodily harm (some states also certain felonies). **Retreat:** majority of states: no duty to retreat; minority: retreat if completely safe, except within the dwelling ("castle doctrine"; some require retreat from a co-occupant). **Aggressor:** the initial aggressor cannot claim self-defense unless he withdraws and communicates it, or the victim escalates a nondeadly attack into deadly force. Honest but unreasonable belief: not a defense (imperfect self-defense mitigates murder to manslaughter in some states [?]). MPC: honest belief suffices, but liability for reckless/negligent crimes remains. **Defense of others:** majority: reasonable belief the third person was entitled to defend himself (the minority "alter ego" rule is stricter). **Defense of property:** reasonable non-deadly force only; never deadly force (Katko v. Briney-type spring guns). **Resisting arrest:** no right to resist a lawful arrest; the arrestee may resist excessive force. **Law enforcement force:** deadly force against a fleeing felon only if the suspect poses a significant threat of death or serious injury (Tennessee v. Garner, 1985); objective reasonableness under the Fourth Amendment (Graham v. Connor, 1989); totality includes events before the moment of threat (Barnes v. Felix, 2025 [V]).
- **Necessity (choice of evils):** no better alternative, harm avoided greater than harm caused, danger not of the defendant's making; generally not a defense to intentional killing of an innocent. **Duress:** unlawful threat of imminent death or serious bodily harm to the defendant or another, reasonable belief, no opportunity to escape; **not a defense to murder** at common law (MPC: person of reasonable firmness, no imminence requirement, murder not excluded). **Entrapment:** *subjective test* (federal, majority): government inducement + defendant's lack of predisposition (Sorrells, Sherman, Jacobson v. United States, 1992; Mathews v. United States, 1988 allows denying the crime and pleading entrapment); *objective test* (minority, MPC 2.13): would the police conduct induce a normally law-abiding person to commit the offense; predisposition irrelevant. Entrapment isn't constitutional; due-process "outrageous conduct" is a separate, rarely successful claim (United States v. Russell, 1973; Hampton v. United States, 1976).

**F. Jurisdiction** — A state may prosecute when conduct or its result (or an attempt aimed at the state) occurs in the state (territorial and "effects" principles; Strassheim v. Daily, 1911). Separate sovereigns (two states, or state and federal) may each prosecute (Heath v. Alabama, 1985; Gamble v. United States, 2019).

### 6.2 Questions

**ACT-1 (parental duty).** A mother watched her boyfriend repeatedly beat her three-year-old daughter. She was afraid of him but could have called the police from the next room. The child died.
Is the mother guilty of a homicide offense?
(A) Yes, because a parent has a legal duty to protect her child and could have acted.
(B) No, because she did not strike the child.
(C) No, because an omission is never a crime.
(D) No, because her fear is a complete defense.
**Best answer: A.** (Her fear may be raised only if it meets duress or inability-to-act standards, not on these facts.)

**ACT-2 (no duty).** A man walking by a pond saw a stranger flailing in deep water, shouting for help. He could have thrown a nearby life ring but kept walking. The stranger drowned.
Is the man guilty of manslaughter?
(A) No, because a stranger has no legal duty to rescue.
(B) Yes, because he could safely have saved the stranger.
(C) Yes, because he knew death was likely.
(D) Yes, because he created the peril.
**Best answer: A.** Moral duty only. B and C ignore the legal-duty requirement; D adds a fact not present.

**ACT-3 (involuntary act).** A woman with no history of seizures had a sudden seizure while driving, lost control and killed a pedestrian. She had never had a warning sign.
Is she guilty of manslaughter?
(A) No, because she committed no voluntary act.
(B) Yes, because driving was a voluntary act.
(C) Yes, because she should have foreseen it.
(D) Yes, because she caused the death.
**Best answer: A.** (If she had known of her condition, the earlier voluntary decision to drive could supply the act.)

**ACT-4 (assumed duty).** A neighbor offered to care for an 84-year-old widow who could not leave her bed, and the widow's relatives stopped visiting. After two weeks, the neighbor stopped bringing her food and told no one. The widow starved.
Is the neighbor guilty of homicide?
(A) Yes (at least involuntary manslaughter), because he voluntarily assumed care and isolated the widow.
(B) No, because he had no legal relationship to her.
(C) No, because omissions are not crimes.
(D) No, because he did not intend her death.
**Best answer: A.** Voluntary assumption of care plus secluding the victim creates a duty.

**MENS-1 (MPC categories).** A driver knew that driving at 100 mph in a school zone created a high risk of killing someone. He shrugged and did it anyway.
Under the Model Penal Code, his mental state toward the risk of death is best described as:
(A) Purposely.
(B) Knowingly.
(C) Recklessly.
(D) Negligently.
**Best answer: C.** Conscious disregard of a substantial and unjustifiable risk. D is the "should have known" level.

**MENS-2 (transferred intent).** A man tried to hit his neighbor with a thrown rock, intending to hurt him. The rock missed the neighbor and hit a passerby, who was injured.
Is the man guilty of battery against the passerby?
(A) Yes, because his intent to hurt the neighbor transfers to the passerby.
(B) No, because the passerby was not his intended victim.
(C) No, because he lacked intent to hit the passerby.
(D) Yes, but only if he was negligent.
**Best answer: A.**

**MENS-3 (concurrence).** A woman struck her husband on the head with a hammer intending to kill him. Believing him dead, she buried him in the garden. An autopsy later showed he was alive when buried and died of suffocation.
Is the woman guilty of murder?
(A) Yes, because her acts were one transaction and the burial was a foreseeable consequence of her intent to kill.
(B) No, because the burial was not accompanied by intent to kill.
(C) No, because the hammer blow did not cause death.
(D) Yes, but only of manslaughter.
**Best answer: A.** The courts treat the acts as a single course of conduct. B and C divide it too finely.

**SL-1 (liquor).** A statute makes it a misdemeanor to sell alcohol to anyone under 21. It says nothing about knowledge. A clerk examined a convincing fake ID that said the buyer was 25 and sold him a beer. The buyer was 19.
Is the clerk guilty?
(A) Yes, because the statute imposes strict liability as to the buyer's age.
(B) No, because he reasonably believed the buyer was over 21.
(C) No, because he lacked intent.
(D) No, because the buyer used a fake ID.
**Best answer: A.** Public-welfare offense.

**SL-2 (Lambert).** A city ordinance requires any person who has been convicted of a felony and who stays in the city for more than five days to register with the police. A visitor who had a felony conviction in another state, had no knowledge of the ordinance, and had no reason to know of it, stayed for a week without registering.
Can he constitutionally be convicted?
(A) No, because due process requires some notice before punishing a passive omission.
(B) Yes, because ignorance of the law is no defense.
(C) Yes, because the ordinance is a valid exercise of police power.
(D) No, because he was a visitor.
**Best answer: A.** Lambert v. California, 1957.

**MIST-1 (advice of counsel).** A man made an investment arrangement that violated a statute prohibiting unlicensed securities sales. He did the acts intentionally but relied on his private lawyer's advice that no license was required. The statute does not mention knowledge of the law.
Is the lawyer's advice a defense?
(A) No, because mistake of law, even on private advice, is generally no defense.
(B) Yes, because he lacked criminal intent.
(C) Yes, because he relied in good faith.
(D) Yes, because the statute is ambiguous.
**Best answer: A.** Contrast reliance on an official interpretation (MPC 2.04(3)).

**MIST-2 (official reliance).** A county clerk told a landowner in writing that his construction plan complied with the ordinance. Months later, a prosecutor charged him with violating the ordinance, which the clerk had misread.
In a jurisdiction that follows the MPC, is the clerk's statement a defense?
(A) Yes, because he reasonably relied on an official statement of the law.
(B) No, because mistake of law is never a defense.
(C) No, because the clerk is not a judge.
(D) No, because reliance is a mitigation only.
**Best answer: A.** MPC 2.04(3)(b) covers an official interpretation by the public officer charged with administering the law. (At common law, reliance on a clerk's advice was generally not a defense.)

**INSAN-1 (M'Naghten).** A defendant suffering from schizophrenia shot his wife believing she was a machine that looked like her; he did not realise that he was shooting a human being. The jurisdiction applies the M'Naghten test.
Should the jury find him not guilty by reason of insanity?
(A) Yes, because his disease prevented him from knowing the nature and quality of his act.
(B) No, because he intentionally fired.
(C) No, because mental illness is relevant only to sentencing.
(D) No, because he planned the act.
**Best answer: A.**

**INSAN-2 (irresistible impulse not recognised).** A defendant with a documented impulse-control disorder knew that setting fires was illegal and wrong, but felt he could not stop himself. He set fire to a warehouse. The jurisdiction applies only the M'Naghten test.
Is he entitled to a verdict of not guilty by reason of insanity?
(A) No, because he knew the act was wrong.
(B) Yes, because he could not control himself.
(C) Yes, because he had a mental disease.
(D) Yes, because the MPC test applies.
**Best answer: A.** B reflects irresistible impulse (minority) or MPC.

**INSAN-3 (burden).** A state statute places the burden on a defendant to prove insanity by a preponderance of the evidence. A defendant is convicted after failing to carry that burden and argues that the statute violates due process.
Is the statute constitutional?
(A) Yes, because the state may treat insanity as an affirmative defense and place the burden on the defendant.
(B) No, because the state must prove sanity beyond a reasonable doubt.
(C) No, because insanity negates intent.
(D) Yes, but only if the standard is clear and convincing evidence.
**Best answer: A.** Leland v. Oregon (1952); Patterson v. New York (1977).

**INSAN-4 (competency).** A defendant who was sane at the time of the offense now suffers from a delusional disorder so that he cannot rationally understand the proceedings or assist his counsel.
Which statement is most accurate?
(A) His trial may not proceed while he remains incompetent.
(B) He may be tried because he was sane when he committed the crime.
(C) He should be found not guilty by reason of insanity.
(D) He may be tried if he waives counsel.
**Best answer: A.** Dusky v. United States; competence is judged at the time of trial. D: the waiver itself requires competence.

**INTOX-1 (specific intent).** A man, intoxicated by his own drinking, entered a stranger's unlocked house and took a television. He later testified that he was so drunk he thought it was his own house and his own television. Burglary requires intent to commit a felony inside; larceny requires intent to permanently deprive.
Which is the most accurate statement of the law?
(A) The intoxication may negate the specific intent required for burglary and larceny.
(B) Voluntary intoxication is never a defense.
(C) He is guilty of burglary because intoxication is not a defense to a crime requiring a mental state.
(D) He is guilty of larceny because larceny is a general intent crime.
**Best answer: A.** (If the jury believes he thought it was his own, he also has a claim-of-right/mistake argument.)

**INTOX-2 (general intent).** A man who drank heavily at a bar, then struck another patron in the face with a bottle, claimed he was too drunk to form any intent. He was charged with battery, a general-intent crime.
Is voluntary intoxication a defense?
(A) No, because battery is a general-intent crime.
(B) Yes, because he did not form intent.
(C) Yes, but only if he was unconscious.
(D) Yes, because intoxication is a defense to all crimes.
**Best answer: A.**

**INTOX-3 (premeditation).** A defendant who drank heavily killed a man in a fight. The prosecutor charges first-degree premeditated murder. The defendant offers evidence that he was too intoxicated to premeditate. The jurisdiction treats first-degree murder as requiring premeditation and deliberation.
Is the evidence relevant?
(A) Yes, because voluntary intoxication may negate premeditation and deliberation, a specific mental state.
(B) No, because voluntary intoxication is never relevant.
(C) No, because it applies only to second-degree murder.
(D) Yes, because it constitutes a complete defense to any homicide.
**Best answer: A.** (He may still be guilty of second-degree murder.)

**INTOX-4 (involuntary).** A woman was secretly given a drug in her drink at a party by a friend as a prank. She became disoriented, drove a car she believed was hers, and collided with a parked car, causing damage. She is charged with a crime of general intent.
Is involuntary intoxication a defense?
(A) Yes, if it prevented her from having the required mental state or understanding her actions.
(B) No, because she drove voluntarily.
(C) No, because intoxication is never a defense to general-intent crimes.
(D) Yes, but only if she was insane afterwards.
**Best answer: A.**

**CAUSE-1 (medical negligence).** A man stabbed a victim, who was taken to a hospital. A doctor negligently failed to give the victim a routine treatment and the victim died of infection that would otherwise have been treated.
Is the stabber guilty of homicide?
(A) Yes, because ordinary medical negligence does not break the chain of causation.
(B) No, because the doctor was the cause of death.
(C) No, because the stab wound was not fatal on its own.
(D) Yes, only if the doctor was grossly negligent.
**Best answer: A.** Only grossly abnormal medical treatment is a superseding cause.

**CAUSE-2 (eggshell victim).** A man hit a hemophiliac in the nose in a bar fight. Because of the hemophilia, the victim bled to death. The man did not know of the condition.
Is the man a legal cause of death?
(A) Yes, because he takes the victim as he finds him.
(B) No, because death was not foreseeable.
(C) No, because he lacked intent.
(D) No, because the victim's condition was an intervening cause.
**Best answer: A.** (Mens rea determines the grade of homicide; likely involuntary manslaughter or battery-related.)

**CAUSE-3 (superseding event).** A man shot a victim in the leg during an argument. An ambulance carried the victim to the hospital, but it was hit by a drunk driver who ran a red light, and the victim died in the collision. The gunshot wound would not have been fatal.
Is the shooter guilty of murder?
(A) No, because the drunk driver's act was an unforeseeable independent intervening cause.
(B) Yes, because the victim would not have been in the ambulance but for the shooting.
(C) Yes, because he intended serious harm.
(D) Yes, because he proximately caused the injury.
**Best answer: A.** (He is guilty of the shooting crime.) B states only but-for causation.

**CAUSE-4 (escape reaction).** A man chased a woman through her apartment with a knife. To escape, she jumped from a third-floor window and died. He is charged with murder.
Is he a proximate cause of her death?
(A) Yes, because the victim's attempt to escape was a foreseeable response.
(B) No, because she jumped voluntarily.
(C) No, because he never touched her.
(D) No, because suicide breaks causation.
**Best answer: A.**

**CAUSE-5 (refusal of treatment).** A man stabbed his co-worker. The co-worker refused a blood transfusion on religious grounds and died. A transfusion would likely have saved him.
Is the stabber a legal cause of the death?
(A) Yes, because the victim's refusal of treatment does not break the chain.
(B) No, because the refusal was a voluntary act.
(C) No, because the victim contributed to his death.
(D) No, because the wound was non-fatal.
**Best answer: A.**

**SELF-1 (reasonable mistake).** A week after an acquaintance threatened him with a gun, a man saw the acquaintance on the street. The acquaintance reached swiftly inside his jacket. The man, reasonably believing the acquaintance was drawing a gun, shot and killed him. The acquaintance was reaching for his phone.
Is the man entitled to be acquitted on a self-defense theory?
(A) Yes, because self-defense depends on reasonable appearances at the time of the act.
(B) No, because there was in fact no threat.
(C) No, because the acquaintance was not armed.
(D) Yes, but only to reduce the crime to manslaughter.
**Best answer: A.**

**SELF-2 (excessive force).** During an argument, a man shoved another. The other pushed him back. The first man then pulled a gun and shot him dead. He claims self-defense.
Is he entitled to a self-defense instruction?
(A) No, because he escalated a nondeadly confrontation to deadly force.
(B) Yes, because he was pushed.
(C) Yes, because the other man struck back.
(D) Yes, because the other man was bigger.
**Best answer: A.** (There are no facts of a threat of deadly force.)

**SELF-3 (escalation).** A man slapped another during a dispute. The slapped man pulled a knife and lunged. The first man drew a pistol and shot him.
Is the first man entitled to claim self-defense?
(A) Yes, because the other party escalated a nondeadly encounter into a deadly attack.
(B) No, because he was the initial aggressor.
(C) No, because he used a gun.
(D) No, because he started the fight.
**Best answer: A.** A nondeadly aggressor may use deadly force if the opponent escalates (majority).

**SELF-4 (retreat).** In a jurisdiction that requires retreat before using deadly force if it can be done in complete safety, a man was attacked on a public sidewalk by a stranger with a knife. A shop doorway was two steps behind him and he could have safely stepped into it. He instead shot and killed the stranger.
Is the man entitled to self-defense?
(A) No, because he failed to retreat when he safely could have.
(B) Yes, because he was faced with deadly force.
(C) Yes, because a person need never retreat.
(D) No, because he used a firearm.
**Best answer: A.**

**SELF-5 (castle).** In the same jurisdiction, a man was attacked in his own living room by an intruder with a knife. He could have escaped through the back door but instead shot the intruder.
Is he entitled to self-defense?
(A) Yes, because there is no duty to retreat from one's own dwelling against an intruder.
(B) No, because the jurisdiction requires retreat.
(C) No, because he could have escaped.
(D) No, because the intruder never touched him.
**Best answer: A.**

**SELF-6 (withdrawal).** A started a fistfight, then dropped his hands, stepped back and said, "I'm done, let's stop." B pulled a knife and charged. A shot B.
Is A entitled to self-defense?
(A) Yes, because A effectively withdrew and communicated it, regaining the right.
(B) No, because A was the initial aggressor.
(C) No, because he used a gun.
(D) No, because B may have been provoked.
**Best answer: A.**

**SELF-7 (defense of others).** A man saw two plainclothes officers using lawful force to subdue a struggling suspect. He reasonably believed the suspect was being mugged and tackled one officer, injuring him. The jurisdiction follows the majority rule on defense of others.
Is the man guilty of battery on the officer?
(A) No, because he reasonably believed he was defending another from unlawful force.
(B) Yes, because the person he defended had no right to resist lawful arrest.
(C) Yes, because he was mistaken.
(D) No, because he did not know the suspect.
**Best answer: A.** (Under the "alter ego" minority rule he would stand in the suspect's shoes and answer B.)

**PROP-1 (defense of property).** A homeowner saw a teenager walking away with a bicycle from his front porch. He fired a shotgun and killed the teenager.
Is the homeowner entitled to a defense?
(A) No, because deadly force cannot be used merely to protect property.
(B) Yes, because the teenager was a thief.
(C) Yes, because the homeowner was in his own yard.
(D) Yes, because he reasonably believed the bicycle was his.
**Best answer: A.**

**NEC-1.** A hiker, caught in a blizzard, broke a window to enter a locked cabin and burned furniture to stay warm until rescue. He is charged with burglary and destruction of property.
Is necessity a defense?
(A) Yes, because he reasonably avoided a greater harm.
(B) No, because necessity is only a defense to homicide.
(C) No, because the cabin was not his.
(D) No, because he used force.
**Best answer: A.** (He may owe the cabin owner civil restitution.)

**NEC-2.** A mountaineer cut a rope tying him to a fellow climber who was dangling, killing the climber, to avoid being pulled off. He is charged with murder.
Is necessity a defense?
(A) Generally no, because necessity does not justify intentionally killing an innocent person.
(B) Yes, because he saved a life.
(C) Yes, because he reasonably believed he would die.
(D) No, because he did not act quickly.
**Best answer: A.** (Some jurisdictions and the MPC's lesser-evils test may differ; a stem will say.)

**DUR-1.** A man was told by an armed stranger, "Drive me to the bank or I will shoot you now." The man drove him there. The stranger robbed the bank. The man is charged as an accomplice to robbery.
Is duress a defense?
(A) Yes, because he acted under an imminent threat of death.
(B) No, because he knowingly aided.
(C) No, because duress applies only to misdemeanors.
(D) No, because he could have refused.
**Best answer: A.**

**DUR-2.** A gang leader told a man, "Kill this man or I will kill you." The man shot and killed an innocent person.
Under the common law, is duress a defense to murder?
(A) No, because duress is not a defense to intentional killing.
(B) Yes, because he faced death.
(C) Yes, if the threat was credible.
(D) Yes, because he acted involuntarily.
**Best answer: A.** (The MPC does not exclude murder.)

**DUR-3.** A man was told that his family would be harmed next week unless he forged checks. He forged the checks the next day without trying to contact the police. Common law applies.
Is duress a defense?
(A) No, because the threatened harm was not imminent.
(B) Yes, because of the threat to his family.
(C) Yes, because forgery is not violent.
(D) No, because forgery is a felony.
**Best answer: A.** (Under the MPC, immediacy is not required.)

**ENT-1 (predisposition).** An undercover officer posing as a buyer approached a known drug dealer and asked to buy heroin. The dealer immediately sold. The jurisdiction applies the subjective entrapment test.
Is entrapment a defense?
(A) No, because he was predisposed and the officer only provided an opportunity.
(B) Yes, because the officer initiated the contact.
(C) Yes, because the officer lied about being a buyer.
(D) Yes, because the officer asked him to sell.
**Best answer: A.**

**ENT-2 (inducement and lack of predisposition).** A government informant befriended a man with no criminal record and, over a year, repeatedly begged him to supply illegal drugs, citing personal suffering, until the man finally did. The man refused six times before agreeing. The jurisdiction applies the subjective test.
What should the trial court do on the entrapment defense?
(A) Submit it to the jury, because the evidence of inducement and lack of predisposition would allow an acquittal.
(B) Reject it because he committed the act.
(C) Reject it because he eventually agreed.
(D) Grant it automatically because the informant was a friend.
**Best answer: A.** The prosecution must prove predisposition beyond a reasonable doubt once the defendant shows inducement. Jacobson v. United States.

**ENT-3 (objective test).** A police decoy offered a known drug dealer ten times the market price to sell drugs to him. The jurisdiction applies the objective entrapment test (the Model Penal Code approach).
Is entrapment available?
(A) Yes, if the offer would induce a normally law-abiding person, regardless of the dealer's predisposition.
(B) No, because he was a known dealer.
(C) No, because he had prior convictions.
(D) Yes, because police must never offer money.
**Best answer: A.**

**ENT-4 (opportunity only).** An undercover officer posing as a fence let it be known at a pawn shop that he would buy "no-questions-asked" goods. A man who had just stolen a laptop sold it to him. The man was charged with larceny of the laptop and with selling stolen property. He pleads entrapment.
Is entrapment likely to succeed?
(A) No, because the government merely afforded an opportunity to a person ready to commit the offense.
(B) Yes, because the police created the market.
(C) Yes, because the officer lied about who he was.
(D) Yes, under due process.
**Best answer: A.** Deception about identity and providing an opportunity are not inducement. (And the larceny was already complete.)

**JUR-1.** Standing in State A, a man fired a rifle across the state line and killed a hiker in State B.
Which statement is most accurate?
(A) Either state has jurisdiction to prosecute, and separate-sovereign doctrine means a prosecution in one does not bar a prosecution in the other for double jeopardy purposes.
(B) Only State A, where he acted.
(C) Only State B, where the victim died.
(D) Neither, because the federal government has exclusive jurisdiction.
**Best answer: A.** (Heath v. Alabama.)

---
# PART B. CONSTITUTIONAL PROTECTION OF ACCUSED PERSONS (outline V; about half of the 25 questions)

Everything in Part B is US Constitution law (the MBE tests federal constitutional minimums, not state constitutions or state statutes that are more protective). For the case lists: [K] unless a [V] mark is shown. 2025 and 2026 decisions I verified are marked [V] and collected in section 14.

## 7. Arrest, search and seizure (V.A)

### 7.1 Rules

**Is it a search or a seizure?**
- **Search** = government intrusion on a reasonable expectation of privacy (Katz v. United States, 1967) **or** a physical trespass on persons, houses, papers or effects to gather information (United States v. Jones, 2012, GPS on a car; Florida v. Jardines, 2013, drug-sniffing dog on the front porch curtilage). Searches: thermal imaging of a home (Kyllo, 2001); cell-phone contents (Riley v. California, 2014); historical cell-site location information for 7 or more days (Carpenter v. United States, 2018). **Chatrie v. United States (decided June 29, 2026): obtaining Google Location History data in a geofence warrant is a Fourth Amendment search; the Court remanded the warrant's validity and good-faith issues** [V: SCOTUSblog column https://scotusblog.com/2026/07/the-courts-criminal-law-term-overview-and-observations ; CRS https://www.congress.gov/crs-product/LSB11274 (search snippet only) ; some summaries give the vote as 6-3 with a 5+1 majority split, Wikipedia's text was inconsistent, so [?] on the vote and on the breadth of the reasoning].
- **Not searches:** open fields (Oliver v. United States), garbage left at the curb (California v. Greenwood), aerial observation from public airspace (California v. Ciraolo; Florida v. Riley), a dog sniff of luggage or of a car during a lawful stop (United States v. Place; Illinois v. Caballes), information given to a third party such as bank records and phone numbers dialed (United States v. Miller; Smith v. Maryland), private searches (United States v. Jacobsen), voluntarily exposed things in plain view from a lawful vantage point.
- **Standing** ("who can complain") is a Fourth Amendment question: only a person with their own reasonable expectation of privacy in the place searched (Rakas v. Illinois, 1978). Overnight guests have it (Minnesota v. Olson, 1990); short-term commercial visitors do not (Minnesota v. Carter, 1998); a car passenger cannot contest a search of the car but **can contest the stop**, because a passenger is seized (Brendlin v. California, 2007); an unauthorised driver of a rental car may have an expectation of privacy (Byrd v. United States, 2018).
- **Seizure of a person** = a reasonable person would not feel free to leave or end the encounter (United States v. Mendenhall; Florida v. Bostick). By force, a seizure occurs when an officer applies physical force with intent to restrain, even if the person escapes (Torres v. Madrid, 2021); by show of authority only if the person submits (California v. Hodari D.).

**Levels of police-citizen contact:** (1) consensual encounter, no suspicion needed; (2) **Terry stop**: reasonable suspicion of criminal activity based on specific articulable facts (Terry v. Ohio); (3) **frisk** of a stopped person only with reasonable suspicion he is armed and dangerous; limited to a pat-down for weapons, seizing other contraband only if its identity is "immediately apparent" by plain feel (Minnesota v. Dickerson); (4) **arrest** requires probable cause. Related: anonymous tip about concealed gun with no indicia of reliability is insufficient (Florida v. J.L., 2000); a tip about reckless driving through a 911 call can suffice (Navarette v. California, 2014); unprovoked flight in a high-crime area adds to suspicion (Illinois v. Wardlow, 2000); officer may stop a car when the registered owner is known to have a revoked license, absent contrary info (Kansas v. Glover, 2020); a reasonable mistake of law can support reasonable suspicion (Heien v. North Carolina, 2014). **Traffic stops:** valid whenever there is probable cause of a traffic violation, regardless of the officer's motive (Whren v. United States, 1996); the officer may order the driver and passengers out (Pennsylvania v. Mimms; Maryland v. Wilson) and frisk a passenger with reasonable suspicion of danger (Arizona v. Johnson); the stop may not be prolonged beyond the time needed for the traffic mission to conduct a dog sniff without reasonable suspicion (Rodriguez v. United States, 2015).

**Arrests:** probable cause (Gerstein v. Pugh: prompt judicial determination, presumptively within 48 hours, County of Riverside v. McLaughlin); warrantless arrest in public for a felony (United States v. Watson) and even for a fine-only misdemeanor committed in the officer's presence (Atwater v. City of Lago Vista, 2001; Virginia v. Moore, 2008: violating state arrest law doesn't by itself violate the Fourth Amendment). **Entering a home** to arrest requires an arrest warrant plus reason to believe the suspect is inside (Payton v. New York, 1980); entering a third party's home to find the suspect needs a search warrant (Steagald v. United States). **Force:** deadly force against a fleeing suspect only if probable cause he poses a significant threat of death or serious injury (Tennessee v. Garner, 1985); excessive-force claims use objective reasonableness under the totality (Graham v. Connor, 1989); the totality includes events before the moment of threat, rejecting the "moment of threat" rule (**Barnes v. Felix, May 15, 2025, unanimous, Kagan, 605 U.S. 73 [V]** https://en.wikipedia.org/wiki/Barnes_v._Felix ).

**Warrants:** probable cause (totality of the circumstances, Illinois v. Gates, 1983; informant tips are weighed by veracity, basis of knowledge, corroboration), oath or affirmation, neutral and detached magistrate, particular description of the place and items. A deliberately or recklessly false statement necessary to probable cause voids the warrant (Franks v. Delaware, 1978). A warrant for premises doesn't authorise a search of persons merely present (Ybarra v. Illinois, 1979), but occupants may be detained during the search (Michigan v. Summers). **Knock-and-announce** is part of reasonableness (Wilson v. Arkansas; Richards v. Wisconsin: no-knock needs reasonable suspicion of danger or evidence destruction; United States v. Banks: about 15-20 seconds), but violation **does not require suppression** (Hudson v. Michigan, 2006).

**Warrantless searches, exceptions** (a warrantless search is per se unreasonable unless an exception applies):
1. **Search incident to lawful arrest:** of the arrestee's person and the area within his immediate control (Chimel v. California, 1969); full search of the person (United States v. Robinson); **vehicles (Arizona v. Gant, 2009): only when the arrestee is unsecured and within reaching distance of the passenger compartment, or when it's reasonable to believe evidence of the offense of arrest is in the vehicle**; not for a citation (Knowles v. Iowa); **not for data on a cell phone (Riley)**; protective sweep of areas adjoining the arrest site (Maryland v. Buie, 1990); breath tests incident to DUI arrest yes, blood tests no (Birchfield v. North Dakota, 2016).
2. **Automobile exception:** probable cause to believe the vehicle contains evidence or contraband allows a search of any part of the vehicle and containers in it that could hold the item, including the trunk (Carroll; United States v. Ross; California v. Acevedo; Wyoming v. Houghton, passengers' belongings). It doesn't authorise entry into a home's curtilage to reach a vehicle (Collins v. Virginia, 2018).
3. **Plain view:** officer lawfully in a place, lawful right of access to the object, incriminating character "immediately apparent" (probable cause) (Horton v. California: inadvertence not required; Arizona v. Hicks, 1987: moving stereo equipment to read serial numbers was a search needing probable cause).
4. **Consent:** voluntary under the totality (Schneckloth v. Bustamonte), no warning of a right to refuse needed; third-party consent from one with common authority (United States v. Matlock) or apparent authority (Illinois v. Rodriguez, 1990); a physically present co-occupant's refusal controls over another occupant's consent (Georgia v. Randolph, 2006), but not if the objecting occupant has been lawfully removed (Fernandez v. California, 2014).
5. **Exigent circumstances:** hot pursuit of a fleeing felon (Warden v. Hayden); **fleeing misdemeanant: no categorical rule, case by case (Lange v. California, 2021 [V])**; imminent destruction of evidence, including where police knock and the occupants respond by destroying evidence, so long as police did not violate or threaten to violate the Fourth Amendment (Kentucky v. King, 2011); **emergency aid:** objectively reasonable basis to believe an occupant is seriously injured or imminently threatened (Brigham City v. Stuart, 2006), and **Case v. Montana (Jan. 14, 2026, 9-0, Kagan): Brigham City applies "without further gloss"; probable cause isn't required** [V] https://www.law.cornell.edu/supremecourt/text/24-624 ; **blood draws:** natural dissipation of alcohol is not a per se exigency (Missouri v. McNeely, 2013) but an unconscious drunk-driving suspect's blood may generally be drawn under exigency (Mitchell v. Wisconsin, 2019, plurality) [V] https://en.wikipedia.org/wiki/Mitchell_v._Wisconsin .
6. **Stop-and-frisk, including cars** (Michigan v. Long: protective search of passenger compartment with reasonable suspicion of a weapon).
7. **Inventory searches** of lawfully impounded cars and arrestees' property, following standardised procedures (South Dakota v. Opperman; Colorado v. Bertine; Florida v. Wells). **Community caretaking** of vehicles (Cady v. Dombrowski) does **not** justify warrantless home entries or gun seizures from a home (Caniglia v. Strom, 2021).
8. **Special needs / administrative:** sobriety checkpoints and fixed immigration checkpoints are valid (Michigan Dept. of State Police v. Sitz; United States v. Martinez-Fuerte); a general narcotics checkpoint is not (City of Indianapolis v. Edmond); an information-seeking checkpoint about a recent crime is (Illinois v. Lidster); schools may search students with reasonable suspicion (New Jersey v. T.L.O.) and test athletes and participants without suspicion (Vernonia v. Acton; Board of Education v. Earls); probationers and parolees (United States v. Knights; Samson v. California); border: routine searches need no suspicion, highly intrusive searches of the person need reasonable suspicion (United States v. Flores-Montano; United States v. Montoya de Hernandez); DNA swab of arrestees held for serious offenses (Maryland v. King). Whether border searches of phones need a warrant: not decided by the Supreme Court as far as I found [?].

**Exclusionary rule** (Mapp v. Ohio, applies to the states): evidence from an unconstitutional search is excluded, as is its **fruit** (Wong Sun v. United States). **Exceptions:** *independent source* (Murray v. United States); *inevitable discovery* by a preponderance (Nix v. Williams); *attenuation* (Brown v. Illinois factors; **Utah v. Strieff (2016): an unlawful stop followed by discovery of a valid outstanding arrest warrant attenuates the taint**); *good faith* reliance on a later-invalidated warrant (United States v. Leon), on a statute, on binding appellate precedent (Davis v. United States, 2011), and isolated negligent recordkeeping (Herring v. United States, 2009); *impeachment* of the defendant's own testimony (Walder; Havens; not other witnesses: James v. Illinois); no exclusion in grand jury proceedings (United States v. Calandra), civil tax cases, or parole revocation. The rule does not apply to private searches. Violations of **knock-and-announce** don't trigger exclusion (Hudson). *Standing* applies (Rakas).

**Traps:** forgetting Gant's two prongs; searching trunk under SITA (wrong; trunk only under the automobile exception); Randolph vs Fernandez; forgetting that probable cause (not reasonable suspicion) is the plain-view and automobile standard; treating a drug-dog sniff of a car in a lawful stop as a search (not) while the sniff on a home's porch is (Jardines); suppressing for knock-and-announce; applying the exclusionary rule at a grand jury; passengers and standing.

### 7.2 Questions

**SEARCH-1 (trash).** Without a warrant, police took garbage bags that a suspect had left at the curb for collection and found evidence of bomb-making. The suspect moves to suppress.
Should the motion be granted?
(A) No, because he had no reasonable expectation of privacy in trash left for collection.
(B) Yes, because the search was without a warrant.
(C) Yes, because the bags were within the curtilage.
(D) Yes, because the officers lacked probable cause.
**Best answer: A.** California v. Greenwood. (If the bags were still inside the curtilage, the analysis could differ, but the stem says curb for collection.)

**SEARCH-2 (dog at door).** Officers walked a trained narcotics dog onto a homeowner's front porch. The dog alerted. On that alert alone, a magistrate issued a warrant, and police found drugs inside.
Is the evidence admissible?
(A) No, because bringing the dog to the door was a search of the curtilage without probable cause or a warrant, and the warrant relied on it.
(B) Yes, because a dog sniff is never a search.
(C) Yes, because the officers were on a walkway open to visitors.
(D) Yes, because the home was not entered until the warrant issued.
**Best answer: A.** Florida v. Jardines. B applies Caballes (cars and luggage). C: the implied license doesn't cover a drug dog.

**SEARCH-3 (passenger).** Police stopped a car with no reason for the stop, searched the glove box, and found a gun. The passenger was charged with possessing it. He had no ownership of the car.
May the passenger challenge the legality of the traffic stop?
(A) Yes, because a passenger is seized when the car is stopped.
(B) No, because he had no privacy interest in the car.
(C) No, because only the driver may challenge a traffic stop.
(D) Yes, but only if he owned the gun.
**Best answer: A.** Brendlin v. California. (The passenger cannot contest the glove-box search itself, but he can contest the stop.)

**SEARCH-4 (CSLI).** Without a warrant, police obtained from a wireless carrier ten days of historical cell-site location records for a robbery suspect's phone and used them to place him near several robberies.
Was obtaining the records a Fourth Amendment search requiring a warrant?
(A) Yes, because extended historical location data reveals the privacies of life.
(B) No, because the records belonged to the carrier.
(C) No, because the suspect was in public.
(D) Yes, but only if the carrier objected.
**Best answer: A.** Carpenter v. United States (2018), extended in spirit by Chatrie (2026) for location-history data. B is the third-party doctrine rejected here.

**SEARCH-5 (overnight guest).** A man staying overnight as a guest at a friend's apartment was asleep there when police entered without a warrant or exigency and found drugs in the bag he had brought.
May he challenge the entry?
(A) Yes, because an overnight guest has a reasonable expectation of privacy in the host's home.
(B) No, because he does not own the apartment.
(C) No, because the drugs belonged to him.
(D) Yes, only if the host consented.
**Best answer: A.** Minnesota v. Olson. (Contrast Carter: a short commercial visitor.)

**SEARCH-6 (phone incident to arrest).** Police arrested a man for assault and, without a warrant, searched the contents of his smartphone, finding photos linking him to a burglary.
Is the evidence admissible?
(A) No, because police generally need a warrant to search a phone seized incident to arrest.
(B) Yes, because the phone was on his person.
(C) Yes, because arrestees have no privacy in the contents of containers.
(D) Yes, because the arrest was lawful.
**Best answer: A.** Riley v. California.

**WARR-1 (Franks).** An affidavit for a warrant to search a house for drugs stated that an informant had personally seen cocaine there that week. The affiant knew the informant had said nothing of the kind. Without that statement, the affidavit showed no probable cause. The warrant issued and drugs were found.
How should the court rule on a motion to suppress?
(A) Grant it if the defendant proves the false statement was knowing or reckless and necessary to probable cause.
(B) Deny it because the magistrate found probable cause.
(C) Deny it because the drugs were found.
(D) Grant it only if the informant testifies.
**Best answer: A.** Franks v. Delaware.

**WARR-2 (patron).** Police had a valid warrant to search a tavern and its bartender for drugs. While executing it, an officer patted down a customer, felt a bulge, and found heroin.
Is the heroin admissible against the customer?
(A) No, because the warrant didn't authorise searching patrons and the officer had no individualised suspicion.
(B) Yes, because the officers were lawfully in the tavern.
(C) Yes, because customers lose their privacy rights in taverns.
(D) Yes, because the heroin was found in plain view.
**Best answer: A.** Ybarra v. Illinois.

**WARR-3 (knock and announce).** Officers executing a valid drug warrant yelled "Police!" and forced the door open before the occupant could respond, in violation of the knock-and-announce rule. They found drugs.
Should the drugs be suppressed?
(A) No, because violation of knock-and-announce doesn't require suppression.
(B) Yes, because the entry violated the Fourth Amendment.
(C) Yes, because the warrant was void.
(D) Yes, because the officers lacked reasonable suspicion.
**Best answer: A.** Hudson v. Michigan. (The remedy might be a civil suit or discipline.)

**WARR-4 (arrest warrant, third-party home).** Officers had an arrest warrant for a man. Believing he was staying at a friend's house, they entered the friend's house without a search warrant or consent. He wasn't there, but they saw the friend's stolen goods.
May the friend successfully move to suppress the goods?
(A) Yes, because an arrest warrant does not authorise entering a third party's home without a search warrant.
(B) No, because the officers had an arrest warrant.
(C) No, because the goods were in plain view.
(D) No, because the friend wasn't named in the warrant.
**Best answer: A.** Steagald v. United States. C requires lawful presence first.

**WARR-5 (tip corroboration).** An anonymous letter said a couple would drive to Florida on a particular date, pick up drugs, and drive back, and gave predictive details about their travel. Police corroborated many details, including the trip. They obtained a warrant based on the letter and the corroboration.
Was there probable cause?
(A) Yes, under the totality of the circumstances, corroboration of predictive details can supply it.
(B) No, because the tip was anonymous.
(C) No, because the informant's identity was unknown.
(D) No, because hearsay is inadmissible in warrant applications.
**Best answer: A.** Illinois v. Gates.

**SEIZ-1 (consensual encounter).** Two plainclothes officers boarded a bus, approached a passenger without brandishing weapons, asked to see his ticket, and then asked for consent to search his bag, telling him he could refuse. He agreed. The bag contained cocaine.
Is the cocaine admissible?
(A) Yes, because the encounter was consensual and he voluntarily consented to the search.
(B) No, because the officers lacked reasonable suspicion.
(C) No, because he was seized when the officers boarded.
(D) No, because he was not told of his right to leave.
**Best answer: A.** Florida v. Bostick; Schneckloth. D: no such warning is required.

**SEIZ-2 (anonymous gun tip).** An anonymous caller told police that a young man in a plaid shirt at a bus stop was carrying a gun. Officers went to the stop, saw a man in a plaid shirt, frisked him without seeing any suspicious behavior, and found a gun.
Is the gun admissible?
(A) No, because an anonymous tip that lacks indicia of reliability doesn't give reasonable suspicion for a stop and frisk.
(B) Yes, because carrying a gun is dangerous.
(C) Yes, because the tip described the man accurately.
(D) Yes, because the officers had probable cause.
**Best answer: A.** Florida v. J.L. C: an accurate description of an innocent detail doesn't show the tipster knows about criminality.

**SEIZ-3 (prolonged traffic stop).** An officer stopped a driver for a broken taillight, wrote the warning, then held the driver for 8 more minutes until a drug dog arrived. The dog alerted and the officer found drugs. The officer had no suspicion of drugs.
Is the evidence admissible?
(A) No, because the stop was extended beyond the time needed for the traffic mission without reasonable suspicion.
(B) Yes, because a dog sniff is not a search.
(C) Yes, because the stop was valid at its inception.
(D) Yes, because the delay was brief.
**Best answer: A.** Rodriguez v. United States. B is true of the sniff itself but not of the delay.

**SEIZ-4 (frisk scope).** During a valid stop-and-frisk for weapons, an officer felt a small soft lump in the suspect's jacket, squeezed and rolled it between his fingers, and concluded it was crack cocaine in a plastic bag.
Is the cocaine admissible?
(A) No, because manipulating the object exceeded the frisk's scope and its contraband nature was not immediately apparent.
(B) Yes, because the frisk was valid.
(C) Yes, because an officer may seize any contraband found in a frisk.
(D) Yes, because drugs are dangerous.
**Best answer: A.** Minnesota v. Dickerson. (Plain feel works only if identity is immediately apparent.)

**SEIZ-5 (pretext).** An officer who suspected a driver of drug dealing followed him until he failed to signal a lane change, and then stopped him for the infraction, hoping to find drugs. After the stop, he saw drugs in plain view.
Is the stop valid?
(A) Yes, because the officer had probable cause of a traffic violation; his subjective motive is irrelevant.
(B) No, because the stop was pretextual.
(C) No, because the officer lacked reasonable suspicion of drugs.
(D) No, because failure to signal is minor.
**Best answer: A.** Whren v. United States.

**SEIZ-6 (fine-only arrest).** An officer arrested a driver for not wearing a seat belt, an offense punishable only by a small fine. During the arrest he searched the driver's pockets and found cocaine.
Is the cocaine admissible?
(A) Yes, because a custodial arrest for a minor offense committed in the officer's presence is permitted and the search incident to it was valid.
(B) No, because the offense was too minor.
(C) No, because a warrant was required.
(D) No, because citations don't permit arrests.
**Best answer: A.** Atwater v. City of Lago Vista. (A search incident to a mere citation isn't allowed, Knowles, but this was a custodial arrest.)

**SEIZ-7 (Payton).** Officers with a valid arrest warrant for a man went to his house at 6 a.m., had reason to believe he was inside, entered without a search warrant, and arrested him. They saw an illegal firearm on the table.
Is the firearm admissible?
(A) Yes, because an arrest warrant gives limited authority to enter the suspect's own home, and the gun was in plain view.
(B) No, because a search warrant was required.
(C) No, because it was early morning.
(D) No, because the gun was not mentioned in the warrant.
**Best answer: A.** Payton v. New York.

**SEIZ-8 (flight).** In a high-crime area, a man saw officers approach and ran away. The officers chased, stopped him, and conducted a pat-down for weapons.
Did the officers have reasonable suspicion to stop him?
(A) Yes, because unprovoked flight from police in a high-crime area is suspicious.
(B) No, because running is not a crime.
(C) No, because the area alone is not enough.
(D) No, because stop requires probable cause.
**Best answer: A.** Illinois v. Wardlow. (The frisk needs separate suspicion that he is armed.)

**FORCE-1 (deadly force).** A police officer shot and killed an unarmed teenager fleeing from a burglary through a back yard, who posed no apparent threat of serious harm.
Did the use of deadly force violate the Fourth Amendment?
(A) Yes, because deadly force against a fleeing suspect is justified only if the suspect poses a significant threat of death or serious injury.
(B) No, because burglary is a felony.
(C) No, because the teenager was fleeing.
(D) No, because the officer subjectively believed he was in danger.
**Best answer: A.** Tennessee v. Garner. D is a subjective test, rejected by Graham.

**FORCE-2 (Barnes v. Felix).** An officer stopped a car, stepped onto its door frame as the driver began to drive, and fired within seconds. In the ensuing suit, the officer argues that only the instant of the shooting, when he feared being dragged, matters.
How should the court evaluate the reasonableness of the force?
(A) Under the totality of the circumstances, including events before the moment of threat.
(B) Only at the moment of threat.
(C) Only by the officer's subjective fear.
(D) By whether the suspect committed a felony.
**Best answer: A.** Barnes v. Felix (2025) [V].

**EXC-1 (Gant).** An officer arrested a driver for driving on a suspended license, handcuffed him and put him in the patrol car. The officer then searched the passenger compartment and found cocaine in a jacket. There was no reason to think the car held evidence of the license violation.
Is the cocaine admissible?
(A) No, because the arrestee was secured and there was no reason to believe evidence of the offense of arrest was in the car.
(B) Yes, because a search incident to arrest of the vehicle is always permitted.
(C) Yes, because the arrest was lawful.
(D) Yes, because the cocaine was in the passenger compartment.
**Best answer: A.** Arizona v. Gant.

**EXC-2 (automobile).** Police had probable cause to believe a car's trunk held a stolen painting. They stopped the car on the road and searched the trunk and a closed duffel bag in it without a warrant.
Is the search valid?
(A) Yes, under the automobile exception, which extends to containers that could hold the painting.
(B) No, because no warrant was obtained.
(C) No, because the search was not incident to arrest.
(D) No, because the trunk is outside the passenger compartment.
**Best answer: A.** United States v. Ross. D mixes up Gant with the automobile exception.

**EXC-3 (plain view).** Officers with a warrant to search a home for stolen jewelry saw, on a dresser in the bedroom, a sawed-off shotgun that they knew the owner (a felon) could not lawfully possess. They seized it.
Is the shotgun admissible?
(A) Yes, under plain view: lawful presence, lawful access and immediately apparent incriminating character.
(B) No, because the warrant did not mention a shotgun.
(C) No, because the discovery was not inadvertent.
(D) No, because an officer cannot seize items not listed.
**Best answer: A.** Horton v. California: inadvertence isn't required.

**EXC-4 (Hicks).** Officers lawfully in an apartment investigating a shooting noticed expensive stereo equipment. Suspicious but lacking probable cause, an officer moved a turntable to read its serial number, which matched a stolen unit. He seized it.
Is the stereo admissible?
(A) No, because moving the equipment was a search unsupported by probable cause.
(B) Yes, because the stereo was in plain view.
(C) Yes, because the officer was lawfully present.
(D) Yes, because reading a number is a minimal intrusion.
**Best answer: A.** Arizona v. Hicks. Plain view requires probable cause.

**EXC-5 (co-occupant refuses).** Police asked a woman and her live-in partner, both present at the door, for permission to search the home. She consented. He refused. Police searched anyway and found drugs of the partner.
Is the evidence admissible against the partner?
(A) No, because a physically present co-occupant's refusal controls.
(B) Yes, because one occupant's consent suffices.
(C) Yes, because he lacked authority over the house.
(D) Yes, because police need not respect refusals.
**Best answer: A.** Georgia v. Randolph. Contrast: if he had been arrested and removed, her consent would suffice (Fernandez).

**EXC-6 (apparent authority).** A woman who had moved out of an apartment months earlier, but still had a key, told officers that she lived there and let them in. They reasonably believed her. They found drugs belonging to her ex-partner who lived there.
Is the evidence admissible against the ex-partner?
(A) Yes, because the officers reasonably believed she had authority to consent.
(B) No, because she had no actual authority.
(C) No, because the ex-partner did not consent.
(D) No, because police should have verified.
**Best answer: A.** Illinois v. Rodriguez (apparent authority).

**EXC-7 (exigency; Kentucky v. King).** Officers chasing a drug suspect smelled marijuana outside an apartment door and knocked loudly, announcing "Police." They heard sounds of objects being moved and flushed, then forced their way in and found drugs.
Is the evidence admissible?
(A) Yes, because they reasonably believed evidence was being destroyed and had not created the exigency by violating the Fourth Amendment.
(B) No, because the exigency was police-created.
(C) No, because they needed a warrant.
(D) No, because they entered without consent.
**Best answer: A.** Kentucky v. King.

**EXC-8 (misdemeanant pursuit).** An officer saw a man commit a noise misdemeanor and tried to stop him. The man drove home and pulled into his garage. The officer followed in and arrested him, and observed signs of intoxication.
Does the Fourth Amendment categorically permit the officer to enter a home or garage in pursuit of a fleeing misdemeanant?
(A) No, the exigency analysis is case by case.
(B) Yes, because hot pursuit always justifies entry.
(C) Yes, because he was a lawful target of arrest.
(D) No, because misdemeanors never justify entry.
**Best answer: A.** Lange v. California (2021) [V]. D overstates.

**EXC-9 (emergency aid).** A neighbor told police that a man had threatened to kill himself with a gun, and a welfare check found no answer at the door and a voice from inside. Officers entered without a warrant.
What standard governs the entry?
(A) Whether the officers had an objectively reasonable basis to believe an occupant needed emergency aid.
(B) Probable cause of a crime.
(C) A warrant is always required.
(D) Reasonable suspicion of a crime.
**Best answer: A.** Case v. Montana (2026) [V], reaffirming Brigham City. B and D are rejected by the Court.

**EXC-10 (blood draw).** After a routine traffic stop, officers arrested a driver they suspected of drunk driving and, over his objection, took a blood sample at a hospital without a warrant or any other emergency.
Is the blood-test result admissible?
(A) No, because a warrantless blood draw is not justified merely by dissipation of alcohol or by search incident to arrest.
(B) Yes, because alcohol dissipates.
(C) Yes, because it was incident to arrest.
(D) Yes, because he was lawfully arrested.
**Best answer: A.** McNeely; Birchfield. (A breath test would be permitted incident to arrest.)

**EXC-11 (inventory).** Officers impounded a car after its driver was arrested, and, following standard department procedures, inventoried the contents, opening a closed backpack and finding cocaine.
Is the cocaine admissible?
(A) Yes, because a standardised inventory of a lawfully impounded vehicle is valid.
(B) No, because they lacked probable cause.
(C) No, because they needed a warrant.
(D) No, because the backpack was closed.
**Best answer: A.** South Dakota v. Opperman; Colorado v. Bertine.

**EXC-12 (checkpoints).** A city set up a roadblock where officers stopped every car to check for drunk drivers; another city set up a roadblock where a drug dog sniffed every car for narcotics.
Which statement is most accurate?
(A) The sobriety checkpoint is permissible; the general narcotics checkpoint is not.
(B) Both are permissible.
(C) Neither is permissible.
(D) The narcotics checkpoint is permissible; the sobriety checkpoint is not.
**Best answer: A.** Sitz; Edmond.

**EXC-13 (school).** A school official, acting on a student's report that another student had drugs, searched that student's backpack and found pills.
What standard governs the search?
(A) Reasonable suspicion under the circumstances.
(B) Probable cause and warrant.
(C) No suspicion is needed.
(D) Probable cause only.
**Best answer: A.** T.L.O.

**EXC-14 (community caretaking; home).** Officers, worried about a man who had said something concerning, entered his home without a warrant and seized his firearms, citing their community-caretaking duties. No emergency existed.
Is the seizure justified by the community-caretaking exception?
(A) No, because the community-caretaking exception for vehicles does not extend to the home.
(B) Yes, because the officers were acting in good faith.
(C) Yes, because guns are dangerous.
(D) Yes, because community caretaking is a general exception.
**Best answer: A.** Caniglia v. Strom (2021). (Emergency-aid, a different doctrine, could still justify entry if there's an objectively reasonable basis.)

**EXC-15 (protective sweep).** Officers arrested a suspect in his living room and, with no specific reason, opened a closet next to the living room to check for hiding persons and saw drugs.
Is the evidence admissible?
(A) Yes, because officers may look in spaces immediately adjoining the arrest site without suspicion for a protective sweep.
(B) No, because a search warrant was required.
(C) No, because closets are private.
(D) No, because a sweep requires probable cause.
**Best answer: A.** Maryland v. Buie. (Wider sweeps need reasonable suspicion of danger.)

**EXCL-1 (attenuation).** An officer unlawfully stopped a pedestrian, learned from a check that a valid arrest warrant was outstanding for a traffic violation, arrested him and found drugs in a search incident to arrest.
Are the drugs admissible?
(A) Yes, because the discovery of a valid pre-existing warrant attenuated the connection between the illegal stop and the evidence.
(B) No, because the stop was illegal.
(C) No, because the evidence is the direct fruit of the stop.
(D) Yes, because the stop was in good faith.
**Best answer: A.** Utah v. Strieff (2016) [K]. (The stem assumes an isolated negligent stop, not a flagrant, purposeful one.)

**EXCL-2 (independent source).** Officers illegally entered a warehouse and saw bales of marijuana. They left without touching anything, then obtained a search warrant based entirely on information they had before the entry, without mentioning the entry. They found the bales.
Is the marijuana admissible?
(A) Yes, under the independent-source doctrine, if the decision to seek the warrant was not prompted by the illegal entry.
(B) No, because the entry was illegal.
(C) No, because the officers saw the bales first.
(D) No, because the warrant came after.
**Best answer: A.** Murray v. United States.

**EXCL-3 (inevitable discovery).** During an unlawful interrogation, a murder suspect told police where he buried the victim. A search party was already systematically combing the area where the body lay and would have found it within hours.
Is evidence of the body's location and condition admissible?
(A) Yes, if the prosecution proves by a preponderance that it would inevitably have been discovered by lawful means.
(B) No, because it was derived from the illegal interrogation.
(C) Yes, because the suspect wasn't in custody.
(D) No, because inevitable discovery requires proof beyond a reasonable doubt.
**Best answer: A.** Nix v. Williams (preponderance).

**EXCL-4 (good faith).** Police arrested a man based on a computer record, kept negligently by court staff, showing an outstanding warrant that had in fact been withdrawn. A search incident to arrest found drugs.
Is the evidence admissible?
(A) Yes, because isolated negligence in recordkeeping doesn't justify exclusion.
(B) No, because the arrest was unlawful.
(C) No, because exclusion always follows an illegal arrest.
(D) No, because the police should have verified.
**Best answer: A.** Herring v. United States.

**EXCL-5 (impeachment).** Evidence was suppressed because it was obtained in an illegal search. At trial, the defendant testified that he had never owned a gun. The prosecution wants to introduce the suppressed gun to impeach him.
May it do so?
(A) Yes, to impeach the defendant's own testimony.
(B) No, because the evidence is suppressed.
(C) Yes, and also to impeach any defense witness.
(D) No, because impeachment evidence must be lawfully obtained.
**Best answer: A.** (Not to impeach other witnesses, James v. Illinois.)

**EXCL-6 (fruit of an illegal arrest).** Police arrested a man without probable cause, gave Miranda warnings at the station, and within an hour obtained his confession with no intervening events.
Is the confession admissible?
(A) No, because Miranda warnings alone do not attenuate the taint of an illegal arrest.
(B) Yes, because he waived his rights.
(C) Yes, because the warnings were given.
(D) Yes, because confessions are not physical evidence.
**Best answer: A.** Brown v. Illinois.

**EXCL-7 (where the rule does not apply).** A federal prosecutor presents to a grand jury evidence obtained in a search that was unconstitutional. The defendant, indicted, moves to dismiss the indictment.
Should the motion be granted?
(A) No, because the exclusionary rule does not apply in grand jury proceedings.
(B) Yes, because the evidence was illegally obtained.
(C) Yes, because the grand jury is part of the prosecution.
(D) Yes, because the grand jury was tainted.
**Best answer: A.** United States v. Calandra.

---
## 8. Confessions and the privilege against self-incrimination (V.B)

### 8.1 Rules [K unless marked]

- **Miranda v. Arizona (1966)** warnings are required before **custodial interrogation**. *Custody* = a reasonable person would believe his freedom is restricted to the degree of formal arrest (a routine traffic stop is not custody: Berkemer v. McCarty; a suspect's age counts: J.D.B. v. North Carolina; a prisoner questioned about outside crimes is not automatically in custody: Howes v. Fields). *Interrogation* = express questioning or its functional equivalent, words or actions the police should know are reasonably likely to elicit an incriminating response (Rhode Island v. Innis). Spontaneous statements are admissible. Dickerson v. United States (2000) held Miranda is a constitutional rule; **Vega v. Tekoh (2022, 6-3, Alito): a Miranda violation, by itself, does not support a §1983 claim** since the warnings are prophylactic [V] https://en.wikipedia.org/wiki/Vega_v._Tekoh .
- **Exceptions to the need for warnings:** public safety (New York v. Quarles), routine booking questions (Pennsylvania v. Muniz), undercover agents posing as inmates (Illinois v. Perkins), non-custodial questioning.
- **Waiver:** must be knowing, intelligent, voluntary; can be implied from the course of conduct after the suspect understands and then answers (Berghuis v. Thompkins, 2010: silence alone doesn't waive but a later uncoerced answer can); police need not tell the suspect that a lawyer is trying to reach him (Moran v. Burbine).
- **Invocation:** must be unambiguous (Davis v. United States, 1994: "maybe I should talk to a lawyer" isn't enough; police may continue). **Right to counsel invoked in custody (Edwards v. Arizona):** all interrogation must stop and may not resume unless counsel is present or the suspect himself initiates further talks; applies to any crime (Arizona v. Roberson); the Edwards presumption ends after a **break in custody of 14 days** (Maryland v. Shatzer, 2010 [V]: return to general prison population counts) https://en.wikipedia.org/wiki/Maryland_v._Shatzer . **Right to silence invoked:** police must "scrupulously honor" it; may re-approach after a significant time with fresh warnings (Michigan v. Mosley). Outside custody, a suspect who simply stays silent without expressly invoking cannot later complain that his silence was used (Salinas v. Texas, 2013, plurality).
- **Remedies / use:** statements taken in violation of Miranda are inadmissible in the prosecution's case-in-chief but **voluntary** ones may impeach the defendant's testimony (Harris v. New York); **physical fruits** of an unwarned but voluntary statement are admissible (United States v. Patane); a later warned statement after an earlier unwarned but voluntary one is admissible unless the police used a deliberate two-step technique (Oregon v. Elstad; Missouri v. Seibert, 2004). **Involuntary** (coerced) statements violate due process regardless of Miranda, can't impeach, and require **police coercion** (Colorado v. Connelly, 1986: the confession of a mentally ill man who confessed without police coercion isn't involuntary on due process grounds); harmless-error review applies (Arizona v. Fulminante).
- **Silence:** prosecution can't use post-arrest, post-Miranda silence to impeach (Doyle v. Ohio); cannot comment on the defendant's refusal to testify (Griffin v. California); pre-arrest silence can impeach (Jenkins v. Anderson).
- **Privilege covers testimonial communications**, not physical evidence (blood: Schmerber v. California; handwriting and voice samples; appearing in a lineup). It protects individuals, not corporations, and the act of production can be testimonial (Fisher; Hubbell). Immunity must be use and derivative-use immunity (Kastigar v. United States).
- **Traps:** thinking Miranda is required for any police questioning; forgetting that a traffic stop isn't custody; treating "maybe I need a lawyer" as an invocation; allowing re-initiation after a night in jail (Edwards bright line); assuming statement suppression means fruit (physical) suppression; mixing the Sixth and Fifth Amendment triggers.

### 8.2 Questions

**MIR-1 (custody).** An officer stopped a motorist for speeding and, before issuing a ticket, asked, "Have you been drinking?" The motorist said, "A couple of beers." The officer arrested him and he was charged with drunk driving. No warnings were given before the question.
Is the statement admissible?
(A) Yes, because a roadside traffic stop is not custody for Miranda purposes.
(B) No, because he wasn't free to leave.
(C) No, because the question was incriminating.
(D) No, because he had not waived his rights.
**Best answer: A.** Berkemer v. McCarty.

**MIR-2 (interrogation).** A suspect in custody, who had invoked his right to counsel, sat in the back of a patrol car while two officers in the front talked to each other about how a missing weapon might be found by a child at a nearby playground. The suspect then volunteered where the weapon was.
Is the statement admissible?
(A) Yes, because the officers did not engage in express questioning or its functional equivalent likely to elicit an incriminating response.
(B) No, because he had invoked counsel.
(C) No, because he was in custody.
(D) No, because the officers appealed to his conscience.
**Best answer: A.** Rhode Island v. Innis. (Fact pattern is original; the principle is Innis.)

**MIR-3 (ambiguous invocation).** After a valid Miranda waiver, a suspect said partway through questioning, "Maybe I should talk to a lawyer." The officers continued questioning and he confessed.
Is the confession admissible?
(A) Yes, because the statement was not an unambiguous request for counsel.
(B) No, because the officers should have stopped.
(C) No, because any mention of a lawyer requires cessation.
(D) No, because he had been in custody.
**Best answer: A.** Davis v. United States.

**MIR-4 (Edwards).** A suspect in custody said, "I want a lawyer." Questioning stopped, and he was returned to his cell. The next morning, officers re-read the Miranda warnings, he signed a waiver form, and he confessed. He had been in continuous custody. No lawyer was present.
Is the confession admissible?
(A) No, because once he invoked counsel, police could not reinitiate interrogation without counsel present.
(B) Yes, because he signed a valid waiver.
(C) Yes, because he was re-advised of his rights.
(D) Yes, because a night had passed.
**Best answer: A.** Edwards v. Arizona.

**MIR-5 (break in custody).** A prison inmate invoked his right to counsel when questioned about a robbery, and the interview ended. He returned to the general prison population. Three years later, detectives questioned him about the same robbery, gave fresh warnings, and he waived and confessed.
Is the confession admissible?
(A) Yes, because a long break in custody ends the Edwards presumption.
(B) No, because he had invoked counsel.
(C) No, because no lawyer was present.
(D) No, because he was still in prison.
**Best answer: A.** Maryland v. Shatzer (14 days) [V].

**MIR-6 (implied waiver).** A suspect was read his rights and said he understood them. For two hours he mostly sat silently. When an officer asked whether he had asked God to forgive him for the killing, he answered "Yes." He never said he wished to talk, nor refused.
Is his statement admissible?
(A) Yes, because he understood his rights and then voluntarily responded, which implies a waiver.
(B) No, because the state must prove an express waiver.
(C) No, because his silence was an invocation.
(D) No, because the officer's question was a trick.
**Best answer: A.** Berghuis v. Thompkins.

**MIR-7 (public safety).** Officers chased a robbery suspect into a grocery store, handcuffed him, and, before giving warnings, asked, "Where's the gun?" He nodded toward a shelf and said, "Over there." The gun was recovered.
Are the statement and the gun admissible?
(A) Yes, under the public-safety exception.
(B) No, because he was in custody.
(C) No, because the question was interrogation.
(D) No, because no warnings were given.
**Best answer: A.** New York v. Quarles.

**MIR-8 (deliberate two-step).** Detectives had a policy of questioning suspects in custody without warnings until they confessed, then giving warnings, getting a waiver, and having the suspect repeat the confession. They followed it with a suspect, who made the same statements twice.
Is the second statement admissible?
(A) No, because the deliberate question-first technique undermined the effectiveness of the warnings.
(B) Yes, because he waived his rights the second time.
(C) Yes, because the first statement was voluntary.
(D) Yes, because Miranda has no remedy.
**Best answer: A.** Missouri v. Seibert.

**MIR-9 (Elstad).** Officers came to a man's home about a burglary and briefly questioned him in his living room without warnings; he made an incriminating remark. At the station an hour later, they gave Miranda warnings, he waived, and he confessed. The first questioning was not coercive and there was no deliberate two-step plan.
Is the station confession admissible?
(A) Yes, because the earlier unwarned but voluntary statement does not taint a later warned statement.
(B) No, because it is fruit of the first statement.
(C) No, because the first statement was unwarned.
(D) Yes, because Miranda doesn't apply at stations.
**Best answer: A.** Oregon v. Elstad.

**MIR-10 (undercover cellmate).** An undercover agent posing as an inmate asked a jailed murder suspect, with no warnings, whether he had ever killed anyone. The suspect described his crime.
Is the statement admissible?
(A) Yes, because Miranda doesn't apply to a suspect unaware that he is speaking to a government agent.
(B) No, because he was in custody.
(C) No, because there was interrogation.
(D) No, because he was entitled to counsel.
**Best answer: A.** Illinois v. Perkins. (If he had already been charged, the Sixth Amendment/Massiah analysis would bar it, as in COUN-2.)

**MIR-11 (impeachment).** A defendant's custodial statement was taken without Miranda warnings but was voluntary. At trial, he testified that he was never at the scene, contradicting the statement.
May the prosecution use the statement?
(A) Yes, to impeach his testimony.
(B) No, because it was obtained in violation of Miranda.
(C) Yes, as substantive evidence of guilt.
(D) No, because it was unwarned.
**Best answer: A.** Harris v. New York. (If the statement had been coerced/involuntary, not even impeachment would be allowed.)

**MIR-12 (voluntariness requires police coercion).** A man suffering from a psychotic disorder, hearing voices telling him to confess, walked up to a police officer and confessed to a murder. Police did nothing coercive. He later argued that his confession was involuntary.
Is the confession admissible?
(A) Yes, because involuntariness for due process purposes requires coercive police conduct.
(B) No, because he was mentally ill.
(C) No, because he lacked free will.
(D) No, because no warnings were given.
**Best answer: A.** Colorado v. Connelly. (Also not a custodial interrogation.)

**MIR-13 (Doyle).** After being arrested and given Miranda warnings, a defendant said nothing. At trial, he testified that he was framed. On cross-examination, the prosecutor asked why he did not tell this story to the arresting officer.
Is the question proper?
(A) No, because post-Miranda silence can't be used to impeach.
(B) Yes, because it tests his credibility.
(C) Yes, because he chose to testify.
(D) Yes, because silence is an admission.
**Best answer: A.** Doyle v. Ohio.

**MIR-14 (non-testimonial evidence).** Police compelled a suspect to give a blood sample and to read a script aloud in a lineup for the victim. He invoked the privilege against self-incrimination.
Was his Fifth Amendment privilege violated?
(A) No, because the privilege protects testimonial communications, not physical evidence.
(B) Yes, because both were compelled.
(C) Yes, because he objected.
(D) Yes, because the voice sample was incriminating.
**Best answer: A.** Schmerber v. California. (Fourth Amendment limits on the blood draw are separate.)

**MIR-15 (Patane).** An unwarned suspect in custody voluntarily told police where he hid a gun. They recovered it. The statement was suppressed at trial under Miranda.
Is the gun admissible?
(A) Yes, because physical fruits of a voluntary unwarned statement are admissible.
(B) No, because it is fruit of a Miranda violation.
(C) No, because the statement was suppressed.
(D) No, because it was found as a result of custody.
**Best answer: A.** United States v. Patane.

**MIR-16 (silence invoked).** A suspect told detectives, "I'm done talking," and questioning stopped. Two hours later a different detective gave fresh warnings and asked about a separate crime. The suspect waived and confessed to that crime.
Is the confession admissible?
(A) Yes, because his right to cut off questioning was scrupulously honored.
(B) No, because he invoked silence.
(C) No, because questioning must stop forever once silence is invoked.
(D) No, because it was a different detective.
**Best answer: A.** Michigan v. Mosley.

---

## 9. Lineups and other identification procedures (V.C)

### 9.1 Rules [K]
- **Sixth Amendment:** a suspect is entitled to counsel at a **post-charge** lineup or showup (United States v. Wade; Gilbert v. California). **No counsel** at pre-charge lineups (Kirby v. Illinois, plurality) or at photo displays (United States v. Ash). Counsel's absence at a post-charge lineup leads to exclusion of the lineup identification and possibly of a tainted in-court identification unless the prosecution shows an independent source by clear and convincing evidence.
- **Due process (any time):** an identification procedure that is unnecessarily suggestive and creates a substantial risk of misidentification is inadmissible; reliability is the linchpin (Manson v. Brathwaite). Neil v. Biggers factors: opportunity to view, degree of attention, accuracy of the prior description, level of certainty, time between crime and confrontation. Prompt on-the-scene showups can be justified by necessity (Stovall v. Denno). **Perry v. New Hampshire (2012):** the due process check applies only when the suggestive circumstances were arranged by police, not by chance or private actors.
- Lineups involve no Fifth Amendment privilege (physical/voice evidence).
- **Traps:** requiring counsel at a photo array; requiring counsel before charge; ignoring reliability factors.

### 9.2 Questions

**ID-1.** After an indictment for armed robbery, police arranged a live lineup, did not notify the defendant's appointed lawyer, and the victim identified him.
Is the lineup identification admissible?
(A) No, because the defendant had a Sixth Amendment right to counsel at the post-indictment lineup.
(B) Yes, because lineups are not a critical stage.
(C) Yes, because the victim was certain.
(D) Yes, because the defendant has no Fifth Amendment right.
**Best answer: A.** United States v. Wade.

**ID-2.** Before any charge, police showed a victim a photo array of six people, and she picked the suspect. The suspect's lawyer was not notified.
Is the identification admissible?
(A) Yes, because there is no right to counsel at a photographic display, and the array wasn't unduly suggestive.
(B) No, because counsel was absent.
(C) No, because he was in custody.
(D) No, because photos are hearsay.
**Best answer: A.** United States v. Ash.

**ID-3.** Ten minutes after a convenience-store robbery, police brought the clerk to a suspect detained a block away, who was handcuffed beside a patrol car. The clerk, who had a good look at the robber and had given an accurate description, said, "That's him."
Is the identification admissible?
(A) Yes, because under the totality, including the clerk's opportunity to view and the prompt on-scene showup, the identification is reliable.
(B) No, because the showup was suggestive.
(C) No, because the suspect lacked counsel.
(D) No, because showups are never allowed.
**Best answer: A.** Stovall; Biggers.

**ID-4.** A burglary witness, waiting alone in a police station lobby to give a statement, happened to see a man being escorted out of a side door and, without any prompting from the police, announced, "That's the one who broke into my store." The police had not arranged the encounter.
Does due process require a judicial inquiry into the reliability of the identification?
(A) No, because the suggestive circumstances weren't arranged by police.
(B) Yes, because any suggestive identification must be tested.
(C) Yes, because the witness was uncertain.
(D) Yes, because of the Sixth Amendment.
**Best answer: A.** Perry v. New Hampshire (2012). If police had arranged the confrontation, the Biggers reliability test would apply.

**ID-5.** The day before he was charged, a man was placed in a lineup, with no lawyer present, and was picked out. He later was formally charged.
Is the lineup identification inadmissible for lack of counsel?
(A) No, because the Sixth Amendment right attaches only upon formal charge.
(B) Yes, because he was in custody.
(C) Yes, because counsel is required at all lineups.
(D) Yes, because his Fifth Amendment rights were violated.
**Best answer: A.** Kirby v. Illinois.

---

## 10. Right to counsel (V.D)

### 10.1 Rules [K unless marked]
- **Sixth Amendment right to counsel** attaches at the initiation of adversary judicial proceedings (formal charge, preliminary hearing, indictment, information, arraignment; Rothgery v. Gillespie County: the initial appearance before a magistrate) and applies at all critical stages (arraignment, post-charge lineups, plea negotiations, preliminary hearings, trial, sentencing, first appeal as of right). **Offense-specific:** it doesn't extend to uncharged, factually related crimes unless they are the same offense under Blockburger (McNeil v. Wisconsin; Texas v. Cobb). It is the Fifth Amendment (Miranda-Edwards) right that is not offense-specific.
- **Indigents:** counsel is required for any felony (Gideon v. Wainwright, 1963), for any misdemeanor resulting in actual imprisonment (Argersinger; Scott v. Illinois), and for a suspended sentence that can be activated (Alabama v. Shelton). An uncounseled misdemeanor conviction without jail can be used for enhancement (Nichols v. United States). A first appeal as of right requires counsel (Douglas v. California), but discretionary review doesn't (Ross v. Moffitt).
- **Deliberate elicitation (Massiah v. United States, 1964):** after the right attaches, the government may not deliberately elicit statements from the defendant without counsel, including through informants (United States v. Henry), but may use a passive listener (Kuhlmann v. Wilson). Waiver of Miranda rights generally waives the Sixth Amendment right for questioning (Patterson v. Illinois); police may initiate contact after counsel is appointed if the suspect validly waives (Montejo v. Louisiana, 2009).
- **Effective assistance (Strickland v. Washington, 1984):** (1) deficient performance (objectively unreasonable, strategic choices after reasonable investigation are presumed sound) and (2) prejudice (reasonable probability that the result would have been different). Prejudice presumed where counsel is entirely absent at a critical stage (United States v. Cronic) or has an actual conflict that adversely affected performance (Cuyler v. Sullivan); automatic reversal where a court forces joint representation over a timely objection (Holloway v. Arkansas). Counsel must advise about deportation (Padilla v. Kentucky), must communicate plea offers (Missouri v. Frye; Lafler v. Cooper), and failure to file an appeal on request is prejudicial even after an appeal waiver (**Garza v. Idaho, Feb. 27, 2019, 6-3** [V] https://en.wikipedia.org/wiki/Garza_v._Idaho ).
- **Self-representation (Faretta v. California, 1975):** a competent defendant may waive counsel if the waiver is knowing and intelligent; denial is structural error; the court may appoint standby counsel and may deny self-representation to defendants competent for trial but unable to conduct trial proceedings (Indiana v. Edwards). No right to self-representation on appeal. Counsel decides trial strategy but cannot concede guilt over the defendant's express objection (McCoy v. Louisiana, 2018). Choice of retained counsel is protected (United States v. Gonzalez-Lopez).
- **Traps:** applying Sixth Amendment protection before charge; confusing offense-specific Sixth vs Miranda; assuming a Miranda warning must be repeated; thinking counsel is required at photo arrays; presuming prejudice in ordinary IAC.

### 10.2 Questions

**COUN-1 (suspended sentence).** An indigent defendant was tried for a misdemeanor without appointed counsel and received a suspended 30-day jail term and probation. The prosecution may later activate the jail term if probation is violated.
Was his conviction constitutional?
(A) No, because a suspended sentence that may result in imprisonment requires appointed counsel.
(B) Yes, because he was not actually jailed.
(C) Yes, because misdemeanors never require counsel.
(D) Yes, because probation is not punishment.
**Best answer: A.** Alabama v. Shelton.

**COUN-2 (Massiah).** A defendant was indicted for arson and released on bail. Without his lawyer's knowledge, the police wired his friend, who talked with the defendant about the fire in a casual conversation, steering it to the crime. The defendant made admissions.
Are the admissions admissible at his trial for arson?
(A) No, because the government deliberately elicited statements after the Sixth Amendment right attached.
(B) Yes, because he was not in custody.
(C) Yes, because Miranda doesn't apply to informants.
(D) Yes, because his friend acted voluntarily.
**Best answer: A.** Massiah v. United States. B and C apply Miranda, which is not the issue.

**COUN-3 (offense-specific).** A defendant was indicted for burglary and appointed counsel. Without notifying counsel, detectives gave Miranda warnings, he waived, and they questioned him about an unrelated, uncharged murder. He confessed to the murder.
Is the confession admissible at the murder trial?
(A) Yes, because the Sixth Amendment right is offense-specific and he validly waived his Miranda rights.
(B) No, because he was represented.
(C) No, because the questioning was without counsel.
(D) No, because Massiah applies to all crimes.
**Best answer: A.** McNeil v. Wisconsin.

**COUN-4 (Strickland prejudice).** A defendant convicted of a drug sale argues that his lawyer should have objected to the admission of a certain statement. The record shows that the prosecution had overwhelming independent evidence and there is no reasonable probability that the result would have differed.
Will his ineffective-assistance claim succeed?
(A) No, because he cannot show prejudice.
(B) Yes, because the lawyer's performance was deficient.
(C) Yes, because prejudice is presumed.
(D) Yes, because the verdict was unfair.
**Best answer: A.**

**COUN-5 (self-representation).** A competent defendant told the judge after a thorough warning that he understood the risks and wanted to represent himself. The judge refused, saying that he had no legal training.
Was the refusal proper?
(A) No, because a defendant has the right to self-representation if the waiver is knowing and intelligent; legal skill is irrelevant.
(B) Yes, because only licensed lawyers may represent defendants in felony cases.
(C) Yes, because the court decides who the best lawyer is.
(D) Yes, because Gideon guarantees counsel.
**Best answer: A.** Faretta v. California. (Structural error.)

**COUN-6 (forced joint representation).** Over defense counsel's timely objection that a conflict of interest existed, the trial court required one lawyer to represent three co-defendants. All three were convicted.
What is the proper remedy on appeal?
(A) Automatic reversal, without a showing of prejudice.
(B) Reversal only if prejudice is shown.
(C) No reversal because they had counsel.
(D) Reversal only for the defendant who was most harmed.
**Best answer: A.** Holloway v. Arkansas.

**COUN-7 (first appeal).** An indigent convicted felon wants to appeal as of right. The state refuses to appoint a lawyer for the appeal, but it permits the defendant to file a brief.
Is the refusal constitutional?
(A) No, because there is a right to counsel on a first appeal of right.
(B) Yes, because the Sixth Amendment applies only at trial.
(C) Yes, because he can file a brief.
(D) Yes, because he's convicted.
**Best answer: A.** Douglas v. California.

**COUN-8 (deportation advice).** A noncitizen's lawyer advised him that a guilty plea to a drug charge would have no immigration effect. The plea made his deportation presumptively mandatory under a clear statute. He would have gone to trial had he known.
Can he prevail on an ineffective-assistance claim?
(A) Yes, because counsel's incorrect advice on a clear immigration consequence was deficient and prejudicial.
(B) No, because deportation is a collateral consequence.
(C) No, because plea bargains can't be challenged.
(D) No, because the judge is responsible for advising.
**Best answer: A.** Padilla v. Kentucky; Lee v. United States.

---
## 11. Fair trial and guilty pleas (V.E)

### 11.1 Rules [K unless marked]

**Pretrial and trial rights**
- **Due process disclosure (Brady v. Maryland, 1963):** the prosecution must disclose evidence favorable to the accused that is material to guilt or punishment, even without a request and regardless of good faith; includes impeachment evidence (Giglio) and evidence known only to police (Kyles v. Whitley); "material" = reasonable probability of a different result. Destruction of potentially useful evidence violates due process only on bad faith (Arizona v. Youngblood). Knowing use of false testimony violates due process (Napue).
- **Jury trial (Sixth Amendment, incorporated: Duncan v. Louisiana):** for "serious" offenses (potential imprisonment over 6 months; Baldwin v. New York; Blanton); a jury of at least six (Williams v. Florida; Ballew v. Georgia: five is too few); **unanimous verdict required for serious offenses in state and federal court (Ramos v. Louisiana, 2020; Burch v. Louisiana for six-person juries)**. Any fact (other than a prior conviction) that increases the maximum penalty, or a mandatory minimum, must be found by the jury beyond a reasonable doubt (Apprendi v. New Jersey; Blakely; Alleyne v. United States); **Erlinger v. United States (June 21, 2024, Gorsuch, 6-3): whether ACCA predicates were committed on separate occasions must be found by a unanimous jury beyond reasonable doubt** [V] https://en.wikipedia.org/wiki/Erlinger_v._United_States . No right to a jury for juvenile delinquency or petty offenses.
- **Jury selection:** venire drawn from a fair cross-section (Taylor v. Louisiana; Duren v. Missouri: systematic exclusion), though the petit jury need not reflect the community; **Batson v. Kentucky**: three steps (prima facie case of discrimination; race-neutral explanation; court decides purposeful discrimination); extended to gender (J.E.B. v. Alabama), to defense strikes (Georgia v. McCollum), and to civil cases. A new OT2025 decision (Pitchford v. Cain, May 28, 2026, 5-4) addresses a defendant's fair opportunity to rebut the prosecutor's race-neutral reasons in the Batson process (as summarised by SCOTUSblog) [V, secondary summary only] https://scotusblog.com/2026/07/the-courts-criminal-law-term-overview-and-observations . Death qualification (Witherspoon; Wainwright v. Witt). Pretrial publicity requires a change of venue only where prejudice is presumed or actual bias is shown (Sheppard v. Maxwell; Skilling).
- **Public trial (Waller v. Georgia; Presley v. Georgia):** closure requires an overriding interest, narrowly tailored, with alternatives considered and findings; applies to suppression hearings and voir dire.
- **Speedy trial (Barker v. Wingo):** balance the length of delay, reason, defendant's assertion of the right, prejudice; the remedy is dismissal with prejudice; the right begins at arrest or charge; not at sentencing (Betterman v. Montana).
- **Confrontation:** testimonial hearsay by a witness who doesn't testify is inadmissible unless the declarant is unavailable and the defendant had a prior opportunity to cross-examine (Crawford v. Washington, 2004). Statements made for the primary purpose of addressing an ongoing emergency are nontestimonial (Davis v. Washington; Michigan v. Bryant). Forensic reports require the analyst who made them (Melendez-Diaz; Bullcoming). **Smith v. Arizona (June 21, 2024): when an expert relays an absent analyst's statements as the basis for an opinion and the statements support the opinion only if true, they come in for their truth, so the Confrontation Clause applies if they are testimonial (the Court left the testimonial question to the state court on remand)** [V on holding; vote described inconsistently in the source, [?] on the exact vote] https://en.wikipedia.org/wiki/Smith_v._Arizona . **Bruton v. United States (1968)** bars a joint-trial confession of a non-testifying codefendant that incriminates the defendant; **Samia v. United States (June 23, 2023, 6-3, Thomas): a redacted confession that does not directly name the defendant plus a limiting instruction does not violate the Confrontation Clause** [V] https://en.wikipedia.org/wiki/Samia_v._United_States .
- **Presence and demeanor:** the right to be present at all critical stages (can be lost by disruption: Illinois v. Allen); the state can't compel the defendant to wear jail clothing (Estelle v. Williams) or use visible shackles without case-specific justification (Deck v. Missouri). Presumption of innocence instructions.
- **Right to testify** and **to present a defense** (Rock v. Arkansas; Chambers v. Mississippi; Holmes v. South Carolina). **Competency** (Dusky; the state may require the defendant to prove incompetence by preponderance: Medina v. California; may not require clear and convincing: Cooper v. Oklahoma). **Qualified conferral orders:** **Villarreal v. Texas (Feb. 25, 2026, 9-0, Jackson)** held that a trial court order barring discussion of the defendant's ongoing testimony with counsel during an overnight recess did not violate the right to counsel (as summarised by SCOTUSblog) [V, secondary] https://scotusblog.com/2026/07/the-courts-criminal-law-term-overview-and-observations .

**Guilty pleas**
- A plea must be knowing, intelligent and voluntary; the record must show the defendant understood the rights he waived (jury trial, confrontation, privilege against self-incrimination; Boykin v. Alabama). The judge need not warn of collateral consequences (but counsel must advise on deportation: Padilla). A plea may be valid though motivated by avoidance of a harsher sentence (Brady v. United States) and an **Alford plea** (guilty plea while maintaining innocence, with a factual basis) is valid (North Carolina v. Alford). A prosecutor may threaten to bring more serious charges if a defendant refuses to plead (Bordenkircher v. Hayes) but not vindictively after the defendant exercises a right (Blackledge v. Perry). If the prosecutor breaks a plea agreement, the defendant is entitled to relief (Santobello v. New York). A guilty plea generally waives antecedent non-jurisdictional constitutional claims (Tollett v. Henderson) but not a claim that the statute itself is unconstitutional (Class v. United States, 2018). Defense counsel must communicate formal plea offers and provide effective advice (Frye; Lafler). **Hunter v. United States (June 18, 2026, 8-1, Kagan): an appeal waiver in a plea agreement is unenforceable where enforcement would work a miscarriage of justice** [V, SCOTUSblog summary, I did not read the opinion; [?] on the breadth of the exception] https://scotusblog.com/2026/07/the-courts-criminal-law-term-overview-and-observations .
- **Pretrial release:** preventive detention upheld (United States v. Salerno); excessive bail prohibited (Stack v. Boyle). **Grand jury:** the Fifth Amendment indictment requirement is not incorporated against the states (Hurtado).

### 11.2 Questions

**FAIR-1 (Brady).** After a defendant's conviction for robbery, it came out that a police detective's note, kept in the police file and unknown to the prosecutor, recorded that the eyewitness first said the robber was clean-shaven. The defendant had a beard. The defense never requested exculpatory evidence.
Does the failure to disclose the note violate due process?
(A) Yes, if there is a reasonable probability that disclosure would have changed the result, even though the prosecutor did not know of it and no request was made.
(B) No, because the prosecutor acted in good faith.
(C) No, because the defense never requested it.
(D) No, because the note was in the detective's file.
**Best answer: A.** Brady; Kyles v. Whitley.

**FAIR-2 (J.E.B.).** In a trial where the victim was a woman, a prosecutor used peremptory challenges to remove every woman from the venire. The defense objected.
What should the court do?
(A) Require the prosecutor to give a gender-neutral explanation if the defendant shows a prima facie case, since gender-based peremptory strikes violate equal protection.
(B) Overrule the objection because peremptory challenges need no reason.
(C) Declare a mistrial automatically.
(D) Overrule the objection because women are not a suspect class.
**Best answer: A.** J.E.B. v. Alabama ex rel. T.B.

**FAIR-3 (unanimity).** A state law permits conviction of a felony by a 10-2 jury vote. A defendant is convicted 10-2 of burglary.
Is the conviction valid under the Sixth Amendment?
(A) No, because the Sixth Amendment requires a unanimous verdict for serious offenses in state courts.
(B) Yes, because states may set their own jury rules.
(C) Yes, because only federal juries must be unanimous.
(D) Yes, because 10 is a supermajority.
**Best answer: A.** Ramos v. Louisiana.

**FAIR-4 (speedy trial).** A defendant claims a violation of his Sixth Amendment right to a speedy trial after a fourteen-month delay caused by a crowded docket, during which he repeatedly demanded trial and was jailed.
Which is NOT a factor in deciding the claim?
(A) The strength of the prosecution's evidence of guilt.
(B) The length of the delay.
(C) The reason for the delay.
(D) The defendant's assertion of the right.
**Best answer: A.** Barker v. Wingo factors: length, reason, assertion, prejudice.

**FAIR-5 (Crawford).** At trial for assault, the prosecution offers a signed statement given to a detective at the station by a witness who has since died. The defendant never cross-examined her. The statement describes who attacked her.
Is the statement admissible under the Confrontation Clause?
(A) No, because it is testimonial hearsay and the defendant had no prior opportunity for cross-examination.
(B) Yes, because the witness is unavailable.
(C) Yes, because it was a signed statement.
(D) Yes, because it falls within a hearsay exception.
**Best answer: A.** Crawford v. Washington. (The forfeiture-by-wrongdoing and dying-declaration questions are separate.)

**FAIR-6 (emergency 911).** A woman called 911 and said, "He's here with a knife, he's hitting me, please hurry," then hung up. At trial, she refused to testify. The prosecution offers the 911 recording.
Does the Confrontation Clause bar the recording?
(A) No, because the primary purpose was to meet an ongoing emergency, so the statements are nontestimonial.
(B) Yes, because she is unavailable.
(C) Yes, because 911 calls are always testimonial.
(D) Yes, because the defendant couldn't cross-examine.
**Best answer: A.** Davis v. Washington.

**FAIR-7 (Bruton).** At a joint trial, a non-testifying codefendant's confession said, "Smith and I robbed the bank." The court instructed the jury to consider it only against the codefendant. Smith objects.
Is the Confrontation Clause violated?
(A) Yes, because the confession directly names Smith and a limiting instruction can't cure it.
(B) No, because the court gave a limiting instruction.
(C) No, because the codefendant was convicted.
(D) No, because confessions are reliable.
**Best answer: A.** Bruton. (Samia (2023) allows a redacted confession that doesn't name the defendant with an instruction.)

**FAIR-8 (jail clothing).** Over the defendant's objection, a court required him to stand trial for burglary wearing identifiable jail clothing.
Is this permissible?
(A) No, because compelling a defendant to wear jail clothes in the jury's presence violates due process.
(B) Yes, because security concerns justify it.
(C) Yes, because clothing doesn't matter.
(D) Yes, because he was in custody.
**Best answer: A.** Estelle v. Williams.

**FAIR-9 (jury right).** A defendant was charged with an offense carrying a maximum sentence of nine months in jail and no other penalties. The court denied his request for a jury.
Was the denial proper?
(A) No, because an offense with a maximum over six months is a serious offense carrying a jury right.
(B) Yes, because it was a misdemeanor.
(C) Yes, because jail terms under a year are petty.
(D) Yes, because jury trials are discretionary.
**Best answer: A.** Baldwin v. New York.

**FAIR-10 (closed courtroom).** At the prosecutor's request and without findings, the judge closed the courtroom to the public during the entire pretrial suppression hearing.
Does the closure violate the Sixth Amendment?
(A) Yes, because a closure requires an overriding interest, narrow tailoring, consideration of alternatives, and findings.
(B) No, because suppression hearings are not part of the trial.
(C) No, because the judge has discretion.
(D) No, because only the press has a right of access.
**Best answer: A.** Waller v. Georgia.

**PLEA-1 (Boykin).** At a plea hearing, the judge asked the defendant only whether he wished to plead guilty. The record shows no inquiry into his understanding of the rights he was waiving. He later seeks to vacate the plea.
How should the court rule?
(A) The plea is invalid because the record must show the plea was knowing and voluntary, including waiver of jury, confrontation and self-incrimination rights.
(B) The plea is valid because he said "guilty".
(C) The plea is valid because he had a lawyer.
(D) The plea is valid because the judge is not required to inquire.
**Best answer: A.** Boykin v. Alabama.

**PLEA-2 (Bordenkircher).** A prosecutor told a defendant charged with forgery that if he did not plead guilty to a five-year deal, the prosecutor would seek a habitual-offender indictment carrying life imprisonment. The defendant refused, was indicted, and was convicted.
Is the conviction constitutionally invalid?
(A) No, because a prosecutor may threaten to bring charges that are supported by the evidence during plea bargaining.
(B) Yes, because it was vindictive.
(C) Yes, because it violated the Fifth Amendment.
(D) Yes, because pleas must be offered without threats.
**Best answer: A.** Bordenkircher v. Hayes.

**PLEA-3 (Alford).** A defendant maintains his innocence but, facing a strong case and the risk of a death sentence, pleads guilty to second-degree murder, and the court finds a factual basis.
Is the plea valid?
(A) Yes, a defendant may plead guilty while professing innocence when it is a voluntary, intelligent choice with a factual basis.
(B) No, because a guilty plea requires an admission of guilt.
(C) No, because it was induced by fear.
(D) No, because the court cannot find a factual basis.
**Best answer: A.** North Carolina v. Alford.

**PLEA-4 (Santobello).** A prosecutor agreed to recommend a one-year sentence in exchange for a plea. At sentencing, a different prosecutor recommended the maximum. The defendant objected.
What is the proper remedy?
(A) The court should either enforce the agreement or allow the plea to be withdrawn.
(B) None, because the judge isn't bound.
(C) Vacate the conviction.
(D) Dismiss the charges.
**Best answer: A.** Santobello v. New York.

**PLEA-5 (Tollett).** After pleading guilty, a defendant sought to challenge on appeal the earlier unlawful search that produced the evidence against him.
Can he raise it?
(A) Generally no, because a voluntary guilty plea waives antecedent non-jurisdictional constitutional claims.
(B) Yes, because suppression claims are always preserved.
(C) Yes, because the search was illegal.
(D) Yes, because he didn't waive in writing.
**Best answer: A.** Tollett v. Henderson. (Exception: a claim that the statute of conviction is unconstitutional, Class v. United States.)

---

## 12. Double jeopardy (V.F)

### 12.1 Rules [K unless marked]
- Protects against (1) a second prosecution after acquittal, (2) a second prosecution after conviction for the same offense, (3) multiple punishments for the same offense in one prosecution beyond what the legislature authorised. Applies to the states (Benton v. Maryland). **Attaches** when the jury is sworn (Crist v. Bretz) or, in a bench trial, when the first witness is sworn (Serfass).
- **Same offense:** Blockburger v. United States: each offense must require proof of an element the other doesn't. A lesser included offense is the same offense as the greater (Brown v. Ohio; Harris v. Oklahoma: felony murder and its predicate felony). Conspiracy and the substantive crime are different (no bar). Legislatures may authorise cumulative punishments (Missouri v. Hunter). **Collateral estoppel:** an issue necessarily decided in the defendant's favor by an acquittal can't be relitigated (Ashe v. Swenson).
- **Acquittal** is final even if erroneous (Fong Foo; Smalis v. Pennsylvania; Evans v. Michigan). A directed verdict for the defendant on sufficiency grounds bars retrial. The government cannot appeal an acquittal.
- **Mistrial:** if the defendant moves for it, retrial is permitted unless the prosecutor intentionally goaded the defendant into moving (Oregon v. Kennedy). If the judge declares it over objection, retrial is permitted only if there was "manifest necessity" (a hung jury qualifies: Richardson v. United States; Arizona v. Washington).
- **Appeal:** reversal on **trial error** (erroneously admitted evidence, instructional errors) allows retrial; reversal for **insufficient evidence** bars retrial (Burks v. United States); reversal on weight of the evidence allows retrial (Tibbs v. Florida). Retrial after reversal can't be for a greater offense of which the first jury implicitly acquitted (Green v. United States).
- **Dual sovereignty:** separate sovereigns (federal and state; two states; tribal and federal) may each prosecute (Gamble v. United States, 2019, 7-2; Heath v. Alabama); a state and its city are one sovereign (Waller v. Florida).
- **Not jeopardy:** civil penalties not punitive in purpose or effect (Hudson v. United States); revocation of probation; sentencing enhancement based on prior conduct (Witte).
- **Resentencing after retrial:** a harsher sentence is allowed but not vindictively; the reasons must appear in the record (North Carolina v. Pearce); a jury sentencing acquittal in a capital case (Bullington) bars the death penalty on retrial.
- **Barrett v. United States (Jan. 14, 2026, 9-0, Jackson):** Congress did not clearly authorise cumulative convictions under two weapons-possession subsections for a single act, so one conviction was reversed (the Blockburger presumption against cumulative punishment) [V, SCOTUSblog summary] https://scotusblog.com/2026/07/the-courts-criminal-law-term-overview-and-observations .
- **Traps:** treating a dismissal before the jury is sworn as jeopardy; forgetting dual sovereignty; letting "mistrial on defense motion" bar retrial; letting "reversed on appeal" bar retrial regardless of why; "conspiracy and the target crime are the same offense".

### 12.2 Questions

**DJ-1 (attachment).** The trial court dismissed an indictment on a technical pleading defect at a pretrial motion hearing, before any jury was selected. The state re-indicted.
Does double jeopardy bar the new prosecution?
(A) No, because jeopardy had not attached.
(B) Yes, because the first indictment was dismissed.
(C) Yes, because the state could have fixed the defect.
(D) Yes, because dismissals are acquittals.
**Best answer: A.**

**DJ-2 (erroneous acquittal).** After the prosecution's case, the judge erroneously ruled the evidence insufficient and entered a judgment of acquittal. The state appealed, arguing the judge was wrong.
May the defendant be retried if the appellate court agrees the ruling was erroneous?
(A) No, because an acquittal, even if erroneous, bars retrial.
(B) Yes, because the judge erred.
(C) Yes, because the trial was not completed.
(D) Yes, because jeopardy never attached.
**Best answer: A.** Fong Foo; Smalis.

**DJ-3 (defense mistrial).** The defendant moved for a mistrial after a witness blurted out inadmissible evidence. The judge granted the motion. The prosecutor had not intended to provoke the motion. The state seeks to retry him.
May it do so?
(A) Yes, because a mistrial on the defendant's motion does not bar retrial absent intentional goading.
(B) No, because jeopardy had attached.
(C) No, because the first trial was ended before verdict.
(D) No, because retrial violates due process.
**Best answer: A.** Oregon v. Kennedy.

**DJ-4 (hung jury).** The jury could not reach a verdict after two days, and the judge declared a mistrial over the defendant's objection.
May the state retry the defendant?
(A) Yes, because a genuinely deadlocked jury is manifest necessity.
(B) No, because the defendant objected.
(C) No, because jeopardy attached.
(D) No, because the jury's failure to convict is an acquittal.
**Best answer: A.** Richardson v. United States.

**DJ-5 (dual sovereignty).** A man was convicted in state court of selling drugs. The federal government then prosecuted him in federal court for the same sale.
Is the second prosecution barred?
(A) No, because the federal and state governments are separate sovereigns.
(B) Yes, because it is the same offense.
(C) Yes, because he was already convicted.
(D) Yes, if the state conviction was by a jury.
**Best answer: A.** Gamble v. United States (2019).

**DJ-6 (lesser included).** A man was convicted of joyriding (taking a vehicle without the owner's consent). The state then prosecuted him for auto theft for the same taking of the same car.
Is the second prosecution barred?
(A) Yes, because joyriding is a lesser included offense of auto theft, so they are the same offense.
(B) No, because the charges have different names.
(C) No, because different sovereigns.
(D) No, because the second charge is more serious.
**Best answer: A.** Brown v. Ohio.

**DJ-7 (reversal; trial error).** A conviction was reversed on appeal because the trial judge erroneously admitted a coerced confession. The remaining evidence was strong.
May the state retry the defendant?
(A) Yes, because reversal for trial error does not bar retrial.
(B) No, because the conviction was reversed.
(C) No, because the confession was coerced.
(D) No, because retrial would be vindictive.
**Best answer: A.** (Contrast: reversal for insufficient evidence bars retrial, Burks.)

**DJ-8 (collateral estoppel).** A man was tried for robbing one of six poker players at a game, and the jury acquitted him because it found reasonable doubt that he was one of the robbers. The state then charged him with robbing a different player at the same game. The only contested issue was identity.
Is the second trial barred?
(A) Yes, because the first verdict necessarily decided the identity issue in his favor.
(B) No, because a different victim means a different offense.
(C) No, because jeopardy doesn't apply across offenses.
(D) No, because collateral estoppel is civil only.
**Best answer: A.** Ashe v. Swenson.

---

## 13. Cruel and unusual punishment; burdens of proof; appeal and error; sentencing (V.G, V.H, V.I)

### 13.1 Rules [K unless marked]

**Eighth Amendment (V.G)**
- *Non-capital proportionality:* "gross disproportionality" only in rare cases (Harmelin v. Michigan; Ewing v. California, and Lockyer v. Andrade upheld three-strikes sentences of 25-to-life for theft; Solem v. Helm struck life without parole for a bad check). 
- *Juveniles:* no death penalty (Roper v. Simmons, 2005); no life without parole for non-homicide (Graham v. Florida, 2010); no **mandatory** life without parole for juveniles (Miller v. Alabama, 2012; retroactive: Montgomery v. Louisiana); a sentencer needn't make a finding of permanent incorrigibility (Jones v. Mississippi, 2021).
- *Capital:* no death penalty for intellectually disabled offenders (Atkins v. Virginia, 2002; Hall v. Florida; Moore v. Texas; **Hamm v. Smith** was dismissed as improvidently granted on May 21, 2026, so it set no new rule [V] https://www.scotusblog.com/2026/05/criminal-law-update-some-defense-friendly-rulings-and-a-big-case-that-wasnt/ ); no death penalty for non-homicide crimes against individuals, including child rape (Kennedy v. Louisiana, 2008) [K]; Enmund/Tison for felony murder; no execution of the insane (Ford; Panetti); methods of execution are tested under Baze/Glossip/Bucklew (the challenger must show a feasible alternative and a substantial risk of severe pain).
- *Status/conduct:* punishing the status of addiction is cruel and unusual (Robinson v. California, 1962) but punishing conduct is not (Powell v. Texas, 1968); **City of Grants Pass v. Johnson (2024)** held that enforcing generally applicable public camping ordinances against homeless people doesn't violate the Eighth Amendment [K; 6-3, Gorsuch]. *Excessive Fines Clause* applies to the states (Timbs v. Indiana, 2019). Prison conditions: deliberate indifference (Estelle v. Gamble; Farmer v. Brennan).

**Burdens (V.H)**
- *Beyond a reasonable doubt* for every element (In re Winship, 1970; applies to juvenile adjudication). The state may place the burden on the defendant for an **affirmative defense** (self-defense: Martin v. Ohio; insanity: Leland v. Oregon) but may not shift the burden on an **element**, including by requiring the defendant to disprove malice or heat of passion where that negates an element (Mullaney v. Wilbur) unless the state defines the mitigating factor as a separate matter (Patterson v. New York). *Presumptions:* a mandatory presumption that relieves the state of proving an element violates due process (Sandstrom v. Montana; Francis v. Franklin); a permissive inference is permissible if there is a rational connection (County Court of Ulster v. Allen). *Sufficiency* standard: any rational trier of fact could find the elements beyond a reasonable doubt (Jackson v. Virginia). *Pretrial issues* (voluntariness of a confession, a Fourth Amendment motion) are decided by a preponderance (Lego v. Twomey). Probable cause = fair probability; reasonable suspicion = less than probable cause.

**Appeal and error (V.I)**
- *Constitutional errors are subject to harmless-error review* unless structural: harmless if the state proves beyond a reasonable doubt that the error did not contribute to the verdict (Chapman v. California). *Structural* (automatic reversal): total deprivation of counsel, biased judge, racial discrimination in selection of a grand jury, denial of self-representation, denial of public trial, defective reasonable-doubt instruction (Sullivan v. Louisiana), denial of counsel of choice, a lawyer conceding guilt over the defendant's objection (McCoy). Coerced confessions and misdescription of an element are reviewed for harmlessness (Fulminante; Neder v. United States). Unpreserved errors: plain-error review. The government may not appeal an acquittal; it may appeal pretrial suppression orders (18 U.S.C. §3731) [K]. Federal habeas: state-court rulings reviewed deferentially under AEDPA, with harmless error under Brecht ("substantial and injurious effect").

**Sentencing and related**
- Judicial factfinding that increases the statutory maximum or a mandatory minimum violates the Sixth Amendment (Apprendi; Blakely; Alleyne) except for the fact of a prior conviction (Almendarez-Torres). Federal Guidelines are advisory (United States v. Booker). **Ex post facto:** a law that retroactively increases punishment is forbidden (Calder v. Bull); **Ellingburg v. United States (Jan. 20, 2026, 9-0, Kavanaugh): federal mandatory restitution is criminal punishment for Ex Post Facto purposes** [V, secondary] https://scotusblog.com/2026/07/the-courts-criminal-law-term-overview-and-observations . Vindictiveness: a higher sentence after reconviction needs reasons not based on vindictiveness (Pearce).

### 13.2 Questions

**8A-1.** A 16-year-old was convicted of murder. State law required life imprisonment without parole for all murder convictions, with no discretion to consider age.
Is the sentence constitutional?
(A) No, because mandatory life without parole for juveniles violates the Eighth Amendment.
(B) Yes, because murder is the gravest crime.
(C) Yes, because he was tried as an adult.
(D) Yes, because legislatures set penalties.
**Best answer: A.** Miller v. Alabama.

**8A-2.** A state statute authorised the death penalty for the rape of a child that did not cause death. A defendant was sentenced to death.
Is the sentence constitutional?
(A) No, because the Eighth Amendment bars the death penalty for non-homicide crimes against individuals.
(B) Yes, because child rape is an especially heinous crime.
(C) Yes, because legislatures may set penalties.
(D) Yes, because the jury recommended it.
**Best answer: A.** Kennedy v. Louisiana (2008).

**8A-3.** A defendant with prior convictions for theft was sentenced to 25 years to life under a three-strikes law after a conviction for stealing golf clubs.
Is the sentence unconstitutional?
(A) No, because the Eighth Amendment prohibits only extreme sentences that are grossly disproportionate to the crime, and recidivist statutes receive deference.
(B) Yes, because theft is minor.
(C) Yes, because it is more than the crime deserved.
(D) Yes, because he was not violent.
**Best answer: A.** Ewing v. California; Lockyer v. Andrade.

**8A-4.** A state makes it a crime to be addicted to narcotics, regardless of whether the person has used drugs in the state.
Is the statute constitutional?
(A) No, because punishing the status of addiction as such is cruel and unusual.
(B) Yes, because addiction is harmful.
(C) Yes, because states may regulate drugs.
(D) Yes, because addiction is voluntary.
**Best answer: A.** Robinson v. California.

**8A-5.** A city enforces an ordinance forbidding anyone from sleeping or camping on public property overnight, and a homeless person who had nowhere else to go was fined.
Under the Supreme Court's most recent guidance, does enforcement violate the Eighth Amendment?
(A) No, because the ordinance punishes conduct, not status, and enforcing camping bans against the homeless is not cruel and unusual.
(B) Yes, because homelessness is a status.
(C) Yes, because he had no alternative.
(D) Yes, because the fine was excessive.
**Best answer: A.** City of Grants Pass v. Johnson (2024). [K]

**BURD-1 (burden on an element).** A state's murder statute defines murder as an unlawful killing and presumes malice from the fact of an intentional killing, requiring the defendant to prove by a preponderance that he acted in the heat of passion in order to reduce murder to manslaughter, where heat of passion negates malice, an element of murder.
Is the burden constitutional?
(A) No, because the state must prove every element of the crime beyond a reasonable doubt, including absence of heat of passion where it negates malice.
(B) Yes, because the defendant raises the issue.
(C) Yes, because states set their own burdens.
(D) Yes, because heat of passion is an affirmative defense.
**Best answer: A.** Mullaney v. Wilbur. (Patterson v. New York allows a state to define extreme emotional disturbance as a separate affirmative defense.)

**BURD-2 (affirmative defense).** A state requires a defendant claiming self-defense to prove it by a preponderance of the evidence, where the state's elements of murder do not include the absence of self-defense.
Is this constitutional?
(A) Yes, because the state may place the burden of proving an affirmative defense on the defendant.
(B) No, because the state must always disprove self-defense.
(C) No, because the burden must be beyond a reasonable doubt.
(D) No, because it shifts the burden on intent.
**Best answer: A.** Martin v. Ohio.

**BURD-3 (mandatory presumption).** The jury was instructed that "a person is presumed to intend the ordinary consequences of his voluntary acts," in a murder prosecution where intent was the key issue.
Is the instruction proper?
(A) No, if the jury may have understood it as a mandatory presumption shifting the burden on intent.
(B) Yes, because it merely states common sense.
(C) Yes, because juries are told to use common sense.
(D) Yes, because the defense can rebut it.
**Best answer: A.** Sandstrom v. Montana.

**BURD-4 (suppression standard).** At a hearing on a motion to suppress a confession as involuntary, the trial judge required the prosecution to show voluntariness by a preponderance of the evidence. The defendant argues it should be beyond a reasonable doubt.
What standard applies?
(A) A preponderance of the evidence.
(B) Beyond a reasonable doubt.
(C) Clear and convincing evidence.
(D) Probable cause.
**Best answer: A.** Lego v. Twomey.

**ERR-1.** A defendant's conviction is challenged on direct review because the trial court erroneously admitted a confession obtained in violation of Miranda. The remaining evidence was overwhelming.
Must the conviction be reversed?
(A) No, if the state shows beyond a reasonable doubt that the error was harmless.
(B) Yes, because constitutional errors require reversal.
(C) Yes, because Miranda is structural.
(D) No, because errors never warrant reversal.
**Best answer: A.** Chapman v. California.

**ERR-2.** At trial, a defendant who had asked to represent himself was denied the right and forced to use appointed counsel. The evidence of guilt was overwhelming.
Must the conviction be reversed?
(A) Yes, because denial of self-representation is structural error.
(B) No, because the evidence was overwhelming.
(C) No, because counsel was competent.
(D) No, because there was no prejudice.
**Best answer: A.** McKaskle v. Wiggins; Faretta.

**ERR-3.** A jury acquitted a defendant of robbery. The prosecutor believes the judge made a legal error in an evidentiary ruling that led to the acquittal and wants to appeal.
May the prosecution appeal the acquittal?
(A) No, because double jeopardy bars the government from appealing an acquittal.
(B) Yes, because it's a legal error.
(C) Yes, as in civil cases.
(D) Yes, but only to correct the record.
**Best answer: A.**

**SENT-1 (Apprendi).** A statute sets a 10-year maximum for assault but authorises 20 years if the judge finds, by a preponderance, that the victim was a police officer. A judge so found and imposed 18 years.
Is the sentence constitutional?
(A) No, because any fact other than a prior conviction that increases the maximum must be found by the jury beyond a reasonable doubt.
(B) Yes, because judges may find sentencing facts.
(C) Yes, because the sentence was below 20 years.
(D) Yes, because the judge applied a preponderance.
**Best answer: A.** Apprendi v. New Jersey.

**SENT-2 (Pearce).** A defendant's conviction was reversed on appeal. On retrial he was convicted again and the judge imposed a longer sentence without giving reasons.
Is the higher sentence permitted?
(A) Not without objective reasons for the increase in the record, to protect against vindictiveness.
(B) Yes, because the judge has discretion.
(C) Yes, because a new trial wipes the slate clean.
(D) No, because the second sentence can never exceed the first.
**Best answer: A.** North Carolina v. Pearce.

**SENT-3 (ex post facto).** After a defendant committed a crime, the legislature increased the maximum penalty for the offense. The defendant was sentenced under the new law.
Is the sentence constitutional?
(A) No, because retroactively increasing punishment violates the Ex Post Facto Clause.
(B) Yes, because the legislature may increase penalties.
(C) Yes, because he was sentenced after the law passed.
(D) Yes, because ex post facto applies only to civil laws.
**Best answer: A.** Calder v. Bull.

---
## 14. Recent developments (OT2022 to OT2025) that touch this subject

The MBE tests settled doctrine; NCBE does not announce which new cases it adds, and questions written about a 2026 decision are unlikely for a February 2027 sitting because drafting and pretesting take time (my inference, [?]). Teach the classic rule first and the new case as an "update" card. Verified list:

| Decision | What it holds | Area | Source / status |
|---|---|---|---|
| Vega v. Tekoh (June 23, 2022, 6-3) | Miranda violation alone gives no §1983 claim; Miranda's rules are prophylactic | V.B | [V] Wikipedia summary of the opinion |
| Samia v. United States (June 23, 2023, 6-3) | Redacted non-testifying codefendant confession plus limiting instruction: no Confrontation violation | V.E | [V] Wikipedia |
| Counterman v. Colorado (June 27, 2023, 7-2) | True-threats prosecutions need proof the defendant was at least reckless | 1st Am / mens rea | [V] Wikipedia; peripheral for the MBE |
| Smith v. Arizona (June 21, 2024) | Substitute expert relaying an absent analyst's statements: Confrontation Clause applies if testimonial (remanded) | V.E | [V] Wikipedia (vote unclear in source) |
| Erlinger v. United States (June 21, 2024, 6-3) | Jury, beyond reasonable doubt, decides ACCA "separate occasions" | V.E / sentencing | [V] Wikipedia |
| City of Grants Pass v. Johnson (2024, 6-3) | Camping ordinances do not violate the Eighth Amendment | V.G | [K], not re-opened |
| Barnes v. Felix (May 15, 2025, unanimous) | Excessive-force reasonableness uses the totality, not just the "moment of threat" | V.A | [V] Wikipedia |
| Case v. Montana (Jan 14, 2026, 9-0) | Emergency-aid entry: objectively reasonable basis (Brigham City), no probable cause needed | V.A | [V] LII summary |
| Chatrie v. United States (June 29, 2026) | Getting location-history data (geofence) is a Fourth Amendment search; warrant validity and good faith remanded; vote reported as 6-3 with a 5+1 majority split | V.A | [V] SCOTUSblog (Rory Little column) + CRS/IAPP snippets; [?] on exact lineup |
| Barrett v. United States (Jan 14, 2026, 9-0) | No clear congressional authorisation for cumulative convictions under two firearm subsections for one act | V.F | [V] SCOTUSblog summary |
| Ellingburg v. United States (Jan 20, 2026, 9-0) | Federal mandatory restitution is criminal punishment for the Ex Post Facto Clause | V.G | [V] SCOTUSblog summary |
| Villarreal v. Texas (Feb 25, 2026, 9-0) | Order barring discussing ongoing testimony with counsel during overnight recess does not violate the right to counsel | V.D | [V] SCOTUSblog summary |
| Hamm v. Smith (May 21, 2026) | Dismissed as improvidently granted; leaves Atkins ruling in place; no new rule | V.G | [V] SCOTUSblog |
| Pitchford v. Cain (May 28, 2026, 5-4) | Batson: defendant needs a fair opportunity to rebut the prosecutor's race-neutral reasons | V.E | [V] SCOTUSblog summary only |
| Hunter v. United States (June 18, 2026, 8-1) | Plea-agreement appeal waivers are unenforceable where a miscarriage of justice would result | V.E | [V] SCOTUSblog summary only |
| Bowe, Rico, Fernandez, Rutherford, Olivier, Abouammo (2026) | Federal habeas/sentencing/venue technicalities | post-conviction | [V] SCOTUSblog; not MBE material |
| United States v. Hemani (June 18, 2026) and Wolford v. Lopez (June 25, 2026) | Second Amendment as applied to a regular marijuana user under the "unlawful user" gun ban; Hawaii default ban on carry on private property open to the public | 2A / criminal liability | [V] SCOTUSblog summary; [?] on exact holdings; not in the MBE criminal outline |

Sources for this table: https://scotusblog.com/2026/07/the-courts-criminal-law-term-overview-and-observations (Rory Little, July 15, 2026) and https://www.scotusblog.com/2026/05/criminal-law-update-some-defense-friendly-rulings-and-a-big-case-that-wasnt/ . The SCOTUSblog columnist's summaries are secondary and did not always name the constitutional provision. Read each opinion on law.cornell.edu/supremecourt before using more than the one-line holding.

---

## 15. Notes for building the "Objection" criminal units

### 15.1 Proposed unit map (17 units, about 8 to 10 items each, then unit tests)

1. Homicide I: murder, malice, degrees, premeditation (HOM-1, HOM-5)
2. Homicide II: provocation, manslaughter types (HOM-2 to HOM-4, HOM-6 to HOM-8)
3. Felony murder (FM-1 to FM-5)
4. Property crimes: larceny family, receiving (THEFT-1 to 6)
5. Robbery, burglary, arson (ROB-1 to 4, BURG-1 to 3, ARSON-1 to 3)
6. Person crimes: assault, battery, rape, kidnapping, possession (ASSAULT, RAPE, KIDNAP, POSS)
7. Attempt and impossibility (ATT-1 to 6)
8. Conspiracy, solicitation (CONS, SOL)
9. Parties to crime (ACC)
10. Acts, mental states, strict liability, mistake (ACT, MENS, SL, MIST)
11. Responsibility: insanity, intoxication, causation (INSAN, INTOX, CAUSE)
12. Defenses: self-defense, defense of others/property, necessity, duress, entrapment, jurisdiction (SELF, PROP, NEC, DUR, ENT, JUR)
13. Search and seizure I: what counts, standing, warrants, stops, arrests, force (SEARCH, WARR, SEIZ, FORCE)
14. Search and seizure II: exceptions and the exclusionary rule (EXC, EXCL)
15. Miranda and self-incrimination (MIR)
16. Right to counsel and identifications (COUN, ID)
17. Trial rights, pleas, double jeopardy, Eighth Amendment, burdens, error, sentencing (FAIR, PLEA, DJ, 8A, BURD, ERR, SENT)

Given that about half the exam is constitutional protection, units 13 to 17 should carry about half the lessons and the daily drill should draw about half its items from them.

### 15.2 Card types that fit this subject (Carpe's tricks)

- **Guess-first openers:** "A man takes an umbrella he honestly thinks is his. Larceny?" "Police chase a robber's getaway car; a pedestrian dies. Whose fault under felony murder?" then reveal the rule.
- **Build-from-tiles (ordered):** elements of larceny (trespassory / taking and carrying away / personal property / of another / with intent to permanently deprive); common-law burglary (breaking / entering / dwelling / of another / at night / intent to commit a felony); the Batson steps; the Terry sequence; the Gant two prongs; Strickland's two prongs; the Seibert/Elstad analysis; "Miranda trigger: custody + interrogation".
- **Match pairs:** crime to its defining element (embezzlement / lawful possession then conversion; false pretenses / title passes); case to one-line holding (Terry, Gant, Riley, Edwards, Brendlin, Gideon, Strickland, Batson, Blockburger, Ashe); exception to a fact pattern (plain view, consent, inventory, exigency).
- **Yes/no sorting sets:** specific vs general intent (list in 6.1 B); search or not a search; Miranda required or not; merges or does not merge (attempt yes, solicitation yes, conspiracy no); can retrial happen (bar vs permitted); is hearsay testimonial; is the exclusionary rule applied here; who has Fourth Amendment standing; a majority vs MPC twist sorter.
- **Transfer questions:** every Q above is an unseen fact pattern; the app's "apply the rule to a new fact pattern" card can reuse them directly.
- **Cross-Examination (speed round) one-liners (short true/false chains, one miss ends it):** "Words alone are adequate provocation." (F) "Conspiracy merges into the completed crime." (F) "Attempt merges into the completed crime." (T) "A passenger can challenge the legality of a traffic stop." (T) "Knock-and-announce violations trigger suppression." (F) "A traffic stop is custody for Miranda." (F) "Counsel is required at a photo array." (F) "A hung jury bars retrial." (F) "Duress is a defense to murder at common law." (F) "Voluntary intoxication negates general intent." (F) "The government may appeal an acquittal." (F) "Dual sovereignty lets state and federal both prosecute." (T). Always include the "why" on the miss screen.
- **Teach-it-in-one-breath lines (draft):** "Malice means intent to kill, intent to maim, a depraved heart, or a dangerous felony." "Larceny takes, embezzlement keeps, false pretenses tricks you into giving." "Passion needs a reasonable provocation, no time to cool, and a defendant who didn't." "Felony murder follows the felon, not the victim: if the victim or police kill, the agency rule says no." "Factual impossibility never helps; true legal impossibility always does." "Solicit and attempt merge; conspiracy stays." "Miranda needs custody and interrogation." "Invoke counsel, and Edwards stops the questions until you call or fourteen days pass." "Sixth Amendment attaches at charge, and it is offense-specific." "Acquittal ends it; a hung jury doesn't; your own mistrial motion doesn't."
- **Provenance fields (item `status`/`src`):** every rule here maps to a primary source (the case name or MPC section). For the content writer: `status: exam` should be used only for items shaped like an NCBE-style stem; `status: general` for black-letter rules; `status: unsure` for every [?] item in this file; `src` should name the case or the MPC section. Do not label anything `book` unless it genuinely comes from a text we license.
- **Exam countdown:** February 24, 2027 and July 28, 2027 (MBE day) [V]. State-specific dates vary by jurisdiction; let the user choose their state later.
- **Mascot ideas:** none needed from this file beyond the brand notes in the brief.

### 15.3 Content writing cautions specific to criminal law

1. Always state the governing rule set in the stem ("The jurisdiction defines crimes as at common law" / "The jurisdiction follows the Model Penal Code"), because the MBE does. When it does not, use common law plus majority modern rule.
2. Never ask a question whose answer depends on a minority rule unless the stem states it (retreat; words as provocation; merger; felony-murder causation; time needed for premeditation; accessory mens rea).
3. For Part B, name the case in the explanation, not in the stem (the MBE almost never names cases).
4. Do not copy NCBE stems. The official sample item about the friend who sets up an arrest, the father who shoots his drunken son, and the pharmaceutical president whose pills kill a cancer patient exist in NCBE's free sample PDF; our ACC-3, SELF-1 and CAUSE questions use different facts. Keep it that way.
5. Do not teach state-specific law: no Texas retreat statute, no California felony-murder special rules, no New York "Penal Law" numbering. The MBE tests general law.

---

## 16. Uncertain items to verify before publishing

1. NextGen dates: West Virginia (2027 in one summary, July 2028 in the NCBE chart); whether a July-2026 NextGen jurisdiction also offers the MBE for repeaters in February 2027; confirm each jurisdiction's own bar admissions agency page.
2. Chatrie: exact vote lineup and the breadth of the reasoning (read the opinion).
3. Villarreal, Pitchford, Hunter, Barrett, Ellingburg, Hemani, Wolford, Hamm: only seen through SCOTUSblog summaries or a search summary; read the opinions.
4. MPC section text (210.2, 210.3, 2.02, 2.08, 2.09, 3.04, 4.01, 5.01, 5.03, 213.6): paraphrased from knowledge and from search snippets; the ALI text is paywalled. Verify before quoting.
5. Premeditation timing; imperfect self-defense; the felony-murder "agency" majority claim; "incidental movement" in kidnapping; mistake of fact for rape; "words alone" for provocation: genuine jurisdictional splits; the stem must say.
6. Border search of phones: unresolved in the Supreme Court as far as I found.
7. The 3-4 questions each for the non-constitutional categories is a test-prep site's estimate, not NCBE data.
8. A few classification claims in this file (specific vs general intent for assault, kidnapping, receiving) vary by treatise; teach them as "most courts" and check against a free open casebook (e.g., the CALI / opencasebook Tanaka Criminal Law Casebook).

---

## 17. Sources actually opened (URL list)

Official / primary
- NCBE MBE page (format, 200 questions, dates Feb 24 and July 28, 2027): https://www.ncbex.org/exams/mbe
- NCBE "Preparing for the MBE" (7 subjects, 25 scored per subject): https://www.ncbex.org/exams/mbe/preparing
- NCBE "Sample MBE Questions" page (best answer; "generally accepted fundamental legal principles"): https://www.ncbex.org/exams/mbe/preparing-mbe
- NCBE MBE Subject Matter Outline (PDF, text extracted): https://www.ncbex.org/sites/default/files/2023-01/MBE_Subject_Matter_Outline.pdf
- NCBE MBE Sample Test Questions (PDF; read only for stem style): https://www.ncbex.org/sites/default/files/2025-06/MBE%20Sample%20Test%20Questions.pdf
- NCBE announcement extending the current exam to February 2028: https://www.ncbex.org/news-resources/update-nextgen-exam-content-extends-availability
- NCBE inaugural NextGen administration (July 31, 2026): https://www.ncbex.org/news-resources/ten-jurisdictions-complete-inaugural-administration-nextgen-UBE
- NCBE NextGen adoption table: https://www.ncbex.org/exams/nextgen/nextgen-ube-scores-score-portability/nextgen-ube-adoption-jurisdiction ; chart 17: https://reports.ncbex.org/charts/chart-17/
- NCBE NextGen content scope page and PDF: https://ncbex.org/exams/nextgen/content-scope ; https://www.ncbex.org/sites/default/files/2025-07/NCBE%20NextGen%20UBE%20Content%20Scope-Aug%202025.pdf
- Cornell LII: Case v. Montana (24-624) https://www.law.cornell.edu/supremecourt/text/24-624 ; Wex felony murder https://www.law.cornell.edu/wex/felony_murder_rule ; Wex inchoate offenses https://www.law.cornell.edu/wex/inchoate_offense

Secondary, opened
- SCOTUSblog, Rory Little, "The court's criminal law term: overview and observations" (July 2026): https://scotusblog.com/2026/07/the-courts-criminal-law-term-overview-and-observations
- SCOTUSblog, "Criminal law update: some defense-friendly rulings and a big case that wasn't" (May 2026): https://www.scotusblog.com/2026/05/criminal-law-update-some-defense-friendly-rulings-and-a-big-case-that-wasnt/
- Wikipedia case pages used for dates, votes and holdings: Chatrie v. United States; Barnes v. Felix; Vega v. Tekoh; Erlinger v. United States; Smith v. Arizona; Counterman v. Colorado; Samia v. United States; Maryland v. Shatzer; Kahler v. Kansas; Lange v. California; Garza v. Idaho; Mitchell v. Wisconsin; Model Penal Code.
- JD Advising (test-prep) pages, for the unofficial 12-13 / 3-4 split claim and its lack of method: https://jdadvising.com/criminal-law-and-procedure-on-the-mbe-key-topics/ ; https://jdadvising.com/criminal-law-and-procedure-highly-tested-mbe-topics-charts-and-a-checklist/

Search snippets only (not opened; treat as leads)
- CRS LSB11274 on geofence warrants; IAPP, Just Security, WilmerHale on Chatrie; opencasebook MPC 5.01 and 5.03 pages; federal pattern instruction on attempt; Penn CERL Yaffe paper on intoxication and recklessness; UMKC intoxication statutes page; open-exam-prep.com MBE criminal law summaries.

Pages that failed or were useless: opencasebook.org printable chapter (HTTP 403), ABA Criminal Justice summer 2026 magazine (HTTP 403), NCBE MBE-specific page for the criminal outline (404; I used the PDF instead).
