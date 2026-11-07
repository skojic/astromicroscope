# M06 Articles

| | |
|---|---|
| Owner | Filip |
| Needs first | M00, M02 |
| Size | L |
| Specs | specs/04, specs/06, plan/concept.md |
| Branch | `feature/m06-articles` |

## Goal
Articles hub, topic hubs (including children's astrology) and the article page with answer first, transit timeline and author box.

## Scope
- In: Hub, topics, article template, TransitTimeline, home section
- Out: Author box itself (M10), translations (M14)

## Inputs
M02 content; `docs/sadrzaj/02` (articles part)

## Deliverables
`site/src/components/sections/articles/`, `site/src/pages/tekstovi/**`, `site/src/pages/en/articles/**`, `site/src/i18n/articles.json`

## Tasks
| ID | Task | Notes |
|---|---|---|
| M06-01 | Article template: answer box, headings, pull quote, related, previous/next |  |
| M06-02 | TransitTimeline component (used by M07 too) | built 2026-11-07 |
| M06-03 | Hub and topic pages |  |
| M06-04 | Home section: one featured + three |  |
| M06-05 | Article JSON-LD props for M04 |  |

## Acceptance criteria
- [ ] Reading column ≤ 62 characters; body 19 px
- [ ] Every article shows author, published and updated dates
- [ ] axe 0 violations
- [ ] Gates passed as in `testing/gates.md`; evidence in `REPORT.md`

## Risks
Very long article (4,095 words) may need splitting (B3)
