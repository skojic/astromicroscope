# M08 Education

| | |
|---|---|
| Owner | Filip |
| Needs first | M00 |
| Size | S |
| Specs | specs/00, plan/concept.md |
| Branch | `feature/m08-education` |

## Goal
The education section and hub show what you can learn for free now (articles, videos, yearly horoscope) and invite visitors to the waitlist for the courses that start in 2027.

## Scope
- In: hub, home section, waitlist call to action (form in M12), placeholders for future course pages
- Out: course pages, products, checkout, logins (iteration 2, `plan/iteration-2.md`)

## Inputs
`docs/sadrzaj/02`; course questions (questionnaire 8–10) postponed to 2027 (D14)

## Deliverables
`site/src/components/sections/learn/`, `site/src/data/courses.*`, `products.*`, `site/src/pages/edukacija/**`, `site/src/pages/en/learn/**`, `site/src/i18n/learn.json`

## Tasks
| ID | Task | Notes |
|---|---|---|
| M08-01 | Home section: free learning formats + “Courses in 2027” with waitlist | |
| M08-02 | Education hub linking articles, videos and horoscope | |
| M08-03 | Waitlist call to action (uses the M12 form) | separate group in Gorica's MailerLite, apart from the newsletter; form and double opt-in in M12; the text says exactly what the person signs up for |

## Acceptance criteria
- [ ] Section and hub make clear that courses start in 2027 and how to join the waitlist
- [ ] Gates passed as in `testing/gates.md`; evidence in `REPORT.md`

## Risks
Visitors expecting courses now; the waitlist must be clear


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
