import { CONTACT } from "../../config/site.defaults";

/**
 * SEO-12 scaffolding: title-specific primaryQuestion + directAnswer for priority guides.
 * Copy is rewritten from existing cluster / FAQ pool text only: no new protocols,
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
  "pelvic-floor-therapy",
] as const;

/**
 * Search snippet overrides (title / meta) for guides whose generated text repeats the page
 * title ("Title. blurb") or whose query wording is missing from the title. Keep under the
 * `formatDocumentTitle` and `capMetaDescription` limits; `audit:seo-titles` and
 * `audit:seo-descriptions` enforce them after build.
 */
export const GUIDE_SEARCH_SNIPPET_OVERRIDES: Readonly<
  Record<string, { seoTitle?: string; metaDescription?: string }>
> = {
  "womens-health-physiotherapy": {
    seoTitle: "Women's Health Physiotherapist (PT)",
    metaDescription: `Women's health physiotherapy with Dr. Zalak Shah (PT) for pelvic floor, prenatal and postnatal care, diastasis recti. Book via WhatsApp ${CONTACT.phoneE164}.`,
  },
  "pelvic-floor-therapy": {
    seoTitle: "Pelvic Floor Physiotherapy Explained",
    metaDescription: `Pelvic floor physiotherapy with Dr. Zalak Shah (PT): what it can help with, and when an in-person exam is needed. Book via WhatsApp ${CONTACT.phoneE164}.`,
  },
  "bladder-leakage": {
    seoTitle: "Bladder leakage physio: Dr. Zalak",
    metaDescription: `Bladder leakage and stress incontinence rehab with Dr. Zalak Shah (PT). Online pelvic floor physio; book via WhatsApp ${CONTACT.phoneE164}.`,
  },
  "diastasis-recti": {
    seoTitle: "Diastasis recti physio: Dr. Zalak",
    metaDescription: `Diastasis recti physiotherapy with Dr. Zalak Shah (PT): assessment, graded core rehab, online or in Bengaluru and Ahmedabad. Book via WhatsApp ${CONTACT.phoneE164}.`,
  },
  "prenatal-physiotherapy": {
    seoTitle: "Prenatal physio with Dr. Zalak Shah",
    metaDescription: `Prenatal physiotherapy with Dr. Zalak Shah (PT): pelvic girdle pain, pregnancy-safe exercise, birth prep. Book via WhatsApp ${CONTACT.phoneE164}.`,
  },
  "postpartum-recovery": {
    seoTitle: "Postpartum recovery physio: Dr. Zalak",
    metaDescription: `Postpartum recovery physiotherapy with Dr. Zalak Shah (PT): core, pelvic floor, return to exercise. Book via WhatsApp ${CONTACT.phoneE164}.`,
  },
};

