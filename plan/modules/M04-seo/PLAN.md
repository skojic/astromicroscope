# M04 SEO and structured data

| | |
|---|---|
| Owner | Srdjan |
| Needs first | M00 |
| Size | M |
| Specs | specs/05, specs/06 |
| Branch | `feature/m04-seo` |

## Goal
Every page has correct metadata, hreflang, canonical, social cards and JSON-LD, and the site has a sitemap and robots.txt.

## Scope
- In: Seo component, JSON-LD, sitemap, robots, OG images
- Out: Redirects from old URLs (M13), content

## Inputs
`docs/sadrzaj/01–07` (SEO titles and descriptions); decision P03

## Deliverables
`site/src/components/seo/`, sitemap and robots configuration

## Tasks
| ID | Task | Notes |
|---|---|---|
| M04-01 | `<Seo>` reading Page props: title, description, canonical, hreflang (sr, en, x-default) |  |
| M04-02 | JSON-LD per page type as in `specs/06` |  |
| M04-03 | Open Graph image per page type, both languages |  |
| M04-04 | sitemap.xml with alternates; robots.txt per P03 |  |

## Acceptance criteria
- [ ] `testing/checklists/seo.md` passes on every template
- [ ] Rich Results Test without errors on one page of each type
- [ ] Gates passed as in `testing/gates.md`; evidence in `REPORT.md`

## Risks
hreflang wrong when a pair is missing


## Component specs (moved from `modules/`)

### Component spec: SEO head and structured data

#### Purpose
Gives every page correct metadata, canonical and hreflang links, social cards and JSON-LD.

#### Content (sr and en)
Per page and per language: title, meta description, OG image and alt, canonical URL, alternate URLs, structured data fields.

#### Structure and semantics
Rendered on the server into `<head>`. JSON-LD per page type as listed in `specs/06`, generated from the same data as the visible text, so the two always match.

#### States
Default, hover, focus, active, empty and error where they apply; both languages; 360 px and 1440 px; reduced motion.

#### Performance budget
No runtime cost; nothing here may block rendering except the critical CSS.

#### Accessibility
`<html lang>` is set per language (`sr-Latn`, `en`).

#### Tasks
| ID | Task | Stage | Notes |
|---|---|---|---|
| SEO-01 | Title and description per template | idea | |
| SEO-02 | Canonical and hreflang (incl. x-default) | idea | |
| SEO-03 | Open Graph and Twitter tags | idea | |
| SEO-04 | JSON-LD: WebSite, Organization, BreadcrumbList | idea | |
| SEO-05 | JSON-LD per type: ProfilePage/Person, Article, VideoObject, Course, Product, Event | idea | |
| SEO-06 | sitemap.xml with alternates | idea | |
| SEO-07 | robots.txt per decision P03 | idea | |

#### Tests
See `testing/test-plan.md`, row MOD-seo-head.
