# Report: M14 English translation

| | |
|---|---|
| Stage | done |
| Last gate passed | G4 (standing owner approval, D45; G1 evidence 2026-11-07, D51) |
| Owner | Filip (+ review) |
| Branch | `feature/m14-translation`, merged in PR #39 (`881b7b2`); `/en/` routes by Srdjan in PR #44 |
| Last commit | `881b7b2` M14: engleski prevod celog sadržaja (PR #39) |
| Last updated | 2026-11-07, G1 passed, module done |

## Next step
None. Module done (G1, 2026-11-07). Later English for new content (2027 horoscope, new articles) follows `glossary.md`.

## Done
- **G1 (2026-11-07):** all tasks done; PR #39 green (`ci-gate`) and merged as `881b7b2`; the 22 Serbian files and their 22 English pairs render live on the production site (checked by Filip on astromicroscope.com: `/tekstovi/podznak/` + `/en/articles/rising-sign/`, `/horoskop/ovan/` + `/en/horoscope/aries/`, `/o-meni/` + `/en/about/`); `check-content` passes in production mode; no placeholder text.
- **M14-01 glossary:** `plan/modules/M14-translation/glossary.md` (signs, planets, houses, dignities, aspects, techniques, titles, style, English file names). American spelling, as in the site's existing English strings. Commits `91e9c87` (glossary) and `e1b36e7` (spelling rule).
- **M14-02 pages:** `site/src/content/pages/en/about.md`, `why-astromicroscope.md`, `contact.md` (`e1b36e7`); Jung quote in Gorica's chosen English wording (`docs/sadrzaj/05`).
- **M14-04 articles, part 1:** `childrens-horoscope.md`, `second-house-money.md`, `return-to-yourself.md` (`d5f61d4`). Answers 58–59 words, descriptions ≤ 155.
- **M14-04 articles, part 2 (2026-11-06):** `saturn-fourth-house.md`, `jupiter-in-leo.md`, `natal-chart-studies-and-career.md`, `rising-sign.md` (`0862197`).
- **M14-03 horoscope 2026 (2026-11-06):** `horoscope/en/2026/<sign>.md` for all 12 signs, same transits as the Serbian files (`39d92b8`).
- Every answer 54–59 words, title ≤ 70, description ≤ 155 (checked by the writing script per file).
- Translation by the assistant directly (no separate machine draft), reviewed in the same pass (D40).

## Done — English routes (2026-11-06)
Built the English mirrors at `site/src/pages/en/`: articles (`/en/articles/` hub + 7), horoscope (`/en/horoscope/` hub + 12), learn (`/en/learn/`), analyses (`/en/analyses/` hub + 4), about (`/en/about/`), contact (`/en/contact/`). Added a `horoscope` entry to `routes.ts`; made the home sections and `ZodiacWheel` language-aware (English home links only to `/en/...`); wired `paths={{sr,en}}` on the Serbian pages and `en/` pages so hreflang + the language switch point at the real pair; added a short `hubMeta` description to `learn.json` (the `hubIntro` was 174 chars and broke the ≤160 SEO description rule). Build 47 → **76 pages**; `test:seo` 0 failures / 0 pending; `test:html` 0; `test:axe` 0.

## Not done
- (none of the M06–M10 English mirrors remain)

## Problems and blockers
- **Answered 2026-11-04 (Gorica, via Filip):** „povezane sa serijom dva” in `astro-vodic-kroz-finansije.md` is translated as “connected with the second house”; she confirmed.
- Word count: 22 of 22 content files, about 21,700 English words (with front matter).
- **Kept as in the Serbian, for Gorica (open points in the M02 report):** Aries mentions Jupiter in the fourth house in the second half of the year; Leo mentions Pluto in Aquarius for home; Taurus is in the third person. Translated as written; **Gorica, 2026-11-06: they stay as they are.**
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
| `SITE_ENV=production node scripts/check-content.mjs` | `Content check passed (production).` (after removing the drafts) | 2026-11-06 |

## History
- 2026-11-07: G1 passed (PR #39 merged, `/en/` pages live); stage done.
- 2026-11-06: rebased on `main` (Srdjan built M06–M10, reallocated 2026-11-05); remaining 4 articles and the 12 signs of 2026 translated. All 22 content files have an English pair; `check-content` passes, the production check fails only on `draft: true`.
- 2026-11-04: glossary; pages About, Why Astromicroscope, Contact; articles children's chart, second house, return to yourself. Local branch, not pushed.
- 2026-11-03: plan read by Filip; questions recorded under Problems and blockers (Phase 0, task 5).
- 2026-11-02: plan created.
