# Report: M04 SEO and structured data

| | |
|---|---|
| Stage | testing |
| Last gate passed | G1 |
| Owner | Srdjan |
| Branch | `main` (owner bypass) |
| Last commit | see `git log` |
| Last updated | 2026-11-04 |

## Next step
The `uploadDate` finding of the validators is fixed (2026-11-04, PR #12, evidence in the test table). Then Rich Results Test and Schema Markup Validator again on a page of each new type (Article, ProfilePage, Person page once M06 and M10 exist), and a hreflang return-link check once more pages exist. Then `testing/checklists/seo.md` per template. M06, M10, M07 call the JSON-LD builders for their types.

## Done
- 2026-11-04, `site/scripts/seo-check.mjs` (`npm run test:seo`, in `site-ci`, preview and production build): per page title and description present, unique and within length, canonical is the page itself, hreflang sr, en and x-default with return links to built pages, Open Graph and Twitter tags, `og:image` exists, JSON-LD parses and has the fields its type needs, image alt and files; site-wide sitemap against the built pages, robots.txt per environment, noindex per environment, every internal link and anchor, no "click here" text. Evidence: preview and production build both `seo-check: 18 pages, 0 failures, 10 pending routes`; against two broken copies of `dist` it exited 1 and named all 11 planted faults (wrong canonical, missing x-default, broken link, missing anchor, duplicate title, "click here", image without alt, missing hreflang return link, missing JSON-LD `uploadDate`, sitemap entry missing, `og:image` file missing); `SEO_STRICT=1` exits 1 while pages are unbuilt. Not covered: Google's Rich Results Test and the Schema Markup Validator (need a public URL), external links.
- 2026-11-04, automated part of `checklists/seo.md` on the production build (one-off script, Chromium): one title and description per page, none duplicated; canonical is the page itself; hreflang sr, en and x-default with return links on all 16 indexable pages; Open Graph and Twitter tags; `sitemap.xml` 16 entries with alternates; robots allows crawling; no `noindex` except the 404 pages; content in the HTML without JavaScript. Two defects found and fixed in M11 (D32). Not done: Rich Results Test and Schema Markup Validator, which need the live or tunnelled URL.
- M04-01 `components/seo/Seo.astro` (Page passes its props): canonical, hreflang `sr`, `en`, `x-default` only for languages that have a pair, robots `noindex` outside production, Open Graph and Twitter tags.
- M04-02 `components/seo/jsonld.ts`: WebSite, Organization (logo, `sameAs` Instagram and YouTube), Person, BreadcrumbList, ProfilePage, Article, VideoObject, one `@graph` per page. Course, Product and Event builders are not written (courses moved to iteration 2, D14).
- M04-03 default 1200×630 social cards `public/og/default-sr.png`, `default-en.png` (`scripts/make-og.mjs`); pages may pass their own `image` (video pages use their thumbnail).
- M04-04 `sitemap.xml` with hreflang alternates and `robots.txt` generated after the build from the finished pages (D27). Production: allow all, sitemap line. Elsewhere: `Disallow: /`.

## Not done
- Structured data validation: done for the types that exist (home sr/en, video hub, video pages) on 2026-11-04, see Test evidence; the `uploadDate` finding is fixed and re-checked; open: Article, ProfilePage and page-level Person once those pages exist (Article `datePublished` is also date-only in `jsonld.ts`: check it with the Rich Results Test when M06 builds the first article).
- Per-page-type OG images beyond the default card.
- Course, Product, Event JSON-LD.
- Crawler policy for AI training bots (P03 is open).

## Problems and blockers
- `robots.txt` names no crawler: `User-agent: *` allows Googlebot, Bingbot and OAI-SearchBot alike. The checklist asks for verified user-agent names; none are listed, so none can be wrong.
- P03 (AI training crawlers) is undecided.

## Decisions taken in this module
- Date, decision, why (move project-wide ones to `status/decisions.md`).

## Requests to other modules
- To MNN: what is needed and why.

## Test evidence
| Check | Result | Date |
|---|---|---|
| `npm test` (site/) | `ℹ pass 15`, `ℹ fail 0` | 2026-11-03 |
| `npm run build` | `18 page(s) built`, no warnings | 2026-11-03 |
| `npm run test:html` | no output, exit 0 (html-validate on `dist/`) | 2026-11-03 |
| `npm run test:axe` | `axe: 18 pages x 2 viewports, 0 violations` | 2026-11-03 |
| `npm run test:e2e` | `e2e: 18 pages, 0 failures` | 2026-11-03 |
| GitHub Actions `site-ci` on `main` | success for the last push (all steps incl. Lighthouse median of 3) | 2026-11-03 |
| `SITE_ENV=production npm run build` | `robots.txt` has `Allow: /` and the sitemap line; no `noindex` in `dist/index.html` | 2026-11-03 |

| Schema Markup Validator (validator.schema.org, URL mode) on the live preview | sr video page: `0 ERRORS 0 WARNINGS 3 ITEMS` (VideoObject, BreadcrumbList, WebSite); sr home: WebSite with nested publisher Organization, founder Person, alumniOf EducationalOrganization, 0 errors 0 warnings; en home (`<html lang="en">`): 0 errors 0 warnings; `/video/` hub: BreadcrumbList and WebSite, 0 errors 0 warnings; en video page: VideoObject, BreadcrumbList, WebSite, 0 errors 0 warnings. A first set of runs was discarded: the page showed the previous result after a hash change, and one run fetched a malformed URL | 2026-11-04 |
| Google Rich Results Test, URL mode, preview video page | `URL is not available to Google`, `Crawl allowed? No: blocked by robots.txt`, `Page fetch: Failed: Blocked by robots.txt`: the preview's `Disallow: /` (D24) works against Google's crawler | 2026-11-04 |
| Google Rich Results Test, Code mode, JSON-LD of the sr video page in a minimal HTML shell | `2 valid items detected`: Breadcrumbs 1 valid; Videos 1 valid, `2 non-critical issues`: `Invalid datetime value for "uploadDate" (optional)`, `Datetime property "uploadDate" is missing a timezone (optional)`. Only the JSON-LD was tested, not the full page | 2026-11-04 |

| `uploadDate` fix (PR #12): `npm test`, `npm run build`, `npm run test:seo` | `ℹ pass 26`, `ℹ fail 0`; `18 page(s) built`; page has `"uploadDate":"2026-09-22T19:46:51+00:00"`; `seo-check: 18 pages, 0 failures`; on a copy of `dist/` with the bare date put back the audit fails: `uploadDate "2026-09-22" has no time and timezone` | 2026-11-04 |
| Google Rich Results Test, Code mode, same video JSON-LD with the full timestamp | `2 valid items detected`: Breadcrumbs 1 valid; Videos 1 valid, no issues listed (before: `2 non-critical issues`). First attempt returned `Something went wrong`, a retry succeeded | 2026-11-04 |

## History
- 2026-11-02: plan created.
- 2026-11-03: built; G1 passed; CI green.
