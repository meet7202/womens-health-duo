import { CONTACT } from "../../../config/site.defaults";
import { hubArticle } from "./hubFigureHelpers";
import type { CalendarArticleRevision } from "./types";

const NICE_NG210 = {
  label: "NICE NG210: Pelvic floor dysfunction: prevention and non-surgical management",
  url: "https://www.nice.org.uk/guidance/ng210/chapter/Recommendations",
};
const NICE_NG123 = {
  label: "NICE NG123: Urinary incontinence and pelvic organ prolapse in women: management",
  url: "https://www.nice.org.uk/guidance/ng123/chapter/Recommendations",
};
const POGP_DRAM = {
  label: "POGP: Tummy muscle separation (DRAM) in pregnancy",
  url: "https://thepogp.co.uk/patient_information/womens_health/tummy_muscle_separation.aspx",
};
const NHS_EXERCISE_PREGNANCY = {
  label: "NHS: Exercise in pregnancy",
  url: "https://www.nhs.uk/pregnancy/keeping-well/exercise/",
};

/** Dr. Zalak Shah's physiotherapy hubs, in the same article format as the calendar guides. */
export const ZALAK_HUB_ARTICLES: readonly CalendarArticleRevision[] = [
  hubArticle({
    id: "HUB-DIASTASIS-Z",
    slug: "diastasis-recti",
    lead: "zalak",
    title: "Diastasis Recti Physiotherapy",
    seoTitle: "Diastasis recti physio: Dr. Zalak",
    description: `Diastasis recti physiotherapy with Dr. Zalak Shah (PT): assessment, graded core rehab, online or in Bengaluru and Ahmedabad. Book via WhatsApp ${CONTACT.phoneE164}.`,
    primaryQuestion: "How does physiotherapy help diastasis recti?",
    directAnswer:
      "If your tummy still feels soft down the middle, domes when you sit up, or feels unreliable when you lift your baby, physiotherapy can help you understand what your abdominal wall is doing and how to load it with more confidence. A women's health physiotherapist looks at the width and depth of the gap, how the midline tensions when you breathe and move, and which daily tasks bring on doming or discomfort. Rehab then builds breathing, pressure control, deep-core and pelvic-floor coordination, and graded strength. The aim is comfort and capacity for the life you lead, not a promise that the gap will close to a set finger width.",
    sections: [
      {
        heading: "Why the midline changes after pregnancy",
        paragraphs: [
          "During pregnancy the two halves of the rectus abdominis move apart as the uterus grows, and the connective tissue between them, the linea alba, stretches and thins. POGP notes that tummy-muscle separation is very common in pregnancy and after birth. For many people the gap narrows in the months after delivery; for others the midline still feels soft, domes under effort or makes lifting and getting out of bed feel unsupported.",
          "A visible gap on its own does not mean something is wrong or that you must avoid all core work. What matters more is how the abdominal wall copes with the loads you meet each day, such as lifting a car seat, carrying shopping, or returning to exercise.",
        ],
      },
      {
        heading: "What an assessment looks at",
        paragraphs: [
          "Your physiotherapist will ask about your pregnancy and birth, any caesarean scar, back or pelvic pain, bladder control and the activities you want to get back to. They then look at the gap with your head lifted and at rest, how firm the midline feels, whether it domes when you curl up or strain, and how your breathing, ribcage and pelvic floor work together.",
          "Home finger-width checks give a rough sense of distance only. They cannot tell you how well the tissue tensions under load or rule out a hernia, which is why a hands-on or guided video assessment shapes the plan better than a measurement alone.",
        ],
      },
      {
        heading: "How rehab usually progresses",
        paragraphs: [
          "Early work focuses on breathing and pressure management in everyday positions: rolling to your side to get up, exhaling as you lift, and noticing breath-holding or bearing down. Deep abdominal and pelvic-floor coordination follows, then exercises that gradually add load while the midline stays controlled. Doming that does not settle, pain, or leakage are cues to adjust the exercise rather than push through.",
          "Strength work, Pilates-based movement and a return to running or lifting come later, once the basics hold up. Copying a gap-closing challenge from social media skips that sequence. Our guide on rebuilding core strength after pregnancy covers the later return-to-load stage in more detail.",
        ],
      },
      {
        heading: "What improvement looks like",
        paragraphs: [
          "Progress usually shows up as tasks becoming easier: lifting without doming, less back ache at the end of the day, more confidence with exercise. The gap may narrow as well, but its final width varies between people and does not have to close completely for the abdominal wall to work well.",
          "If symptoms persist despite consistent rehab, or there is a large gap with a hernia, a surgical opinion may be appropriate. Physiotherapy does not diagnose hernias; your physiotherapist will suggest a medical review when examination findings raise that question.",
        ],
      },
      {
        heading: "When to seek medical care first",
        paragraphs: [
          "Arrange a medical review for a persistent bulge you cannot explain, pain at rest, or any concern about a hernia. Seek urgent care for a painful, firm lump that will not go back in, especially with vomiting, severe tummy pain, or being unable to pass wind or stool.",
          "At Women's Health Duo, Dr. Zalak Shah (PT) sees women for diastasis recti physiotherapy in Bengaluru and Ahmedabad and online, and works with Dr. Charmi Shah when gynaecology or surgical questions come up.",
        ],
      },
    ],
    explainerCards: [
      "Why does the midline stay soft after birth?",
      "Is a finger-width check enough?",
      "What does diastasis rehab involve?",
      "When is a tummy bulge urgent?",
    ],
    scene: {
      pack: "can-diastasis-recti-heal-naturally",
      alt: "Mother doing core rehab exercise with an inset of abdominal muscles closing toward the midline",
      caption:
        "Rehab adds load gradually while the midline stays controlled; comfort and function matter more than a fixed gap width.",
    },
    anatomy: {
      pack: "what-is-diastasis-recti",
      alt: "Diagram comparing a normal and widened gap between the abdominal muscles",
      caption:
        "The linea alba stretches and thins between the two rectus muscles; assessment looks at width, depth and tension under load.",
    },
    explainerAlt:
      "Diastasis recti physiotherapy questions: why the midline stays soft, self-checks, rehab and urgent bulges.",
    references: [
      POGP_DRAM,
      {
        label: "NHS: Your post-pregnancy body",
        url: "https://www.nhs.uk/conditions/baby/support-and-services/your-post-pregnancy-body/",
      },
      { label: "NHS: Hernia", url: "https://www.nhs.uk/conditions/hernia/" },
    ],
    internalLinks: [
      { anchor: "What is diastasis recti", path: "/what-is-diastasis-recti/" },
      { anchor: "diastasis recti self-check", path: "/how-to-check-for-diastasis-recti/" },
      {
        anchor: "rebuilding core strength after pregnancy",
        path: "/how-to-rebuild-core-after-pregnancy/",
      },
      { anchor: "postpartum recovery physiotherapy", path: "/postpartum-recovery/" },
    ],
    faqs: [
      {
        question: "Will physiotherapy close my tummy gap?",
        answer:
          "Many people find the gap narrows and the midline feels firmer with guided rehab, but nobody can promise a set width or a flat tummy. The goal is an abdominal wall that copes with your daily loads comfortably.",
      },
      {
        question: "Can I do sit-ups or crunches with diastasis recti?",
        answer:
          "Not as a starting point. Curl-ups may be added later if your midline stays controlled without doming or pain. Your physiotherapist decides when and how based on your assessment.",
      },
      {
        question: "Is diastasis recti the same as a hernia?",
        answer:
          "No. Diastasis is stretching of the linea alba between the rectus muscles. A hernia is tissue pushing through a weakness in the abdominal wall. They can coexist, and an unexplained or painful lump needs a medical review.",
      },
      {
        question: "How long after birth can I start diastasis rehab?",
        answer:
          "Gentle breathing, pelvic-floor and posture work can usually begin in the early weeks when you feel ready. Progression depends on birth type, wound healing and symptoms rather than a fixed date.",
      },
    ],
    conversionCopy:
      "If you would like your abdominal wall assessed and a graded rehab plan, you can book a consultation with Dr. Zalak Shah (PT).",
    parentHubPath: "/postpartum-recovery/",
  }),
  hubArticle({
    id: "HUB-WHP-Z",
    slug: "womens-health-physiotherapy",
    lead: "zalak",
    title: "Women's Health Physiotherapy",
    seoTitle: "Women's Health Physiotherapist (PT)",
    description: `Women's health physiotherapy with Dr. Zalak Shah (PT) for pelvic floor, prenatal and postnatal care, diastasis recti. Book via WhatsApp ${CONTACT.phoneE164}.`,
    primaryQuestion: "What can women's health physiotherapy help with?",
    directAnswer:
      "Women's health physiotherapy looks after the muscles, joints and habits behind symptoms that many women are told to put up with: bladder leakage, pelvic heaviness or pain, back and pelvic girdle pain in pregnancy, a soft or doming tummy after birth, and difficulty getting back to exercise. A physiotherapist assesses how you breathe, move and load your pelvic floor and abdominal wall, then builds a graded plan of education and exercise. It works alongside medical care rather than replacing it, and starts with your goals rather than a generic workout.",
    sections: [
      {
        heading: "Common reasons women see a physiotherapist",
        paragraphs: [
          "Pregnancy and the year after birth are the most common times: pelvic girdle pain, back ache, preparing the pelvic floor for birth, recovering after vaginal or caesarean delivery, and diastasis recti. Outside pregnancy, people come for stress or urgency leakage, pelvic floor tension and pain with intercourse, prolapse symptoms, and safe return to running, lifting or Pilates.",
          "NICE guidance recommends supervised pelvic floor muscle training as a first-line treatment for stress urinary incontinence and for some prolapse symptoms. That training works best when someone has checked whether your muscles need strengthening, relaxing or better timing.",
        ],
      },
      {
        heading: "What happens at an appointment",
        paragraphs: [
          "The first visit is mostly conversation: your symptoms, bladder and bowel habits, pregnancy and birth history, activity and goals. Your physiotherapist then looks at posture, breathing, the abdominal wall and how you move. An internal pelvic floor examination can give useful information, but it is always optional and explained first, and many plans start without one.",
          "You should leave with a clear explanation of what is likely driving your symptoms, a small number of exercises or habits to practise, and a sense of how progress will be measured. Our guide on what happens during a physiotherapy session describes the visit step by step.",
        ],
      },
      {
        heading: "How treatment is built",
        paragraphs: [
          "Plans usually combine education, pelvic floor training (strength, endurance, relaxation or coordination, depending on findings), breathing and pressure strategies, and graded strength work for the hips, back and abdominal wall. Bladder habits, constipation care and pacing matter as much as exercises for many symptoms.",
          "Pilates-based exercise can be useful once the foundations are in place. It is a tool within the plan rather than the plan itself, and progressions are matched to your symptoms rather than to a class timetable.",
        ],
      },
      {
        heading: "Online or in clinic",
        paragraphs: [
          "Video appointments work well for history, education, exercise coaching and follow-up, as long as you can show breathing and movement on camera. Hands-on checks, including internal examination and prolapse assessment, need an in-person visit. A sensible plan often mixes the two.",
          "Dr. Zalak Shah (PT) offers in-person women's health physiotherapy in Bengaluru and Ahmedabad and online sessions for women in other cities and countries.",
        ],
      },
      {
        heading: "When to see a doctor first",
        paragraphs: [
          "Physiotherapy is not the first step for blood in your urine, fever with pelvic pain, new heavy or post-menopausal bleeding, or a new loss of bladder or bowel control with back pain, leg weakness or numbness in the saddle area. Those need medical or emergency assessment.",
          "Once medical causes have been checked, physiotherapy can address the muscle and movement side. At Women's Health Duo, Dr. Charmi Shah covers the gynaecology lane when both are needed.",
        ],
      },
    ],
    explainerCards: [
      "What does women's health physio treat?",
      "Is an internal exam always needed?",
      "Can physiotherapy work online?",
      "When should I see a doctor first?",
    ],
    scene: {
      pack: "what-is-womens-health-physiotherapy",
      alt: "Woman talking with a physiotherapist beside a pelvis teaching model",
      caption:
        "Women's health physiotherapy looks at bladder, bowel, pelvic floor and abdominal symptoms alongside medical care.",
    },
    anatomy: {
      pack: "what-is-the-pelvic-floor",
      alt: "Top-down diagram of the pelvic floor muscles between pubic bone and tailbone",
      caption:
        "The pelvic floor spans the base of the pelvis and works with breathing and the deep abdominal muscles.",
    },
    explainerAlt:
      "Women's health physiotherapy questions: what it treats, internal exams, online sessions and when to see a doctor.",
    references: [
      NICE_NG210,
      NICE_NG123,
      {
        label: "POGP: Physiotherapy assessment (patient information)",
        url: "https://thepogp.co.uk/patients/pelvic_health_advice/physiotherapy_assessment.aspx",
      },
    ],
    internalLinks: [
      {
        anchor: "what women's health physiotherapy is",
        path: "/what-is-womens-health-physiotherapy/",
      },
      {
        anchor: "what happens during a physiotherapy session",
        path: "/what-happens-during-a-physiotherapy-session/",
      },
      {
        anchor: "online women's health physiotherapy",
        path: "/online-womens-health-physiotherapy/",
      },
      { anchor: "pelvic floor therapy", path: "/pelvic-floor-therapy/" },
    ],
    faqs: [
      {
        question: "Do I need a referral for women's health physiotherapy?",
        answer:
          "Usually not. Bring any reports or clearance you already have. If you have red-flag symptoms such as bleeding, fever or new loss of control, see a doctor first.",
      },
      {
        question: "Is an internal examination required?",
        answer:
          "No. It can add useful information and is offered with consent when it would change the plan, but many people start treatment without one.",
      },
      {
        question: "How many sessions will I need?",
        answer:
          "It depends on the problem and how consistently you practise. Many plans review progress after a few weeks of home exercise rather than relying on frequent visits.",
      },
      {
        question: "Is this the same as a Pilates class?",
        answer:
          "No. Physiotherapy starts with an assessment and a diagnosis of the movement problem. Pilates exercises may be used within the plan when they suit your findings.",
      },
    ],
    conversionCopy:
      "If you would like an assessment for pelvic floor, pregnancy or postnatal symptoms, you can book a consultation with Dr. Zalak Shah (PT).",
    parentHubPath: "/dr-zalak-shah/",
  }),
  hubArticle({
    id: "HUB-PRENATAL-Z",
    slug: "prenatal-physiotherapy",
    lead: "zalak",
    title: "Prenatal Physiotherapy",
    seoTitle: "Prenatal physio with Dr. Zalak Shah",
    description: `Prenatal physiotherapy with Dr. Zalak Shah (PT): pelvic girdle pain, pregnancy-safe exercise, birth prep. Book via WhatsApp ${CONTACT.phoneE164}.`,
    primaryQuestion: "How can physiotherapy help during pregnancy?",
    directAnswer:
      "Prenatal physiotherapy helps you stay active and comfortable as pregnancy changes your posture, breathing and the load on your pelvis. It can ease pelvic girdle and back pain, keep you moving safely through each trimester, prepare your pelvic floor and breathing for labour, and set you up for recovery after birth. Sessions adapt exercise to your stage of pregnancy and any advice from your maternity team. Many aches in pregnancy are common and treatable, but some symptoms need obstetric care first, and a good physiotherapist will tell you which is which.",
    sections: [
      {
        heading: "How pregnancy changes the way you move",
        paragraphs: [
          "As the uterus grows, your centre of gravity moves forward, the ribcage widens, and the abdominal wall stretches. Hormonal changes soften ligaments, and the pelvic floor carries more weight. These changes are normal, but they explain why back ache, pelvic girdle pain, rib discomfort and leaking with a cough are so common.",
          "The NHS encourages most women with an uncomplicated pregnancy to keep active, adapting rather than stopping exercise. Physiotherapy helps you work out what adapting means for your body and your stage of pregnancy.",
        ],
      },
      {
        heading: "Pelvic girdle and back pain",
        paragraphs: [
          "Pelvic girdle pain is felt at the front of the pubic bone, across the back of the pelvis, or in the hips and thighs, and often flares with walking, stairs, standing on one leg or turning in bed. Treatment usually combines advice on how to move (keeping knees together when getting out of a car or bed, smaller steps, sitting to dress), targeted exercise for the hips and trunk, and sometimes a support belt or manual therapy.",
          "Back pain responds to similar principles: varied positions, strength work you can keep doing, and pacing. Our guide on relieving pelvic pain in pregnancy goes into the self-help strategies in more detail.",
        ],
      },
      {
        heading: "Exercise through each trimester",
        paragraphs: [
          "Early pregnancy is often limited more by nausea and tiredness than by anything else. In the second and third trimesters, plans typically shift from long periods lying flat on your back to side-lying, seated, kneeling and standing exercises, avoid contact sports and high fall-risk activities, and use the talk test to keep effort moderate.",
          "Pregnancy-adapted Pilates, walking, swimming and light strength work suit many women. Your physiotherapist adjusts positions and load as the bump grows and as symptoms change.",
        ],
      },
      {
        heading: "Pelvic floor and preparing for birth",
        paragraphs: [
          "Pelvic floor training during pregnancy is recommended by NICE to help prevent leakage later. Equally important is learning to relax and lengthen the pelvic floor, which matters for birth. Breathing practice, positions for labour and, where appropriate, perineal massage from 34 weeks are often covered.",
          "Talking through what recovery may look like after vaginal or caesarean birth also makes the early postnatal weeks less daunting.",
        ],
      },
      {
        heading: "When to contact your maternity team",
        paragraphs: [
          "Stop exercising and seek obstetric advice for vaginal bleeding, fluid leaking, regular painful contractions, reduced baby movements, severe headache or vision changes, sudden swelling of the face or hands, chest pain or calf pain and swelling. These are not physiotherapy problems.",
          "Dr. Zalak Shah (PT) offers prenatal physiotherapy and pregnancy classes in Bengaluru and Ahmedabad, with online sessions for women elsewhere, working alongside your obstetric care.",
        ],
      },
    ],
    explainerCards: [
      "Why does pregnancy cause pelvic pain?",
      "Which exercises suit each trimester?",
      "Should I train my pelvic floor now?",
      "Which symptoms need my maternity team?",
    ],
    scene: {
      pack: "what-is-prenatal-physiotherapy",
      alt: "Pregnant woman doing guided side-lying exercise in a physiotherapy studio",
      caption: "Prenatal physiotherapy adapts positions and load to each stage of pregnancy.",
    },
    anatomy: {
      pack: "how-to-relieve-pelvic-pain-during-pregnancy",
      alt: "Diagram of the pelvis highlighting the pubic symphysis and sacroiliac joints",
      caption:
        "Pelvic girdle pain is felt around the pubic symphysis and sacroiliac joints as load on the pelvis increases.",
    },
    explainerAlt:
      "Prenatal physiotherapy questions: pelvic pain, exercise by trimester, pelvic floor training and warning signs.",
    references: [
      NHS_EXERCISE_PREGNANCY,
      {
        label: "RCOG: Pelvic girdle pain and pregnancy (patient information)",
        url: "https://www.rcog.org.uk/for-the-public/browse-our-patient-information/pelvic-girdle-pain-and-pregnancy/",
      },
      NICE_NG210,
    ],
    internalLinks: [
      { anchor: "what prenatal physiotherapy is", path: "/what-is-prenatal-physiotherapy/" },
      {
        anchor: "relieving pelvic pain in pregnancy",
        path: "/how-to-relieve-pelvic-pain-during-pregnancy/",
      },
      { anchor: "exercise safety in pregnancy", path: "/is-exercise-safe-during-pregnancy/" },
      { anchor: "pregnancy exercises by trimester", path: "/pregnancy-exercises-by-trimester/" },
    ],
    faqs: [
      {
        question: "Is it safe to exercise while pregnant?",
        answer:
          "For most uncomplicated pregnancies, moderate activity is encouraged. Check with your maternity team if you have bleeding, a heart or lung condition, placenta problems or a history of preterm labour.",
      },
      {
        question: "Can physiotherapy help pelvic girdle pain?",
        answer:
          "Yes. Advice on movement, targeted exercise and sometimes a support belt or hands-on treatment can reduce pain and help you stay active.",
      },
      {
        question: "Should I lie on my back to exercise in late pregnancy?",
        answer:
          "Long spells flat on your back can make some women feel faint later in pregnancy. Side-lying, seated and propped positions are usually used instead.",
      },
      {
        question: "When should I start prenatal physiotherapy?",
        answer:
          "Any time symptoms appear, or in the second trimester if you want guidance on exercise and birth preparation.",
      },
    ],
    conversionCopy:
      "If you would like help with pregnancy pain or a safe exercise plan, you can book a consultation with Dr. Zalak Shah (PT).",
    parentHubPath: "/womens-health-physiotherapy/",
  }),
  hubArticle({
    id: "HUB-POSTPARTUM-Z",
    slug: "postpartum-recovery",
    lead: "zalak",
    title: "Postpartum Recovery Physiotherapy",
    seoTitle: "Postpartum recovery physio: Dr. Zalak",
    description: `Postpartum recovery physiotherapy with Dr. Zalak Shah (PT): core, pelvic floor, return to exercise. Book via WhatsApp ${CONTACT.phoneE164}.`,
    primaryQuestion: "What does recovery after birth involve, and how can physiotherapy help?",
    directAnswer:
      "Recovery after birth is not a single six-week event. Bleeding settles, wounds heal, the uterus shrinks, and the pelvic floor and abdominal wall gradually take load again, all while you are short of sleep and caring for a newborn. Some symptoms ease quickly; others, such as leaking, pelvic heaviness, a doming tummy or back pain, often improve faster with a graded plan. Postnatal physiotherapy helps you rebuild in stages, from breathing and gentle pelvic-floor work to strength and, when you are ready, impact exercise.",
    sections: [
      {
        heading: "The first weeks after birth",
        paragraphs: [
          "Early recovery is about rest, short walks, comfortable feeding positions and gentle pelvic-floor and breathing exercises when you feel up to them. After a caesarean, support the wound when you cough, roll to your side to get out of bed, and avoid heavy lifting while the scar heals.",
          "The NHS describes the postnatal check at around 6 to 8 weeks as a review of how you are recovering, not a finish line. Many women still have symptoms beyond that point, and it is worth asking for help rather than waiting.",
        ],
      },
      {
        heading: "Common problems physiotherapy can help",
        paragraphs: [
          "Leaking with coughing or lifting, urgency, a feeling of heaviness, pelvic or pubic pain, back ache from feeding and carrying, diastasis recti, and scar tightness after caesarean or perineal tears are all common after birth. NICE recommends pelvic floor muscle training for women with symptoms after childbirth.",
          "These problems are common but not something you simply have to accept. Many improve with targeted exercise, better daily strategies and time.",
        ],
      },
      {
        heading: "Rebuilding strength in stages",
        paragraphs: [
          "Rehab usually starts with breathing, pelvic floor coordination and posture for feeding and lifting. It then adds strength for the hips, abdominal wall and back, gradually increasing load while symptoms stay controlled. Returning to running or high-impact classes usually waits until you can manage strength and low-impact tasks without leaking, heaviness or pain.",
          "Guidance on returning to running after birth suggests building up from walking and strength work rather than starting at a fixed week. Our guide on when you can exercise after delivery explains this staged approach.",
        ],
      },
      {
        heading: "Sleep, mood and pacing",
        paragraphs: [
          "Broken sleep, feeding demands and recovering tissue all limit how much you can do. Short, regular sessions you can keep up are more useful than ambitious plans that collapse after a bad night. Pain, low mood or anxiety affect recovery too, and deserve attention in their own right.",
          "If you notice persistent low mood, loss of interest or thoughts of harming yourself, speak to your doctor or health visitor promptly. Postnatal depression is common and treatable.",
        ],
      },
      {
        heading: "When to seek urgent medical care",
        paragraphs: [
          "Seek urgent care for heavy bleeding or large clots, fever, a red or leaking wound, chest pain or breathlessness, a painful swollen calf, severe headache, or thoughts of self-harm. These need medical assessment, not exercise advice.",
          "Dr. Zalak Shah (PT) supports postnatal recovery in Bengaluru and Ahmedabad and online, and works with Dr. Charmi Shah when obstetric or gynaecology input is needed.",
        ],
      },
    ],
    explainerCards: [
      "Is recovery finished at six weeks?",
      "Which postnatal symptoms can physio help?",
      "When can I return to running?",
      "Which symptoms after birth are urgent?",
    ],
    scene: {
      pack: "how-long-does-postpartum-recovery-take",
      alt: "Mother walking with a pram with an inset of the womb returning to size",
      caption:
        "Recovery after birth moves at different speeds for bleeding, wounds, the pelvic floor and energy.",
    },
    anatomy: {
      pack: "how-to-rebuild-core-after-pregnancy",
      alt: "Diagram of the core cylinder: diaphragm, pelvic floor, deep abdominals and back muscles",
      caption:
        "The diaphragm, pelvic floor, deep abdominals and back muscles share pressure and load as you recover.",
    },
    explainerAlt:
      "Postpartum recovery questions: the six-week check, common symptoms, return to running and urgent signs.",
    references: [
      {
        label: "NHS: Your post-pregnancy body",
        url: "https://www.nhs.uk/conditions/baby/support-and-services/your-post-pregnancy-body/",
      },
      {
        label: "NHS: Your 6-week postnatal check",
        url: "https://www.nhs.uk/conditions/baby/support-and-services/your-6-week-postnatal-check/",
      },
      {
        label: "Goom, Donnelly & Brockwell: Returning to running postnatal (2019)",
        url: "https://www.absolute.physio/wp-content/uploads/2019/09/returning-to-running-postnatal-guidelines.pdf",
      },
      NICE_NG210,
    ],
    internalLinks: [
      {
        anchor: "how long postpartum recovery takes",
        path: "/how-long-does-postpartum-recovery-take/",
      },
      {
        anchor: "when you can exercise after delivery",
        path: "/when-can-i-exercise-after-delivery/",
      },
      { anchor: "recovery after a caesarean", path: "/how-to-recover-after-c-section/" },
      { anchor: "diastasis recti physiotherapy", path: "/diastasis-recti/" },
    ],
    faqs: [
      {
        question: "When can I start exercising after giving birth?",
        answer:
          "Gentle walking, breathing and pelvic-floor exercises can usually start when you feel ready after an uncomplicated birth. Higher-impact exercise is normally discussed after the postnatal check, and later after a caesarean or complications.",
      },
      {
        question: "Is leaking after birth normal?",
        answer:
          "It is common, especially in the early weeks, but it is not something you have to live with. Pelvic floor training helps most women, and persistent leaking deserves an assessment.",
      },
      {
        question: "Can I see a physiotherapist after a caesarean?",
        answer:
          "Yes. Physiotherapy can help with scar comfort, getting in and out of bed, abdominal and pelvic floor recovery, and a staged return to exercise once your wound has healed.",
      },
      {
        question: "Is it too late if my baby is older?",
        answer: "No. Postnatal symptoms can improve with treatment months or years after birth.",
      },
    ],
    conversionCopy:
      "If you would like a staged recovery plan after birth, you can book a consultation with Dr. Zalak Shah (PT).",
    parentHubPath: "/womens-health-physiotherapy/",
  }),
  hubArticle({
    id: "HUB-BLADDER-Z",
    slug: "bladder-leakage",
    lead: "zalak",
    title: "Bladder Leakage Physiotherapy",
    seoTitle: "Bladder leakage physio: Dr. Zalak",
    description: `Bladder leakage and stress incontinence rehab with Dr. Zalak Shah (PT). Online pelvic floor physio; book via WhatsApp ${CONTACT.phoneE164}.`,
    primaryQuestion: "Why does bladder leakage happen, and what helps?",
    directAnswer:
      "Leaking urine when you cough, sneeze, laugh, lift or jump is called stress urinary incontinence. It happens when a sudden rise in pressure inside the abdomen outpaces the support from the pelvic floor and urethral sphincter. Leaking with a sudden, strong urge to go is urgency incontinence, and many women have a mix of both. Leakage is common after pregnancy and around menopause, but it is not a normal part of being a woman, and NICE recommends supervised pelvic floor muscle training as the first treatment for stress leakage.",
    sections: [
      {
        heading: "Stress, urge and mixed leakage",
        paragraphs: [
          "Stress leakage appears with effort: coughing, sneezing, running, lifting a toddler. Urge leakage arrives with a sudden need to pass urine that is hard to put off, sometimes triggered by running water or arriving home. Mixed incontinence combines the two. Telling them apart matters because the treatment emphasis differs.",
          "Pregnancy and vaginal birth, menopause, chronic cough, constipation, heavy lifting and high-impact sport all increase the load on the pelvic floor. Leakage can also happen in women who have never given birth.",
        ],
      },
      {
        heading: "What an assessment looks for",
        paragraphs: [
          "Your physiotherapist will ask when leakage happens, how much, how often you pass urine, what and how much you drink, and about bowel habits. A bladder diary over a few days is often the most useful piece of information.",
          "Examination checks whether the pelvic floor can contract, relax and time its squeeze with a cough. Some women need strengthening; others have muscles that are tense and tired, where more squeezing would not help. A urine test is sensible if symptoms are new or include burning.",
        ],
      },
      {
        heading: "Treatment that works",
        paragraphs: [
          "NICE recommends at least three months of supervised pelvic floor muscle training for stress or mixed incontinence. Training builds strength and endurance and teaches you to brace before a cough or lift (sometimes called the knack). Progress is usually gradual over weeks.",
          "For urgency, bladder training gradually stretches the time between toilet visits, alongside reducing caffeine and fizzy drinks and treating constipation. Drinking too little often makes urgency worse rather than better. If conservative care is not enough, medicines or surgical options can be discussed with a doctor.",
        ],
      },
      {
        heading: "Why random Kegels are not enough",
        paragraphs: [
          "Many women try squeezing exercises from a video and give up when nothing changes. Common reasons are squeezing the wrong muscles, holding the breath, never fully relaxing between contractions, or doing exercises that are too easy to build strength.",
          "An assessment helps you feel the right muscles and sets a programme that matches what your pelvic floor needs. Our guide on whether Kegels are right for everyone explains why some women need relaxation work first.",
        ],
      },
      {
        heading: "When to see a doctor",
        paragraphs: [
          "See a doctor promptly for blood in your urine, burning or fever, difficulty emptying your bladder, a new bulge or heaviness in the vagina, or leakage that started suddenly with other neurological symptoms. A new loss of bladder or bowel control with back pain, leg weakness or saddle numbness needs emergency care.",
          "Dr. Zalak Shah (PT) treats bladder leakage in Bengaluru and Ahmedabad and offers online pelvic floor physiotherapy, with Dr. Charmi Shah available for gynaecological review.",
        ],
      },
    ],
    explainerCards: [
      "Why do I leak when I cough?",
      "What is the difference with urge leakage?",
      "Do pelvic floor exercises really work?",
      "When does leakage need a doctor?",
    ],
    scene: {
      pack: "why-do-i-leak-urine-when-i-cough",
      alt: "Woman pausing during exercise with an inset of the bladder and pelvic floor muscles",
      caption:
        "Leakage with coughing or exercise happens when abdominal pressure briefly outpaces bladder outlet support.",
    },
    anatomy: {
      pack: "can-pelvic-floor-therapy-help-with-bladder-leakage",
      alt: "Diagram of the pelvic floor closing around the urethra to prevent leakage",
      caption:
        "Trained pelvic floor muscles lift and close the urethra when pressure in the abdomen rises.",
    },
    explainerAlt:
      "Bladder leakage questions: coughing and leakage, urge leakage, pelvic floor training and when to see a doctor.",
    references: [
      NICE_NG123,
      {
        label: "NHS: Urinary incontinence",
        url: "https://www.nhs.uk/conditions/urinary-incontinence/",
      },
      {
        label: "NIDDK: Kegel exercises",
        url: "https://www.niddk.nih.gov/health-information/urologic-diseases/kegel-exercises",
      },
    ],
    internalLinks: [
      { anchor: "why you leak when you cough", path: "/why-do-i-leak-urine-when-i-cough/" },
      {
        anchor: "leaking urine after childbirth",
        path: "/why-am-i-leaking-urine-after-childbirth/",
      },
      { anchor: "whether Kegels are right for everyone", path: "/are-kegels-right-for-everyone/" },
      { anchor: "pelvic floor therapy", path: "/pelvic-floor-therapy/" },
    ],
    faqs: [
      {
        question: "Is bladder leakage normal after having a baby?",
        answer:
          "It is common, but it is treatable. Pelvic floor training helps most women, and it is worth getting help if leakage continues beyond the early weeks.",
      },
      {
        question: "How long does pelvic floor training take to work?",
        answer:
          "Most programmes run for at least three months. Many women notice change within a few weeks, but strength builds gradually with regular practice.",
      },
      {
        question: "Should I drink less to stop leaking?",
        answer:
          "Usually not. Concentrated urine can irritate the bladder and worsen urgency. Spreading drinks through the day and reducing caffeine often helps more.",
      },
      {
        question: "Can bladder leakage be treated online?",
        answer:
          "Education, bladder diaries and exercise coaching work well by video. An internal examination, when needed, is done in person.",
      },
    ],
    conversionCopy:
      "If you would like an assessment and a pelvic floor plan for bladder leakage, you can book a consultation with Dr. Zalak Shah (PT).",
    parentHubPath: "/pelvic-floor-therapy/",
  }),
  hubArticle({
    id: "HUB-PF-Z",
    slug: "pelvic-floor-therapy",
    lead: "zalak",
    title: "Pelvic Floor Therapy",
    seoTitle: "Pelvic Floor Physiotherapy Explained",
    description: `Pelvic floor physiotherapy with Dr. Zalak Shah (PT): what it can help with, and when an in-person exam is needed. Book via WhatsApp ${CONTACT.phoneE164}.`,
    primaryQuestion: "What is pelvic floor therapy, and who is it for?",
    directAnswer:
      "Pelvic floor therapy is physiotherapy for the layer of muscles at the base of your pelvis that supports the bladder, bowel and uterus, controls continence, and plays a part in sexual function and core stability. These muscles need to contract, hold, and fully relax at the right moments. Therapy helps when they are weak, tense, or poorly coordinated, which can show up as leakage, urgency, heaviness, pelvic pain, pain with sex or constipation. It begins with an assessment, because the right treatment depends on which of those jobs is struggling.",
    sections: [
      {
        heading: "What the pelvic floor does",
        paragraphs: [
          "The pelvic floor stretches like a hammock from the pubic bone to the tailbone. It lifts and closes around the urethra and back passage when you cough or lift, relaxes to let you empty your bladder and bowel, and works with the diaphragm and deep abdominal muscles every time you breathe.",
          "Pregnancy, birth, menopause, chronic straining, high-impact sport, pelvic surgery and long-term stress can all change how these muscles work.",
        ],
      },
      {
        heading: "Weak, tense or uncoordinated",
        paragraphs: [
          "Underactive muscles are linked with stress leakage and prolapse symptoms. Overactive muscles that struggle to relax are linked with pelvic pain, pain with intercourse, difficulty emptying and urgency. Many people have a mix, and symptoms alone do not reliably show which pattern you have.",
          "This is why a generic squeeze routine is a poor first step. Strengthening a pelvic floor that is already tight can make pain or urgency worse.",
        ],
      },
      {
        heading: "What an assessment involves",
        paragraphs: [
          "Your physiotherapist asks about bladder, bowel and sexual symptoms, pregnancies, surgery and activity, then looks at breathing, posture and how you manage pressure. With your consent, an internal examination can show strength, endurance, relaxation and tender areas more precisely. It is optional, and much useful assessment and treatment can happen without it.",
          "NICE guidance on pelvic floor dysfunction supports supervised pelvic floor muscle training for women with symptoms, with programmes tailored to the individual.",
        ],
      },
      {
        heading: "What treatment can include",
        paragraphs: [
          "Depending on findings, plans can include strengthening and endurance training, relaxation and down-training, coordination work such as bracing before a cough, breathing strategies, bladder training and bowel habits, and graded return to exercise. Biofeedback, pessary support and vaginal oestrogen are options a doctor may discuss alongside physiotherapy in some situations.",
          "Most programmes last at least three months, with regular home practice and periodic review.",
        ],
      },
      {
        heading: "When to see a doctor first",
        paragraphs: [
          "See a doctor for unexplained vaginal bleeding, blood in urine, fever with pelvic pain, a visible bulge, or new difficulty passing urine. A new loss of bladder or bowel control with back pain, leg weakness or saddle numbness needs emergency care.",
          "Dr. Zalak Shah (PT) provides pelvic floor therapy in Bengaluru and Ahmedabad and online, and works with Dr. Charmi Shah when a gynaecological review is needed.",
        ],
      },
    ],
    explainerCards: [
      "What does the pelvic floor do?",
      "Can a pelvic floor be too tight?",
      "Is an internal exam required?",
      "When should I see a doctor first?",
    ],
    scene: {
      pack: "are-kegels-right-for-everyone",
      alt: "Woman seated practising pelvic floor awareness with an inset of the pelvic floor",
      caption: "Pelvic floor work includes relaxing the muscles fully as well as squeezing them.",
    },
    anatomy: {
      pack: "are-kegels-right-for-everyone",
      alt: "Three diagrams showing pelvic floor contraction, relaxation and coordination",
      caption:
        "Pelvic floor function depends on contraction, full relaxation and timing, not strength alone.",
    },
    explainerAlt:
      "Pelvic floor therapy questions: what the pelvic floor does, tight muscles, internal exams and when to see a doctor.",
    references: [
      NICE_NG210,
      NICE_NG123,
      {
        label: "NHS: What are pelvic floor exercises?",
        url: "https://www.nhs.uk/common-health-questions/womens-health/what-are-pelvic-floor-exercises/",
      },
    ],
    internalLinks: [
      { anchor: "what the pelvic floor is", path: "/what-is-the-pelvic-floor/" },
      { anchor: "pelvic floor dysfunction", path: "/what-is-pelvic-floor-dysfunction/" },
      {
        anchor: "whether your pelvic floor is weak",
        path: "/how-do-i-know-if-my-pelvic-floor-is-weak/",
      },
      { anchor: "bladder leakage physiotherapy", path: "/bladder-leakage/" },
    ],
    faqs: [
      {
        question: "Who can benefit from pelvic floor therapy?",
        answer:
          "Women with leakage, urgency, heaviness, pelvic pain, pain with sex or constipation, as well as those preparing for or recovering from birth, approaching menopause or returning to high-impact sport.",
      },
      {
        question: "Can pelvic floor muscles be too tight?",
        answer:
          "Yes. Overactive muscles can cause pain, urgency and difficulty emptying. Treatment then focuses on relaxation and coordination rather than more squeezing.",
      },
      {
        question: "Do I need an internal examination?",
        answer:
          "Not always. It is offered with consent when it would change the plan, and many people start therapy without one.",
      },
      {
        question: "Can pelvic floor therapy be done online?",
        answer:
          "Education, coordination work and exercise progression can be done by video. Internal examination and some prolapse checks need an in-person visit.",
      },
    ],
    conversionCopy:
      "If you would like your pelvic floor assessed and a tailored plan, you can book a consultation with Dr. Zalak Shah (PT).",
    parentHubPath: "/womens-health-physiotherapy/",
  }),
];
