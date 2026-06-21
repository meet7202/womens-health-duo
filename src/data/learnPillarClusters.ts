/**
 * Topical authority clusters for `/learn` and cross-links to virtual consultation services.
 * Video hub URLs only exist for topic labels present on at least one `KNOWLEDGE_HUB_VIDEOS` row;
 * use `pillarLearnTopicLinks()` to filter against `learnHubTopicLabels()`.
 */
import type { VirtualConsultationCity } from "@/lib/virtualConsultation";
import {
  VIRTUAL_CONSULTATION_CITIES,
  getVirtualConsultationCityBySlug,
  virtualServiceCityPath,
} from "@/lib/virtualConsultation";
import { learnHubTopicLabels, learnHubFilteredPath } from "@/lib/learnHubUrls";
import { ROUTES } from "@/config/routes";

export type LearnPillarId =
  | "hormonal-health"
  | "menstrual-health"
  | "fertility-ovulation"
  | "pcos"
  | "stott-pilates";

export type LearnPillarCluster = {
  id: LearnPillarId;
  title: string;
  /** Answer-first block for AI extraction + Bing relevance. */
  directAnswer: string;
  /** Short blurb for the “themes” list on Learn. */
  educationBlurb: string;
  bingKeywords: string[];
  /** Exact topic labels from hub videos — `/learn/topic/<slug>` only when label exists site-wide. */
  learnVideoTopicLabels: string[];
  /** `SEO_ONLINE_SERVICES.slug` — example city×service links for consultation intent. */
  relatedServiceSlugs: string[];
  /** Symptom-led angles for future clips / articles. */
  symptomContentIdeas: string[];
  /** Future long-form URLs (not in this SPA today) — see docs/seo-topical-authority-learn-hub.md */
  suggestedArticleSlugs: string[];
  primaryDoctorProfile: typeof ROUTES.drCharmi | typeof ROUTES.drZalak;
};

/**
 * URL path segments under `/online-consultation/...` (same as `virtualCityPathSegment` for these
 * cities — not the internal JSON `slug` like `mumbai-in`).
 */
const INDIA_HUB_PATH_SEGMENT = {
  mumbai: "mumbai",
  ahmedabad: "ahmedabad",
  bangalore: "bengaluru",
} as const;

/** “Bangalore” reads more naturally for many visitors than “Bengaluru” in short UI copy. */
export function friendlyIndiaCityLabel(city: VirtualConsultationCity): string {
  if (city.city === "Bengaluru") return "Bangalore";
  return city.city;
}

/**
 * Which Indian metro we pair with each pillar’s first service link (Mumbai, Ahmedabad, or Bangalore only).
 */
export function pillarConsultationCity(pillar: LearnPillarCluster): VirtualConsultationCity {
  const mumbai = getVirtualConsultationCityBySlug(INDIA_HUB_PATH_SEGMENT.mumbai);
  const ahmedabad = getVirtualConsultationCityBySlug(INDIA_HUB_PATH_SEGMENT.ahmedabad);
  const bangalore = getVirtualConsultationCityBySlug(INDIA_HUB_PATH_SEGMENT.bangalore);
  const fallback = mumbai ?? ahmedabad ?? bangalore ?? VIRTUAL_CONSULTATION_CITIES[0]!;

  switch (pillar.id) {
    case "hormonal-health":
    case "fertility-ovulation":
      return mumbai ?? fallback;
    case "menstrual-health":
    case "pcos":
      return ahmedabad ?? fallback;
    case "stott-pilates":
      return bangalore ?? fallback;
    default:
      return fallback;
  }
}

