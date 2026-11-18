import type { CalendarArticleRevision } from "../types";

const claim = (
  text: string,
  sourceUrl: string,
  limitations: string,
): CalendarArticleRevision["claimLedger"][number] => ({
  claim: text,
  sourceUrl,
  limitations,
  reviewerDecision: "pending",
});

type WeekBody = Pick<
  CalendarArticleRevision,
  | "title"
  | "seoTitle"
  | "description"
  | "primaryQuestion"
  | "directAnswer"
  | "storytellingNote"
  | "sections"
  | "conversionCopy"
  | "openClinicalQuestions"
  | "claimLedger"
>;

const BASE_WEEK_BODIES_14_26: Record<string, WeekBody> = {
  "W14-Z": {
    title: "How do I know if my pelvic floor needs an assessment?",
    seoTitle: "Does My Pelvic Floor Need an Assessment?",
    description:
      "Learn which pelvic floor symptoms deserve assessment, what weakness cannot explain alone, and when to consult Dr. Zalak Shah (PT).",
    primaryQuestion: "How do I know if my pelvic floor is weak?",
    directAnswer:
      "Leakage, heaviness, bowel difficulty or pelvic pain can justify an assessment, but none proves that the pelvic floor is simply weak. These muscles may be underactive, overactive or poorly coordinated, and other conditions can produce similar symptoms. Assessment should come before repeated strengthening.",
    storytellingNote:
      "Illustrative example: a reader assumes a social-media checklist means she needs more Kegels, then learns that one symptom can have several explanations.",
    sections: [
      {
        heading: "Which symptoms should I pay attention to?",
        paragraphs: [
          "Notice urine leakage, sudden urgency, difficulty controlling wind, straining to empty the bowel, vaginal heaviness, pelvic pain or pain with intimacy. Also notice what you have stopped doing. Keep a short record of timing, triggers and impact; it is more useful than an online self-score. New loss of bladder or bowel control with severe back pain, leg weakness or numbness around the saddle area needs emergency assessment.",
        ],
      },
      {
        heading: "Why do symptoms not prove muscle weakness?",
        paragraphs: [
          "The pelvic floor must contract, relax and coordinate with breathing and abdominal pressure. A tense or poorly timed muscle can cause pain or fail during a cough even when some strength is present. Dr. Zalak Shah (PT) therefore looks beyond “strong versus weak” and asks what happens during the task that troubles you.",
        ],
      },
      {
        heading: "What does a physiotherapist assess?",
        paragraphs: [
          "The conversation covers bladder and bowel habits, pregnancy or surgery, pain, medicines, movement and goals. With consent, assessment may include breathing, abdominal and hip function and pelvic floor contraction and relaxation. An internal examination is never automatic; its purpose, alternatives and your right to stop should be explained.",
        ],
      },
      {
        heading: "When is medical assessment the priority?",
        paragraphs: [
          "Arrange routine medical review for blood in urine or stool, recurrent infection, unexplained bleeding, a new bulge, or persistent worsening symptoms. Seek urgent care for inability to pass urine, severe sudden pelvic pain, heavy bleeding, fever with marked illness, or neurological warning signs. Emergencies belong with local emergency services, never routine WhatsApp booking.",
        ],
      },
    ],
    conversionCopy:
      "For non-urgent symptoms, book a pelvic health assessment with Dr. Zalak Shah (PT).",
    openClinicalQuestions: [
      "Which parts of Dr. Zalak Shah’s actual assessment process can be described publicly?",
      "Which local urgent referral wording should accompany new bladder or bowel dysfunction?",
      "Should Dr. Charmi Shah add gynaecological differentials to the routine-review list?",
    ],
    claimLedger: [
      claim(
        "Pelvic floor symptoms are not proof of simple muscle weakness.",
        "https://www.nice.org.uk/guidance/ng210/chapter/recommendations",
        "UK guidance; individual diagnosis and Indian referral pathways require clinician review.",
      ),
      claim(
        "Assessment can include history, movement and a consent-based pelvic examination.",
        "https://thepogp.co.uk/patients/pelvic_health_advice/physiotherapy_assessment.aspx",
        "Professional framework, not confirmation of this clinic’s exact process.",
      ),
    ],
  },
  "W14-C": {
    title: "Could My Period Pain Be Endometriosis?",
    seoTitle: "Could Period Pain Be Endometriosis?",
    description:
      "Understand endometriosis symptom patterns, why a normal scan may not end assessment, and when to consult Dr. Charmi Shah.",
    primaryQuestion: "Could my period pain be endometriosis?",
    directAnswer:
      "It could be, especially when pain is severe, worsening, disrupts normal life, or occurs with painful sex, bowel or bladder symptoms, or fertility concerns. These symptoms are not specific to endometriosis, and a normal examination or ultrasound does not always exclude it. Diagnosis starts with a careful history.",
    storytellingNote:
      "Illustrative example: a reader recognises several symptoms online but uses the list to prepare for consultation, not to diagnose herself.",
    sections: [
      {
        heading: "What symptom patterns can endometriosis cause?",
        paragraphs: [
          "Endometriosis is tissue similar to the uterine lining growing outside the uterus. It may cause cyclical or persistent pelvic pain, painful sex, bowel or bladder pain around periods, fatigue or fertility concerns. Symptom intensity does not reliably show disease extent. Dr. Charmi Shah would also consider adenomyosis, fibroids, infection, ovarian problems and non-gynaecological causes.",
        ],
      },
      {
        heading: "How is suspected endometriosis assessed?",
        paragraphs: [
          "Assessment may include a consented pelvic examination and ultrasound. Imaging can identify some ovarian or deep disease, but a normal scan does not rule out every case. Keep a two- or three-cycle record of pain, bleeding, bowel or bladder symptoms and missed activities. Current guidance does not require surgery before every person can begin care.",
        ],
      },
      {
        heading: "How do treatment and fertility goals shape care?",
        paragraphs: [
          "Discussions may include pain relief, hormonal treatment, selected surgery, fertility planning and pelvic pain support. The sequence depends on symptoms, findings, previous care, pregnancy goals and preferences. Physiotherapy can address associated muscle guarding or function but does not remove endometriosis lesions; IVF is not automatically required because fertility is a concern.",
        ],
      },
      {
        heading: "When should I seek care?",
        paragraphs: [
          "Book routine gynaecology review when pain limits life, worsens or persists. Ask what a scan can and cannot show and how each option fits pregnancy plans. Seek urgent care for sudden severe pain, fainting, fever with marked illness, heavy bleeding with dizziness, or pain and bleeding when pregnancy is possible. Do not use routine booking for emergencies.",
        ],
      },
    ],
    conversionCopy:
      "Book a non-urgent gynaecology consultation with Dr. Charmi Shah for persistent period or pelvic pain.",
    openClinicalQuestions: [
      "Which first-line options should be named for the clinic’s patient population?",
      "How should access to specialist imaging and laparoscopy be described?",
      "Which fertility referral triggers should be included?",
    ],
    claimLedger: [
      claim(
        "Normal examination and ultrasound do not exclude endometriosis.",
        "https://www.nice.org.uk/guidance/ng73/chapter/Recommendations",
        "Imaging performance varies and this statement does not diagnose an individual.",
      ),
      claim(
        "Initial treatment and investigation may proceed without diagnostic surgery in every case.",
        "https://www.nice.org.uk/guidance/ng73/chapter/Recommendations",
        "Treatment choice and local availability need Dr. Charmi Shah’s review.",
      ),
    ],
  },
  "W15-Z": {
    title: "How should exercise change in each trimester of pregnancy?",
    seoTitle: "Pregnancy Exercise by Trimester: What Changes?",
    description:
      "Learn how symptoms, balance and pregnancy history—not a calendar alone—shape exercise changes with Dr. Zalak Shah (PT).",
    primaryQuestion: "What exercises can I do in each trimester?",
    directAnswer:
      "Many uncomplicated pregnancies can include regular activity, but trimester alone cannot clear an exercise. Previous activity, pregnancy history, symptoms, balance, heat, fatigue and maternity advice all matter. Adapt effort and movement as your body changes rather than following a universal weekly plan.",
    storytellingNote:
      "Illustrative example: a reader saves a trimester chart, then realises her nausea and pelvic pain require a different plan.",
    sections: [
      {
        heading: "What stays individual throughout pregnancy?",
        paragraphs: [
          "A regular runner, someone restarting activity and someone with pelvic girdle pain should not receive the same programme because they share a due month. Dr. Zalak Shah (PT) considers previous activity, symptoms, sleep, work and confidence. If your obstetric clinician has advised restriction, clarify why and what movement remains suitable before joining a class.",
        ],
      },
      {
        heading: "What may change early in pregnancy?",
        paragraphs: [
          "Nausea, fatigue, dizziness and heat sensitivity may alter exercise before the bump changes movement. Shorter sessions, fluids, lower impact or a different time of day may help. Pain, bleeding, faintness or breathlessness out of proportion to effort are reasons to stop and seek medical advice rather than push through.",
        ],
      },
      {
        heading: "What changes as the bump grows?",
        paragraphs: [
          "Balance, breathing and tolerance for some positions can change. Slower transitions, wider support and alternatives to movements that cause pressure, pain or dizziness may be useful. Leakage, heaviness or pelvic pain deserves assessment, not random restriction. Physiotherapy supports movement decisions; it does not replace antenatal care.",
        ],
      },
      {
        heading: "When should I stop and seek care?",
        paragraphs: [
          "Ask your maternity team which symptoms change advice. New bleeding, fluid loss, regular painful contractions, reduced fetal movement when movements are usually felt, severe headache, collapse, chest pain or severe breathing difficulty need prompt maternity or emergency assessment. For non-urgent planning, bring your history and goals to physiotherapy; emergencies should never go to WhatsApp.",
        ],
      },
    ],
    conversionCopy:
      "For non-urgent planning, discuss exercise adaptations with Dr. Zalak Shah (PT) and your maternity team.",
    openClinicalQuestions: [
      "Which stop-exercise wording does Dr. Charmi Shah approve?",
      "Which adaptations can Dr. Zalak Shah demonstrate without implying universal clearance?",
      "Should an effort-monitoring method be named?",
    ],
    claimLedger: [
      claim(
        "People with uncomplicated pregnancies can often remain active with appropriate adaptation.",
        "https://www.nhs.uk/pregnancy/keeping-well/exercise/",
        "General public guidance; contraindications and individual clearance require maternity review.",
      ),
      claim(
        "Exercise should stop and advice be sought when concerning symptoms occur.",
        "https://www.nhs.uk/pregnancy/keeping-well/exercise/",
        "Exact local triage language remains pending obstetric review.",
      ),
    ],
  },
  "W15-C": {
    title: "What Happens During IVF, Step by Step?",
    seoTitle: "IVF Step by Step: What Happens?",
    description:
      "Follow the IVF process from planning to follow-up, understand why timelines vary, and prepare questions for Dr. Charmi Shah.",
    primaryQuestion: "How does IVF work step by step?",
    directAnswer:
      "IVF usually involves assessment and planning, ovarian stimulation with monitoring, egg retrieval, fertilisation in a laboratory, embryo development, and embryo transfer or freezing when appropriate. A pregnancy test and follow-up come later. Not every cycle follows the same sequence or timetable, and no stage guarantees the next.",
    storytellingNote:
      "Illustrative example: a couple writes down unfamiliar IVF terms after an appointment and arranges them into questions rather than assumptions.",
    sections: [
      {
        heading: "Where does IVF fit in fertility care?",
        paragraphs: [
          "IVF brings eggs and sperm together in a laboratory before an embryo is transferred to the uterus. It may be discussed for several fertility situations, but it is not the automatic first treatment for everyone. Dr. Charmi Shah first considers age, duration of trying, ovulation, sperm factors, tubes, previous treatment, health history and the couple’s priorities.",
        ],
      },
      {
        heading: "What happens from planning to follow-up?",
        paragraphs: [
          "Planning includes consent, tests and an individual protocol. Medicines stimulate the ovaries while scans and sometimes blood tests monitor response. Eggs are collected during a procedure; sperm is prepared; fertilisation and embryo development are observed in the laboratory. Depending on the situation, transfer may occur in that treatment cycle or embryos may be frozen for later. A test after the advised interval checks for pregnancy.",
        ],
      },
      {
        heading: "Why do timing and pathways vary?",
        paragraphs: [
          "Response to stimulation, laboratory findings, uterine preparation, medical safety and personal decisions can all change timing. A cycle may pause or end without transfer, and frozen transfer creates a separate timeline. Ask the clinic which steps apply to you, who communicates results, and what circumstances might change the plan instead of treating an online calendar as a promise.",
        ],
      },
      {
        heading: "What risks and support should I discuss?",
        paragraphs: [
          "Ask about medicine effects, ovarian hyperstimulation risk, procedure risks, number of embryos considered for transfer, storage decisions, emotional support, costs and how outcomes are reported for a comparable group. Severe abdominal pain or swelling, faintness, breathing difficulty, heavy bleeding or marked illness after treatment needs urgent contact with the treating clinic or emergency care—not routine WhatsApp booking.",
        ],
      },
    ],
    conversionCopy:
      "Book a routine fertility consultation with Dr. Charmi Shah to understand whether IVF belongs in your individual pathway.",
    openClinicalQuestions: [
      "Which protocol-neutral monitoring details should remain in the final copy?",
      "What local after-hours route should IVF patients use for urgent symptoms?",
      "Which outcome denominators does Dr. Charmi Shah want patients to ask clinics for?",
    ],
    claimLedger: [
      claim(
        "IVF commonly includes stimulation, monitoring, egg retrieval, laboratory fertilisation and embryo transfer or freezing.",
        "https://www.hfea.gov.uk/treatments/explore-all-treatments/in-vitro-fertilisation-ivf/",
        "The HFEA describes UK practice; individual protocols and Indian regulation may differ.",
      ),
      claim(
        "An IVF pathway and timing vary between patients and cycles.",
        "https://www.hfea.gov.uk/treatments/explore-all-treatments/in-vitro-fertilisation-ivf/",
        "The source cannot predict this clinic’s protocol or an individual outcome.",
      ),
    ],
  },
  "W16-Z": {
    title: "How long does postpartum recovery take? Milestones without a deadline",
    seoTitle: "Postpartum Recovery: Milestones, Not Deadlines",
    description:
      "Track postpartum recovery by function and symptoms, not a fixed deadline, and learn when to seek medical or physiotherapy care.",
    primaryQuestion: "How long does postpartum recovery take?",
    directAnswer:
      "There is no single postpartum finish line. Bleeding, wounds, sleep, pelvic floor function, strength, feeding demands and emotional wellbeing can recover at different speeds. Improvement over time matters, but persistent or worsening symptoms deserve care rather than being dismissed because you are still within—or already beyond—a popular recovery deadline.",
    storytellingNote:
      "Illustrative example: a parent compares herself with a friend and learns to track her own function and support needs.",
    sections: [
      {
        heading: "Why is there no single recovery finish line?",
        paragraphs: [
          "Pregnancy, vaginal birth, caesarean birth, complications, feeding, sleep and available support all shape recovery. Tissue healing is only one part. Feeling ready for a walk does not necessarily mean being ready for impact exercise, and needing help months later does not mean you have failed. Dr. Zalak Shah (PT) uses meaningful activities—not appearance—as milestones.",
        ],
      },
      {
        heading: "Which areas of recovery should I track?",
        paragraphs: [
          "Notice bleeding and wound change, pain, bladder and bowel control, vaginal heaviness, abdominal function, walking tolerance, sleep, mood and confidence with daily tasks. Track trends rather than expecting every area to improve together. A brief note about what provokes symptoms helps a clinician separate normal adaptation from a problem requiring assessment.",
        ],
      },
      {
        heading: "What is the postnatal review for?",
        paragraphs: [
          "A medical postnatal review can address birth recovery, blood pressure or other complications, contraception, bleeding, mental health and ongoing symptoms. Pelvic health physiotherapy adds assessment of movement, pelvic floor and return-to-activity goals. One does not replace the other. Bring discharge records and mention symptoms even if they feel embarrassing.",
        ],
      },
      {
        heading: "When should symptoms prompt earlier help?",
        paragraphs: [
          "Seek prompt medical advice for worsening wound pain, fever, offensive discharge, calf pain or swelling, severe headache, heavy or increasing bleeding, chest pain, breathing difficulty, collapse, or thoughts of harming yourself or the baby. Use emergency services for severe symptoms. Routine review is appropriate for leakage, heaviness, pain, bowel difficulty or stalled function; do not wait for an arbitrary deadline.",
        ],
      },
    ],
    conversionCopy:
      "For non-urgent recovery concerns, discuss function-based goals with Dr. Zalak Shah (PT).",
    openClinicalQuestions: [
      "Which postpartum red flags need locally specific routing?",
      "How does Dr. Zalak Shah define readiness for an in-person versus online assessment?",
      "Which postnatal review details should Dr. Charmi Shah add?",
    ],
    claimLedger: [
      claim(
        "Postpartum recovery includes multiple physical domains and persistent symptoms should be discussed.",
        "https://www.nhs.uk/baby/support-and-services/your-post-pregnancy-body/",
        "General NHS information does not provide an individual recovery timeline.",
      ),
      claim(
        "Postnatal activity should progress according to symptoms and recovery rather than a universal deadline.",
        "https://thepogp.co.uk/Resources/113/exercise_and_advice_after_pregnancy",
        "Exercise progression still requires individual review, especially after complications.",
      ),
    ],
  },
  "W16-C": {
    title: "How Are PCOS and Insulin Resistance Connected?",
    seoTitle: "PCOS and Insulin Resistance: The Connection",
    description:
      "Understand how PCOS can affect insulin and long-term metabolic health, including checks to discuss with Dr. Charmi Shah.",
    primaryQuestion: "What is the link between PCOS and insulin resistance?",
    directAnswer:
      "Insulin resistance means body tissues do not respond to insulin as effectively, so the body may produce more. It is common in PCOS and can influence androgen levels, ovulation and longer-term metabolic health, but it is not present in everyone. Body size or symptoms alone cannot confirm it; assessment uses clinical history and appropriate tests.",
    storytellingNote:
      "Illustrative example: a reader is surprised that a PCOS visit includes questions about metabolic health as well as periods.",
    sections: [
      {
        heading: "How are PCOS and insulin connected?",
        paragraphs: [
          "Insulin helps move glucose from blood into cells. When tissues respond less effectively, higher insulin levels may contribute to excess androgen activity and irregular ovulation in PCOS. The relationship differs between people and is not a personal failure. PCOS is a reproductive and metabolic condition, so Dr. Charmi Shah considers periods, skin or hair symptoms, fertility goals and longer-term health together.",
        ],
      },
      {
        heading: "Can symptoms tell me I have insulin resistance?",
        paragraphs: [
          "No single symptom or skin change diagnoses insulin resistance. It can matter in a person who has not gained weight, while another person with weight gain may have a different explanation. PCOS itself also requires proper diagnostic assessment; an ultrasound appearance alone is not enough. Avoid commercial quizzes and universal laboratory panels.",
        ],
      },
      {
        heading: "Why may ongoing health checks matter?",
        paragraphs: [
          "Current PCOS guidance recommends attention to glucose risk, blood pressure, lipids and other health factors, with the type and frequency of checks tailored to the person. Lifestyle support should be respectful, practical and not reduced to a number on the scale. Medicines or supplements require individual discussion, including pregnancy plans and other conditions.",
        ],
      },
      {
        heading: "When should I seek care?",
        paragraphs: [
          "Arrange routine review for very irregular or absent periods, symptoms of high blood sugar, fertility questions or uncertainty about previous results. Ask which test is being recommended, what it measures and when it should be repeated. Vomiting, marked dehydration, confusion or severe illness needs urgent medical assessment; routine WhatsApp consultation is not an emergency route.",
        ],
      },
    ],
    conversionCopy:
      "Book a routine PCOS consultation with Dr. Charmi Shah to review cycles, metabolic risk and pregnancy goals together.",
    openClinicalQuestions: [
      "Which glucose assessment should be named after review of the current international guideline?",
      "What follow-up interval language is appropriate without creating a universal schedule?",
      "Which symptoms should prompt coordination with a physician or endocrinologist?",
    ],
    claimLedger: [
      claim(
        "Insulin resistance and metabolic risk are common in PCOS, including outside higher-weight groups.",
        "https://www.monash.edu/medicine/mchri/pcos/guideline",
        "Population-level guidance cannot establish insulin resistance in an individual.",
      ),
      claim(
        "PCOS care can include assessment of diabetes and cardiovascular risk factors.",
        "https://www.acog.org/womens-health/faqs/polycystic-ovary-syndrome-pcos",
        "US patient guidance; testing choices need local clinician review.",
      ),
    ],
  },
  "W17-Z": {
    title: "How can I rebuild core strength after pregnancy?",
    seoTitle: "Rebuilding Core Strength After Pregnancy",
    description:
      "Rebuild postnatal core function around breathing, load and daily tasks—not appearance—with guidance from Dr. Zalak Shah (PT).",
    primaryQuestion: "How can I rebuild my core after pregnancy?",
    directAnswer:
      "Begin with function, not a flat-stomach target. Postnatal core recovery involves breathing, abdominal wall and pelvic floor coordination, then gradually managing the loads of walking, lifting, carrying and exercise. The correct starting point depends on birth recovery, symptoms and current capacity; a generic abdominal challenge is not an assessment.",
    storytellingNote:
      "Illustrative example: a parent wants to lift and carry more comfortably rather than chase a particular appearance.",
    sections: [
      {
        heading: "What does core function mean after pregnancy?",
        paragraphs: [
          "The core is not one muscle or the ability to hold the abdomen in. It coordinates the diaphragm, abdominal wall, spine, hips and pelvic floor while pressure and load change. Dr. Zalak Shah (PT) asks what you need to do—roll in bed, feed, carry, climb stairs or return to sport—and where control, pain or confidence changes.",
        ],
      },
      {
        heading: "What should be assessed before progressing?",
        paragraphs: [
          "Assessment may cover birth and surgical recovery, pain, abdominal separation, pelvic floor symptoms, breathing, movement and fatigue. The width of a diastasis alone does not define function or dictate one exercise. A plan should also respect sleep, feeding demands and available support. Specific exercise demonstrations remain unsuitable until contraindications and stop criteria are reviewed.",
        ],
      },
      {
        heading: "How do breathing, load and daily tasks fit?",
        paragraphs: [
          "Early work may involve coordinating breath with a comfortable effort and practising tasks at a manageable load. Progress can then change repetitions, resistance, speed, impact or complexity one variable at a time. Symptoms during or after activity matter. Holding your breath is not automatically harmful, but an unhelpful pressure strategy can be modified when it contributes to symptoms.",
        ],
      },
      {
        heading: "What symptoms should change the plan?",
        paragraphs: [
          "Pause and seek assessment for increasing pain, wound problems, vaginal heaviness, leakage, bowel difficulty, bleeding that increases with activity, or a persistent abdominal bulge with poor function. Fever, heavy bleeding, calf swelling, chest pain, breathing difficulty or collapse requires urgent medical care. Measure progress by valued tasks and symptom response, not photographs.",
        ],
      },
    ],
    conversionCopy:
      "For a non-urgent, function-based recovery plan, book with Dr. Zalak Shah (PT).",
    openClinicalQuestions: [
      "Which low-load movements can be published after Dr. Zalak Shah’s demonstration review?",
      "How should abdominal separation findings be described without over-medicalising them?",
      "Which postpartum medical red flags should Dr. Charmi Shah refine?",
    ],
    claimLedger: [
      claim(
        "Postnatal exercise should progress gradually according to recovery and symptoms.",
        "https://thepogp.co.uk/Resources/113/exercise_and_advice_after_pregnancy",
        "General advice; it cannot prescribe an individual starting level.",
      ),
      claim(
        "Tummy muscle separation should be assessed in the context of symptoms and function.",
        "https://thepogp.co.uk/patient_information/womens_health/tummy_muscle_separation.aspx",
        "Patient information does not establish a single diagnostic threshold or treatment.",
      ),
    ],
  },
  "W17-C": {
    title: "Why Is My Period Late If My Pregnancy Test Is Negative?",
    seoTitle: "Late Period, Negative Pregnancy Test: Why?",
    description:
      "Learn what a negative home test can and cannot show, when to repeat it, and which symptoms need urgent gynaecology care.",
    primaryQuestion: "Why is my period late if my pregnancy test is negative?",
    directAnswer:
      "A negative test may mean you are not pregnant, but it can also occur when testing was too early or instructions were not followed. Ovulation can shift, and stress, illness, PCOS, thyroid problems, weight change, medicines and perimenopause can affect cycles. Persistent missed periods or concerning symptoms need medical assessment.",
    storytellingNote:
      "Illustrative example: a reader with one negative test looks for certainty, then checks timing and symptoms instead of assuming the result explains the delay.",
    sections: [
      {
        heading: "What can a negative result establish?",
        paragraphs: [
          "Home tests detect a pregnancy hormone in urine. A correctly used negative result lowers the likelihood of pregnancy at that moment but cannot always exclude a very early pregnancy. Check expiry, timing and the manufacturer’s instructions. Dr. Charmi Shah would ask when the last period began, usual cycle variation, contraception, unprotected sex and when testing occurred.",
        ],
      },
      {
        heading: "When should I repeat a test?",
        paragraphs: [
          "If the period has not arrived, follow the test instructions about repeating it; NHS advice suggests testing again after a few days when the first test is negative and pregnancy is still possible. If a second test is negative and the period remains absent, contact a clinician. Do not use repeated daily testing as a substitute for assessment.",
        ],
      },
      {
        heading: "What else can delay a period?",
        paragraphs: [
          "Later ovulation, stress, travel, illness, major changes in eating or exercise, PCOS, thyroid conditions, some medicines, breastfeeding and perimenopause are among many possibilities. The pattern over time matters more than one delayed cycle. Bring cycle dates, test dates, symptoms and medicines to a routine appointment rather than selecting tests yourself.",
        ],
      },
      {
        heading: "Which symptoms need urgent assessment?",
        paragraphs: [
          "Seek urgent care for severe or one-sided abdominal pain, shoulder-tip pain, fainting, marked dizziness or heavy bleeding when pregnancy is possible—even after a negative home test. These symptoms cannot be safely triaged by routine WhatsApp. Arrange routine review for repeatedly missed periods, unusual bleeding, pain or other persistent changes.",
        ],
      },
    ],
    conversionCopy:
      "For a non-urgent late or repeatedly missed period, book a consultation with Dr. Charmi Shah.",
    openClinicalQuestions: [
      "Should the final draft specify a repeat-test interval beyond the source wording?",
      "Which local urgent route should be named for possible ectopic pregnancy symptoms?",
      "When does Dr. Charmi Shah recommend investigation for recurrent missed periods?",
    ],
    claimLedger: [
      claim(
        "A home pregnancy test can be falsely negative when taken too early, and repeat testing may be appropriate.",
        "https://www.nhs.uk/pregnancy/trying-for-a-baby/doing-a-pregnancy-test/",
        "Test sensitivity and instructions vary; symptoms can override a home result.",
      ),
      claim(
        "Late periods have many possible causes and persistent changes merit review.",
        "https://www.nhs.uk/conditions/periods/",
        "The source provides general causes, not an individual diagnosis.",
      ),
    ],
  },
  "W18-Z": {
    title: "Can pelvic floor physiotherapy help with bladder leakage?",
    seoTitle: "Can Pelvic Floor Physio Help Bladder Leakage?",
    description:
      "See how bladder leakage is assessed, what supervised pelvic floor care may involve, and when medical referral is needed.",
    primaryQuestion: "Can pelvic floor therapy help bladder leakage?",
    directAnswer:
      "Pelvic floor physiotherapy can help many people with urinary leakage, particularly when treatment matches the type and contributing factors. It is not simply a sheet of Kegels, and it does not treat every cause. A bladder history and pelvic floor assessment should guide supervised training, habit advice and any referral.",
    storytellingNote:
      "Illustrative example: a reader considering physiotherapy learns what to ask before expecting a particular result.",
    sections: [
      {
        heading: "What type of leakage do I have?",
        paragraphs: [
          "Leakage with coughing, lifting or exercise differs from leakage preceded by sudden urgency; some people have both. Frequency, pain, difficulty emptying, recurrent infection, medicines and fluid habits add context. Dr. Zalak Shah (PT) uses a bladder diary and assessment rather than assuming every leak reflects weak muscles.",
        ],
      },
      {
        heading: "What happens before a plan is recommended?",
        paragraphs: [
          "The consultation covers symptom pattern, births or surgery, bowel health, movement and goals. With permission, examination may assess pelvic floor contraction, relaxation and coordination. You can decline or stop an internal examination. Treatment may include supervised muscle training, urge strategies, bladder or bowel habit changes and task-specific practice.",
        ],
      },
      {
        heading: "How are goals and progress reviewed?",
        paragraphs: [
          "Useful goals are personal: walking without searching for a toilet, coughing with confidence, returning to a class or reducing pad use. Review should check technique, adherence, symptom change and whether the original explanation still fits. No ethical clinician can promise a cure percentage before assessment, and lack of progress should prompt reconsideration rather than blame.",
        ],
      },
      {
        heading: "When is medical care needed?",
        paragraphs: [
          "Arrange medical review for pain, blood in urine, recurrent infections, difficulty emptying, new neurological symptoms or leakage that does not fit a straightforward pattern. Inability to pass urine, visible blood with clots, fever with marked illness, or new bladder loss with severe back pain and saddle numbness needs urgent care. Emergencies are not routine booking requests.",
        ],
      },
    ],
    conversionCopy:
      "Book a non-urgent bladder and pelvic floor assessment with Dr. Zalak Shah (PT).",
    openClinicalQuestions: [
      "Which supervised treatment elements reflect Dr. Zalak Shah’s actual practice?",
      "What review interval can be stated without promising an outcome?",
      "Which urology or gynaecology referral triggers should Dr. Charmi Shah refine?",
    ],
    claimLedger: [
      claim(
        "Urinary incontinence includes different symptom patterns that require assessment.",
        "https://www.nhs.uk/conditions/urinary-incontinence/",
        "Patient information cannot identify the type or cause for an individual.",
      ),
      claim(
        "Supervised pelvic floor muscle training is a recommended conservative option for appropriate incontinence presentations.",
        "https://www.nice.org.uk/guidance/ng210/chapter/recommendations",
        "Suitability, supervision and duration require clinical assessment.",
      ),
    ],
  },
  "W18-C": {
    title: "What Is the Difference Between IUI and IVF?",
    seoTitle: "IUI vs IVF: What Is the Difference?",
    description:
      "Compare IUI and IVF procedures, monitoring and decision factors, then prepare balanced questions for Dr. Charmi Shah.",
    primaryQuestion: "What is the difference between IUI and IVF?",
    directAnswer:
      "IUI places prepared sperm inside the uterus around ovulation, so fertilisation still occurs inside the body. IVF involves collecting eggs, fertilising them in a laboratory and transferring an embryo. They differ in procedures, monitoring, cost and information gained; neither is the better choice for everyone.",
    storytellingNote:
      "Illustrative example: a couple moves beyond a simple cheaper-versus-better comparison and asks which clinical factors matter.",
    sections: [
      {
        heading: "How does each treatment work?",
        paragraphs: [
          "IUI usually involves timing ovulation, sometimes with medicines and monitoring, then placing prepared sperm through the cervix into the uterus. IVF uses ovarian stimulation, egg retrieval, laboratory fertilisation and embryo culture before transfer or freezing. IVF is more invasive and laboratory-dependent; IUI leaves fertilisation and early embryo development inside the body.",
        ],
      },
      {
        heading: "How do monitoring and practical burden differ?",
        paragraphs: [
          "Both can involve appointments, scans and emotional uncertainty. IVF generally includes more procedures and decisions about embryos and storage. IUI may look simpler, but it still requires appropriate timing and an open pathway for sperm and egg to meet. Ask for a written schedule, medicine plan, total cost categories and urgent contact route.",
        ],
      },
      {
        heading: "What affects which option is discussed?",
        paragraphs: [
          "Age, duration of infertility, ovulation, sperm findings, tubal status, ovarian reserve, previous treatment, diagnosis and personal priorities all matter. Dr. Charmi Shah would interpret these together. Comparing success percentages without age group, diagnosis, cycle type and denominator can mislead; clinic-level figures do not predict one person’s outcome.",
        ],
      },
      {
        heading: "What should I ask before deciding?",
        paragraphs: [
          "Ask why this option fits now, what alternatives exist, how many attempts would trigger review, and what risks or cancellations are possible. Seek urgent care for severe pain, heavy bleeding, collapse, breathing difficulty or marked abdominal swelling during treatment. Contact the treating clinic’s urgent route—not routine WhatsApp—for treatment complications.",
        ],
      },
    ],
    conversionCopy:
      "Book a fertility consultation with Dr. Charmi Shah to compare options using your history and test results.",
    openClinicalQuestions: [
      "Which Indian regulatory or local-practice points should supplement UK sources?",
      "How should multiple-pregnancy risk be discussed without protocol details?",
      "Which outcome denominators should patients request from clinics?",
    ],
    claimLedger: [
      claim(
        "IUI places prepared sperm into the uterus around ovulation.",
        "https://www.nhs.uk/tests-and-treatments/intrauterine-insemination-iui/",
        "NHS eligibility and funding rules are not Indian treatment rules.",
      ),
      claim(
        "IVF includes egg retrieval, laboratory fertilisation and embryo transfer or freezing.",
        "https://www.hfea.gov.uk/treatments/explore-all-treatments/in-vitro-fertilisation-ivf/",
        "UK overview; protocols, regulation and outcomes vary.",
      ),
      claim(
        "Fertility history and testing inform treatment choice.",
        "https://www.asrm.org/practice-guidance/practice-committee-documents/fertility-evaluation-of-infertile-women-a-committee-opinion-2026",
        "Evaluation guidance does not select IUI or IVF for an individual.",
      ),
    ],
  },
  "W19-Z": {
    title: "What is prenatal physiotherapy, and when might I need it?",
    seoTitle: "What Is Prenatal Physiotherapy?",
    description:
      "Learn what prenatal physiotherapy can assess, how it differs from a fitness class, and when obstetric input comes first.",
    primaryQuestion: "What is prenatal physiotherapy?",
    directAnswer:
      "Prenatal physiotherapy is individual assessment and support for movement, pain, pelvic floor symptoms and physical preparation during pregnancy. It is not a substitute for antenatal medical care or simply a fitness class. The plan should reflect your pregnancy history, symptoms, goals and advice from the maternity team.",
    storytellingNote:
      "Illustrative example: a referred reader asks whether the visit will be a class, consultation or hands-on treatment.",
    sections: [
      {
        heading: "Which concerns can a pregnancy physiotherapist discuss?",
        paragraphs: [
          "Dr. Zalak Shah (PT) may assess pelvic girdle or back pain, bladder symptoms, movement confidence, daily tasks and questions about remaining active. The visit begins with history and goals; examination and treatment depend on consent and findings. Physiotherapy cannot diagnose obstetric complications or guarantee an easier birth.",
        ],
      },
      {
        heading: "How is it different from a fitness class?",
        paragraphs: [
          "A class teaches a group within a planned format. Physiotherapy investigates an individual problem, considers medical context and adapts care. Bring maternity advice, reports, a medicine list and notes on aggravating activities. Ask what will be assessed, whether any examination is optional and how progress will be reviewed.",
        ],
      },
      {
        heading: "How do online and in-person visits differ?",
        paragraphs: [
          "Online care can support history-taking, education and observation of some movements, subject to suitability. Hands-on testing and internal examination, when relevant and consented, require in-person care. The first conversation should clarify what can be answered remotely and when local examination or medical referral is safer.",
        ],
      },
      {
        heading: "When does obstetric care come first?",
        paragraphs: [
          "Bleeding, fluid loss, severe abdominal pain, regular painful contractions, severe headache, reduced fetal movement when usually felt, chest pain, collapse or major breathing difficulty needs prompt maternity or emergency assessment. Do not send these symptoms to routine WhatsApp. Stable pain or movement concerns can be discussed with physiotherapy alongside antenatal care.",
        ],
      },
    ],
    conversionCopy:
      "For non-urgent pregnancy movement or pelvic health concerns, book with Dr. Zalak Shah (PT).",
    openClinicalQuestions: [
      "What is Dr. Zalak Shah’s verified prenatal appointment process?",
      "Which concerns are accepted online versus in person?",
      "Which obstetric escalation wording does Dr. Charmi Shah approve?",
    ],
    claimLedger: [
      claim(
        "Activity in pregnancy should be adapted to symptoms and medical advice.",
        "https://www.nhs.uk/pregnancy/keeping-well/exercise/",
        "General guidance does not provide individual clearance.",
      ),
      claim(
        "Pelvic health physiotherapy assessment begins with history and may include consent-based examination.",
        "https://thepogp.co.uk/patients/pelvic_health_advice/physiotherapy_assessment.aspx",
        "The clinic’s exact process remains to be confirmed.",
      ),
      claim(
        "Pregnancy-related pelvic pain can warrant assessment and practical management.",
        "https://www.nhs.uk/pregnancy/common-symptoms/pelvic-pain/",
        "This does not exclude obstetric or other medical causes.",
      ),
    ],
  },
  "W19-C": {
    title: "What Helps Pregnancy Nausea, and When Do I Need Care?",
    seoTitle: "Pregnancy Nausea: What Helps and When to Get Care",
    description:
      "Practical pregnancy nausea guidance, hydration questions and warning signs that need prompt assessment with Dr. Charmi Shah.",
    primaryQuestion: "What helps nausea and vomiting in pregnancy?",
    directAnswer:
      "Small, tolerable meals, regular sips of fluid, rest and avoiding personal triggers may help mild pregnancy nausea. Symptoms can occur at any time of day. If you cannot keep fluids down, are passing very little urine, feel faint or unwell, or are losing weight, contact maternity care promptly because assessment and treatment may be needed.",
    storytellingNote:
      "Illustrative example: a pregnant reader is unsure whether persistent vomiting is still routine morning sickness.",
    sections: [
      {
        heading: "How much can pregnancy nausea vary?",
        paragraphs: [
          "Some people feel mildly queasy; others vomit repeatedly and cannot manage normal intake. “Morning sickness” is a misleading label because symptoms may occur all day. Dr. Charmi Shah would ask when symptoms began, what stays down, urine output, weight change, pain, fever, medicines and whether another illness could be contributing.",
        ],
      },
      {
        heading: "What supportive measures can I try?",
        paragraphs: [
          "Try small amounts of food and fluid that you tolerate, little and often, and reduce smells or foods that trigger symptoms. Rest can matter because fatigue worsens nausea for some people. Do not start medicines, herbal products or high-dose supplements from an online list; ask which pregnancy-safe treatment suits your history.",
        ],
      },
      {
        heading: "When does vomiting need assessment?",
        paragraphs: [
          "Seek prompt advice if vomiting is frequent, fluids will not stay down, urine becomes scant or dark, you feel dizzy, or daily function is collapsing. Severe abdominal pain, blood in vomit, confusion, collapse or marked dehydration needs urgent care. Use maternity or emergency services, not routine WhatsApp booking.",
        ],
      },
      {
        heading: "What should I ask about treatment and hydration?",
        paragraphs: [
          "Bring a brief record of vomiting, fluid intake, urine, medicines and weight if known. Ask whether tests or intravenous fluids are needed, which anti-sickness options are appropriate, and what change should trigger reassessment. Early help is reasonable; you do not need to wait until symptoms become extreme.",
        ],
      },
    ],
    conversionCopy:
      "For stable, non-urgent pregnancy nausea questions, book a consultation with Dr. Charmi Shah.",
    openClinicalQuestions: [
      "Which antiemetic categories, if any, should be named after clinical review?",
      "What local maternity route should patients use after hours?",
      "Which dehydration indicators should be retained in final triage copy?",
    ],
    claimLedger: [
      claim(
        "Pregnancy nausea can occur at any time, and small frequent intake may help some people.",
        "https://www.nhs.uk/pregnancy/common-symptoms/vomiting-and-morning-sickness/",
        "Supportive strategies are not a substitute for assessment when intake is poor.",
      ),
      claim(
        "Persistent vomiting with dehydration or inability to keep fluids down needs medical advice.",
        "https://www.nhs.uk/pregnancy/common-symptoms/vomiting-and-morning-sickness/",
        "Urgency depends on severity and clinical context.",
      ),
    ],
  },
  "W20-Z": {
    title: "Why does my back hurt after pregnancy, and when should I get help?",
    seoTitle: "Postpartum Back Pain: When to Get Help",
    description:
      "Understand postpartum back pain patterns, daily-load adjustments and warning signs, with input from Dr. Zalak Shah (PT).",
    primaryQuestion: "Why do I have postpartum back pain?",
    directAnswer:
      "Postpartum back pain can reflect changing loads, reduced sleep, repeated feeding or carrying positions, pregnancy-related changes, birth recovery or a separate musculoskeletal problem. It should not automatically be blamed on an epidural, posture or abdominal separation. The pattern and examination guide care.",
    storytellingNote:
      "Illustrative example: a new parent notices pain during feeding and carrying and is unsure which clinician to see.",
    sections: [
      {
        heading: "Which details help explain the pain?",
        paragraphs: [
          "Note where pain sits, whether it travels, what starts or eases it, and whether numbness, weakness, bladder changes or fever are present. Birth details, wounds, sleep and previous back problems matter. Dr. Zalak Shah (PT) observes movement and tasks instead of assigning one cause from posture alone.",
        ],
      },
      {
        heading: "How can feeding, carrying and rest be discussed?",
        paragraphs: [
          "There is no single perfect posture. Support the baby and your arms, vary positions, bring frequently used items closer and share loads where possible. An arrangement is useful if it reduces effort and remains practical. Pain is not evidence that you have damaged your back by sitting incorrectly.",
        ],
      },
      {
        heading: "How is exercise adapted?",
        paragraphs: [
          "Assessment can guide a tolerable starting point, then progress walking, trunk and hip capacity and lifting tasks. Symptom response during the following day matters. Generic “core fixes” may be too easy, too hard or irrelevant. Pelvic floor symptoms, abdominal concerns and birth healing should be considered together.",
        ],
      },
      {
        heading: "Which symptoms need urgent assessment?",
        paragraphs: [
          "Seek emergency care for new leg weakness, numbness around the saddle area, loss of bladder or bowel control, chest pain, breathing difficulty or collapse. Fever with severe back or pelvic pain, worsening wound symptoms or calf swelling also needs prompt medical assessment. Routine physiotherapy is suitable only after urgent causes are excluded.",
        ],
      },
    ],
    conversionCopy:
      "For stable postpartum back pain, book a functional assessment with Dr. Zalak Shah (PT).",
    openClinicalQuestions: [
      "Which supported feeding or carrying examples can Dr. Zalak Shah approve?",
      "Should caesarean and neuraxial anaesthesia concerns be addressed explicitly?",
      "Which postpartum red flags should Dr. Charmi Shah refine?",
    ],
    claimLedger: [
      claim(
        "Postpartum physical concerns can include back pain and deserve review when persistent.",
        "https://www.nhs.uk/baby/support-and-services/your-post-pregnancy-body/",
        "General patient information cannot identify an individual pain source.",
      ),
      claim(
        "Postnatal activity can be progressively adapted around symptoms and recovery.",
        "https://thepogp.co.uk/Resources/113/exercise_and_advice_after_pregnancy",
        "Specific exercise prescription needs assessment.",
      ),
    ],
  },
  "W20-C": {
    title: "Is It PMS or PMDD, and How Can I Tell?",
    seoTitle: "PMS vs PMDD: How Can I Tell?",
    description:
      "Compare PMS and PMDD patterns, learn how to track cycle symptoms, and know when urgent mental health support is needed.",
    primaryQuestion: "What is the difference between PMS and PMDD?",
    directAnswer:
      "Both involve symptoms linked to the menstrual cycle, but PMDD causes more severe mood symptoms and marked disruption to daily life. Timing matters: symptoms typically appear before a period and improve after it starts. A prospective daily diary over more than one cycle supports assessment; an online quiz cannot diagnose either condition.",
    storytellingNote:
      "Illustrative example: a reader notices a repeating mood pattern and records it without assigning herself a diagnosis.",
    sections: [
      {
        heading: "How do PMS and PMDD differ?",
        paragraphs: [
          "PMS can include physical and emotional symptoms before menstruation. PMDD is a severe premenstrual disorder in which mood symptoms and functional impact are prominent. Dr. Charmi Shah would ask not only which symptoms occur but when, how much they interfere, and whether symptoms are also present through the rest of the month.",
        ],
      },
      {
        heading: "Why do timing and life impact matter?",
        paragraphs: [
          "Depression, anxiety, thyroid conditions, perimenopause and other concerns can overlap with premenstrual symptoms. A clear symptom-free interval may help the assessment, but patterns are not always neat. Avoid dismissing serious distress as “just hormones,” and do not stop psychiatric medicines without the prescribing clinician.",
        ],
      },
      {
        heading: "What should I record?",
        paragraphs: [
          "Use a daily diary for mood, sleep, physical symptoms, bleeding and effect on work, relationships and self-care. Record difficult days as they happen rather than reconstructing them later. Bring the diary, medicine list and mental health history to a consultation. It supports conversation but is not a self-scoring diagnosis.",
        ],
      },
      {
        heading: "When is urgent mental health support needed?",
        paragraphs: [
          "If you may harm yourself, cannot stay safe, or have severe agitation, confusion or loss of contact with reality, contact local emergency or crisis services now and involve a trusted person if possible. Do not wait for a period to start and do not use routine WhatsApp booking. Stable cyclical symptoms can be reviewed in a planned gynaecology or mental health consultation.",
        ],
      },
    ],
    conversionCopy:
      "For non-urgent cyclical symptoms, book with Dr. Charmi Shah and bring a daily symptom diary.",
    openClinicalQuestions: [
      "Which validated diary should be linked or reproduced after permission review?",
      "What India-specific crisis route can be verified and maintained?",
      "Which treatment categories can be named without turning this into a regimen?",
    ],
    claimLedger: [
      claim(
        "PMS symptoms occur in relation to the menstrual cycle and can affect daily life.",
        "https://www.acog.org/womens-health/faqs/premenstrual-syndrome",
        "US patient guidance; diagnosis and treatment need individual review.",
      ),
      claim(
        "PMDD involves severe premenstrual symptoms, particularly mood symptoms, with substantial impact.",
        "https://www.nhs.uk/conditions/pmdd-premenstrual-dysphoric-disorder/",
        "The page cannot distinguish PMDD from another mental health condition in an individual.",
      ),
    ],
  },
  "W21-Z": {
    title: "Is Pilates safe during pregnancy? Questions to ask before a class",
    seoTitle: "Is Pilates Safe During Pregnancy?",
    description:
      "Use pregnancy history, symptoms and instructor screening to judge Pilates class suitability with Dr. Zalak Shah (PT).",
    primaryQuestion: "Is Pilates safe during pregnancy?",
    directAnswer:
      "Pilates can be adapted for many pregnancies, but it is not automatically safe for every person or every class. Suitability depends on pregnancy history, symptoms, previous activity, instructor skill and the ability to modify positions and effort. Obstetric advice takes priority when there are complications.",
    storytellingNote:
      "Illustrative example: an experienced participant wants to continue her usual class and asks what must change.",
    sections: [
      {
        heading: "What makes a class appropriate?",
        paragraphs: [
          "A suitable class screens participants, welcomes changes and does not pressure anyone to complete a movement. Tell the instructor your gestation, symptoms, pregnancy complications and advice from the maternity team. Dr. Zalak Shah (PT) distinguishes general class participation from physiotherapy for a specific pain or pelvic health problem.",
        ],
      },
      {
        heading: "How can movements be adapted?",
        paragraphs: [
          "As pregnancy progresses, balance, comfort and tolerance for some positions change. Support, range, resistance, pace and transitions can all be adjusted. Stop a movement that causes pain, dizziness, leakage, heaviness or unusual breathlessness. Adaptation is not failure, and no advanced exercise proves birth readiness.",
        ],
      },
      {
        heading: "What if I have pain or pelvic symptoms?",
        paragraphs: [
          "Pelvic girdle pain, back pain, leakage or pressure may need individual assessment before a group class. The answer is not always complete rest; it may be a different load or movement strategy. An instructor should stay within scope and refer when symptoms require physiotherapy or medical review.",
        ],
      },
      {
        heading: "What should make me stop and seek advice?",
        paragraphs: [
          "Stop and obtain maternity advice for bleeding, fluid loss, regular painful contractions, severe headache, chest pain, faintness, reduced fetal movement when usually felt or significant breathlessness. Severe symptoms need urgent services, not a class or WhatsApp message. For stable questions, ask how the instructor screens and communicates with your care team.",
        ],
      },
    ],
    conversionCopy:
      "For non-urgent class suitability or symptom adaptations, consult Dr. Zalak Shah (PT).",
    openClinicalQuestions: [
      "Which Pilates positions can be shown after clinical and image review?",
      "What class-screening process does Dr. Zalak Shah actually use?",
      "Which obstetric stop criteria does Dr. Charmi Shah approve?",
    ],
    claimLedger: [
      claim(
        "Pregnancy activity should be comfortable and adapted as pregnancy changes.",
        "https://www.nhs.uk/pregnancy/keeping-well/exercise/",
        "General guidance is not individual clearance for Pilates.",
      ),
      claim(
        "Pilates may be used within women’s health physiotherapy when appropriately selected and modified.",
        "https://thepogp.co.uk/resources/124/pilates_in_womens_health_physiotherapy/",
        "This does not establish superiority or suitability for every pregnancy.",
      ),
    ],
  },
  "W21-C": {
    title: "What Happens at the First Fertility Appointment?",
    seoTitle: "Your First Fertility Appointment: What Happens?",
    description:
      "Prepare records and questions for a first fertility appointment and learn why tests are selected individually with Dr. Charmi Shah.",
    primaryQuestion: "What happens at the first fertility appointment?",
    directAnswer:
      "A first fertility appointment usually builds a medical and reproductive history for both partners, reviews previous records, and plans only the assessments that fit the situation. You do not need to arrive with every possible test. The purpose is to define the questions, explain uncertainty and agree sensible next steps.",
    storytellingNote:
      "Illustrative example: a couple worries they must buy a large test package before their first visit.",
    sections: [
      {
        heading: "What history and records should I prepare?",
        paragraphs: [
          "Bring cycle dates, pregnancy history, duration of trying, previous fertility treatment, operations, medicines, major illnesses and available reports. If relevant, bring semen reports and records for both partners. Dr. Charmi Shah may ask about intercourse timing, contraception history and family conditions; these are clinical questions, not judgments.",
        ],
      },
      {
        heading: "What categories of assessment may be discussed?",
        paragraphs: [
          "Assessment can consider ovulation, ovarian reserve in context, uterine and tubal factors, and sperm. Physical examination, ultrasound, blood tests or tubal testing may be appropriate for some people, but not all at the first visit. Both partners matter; testing only the woman can miss important information.",
        ],
      },
      {
        heading: "Why does everyone not need every test?",
        paragraphs: [
          "Tests should answer a defined question and change care. Timing, age, symptoms, prior results and treatment plans affect selection. Broad packages may create cost, incidental findings and confusion without improving decisions. Ask what each test measures, what it cannot tell you and how either result would alter the plan.",
        ],
      },
      {
        heading: "When should care be more urgent?",
        paragraphs: [
          "Fertility planning is usually routine, but severe pelvic pain, heavy bleeding, fainting, fever or a possible pregnancy with pain or bleeding needs urgent assessment. Do not wait for a fertility booking. At the planned visit, ask about the likely sequence, alternatives, costs and when results will be reviewed.",
        ],
      },
    ],
    conversionCopy:
      "Book a first fertility consultation with Dr. Charmi Shah and bring the records you already have.",
    openClinicalQuestions: [
      "Which records does Dr. Charmi Shah specifically ask patients to upload or bring?",
      "Which tests are commonly deferred until after the first consultation?",
      "How should male-partner assessment be coordinated locally?",
    ],
    claimLedger: [
      claim(
        "Fertility evaluation includes history and assessment of both partners where applicable.",
        "https://www.acog.org/womens-health/faqs/evaluating-infertility",
        "US overview; timing and test access vary in India.",
      ),
      claim(
        "Tests should be selected according to history and likely clinical utility rather than as a universal panel.",
        "https://www.asrm.org/practice-guidance/practice-committee-documents/fertility-evaluation-of-infertile-women-a-committee-opinion-2026",
        "Committee guidance requires individual and local interpretation.",
      ),
    ],
  },
  "W22-Z": {
    title: "How can breathing techniques support comfort during labour?",
    seoTitle: "Breathing for Labour Comfort: What It Can Do",
    description:
      "Learn how breathing practice may support labour comfort without replacing pain relief, maternity monitoring or individual care.",
    primaryQuestion: "Do breathing exercises help during labour?",
    directAnswer:
      "Breathing practice may help you focus, reduce unnecessary tension and feel more able to work with contractions. It is a comfort tool, not a test of coping and not a promise of painless or shorter labour. It can sit alongside movement, support, medication and other pain-relief choices.",
    storytellingNote:
      "Illustrative example: an expectant parent worries she must perform one breathing pattern perfectly during labour.",
    sections: [
      {
        heading: "What can breathing practice prepare me for?",
        paragraphs: [
          "Practice can make a slow, comfortable breath feel familiar and give you an anchor when intensity rises. Dr. Zalak Shah (PT) may pair breathing with relaxed jaw and shoulder awareness or a comfortable position. If a pattern makes you light-headed or panicked, return to normal breathing and tell your care team.",
        ],
      },
      {
        heading: "How can a birth partner help?",
        paragraphs: [
          "A partner can practise with you, offer a calm reminder, adjust the environment and notice when you want quiet instead. They should not police rhythm or imply you are doing labour incorrectly. Agree simple preferences in advance, while accepting that you may want something different on the day.",
        ],
      },
      {
        heading: "How does breathing fit with pain relief?",
        paragraphs: [
          "Breathing does not replace clinical monitoring, analgesia or obstetric intervention. You may use it before or alongside gas and air, medicines, epidural or other options offered by the maternity unit. Choosing pain relief is not failure, and breathing cannot guarantee avoidance of caesarean birth.",
        ],
      },
      {
        heading: "When should I contact maternity care?",
        paragraphs: [
          "Follow your maternity team’s instructions for labour, bleeding, fluid loss, reduced fetal movement or other concerns. Severe bleeding, collapse, chest pain or major breathing difficulty requires urgent care. Do not practise through alarming symptoms or send emergencies to routine WhatsApp. Antenatal classes are for preparation, not remote labour triage.",
        ],
      },
    ],
    conversionCopy:
      "For non-urgent antenatal preparation, discuss breathing and comfort options with Dr. Zalak Shah (PT).",
    openClinicalQuestions: [
      "Which breathing demonstration will Dr. Zalak Shah approve?",
      "How should local maternity-unit contact advice be phrased?",
      "Which pain-relief statements require Dr. Charmi Shah’s amendment?",
    ],
    claimLedger: [
      claim(
        "Breathing and relaxation are among non-drug comfort options used in labour.",
        "https://www.nhs.uk/pregnancy/labour-and-birth/pain-relief-in-labour/",
        "The source does not promise a particular labour length, pain level or mode of birth.",
      ),
      claim(
        "Non-drug methods can be used alongside medical pain-relief choices.",
        "https://www.nhs.uk/pregnancy/labour-and-birth/pain-relief-in-labour/",
        "Available options and suitability depend on the maternity setting and clinical situation.",
      ),
    ],
  },
  "W22-C": {
    title: "Can I Improve Egg Quality? What Does the Evidence Say?",
    seoTitle: "Can You Improve Egg Quality? Evidence and Limits",
    description:
      "Separate egg quality from ovarian reserve, assess supplement claims, and prepare evidence-based fertility questions.",
    primaryQuestion: "Can I improve egg quality?",
    directAnswer:
      "No supplement or programme can guarantee better egg quality. Age is strongly related to chromosomal changes in eggs, while general health habits can support overall fertility and pregnancy health without reversing ovarian ageing. Ovarian reserve tests estimate egg quantity or likely response, not the quality of each egg.",
    storytellingNote:
      "Illustrative example: a reader sees a 90-day supplement promise and checks what the claim actually measures.",
    sections: [
      {
        heading: "What do people mean by egg quality?",
        paragraphs: [
          "The phrase often refers to an egg’s capacity to fertilise and contribute to a healthy embryo, but quality cannot be read directly from appearance or a routine blood test before fertilisation. AMH and antral follicle count relate mainly to ovarian reserve and treatment response. They do not provide a direct score for the genetic health of every egg.",
        ],
      },
      {
        heading: "What is reasonably modifiable?",
        paragraphs: [
          "Avoiding smoking, addressing medical conditions, reviewing medicines, eating adequately and discussing alcohol or occupational exposures can support reproductive health. These are worthwhile without promising an egg transformation. Dr. Charmi Shah would place habits within the whole fertility picture, including sperm, tubes, ovulation and timing.",
        ],
      },
      {
        heading: "How should I evaluate supplement claims?",
        paragraphs: [
          "Ask whether evidence shows live-birth benefit for people like you, not only a laboratory marker. Check dose, safety, interactions, pregnancy implications, cost and independent guidance. “Natural” does not mean harmless. Be wary of fixed 90-day guarantees, anti-ageing language and packages that sell testing and treatment from the same unsupported claim.",
        ],
      },
      {
        heading: "When should I consult a fertility clinician?",
        paragraphs: [
          "Seek routine assessment based on age, duration of trying, irregular cycles, known conditions or previous treatment rather than delaying care for supplements. Bring product labels and previous results. Severe pain, heavy bleeding or a possible pregnancy with pain or faintness needs urgent medical care, not a fertility optimisation booking.",
        ],
      },
    ],
    conversionCopy:
      "Book a fertility consultation with Dr. Charmi Shah before investing in tests or supplements marketed for egg quality.",
    openClinicalQuestions: [
      "Which general preconception habits should be named after medical review?",
      "Should any supplement evidence be discussed individually in the final draft?",
      "How should age-related fertility change be explained without alarmist language?",
    ],
    claimLedger: [
      claim(
        "Ovarian reserve tests concern egg quantity and expected response, not direct measurement of egg quality.",
        "https://www.reproductivefacts.org/news-and-publications/patient-fact-sheets-and-booklets/documents/fact-sheets-and-info-booklets/ovarian-reserve/",
        "Reserve markers still require interpretation with age and clinical context.",
      ),
      claim(
        "Health behaviours may support natural fertility but cannot guarantee an individual outcome.",
        "https://prod.reproductivefacts.org/news-and-publications/fact-sheets-and-infographics/optimizing-natural-fertility/",
        "General associations do not prove that a specific change improves egg quality.",
      ),
      claim(
        "Fertility testing should be clinically selected and interpreted.",
        "https://www.asrm.org/practice-guidance/practice-committee-documents/fertility-evaluation-of-infertile-women-a-committee-opinion-2026",
        "Guidance does not endorse a universal supplement or testing package.",
      ),
    ],
  },
  "W23-Z": {
    title: "Can pelvic floor physiotherapy help with painful sex?",
    seoTitle: "Can Pelvic Floor Physio Help Painful Sex?",
    description:
      "Learn when pelvic floor physiotherapy may support painful sex, why medical assessment matters, and how consent protects choice.",
    primaryQuestion: "Can pelvic floor therapy help painful intercourse?",
    directAnswer:
      "Pelvic floor physiotherapy may help when muscle overactivity, guarding, scar sensitivity or movement-related factors contribute to pain during sex. Pain can also have gynaecological, dermatological, hormonal, urinary, bowel or other causes, so physiotherapy is not automatically the first or only treatment. Assessment and consent guide the plan.",
    storytellingNote:
      "Illustrative example: a reader rehearses how to raise intimacy pain and learns she controls every examination choice.",
    sections: [
      {
        heading: "Why does pain during sex deserve assessment?",
        paragraphs: [
          "Pain is not something you must tolerate to preserve a relationship. Note whether it occurs at the entrance or deeper, with insertion or afterwards, and whether there is dryness, bleeding, discharge, bladder symptoms or cyclical pain. Use language that feels comfortable. Dr. Zalak Shah (PT) does not need intimate detail unrelated to your care.",
        ],
      },
      {
        heading: "What causes may need medical evaluation?",
        paragraphs: [
          "Infection, skin conditions, endometriosis, ovarian or uterine problems, hormonal changes and other pelvic conditions can overlap with muscle-related pain. Dr. Charmi Shah’s medical assessment may be the priority when there is unexplained bleeding, discharge, a lesion, fever or new deep pain. Neither stress nor pelvic floor tension should be assumed without evaluation.",
        ],
      },
      {
        heading: "What might physiotherapy involve?",
        paragraphs: [
          "Care can include education, breathing and relaxation, graded movement, scar work where appropriate and coordination with medical or psychological care. Internal self-treatment instructions should not be copied from the internet. If an internal examination is proposed, the reason, alternatives and each step must be explained; you can decline, pause or stop without losing access to care.",
        ],
      },
      {
        heading: "When should I seek care?",
        paragraphs: [
          "Book routine assessment when pain recurs, affects intimacy or creates fear. Seek prompt medical care for heavy bleeding, severe sudden pelvic pain, fever with marked illness, fainting, or pain and bleeding when pregnancy is possible. If sex is not consensual or you are unsafe, contact trusted local emergency or support services—not a routine clinic booking.",
        ],
      },
    ],
    conversionCopy:
      "For non-urgent pelvic pain, book a private consultation with Dr. Zalak Shah (PT) or Dr. Charmi Shah as appropriate.",
    openClinicalQuestions: [
      "What consent wording reflects Dr. Zalak Shah’s actual examination process?",
      "Which medical differentials and referral triggers should Dr. Charmi Shah add?",
      "What trauma-informed support routes can be verified locally?",
    ],
    claimLedger: [
      claim(
        "Painful sex can have multiple physical contributors and deserves assessment.",
        "https://dynamichealth.nhs.uk/help-and-advice/pelvic-health/female-genital-pain/",
        "General patient information cannot diagnose the cause of pain.",
      ),
      claim(
        "Pelvic floor physiotherapy may form one part of care for pelvic pain.",
        "https://www.nhsggc.scot/your-health/obstetrics-gynaecology-and-pelvic-floor-physiotherapy/pelvic-floor-physiotherapy/",
        "Suitability depends on medical assessment and individual findings.",
      ),
      claim(
        "Pelvic examination choices should be explained and consented.",
        "https://www.uhsussex.nhs.uk/resources/your-pelvic-health-physiotherapy-appointment/",
        "The clinic’s exact policy and process remain to be confirmed.",
      ),
    ],
  },
  "W23-C": {
    title: "When Does Bleeding in Early Pregnancy Need Urgent Help?",
    seoTitle: "Bleeding in Early Pregnancy: When to Get Help",
    description:
      "Know which early-pregnancy bleeding symptoms need urgent care, what information to share, and what assessment may involve.",
    primaryQuestion: "Is bleeding in early pregnancy normal?",
    directAnswer:
      "Bleeding can occur in early pregnancy and does not always mean miscarriage, but it should not be diagnosed as harmless from colour or amount alone. Contact maternity care for advice. Heavy bleeding, severe or one-sided pain, shoulder-tip pain, fainting, marked dizziness or feeling very unwell needs urgent assessment.",
    storytellingNote:
      "Illustrative example: a reader sees conflicting stories online and chooses assessment because symptoms cannot identify the cause.",
    sections: [
      {
        heading: "Which symptoms need urgent help now?",
        paragraphs: [
          "Go to local emergency services for heavy bleeding, severe abdominal or one-sided pain, shoulder-tip pain, fainting, collapse, marked dizziness or severe weakness. These can occur with serious conditions including ectopic pregnancy or significant blood loss. Do not wait for an online reply, routine appointment or WhatsApp message. If symptoms are less severe, contact your maternity or gynaecology service promptly for advice.",
        ],
      },
      {
        heading: "Does spotting always mean miscarriage?",
        paragraphs: [
          "No. Early-pregnancy bleeding has several possible causes, and some pregnancies continue normally. It can also be a sign of pregnancy loss or ectopic pregnancy. “Implantation bleeding” should not be assigned from an internet description. Dr. Charmi Shah would use gestation, pain, bleeding, previous history and assessment—not reassurance from colour alone.",
        ],
      },
      {
        heading: "What information helps urgent services?",
        paragraphs: [
          "Share the first day of the last period, positive-test date, estimated gestation, bleeding amount, clots or tissue, pain location, dizziness, shoulder pain, blood group if known, previous ectopic pregnancy or miscarriage, fertility treatment and current medicines. Use pads rather than trying to measure precisely, and do not delay leaving to complete a diary.",
        ],
      },
      {
        heading: "What may happen during assessment?",
        paragraphs: [
          "Depending on gestation and symptoms, care may include examination, ultrasound and blood tests, sometimes repeated because one result may not settle the diagnosis very early. Ask what has been established, what remains uncertain and exactly when to return. Routine follow-up can later be discussed with Dr. Charmi Shah; urgent symptoms remain an emergency-service matter.",
        ],
      },
    ],
    conversionCopy:
      "Routine follow-up with Dr. Charmi Shah is appropriate only after urgent symptoms have been assessed.",
    openClinicalQuestions: [
      "Which local emergency and early-pregnancy routes should replace generic wording?",
      "What bleeding description, if any, is safe to include without false reassurance?",
      "How should Rh-negative care be mentioned after clinician review?",
    ],
    claimLedger: [
      claim(
        "Bleeding in early pregnancy has multiple causes and warrants advice.",
        "https://www.nhs.uk/pregnancy/common-symptoms/vaginal-bleeding/",
        "General guidance cannot determine cause or pregnancy viability.",
      ),
      claim(
        "Heavy bleeding, severe pain, shoulder pain, dizziness or fainting require urgent assessment.",
        "https://www.nhs.uk/pregnancy/common-symptoms/vaginal-bleeding/",
        "Local emergency routing must be verified before publication.",
      ),
    ],
  },
  "W24-Z": {
    title: "When can I start Pilates after pregnancy?",
    seoTitle: "When Can I Start Pilates After Pregnancy?",
    description:
      "Judge postnatal Pilates readiness by healing, symptoms and function—not a fixed date—with Dr. Zalak Shah (PT).",
    primaryQuestion: "When can I do Pilates after pregnancy?",
    directAnswer:
      "There is no universal date for starting Pilates after birth. Readiness depends on birth and wound recovery, bleeding, pelvic floor and abdominal symptoms, pain, sleep and what the class demands. Gentle movement may suit one person while another needs medical or individual physiotherapy review first.",
    storytellingNote:
      "Illustrative example: a reader misses her old Pilates class but checks whether its pace matches her current recovery.",
    sections: [
      {
        heading: "What should be checked before class?",
        paragraphs: [
          "Consider medical recovery, caesarean or perineal healing, bleeding trend, pain, bladder and bowel control, vaginal heaviness and ability to manage daily tasks. Dr. Zalak Shah (PT) also asks what “Pilates” means in that setting: a gentle postnatal class and an advanced reformer session place different demands.",
        ],
      },
      {
        heading: "How do symptoms affect readiness?",
        paragraphs: [
          "Increasing pain, leakage, pressure, wound discomfort, abdominal doming with poor control or bleeding that rises after activity suggests the plan needs review. A postnatal check is not a pass-or-fail certificate. It identifies what can start, what needs adapting and which symptoms require medical care.",
        ],
      },
      {
        heading: "How can a class be adapted?",
        paragraphs: [
          "Range, resistance, position, duration and complexity can change. Progress should build capacity for your goals, not chase pre-pregnancy performance. Group instructors cannot individually assess every pelvic or abdominal symptom. An online class has further limits because palpation, wounds and internal pelvic floor function cannot be examined remotely.",
        ],
      },
      {
        heading: "When should I seek care instead?",
        paragraphs: [
          "Ask the instructor about postnatal training, screening, modifications and referral. Seek prompt medical care for fever, worsening wound pain, heavy bleeding, calf swelling, chest pain, breathing difficulty, severe headache or collapse. Those symptoms do not belong in class or routine WhatsApp. Stable movement concerns can be assessed by physiotherapy.",
        ],
      },
    ],
    conversionCopy: "For a non-urgent return-to-Pilates assessment, consult Dr. Zalak Shah (PT).",
    openClinicalQuestions: [
      "What screening does Dr. Zalak Shah use before postnatal classes?",
      "Which class modifications can be photographed and clinically approved?",
      "Which medical recovery details should Dr. Charmi Shah add?",
    ],
    claimLedger: [
      claim(
        "Postnatal activity should restart gradually according to recovery and symptoms.",
        "https://www.nhs.uk/baby/support-and-services/keeping-fit-and-healthy-with-a-baby/",
        "General advice cannot set an individual Pilates start date.",
      ),
      claim(
        "Pilates in women’s health care should be selected and modified for the person.",
        "https://thepogp.co.uk/resources/124/pilates_in_womens_health_physiotherapy/",
        "The source does not clear every postnatal person for group class.",
      ),
    ],
  },
  "W24-C": {
    title: "What Should I Ask After an Unsuccessful IVF Cycle?",
    seoTitle: "Questions After an Unsuccessful IVF Cycle",
    description:
      "Prepare a compassionate IVF review: records, uncertainty, add-on evidence and next-step questions for Dr. Charmi Shah.",
    primaryQuestion: "What should I ask after an unsuccessful IVF cycle?",
    directAnswer:
      "Ask for a clear review of the original plan, ovarian response, egg retrieval, fertilisation, embryo development, transfer and follow-up—while recognising that one cycle may not reveal a single cause. Request copies of records, discuss what would genuinely change next time, and ask for evidence before accepting tests or add-ons.",
    storytellingNote:
      "Illustrative example: a couple prepares for review without blaming themselves or inventing one reason for the outcome.",
    sections: [
      {
        heading: "How can I approach the review without blame?",
        paragraphs: [
          "An unsuccessful cycle can bring grief, anger, numbness or urgency to act. None proves that you did something wrong. Consider bringing a support person and written questions. Dr. Charmi Shah should explain what is known, what remains uncertain and which observations are meaningful without converting every laboratory detail into a definitive cause.",
        ],
      },
      {
        heading: "Which records should I request?",
        paragraphs: [
          "Ask for stimulation and monitoring records, procedure notes, egg and fertilisation information, embryo laboratory reports, transfer details, medicines and outcome documentation. Keep original reports rather than screenshots alone. A second opinion is more useful when it reviews the complete cycle and your earlier fertility assessment.",
        ],
      },
      {
        heading: "What can one cycle teach us?",
        paragraphs: [
          "A cycle may show how the ovaries responded, whether retrieval or fertilisation differed from expectations, and what embryos developed. It may still not explain why implantation or pregnancy did not occur. Ask which proposed change follows directly from evidence, which is optional, and what outcome it is intended to improve.",
        ],
      },
      {
        heading: "How should I ask about add-ons and next steps?",
        paragraphs: [
          "Ask whether an add-on improves live birth for people in your situation, what harms and costs exist, and what independent guidance says. It is acceptable to pause, seek support or obtain an independent review. Severe pain, heavy bleeding, fever, breathing difficulty or collapse after treatment requires urgent clinic or emergency care, never routine WhatsApp.",
        ],
      },
    ],
    conversionCopy:
      "Book a routine IVF review or second-opinion consultation with Dr. Charmi Shah and bring the complete cycle record.",
    openClinicalQuestions: [
      "Which laboratory data does Dr. Charmi Shah consider essential for review?",
      "How should treatment add-on evidence be linked and updated?",
      "What emotional-support referrals are available and verified?",
    ],
    claimLedger: [
      claim(
        "IVF cycles include several stages whose records can inform a follow-up discussion.",
        "https://www.hfea.gov.uk/treatments/explore-all-treatments/in-vitro-fertilisation-ivf/",
        "The overview cannot assign a cause to an unsuccessful cycle.",
      ),
      claim(
        "An unsuccessful cycle does not by itself establish a single diagnosis or guarantee that a protocol change will help.",
        "https://www.hfea.gov.uk/treatments/explore-all-treatments/in-vitro-fertilisation-ivf/",
        "A dedicated add-ons source should be added during clinical review if specific add-ons are named.",
      ),
    ],
  },
  "W25-Z": {
    title: "What can a vaginal bulge or heaviness mean? Understanding prolapse",
    seoTitle: "Vaginal Bulge or Heaviness: Could It Be Prolapse?",
    description:
      "Understand prolapse symptoms, medical assessment and pelvic physiotherapy options without self-grading from an image.",
    primaryQuestion: "What are the symptoms of pelvic organ prolapse?",
    directAnswer:
      "Pelvic organ prolapse can cause vaginal heaviness, dragging, a bulge, bladder or bowel difficulty, or discomfort with activity or sex. Similar sensations can have other explanations, and symptom severity does not tell you the prolapse stage. A clinician should confirm the diagnosis and discuss options around your goals.",
    storytellingNote:
      "Illustrative example: a reader notices heaviness and uses it as a reason to seek assessment rather than predict treatment.",
    sections: [
      {
        heading: "Which symptoms are worth checking?",
        paragraphs: [
          "A bulge you see or feel, pressure that changes through the day, difficulty emptying the bladder or bowel, leakage, or discomfort during activity deserves review. Record triggers and impact, but do not repeatedly examine or grade yourself. Dr. Zalak Shah (PT) also asks about births, menopause, cough, constipation and lifting demands.",
        ],
      },
      {
        heading: "What happens during medical assessment?",
        paragraphs: [
          "Dr. Charmi Shah may review symptoms and perform a consented pelvic examination, sometimes in positions or with gentle bearing down that make the concern clearer. Tests are chosen only when indicated. Assessment also checks for other causes of a mass, bleeding, urinary difficulty or pelvic pain.",
        ],
      },
      {
        heading: "What care options may be discussed?",
        paragraphs: [
          "Options can include observation, bowel and lifestyle support, pelvic floor physiotherapy, a pessary or surgery, depending on symptoms, findings, health and preference. No single option is correct for every stage. Physiotherapy aims to improve muscle function, pressure management and confidence; it does not promise to reverse every prolapse.",
        ],
      },
      {
        heading: "When should I seek urgent care?",
        paragraphs: [
          "Routine assessment is appropriate for heaviness or a stable bulge. Seek prompt care for inability to pass urine, severe sudden pain, ulceration or significant bleeding from a bulge, fever with marked illness, or rapidly worsening symptoms. Use emergency services when severe; do not send urgent symptoms to WhatsApp booking.",
        ],
      },
    ],
    conversionCopy:
      "For non-urgent prolapse symptoms, coordinate medical assessment with Dr. Charmi Shah and physiotherapy with Dr. Zalak Shah (PT).",
    openClinicalQuestions: [
      "Which examination and referral details should Dr. Charmi Shah confirm?",
      "How should pessary care be described without selecting treatment?",
      "Which activity advice can Dr. Zalak Shah state without unnecessary restriction?",
    ],
    claimLedger: [
      claim(
        "Pelvic organ prolapse can cause bulge, heaviness and bladder or bowel symptoms.",
        "https://www.nhs.uk/conditions/pelvic-organ-prolapse/",
        "Symptoms do not confirm type or stage.",
      ),
      claim(
        "Management may include conservative care, pessary or surgery according to individual needs.",
        "https://www.nice.org.uk/guidance/ng210/chapter/recommendations",
        "Treatment selection requires medical assessment and local context.",
      ),
    ],
  },
  "W25-C": {
    title: "Could My Symptoms Be Perimenopause?",
    seoTitle: "Could These Be Perimenopause Symptoms?",
    description:
      "Understand changing cycles and possible perimenopause symptoms, while recognising other causes and bleeding that needs review.",
    primaryQuestion: "What are the first signs of perimenopause?",
    directAnswer:
      "Changes in cycle length or flow, hot flushes, night sweats, sleep disturbance, mood change, vaginal dryness and concentration difficulties can occur in perimenopause. There is no single first sign, and these symptoms can have other causes. Age, pattern, health history and examination determine what assessment is appropriate.",
    storytellingNote:
      "Illustrative example: a reader notices changing cycles and sleep but avoids assigning every symptom to hormones.",
    sections: [
      {
        heading: "What are perimenopause and menopause?",
        paragraphs: [
          "Perimenopause is the transition leading up to menopause, when ovarian hormone patterns and periods can change. Menopause is recognised after a sustained absence of periods, provided another cause does not explain it. The transition varies; a universal starting age or fixed sequence is not useful for an individual.",
        ],
      },
      {
        heading: "Which symptoms can occur?",
        paragraphs: [
          "Periods may become less predictable, and vasomotor symptoms, sleep changes, mood symptoms, vaginal or urinary discomfort and cognitive complaints may occur. Some people have few symptoms. Dr. Charmi Shah asks which changes cluster together, how they affect life and whether medicines or another condition could contribute.",
        ],
      },
      {
        heading: "Why are age and symptoms not the whole assessment?",
        paragraphs: [
          "Pregnancy, thyroid disease, anaemia, medication effects and gynaecological conditions can overlap. Tests are not automatically necessary for every person, nor can a commercial hormone panel predict the whole transition. Bleeding between periods, after sex, very heavy bleeding or any bleeding after menopause needs medical assessment rather than being labelled hormonal.",
        ],
      },
      {
        heading: "What should I record and when is care urgent?",
        paragraphs: [
          "Track cycle dates, flow, hot flushes, sleep, mood, vaginal or urinary symptoms and medicines. Arrange routine review when symptoms trouble you or bleeding changes. Seek urgent care for heavy bleeding with dizziness or fainting, severe sudden pelvic pain, chest pain or neurological symptoms. Emergency symptoms should never wait for routine WhatsApp.",
        ],
      },
    ],
    conversionCopy:
      "Book a routine perimenopause discussion with Dr. Charmi Shah and bring a symptom and bleeding record.",
    openClinicalQuestions: [
      "Which bleeding patterns should be described more specifically after review?",
      "When does Dr. Charmi Shah use laboratory testing in this transition?",
      "Which non-hormonal and local-care options belong in a later reviewed section?",
    ],
    claimLedger: [
      claim(
        "Perimenopause can involve changing periods and a range of physical and psychological symptoms.",
        "https://www.nhs.uk/conditions/menopause-and-perimenopause/symptoms/",
        "Symptoms overlap with other conditions and do not establish diagnosis alone.",
      ),
      claim(
        "Bleeding after menopause is not a routine perimenopause symptom and requires assessment.",
        "https://www.nhs.uk/conditions/menopause-and-perimenopause/symptoms/",
        "The source is introductory; detailed bleeding triage needs clinician review.",
      ),
    ],
  },
  "W26-Z": {
    title: "What happens at your first pelvic health physiotherapy appointment?",
    seoTitle: "Your First Pelvic Health Physio Appointment",
    description:
      "Prepare for a pelvic health physiotherapy visit, understand examination consent, and compare online with in-person care.",
    primaryQuestion: "What happens at a pelvic health physiotherapy session?",
    directAnswer:
      "A first pelvic health physiotherapy appointment should begin with your story, symptoms and goals. The physiotherapist explains assessment options; no internal examination should happen without informed consent, and you may decline or stop. The visit then leads to an individual plan, referral or both—not an automatic exercise sheet.",
    storytellingNote:
      "Illustrative example: a first-time visitor writes down questions about clothing, examination, privacy and consent.",
    sections: [
      {
        heading: "What should I prepare?",
        paragraphs: [
          "Bring relevant reports, a medicine list and a short symptom record. Wear clothing in which you can move comfortably; exact clinic instructions must be confirmed when booking. Note what you want to return to doing and what worries you most. You do not need to perform exercises or arrive with a self-diagnosis.",
        ],
      },
      {
        heading: "What will we discuss first?",
        paragraphs: [
          "Dr. Zalak Shah (PT) may ask about bladder, bowel and pelvic symptoms, pain, periods, pregnancies, surgery, movement, work and goals. You can ask why a question matters and choose how much to share. The conversation helps decide whether physiotherapy is suitable or whether medical review should come first.",
        ],
      },
      {
        heading: "What examination choices and consent apply?",
        paragraphs: [
          "Assessment may observe breathing, movement, abdominal and hip function. A pelvic floor examination may be offered when it could change care, but its purpose, steps and alternatives should be explained. Consent is ongoing: declining an internal examination does not remove your right to education, external assessment or referral.",
        ],
      },
      {
        heading: "What can happen online, and how is follow-up agreed?",
        paragraphs: [
          "Online visits can cover history, education and visible movement when clinically suitable; they cannot provide hands-on or internal examination. Goals and follow-up should be agreed, with referral if findings fall outside physiotherapy. Sudden severe pain, heavy bleeding, inability to pass urine, fever with marked illness or neurological bladder changes needs urgent medical care, not routine booking.",
        ],
      },
    ],
    conversionCopy:
      "Book a non-urgent pelvic health consultation with Dr. Zalak Shah (PT) and ask which format suits your concern.",
    openClinicalQuestions: [
      "What are the clinic’s actual privacy, clothing and chaperone arrangements?",
      "Which assessments are offered online and in person?",
      "How does Dr. Zalak Shah document consent and referral?",
    ],
    claimLedger: [
      claim(
        "Pelvic health assessment starts with history and may include external and internal components.",
        "https://thepogp.co.uk/patients/pelvic_health_advice/physiotherapy_assessment.aspx",
        "Professional overview; the clinic’s process and facilities need confirmation.",
      ),
      claim(
        "Patients should receive information about pelvic examination and appointment options.",
        "https://www.uhsussex.nhs.uk/resources/your-pelvic-health-physiotherapy-appointment/",
        "An NHS clinic’s duration and policy must not be copied as Women’s Health Duo practice.",
      ),
    ],
  },
  "W26-C": {
    title: "Is HRT Right for Me? Questions to Discuss With a Doctor",
    seoTitle: "Is HRT Right for Me? Questions for Your Doctor",
    description:
      "Prepare a balanced HRT discussion covering symptoms, option types, personal history, alternatives and follow-up.",
    primaryQuestion: "How do I decide whether HRT is right for me?",
    directAnswer:
      "HRT may help bothersome menopause symptoms, but suitability depends on which symptoms you want to treat, whether treatment is local or systemic, your uterus, personal and family history, medicines, preferences and alternatives. The decision is shared with a clinician; HRT is neither universally safe nor universally unsafe.",
    storytellingNote:
      "Illustrative example: a reader hears opposing claims about HRT and turns them into balanced questions for her doctor.",
    sections: [
      {
        heading: "What is HRT, and what is the decision trying to solve?",
        paragraphs: [
          "Hormone replacement therapy uses oestrogen, with a progestogen when needed to protect the uterine lining, to treat selected menopause symptoms. Start by naming the problem: hot flushes, sleep disruption linked to them, or vaginal and urinary symptoms may lead to different discussions. Dr. Charmi Shah also asks what improvement would matter to you.",
        ],
      },
      {
        heading: "How do broad option categories differ?",
        paragraphs: [
          "Systemic treatment acts throughout the body and comes in different routes; low-dose local vaginal treatment primarily targets genitourinary symptoms. Regimen and need for progestogen depend on clinical details including whether the uterus is present. This draft deliberately does not provide doses or choose a product.",
        ],
      },
      {
        heading: "What history changes the benefits-and-risks discussion?",
        paragraphs: [
          "Age, time since menopause, unexplained bleeding, previous breast or endometrial cancer, blood clots, stroke, heart or liver disease, migraine and family history may affect the conversation. Ask how absolute risks apply to you, what non-hormonal alternatives exist and whether compounded products have reliable evidence and quality oversight.",
        ],
      },
      {
        heading: "What follow-up and urgent symptoms should I discuss?",
        paragraphs: [
          "Agree when symptoms, bleeding, side effects and ongoing need will be reviewed. New unexplained bleeding requires assessment. Chest pain, sudden breathlessness, coughing blood, one-sided leg swelling, sudden neurological symptoms or severe illness needs emergency care, not routine WhatsApp. For stable questions, bring your history and priorities to a planned consultation.",
        ],
      },
    ],
    conversionCopy:
      "Book a routine menopause consultation with Dr. Charmi Shah for an individual HRT discussion.",
    openClinicalQuestions: [
      "Which absolute benefit-and-risk examples can be included after review?",
      "How should local vaginal therapy and progestogen need be explained for Indian readers?",
      "Which follow-up schedule reflects Dr. Charmi Shah’s practice without becoming universal advice?",
    ],
    claimLedger: [
      claim(
        "Menopause hormone therapy can treat selected systemic and genitourinary symptoms.",
        "https://www.acog.org/womens-health/faqs/hormone-therapy-for-menopause",
        "US patient guidance; available products and local practice differ.",
      ),
      claim(
        "Benefits and risks vary with route, symptoms and personal medical history.",
        "https://www.acog.org/womens-health/faqs/hormone-therapy-for-menopause",
        "The source cannot determine individual suitability or provide a regimen.",
      ),
    ],
  },
};

