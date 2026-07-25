import type { FaqItem } from "../siteFaq";
import type { TopicGuideClusterId, TopicGuideSection } from "./types";
const BOOKING_FAQ_COUNT = 3;
const CLUSTER_FAQ_COUNT = 7;
export const TOPIC_GUIDE_FAQ_TOTAL = BOOKING_FAQ_COUNT + CLUSTER_FAQ_COUNT;
type ClusterConfig = {
  /** Short clause for meta description */ metaBlurb: string;
  /** Default video hub topic labels (filtered to labels that exist on clips). */ defaultLearnTopics: string[];
  defaultConsult: "charmi" | "zalak" | "both";
  defaultServiceSlugs: string[];
  /** Two on-page knowledge sections; use {{title}} once per cluster where natural. */ buildSections: (
    title: string,
  ) => TopicGuideSection[];
  /** Rotated subset of 7 is taken per page; must have ≥7 items. */ faqPool: FaqItem[];
};
function bookingFaqs(title: string, consult: "charmi" | "zalak" | "both"): FaqItem[] {
  const routing =
    consult === "zalak"
      ? "For this topic we usually start with Dr. Zalak Shah (women's health physiotherapy / STOTT Pilates). If you also need OB-GYN input, we coordinate with Dr. Charmi Shah."
      : consult === "charmi"
        ? "For this topic we usually start with Dr. Charmi Shah (OB-GYN / IVF). If movement, pelvic floor, or Pilates planning is central, we may add Dr. Zalak Shah."
        : "Send a short summary and we will suggest whether Dr. Charmi Shah (OB-GYN / IVF) or Dr. Zalak Shah (women's health physiotherapy / STOTT Pilates) should see you first, sometimes both collaborate.";
  return [
    {
      question: `How do I book a consultation about ${title}?`,
      answer: `Message Women's Health Duo on WhatsApp or email contact@womenshealthduo.com with your city, country, time zone, and a one-line subject that mentions "${title}". Attach prior labs or reports if relevant. ${routing}`,
    },
    {
      question: `Is an online video visit enough for questions about ${title}?`,
      answer:
        "Video visits work well for education, follow-up, second opinions, and structured exercise planning when you can share history and documents. Some situations still need an in-person exam, urgent local care, or a hospital visit, we say so plainly when that applies.",
    },
    {
      question: "What should I send before the first call?",
      answer:
        "A brief timeline of symptoms, medications and supplements, prior ultrasound or lab PDFs (if any), and your goals for the visit. For movement visits, a short video of your space can help.",
    },
  ];
}
export function buildTopicGuideFaqs(
  slug: string,
  title: string,
  consult: "charmi" | "zalak" | "both",
  pool: FaqItem[],
): FaqItem[] {
  const booking = bookingFaqs(title, consult);
  if (pool.length < CLUSTER_FAQ_COUNT) {
    throw new Error(`Topic guide FAQ pool too small for slug=${slug}`);
  }
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h + slug.charCodeAt(i) * (i + 1)) % 997;
  const start = h % pool.length;
  const picked: FaqItem[] = [];
  for (let i = 0; i < pool.length && picked.length < CLUSTER_FAQ_COUNT; i++) {
    picked.push(pool[(start + i) % pool.length]!);
  }
  return [...booking, ...picked];
}
const CLUSTER_LIBRARY: Record<TopicGuideClusterId, ClusterConfig> = {
  pcos: {
    metaBlurb:
      "Clinician-led context on PCOS symptoms, cycles, and fertility, plus when to book an OB-GYN video consult.",
    defaultLearnTopics: ["Patient education", "Fertility"],
    defaultConsult: "charmi",
    defaultServiceSlugs: [
      "pcos-hormonal-disorders",
      "ivf-fertility-treatments",
      "gynecological-care",
    ],
    buildSections: (title) => [
      {
        heading: `Understanding ${title} in plain language`,
        paragraphs: [
          "Polycystic ovary syndrome (PCOS) is a common hormonal pattern that can affect ovulation, metabolism, skin, and hair. It is not one-size-fits-all: some people have irregular cycles, some have androgen-related symptoms, and some discover it while evaluating fertility.",
          "Education helps you recognize patterns (cycle length, acne, hair growth, weight change) and prepare better questions for your clinician. This page summarizes typical themes; your plan should still be individualized after history, exam when needed, and appropriate tests.",
        ],
      },
      {
        heading: "How we approach",
        paragraphs: [
          "Dr. Charmi Shah (OB-GYN and IVF) discusses cycle regulation, fertility pathways, ultrasound and lab interpretation in context, and shared decision-making about lifestyle and medical options where appropriate.",
          "When movement, weight-stigma–sensitive training, or pelvic symptoms overlap, we may coordinate with Dr. Zalak Shah (women's health physiotherapy / STOTT Pilates) for exercise planning alongside your medical team.",
        ],
      },
    ],
    faqPool: [
      {
        question: "What is PCOS?",
        answer:
          "PCOS is a hormonal condition that often features irregular ovulation or menstrual cycles alongside findings such as elevated androgen levels or polycystic-appearing ovaries on ultrasound, not everyone has cysts, and the name can be confusing.",
      },
      {
        question: "What are common symptoms of PCOS?",
        answer:
          "Irregular periods, acne, extra facial/body hair, scalp hair thinning, weight gain or difficulty losing weight, and fertility challenges are common, but symptoms vary widely between individuals.",
      },
      {
        question: "Can PCOS affect fertility?",
        answer:
          "Yes, especially when ovulation is infrequent or absent. Many people with PCOS still conceive naturally or with support; the right workup clarifies ovulation status and next steps.",
      },
      {
        question: "Does PCOS always show up on ultrasound?",
        answer:
          "No. Diagnosis is clinical and lab-based in context; ultrasound supports certain patterns but is not required for every person.",
      },
      {
        question: "Can lifestyle changes improve PCOS symptoms?",
        answer:
          "Sleep, stress, nutrition, and joyful movement can influence cycles and metabolic markers for some people. Medical management may still be appropriate, decisions belong in consultation.",
      },
      {
        question: "Is PCOS curable?",
        answer:
          "PCOS is a long-term tendency you manage, not a single event you erase. Many people feel much better with the right mix of education, lifestyle, and medical support.",
      },
      {
        question: "What tests might be discussed for PCOS?",
        answer:
          "Depending on your story, clinicians may discuss cycle tracking, hormone panels, metabolic screening, and ultrasound, chosen individually, not as a universal bundle.",
      },
      {
        question: "Can birth control affect how PCOS looks on tests?",
        answer:
          "Yes, hormonal contraception changes some lab patterns. Tell your clinician what you take and when; timing of tests matters.",
      },
      {
        question: "When should I seek urgent care for bleeding?",
        answer:
          "Soaking through pads hourly, dizziness, severe pain, fever, or pregnancy with bleeding are emergencies, use local urgent/emergency services.",
      },
      {
        question: "Can I get pregnant with PCOS?",
        answer:
          "Many people do. If cycles are irregular, ovulation tracking and a fertility-focused visit can clarify timing and options.",
      },
    ],
  },
  periods: {
    metaBlurb:
      "Irregular, painful, or heavy periods, what patterns mean and when telehealth vs urgent care is appropriate.",
    defaultLearnTopics: ["Patient education", "Pelvic floor", "Labor & delivery"],
    defaultConsult: "charmi",
    defaultServiceSlugs: ["gynecological-care", "laparoscopic-surgery", "pcos-hormonal-disorders"],
    buildSections: (title) => [
      {
        heading: `${title}: patterns worth noticing`,
        paragraphs: [
          "Periods are a vital sign: changes in timing, flow, pain, or spotting can reflect hormones, thyroid issues, pregnancy, fibroids, endometriosis, infections, perimenopause, and more, context matters.",
          "Mild variation month to month can be normal, but new severe pain, sudden heavy bleeding, bleeding after menopause, or symptoms with fever need timely medical attention.",
        ],
      },
      {
        heading: "What a consultation can clarify",
        paragraphs: [
          "Dr. Charmi Shah helps triage which symptoms fit watchful waiting, which need labs or imaging, and which require urgent in-person care, especially for international patients juggling multiple health systems.",
          "We do not diagnose from a webpage alone. We use your history, prior records, and clear advice on when to call your local doctor or go to emergency care if things worsen.",
        ],
      },
    ],
    faqPool: [
      {
        question: "What counts as a heavy period?",
        answer:
          "Clues include soaking through protection quickly, large clots, waking at night to change pads, anemia symptoms like fatigue or shortness of breath, or bleeding that limits daily life, tell a clinician.",
      },
      {
        question: "Why are painful periods not always 'normal'?",
        answer:
          "Some pain is common, but pain that keeps you from school/work, worsens over time, occurs with sex, or comes with abnormal bleeding deserves evaluation for conditions like endometriosis.",
      },
      {
        question: "Why might periods become irregular?",
        answer:
          "Stress, weight change, thyroid disorders, PCOS, perimenopause, pregnancy, medications, and other hormonal shifts are common causes, sometimes more than one overlaps.",
      },
      {
        question: "What is PMS?",
        answer:
          "Premenstrual syndrome describes emotional and physical symptoms in the days before a period that resolve when bleeding starts, severity varies.",
      },
      {
        question: "What is PMDD?",
        answer:
          "Premenstrual dysphoric disorder is a severe form of premenstrual mood and function change that often needs targeted treatment, worth discussing with a clinician.",
      },
      {
        question: "When is bleeding between periods concerning?",
        answer:
          "New persistent spotting, bleeding after sex, or postmenopausal bleeding should be evaluated, urgency depends on associated symptoms and pregnancy status.",
      },
      {
        question: "Can stress change my cycle?",
        answer:
          "Yes, stress can shift timing or flow for some people, but do not assume stress is the only cause if symptoms are new, severe, or persistent.",
      },
      {
        question: "How do I prepare for a telehealth visit about periods?",
        answer:
          "Track dates, flow (pads/tampons per day), pain scores, medications, and prior labs/imaging PDFs. Note pregnancy possibility.",
      },
      {
        question: "When should I go to emergency care for period problems?",
        answer:
          "Fainting, rapid heart rate, severe pain, fever, very heavy bleeding, or suspected pregnancy with pain/bleeding are emergencies.",
      },
    ],
  },
  hormones: {
    metaBlurb:
      "Hormonal symptoms in context, education and when to book an OB-GYN consult for evaluation and planning.",
    defaultLearnTopics: ["Patient education", "Pregnancy"],
    defaultConsult: "charmi",
    defaultServiceSlugs: ["pcos-hormonal-disorders", "menopause-wellness", "gynecological-care"],
    buildSections: (title) => [
      {
        heading: `${title}: hormones are a team sport`,
        paragraphs: [
          "Thyroid, prolactin, insulin resistance, stress hormones, reproductive hormones, and medications can all interact, patterns on labs need interpretation with your symptoms and exam when relevant.",
          "Online visits can organize timelines, review prior tests, and help you understand options; some situations still need in-person evaluation or repeat labs timed to your cycle.",
        ],
      },
      {
        heading: "How we keep advice grounded",
        paragraphs: [
          "Dr. Charmi focuses on evidence-informed explanations and clear next steps, including when supplements or internet trends are unlikely to help and when standard therapies deserve discussion.",
          "We are not a supplement shop, care stays within medical scope with appropriate referrals.",
        ],
      },
    ],
    faqPool: [
      {
        question: "What are signs of hormonal imbalance?",
        answer:
          "There is no single checklist, common themes include cycle changes, acne, hair changes, weight shifts, sleep disruption, hot flashes, mood changes, or galactorrhea. Context and testing guide the story.",
      },
      {
        question: "Do I need special hormone panels online?",
        answer:
          "Not usually as a shopping list. Your clinician should choose tests based on history; redundant panels can confuse more than they help.",
      },
      {
        question: "Can hormones affect sleep?",
        answer:
          "Yes, thyroid disorders, perimenopause night sweats, PMS/PMDD, pain, and stress can all disturb sleep; sometimes treating the underlying pattern helps.",
      },
      {
        question: "Can hormones affect skin and hair?",
        answer:
          "Androgen patterns can influence acne and hair growth; thyroid changes can affect hair shedding, evaluation prevents self-mislabeling.",
      },
      {
        question: "How does perimenopause differ from menopause?",
        answer:
          "Perimenopause is the transition window with fluctuating cycles and symptoms; menopause is 12 consecutive months without a period (for people with uteri) in the absence of other causes.",
      },
      {
        question: "Can lifestyle changes help hormonal symptoms?",
        answer:
          "Sleep, nutrition, stress skills, and movement often help symptoms and overall health; medical therapies may still be appropriate depending on goals and risks.",
      },
      {
        question: "When should I seek urgent care for hormonal-type symptoms?",
        answer:
          "Severe headache with vision changes in pregnancy, chest pain, neurologic deficits, or heavy bleeding with dizziness are emergencies.",
      },
      {
        question: "Can I discuss HRT online?",
        answer:
          "Education and screening discussions can start online; some plans require local blood pressure checks or exams depending on your region and history.",
      },
    ],
  },
  fertility: {
    metaBlurb:
      "Fertility education, timing, and IVF-oriented questions, plus how to book an OB-GYN/IVF video consult.",
    defaultLearnTopics: ["Fertility", "Patient education"],
    defaultConsult: "charmi",
    defaultServiceSlugs: [
      "ivf-fertility-treatments",
      "gynecological-care",
      "pregnancy-high-risk-obstetrics",
    ],
    buildSections: (title) => [
      {
        heading: `${title}: a practical framing`,
        paragraphs: [
          "Fertility is age- and partner-context dependent. Many couples benefit from cycle timing education, basic evaluation, and a clear plan for when to escalate testing or treatments.",
          "This guide is not a substitute for individualized medical advice; it helps you ask better questions and understand common pathways.",
        ],
      },
      {
        heading: "How Dr. Charmi Shah supports fertility conversations online",
        paragraphs: [
          "Discussions can cover preconception planning, ovulation tracking interpretation, prior workup review, IVF/IUI orientation, and second opinions on treatment plans, with documentation you upload.",
          "Procedures and stimulation monitoring still occur at accredited centers in person; telehealth helps you prepare and coordinate.",
        ],
      },
    ],
    faqPool: [
      {
        question: "How long should we try before seeing a specialist?",
        answer:
          "Guidelines vary by age and medical history. If cycles are irregular, endometriosis is suspected, or there are prior surgeries, earlier evaluation may be reasonable, ask your clinician.",
      },
      {
        question: "How can we track ovulation?",
        answer:
          "Calendar methods, LH kits, basal body temperature, and cervical mucus tracking each have pros/cons; your clinician can suggest what fits your cycle regularity and stress level.",
      },
      {
        question: "Can stress affect fertility?",
        answer:
          "Severe stress can disrupt cycles; moderate stress is common and not the sole cause for most couples. Still, mental health support matters while trying to conceive.",
      },
      {
        question: "What is preconception planning?",
        answer:
          "Optimizing medications, folic acid, vaccines where appropriate, chronic disease control, and reviewing genetic or lifestyle risks before pregnancy.",
      },
      {
        question: "What is IVF at a high level?",
        answer:
          "In vitro fertilization stimulates the ovaries (with monitoring), retrieves eggs, fertilizes them in the lab, grows embryos, and transfers one selected embryo to the uterus, steps vary by protocol and clinic.",
      },
      {
        question: "Can egg quality be improved?",
        answer:
          "Age is the dominant factor; some lifestyle changes may help overall health. Be cautious of marketing claims, ask what evidence supports any intervention.",
      },
      {
        question: "When is a second opinion reasonable?",
        answer:
          "After failed cycles, before major surgery, when diagnosis is unclear, or when you want a different communication style, telehealth can help organize records and questions.",
      },
      {
        question: "Do you prescribe stimulation medications online?",
        answer:
          "No, controlled ovarian stimulation requires an accredited center with monitoring. We can educate and help you understand plans coordinated locally.",
      },
    ],
  },
  "pregnancy-physio": {
    metaBlurb:
      "Pregnancy movement, discomforts, and safety, education plus Dr. Zalak's prenatal physio and Pilates consults online.",
    defaultLearnTopics: ["Pregnancy", "Exercise", "Workshop", "Patient education"],
    defaultConsult: "zalak",
    defaultServiceSlugs: ["antenatal-postnatal-care", "mat-pilates-online", "stott-pilates"],
    buildSections: (title) => [
      {
        heading: `${title}: movement with medical context`,
        paragraphs: [
          "Pregnancy changes posture, breathing, pelvic load, and circulation. Many aches are common, but some symptoms can signal preeclampsia, preterm labor, or other urgent problems. Your obstetrician should tell you which warning signs mean you need same-day care.",
          "Physiotherapy-oriented education focuses on graded exercise, pelvic girdle strategies, back care, breathing practice, and preparing for labor demands without fear-mongering.",
        ],
      },
      {
        heading: "How Dr. Zalak Shah supports prenatal goals online",
        paragraphs: [
          "Video sessions can review your home space, modify exercises, teach breathing and relaxation skills, and progress strength safely when your obstetric team clears activity.",
          "We coordinate with OB-GYN care when red-flag symptoms appear and refer you to urgent local services if needed.",
        ],
      },
    ],
    faqPool: [
      {
        question: "Is exercise safe during pregnancy for most people?",
        answer:
          "For uncomplicated pregnancies, moderate exercise is commonly encouraged, exceptions exist, so confirm with your obstetric clinician, especially with heart/lung disease, bleeding, or preterm labor risk.",
      },
      {
        question: "Which exercises are commonly modified in pregnancy?",
        answer:
          "Supine positions after mid-pregnancy, heavy Valsalva straining, high fall-risk activities, and hot yoga environments are often adjusted, individualization matters.",
      },
      {
        question: "Why does back pain happen in pregnancy?",
        answer:
          "Hormonal softening of ligaments, shifting center of gravity, and muscle fatigue contribute, targeted strengthening, posture cues, and support garments sometimes help.",
      },
      {
        question: "Why does pelvic pain happen in pregnancy?",
        answer:
          "Pelvic girdle irritation, round ligament discomfort, and hip muscle imbalance are common themes, physio strategies differ from red-flag causes that need urgent evaluation.",
      },
      {
        question: "Are breathing exercises useful for labor?",
        answer:
          "Many people benefit from paced breathing, relaxation, and partner-assisted coping skills, practice ahead of time improves confidence.",
      },
      {
        question: "Is Pilates safe during pregnancy?",
        answer:
          "Often yes when modified by a qualified clinician for pregnancy, especially after screening for diastasis risk, pelvic floor symptoms, and obstetric contraindications.",
      },
      {
        question: "What are common pregnancy discomforts that are usually benign?",
        answer:
          "Mild swelling, nasal congestion, heartburn, round ligament twinges, and fatigue are frequent, still report sudden swelling, headache, vision changes, or decreased fetal movement urgently.",
      },
      {
        question: "Can online prenatal physio replace in-person care?",
        answer:
          "It can complement care well for exercise coaching and education; hands-on assessment may still be needed locally for some pelvic diagnoses.",
      },
    ],
  },
  postpartum: {
    metaBlurb:
      "Postpartum recovery, core healing, and leakage, education plus women's health physio consults online.",
    defaultLearnTopics: ["Pregnancy", "Pelvic floor", "Patient education", "Labor & delivery"],
    defaultConsult: "zalak",
    defaultServiceSlugs: ["antenatal-postnatal-care", "pelvic-floor-rehabilitation"],
    buildSections: (title) => [
      {
        heading: `${title}: recovery is nonlinear`,
        paragraphs: [
          "After birth, sleep debt, hormonal shifts, tissue healing, and new movement demands stack together. Some symptoms improve quickly; others, like pelvic pain or diastasis, benefit from graded rehab.",
          "Tell your clinician about fever, heavy bleeding, chest pain, calf swelling, or thoughts of self-harm, these need urgent pathways, not exercise tips alone.",
        ],
      },
      {
        heading: "How Dr. Zalak Shah supports postpartum goals",
        paragraphs: [
          "Consultations can cover safe return-to-exercise timelines after vaginal or cesarean birth (once cleared), diastasis screening strategies, pelvic floor coordination, and back/pelvic pain plans.",
          "We emphasize collaboration with your OB-GYN or primary care clinician, especially if symptoms suggest infection or orthopedic red flags.",
        ],
      },
    ],
    faqPool: [
      {
        question: "How long does postpartum recovery take?",
        answer:
          "It varies by delivery mode, complications, sleep, nutrition, and goals, some tissues need weeks, while strength and endurance may take months.",
      },
      {
        question: "When can I exercise after delivery?",
        answer:
          "Follow your obstetric clinician's clearance, often gradual walking starts early, while higher-load training waits longer, especially after cesarean or complications.",
      },
      {
        question: "What is diastasis recti?",
        answer:
          "A widening between the rectus abdominis muscles is common in pregnancy; many improve with time and rehab, while some need longer guided progression.",
      },
      {
        question: "How can I check for diastasis at home?",
        answer:
          "Gentle self-palpation along the midline while lifting the head can hint at separation, but interpretation is easy to get wrong, physio guidance helps avoid harmful crunching strategies.",
      },
      {
        question: "Can diastasis heal naturally?",
        answer:
          "Many people improve substantially with time and appropriate loading; others need longer supervised rehab, surgery is uncommon and case-specific.",
      },
      {
        question: "Why am I leaking urine after childbirth?",
        answer:
          "Pelvic floor weakness, swelling, constipation, and infection can contribute, persistent leakage should be evaluated; some cases need pelvic floor therapy or medical treatment.",
      },
      {
        question: "What helps postpartum back pain?",
        answer:
          "Feeding posture, carrier ergonomics, hip mobility, gradual core reloading, and sleep support strategies are common themes, red flags need medical review.",
      },
      {
        question: "What helps postpartum pelvic pain?",
        answer:
          "Pelvic floor relaxation vs strengthening depends on assessment; hip and abdominal coordination often matters, avoid pushing through severe pain.",
      },
    ],
  },
  pelvic: {
    metaBlurb:
      "Pelvic floor symptoms and therapy, education plus virtual pelvic floor rehab consults with Dr. Zalak Shah.",
    defaultLearnTopics: ["Pelvic floor", "Patient education", "Pregnancy"],
    defaultConsult: "zalak",
    defaultServiceSlugs: ["pelvic-floor-rehabilitation", "antenatal-postnatal-care"],
    buildSections: (title) => [
      {
        heading: `${title}: pelvic health is more than Kegels`,
        paragraphs: [
          "The pelvic floor supports bladder and bowel function, sexual comfort, and core stability. Symptoms can come from underactivity, overactivity, pain syndromes, or postpartum changes, and the right treatment differs.",
          "Self-treatment can sometimes worsen urgency or pain if the floor is overactive; assessment helps match exercises to the actual pattern.",
        ],
      },
      {
        heading: "What pelvic floor therapy can (and cannot) do online",
        paragraphs: [
          "Video visits can teach coordination, breathing, graded exercise, how to keep a bladder diary, and which symptoms mean you should seek urgent local care. Some conditions still need an in-person exam or a urogynecology visit.",
          "Dr. Zalak Shah provides women's health physiotherapy–oriented education and exercise progression with clear medical collaboration.",
        ],
      },
    ],
    faqPool: [
      {
        question: "What is pelvic floor dysfunction?",
        answer:
          "A broad term for symptoms like leakage, urgency, prolapse sensations, pelvic pain, or painful intercourse, causes range from weakness to tension to nerve sensitivity.",
      },
      {
        question: "Why do I leak urine when I cough?",
        answer:
          "Stress incontinence often relates to pressure management during cough/sneeze/lift, training may include timing, breathing, and strength, but red-flag causes need evaluation.",
      },
      {
        question: "Are Kegels right for everyone?",
        answer:
          "No, if the pelvic floor is tight or painful, more squeezing can worsen symptoms. Assessment guides whether relaxation, down-training, or strengthening fits.",
      },
      {
        question: "What is pelvic organ prolapse?",
        answer:
          "A descent of pelvic organs that can feel like heaviness or bulge, severity and bother vary; management ranges from rehab to devices to surgery depending on goals.",
      },
      {
        question: "Can pelvic floor therapy help painful intercourse?",
        answer:
          "Often yes as part of a broader plan that may include pain science education, dilator progression when appropriate, and medical evaluation for infections or dermatologic conditions.",
      },
      {
        question: "How do I know if my pelvic floor is weak?",
        answer:
          "Leakage or reduced sensation can suggest weakness, but symptoms overlap with other conditions, self-diagnosis is unreliable.",
      },
      {
        question: "Can pelvic floor therapy help bladder leakage?",
        answer:
          "Many people improve with structured training and behavioral strategies; some cases need medications or procedures coordinated with a physician.",
      },
      {
        question: "What happens during a pelvic floor assessment?",
        answer:
          "In person, clinicians may use palpation or internal exam when indicated and consented. Online, assessment relies on history, movement screening, symptom patterns, and external observation.",
      },
    ],
  },
  physio: {
    metaBlurb:
      "Women's health physiotherapy, pelvic, pregnancy, and posture, plus online sessions with Dr. Zalak Shah.",
    defaultLearnTopics: [
      "Patient education",
      "Pilates",
      "STOTT Pilates",
      "Pelvic floor",
      "Pregnancy",
    ],
    defaultConsult: "zalak",
    defaultServiceSlugs: [
      "antenatal-postnatal-care",
      "pelvic-floor-rehabilitation",
      "mat-pilates-online",
    ],
    buildSections: (title) => [
      {
        heading: `${title}: what women's health physiotherapy means here`,
        paragraphs: [
          "Women's health physiotherapy addresses conditions common across the lifespan: pregnancy and postpartum recovery, pelvic pain, incontinence when medically appropriate, diastasis-oriented rehab, and return to activity.",
          "Care is individualized and often combines education, exercise, and pacing, hands-on techniques may be part of in-person visits when available.",
        ],
      },
      {
        heading: "Online vs in-person physiotherapy",
        paragraphs: [
          "Video visits excel at exercise coaching, habit change, and follow-up. Some assessments still benefit from local hands-on care; we tell you when that is the case.",
          "Dr. Zalak Shah also teaches STOTT Pilates and Mat Pilates online where clinically appropriate.",
        ],
      },
    ],
    faqPool: [
      {
        question: "Who needs women's health physiotherapy?",
        answer:
          "Anyone with pregnancy/postpartum goals, pelvic floor symptoms cleared for rehab, pelvic or low back pain patterns linked to posture, or diastasis questions may benefit, referrals depend on region and insurer.",
      },
      {
        question: "Can physiotherapy help with back pain?",
        answer:
          "Often yes through mobility, strength, and load-management strategies, red flags like numbness in the saddle area or bowel/bladder retention need emergency care.",
      },
      {
        question: "Can physiotherapy help with pelvic pain?",
        answer:
          "Yes for many musculoskeletal contributors; gynecologic causes still need medical diagnosis when suspected.",
      },
      {
        question: "Can physiotherapy help after childbirth?",
        answer:
          "Yes, common focuses include scar mobility after cesarean (when healed), gradual core reloading, pelvic floor coordination, and return-to-run plans when ready.",
      },
      {
        question: "Can physiotherapy help with bladder leakage?",
        answer:
          "Behavioral strategies and pelvic floor training help many people; persistent symptoms warrant physician evaluation.",
      },
      {
        question: "Can physiotherapy improve posture?",
        answer:
          "Yes, cueing, strength, and mobility around the thorax, hips, and feet often reduce strain on the neck and lower back.",
      },
      {
        question: "What happens during a physiotherapy session online?",
        answer:
          "History review, movement screening, exercise teaching, progression planning, and homework, sometimes short movement tests you film for feedback.",
      },
      {
        question: "Do I need a referral?",
        answer:
          "Depends on country and insurance; private-pay telehealth often does not require one, but we welcome physician coordination.",
      },
    ],
  },
  pilates: {
    metaBlurb:
      "STOTT Pilates and pregnancy-safe movement, education plus Mat/Reformer and online Pilates consults.",
    defaultLearnTopics: ["STOTT Pilates", "Pilates", "Pregnancy", "Exercise"],
    defaultConsult: "zalak",
    defaultServiceSlugs: ["stott-pilates", "mat-pilates-online", "antenatal-postnatal-care"],
    buildSections: (title) => [
      {
        heading: `${title}: Pilates as a tool, not a trend`,
        paragraphs: [
          "STOTT Pilates emphasizes alignment, breath, and controlled loading, useful for many women's health goals when adapted to pregnancy, postpartum, or pelvic symptoms.",
          "Pilates complements medical care; it does not replace evaluation for pain, prolapse, or pregnancy complications.",
        ],
      },
      {
        heading: "How Dr. Zalak Shah teaches Pilates in context",
        paragraphs: [
          "Sessions integrate physiotherapy reasoning with STOTT Pilates principles, progressions respect diastasis, pelvic floor symptoms, and obstetric guidance.",
          "Online sessions work when space and equipment are reviewed on video and cues are clear.",
        ],
      },
    ],
    faqPool: [
      {
        question: "What is STOTT Pilates?",
        answer:
          "A contemporary Pilates method focusing on neutral alignment, joint safety, and progressive core training on Mat and Reformer.",
      },
      {
        question: "Is online Pilates effective?",
        answer:
          "It can be for motivated clients with clear cueing and safe progressions, limitations exist for hands-on correction and complex pain cases.",
      },
      {
        question: "Can Pilates help with back pain?",
        answer:
          "Often yes through trunk and hip strengthening and posture habits, persistent or radicular pain needs medical assessment.",
      },
      {
        question: "Can Pilates strengthen the core?",
        answer:
          "Yes when dosed appropriately, especially with breath coordination and avoiding doming strategies that worsen diastasis.",
      },
      {
        question: "How often should I do Pilates?",
        answer:
          "Common plans range from two to four sessions weekly depending on goals, fatigue, and other training, your clinician personalizes this.",
      },
      {
        question: "Is Pilates safe in pregnancy?",
        answer:
          "Modified Pilates is commonly used in uncomplicated pregnancies after clearance, avoid overheating, lying flat late in pregnancy if symptomatic, and high fall-risk moves.",
      },
      {
        question: "Can I start Pilates as a beginner online?",
        answer:
          "Yes with foundational pacing and camera angles that show alignment, start simpler than social media suggests.",
      },
      {
        question: "What equipment do I need at home?",
        answer:
          "Mat, stable chair, light weights or bands, and sometimes a small ball, Reformer work may be in-studio depending on access.",
      },
    ],
  },
  "gyn-general": {
    metaBlurb:
      "Women's health questions, when to seek care, what to expect, and how to book an OB-GYN video consult.",
    defaultLearnTopics: ["Patient education", "Fertility"],
    defaultConsult: "charmi",
    defaultServiceSlugs: ["gynecological-care", "menopause-wellness", "ivf-fertility-treatments"],
    buildSections: (title) => [
      {
        heading: `${title}: education plus real medical follow-through`,
        paragraphs: [
          "Women's health spans adolescence through menopause: periods, infections, screening, sexual health, fertility, pregnancy planning, and midlife symptoms. Good information reduces anxiety and prevents delays in necessary care.",
          "This page cannot diagnose or prescribe; it helps you recognize when telehealth is reasonable and when local urgent or in-person evaluation is essential.",
        ],
      },
      {
        heading: "How Dr. Charmi Shah supports general gynecology questions online",
        paragraphs: [
          "Video visits can review symptoms, explain options, interpret prior reports, and help you prepare for procedures done locally.",
          "We spell out red flags in plain language: when to call emergency services in your country and when routine follow-up is enough.",
        ],
      },
    ],
    faqPool: [
      {
        question: "When should I see a gynecologist?",
        answer:
          "For new pelvic pain, abnormal bleeding, pregnancy planning, screening discussions, infections, menopause symptoms, or fertility concerns, earlier if symptoms are severe.",
      },
      {
        question: "What symptoms should never be ignored?",
        answer:
          "Heavy bleeding with dizziness, fever with pelvic pain, postmenopausal bleeding, severe sudden pain, suspected pregnancy with pain/bleeding, or new neurologic symptoms, seek urgent care.",
      },
      {
        question: "How often are checkups needed?",
        answer:
          "Intervals depend on age, pregnancy status, medical history, and local guidelines, ask your clinician for a personalized schedule.",
      },
      {
        question: "Can I see a gynecologist if I'm not pregnant?",
        answer:
          "Absolutely, gynecology covers the full spectrum of reproductive and pelvic health beyond pregnancy.",
      },
      {
        question: "How do hormones affect women's health broadly?",
        answer:
          "Reproductive hormones interact with metabolism, mood, skin, and bone health, patterns matter more than single lab numbers in isolation.",
      },
      {
        question: "How does stress affect women's health?",
        answer:
          "Stress can disturb sleep, cycles, pain perception, and blood pressure, supportive care and practical coping tools are part of whole-person care.",
      },
      {
        question: "How does sleep affect hormones?",
        answer:
          "Poor sleep can worsen insulin resistance signals, appetite regulation, pain, and mood, improving sleep hygiene is a legitimate medical talking point.",
      },
      {
        question: "How does exercise improve women's health?",
        answer:
          "Regular movement supports mood, bone density, cardiovascular risk, metabolic health, and many pelvic symptoms when progressed safely.",
      },
    ],
  },
  "online-gyne": {
    metaBlurb:
      "Online gynecologist visits, what works on video, how booking works, and when you still need local in-person care.",
    defaultLearnTopics: ["Patient education", "Fertility"],
    defaultConsult: "charmi",
    defaultServiceSlugs: [
      "gynecological-care",
      "ivf-fertility-treatments",
      "pcos-hormonal-disorders",
    ],
    buildSections: (title) => [
      {
        heading: `${title}: telehealth with clear boundaries`,
        paragraphs: [
          "Many gynecology questions, cycle changes, fertility planning, ultrasound review, PCOS education, menopause options, and postoperative questions, fit video visits when records are shared.",
          "Pelvic exams, biopsies, deliveries, and emergencies remain in-person. We tell you plainly which bucket your concern fits.",
        ],
      },
      {
        heading: "Why patients book Dr. Charmi Shah online from abroad",
        paragraphs: [
          "Continuity with an India-trained OB-GYN can help NRIs and international families interpret reports, prepare questions for local specialists, or discuss IVF pathways with fewer misunderstandings.",
          "Booking is via WhatsApp or email with time zone and document sharing up front.",
        ],
      },
    ],
    faqPool: [
      {
        question: "Can an online gynecologist prescribe medications?",
        answer:
          "Sometimes, depending on your region's telehealth laws, medication class, and whether an in-person relationship is required, your clinician explains what is possible in your case.",
      },
      {
        question: "Can I get a Pap smear online?",
        answer: "No, screening that requires a speculum exam needs an in-person clinician locally.",
      },
      {
        question: "Is online care private?",
        answer:
          "Use secure channels for medical information; avoid sharing protected health details in public social comments.",
      },
      {
        question: "What if I need an ultrasound?",
        answer:
          "We can order through affiliated networks where available; otherwise we help you request the right study locally and interpret results once uploaded.",
      },
      {
        question: "Do you offer second opinions online?",
        answer:
          "Yes, organized review of notes and imaging with a clear written summary of questions to ask your local team is a common use case.",
      },
      {
        question: "How quickly can I get an appointment?",
        answer:
          "Timing varies by load and urgency; message with your time zone and whether you are pregnant or bleeding heavily (triage may direct you to emergency care).",
      },
      {
        question: "What languages are available?",
        answer:
          "English, Hindi, and Gujarati are commonly used, state your preference when booking.",
      },
      {
        question: "What if I live in a country you do not list on city pages?",
        answer:
          "Many patients book from countries beyond our marketing hubs, online visits are worldwide with the same WhatsApp/email intake.",
      },
    ],
  },
};
export function clusterConfig(id: TopicGuideClusterId): ClusterConfig {
  return CLUSTER_LIBRARY[id];
}
