# Challenge: holes, dilemmas and weaknesses

A critical look at this plan (2026-11-02). Each item says why it matters and what to do. Items marked **Phase 0** must be settled before or while M00 starts.

## Update 2026-11-02: Srdjan's answers
| Item | Answer | Effect on the plan |
|---|---|---|
| A2 hacked old site | “Protect me from all of this in the future” | `specs/09-security.md` and `testing/checklists/security.md` (D15); Dependabot alerts turned on; account and domain actions in Phase 0 |
| A3, A7 courses | Courses come in 2027 as a separate React platform or part of the platform; videos not recorded yet | **Resolved for iteration 1**: M08 shows free learning + waitlist; course platform in `plan/iteration-2.md` (D14) |
| A4 questionnaire | Where is it? | `docs/sadrzaj/upitnik-za-goricu.md`; course questions (8–10) moved to 2027 |
| A5 horoscope | A new edition is coming soon; the 2026 texts stay current about one more month | M07 publishes the new edition; 2026 becomes the archive |
| A6 translation | Machine translation is fine; Srdjan checks the English; everything at launch | **Resolved** (D17). Risk stays: launch date depends on M14 finishing all 20,000 words |
| A10, B4 publishing | Filip publishes, Srdjan helps; CMS for Gorica maybe in iteration 2 | **Resolved**: iteration 1 without CMS; evaluation in `plan/iteration-2.md` |
| B1 launch scope | — | **Resolved**: launch without courses (follows from A3) |
| Hosting | Not on Srdjan's Cloudflare; on Filip's account once he creates it | D16; M00-08. Note: Cloudflare Pages is now part of Workers, so the site deploys as a Worker with static assets, and a custom domain needs DNS on Cloudflare |

## Update 2026-11-02: Gorica's answers
Answers in `docs/sadrzaj/upitnik-za-goricu.md`, carried into `docs/sadrzaj/01–07` (Filip, branch `docs/odgovori-gorice`).

| Item | Answer | Effect on the plan |
|---|---|---|
| A4 questionnaire | Answered except 14 (sessions per month) and 26 (AI training, P03) | M09, M10, M12 can start from the drafts |
| A8 portrait | New photo sent: `docs/sadrzaj/slike/gorica-portret.jpg` | M10 makes the responsive versions |
| A9 legal / payments | **Not registered as a business yet**; analyses are booked with payment in advance | **New risk**: how the prepayment is taken and what the terms say must be settled before launch (Gorica, Srdjan); M09 and M12 keep the payment step outside the site until then |
| B2 tone | ti, first person (D18) | M02-06: old texts are mostly “vi”; edit to “ti” without changing meaning |
| B5 children's astrology | Topic, not a service (D19) | Topic hub stays (concept) |
| B7 services | Natal, solar return, karmic, consultation; prices in RSD and EUR; by phone; 60–90 min (D19) | M09-01 data file; P05 resolved |
| Headline and credential | “Astrologija u službi evolucije svesti”; professional astrologer; no mention of Nikola Stojanović (D20) | M05, M10; brand kit and specs mention “research astrologer” (request to Srdjan) |
| Newsletter | Active MailerLite account; no sign-up gift (D21) | P02b newsletter provider: MailerLite |
| Articles | Twice a month (D21) | Publishing load for Filip until a CMS (D14) |
| Videos | No subtitles for existing videos; new ones will have them; no English videos yet | M11 transcripts stay machine-made and marked unchecked |

## Update 2026-11-03: domain
A1 resolved: astromicroscope.com renewed at Hostinger for one year (status Active until 2027-10-15, auto-renew on, lock on). Srdjan's plan: DNS to Filip's Cloudflare in M00; registrar transfer to Cloudflare not before about 2026-11-29 (45 days after expiry), about $11. Old Premium Web Hosting is not renewed. A Hostinger email trial exists on the domain; MX records to check before DNS moves (M13).

## A. Holes: things the plan cannot solve by itself

