# M10 About, contact, legal

| | |
|---|---|
| Owner | Filip |
| Needs first | M00 |
| Size | S |
| Specs | specs/06, specs/08 |
| Branch | `feature/m10-about-contact-legal` |

## Goal
About page and home section, author box, contact page, legal pages.

## Scope
- In: About, AuthorBox, contact page UI, privacy/terms/cookies pages
- Out: Legal wording itself (A9), form sending (M12)

## Inputs
`docs/sadrzaj/05`, `07`; old `o-meni.md`, `zasto-astromicroscope.md`

## Deliverables
`site/src/components/sections/about/`, `site/src/content/pages/`, routes in `contracts.md` §4, `site/src/i18n/about.json`

## Tasks
| ID | Task | Notes |
|---|---|---|
| M10-01 | About page in first person with credential, story, the name, quote | professional astrologer; no mention of Nikola Stojanović (D20); portrait `docs/sadrzaj/slike/gorica-portret.jpg`; Jung quote in English chosen by Gorica |
| M10-02 | AuthorBox for articles and horoscope |  |
| M10-03 | Home section |  |
| M10-04 | Contact page UI | reply within three days; astromicroscope@gmail.com; no other social networks |
| M10-05 | Legal page shells |  |

## Acceptance criteria
- [ ] Person/ProfilePage data correct (with M04)
- [ ] Portrait alt text in both languages
- [ ] Gates passed as in `testing/gates.md`; evidence in `REPORT.md`

## Risks
Portrait received (A8 resolved); legal wording depends on P06


## Component specs (moved from `modules/`)

### Component spec: About Gorica

#### Purpose
Builds trust: education, credentials, approach, photo. It also serves as the author page every article links to.

#### Content (sr and en)
Portrait, short bio, degree and institution, approach principles, links to Instagram and YouTube.

#### Structure and semantics
ProfilePage + Person JSON-LD with `sameAs` to the social profiles.

#### States
Default, hover, focus, active, empty and error where they apply; both languages; 360 px and 1440 px; reduced motion.

#### Performance budget
Portrait as AVIF/WebP with `srcset`; not lazy if above the fold.

#### Accessibility
Meaningful alt text on the portrait in both languages.

#### Tasks
| ID | Task | Stage | Notes |
|---|---|---|---|
| ABOUT-01 | Home section | idea | |
| ABOUT-02 | About page | idea | |
| ABOUT-03 | Author box for articles | idea | |

#### Tests
See `testing/test-plan.md`, row MOD-about.