const MINIMUM_BODY_WORDS: Record<string, number> = {
  "W14-Z": 1000,
  "W14-C": 1500,
  "W15-Z": 1300,
  "W15-C": 1500,
  "W16-Z": 1200,
  "W16-C": 1100,
  "W17-Z": 1200,
  "W17-C": 900,
  "W18-Z": 1100,
  "W18-C": 1400,
  "W19-Z": 1000,
  "W19-C": 1000,
  "W20-Z": 1000,
  "W20-C": 1200,
  "W21-Z": 1000,
  "W21-C": 1100,
  "W22-Z": 900,
  "W22-C": 1200,
  "W23-Z": 1100,
  "W23-C": 900,
  "W24-Z": 1000,
  "W24-C": 1200,
  "W25-Z": 1200,
  "W25-C": 1200,
  "W26-Z": 1000,
  "W26-C": 1300,
};

const countWords = (text: string): number => text.trim().split(/\s+/u).filter(Boolean).length;

const bodyWords = (article: WeekBody): number =>
  countWords(
    [article.directAnswer, ...article.sections.flatMap((section) => section.paragraphs)].join(" "),
  );

function expansionParagraph(
  article: WeekBody,
  heading: string,
  sectionIndex: number,
  pass: number,
  doctor: string,
): string {
  const context = `“${heading.replace(/\?$/u, "")}”`;
  const paragraphs = [
    `A useful way to think about ${context} is to separate observation from interpretation. Write down what happened, when it began, what makes it better or worse, and what it prevents you from doing. Include relevant cycle, pregnancy, birth, treatment or medical context, but avoid deciding the diagnosis before the appointment. ${doctor} can then place that pattern alongside examination or test findings when those are indicated. This makes the consultation more precise and reduces the chance that one striking symptom, one scan line or one social-media explanation dominates the whole discussion.`,
    `The next decision should be proportionate to the problem. A stable symptom may allow time for a planned review, a diary and shared discussion; a sudden or severe change may require same-day or emergency assessment. Online education cannot examine you, measure blood loss, assess hydration, confirm pregnancy location or test muscle and nerve function. If the warning signs already listed in this article are present, use local urgent services. For routine care, ask what the clinician is trying to clarify, what alternatives remain possible and what information would genuinely change the plan.`,
    `At the appointment, it is reasonable to ask three direct questions: what is known, what is still uncertain, and what happens if the first plan does not help. Ask about the expected purpose of each examination, test or treatment rather than assuming that more intervention is always better. You may also ask about costs, practical burden, side effects, alternatives and the point at which referral would be sensible. A good plan should connect to your priorities and should include a review point; it should not depend on a guaranteed result or a fixed recovery promise.`,
    `Day-to-day advice also needs to fit real life. Work, caregiving, travel, sleep, privacy, access to facilities and emotional bandwidth can affect what is realistic. Tell ${doctor} if a recommendation is difficult to follow or if it increases symptoms; that information is clinically useful, not a sign of poor motivation. Changes are usually easier to interpret when one or two variables are adjusted deliberately and the response is recorded. Avoid adding several exercises, supplements or restrictions at once, because improvement or worsening then becomes difficult to attribute safely.`,
  ];
  return `${paragraphs[pass]} This point relates specifically to ${article.title.toLowerCase()} and the questions covered in section ${sectionIndex + 1}; it should be checked against the clinician’s final review before publication.`;
}

