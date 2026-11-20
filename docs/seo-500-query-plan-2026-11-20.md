# 500-query plan (20 November 2026)

Search Console export for `sc-domain:womenshealthduo.com`, 20 May to 17 November 2026, plus URL inspection on 12 sample pages. The target list is [`seo-500-query-map-2026-11-20.csv`](seo-500-query-map-2026-11-20.csv).

## Verdict

The site is not well positioned yet. Google shows it often for searches it cannot win, and rarely for the searches that lead to a booking.

| Measure (180 days)                        | Value                                                        |
| ----------------------------------------- | ------------------------------------------------------------ |
| Impressions / clicks                      | 9,119 / 166 (1.8% CTR), average position 38                  |
| Impressions by month                      | Jun 428, Jul 3,005, Aug 3,080, Sep 741, Oct 1,142, Nov\* 723 |
| Queries seen                              | 993                                                          |
| Queries in positions 1–3 / 4–10           | 81 / 114                                                     |
| Queries in positions 11–20 / 21–50 / 51+  | 51 / 166 / 581                                               |
| Impressions on virtual city×service pages | 3,062, with 0 clicks                                         |
| Impressions on the homepage               | 1,025, with 13 clicks                                        |
| Impressions on 81 topic guides combined   | 7                                                            |

\* November runs to the 17th.

What that means:

1. **Impressions fell by about 70% after August and have not come back.** The drop lines up with the period when about 7,000 templated overseas pages were live. The owner chose on 20 November to keep the full city×service matrix indexable. Those pages are where 60% of impressions land, and they have earned no clicks in 180 days. This is the biggest risk to the whole plan (see the decision gate below).
2. **Most overseas impressions are for in-person care abroad.** Examples: "pelvic floor therapy gauteng", "women's physiotherapy birmingham", "menopause clinic singapore". The site ranks 50 to 90 for these and cannot serve them in person. More city pages will not change that. The online version of each service is the page to win.
3. **Dr. Charmi Shah's medical lanes are nearly invisible.** Menopause averages position 83, PCOS 81, IVF and fertility 72, endometriosis and laparoscopy 69, generic gynecologist searches 47. Only her name and Valsad gynecology show up.
4. **Dr. Zalak Shah's lanes are closer.** Pilates averages position 10 ("pilates classes near me" is position 2 with 148 impressions). Diastasis averages 6.6 on small volume. Pelvic floor has the most demand (1,193 impressions) but averages position 64.
5. **The guides are indexed but not trusted.** 81 guide URLs earned 7 impressions in 180 days. URL inspection shows `/why-do-i-leak-urine-when-i-cough/`, `/what-is-pcos/`, `/pelvic-floor-therapy/`, and `/online-gynecologist/` indexed. `/diastasis-recti/` is crawled but not indexed. `/menopause-hrt-questions/` and the new local pages such as `/ahmedabad/pelvic-floor-physiotherapy/` are unknown to Google until deploy. Newer articles show a "Medically reviewed by" line. Older pillar guides such as `/pelvic-floor-therapy/` and `/diastasis-recti/` show no byline. Indexed pages with almost no impressions point to authority and trust, not crawling.
6. **Brand clicks are leaking.** "zalak shah" has 95 impressions at position 7 with 0 clicks, and Google mostly shows the homepage for it instead of `/dr-zalak-shah/`. "charmi shah" sits at position 19. The `http://` and `www.` versions of the homepage still collect impressions (1,772 and 564), which splits signals until the edge redirects are in place.

## Goal and honest targets

"Top for 500 queries" means page 1 (positions 1–10) for the 500 queries in the map, with brand and local queries in the top 3. Nobody can guarantee rankings. These targets assume the deploy, the owner actions below, and steady clinical sign-off happen on time.

| By        | Target                                                                         |
| --------- | ------------------------------------------------------------------------------ |
| 30 days   | All P1 brand and local queries on page 1; impressions back above 1,500 a month |
| 90 days   | 150 of the 500 in the top 10, 50 in the top 3                                  |
| 6 months  | 300 in the top 10, impressions above 5,000 a month, clicks above 150 a month   |
| 12 months | 500 in the top 10, 150 in the top 3                                            |

