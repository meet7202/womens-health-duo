# SEO launch / post-launch checklist

Branch: `seo/remediation-2026-11`  
Evidence date: 9 November 2026  
Canonical origin: `https://womenshealthduo.com`

Status labels from the launch skill: `done` | `fixed` | `needs you` | `broken` | `check` | `not applicable` | `skipped`.

**Local vs production:** `fixed` here means code changed and local audits passed. Deployed behavior is only marked verified after SEO-38 / owner production checks. Sampled live URL count for this closeout: **0** (production crawl pending; see [`seo-production-crawl.csv`](seo-production-crawl.csv)).

Related ledger: [`seo-remediation-status.md`](seo-remediation-status.md).

## Launch-day checks (L01–L10)

| ID  | Check                              | Status                                                          | Evidence / notes                                                                                                                                                          | Related tasks                  |
| --- | ---------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| L01 | Search Console                     | done for supplied historical data; current access **needs you** | Performance export 19 Jun–2 Nov 2026 used for SEO-00 / Appendix A. Confirm property scope and ownership in account (O1).                                                  | SEO-00, SEO-31, SEO-43         |
| L02 | GA4 or existing measurement setup  | fixed (local); deploy **check**                                 | GTM `GTM-57NMVQVN` in `index.html`; `whatsapp_click` → `dataLayer` (SEO-37). Owner confirms GA4 tag inside GTM + Realtime after deploy (O3). Bing Webmaster: owner says set up (O5). | SEO-37, SEO-43                 |
| L03 | Accidental noindex                 | fixed (local); deploy **check**                                 | Intentional aliases / incomplete media use `noindex`; unknown routes no longer inherit homepage meta; `@@PAGE_ROBOTS@@` + `SeoHead.robots` (SEO-02). Verify live headers. | SEO-02, SEO-30, SEO-38         |
| L04 | robots.txt and search access       | fixed (local); deploy **check**                                 | Origin robots Allow search/retrieval bots; training bots stay closed; Content-Signal `ai-train=no` (SEO-39). Compare edge response after deploy.                          | SEO-39                         |
| L05 | Sitemap correctness and submission | fixed (local); account submission **needs you**                 | Disposition separates shells vs sitemap; `<lastmod>` omitted until verified revisions (SEO-02/09). Owner submits/inspects `sitemap.xml` after release (O2).               | SEO-02, SEO-09, SEO-31, SEO-38 |
| L06 | Preferred host and redirects       | check                                                           | Cloudflare host/class 301 mappings prepared in [`seo-cloudflare-redirects.md`](seo-cloudflare-redirects.md). Production VERIFY pending (SEO-07).                          | SEO-07, SEO-38                 |
| L07 | Unique useful titles/descriptions  | fixed (local)                                                   | Class routes, Learn filter descriptions, Bangalore physio-first title, virtual “Online advice” (SEO-03–05). Matrix long-tail dupes remain SEO-11 post-deploy.             | SEO-03, SEO-04, SEO-05         |
| L08 | Bing Webmaster Tools               | needs you                                                       | Confirm/import property; inspect sitemap and representative URLs (O5). Do not bulk IndexNow unchanged URLs.                                                               | SEO-31, SEO-39, SEO-40         |
| L09 | Product Hunt                       | not applicable                                                  | Clinical/physiotherapy service site, not a B2B software launch.                                                                                                           | SEO-42 (authority)             |
| L10 | Optional scorebadge footer link    | skipped                                                         | Not requested; not an SEO prerequisite.                                                                                                                                   | None                           |

## Week-one checks (W01–W10)

| ID  | Check                              | Status                                      | Evidence / notes                                                                                                                                                 | Related tasks                  |
| --- | ---------------------------------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| W01 | Meaningful initial HTML            | fixed (local); current deployment **check** | Priority prerender (`renderToString` + `StaticRouter`, 43 templates) + unclipped shells (SEO-10). Revalidate live deep links after deploy.                       | SEO-10, SEO-30, SEO-38         |
| W02 | Actual indexing coverage           | needs you                                   | Performance export is not Page indexing. Obtain coverage reasons + URL Inspection samples (O2).                                                                  | SEO-31, SEO-38, SEO-43         |
| W03 | Optional Clarity/session recording | skipped pending explicit owner decision     | Do not add automatically. Healthcare privacy / consent required before any session recording.                                                                    | SEO-37 (existing analytics)    |
| W04 | Structured data                    | fixed (local)                               | Removed synthetic AggregateRating/5-star; VideoObject gated; SocialMediaPosting removed; specialty enums (SEO-08/19/20). Rich-results tool still O7 post-deploy. | SEO-08, SEO-19, SEO-20, SEO-30 |
| W05 | Social previews                    | fixed (local); image response **check**     | Per-route OG type/image/alt in shells + SeoHead; watch posters (SEO-21/22). Owner preview check after deploy (O7).                                               | SEO-21, SEO-22                 |
| W06 | GSC and GA4 link                   | needs you                                   | Inspect/create product link in accounts if desired (O4).                                                                                                         | SEO-31, SEO-43                 |
| W07 | Errors and broken links            | fixed (local); deploy **check**             | Distinct `404.html` noindex; alias meta-refresh + edge 301 prep; search/hash-safe `appRouterTo` (SEO-07).                                                        | SEO-07, SEO-30, SEO-38         |
| W08 | Forms and booking journey          | fixed (local); owner E2E **check**          | Booking query seeding + WhatsApp CTAs inventoried (SEO-23/27/37). Owner runs one labeled test without patient data (O8).                                         | SEO-23, SEO-27, SEO-37         |
| W09 | G2/Capterra                        | not applicable                              | Not a software review marketplace. Use clinical/local authority work instead (SEO-42).                                                                           | SEO-42                         |
| W10 | Optional repeat scorebadge audit   | skipped                                     | Use repository audits and field evidence only.                                                                                                                   | None                           |

## Sample plan for SEO-38 (after deploy)

Include homepage, both doctor profiles, `/prenatal/` `/postnatal/` `/pilates/` + nested aliases, booking, online consultation, Learn hub + one filter + one guide + one watch + one image/carousel, one India city, one virtual country/city, one international service, plus a separate redirect/error list. Record results in [`seo-production-crawl.csv`](seo-production-crawl.csv) and [`seo-browser-coverage.csv`](seo-browser-coverage.csv).
