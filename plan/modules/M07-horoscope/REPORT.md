# Report: M07 Yearly horoscope

| | |
|---|---|
| Stage | building |
| Last gate passed | none |
| Owner | Srdjan |
| Branch | (see log commit) |
| Last commit | — |
| Last updated | 2026-11-05 |

## Next step
M07-01..M07-04 effectively built (SR): hub, zodiac wheel, sign pages, home section. Remaining: gates G1–G4, English mirrors (M14), and the JS lens/preview enhancement (M07-01 second half). TransitTimeline (M06-02) is still needed if we want the transit timeline on sign pages — currently transit **data** is in the content frontmatter but not rendered as a timeline component (the body already narrates the transits).

## Done
- 2026-11-05, M07-04 home section `sections/horoscope/HomeSection.astro` (M05 auto-picks it).
- 2026-11-05, M07-03 hub `/horoskop/`: title + `ZodiacWheel` linking all 12 signs.
- 2026-11-05, M07-01 zodiac wheel `ZodiacWheel.astro`: accessible link grid, no JS required, 4-col → 2-col responsive.
- 2026-11-05, M07-02 sign pages `/horoskop/<serbian-slug>/` (12 static routes via `getStaticPaths`, D31 slug mapping): render the M02 sign markdown via `render(entry)`, AuthorBox (reuses M10), Article + Person + ProfilePage JSON-LD, breadcrumbs.
- 2026-11-05, i18n `horoscope.{json,ts}` (sign names sr/en, hub strings, `SIGN_SLUG_SR` mapping).
- Built SR-only; English `/en/horoscope/**` is M14 (no en content yet).
- Evidence: `npm run build` 33 pages (was 20), all 12 sign routes + hub present with real content; `npm test` 37 pass; `check-docs` 0 problems.

## Not done
- En mirrors (M14).
- JS lens/preview on the wheel (M07-01 enhancement).
- TransitTimeline component (M06-02) — transit `data` is present but not rendered as a timeline.
- Gates G1–G4 not yet run.

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

## History
- 2026-11-05: M07-01..04 built (SR) by Srdjan.
- 2026-11-02: plan created.
