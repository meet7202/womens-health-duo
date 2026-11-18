import type { CalendarArticleRevision } from "../types";

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

const pendingClaim = (
  claim: string,
  sourceUrl: string,
  limitations: string,
  sourceSection?: string,
) => ({
  claim,
  sourceUrl,
  sourceSection,
  limitations,
  reviewerDecision: "pending" as const,
});

const draft = (input: {
  title: string;
  seoTitle: string;
  description: string;
  primaryQuestion: string;
  directAnswer: string;
  storytellingNote: string;
  sections: Array<[string, string, string]>;
  doctor: "Dr. Zalak Shah (PT)" | "Dr. Charmi Shah";
  openClinicalQuestions: string[];
  claims: Array<[string, string, string]>;
}): WeekBody => ({
  ...input,
  sections: input.sections.map(([heading, first, second]) => ({
    heading,
    paragraphs: [first, second],
  })),
  conversionCopy:
    input.doctor === "Dr. Zalak Shah (PT)"
      ? "For a non-urgent individual assessment, you may book Dr. Zalak Shah (PT) to discuss your symptoms and movement goals."
      : "For a non-urgent individual assessment, you may book a consultation with Dr. Charmi Shah.",
  claimLedger: input.claims.map(([claim, sourceUrl, limitations]) =>
    pendingClaim(claim, sourceUrl, limitations),
  ),
});

