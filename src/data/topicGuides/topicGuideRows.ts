import { NEW_CALENDAR_GUIDE_ROWS } from "./articles/newGuideRows";
import type { TopicGuideClusterId, TopicGuideRow, TopicGuideTier } from "./types";

function rows(
  tier: TopicGuideTier,
  pairs: [string, TopicGuideClusterId][],
  extras?: Partial<Record<string, Partial<Omit<TopicGuideRow, "slug" | "tier" | "cluster">>>>,
): TopicGuideRow[] {
  return pairs.map(([slug, cluster]) => ({
    slug,
    tier,
    cluster,
    ...(extras?.[slug] ?? {}),
  }));
}

/** Single source of truth for topic guide URLs (stable order in data file). */
export const TOPIC_GUIDE_ROWS: TopicGuideRow[] = [
  ...rows(
    1,
    [
      ["pcos", "pcos"],
      ["irregular-periods", "periods"],
      ["painful-periods", "periods"],
      ["heavy-periods", "periods"],
      ["hormonal-imbalance", "hormones"],
      ["fertility", "fertility"],
      ["pregnancy-planning", "fertility"],
      ["prenatal-physiotherapy", "pregnancy-physio"],
      ["postpartum-recovery", "postpartum"],
      ["pelvic-floor-therapy", "pelvic"],
      ["womens-health-physiotherapy", "physio"],
      ["bladder-leakage", "pelvic"],
      ["diastasis-recti", "postpartum"],
      ["online-gynecologist", "online-gyne"],
    ],
    {
      "womens-health-physiotherapy": {
        primaryConsult: "both",
        related: [
          "what-is-womens-health-physiotherapy",
          "online-womens-health-physiotherapy",
          "what-happens-during-a-physiotherapy-session",
        ],
      },
      "prenatal-physiotherapy": {
        related: [
          "what-is-prenatal-physiotherapy",
          "is-exercise-safe-during-pregnancy",
          "pregnancy-exercises-by-trimester",
          "is-pilates-safe-during-pregnancy",
        ],
      },
      "postpartum-recovery": {
        related: [
          "how-long-does-postpartum-recovery-take",
          "how-to-recover-after-c-section",
          "when-can-i-exercise-after-delivery",
          "postpartum-back-pain",
        ],
      },
      "pelvic-floor-therapy": {
        related: [
          "what-is-the-pelvic-floor",
          "what-is-pelvic-floor-dysfunction",
          "are-kegels-right-for-everyone",
          "pelvic-organ-prolapse",
        ],
      },
      "bladder-leakage": {
        related: [
          "why-do-i-leak-urine-when-i-cough",
          "why-am-i-leaking-urine-after-childbirth",
          "can-pelvic-floor-therapy-help-with-bladder-leakage",
        ],
      },
      "diastasis-recti": {
        related: [
          "what-is-diastasis-recti",
          "how-to-check-for-diastasis-recti",
          "can-diastasis-recti-heal-naturally",
          "how-to-rebuild-core-after-pregnancy",
        ],
      },
      "online-gynecologist": {
        related: [
          "when-should-i-see-a-gynecologist",
          "symptoms-women-should-never-ignore",
          "positive-pregnancy-test-next-steps",
        ],
      },
      "pregnancy-planning": {
        related: [
          "what-is-preconception-planning",
          "folic-acid-before-pregnancy",
          "how-to-track-ovulation",
        ],
      },
      // SEO-13: explicit cluster FAQ ids for hub guides (booking FAQs stay separate).
      pcos: {
        related: [
          "what-is-pcos",
          "symptoms-of-pcos",
          "how-to-manage-pcos-naturally",
          "can-i-get-pregnant-with-pcos",
          "pcos-insulin-resistance",
        ],
        faqIds: [
          "what-is-pcos",
          "symptoms-of-pcos",
          "how-to-manage-pcos-naturally",
          "can-i-get-pregnant-with-pcos",
          "pcos-tests",
          "does-pcos-always-show-up-on-ultrasound",
        ],
      },
      fertility: {
        related: [
          "what-is-ivf",
          "iui-vs-ivf",
          "how-to-track-ovulation",
          "what-is-preconception-planning",
          "amh-test-fertility",
        ],
        faqIds: [
          "when-to-see-a-fertility-specialist",
          "how-to-track-ovulation",
          "what-is-ivf",
          "what-is-preconception-planning",
          "how-to-improve-fertility",
          "how-to-improve-egg-quality",
          "can-stress-affect-fertility",
        ],
      },
      "hormonal-imbalance": {
        related: ["what-is-hormonal-imbalance"],
        faqIds: ["what-is-hormonal-imbalance"],
      },
      "irregular-periods": {
        related: [
          "why-are-my-periods-irregular",
          "what-is-pms",
          "what-is-pmdd",
          "late-period-negative-pregnancy-test",
        ],
        faqIds: [
          "why-are-my-periods-irregular",
          "what-causes-heavy-periods",
          "why-are-my-periods-painful",
          "what-is-pms",
          "what-is-pmdd",
        ],
      },
      "painful-periods": {
        related: [
          "why-are-my-periods-painful",
          "what-causes-heavy-periods",
          "endometriosis-symptoms-diagnosis",
        ],
        faqIds: [
          "why-are-my-periods-painful",
          "what-causes-heavy-periods",
          "why-are-my-periods-irregular",
          "what-is-pms",
          "what-is-pmdd",
        ],
      },
      "heavy-periods": {
        related: ["what-causes-heavy-periods", "why-are-my-periods-irregular", "what-is-pms"],
        faqIds: [
          "what-causes-heavy-periods",
          "why-are-my-periods-irregular",
          "why-are-my-periods-painful",
          "what-is-pms",
          "what-is-pmdd",
        ],
      },
    },
  ),
  ...rows(
    2,
    [
      ["what-is-pcos", "pcos"],
      ["symptoms-of-pcos", "pcos"],
      ["how-to-manage-pcos-naturally", "pcos"],
      ["what-is-hormonal-imbalance", "hormones"],
      ["why-are-my-periods-irregular", "periods"],
      ["why-are-my-periods-painful", "periods"],
      ["what-causes-heavy-periods", "periods"],
      ["what-is-pms", "periods"],
      ["what-is-pmdd", "periods"],
      ["how-to-track-ovulation", "fertility"],
      ["how-to-improve-fertility", "fertility"],
      ["how-to-improve-egg-quality", "fertility"],
      ["what-is-preconception-planning", "fertility"],
      ["what-is-ivf", "fertility"],
      ["when-to-see-a-fertility-specialist", "fertility"],
      ["when-should-i-see-a-gynecologist", "gyn-general"],
      ["can-i-get-pregnant-with-pcos", "pcos"],
      ["can-stress-affect-fertility", "fertility"],
    ],
    {
      "when-should-i-see-a-gynecologist": {
        related: [
          "symptoms-women-should-never-ignore",
          "perimenopause-symptoms",
          "menopause-hrt-questions",
        ],
      },
      // SEO-13: pin FAQ whose id matches the guide slug (booking FAQs remain separate).
      "what-is-pcos": {
        faqIds: [
          "what-is-pcos",
          "symptoms-of-pcos",
          "how-to-manage-pcos-naturally",
          "can-i-get-pregnant-with-pcos",
          "pcos-tests",
          "does-pcos-always-show-up-on-ultrasound",
        ],
      },
      "symptoms-of-pcos": {
        faqIds: [
          "symptoms-of-pcos",
          "what-is-pcos",
          "how-to-manage-pcos-naturally",
          "pcos-tests",
          "can-i-get-pregnant-with-pcos",
          "does-pcos-always-show-up-on-ultrasound",
        ],
      },
      "how-to-manage-pcos-naturally": {
        faqIds: [
          "how-to-manage-pcos-naturally",
          "what-is-pcos",
          "symptoms-of-pcos",
          "pcos-tests",
          "can-i-get-pregnant-with-pcos",
          "is-pcos-curable",
        ],
      },
      "can-i-get-pregnant-with-pcos": {
        faqIds: [
          "can-i-get-pregnant-with-pcos",
          "what-is-pcos",
          "symptoms-of-pcos",
          "how-to-manage-pcos-naturally",
          "pcos-tests",
          "does-pcos-always-show-up-on-ultrasound",
        ],
      },
      "what-is-preconception-planning": {
        faqIds: [
          "what-is-preconception-planning",
          "when-to-see-a-fertility-specialist",
          "how-to-track-ovulation",
          "how-to-improve-fertility",
          "what-is-ivf",
          "how-to-improve-egg-quality",
          "can-stress-affect-fertility",
        ],
      },
      "what-is-ivf": {
        faqIds: [
          "what-is-ivf",
          "when-to-see-a-fertility-specialist",
          "what-is-preconception-planning",
          "how-to-track-ovulation",
          "how-to-improve-fertility",
          "how-to-improve-egg-quality",
          "can-stress-affect-fertility",
        ],
      },
      "how-to-track-ovulation": {
        faqIds: [
          "how-to-track-ovulation",
          "when-to-see-a-fertility-specialist",
          "what-is-preconception-planning",
          "how-to-improve-fertility",
          "what-is-ivf",
          "how-to-improve-egg-quality",
          "can-stress-affect-fertility",
        ],
      },
      "how-to-improve-fertility": {
        faqIds: [
          "how-to-improve-fertility",
          "how-to-track-ovulation",
          "when-to-see-a-fertility-specialist",
          "what-is-preconception-planning",
          "how-to-improve-egg-quality",
          "what-is-ivf",
          "can-stress-affect-fertility",
        ],
      },
      "how-to-improve-egg-quality": {
        faqIds: [
          "how-to-improve-egg-quality",
          "how-to-improve-fertility",
          "what-is-ivf",
          "when-to-see-a-fertility-specialist",
          "what-is-preconception-planning",
          "how-to-track-ovulation",
          "can-stress-affect-fertility",
        ],
      },
      "when-to-see-a-fertility-specialist": {
        faqIds: [
          "when-to-see-a-fertility-specialist",
          "what-is-ivf",
          "what-is-preconception-planning",
          "how-to-track-ovulation",
          "how-to-improve-fertility",
          "how-to-improve-egg-quality",
          "can-stress-affect-fertility",
        ],
      },
      "can-stress-affect-fertility": {
        faqIds: [
          "can-stress-affect-fertility",
          "how-to-improve-fertility",
          "how-to-track-ovulation",
          "when-to-see-a-fertility-specialist",
          "what-is-preconception-planning",
          "what-is-ivf",
          "how-to-improve-egg-quality",
        ],
      },
      "what-is-hormonal-imbalance": {
        faqIds: ["what-is-hormonal-imbalance"],
      },
      "why-are-my-periods-irregular": {
        faqIds: [
          "why-are-my-periods-irregular",
          "what-causes-heavy-periods",
          "why-are-my-periods-painful",
          "what-is-pms",
          "what-is-pmdd",
        ],
      },
      "why-are-my-periods-painful": {
        faqIds: [
          "why-are-my-periods-painful",
          "what-causes-heavy-periods",
          "why-are-my-periods-irregular",
          "what-is-pms",
          "what-is-pmdd",
        ],
      },
      "what-causes-heavy-periods": {
        faqIds: [
          "what-causes-heavy-periods",
          "why-are-my-periods-irregular",
          "why-are-my-periods-painful",
          "what-is-pms",
          "what-is-pmdd",
        ],
      },
      "what-is-pms": { faqIds: ["what-is-pms", "what-is-pmdd", "why-are-my-periods-painful"] },
      "what-is-pmdd": { faqIds: ["what-is-pmdd", "what-is-pms", "why-are-my-periods-painful"] },
    },
  ),
  ...rows(
    3,
    [
      ["what-is-prenatal-physiotherapy", "pregnancy-physio"],
      ["is-exercise-safe-during-pregnancy", "pregnancy-physio"],
      ["breathing-exercises-for-labour", "pregnancy-physio"],
      ["how-to-relieve-back-pain-during-pregnancy", "pregnancy-physio"],
      ["how-to-relieve-pelvic-pain-during-pregnancy", "pregnancy-physio"],
      ["is-pilates-safe-during-pregnancy", "pilates"],
      ["pregnancy-exercises-by-trimester", "pregnancy-physio"],
      ["common-pregnancy-discomforts", "pregnancy-physio"],
      ["how-long-does-postpartum-recovery-take", "postpartum"],
      ["how-to-recover-after-c-section", "postpartum"],
      ["when-can-i-exercise-after-delivery", "postpartum"],
      ["how-to-rebuild-core-after-pregnancy", "postpartum"],
      ["why-am-i-leaking-urine-after-childbirth", "postpartum"],
      ["what-is-diastasis-recti", "postpartum"],
      ["how-to-check-for-diastasis-recti", "postpartum"],
      ["can-diastasis-recti-heal-naturally", "postpartum"],
      ["postpartum-back-pain", "postpartum"],
      ["postpartum-pelvic-pain", "postpartum"],
    ],
    {
      "how-to-recover-after-c-section": { title: "How to recover after a C-section?" },
      "when-can-i-exercise-after-delivery": {
        faqIds: ["when-can-i-exercise-after-delivery"],
      },
    },
  ),
  ...rows(
    4,
    [
      ["what-is-the-pelvic-floor", "pelvic"],
      ["what-is-pelvic-floor-dysfunction", "pelvic"],
      ["why-do-i-leak-urine-when-i-cough", "pelvic"],
      ["frequent-urination-in-women", "pelvic"],
      ["pelvic-organ-prolapse", "pelvic"],
      ["pelvic-pain-in-women", "pelvic"],
      ["are-kegels-right-for-everyone", "pelvic"],
      ["how-do-i-know-if-my-pelvic-floor-is-weak", "pelvic"],
      ["can-pelvic-floor-therapy-help-with-bladder-leakage", "pelvic"],
      ["can-pelvic-floor-therapy-help-with-painful-intercourse", "pelvic"],
    ],
    {
      "are-kegels-right-for-everyone": {
        faqIds: ["are-kegels-right-for-everyone"],
      },
    },
  ),
  ...rows(5, [
    ["what-is-womens-health-physiotherapy", "physio"],
    ["online-womens-health-physiotherapy", "physio"],
    ["what-happens-during-a-physiotherapy-session", "physio"],
  ]),
  ...rows(6, [
    ["what-is-pilates", "pilates"],
    ["what-is-stott-pilates", "pilates"],
    ["pilates-after-pregnancy", "pilates"],
    ["is-online-pilates-effective", "pilates"],
  ]),
  ...rows(7, [["symptoms-women-should-never-ignore", "gyn-general"]]),
  // Calendar URLs added by the 52-article programme. Published and indexable.
  ...NEW_CALENDAR_GUIDE_ROWS,
];
