# Report: M09 Private analyses

| | |
|---|---|
| Stage | building |
| Last gate passed | none |
| Owner | Srdjan (reallocated 2026-11-05; built to add content) |
| Branch | (see log commit) |
| Last commit | — |
| Last updated | 2026-11-05 |

## Next step
M09-01..M09-03 built for SR. Remaining: M09-04 request form (M12 sends; currently analysis pages link to email), gates G1–G4, English mirrors (M14).

## Done
- 2026-11-05, M09-01 `data/analyses.ts` — the four services per D19 (`docs/sadrzaj/04`): natal, solar, karmic, consultation, with durations, RSD + EUR prices, Gorica's own summaries/descriptions, includes/needs/format.
- 2026-11-05, M09-02 hub `/analize/` (premium intro + the 4 services with prices) and per-analysis pages `/analize/<id>/` (summary, includes, needs, duration, format, price, request CTA).
- 2026-11-05, M09-03 home section `sections/analyses/HomeSection.astro` (Midnight panel), auto-picked by M05.
- 2026-11-05, i18n `analyses.{json,ts}`.
- Evidence: `npm run build` 47 pages (was 41; + /analize/ hub + 4 pages), prices + content in dist; `npm test` 37 pass; `check-docs` 0 problems.

## Not done
- M09-04 request form (fields/validation) — M12 sends; analysis pages use a mailto fallback for now.
- English mirror (M14).
- Gates G1–G4 not yet run.

## Problems and blockers
- Request form send waits on M12 (DNS move, D54: no fixed date — not the 2026-11-29 registrar transfer).
- Privacy page must name the phone number (M10-05, D33 scope note).

## Decisions taken in this module
- (kept) 2026-11-03 phone number in request form, named on the privacy page.

## Requests to other modules
- M12: the request form submit (currently mailto fallback).

## Test evidence
| Check | Result | Date |
|---|---|---|
| `npm run build` | 47 page(s) built (+ /analize/ hub + 4 pages) | 2026-11-05 |
| `npm test` | pass 37, fail 0 | 2026-11-05 |
| `check-docs` | 0 problems | 2026-11-05 |

## History
- 2026-11-05: M09-01..03 built (SR) by Srdjan.
- 2026-11-03: plan read by Filip; questions recorded (Phase 0, task 5).
- 2026-11-02: plan created.
