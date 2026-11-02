# Hooks research for "Objection" (bar-exam rules a tired law grad can remember)

Researched 2026-11-02. Data: `hooks.jsonl` (226 hooks: 74 mnemonic, 68 latin, 48 case, 19 texas, 17 pop). Each row has `topic`, `hook`, `kind`, `source` (list of URLs), plus `subject`, `confidence` (high / medium / uncertain) and an optional `note` saying exactly what was verified and what was not.

How to read `confidence`:
- **high**: the rule text, case facts or Latin meaning was checked against a page opened in this session (LII for FRE, FRCP, UCC; Wikipedia case pages; Wiktionary; NCBE).
- **medium**: standard black-letter law or a hook whose sources were secondary or not re-opened; verify against the opinion/rule before shipping a question that depends on it.
- **uncertain**: do NOT ship as written (see "Do not ship as written" below).

## 1. What students actually sit in 2027 (affects which hooks matter)

From the NCBE page https://www.ncbex.org/exams/nextgen-july-2026 and the content scope https://www.ncbex.org/exams/nextgen/content-scope:
- NextGen UBE first administered July 28-29, 2026 in 10 jurisdictions: Connecticut, Guam, Idaho, Maryland, Missouri, Northern Mariana Islands, Oregon, Palau, Virgin Islands, Washington.
- Next NextGen sitting: **February 23-24, 2027**. The page lists no new jurisdictions for Feb 2027.
- **July 2027** NextGen adds: Arizona, Iowa, Kentucky, Minnesota, Nebraska, New Mexico, North Dakota, Oklahoma, South Dakota, Tennessee, Vermont, Wyoming (a UWorld page also lists West Virginia; NCBE's page does not, so treat West Virginia as unconfirmed).
- The **legacy UBE (which includes the MBE) is "administered through February 2028"**. So in Feb and July 2027 most candidates (every jurisdiction not on the NextGen list) still sit the MBE. Build the app for the MBE first; NextGen is a second track.
- MBE format (https://www.ncbex.org/exams/mbe): 200 multiple-choice questions, 175 scored + 25 unscored pretest, two 3-hour sessions of 100.
- NextGen foundational concepts (July 2026-Feb 2028): Business associations; Civil procedure; Constitutional law; Contract law; Criminal law and constitutional protections of accused persons; Evidence; Real property; Torts. Skills: Legal research, Legal writing, Issue spotting and analysis, Investigation and evaluation, Client counseling and advising, Negotiation and dispute resolution, Client relationship and management. Professional responsibility is not listed, and the page contains no Latin terms.

## 2. Mnemonics: verified, corrected, and flagged

Method: every acronym was mapped letter by letter to primary text (FRE 404/801/804/609/606/403/407-411, FRCP 11/12/23/30/33, UCC 2-201/205/207/302/314/608) or to the case summary. Letters that do not match were dropped or rewritten.

**Verified as correct (use):**
- **MY LEGS** (statute of frauds): Marriage (consideration of marriage), Year (cannot be performed within a year of making), Land, Executor (promise to pay estate debts from own funds), Goods $500+ (UCC 2-201), Surety. https://www.lexplug.com/outlines/contracts/scope-my-legs-marriage-year-land-executor-goods-500-surety , https://www.law.cornell.edu/ucc/2/2-201
- **SAILS** (804(a) unavailability): Stating a privilege, Absent, Ill/dead, Lacks memory, Stubborn refusal. Matches 804(a)(1)-(5). https://www.law.cornell.edu/rules/fre/rule_804
- **CANT(S)** (Rule 23): Commonality, Adequacy, Numerosity, Typicality are 23(a). Superiority belongs only to 23(b)(3). https://www.law.cornell.edu/rules/frcp/rule_23
- **MIMIC** (404(b)): right as a prompt, but incomplete. The rule lists motive, opportunity, intent, preparation, plan, knowledge, identity, absence of mistake, lack of accident, and the list is illustrative. https://www.law.cornell.edu/rules/fre/rule_404
- **CIS** (Commerce Clause: Channels, Instrumentalities, Substantial effects), **ICR** (standing), **SLAPS** (Miller test) all verified against Lopez, Lujan and Miller summaries.
- **IRAC / CREAC**: https://en.wikipedia.org/wiki/IRAC
- **FOUR** irrevocable offers, **TTIP** joint tenancy, **PINT/TIN** covenants, **CHANGE/Heluva** adverse possession (from https://jdadvising.com/a-bakers-dozen-useful-bar-exam-mnemonics/ and https://cmlawlibraryblog.classcaster.net/2008/04/14/how-my-legs-and-heluva-can-help-with-exams/): letter mappings correct.

**New mnemonics we wrote (labeled "ours" in the data; each checked against rule text):** SAMP (2-201 exceptions), O-M-N (2-207(2)), DR. CLR (offer terminators), FAD-FF (804(b)), "A through E" for 801(d)(2), VICE (not-for-truth uses), PENIE (easements), IIA+G (exclusionary-rule taint-removers), DBAPD, CHE, IRP, 2-3-4-5 (Rule 12 waivers), 10-7-25 (discovery limits), "21-day safe harbor", "the five polite exclusions" (FRE 407-411), "felons get balanced, liars get in" (609).

**Do not ship as written:**
- **SWAMP** (found in the first search) includes "Waiver" as a 2-201 exception. It is not one. We replaced it with SAMP.
- **SCREAM** (political questions): "Election and qualifications of Congress" is wrong as a blanket rule; Powell v. McCormack held Congress cannot exclude a duly elected member who meets the constitutional qualifications. Teach the Baker v. Carr markers instead. (uncertain)
- **MOPPS** (privacy): stale unless updated. After Dobbs v. Jackson Women's Health (2022) abortion is not a fundamental right and gets rational basis. https://en.wikipedia.org/wiki/Dobbs_v._Jackson_Women%27s_Health_Organization
- **ESCAPIST** (warrant exceptions): letters are right, but the source's car-search sentence predates Arizona v. Gant (2009) and over-allows searching the passenger compartment.
- **G-SAM** ("S" = sign a contract for sale): whether an executory contract severs a joint tenancy varies. (uncertain)
- **BARRK** (felony-murder felonies): a secondary-source acronym. Wikipedia lists the Model Penal Code's felonies, not a common-law list. The MBE usually gives the statute. (uncertain)
- **Lemon test**: no longer the governing Establishment Clause test after Kennedy v. Bremerton (2022). https://en.wikipedia.org/wiki/Kennedy_v._Bremerton_School_District

## 3. Latin: "you already speak law Latin" (68 entries)

Literal meanings verified against https://en.wikipedia.org/wiki/List_of_Latin_legal_terms (fetched) and Wiktionary. Best teaching moves:
- **Words you use daily**: alibi ("elsewhere", alius + ibi), pro bono, quid pro quo, bona fide, per se, de facto/de jure, status quo, sua sponte, ad hoc.
- **Doctrine in the Latin**: res ipsa loquitur (Byrne v. Boadle: flour barrel), respondeat superior ("let the master answer"), quantum meruit ("as much as he deserved"), res judicata ("a thing judged"), habeas corpus ("you shall have the body"), mandamus ("we command"), certiorari ("to be informed"), in rem / in personam / quasi in rem, lis pendens, per stirpes / per capita, inter vivos, nolo contendere (FRE 410).
- **Trap: voir dire is NOT Latin.** It is Anglo-Norman law French, "to speak the truth" (veir "true"). The same root is in **verdict** (veir + dit "true saying"). Both US uses matter: jury selection and qualifying an expert (FRE 702). https://en.wikipedia.org/wiki/Voir_dire , https://en.wiktionary.org/wiki/verdict
- **Word-root family**: jury, juror, perjury, jurisdiction, just (all from ius/iurare). tort = Medieval Latin tortum "twisted/wrong" (same root as torture). The ius + dictio breakdown of "jurisdiction" is standard etymology but the Wiktionary page only confirms the Latin source word (medium).
- **Contrast pairs** make good match-pairs items: ejusdem generis vs expressio unius; mala in se vs mala prohibita; claim preclusion (res judicata) vs issue preclusion; in rem vs in personam.

## 4. Famous cases with a one-line story (48 entries; 19 Texas-flavoured)

Verified against Wikipedia case pages (facts, year, holding). Corrections of common myths found:
- **Lucy v. Zehmer** was written on the back of a restaurant **receipt**, not a napkin. Virginia, 1954, objective theory. https://en.wikipedia.org/wiki/Lucy_v._Zehmer
- **Palsgraf**: the exploding package was fireworks wrapped in newspaper; Cardozo 4-3 (1928): the risk reasonably to be perceived defines the duty. https://en.wikipedia.org/wiki/Palsgraf_v._Long_Island_Railroad_Co.
- **Hadley v. Baxendale**: two-limb rule (natural consequences or reasonably contemplated at contracting). Hawkins v. McGee: the surgeon promised a "100 percent good hand" (not "perfect"). Garratt v. Dailey: plaintiff was Ruth Garratt; the boy moved the chair.
- **Terry v. Ohio**: McFadden was a police officer (not a detective); events 1963, decision 1968.
- **Katko v. Briney**: $20,000 actual + $10,000 punitive; the farmhouse was empty and boarded up.
- **International Shoe**: Missouri-based Delaware corporation; the Washington unemployment fund sued.
- **Pennoyer v. Neff**, **Burnham** ("tag, you're it" for transient jurisdiction), **Hertz** (nerve center), **Mullane**, **Erie** (Harry Tompkins lost his arm), **Gideon**, **Miranda**, **Mapp**, **Katz**, **Marbury**, **Wickard**, **Brandenburg**, **Sullivan**, **Tarasoff**, **Carroll Towing** (B < PL), **Jacob & Youngs** (wrong-brand pipe), **Taylor v. Caldwell**, **Raffles (two ships Peerless)**, **Hamer v. Sidway**, **Carlill**, **Pierson v. Post**, **Spur v. Del Webb**, **Tulk v. Moxhay**, **Dudley & Stephens** all captured with verified facts.
- Not re-verified (medium): Lefkowitz (fetch 404), Frigaliment, McCulloch, Brown, Strawbridge, mailbox rule.

**Texas-flavoured** (the app's Texas nod; the MBE tests the federal rule, never Texas law): Texas v. Johnson (flag burning, Dallas), U.S. v. Lopez (San Antonio student, Commerce Clause), Sweatt v. Painter (UT Law), San Antonio ISD v. Rodriguez (rational basis), Hernandez v. Texas, Smith v. Allwright (Houston white primary), Lawrence v. Texas, Plyler v. Doe, Texas v. White, Whole Woman's Health v. Jackson, Salinas v. Texas (must invoke the Fifth), Texas v. Cobb (Sixth Amendment is offense-specific), Powell v. Texas (status vs act). Also Pennzoil v. Texaco (handshake deal verdict) and Judge Roy Bean (mostly legend, flagged uncertain). Four illustrative hypotheticals (rancher's fence, cattle handshake deal under UCC 2-201, rodeo waiver, oil rule of capture) are labeled as invented examples.

## 5. Pop-culture moments (17 entries) and how accurate they are

Rated by what a source actually supports.
- **My Cousin Vinny** (strongest): ABA Journal confirms Mona Lisa Vito qualifies as an expert by experience and the film predates Daubert (https://www.abajournal.com/gallery/pivotal_scenes/987). Posner called it "rich in practice tips"; the grits/eyewitness cross and "ask for discovery" scenes are well documented (https://en.wikipedia.org/wiki/My_Cousin_Vinny , https://www.litigationandtrial.com/2012/03/articles/series/special-comment/my-cousin-vinny/). The Syracuse Law Review article by Jules Epstein critiquing the film's uncritical praise could not be read (PDF unreadable here); worth reading before we claim the film is fully accurate.
- **Seinfeld finale**: its "Good Samaritan law" is really a duty-to-rescue law; real Good Samaritan statutes protect helpers, and the common law imposes no duty to rescue a stranger. https://vistacriminallaw.com/seinfeld-good-samaritan/
- **12 Angry Men**: reasonable doubt and juror misconduct (FRE 606(b)). We found no authoritative analysis of the knife scene under 606(b); the link is analytical (uncertain).
- **Legally Blonde**: impeachment by contradiction (the perm). Only commentary sources; commentators agree it is unrealistic (a 1L trying a murder, an on-the-stand confession). Memory hook only (medium).
- **Better Call Saul**: Sandpiper is a class action plus RICO. No source evaluates the Rule 23 details; RICO is not on the MBE. Use only as a CANT(S) image (uncertain).
- **Suits**: unauthorized practice of law. Not tested on the MBE or NextGen concepts; low priority.
- **Law & Order / cop shows**: Miranda at every arrest. The real rule needs custody + interrogation. Not tied to one episode (high on the law side).
- **Monty Python's Dead Parrot**: merchantability (UCC 2-314) and revocation (2-608). No law review applied the UCC to the sketch; this is our playful gloss (medium). A B.C. tribunal dead-parrot case used provincial law.
- **Home Alone** (Katko v. Briney), **Wile E. Coyote v. Acme** (Ian Frazier's 1990 New Yorker parody, products liability), **Willy Wonka's contract** (unconscionability, minors' contracts voidable): useful images, sources are commentary (medium).

## 6. Design suggestions for the app

1. **Hook first, rule second.** Open a lesson with the story (Palsgraf's fireworks), then the one-breath rule line. Our mnemonics map to tile-builder items (assemble MY LEGS in order) and match-pairs (Latin to meaning).
2. **Yes/no sorting** works for "is this a SoF category?" and "hearsay or not?" using the VICE and 801(d)(2) hooks.
3. **Transfer items** for the Texas hypotheticals (rancher's fence for adverse possession, cattle deal for 2-201).
4. **Mascot moods** on tricky "trap" cards (Lemon is dead, MOPPS needs Dobbs).
5. Show a small "Hook" badge and a source link per item (the data's `source` field), and carry `confidence` into the content `status` field so uncertain hooks never reach production unreviewed.
6. Copyright: the acronyms themselves are short, widely shared phrases, but we reworded every explanation. Keep commercial-outline text out of the app. Items whose letters came from the JD Advising list are credited in `source`; our own are marked "ours".

## 7. Still uncertain / not done

- The Syracuse Law Review PDF on My Cousin Vinny (unreadable). Fetches of LegalEagle video pages not possible.
- Lefkowitz (404), Pennzoil (Wikipedia 404; used press summaries; settlement figures differ: about $3B vs $3.3B), Roy Bean anecdotes (legend), Riley "get a warrant" quote (not on the fetched page).
- Hooks that depend on 2025-2026 Supreme Court changes were not checked; add a pass before launch.
- Which exam Texas candidates sit in 2027 (and whether Texas is moving to NextGen) was not researched; confirm separately.

## 8. Sources opened this session (primary first)

- NCBE: https://www.ncbex.org/exams/nextgen-july-2026 , https://www.ncbex.org/exams/nextgen/content-scope , https://www.ncbex.org/exams/mbe
- LII FRE: rules 403, 404, 407, 408, 409, 410, 411, 606, 609, 702, 801, 803, 804 (https://www.law.cornell.edu/rules/fre/rule_NNN)
- LII FRCP: rules 11, 12, 23, 30, 33 (https://www.law.cornell.edu/rules/frcp/rule_NN)
- LII UCC: 2-201, 2-205, 2-207, 2-302, 2-314, 2-608 (https://www.law.cornell.edu/ucc/2/2-NNN)
- Cornell Wex: statute_of_frauds, mimic_rule, warrantless, standing
- Wikipedia case pages (see `source` fields), List of Latin legal terms, Voir dire, IRAC, Rule against perpetuities, Felony murder rule, Roy Bean
- Wiktionary: verdict, jurisdiction, tort, perjury, jury, mens rea, alibi
- Study outlines: JD Advising "Baker's Dozen", lexplug MY LEGS outline, CM Law Library blog (Heluva), thefriendlybarexamtutor ESCAPIST post
- Pop-culture: ABA Journal, litigationandtrial.com, minnlawyer.com, vistacriminallaw.com, kottke.org (Coyote v. Acme), Texas Lawbook / Law.com (Pennzoil)
