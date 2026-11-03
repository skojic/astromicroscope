# M09 Private analyses

| | |
|---|---|
| Owner | Filip |
| Needs first | M00, Gorica's answers |
| Size | M |
| Specs | specs/00, plan/concept.md |
| Branch | `feature/m09-analyses` |

## Goal
The premium offer: hub, one page per analysis, request form interface.

## Scope
- In: Hub, analysis template, home section, form UI
- Out: Form sending (M12)

## Inputs
`docs/sadrzaj/04`, old `konsultacije.md`; questionnaire 12–17

## Deliverables
`site/src/components/sections/analyses/`, `site/src/data/analyses.*`, `site/src/pages/analize/**`, `site/src/pages/en/analyses/**`, `site/src/i18n/analyses.json`

## Tasks
| ID | Task | Notes |
|---|---|---|
| M09-01 | Data file with the final service list (B7) | four services, durations, prices in RSD and EUR, by phone, prepayment (D19, `docs/sadrzaj/04`) |
| M09-02 | Hub and analysis template |  |
| M09-03 | Home section (Midnight panel, gold hairline) |  |
| M09-04 | Request form fields and validation messages |  |

## Acceptance criteria
- [ ] Service list matches Gorica's answer
- [ ] Form usable without a mouse; errors announced
- [ ] Gates passed as in `testing/gates.md`; evidence in `REPORT.md`

## Risks
Service list decided (D19). Open: sessions per month (questionnaire 14) and how the prepayment is taken while Gorica is not a registered business (A9)


## Component specs (moved from `modules/`)

### Component spec: Private analyses

#### Purpose
Presents the premium one-to-one offer: natal, solar and karmic analysis and a consultation on one area of life, and leads to a booking request.

#### Content (sr and en)
Per analysis: name, what it covers, what the client provides (birth date, time, place), format and length, price, request link. Each has its own page (`specs/01`).

#### Structure and semantics
A section with an H2 and a list; on the analysis page, Service or Product data only if it matches the visible text.

#### States
Default, hover, focus, active, empty and error where they apply; both languages; 360 px and 1440 px; reduced motion.

#### Performance budget
No JavaScript unless an accordion is used (then ≤ 2 KB, works without it).

#### Accessibility
An accordion, if used, follows the disclosure pattern (`button` + `aria-expanded`).

#### Tasks
| ID | Task | Stage | Notes |
|---|---|---|---|
| ANALYSIS-01 | Section on home | idea | |
| ANALYSIS-02 | Analysis page template | idea | |
| ANALYSIS-03 | Request form (see contact) | idea | |

#### Tests
See `testing/test-plan.md`, row MOD-private-analyses.
