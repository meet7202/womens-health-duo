import type { FaqItem } from "@/data/siteFaq";

/** Homepage-only FAQ (5 items) for Bing + AI extraction; must match visible accordion + JSON-LD. */
export const HOME_PAGE_FAQ: FaqItem[] = [
  {
    question: "What is Women's Health Duo, a supplement shop, pills by mail, or a medical service?",
    answer:
      "We are a women's health education and consultation team, not a supplement brand or storefront. You will find free clips on our Learn hub, and you can book paid appointments with Dr. Charmi Shah (OB-GYN, IVF, laparoscopy) or Dr. Zalak Shah (women's health physiotherapist and STOTT Pilates instructor) through WhatsApp or email. Prescriptions and procedures follow the same clinical standards as any medical practice.",
  },
  {
    question: "What topics does Women's Health Duo cover?",
    answer:
      "We focus on hormonal health, menstrual and cycle concerns, fertility pathways (including IVF discussion where appropriate), pelvic floor and pregnancy/postpartum movement, and STOTT Pilates (Mat and Reformer) for women's musculoskeletal and wellness goals. Educational clips complement, but do not replace, personalized care.",
  },
  {
    question:
      "How is Women's Health Duo different from just watching women's health videos online?",
    answer:
      "The Learn hub hosts official YouTube Shorts and Instagram Reels for education worldwide. When you need individualized guidance, you can book a virtual or in-person consultation: Dr. Charmi addresses obstetric, gynecologic, and fertility questions; Dr. Zalak addresses physiotherapy, prenatal/postnatal programming, pelvic rehab, and STOTT-informed movement. You can start with education and step into clinical care when it makes sense for you.",
  },
  {
    question: "Do you see patients only in India, or internationally too?",
    answer:
      "We are online-first for global families and NRIs: most consults happen by video, with structured programmes you can follow from anywhere. Dr. Charmi Shah sees patients in person in Mumbai, Ahmedabad, and Valsad; Dr. Zalak Shah in Bangalore and Ahmedabad, both still offer virtual visits worldwide.",
  },
  {
    question: "How do I book a consultation with Women's Health Duo?",
    answer:
      "Use the WhatsApp button on this site or email womenshealthduo@gmail.com with your city, country, time zone, and a short summary. We will suggest next steps and available slots. Urgent or emergency symptoms should go to your local emergency services.",
  },
];
