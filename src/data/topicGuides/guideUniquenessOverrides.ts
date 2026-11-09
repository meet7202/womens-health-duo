/**
 * SEO-12 scaffolding: title-specific primaryQuestion + directAnswer for priority guides.
 * Copy is rewritten from existing cluster / FAQ pool text only — no new protocols,
 * timelines, or success rates. Guide `reviewStatus` is set per row in the registry (default pending).
 *
 * Priority set: six SEO-13 FAQ regression guides + Zalak care hubs present in TOPIC_GUIDE_ROWS.
 */
export type GuideUniquenessOverride = {
  primaryQuestion: string;
  /** Short answer shown as the first on-page section body. */
  directAnswer: string;
  /** Optional second paragraph; still derived from existing cluster language. */
  followOn?: string;
  firstSectionHeading?: string;
};

/** Slugs that receive uniqueness scaffolding in this wave. */
export const GUIDE_UNIQUENESS_PRIORITY_SLUGS = [
  // SEO-13 FAQ regression guides
  "what-is-pcos",
  "what-is-preconception-planning",
  "can-i-get-pregnant-with-pcos",
  "when-can-i-exercise-after-delivery",
  "are-kegels-right-for-everyone",
  "how-does-exercise-improve-womens-health",
  // Zalak care hubs (tier-1 parents present in TOPIC_GUIDE_ROWS)
  "womens-health-physiotherapy",
  "prenatal-physiotherapy",
  "postpartum-recovery",
  "bladder-leakage",
  "diastasis-recti",
] as const;

export type GuideUniquenessPrioritySlug = (typeof GUIDE_UNIQUENESS_PRIORITY_SLUGS)[number];

/**
 * Parallel content overrides (not a full medical rewrite).
 * Sourced from `clusterContent` FAQ answers and hub section themes already on the site.
 */
export const GUIDE_UNIQUENESS_OVERRIDES: Readonly<
  Record<GuideUniquenessPrioritySlug, GuideUniquenessOverride>