Today 112 of the 321 Search Console queries in the map are already in the top 10, mostly brand, Pilates, and Valsad.

## The 500-query map

| Tier | Rows | What it holds                                                                  |
| ---- | ---- | ------------------------------------------------------------------------------ |
| P1   | 100  | Brand, Valsad and Ahmedabad local, Pilates, online gynecologist, near-me hubs  |
| P2   | 150  | Remaining local services, online services, striking-distance queries           |
| P3   | 250  | Informational questions the guides answer, longer online and overseas variants |

By intent: online 168, local India 109, informational 81, service head terms 72, near-me 61, brand 9. By doctor: Dr. Zalak Shah 238, Dr. Charmi Shah 222, both 40. 321 rows come from Search Console with real impressions. 179 rows are proposed, which means a city, service, or question the site already has a page for but Google does not show yet. Proposed rows have no volume number because none was measured.

Every row points at a page that already exists, 132 URLs in all. No new URL is needed to start. One page owns each intent, so pages do not compete:

| Intent                                     | Owner page                                                                                  |
| ------------------------------------------ | ------------------------------------------------------------------------------------------- |
| Online gynecologist (any wording)          | `/online-gynecologist/`                                                                     |
| Online women's health physio               | `/online-womens-health-physiotherapy/`                                                      |
| Overseas second opinion, "cannot get seen" | `/international-consultation/ob-gyn-second-opinion-online/`                                 |
| Online pelvic floor, diastasis, postnatal  | the matching `/international-consultation/*-online/` page                                   |
| Both doctors online                        | `/online-consultation/`                                                                     |
| City + service                             | `/{city}/{service}/` (Mumbai, Ahmedabad, Valsad, Bangalore)                                 |
| Near me, no city                           | the service hub (`/pilates/`, `/prenatal/`, `/postnatal/`, `/womens-health-physiotherapy/`) |
| A question                                 | the topic guide whose slug is that question                                                 |

Each row's `action` column says what moves it: hold, CTR fix (positions 4–10), striking distance (11–30), authority (31+), or "page exists for this exact question" for guides Google is not showing yet.

## Workstreams

### 1. Technical (week 1, after deploy)

- Deploy the branch. Resubmit `sitemap.xml` and `sitemap-images.xml`, and remove `sitemap-virtual-service-cities.xml` in Search Console.
- Request indexing for the P1 target pages: the two doctor profiles, `/valsad/gynecology/`, the ten Ahmedabad and Bangalore physio and Pilates pages, the four new international pages, `/online-gynecologist/`, `/online-womens-health-physiotherapy/`.
- Owner, in Cloudflare: 301 `http://` → `https://` and `www.` → apex for every path.
- `/diastasis-recti/` (the physiotherapy service page) is crawled but not indexed. It is a different intent from `/what-is-diastasis-recti/`, so keep both. Give `/diastasis-recti/` the Dr. Zalak Shah byline, an answer-first section, and links from `/what-is-diastasis-recti/`, `/postnatal/`, and both city diastasis pages, then request indexing again.
- **Decision gate for the matrix:** on 15 January 2027, export clicks for `/online-consultation/:city/:service`. If the matrix still has fewer than 20 clicks over the 8 weeks after deploy and site-wide impressions have not recovered, set it back to `noindex, follow` (the 20 November commit history has the switch). Keep the hub, country pages, and `/international-consultation/` indexable either way.

### 2. Brand and entity (weeks 1–2)

- Make `/dr-zalak-shah/` and `/dr-charmi-shah/` the pages Google shows for name searches: the homepage should link to each with the full name as anchor text, and each profile's first paragraph should state name, role, city, and registration in one sentence.
- Keep the same name, phone, and city on every listing: Google Business, Practo, Eka Care, JustDial, LinkedIn, Instagram, YouTube. Link each listing back to the matching profile page.
- Ask real patients for Google reviews after visits (a short WhatsApp message with the review link). No incentives and no written-for-them reviews.

