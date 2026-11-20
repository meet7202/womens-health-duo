# GSC pages export for guide consolidation

The 20 November 2026 consolidation used this rule: any redirect candidate with **10 or more clicks** in a 90-day Pages export moves from redirect to rewrite.

`pages-90d.csv` was **not** in the repo on 20 November 2026. The available pages export is `docs/seo-url-migration.csv` (19 June–2 November 2026). In that file, the only consolidation candidate with clicks is `/can-pcos-affect-fertility/` (**1 click**). No candidate met the 10-click bar, so none were flipped to rewrite.

To re-open the gate, export Search Console → Performance → Pages for the last 90 days and save it here as `pages-90d.csv` with columns `url,clicks`. Then re-run the comparison before adding further redirects.