export function guideSearchSnippetOverrideForSlug(
  slug: string | undefined,
): { seoTitle?: string; metaDescription?: string } | undefined {
  if (!slug) return undefined;
  return GUIDE_SEARCH_SNIPPET_OVERRIDES[slug];
}

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
      "Preconception planning means reviewing medications, folic acid, vaccines where appropriate, chronic disease control, and genetic or lifestyle risks before pregnancy. The aim is to start pregnancy knowing your own priorities, rather than working from a generic wellness checklist.",
    followOn:
      "A fertility- or OB-GYN–led conversation with Dr. Charmi Shah can help organize timing, labs, and when IVF or other pathways belong in the discussion versus watchful waiting.",
    firstSectionHeading: "What is preconception planning?",
  },
  "can-i-get-pregnant-with-pcos": {
    primaryQuestion: "Can I get pregnant with PCOS?",
    directAnswer:
      "Many people with PCOS do conceive. When cycles are irregular, ovulation may be infrequent or absent, so tracking and a fertility-focused visit help clarify timing and options: natural conception, medical support, or further evaluation.",
    followOn:
      "This page is education, not a prediction of your outcome. Dr. Charmi Shah discusses ovulation status and next steps in consultation rather than promising results from a single pattern.",
    firstSectionHeading: "Can I get pregnant with PCOS?",
  },
  "when-can-i-exercise-after-delivery": {
    primaryQuestion: "When can I exercise after delivery?",
    directAnswer:
      "Follow your obstetric clinician's clearance. Gradual walking often starts early, while higher-load training usually waits longer, especially after cesarean birth or complications.",
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
      "Regular movement supports mood, bone density, cardiovascular risk, metabolic health, and many pelvic symptoms when progressed safely. The right amount and type differ from person to person.",
    followOn:
      "Women's Health Duo pairs medical context from Dr. Charmi Shah with physiotherapy- and Pilates-led progression from Dr. Zalak Shah when movement is central to your goals.",
    firstSectionHeading: "How does exercise improve women's health?",
  },
  "womens-health-physiotherapy": {
    primaryQuestion: "What is women's health physiotherapy at Women's Health Duo?",
    directAnswer:
      "Women's health physiotherapy here addresses pregnancy and postpartum recovery, pelvic pain, incontinence when medically appropriate, diastasis-oriented rehab, and return to activity. Dr. Zalak Shah plans education and exercise around your symptoms and goals rather than handing out generic fitness tips.",
    followOn:
      "Video visits excel at coaching and follow-up; some assessments still need local hands-on care, and we say so when that applies. STOTT Pilates may be integrated when clinically appropriate.",
    firstSectionHeading: "What women's health physiotherapy covers here",
  },
  "prenatal-physiotherapy": {
    primaryQuestion: "What is prenatal physiotherapy?",
    directAnswer:
      "Prenatal physiotherapy focuses on graded exercise, pelvic girdle strategies, back care, breathing practice, and preparing for labor demands while pregnancy changes posture, breathing, and pelvic load.",
    followOn:
      "Many aches are common, but some symptoms can signal urgent obstetric problems, and your obstetrician should define your red flags. Dr. Zalak Shah supports prenatal movement goals online when activity is cleared, and coordinates when medical review is needed.",
    firstSectionHeading: "What prenatal physiotherapy addresses",
  },
  "postpartum-recovery": {
    primaryQuestion: "What does postpartum recovery involve?",
    directAnswer:
      "After birth, sleep debt, hormonal shifts, tissue healing, and new movement demands stack together. Some symptoms settle quickly. Others, such as pelvic pain or diastasis, often benefit from graded rehab rather than rushing high-load exercise.",
    followOn:
      "Fever, heavy bleeding, chest pain, calf swelling, or thoughts of self-harm need urgent pathways, not exercise tips alone. Dr. Zalak Shah supports safe return-to-exercise timelines after clearance and collaborates with your OB-GYN when red flags appear.",
    firstSectionHeading: "Postpartum recovery: what this page means",
  },
  "bladder-leakage": {
    primaryQuestion: "What should I know about bladder leakage?",
    directAnswer:
      "Bladder leakage with a cough, sneeze, laugh or lift is often stress incontinence: pressure rises faster than the pelvic floor and urethra can hold. The plan may include assessment-led training, bladder habits, constipation care, or a medical review when infection, blood in urine, or sudden change is present.",
    followOn:
      "Do not start random Kegel videos before someone checks whether your floor is weak, tense, or poorly timed. Dr. Zalak Shah (PT) offers online pelvic floor physiotherapy through Women's Health Duo and in-person visits in Bangalore and Ahmedabad. Book via WhatsApp or the Book consultation form when you want a named clinician, not a generic tip sheet.",
    firstSectionHeading: "Bladder leakage in plain language",
  },
  "diastasis-recti": {
    primaryQuestion: "How does physiotherapy help diastasis recti?",
    directAnswer:
      "Physiotherapy for diastasis recti is an assessment and rehab plan, not a definition page. A women's health physiotherapist checks gap width and depth, how the midline behaves with breathing, lifting and daily movement, and whether it domes under load, then builds breath, pressure control, deep-core and pelvic-floor coordination, and graded loading.",
    followOn:
      "This page is for booking that rehab path with Dr. Zalak Shah (PT) online worldwide or in person in Bengaluru and Ahmedabad. For what the gap is and when a lump needs urgent care, use What Is Diastasis Recti. Many people improve with guided rehab; no timeline is guaranteed, and hernia signs or symptoms that do not settle may need a surgical opinion.",
    firstSectionHeading: "How physiotherapy helps diastasis recti",
  },
  "pelvic-floor-therapy": {
    primaryQuestion: "What is pelvic floor therapy?",
    directAnswer:
      "Pelvic floor therapy is physiotherapy for the muscles that support the bladder, bowel, and uterus, and that affect sexual comfort and core stability. It can address leakage, urgency, or pelvic pain once an assessment shows whether the floor is too weak, too tense, or not coordinating well.",
    followOn:
      "Dr. Zalak Shah (PT) provides pelvic floor physiotherapy education and exercise progression online worldwide and in person in Bangalore and Ahmedabad. Some conditions still need an in-person exam or a urogynecology visit, and this page does not replace that assessment.",
    firstSectionHeading: "What pelvic floor therapy can help with",
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