export const LEARN_PILLAR_CLUSTERS: readonly LearnPillarCluster[] = [
  {
    id: "hormonal-health",
    title: "Hormonal Health",
    directAnswer:
      "Hormonal health on Women's Health Duo means education and consultation about thyroid-related questions, cycle-hormone links, perimenopause, and related symptoms with an OB-GYN—paired with movement guidance when appropriate—not supplement sales.",
    educationBlurb:
      "Short clips and consults that frame hormones in plain language: when labs help, what patterns worry clinicians, and how to prepare for a video visit.",
    bingKeywords: [
      "hormonal imbalance symptoms women",
      "women's hormone consultation online India",
      "perimenopause questions telehealth",
    ],
    learnVideoTopicLabels: ["Patient education", "Pregnancy"],
    relatedServiceSlugs: ["menopause-wellness", "pcos-hormonal-disorders", "gynecological-care"],
    symptomContentIdeas: [
      "Fatigue + irregular cycles — when to test thyroid vs progesterone timing",
      "Hot flashes under 45 — red flags vs perimenopause",
      "Post-pill cycle changes — what usually normalizes first",
    ],
    suggestedArticleSlugs: [
      "hormonal-imbalance-symptoms-women",
      "thyroid-and-periods-guide",
      "perimenopause-first-symptoms",
    ],
    primaryDoctorProfile: ROUTES.drCharmi,
  },
  {
    id: "menstrual-health",
    title: "Menstrual Health",
    directAnswer:
      "Menstrual health content covers heavy or painful periods, fibroids, endometriosis education, and irregular bleeding—always with guidance on urgent local care when bleeding is severe or sudden.",
    educationBlurb:
      "Symptom-led explainers: pain mapping, cycle tracking tips, and when telehealth can triage vs when you need emergency services.",
    bingKeywords: [
      "irregular periods causes women",
      "heavy periods when to see doctor",
      "period pain not normal",
    ],
    learnVideoTopicLabels: ["Patient education", "Labor & delivery", "Pelvic floor"],
    relatedServiceSlugs: [
      "gynecological-care",
      "laparoscopic-surgery",
      "pelvic-floor-rehabilitation",
    ],
    symptomContentIdeas: [
      "Sudden heavy bleeding after missed period — ectopic vs miscarriage vs anovulation",
      "Painful sex + deep period pain — endometriosis patterns",
      "Bleeding between periods on OCP — pill vs pathology",
    ],
    suggestedArticleSlugs: [
      "irregular-periods-causes",
      "heavy-menstrual-bleeding-treatment-options",
      "endometriosis-symptoms-checklist",
    ],
    primaryDoctorProfile: ROUTES.drCharmi,
  },
  {
    id: "fertility-ovulation",
    title: "Fertility & Ovulation",
    directAnswer:
      "Fertility and ovulation education explains timing, evaluation pathways, and IVF/IUI discussion framing—paired with Dr. Charmi Shah's online consults for individualized planning, not generic wellness advice.",
    educationBlurb:
      "Clips on conception timing, what fertility workups often include, and how virtual second opinions work for NRIs.",
    bingKeywords: [
      "fertility signs ovulation",
      "IVF consultation online India",
      "online fertility doctor NRI",
    ],
    learnVideoTopicLabels: ["Fertility", "Patient education", "Pregnancy"],
    relatedServiceSlugs: ["ivf-fertility-treatments", "pregnancy-high-risk-obstetrics"],
    symptomContentIdeas: [
      "No period after stopping birth control — fertility vs PCOS vs stress",
      "Short luteal phase — what it means before self-diagnosing",
      "Recurrent early loss — what to bring to first telehealth visit",
    ],
    suggestedArticleSlugs: [
      "fertility-signs-ovulation-tracking",
      "ivf-timeline-first-consultation",
      "secondary-infertility-when-to-test",
    ],
    primaryDoctorProfile: ROUTES.drCharmi,
  },
  {
    id: "pcos",
    title: "PCOS",
    directAnswer:
      'PCOS is treated as its own cluster because patients search it distinctly: androgen symptoms, cycle length, metabolic links, and fertility overlap. We separate PCOS clips and consults from generic "hormonal" tags for clearer topical authority.',
    educationBlurb:
      "Dedicated PCOS angle: lifestyle, cycles, and when medication discussions belong in consult—not in comments.",
    bingKeywords: [
      "PCOS symptoms women",
      "PCOS diet exercise evidence",
      "PCOS fertility consultation online",
    ],
    learnVideoTopicLabels: ["Patient education", "Fertility"],
    relatedServiceSlugs: [
      "pcos-hormonal-disorders",
      "ivf-fertility-treatments",
      "gynecological-care",
    ],
    symptomContentIdeas: [
      "Acne + chin hair + long cycles — Rotterdam criteria in plain language",
      "PCOS and pregnancy — progesterone / metformin talking points for your clinician",
      "Weight-neutral PCOS care — what we emphasize on consult",
    ],
    suggestedArticleSlugs: [
      "pcos-symptoms-rotterdam-explained",
      "pcos-and-fertility-ovulation-induction-overview",
      "pcos-exercise-stott-pilates-bridge",
    ],
    primaryDoctorProfile: ROUTES.drCharmi,
  },
  {
    id: "stott-pilates",
    title: "STOTT Pilates for Women's Health",
    directAnswer:
      "STOTT Pilates for women's health is Dr. Zalak Shah's lane: Mat and Reformer programming, pelvic-floor-aware progressions, prenatal and postnatal movement, and online Mat sessions—physiotherapy-led, not generic fitness reels.",
    educationBlurb:
      "Movement education that names STOTT explicitly: Mat online, Reformer in studio, and pelvic health integration.",
    bingKeywords: [
      "STOTT Pilates women's health",
      "pelvic floor Pilates online",
      "postpartum STOTT Pilates India",
    ],
    learnVideoTopicLabels: ["STOTT Pilates", "Pilates", "Pelvic floor", "Pregnancy", "Exercise"],
    relatedServiceSlugs: ["stott-pilates", "mat-pilates-online", "pelvic-floor-rehabilitation"],
    symptomContentIdeas: [
      "Low back pain in early pregnancy — safe modification ladder",
      "Diastasis check — when physio vs when surgeon",
      "Reformer footwork — pelvic floor breath coordination",
    ],
    suggestedArticleSlugs: [
      "stott-pilates-womens-health-pillar",
      "stott-pilates-pcos",
      "stott-pilates-period-pain",
      "stott-pilates-pelvic-floor-recovery",
      "stott-pilates-after-pregnancy",
      "stott-pilates-hormonal-balance",
    ],
    primaryDoctorProfile: ROUTES.drZalak,
  },
] as const;

export type PillarLearnTopicLink = { label: string; path: string };

/** Topic filter links that exist in the merged hub video list for this pillar. */
export function pillarLearnTopicLinks(pillar: LearnPillarCluster): PillarLearnTopicLink[] {
  const available = new Set(learnHubTopicLabels());
  return pillar.learnVideoTopicLabels
    .filter((label) => available.has(label))
    .map((label) => ({ label, path: learnHubFilteredPath({ doctor: "all", topic: label }) }));
}

export function pillarExampleServicePath(
  pillar: LearnPillarCluster,
  city: VirtualConsultationCity = pillarConsultationCity(pillar),
): string | null {
  const slug = pillar.relatedServiceSlugs[0];
  if (!slug) return null;
  return virtualServiceCityPath(city, slug);
}

export function learnTopicFilterHref(label: string): string {
  return learnHubFilteredPath({ doctor: "all", topic: label });
}
