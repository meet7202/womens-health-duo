import type { FaqItem } from "@/data/siteFaq";
import { CONTACT } from "@/config/site.defaults";

/** Homepage FAQ. Same questions must appear in the accordion and in JSON-LD. */
export const HOME_PAGE_FAQ: FaqItem[] = [
  {
    question: "What is Women's Health Duo?",
    answer:
      "Women's Health Duo is a women's health practice led by two sisters. Dr. Charmi Shah is the obstetrician and gynecologist (IVF and laparoscopy). Dr. Zalak Shah (PT) is the women's health physiotherapist and Pilates instructor. The site also has free education on the Learn hub. A visit is a booked consultation, and we do not sell supplements or pills.",
  },
  {
    question: "What does Dr. Charmi Shah do?",
    answer:
      "Dr. Charmi Shah sees women for gynecology, pregnancy care including high-risk pregnancy, PCOS and other hormone concerns, fertility evaluation with IUI and IVF, and laparoscopic surgery when it is the right next step. She sees patients in person in Mumbai, Ahmedabad, and Valsad, and by video worldwide.",
  },
  {
    question: "What does Dr. Zalak Shah do?",
    answer:
      "Dr. Zalak Shah (PT) sees women for women's health physiotherapy, pelvic floor physiotherapy, prenatal classes, postnatal care and diastasis recti, urinary incontinence, and Pilates. She sees patients in person in Bangalore and Ahmedabad, and by video worldwide. This is physiotherapy, alongside medical care from Dr. Charmi Shah or your own doctor.",
  },
  {
    question: "Can I book a video consult if I am not in those cities?",
    answer:
      "Yes. Video is how we see patients outside Mumbai, Ahmedabad, Valsad, and Bangalore. Dr. Charmi Shah's video visits cover gynecology, pregnancy, fertility, and IVF questions. Dr. Zalak Shah's video visits cover physiotherapy, pregnancy and postnatal movement, pelvic floor care, and Pilates. An examination that has to be done in person is arranged in the city where that doctor sees patients.",
  },
  {
    question: "How do I book?",
    answer: `Message WhatsApp ${CONTACT.phoneE164} or email ${CONTACT.email}. Say which doctor you want, your city, and what you need help with. We reply with the next available visit. If you have an emergency, go to the nearest hospital. Do not wait for a reply on WhatsApp.`,
  },
];
