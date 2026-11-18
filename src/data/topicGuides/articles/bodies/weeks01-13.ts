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

const RAW_WEEK_BODIES_01_13: Record<string, WeekBody> = {
  "W01-Z": {
    title: "Why do I leak urine when I cough, sneeze or exercise?",
    seoTitle: "Urine Leakage With Coughing or Exercise",
    description:
      "Understand activity-related urine leakage, what to record and when to seek care. Book a pelvic health consultation if symptoms persist.",
    primaryQuestion: "Why do I leak urine when I cough?",
    directAnswer:
      "Leakage with coughing, sneezing, laughing or exercise often fits a stress-incontinence pattern: pressure rises in the abdomen and the bladder outlet does not stay closed well enough at that moment. It is common, but it is not something you simply have to accept. The pattern, your health history and an examination help guide suitable care.",
    storytellingNote:
      "Illustrative example: a woman stops joining a dance class after noticing a few drops when she jumps, then brings a short symptom record to an assessment rather than assuming the cause.",
    sections: [
      {
        heading: "What leakage with coughing or exercise can mean",
        paragraphs: [
          "A cough creates a quick rise in pressure through the abdomen. Running, lifting, laughing and jumping can do something similar. The pelvic floor and the tissues around the urethra normally help manage that pressure. Leakage may occur when their strength, timing or support is not matching the task. Pregnancy, childbirth, menopause, pelvic surgery, persistent coughing and constipation can be relevant, but no single factor explains every case.",
          "The amount may be a few drops or enough to wet clothing. Frequency also varies. Neither the pad size nor the activity alone gives a diagnosis. Dr. Zalak Shah (PT) would want to understand what happens before, during and after the leak, whether there is heaviness or pain, and how much it is changing your movement, work or social life.",
        ],
      },
      {
        heading: "How this differs from a sudden urge to pass urine",
        paragraphs: [
          "Stress leakage is linked to effort or impact. Urgency leakage follows a sudden, difficult-to-defer need to pass urine. Some people have features of both. You may also notice frequent trips to the toilet, waking at night, difficulty emptying or leakage without a clear trigger. These details matter because a generic strengthening routine does not address every bladder pattern.",
          "Try not to test yourself repeatedly by coughing with a full bladder. Instead, note the real situations in which symptoms arise. A bladder diary may record drinks, toilet visits, urgency, activity and leakage for a few ordinary days. It is an observation tool, not a score and not a substitute for assessment.",
        ],
      },
      {
        heading: "What to note before an assessment",
        paragraphs: [
          "Write down when the problem began; the activities that trigger it; urgency, pain, burning, blood or difficulty emptying; bowel symptoms; pregnancies and births; pelvic procedures; medicines; and any recent change in cough, fluid intake or exercise. Mention whether you reduce drinking or visit the toilet 'just in case', as these coping strategies can affect daily life and the assessment conversation.",
          "A pelvic health physiotherapy assessment may consider breathing and pressure management, pelvic-floor contraction and relaxation, movement strategy, strength and your actual goals. An internal examination is not automatic; its purpose, alternatives and consent should be discussed first. Read what happens during a physiotherapy session and why Kegels are not right for everyone before copying an online programme.",
        ],
      },
      {
        heading: "When to seek care",
        paragraphs: [
          "Arrange routine medical or pelvic health review when leakage is recurring, worsening, limiting activity or making you restrict fluids. Physiotherapy can offer an individual plan and review how symptoms respond, but a physiotherapist does not replace medical assessment when infection, a bladder condition or another cause is possible.",
          "Seek prompt medical care for visible blood in urine, burning with fever, new difficulty passing urine, marked pelvic pain or a sudden new bladder change. New loss of bladder control with severe back pain, leg weakness or numbness around the saddle area needs emergency assessment. Do not use a routine WhatsApp booking pathway for an emergency.",
        ],
      },
    ],
    conversionCopy:
      "For a non-urgent, recurring leakage pattern, you may book a pelvic health physiotherapy assessment with Dr. Zalak Shah (PT).",
    openClinicalQuestions: [
      "Which red-flag wording should Dr. Charmi Shah retain for sudden neurological or urinary symptoms?",
      "Should the symptom-note template use a three-day diary or a flexible 'few typical days' instruction?",
      "Which examination options does Dr. Zalak Shah (PT) routinely offer in person and online?",
    ],
    claimLedger: [
      pendingClaim(
        "Leakage during coughing or exercise is commonly described as stress urinary incontinence.",
        "https://www.nhs.uk/conditions/urinary-incontinence/",
        "A symptom pattern is not a diagnosis; mixed and other forms of incontinence are possible.",
        "Types of urinary incontinence",
      ),
      pendingClaim(
        "Bladder-control problems can affect activity and quality of life and deserve assessment.",
        "https://www.niddk.nih.gov/health-information/urologic-diseases/bladder-control-problems/definition-facts",
        "US patient information; local assessment pathways may differ.",
        "Definition & Facts",
      ),
    ],
  },
  "W01-C": {
    title: "Why Are My Periods Irregular?",
    seoTitle: "Irregular Periods: Causes and When to Seek Care",
    description:
      "Learn what cycle changes to record, common reasons for irregular periods and when to consult a gynaecologist for an individual assessment.",
    primaryQuestion: "Why are my periods irregular?",
    directAnswer:
      "Periods can become irregular for many reasons, including pregnancy, life-stage changes, stress, weight or exercise changes, contraception, PCOS, thyroid problems and other health conditions. One unusual cycle may settle, but a persistent change from your usual pattern deserves context. A cycle record and clinical history are more useful than choosing one explanation from an online list.",
    storytellingNote:
      "Illustrative example: a reader with increasingly variable cycle dates saves several conflicting explanations on her phone, then organises the dates and symptoms that will actually help at a consultation.",
    sections: [
      {
        heading: "Start with what has changed for you",
        paragraphs: [
          "A menstrual cycle is counted from the first day of one period to the first day of the next. Variation is expected across life, and a single late or early bleed does not automatically mean illness. The useful question is whether the timing, flow or associated symptoms have changed from your own pattern, and whether that change is recurring.",
          "First consider pregnancy if it is possible. Also note recent contraception changes, breastfeeding, approaching menopause, major illness, travel, sleep disruption, emotional strain, eating changes or a substantial shift in training. Stress can influence cycles, but it should not become a label that closes the assessment before other relevant causes are considered.",
        ],
      },
      {
        heading: "Common categories a clinician considers",
        paragraphs: [
          "Irregular bleeding may relate to ovulation, hormonal contraception, pregnancy, PCOS, thyroid or prolactin disorders, the menopause transition, or structural conditions affecting the uterus. Age and life stage change how these possibilities are weighed. PCOS is not diagnosed from irregular periods alone, and an ultrasound finding by itself should not be treated as the whole answer.",
          "Bleeding between periods or after sex is different from a cycle simply arriving at variable intervals. So are very heavy flow, severe pain and prolonged absence of periods. Dr. Charmi Shah would place each symptom alongside medical history, medicines and pregnancy possibility before discussing examination or tests.",
        ],
      },
      {
        heading: "A useful cycle and symptom record",
        paragraphs: [
          "For each bleed, record the start and end date, flow by its practical impact, clots, pain, spotting between periods and symptoms such as acne, hair changes, headaches or hot flushes. Add pregnancy-test dates, contraception, medicines and major health changes. If you are trying to conceive, note this too; an app prediction is not proof of ovulation.",
          "Bring previous reports if you have them, but do not arrange a broad panel of tests solely from social-media advice. The examination and investigations that are useful depend on the pattern. The irregular-periods overview and the article on understanding PCOS can help you prepare questions without turning the diary into a self-diagnostic checklist.",
        ],
      },
      {
        heading: "When irregular periods should be checked",
        paragraphs: [
          "Book a routine gynaecology assessment if irregularity persists, periods stop unexpectedly, bleeding occurs between periods or after sex, symptoms are affecting daily life, or you are concerned about fertility. Earlier review can be appropriate when there is a known health condition, a medicine change or a pregnancy possibility.",
          "Seek urgent local care for very heavy bleeding with faintness, breathlessness, chest discomfort or severe weakness; severe or one-sided pelvic pain with a positive pregnancy test; or bleeding during pregnancy that worries you. Emergency symptoms need immediate local services, not WhatsApp booking.",
        ],
      },
    ],
    conversionCopy:
      "If the change is persistent but not urgent, you may discuss your cycle record with Dr. Charmi Shah.",
    openClinicalQuestions: [
      "Which adult cycle-variation thresholds, if any, should be stated for the intended population?",
      "What India-relevant urgent-heavy-bleeding wording should replace subjective product counts?",
      "Which first-line investigations does Dr. Charmi Shah want described without implying a universal panel?",
    ],
    claimLedger: [
      pendingClaim(
        "Cycle timing and flow vary, and a change in the usual pattern can warrant medical advice.",
        "https://www.nhs.uk/conditions/periods/",
        "General UK patient guidance; adult thresholds and local pathways require clinician review.",
        "Periods",
      ),
      pendingClaim(
        "PCOS assessment considers a combination of clinical features rather than one symptom alone.",
        "https://www.acog.org/womens-health/faqs/polycystic-ovary-syndrome-pcos",
        "ACOG patient guidance; criteria differ for adolescents and adults.",
        "How is PCOS diagnosed?",
      ),
    ],
  },
  "W02-Z": {
    title: "Is exercise safe during pregnancy? What to ask before you start",
    seoTitle: "Is Exercise Safe During Pregnancy?",
    description:
      "Learn when pregnancy exercise needs individual advice, how to judge comfort and which warning symptoms require medical care before booking.",
    primaryQuestion: "Is exercise safe during pregnancy?",
    directAnswer:
      "For many uncomplicated pregnancies, suitable physical activity can continue or begin gradually. Safety is individual, however: your pregnancy history, current symptoms, medical conditions and the activity itself matter. Exercise guidance online cannot clear you personally. Discuss uncertainties with your maternity clinician, and use a women’s health physiotherapist for an assessed movement plan.",
    storytellingNote:
      "Illustrative example: after a positive test, a previously active reader wonders whether she must stop everything and writes down questions for her maternity clinician instead of seeking universal clearance online.",
    sections: [
      {
        heading: "Who needs individual advice before exercising?",
        paragraphs: [
          "Tell your obstetric or maternity team what you currently do, how hard it feels, and whether you have pain, bleeding, dizziness, breathlessness before exertion or other symptoms. Also mention previous pregnancy complications, current medical conditions and advice already given. A label such as 'low impact' does not make an activity suitable for every pregnancy.",
          "If you were inactive before pregnancy, gradual progression is different from returning to a familiar routine. If you train competitively, work in heat, lift heavily or do activities with collision or fall risk, the discussion is also more specific. Dr. Zalak Shah (PT) can adapt movement after medical suitability has been clarified; she does not provide obstetric clearance.",
        ],
      },
      {
        heading: "Choosing activity and judging intensity",
        paragraphs: [
          "Walking, swimming, pregnancy-adapted strengthening and some supervised classes may be discussed for uncomplicated pregnancies. Comfort, balance, environment and previous experience matter. The 'talk test' can be a simple conversational cue for moderate effort, but it is not a medical screening test and should not override symptoms or your clinician’s advice.",
          "As pregnancy progresses, body shape, joint loading, temperature tolerance and balance may change. A plan can be adjusted without assuming that every trimester requires the same restrictions. The pregnancy-exercises-by-trimester guide explains broad changes, while prenatal physiotherapy focuses on your symptoms, movement and goals.",
        ],
      },
      {
        heading: "Questions to ask before you start",
        paragraphs: [
          "Ask whether your pregnancy or health history changes activity advice; which movements or environments to avoid; how to modify an existing class; and whom to contact if symptoms occur. Tell the instructor that you are pregnant and check whether they have relevant experience. A prenatal class is not a substitute for medical care.",
          "A physiotherapy assessment can look at pain, pelvic-floor symptoms, daily tasks, breathing and movement options. It should explain why a modification is suggested. Be cautious with programmes promising easier labour, prevention of all complications or a guaranteed recovery.",
        ],
      },
      {
        heading: "When to stop and contact your maternity team",
        paragraphs: [
          "Stop the activity and seek advice for vaginal bleeding, fluid leakage, regular painful contractions, chest pain, faintness, severe breathlessness, calf pain or swelling, severe headache, or a notable change in fetal movement once movements are established. The exact response depends on the symptom and stage of pregnancy.",
          "Heavy bleeding, collapse, severe chest pain, marked breathing difficulty or severe abdominal pain requires urgent local assessment. Contact your maternity service or emergency care as appropriate; do not wait for a routine physiotherapy or WhatsApp response.",
        ],
      },
    ],
    conversionCopy:
      "Once medical suitability is clear, you may book Dr. Zalak Shah (PT) to discuss a personalised prenatal movement plan.",
    openClinicalQuestions: [
      "Which warning symptoms should be aligned with the clinic’s India-based maternity escalation advice?",
      "Does Dr. Charmi Shah want specific contraindications listed or kept entirely within individual review?",
      "Which prenatal class formats and online limitations can be stated accurately?",
    ],
    claimLedger: [
      pendingClaim(
        "Many people with uncomplicated pregnancies can remain active, with activity adapted to comfort and prior fitness.",
        "https://www.nhs.uk/pregnancy/keeping-well/exercise/",
        "General guidance does not provide individual obstetric clearance.",
        "Exercise in pregnancy",
      ),
      pendingClaim(
        "Pregnancy exercise should stop and medical advice should be sought when warning symptoms occur.",
        "https://www.nhs.uk/pregnancy/keeping-well/exercise/",
        "The source is UK guidance; the final escalation pathway needs local obstetric review.",
        "Exercise tips when pregnant",
      ),
    ],
  },
  "W02-C": {
    title: "What Is PCOS, and Why Is It Now Called PMOS?",
    seoTitle: "PCOS and PMOS: What the Name Change Means",
    description:
      "Understand PCOS diagnosis, the proposed PMOS terminology and why symptoms, blood tests and ultrasound need clinical context. Book a consult.",
    primaryQuestion: "What is PCOS and how is it diagnosed?",
    directAnswer:
      "PCOS is a hormonal and metabolic condition assessed through a combination of menstrual or ovulatory patterns, signs or tests related to androgen excess, and ovarian features, while excluding other explanations. PMOS is a newer proposed name—polycystic ovary metabolic syndrome. The terminology may change, but no single symptom, scan or blood test diagnoses everyone.",
    storytellingNote:
      "Illustrative example: a reader sees both PCOS and PMOS in search results and asks whether she has two conditions; the article explains the naming transition without claiming universal adoption.",
    sections: [
      {
        heading: "PCOS, PMOS and the reason names matter",
        paragraphs: [
          "The familiar name is polycystic ovary syndrome, or PCOS. The ovaries do not have to contain true cysts, and the condition involves more than the ovaries. In 2026, professional organisations announced a transition towards the term polycystic ovary metabolic syndrome, or PMOS, to better reflect its hormonal, reproductive and metabolic features.",
          "You will still encounter PCOS in records, guidelines, clinics and insurance systems. The newer term does not mean that every person needs a fresh diagnosis, nor that two separate diseases are being described. Until adoption is consistent, Dr. Charmi Shah may use both terms so that the conversation remains clear.",
        ],
      },
      {
        heading: "What a clinical assessment considers",
        paragraphs: [
          "Assessment begins with cycle history, symptoms, medicines and life stage. Acne, increased coarse hair growth, scalp-hair thinning, difficulty with ovulation and metabolic health may be relevant, but each also has other possible causes. Weight does not decide whether someone can have PCOS.",
          "Blood tests and, in selected adults, ultrasound or another ovarian marker may contribute. Their meaning depends on age, hormonal contraception and the criteria being used. Adolescents require particular care because normal pubertal changes can overlap with PCOS features. An ultrasound report saying 'polycystic ovaries' is not, by itself, a complete diagnosis.",
        ],
      },
      {
        heading: "Why symptoms and tests need context",
        paragraphs: [
          "A person may have regular-looking bleeds yet still need an ovulation discussion; another may have irregular cycles for a reason unrelated to PCOS. High or low individual hormone results also need interpretation alongside symptoms and the laboratory context. Online checklists tend to flatten these distinctions.",
          "Assessment also considers conditions that can mimic parts of the picture. The purpose is not only to apply a label, but to identify the concerns that need care now—cycle protection, skin or hair symptoms, emotional wellbeing, metabolic risk, or pregnancy planning. The broader PCOS overview and PCOS-symptoms article cover those pathways separately.",
        ],
      },
      {
        heading: "Questions for a first appointment and when to seek care",
        paragraphs: [
          "Bring cycle dates, symptom timing, current medicines and supplements, previous reports, and your priorities. Ask which diagnostic criteria are being used; whether another cause needs exclusion; what each proposed test could change; and how follow-up will address your goals rather than only a scan appearance.",
          "Routine review is appropriate for persistent cycle changes, troublesome skin or hair symptoms, or pregnancy-planning concerns. Seek urgent care for severe pelvic pain, faintness, very heavy bleeding or symptoms linked to a possible pregnancy. Those symptoms are not explained safely by a PCOS label and should not wait for routine booking.",
        ],
      },
    ],
    conversionCopy:
      "For a non-urgent diagnosis or management discussion, you may book a consultation with Dr. Charmi Shah.",
    openClinicalQuestions: [
      "How should Dr. Charmi Shah describe current Indian adoption of the PMOS terminology?",
      "Which adult and adolescent diagnostic criteria should be named in the final reviewed copy?",
      "Which exclusion tests can be mentioned without creating a universal panel?",
    ],
    claimLedger: [
      pendingClaim(
        "International evidence-based guidance treats PCOS as a heterogeneous condition requiring contextual diagnosis and management.",
        "https://www.monash.edu/medicine/mchri/pcos/guideline",
        "The full guideline distinguishes adults from adolescents and must be applied by a clinician.",
        "International evidence-based guideline",
      ),
      pendingClaim(
        "Professional organisations announced PMOS as a new name intended to reflect metabolic as well as reproductive features.",
        "https://www.asrm.org/news-and-events/asrm-news/latest-news/may-27-2026-pcos-is-now-pmos-understanding-the-name-change/",
        "Naming adoption may vary by country, clinician and health system.",
        "Understanding the name change",
      ),
      pendingClaim(
        "PCOS can affect reproductive, metabolic and psychological health.",
        "https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome",
        "Population-level information does not diagnose an individual.",
        "Overview",
      ),
    ],
  },
  "W03-Z": draft({
    title: "When can I start exercising after giving birth?",
    seoTitle: "When to Exercise After Giving Birth",
    description:
      "Plan a gradual return to exercise after birth using symptoms and readiness, not a fixed deadline. Book postnatal physiotherapy for individual advice.",
    primaryQuestion: "When can I exercise after delivery?",
    directAnswer:
      "There is no single week when every person is ready for every exercise. Gentle movement may begin earlier than running, jumping or heavy lifting, provided your maternity team has no concerns. Birth type, healing, bleeding, pain, sleep, pelvic-floor symptoms and previous activity all shape a gradual return.",
    storytellingNote:
      "Illustrative example: a new mother receives three different return-to-exercise dates and instead prepares questions about her recovery, symptoms and goals.",
    doctor: "Dr. Zalak Shah (PT)",
    sections: [
      [
        "Why recovery is different for each person",
        "A vaginal birth, assisted birth and C-section each bring different considerations, but the label alone does not predict recovery. Tears, wound healing, bleeding, anaemia, pain, feeding demands, sleep and emotional wellbeing can all affect what feels manageable. A routine postnatal check is a useful conversation, not automatic clearance for every level of exercise.",
        "Early movement may mean comfortable walking, breathing practice and ordinary daily activity. Impact exercise asks more of the abdominal wall, pelvic floor, joints and cardiovascular system. Dr. Zalak Shah (PT) assesses the task you want to return to rather than treating 'exercise' as one category.",
      ],
      [
        "Readiness for gentle activity and impact",
        "Progress one variable at a time—duration, load, speed or impact—so that you can notice how your body responds during the activity and over the following day. Pain, heaviness, urine or stool leakage, abdominal bulging, increased bleeding or a feeling that recovery is going backwards are reasons to pause and seek advice, not signs to push through.",
        "After a C-section, follow the surgical team’s wound and lifting advice. After a vaginal birth, mention perineal pain, wound concerns or pressure. Rebuilding core strength can be useful, but an online sequence cannot account for healing, diastasis, pelvic-floor coordination or your starting point.",
      ],
      [
        "What a gradual return plan covers",
        "A plan can review daily tasks first, then strength, endurance, balance and sport-specific demands. It should include rest and recovery, because the ability to complete an exercise once is not the same as tolerating a regular programme. Goals might be carrying the baby comfortably, returning to work, jogging or resuming a class; each needs a different progression.",
        "A physiotherapy assessment should also explain what it cannot decide. Infection, wound complications, heavy bleeding, calf symptoms and medical concerns belong with the maternity or medical team. Pelvic health physiotherapy complements that care.",
      ],
      [
        "When to pause or seek urgent care",
        "Arrange routine review for persistent pain, leakage, pelvic pressure, difficulty with bowel movements or uncertainty about returning to impact. Contact your maternity team promptly for increasing wound redness or discharge, fever, worsening pain or bleeding that becomes heavier after activity.",
        "Seek urgent local care for sudden heavy bleeding, collapse, chest pain, severe breathlessness, or one-sided calf pain or swelling. Emergencies should not wait for a routine booking or WhatsApp reply.",
      ],
    ],
    openClinicalQuestions: [
      "Which readiness checks does Dr. Zalak Shah use before return to running or impact?",
      "Which postnatal bleeding and wound changes should Dr. Charmi Shah classify as prompt versus emergency?",
      "How should advice differ after assisted vaginal birth and C-section?",
    ],
    claims: [
      [
        "Postnatal activity should return gradually and be adjusted to birth recovery and symptoms.",
        "https://www.nhs.uk/baby/support-and-services/keeping-fit-and-healthy-with-a-baby/",
        "General guidance cannot clear an individual for impact exercise.",
      ],
      [
        "Pelvic-floor, abdominal and musculoskeletal symptoms can inform postnatal exercise progression.",
        "https://thepogp.co.uk/Resources/113/exercise_and_advice_after_pregnancy",
        "Patient guidance requires clinician interpretation for each birth and complication history.",
      ],
    ],
  }),
  "W03-C": draft({
    title: "What Should I Do Before Trying for a Baby?",
    seoTitle: "What to Do Before Trying for a Baby",
    description:
      "Prepare for pregnancy with a practical medical-history, medicines and vaccination checklist. Book a preconception consultation for personal advice.",
    primaryQuestion: "What should I do before trying for a baby?",
    directAnswer:
      "Before trying to conceive, review your health conditions, medicines and supplements, vaccinations, previous pregnancies, family history and everyday habits with a clinician. The aim is not to order every test or achieve perfect health. It is to identify changes that are useful and safe before pregnancy, without stopping prescribed treatment on your own.",
    storytellingNote:
      "Illustrative example: a couple brings a long supplement-and-test list from friends and turns it into a shorter set of questions for an individual preconception visit.",
    doctor: "Dr. Charmi Shah",
    sections: [
      [
        "What a preconception review is for",
        "A preconception visit gives you space to discuss pregnancy plans before a positive test. Dr. Charmi Shah may ask about cycle patterns, previous pregnancies, fertility concerns, chronic conditions, operations, infections, mental health and family history. The discussion can also cover genetic or screening questions where the history makes them relevant.",
        "You do not need to wait until everything feels ideal. Earlier review is particularly useful when you take regular medicines, have diabetes, thyroid disease, epilepsy or another long-term condition, have had pregnancy complications, or know of an inherited condition in either family.",
      ],
      [
        "Medicines, vaccinations and records to bring",
        "Make a complete list of prescriptions, over-the-counter products, herbal remedies and supplements, with photos of labels if names are unclear. Do not stop a medicine abruptly because its leaflet mentions pregnancy. The safer approach is to discuss the condition being treated, the medicine, alternatives and timing with the relevant prescriber.",
        "Bring vaccination records, previous scan or operation reports, cervical-screening information and important blood-test results if available. Ask which vaccinations or tests are appropriate for you and when they should occur. A universal online test panel often creates expense without answering an individual clinical question.",
      ],
      [
        "Health habits without a perfection checklist",
        "Discuss tobacco, alcohol, sleep, food access, movement, dental care and workplace exposures honestly. Advice should be practical and non-judgmental. Folic acid belongs in pregnancy planning, but dose and timing can require individual advice; avoid combining multiple products without checking their contents.",
        "If periods are irregular, record dates rather than relying on a predicted fertile day. If either partner has a fertility history, raise it now. Trying-to-conceive guidance can support timing questions, while the pregnancy-planning hub covers the broader pathway.",
      ],
      [
        "When to seek care before trying",
        "Book routine review early if a health condition is poorly controlled, a medicine needs discussion, cycles are persistently irregular or you have had recurrent pregnancy loss or a significant previous complication. Seek urgent care now—not after conception—for severe symptoms such as chest pain, fainting, very heavy bleeding or acute pelvic pain.",
        "A preconception consultation cannot guarantee pregnancy or a complication-free course. Its value is in making informed, safer decisions and agreeing who will follow each issue once pregnancy occurs.",
      ],
    ],
    openClinicalQuestions: [
      "Which India-relevant vaccination and infection-screening prompts should be named?",
      "Which histories should trigger genetic counselling in the clinic pathway?",
      "What folic-acid wording should remain pending until W09-C is reviewed?",
    ],
    claims: [
      [
        "Prepregnancy care includes reviewing health conditions, medicines, vaccinations and lifestyle before conception.",
        "https://www.acog.org/womens-health/faqs/good-health-before-pregnancy-prepregnancy-care",
        "US guidance; vaccination schedules and local services need India-specific review.",
      ],
      [
        "Prescribed medicines should be reviewed rather than stopped without clinical advice.",
        "https://www.acog.org/womens-health/faqs/good-health-before-pregnancy-prepregnancy-care",
        "Individual risk-benefit decisions require the prescribing clinician.",
      ],
    ],
  }),
  "W04-Z": draft({
    title: "What is diastasis recti, and when should I get it checked?",
    seoTitle: "Diastasis Recti: Meaning and Assessment",
    description:
      "Understand abdominal separation, what a home observation can miss and when to seek physiotherapy or medical care for pain or a new bulge.",
    primaryQuestion: "What is diastasis recti?",
    directAnswer:
      "Diastasis recti is a widening and change in the connective tissue between the two rectus abdominal muscles. It is common during and after pregnancy, but appearance or finger width alone does not describe function. An assessment considers tension, movement, symptoms and your goals, while a painful or unexplained bulge may need medical review.",
    storytellingNote:
      "Illustrative example: a reader notices a midline bulge and fears her abdomen is damaged; the discussion shifts from appearance to symptoms, function and assessment.",
    doctor: "Dr. Zalak Shah (PT)",
    sections: [
      [
        "What abdominal separation means",
        "The rectus muscles run vertically at the front of the abdomen. Between them is connective tissue called the linea alba. During pregnancy this tissue adapts as the abdomen expands. A continued widening after birth is often called diastasis recti, but it is not a tear and it does not mean the muscles have split into two disconnected parts.",
        "People may notice doming during effort, a softer midline, difficulty managing load or no symptoms at all. A similar-looking bulge can have another explanation. Photographs, body shape and one measurement cannot settle the diagnosis or decide what treatment is needed.",
      ],
      [
        "What a home observation can and cannot tell you",
        "A gentle self-observation may help you notice where the midline changes during a familiar movement. Finger width varies with hand size, position, effort and technique, so it should not become a pass-fail score. Repeated hard testing can add worry without improving the information.",
        "Any demonstration should be created and checked by a clinician. If you are pregnant, newly postnatal, recovering from surgery or have pain, ask before following a video. The separate guide on checking for diastasis explains these limits in more detail.",
      ],
      [
        "What physiotherapy assesses",
        "Dr. Zalak Shah (PT) may look at breathing, abdominal-wall tension, pressure management, pelvic-floor symptoms and how your trunk responds to tasks you value. The plan may involve graded strength and movement changes, but it should not promise to close a gap or flatten the abdomen.",
        "Function matters: getting out of bed, lifting, exercise confidence and symptom control may be more meaningful than a single distance. The assessment should also identify when a finding sits outside physiotherapy and needs a medical opinion.",
      ],
      [
        "When medical assessment is needed",
        "Seek routine assessment if you have persistent pain, uncertainty about a bulge, pelvic-floor symptoms or difficulty returning to daily activity. A new lump that is focal, painful, firm, cannot be gently reduced, or is associated with vomiting or feeling acutely unwell requires prompt medical assessment because a hernia or another condition may need exclusion.",
        "Severe sudden abdominal pain, repeated vomiting or collapse needs urgent local care. Do not send an emergency photograph over WhatsApp and wait for a response.",
      ],
    ],
    openClinicalQuestions: [
      "Which functional measures does Dr. Zalak Shah want named in the assessment section?",
      "How should Dr. Charmi Shah phrase hernia red flags?",
      "Should pregnancy-related and non-pregnancy-related diastasis be separated more explicitly?",
    ],
    claims: [
      [
        "Diastasis involves widening of the linea alba between the rectus muscles and is common around pregnancy.",
        "https://thepogp.co.uk/patient_information/womens_health/tummy_muscle_separation.aspx",
        "Patient information does not replace examination or exclude a hernia.",
      ],
      [
        "Assessment and management should consider symptoms and function rather than appearance alone.",
        "https://my.clevelandclinic.org/health/diseases/22346-diastasis-recti",
        "General clinical overview; individual management varies.",
      ],
    ],
  }),
  "W04-C": draft({
    title: "How Can I Track Ovulation With Irregular Periods?",
    seoTitle: "Tracking Ovulation With Irregular Periods",
    description:
      "Compare cycle apps, body signs and ovulation tests when periods are irregular, and learn when to seek a fertility assessment.",
    primaryQuestion: "How can I track ovulation with irregular periods?",
    directAnswer:
      "With irregular cycles, calendar predictions are less reliable because ovulation may not occur on the same cycle day each month. Cervical-mucus observations, ovulation-predictor kits and temperature charts each provide different clues, but none guarantees the exact fertile window or confirms fertility on its own. Clinical assessment can clarify whether and how often ovulation is occurring.",
    storytellingNote:
      "Illustrative example: an app gives a precise ovulation date to a reader with variable cycles, prompting her to ask what the prediction is actually based on.",
    doctor: "Dr. Charmi Shah",
    sections: [
      [
        "What tracking can—and cannot—answer",
        "Tracking can show patterns and help time a conversation, but it cannot diagnose the reason for irregular cycles. Apps usually estimate from previous dates. If cycle lengths vary, the estimated day can move substantially. A day-14 rule is especially misleading outside a consistently timed cycle.",
        "Physical signs such as changing cervical mucus may suggest the fertile phase. Basal-body-temperature rise is retrospective: it may support that ovulation has already occurred, but illness, sleep disruption and measurement inconsistency affect the chart.",
      ],
      [
        "Ovulation kits and irregular cycles",
        "Urine ovulation-predictor kits detect a hormone surge that often precedes ovulation. A positive result does not prove that an egg was released. In PCOS, hormone patterns can make results difficult to interpret, and repeated testing may become costly or stressful.",
        "Do not use this article as contraception advice. Fertility-awareness methods for avoiding pregnancy require specific teaching and have limitations, particularly with irregular cycles.",
      ],
      [
        "A record that helps at consultation",
        "Record period dates, test dates and results, mucus observations if you choose, medicines, pregnancy tests and how long you have been trying. Add symptoms such as acne, hair changes, pelvic pain or milk-like breast discharge. Bring the actual record rather than a summary generated by an app.",
        "Dr. Charmi Shah may discuss history, examination and selected tests based on your context. No single blood test or scan answers every ovulation question. The fertility and trying-to-conceive pages explain the broader pathway.",
      ],
      [
        "When to ask for help",
        "Seek routine advice when cycles are persistently irregular, periods stop, tracking is causing distress, or you have a condition that may affect ovulation. Fertility assessment may be appropriate earlier than a standard waiting period depending on age, cycle pattern and either partner’s history.",
        "Urgent care is needed for severe one-sided pain, fainting or heavy bleeding, especially with a positive pregnancy test. Those symptoms are not a tracking problem and should not wait for routine booking.",
      ],
    ],
    openClinicalQuestions: [
      "Which ovulation-confirmation tests should be described, and with what timing caveats?",
      "How should PCOS-related false or repeated LH surges be phrased?",
      "Which histories justify earlier fertility review in this clinic?",
    ],
    claims: [
      [
        "Ovulation assessment can use menstrual history, urine LH testing and other clinical methods, each with limitations.",
        "https://prod.reproductivefacts.org/news-and-publications/fact-sheets-and-infographics/am-i-ovulating/",
        "Patient education does not establish an individual fertile window.",
      ],
      [
        "Irregular cycles can justify evaluation without relying only on a fixed duration of trying.",
        "https://www.asrm.org/practice-guidance/practice-committee-documents/fertility-evaluation-of-infertile-women-a-committee-opinion-2026",
        "Exact timing depends on age and history and requires clinician review.",
      ],
    ],
  }),
  "W05-Z": draft({
    title: "What Is STOTT Pilates? Mat vs Reformer and Getting Started",
    seoTitle: "STOTT Pilates: Mat vs Reformer",
    description:
      "Learn what STOTT Pilates means, how Mat and Reformer sessions differ and what to ask before booking a suitable beginner class.",
    primaryQuestion: "What is STOTT Pilates, and how do Mat and Reformer sessions differ?",
    directAnswer:
      "STOTT Pilates is a named contemporary Pilates teaching method; Mat and Reformer describe two different exercise formats. Mat work uses the floor and small props, while a Reformer uses a spring-based machine. Neither format is automatically better. Your goals, symptoms, experience, access and the instructor’s assessment should guide the choice.",
    storytellingNote:
      "Illustrative example: a beginner sees STOTT, Mat and Reformer on a timetable and learns which word names a method and which words describe equipment.",
    doctor: "Dr. Zalak Shah (PT)",
    sections: [
      [
        "STOTT Pilates within the wider Pilates tradition",
        "STOTT Pilates is Merrithew’s branded education method, developed from Pilates principles with its own teaching framework. It is not a separate piece of equipment, and the name should not be used as proof that a class is clinically superior. Verify the instructor’s actual training rather than relying on a studio label.",
        "Dr. Zalak Shah (PT) is a STOTT Pilates Instructor in Mat and Reformer. That qualification supports Pilates teaching; her physiotherapy qualification is the separate basis for assessing pain, pelvic-floor symptoms or rehabilitation needs.",
      ],
      [
        "Mat and Reformer sessions",
        "Mat sessions use body weight, gravity and sometimes small props. They can be taught in person or online when suitable. Reformer sessions use a carriage, springs, straps and a footbar, so instruction depends on access to real equipment and safe setup. Online Reformer availability should never be assumed.",
        "The machine does not make an exercise automatically easier, harder or more therapeutic. Both formats can be adjusted. A useful comparison asks about class size, supervision, equipment, entry position and how the instructor responds to symptoms—not which option promises faster results.",
      ],
      [
        "Questions before a first class",
        "Ask what training the instructor has, whether the class is beginner-friendly, how health information is handled, what equipment is required and whether individual modifications are possible. Tell the instructor about pain, recent surgery, pregnancy, postpartum recovery, dizziness or a medical restriction before class.",
        "A group class teaches movement; it is not a diagnostic assessment. If symptoms are the reason you are attending, a women’s health physiotherapy consultation may be the more appropriate first step.",
      ],
      [
        "Pregnancy, postpartum and when to seek care",
        "Pregnancy and postpartum suitability depends on medical context, recovery and symptoms. Obtain maternity advice where needed, and do not use a general class as clearance. Stop and seek assessment if exercise causes pain, bleeding, dizziness, pelvic heaviness, leakage or a concerning symptom.",
        "Chest pain, collapse, severe breathlessness, heavy bleeding or an acute postoperative concern needs urgent local care, not a Pilates booking. Routine questions can be discussed with Dr. Zalak Shah (PT).",
      ],
    ],
    openClinicalQuestions: [
      "Which Mat and Reformer formats does the practice currently provide in person and online?",
      "What exact STOTT training wording does Dr. Zalak Shah approve?",
      "Which pregnancy and postpartum exclusions require Dr. Charmi Shah’s review?",
    ],
    claims: [
      [
        "STOTT Pilates is a Merrithew education method rather than a type of Pilates apparatus.",
        "https://www.merrithew.com/about/education-programs/stott-pilates",
        "A vendor source describes its own method and does not prove comparative clinical superiority.",
      ],
      [
        "Pilates may be used within women’s health physiotherapy when selected for an individual context.",
        "https://thepogp.co.uk/resources/124/pilates_in_womens_health_physiotherapy/",
        "This does not make every class suitable treatment for every condition.",
      ],
    ],
  }),
  "W05-C": draft({
    title: "What Are PCOS Symptoms If My Periods Are Regular?",
    seoTitle: "PCOS Symptoms With Regular Periods",
    description:
      "Learn how PCOS symptoms vary, why regular periods or body size do not settle the diagnosis and what to record before a consultation.",
    primaryQuestion: "What are the symptoms of PCOS?",
    directAnswer:
      "PCOS can involve irregular ovulation, acne, increased coarse hair growth, scalp-hair thinning and metabolic concerns, but the pattern varies. Regular bleeding does not always confirm regular ovulation, and one symptom does not diagnose PCOS. Body size is not a diagnostic test. A clinician must interpret symptoms, life stage and selected investigations together.",
    storytellingNote:
      "Illustrative example: a reader with regular-looking periods and new hair changes resists an online checklist and records the timeline for a proper assessment.",
    doctor: "Dr. Charmi Shah",
    sections: [
      [
        "Symptoms vary between people",
        "Some people first notice cycle changes; others ask about acne, coarse facial or body hair, scalp-hair thinning or difficulty conceiving. Emotional wellbeing, sleep and metabolic health may also need attention. None of these concerns is unique to PCOS.",
        "Regular monthly bleeding makes persistent ovulatory dysfunction less obvious, but bleeding alone does not answer every ovulation question. Dr. Charmi Shah would ask about cycle length, symptom timing, contraception and pregnancy goals before deciding what needs checking.",
      ],
      [
        "Why one symptom or body size is not diagnostic",
        "Acne is common. Hair growth varies by family and ethnicity. Weight can change for many reasons, and PCOS occurs across body sizes. Weight-neutral assessment avoids both missed diagnosis in a smaller body and automatic diagnosis in a larger one.",
        "Ultrasound morphology also needs context. A scan cannot replace history, and adolescents require different diagnostic caution from adults. The separate PCOS/PMOS explainer covers diagnostic reasoning in detail.",
      ],
      [
        "Prepare a symptom history",
        "Record cycle dates, skin or hair changes, medicines, supplements, family history and previous reports. Note when each concern began and what is changing, rather than grading yourself against photographs online. If pregnancy is a goal, include how long you have been trying and any partner factors already known.",
        "Ask which features support PCOS, which alternative explanations need consideration and what each test would change. Management should address your priorities, not force every person into a fertility or weight-loss pathway.",
      ],
      [
        "When to seek care",
        "Routine review is appropriate for persistent cycle, skin or hair concerns; absent periods; or pregnancy-planning questions. Rapid-onset marked hair growth, voice change or other rapidly progressive symptoms deserve prompt medical assessment because they are not typical checklist items to watch at home.",
        "Severe pelvic pain, fainting or heavy bleeding needs urgent local care, especially if pregnancy is possible. Do not attribute an acute symptom to PCOS without assessment.",
      ],
    ],
    openClinicalQuestions: [
      "Which rapid-androgenisation features should be stated for prompt review?",
      "How should regular bleeding versus confirmed ovulation be explained?",
      "Which adult/adolescent distinctions are essential for this page?",
    ],
    claims: [
      [
        "PCOS symptoms and diagnostic features vary, and diagnosis uses a combination of findings.",
        "https://www.acog.org/womens-health/faqs/polycystic-ovary-syndrome-pcos",
        "Patient guidance; adolescent and adult criteria must not be conflated.",
      ],
      [
        "PCOS care should be individualised and include reproductive, metabolic and psychological concerns.",
        "https://www.monash.edu/medicine/mchri/pcos/guideline",
        "Guideline recommendations require clinical application.",
      ],
    ],
  }),
  "W06-Z": draft({
    title: "Are Kegels right for everyone? When an assessment matters",
    seoTitle: "Are Kegels Right for Everyone?",
    description:
      "Learn why pelvic-floor strength, relaxation and coordination all matter, and when pain or bladder symptoms need an individual assessment.",
    primaryQuestion: "Are Kegels right for everyone?",
    directAnswer:
      "No. Kegels—repeated pelvic-floor contractions—can be useful for some people when the technique and dose suit the problem. Others need help with relaxation, coordination, pain or a different diagnosis. More squeezing is not automatically better. If contractions worsen pain, urgency or difficulty emptying, pause the generic routine and seek assessment.",
    storytellingNote:
      "Illustrative example: a reader begins an online Kegel challenge because it says everyone needs strengthening, then learns why symptom pattern and technique matter.",
    doctor: "Dr. Zalak Shah (PT)",
    sections: [
      [
        "What Kegels are intended to do",
        "A Kegel is a voluntary pelvic-floor contraction. Programmes may aim to improve strength, endurance or timing for a defined symptom, such as some types of urine leakage. The exercise works only if the correct muscles contract and fully let go, without persistent breath-holding or excessive straining.",
        "A cue that helps one person may confuse another. Stopping urine midstream is not a routine training method. If a clinician has prescribed exercises, do not abandon them because of a general article; ask for review if they are painful or unclear.",
      ],
      [
        "Strength, relaxation and coordination",
        "The pelvic floor needs to respond to coughing and lifting, relax for bladder and bowel emptying, and coordinate with breathing and movement. Symptoms can occur when the muscles are weak, overactive, poorly coordinated or responding to another problem. Those patterns cannot be distinguished reliably by a quiz.",
        "Pain with penetration, difficulty emptying, constipation, urgency or pelvic pain may change the approach. Dr. Zalak Shah (PT) can explain assessment choices and consent before any internal examination.",
      ],
      [
        "How an assessment guides exercise",
        "Assessment starts with symptoms, pregnancy and birth history, surgery, bowel and bladder habits, pain and goals. It may include observation of breathing and movement, and an optional pelvic-floor examination where appropriate. The plan can then specify whether contraction practice, relaxation, bladder strategies or another referral is indicated.",
        "Generic routines often omit dosage, rest, progression and review. They also cannot tell whether a urinary, gynaecological, neurological or pain condition needs medical input.",
      ],
      [
        "When to seek care",
        "Arrange routine review when symptoms persist, exercises cause pain, you cannot identify contraction and release, or bladder or bowel function is changing. Seek prompt medical care for blood in urine, fever with urinary symptoms, inability to pass urine or rapidly worsening pelvic pain.",
        "New bladder or bowel loss with severe back pain, leg weakness or saddle numbness needs emergency assessment. Do not wait for a routine physiotherapy response.",
      ],
    ],
    openClinicalQuestions: [
      "Which assessment elements can Dr. Zalak Shah offer online versus in person?",
      "Should the copy explicitly discourage stop-start urine practice?",
      "Which neurological red flags require Dr. Charmi Shah’s final wording?",
    ],
    claims: [
      [
        "Pelvic-floor exercises require correct contraction and relaxation and are not simply repeated maximal squeezing.",
        "https://www.niddk.nih.gov/health-information/urologic-diseases/kegel-exercises",
        "General instructions do not establish suitability for pain or emptying symptoms.",
      ],
      [
        "Supervised pelvic-floor muscle training is recommended for selected incontinence presentations.",
        "https://www.nice.org.uk/guidance/ng210/chapter/recommendations",
        "Recommendations apply to defined populations and require assessment.",
      ],
    ],
  }),
  "W06-C": draft({
    title: "How Much Period Pain Is Too Much?",
    seoTitle: "How Much Period Pain Is Too Much?",
    description:
      "Learn when period pain deserves assessment, what symptoms and daily impact to record, and when severe pain needs urgent medical care.",
    primaryQuestion: "Why are my periods so painful?",
    directAnswer:
      "Period cramps are common, but pain that repeatedly stops work, study, sleep, movement or ordinary activities should not be dismissed as something you must tolerate. Painful periods can occur without another condition or alongside endometriosis, adenomyosis, fibroids, infection or other causes. The pattern and examination guide the next step.",
    storytellingNote:
      "Illustrative example: a student repeatedly reorganises exams and travel around severe pain and records the functional impact instead of being told only to assign a number.",
    doctor: "Dr. Charmi Shah",
    sections: [
      [
        "Pain is measured by impact as well as intensity",
        "Cramps often begin around the start of bleeding, but timing, duration and accompanying symptoms matter. Record whether pain wakes you, causes vomiting, leads to missed work or study, limits walking or sex, or persists outside the period. A number from zero to ten is useful only alongside that context.",
        "A new change after years of manageable periods deserves attention. So does pain that is progressively worsening or no longer responds to a previously helpful plan. Disabling pain is not made normal by being common.",
      ],
      [
        "What to tell your gynaecologist",
        "Track bleeding, clots, bowel or bladder pain, pain during sex, fertility concerns and symptoms between periods. Include medicines tried, without exceeding labels or adding doses from this article. Previous scans may help, but a normal scan does not answer every cause of pelvic pain.",
        "Dr. Charmi Shah may discuss examination, selected imaging or other tests according to the history. Endometriosis is one possibility, not the automatic explanation for severe pain.",
      ],
      [
        "Treatment discussions are individual",
        "Options can include symptom relief, hormonal treatment or investigation of a suspected underlying condition. The right conversation changes with pregnancy plans, contraindications, age and personal preference. No medicine or procedure should be presented as universally suitable.",
        "A pain-and-activity diary can show whether a plan is helping over time. Pelvic health physiotherapy may complement medical care when musculoskeletal or pelvic-floor factors are relevant, but it does not replace gynaecological assessment.",
      ],
      [
        "Urgent versus routine care",
        "Book routine review for recurring disabling pain, pain between periods, pain with sex or bowel movements, or a clear worsening pattern. Seek prompt care for fever, unusual discharge or significant new pain.",
        "Severe sudden or one-sided pain, fainting, very heavy bleeding or pain with a positive pregnancy test needs urgent local assessment. Do not wait for routine WhatsApp booking.",
      ],
    ],
    openClinicalQuestions: [
      "Which urgent bleeding language should accompany acute pelvic pain?",
      "How should a normal ultrasound’s limitations be phrased for endometriosis?",
      "Which treatment categories can be named without medication detail?",
    ],
    claims: [
      [
        "Painful periods that interfere with daily life merit clinical assessment.",
        "https://www.acog.org/womens-health/faqs/dysmenorrhea-painful-periods",
        "Patient guidance does not identify the cause in an individual.",
      ],
      [
        "Endometriosis should be considered among possible causes of persistent or significant period-related pain.",
        "https://www.nice.org.uk/guidance/ng73/chapter/Recommendations",
        "Severe pain is not synonymous with endometriosis; assessment is required.",
      ],
    ],
  }),
  "W07-Z": draft({
    title: "How can I manage back pain during pregnancy?",
    seoTitle: "Back Pain During Pregnancy: What Helps",
    description:
      "Learn what to record about pregnancy back pain, how physiotherapy may help and which symptoms need prompt maternity or emergency care.",
    primaryQuestion: "How can I relieve back pain during pregnancy?",
    directAnswer:
      "Pregnancy back pain may improve with individually chosen activity changes, pacing, support and physiotherapy, but there is no single posture or exercise that suits everyone. Tell your maternity team where the pain is, what provokes it and whether you have urinary, neurological or pregnancy-related symptoms before treating it as a routine muscle ache.",
    storytellingNote:
      "Illustrative example: a pregnant reader finds lifting a work bag uncomfortable and prepares task-specific notes rather than assuming poor posture is the sole cause.",
    doctor: "Dr. Zalak Shah (PT)",
    sections: [
      [
        "Describe the pain and its triggers",
        "Note the location, onset, spread, severity, sleep effect and activities that change the pain. Mention falls, fever, urinary symptoms, abdominal tightening, bleeding, leg symptoms and any change in fetal movement. Back pain and pelvic girdle pain can overlap, but location alone does not diagnose either.",
        "A physiotherapy history also covers work, lifting, sitting, walking, footwear, exercise and previous back problems. Dr. Zalak Shah (PT) uses these details to test practical options rather than blaming one 'bad' posture.",
      ],
      [
        "Daily-task changes and physiotherapy",
        "Shorter bouts, changing position, sharing loads and bringing objects closer before lifting may help some tasks. A useful plan tests the change and reviews the response; it does not impose rigid posture rules. Exercises should be selected for comfort, pregnancy stage and medical suitability.",
        "Pregnancy physiotherapy can assess movement, strength and function and distinguish issues that need maternity input. Pelvic pain during pregnancy has a separate guide because the care conversation may differ.",
      ],
      [
        "When to seek medical care",
        "Contact your maternity team promptly for pain with bleeding, fluid loss, fever, urinary symptoms, contractions, feeling unwell or concerns about fetal movement. New leg weakness, spreading numbness or bladder/bowel changes require urgent assessment.",
        "Severe chest or abdominal pain, collapse, heavy bleeding or new loss of bladder or bowel control with saddle numbness is an emergency. Use local emergency or maternity services, not routine WhatsApp booking.",
      ],
    ],
    openClinicalQuestions: [
      "Which daily-task adaptations does Dr. Zalak demonstrate?",
      "Which obstetric warning symptoms should Dr. Charmi prioritise?",
      "How should PGP versus lumbar pain be explained without self-diagnosis?",
    ],
    claims: [
      [
        "Back pain is common in pregnancy and may be supported with activity and movement advice.",
        "https://www.nhs.uk/pregnancy/common-symptoms/back-pain/",
        "General guidance; it does not exclude obstetric, urinary or neurological causes.",
      ],
      [
        "Pregnancy-related pelvic pain can affect movement and may benefit from assessment.",
        "https://www.nhs.uk/pregnancy/common-symptoms/pelvic-pain/",
        "Pain location alone cannot establish pelvic girdle pain.",
      ],
    ],
  }),
  "W07-C": draft({
    title: "Can I Get Pregnant With PCOS?",
    seoTitle: "Can I Get Pregnant With PCOS?",
    description:
      "Understand how PCOS may affect ovulation, what fertility assessment considers and when to seek help without assuming infertility.",
    primaryQuestion: "Can I get pregnant with PCOS?",
    directAnswer:
      "Yes, many people with PCOS become pregnant, with or without fertility treatment. PCOS can make ovulation less predictable, but it does not mean pregnancy is impossible. Your age, cycle pattern, health, fallopian tubes, uterus and partner factors all matter, so one diagnosis cannot predict an individual outcome.",
    storytellingNote:
      "Illustrative example: a reader hears 'PCOS' as a verdict of infertility and replaces that fear with specific questions about ovulation and both partners’ histories.",
    doctor: "Dr. Charmi Shah",
    sections: [
      [
        "PCOS changes the conversation, not the possibility",
        "PCOS may reduce how often ovulation occurs, which can make timing difficult. Some people with PCOS ovulate regularly; others do not. Bleeding patterns, ovulation evidence and pregnancy history provide more useful information than the label alone.",
        "Avoid promises at either extreme. Neither spontaneous pregnancy nor treatment success can be guaranteed, and a body size or AMH result cannot decide the answer by itself.",
      ],
      [
        "What fertility assessment considers",
        "Dr. Charmi Shah may review cycle history, medicines, previous pregnancies, age and selected tests. Fertility evaluation should include both partners where relevant, because semen factors and other histories matter alongside ovulation. Tubal or uterine assessment is considered according to the clinical situation.",
        "Tracking ovulation can offer clues, but apps and urine kits have limitations in irregular cycles. Treatment categories depend on the findings and goals; this draft deliberately does not prescribe a drug regimen.",
      ],
      [
        "When to seek help",
        "Seek routine fertility advice when cycles are very irregular or absent, when there is a known condition affecting fertility, or when the recommended trying interval for your age and history has passed. Earlier assessment may be sensible after pelvic surgery, significant endometriosis symptoms, previous cancer treatment or known partner factors.",
        "Severe pain, fainting or heavy bleeding with a positive pregnancy test needs urgent local care. It is not a routine PCOS appointment.",
      ],
    ],
    openClinicalQuestions: [
      "Which age-based evaluation intervals from the 2026 ASRM guidance should be quoted?",
      "Which PCOS-related factors trigger earlier review?",
      "How should both-partner assessment be worded inclusively?",
    ],
    claims: [
      [
        "PCOS can affect ovulation and fertility but does not mean pregnancy is impossible.",
        "https://www.who.int/news-room/fact-sheets/detail/polycystic-ovary-syndrome",
        "Population information cannot predict an individual pregnancy outcome.",
      ],
      [
        "Fertility evaluation is guided by age, duration of trying and relevant history and should consider both partners.",
        "https://www.asrm.org/practice-guidance/practice-committee-documents/fertility-evaluation-of-infertile-women-a-committee-opinion-2026",
        "Exact timing and tests require clinician review.",
      ],
    ],
  }),
  "W08-Z": draft({
    title: "How can physiotherapy support recovery after a C-section?",
    seoTitle: "Physiotherapy After a C-Section",
    description:
      "Learn how movement and postnatal physiotherapy may support C-section recovery, and which wound or medical symptoms need maternity care.",
    primaryQuestion: "How do I recover after a C-section?",
    directAnswer:
      "C-section recovery involves healing from abdominal surgery while caring for a baby. Early priorities are your surgical team’s wound advice, pain control, circulation, rest and safe daily movement. Physiotherapy can later support comfortable movement, breathing, abdominal and pelvic-floor function, and a gradual return to activity; it does not treat wound complications.",
    storytellingNote:
      "Illustrative example: before discharge, a parent asks how to get out of bed and carry out daily tasks without treating a generic online plan as surgical advice.",
    doctor: "Dr. Zalak Shah (PT)",
    sections: [
      [
        "Recovery beyond the incision",
        "The visible incision is only one part of recovery. Fatigue, bleeding, bowel function, feeding positions, pain, sleep and emotional wellbeing all affect movement. Follow discharge instructions and ask who to contact after hours. Do not begin scar massage over an unhealed, open, infected or unexplained painful wound.",
        "Before discharge, practise getting in and out of bed, ask about lifting and driving restrictions, and plan help for stairs, meals and baby care. Individual surgical advice takes priority over a timeline online.",
      ],
      [
        "How activity is progressed",
        "Short, comfortable walks and frequent position changes may be an early starting point when the maternity team agrees. Increase activity gradually and watch the response later that day and the next. Increased pain, bleeding, wound pulling, pelvic heaviness or leakage are reasons to pause and discuss.",
        "Postnatal physiotherapy may assess breathing, abdominal-wall and pelvic-floor function, posture for real tasks, scar comfort after healing, and readiness for strengthening or impact. Dr. Zalak Shah (PT) should coordinate with medical care where symptoms overlap.",
      ],
      [
        "When to contact the surgical or maternity team",
        "Seek prompt medical review for fever, worsening wound redness, heat, swelling, discharge or opening; escalating pain; feeling markedly unwell; urinary symptoms; or bleeding that is becoming heavier. A physiotherapist should not reassure these away.",
        "Sudden heavy bleeding, collapse, chest pain, severe breathlessness or one-sided calf swelling or pain requires urgent local care. Do not wait for routine booking.",
      ],
    ],
    openClinicalQuestions: [
      "When does Dr. Zalak consider scar assessment appropriate?",
      "Which lifting and driving statements must remain with the surgeon?",
      "Which wound and clot red flags does Dr. Charmi approve?",
    ],
    claims: [
      [
        "C-section recovery includes graded movement and practical strategies after abdominal surgery.",
        "https://thepogp.co.uk/patient_information/pregnancy_and_early_postnatal/recovery_from_c-section.aspx",
        "Advice must yield to the individual surgical team.",
      ],
      [
        "Exercise after caesarean birth should progress gradually with attention to healing and symptoms.",
        "https://www2.hse.ie/pregnancy-birth/birth/health-after-birth/exercise-after-caesarean/",
        "National guidance; local discharge instructions differ.",
      ],
    ],
  }),
  "W08-C": draft({
    title: "When Should I See a Fertility Specialist?",
    seoTitle: "When to See a Fertility Specialist",
    description:
      "Learn how age, time trying and medical history shape fertility-assessment timing, including reasons for both partners to seek earlier advice.",
    primaryQuestion: "How long should I try before seeing a fertility specialist?",
    directAnswer:
      "Timing depends on age and history. Common guidance considers evaluation after 12 months of regular unprotected intercourse when the female partner is under 35, after 6 months from 35 onward, and more promptly over 40. Irregular cycles, known reproductive conditions or partner factors can justify earlier assessment.",
    storytellingNote:
      "Illustrative example: a couple unsure whether to wait uses age and both partners’ histories to decide what to discuss, rather than treating a timer as an eligibility rule.",
    doctor: "Dr. Charmi Shah",
    sections: [
      [
        "Time-based guidance is a starting point",
        "The usual intervals help organise care; they are not a requirement to delay when a concern is already known. Frequency and timing of intercourse, contraception history and whether cycles suggest ovulation all affect what 'trying' means.",
        "Age matters because fertility changes over time, but no birthday predicts an individual outcome. Dr. Charmi Shah can explain how the current guidance applies to your circumstances.",
      ],
      [
        "Reasons to seek help sooner",
        "Earlier review may be appropriate with absent or very irregular periods, suspected endometriosis, previous pelvic infection or surgery, recurrent pregnancy loss, cancer treatment, sexual difficulties, known genetic concerns or a known semen or testicular issue. Bring previous reports, but avoid ordering a broad panel without a clinical question.",
        "Fertility is not solely a woman’s issue. Where pregnancy involves sperm, both partners’ histories should be considered from the start so months are not lost in a one-sided evaluation.",
      ],
      [
        "Preparing for the appointment and urgent care",
        "Bring cycle dates, pregnancy history, medicines, operations and the duration and pattern of trying. Ask what each test can answer, whether both partners need evaluation and what the next decision point will be. A first appointment should not be treated as an automatic path to IVF.",
        "Severe pelvic pain, fainting or heavy bleeding—especially with a positive pregnancy test—needs urgent local assessment, not a fertility booking.",
      ],
    ],
    openClinicalQuestions: [
      "Confirm exact 2026 ASRM age thresholds and language.",
      "Which histories does the clinic use for immediate evaluation?",
      "How should recurrent pregnancy loss be routed separately?",
    ],
    claims: [
      [
        "Fertility evaluation timing varies by age and may be earlier when history indicates.",
        "https://www.acog.org/womens-health/faqs/evaluating-infertility",
        "US guidance; individual and local pathways vary.",
      ],
      [
        "Evaluation should be systematic, timely and inclusive of both partners where relevant.",
        "https://www.asrm.org/practice-guidance/practice-committee-documents/fertility-evaluation-of-infertile-women-a-committee-opinion-2026",
        "Clinical application and exact thresholds require reviewer confirmation.",
      ],
    ],
  }),
  "W09-Z": draft({
    title: "How do I check for diastasis recti: and what can a self-check miss?",
    seoTitle: "How to Check for Diastasis Recti",
    description:
      "Learn what a diastasis self-check can show, why finger width is incomplete and when symptoms need an in-person assessment.",
    primaryQuestion: "How do I check for diastasis recti at home?",
    directAnswer:
      "A self-check can help you notice a change along the abdominal midline, but it cannot diagnose the cause, grade function or exclude a hernia. Position, effort and finger size change the result. Use only a clinician-reviewed demonstration, avoid repeated forceful testing, and seek assessment if you have pain, a focal lump or difficulty with activity.",
    storytellingNote:
      "Illustrative example: two videos give a reader different results, showing why a self-check is an observation rather than a verdict.",
    doctor: "Dr. Zalak Shah (PT)",
    sections: [
      [
        "The purpose and limits of self-checking",
        "A home observation may help you describe where doming or softness appears during a gentle task. It should not assign a severity grade or decide which exercises are safe. Finger width alone misses tissue tension, depth, breathing, pressure strategy and how the abdominal wall behaves during real activity.",
        "Any step-by-step demonstration must be created and approved by Dr. Zalak Shah (PT); this draft does not substitute generic instructions. During pregnancy, early postpartum recovery or after abdominal surgery, ask before testing.",
      ],
      [
        "What a clinician assesses",
        "An assessment may consider symptoms, daily tasks, breathing, abdominal tension, pelvic-floor function and changes under different loads. The meaning of a measurement lies in context and change over time, not comparison with someone else’s body.",
        "Report pain, a focal bulge, nausea, bowel symptoms, pelvic heaviness, leakage and the activities that feel difficult. The guide explaining what diastasis recti is provides the anatomy; core-recovery guidance addresses graded movement.",
      ],
      [
        "When to seek in-person or urgent care",
        "Book routine assessment if you remain uncertain, symptoms affect function or online checks are driving repeated worry. Seek prompt medical review for a new painful or firm focal lump, especially if it does not reduce or is accompanied by vomiting.",
        "Severe sudden abdominal pain, repeated vomiting or collapse requires urgent local care. Do not wait for a photograph to be reviewed through routine messaging.",
      ],
    ],
    openClinicalQuestions: [
      "What exact demonstration sequence will Dr. Zalak approve?",
      "Which measurements are documented in clinic?",
      "How should hernia escalation be worded by Dr. Charmi?",
    ],
    claims: [
      [
        "Post-pregnancy abdominal separation can be observed, but persistent concerns may need physiotherapy.",
        "https://www.nhs.uk/baby/support-and-services/your-post-pregnancy-body/",
        "Brief patient guidance does not validate a diagnostic self-test.",
      ],
      [
        "Diastasis assessment considers more than a visible bulge or self-measured gap.",
        "https://my.clevelandclinic.org/health/diseases/22346-diastasis-recti",
        "General overview; clinician assessment is still required.",
      ],
    ],
  }),
  "W09-C": draft({
    title: "When Should I Start Folic Acid Before Pregnancy?",
    seoTitle: "When to Start Folic Acid Before Pregnancy",
    description:
      "Learn when folic acid fits into pregnancy planning, why dose may vary and what to ask if you are already pregnant or take medicines.",
    primaryQuestion: "When should I start folic acid before pregnancy?",
    directAnswer:
      "Folic acid is ideally started before conception because early fetal development begins before many people know they are pregnant, and it is usually continued into early pregnancy. The dose is not identical for everyone. Ask a clinician or pharmacist which product and dose fit your health, medicines and local guidance; avoid doubling up across supplements.",
    storytellingNote:
      "Illustrative example: a reader compares several prenatal products and brings the labels to a preconception visit instead of choosing by marketing claims.",
    doctor: "Dr. Charmi Shah",
    sections: [
      [
        "Why timing belongs in pregnancy planning",
        "Folate supports early neural-tube development. Food sources matter, but guidance recommends a folic-acid supplement because diet alone may not reliably provide the advised amount around conception. If you are already pregnant and have not started, seek advice and begin the appropriate product rather than assuming the opportunity has passed.",
        "Preconception planning is also the time to review medicines, vaccinations and health conditions. Folic acid is one part of care, not a guarantee against all pregnancy complications.",
      ],
      [
        "Standard advice versus individual dosing",
        "Some people are advised a higher prescribed dose because of medical, medicine or pregnancy history. This article intentionally gives no dose: the brief requires India-relevant clinical review, and taking more is not automatically safer. Check combined prenatal vitamins so that ingredients are not duplicated.",
        "Do not stop regular medicines to simplify supplement choices. Bring medicine and supplement labels to Dr. Charmi Shah or the prescribing clinician and ask about interactions, timing and duration.",
      ],
      [
        "When to seek care",
        "Routine preconception review is useful if you have diabetes, take anti-seizure or other regular medicines, have a previous pregnancy affected by a neural-tube defect, have malabsorption concerns or are unsure which dose applies. If pregnancy is confirmed, arrange antenatal care according to local advice.",
        "Folic acid does not treat pain or bleeding. Severe pain, fainting or heavy bleeding in pregnancy requires urgent local assessment, not a supplement or routine booking conversation.",
      ],
    ],
    openClinicalQuestions: [
      "Which India guideline and standard dose should be cited?",
      "Which higher-dose indications can be listed safely?",
      "How long into pregnancy does Dr. Charmi advise continuation?",
    ],
    claims: [
      [
        "Folic acid is recommended before conception and in early pregnancy.",
        "https://www.nhs.uk/pregnancy/keeping-well/pregnancy-vitamins-and-supplements/",
        "Dose and duration must be aligned to India-relevant guidance.",
      ],
      [
        "Prepregnancy care includes discussion of supplements, medicines and individual risk factors.",
        "https://www.acog.org/womens-health/faqs/good-health-before-pregnancy-prepregnancy-care",
        "US guidance; local prescribing differs.",
      ],
    ],
  }),
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
  "W01-Z": 1000,
  "W01-C": 1200,
  "W02-Z": 1200,
  "W02-C": 1300,
  "W03-Z": 1200,
  "W03-C": 1300,
  "W04-Z": 1100,
  "W04-C": 1300,
  "W05-Z": 1200,
  "W05-C": 1100,
  "W06-Z": 1000,
  "W06-C": 1100,
  "W07-Z": 1100,
  "W07-C": 1400,
  "W08-Z": 1400,
  "W08-C": 1000,
  "W09-Z": 900,
  "W09-C": 900,
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
  "W01-Z": [
    "A useful diary distinguishes leakage during impact from leakage preceded by urgency, because a person can experience either pattern or both together.",
    "Fluid restriction may look like a practical solution, yet it can leave someone thirsty and does not identify why the bladder symptom is occurring.",
    "Constipation, repeated straining and a persistent cough belong in the history because they change pressure demands and may alter the care plan.",
    "Pregnancy and birth history are relevant without being treated as proof that childbirth caused every symptom or that leakage is an inevitable consequence.",
    "An assessment should ask what the reader wants to return to—walking, running, lifting a child, gym work or social activity—not only count leaks.",
    "Pelvic-floor contraction is only one part of continence; timing, relaxation, breathing and how force is transferred during a task can also matter.",
    "Consent is ongoing during pelvic health care, and a person can decline or pause an internal examination while discussing other assessment options.",
    "Pads can support day-to-day confidence, but needing protection repeatedly is still a valid reason to ask for help rather than silently adapting life.",
    "Burning, blood, fever, difficulty emptying or a sudden neurological change shifts the question from routine rehabilitation to medical assessment.",
    "Progress is best reviewed against the original triggers and goals, without promising that a particular number of sessions will stop leakage.",
  ],
  "W01-C": [
    "Cycle variation should be interpreted against age and life stage, including adolescence, breastfeeding, contraception use and the menopause transition.",
    "Pregnancy testing is an early practical step when pregnancy is possible, but a negative result does not explain persistent irregularity by itself.",
    "Stress may influence ovulation, yet attributing every delayed period to stress can postpone evaluation of endocrine, medication or pregnancy-related factors.",
    "A calendar becomes more useful when it records spotting, flow, pain and associated symptoms rather than displaying predicted dates alone.",
    "Hormonal contraception can intentionally change bleeding patterns, so the method, start date, missed doses and recent changes belong in the consultation history.",
    "PCOS is one possible explanation, not shorthand for every irregular cycle; thyroid, prolactin and other clinical questions may need consideration.",
    "Rapid weight change, under-fuelling or a sharp increase in training may affect cycles and should be discussed without blame or assumptions about appearance.",
    "Tests should answer a question raised by the history; ordering a large panel before assessment can produce incidental results without clarifying the pattern.",
    "Fertility goals change the conversation because irregular ovulation may affect timing, while contraception needs remain important when pregnancy is not desired.",
    "Bleeding with severe pain, faintness or pregnancy possibility requires a different response from a routine appointment about recurring cycle variation.",
  ],
  "W02-Z": [
    "Previous activity provides context, but being experienced does not remove the need to adapt for symptoms, balance changes, heat and pregnancy-specific advice.",
    "Someone beginning movement in pregnancy generally needs a gradual start rather than copying the volume or intensity of an experienced exerciser.",
    "The talk test is a broad effort cue, not a clearance test, and a comfortable conversation does not override bleeding, pain or maternity restrictions.",
    "Activities with collision, falling, overheating or environmental risk require a separate discussion rather than being grouped with walking or controlled strength work.",
    "Pelvic heaviness, leakage and musculoskeletal pain are worth reporting early because modifications can be more useful than waiting until movement becomes intolerable.",
    "A class instructor needs to know about pregnancy and symptoms, but class supervision cannot replace the obstetric team’s management of medical complications.",
    "Trimester labels are less informative than the actual change in balance, comfort, blood pressure symptoms, fetal growth concerns and advice for that pregnancy.",
    "Rest days, hydration and access to food and cooling matter in Indian climates, especially when nausea, fasting practices or long commutes affect tolerance.",
    "Exercise should not be sold as a guarantee of a particular labour, birth route, baby weight or postpartum recovery.",
    "Warning symptoms need a pre-agreed contact route so the reader knows whether to stop, call the maternity team or use emergency services.",
  ],
  "W02-C": [
    "The PMOS terminology aims to reduce the misleading impression that ovarian cysts define the condition, while retaining continuity with established PCOS care.",
    "A name change does not alter a person’s body overnight, invalidate an earlier diagnosis or require every health system to adopt new wording immediately.",
    "Adult diagnostic reasoning commonly combines ovulatory features, androgen-related findings and ovarian markers while excluding other explanations.",
    "Adolescent diagnosis needs particular caution because acne, cycle variation and ovarian appearance can overlap with expected pubertal development.",
    "Regular-looking bleeding does not always answer whether ovulation is occurring, and absent periods can have causes other than PCOS.",
    "Androgen-related symptoms should be described with sensitivity to ethnicity, family pattern, hair-removal choices and the speed of change.",
    "Metabolic assessment is not a moral judgement about weight; blood pressure, glucose risk, sleep and family history can matter across body sizes.",
    "Emotional wellbeing belongs in care because stigma, body-image distress and fertility anxiety can be clinically important rather than secondary concerns.",
    "An ultrasound report must be interpreted with age, symptoms, contraception and the criteria used, not presented as a stand-alone diagnosis.",
    "A useful appointment ends with a plan for the reader’s priorities—cycle care, symptoms, metabolic health or pregnancy planning—and a defined follow-up.",
  ],
  "W03-Z": [
    "Postnatal recovery includes cardiovascular, abdominal, pelvic-floor and musculoskeletal changes alongside sleep loss and the practical load of caring for a baby.",
    "The often-mentioned six-week visit is a review point, not a universal certificate for running, jumping or heavy strength work.",
    "Bleeding that increases after activity can be a signal to reduce the load and discuss the change, particularly when it is accompanied by pain or feeling unwell.",
    "A C-section incision may look closed while deeper tissues are still recovering, so external appearance alone does not determine exercise readiness.",
    "Perineal pain, heaviness, leakage or bowel symptoms after vaginal birth deserve direct questions rather than being normalised as inevitable.",
    "Return to impact can be prepared through walking tolerance, strength, balance and symptom response before repeatedly testing the body with a run.",
    "Feeding position, carrying, floor transfers and getting up from bed may be the most relevant early movements even when the long-term goal is sport.",
    "Recovery is not linear; illness, sleep disruption, mastitis, a growth spurt or a change in support at home can temporarily alter capacity.",
    "A plan should account for what happens later that day and the next morning, not only whether the movement was possible during the session.",
    "Urgent postpartum symptoms such as chest pain, severe breathlessness, collapse, heavy bleeding or unilateral calf symptoms require medical care.",
  ],
  "W03-C": [
    "A preconception review is useful before stopping contraception, but it remains worthwhile if trying has already begun or pregnancy occurs sooner than expected.",
    "Chronic conditions should be reviewed for stability and pregnancy implications without suggesting that someone must achieve perfect health before conceiving.",
    "Every prescription, non-prescription medicine, herbal product and supplement belongs on the list because labels such as natural do not establish pregnancy safety.",
    "Vaccination records help identify questions for the clinician, while timing and eligibility should follow current local guidance rather than a copied checklist.",
    "Previous pregnancy complications can change monitoring discussions, so discharge summaries and operative notes may be more useful than repeating broad screening.",
    "Family history from both prospective parents may identify a reason to discuss carrier screening or genetic counselling without making testing universal.",
    "Dental care, workplace exposures, tobacco, alcohol and food safety can be discussed practically, without using pregnancy planning to police every behaviour.",
    "Irregular cycles, pelvic pain or known reproductive conditions may justify earlier fertility discussion instead of waiting through a fixed interval.",
    "The partner’s health, medicines and fertility history also matter where sperm is involved; preconception care should not place the entire burden on one person.",
    "The visit should finish with clear actions, ownership and timing—what changes now, what waits for pregnancy and whom to contact after a positive test.",
  ],
  "W04-Z": [
    "The linea alba is connective tissue designed to adapt under load, so describing it as broken or torn can create fear that the anatomy does not support.",
    "Pregnancy is a common context for diastasis, but abdominal separation can also be discussed outside pregnancy and after different abdominal histories.",
    "Doming is an observation about how pressure is managed during a task, not a moral sign that the movement was done badly.",
    "Gap width changes with position, breathing and effort, which is why one home measurement should not become a permanent severity label.",
    "Tissue tension and the person’s ability to transfer force during daily tasks may be more informative than appearance in a relaxed photograph.",
    "Pelvic-floor symptoms, back or pelvic pain and fear of movement can coexist and should be assessed rather than attributed automatically to the gap.",
    "Rehabilitation can use graded loading; banning all abdominal work may reduce confidence and capacity without addressing the individual problem.",
    "Body-image concerns deserve respectful discussion, but physiotherapy should not promise a flat abdomen or use before-and-after photographs as clinical proof.",
    "A focal lump that behaves differently from the midline raises a separate medical question, particularly when pain, vomiting or non-reducibility is present.",
    "Review should compare function, symptoms and personally meaningful tasks over time instead of chasing a universal target measurement.",
  ],
  "W04-C": [
    "Calendar apps calculate from previous dates and therefore become less certain when cycle lengths vary or ovulation does not occur every cycle.",
    "Cervical mucus can offer a prospective clue, but infection, semen, lubricants and individual variation can make observations difficult to interpret.",
    "Basal temperature usually provides retrospective information and is sensitive to sleep, illness, alcohol, travel and inconsistent measurement time.",
    "Urine LH kits detect a surge rather than the release of an egg, and PCOS-related hormone patterns may produce repeated or confusing results.",
    "Combining methods may produce more data without producing certainty, so the reader should decide whether tracking is helpful or increasing distress.",
    "A record should include negative as well as positive tests, bleeding dates and medicines so the clinician can see the pattern rather than a selected screenshot.",
    "Tracking is not the same as fertility treatment and should not postpone assessment when cycles are absent, very irregular or accompanied by other symptoms.",
    "This information must not be used as contraceptive instruction because avoiding pregnancy with fertility awareness requires specific training and suitability.",
    "Partner factors, tubal health and age remain relevant even when ovulation is documented; a fertile-window estimate is only one part of conception.",
    "Severe one-sided pain, faintness or bleeding with a positive pregnancy test is an urgent clinical problem, not a signal to repeat an ovulation test.",
  ],
  "W05-Z": [
    "STOTT identifies a teaching system, while Mat and Reformer identify exercise settings; keeping those terms separate prevents misleading class comparisons.",
    "Mat work can be demanding without equipment because gravity, body position, lever length and tempo all change the load.",
    "Reformer springs provide resistance and assistance depending on setup, so more spring does not simply mean a harder or better exercise.",
    "A first-session discussion should cover goals, previous movement experience, pain, surgery, pregnancy or postpartum status and relevant medical advice.",
    "Small-group and one-to-one formats offer different levels of observation, yet the advertised class size should be confirmed with the actual provider.",
    "Online Mat teaching may be possible when suitable, whereas online Reformer instruction should never imply that equipment is supplied or safe unsupervised.",
    "Pilates cueing can be adjusted for comfort, but an instructor should not diagnose a painful condition during a general class.",
    "Physiotherapy begins with a clinical assessment and rehabilitation question; Pilates class participation begins with movement teaching and is not the same service.",
    "Pregnancy, early postpartum recovery and recent surgery require individual suitability rather than a blanket statement that Pilates is safe.",
    "Claims that one branded method prevents injury, produces weight loss or is medically superior need evidence beyond a provider’s promotional material.",
  ],
  "W05-C": [
    "Regular bleeding can coexist with uncertainty about ovulation, especially when contraception or short-term hormonal changes affect the pattern.",
    "Acne is common and should be interpreted by onset, persistence, severity and accompanying features rather than counted as proof of PCOS.",
    "Hair growth patterns vary across families and ethnic backgrounds, so rapid change is more informative than comparison with an online photograph.",
    "Scalp-hair thinning deserves a broad history because nutrition, thyroid disease, stress, genetics and other causes can overlap with PCOS.",
    "PCOS occurs across body sizes; weight-neutral assessment reduces the risk of both missed diagnosis and automatic attribution.",
    "A symptom diary works best when it records timing, medicines and practical impact rather than asking the reader to grade how closely she matches a list.",
    "Hormonal contraception can change cycles, acne and laboratory results, and this context should be documented before interpreting findings.",
    "Adolescents need cautious assessment because expected pubertal cycle and skin changes can resemble adult diagnostic features.",
    "Rapid voice change, marked new hair growth or other rapidly progressive androgen-related features require prompt medical assessment.",
    "Care priorities may include skin, cycles, metabolic health, emotional wellbeing or pregnancy planning, and not every person needs the same pathway.",
  ],
  "W06-Z": [
    "A pelvic-floor contraction should be followed by a genuine release; holding low-level tension all day is not an advanced exercise.",
    "Breath-holding, buttock gripping and bearing down can make a routine feel effortful without producing the intended pelvic-floor response.",
    "Strength describes only one property, while endurance, timing, coordination, sensation and relaxation can each influence symptoms.",
    "Pain with penetration or examination may indicate that repeated squeezing is the wrong starting point and deserves a consent-led assessment.",
    "Difficulty beginning urine flow, emptying the bladder or passing stool is important because the pelvic floor must relax for these functions.",
    "Some leakage patterns benefit from supervised muscle training, but urgency, infection symptoms and mixed presentations may need a broader plan.",
    "Pregnancy, birth, menopause, pelvic surgery and neurological history can change the assessment without deciding the result in advance.",
    "An internal examination is never automatic; the clinician should explain its purpose, alternatives and what information it may add.",
    "A prescribed programme needs a dose, rest and review point, which is why an endless online challenge is not equivalent to treatment.",
    "Sudden bladder or bowel change with severe back pain, weakness or saddle numbness is an emergency rather than an exercise problem.",
  ],
  "W06-C": [
    "The effect on school, work, sleep, travel and relationships helps describe severity more fully than a pain score alone.",
    "Pain beginning well before bleeding, continuing after it ends or occurring between periods may alter the clinical questions.",
    "Bowel pain, urinary pain, pain during sex and fertility concerns should be volunteered because patients are not always asked directly.",
    "A family history of endometriosis or significant period pain can be relevant without confirming the cause.",
    "A normal scan does not necessarily close the assessment, because not every cause of pelvic pain is visible on routine imaging.",
    "Endometriosis is an important possibility, but severe pain should not be presented as proof of one disease.",
    "Treatment choices depend on contraindications, pregnancy goals, previous response and preference; this is why medication doses do not belong in generic copy.",
    "A diary can compare function before and after a plan, but daily scoring should stop if it increases distress without helping decisions.",
    "Fever, unusual discharge or acute worsening suggests a different question from recurring primary period pain and needs medical review.",
    "Severe sudden pain, fainting, unstable heavy bleeding or pain with a positive pregnancy test requires urgent local assessment.",
  ],
  "W07-Z": [
    "Back pain in pregnancy should be located carefully because lumbar, pelvic, rib and referred pain can feel similar to the reader.",
    "Night pain, trauma, fever, urinary symptoms, leg weakness or numbness change the assessment and should not be hidden under a posture label.",
    "Sitting upright all day is not a cure; comfortable variation and task-specific support are often more realistic than one ideal position.",
    "Lifting advice should consider the object, floor height, frequency, available help and symptoms rather than prohibit all bending.",
    "Short movement breaks may help some desk-based readers, while others need pacing because prolonged walking is their main trigger.",
    "Sleep-position suggestions should be framed as comfort options, not rules that create anxiety when a person wakes in another position.",
    "A physiotherapy session can test movements, strength and daily-task adaptations but cannot exclude obstetric or urinary causes on its own.",
    "Pelvic girdle pain may overlap with back pain; asking which activities provoke symptoms is more useful than diagnosing by a body map.",
    "An exercise that feels comfortable in clinic still needs review against the response later that day and the following morning.",
    "Bleeding, fluid loss, contractions, fever, fetal-movement concern or neurological change needs maternity or emergency care as appropriate.",
  ],
  "W07-C": [
    "PCOS may make ovulation less frequent without eliminating it, so contraception remains relevant when pregnancy is not currently desired.",
    "Cycle dates and ovulation evidence are more informative than assuming every bleed represents ovulation or every long cycle represents infertility.",
    "Age affects fertility independently of PCOS and should be discussed honestly without converting population trends into an individual prediction.",
    "Pregnancy requires more than ovulation; sperm, tubes, the uterine cavity, timing and broader health can each influence the assessment.",
    "Both partners should be included where relevant so that investigation does not focus on one diagnosis while overlooking another factor.",
    "Previous pelvic surgery, infection, endometriosis symptoms or cancer treatment may justify earlier review than a standard trying interval.",
    "Treatment might address ovulation or another identified factor, but no medicine, procedure or IVF pathway is automatic after a PCOS diagnosis.",
    "Metabolic health and medicines can be reviewed before pregnancy without making weight loss a condition for respectful fertility care.",
    "The emotional effect of uncertain cycles and repeated testing deserves acknowledgement and a plan for when tracking should stop.",
    "A positive test followed by severe one-sided pain, faintness or heavy bleeding requires urgent assessment for pregnancy complications.",
  ],
  "W08-Z": [
    "C-section recovery combines surgical healing with postnatal bleeding, feeding, sleep disruption and responsibility for a newborn.",
    "Before discharge, practical rehearsal of bed mobility, coughing support, stairs and baby-care positions can reveal questions that a leaflet misses.",
    "Pain relief prescribed by the surgical team may make movement possible; readers should not change medicines from physiotherapy advice.",
    "Short walks support ordinary recovery when medically suitable, but step targets and fixed daily increases can ignore fatigue and wound symptoms.",
    "The incision should be observed according to discharge advice, with increasing redness, heat, swelling, discharge or opening reported medically.",
    "Scar-touch or massage discussions belong after wound healing is confirmed and should never be offered as treatment for infection or dehiscence.",
    "Abdominal and pelvic-floor assessment can consider breathing, pressure, leakage, heaviness and functional tasks without promising tissue recovery by a deadline.",
    "Lifting advice must account for the surgeon’s restrictions, pain, home setup and unavoidable care tasks rather than issuing one universal weight.",
    "Return to driving, work, exercise and sex are separate decisions and may require different medical, comfort and functional considerations.",
    "Heavy bleeding, chest pain, severe breathlessness, collapse or one-sided calf symptoms requires urgent local care rather than rehabilitation messaging.",
  ],
  "W08-C": [
    "Trying time is counted in context, because contraception use, long separations, sexual pain or very irregular ovulation can change what the interval means.",
    "Age-based intervals organise referral but should not become barriers when a relevant medical or reproductive history is already known.",
    "Absent periods, suspected endometriosis, previous pelvic infection or surgery and cancer treatment can support earlier evaluation.",
    "Known semen or testicular concerns should be addressed from the beginning rather than after completing every investigation for the female partner.",
    "A fertility visit reviews both partners where relevant and does not automatically commit anyone to IVF or another procedure.",
    "Previous reports can prevent duplication, but broad self-ordered testing may introduce results that do not answer the clinical question.",
    "A first appointment should clarify which test is proposed, what it can change and when the results will be reviewed together.",
    "Cycles, medicines, operations, pregnancy history and family history are useful to bring in a concise timeline.",
    "Earlier support may be appropriate when uncertainty is causing significant distress, even if the clinical plan begins with information rather than treatment.",
    "Acute severe pain, fainting or heavy bleeding—especially after a positive test—is urgent and separate from fertility evaluation.",
  ],
  "W09-Z": [
    "A self-check should answer a limited observation question, not award a diagnosis, severity grade or permission to exercise.",
    "Position, head lift, breathing, recent meals and the amount of force used can all change what the fingers seem to feel.",
    "Finger widths are not standard units because hands differ, and depth or tissue tension may change independently of width.",
    "Repeated checking can increase guarding and worry, so it is reasonable to stop when the result is not helping a decision.",
    "A clinician-approved demonstration should show gentle positioning and explain limitations before asking the reader to touch the abdomen.",
    "Pregnancy, recent birth, abdominal surgery and pain each affect whether a home observation is appropriate at that time.",
    "A physiotherapist compares the midline response across breathing and functional loads rather than relying on one small test position.",
    "Doming, pelvic heaviness, leakage, back pain and movement confidence provide context but do not prove that diastasis caused them.",
    "A focal painful lump differs from broad midline separation and deserves medical review, particularly with vomiting or inability to reduce it.",
    "Severe abdominal pain, repeated vomiting or collapse requires urgent local care instead of another self-check or an image sent online.",
  ],
  "W09-C": [
    "Neural-tube development begins early, which is why folic-acid planning is discussed before a missed period rather than after the first scan.",
    "Someone already pregnant should ask promptly rather than assume that starting now has no value.",
    "Food sources of folate support nutrition, yet current guidance still recommends a supplement around conception for the intended preventive purpose.",
    "The appropriate dose depends on local guidance and personal risk, so the final article must not turn a general recommendation into a prescription.",
    "Diabetes, some medicines, malabsorption and a previous affected pregnancy are examples of histories that may change the prescribing conversation.",
    "Multiple prenatal and beauty supplements can duplicate ingredients, making a photograph of every label useful at review.",
    "A higher amount is not automatically more protective, and supplement marketing should not replace advice from the clinician or pharmacist.",
    "Prescribed medicines should not be stopped abruptly in an attempt to make pregnancy planning feel safer.",
    "The conversation can include when to begin, how long to continue and what to do if pregnancy occurs sooner than planned.",
    "Folic acid is preventive supplementation, not treatment for pain, bleeding or an acute pregnancy concern that needs medical assessment.",
  ],
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
