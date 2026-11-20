# SEO growth plan — 20 November 2026

Status: **Phases 1–3 implemented on `seo/audit-2026-11-20-consolidation` (local commits, not pushed).** Phase 0 deploy and Phase 4 owner actions are still open.

Sources: Search Console API for `sc-domain:womenshealthduo.com` (16 months of daily data, 90-day pages and queries, URL Inspection on 20 URLs) and the claude-seo toolkit (`page_checks`, `transport_check`, `agentic_check`, `sitemap_discovery`) run on the live site. Raw page export: [`gsc/pages-90d.csv`](gsc/pages-90d.csv).

## What the data says

1. **The site lost most of its search visibility right after Google's 18 August 2026 spam update.** The property has data from 19 June 2026.

   | Page type                    | 19 Jun–17 Aug (60 days)          | 22 Aug–18 Nov (89 days)      |
   | ---------------------------- | -------------------------------- | ---------------------------- |
   | Overseas city / city×service | 59 clicks, 4,378 imp, 1,081 URLs | 1 click, 1,562 imp, 420 URLs |
   | Doctor profiles              | 20 clicks, 334 imp               | 4 clicks, 25 imp             |
   | India city pages             | 7 clicks, 333 imp                | 1 click, 75 imp              |
   | Guides and service pages     | 7 clicks, 342 imp                | 3 clicks, 74 imp             |
   | Homepage                     | 31 clicks, 1,242 imp             | 28 clicks, 1,346 imp         |

   Only the homepage held. Overseas virtual pages now average position 59. Pre-update clicks on those pages were spread thinly (no single city had more than 2). The same update window also cut the doctor pages: “dr charmi shah gynecologist” was position 6.4 with 3 clicks; “charmi shah” is now about position 35 with none.

   A date overlap is not proof. It is the most consistent explanation: about 7,000 templated overseas URLs (500 virtual cities plus 6,565 city×service pages in `sitemap-virtual-service-cities.xml`) is the pattern Google's scaled-content policy targets, and when that kind of demotion hits, it usually lowers the whole site rather than only the template pages.

2. **Production is serving thin HTML for guides.** The live `/what-is-pilates/` has 72 words and no JSON-LD in its HTML; `/why-do-i-leak-urine-when-i-cough/` has 132 words; the homepage has 136. The local build on branch `seo/audit-2026-11-20-consolidation` serves 1,668, 1,922 and 2,090 words with structured data. That branch is not deployed.

3. **`/bangalore/` is a Soft 404 in Google** (crawled 20 November 2026). This is Dr. Zalak Shah's in-person city. The page has template faults that read as machine-written:
   - FAQ questions insert the H1 instead of the city: “How do I book in-person care in Women's healthcare in Bengaluru (Bangalore)?” (`contextualFaqs.ts` uses `cityH1` as the label).
   - FAQ answers talk about the page itself: “so this Bangalore page context stays in the thread”, “global city SEO pages”.
   - It opens with international patients, not in-person physiotherapy in Bengaluru.
   - About 55% of its 8-word phrases repeat the Ahmedabad and Mumbai pages.
   - No address, area or hours.

4. **Stray “ , ” separators** appear in visible copy across about 35 places (“Dr. Charmi Shah , full profile”, “Dr. Zalak Shah , Google Business”). These look like leftovers from removing dashes.

5. **The homepage already ranks in positions 3–8 for Zalak-lane searches but almost never gets the click:** “pilates” (30 imp), “stott pilates” (32), “pilates near me” (12), “zalak shah” (44), “physiotherapy near me”, “pelvic floor physiotherapist near me”, “pregnancy physiotherapist near me”, “antenatal physiotherapy”. The homepage title is only the two names plus the brand. It says nothing about physiotherapy or Pilates.

6. **Smaller confirmed issues**
   - Profile titles cut mid-phrase: “Dr. Charmi Shah – OB-GYN, IVF &…”, “Dr. Zalak Shah (PT) – Women's health…”.
   - `/womens-health-physiotherapy/` title and H1 read “Womens Health Physiotherapy” (no apostrophe).
   - Every page's share image is `favicon.svg`. WhatsApp, Instagram and Facebook previews do not render SVG, so shared links have no picture. WhatsApp is the main booking channel.
   - `/diastasis-recti/` is “Crawled – currently not indexed” (one of the four Zalak priority clusters).
   - No HSTS header (Cloudflare setting).
   - `robots.txt` declares `Content-Signal` once; named AI-search bot groups do not repeat it.
   - Google Business Profile drives “near me” map results. Searches like “pilates near me” at position 4.7 with 0 clicks suggest the map pack takes the click.

