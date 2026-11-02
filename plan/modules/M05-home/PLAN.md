# M05 Home page

| | |
|---|---|
| Owner | Srdjan |
| Needs first | M03, section modules |
| Size | M |
| Specs | plan/concept.md, specs/07 |
| Branch | `feature/m05-home` |

## Goal
The home page from the concept: hero with star field and chart lens, then the sections in order.

## Scope
- In: Hero, star field, chart lens, section assembly
- Out: The sections themselves (their modules)

## Inputs
`brand/home-reference.html`, `docs/sadrzaj/01`

## Deliverables
`site/src/components/home/`, `site/src/pages/index.astro`, `site/src/pages/en/index.astro`

## Tasks
| ID | Task | Notes |
|---|---|---|
| M05-01 | Static hero: H1, lede, two buttons (LCP element is the H1) |  |
| M05-02 | Chart lens: pointer and arrow keys |  |
| M05-03 | Star field: idle start, pause offscreen, off on reduced motion, simplified on touch |  |
| M05-04 | Assemble sections in concept order with `Pending.astro` fallbacks |  |

## Acceptance criteria
- [ ] Lighthouse mobile: LCP ≤ 2.0 s, CLS ≤ 0.05
- [ ] Reduced motion: no animation
- [ ] Works without JavaScript (text and buttons)
- [ ] Gates passed as in `testing/gates.md`; evidence in `REPORT.md`

## Risks
Canvas cost on low-end phones


## Component specs (moved from `modules/`)

### Component spec: Home hero

#### Purpose
States in one screen what Astromicroscope is (learn astrology from a research astrologer) and offers two paths: courses (primary) and private analyses (secondary).

#### Content (sr and en)
H1, one-sentence lede, two buttons; the signature visual of direction D: the night-sky background with the star field and the natal chart with the magnifying lens (`brand/home-reference.html`).

#### Structure and semantics
The H1 is the LCP element. It must be HTML text, not an image or canvas.

#### States
Default, hover, focus, active, empty and error where they apply; both languages; 360 px and 1440 px; reduced motion.

#### Performance budget
The text paints without waiting for JavaScript. The signature effect (canvas or SVG) starts after idle, only while visible, and is off under reduced motion. On mobile it is simplified or static. Layout shift 0.

#### Accessibility
The interactive chart works with arrow keys and clicks, not only with the pointer (WCAG 2.5.7). Decorative canvas is `aria-hidden`.

#### Tasks
| ID | Task | Stage | Notes |
|---|---|---|---|
| HERO-01 | Static hero (text and buttons) | idea | |
| HERO-02 | Signature visual, progressive enhancement | idea | |
| HERO-03 | Reduced-motion and mobile variants | idea | |

#### Tests
See `testing/test-plan.md`, row MOD-hero.