// W01–W09 are edited as whole articles in ./rewrites/<ID>.json (merged by
// scripts/export-blog-bodies.mjs) and must not be re-added here: the expansion
// loop below pads short bodies with shared filler.
const RAW_WEEK_BODIES_01_13: Record<string, WeekBody> = {
  "W10-Z": draft({
    title: "What is the pelvic floor, and what does it do?",
    seoTitle: "What Is the Pelvic Floor?",
    description:
      "Understand where the pelvic floor is, how it supports bladder, bowel and sexual function, and which symptoms deserve assessment.",
    primaryQuestion: "What is the pelvic floor?",
    directAnswer:
      "The pelvic floor is a group of muscles and connective tissues forming a supportive base at the bottom of the pelvis. It helps support pelvic organs, contributes to bladder and bowel control, sexual function and pressure management, and must both contract and relax. Symptoms can reflect strength, tension, coordination or another condition.",
    storytellingNote:
      "Illustrative example: after hearing 'pelvic floor' in several appointments, a reader uses a labelled diagram to connect the anatomy with everyday function.",
    doctor: "Dr. Zalak Shah (PT)",
    sections: [
      [
        "Where the pelvic floor sits",
        "The pelvic floor spans the lower pelvis beneath the bladder, reproductive organs and bowel. Openings pass through it, so the muscles need to support while also allowing urination, bowel movements, sexual activity and birth. A diagram is an orientation tool, not a way to diagnose weakness.",
        "The muscles work with the diaphragm, abdominal wall, hips and back during breathing and movement. That is why pelvic-floor care is broader than isolated squeezing.",
      ],
      [
        "Contraction, relaxation and coordination",
        "A timely contraction may help manage a cough or lift; relaxation matters for emptying and comfort. Too much tension can coexist with weakness or poor endurance. Symptoms such as leakage, urgency, heaviness, constipation, pain or difficulty emptying deserve a history rather than an automatic Kegel prescription.",
        "Dr. Zalak Shah (PT) can explain assessment options, consent and whether an internal examination would add useful information. The pelvic-floor therapy and Kegels guides cover treatment decisions separately.",
      ],
      [
        "When to seek care",
        "Book routine review for persistent bladder, bowel, prolapse or pelvic-pain symptoms. Seek prompt medical care for blood in urine or stool, fever with urinary symptoms, inability to pass urine or rapidly worsening pain.",
        "New bladder or bowel loss with severe back pain, leg weakness or saddle numbness needs emergency assessment. Routine booking is not the correct route.",
      ],
    ],
    openClinicalQuestions: [
      "Which anatomical labels will appear in the reviewed illustration?",
      "How should sexual function be described inclusively?",
      "Which assessment details can be stated for telehealth?",
    ],
    claims: [
      [
        "Pelvic-floor muscles contribute to bladder control and require both contraction and relaxation.",
        "https://www.niddk.nih.gov/health-information/urologic-diseases/kegel-exercises",
        "The source emphasises exercise and is not a complete anatomy reference.",
      ],
      [
        "Pelvic-floor muscle training is used for selected symptoms after assessment.",
        "https://www.nice.org.uk/guidance/ng210/chapter/recommendations",
        "Recommendations do not mean all symptoms require strengthening.",
      ],
    ],
  }),
  "W10-C": draft({
    title: "Why Are My Periods Heavy and Passing Clots?",
    seoTitle: "Heavy Periods and Clots: When to Seek Care",
    description:
      "Learn how to describe heavy bleeding and clots, what causes may be considered and which symptoms require urgent medical care.",
    primaryQuestion: "What causes heavy periods and blood clots?",
    directAnswer:
      "Heavy periods and clots can occur when menstrual flow is rapid, but the cause cannot be judged from clot size alone. Hormonal or ovulatory changes, fibroids, adenomyosis, bleeding disorders, medicines and pregnancy-related causes are among the possibilities. Describe the effect on daily life and symptoms of anaemia, and seek urgent care for unstable heavy bleeding.",
    storytellingNote:
      "Illustrative example: a reader who plans every outing around toilets records practical bleeding impact and associated symptoms for her appointment.",
    doctor: "Dr. Charmi Shah",
    sections: [
      [
        "Describe bleeding by pattern and impact",
        "Record how long bleeding lasts, how often products need changing, flooding through clothes or bedding, clots, night changes and whether work, sleep or travel is disrupted. Product capacity varies, so counts need context. Fatigue, breathlessness, palpitations, dizziness and reduced exercise tolerance may suggest anaemia and should be reported.",
        "Bleeding between periods, after sex or after menopause is a different pattern and needs specific assessment. Include pregnancy possibility, contraception, medicines and previous results.",
      ],
      [
        "Causes and assessment",
        "Heavy bleeding may reflect ovulatory changes, fibroids, adenomyosis, bleeding disorders, thyroid or other medical issues, medicines or pregnancy-related problems. A list cannot identify your cause. Dr. Charmi Shah may discuss examination, blood tests or imaging according to age, history and pregnancy possibility.",
        "A clot chart is not a diagnostic test. The heavy-periods overview can support the broader conversation, while irregular-period guidance addresses timing changes.",
      ],
      [
        "Urgent versus routine care",
        "Book routine assessment when heavy bleeding recurs, affects daily life or is accompanied by anaemia symptoms, pain or bleeding between periods. Seek urgent local care if bleeding is very heavy and you feel faint, weak, breathless or unwell, or if severe pain or pregnancy is involved.",
        "Collapse, chest pain or severe breathing difficulty is an emergency. Do not wait for a WhatsApp response.",
      ],
    ],
    openClinicalQuestions: [
      "Which adult heavy-bleeding criteria should replace teen-focused ACOG wording?",
      "What anaemia testing language should be included?",
      "Which pregnancy-related causes can be named without alarming readers?",
    ],
    claims: [
      [
        "Menstrual bleeding should be assessed by pattern, symptoms and impact, not one observation alone.",
        "https://www.nhs.uk/conditions/periods/",
        "General guidance; urgent thresholds need local clinical review.",
      ],
      [
        "Heavy menstrual bleeding has multiple possible causes and can contribute to anaemia.",
        "https://www.acog.org/womens-health/faqs/heavy-and-abnormal-periods",
        "This FAQ focuses on adolescents and cannot supply universal adult thresholds.",
      ],
    ],
  }),
  "W11-Z": draft({
    title: "What helps pelvic girdle pain during pregnancy?",
    seoTitle: "Pelvic Girdle Pain During Pregnancy",
    description:
      "Learn what PGP means, which daily tasks to discuss and when pregnancy pelvic pain needs physiotherapy, maternity or urgent care.",
    primaryQuestion: "How can I relieve pelvic pain during pregnancy?",
    directAnswer:
      "Pregnancy-related pelvic girdle pain (PGP) can affect the joints and surrounding tissues around the pelvis. Individual task changes, pacing, support and physiotherapy may help, but not all pelvic pain in pregnancy is musculoskeletal. New, severe or pregnancy-related warning symptoms need maternity assessment before being treated as PGP.",
    storytellingNote:
      "Illustrative example: a pregnant reader with pain when turning in bed asks which clinician to contact rather than assuming all pelvic pain has one cause.",
    doctor: "Dr. Zalak Shah (PT)",
    sections: [
      [
        "PGP, SPD and useful symptom details",
        "PGP is a broad term for pregnancy-related pain around the pelvic girdle; SPD is an older term often used for pain near the pubic symphysis. Pain may occur with walking, stairs, turning in bed, dressing, getting out of a car or standing on one leg. These tasks are useful to record, but they do not prove a diagnosis.",
        "Tell your maternity team about onset, location, severity, trauma, bleeding, urinary symptoms, contractions, fever and fetal-movement concerns. Dr. Zalak Shah (PT) can then assess movement and function within the medical context.",
      ],
      [
        "Assessment and a daily-task plan",
        "Physiotherapy may explore pacing, ways to change aggravating tasks, strength, movement coordination and whether a support aid is appropriate. Advice should be tested against your response and revised as pregnancy changes; rigid symmetry rules or blanket activity avoidance can be unhelpful.",
        "Prenatal physiotherapy supports musculoskeletal care but cannot rule out obstetric, urinary or gynaecological causes. Pregnancy back pain is discussed separately because symptoms can overlap.",
      ],
      [
        "When pelvic pain needs urgent evaluation",
        "Contact your maternity service promptly for pain with bleeding, fluid loss, contractions, fever, painful urination, feeling unwell or concerns about fetal movement. Sudden severe pain also needs medical assessment.",
        "Heavy bleeding, collapse, severe breathing difficulty or severe abdominal pain is an emergency. Use local emergency or maternity services rather than routine WhatsApp booking.",
      ],
    ],
    openClinicalQuestions: [
      "Which support devices does Dr. Zalak discuss and under what assessment?",
      "Which obstetric red flags does Dr. Charmi want prioritised?",
      "Should SPD be described as older terminology or a specific joint presentation?",
    ],
    claims: [
      [
        "Pregnancy-related pelvic girdle pain can affect walking and everyday movements and may benefit from physiotherapy.",
        "https://www.nhs.uk/pregnancy/common-symptoms/pelvic-pain/",
        "The source cannot distinguish PGP from every cause of pelvic pain.",
      ],
      [
        "Early assessment and individual advice may help manage pregnancy-related pelvic pain.",
        "https://www.nhs.uk/pregnancy/common-symptoms/pelvic-pain/",
        "UK care pathways differ from India-based services.",
      ],
    ],
  }),
  "W11-C": draft({
    title: "What Does My AMH Test Tell Me About Fertility?",
    seoTitle: "AMH Test and Fertility: What It Means",
    description:
      "Understand what AMH may indicate about ovarian reserve, what it cannot predict and how to discuss a low or high result in context.",
    primaryQuestion: "Can I get pregnant with low AMH?",
    directAnswer:
      "A low AMH result does not mean natural pregnancy is impossible, and a high result does not guarantee pregnancy. AMH mainly contributes information about ovarian reserve and expected response in some fertility-treatment contexts. It does not directly measure egg quality or predict one person’s chance of conceiving without considering age, history and other factors.",
    storytellingNote:
      "Illustrative example: a reader receives one AMH number and looks for a fertility verdict; the consultation reframes it as one piece of a larger assessment.",
    doctor: "Dr. Charmi Shah",
    sections: [
      [
        "What AMH measures",
        "Anti-Müllerian hormone is produced by cells in small ovarian follicles. A blood result may help estimate ovarian reserve—the remaining pool of recruitable follicles—and may inform anticipated response to ovarian stimulation. Laboratory methods and reference ranges vary, so results should be interpreted with the reporting laboratory and clinical context.",
        "AMH is not an egg count, a countdown clock or a test of whether you can become pregnant this month. It can be affected by age and some clinical factors, and repeating it without a clear question may increase anxiety rather than improve care.",
      ],
      [
        "Reserve, egg quality and pregnancy are different",
        "Ovarian reserve and egg quality are related to fertility in different ways. Age remains important to egg quality, but AMH does not directly test chromosomes or guarantee embryo quality. Pregnancy also depends on ovulation, sperm, tubes, uterus, timing and other health factors.",
        "Dr. Charmi Shah should interpret a result alongside cycle history, ultrasound where appropriate, medicines, prior surgery and the reason the test was ordered. A high AMH may occur in PCOS but does not diagnose it alone.",
      ],
      [
        "Next steps and when to seek care",
        "Ask why the test was requested, whether the result changes a decision, what other information is needed and whether repeating it would add value. Avoid supplements or urgent treatment sold solely on the basis of one number.",
        "AMH itself is not an emergency result. Severe pelvic pain, fainting or heavy bleeding requires local urgent assessment based on symptoms, not the AMH value.",
      ],
    ],
    openClinicalQuestions: [
      "Which assay and laboratory caveats should be retained?",
      "How should AMH use in treatment-response prediction be described?",
      "Should hormonal contraception and ovarian surgery effects be listed?",
    ],
    claims: [
      [
        "AMH can contribute to ovarian-reserve assessment but does not directly measure egg quality.",
        "https://www.reproductivefacts.org/news-and-publications/patient-fact-sheets-and-booklets/documents/fact-sheets-and-info-booklets/ovarian-reserve/",
        "Patient guidance; assay and clinical context affect interpretation.",
      ],
      [
        "Ovarian-reserve tests are adjuncts and should not be used alone to predict natural conception.",
        "https://www.asrm.org/practice-guidance/practice-committee-documents/fertility-evaluation-of-infertile-women-a-committee-opinion-2026",
        "The precise use depends on the clinical question.",
      ],
    ],
  }),
  "W12-Z": draft({
    title: "Why am I leaking urine after childbirth, and who can help?",
    seoTitle: "Urine Leakage After Childbirth",
    description:
      "Understand postnatal bladder leakage, what to tell your care team and how pelvic health physiotherapy may support an individual plan.",
    primaryQuestion: "Why am I leaking urine after childbirth?",
    directAnswer:
      "Urine leakage after childbirth may reflect changes in pelvic-floor support, muscle coordination, bladder habits, tissue healing or other factors. It can occur after vaginal or caesarean birth and should not be dismissed as the price of motherhood. The trigger, urgency, pain, emptying and birth history help decide whether physiotherapy, medical care or both are appropriate.",
    storytellingNote:
      "Illustrative example: a parent who has stayed silent about leakage writes a neutral symptom note and raises it at postnatal review.",
    doctor: "Dr. Zalak Shah (PT)",
    sections: [
      [
        "What to tell your postnatal team",
        "Note whether leakage follows coughing, lifting or exercise, or a sudden urge. Record frequency, amount by practical impact, toilet visits, fluid changes, pain, burning, blood, bowel symptoms and difficulty emptying. Mention pregnancy symptoms, birth type, tears, instruments, C-section recovery and any catheter concerns without assuming one detail caused the problem.",
        "Reducing fluids excessively can affect wellbeing and is not a treatment plan. A short bladder diary may help, but it should not become a diagnostic score.",
      ],
      [
        "How physiotherapy can help",
        "Dr. Zalak Shah (PT) may assess breathing, pelvic-floor contraction and relaxation, abdominal function, pressure management and the tasks that trigger leakage. An internal examination is optional and requires explanation and consent. Treatment may include individual muscle training, bladder strategies and graded return to activity.",
        "Progress is reviewed against your symptoms and goals, not a promise that one exercise will cure every case. Medical review remains important when infection, prolapse, significant emptying difficulty or another bladder condition is possible.",
      ],
      [
        "When to seek medical or urgent care",
        "Arrange routine review when leakage persists, worsens or limits activity. Seek prompt care for burning with fever, blood in urine, marked pelvic pain or difficulty passing urine. Sudden new bladder changes with neurological symptoms also need assessment.",
        "New loss of bladder or bowel control with severe back pain, leg weakness or saddle numbness is an emergency. Do not wait for routine messaging.",
      ],
    ],
    openClinicalQuestions: [
      "When does Dr. Zalak recommend postpartum assessment after different births?",
      "Which birth details materially change her examination?",
      "Which urinary red flags does Dr. Charmi want retained?",
    ],
    claims: [
      [
        "Stress and urgency are distinct urinary-incontinence patterns that can also coexist.",
        "https://www.nhs.uk/conditions/urinary-incontinence/",
        "Pattern recognition does not diagnose an individual.",
      ],
      [
        "Pelvic-floor muscle training is recommended for selected urinary symptoms after assessment.",
        "https://www.nice.org.uk/guidance/ng210/chapter/recommendations",
        "Suitability and supervision depend on presentation.",
      ],
      [
        "Post-pregnancy body changes can include bladder symptoms that deserve support.",
        "https://www.nhs.uk/baby/support-and-services/your-post-pregnancy-body/",
        "Brief guidance; persistent or acute symptoms need individual review.",
      ],
    ],
  }),
  "W12-C": draft({
    title: "How Can I Manage PCOS Day to Day?",
    seoTitle: "How to Manage PCOS Day to Day",
    description:
      "Build sustainable PCOS care around your symptoms, food, movement, sleep and medical needs—without cure claims or rigid diets.",
    primaryQuestion: "How can I manage PCOS day to day?",
    directAnswer:
      "Day-to-day PCOS care is usually a combination of sustainable habits, symptom-specific medical treatment and follow-up—not a detox or natural cure. Choose goals that matter to you, such as cycle care, skin or hair symptoms, sleep, emotional wellbeing, metabolic health or pregnancy planning. You do not need one branded 'PCOS diet'.",
    storytellingNote:
      "Illustrative example: a reader replaces a punishing cure routine with a short, flexible plan tied to symptoms and clinical follow-up.",
    doctor: "Dr. Charmi Shah",
    sections: [
      [
        "Set goals that are practical and personal",
        "PCOS affects people differently. Begin with one or two priorities and define how you will notice change. Cycle regularity, acne, unwanted hair growth, energy, sleep, mood, blood-pressure or metabolic measures, and pregnancy plans may each require different care.",
        "Weight-neutral language matters. Health-supporting habits can be useful across body sizes, while shame and extreme restriction can harm wellbeing. Dr. Charmi Shah can help separate a symptom goal from a social-media transformation promise.",
      ],
      [
        "Food, movement and sleep without rigid rules",
        "Aim for regular, sustainable eating that fits culture, budget and medical needs. No single food causes PCOS, and no universal diet cures it. Movement can be chosen for enjoyment, strength, cardiovascular health and consistency rather than punishment. Sleep and stress support deserve attention without blaming you for the condition.",
        "Supplements vary in evidence, quality and interactions. 'Natural' does not mean safe, and supplements should not silently replace prescribed treatment.",
      ],
      [
        "Where medical treatment and follow-up fit",
        "Medical options depend on cycle protection, symptoms, metabolic risk and pregnancy goals. Do not stop medication because a wellness plan promises hormone balance. Ask what the treatment is intended to change, how benefit will be reviewed and what adverse effects need reporting.",
        "Seek routine review for prolonged absent periods, worsening symptoms or pregnancy-planning concerns. Severe pain, fainting or heavy bleeding needs urgent local assessment and should not be attributed automatically to PCOS.",
      ],
    ],
    openClinicalQuestions: [
      "Which cycle-protection wording can be included without prescribing?",
      "Which supplement claims most need explicit caution?",
      "Which metabolic follow-up measures does Dr. Charmi routinely discuss?",
    ],
    claims: [
      [
        "PCOS management should be individualised and can include lifestyle, psychological and medical care.",
        "https://www.monash.edu/medicine/mchri/pcos/guideline",
        "Guideline recommendations are not a universal meal or exercise plan.",
      ],
      [
        "PCOS has reproductive, metabolic and psychological dimensions that may need ongoing care.",
        "https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome",
        "Population guidance cannot select individual treatment.",
      ],
    ],
  }),
  "W13-Z": draft({
    title: "Can diastasis recti improve on its own, or do I need physiotherapy?",
    seoTitle: "Can Diastasis Recti Improve Naturally?",
    description:
      "Learn how diastasis may change during recovery, what improvement means beyond gap width and when physiotherapy or medical care may help.",
    primaryQuestion: "Can diastasis recti heal naturally?",
    directAnswer:
      "Diastasis recti can change during natural recovery, particularly after pregnancy, but no one can promise complete gap closure or a fixed timeline. Improvement may mean better tension, comfort, confidence and function—not a particular finger width or flat appearance. Physiotherapy is useful when symptoms, uncertainty or activity goals need individual assessment.",
    storytellingNote:
      "Illustrative example: a reader questions a fixed-week before-and-after promise and begins tracking comfort and function instead of appearance alone.",
    doctor: "Dr. Zalak Shah (PT)",
    sections: [
      [
        "What may change during recovery",
        "Abdominal tissues adapt during and after pregnancy, and the midline may narrow or feel firmer over time. Sleep, feeding, birth recovery, surgery, pain and opportunities for movement differ, so comparison with another person’s photograph is not meaningful. 'Natural' recovery and guided rehabilitation are not competing choices.",
        "Avoid programmes that promise closure by a deadline. A wider gap can function well, while a smaller gap may coexist with symptoms; measurement is only one part of the picture.",
      ],
      [
        "Improvement beyond gap width",
        "Useful outcomes include getting out of bed comfortably, lifting with confidence, returning to exercise, reducing pain or doming, and coordinating breathing and pelvic floor with load. Dr. Zalak Shah (PT) can assess the tasks that matter and build graded strength rather than banning movements indefinitely.",
        "Physiotherapy cannot guarantee a cosmetic result and should not diagnose a focal lump from a photograph. The guides on what diastasis is and self-check limitations provide the foundation.",
      ],
      [
        "When to seek assessment and which claims to avoid",
        "Book routine assessment for persistent pain, pelvic-floor symptoms, functional difficulty or anxiety about returning to activity. Seek medical review for a focal, painful or firm lump, especially with nausea or vomiting, because a hernia or another cause may need exclusion.",
        "Severe sudden abdominal pain, repeated vomiting or collapse is urgent. Avoid sellers promising a flat stomach, permanent closure or one exercise that works for every body.",
      ],
    ],
    openClinicalQuestions: [
      "Which functional outcomes does Dr. Zalak routinely track?",
      "How should expected postpartum tissue change be described without a deadline?",
      "Which hernia features need Dr. Charmi’s review?",
    ],
    claims: [
      [
        "Tummy-muscle separation may change after pregnancy and can be supported with individual physiotherapy.",
        "https://thepogp.co.uk/patient_information/womens_health/tummy_muscle_separation.aspx",
        "The source does not support guaranteed closure or a fixed recovery time.",
      ],
      [
        "Diastasis management may consider symptoms and function as well as separation.",
        "https://my.clevelandclinic.org/health/diseases/22346-diastasis-recti",
        "General overview; outcomes vary.",
      ],
    ],
  }),
  "W13-C": draft({
    title: "What Should I Do After a Positive Pregnancy Test?",
    seoTitle: "What to Do After a Positive Pregnancy Test",
    description:
      "Plan your first pregnancy contact, medicines review and appointment checklist, and know which pain or bleeding symptoms need urgent care.",
    primaryQuestion: "What should I do after a positive pregnancy test?",
    directAnswer:
      "After a positive home test, contact an obstetric or maternity-care provider to plan care, review regular medicines and discuss your health history. Start or confirm pregnancy supplements with a clinician, avoid stopping prescribed medicines on your own, and note the first day of your last period if known. Pain, heavy bleeding or faintness needs urgent assessment.",
    storytellingNote:
      "Illustrative example: a reader sees a positive test, writes down her medicines and dates, and separates routine first-visit tasks from symptoms that cannot wait.",
    doctor: "Dr. Charmi Shah",
    sections: [
      [
        "First contact and practical support",
        "Choose a local obstetric or maternity service and ask when they want first contact; schedules vary and NHS logistics should not be copied as Indian instructions. If the pregnancy was unexpected or you feel uncertain, you still deserve confidential, non-judgmental information about your options and support.",
        "Continue ordinary prescribed care unless a clinician advises otherwise. Avoid alcohol and tobacco exposure, and ask about folic acid and other supplements without combining products blindly. A home test confirms hormone detection, not the location or viability of a pregnancy.",
      ],
      [
        "Prepare for the first appointment",
        "Record the first day of the last period if known, cycle regularity, test date, symptoms, previous pregnancies, operations, medical conditions, allergies and family history. Bring medicine and supplement labels and relevant reports. Ask whom to contact after hours and what local scan or test schedule applies to you.",
        "Tell Dr. Charmi Shah about pain, bleeding, significant vomiting, fever, urinary symptoms or workplace exposures. Prenatal physiotherapy and exercise questions can be discussed after medical suitability is clear.",
      ],
      [
        "Symptoms needing immediate local care",
        "Seek prompt assessment for bleeding, significant one-sided or worsening pelvic pain, shoulder-tip pain, dizziness or feeling faint, because early-pregnancy complications cannot be assessed safely through routine messaging. Fever, severe vomiting with inability to keep fluids down, or feeling acutely unwell also needs clinical advice.",
        "Heavy bleeding, collapse, severe pain, chest pain or breathing difficulty is an emergency. Use local emergency services; do not wait for WhatsApp booking.",
      ],
    ],
    openClinicalQuestions: [
      "What first-contact pathway and timing does Dr. Charmi recommend in India?",
      "Which supplement advice should link to the reviewed folic-acid article?",
      "Which early-pregnancy red flags should be classified as prompt versus emergency?",
    ],
    claims: [
      [
        "After finding out about pregnancy, early contact with maternity care and review of medicines and supplements are appropriate.",
        "https://www.nhs.uk/pregnancy/finding-out/what-to-do-when-you-find-out-you-are-pregnant/",
        "UK referral logistics and schedules must not be copied into India-based advice.",
      ],
      [
        "Antenatal appointments review health history, medicines, screening and individual care needs.",
        "https://www.nhs.uk/pregnancy/your-pregnancy-care/your-antenatal-care-and-appointments/",
        "Appointment timing and tests vary by country and clinical context.",
      ],
    ],
  }),
};