| # | Hole | Why it matters | What to do | Owner |
|---|---|---|---|---|
| A1 | **Domain astromicroscope.com is in an expired state** (`whois` 2026-11-02: name servers `NS1.DNS-EXPIRED.COM`, updated 2026-10-16; registry date 2027-10-15 is the registry's automatic renewal, not a renewal by Gorica) | If the grace period ends, the domain goes to a costly redemption phase or is lost, and with it the brand and email addresses | **Phase 0, today:** renew in Hostinger; check the grace-period end date there | Srdjan / Gorica |
| A2 | **The old site was hacked**: about 140 spam posts about casinos since June 2026, possibly indexed by Google under the domain | Google may have marked the domain as compromised; spam URLs can stay in results for months and damage rankings for the new site | **Phase 0:** change WordPress, Hostinger and email passwords; after the domain is back, add it to Search Console, check “Security issues”, and answer spam URLs with 410 Gone; ask Filip for the list of spam URLs from the backup | Srdjan, Filip |
| A3 | **There is no course offer yet** | The brief makes education the main focus, but no course, program or product exists with a name, content or price. An education-first home page with nothing to buy looks empty | Decide the launch scope (dilemma B1) | Gorica, Srdjan |
| A4 | **Gorica's 26 answers are missing** (`docs/sadrzaj/upitnik-za-goricu.md`) | Prices, services, process, tone (ti/vi), contact rules. The bottleneck is not the developers | **Phase 0:** one call with Gorica to go through the questionnaire; answers into `docs/sadrzaj/` | Srdjan, Gorica |
| A5 | **The yearly horoscope is for 2026** and it is already November 2026 | The most searched content will be out of date at launch | Ask Gorica whether she writes 2027 (12 texts, about 7,000 words, before the end of the year); the 2026 texts become an archive | Gorica |
| A6 | **About 20,000 words to translate into English** (D10) | Large effort; astrology terms need care; a poor English version hurts trust and SEO | M14: machine-assisted draft, then a careful edit, then review by a fluent reader; core pages first. Budget time or money for it | Filip, reviewer |
| A7 | **How courses are sold and delivered** (logins, payments, video hosting) is undecided (P02b) | Astro is a static site; logins and payments need a server part or an outside platform. In Serbia, card payments, invoices and VAT depend on Gorica's business form (questionnaire 25) | Decide before M08/M12: an outside course platform linked from the site, or our own; not part of the launch if courses are not ready | Srdjan, Gorica |
| A8 | **No portrait yet** | Hero and About depend on a photo; text in the brand kit asks for soft daylight on a light or blue wall | Gorica chooses or makes a photo; until then the arch frame stays empty in previews only | Gorica |
| A9 | **Legal texts**: privacy, terms, cookies, selling digital products (right of withdrawal) | Needed before collecting emails or payments; nobody on the team writes legal texts | Use a reviewed template or a lawyer; the plan only reserves the pages (M10) | Gorica, Srdjan |
| A10 | **Who publishes after launch?** Articles in Markdown inside git mean Gorica cannot publish without a developer | The brief wants regular articles and an education platform | Dilemma B4 | Srdjan |

## B. Dilemmas: choices to make, with a recommendation

| # | Dilemma | Options | Recommendation |
|---|---|---|---|
| B1 | **Launch scope** | (a) launch everything at once, including courses; (b) **launch in two steps**: first articles, horoscope, videos, private analyses with a request form, About, and education as “coming soon” with a waitlist; courses and products when Gorica has them | **(b).** It puts the existing 20,000 words online sooner, starts SEO earlier, and does not wait for the course offer. It goes against “education first” on day one, so the education section must still be first in the navigation and show the waitlist clearly |
| B2 | **Tone: ti or vi** — **resolved: ti, first person (D18)** | Old site mixes: services in “ti”, About and Contact in “vi”, horoscope texts in “vi” | Pick one in Phase 0 (questionnaire 1). If “ti”, the old texts need editing (more M02/M06 work) |
| B3 | **Old texts as they are or edited** | Publish as written, or restructure for search (answer first, question headings, split the 4,095-word article) | Edit lightly: answer first, headings, verified dates; keep Gorica's voice; she approves every edited text |
| B4 | **Editing for Gorica** | (a) she sends texts and a developer publishes; (b) a git-based CMS on top of the Markdown files, added after launch | (a) for launch, (b) as a follow-up module once publishing frequency is known (questionnaire 11). Do not choose a CMS product now; check current options then |
| B5 | **Children's astrology** | Only a topic, or also a service (“child's chart”) | **Resolved (D19): topic only**; the four services do not include a child's chart |
| B6 | **Repository stays public?** | Public: free branch rules (rulesets) work, but drafts, the questionnaire and Gorica's details are visible. Private: privacy, but rulesets may need a paid GitHub plan (GitHub docs say rulesets are for Team and Enterprise; on our free public repo they work) | Decide before Gorica's answers (prices, business data) go in. Option: keep public, put private answers outside the repo |
| B7 | **Old service list vs brief** — **resolved: four services with prices (D19)** | Old site: natal, solar/yearly, comparative (synastry), current situation, 12-month period, returning-client session. Brief: natal, solar, karmic, life-area consultation | Gorica decides (questionnaire 12). The plan's M09 works with any list (data file) |

