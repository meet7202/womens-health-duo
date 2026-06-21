import { ROUTES } from "@/config/routes";
import { EXTERNAL } from "@/config/externalProfiles";

export type DoctorSlug = "charmi" | "zalak";

export type DoctorProfile = {
  slug: DoctorSlug;
  path: string;
  name: string;
  credentials: string;
  jobTitle: string;
  metaTitle: string;
  metaDescription: string;
  /** Primary narrative (aligned with on-site About + Services; not scraped from directories). */
  overview: string[];
  specialties: string[];
  cities: string[];
  /** Third-party links shown on profile only */
  external: { label: string; href: string }[];
};

export const DOCTOR_BY_SLUG: Record<DoctorSlug, DoctorProfile> = {
  charmi: {
    slug: "charmi",
    path: ROUTES.drCharmi,
    name: "Dr. Charmi Shah",
    credentials: "MBBS, MS (Obstetrics & Gynecology); fellowship training in laparoscopy and IVF",
    jobTitle: "Obstetrician & Gynecologist, IVF Specialist & Laparoscopic Surgeon",
    metaTitle: "Dr. Charmi Shah | OB-GYN, IVF & Laparoscopy ,  Women's Health Duo",
    metaDescription:
      "Dr. Charmi Shah: obstetrics, gynecology, IVF, IUI, high-risk pregnancy, and laparoscopic surgery. Online OB-GYN telehealth worldwide; in person in Mumbai and Ahmedabad.",
    overview: [
      "Online OB-GYN and IVF consults are available worldwide, many NRIs and expatriate families book video visits for second opinions, pregnancy planning, fertility pathways, and follow-up without traveling to India for every question. In-person OB-GYN visits are focused in Mumbai and Ahmedabad, coordinate through the practice when clinically appropriate.",
      "Dr. Charmi Shah is an obstetrician and gynecologist with advanced training in laparoscopy and assisted reproduction. She supports patients through high-risk pregnancy, complex gynecologic conditions, fertility evaluation, and minimally invasive surgery when clinically appropriate.",
      "Her practice philosophy combines evidence-based medicine with clear, compassionate communication, whether you are planning a pregnancy, managing PCOS or endometriosis, or exploring IVF or IUI.",
      "Through Women's Health Duo, Dr. Charmi works alongside her sister, Dr. Zalak Shah, so patients can access coordinated OB-GYN and women's health physiotherapy / STOTT Pilates pathways where relevant.",
    ],
    specialties: [
      "Pregnancy & high-risk obstetrics",
      "IVF, IUI & infertility evaluation",
      "Laparoscopic gynecologic surgery",
      "PCOS, endometriosis & menstrual disorders",
      "Routine gynecology & preventive screening",
      "Menopause & midlife wellness",
    ],
    cities: ["Mumbai", "Ahmedabad"],
    external: [
      { label: "LinkedIn", href: EXTERNAL.drCharmi.linkedIn },
      {
        label: "PharmEasy ,  contributing author profile",
        href: EXTERNAL.drCharmi.pharmEasyEditorial,
      },
    ],
  },
  zalak: {
    slug: "zalak",
    path: ROUTES.drZalak,
    name: "Dr. Zalak Shah (PT)",
    credentials: "BPT, MPT; STOTT Pilates Instructor (Mat & Reformer)",
    jobTitle: "Women's Health Physiotherapist & STOTT Pilates Instructor",
    metaTitle: "Dr. Zalak Shah | Women's Health Physio & STOTT Pilates ,  Women's Health Duo",
    metaDescription:
      "Dr. Zalak Shah: women's health physiotherapy, pelvic floor rehab, prenatal and postnatal care, Mat Pilates online, and STOTT Pilates on Mat and Reformer. Online programs worldwide; in person in Bangalore and Ahmedabad.",
    overview: [
      "Online women's health physiotherapy, Mat Pilates online, and STOTT Pilates (Mat & Reformer) are core offerings for global patients, ideal for pregnancy-safe movement through postpartum recovery, pelvic-floor–friendly training, and progressive core work wherever you live. In-person sessions are focused in Bangalore and Ahmedabad, coordinate through the practice when appropriate. Google Business profile links below include maps, hours, and directions.",
      "Dr. Zalak Shah is a physiotherapist specializing in women's health, combining clinical physiotherapy with STOTT Pilates methodology on Mat and Reformer. She supports pelvic floor rehabilitation, prenatal through postpartum recovery, diastasis recti, and musculoskeletal concerns common in women.",
      "Her approach integrates evidence-based exercise progression with hands-on physiotherapy where appropriate, prioritizing safety and collaboration with your medical team.",
      "As part of Women's Health Duo, she partners with Dr. Charmi Shah so patients can move between medical and movement-based care with a shared, patient-centered ethos.",
    ],
    specialties: [
      "Pelvic floor rehabilitation",
      "Prenatal and postnatal physiotherapy (pregnancy through postpartum)",
      "Mat Pilates online (STOTT Mat)",
      "STOTT Pilates (Mat & Reformer)",
      "Diastasis recti & core retraining",
      "Urinary incontinence & prolapse-oriented rehab (with physician clearance)",
      "Women's musculoskeletal physiotherapy",
    ],
    cities: ["Bangalore", "Ahmedabad"],
    external: [
      {
        label: "Google Business Profile ,  Ahmedabad",
        href: EXTERNAL.drZalak.googleBusinessAhmedabad,
      },
      {
        label: "Google Business Profile ,  Bengaluru (Bangalore)",
        href: EXTERNAL.drZalak.googleBusinessBangalore,
      },
      { label: "LinkedIn", href: EXTERNAL.drZalak.linkedIn },
    ],
  },
};
