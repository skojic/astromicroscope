# Build plan

How the Astromicroscope website gets built: by two developers, in parallel, module by module, so that the parts fit together at the end and work can resume at any moment from any computer.

**Status: plan approved by Srdjan on 2026-11-02. Development has not started.** Start with Phase 0 (`challenge.md`).

| File | What it is |
|---|---|
| [`UPUTSTVO-ZA-FILIPA.md`](UPUTSTVO-ZA-FILIPA.md) | **Start here, Filip**: what to read, your modules, your Phase 0 tasks (Serbian) |
| [`concept.md`](concept.md) | The approved site concept: idea, sitemap, page layouts, signature interactions, where every old text goes |
| [`contracts.md`](contracts.md) | The integration contract: code layout and ownership, content schemas, i18n, component interfaces. Read before writing code |
| [`challenge.md`](challenge.md) | Holes, dilemmas and weaknesses of this plan, with what to do about each |
| [`report-template.md`](report-template.md) | The report every module keeps up to date |
| [`module-template.md`](module-template.md) | Template for a new module plan |
| [`iteration-2.md`](iteration-2.md) | What comes in 2027: course platform (React), CMS for Gorica, recorded courses |
| `modules/MNN-name/PLAN.md` | What the module builds, tasks, acceptance criteria |
| `modules/MNN-name/REPORT.md` | **Where the module is**: done, not done, problems, next step, how to resume |

## Decisions this plan rests on
Direction D brand kit in `brand/` (D08) · Astro, React only where a component needs it (D09) · every text in Serbian and English (D10) · developers Srdjan Kojic and Filip Vicentijevic (D11) · this folder replaces `modules/` (D12) · courses and CMS in iteration 2 (D14) · security baseline `specs/09` (D15) · hosting on Filip's Cloudflare account, Workers with static assets (D16).

## Deferred (Srdjan, 2026-11-07)

Closed as not important for now ("delete everything else left as not important except registrar transfer"). No further work is planned on them; their reports stay as history.

| Item | What it was | Where |
|---|---|---|
| M04 Rich Results Test | the Rich Results Test on Article and ProfilePage, by hand (the Schema Markup Validator is done) | `modules/M04-seo/REPORT.md` |
| Child automations | Dependabot auto-merge and the weekly `videos-import` pull request, never proven end-to-end on a personal repository | `status/decisions.md` D46 |
| A separate preview Worker | a per-pull-request preview on its own Worker (the preview stage itself is gone, D60) | `status/decisions.md` D60 |
| The security hardening plan | the edge rate limit is already live (10 req / 10 s on `/api/`); the rest of the plan (HSTS preload, DMARC/DKIM, 2FA sweep, AI-crawler settings) was withdrawn | `status/log.md` 2026-11-07 |
| Browser checks beyond Chromium | the Firefox/WebKit layout run (manual: `VISUAL_BROWSERS=chromium,firefox,webkit npm run test:axe`) | `testing/gates.md` |

## Modules

Size: S = up to a few days, M = about a week, L = more than a week (rough, to be corrected in the reports).

| ID | Module | Owner | Needs first | Size |
|---|---|---|---|---|
| M00 | [Foundation](modules/M00-foundation/PLAN.md): Astro project, SR/EN routing, base layout, tokens and fonts, CI, security headers, preview deploys on Filip's Cloudflare | Srdjan (+ Filip for the Cloudflare account) | Phase 0 | L |
| M01 | [Brand kit and logo](modules/M01-brand-kit/PLAN.md) | Srdjan | — | done, in review |
| M02 | [Content migration](modules/M02-content-migration/PLAN.md): 28 old pages into the content schema | Filip | `contracts.md` (not M00 code) | M |
| M03 | [Site shell](modules/M03-site-shell/PLAN.md): header, navigation, language switch, footer, skip link, 404 | Srdjan | M00 | M |
| M04 | [SEO and structured data](modules/M04-seo/PLAN.md) | Srdjan | M00 | M |
| M05 | [Home page](modules/M05-home/PLAN.md): hero (star field, lens) and section assembly | Srdjan | M03, sections | M |
| M06 | [Articles](modules/M06-articles/PLAN.md): hub, topics, article page, transit timeline, author box | Filip | M00, M02 | L |
| M07 | [Yearly horoscope](modules/M07-horoscope/PLAN.md): zodiac-wheel hub, sign pages, archive | Srdjan | M00, M02 | M |
| M08 | [Education](modules/M08-education/PLAN.md): learn hub with free learning (articles, videos, horoscope) and a waitlist for the 2027 courses | Filip | M00 | S |
| M09 | [Private analyses](modules/M09-analyses/PLAN.md): hub, one page per analysis, request form UI | Filip | M00, Gorica's answers | M |
| M10 | [About, contact, legal](modules/M10-about-contact-legal/PLAN.md) | Filip | M00 | S |
| M11 | [Videos](modules/M11-videos/PLAN.md): build-time YouTube import, video pages, facade player | Srdjan | M00 | M |
| M12 | [Forms and integrations](modules/M12-forms/PLAN.md): newsletter and course waitlist, contact, analysis request | Srdjan | M00, P02b | M |
| M13 | [QA and launch](modules/M13-launch/PLAN.md): site-wide gates, fonts, DNS, Search Console | both | all | M |
| M14 | [English translation](modules/M14-translation/PLAN.md): every text in English, reviewed | Filip (+ review) | M02 | L |

## Phases
0. **Inputs and decisions (no code):** renew the domain, secure the accounts (`specs/09`), Gorica answers the questionnaire, Filip creates the Cloudflare account. See `challenge.md`.
1. **Foundation:** Srdjan builds M00. At the same time Filip does M02 (content in the agreed format) and starts M14 on the core pages. Neither waits for the other: the contract fixes the format.
2. **Templates in parallel:** Srdjan M03, M04, M07, M11; Filip M06, M08, M09, M10.
3. **Assembly:** M05 (home), M12 (forms).
4. **QA and launch:** M13.

## Working rules
- One module per branch: `feature/mNN-short-name`; small pull requests; Srdjan approves (CONTRIBUTING.md). Filip also reviews Srdjan's pull requests (learning, not blocking).
- **Every work session ends with an updated `REPORT.md`** (and the module row in `status/STATUS.md`). If you stop in the middle, the report says exactly where and how to continue.
- A module changes stage only by passing its gate (`testing/gates.md`), with evidence in the report.
- Code touches only the folders the module owns (`contracts.md`). Need a change elsewhere? Write it in the report under “Requests to other modules” and tell the owner.

## How to resume (another computer or a new session)
1. `git pull` on `main`, then `git switch` to the module's branch (named in its report).
2. Read `status/STATUS.md`, then the module's `REPORT.md` → “Next step”.
3. Run the commands listed there; continue; update the report before you stop.
