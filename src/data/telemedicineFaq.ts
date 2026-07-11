import type { FaqItem } from "./siteFaq";

/** Telemedicine-specific FAQ — merged into SITE_FAQ on /faq page. */
export const TELEMEDICINE_FAQ: FaqItem[] = [
  {
    question: "Is teleconsultation legal in India?",
    answer:
      "Yes. Registered medical practitioners in India may provide teleconsultation under the Telemedicine Practice Guidelines issued by the Board of Governors in supersession of the Medical Council of India (March 2020), when clinically appropriate. Women's Health Duo follows these guidelines for booked video and audio consults.",
  },
  {
    question: "Will I receive a prescription after teleconsultation?",
    answer:
      "If clinically appropriate and permitted under applicable law, a registered medical practitioner may issue a digitally signed prescription after a proper teleconsultation. Prescriptions are not guaranteed for every visit. Physiotherapy consults do not include medication prescribing unless coordinated with your physician.",
  },
  {
    question: "Can antibiotics be prescribed via teleconsultation?",
    answer:
      "Only when a registered doctor determines it is clinically appropriate after reviewing your history and symptoms, and when permitted under Indian telemedicine rules. Many infections require examination or tests first. Your doctor may ask you to visit in person before prescribing.",
  },
  {
    question: "Can controlled medicines be prescribed online?",
    answer:
      "Schedule X and other controlled substances have strict prescribing rules. In most cases they cannot be initiated via teleconsultation alone. Your clinician will explain what is legally permitted for your situation.",
  },
  {
    question: "What if the doctor recommends a physical examination?",
    answer:
      "You should follow that advice. Teleconsultation cannot replace examination, procedures, or emergency care when indicated. We help coordinate in-person visits in Mumbai, Ahmedabad, Valsad, or Bangalore when clinically appropriate, or advise local care where you live.",
  },
  {
    question: "Can I share lab reports and imaging before my consult?",
    answer:
      "Yes. After you book via the form, attach PDFs or photos in the WhatsApp chat (or email the practice) before your appointment. Keep file sizes practical where possible.",
  },
  {
    question: "Can I get a follow-up teleconsultation?",
    answer:
      "Yes, when you are seeing the same doctor for the same condition within a reasonable interval (typically within six months). First consultations apply for new patients, new conditions, or when more than six months have passed since your last visit with that doctor for that concern.",
  },
  {
    question: "How is my health data stored?",
    answer:
      "Consultation details shared with the practice are handled with standard medical confidentiality. Records are maintained by the clinicians and their clinics, not published on this public website. See our Privacy policy and Telemedicine policy for retention, access, and deletion requests.",
  },
];
