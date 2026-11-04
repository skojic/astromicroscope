# Astromicroscope website

Bilingual (sr default, en) education-first astrology site for Gorica Vićentijević. Brief: `docs/brief-klijenta.md`.

`specs/` what to build · `plan/` how it is built, module by module, with a report per module · `testing/` when it counts as done · `status/` where we are · `brand/` how it looks.

## Rules
1. Read `status/STATUS.md`, then the module's `plan/modules/MNN-*/REPORT.md` (“Next step”). Work only on tasks in a module plan; if one is missing, write it and ask for approval. Respect the ownership map in `plan/contracts.md`.
2. SEO, Core Web Vitals, accessibility and performance are acceptance criteria, not polish: `specs/06`–`08`.
3. A module changes stage only by passing its gate in `testing/gates.md`. Quote the check output; never mark done on the strength of code written.
4. Every user-facing string exists in Serbian and English (`specs/05-languages.md`).
5. End every work session by updating the module's `REPORT.md`, its row in `status/STATUS.md`, and `status/log.md`. Every change to `status/STATUS.md` also sets its `Updated:` date to the day of the change.
6. Decisions go in `status/decisions.md`; never reverse one silently.
7. **Brand kit = `brand/` = direction D, Midnight Lens** (chosen by Gorica). “Use the brand kit” / “koristi brending kit” means: tokens from `brand/tokens/tokens.css`, fonts from `brand/fonts/`, logo from `brand/logo/`, rules in `brand/index.html`, layout from `brand/home-reference.html` (`specs/02`). No other direction exists.
8. Changes reach `main` only through a pull request from a `feature/`, `fix/` or `docs/` branch, approved by the owner (`CONTRIBUTING.md`). The owner may bypass.
9. **Automation first (D45, D46).** Deploys, checks, imports and dependency updates run in `.github/workflows/`: do not do by hand what a workflow does. A new check goes into `site-ci` and so under `ci-gate`; a new document rule goes into `site/scripts/check-docs.mjs`.
