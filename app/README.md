# Objection (app)

Playful, Duolingo-style web app that prepares a US law graduate for the MBE. Plain JS, no framework, no build dependencies beyond Node. Sibling of Carpe (`experiments/latin-panhellenic`), whose engine it keeps.

```
npm test        # validator + engine tests (node:test) over every unit file, example included
npm run build   # app/dist/index.html (one file) + app/vercel/ (site: app, /outline, /about, sitemap, manifest, SVG icons)
npm run validate                      # readable validator report for all units
node app/tools/validate.js app/src/units/u9.js   # one unit
OBJECTION_INCLUDE_EXAMPLE=1 npm run build        # include the example unit in the build, to try the UI before real units exist
node app/brand/render.mjs             # re-render brand/og.png from brand/og.html (headless Chrome)
```

Deploy: `npm run build && cd app/vercel && vercel deploy --prod`. Analytics: PostHog loads only when `POSTHOG_KEY` is set in `app/.env` (gitignored; do not commit it). Site URL and repository URL: `SITE_URL`, `REPO_URL` in the same file.

## Layout

- `src/units/u<N>.js`: one unit per file, pushed onto the global `OBJECTION_UNITS` (browser) and exported for Node. Schema: [`CONTENT_SCHEMA.md`](CONTENT_SCHEMA.md). `u0_example.js` is the fixture with every item kind; the build skips it.
- `src/engine.js`: pure logic. Dates, streaks and continuances (freezes), billable minutes (XP), Leitner review (1/3/7/14/30/60 days, capped at exam − 3 days, every card pulled forward in the last 14 days), the course index, unlocking (first lesson of every unit open, sequential inside, closing argument last), sittings, question builders for every item kind, lesson/closing-argument/review builders, Cross-Examination, Question of the Day (date-seeded, weekday → subject, NCBE's category fractions), Mini-MBE / Session / Full MBE with the 4-4-4-4-3-3-3 rotation, per-subject scoring, trap tally, ranks (1L → Justice), badges, exam countdown with presets.
- `src/app.js`: the UI. Amicus the armadillo (moods happy/sad/cheer/robe/sleepy), onboarding, Docket (countdown, goal ring, quick tiles, the courthouse), Outline, Chambers (stats, rank, top trap, badges, settings), the run overlay with renderers for `intro mcq tf hypo grid build match bucket find spot type swipe`, the silent mock runner (hidden answers, flag and return, enforced clock, walkthrough), feedback with every option's why and the one-tap miss tag. Progress in `localStorage` (`objection:v1`), every read/write in try/catch.
- `src/style.css`, `src/shell.html`: courtroom palette (oak, parchment, navy, brass; sustained green, overruled red), dark mode, mobile-first. Fonts: Fraunces (display), Literata (stems and rules), Nunito Sans (UI).
- `src/course.js`: Node-side loader of the unit files (tests and site build).
- `tools/validate.js`: the content validator. `test/`: content and engine tests.
- `build.mjs`, `site.mjs`: single-file build and the Vercel site (crawlable `/outline` with every rule card, cases, terms, numbers).
- `brand/`: `amicus.svg` (the mascot), `og.html` → `og.png` (share card), `render.mjs`.

## Conventions

- Everything the learner reads is English, in the vocabulary of the NCBE outline and the standard bar outlines (majority rule / minority rule, common law vs UCC Article 2, FRE, FRCP, "the best answer", elements, standards of review, levels of scrutiny).
- No statistics in the UI beyond NCBE's own fractions phrased as NCBE phrases them. Every card shows its `status` (primary text / NCBE says so / black letter / under review) and `src`.
- Exam date lives in `Engine.EXAM_DATE` (2027-07-28, derived from NCBE's last-Wednesday rule) with presets Feb 24 2027 (confirmed), Jul 28 2027 (derived), Feb 23 2028 (derived) and a custom date; the countdown says to confirm with the board.
- No NCBE question text and no commercial-outline text anywhere in `app/`. Downloaded material stays in the gitignored `research/source-data/` and `research/pastquestions-raw/`.
