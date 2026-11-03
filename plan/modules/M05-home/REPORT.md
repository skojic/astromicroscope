# Report: M05 Home page

| | |
|---|---|
| Stage | building |
| Last gate passed | G0 (via M00) |
| Owner | Srdjan |
| Branch | `main` (owner bypass) |
| Last commit | see `git log` |
| Last updated | 2026-11-03 |

## Next step
The sections other modules own are still `Pending`: learn (M08), horoscope (M07), articles (M06), analyses (M09), about (M10), newsletter (M12). `components/home/Sections.astro` picks up each `components/sections/<name>/HomeSection.astro` automatically when it appears. Then G1 to G4 for the finished page.

## Done
- M05-01 hero: H1 as HTML text (LCP element), lede, two buttons, strings from `docs/sadrzaj/01` (`src/i18n/home.json`).
- M05-02 chart lens: the chart and the lens are drawn on the server (works without JavaScript); the script moves the lens with the pointer and arrow keys.
- M05-03 star field: starts when the browser is idle, stops while off screen, still picture under `prefers-reduced-motion` and on touch screens (sparser grid).
- M05-04 assembly: hero, then sections in the order of `plan/concept.md`; videos (M11) is real, the rest is `Pending` (visible in non-production builds only).

## Not done
- Five of seven sections (their modules).
- Reduced-motion and touch behaviour checked by reading the code and the media queries, not on a device.
- Visual review at 768 px; screenshots were taken at 1280 and 390 px only.

## Problems and blockers
- The meta description of the English home page in `docs/sadrzaj/01` is longer than 155 characters; `home.json` uses a shortened version that has not been approved by Gorica.

## Decisions taken in this module
- Date, decision, why (move project-wide ones to `status/decisions.md`).

## Requests to other modules
- To MNN: what is needed and why.

## Test evidence
| Check | Result | Date |
|---|---|---|
| `npm test` (site/) | `ℹ pass 15`, `ℹ fail 0` | 2026-11-03 |
| `npm run build` | `18 page(s) built`, no warnings | 2026-11-03 |
| `npm run test:html` | no output, exit 0 (html-validate on `dist/`) | 2026-11-03 |
| `npm run test:axe` | `axe: 18 pages x 2 viewports, 0 violations` | 2026-11-03 |
| `npm run test:e2e` | `e2e: 18 pages, 0 failures` | 2026-11-03 |
| GitHub Actions `site-ci` on `main` | success for the last push (all steps incl. Lighthouse median of 3) | 2026-11-03 |
| Lighthouse mobile, local median of 3, home sr and en | LCP 1.41–1.42 s, CLS 0, TBT 0, 203 KB transferred | 2026-11-03 |

## History
- 2026-11-02: plan created.
- 2026-11-03: hero, chart lens, star field and assembly built; CI green.