Not measured: Core Web Vitals (PageSpeed API rate-limited without a key; traffic too low for CrUX field data), GA4 conversions, backlinks.

## Plan

Each phase lists what changes, why the data supports it, and how we will know it worked.

### Phase 0 — Deploy what is already built

- Push `seo/audit-2026-11-20-consolidation` and open the PR to `main` (needs your explicit go-ahead; nothing is pushed today).
- After deploy: URL-inspect the homepage, `/about/`, five guides and the two profiles through the Search Console tool; resubmit `sitemap.xml`.
- **Check:** live HTML word counts match the local build; the inspected pages show a fresh crawl within 14 days.

### Phase 1 — Remove the scaled-template signal

- Set `noindex, follow` on all 6,565 city×service pages and drop `sitemap-virtual-service-cities.xml` from `robots.txt`.
- Decide on the ~500 virtual city pages: either noindex them too (keeping `/online-consultation/`, `/international-consultation/` and its service landings indexable) or keep a short list with real demand. The data shows no city with more than 2 clicks, so the recommendation is noindex all of them.
- URLs stay live (no 404s), so bookmarks and links keep working.
- Update `AGENTS.md`, `llms.txt`, the sitemap audit and the disposition ledger to match.
- **Done (commit cdeb82f):** the 6,565 city×service pages are `noindex, follow` and their sitemap is gone. The owner chose to keep the ~500 virtual city pages indexable for now. After deploy, remove `sitemap-virtual-service-cities.xml` in Search Console.
- **Check:** indexed count for the matrix trends to zero in Search Console; doctor-profile and India-city impressions recover toward the June–August level over 8–12 weeks. Recovery from a quality demotion is slow and not guaranteed.

- **20 Nov 2026, featured city×service pages:** six months of Search Console data (20 May to 18 Nov) showed 1,111 of the 6,565 matrix URLs with impressions: 4,884 impressions, 50 clicks, average position about 60. Queries are mostly local in-person intent ("pelvic floor therapy cape town", "menopause doctor singapore"). The owner chose to re-index the 100 strongest pages in India (excluding in-person cities), the Gulf and high-income markets, then widen gradually. Those 100 (1,940 impressions, 37 clicks in the window) are now `index, follow`, prerendered, in `sitemap.xml`, and carry service-specific content: what video covers, what needs a local visit, what to prepare, local time for practice hours, an approved diagram or class photo, and links to the international service page and guides. South Africa was excluded by the market rule despite the highest impressions. Selection: `scripts/select-featured-service-cities.mjs`. **Check after 8 weeks:** indexed count for the 100, their clicks and position; widen with `--limit` only if they index and hold.

### Phase 2 — Fix the India city pages (start with Bangalore)

- Rewrite the city FAQ template: use the city name, remove copy about “this page” and “SEO pages”, keep the correct doctor lanes, cap at 6 useful questions.
- Lead Bangalore with in-person women's health physiotherapy and STOTT Pilates with Dr. Zalak Shah (PT); keep Dr. Charmi Shah's line accurate and short.
- Add verified local details only (area, landmark, hours, Google Business link already in `externalProfiles.ts`). **Needs from you:** the Bangalore and Ahmedabad studio area and hours. Nothing is invented.
- Remove the “ , ” separators sitewide.
- **Done (commit 7a4d172 plus the Phase 3 commit):** per-city FAQ (booking, which doctor, physio or OB-GYN scope, emergency), Bangalore rewritten around Dr. Zalak Shah (PT), clinic schema uses the city name, stray separators removed, and the Ahmedabad and Bengaluru Google Business links replaced with the ones the owner supplied. The Bengaluru listing shows Ahad Euphoria, Ahad Euphoria Road, Kodathi, and open 24 hours; that is now on `/bangalore/`. The Ahmedabad listing has no address and its pin is in Indapur, Pune district, so no Ahmedabad studio line was added.
- **Check:** `/bangalore/` moves from Soft 404 to “Submitted and indexed”.

### Phase 3 — Earn the clicks the homepage already ranks for

