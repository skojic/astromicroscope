# Gates

A module moves to the next stage only when it passes the gate. Each gate pass is recorded in `status/log.md` with the evidence (the command run and the result line), and the module's `gate:` field is updated.

| Gate | Moves to | Passes when | Evidence |
|---|---|---|---|
| **G0 Spec approved** | approved | Module file complete (content in both languages, structure, budget, accessibility, tasks, tests); the owner approves | approval noted in the log |
| **G1 Built** | testing | Builds without errors or warnings; renders in sr and en; no placeholder text except entries listed in `specs/04` | build output |
| **G2 Automated checks** | review | All pass: HTML validation, lint, axe (0 violations), Lighthouse mobile within budgets (`specs/07`), structured data valid, links OK, hreflang pairs complete | tool output, quoted |
| **G3 Manual review** | review | `checklists/accessibility.md` (keyboard + screen reader), `checklists/visual-review.md` at 360/768/1440 px in both languages, `checklists/seo.md` per template | completed checklist with date |
| **G4 Owner approval** | done | Srdjan (and Gorica, for content and design) approves on the preview URL | approval in the log |
| **G5 Released** | done (live) | Deployed; live smoke test; sitemap submitted; Search Console shows no new errors after 7 days; field Core Web Vitals reviewed once CrUX data exists | URLs and dates in the log |

Rules
- Failing a gate sends the module back to `building` with the failing item named in `status/STATUS.md`.
- Gates are never skipped. If one cannot run (for example no CrUX data yet), the log says so explicitly.
- The release gate for the whole site also requires `checklists/content.md` and `checklists/performance.md` to pass on every template.
