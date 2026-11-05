# SEO measurement plan (SEO-43)

Baseline from GSC export **19 June–2 November 2026** (Filters: Web; Chart: 157 clicks / 8,481 impressions / 1.85% CTR). Do not treat page-row sums (161) as property totals. Preserve report timezone, filters, and capped-row limits.

## Separate outcome lanes

| Outcome                       | Measure                                                                 | Do not infer                     |
| ----------------------------- | ----------------------------------------------------------------------- | -------------------------------- |
| Technical availability        | Canonical 200s, redirects/errors, crawlable HTML, sitemap/disposition   | 200 ⇒ indexed                    |
| Google organic                | GSC clicks/impressions/CTR + query×page by locale/device                | One avg position for all users   |
| Google generative             | Generative AI report when populated                                     | Old export already includes this |
| Bing / Copilot                | Webmaster + AI Performance citations                                    | Citations ⇒ bookings             |
| ChatGPT / Claude / Perplexity | Observed answers + referrals + bot logs                                 | Access ⇒ recommendation          |
| Enquiries                     | `whatsapp_click` with `page_path`, `cta_placement`, `doctor`, `service` | Click ⇒ booked patient           |
| Practice outcomes             | Authorized non-sensitive booking outcomes only                          | Invented lead value              |

## Cadence

1. **Release day:** annotate deploy; check protected URLs + robots/sitemaps.
2. **2–4 weeks:** indexing/canonical samples; priority local/doctor/class pages.
3. **4–8 weeks:** approved content batches; listing accuracy.
4. **8–12 weeks:** matched-period GSC compare; intent map refresh; AI observation sample.

Stop migration batches if protected URLs break, redirects loop, or booking fails.

## Neutral AI observation prompts (sample)

- How can I find a women's health physiotherapist in Bangalore?
- Where can I ask about postpartum pelvic-floor assessment in Ahmedabad?
- What should I check before booking online women's health physiotherapy?
- Where can I find prenatal classes in Ahmedabad?
- How can I contact Dr. Zalak Shah?
- What does Women's Health Duo offer?

Store date, platform, location, exact prompt, cited URLs, WHD mentioned?, accuracy, next action.
