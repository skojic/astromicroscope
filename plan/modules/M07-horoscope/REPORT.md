# Report: M07 Yearly horoscope

| | |
|---|---|
| Stage | building |
| Last gate passed | none |
| Owner | Srdjan |
| Branch | (see log commit) |
| Last commit | — |
| Last updated | 2026-11-07 |

## Next step
M07-01..M07-04 effectively built (SR): hub, zodiac wheel, sign pages, home section. English mirrors built 2026-11-06 (M14). JS lens built 2026-11-07 (M07-05, pushed to `main` directly). Remaining: G1 (green PR), and the lens text on the hub pages is only checked in Chromium. TransitTimeline (M06-02) is still needed if we want the transit timeline on sign pages — currently transit **data** is in the content frontmatter but not rendered as a timeline component (the body already narrates the transits).

## Done
- 2026-11-07, M07-05 zodiac wheel lens: `ZodiacWheel.astro` takes `answers` per sign (hub pages SR + EN and the home section pass them); on focus/click/arrow keys the chosen sign gets `aria-current` and a gold hairline, and the panel shows its opening paragraph and a read link; desktop-only (hidden on `hover: none`), without JS it stays 12 links. New e2e check 5 in `site/scripts/e2e.mjs`.
- 2026-11-05, M07-04 home section `sections/horoscope/HomeSection.astro` (M05 auto-picks it).
- 2026-11-05, M07-03 hub `/horoskop/`: title + `ZodiacWheel` linking all 12 signs.
- 2026-11-05, M07-01 zodiac wheel `ZodiacWheel.astro`: accessible link grid, no JS required, 4-col → 2-col responsive.
- 2026-11-05, M07-02 sign pages `/horoskop/<serbian-slug>/` (12 static routes via `getStaticPaths`, D31 slug mapping): render the M02 sign markdown via `render(entry)`, AuthorBox (reuses M10), Article + Person + ProfilePage JSON-LD, breadcrumbs.
- 2026-11-05, i18n `horoscope.{json,ts}` (sign names sr/en, hub strings, `SIGN_SLUG_SR` mapping).
- Built SR-only; English `/en/horoscope/**` is M14 (no en content yet).
- Evidence: `npm run build` 33 pages (was 20), all 12 sign routes + hub present with real content; `npm test` 37 pass; `check-docs` 0 problems.

## Not done
- G1: CI result on `main` for the lens.
- TransitTimeline component (M06-02) — transit `data` is present but not rendered as a timeline.

## Problems and blockers
- M07 blocked on M06-02 TransitTimeline only if we want the transit timeline widget; the content itself narrates transits so it's a polish, not a block.

## Decisions taken in this module
- Date, decision, why (move project-wide ones to `status/decisions.md`).

## Requests to other modules
- M06: a TransitTimeline component would slot into the sign page if/when built; currently optional.
- M14: English sign pages + hub mirror.

## Test evidence
| Check | Result | Date |
|---|---|---|
| `npm run build` | 33 page(s) built (12 sign routes + hub + rest) | 2026-11-05 |
| `npm test` | pass 37, fail 0 | 2026-11-05 |
| `check-docs` | 0 problems | 2026-11-05 |
| `npm run build` (with lens) | 76 pages built | 2026-11-07 |
| `test:e2e` (with lens check) | 76 pages, 0 failures | 2026-11-07 |
| `test:axe` | 76 pages x 2 viewports, 0 violations | 2026-11-07 |
| `test:html` | no output after the command line (exit not captured) | 2026-11-07 |

## History
- 2026-11-07: lens built (see Done).
- 2026-11-06: gold zodiac glyphs instead of the blue dots in the sign grid (Gorica's request, via Filip); `ZodiacWheel.astro` + `zodiacGlyphs.ts` (Tabler Icons, MIT).
- 2026-11-05: M07-01..04 built (SR) by Srdjan.
- 2026-11-02: plan created.
