import type { FaqItem } from "./siteFaq";

/** Community page FAQ — also emitted as FAQPage JSON-LD on `/free-womens-health-community`. */
export const COMMUNITY_FAQ: FaqItem[] = [
  {
    question: "Is the Women's Health Duo WhatsApp community free to join?",
    answer:
      "Yes, joining is free. There is no subscription, membership fee, or payment to enter the group. It is a public WhatsApp community for education, updates, and friendly conversation.",
  },
  {
    question: "What do I get in the free women's health community?",
    answer:
      "Members get practical health tips from Dr. Charmi Shah (OB-GYN) and Dr. Zalak Shah (women's health physiotherapist), early notice of workshops and webinars, links to Learn hub videos and articles, reminders about screening and self-care, and conversations with other women dealing with pregnancy, fertility, PCOS, pelvic health, and everyday wellness.",
  },
  {
    question: "What topics are covered in the community?",
    answer:
      "Common themes include pregnancy and postpartum, fertility and IVF awareness, PCOS and hormonal health, menstrual health, menopause, pelvic floor and core recovery, safe exercise and Pilates, nutrition basics, mental wellbeing, and general women's health education. Posts are written for a group and are not clinical advice.",
  },
  {
    question: "Who leads the Women's Health Duo community?",
    answer:
      "The community is hosted by Women's Health Duo: Dr. Charmi Shah (Obstetrician, Gynecologist, IVF specialist) and Dr. Zalak Shah (women's health physiotherapist and STOTT Pilates instructor). Posts draw on their clinical areas, but the group is for learning, not one-to-one treatment.",
  },
  {
    question: "Is this the same as messaging the clinic on WhatsApp?",
    answer:
      "No. The community is a group space for shared tips and updates. To book a teleconsultation, ask about your personal symptoms, or speak privately with the practice, use our Book consultation page or the direct WhatsApp buttons on this site. Those open a private chat with the clinic number, not the public community.",
  },
  {
    question: "Can I get personal medical advice in the WhatsApp group?",
    answer:
      "No. The community cannot replace an individual consultation. Please do not share detailed personal reports or ask for diagnoses in the group. For personal medical advice, prescriptions, or urgent concerns, book a teleconsultation or contact the practice directly. For emergencies, use your local emergency services.",
  },
  {
    question: "Do you share free workshops, classes, or event updates?",
    answer:
      "Yes. Workshop dates, free educational sessions, new Learn hub videos, Instagram and YouTube highlights, and occasional live Q&A announcements are shared in the community so members hear about opportunities early.",
  },
  {
    question: "Can women outside India join the free community?",
    answer:
      "Yes. Women in India and in other countries, including NRIs and diaspora families, are welcome. Members get free women's health resources and updates from an India-trained OB-GYN and women's health physiotherapy team that also sees patients abroad online.",
  },
  {
    question: "How do I join the free WhatsApp women's health community?",
    answer:
      'Tap "Join free on WhatsApp" on this page. You will be taken to WhatsApp to accept the community invite. If the link does not open, check that WhatsApp is installed on your phone or use WhatsApp Web on desktop.',
  },
  {
    question: "What if I need a doctor after joining the community?",
    answer:
      "When you are ready for personal care, book a teleconsultation with Dr. Charmi or Dr. Zalak through our structured booking form, or message the practice on WhatsApp for scheduling. The Learn hub and topic guides on this site have free written and video education you can read or watch at any time.",
  },
];

export const COMMUNITY_BENEFITS = [
  "Free health tips from a registered OB-GYN and women's health physiotherapist",
  "Early alerts for workshops, webinars, and educational events",
  "Highlights from our Learn hub, YouTube, and Instagram in one place",
  "Conversations with women going through similar things",
  "Practical reminders on screening, movement, nutrition, and self-care",
  "No membership fee; join and leave anytime",
] as const;

export const COMMUNITY_TOPICS = [
  "Pregnancy & postpartum",
  "Fertility & IVF awareness",
  "PCOS & hormonal health",
  "Menstrual health",
  "Menopause",
  "Pelvic floor & core recovery",
  "Safe exercise & STOTT Pilates",
  "Nutrition & lifestyle",
  "Mental wellbeing",
  "General women's wellness",
] as const;
