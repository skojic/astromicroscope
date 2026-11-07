# Gates

D51 (2026-11-06) reduced the per-module ceremony: the six gates G0–G5 collapse to **one module gate (G1) and the launch gate (G5)**. A module is `building` while its tasks are open and `done` when G1 evidence is complete in its `REPORT.md` (owner approval G4 is standing for the iteration-1 modules, D45). The old G2 and G3 run automatically or once at launch:

- The automated half of G2 (HTML validation, the browser check, SEO audit) **is `site-ci` itself** — a green `ci-gate` on the module's pull request *is* the G2 pass; do not record it separately. D56 (2026-11-07) keeps the check under 2 minutes: one browser check (axe, skip link, phone menu, layout, facade, lens in Chromium), and Lighthouse and the live smoke run in the weekly/daily `scheduled` workflow. The preview runs on its own Worker (D57), so the preview deploy never changes the production address.
- The manual half of G2/G3 (structured-data validators on real pages, per-template SEO checklists, visual taste review, the optional screen-reader pass, D38) moved to the **launch gate** (M13), where they run once on every template instead of per module.

| Gate | Passes when | Evidence |
|---|---|---|
| **G1 Built** (module gate) | All module tasks complete; renders in sr and en; no placeholder text except entries listed in `specs/04`; the module's pull request is green (`site-ci`: unit tests, build, HTML validation, browser check (accessibility, layout, facade, lens), SEO audit) | `REPORT.md` "Done" entries with the command outputs; the green PR |
| **G5 Released** (launch gate, M13) | Deployed to the custom domain as the production build (the deploy's smoke test fails a preview build, D56); the strict production audit and the three-browser check run once by hand (`SITE_ENV=production npm run build && SEO_STRICT=1 npm run test:seo`; `VISUAL_BROWSERS=chromium,firefox,webkit npm run test:axe`); redirects/410 verified; Search Console clean and sitemap submitted; live smoke test; `checklists/content.md`, `performance.md`, `security.md` passed once; structured-data validators on every template | URLs, dates and tool output in the log |

Rules
- Failing G1 sends the module back to `building` with the failing item named in `status/STATUS.md`.
- G0 and G4 are standing approvals (D45): plans and module evidence are not re-approved per module; Srdjan approves once more at the launch gate before the custom domain and the production build.
- The old per-module gate records (G0–G4 rows in the log) are not required any more; existing ones stay as history.
