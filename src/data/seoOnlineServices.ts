/** One landing page per service × virtual city (sitemap + internal links only — not homepage). */
export type SeoOnlineService = {
  slug: string;
  /** H1 / visible title (matches Services section intent). */
  title: string;
  /** Shorter string for document title where the full title is long. */
  shortTitle: string;
  doctor: "charmi" | "zalak";
  /** 1–2 sentences reused on every city page for this service. */
  summary: string;
};

export const SEO_ONLINE_SERVICES: readonly SeoOnlineService[] = [
  {
    slug: "pregnancy-high-risk-obstetrics",
    title: "Pregnancy & high-risk obstetrics",
    shortTitle: "Pregnancy & obstetrics",
    doctor: "charmi",
    summary:
      "Video consults for prenatal care questions, high-risk pregnancy planning, and follow-up with an India-trained obstetrician—ideal when you want continuity with a familiar clinician before or between visits in your home country.",
  },
  {
    slug: "ivf-fertility-treatments",
    title: "IVF & fertility treatments",
    shortTitle: "IVF & fertility",
    doctor: "charmi",
    summary:
      "Online discussion of fertility workup, IVF/IUI pathways, cycle planning questions, and second opinions—coordinated through WhatsApp or email with clear documentation of your history and prior labs/imaging where available.",
  },
  {
    slug: "laparoscopic-surgery",
    title: "Laparoscopic surgery (gynecology)",
    shortTitle: "Laparoscopic gynecology",
    doctor: "charmi",
    summary:
      "Remote consults for fibroids, endometriosis, ovarian cysts, and minimally invasive surgical options when appropriate—education and planning; definitive surgery remains in-person when indicated.",
  },
  {
    slug: "pcos-hormonal-disorders",
    title: "PCOS & hormonal disorders",
    shortTitle: "PCOS & hormones",
    doctor: "charmi",
    summary:
      "Structured online visits for PCOS, irregular cycles, and hormonal symptoms with lifestyle and medical management discussed in a culturally sensitive way for women living abroad.",
  },
  {
    slug: "gynecological-care",
    title: "Gynecological care",
    shortTitle: "Gynecology",
    doctor: "charmi",
    summary:
      "Routine and complex gynecology questions, screening discussions, infections, and chronic pelvic concerns addressed by video with clear guidance on when local urgent or in-person care is needed.",
  },
  {
    slug: "menopause-wellness",
    title: "Menopause & wellness",
    shortTitle: "Menopause care",
    doctor: "charmi",
    summary:
      "Midlife and menopause symptom review, bone health and wellness planning, and shared decision-making for therapies where clinically appropriate—all online for international patients.",
  },
  {
    slug: "pelvic-floor-rehabilitation",
    title: "Pelvic floor rehabilitation",
    shortTitle: "Pelvic floor rehab",
    doctor: "zalak",
    summary:
      "Virtual women's health physiotherapy for pelvic floor concerns, guided exercise, and progression—ideal alongside your local physician for safety and coordinated care.",
  },
  {
    slug: "antenatal-postnatal-care",
    title: "Prenatal and postnatal care",
    shortTitle: "Prenatal & postnatal",
    doctor: "zalak",
    summary:
      "Online movement planning from pregnancy through postpartum, birth preparation, recovery, and diastasis-oriented rehab with a women's health physiotherapist and STOTT Pilates–trained clinician.",
  },
  {
    slug: "stott-pilates",
    title: "STOTT Pilates (Mat & Reformer)",
    shortTitle: "STOTT Pilates",
    doctor: "zalak",
    summary:
      "Mat Pilates online plus remote Reformer-oriented programming and coaching for core, posture, and safe progression—popular with NRIs who want structured women's-health–aware Pilates guidance from India.",
  },
  {
    slug: "musculoskeletal-physiotherapy",
    title: "Musculoskeletal physiotherapy",
    shortTitle: "MSK physio",
    doctor: "zalak",
    summary:
      "Video sessions for back, neck, and joint issues common in women, with exercise prescription and education tailored to your home setup and activity goals.",
  },
  {
    slug: "core-functional-training",
    title: "Core & functional training",
    shortTitle: "Core & functional",
    doctor: "zalak",
    summary:
      "Online core stability and functional strength plans with physiotherapy oversight—useful after pregnancy, surgery (with clearance), or for general women's musculoskeletal health.",
  },
  {
    slug: "womens-wellness-programs",
    title: "Women's wellness programs",
    shortTitle: "Women's wellness",
    doctor: "zalak",
    summary:
      "Holistic online programs blending physiotherapy principles and Pilates-informed movement for sustainable habits and confidence in training.",
  },
] as const;

export function getSeoOnlineServiceBySlug(slug: string | undefined): SeoOnlineService | undefined {
  if (!slug) return undefined;
  return SEO_ONLINE_SERVICES.find((s) => s.slug === slug);
}
