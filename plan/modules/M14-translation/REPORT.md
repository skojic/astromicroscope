# Report: M14 English translation

| | |
|---|---|
| Stage | building |
| Last gate passed | none |
| Owner | Filip (+ review) |
| Branch | `feature/m14-translation` (local, rebased on `main` 2026-11-06) |
| Last commit | `39d92b8` M14-03: English yearly horoscope 2026, all 12 signs |
| Last updated | 2026-11-06, all 22 content files have an English pair |

## Next step
1. Push `feature/m14-translation` and open the pull request with the 22 English content files (this batch).
2. English routes under `/en/` that mirror Srdjan's Serbian pages (M06 articles, M07 horoscope, M08 learn, M09 analyses, M10 about and contact), plus the English values of their i18n strings and data files. Their reports list these as "English mirrors (M14)".
3. `draft: true` stays on both languages until Gorica approves the Serbian (Srdjan's M10 note); the strict check waits for launch (D48, D49).

## Done
- **M14-01 glossary:** `plan/modules/M14-translation/glossary.md` (signs, planets, houses, dignities, aspects, techniques, titles, style, English file names). American spelling, as in the site's existing English strings. Commits `91e9c87` (glossary) and `e1b36e7` (spelling rule).
- **M14-02 pages:** `site/src/content/pages/en/about.md`, `why-astromicroscope.md`, `contact.md` (`e1b36e7`); Jung quote in Gorica's chosen English wording (`docs/sadrzaj/05`).
- **M14-04 articles, part 1:** `childrens-horoscope.md`, `second-house-money.md`, `return-to-yourself.md` (`d5f61d4`). Answers 58–59 words, descriptions ≤ 155.
- **M14-04 articles, part 2 (2026-11-06):** `saturn-fourth-house.md`, `jupiter-in-leo.md`, `natal-chart-studies-and-career.md`, `rising-sign.md` (`0862197`).
- **M14-03 horoscope 2026 (2026-11-06):** `horoscope/en/2026/<sign>.md` for all 12 signs, same transits as the Serbian files (`39d92b8`).
- Every answer 54–59 words, title ≤ 70, description ≤ 155 (checked by the writing script per file).
- Translation by the assistant directly (no separate machine draft), reviewed in the same pass (D40).

## Not done
- English `/en/` routes and the English strings and data of the pages Srdjan built (M06–M10): see Next step.
- Data files and home sections (M14-02 rest): with M05/M08/M09/M10 when their strings exist.

## Problems and blockers
- **Answered 2026-11-04 (Gorica, via Filip):** „povezane sa serijom dva” in `astro-vodic-kroz-finansije.md` is translated as “connected with the second house”; she confirmed.
- Word count: 22 of 22 content files, about 21,700 English words (with front matter).
- **Kept as in the Serbian, for Gorica (open points in the M02 report):** Aries mentions Jupiter in the fourth house in the second half of the year; Leo mentions Pluto in Aquarius for home; Taurus is in the third person. Translated as written, to change together with the Serbian if she does.
- **Fixed in the English only:** in `podznak.md` the Virgo heading says "Jupiter u padu" while the text says "u izgonu"; Jupiter in Virgo is in detriment, so both read "detriment" in English.
- Maslow quotes: the `potencijali` quote uses his standard English wording ("step forward into growth or step back into safety"); the `podznak` quote has no known English original and is translated from the Serbian.
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
| `node scripts/check-content.mjs` | `Content check passed (non-production).` | 2026-11-06 |
| `SITE_ENV=production node scripts/check-content.mjs` | only `draft is true` errors, no missing pairs | 2026-11-06 |

## History
- 2026-11-06: rebased on `main` (Srdjan built M06–M10, reallocated 2026-11-05); remaining 4 articles and the 12 signs of 2026 translated. All 22 content files have an English pair; `check-content` passes, the production check fails only on `draft: true`.
- 2026-11-04: glossary; pages About, Why Astromicroscope, Contact; articles children's chart, second house, return to yourself. Local branch, not pushed.
- 2026-11-03: plan read by Filip; questions recorded under Problems and blockers (Phase 0, task 5).
- 2026-11-02: plan created.