## C. Weaknesses of this plan

| # | Weakness | Mitigation |
|---|---|---|
| C1 | **Fourteen modules is a lot for a content site** and for a team of one senior and one junior part-time | Launch scope B1 removes most of M08 and M12 from the first release; modules stay, the order changes |
| C2 | **Critical path through Srdjan**: M00, M03, M04, M05 and all reviews | Filip's first work (M02, M14) does not need code; Srdjan does M00 first and keeps pull requests small; Filip reviews Srdjan's pull requests (non-blocking) so Srdjan's code also gets a second pair of eyes |
| C3 | **The contract is written before any code exists** | M00's first task is to check `contracts.md` against the installed Astro version and correct it before Filip starts on templates |
| C4 | **Translation is the biggest hidden effort** and sits with the junior developer | Machine draft plus human edit; English for core pages first; a fluent reviewer for anything public; track word counts in the M14 report |
| C5 | **Performance risk from the brand itself**: Newsreader fonts (≈ 285 KB for four files), the star field on phones, YouTube thumbnails | Font instancing or subsetting in M00; star field off or static on touch devices (M05); thumbnails self-hosted and resized (M11); Lighthouse budgets in CI from M00 |
| C6 | **Estimates are rough** (S/M/L), no dates | Reports record real effort; Srdjan sets dates after M00 when the speed is known |
| C7 | **Logo detail is limited** by the 667 px original | Fine for screens; for large print, ask for the designer's vector original |
| C8 | **Ephemeris dates** in old texts are unchecked | `ephemerisChecked` is a required field; nothing publishes with `false` |
| C9 | **Two plan systems could drift** (`plan/` reports and `status/STATUS.md`) | `STATUS.md` keeps only a one-line row per module that points to the report; the report is the detail |

## Phase 0 checklist
- [x] Domain renewed, auto-renew and registrar lock on (A1): 2026-11-03, until 2027-10-15; transfer to Cloudflare from about 2026-11-29
- [ ] Passwords changed and 2FA on every account in `specs/09` §2, Filip's GitHub included; spam-URL list prepared (A2) — spam list done: `docs/sadrzaj/stari-sajt/spam-adrese.md` (143 URLs); Filip's Cloudflare 2FA on
- [ ] Filip creates the Cloudflare account (2FA) and adds Srdjan (D16)
- [x] Call with Gorica: questionnaire answered (course questions skipped), tone chosen (A4, B2); open: 14, 26
- [x] 2027 horoscope: new edition coming soon (A5)
- [x] Portrait plan (A8): new photo in `docs/sadrzaj/slike/`
- [ ] Repository visibility decided (B6)
- [x] Course platform and payments: postponed to iteration 2 (A7, D14)
