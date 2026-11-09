# SEO owner / clinician actions

Outstanding account, clinician, and CDN steps only. Do not put passwords, API keys, or service-account JSON in this repo.

Last updated: 9 November 2026  
Code branch: `seo/remediation-2026-11`  
Related: [`seo-remediation-status.md`](seo-remediation-status.md), [`seo-cloudflare-redirects.md`](seo-cloudflare-redirects.md), [`seo-measurement-plan.md`](seo-measurement-plan.md)

## O1. Confirm Search Console property

- Open [Google Search Console](https://search.google.com/search-console) for Women's Health Duo.
- Confirm Domain vs URL-prefix scope for `womenshealthduo.com` and that intended owners retain access.
- Do not recreate a working property solely to add a meta tag.
- Historical performance export already used in remediation; this step confirms **current** ownership access.

## O2. Submit approved sitemap and inspect coverage

After this branch is deployed:

1. Indexing → Sitemaps: inspect existing submissions; submit `https://womenshealthduo.com/sitemap.xml` only if needed.
2. Review Page indexing reasons; export reasons + example URLs (date + property scope).
3. URL Inspection for: `/`, `/dr-charmi-shah/`, `/dr-zalak-shah/`, one repaired class page (`/prenatal/`), one key service, one Learn article/guide, one retained city page.
4. Request indexing only for a small set of genuinely updated priority URLs. Do **not** use the Google Indexing API for ordinary WHD pages.

## O3. Confirm or configure GA4 without duplication

- **Code (9 Nov 2026):** GTM container `GTM-57NMVQVN` is wired in `index.html` / `site.defaults` (`VITE_GTM_ID` optional override). `whatsapp_click` still pushes to `dataLayer`.
- Owner: confirm GTM publishes the intended GA4 tag; verify Realtime/DebugView for home, a doctor page, booking, and SPA navigation (one event per WhatsApp click — never intake text).
- Do not add a second hard-coded GA Measurement ID alongside this container unless GTM is empty.

## O4. Link Search Console to GA4 (optional)

- With GA4 Editor + verified GSC ownership: Admin → Product links → Search Console Links.
- Link the correct property and Web stream; publish the Search Console report collection if missing.
- Do not delete a valid link because a report view is hidden.

## O5. Confirm Bing Webmaster Tools

- **Owner (9 Nov 2026):** Bing Webmaster is set up. Re-check sitemap + URL Inspection after the next deploy.
- After SEO-40 change-manifest is live, prefer IndexNow for **changed** URLs only — do not resubmit the full sitemap after every build.

## O6. Google search AI settings / optional reports

- In GSC Settings → Search generative AI, record inherited/publication policy; do not reverse a deliberate exclusion.
- If Generative AI performance or Bing AI Performance reports exist, retain actual figures separately. Absence is not an implementation failure.

## O7. Rich results and social previews (post-deploy)

- [Rich Results Test](https://search.google.com/test/rich-results) on representative eligible pages; keep errors and warnings.
- LinkedIn Post Inspector (or equivalent) + one owner-controlled WhatsApp preview of public URLs for title/description/image.
- Previews do not prove indexation or rankings.

## O8. Booking / form verification

- Implementer inventoried WhatsApp enquiry + `/book-consultation/` query seeding (code complete).
- Owner: one coordinated, clearly labeled test through an approved destination; confirm recipient, reply path, and user-facing confirmation.
- Do not send real patient data; opening a WhatsApp draft is not a confirmed appointment.

## O9. Clinical, location, and reputation facts (blocks SEO-15/17/18/42)

Supply verified values only (no invention):

| Need                                                                                     | Status (9 Nov 2026)                                                                                                                |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Shared practice hours                                                                    | **Done in code** — Mon–Sat 9:00 AM–6:00 PM (India); online-first + appointment-based in-person note                                |
| Street addresses for Mumbai, Ahmedabad, Valsad, Bangalore                                | **Still needed** if local schema/maps copy should list facilities                                                                  |
| Dr. Charmi Google Business / reviews URL                                                 | **No URL** (owner). On-page badges restored from prior figures 4.9★ / 41 (as of 2026-11-09); no AggregateRating schema without URL |
| Dr. Zalak review aggregates                                                              | **Done in code** — 5.0★ / 27 + existing Google share URL (as of 2026-11-09)                                                        |
| Topic guide clinical approval                                                            | **Done (9 Nov)** — doctors author all guides; `reviewStatus=approved` with lane attribution                                        |
| Clinical sign-off to lift ovarian-reserve hold on `YE9qPLTptRw` + `ig-c9ppwbmplho`       | **Hold kept** — both platform links still return 200; remove only if a link goes dead                                              |
| Decision on dates/posters if `ig-cr1otdannn4` / `ig-dbtawiyp_m_` should become indexable | SEO-16 currently noindex / no VideoObject                                                                                          |
| Query×page GSC segments for Appendix B priorities                                        | SEO-31 content targeting                                                                                                           |
| Authentic practitioner/clinic directory updates where eligible                           | SEO-42                                                                                                                             |

## O10. Hosting / Cloudflare before and after release

1. Apply redirect rules from [`seo-cloudflare-redirects.md`](seo-cloudflare-redirects.md) (HTTPS apex host + class aliases) through normal authorization; record matching/nonmatching URLs and rollback.
2. After Pages deploy: VERIFY host and class 301s with curl (commands in that doc).
3. Redeploy markdown Worker independently: `npm run deploy:markdown-worker` (SEO-29 Accept `q=0` + cache headers) when Worker changes ship.
4. Purge Cloudflare cache for any previously-404 root assets if needed (see `AGENTS.md`).

## Done when

Each row above has a dated owner note (done / blocked / N/A). Code remediation can ship without waiting for O9 clinical facts; those only unblock the listed content tasks.