> = {
  "what-is-pcos": {
    primaryQuestion: "What is PCOS?",
    directAnswer:
      "PCOS (polycystic ovary syndrome) is a hormonal pattern that often features irregular ovulation or menstrual cycles alongside findings such as elevated androgen levels or polycystic-appearing ovaries on ultrasound. Not everyone with PCOS has cysts, and the name can be confusing.",
    followOn:
      "It is not one-size-fits-all: some people notice cycle changes, some androgen-related skin or hair symptoms, and some discover it while evaluating fertility. Education on this page prepares questions for an individualized visit with Dr. Charmi Shah (OB-GYN / IVF).",
    firstSectionHeading: "What is PCOS?",
  },
  "what-is-preconception-planning": {
    primaryQuestion: "What is preconception planning?",
    directAnswer:
      "Preconception planning means reviewing medications, folic acid, vaccines where appropriate, chronic disease control, and genetic or lifestyle risks before pregnancy — so you enter pregnancy with clearer priorities, not a generic wellness checklist.",
    followOn:
      "A fertility- or OB-GYN–led conversation with Dr. Charmi Shah can help organize timing, labs, and when IVF or other pathways belong in the discussion versus watchful waiting.",
    firstSectionHeading: "What is preconception planning?",
  },
  "can-i-get-pregnant-with-pcos": {
    primaryQuestion: "Can I get pregnant with PCOS?",
    directAnswer:
      "Many people with PCOS do conceive. When cycles are irregular, ovulation may be infrequent or absent, so tracking and a fertility-focused visit help clarify timing and options — natural conception, medical support, or further evaluation.",
    followOn:
      "This page is education, not a prediction of your outcome. Dr. Charmi Shah discusses ovulation status and next steps in consultation rather than promising results from a single pattern.",
    firstSectionHeading: "Can I get pregnant with PCOS?",
  },
  "when-can-i-exercise-after-delivery": {
    primaryQuestion: "When can I exercise after delivery?",
    directAnswer:
      "Follow your obstetric clinician's clearance. Gradual walking often starts early, while higher-load training usually waits longer — especially after cesarean birth or complications.",
    followOn:
      "Dr. Zalak Shah (women's health physiotherapy / STOTT Pilates) can help with graded return-to-exercise once you are cleared, including core and pelvic floor coordination, without replacing urgent medical care for fever, heavy bleeding, or chest pain.",
    firstSectionHeading: "When can I exercise after delivery?",
  },
  "are-kegels-right-for-everyone": {
    primaryQuestion: "Are Kegels right for everyone?",
    directAnswer:
      "No. If the pelvic floor is tight or painful, more squeezing can worsen symptoms. Assessment guides whether relaxation, down-training, or strengthening fits your pattern.",
    followOn:
      "Pelvic health is more than Kegels: symptoms can come from underactivity, overactivity, or postpartum change. Online education with Dr. Zalak Shah can teach coordination and when an in-person exam is still needed.",
    firstSectionHeading: "Are Kegels right for everyone?",
  },
  "how-does-exercise-improve-womens-health": {
    primaryQuestion: "How does exercise improve women's health?",
    directAnswer:
      "Regular movement supports mood, bone density, cardiovascular risk, metabolic health, and many pelvic symptoms when progressed safely — not as a one-size prescription.",
    followOn:
      "Women's Health Duo pairs medical context from Dr. Charmi Shah with physiotherapy- and Pilates-led progression from Dr. Zalak Shah when movement is central to your goals.",
    firstSectionHeading: "How does exercise improve women's health?",
  },
  "womens-health-physiotherapy": {
    primaryQuestion: "What is women's health physiotherapy at Women's Health Duo?",
    directAnswer:
      "Women's health physiotherapy here addresses pregnancy and postpartum recovery, pelvic pain, incontinence when medically appropriate, diastasis-oriented rehab, and return to activity — individualized education and exercise with Dr. Zalak Shah, not generic fitness tips.",
    followOn:
      "Video visits excel at coaching and follow-up; some assessments still need local hands-on care, and we say so when that applies. STOTT Pilates may be integrated when clinically appropriate.",
    firstSectionHeading: "What women's health physiotherapy covers here",
  },
  "prenatal-physiotherapy": {
    primaryQuestion: "What is prenatal physiotherapy?",
    directAnswer:
      "Prenatal physiotherapy focuses on graded exercise, pelvic girdle strategies, back care, breathing practice, and preparing for labor demands while pregnancy changes posture, breathing, and pelvic load.",
    followOn:
      "Many aches are common, but some symptoms can signal urgent obstetric problems — your obstetrician should define red flags. Dr. Zalak Shah supports prenatal movement goals online when activity is cleared, and coordinates when medical review is needed.",
    firstSectionHeading: "What prenatal physiotherapy addresses",
  },
  "postpartum-recovery": {
    primaryQuestion: "What does postpartum recovery involve?",
    directAnswer:
      "After birth, sleep debt, hormonal shifts, tissue healing, and new movement demands stack together. Some symptoms settle quickly; others — such as pelvic pain or diastasis — often benefit from graded rehab rather than rushing high-load exercise.",
    followOn:
      "Fever, heavy bleeding, chest pain, calf swelling, or thoughts of self-harm need urgent pathways, not exercise tips alone. Dr. Zalak Shah supports safe return-to-exercise timelines after clearance and collaborates with your OB-GYN when red flags appear.",
    firstSectionHeading: "Postpartum recovery: what this page means",
  },
  "bladder-leakage": {
    primaryQuestion: "What should I know about bladder leakage?",
    directAnswer:
      "Bladder leakage (including stress leakage with cough, sneeze, or lift) often relates to pelvic floor pressure management, swelling, constipation, or other contributors — and the right plan may include training, behavioral strategies, or medical evaluation.",
    followOn:
      "Self-prescribed Kegels are not always appropriate. Dr. Zalak Shah offers pelvic floor–oriented education online; persistent leakage should still be evaluated, and some cases need physician-led care.",
    firstSectionHeading: "Bladder leakage in plain language",
  },
  "diastasis-recti": {
    primaryQuestion: "What is diastasis recti?",
    directAnswer:
      "Diastasis recti is a widening between the rectus abdominis muscles that is common in pregnancy. Many people improve with time and appropriate loading; others need longer guided rehab, and surgery is uncommon and case-specific.",
    followOn:
      "Gentle self-checks can hint at separation, but interpretation is easy to get wrong. Dr. Zalak Shah discusses screening strategies and graded core reloading as part of postpartum recovery education — without guaranteeing a timeline.",
    firstSectionHeading: "What is diastasis recti?",
  },
};

export function guideUniquenessOverrideForSlug(
  slug: string | undefined,
): GuideUniquenessOverride | undefined {
  if (!slug) return undefined;
  if ((GUIDE_UNIQUENESS_PRIORITY_SLUGS as readonly string[]).includes(slug)) {
    return GUIDE_UNIQUENESS_OVERRIDES[slug as GuideUniquenessPrioritySlug];
  }
  return undefined;
}