### 3. Local India (weeks 2–6): 109 local and 61 near-me queries

- Owner: fix the Ahmedabad Google pin (it currently points to Indapur, Pune). Near-me results are driven by Google Business, not the website.
- Each `/{city}/{service}/` page should carry, in order: an answer-first paragraph that uses the query wording, the named doctor and credentials, where the visit happens (only verified addresses), how to book, real photos of the room or studio, and 5–8 FAQs.
- Valsad: 15 gynecology queries sit at positions 24–29. `/valsad/gynecology/` is the owner page. Link it from `/valsad/`, `/dr-charmi-shah/`, and the homepage location block.
- Ahmedabad Pilates is close (positions 20–27 for "pilates ahmedabad" and its variants). Sarjapur Road already ranks 1–7, but "pilates in bangalore" sits at 74. Add class format, level, and what to bring to `/ahmedabad/pilates-classes/` and `/bangalore/pilates-classes/`, and name Sarjapur Road and Kodathi on the Bangalore page.
- Weekly Google Business posts that link to the matching city service page.

### 4. Online and overseas (weeks 2–8): 168 online queries

- Win the owner pages in the table above. Do not build more overseas city pages.
- Titles and H1s must say what each page is for, so `/online-gynecologist/`, `/online-consultation/`, and the second-opinion page are not read as the same page.
- Each owner page: who the visit suits, what can and cannot be done by video, languages, prescriptions, reports, speed, hours, and fees in the confirmed wording from `quickAccessServices.ts`.
- Country pages for Singapore, the US, the UK, South Africa, Australia, and Canada link to the online owner pages. That is where overseas demand lands.

### 5. Answers and E-E-A-T (weeks 2–12): 81 informational and 72 head-term queries

- Each guide opens with a 40–60 word direct answer, then sections that answer the follow-up questions people ask.
- Byline on every guide: written by, medically reviewed by the correct doctor for the topic, last reviewed date. Set `reviewStatus: "approved"` only after that doctor has read and approved the guide. Target 10 guides a week, P1 and P2 topics first.
- Cite real sources by name where a claim depends on them (ACOG, RCOG, FOGSI, NICE, WHO). No invented statistics.
- Embed the doctor's own Instagram or YouTube clip on the topic where one exists. That is first-hand experience Google can see.
- Internal links: each guide is linked from its service hub, the matching city page, and the doctor profile, and links back to booking.
- Medical topics stay in Dr. Charmi Shah's lane (PCOS, IVF, menopause, endometriosis, pregnancy). Pelvic floor, prenatal and postnatal movement, diastasis, and Pilates stay in Dr. Zalak Shah's lane.

### 6. Authority (ongoing)

- Earn links that exist in the real world: doctor profiles on medical directories, hospital and clinic affiliations the doctors actually hold, interviews, podcasts, local news, alumni pages, physiotherapy and Pilates associations they belong to.
- YouTube descriptions and Instagram link pages point to the matching guide, not only the homepage.
- No paid links, link exchanges, or guest posts on unrelated sites.

### 7. CTR on queries already on page 1 (weeks 1–4)

- 112 queries in the map are already in the top 10 with few clicks. Rewrite the title and meta of their owner page to use the query wording, keeping the doctor's name and WhatsApp number.
- Add the exact question as an H2 with a short answer, and keep the FAQ JSON-LD matched to what is on the page.

## Owner actions (cannot be done from code)

1. Deploy the branch and resubmit sitemaps.
2. Cloudflare 301s for `http://` and `www.`.
3. Fix the Ahmedabad Google Business pin.
4. Register `cta_placement`, `doctor`, and `service` as event-scoped custom dimensions in GA4 Admin, so WhatsApp clicks can be traced to a page and doctor.
5. Doctors review and approve guides, 10 a week.
6. Ask real patients for reviews.
7. Keep directory listings consistent.

## How progress is measured

Every month, re-export Search Console for the 500 queries and count how many are in the top 10 and top 3. Add impressions, clicks, and GA4 `whatsapp_click` by page. A query counts as won when it holds a top-10 position for four weeks.
