# GSC pages export for guide consolidation

The 20 November 2026 consolidation used this rule: any redirect candidate with **10 or more clicks** in a 90-day Pages export moves from redirect to rewrite.

`pages-90d.csv` is the Search Console pages report for `sc-domain:womenshealthduo.com`, 22 August 2026 through 18 November 2026 (WEB, data state `all`). Columns are `url,clicks,impressions,position`. 504 URLs, **40 clicks**, 3,237 impressions.

Checked the same day against `guideConsolidationRedirects.ts`. The only redirect source that appeared was `/pelvic-floor-exercises/` (**0 clicks**, 1 impression). No candidate met the 10-click bar, so none were flipped to rewrite.

Property notes from that pull:

- 34 of the 40 clicks were in India. The United States had 472 impressions and 1 click.
- The homepage is indexed as `https://womenshealthduo.com/` (crawled 20 November 2026; Google canonical matches). Search Console still splits older impressions across the `http://` and `www` URLs, both of which 301 to the HTTPS homepage.
- Sitemaps on the property were valid: `sitemap.xml` (980 indexed), `sitemap-virtual-service-cities.xml` (6,565 indexed), `sitemap-videos.xml` (106 indexed). The virtual city sitemap accounts for almost none of the clicks.
- `/dr-charmi-shah/` showed for the query “charmi shah” at about position 35 (0 clicks). `/dr-zalak-shah/` showed for “dr zalak shah” at about position 3.
