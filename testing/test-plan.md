# Test plan

Which checks cover which module. The tools are proposals until `specs/03` is decided; record the chosen tools and their versions here.

| Module | Automated (G2) | Manual (G3) |
|---|---|---|
| M03 header-nav | axe; link check; Lighthouse | keyboard path, mobile menu focus trap and Escape, active state, 2.4.11 focus not hidden |
| M03 language-switch | every page has a pair; hreflang return links | switch lands on the same page; screen reader reads the language names |
| M04 seo-head | structured data validation per template; title and description length and uniqueness; canonical self-reference | Rich Results Test spot check; social card preview |
| M05 hero | Lighthouse LCP ≤ 2.0 s and CLS ≤ 0.05 (mobile) | reduced motion; lens by keyboard; 360 px |
| M08 learn-formats | axe; link check | empty state; both languages |
| M11 youtube-feed | no third-party requests on load; VideoObject valid | facade plays on click; Serbian titles marked `lang="sr"` |
| M09 private-analyses | axe; link check | accordion by keyboard (if used) |
| M10 about | ProfilePage/Person valid | portrait alt text in both languages |
| M12 newsletter | form works without JavaScript; errors announced | consent text reviewed; double opt-in tested |
| M03 footer | link check | contact in the same place on every page |

## Site-wide checks before release
- Crawl the whole site (both languages): status codes, canonicals, hreflang, orphan pages, duplicate titles.
- Lighthouse on every template, mobile and desktop.
- `checklists/content.md`: no placeholders, every string translated and proofread.
| M06 articles | axe; Article JSON-LD valid; link check | reading width, answer box, TransitTimeline by screen reader |
| M07 horoscope | wheel works without JS (12 links); no layout shift | wheel by keyboard and screen reader; 3 × 4 grid on mobile |
| M02 / M14 content | schema validation; every sr file has an en pair; no `[placeholder]`; no `ephemerisChecked: false` | proofreading in both languages |
