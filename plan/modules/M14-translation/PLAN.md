# M14 English translation

| | |
|---|---|
| Owner | Filip (final English review: Srdjan) |
| Needs first | M02 |
| Size | L |
| Specs | specs/05, plan/contracts.md §2 |
| Branch | `feature/m14-translation` |

## Goal
Every text exists in English, accurate and natural, paired with its Serbian original.

## Scope
- In: Translate articles, horoscope, pages, data files; keep a glossary
- Out: Writing new content

## Inputs
M02 files; `docs/sadrzaj/01–07` (EN already drafted for home sections)

## Deliverables
`site/src/content/**/en/`, English values in data files, `plan/modules/M14-translation/glossary.md`

## Tasks
| ID | Task | Notes |
|---|---|---|
| M14-01 | Glossary of astrology terms SR → EN (signs, houses, transits, techniques) |  |
| M14-02 | Core pages first: home sections, about, analyses, contact, legal |  |
| M14-03 | Horoscope texts |  |
| M14-04 | Articles |  |
| M14-05 | Machine-translated first draft, edited by Filip; Srdjan reviews and approves each batch in its pull request; track word counts in the report | D17 |

## Acceptance criteria
- [ ] Every Serbian file has an English pair with the same translationKey
- [ ] Srdjan's approval recorded per batch (pull request)
- [ ] Everything in English before launch (D17)
- [ ] Gates passed as in `testing/gates.md`; evidence in `REPORT.md`

## Risks
Effort (A6); terminology
