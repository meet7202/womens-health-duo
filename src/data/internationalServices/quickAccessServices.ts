import { CONTACT } from "../../config/site.defaults";
import { PRACTICE_HOURS_LINE } from "../../config/practiceLocations";
import type { InternationalService } from "./types";

const PHONE = CONTACT.phoneE164;

/** Owner-confirmed on 20 November 2026. Do not turn these into a guarantee. */
export const OVERSEAS_SPEED =
  "Overseas patients are usually seen within 1 to 2 days, depending on availability. A same-day visit is offered when a slot is open.";

export const OVERSEAS_HOURS = `Video visits use the same hours as the clinics: ${PRACTICE_HOURS_LINE}. The time can be moved to suit your time zone when a slot allows.`;

export const OVERSEAS_FEES =
  "Fees are set at competitive rates, and for many patients outside India they are lower than a local specialist visit. The fee and how to pay are confirmed on WhatsApp before the visit.";

export const OVERSEAS_LANGUAGES =
  "Dr. Charmi Shah and Dr. Zalak Shah (PT) both consult in English, Hindi, and Gujarati. A partner or family member can join the video.";

export const OVERSEAS_PRESCRIPTIONS =
  "Dr. Charmi Shah can set out the medicine and its contents when India's telemedicine guidelines and the law where you live allow it. If a prescription from India cannot be dispensed locally, that note is for your own doctor to prescribe. Some medicines cannot be prescribed on video. Dr. Zalak Shah does not prescribe medicines.";

export const OVERSEAS_REPORTS =
  "Send reports before the consultation. They are reviewed during the visit, and questions after the visit can continue on WhatsApp.";

export const OVERSEAS_ANTENATAL_FORMAT =
  "Online antenatal classes are one-to-one with Dr. Zalak Shah (PT). Prenatal and postnatal physiotherapy, pelvic floor care, diastasis recti care, and Pilates can also be done by video. How many sessions, and on which days, is agreed at the first visit around your time zone. An examination that has to be done by hand is arranged with a local clinician.";

/** Country names whose virtual country pages should link these four services. */
export const OVERSEAS_QUICK_ACCESS_COUNTRIES = [
  "Singapore",
  "United States",
  "United Kingdom",
  "South Africa",
  "Australia",
  "Canada",
] as const;

const CHARMI_NOT_FOR = [
  "Medical emergencies — use local emergency services immediately",
  "Replacing your local obstetrician or gynecologist for examination, delivery, or surgery",
  "Prescribing a medicine that India's telemedicine rules or your local law do not allow",
  "A video visit cannot examine you or operate",
] as const;

const ZALAK_NOT_FOR = [
  "Medical emergencies — use local emergency services immediately",
  "An internal pelvic examination, which needs a local clinician when it is required",
  "Obstetric decisions such as induction, delivery, or a C-section — those stay with your obstetrician or Dr. Charmi Shah",
  "Prescribing medicines — physiotherapy visits do not include prescriptions",
] as const;

