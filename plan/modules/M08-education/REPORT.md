# Report: M08 Education

| | |
|---|---|
| Stage | building |
| Last gate passed | none |
| Owner | Srdjan (reallocated 2026-11-05; built to add content) |
| Branch | (see log commit) |
| Last commit | — |
| Last updated | 2026-11-07 |

## Next step
M08-01..M08-03 built for SR. English mirror built 2026-11-06 (M14: `/en/learn/`). Remaining: G1 (green `site-ci`, D51). M08-03 waitlist CTA currently links to email; wiring it to the M12 form is the real send once M12-03 is live (DNS move, D54: no fixed date).

## Done
- 2026-11-05, M08-01 home section `sections/learn/HomeSection.astro` (free formats + 2027 waitlist CTA), auto-picked by M05.
- 2026-11-05, M08-02 education hub `/edukacija/` (free learning cards → /tekstovi/, /video/, /horoskop/; waitlist section).
- 2026-11-05, M08-03 waitlist CTA (clear "courses in 2027" text; mailto for now, M12 form later).
- 2026-11-05, i18n `learn.{json,ts}`.
- Evidence: `npm run build` 47 pages (was 41; + /edukacija/), content in dist; `npm test` 37 pass; `check-docs` 0 problems.

## Not done
- Tie waitlist CTA to the M12 form (M12-03 waits on the DNS move, D54: no fixed date).
- G1 evidence (green `site-ci` on `main`); the old gates G2–G4 were folded into the launch gate by D51.

## Problems and blockers
- Real waitlist send waits on M12 (DNS move, D54: no fixed date — not the 2026-11-29 registrar transfer).

## Decisions taken in this module
- (kept from earlier) 2026-11-03/04 waitlist group + separate MailerLite group.

## Requests to other modules
- M12: the waitlist form send (currently mailto fallback).

## Test evidence
| Check | Result | Date |
|---|---|---|
| `npm run build` | 47 page(s) built (+, /edukacija/) | 2026-11-05 |
| `npm test` | pass 37, fail 0 | 2026-11-05 |
| `check-docs` | 0 problems | 2026-11-05 |

## History
- 2026-11-07: report cleaned up: English mirror built (M14, 2026-11-06); gates reduced to G1 + launch gate (D51).
- 2026-11-05: M08-01..03 built (SR) by Srdjan.
- 2026-11-04: MailerLite waitlist group created.
- 2026-11-03: plan read by Filip.
- 2026-11-02: plan created.
