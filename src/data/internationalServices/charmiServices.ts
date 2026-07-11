import type { InternationalService } from "./types";

const NOT_FOR = [
  "Medical emergencies — use local emergency services immediately",
  "Replacing your local obstetrician or gynecologist for all in-person care",
  "Prescribing controlled medicines where local law or clinical assessment does not permit",
  "Remote procedures, surgery, or hands-on examination when required in person",
] as const;

export const CHARMI_INTERNATIONAL_SERVICES: readonly InternationalService[] = [
  {
    slug: "ivf-second-opinion",
    doctor: "charmi",
    title: "IVF second opinion online",
    shortTitle: "IVF second opinion",
    metaDescription:
      "Video IVF second opinion with Dr. Charmi Shah (OB-GYN & IVF specialist) for NRIs and international patients — cycle review, protocol questions, and fertility planning via WhatsApp.",
    intro: [
      "Considering IVF or reviewing a failed cycle? Dr. Charmi Shah offers international video second opinions for patients worldwide — especially NRIs and families planning treatment in India or comparing options abroad.",
      "Share your history, prior protocols, and lab or ultrasound reports in WhatsApp when requested. This service focuses on expert counselling and planning, not emergency care.",
    ],
    canHelp: [
      "Review of prior IVF/IUI cycles and embryology summaries",
      "Discussion of workup, AMH, semen analysis, and imaging already done",
      "Second opinion before starting or switching clinics",
      "Questions about ovarian stimulation, retrieval, transfer, and freeze-all pathways",
      "Coordination mindset before travel to Mumbai, Ahmedabad, or Valsad when appropriate",
    ],
    notFor: NOT_FOR,
    relatedSlugs: [
      "fertility-consultation-online",
      "recurrent-pregnancy-loss-consultation",
      "gynecology-report-review",
    ],
    faqs: [
      {
        question: "Who is an online IVF second opinion for?",
        answer:
          "Patients abroad, NRIs, or anyone seeking an India-trained IVF specialist's view on their history, prior cycles, or next steps — before committing to a new clinic or protocol.",
      },
      {
        question: "What should I send before the consult?",
        answer:
          "Message on WhatsApp with your age, prior cycle details, key lab results, and ultrasound summaries when available. Attach PDFs or photos in chat after we confirm.",
      },
      {
        question: "Can Dr. Charmi start IVF remotely?",
        answer:
          "Stimulation and procedures require a licensed fertility centre. Online consults focus on planning, interpretation, and second opinions; in-person or partner-centre care handles procedures.",
      },
      {
        question: "Is this the same as booking through the fertility clinic?",
        answer:
          "This is a specialist opinion through Women's Health Duo. Treatment cycles are arranged through appropriate IVF centres after clinical assessment.",
      },
      {
        question: "Do you prescribe medications on video?",
        answer:
          "Only when clinically appropriate and permitted under applicable telemedicine rules. Many cases need local examination or partner-lab monitoring first.",
      },
      {
        question: "How do I book?",
        answer:
          "Tap WhatsApp on this page or use our Book consultation form for structured intake and telemedicine consent, then continue in chat.",
      },
    ],
  },
  {
    slug: "fertility-consultation-online",
    doctor: "charmi",
    title: "Online fertility consultation",
    shortTitle: "Fertility consult online",
    metaDescription:
      "International online fertility consultation with Dr. Charmi Shah — preconception planning, infertility workup review, and IVF/IUI guidance for patients worldwide.",
    intro: [
      "Planning pregnancy or navigating infertility from another country? Book an international fertility teleconsultation with Dr. Charmi Shah, obstetrician, gynecologist, and IVF specialist with Women's Health Duo.",
    ],
    canHelp: [
      "Preconception counselling and timeline planning",
      "Initial infertility workup discussion",
      "Interpretation of hormones, AMH, HSG, and semen analysis",
      "IVF vs IUI vs expectant management conversations",
      "Lifestyle and medical factors affecting fertility",
    ],
    notFor: NOT_FOR,
    relatedSlugs: ["ivf-second-opinion", "pcos-consultation-online", "gynecology-report-review"],
    faqs: [
      {
        question: "Can I consult from outside India?",
        answer:
          "Yes. Video fertility consults are designed for international patients and NRIs. Share your country and time zone when you message on WhatsApp.",
      },
      {
        question: "What is covered in a first fertility video visit?",
        answer:
          "History, prior tests, cycle patterns, partner factors when relevant, and a sensible next-step plan — which may include local tests, travel to India, or referral to an IVF centre.",
      },
      {
        question: "Does Dr. Charmi treat male factor infertility online?",
        answer:
          "Couple-oriented planning and review of semen analysis are included; male urology/andrology procedures remain with appropriate local specialists.",
      },
      {
        question: "Can I combine this with Dr. Zalak's physio services?",
        answer:
          "Yes. Many patients add preconception or pelvic health physiotherapy online through Dr. Zalak Shah when movement and pelvic floor support are part of the plan.",
      },
      {
        question: "How do I start?",
        answer:
          "Message on WhatsApp from this page or complete Book consultation — we reply with next steps and what records to share.",
      },
    ],
  },
  {
    slug: "recurrent-pregnancy-loss-consultation",
    doctor: "charmi",
    title: "Recurrent pregnancy loss consultation online",
    shortTitle: "Recurrent pregnancy loss",
    metaDescription:
      "Online consultation for recurrent miscarriage and pregnancy loss with Dr. Charmi Shah — review of prior losses, investigations, and next-step planning for international patients.",
    intro: [
      "Recurrent pregnancy loss needs careful, compassionate review. Dr. Charmi Shah offers international video consultations to discuss prior losses, completed investigations, and evidence-based next steps.",
    ],
    canHelp: [
      "Review of two or more pregnancy losses and timing",
      "Discussion of karyotype, thrombophilia, thyroid, uterine factors, and endocrine labs",
      "Planning further testing locally or in India",
      "Emotional support within a clinical framework",
      "Preconception planning after loss",
    ],
    notFor: NOT_FOR,
    relatedSlugs: [
      "fertility-consultation-online",
      "high-risk-pregnancy-counselling",
      "ivf-second-opinion",
    ],
    faqs: [
      {
        question: "When should I book after a miscarriage?",
        answer:
          "Once you are medically stable and have basic records (scan reports, blood work if done). Emergency bleeding or severe pain requires local urgent care, not teleconsultation.",
      },
      {
        question: "Can all RPL testing be done online?",
        answer:
          "Consultation and report review are online; many tests and any uterine assessment are arranged locally or in India when you travel.",
      },
      {
        question: "Do you offer treatment plans remotely?",
        answer:
          "Yes, when appropriate and legally permitted — always coordinated with your local doctor for monitoring and emergencies.",
      },
      {
        question: "Is this service only for NRIs?",
        answer:
          "No. Any patient worldwide may book; many NRIs use it before flying to India for coordinated care.",
      },
      {
        question: "How do I book?",
        answer:
          "WhatsApp from this page with a brief loss history, or use Book consultation for full intake.",
      },
    ],
  },
  {
    slug: "high-risk-pregnancy-counselling",
    doctor: "charmi",
    title: "High-risk pregnancy counselling online",
    shortTitle: "High-risk pregnancy",
    metaDescription:
      "International high-risk pregnancy teleconsultation with Dr. Charmi Shah — diabetes, hypertension, twins, prior preterm birth, and complex obstetric planning.",
    intro: [
      "Managing a high-risk pregnancy while living abroad? Dr. Charmi Shah provides international obstetric counselling, report review, and planning alongside your local maternity team.",
    ],
    canHelp: [
      "Review of risk factors and prior pregnancy complications",
      "Interpretation of growth scans, Doppler, and antenatal labs",
      "Discussion of travel to India for delivery when considered",
      "Medication and monitoring questions where telemedicine allows",
      "Coordination mindset with your local obstetrician",
    ],
    notFor: NOT_FOR,
    relatedSlugs: ["gynecology-report-review", "fertility-consultation-online"],
    faqs: [
      {
        question: "Can high-risk pregnancy be managed only online?",
        answer:
          "No. Ongoing antenatal care and emergencies need local services. Online visits supplement with specialist opinion and planning.",
      },
      {
        question: "What if I am bleeding or contracting now?",
        answer:
          "Contact local maternity emergency services immediately. Do not use this page for acute symptoms.",
      },
      {
        question: "Can Dr. Charmi be my primary obstetrician abroad?",
        answer:
          "She advises and reviews; your in-country obstetrician remains responsible for hands-on care unless you travel for delivery under her team in India.",
      },
      {
        question: "What records help before the call?",
        answer:
          "Dating scan, anomaly scan summaries, blood pressure logs, glucose results, and medication list — share via WhatsApp when asked.",
      },
      {
        question: "How do I book?",
        answer:
          "Message on WhatsApp with gestational age and main concern, or use Book consultation.",
      },
    ],
  },
  {
    slug: "endometriosis-second-opinion",
    doctor: "charmi",
    title: "Endometriosis second opinion online",
    shortTitle: "Endometriosis opinion",
    metaDescription:
      "Online endometriosis second opinion with Dr. Charmi Shah — pain, fertility impact, surgery planning, and medical management review for international patients.",
    intro: [
      "Endometriosis affects pain, fertility, and quality of life. Dr. Charmi Shah offers international video second opinions on diagnosis, medical vs surgical pathways, and fertility preservation questions.",
    ],
    canHelp: [
      "Review of symptoms, prior laparoscopy reports, and imaging",
      "Discussion of medical management and surgery timing",
      "Fertility preservation before surgery when relevant",
      "Coordination with Dr. Zalak for pelvic physio online when appropriate",
    ],
    notFor: NOT_FOR,
    relatedSlugs: ["pcos-consultation-online", "gynecology-report-review", "ivf-second-opinion"],
    faqs: [
      {
        question: "Can endometriosis be diagnosed online?",
        answer:
          "Clinical suspicion and report review yes; definitive diagnosis often needs imaging or laparoscopy in person.",
      },
      {
        question: "Do you offer laparoscopy remotely?",
        answer:
          "Surgery is in-person when indicated — Mumbai, Ahmedabad, Valsad, or a trusted local surgeon with shared planning.",
      },
      {
        question: "Can I discuss pain management online?",
        answer:
          "Yes, within telemedicine and prescribing rules; severe acute pain needs local assessment.",
      },
      {
        question: "Should I also see a physiotherapist?",
        answer:
          "Many patients benefit from Dr. Zalak Shah's women's health physiotherapy online for pelvic pain and movement — book separately or ask in WhatsApp.",
      },
      {
        question: "How do I book with Dr. Charmi?",
        answer: "WhatsApp from this page or Book consultation on our website.",
      },
    ],
  },
  {
    slug: "pcos-consultation-online",
    doctor: "charmi",
    title: "PCOS consultation online",
    shortTitle: "PCOS consult online",
    metaDescription:
      "International PCOS teleconsultation with Dr. Charmi Shah — cycles, fertility, metabolic health, and long-term management for patients worldwide.",
    intro: [
      "PCOS needs personalised, long-term planning. Dr. Charmi Shah consults international patients by video on cycles, fertility goals, weight, insulin resistance, and treatment options.",
    ],
    canHelp: [
      "Irregular periods and hyperandrogenism review",
      "Fertility-oriented PCOS planning",
      "Metabolic risk and lifestyle counselling",
      "Medication discussion where clinically appropriate",
      "Coordination with physio/Pilates for sustainable movement",
    ],
    notFor: NOT_FOR,
    relatedSlugs: ["fertility-consultation-online", "endometriosis-second-opinion"],
    faqs: [
      {
        question: "Do I need blood tests before the consult?",
        answer:
          "Recent hormones, glucose, and lipids help if available — send via WhatsApp. We can suggest tests locally if missing.",
      },
      {
        question: "Can PCOS be managed fully online?",
        answer:
          "Much of counselling and follow-up can be virtual; some monitoring and exams remain local.",
      },
      {
        question: "Is this suitable for teenagers with PCOS?",
        answer:
          "Yes with guardian involvement where required by law and clinic policy — mention age when booking.",
      },
      {
        question: "How do I book?",
        answer: "WhatsApp or Book consultation from this page.",
      },
    ],
  },
  {
    slug: "gynecology-report-review",
    doctor: "charmi",
    title: "Gynecology ultrasound & lab report review online",
    shortTitle: "Report review online",
    metaDescription:
      "Online gynecology report review with Dr. Charmi Shah — ultrasound, fertility labs, and imaging summaries for international second opinions via WhatsApp.",
    intro: [
      "Have pelvic ultrasound, fertility labs, or operative notes and want an India-trained OB-GYN to review them? Dr. Charmi Shah offers international report-review teleconsultations.",
    ],
    canHelp: [
      "Pelvic and early pregnancy ultrasound reports",
      "Fertility hormone panels and semen analysis summaries",
      "Operative notes and histopathology discussion",
      "Next-step testing recommendations",
    ],
    notFor: NOT_FOR,
    relatedSlugs: [
      "ivf-second-opinion",
      "fertility-consultation-online",
      "high-risk-pregnancy-counselling",
    ],
    faqs: [
      {
        question: "How do I share reports?",
        answer:
          "After WhatsApp contact, attach PDFs or clear photos in chat. List studies in Book consultation if you use the form.",
      },
      {
        question: "Is report review a full consultation?",
        answer:
          "Yes — it includes history questions and a video or audio call when needed to explain findings and next steps.",
      },
      {
        question: "Can you re-read scans done in another country?",
        answer:
          "We review reports and images shared with us; formal radiology re-report may still need a local radiologist if required by your system.",
      },
      {
        question: "How do I book?",
        answer: "WhatsApp from this page with a list of reports you have.",
      },
    ],
  },
  {
    slug: "menopause-consultation-online",
    doctor: "charmi",
    title: "Menopause consultation online",
    shortTitle: "Menopause consult",
    metaDescription:
      "International menopause teleconsultation with Dr. Charmi Shah — symptoms, HRT discussion, bone health, and midlife wellness for patients abroad.",
    intro: [
      "Navigating perimenopause or menopause while living outside India? Dr. Charmi Shah offers international video consults on symptoms, therapy options, and preventive health within telemedicine guidelines.",
    ],
    canHelp: [
      "Hot flashes, sleep, mood, and libido review",
      "Shared decision-making on HRT when appropriate",
      "Bone health and screening discussions",
      "Bleeding after menopause — urgent local care if active bleeding",
    ],
    notFor: NOT_FOR,
    relatedSlugs: ["pcos-consultation-online", "gynecology-report-review"],
    faqs: [
      {
        question: "Can HRT be prescribed online?",
        answer:
          "Sometimes, when clinically appropriate and legal. Many patients need local follow-up for prescriptions and monitoring.",
      },
      {
        question: "What if I have postmenopausal bleeding?",
        answer:
          "Seek urgent local gynecologic assessment — that is not suitable for teleconsultation alone.",
      },
      {
        question: "How do I book?",
        answer: "WhatsApp or Book consultation from this page.",
      },
    ],
  },
];