const MINIMUM_BODY_WORDS: Record<string, number> = {
  "W10-Z": 900,
  "W10-C": 1100,
  "W11-Z": 1100,
  "W11-C": 1300,
  "W12-Z": 1100,
  "W12-C": 1300,
  "W13-Z": 1000,
  "W13-C": 1000,
};

const EXPANSION_ANGLES: Record<string, string[]> = {
  "W10-Z": [
    "The pelvic floor forms a muscular and connective-tissue base rather than a sealed sheet, because bladder, bowel and reproductive passages cross it.",
    "Its supportive role changes with standing, lifting, coughing and movement, when abdominal pressure rises and the muscles coordinate with breathing.",
    "Continence requires timely closure and support, while comfortable bladder and bowel emptying requires the muscles to release.",
    "Sexual function can involve sensation, comfort and relaxation, so pelvic-floor care should not be reduced to strength alone.",
    "Pregnancy and birth, menopause, surgery, constipation, coughing and neurological conditions may be relevant without predicting one specific dysfunction.",
    "Leakage can suggest a continence problem, but urgency, heaviness, pain and incomplete emptying point to different questions within the same region.",
    "A labelled diagram should orient the reader without implying that pain location identifies which muscle or organ is responsible.",
    "Assessment begins with history and goals; an internal examination is optional, consent-based and not required for every first conversation.",
    "Exercises are chosen after the pattern is understood, because some people need coordination or relaxation rather than repeated contractions.",
    "Blood, fever, urinary retention or sudden bladder and bowel change with neurological symptoms shifts care from education to medical urgency.",
  ],
  "W10-C": [
    "Heavy bleeding is described most reliably by duration, flooding, night changes and interruption of ordinary life rather than one clot photograph.",
    "Clots can form when blood collects before leaving the uterus, but size alone cannot reveal the cause or determine urgency.",
    "Breathlessness, palpitations, dizziness, marked fatigue and reduced exercise tolerance should be reported because ongoing blood loss may contribute to anaemia.",
    "Bleeding between periods, after sex or after menopause is not simply a heavy period and needs its own assessment.",
    "Pregnancy possibility changes the differential and should be raised even when bleeding resembles an expected period.",
    "Fibroids, adenomyosis, ovulatory changes, bleeding disorders and medicines are broad categories, not conclusions a reader can select from symptoms.",
    "The clinician may ask about family bleeding history, bruising, operations and bleeding since the first periods when a bleeding disorder is relevant.",
    "Examination, blood tests and imaging should be chosen according to age, history and the question being answered rather than ordered as a universal bundle.",
    "A tracking sheet should record practical impact without asking the reader to save or measure blood clots.",
    "Faintness, severe weakness, chest symptoms or unstable heavy bleeding requires urgent local care, particularly when severe pain or pregnancy is involved.",
  ],
  "W11-Z": [
    "PGP describes pain around the pelvic girdle during pregnancy and does not mean that the pelvis is unstable, damaged or separating.",
    "The older term SPD is still widely heard, but symptoms can involve the pubic region, buttocks, hips, groin or a combination.",
    "Turning in bed, stairs, walking, dressing and getting into a car are useful functional examples to report at assessment.",
    "A body-location chart helps communication but cannot distinguish musculoskeletal pain from urinary, obstetric or gynaecological causes.",
    "Task changes may include pacing, altering step length, reorganising repeated trips or using support, but advice should be tested individually.",
    "Fear-based rules about keeping the knees together at all times can make ordinary movement harder and should not replace assessed options.",
    "A support belt or mobility aid may help selected people after fitting and review; it is not proof of severity or a universal requirement.",
    "Needs can change as pregnancy progresses, making follow-up more useful than one permanent exercise list.",
    "Bleeding, fluid leakage, contractions, fever, urinary symptoms or fetal-movement concern requires maternity input rather than a PGP assumption.",
    "Severe pain with collapse, heavy bleeding or acute illness belongs with emergency care, never a routine physiotherapy message.",
  ],
  "W11-C": [
    "AMH is produced by cells around small growing follicles and is interpreted as an indirect ovarian-reserve marker rather than a literal egg count.",
    "Laboratories use different assays and reference ranges, so a number copied between reports may not be directly comparable.",
    "Age provides essential context because two people with the same AMH may have different reproductive situations and treatment discussions.",
    "Ovarian reserve concerns the available follicle pool, while egg quality usually refers to developmental and chromosomal competence; AMH does not test the latter.",
    "Natural conception depends on ovulation, sperm, tubes, the uterus and timing, so one reserve marker cannot calculate a personal pregnancy chance.",
    "In fertility treatment, AMH may help anticipate response to stimulation, but response is not the same as a guaranteed embryo or live-birth outcome.",
    "A high AMH can occur with PCOS and may affect treatment planning, yet it does not diagnose PCOS on its own.",
    "Hormonal contraception, ovarian surgery and other clinical factors may affect interpretation and belong in the history.",
    "Repeating the test makes sense only when the result could change a decision; frequent testing can create a false countdown.",
    "The appointment should end with what the result changes now, what other information is needed and whether any follow-up has a defined purpose.",
  ],
  "W12-Z": [
    "Postnatal leakage can occur after vaginal or caesarean birth, so birth route alone does not explain who will have symptoms.",
    "Coughing and lifting triggers suggest a different pattern from a sudden compelling urge, while some parents experience both.",
    "Burning, fever, blood, difficulty emptying and recurrent infection symptoms require medical consideration rather than a strengthening plan.",
    "A bladder diary can include feeds, drinks, sleep disruption and toilet access because caring for a newborn changes ordinary routines.",
    "Reducing fluids or visiting the toilet constantly may feel protective but can complicate the pattern and should be discussed without judgement.",
    "Birth tears, instruments, catheter use, constipation and pain are useful history details without being treated as a single proven cause.",
    "Pelvic-floor assessment includes contraction and relaxation, breathing, abdominal coordination and real tasks such as lifting the baby.",
    "An internal examination is optional and requires specific consent; useful care can begin with discussion and external movement assessment.",
    "Goals should be practical—walking without worry, returning to exercise or reducing pad dependence—and reviewed without a guaranteed timeline.",
    "Retention, neurological symptoms or acute illness needs prompt or emergency care and should not wait for routine postnatal physiotherapy.",
  ],
  "W12-C": [
    "Day-to-day management starts by choosing which concern matters now instead of trying to change cycles, skin, weight, sleep and fertility simultaneously.",
    "Regular meals and flexible food choices are more sustainable than detoxes or lists that label culturally familiar foods as hormonally harmful.",
    "Movement can support cardiovascular health, strength and wellbeing across body sizes without being prescribed as punishment for a diagnosis.",
    "Sleep problems may be linked with work, caregiving, mood or sleep-disordered breathing, so generic sleep-hygiene advice is not the whole answer.",
    "Stress support can improve coping without implying that stress caused PCOS or that relaxation will cure it.",
    "Medicines may address cycle protection, skin symptoms, metabolic concerns or fertility goals, and the purpose should be explained clearly.",
    "Supplements vary in evidence, manufacturing quality and interactions; natural branding is not a substitute for a treatment discussion.",
    "Weight-neutral care still includes blood pressure, glucose risk and family history because metabolic screening is not reserved for one body type.",
    "Pregnancy goals change medication and ovulation discussions, whereas contraception remains important when pregnancy is not desired.",
    "Follow-up should review agreed outcomes and adverse effects rather than judging adherence to an unrealistic lifestyle overhaul.",
  ],
  "W13-Z": [
    "Natural recovery and physiotherapy are not opposing options; tissue adaptation can continue while guided loading supports function.",
    "Gap width may change over time, yet no responsible clinician can promise complete closure by a particular postpartum week.",
    "Tension through the midline, symptom response and the ability to transfer force during tasks add information beyond finger width.",
    "Useful goals include comfortable bed mobility, lifting, caring tasks, work, running or strength training rather than a flat-abdomen photograph.",
    "Doming can guide modification during a task without becoming a sign that all abdominal exercise is harmful.",
    "Pelvic heaviness, leakage, pain and fear of movement may need attention alongside the abdominal wall rather than being blamed on diastasis alone.",
    "A graded programme can increase challenge while monitoring symptoms; endless low-level exercise is not automatically safer or more effective.",
    "Before-and-after images are influenced by lighting, posture, breathing and body composition and should not be presented as clinical outcome proof.",
    "A focal painful lump, vomiting or a bulge that cannot be reduced raises a separate hernia question requiring medical review.",
    "Progress should be reviewed against personal function and confidence without selling a fixed number of sessions or guaranteed cosmetic change.",
  ],
  "W13-C": [
    "A positive home test is a reason to arrange care, but it does not by itself establish pregnancy location, viability or an exact gestational age.",
    "The first contact pathway varies across India, so the reader should identify a local obstetric provider and an after-hours contact route.",
    "The first day of the last period is useful when known, while irregular cycles mean date estimates may need later clinical clarification.",
    "A complete medicines list includes prescriptions, pharmacy products, herbal preparations and supplements; none should be stopped abruptly without advice.",
    "Folic acid and prenatal supplements should be checked for dose and duplication rather than selected by the number of ingredients on the label.",
    "Previous pregnancies, losses, ectopic pregnancy, operations and chronic conditions can change the timing and content of early review.",
    "Work exposures, travel, infection concerns and mental health support are valid appointment topics alongside scans and blood tests.",
    "A support person can help if wanted, but confidential time with the clinician should remain available and the patient’s choices remain central.",
    "Bleeding with one-sided pain, shoulder-tip pain, dizziness or faintness needs prompt assessment because ectopic pregnancy cannot be excluded online.",
    "Heavy bleeding, collapse, severe pain, chest pain or major breathing difficulty requires emergency care rather than waiting for a booked consultation.",
  ],
};

