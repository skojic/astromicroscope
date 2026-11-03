# Astromicroscope website (`site/`)

The Astro project for astromicroscope.com: Gorica Vićentijević's bilingual, education-first astrology site. Serbian (Latin) is the default at `/`, English at `/en/` (`specs/05-languages.md`).

Status: module **M00 Foundation** is in progress. Only the Astro starter page exists so far. Where the work stands: `plan/modules/M00-foundation/REPORT.md`.

## Before you change anything
Read, in this order (paths from the repository root):
1. `AGENTS.md`: project rules
2. `status/STATUS.md`, then your module's `plan/modules/MNN-*/REPORT.md`
3. `plan/contracts.md`: which module owns which path, content schemas, routes, shared components
4. `brand/`: the brand kit (direction D, Midnight Lens). Colours and fonts come only from `brand/tokens/tokens.css` and `brand/fonts/`

## Requirements
- Node.js: `package.json` requires `>=22.23.4` (developed on 24.19.0)
- npm (developed on 12.0.2)

## Versions
Dependencies are pinned to exact versions, and `package-lock.json` is committed (`specs/09-security.md` §3). Only M00's owner (Srdjan) adds or upgrades dependencies (`plan/contracts.md` §1); ask in your module's report.

| Package | Version |
|---|---|
| astro | 7.4.5 |

## Commands
Run from `site/`.

| Command | What it does |
|---|---|
| `npm ci` | Install exactly what `package-lock.json` lists. Use this after cloning or pulling |
| `npm run dev` | Local dev server (Astro's default address is `http://localhost:4321`) |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Serve the built `dist/` locally to check it before a pull request |
| `npm run astro -- --help` | Astro CLI help |

`npm install` changes `package-lock.json`; use it only when M00 changes dependencies.

## Folders
| Path | What it is |
|---|---|
| `src/pages/` | Routes: one file per route group, each owned by its module (`plan/contracts.md` §4) |
| `public/` | Files served as they are (icons come from `brand/logo/png/`) |
| `astro.config.mjs` | Astro configuration (M00) |

More folders (`src/layouts/`, `src/styles/`, `src/i18n/`, `src/components/`, `src/content/`, `src/data/`) are added during M00 as listed in `plan/contracts.md` §1.

## How work reaches `main`
A branch named `feature/…`, `fix/…` or `docs/…`, a pull request, and the owner's approval (`CONTRIBUTING.md`). Every work session ends with updates to the module's `REPORT.md`, `status/STATUS.md` (with its `Updated:` date) and `status/log.md`.
