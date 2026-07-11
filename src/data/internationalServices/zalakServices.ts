import type { InternationalService } from "./types";

const NOT_FOR = [
  "Medical emergencies — use local emergency services immediately",
  "Replacing in-person pelvic examination when hands-on assessment is required",
  "Diagnosing conditions that need urgent imaging or surgery without local care",
  "Prescribing controlled medicines where local law or assessment does not permit",
] as const;

export const ZALAK_INTERNATIONAL_SERVICES: readonly InternationalService[] = [
  {
    slug: "pelvic-floor-physiotherapy-online",
    doctor: "zalak",
    title: "Pelvic floor physiotherapy online",
    shortTitle: "Pelvic floor physio online",
    metaDescription:
      "International pelvic floor physiotherapy online with Dr. Zalak Shah — incontinence, prolapse support, pelvic pain, and postpartum recovery via video and WhatsApp.",
    intro: [
      "Pelvic floor symptoms respond well to guided physiotherapy — even across time zones. Dr. Zalak Shah, women's health physiotherapist and STOTT Pilates instructor, offers international online pelvic floor consults and home exercise plans.",
    ],
    canHelp: [
      "Stress or urge incontinence education and exercise progression",
      "Postpartum pelvic floor retraining",
      "Pelvic pain and tension — alongside your gynecologist when needed",
      "Prolapse symptom management with lifestyle and exercise",
      "Coordination with Dr. Charmi for surgical or medical gynecology questions",
    ],
    notFor: NOT_FOR,
    relatedSlugs: [
      "postpartum-recovery-online",
      "diastasis-recti-consultation-online",
      "prenatal-postnatal-physio-online",
    ],
    faqs: [
      {
        question: "Can pelvic floor physio work without an internal exam?",
        answer:
          "Many programmes start with history, movement screening on video, and external cues. Internal assessment may be recommended in person when clinically needed.",
      },
      {
        question: "Who is this for internationally?",
        answer:
          "NRIs, expats, and anyone abroad seeking India-trained women's health physiotherapy in English — with follow-up on WhatsApp for exercise videos and progress.",
      },
      {
        question: "Do I need a doctor referral?",
        answer:
          "Not always, but complex pain or bleeding should be cleared by a gynecologist — Dr. Charmi offers online consults through the same practice.",
      },
      {
        question: "How many sessions are typical?",
        answer:
          "Plans vary by goal. We outline expectations in the first consult and schedule follow-ups as needed.",
      },
      {
        question: "How do I book?",
        answer: "WhatsApp from this page or Book consultation with Dr. Zalak selected.",
      },
    ],
  },
  {
    slug: "prenatal-postnatal-physio-online",
    doctor: "zalak",
    title: "Prenatal & postnatal physiotherapy online",
    shortTitle: "Prenatal & postnatal physio",
    metaDescription:
      "Online prenatal and postnatal physiotherapy with Dr. Zalak Shah — back pain, pelvic girdle pain, safe movement, and recovery for international patients.",
    intro: [
      "Pregnancy and early motherhood change how you move. Dr. Zalak Shah provides international prenatal and postnatal physiotherapy online — pain management, safe exercise, and return-to-activity planning.",
    ],
    canHelp: [
      "Back and pelvic girdle pain in pregnancy",
      "Safe movement and daily activity modifications",
      "Early postnatal recovery and scar mobility guidance when appropriate",
      "Breathing and core coordination basics",
      "Referral mindset to Dr. Charmi for obstetric concerns",
    ],
    notFor: NOT_FOR,
    relatedSlugs: [
      "pregnancy-exercise-planning-online",
      "postpartum-recovery-online",
      "pelvic-floor-physiotherapy-online",
    ],
    faqs: [
      {
        question: "Can I start prenatal physio in the first trimester?",
        answer:
          "Often yes after your obstetrician clears exercise — mention any bleeding or high-risk flags when booking.",
      },
      {
        question: "Is postnatal physio safe after C-section?",
        answer:
          "Yes, with timing tailored to healing — share your delivery date and surgeon guidance in WhatsApp.",
      },
      {
        question: "Do you work with patients in the US, UK, or Gulf?",
        answer:
          "Yes. We schedule video sessions across time zones and share exercise cues on WhatsApp.",
      },
      {
        question: "How do I book?",
        answer:
          "Message on WhatsApp or use Book consultation and select women's health physiotherapy.",
      },
    ],
  },
  {
    slug: "mat-pilates-online-international",
    doctor: "zalak",
    title: "Mat Pilates online (international)",
    shortTitle: "Mat Pilates online",
    metaDescription:
      "International Mat Pilates classes and coaching online with Dr. Zalak Shah — women's health–focused movement for core strength, posture, and recovery.",
    intro: [
      "Mat Pilates builds core control and posture with minimal equipment — ideal for international clients. Dr. Zalak Shah offers women's health–oriented Mat Pilates coaching online in small groups or one-to-one formats.",
    ],
    canHelp: [
      "Foundational Mat Pilates for women",
      "Postpartum return to movement when cleared medically",
      "Posture and spinal mobility",
      "Low-impact conditioning alongside physio goals",
    ],
    notFor: NOT_FOR,
    relatedSlugs: ["stott-pilates-online-international", "postpartum-recovery-online"],
    faqs: [
      {
        question: "Do I need Pilates equipment at home?",
        answer:
          "Mat work uses a mat and optional small props (band, cushion). We confirm before your first session.",
      },
      {
        question: "Is this clinical Pilates or fitness?",
        answer:
          "Dr. Zalak integrates physiotherapy principles — suitable after assessment, especially postpartum or with pelvic symptoms.",
      },
      {
        question: "Can beginners join from abroad?",
        answer: "Yes. We start with fundamentals and progress safely on video.",
      },
      {
        question: "How do I book?",
        answer: "WhatsApp from this page with your time zone and goals.",
      },
    ],
  },
  {
    slug: "stott-pilates-online-international",
    doctor: "zalak",
    title: "STOTT Pilates online (international)",
    shortTitle: "STOTT Pilates online",
    metaDescription:
      "STOTT Pilates instruction online with Dr. Zalak Shah — certified women's health movement coaching for international clients via video.",
    intro: [
      "STOTT Pilates emphasises biomechanics and safe spinal movement. Dr. Zalak Shah, STOTT Pilates–trained instructor, offers international online sessions tailored to women's health and recovery goals.",
    ],
    canHelp: [
      "STOTT-informed mat and reformer-style concepts at home where possible",
      "Core and hip stability for women",
      "Return to sport or dance with graded loading",
      "Complement to pelvic floor physiotherapy",
    ],
    notFor: NOT_FOR,
    relatedSlugs: ["mat-pilates-online-international", "pregnancy-exercise-planning-online"],
    faqs: [
      {
        question: "What is the difference between Mat and STOTT sessions?",
        answer:
          "STOTT sessions follow STOTT Pilates principles and sequencing; Mat Pilates is floor-based and often a starting point — we recommend what fits your level.",
      },
      {
        question: "Can I do STOTT Pilates while pregnant?",
        answer:
          "Often yes with modifications after obstetric clearance — book prenatal exercise planning if unsure.",
      },
      {
        question: "Are sessions live or recorded?",
        answer:
          "Live video coaching with optional exercise summaries on WhatsApp; we do not replace your local emergency care.",
      },
      {
        question: "How do I book?",
        answer: "WhatsApp from this page.",
      },
    ],
  },
  {
    slug: "postpartum-recovery-online",
    doctor: "zalak",
    title: "Postpartum recovery online",
    shortTitle: "Postpartum recovery",
    metaDescription:
      "International postpartum recovery physiotherapy online with Dr. Zalak Shah — core, pelvic floor, diastasis, and safe return to exercise after birth.",
    intro: [
      "The fourth trimester deserves structured support. Dr. Zalak Shah helps international clients recover after vaginal or caesarean birth with online physiotherapy and progressive exercise planning.",
    ],
    canHelp: [
      "Early postpartum movement and breathing",
      "Pelvic floor re-engagement",
      "Diastasis recti screening on video and home checks",
      "Graded return to walking, lifting, and fitness",
    ],
    notFor: NOT_FOR,
    relatedSlugs: [
      "diastasis-recti-consultation-online",
      "pelvic-floor-physiotherapy-online",
      "prenatal-postnatal-physio-online",
    ],
    faqs: [
      {
        question: "When can I start after delivery?",
        answer:
          "Timing depends on delivery type and your obstetrician's clearance — often within days for gentle breathing and weeks for progressive loading.",
      },
      {
        question: "Can this help with C-section numbness or tightness?",
        answer:
          "Gentle mobility and scar tissue guidance may help when appropriate — share your surgical date when booking.",
      },
      {
        question: "Do you coordinate with Dr. Charmi?",
        answer:
          "Yes. Obstetric or medical questions go to Dr. Charmi; movement and pelvic rehab stay with Dr. Zalak.",
      },
      {
        question: "How do I book?",
        answer: "WhatsApp or Book consultation.",
      },
    ],
  },
  {
    slug: "diastasis-recti-consultation-online",
    doctor: "zalak",
    title: "Diastasis recti consultation online",
    shortTitle: "Diastasis recti online",
    metaDescription:
      "Online diastasis recti assessment and rehab planning with Dr. Zalak Shah — abdominal separation after pregnancy for international patients.",
    intro: [
      "Abdominal separation after pregnancy is common and often improves with guided rehab. Dr. Zalak Shah offers international online diastasis consults with self-check guidance and progressive core programming.",
    ],
    canHelp: [
      "Teaching safe self-check for gap and tension",
      "Breathing and deep core coordination",
      "Avoiding harmful crunching early in rehab",
      "Return to Pilates and strength when ready",
    ],
    notFor: NOT_FOR,
    relatedSlugs: ["postpartum-recovery-online", "mat-pilates-online-international"],
    faqs: [
      {
        question: "Can diastasis be assessed fully online?",
        answer:
          "We guide you through a video-supported self-check and functional tests; complex cases may still need in-person review.",
      },
      {
        question: "How long does rehab take?",
        answer: "Months are normal. We set realistic milestones and adjust on follow-ups.",
      },
      {
        question: "Should I see a surgeon first?",
        answer:
          "Large gaps with functional issues may need surgical opinion — Dr. Charmi can discuss medical/surgical options separately.",
      },
      {
        question: "How do I book?",
        answer: "WhatsApp from this page.",
      },
    ],
  },
  {
    slug: "pregnancy-exercise-planning-online",
    doctor: "zalak",
    title: "Pregnancy-safe exercise planning online",
    shortTitle: "Pregnancy exercise online",
    metaDescription:
      "International pregnancy exercise planning with Dr. Zalak Shah — safe cardio, strength, and Pilates for each trimester via video consult.",
    intro: [
      "Staying active in pregnancy supports comfort and recovery. Dr. Zalak Shah creates international pregnancy-safe exercise plans online — aligned with your obstetrician's guidance and your fitness background.",
    ],
    canHelp: [
      "Trimester-specific cardio and strength guidelines",
      "Modifications for pelvic pain or diastasis risk",
      "Pilates-based prenatal programmes",
      "Planning handoff to postpartum rehab",
    ],
    notFor: NOT_FOR,
    relatedSlugs: ["prenatal-postnatal-physio-online", "stott-pilates-online-international"],
    faqs: [
      {
        question: "Do I need obstetric clearance?",
        answer:
          "Yes for high-risk pregnancies or new symptoms — we ask about bleeding, preterm risk, and blood pressure when you book.",
      },
      {
        question: "Can I run while pregnant abroad?",
        answer:
          "Sometimes, with individual assessment — share your current routine and weeks of gestation on WhatsApp.",
      },
      {
        question: "How do I book?",
        answer: "WhatsApp or Book consultation.",
      },
    ],
  },
];
