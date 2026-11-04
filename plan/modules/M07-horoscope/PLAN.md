# M07 Yearly horoscope

| | |
|---|---|
| Owner | Srdjan |
| Needs first | M00, M02 |
| Size | M |
| Specs | plan/concept.md |
| Branch | `feature/m07-horoscope` |

## Goal
Horoscope hub with the zodiac wheel, sign pages for the current year and the 2026 archive.

## Scope
- In: Wheel, hub, sign template, archive, home section
- Out: Writing the 2027 texts (Gorica)

## Inputs
M02 horoscope files; A5 decision

## Deliverables
`site/src/components/sections/horoscope/`, `site/src/pages/horoskop/**`, `site/src/pages/en/horoscope/**`, `site/src/i18n/horoscope.json`

## Tasks
| ID | Task | Notes |
|---|---|---|
| M07-01 | Zodiac wheel: list of links without JS; lens and preview with JS; 3 × 4 grid under 768 px |  |
| M07-02 | Sign page template with TransitTimeline and AuthorBox |  |
| M07-03 | Hub with current year and archive |  |
| M07-04 | Home section |  |

## Acceptance criteria
- [ ] Wheel fully usable by keyboard and screen reader
- [ ] No layout shift when a sign is chosen
- [ ] Gates passed as in `testing/gates.md`; evidence in `REPORT.md`

## Risks
2027 texts: not a dependency; the 2026 edition is used until they arrive (D41)
