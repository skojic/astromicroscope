# M02 Content migration

| | |
|---|---|
| Owner | Filip |
| Needs first | plan/contracts.md (not M00 code) |
| Size | M |
| Specs | specs/04, plan/contracts.md §3 |
| Branch | `feature/m02-content-migration` |

## Goal
All 28 pages of the old site are in the agreed Markdown format, ready for the templates.

## Scope
- In: Convert, add front matter, write the answer-first summary, list dates to verify, record old URLs
- Out: Translation (M14), new texts, page design

## Inputs
`docs/sadrzaj/stari-sajt/tekstovi/` (28 files), `docs/sadrzaj/01–07`

## Deliverables
`site/src/content/articles/sr/`, `site/src/content/horoscope/sr/2026/`, `site/src/content/pages/sr/` (created as plain files before M00 exists)

## Tasks
| ID | Task | Notes |
|---|---|---|
| M02-01 | Map every old page to a new URL (table in the report), including the old URL | needed for redirects in M13 |
| M02-02 | Convert 10 articles to the article schema | answer 40–60 words each; Gorica approves edits |
| M02-03 | Convert 12 horoscope texts to the sign schema for 2026 |  |
| M02-04 | Convert About, Why Astromicroscope, Contact, Consultations into pages and data |  |
| M02-05 | List every astrological date per text; check against an ephemeris; set `ephemerisChecked` | C8 |
| M02-06 | Apply the tone decision (ti/vi, B2) and light structure edits (B3) | after Phase 0 |

## Acceptance criteria
- [ ] Every old page has a target file or a written reason why not
- [ ] All files validate against the schema (after M00)
- [ ] No `ephemerisChecked: false` in files meant for launch
- [ ] Gates passed as in `testing/gates.md`; evidence in `REPORT.md`

## Risks
Edits change Gorica's voice; tone decision late