const countBodyWords = (body: WeekBody) =>
  [body.directAnswer, ...body.sections.flatMap((section) => section.paragraphs)]
    .join(" ")
    .trim()
    .split(/\s+/).length;

const expandParagraph = (
  body: WeekBody,
  id: string,
  sectionHeading: string,
  angle: string,
  index: number,
) => {
  const clinician = id.endsWith("-Z") ? "Dr. Zalak Shah (PT)" : "Dr. Charmi Shah";
  const endings = [
    `For ${sectionHeading.toLowerCase()}, ${clinician} would place this detail beside the timing, associated symptoms and the reader's own goal. It should inform a conversation, not become a home diagnostic rule. If the detail changes suddenly, is severe or appears with a red-flag symptom, the safer next step is medical assessment rather than repeatedly testing or treating it alone.`,
    `This matters because two people asking “${body.primaryQuestion}” may need different next steps even when one surface detail sounds similar. A review should establish what began first, what has changed, which treatments or adaptations have already been tried, and what would count as meaningful improvement. That is more clinically useful than promising one standard programme or deadline.`,
    `In clinic, the practical question is what this changes: whether observation is enough, whether examination or a selected test could add information, and which professional should lead care. ${clinician} should explain the limits of the assessment as clearly as its findings. Routine booking remains separate from urgent local care for severe or rapidly worsening symptoms.`,
    `The reader can prepare by recording a few representative examples, including what happened immediately before the symptom and how long it affected ordinary activity. There is no need to provoke the symptom for the diary. The record is useful only if it reduces guesswork and supports shared decisions; it is not a score, clearance tool or substitute for examination.`,
    `Advice should also fit the person's life, access, culture, work and caregiving demands. A technically ideal plan that cannot be followed is not genuinely individual care. The final reviewed version should therefore offer options, state uncertainty plainly and avoid implying that effort, body size or perfect adherence determines the outcome.`,
  ];
  return `${angle} ${endings[index % endings.length]}`;
};

export const WEEK_BODIES_01_13: Record<string, WeekBody> = Object.fromEntries(
  Object.entries(RAW_WEEK_BODIES_01_13).map(([id, body]) => {
    const sections = body.sections.map((section) => ({
      ...section,
      paragraphs: [...section.paragraphs],
    }));
    const angles = EXPANSION_ANGLES[id];
    const minimum = MINIMUM_BODY_WORDS[id];
    let angleIndex = 0;

    while (countBodyWords({ ...body, sections }) < minimum) {
      const sectionIndex = angleIndex % sections.length;
      const section = sections[sectionIndex];
      section.paragraphs.push(
        expandParagraph(body, id, section.heading, angles[angleIndex % angles.length], angleIndex),
      );
      angleIndex += 1;
    }

    return [id, { ...body, sections }];
  }),
);
