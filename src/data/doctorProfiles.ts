import { ROUTES } from "../config/routes";
import { EXTERNAL } from "../config/externalProfiles";
import { DOCTOR_REGISTRATION, type DoctorRegistration } from "../config/doctorRegistration";

export type DoctorSlug = "charmi" | "zalak";

export type DoctorProfile = {
  slug: DoctorSlug;
  path: string;
  name: string;
  credentials: string;
  jobTitle: string;
  registration: DoctorRegistration;
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
    registration: DOCTOR_REGISTRATION.charmi,
    metaTitle: "Dr. Charmi Shah | OB-GYN, IVF & Laparoscopy | Women's Health Duo",
    metaDescription:
      "Dr. Charmi Shah: obstetrics, gynecology, IVF, IUI, high-risk pregnancy, and laparoscopic surgery. Online OB-GYN telehealth worldwide; in person in Mumbai, Ahmedabad, and Valsad.",
    overview: [
      "Dr. Charmi Shah is an obstetrician and gynecologist (MBBS, MS Obstetrics & Gynecology) with fellowship training in laparoscopy and IVF and more than 10 years of clinical experience. She sees women in person in Mumbai, Ahmedabad, and Valsad, and by video consultation anywhere in the world.",
      "She cares for women through pregnancy, including high-risk pregnancy; fertility evaluation, IUI, and IVF; laparoscopic surgery for conditions such as fibroids, ovarian cysts, and endometriosis; and everyday gynecology, from PCOS and period problems to screening and menopause.",
      "Online consultations suit NRIs and families abroad who want a second opinion, help planning a pregnancy or fertility treatment, or follow-up with an Indian OB-GYN without travelling for every question. When you need an examination, a scan, or surgery, she tells you so and plans that visit with you.",
      "Dr. Charmi works alongside her sister, Dr. Zalak Shah (PT), at Women's Health Duo, a practice that has treated more than 5,000 patients. When pregnancy, recovery, or pelvic symptoms also need physiotherapy, the two of them coordinate your care.",
    ],
    specialties: [
      "Pregnancy & high-risk obstetrics",
      "IVF, IUI & infertility evaluation",
      "Laparoscopic gynecologic surgery",
      "PCOS, endometriosis & menstrual disorders",
      "Routine gynecology & preventive screening",
      "Menopause & midlife wellness",
    ],
    cities: ["Mumbai", "Ahmedabad", "Valsad"],
    external: [
      { label: "LinkedIn", href: EXTERNAL.drCharmi.linkedIn },
      {
        label: "PharmEasy: contributing author profile",
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
    registration: DOCTOR_REGISTRATION.zalak,
    metaTitle: "Dr. Zalak Shah | Women's Health Physio & STOTT Pilates | Women's Health Duo",
    metaDescription:
      "Dr. Zalak Shah: women's health physiotherapy, pelvic floor rehab, prenatal and postnatal care, Mat Pilates online, and STOTT Pilates on Mat and Reformer. Online programs worldwide; in person in Bangalore and Ahmedabad.",
    overview: [
      "Dr. Zalak Shah (PT) is a women's health physiotherapist (BPT, MPT) and a STOTT Pilates Instructor for Mat and Reformer, with more than 6 years of clinical experience. She sees women in person in Bangalore and Ahmedabad, and online anywhere in the world.",
      "She treats pelvic floor problems such as urine leakage, pelvic pain, and prolapse symptoms (with medical clearance). She also supports women through pregnancy with prenatal physiotherapy and birth preparation, guides postnatal recovery including diastasis recti and core retraining, and treats back, neck, and joint pain common in women.",
      "Online sessions cover physiotherapy, prenatal and postnatal programmes, and Mat Pilates, which suits women abroad or between cities. She uses Pilates within your physiotherapy plan when it fits, and she tells you when you need a hands-on assessment in person.",
      "Dr. Zalak works alongside her sister, Dr. Charmi Shah, an OB-GYN, at Women's Health Duo, a practice that has treated more than 5,000 patients. When symptoms need a medical review, she coordinates with Dr. Charmi or with your own doctor.",
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
        label: "Google reviews (read more)",
        href: EXTERNAL.drZalak.googleReviewsShare,
      },
      {
        label: "Google Business Profile (Ahmedabad)",
        href: EXTERNAL.drZalak.googleBusinessAhmedabad,
      },
      {
        label: "Google Business Profile (Bengaluru)",
        href: EXTERNAL.drZalak.googleBusinessBangalore,
      },
      { label: "LinkedIn", href: EXTERNAL.drZalak.linkedIn },
    ],
  },
};
