---
id: MOD-seo-head
title: SEO head and structured data
stage: idea
gate: none
specs: [SPEC-05, SPEC-06]
updated: 2026-11-02
---

# SEO head and structured data

## Purpose
Gives every page correct metadata, canonical and hreflang links, social cards and JSON-LD.

## Content (sr and en)
Per page and per language: title, meta description, OG image and alt, canonical URL, alternate URLs, structured data fields.

## Structure and semantics
Rendered on the server into `<head>`. JSON-LD per page type as listed in `specs/06`, generated from the same data as the visible text, so the two always match.

## States
Default, hover, focus, active, empty and error where they apply; both languages; 360 px and 1440 px; reduced motion.

## Performance budget
No runtime cost; nothing here may block rendering except the critical CSS.

## Accessibility
`<html lang>` is set per language (`sr-Latn`, `en`).

## Tasks
| ID | Task | Stage | Notes |
|---|---|---|---|
| SEO-01 | Title and description per template | idea | |
| SEO-02 | Canonical and hreflang (incl. x-default) | idea | |
| SEO-03 | Open Graph and Twitter tags | idea | |
| SEO-04 | JSON-LD: WebSite, Organization, BreadcrumbList | idea | |
| SEO-05 | JSON-LD per type: ProfilePage/Person, Article, VideoObject, Course, Product, Event | idea | |
| SEO-06 | sitemap.xml with alternates | idea | |
| SEO-07 | robots.txt per decision P03 | idea | |

## Tests
See `testing/test-plan.md`, row MOD-seo-head.
