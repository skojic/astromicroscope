# Report: M05 Home page

| | |
|---|---|
| Stage | building |
| Last gate passed | G0 (via M00) |
| Owner | Srdjan |
| Branch | `feature/m05-home` |
| Last commit | see `git log` |
| Last updated | 2026-11-06 |

## Next step
All seven sections now exist and `Sections.astro` renders them (no `Pending` left). What keeps M05 from G1:
1. **English home links into Serbian pages.** Only videos have `/en/` routes; the learn, horoscope, articles, analyses and about sections on `/en/` link to Serbian pages and the articles section lists Serbian articles under a Serbian heading. Closes with the English routes for M06–M10 (M14).
2. **Concept gaps** (`plan/concept.md`, Home page): About should carry a Jung quote and three facts (no home strings exist; needs content from Gorica, not invented); the analyses panel has no gold hairline; the horoscope wheel does not move a lens to the chosen sign (M07).
3. Meta description of the English home still unapproved (see Problems).
Then G1 for the finished page.

## Done
- M05-01 hero: H1 as HTML text (LCP element), lede, two buttons, strings from `docs/sadrzaj/01` (`src/i18n/home.json`).
- M05-02 chart lens: the chart and the lens are drawn on the server (works without JavaScript); the script moves the lens with the pointer and arrow keys.
- M05-03 star field: starts when the browser is idle, stops while off screen, still picture under `prefers-reduced-motion` and on touch screens (sparser grid).
- M05-04 assembly: hero, then sections in the order of `plan/concept.md`; videos (M11) is real, the rest is `Pending` (visible in non-production builds only).

## Not done
- The gaps listed under Next step.
- Reduced-motion and touch behaviour checked by reading the code and the media queries, not on a device.

## Problems and blockers
- The meta description of the English home page in `docs/sadrzaj/01` is longer than 155 characters; `home.json` uses a shortened version that has not been approved by Gorica.

## Done (2026-11-06, review of the assembled page)
- Reviewed `/` at 390, 768 and 1440 px and `/en/` at 768 px (Chromium screenshots). Four sections stacked on white with 64+64 px padding, so the gaps read as uneven: horoscope and videos now sit on beige bands (`--am-bg-alt`), giving white, beige, white, beige, midnight, beige, white; the sign cards are white on the beige band.
- Waitlist button in the learn section is on its own line instead of running inline after the sentence.

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

| Lighthouse (`npm run test:lighthouse`, local) | LCP 2.69 s on this branch and 2.68 s on `main`: the same, above the 2.0 s budget on this machine; CI Lighthouse was green on the last merge (8070064) | 2026-11-06 |
| `test:visual`, `test:axe`, `check:docs` on this branch | 47 pages / 376 views 0 failures; axe 0 violations; 0 problems | 2026-11-06 |

## History
- 2026-11-02: plan created.
- 2026-11-03: hero, chart lens, star field and assembly built; CI green.
- 2026-11-06: assembled home reviewed at three widths; beige banding, waitlist button; remaining gaps listed under Next step.
