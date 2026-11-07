# Report: M06 Articles

| | |
|---|---|
| Stage | building |
| Last gate passed | none |
| Owner | Srdjan (reallocated 2026-11-05; built to add content, not waiting on the original split) |
| Branch | (see log commit) |
| Last commit | — |
| Last updated | 2026-11-07 |

## Next step
M06-01 (article template), M06-03 (hub), M06-04 (home section), M06-05 (Article JSON-LD) built for SR. Remaining: M06-02 TransitTimeline (optional — transit data in frontmatter, body narrates it), per-topic hub pages (part of M06-03; one combined hub now), and G1 (green `site-ci`, D51). English mirrors built 2026-11-06 (M14: `/en/articles/` hub + 7).

## Done
- 2026-11-05, M06-01 article template `/tekstovi/<slug>/` (7 pages via `getStaticPaths`): answer-box first, published/updated dates, topics in data, reading column ~64 chars, body ~1.1875rem, reuses M10 `AuthorBox`.
- 2026-11-05, M06-03 hub `/tekstovi/` listing all 7 articles newest first.
- 2026-11-05, M06-04 home section `sections/articles/HomeSection.astro` (one featured + three), auto-picked by M05.
- 2026-11-05, M06-05 Article JSON-LD (`article()`, + Person/ProfilePage) on each article page.
- 2026-11-05, i18n `articles.{json,ts}`.
- Evidence: `npm run build` 41 pages (was 33; 7 article routes + hub); real article content in dist; `npm test` 37 pass; `check-docs` 0 problems.

## Not done
- M06-02 TransitTimeline component (optional; data present in frontmatter).
- Per-topic hub pages (part of M06-03) — one combined hub now; topic pages deferred.
- G1 evidence (green `site-ci` on `main`); the old gates G2–G4 were folded into the launch gate by D51.

## Problems and blockers
- Long article may need splitting (B3, 4,095 words) — currently rendered whole.
- None. The `draft: true` flags are removed and the English pairs exist (M02/M14, PR #39).

## Decisions taken in this module
- Date, decision, why (move project-wide ones to `status/decisions.md`).

## Requests to other modules
- To M14: done (English article + hub built 2026-11-06).
- M07: a shared TransitTimeline would service both — currently unused.

## Test evidence
| Check | Result | Date |
|---|---|---|
| `npm run build` | 41 page(s) built (7 article routes + hub + rest) | 2026-11-05 |
| `npm test` | pass 37, fail 0 | 2026-11-05 |
| `check-docs` | 0 problems | 2026-11-05 |

## History
- 2026-11-07: report cleaned up: English mirrors built (M14, 2026-11-06); gates reduced to G1 + launch gate (D51); draft/en-pair blocker removed.
- 2026-11-05: M06-01..05 built (SR) by Srdjan.
- 2026-11-03: plan read by Filip; questions recorded under Problems and blockers (Phase 0, task 5).
- 2026-11-02: plan created.
