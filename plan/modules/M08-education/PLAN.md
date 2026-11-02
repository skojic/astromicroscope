# M08 Education

| | |
|---|---|
| Owner | Filip |
| Needs first | M00, Gorica's answers |
| Size | M |
| Specs | specs/00, plan/concept.md |
| Branch | `feature/m08-education` |

## Goal
Learn hub, course and product pages driven by data files; waitlist while there is nothing to sell.

## Scope
- In: Hub, course/product templates, home section, waitlist state
- Out: Checkout and logins (A7)

## Inputs
`docs/sadrzaj/02`; questionnaire 8–10

## Deliverables
`site/src/components/sections/learn/`, `site/src/data/courses.*`, `products.*`, `site/src/pages/edukacija/**`, `site/src/pages/en/learn/**`, `site/src/i18n/learn.json`

## Tasks
| ID | Task | Notes |
|---|---|---|
| M08-01 | Home section with four formats |  |
| M08-02 | Hub and course template from data |  |
| M08-03 | “Coming soon” state with waitlist link (M12) | B1 |

## Acceptance criteria
- [ ] Pages render with zero courses (empty state) and with sample data
- [ ] Gates passed as in `testing/gates.md`; evidence in `REPORT.md`

## Risks
No course offer at launch (A3)


## Component specs (moved from `modules/`)

### Component spec: Learning formats

#### Purpose
Shows the four ways to learn (programs, recorded courses, digital products, articles) and links each to its hub.

#### Content (sr and en)
Per format: name, one-sentence description, status line (next date, price from), link. Data comes from the CMS, so dates and prices stay correct.

#### Structure and semantics
A section with an H2 and a list of four items, each with an H3 and one link with descriptive text.

#### States
Default, hover, focus, active, empty and error where they apply; both languages; 360 px and 1440 px; reduced motion.

#### Performance budget
No JavaScript. Icons are inline SVG.

#### Accessibility
Card links: the whole card may be clickable, but only one link is focusable per card.

#### Tasks
| ID | Task | Stage | Notes |
|---|---|---|---|
| LEARN-01 | Section layout | idea | |
| LEARN-02 | CMS data binding | idea | |
| LEARN-03 | Empty state when a format has nothing yet (“Uskoro / Coming soon” + waitlist) | idea | |

#### Tests
See `testing/test-plan.md`, row MOD-learn-formats.