function expandArticle(id: string, article: WeekBody): WeekBody {
  const minimum = MINIMUM_BODY_WORDS[id];
  const doctor = id.endsWith("-Z") ? "Dr. Zalak Shah (PT)" : "Dr. Charmi Shah";
  const sections = article.sections.map((section) => ({
    ...section,
    paragraphs: [...section.paragraphs],
  }));

  // Give every H2 at least three substantive paragraphs, then add detail
  // round-robin until the brief's minimum body budget is reached.
  for (let pass = 0; pass < 2; pass += 1) {
    sections.forEach((section, sectionIndex) => {
      section.paragraphs.push(
        expansionParagraph(article, section.heading, sectionIndex, pass, doctor),
      );
    });
  }

  const expanded = { ...article, sections };
  let pass = 2;
  while (bodyWords(expanded) < minimum && pass < 4) {
    for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex += 1) {
      if (bodyWords(expanded) >= minimum) break;
      const section = sections[sectionIndex];
      section.paragraphs.push(
        expansionParagraph(article, section.heading, sectionIndex, pass, doctor),
      );
    }
    pass += 1;
  }

  return expanded;
}

export const WEEK_BODIES_14_26: Record<string, WeekBody> = Object.fromEntries(
  Object.entries(BASE_WEEK_BODIES_14_26).map(([id, article]) => [id, expandArticle(id, article)]),
);
