/** * Topic- and route-specific FAQ pools (max 10 items per page). * Tags in comments: gynecology | physio | pelvic | prenatal | postpartum | virtual | booking */
import type { FaqItem } from "@/data/siteFaq";
import type { SeoOnlineService } from "@/data/seoOnlineServices";
import type { CityKey } from "@/data/cityPages";
import { ROUTES } from "@/config/routes";
export const MAX_CONTEXT_FAQS = 10 as const;
function take10(items: FaqItem[]): FaqItem[] {
  return items.slice(0, MAX_CONTEXT_FAQS);
} /** Learn hub default , booking + what the hub is + online care. */
const LEARN_HUB_DEFAULT: FaqItem[] = [
  {
    question: "What is the Women's Health Duo Learn hub?",
    answer:
      "It is our library of official YouTube Shorts and Instagram Reels, short clips on pregnancy, pelvic health, fertility, movement, and everyday women's health questions. Clips educate; they do not replace an individualized consultation.",
  },
  {
    question: "How do I book a consultation after watching a clip?",
    answer:
      "Use the WhatsApp button on this site or email contact@womenshealthduo.com with your city, country, time zone, and a short summary. We will suggest whether Dr. Charmi Shah (OB-GYN / IVF) or Dr. Zalak Shah (women's health physio / STOTT Pilates) fits first, and share available slots.",
  },
  {
    question: "Can I get a prescription or procedure from a reel alone?",
    answer:
      "No. Prescriptions, procedures, and formal plans require a booked consultation and follow normal medical pathways in your region.",
  },
  {
    question: "Is online consultation as useful as in-person for women's health?",
    answer:
      "For education, follow-up questions, second opinions, and structured exercise planning, video visits work well when you share prior reports and keep local urgent care for emergencies. Some exams and surgeries still need in-person care; we tell you clearly when that applies.",
  },
  {
    question: "Which doctor should I book first if I am unsure?",
    answer:
      "Message us with your main concern. Pregnancy, periods, fertility, fibroids, endometriosis, and surgery planning usually start with Dr. Charmi. Pelvic floor, prenatal/postnatal movement, diastasis, incontinence rehab (with physician clearance), Mat Pilates online, or STOTT Pilates usually start with Dr. Zalak. We sometimes coordinate both.",
  },
  {
    question: "Do you see patients outside India?",
    answer:
      "Yes, online is how we serve most international families. Dr. Charmi and Dr. Zalak both offer video consults worldwide; in-person visits for Dr. Charmi are in Mumbai, Ahmedabad, and Valsad, and for Dr. Zalak in Bangalore and Ahmedabad as listed on our site.",
  },
  {
    question: "What languages can we use on a call?",
    answer:
      "English, Hindi, and Gujarati are commonly used, mention your preference when you book.",
  },
  {
    question: "How quickly do you reply on WhatsApp?",
    answer:
      "We aim to respond during working hours listed on doctor profiles. For emergencies, use your local emergency services.",
  },
  {
    question: "Where is the full practice FAQ?",
    answer:
      "Open the site FAQ page for longer answers on cities, diaspora pages, and how booking works across India and online.",
  },
  {
    question: "Can I share a reel with my partner or family?",
    answer:
      "Yes, sharing public Shorts or Reels is fine. For private medical details, use email or WhatsApp directly with the practice.",
  },
]; /** STOTT / Pilates , expertise: physio, movement */
const LEARN_STOTT_PILATES: FaqItem[] = [
  {
    question: "What is STOTT Pilates?",
    answer:
      "STOTT Pilates is a contemporary, evidence-informed Pilates method taught on Mat and Reformer with emphasis on neutral alignment, core stability, and safe progression, often used alongside women's health physiotherapy.",
  },
  {
    question: "Who benefits from women's health physiotherapy?",
    answer:
      "People with pregnancy or postpartum goals, pelvic pain, diastasis recti, incontinence when cleared by a physician, and women rebuilding strength after injury or surgery (with medical clearance).",
  },
  {
    question: "Is women's health physiotherapy only for pregnant patients?",
    answer:
      "No. We also work with non-pregnant patients on pelvic floor symptoms, posture, and musculoskeletal issues common in women.",
  },
  {
    question: "Can physiotherapy help with pelvic pain?",
    answer:
      "Often yes, through assessment, manual therapy where appropriate, and progressive exercise. Serious or sudden pain still needs urgent local evaluation.",
  },
  {
    question: "Can Pilates help core strength after pregnancy?",
    answer:
      "Yes, when progression is guided and any diastasis or pelvic floor issues are screened first. Your clinician tailors load and breath strategy.",
  },
  {
    question: "Are online movement sessions effective?",
    answer:
      "They can be, when we review your space, equipment, and history on video and give clear cues. Some hands-on work still needs in-person visits.",
  },
  {
    question: "Do I need a referral?",
    answer:
      "Referrals help for insurance in some countries; they are not always required for private pay. Ask when you book.",
  },
  {
    question: "How many sessions might I need?",
    answer:
      "It varies by goal, some patients need a short block for education; others need months of graded training. We outline a realistic plan after the first visit.",
  },
  {
    question: "How do I book with Dr. Zalak for Pilates or physio?",
    answer:
      "WhatsApp or email the practice with “Mat/STOTT / physio” in the subject, your time zone, and a short summary. We will route you to Dr. Zalak's calendar.",
  },
  {
    question: "Where can I read the medical disclaimer?",
    answer:
      "See the Medical disclaimer and Editorial policy links in the site footer and on this Learn page.",
  },
]; /** Pregnancy / exercise / workshop clips , expertise: prenatal physio + OB education */
const LEARN_PRENATAL_MOVEMENT: FaqItem[] = [
  {
    question: "What is prenatal physiotherapy?",
    answer:
      "It is physiotherapy focused on pregnancy, safe movement, pelvic girdle comfort, breath, and preparing for labour within your obstetrician's guidance.",
  },
  {
    question: "When should I start prenatal physiotherapy?",
    answer:
      "Many patients start after the first trimester once OB clearance is documented, or earlier if pain or mobility issues appear, timing is individualized.",
  },
  {
    question: "Is exercise safe during pregnancy?",
    answer:
      "For uncomplicated pregnancies, moderate exercise is usually encouraged. We screen risk factors and coordinate with your OB before progressing load.",
  },
  {
    question: "Which exercises should be avoided during pregnancy?",
    answer:
      "High fall-risk contact sports, breath-holding Valsalva, lying flat supine for long periods late in pregnancy, and anything your OB has restricted. We adapt your program.",
  },
  {
    question: "Is walking enough in pregnancy?",
    answer:
      "Walking is excellent baseline activity. Some patients also need strength, mobility, or pelvic floor work, clips on this hub explain common trade-offs; a consult personalizes it.",
  },
  {
    question: "Why do I have back or pelvic pain in pregnancy?",
    answer:
      "Hormones, posture, and load change how joints and muscles behave. Physio can teach support strategies; red-flag symptoms need urgent OB care.",
  },
  {
    question: "Can I exercise if I never trained before pregnancy?",
    answer:
      "Often yes, starting gently and progressing slowly. We prioritize safety and symptom monitoring.",
  },
  {
    question: "When should I seek urgent help in pregnancy?",
    answer:
      "Heavy bleeding, severe abdominal pain, leaking fluid, reduced fetal movement, fever, or sudden shortness of breath, go to local emergency services immediately.",
  },
  {
    question: "How do I book Dr. Charmi for pregnancy medical questions?",
    answer:
      "Use WhatsApp or email for OB-GYN scheduling, include gestation, city, and prior scan or lab summaries if you have them.",
  },
  {
    question: "How do I book Dr. Zalak for pregnancy movement?",
    answer:
      "Same channels, note that you want prenatal physio or Mat Pilates online and your OB's clearance if applicable.",
  },
]; /** Pelvic floor + labour education , expertise: pelvic | OB education */
const LEARN_PELVIC_LABOR: FaqItem[] = [
  {
    question: "What is the pelvic floor?",
    answer:
      "It is a muscular sling supporting the bladder, uterus, and bowel. It contracts and relaxes during daily tasks, sport, and childbirth.",
  },
  {
    question: "What are signs of pelvic floor dysfunction?",
    answer:
      "Leakage with cough or sneeze, urgency, heaviness or pressure, pain with intercourse, constipation strain, or pelvic ache. Evaluation clarifies over- vs under-activity.",
  },
  {
    question: "Are Kegels right for everyone?",
    answer:
      "No. Some patients need relaxation and down-training first; others need strength. Assessment avoids making symptoms worse.",
  },
  {
    question: "Why do I leak urine when I cough or sneeze?",
    answer:
      "Often stress incontinence from demand on the pelvic floor and urethral support. Physio and behaviour changes help many patients; surgery is a separate discussion with your surgeon.",
  },
  {
    question: "Can pelvic floor therapy help painful intercourse?",
    answer:
      "It can be part of care when muscle tension or scar tissue contributes, always coordinated with your gynecologist.",
  },
  {
    question: "What happens during a pelvic floor assessment?",
    answer:
      "Your clinician reviews history, observes movement and breathing, and may use external palpation or internal assessment where appropriate and consented, online visits focus on education and exercise first.",
  },
  {
    question: "Can online pelvic floor consults work?",
    answer:
      "Yes for education, exercise progression, and follow-up when an in-person exam is not immediately needed. Some cases still need local examination.",
  },
  {
    question: "What is the biggest myth about Kegels and labour?",
    answer:
      "That Kegels alone “prepare” everyone for delivery. Labour needs coordinated relaxation, breathing, and obstetric guidance, see our clips and ask your team.",
  },
  {
    question: "How do I book pelvic floor care?",
    answer:
      "WhatsApp or email with a short symptom list and any physician referrals. Dr. Zalak leads pelvic floor rehab; Dr. Charmi handles gynecologic causes that need medical treatment.",
  },
  {
    question: "When should I seek urgent care for pelvic symptoms?",
    answer:
      "Fever with pelvic pain, inability to pass urine, heavy bleeding, or sudden severe pain, use local emergency services.",
  },
]; /** Fertility clips , expertise: gynecology | fertility */
const LEARN_FERTILITY: FaqItem[] = [
  {
    question: "What fertility tests are commonly used first?",
    answer:
      "Often cycle tracking, hormone labs, ultrasound for ovaries and uterus, and semen analysis for heterosexual couples. Your clinician chooses based on history.",
  },
  {
    question: "Does PCOS affect fertility?",
    answer:
      "It can, through irregular ovulation. Management blends lifestyle, medication, and sometimes assisted reproduction, personalized in consult.",
  },
  {
    question: "When should I see a gynecologist for fertility?",
    answer:
      "Generally after 12 months of trying if under 35 (6 months if 35 or older), or sooner if irregular cycles, endometriosis, or prior surgery.",
  },
  {
    question: "Can I discuss IVF or IUI online?",
    answer:
      "Yes, Dr. Charmi offers video discussion of pathways, risks, and documentation review. Controlled ovarian stimulation and procedures occur at licensed centers.",
  },
  {
    question: "Is online as good as in-person for a second opinion?",
    answer:
      "For reviewing records and imaging, telehealth is often excellent. Physical exam components may still be needed locally.",
  },
  {
    question: "How do I send prior labs securely?",
    answer:
      "Email summaries or share during the video visit as your privacy rules allow. Avoid sharing passwords.",
  },
  {
    question: "What is PCOS in one line?",
    answer:
      "A hormonal–metabolic pattern with ovulation and androgen features; diagnosis and treatment belong in consultation.",
  },
  {
    question: "Can lifestyle change improve fertility?",
    answer:
      "Sleep, nutrition, stress, and activity all matter. We set realistic priorities alongside medical options.",
  },
  {
    question: "How do I book Dr. Charmi for fertility questions?",
    answer:
      "WhatsApp or email with age, months trying, cycle pattern, and prior tests, we suggest next steps.",
  },
  {
    question: "Where is the practice medical disclaimer?",
    answer: "Linked from the footer and near the bottom of this Learn page.",
  },
]; /** General gynecology / patient education tone */
const LEARN_GENERAL_GYN: FaqItem[] = [
  {
    question: "When should I see a gynecologist?",
    answer:
      "For new pelvic pain, abnormal bleeding, pregnancy planning, screening discussions, menopause symptoms, or infections that recur, earlier if symptoms worry you.",
  },
  {
    question: "How often should women have checkups?",
    answer:
      "Intervals depend on age, conditions, and national guidelines, your clinician personalizes this.",
  },
  {
    question: "What symptoms should I never ignore?",
    answer:
      "Heavy bleeding, postmenopausal bleeding, severe pain, fever with pelvic symptoms, or pregnancy pain/bleeding, seek urgent care.",
  },
  {
    question: "Can I consult a gynecologist online?",
    answer: "Yes for many topics; emergencies and some exams need in-person care.",
  },
  {
    question: "What should I expect in a first consultation?",
    answer:
      "History, review of records, clear explanation of likely diagnoses and next tests, and a follow-up plan.",
  },
  {
    question: "Do I need a gynecologist if I am not pregnant?",
    answer:
      "Yes, gynecologists cover menstrual health, infections, contraception, cancer screening, and pelvic pain across life stages.",
  },
  {
    question: "What is PMS vs PMDD?",
    answer:
      "PMS is bothersome premenstrual symptoms; PMDD is a severe pattern affecting mood and function, both are evaluated clinically.",
  },
  {
    question: "Can stress affect my cycle?",
    answer:
      "Stress can contribute to irregular bleeding or skipped cycles alongside other medical causes worth screening.",
  },
  {
    question: "How do I book Dr. Charmi?",
    answer: "WhatsApp or email with your concern list, medications, and prior imaging if any.",
  },
  {
    question: "How do clips relate to my care?",
    answer:
      "They explain concepts you may hear in clinic; your plan is still individualized after assessment.",
  },
];
export function learnHubFaqsForTopic(topic: string | "all"): FaqItem[] {
  if (topic === "all") return take10(LEARN_HUB_DEFAULT);
  const t = topic.toLowerCase();
  if (t.includes("stott") || t === "pilates") return take10(LEARN_STOTT_PILATES);
  if (t.includes("pregnancy") || t === "exercise" || t === "workshop")
    return take10(LEARN_PRENATAL_MOVEMENT);
  if (t.includes("pelvic") || t.includes("labor") || t.includes("labour"))
    return take10(LEARN_PELVIC_LABOR);
  if (t.includes("fertility")) return take10(LEARN_FERTILITY);
  if (t.includes("patient") || t.includes("women") || t.includes("reels"))
    return take10(LEARN_GENERAL_GYN);
  return take10(LEARN_HUB_DEFAULT);
}
export function learnHubFaqHeading(topic: string | "all"): { title: string; intro: string } {
  if (topic === "all") {
    return {
      title: "Questions about this Learn hub",
      intro: "How clips relate to booking, online care, and when to seek urgent help.",
    };
  }
  return {
    title: `Questions about “${topic}” on Learn`,
    intro: "Topic-focused answers; individualized plans still require a booked consultation.",
  };
}
type OnlineServiceFaqContext = {
  serviceTitle: string;
  shortTitle: string;
  city: string;
  country: string;
  doctorLabel: string;
};