export const QUICK_ACCESS_INTERNATIONAL_SERVICES: readonly InternationalService[] = [
  {
    slug: "ob-gyn-second-opinion-online",
    doctor: "charmi",
    analyticsService: "online_consult",
    title: "Online OB-GYN second opinion with Dr. Charmi Shah",
    shortTitle: "OB-GYN second opinion online",
    metaDescription: `Online OB-GYN second opinion with Dr. Charmi Shah for patients outside India. Reports reviewed on the visit. WhatsApp ${PHONE}.`,
    intro: [
      "If you have been advised surgery, told a scan is abnormal, or cannot get a gynecologist appointment where you live, Dr. Charmi Shah can give a second opinion by video. She is an obstetrician and gynecologist (IVF and laparoscopy) at Women's Health Duo.",
      "Patients outside India also look for an Indian gynecologist, or an Indian doctor, online. Dr. Charmi Shah consults by video in English, Hindi, and Gujarati.",
      `${OVERSEAS_SPEED} ${OVERSEAS_HOURS}`,
      OVERSEAS_REPORTS,
    ],
    canHelp: [
      "A second view on hysterectomy, fibroid surgery, or another operation you have been advised",
      "An abnormal pregnancy scan, a delivery plan, or C-section advice you want explained",
      "An abnormal Pap smear or ultrasound, or heavy bleeding without a clear plan",
      "A plain explanation, the options, and questions to take to your local doctor",
      "The medicine and its contents, when India's telemedicine guidelines and your local law allow it",
    ],
    notFor: CHARMI_NOT_FOR,
    relatedSlugs: [
      "ivf-second-opinion",
      "endometriosis-second-opinion",
      "gynecology-report-review",
      "high-risk-pregnancy-counselling",
      "hindi-gujarati-doctor-online",
    ],
    faqs: [
      {
        question: "How soon can I be seen from outside India?",
        answer: OVERSEAS_SPEED,
      },
      {
        question: "What hours are the video visits?",
        answer: OVERSEAS_HOURS,
      },
      {
        question: "What are the fees, and how do I pay?",
        answer: OVERSEAS_FEES,
      },
      {
        question: "Can Dr. Charmi Shah prescribe if I live outside India?",
        answer: OVERSEAS_PRESCRIPTIONS,
      },
      {
        question: "How are my reports reviewed?",
        answer: OVERSEAS_REPORTS,
      },
      {
        question: "Can I see an Indian gynecologist online?",
        answer:
          "Yes. Dr. Charmi Shah is an obstetrician and gynecologist in India, and she sees patients outside India by video in English, Hindi, or Gujarati. The visit is a second opinion. Examination, delivery, and surgery stay with a clinician where you live.",
      },
      {
        question: "Which languages can we use?",
        answer: OVERSEAS_LANGUAGES,
      },
      {
        question: "How do I book?",
        answer: `Message WhatsApp ${PHONE} or use the booking page. Say your country, time zone, and what you were told. Send the reports in that chat before the visit.`,
      },
    ],
  },
  {
    slug: "womens-health-physio-online",
    doctor: "zalak",
    analyticsService: "online_consult",
    title: "Online women's health physiotherapy with Dr. Zalak Shah",
    shortTitle: "Women's health physio online",
    metaDescription: `Online women's health physiotherapy with Dr. Zalak Shah (PT) when local care is hard to book. Video worldwide. WhatsApp ${PHONE}.`,
    intro: [
      "If there is no women's health physiotherapist near you, or the wait is long, Dr. Zalak Shah (PT) can start by video. She sees women for pelvic floor care, prenatal and postnatal physiotherapy, diastasis recti, and Pilates.",
      "Patients outside India also look for an Indian physiotherapist online. Dr. Zalak Shah (PT) consults by video in English, Hindi, and Gujarati. She is a physiotherapist, not a gynecologist.",
      `${OVERSEAS_SPEED} ${OVERSEAS_HOURS} ${OVERSEAS_ANTENATAL_FORMAT}`,
    ],
    canHelp: [
      "A first session from history, breathing, posture, and how you move on camera",
      "A guided diastasis self-check and a bladder diary you keep between visits",
      "A home plan you can start while you wait for a local appointment",
      "Pelvic floor, prenatal, postnatal, and Pilates sessions, each one-to-one",
      "A suggestion to see someone locally when an internal examination is needed",
    ],
    notFor: ZALAK_NOT_FOR,
    relatedSlugs: [
      "pelvic-floor-physiotherapy-online",
      "diastasis-recti-consultation-online",
      "postpartum-recovery-online",
      "online-antenatal-classes",
      "hindi-gujarati-doctor-online",
    ],
    faqs: [
      {
        question: "Can I start physiotherapy before a local appointment?",
        answer:
          "Yes. The video visit can start the history, the movement plan, and a home programme while you wait. It does not replace an internal examination when one is needed.",
      },
      {
        question: "Are the sessions one-to-one?",
        answer: OVERSEAS_ANTENATAL_FORMAT,
      },
      {
        question: "How soon can I be seen?",
        answer: OVERSEAS_SPEED,
      },
      {
        question: "What hours fit an overseas time zone?",
        answer: OVERSEAS_HOURS,
      },
      {
        question: "What are the fees?",
        answer: OVERSEAS_FEES,
      },
      {
        question: "Can I see an Indian physiotherapist online?",
        answer:
          "Yes. Dr. Zalak Shah (PT) is a women's health physiotherapist in India, and she sees patients outside India by video in English, Hindi, or Gujarati. She does not provide gynecology care and she does not prescribe medicines.",
      },
      {
        question: "Which languages does Dr. Zalak Shah use?",
        answer: OVERSEAS_LANGUAGES,
      },
      {
        question: "How do I book?",
        answer: `Message WhatsApp ${PHONE} with your country, time zone, and whether this is pelvic floor, pregnancy, postnatal, or diastasis care.`,
      },
    ],
  },
  {
    slug: "online-antenatal-classes",
    doctor: "zalak",
    analyticsService: "prenatal",
    title: "Online antenatal classes with Dr. Zalak Shah",
    shortTitle: "Online antenatal classes",
    metaDescription: `One-to-one online antenatal classes with Dr. Zalak Shah (PT), in English, Hindi, or Gujarati. WhatsApp ${PHONE}.`,
    intro: [
      "Online antenatal classes with Dr. Zalak Shah (PT) are for families outside India who want birth preparation at a time that suits them. This is physiotherapy-led teaching, not an obstetric visit.",
      OVERSEAS_ANTENATAL_FORMAT,
      `${OVERSEAS_SPEED} ${OVERSEAS_HOURS}`,
    ],
    canHelp: [
      "Movement through the trimesters that is comfortable for your pregnancy",
      "Labour positions and breathing to practise with a partner on the call",
      "Pelvic-floor awareness, including when to relax as well as strengthen",
      "What early postnatal recovery usually involves, and when to ask your obstetrician",
      "A one-to-one class in English, Hindi, or Gujarati",
    ],
    notFor: ZALAK_NOT_FOR,
    relatedSlugs: [
      "prenatal-postnatal-physio-online",
      "pregnancy-exercise-planning-online",
      "postpartum-recovery-online",
      "womens-health-physio-online",
      "hindi-gujarati-doctor-online",
    ],
    faqs: [
      {
        question: "Is the class a group or one-to-one?",
        answer: OVERSEAS_ANTENATAL_FORMAT,
      },
      {
        question: "How many sessions are there?",
        answer:
          "There is no fixed course length. The number of sessions and the days are agreed at the first visit, around your time zone.",
      },
      {
        question: "Can my partner join?",
        answer:
          "Yes. A partner, or another family member, can be on the video. Say that when you book so the time is long enough.",
      },
      {
        question: "Is this the same as seeing an obstetrician?",
        answer:
          "No. The class is physiotherapy-led education. Medical decisions stay with your local obstetrician, or with Dr. Charmi Shah if you book a medical consult.",
      },
      {
        question: "How soon can the first class be?",
        answer: OVERSEAS_SPEED,
      },
      {
        question: "Which languages are the classes in?",
        answer: OVERSEAS_LANGUAGES,
      },
      {
        question: "How do I book?",
        answer: `Message WhatsApp ${PHONE} with your country, how many weeks pregnant you are, your time zone, and who will join.`,
      },
    ],
  },
  {
    slug: "hindi-gujarati-doctor-online",
    doctor: "both",
    analyticsService: "online_consult",
    title: "Indian doctor online, in Hindi and Gujarati",
    shortTitle: "Indian doctor online, Hindi & Gujarati",
    metaDescription: `Indian doctor online for gynecology or physiotherapy, in Hindi or Gujarati, with Dr. Charmi Shah and Dr. Zalak Shah (PT). WhatsApp ${PHONE}.`,
    intro: [
      "Families outside India who want an Indian doctor online often need the visit in Hindi or Gujarati. Dr. Charmi Shah and Dr. Zalak Shah (PT) both consult in English, Hindi, and Gujarati.",
      "Dr. Charmi Shah is the obstetrician and gynecologist (IVF and laparoscopy). Dr. Zalak Shah (PT) is the women's health physiotherapist and Pilates instructor. Book the doctor who matches the question: gynecology with Dr. Charmi Shah, physiotherapy with Dr. Zalak Shah.",
      `${OVERSEAS_SPEED} ${OVERSEAS_HOURS} ${OVERSEAS_FEES}`,
    ],
    canHelp: [
      "A gynecology, pregnancy, fertility, or IVF question with Dr. Charmi Shah in Hindi or Gujarati",
      "Pelvic floor, prenatal, postnatal, or Pilates care with Dr. Zalak Shah in Hindi or Gujarati",
      "A family member on the call who is more comfortable in Hindi or Gujarati",
      "The same booking path as every other international visit",
    ],
    notFor: [
      "Using this page for a medical emergency",
      "Asking Dr. Zalak Shah for a prescription or an obstetric decision",
      "Asking Dr. Charmi Shah for pelvic floor physiotherapy or a Pilates class",
      ...CHARMI_NOT_FOR.slice(2),
    ],
    relatedSlugs: [
      "ob-gyn-second-opinion-online",
      "womens-health-physio-online",
      "online-antenatal-classes",
      "ivf-second-opinion",
    ],
    faqs: [
      {
        question: "Can I book an Indian doctor online for gynecology or physiotherapy?",
        answer:
          "Yes. For gynecology, pregnancy, fertility, IVF, or laparoscopy, book Dr. Charmi Shah. For pelvic floor, prenatal, postnatal, or Pilates care, book Dr. Zalak Shah (PT). Both consult in English, Hindi, and Gujarati.",
      },
      {
        question: "Which doctor speaks Hindi and Gujarati?",
        answer: OVERSEAS_LANGUAGES,
      },
      {
        question: "Who do I book for a gynecology question?",
        answer:
          "Dr. Charmi Shah. She covers gynecology, pregnancy, fertility, IVF, and laparoscopy questions. Dr. Zalak Shah does not provide obstetric or gynecology care.",
      },
      {
        question: "Who do I book for physiotherapy?",
        answer:
          "Dr. Zalak Shah (PT). She covers women's health physiotherapy, pelvic floor care, prenatal and postnatal movement, and Pilates. She does not prescribe medicines.",
      },
      {
        question: "Can a prescription be given in Hindi or Gujarati?",
        answer: OVERSEAS_PRESCRIPTIONS,
      },
      {
        question: "How soon can we be seen?",
        answer: `${OVERSEAS_SPEED} ${OVERSEAS_HOURS}`,
      },
      {
        question: "What are the fees?",
        answer: OVERSEAS_FEES,
      },
      {
        question: "How do I book?",
        answer: `Message WhatsApp ${PHONE}. Say which doctor, which language, your country, and your time zone.`,
      },
    ],
  },
];
