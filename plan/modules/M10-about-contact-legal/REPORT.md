# Report: M10 About, contact, legal

| | |
|---|---|
| Stage | building |
| Last gate passed | none |
| Owner | Srdjan (built 2026-11-05; D11 split by the plan, but picked up to fill pages — see log) |
| Branch | (see log commit) |
| Last commit | — |
| Last updated | 2026-11-05 |

## Next step
M10-01 + M10-02 + M10-03 + M10-04 are built. Remaining: M10-05 (legal shells) is out of scope by D33; verify gates (G1 build, G2 CI, G3 review, G4 owner) and confirm with Gorica the About-text interpretation (drop the Nikola Stojanović paragraph, D20). English pairs behind M14.

## Done
- 2026-11-05, M10-02 `AuthorBox.astro`: author card (portrait via `Image`, credential, Instagram/YouTube links), heading level prop; used by articles (M06) and horoscope (M07).
- 2026-11-05, M10-01 about page (`/o-meni/`): renders `content/pages/sr/o-meni.md` via `render(entry)`, Person + ProfilePage JSON-LD (`person()`, `profilePage()`), AuthorBox.
- 2026-11-05, M10-03 home section (`sections/about/HomeSection.astro`): auto-picked by M05's `Sections.astro`.
- 2026-11-05, M10-04 contact page (`/kontakt/`): email `astromicroscope@gmail.com`, reply-within-three-days, no other social networks (D21).
- 2026-11-05, portrait copied to `site/src/assets/gorica-portret.jpg` (importable; optimized 110 KB → 13 KB WebP at build).
- 2026-11-05, i18n `about.json` + `about.ts`.
- Evidence: `npm run build` 20 pages (was 18), portrait WebP, about/contact content in dist; `npm test` 37 pass; `check-docs` 0 problems.

## Not done
- M10-05 legal shells (D33: out of scope).
- English `en/` page pairs (M14).
- G1–G4 gates not yet run.

## Problems and blockers
- Resolved: portrait received (A8), imported.
- Question (Gorica): About keeps the old text up to the Nikola Stojanović paragraph (D20). Interpreted as: drop that paragraph, keep the rest. To confirm with her.
- Content is `draft: true` (M02), so production build still blocked until Gorica approves + M14.

## Decisions taken in this module
- Date, decision, why (move project-wide ones to `status/decisions.md`).

## Requests to other modules
- To M06/M07: `AuthorBox` lives at `components/sections/about/AuthorBox.astro`, prop `lang` (+ optional `headingLevel`).

## Test evidence
| Check | Result | Date |
|---|---|---|
| `npm run build` | 20 page(s) built, about + contact routes present | 2026-11-05 |
| `npm test` | pass 37, fail 0 | 2026-11-05 |
| `check-docs` | 0 problems | 2026-11-05 |

## History
- 2026-11-05: M10-01..04 built (Srdjan); pages live in dist.
- 2026-11-03: plan read by Filip; questions recorded (Phase 0, task 5).
- 2026-11-02: plan created.
