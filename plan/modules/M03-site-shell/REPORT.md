# Report: M03 Site shell

| | |
|---|---|
| Stage | done (G4 approved 2026-11-04) |
| Last gate passed | G4 |
| Owner | Srdjan |
| Branch | `main` (owner bypass) |
| Last commit | see `git log` |
| Last updated | 2026-11-04 |

## Next step
Done: G4 approved by Srdjan 2026-11-04. G2 and G3 evidence is in the M00 report (the shell is on every page of the visual review); the menu targets that do not exist yet stay pending until their modules are built (`SEO_STRICT=1` at the launch gate).

## Done
- 2026-11-04, link check (`npm run test:seo`): every internal link and anchor on the 18 built pages resolves, except links to routes whose modules are not built. **Open finding:** the header, footer and home page link to 10 pages that do not exist yet (`/edukacija/`, `/tekstovi/`, `/analize/`, `/o-meni/`, `/kontakt/` and the English pairs); a deploy today would show dead navigation. They are reported as pending and become failures with `SEO_STRICT=1` (M13).
- 2026-11-04, automated part of `checklists/accessibility.md` and `visual-review.md` on the production build (one-off script, Chromium, 18 pages): no horizontal scroll or overflow at 320, 360, 768, 1024 and 1440 px; no tap target under 24 px at 360 and 1440 px; one h1 and no skipped heading levels; landmarks present; every focusable element has a visible outline or shadow and there are no keyboard traps (29 to 33 stops per page); the header is not sticky; no infinite animation under reduced motion. Not done (manual): VoiceOver and NVDA, Safari and Firefox, a real phone, print view, brand-kit comparison, focus-ring contrast. G3 is therefore not passed.
- M03-01 header: mark image plus live text, five menu items, primary button; fixed 72 px height (D28).
- M03-02 mobile menu: button with `aria-expanded`, focus moves into the menu, Escape closes it and returns focus; no focus trap (disclosure pattern). axe also runs with the menu open (`scripts/axe.mjs`).
- M03-03 language switch: plain links to the paired page via `i18n/routes.ts` (`switchTarget`); falls back to the other language's home page when no pair exists. Accessible names "SR, Srpski" / "EN, English" (axe `label-content-name-mismatch` forced this).
- M03-04 footer: routes, legal, email, Instagram, YouTube, language switch, year computed at build.
- M03-05 skip link, 404 pages (`/404.html`, `/en/404.html` via `src/integrations/not-found.mjs`).

## Not done
- Manual checks (G3): done by automation and by the assistant's visual review in three browsers, see the M00 report; the 404 pages had no spacing and were fixed (`components/shell/NotFound.astro`, `cdedc25`).
- Link check: menu targets (`/edukacija/`, `/tekstovi/`, `/analize/`, `/o-meni/`, `/kontakt/`, legal pages) do not exist yet and return 404 until their modules are built.
- Screen-reader test: optional, not a gate (D38).

## Problems and blockers
- Without JavaScript the phone menu cannot be opened (the footer carries every link). Desktop is unaffected.
- The Instagram URL is built from the handle and was not opened.
- Interface strings are in `src/i18n/shell.json`; the Serbian subtitle and the English one are the same name.

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

## History
- 2026-11-02: plan created.
- 2026-11-03: built; G1 passed; CI green.
