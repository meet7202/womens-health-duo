import type { InternationalDoctorHub } from "./types";

export const INTERNATIONAL_CONSULTATION_BASE = "/international-consultation";

export const INTERNATIONAL_HUB = {
  path: INTERNATIONAL_CONSULTATION_BASE,
  documentTitlePrimary: "International women's health consultation",
  h1: "International consultation & second opinion",
  metaDescription:
    "International online women's health services with Dr. Charmi Shah (OB-GYN, IVF) and Dr. Zalak Shah (physio & STOTT Pilates) — fertility second opinions, pelvic health, and video consults worldwide via WhatsApp.",
  intro: [
    "Women's Health Duo offers international video consultations for patients outside India — NRIs, expats, and families comparing care between countries. Choose obstetric, gynecologic, and fertility services with Dr. Charmi Shah, or women's health physiotherapy and Pilates with Dr. Zalak Shah.",
    "All bookings start on WhatsApp or through our structured Book consultation flow with telemedicine consent. This is not for emergencies — use local emergency services for urgent symptoms.",
  ],
} as const;

export const INTERNATIONAL_DOCTOR_HUBS: readonly InternationalDoctorHub[] = [
  {
    doctor: "charmi",
    pathSegment: "dr-charmi",
    documentTitlePrimary: "International OB-GYN & fertility",
    h1: "International OB-GYN, IVF & second opinion",
    metaDescription:
      "International teleconsultation with Dr. Charmi Shah — IVF second opinion, fertility planning, high-risk pregnancy counselling, endometriosis, PCOS, and gynecology report review for patients worldwide.",
    intro: [
      "Dr. Charmi Shah is an obstetrician, gynecologist, IVF specialist, and laparoscopic surgeon practising in Mumbai, Ahmedabad, and Valsad, with virtual care for international patients.",
      "Browse specialist services below or message on WhatsApp with your country, time zone, and main concern.",
    ],
  },
  {
    doctor: "zalak",
    pathSegment: "dr-zalak",
    documentTitlePrimary: "International women's health physio",
    h1: "International women's health physiotherapy & Pilates",
    metaDescription:
      "International online physiotherapy and STOTT Pilates with Dr. Zalak Shah — pelvic floor, prenatal/postnatal rehab, postpartum recovery, and pregnancy-safe exercise for clients worldwide.",
    intro: [
      "Dr. Zalak Shah is a women's health physiotherapist and STOTT Pilates instructor based in Bangalore and Ahmedabad, offering video consults internationally.",
      "Pair pelvic rehab with Dr. Charmi's medical care when needed — both sisters consult through Women's Health Duo.",
    ],
  },
];

export const INTERNATIONAL_HUB_FAQS = [
  {
    question: "Who are international consultations for?",
    answer:
      "NRIs, expats, and anyone abroad seeking India-trained women's health specialists — for second opinions, fertility planning, pelvic physio, or postpartum rehab — without replacing local emergency care.",
  },
  {
    question: "How do I book an international consult?",
    answer:
      "Tap WhatsApp on any service page or complete Book consultation on our website for intake and telemedicine consent, then continue in chat with your records.",
  },
  {
    question: "Which doctor should I choose?",
    answer:
      "Dr. Charmi for OB-GYN, IVF, fertility, pregnancy risk, and gynecology reports. Dr. Zalak for pelvic floor physio, prenatal/postnatal rehab, Pilates, and postpartum recovery.",
  },
  {
    question: "Can both sisters be involved in my care?",
    answer:
      "Yes. Many patients combine medical consults with physiotherapy — mention both goals when you message on WhatsApp.",
  },
  {
    question: "Is this the same as the virtual city pages?",
    answer:
      "City pages highlight SEO for specific locations. This hub lists international service offerings directly — both lead to the same WhatsApp booking flow.",
  },
  {
    question: "What about emergencies?",
    answer:
      "Teleconsultation is not for emergencies. Call local emergency services for severe pain, heavy bleeding, chest pain, or thoughts of self-harm.",
  },
] as const;
