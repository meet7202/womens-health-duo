/**
 * Legacy topic-guide URLs consolidated onto a calendar article, hub, or class landing.
 * Slashless slugs. Imported by route disposition, the client catch-all, and the redirect audit.
 * No `@/` imports (also loaded from Node).
 *
 * GSC gate (20 Nov 2026): `docs/gsc/pages-90d.csv` was not supplied. The 19 Jun–2 Nov 2026
 * pages export in `docs/seo-url-migration.csv` shows no candidate here with 10 or more clicks
 * (`/can-pcos-affect-fertility/` has 1). None were flipped to rewrite.
 */
export const GUIDE_CONSOLIDATION_REDIRECTS: readonly (readonly [string, string])[] = [
  ["exercises-for-pregnancy", "pregnancy-exercises-by-trimester"],
  ["bladder-leakage-after-pregnancy", "why-am-i-leaking-urine-after-childbirth"],
  ["weak-pelvic-floor", "how-do-i-know-if-my-pelvic-floor-is-weak"],
  ["pelvic-floor-exercises", "are-kegels-right-for-everyone"],
  ["how-to-strengthen-pelvic-floor", "are-kegels-right-for-everyone"],
  ["what-is-postpartum-recovery", "how-long-does-postpartum-recovery-take"],
  ["can-physiotherapy-help-after-childbirth", "how-long-does-postpartum-recovery-take"],
  [
    "can-physiotherapy-help-with-bladder-leakage",
    "can-pelvic-floor-therapy-help-with-bladder-leakage",
  ],
  ["painful-intercourse", "can-pelvic-floor-therapy-help-with-painful-intercourse"],
  ["pilates-for-pregnancy", "is-pilates-safe-during-pregnancy"],
  ["prenatal-pilates", "is-pilates-safe-during-pregnancy"],
  ["postnatal-pilates", "pilates-after-pregnancy"],
  ["what-is-pilates", "what-is-stott-pilates"],
  ["pilates-for-beginners", "what-is-stott-pilates"],
  ["can-pcos-affect-fertility", "can-i-get-pregnant-with-pcos"],
  ["back-pain-in-pregnancy", "how-to-relieve-back-pain-during-pregnancy"],
  ["pelvic-pain-in-pregnancy", "how-to-relieve-pelvic-pain-during-pregnancy"],
  ["ivf", "what-is-ivf"],
  ["trying-to-conceive", "pregnancy-planning"],
  ["who-needs-womens-health-physiotherapy", "what-is-womens-health-physiotherapy"],
  ["can-physiotherapy-help-with-back-pain", "womens-health-physiotherapy"],
  ["can-physiotherapy-improve-posture", "womens-health-physiotherapy"],
  ["can-physiotherapy-improve-core-strength", "womens-health-physiotherapy"],
  ["how-does-exercise-improve-womens-health", "womens-health-physiotherapy"],
  ["can-pilates-help-with-back-pain", "pilates"],
  ["can-pilates-improve-posture", "pilates"],
  ["can-pilates-strengthen-the-core", "pilates"],
  ["how-often-should-i-do-pilates", "pilates"],
  ["can-physiotherapy-help-with-pelvic-pain", "pelvic-pain-in-women"],
  ["signs-of-hormonal-imbalance", "what-is-hormonal-imbalance"],
  ["how-do-hormones-affect-womens-health", "what-is-hormonal-imbalance"],
  ["how-does-stress-affect-womens-health", "what-is-hormonal-imbalance"],
  ["how-does-sleep-affect-hormones", "what-is-hormonal-imbalance"],
];

const FROM_TO = new Map(GUIDE_CONSOLIDATION_REDIRECTS);

export function guideConsolidationTargetPath(slug: string | undefined): string | undefined {
  if (!slug) return undefined;
  const bare = slug.replace(/^\/+|\/+$/g, "");
  const to = FROM_TO.get(bare);
  return to ? `/${to}` : undefined;
}
