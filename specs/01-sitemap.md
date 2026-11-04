---
id: SPEC-01
title: Sitemap and URLs
status: draft
updated: 2026-11-02
---

# Sitemap and URLs

Serbian lives at the root and English under `/en/`. Slugs are translated, lowercase ASCII words joined by hyphens (`č`→`c`, `ć`→`c`, `š`→`s`, `ž`→`z`, `đ`→`dj`). Every page exists in both languages and links to its pair (`specs/05`).

| Page | sr | en | Purpose |
|---|---|---|---|
| Home | `/` | `/en/` | Orientation; courses first, private analyses second |
| Education (hub) | `/edukacija/` | `/en/learn/` | All learning formats |
| Course / program | `/edukacija/<slug>/` | `/en/learn/<slug>/` | One course: outcome, syllabus, format, price, enrol |
| Digital products | `/proizvodi/` + `/proizvodi/<slug>/` | `/en/products/` … | Guides, workbooks |
| Articles (hub) | `/tekstovi/` | `/en/articles/` | Article list, by topic |
| Article | `/tekstovi/<slug>/` | `/en/articles/<slug>/` | One article, with author |
| Topic hubs | `/tekstovi/tema/<slug>/` | `/en/articles/topic/<slug>/` | e.g. transits, signs, houses (internal linking) |
| Videos | `/video/` | `/en/videos/` | YouTube lessons with summaries and transcripts |
| Private analyses | `/analize/` + one page per analysis | `/en/analyses/` … | Natal, solar, karmic, life-area consultation |
| About Gorica | `/o-meni/` | `/en/about/` | Credentials, approach, education |
| Contact | `/kontakt/` | `/en/contact/` | Form plus email |
| ~~Legal~~ | ~~`/privatnost/`, `/uslovi/`~~ | ~~`/en/privacy/`, `/en/terms/`~~ | not built for now (D33) |
| 404 | in both languages | | Helpful links, search |

## Navigation
Main: Education · Articles · Videos · Private analyses · About · language switch. One primary button: explore courses.
Footer: all hubs, contact, legal, social profiles, language switch.

## Rules
- One page = one topic = one main search intent. No two pages compete for the same query.
- Every page is at most three clicks from home, and is linked from at least one hub.
- Breadcrumbs on every page below a hub.
- `sitemap.xml` lists every page in both languages, with hreflang alternates (`specs/05`).