/** Weave city, country, service, and doctor into each body FAQ so it matches the service×city URL. */
function contextualizeOnlineServiceBodyFaqs(
  items: FaqItem[],
  ctx: OnlineServiceFaqContext,
): FaqItem[] {
  const where = `${ctx.city}, ${ctx.country}`;
  return items.map((it) => ({
    question: `${it.question} (${ctx.shortTitle} for ${where})`,
    answer: `On this ${ctx.serviceTitle} page for ${where} with ${ctx.doctorLabel}: ${it.answer}`,
  }));
}
function quadVirtualBooking(args: {
  serviceTitle: string;
  city: string;
  country: string;
  doctorLabel: string;
}): FaqItem[] {
  const { serviceTitle, city, country, doctorLabel } = args;
  return [
    {
      question: `How do I book ${serviceTitle} from ${city}?`,
      answer: `Message us on WhatsApp or email contact@womenshealthduo.com. Include ${city}, ${country}, your time zone, and that you want ${serviceTitle}. We coordinate with ${doctorLabel} for the next available video slot.`,
    },
    {
      question: `Is video consultation as effective as in-person for ${serviceTitle}?`,
      answer: `For patients in ${city}, ${country} booking ${serviceTitle}, video works well for history, education, follow-up, and exercise coaching with ${doctorLabel}. Physical exams, procedures, and emergencies still need local in-person care when indicated, we say that plainly when you book from ${city}.`,
    },
    {
      question: `What should I send before the first ${serviceTitle} online visit from ${city}?`,
      answer: `From ${city}, ${country}, send prior labs, imaging, medication list, obstetric dates if pregnant, and local doctor summaries so ${doctorLabel} can use the ${serviceTitle} slot efficiently. English or Hindi/Gujarati notes are fine.`,
    },
    {
      question: `How quickly can I get a ${serviceTitle} slot from ${city}?`,
      answer: `We reply with options for ${city}, ${country} as staffing allows during business hours. Urgent symptoms should go to your local emergency department, not WhatsApp, even when ${serviceTitle} is your main concern.`,
    },
  ];
} /** Six topic lines per online service slug (expertise-tagged in comments). */
const SERVICE_BODY: Record<string, FaqItem[]> = {
  "pregnancy-high-risk-obstetrics": [
    {
      question: "What counts as a high-risk pregnancy?",
      answer:
        "Examples include hypertension in pregnancy, diabetes, growth concerns, multiple pregnancy, prior preterm birth, and other conditions your OB monitors closely, your plan is individualized.",
    },
    {
      question: "Can I discuss travel or NRI follow-up online?",
      answer:
        "Yes, many families book video visits between trips to India for continuity with the same obstetric voice.",
    },
    {
      question: "When should I go to local emergency care?",
      answer:
        "Heavy bleeding, severe pain, reduced fetal movement, seizures, or sudden breathlessness, always local emergency first.",
    },
    {
      question: "Will you coordinate with my local OB?",
      answer:
        "We can summarize recommendations you can share; direct co-management depends on both clinicians agreeing.",
    },
    {
      question: "Do you prescribe medications online?",
      answer:
        "Only when clinically appropriate and legal in your jurisdiction; some drugs need in-person evaluation.",
    },
    {
      question: "How do I prepare questions for the call?",
      answer:
        "Write gestational age, symptoms with dates, and home blood pressure or sugar logs if you track them.",
    },
  ],
  "ivf-fertility-treatments": [
    {
      question: "Can we review prior IVF cycles online?",
      answer:
        "Yes, bring stimulation protocols, embryo counts, and outcome summaries for structured discussion.",
    },
    {
      question: "What about IUI vs IVF?",
      answer:
        "Indications differ by age, tubes, sperm counts, and time trying, your consult compares realistic paths.",
    },
    {
      question: "Do you order new tests remotely?",
      answer:
        "We suggest tests you can complete locally where needed, then review results on follow-up.",
    },
    {
      question: "Is genetic screening discussed?",
      answer:
        "High-level education yes; formal genetic counseling may need dedicated services locally.",
    },
    {
      question: "How private is telehealth?",
      answer:
        "Use a private space and stable connection; we follow standard confidentiality practices.",
    },
    {
      question: "Can partners join the video visit?",
      answer: "Yes if you want, mention that when booking.",
    },
  ],
  "laparoscopic-surgery": [
    {
      question: "Can fibroids or endometriosis be discussed online?",
      answer:
        "Yes for understanding options and whether laparoscopy might be indicated, instrumental surgery itself is in-person.",
    },
    {
      question: "What imaging helps before a surgical consult?",
      answer:
        "Ultrasound or MRI summaries, prior operative notes, and symptom calendars are useful.",
    },
    {
      question: "When is surgery urgent?",
      answer:
        "Torsion, heavy bleeding with instability, or suspected rupture, local emergency, not telehealth.",
    },
    {
      question: "Do you offer second opinions on prior operations?",
      answer: "Often, with operative reports and pathology if available.",
    },
    {
      question: "What if I live far from India?",
      answer: "We clarify which parts of care can be remote vs where you need a local surgeon.",
    },
    {
      question: "How long are consults?",
      answer: "Complex surgical history may need a longer slot, ask when booking.",
    },
  ],
  "pcos-hormonal-disorders": [
    {
      question: "What is PCOS?",
      answer:
        "A common hormonal pattern affecting cycles, metabolism, and skin/hair, diagnosis uses clinical and lab criteria, not one symptom alone.",
    },
    {
      question: "Can lifestyle help PCOS?",
      answer:
        "Sleep, food quality, stress, and movement often improve cycles and insulin sensitivity alongside medical therapy when needed.",
    },
    {
      question: "Does PCOS always mean infertility?",
      answer:
        "No, some patients conceive spontaneously; others need ovulation support, individualized assessment matters.",
    },
    {
      question: "Which tests might I need?",
      answer: "Often hormone panel, metabolic screening, and ultrasound, ordered based on history.",
    },
    {
      question: "Can I manage PCOS without pills?",
      answer:
        "Sometimes partially; medications are added when targets are not met or symptoms are severe.",
    },
    {
      question: "When should I seek urgent care?",
      answer: "Very heavy bleeding, fainting, or severe pain, local emergency.",
    },
  ],
  "gynecological-care": [
    {
      question: "What gynecology topics fit telehealth?",
      answer:
        "Screening discussions, infection recurrences, menstrual changes, contraception counseling, and chronic pelvic pain initial workup, some exams remain local.",
    },
    {
      question: "How do I describe discharge or pain?",
      answer: "Note color, odor, timing with cycle, fever, and what you have already tried.",
    },
    {
      question: "Can STI concerns be discussed?",
      answer:
        "Yes, with guidance on testing and partner notification principles per local guidelines.",
    },
    {
      question: "Do you refill contraception online?",
      answer: "Only when follow-up and safety criteria are met per policy and law.",
    },
    {
      question: "What about pap results?",
      answer:
        "Bring the report text; we explain next steps and colposcopy indications when relevant.",
    },
    {
      question: "How do I escalate bleeding symptoms?",
      answer:
        "Soaking pads hourly, clots with dizziness, or postmenopausal bleeding, urgent local care.",
    },
  ],
  "menopause-wellness": [
    {
      question: "What symptoms suggest perimenopause or menopause?",
      answer:
        "Hot flashes, sleep disruption, mood changes, vaginal dryness, and cycle changes, pattern matters more than one symptom.",
    },
    {
      question: "Is HRT discussed online?",
      answer:
        "High-level education and risk framing yes; prescribing depends on assessment and jurisdiction.",
    },
    {
      question: "What about bone health?",
      answer: "We review risk factors and may suggest DEXA where appropriate locally.",
    },
    {
      question: "Can lifestyle reduce flashes?",
      answer:
        "Cooling strategies, caffeine/alcohol moderation, sleep hygiene, and strength training help some patients.",
    },
    {
      question: "When is bleeding abnormal after 40?",
      answer: "New heavy or intermenstrual bleeding needs evaluation, not assumed normal.",
    },
    {
      question: "How do I book?",
      answer: "WhatsApp or email with age, last period pattern, and current medications.",
    },
  ],
  "pelvic-floor-rehabilitation": [
    {
      question: "What is women's health physiotherapy?",
      answer:
        "Physio that integrates pelvic anatomy, exercise, and pain science for women across life stages.",
    },
    {
      question: "Do I need a physician referral?",
      answer: "Helpful for insurance; not always required privately, ask when booking.",
    },
    {
      question: "Can physio help prolapse symptoms?",
      answer:
        "Conservative rehab can improve comfort and function alongside gynecology; severe cases may need surgical consult.",
    },
    {
      question: "Are internal exams always required?",
      answer: "Not for every online visit, plans depend on symptoms and safety.",
    },
    {
      question: "Can I combine physio with Pilates?",
      answer: "Often yes, Dr. Zalak bridges both when appropriate.",
    },
    {
      question: "What if pain worsens with exercises?",
      answer: "Stop new exercises and message us; persistent worsening needs local assessment.",
    },
  ],
  "antenatal-postnatal-care": [
    {
      question: "What is postpartum recovery?",
      answer:
        "Healing from delivery, sleep debt, hormonal shifts, and gradual return to activity, timeline varies by birth mode and complications.",
    },
    {
      question: "When can I return to exercise after delivery?",
      answer:
        "Depends on delivery type, tears, blood loss, and clearance, your plan is staged, not rushed.",
    },
    {
      question: "What is diastasis recti?",
      answer:
        "A gap between the abdominal muscles after pregnancy; screening guides safe core work.",
    },
    {
      question: "Is leaking common postpartum?",
      answer: "Common but not something you must accept long term, physio and medical review help.",
    },
    {
      question: "Can Pilates help postpartum?",
      answer: "Often, once cleared and progressed safely.",
    },
    {
      question: "When is bleeding urgent after birth?",
      answer: "Soaking pads, large clots, fever, or foul smell, local emergency.",
    },
  ],
  "mat-pilates-online": [
    {
      question: "What is Mat Pilates online?",
      answer:
        "Live or structured home sessions using STOTT Mat principles, good when travel limits studio access.",
    },
    {
      question: "What equipment do I need?",
      answer: "Often a mat, light weights, and a stable chair; we adapt to your space on video.",
    },
    {
      question: "Is Mat Pilates safe in pregnancy?",
      answer: "With OB clearance and physio-led modifications for trimester and symptoms.",
    },
    {
      question: "Can beginners start online?",
      answer: "Yes, sessions start with fundamentals and breathing.",
    },
    {
      question: "How is progress tracked?",
      answer: "Through symptom logs, video check-ins, and periodic reassessment.",
    },
    {
      question: "How do I book?",
      answer: "WhatsApp or email referencing Mat Pilates online and your time zone.",
    },
  ],
  "stott-pilates": [
    {
      question: "What is different about STOTT vs general Pilates?",
      answer:
        "Emphasis on neutral alignment, muscular balance, and equipment-based progression on Reformer and Mat.",
    },
    {
      question: "Can I do Reformer online?",
      answer:
        "If you have access to a Reformer, remote coaching is possible; otherwise Mat-focused plans are common abroad.",
    },
    {
      question: "Who teaches STOTT here?",
      answer:
        "Dr. Zalak Shah is STOTT-trained for Mat and Reformer alongside women's health physiotherapy.",
    },
    {
      question: "Can STOTT help posture?",
      answer: "Often yes, through core and shoulder girdle education.",
    },
    {
      question: "Is STOTT safe with diastasis?",
      answer: "With assessment and modified spring or Mat progressions, not generic classes.",
    },
    {
      question: "How do I book STOTT-focused visits?",
      answer: "Mention STOTT Mat/Reformer and city or online preference when messaging.",
    },
  ],
  "musculoskeletal-physiotherapy": [
    {
      question: "Can physio help neck and shoulder pain?",
      answer: "Yes, ergonomics, mobility, and strengthening are common pillars.",
    },
    {
      question: "What about lower back pain?",
      answer: "Assessment differentiates muscle, joint, and nerve patterns before exercise dosing.",
    },
    {
      question: "Is imaging required first?",
      answer: "Not always, clinical exam and history guide when X-ray or MRI adds value.",
    },
    {
      question: "Can sessions be weekly online?",
      answer: "Often yes for exercise progression between flare-ups.",
    },
    {
      question: "When is pain an emergency?",
      answer: "Numb saddle area, new leg weakness, fever with back pain, local emergency.",
    },
    {
      question: "How do I book MSK physio with Dr. Zalak?",
      answer: "WhatsApp or email with pain location and aggravating activities.",
    },
  ],
  "core-functional-training": [
    {
      question: "Who is core training for?",
      answer:
        "Postpartum patients, athletes returning after injury, and women with chronic back pain, after screening.",
    },
    {
      question: "Will I get a home program?",
      answer: "Yes, written or video cues depending on what you prefer.",
    },
    {
      question: "How hard will sessions feel?",
      answer: "We aim for challenge without symptom flare, load is titrated.",
    },
    {
      question: "Can I combine with gym training?",
      answer: "Often, we coordinate volume and recovery.",
    },
    {
      question: "What if I have diastasis?",
      answer: "Core work is modified until width and tension improve.",
    },
    {
      question: "Booking path?",
      answer: "Message the practice for Dr. Zalak with “core / functional” in the subject.",
    },
  ],
  "womens-wellness-programs": [
    {
      question: "What are wellness programs here?",
      answer:
        "Structured blends of physio education and Pilates-informed movement for sustainable habits, not quick fixes.",
    },
    {
      question: "Are these medical treatment?",
      answer: "They complement medical care; they do not replace diagnosis for new symptoms.",
    },
    {
      question: "Can I join from any time zone?",
      answer:
        "Yes, slots are offered when clinicians are available; async homework may supplement live calls.",
    },
    {
      question: "How long is a typical block?",
      answer: "Often 6–12 weeks depending on goals, set in the first consult.",
    },
    { question: "Do I need equipment?", answer: "Minimal home items usually suffice; we adapt." },
    {
      question: "How to start?",
      answer: "WhatsApp or email with goals and any medical restrictions.",
    },
  ],
};
export function onlineServiceCityFaqs(
  service: SeoOnlineService,
  city: string,
  country: string,
): FaqItem[] {
  const doctorLabel =
    service.doctor === "charmi"
      ? "Dr. Charmi Shah (OB-GYN, IVF, laparoscopy)"
      : "Dr. Zalak Shah (women's health physiotherapy, STOTT / Mat Pilates online)";
  const shell = quadVirtualBooking({ serviceTitle: service.title, city, country, doctorLabel });
  const bodyRaw = SERVICE_BODY[service.slug] ?? SERVICE_BODY["gynecological-care"];
  const body = contextualizeOnlineServiceBodyFaqs(bodyRaw, {
    serviceTitle: service.title,
    shortTitle: service.shortTitle,
    city,
    country,
    doctorLabel,
  });
  return take10([...shell, ...body]);
}
export function virtualCityOverviewFaqs(city: string, country: string): FaqItem[] {
  return take10([
    {
      question: `How do I book an online consult from ${city}, ${country}?`,
      answer: `WhatsApp or email contact@womenshealthduo.com with “${city}, ${country}” in the first line, your time zone, and whether you need OB-GYN or physio/Pilates first. This ${city} overview page links to every service-specific URL for ${city}, and we route you to Dr. Charmi or Dr. Zalak from there.`,
    },
    {
      question: `Is telehealth from India effective if I live in ${city}, ${country}?`,
      answer: `Many patients in ${city} use these pages to book India-trained clinicians by video for education, medication review where legal, second opinions, and exercise coaching. Emergencies and some physical exams still belong with local services in ${country}, we document limits clearly on the ${city} city page.`,
    },
    {
      question: `Do both doctors offer video visits to ${city}, ${country}?`,
      answer: `Yes. From ${city}, Dr. Charmi Shah covers obstetrics, gynecology, fertility, and laparoscopy discussions online; Dr. Zalak Shah covers women's health physio, Mat Pilates online, and STOTT-oriented coaching. Open the service list on this ${city} page to pick the lane that matches your concern.`,
    },
    {
      question: `What languages can I use when booking from ${city}?`,
      answer: `English, Hindi, and Gujarati are commonly used. Mention ${city}, ${country}, and your language preference in the first WhatsApp or email so scheduling matches this page.`,
    },
    {
      question: `How fast will you reply to someone in ${city}?`,
      answer: `We reply during practice messaging hours for ${city}, ${country}. Urgent symptoms should go to your local emergency number in ${country}, not WhatsApp, even if you found us through this ${city} page.`,
    },
    {
      question: `Can I still see you in person if I start from ${city} online?`,
      answer: `Yes. Dr. Charmi sees patients in Mumbai, Ahmedabad, and Valsad; Dr. Zalak in Bangalore and Ahmedabad. Virtual care from ${city}, ${country} continues even if you never travel, this hub page stays your entry point.`,
    },
    {
      question: `Where are the ${city}-specific service pages?`,
      answer: `Scroll the “Online services in ${city}” list on this page. Each link opens a dedicated URL for that clinical topic in ${city}, ${country}, so search engines and patients see the same context you see here.`,
    },
    {
      question: `Do I need Indian insurance if I live in ${country}?`,
      answer: `Patients in ${city} often self-pay or use reimbursement rules from ${country}. Ask your insurer; we provide invoices when available and confirm payment modes at booking.`,
    },
    {
      question: `What if I only need exercise coaching from ${city}?`,
      answer: `From ${city}, choose Mat Pilates online, STOTT Pilates, or core programs under Dr. Zalak on this page's service list. Medical questions still go through appropriate screening first.`,
    },
    {
      question: `Where is the full FAQ beyond ${city}?`,
      answer: `See ${ROUTES.faq} for broader practice questions. This ${city}, ${country} page focuses on how virtual booking works from your metro.`,
    },
  ]);
}
export function virtualCountryFaqs(country: string): FaqItem[] {
  return take10([
    {
      question: `How do virtual consults work across ${country} on this site?`,
      answer: `This country hub for ${country} lists city pages inside ${country}. Pick the metro closest to you, read that city's overview, then open the service link that matches your concern. Booking stays the same WhatsApp and email process for every ${country} page.`,
    },
    {
      question: `Is online care the same quality everywhere in ${country}?`,
      answer: `Clinical standards for patients in ${country} match our India practice; only your local emergency resources differ by city. We document on each ${country} city page what must be done in person.`,
    },
    {
      question: `Can NRIs and expatriates use these ${country} pages?`,
      answer: `Yes. The ${country} hub is written for diaspora and expatriate families who want India-trained women's health clinicians by video while living in ${country}.`,
    },
    {
      question: `How do I choose a city page under ${country}?`,
      answer: `Choose the ${country} metro you identify with for clearer context; clinical service is still delivered online from India. Any listed ${country} city page links to the same booking path.`,
    },
    {
      question: `What if my ${country} city is not listed?`,
      answer: `Use another listed ${country} city hub or message us with your actual town. Virtual care does not require you to live in a named metro on this ${country} page.`,
    },
    {
      question: `How do you handle data for ${country} patients?`,
      answer: `We follow standard medical privacy expectations for telehealth booked through these ${country} URLs. Avoid sending passwords or unrelated personal data in open chats.`,
    },
    {
      question: `Can partners join fertility or pregnancy calls from ${country}?`,
      answer: `Yes. Mention that when you book from ${country} so we allocate time on the correct ${country} city workflow.`,
    },
    {
      question: `How do I pay from ${country}?`,
      answer: `Payment modes for ${country} patients are confirmed at booking. Ask on WhatsApp with your ${country} city and currency questions.`,
    },
    {
      question: `What about prescriptions for patients in ${country}?`,
      answer: `Issued only when clinically appropriate and legal for your situation in ${country}. Some medications cannot be prescribed remotely; we say so on the relevant service page.`,
    },
    {
      question: `Where is the medical disclaimer for ${country} readers?`,
      answer: `Linked from the footer on every page, including this ${country} hub. Read it alongside these ${country}-specific FAQs.`,
    },
  ]);
}
export function virtualHubFaqs(): FaqItem[] {
  return take10([
    {
      question: "What is this Virtual online consultations hub page?",
      answer:
        "This hub is the top-level directory of city and country URLs for patients abroad who want India-trained women's health clinicians by video, OB-GYN, IVF discussion, physio, and STOTT/Mat Pilates online. Start here, then drill into a city or country page.",
    },
    {
      question: "How do I start from this hub page?",
      answer:
        "Pick a city or country block below that matches where you live, open that page for local wording, then choose the service link that matches your clinical concern. Each deeper page keeps the same booking context.",
    },
    {
      question: "Is telehealth effective for women's health when I start from this hub?",
      answer:
        "Strong for education, follow-up, medication titration where legal, and supervised exercise. This hub explains routing; it does not replace emergency or hands-on care when your city page says you need local help.",
    },
    {
      question: "How do I book after browsing this hub?",
      answer:
        "WhatsApp or email with time zone and concern summary, same process linked from every city page you open from this hub.",
    },
    {
      question: "Which doctor is for pregnancy medical questions from this hub?",
      answer:
        "Dr. Charmi Shah as OB-GYN; Dr. Zalak Shah for movement, physio, and Pilates-led rehab. Your eventual city and service pages repeat that routing so the path stays clear.",
    },
    {
      question: "Does this hub only serve women?",
      answer:
        "The practice focuses on women's health; message on WhatsApp from this hub if you have a closely related referral question.",
    },
    {
      question: "What if I need urgent care after reading this hub?",
      answer:
        "Use your local emergency services where you physically are. This hub and child pages are not for emergencies.",
    },
    {
      question: "Are Shorts and Reels medical advice if I came from this hub?",
      answer:
        "No. Use the Learn hub for free education, then return to a city or service page from this hub to book personalized guidance.",
    },
    {
      question: "Where are India in-person cities linked from this hub?",
      answer:
        "See Ahmedabad, Mumbai, Valsad, and Bangalore city pages for hybrid and in-person options; those India pages complement the virtual URLs listed here.",
    },
    {
      question: "How private are video visits booked through this hub?",
      answer:
        "Use a private room and stable connection; we treat consults as confidential no matter which hub-linked page you book from.",
    },
  ]);
}
export function indiaCityFaqs(cityKey: CityKey, cityH1: string): FaqItem[] {
  const label = cityH1;
  return take10([
    {
      question: `How do I book in-person care in ${label}?`,
      answer: `For ${label}, WhatsApp or email with the doctor name, “${label}” in the subject, and whether you need OB-GYN or physio/Pilates first. We send clinic addresses, parking notes, and slot options that match this ${label} city page.`,
    },
    {
      question: `Can I still do video if I live in ${label}?`,
      answer: `Yes. Many ${label} patients mix in-person visits with online follow-ups for convenience; say “${label} + video” when you message so routing matches this page.`,
    },
    {
      question: `Is online follow-up as effective if my home base is ${label}?`,
      answer: `For stable chronic issues and rehab check-ins while you are in ${label}, video can be excellent. New severe symptoms still need in-person or emergency assessment near ${label}.`,
    },
    {
      question: `Which doctor is based in ${label} for in-person care?`,
      answer:
        cityKey === "mumbai"
          ? `On this ${label} page: Dr. Charmi Shah leads in-person OB-GYN care in Mumbai; Dr. Zalak Shah is primarily online from Mumbai listings with in-person studios in Bangalore and Ahmedabad.`
          : cityKey === "valsad"
            ? `On this ${label} page: Dr. Charmi Shah leads in-person OB-GYN care in Valsad; Dr. Zalak Shah is available online and in person in Bangalore and Ahmedabad.`
            : cityKey === "bangalore"
              ? `On this ${label} page: Dr. Zalak Shah sees patients in person in Bangalore; Dr. Charmi Shah is available online and in Mumbai, Ahmedabad, and Valsad in person.`
              : `On this ${label} page: both sisters see patients in Ahmedabad, Dr. Charmi for OB-GYN/IVF and Dr. Zalak for physio and STOTT Pilates.`,
    },
    {
      question: `Do you accept international travelers booking through ${label}?`,
      answer: `Yes. Families often combine travel to India with booked visits tied to ${label}; mention travel dates when you WhatsApp so this ${label} page context stays in the thread.`,
    },
    {
      question: `How do I send records for an appointment in ${label}?`,
      answer: `Email summaries or bring imaging to the ${label} visit; avoid unsecured links. Reference ${label} and the doctor name so staff matches this city page.`,
    },
    {
      question: `What about emergencies while I am in ${label}?`,
      answer: `Call the nearest hospital or labor unit in ${label}, do not rely on messaging for emergencies, even if you found us through this ${label} landing page.`,
    },
    {
      question: `Where are virtual diaspora pages if I split time outside ${label}?`,
      answer: `Open Virtual online consultations in the menu for global city SEO pages. This ${label} page stays your anchor for in-person care in India.`,
    },
    { question: `Is there a site-wide FAQ beyond ${label}?`, answer: `Yes, see ${ROUTES.faq}.` },
    {
      question: `How do Learn clips relate to ${label} visits?`,
      answer: `Use the Learn hub for free education; clinical decisions for ${label} still happen in booked consults linked from this page.`,
    },
  ]);
}
