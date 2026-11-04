# Report: M14 English translation

| | |
|---|---|
| Stage | building |
| Last gate passed | none |
| Owner | Filip (+ review) |
| Branch | `feature/m14-translation` (local, on top of `feature/m02-content-migration`; not pushed until Srdjan answers on PR #13) |
| Last commit | `d5f61d4` M14-04: English articles: children's natal chart, second house and money, return to yourself |
| Last updated | 2026-11-04, glossary and 6 of 22 English files |

## Next step
1. Wait for Srdjan's answer on PR #13 (comment of 2026-11-04): option 1 = these English files go onto `feature/m02-content-migration` so PR #13 passes the production check; option 2 = Srdjan lets the production build skip drafts, and this branch becomes its own pull request.
2. Translate the remaining 16 files: articles `saturn-fourth-house`, `jupiter-in-leo`, `natal-chart-studies-and-career`, `rising-sign` (long, about 4,000 words), then the 12 signs of `horoscope/en/2026/`. File names in `glossary.md`.
3. Then remove `draft: true` from both languages (after Gorica's look at the Serbian, already approved for articles) and run the production check.

## Done
- **M14-01 glossary:** `plan/modules/M14-translation/glossary.md` (signs, planets, houses, dignities, aspects, techniques, titles, style, English file names). American spelling, as in the site's existing English strings. Commits `91e9c87` (glossary) and `e1b36e7` (spelling rule).
- **M14-02 pages:** `site/src/content/pages/en/about.md`, `why-astromicroscope.md`, `contact.md` (`e1b36e7`); Jung quote in Gorica's chosen English wording (`docs/sadrzaj/05`).
- **M14-04 articles, part 1:** `childrens-horoscope.md`, `second-house-money.md`, `return-to-yourself.md` (`d5f61d4`). Answers 58–59 words, descriptions ≤ 155.
- Translation by the assistant directly (no separate machine draft), reviewed in the same pass (D40).

## Not done
- M14-03 horoscope (12 signs) and M14-04 for 4 articles: see Next step.
- Data files and home sections (M14-02 rest): with M05/M08/M09/M10 when their strings exist.

## Problems and blockers
- Question for Gorica: `astro-vodic-kroz-finansije.md` says Venus or Jupiter „povezane sa serijom dva”; translated as “connected with the second house”. Confirm or explain the term.
- Word count: 6 of 22 files, about 2,500 English words; Serbian source of all 22 files about 13,000 words.
- **Answered 2026-11-03 (Srdjan, PR #5), see Decisions below.** Was: D17 says everything in English at launch. Does that include the 2026 horoscope archive (12 texts, about 7,000 words), or only the current edition? Excluding the archive would cut the effort by about a third.
- Word count to track: about 20,000 words from the old site plus `docs/sadrzaj/01–07`; counted per batch in this report.

## Decisions taken in this module
- 2026-11-03 (Srdjan, PR #5, D22): 2026 horoscope archive is not translated by hand until Gorica gives the 2027 date; machine translation only. An archive only in Serbian cannot be published (`specs/05`). Start with the glossary (M14-01) in parallel with M02.
- 2026-11-02 (D17): machine-translated first draft is fine; Filip edits every text; **Srdjan gives the final English review**; **everything in English at launch**.
- Date, decision, why (move project-wide ones to `status/decisions.md`).

## Requests to other modules
- To MNN: what is needed and why.

## Test evidence
| Check | Result | Date |
|---|---|---|

## History
- 2026-11-04: glossary; pages About, Why Astromicroscope, Contact; articles children's chart, second house, return to yourself. Local branch, not pushed.
- 2026-11-03: plan read by Filip; questions recorded under Problems and blockers (Phase 0, task 5).
- 2026-11-02: plan created.