- Homepage title: keep both doctor names and add the services within 60 characters. Draft: “Dr. Charmi & Dr. Zalak Shah: OB-GYN, Physio & Pilates” (final wording for your approval).
- Fix the truncated profile titles and the “Womens” title/H1.
- Add descriptive internal links from the homepage hero area to `/pilates/`, `/womens-health-physiotherapy/`, `/dr-zalak-shah/`, `/bangalore/` and `/ahmedabad/`.
- Replace the share image with a 1200×630 JPEG built from the approved doctor photos already in the repo.
- Re-check `/diastasis-recti/` after deploy; if still not indexed, fold its unique copy into the calendar diastasis article and redirect.
- **Done:** homepage title is “Dr. Charmi & Dr. Zalak Shah: OB-GYN, Physio & Pilates”; profile titles are “Dr. Charmi Shah: Gynecologist & IVF” and “Dr. Zalak Shah (PT): Physio & Pilates” (no truncation); slug-derived guide titles now spell “Women's”; `/diastasis-recti/` is refocused as “Diastasis Recti Physiotherapy” (assessment and rehab) so it no longer mirrors `/what-is-diastasis-recti/`. The homepage topic cards link to the PCOS, hormones, periods, endometriosis, fertility, pregnancy-planning, physiotherapy, prenatal, postnatal, diastasis, bladder-leakage and Pilates pages instead of four identical “Learn hub” buttons (profiles and city pages were already linked). The default share image is `/images/og-womens-health-duo.jpg` (1200×630, `scripts/generate-og-image.mjs`).
- **Check:** homepage CTR on the Zalak-lane queries above; profile pages ranking for the doctor-name searches instead of the homepage.

### Phase 4 — Owner actions outside the repo

- Google Business Profiles (Ahmedabad and Bengaluru for Dr. Zalak; confirm whether Dr. Charmi has listings): correct primary category, hours, photos, website link to the matching city page, and a steady flow of genuine reviews. This is the main lever for “near me” searches.
- Cloudflare: enable HSTS; apply the guide-consolidation 301s already listed in `seo-cloudflare-redirects.md`.
- **Done 20 Nov 2026:** the 13 refreshed drafts are clinically approved and live, with reviewer bylines for Dr. Zalak Shah and Dr. Charmi Shah. Image approval on those 13 is still pending. Still unsigned: the PMOS alias, the PMOS wording and adult/adolescent framing on `/what-is-pcos/`, and the Tele-MANAS numbers on `/what-is-pmdd/`. `what-is-pilates` (W35-Z) stays in clinical review.

### Phase 5 — Measure every two weeks

- Pull clicks, impressions and position by page type through the Search Console tool and compare with the baseline above.
- Baseline (22 Aug–18 Nov): 40 clicks, 3,237 impressions; 12 clicks outside the homepage.

## Indexing and target-query pass (20 November 2026, later)

Search Console URL inspection (about 70 key URLs) and 90-day query × page data:

- **Indexed fine:** almost every topic guide, both profiles, Ahmedabad, Mumbai, Valsad, the physiotherapy hub, `/pilates/`, FAQ, booking and the international hub. Their problem is ranking, not indexing.
- **Not indexed:** `/bangalore/` (Soft 404, recrawled 20 Nov against the old live copy), `/diastasis-recti/` (crawled, not indexed), Learn filter pages such as `/learn/topic/pregnancy/`, `/learn/topic/exercise/`, `/learn/topic/reels/`, `/learn/dr-zalak/topic/pilates/` (crawled or discovered, not indexed), and many watch pages (discovered or unknown).
- **Cause on Learn:** 198 of 200 watch pages were empty JavaScript shells, and every filter page shared one intro. Fixed: indexable Learn filters and watch pages are prerendered (337 pages in total), thin or duplicate filters are `noindex, follow` and out of the sitemap, and topic pages have their own intro plus links to the written guides.
- **`/diastasis-recti/`** is now the physiotherapy page for diastasis recti (assessment and rehab), distinct from `/what-is-diastasis-recti/`.
- **Target queries:** the city titles and H1s now use the words people search (“gynecologist in Valsad”, “gynecologist … Mumbai”, “physio & Pilates … Ahmedabad / Bangalore”), and `/pilates/` is titled “STOTT Pilates Classes”.

**Google Business Profile finding (owner action):** the “near me” queries (“pilates classes near me” at position 2.3, “women's health physiotherapist near me” 2.8, “pregnancy physiotherapy” 1.4) are reported against `http://womenshealthduo.com/`, which means the Business Profiles link to the plain-HTTP homepage. Set each listing's website to its city page: Ahmedabad → `https://womenshealthduo.com/ahmedabad/`, Bengaluru → `https://womenshealthduo.com/bangalore/`. Searchers then land on the page that matches the listing, and the clicks are attributed correctly.

**After deploy:** request indexing in Search Console for `/bangalore/`, `/diastasis-recti/`, `/valsad/`, `/pilates/` and `/learn/topic/pregnancy/`, and resubmit `sitemap.xml`.
