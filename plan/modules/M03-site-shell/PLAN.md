# M03 Site shell

| | |
|---|---|
| Owner | Srdjan |
| Needs first | M00 |
| Size | M |
| Specs | specs/01, specs/05, specs/08 |
| Branch | `feature/m03-site-shell` |

## Goal
Header, navigation, language switch, footer, skip link and 404 on every page, in both languages.

## Scope
- In: Shell components and 404
- Out: Page content

## Inputs
`docs/sadrzaj/01` (menu labels), `docs/sadrzaj/07` (footer)

## Deliverables
`site/src/components/shell/`, `site/src/i18n/shell.json`, 404 pages

## Tasks
| ID | Task | Notes |
|---|---|---|
| M03-01 | Header with logo lockup, five menu items, primary button |  |
| M03-02 | Mobile menu (button, focus handling, Escape) |  |
| M03-03 | Language switch to the paired page via translationKey |  |
| M03-04 | Footer: routes, contact, legal, social, language |  |
| M03-05 | Skip link and 404 in both languages |  |

## Acceptance criteria
- [ ] Keyboard path and focus pass `testing/checklists/accessibility.md`
- [ ] Language switch lands on the same page in the other language
- [ ] Header height fixed: no layout shift
- [ ] Gates passed as in `testing/gates.md`; evidence in `REPORT.md`

## Risks
Paired page missing for some content (until M14 completes)


## Component specs (moved from `modules/`)

### Component spec: Header and navigation

#### Purpose
Lets visitors reach courses, articles, videos, private analyses and About from any page, and switch language.

#### Content (sr and en)
Logo lockup (links home); main nav items (sr/en labels from `specs/01`); primary button “Pogledaj kurseve / Explore courses”; language switch.

#### Structure and semantics
`<header>` containing `<nav aria-label>` with a list of links; the current page gets `aria-current="page"`. A skip link “Preskoči na sadržaj / Skip to content” comes first in the DOM.

#### States
Default, hover, focus, active, empty and error where they apply; both languages; 360 px and 1440 px; reduced motion.

#### Performance budget
No JavaScript needed for the desktop menu; the mobile menu toggle is the only script (≤ 3 KB). The logo is inline SVG with no request. The header height is fixed so it never causes layout shift.

#### Accessibility
Keyboard order: skip link, logo, nav, language switch, button. Mobile menu: a button with `aria-expanded`, focus moves into the menu and back on close, Escape closes it. Targets ≥ 24×24 px (WCAG 2.5.8).

#### Tasks
| ID | Task | Stage | Notes |
|---|---|---|---|
| NAV-01 | Desktop navigation | idea | |
| NAV-02 | Mobile menu | idea | |
| NAV-03 | Skip link | idea | |
| NAV-04 | Active-page state | idea | |

#### Tests
See `testing/test-plan.md`, row MOD-header-nav.

### Component spec: Language switch

#### Purpose
Moves the visitor to the same page in the other language.

#### Content (sr and en)
Labels “SR” and “EN”, with full names for assistive technology (“Srpski”, “English”).

#### Structure and semantics
Plain links (`<a href hreflang lang>`) to the paired URL, not JavaScript buttons, so crawlers follow them too. The current language is marked with `aria-current="true"`.

#### States
Default, hover, focus, active, empty and error where they apply; both languages; 360 px and 1440 px; reduced motion.

#### Performance budget
Zero JavaScript. Never redirects automatically by browser language.

#### Accessibility
Each target is at least 24×24 px; the link names include the language name in that language (`lang` attribute).

#### Tasks
| ID | Task | Stage | Notes |
|---|---|---|---|
| LANG-01 | Paired-URL lookup for every page | idea | |
| LANG-02 | hreflang `<link>` tags in `<head>` (see seo-head) | idea | |

#### Tests
See `testing/test-plan.md`, row MOD-language-switch.

### Component spec: Footer

#### Purpose
Repeats the main routes, contact, legal pages and social links on every page.

#### Content (sr and en)
Hub links, email, Instagram, YouTube, legal links, language switch, copyright.

#### Structure and semantics
`<footer>` with labelled navigation lists. Contact sits in the same place on every page (WCAG 3.2.6).

#### States
Default, hover, focus, active, empty and error where they apply; both languages; 360 px and 1440 px; reduced motion.

#### Performance budget
No JavaScript; social icons inline SVG.

#### Accessibility
Link texts name the destination (“Instagram @astromicroscope”).

#### Tasks
| ID | Task | Stage | Notes |
|---|---|---|---|
| FOOTER-01 | Footer layout | idea | |
| FOOTER-02 | Legal pages linked | idea | |

#### Tests
See `testing/test-plan.md`, row MOD-footer.
