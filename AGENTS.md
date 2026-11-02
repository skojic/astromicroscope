# Astromicroscope website

Bilingual (sr default, en) education-first astrology site for Gorica Vićentijević. Brief: `docs/brief-klijenta.md`.

`specs/` what to build · `modules/` how each part is built · `testing/` when it counts as done · `status/` where we are.

## Rules
1. Read `status/STATUS.md` first. Work only on tasks that have a spec or module file; if one is missing, write it and ask for approval.
2. SEO, Core Web Vitals, accessibility and performance are acceptance criteria, not polish: `specs/06`–`08`.
3. A module changes stage only by passing its gate in `testing/gates.md`. Quote the check output; never mark done on the strength of code written.
4. Every user-facing string exists in Serbian and English (`specs/05-languages.md`).
5. End every task by updating `status/STATUS.md` (the "Now" block and the module table) and adding an entry to `status/log.md`.
6. Decisions go in `status/decisions.md`; never reverse one silently.
7. `branding-directions/` is a frozen design showcase. Do not edit it while building the site.
8. Changes reach `main` only through a pull request from a `feature/`, `fix/` or `docs/` branch, approved by the owner (`CONTRIBUTING.md`). The owner may bypass.
