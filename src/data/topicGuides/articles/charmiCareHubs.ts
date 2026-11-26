import { CONTACT } from "../../../config/site.defaults";
import { hubArticle } from "./hubFigureHelpers";
import type { CalendarArticleRevision } from "./types";

const PCOS_GUIDELINE = {
  label: "Monash MCHRI: International PCOS/PMOS guideline (2023)",
  url: "https://www.monash.edu/medicine/mchri/pcos/guideline",
};
const PCOS_MJA = {
  label: "Medical Journal of Australia: Summary of the 2023 international PCOS guideline",
  url: "https://www.mja.com.au/journal/2024/221/7/summary-2023-international-evidence-based-guideline-assessment-and-management",
};
const FIGO_AUB = {
  label: "FIGO: Systems for normal and abnormal uterine bleeding (2018 revisions)",
  url: "https://obgyn.onlinelibrary.wiley.com/doi/full/10.1002/ijgo.12666",
};
const NHS_POSTMENOPAUSAL_BLEEDING = {
  label: "NHS: Postmenopausal bleeding",
  url: "https://www.nhs.uk/conditions/post-menopausal-bleeding/",
};
const NHS_ECTOPIC = {
  label: "NHS: Ectopic pregnancy",
  url: "https://www.nhs.uk/conditions/ectopic-pregnancy/",
};

/** Dr. Charmi Shah's gynaecology and fertility hubs, in the calendar-article format. */
export const CHARMI_HUB_ARTICLES: readonly CalendarArticleRevision[] = [
  hubArticle({
    id: "HUB-PCOS-C",
    slug: "pcos",
    lead: "charmi",
    title: "PCOS",
    seoTitle: "PCOS care with Dr. Charmi Shah",
    description: `PCOS education with Dr. Charmi Shah (OB-GYN/IVF): cycles, symptoms, fertility pathways. Book via WhatsApp ${CONTACT.phoneE164}.`,
    primaryQuestion: "What is PCOS, and how is it managed?",
    directAnswer:
      "PCOS, now also called PMOS (polyendocrine metabolic ovarian syndrome), is one of the most common hormonal conditions in women of reproductive age. It usually shows up as some combination of irregular or absent ovulation, signs of higher androgen levels such as acne or extra hair growth, and ovaries with many small follicles on ultrasound. It also affects metabolism, mood and long-term health. There is no single cure, but symptoms can be managed well with lifestyle support and medical treatment matched to your goals, whether that is regular cycles, clearer skin or pregnancy.",
    sections: [
      {
        heading: "How PCOS is diagnosed",
        paragraphs: [
          "The 2023 international guideline uses the Rotterdam approach: a diagnosis needs two of three features (irregular cycles or ovulation problems, clinical or blood-test signs of high androgens, and polycystic ovarian morphology on ultrasound or a raised AMH in adults) once other causes such as thyroid disease and raised prolactin have been excluded.",
          "In adolescents, ultrasound is not used for diagnosis because many small follicles are normal at that age. Despite the old name, you do not need cysts to have PCOS, and having follicles on a scan does not mean you have it.",
        ],
      },
      {
        heading: "Symptoms beyond periods",
        paragraphs: [
          "Irregular or infrequent periods are the best-known sign, but PCOS can also cause acne, excess facial or body hair, scalp hair thinning, weight gain that is hard to shift, darkened skin patches linked to insulin resistance, and difficulty conceiving. Symptoms vary widely; some women have regular periods and still meet the criteria.",
          "The guideline highlights higher rates of anxiety, depression, disordered eating and body-image distress, and recommends routine screening for depression and anxiety. These deserve attention as much as cycles and skin.",
        ],
      },
      {
        heading: "Long-term health",
        paragraphs: [
          "PCOS raises the risk of insulin resistance, type 2 diabetes, high blood pressure and abnormal cholesterol, regardless of body size. Regular checks of glucose, blood pressure and lipids are recommended. Long gaps without a period can thicken the womb lining, so a pattern of very infrequent bleeds should be reviewed.",
          "Our guide on PCOS and insulin resistance explains the metabolic side in more depth.",
        ],
      },
      {
        heading: "Treatment options",
        paragraphs: [
          "Healthy eating, regular movement and good sleep are recommended for everyone with PCOS and can help even without weight loss. There is no single best diet. Medical options depend on your goals: combined hormonal contraception for cycle control and hair or skin symptoms when pregnancy is not the aim, metformin in selected cases, skin and hair treatments, and ovulation induction with medicines such as letrozole when you are trying to conceive.",
          "These are categories, not prescriptions. The right combination is decided with your doctor based on your symptoms, risks and plans.",
        ],
      },
      {
        heading: "When to seek care",
        paragraphs: [
          "Book a review if your cycles are consistently longer than 35 days or you have fewer than eight periods a year, if acne or hair growth is worsening, or if you have been trying to conceive without success. Seek urgent care for very heavy bleeding with dizziness, sudden severe pelvic pain, or pain and bleeding with a positive pregnancy test.",
          "Dr. Charmi Shah (OB-GYN / IVF) sees women with PCOS in Mumbai, Ahmedabad and Valsad and online, from cycle management through to fertility treatment.",
        ],
      },
    ],
    explainerCards: [
      "Do you need cysts to have PCOS?",
      "Does PCOS affect more than periods?",
      "Is there a cure for PCOS?",
      "When should PCOS be reviewed?",
    ],
    scene: {
      pack: "symptoms-of-pcos",
      alt: "Woman looking in a mirror and reflecting on skin changes, with an ovary inset",
      caption:
        "PCOS can affect skin, hair, cycles and metabolism, and symptoms vary widely between women.",
    },
    anatomy: {
      pack: "what-is-pcos",
      alt: "Diagram of ovaries with multiple small follicles around the edge",
      caption:
        "Many small follicles on the ovaries are one of three diagnostic features; not everyone with PCOS has them.",
    },
    explainerAlt:
      "PCOS questions: whether cysts are needed, symptoms beyond periods, treatment and when to seek review.",
    references: [
      PCOS_GUIDELINE,
      PCOS_MJA,
      {
        label: "ASRM: PCOS is now PMOS: understanding the name change (27 May 2026)",
        url: "https://www.asrm.org/news-and-events/asrm-news/latest-news/may-27-2026-pcos-is-now-pmos-understanding-the-name-change/",
      },
    ],
    internalLinks: [
      { anchor: "what PCOS is", path: "/what-is-pcos/" },
      { anchor: "PCOS symptoms", path: "/symptoms-of-pcos/" },
      { anchor: "PCOS and insulin resistance", path: "/pcos-insulin-resistance/" },
      { anchor: "getting pregnant with PCOS", path: "/can-i-get-pregnant-with-pcos/" },
    ],
    faqs: [
      {
        question: "Can I have PCOS with regular periods?",
        answer:
          "Yes. If you have signs of high androgens and polycystic ovaries on ultrasound, you can meet the criteria even with regular cycles.",
      },
      {
        question: "Can I get pregnant with PCOS?",
        answer:
          "Many women with PCOS conceive, naturally or with help. When ovulation is irregular, ovulation induction with medicines such as letrozole is often the first treatment.",
      },
      {
        question: "Is there a PCOS diet?",
        answer:
          "There is no single best diet. Sustainable healthy eating, regular movement and good sleep help, and benefits are seen even without weight loss.",
      },
      {
        question: "Why is PCOS now called PMOS?",
        answer:
          "The new name, polyendocrine metabolic ovarian syndrome, reflects that the condition affects hormones and metabolism, not just the ovaries, and that cysts are not required.",
      },
    ],
    conversionCopy:
      "If you would like a PCOS plan that fits your goals, from cycle control to fertility, you can book a consultation with Dr. Charmi Shah.",
    parentHubPath: "/dr-charmi-shah/",
  }),
  hubArticle({
    id: "HUB-IRREG-C",
    slug: "irregular-periods",
    lead: "charmi",
    title: "Irregular Periods",
    seoTitle: "Irregular periods: Dr. Charmi Shah",
    description: `Irregular periods explained with Dr. Charmi Shah (OB-GYN): causes, when to test, telehealth vs urgent care. Book via WhatsApp ${CONTACT.phoneE164}.`,
    primaryQuestion: "What makes periods irregular, and when should you get checked?",
    directAnswer:
      "A typical cycle lasts between 24 and 38 days, and it is normal for its length to vary by a few days from month to month. Periods are considered irregular when the gap between them keeps changing by more than about a week, when cycles are consistently shorter than 24 or longer than 38 days, or when periods stop. Common causes include pregnancy, stress, weight change, intense exercise, thyroid problems, PCOS, breastfeeding, hormonal contraception and the run-up to menopause. A pregnancy test and a simple cycle diary are the best first steps.",
    sections: [
      {
        heading: "What counts as irregular",
        paragraphs: [
          "Count a cycle from the first day of one period to the first day of the next. FIGO defines normal frequency as 24 to 38 days, with the difference between your shortest and longest cycles under about 7 to 9 days depending on age. Bleeding for more than eight days, bleeding between periods, or bleeding after sex are also outside the normal pattern.",
          "Cycles are often irregular in the first few years after periods start and in the years before menopause. A single unusual cycle after illness, travel or stress is common and often settles.",
        ],
      },
      {
        heading: "Common causes",
        paragraphs: [
          "Pregnancy is the first thing to rule out. After that, frequent causes include PCOS, thyroid disease, raised prolactin, significant weight loss or gain, very intense training or under-eating, stress, breastfeeding, starting or stopping hormonal contraception, and perimenopause. More than one cause can overlap.",
          "Irregular cycles often mean ovulation is not happening every month, which matters if you are trying to conceive and, over time, for the health of the womb lining.",
        ],
      },
      {
        heading: "How irregular periods are investigated",
        paragraphs: [
          "Your doctor will ask about your cycle pattern, weight changes, exercise, stress, medicines, hair and skin changes, and pregnancy plans. Blood tests may include a pregnancy test, thyroid function, prolactin and hormones linked with PCOS or ovarian function, timed to your cycle where relevant. A pelvic ultrasound may be suggested.",
          "Bring a record of your period dates for the last few months. It often answers more questions than any single test.",
        ],
      },
      {
        heading: "Treatment depends on the cause",
        paragraphs: [
          "Treatment targets the underlying reason: thyroid treatment, support with nutrition and training load, managing PCOS, or treating raised prolactin. When regular bleeding is needed to protect the womb lining, hormonal options can be discussed. If pregnancy is the goal, ovulation can be supported with medicines.",
          "Our guide on why periods become irregular goes through each cause in more detail.",
        ],
      },
      {
        heading: "When to seek care",
        paragraphs: [
          "Book a review if your periods stop for three months or more (and you are not pregnant), if cycles are regularly shorter than 24 or longer than 38 days, if you bleed between periods or after sex, or if you are trying to conceive. Seek urgent care for very heavy bleeding with dizziness, severe pelvic pain, or pain and bleeding with a positive pregnancy test. Bleeding after menopause always needs prompt assessment.",
          "Dr. Charmi Shah (OB-GYN) assesses irregular periods in Mumbai, Ahmedabad and Valsad and online.",
        ],
      },
    ],
    explainerCards: [
      "How long is a normal cycle?",
      "What makes periods irregular?",
      "Which tests check irregular periods?",
      "When do irregular periods need review?",
    ],
    scene: {
      pack: "why-are-my-periods-irregular",
      alt: "Woman reviewing an uneven period calendar with an inset of the womb and ovaries",
      caption:
        "A record of period dates over a few months is the most useful starting point for an assessment.",
    },
    anatomy: {
      pack: "late-period-negative-pregnancy-test",
      alt: "Cycle diagram showing late ovulation delaying a period",
      caption:
        "When ovulation happens later than usual, or not at all, the next period is delayed.",
    },
    explainerAlt:
      "Irregular periods questions: normal cycle length, causes, tests and when to seek review.",
    references: [
      FIGO_AUB,
      { label: "NHS: Irregular periods", url: "https://www.nhs.uk/conditions/irregular-periods/" },
      {
        label: "NHS: Missed or late periods",
        url: "https://www.nhs.uk/conditions/stopped-or-missed-periods/",
      },
    ],
    internalLinks: [
      { anchor: "why periods become irregular", path: "/why-are-my-periods-irregular/" },
      {
        anchor: "a late period with a negative test",
        path: "/late-period-negative-pregnancy-test/",
      },
      { anchor: "PCOS", path: "/pcos/" },
      { anchor: "perimenopause symptoms", path: "/perimenopause-symptoms/" },
    ],
    faqs: [
      {
        question: "Can stress make my periods irregular?",
        answer:
          "Yes, stress can delay ovulation and shift your period. If irregularity persists or comes with other symptoms, other causes should still be checked.",
      },
      {
        question: "Are irregular periods a sign of infertility?",
        answer:
          "Not necessarily, but they can mean ovulation is less regular, which can make conceiving take longer. A fertility-focused review can help if you are trying.",
      },
      {
        question: "Is it normal for periods to be irregular at 40?",
        answer:
          "Cycle changes are common in perimenopause, often from the early to mid-40s. New heavy bleeding or bleeding between periods should still be checked.",
      },
      {
        question: "What should I track before my appointment?",
        answer:
          "Period start dates, how many days you bleed, how heavy it is, any spotting or pain, and pregnancy test results.",
      },
    ],
    conversionCopy:
      "If your cycles have changed and you would like them assessed, you can book a consultation with Dr. Charmi Shah.",
    parentHubPath: "/dr-charmi-shah/",
  }),
  hubArticle({
    id: "HUB-PAIN-C",
    slug: "painful-periods",
    lead: "charmi",
    title: "Painful Periods",
    seoTitle: "Painful periods: Dr. Charmi Shah",
    description: `Painful periods and dysmenorrhea with Dr. Charmi Shah (OB-GYN): when pain is not “normal”. Book via WhatsApp ${CONTACT.phoneE164}.`,
    primaryQuestion: "When is period pain normal, and when is it a sign of something more?",
    directAnswer:
      "Mild cramps in the first day or two of a period are common and are caused by prostaglandins making the womb muscle contract. Pain that stops you going to work or school, does not respond to regular pain relief, gets worse over the years, lasts beyond the bleeding days, or comes with pain during sex, bowel or bladder symptoms is not something you should simply accept. It can point to conditions such as endometriosis, adenomyosis or fibroids, which are diagnosable and treatable.",
    sections: [
      {
        heading: "Primary and secondary period pain",
        paragraphs: [
          "Primary dysmenorrhoea is period pain without an underlying condition. It usually starts within a few years of periods beginning and is felt as cramping low in the abdomen, sometimes spreading to the back and thighs, often easing after the first couple of days.",
          "Secondary dysmenorrhoea is pain caused by a condition in the pelvis. It often starts later, worsens over time, and may come with heavy bleeding, pain between periods, painful sex or fertility problems.",
        ],
      },
      {
        heading: "Conditions that can cause severe pain",
        paragraphs: [
          "Endometriosis is tissue similar to the womb lining growing outside the womb, often around the ovaries and pelvic lining. Adenomyosis is similar tissue within the womb muscle, often linked with heavy, painful periods. Fibroids, pelvic infection and, less commonly, other conditions can also cause pain.",
          "NICE notes that a normal ultrasound does not rule out endometriosis. If symptoms strongly suggest it, further assessment or specialist referral is reasonable even when scans look normal.",
        ],
      },
      {
        heading: "What helps day to day",
        paragraphs: [
          "Anti-inflammatory pain relief such as ibuprofen or mefenamic acid works best when started at the first sign of pain and taken regularly for the first days, if it is safe for you. Heat, gentle movement and rest also help. Hormonal options, including the combined pill and the hormonal coil, can reduce pain for many women.",
          "If these do not help after a few months, or pain is changing, it is time for a medical review rather than stronger painkillers alone.",
        ],
      },
      {
        heading: "How severe pain is assessed",
        paragraphs: [
          "Your doctor will ask when pain occurs, how it affects daily life, about bleeding, sex, bowel and bladder symptoms, and fertility plans. A pelvic examination and ultrasound are common first steps. Laparoscopy can confirm and treat endometriosis when it is needed.",
          "A pain and bleeding diary over two or three cycles makes the conversation more productive. Our guide to endometriosis symptoms covers this condition in depth.",
        ],
      },
      {
        heading: "When to seek urgent care",
        paragraphs: [
          "Seek urgent care for sudden severe pelvic pain, pain with fever or unusual discharge, fainting, or pain and bleeding with a positive pregnancy test. These need same-day assessment.",
          "Dr. Charmi Shah (OB-GYN / laparoscopic surgeon) assesses and treats period pain and endometriosis in Mumbai, Ahmedabad and Valsad and online.",
        ],
      },
    ],
    explainerCards: [
      "Is severe period pain normal?",
      "Could my period pain be endometriosis?",
      "Which pain relief works best?",
      "When is pelvic pain an emergency?",
    ],
    scene: {
      pack: "why-are-my-periods-painful",
      alt: "Woman resting with a hot water bottle during period pain, with a womb inset",
      caption:
        "Pain that stops you doing usual activities deserves an assessment, not just stronger painkillers.",
    },
    anatomy: {
      pack: "endometriosis-symptoms-diagnosis",
      alt: "Diagram of endometriosis patches on the ovaries and pelvic lining",
      caption:
        "Endometriosis is tissue similar to the womb lining growing outside the womb; a normal scan does not rule it out.",
    },
    explainerAlt:
      "Painful periods questions: what is normal, endometriosis, pain relief and urgent signs.",
    references: [
      { label: "NHS: Period pain", url: "https://www.nhs.uk/conditions/period-pain/" },
      {
        label: "ACOG: Dysmenorrhea: painful periods",
        url: "https://www.acog.org/womens-health/faqs/dysmenorrhea-painful-periods",
      },
      {
        label: "NICE NG73: Endometriosis: diagnosis and management",
        url: "https://www.nice.org.uk/guidance/ng73/chapter/Recommendations",
      },
    ],
    internalLinks: [
      { anchor: "why periods are painful", path: "/why-are-my-periods-painful/" },
      { anchor: "endometriosis symptoms", path: "/endometriosis-symptoms-diagnosis/" },
      { anchor: "heavy periods", path: "/heavy-periods/" },
      { anchor: "pelvic pain in women", path: "/pelvic-pain-in-women/" },
    ],
    faqs: [
      {
        question: "How do I know if my period pain is too much?",
        answer:
          "If it stops you working, studying or sleeping, does not ease with regular pain relief, or is getting worse over time, it is worth a medical review.",
      },
      {
        question: "Can a scan rule out endometriosis?",
        answer:
          "No. Ultrasound can show some endometriosis, such as cysts on the ovaries, but a normal scan does not exclude it.",
      },
      {
        question: "Does the pill help period pain?",
        answer:
          "Hormonal contraception, including the combined pill and the hormonal coil, reduces period pain for many women. Your doctor can help choose an option that suits you.",
      },
      {
        question: "Will painful periods affect my fertility?",
        answer:
          "Primary period pain does not. Conditions such as endometriosis can affect fertility, which is one reason worsening pain should be assessed.",
      },
    ],
    conversionCopy:
      "If period pain is affecting your life and you would like it properly assessed, you can book a consultation with Dr. Charmi Shah.",
    parentHubPath: "/dr-charmi-shah/",
  }),
  hubArticle({
    id: "HUB-HEAVY-C",
    slug: "heavy-periods",
    lead: "charmi",
    title: "Heavy Periods",
    seoTitle: "Heavy periods: Dr. Charmi Shah",
    description: `Heavy periods and menorrhagia with Dr. Charmi Shah (OB-GYN): when flow is too much, anemia signs. Book via WhatsApp ${CONTACT.phoneE164}.`,
    primaryQuestion: "How do you know if your periods are too heavy, and what can be done?",
    directAnswer:
      "Periods are considered heavy when the bleeding affects your daily life. Signs include changing a pad or tampon every one to two hours, needing two products at once, bleeding through clothes or bedding, passing clots larger than about 2.5 cm, or bleeding for more than seven days. Heavy periods can cause iron-deficiency anaemia, leaving you tired and breathless. Many women have no identifiable cause, while others have fibroids, adenomyosis, polyps, a bleeding disorder or a hormonal imbalance. Effective treatments exist, so heavy bleeding is worth discussing rather than tolerating.",
    sections: [
      {
        heading: "Signs your periods are heavy",
        paragraphs: [
          "NICE defines heavy menstrual bleeding by its effect on your physical, social, emotional or material quality of life rather than by measuring blood loss. Practical clues include planning your day around toilet access, waking at night to change protection, avoiding activities during your period, and feeling exhausted afterwards.",
          "A sudden change from your usual pattern also matters, even if your periods would not have seemed heavy to someone else.",
        ],
      },
      {
        heading: "Common causes",
        paragraphs: [
          "Fibroids (non-cancerous growths in the womb muscle), adenomyosis, polyps in the womb lining, irregular ovulation (for example in PCOS or perimenopause), thyroid problems, bleeding disorders and some medicines such as blood thinners can all increase bleeding. Rarely, abnormal cells in the womb lining are the cause, particularly with risk factors or bleeding between periods.",
          "Often no structural cause is found, and treatment can still be very effective.",
        ],
      },
      {
        heading: "Anaemia and how it feels",
        paragraphs: [
          "Losing more iron than you replace leads to iron-deficiency anaemia. Tiredness, breathlessness on stairs, a racing heart, headaches, pale skin and feeling cold can all follow. A full blood count is recommended for women with heavy periods, and iron treatment is often needed alongside treating the bleeding.",
        ],
      },
      {
        heading: "How heavy periods are assessed and treated",
        paragraphs: [
          "Assessment includes your bleeding history, a blood count, and an examination and pelvic ultrasound when a structural cause is suspected. NICE recommends the hormonal coil (levonorgestrel intrauterine system) as a first-line option for many women when no major structural cause is found. Non-hormonal tablets such as tranexamic acid taken during the period, anti-inflammatory medicines, and hormonal tablets are other options.",
          "Fibroids and polyps may be treated with medicines or procedures, and surgery is considered when other options do not suit. Our guide on what causes heavy periods covers each cause in more detail.",
        ],
      },
      {
        heading: "When to seek urgent care",
        paragraphs: [
          "Seek urgent care if you are soaking through protection every hour for several hours, feel faint or dizzy, have chest pain or severe breathlessness, or are bleeding heavily with a positive pregnancy test. Bleeding after menopause always needs prompt assessment.",
          "Dr. Charmi Shah (OB-GYN) assesses and treats heavy periods in Mumbai, Ahmedabad and Valsad and online.",
        ],
      },
    ],
    explainerCards: [
      "How heavy is too heavy?",
      "What causes heavy periods?",
      "Can heavy periods cause anaemia?",
      "When is heavy bleeding an emergency?",
    ],
    scene: {
      pack: "what-causes-heavy-periods",
      alt: "Tired woman at work with an inset of a thickened womb lining",
      caption:
        "Heavy periods are defined by their effect on daily life, and can leave you tired from low iron.",
    },
    anatomy: {
      pack: "what-causes-heavy-periods",
      alt: "Diagram comparing normal and thickened womb lining with a small fibroid",
      caption:
        "A thickened lining, fibroids or polyps can increase bleeding, though often no structural cause is found.",
    },
    explainerAlt:
      "Heavy periods questions: how heavy is too heavy, causes, anaemia and urgent signs.",
    references: [
      { label: "NHS: Heavy periods", url: "https://www.nhs.uk/conditions/heavy-periods/" },
      {
        label: "NICE NG88: Heavy menstrual bleeding: assessment and management",
        url: "https://www.nice.org.uk/guidance/ng88/chapter/Recommendations",
      },
      FIGO_AUB,
    ],
    internalLinks: [
      { anchor: "what causes heavy periods", path: "/what-causes-heavy-periods/" },
      { anchor: "painful periods", path: "/painful-periods/" },
      { anchor: "irregular periods", path: "/irregular-periods/" },
      { anchor: "symptoms you should not ignore", path: "/symptoms-women-should-never-ignore/" },
    ],
    faqs: [
      {
        question: "Are blood clots during a period normal?",
        answer:
          "Small clots can be normal. Regularly passing clots larger than about 2.5 cm is a sign of heavy bleeding worth discussing with a doctor.",
      },
      {
        question: "Do heavy periods mean I have fibroids?",
        answer:
          "Not necessarily. Fibroids are one common cause, but many women with heavy periods have no structural cause.",
      },
      {
        question: "What is the most effective treatment for heavy periods?",
        answer:
          "For many women without a major structural cause, the hormonal coil is the most effective first option. Tranexamic acid and other medicines are alternatives.",
      },
      {
        question: "Should my iron be checked?",
        answer:
          "Yes. A blood count is recommended for women with heavy periods, and iron treatment is often needed.",
      },
    ],
    conversionCopy:
      "If heavy periods are wearing you down, you can book a consultation with Dr. Charmi Shah to discuss tests and treatment.",
    parentHubPath: "/dr-charmi-shah/",
  }),
  hubArticle({
    id: "HUB-HORM-C",
    slug: "hormonal-imbalance",
    lead: "charmi",
    title: "Hormonal Imbalance",
    seoTitle: "Hormonal imbalance: Dr. Charmi",
    description: `Hormonal imbalance education with Dr. Charmi Shah (OB-GYN): cycles, thyroid, perimenopause context. Book via WhatsApp ${CONTACT.phoneE164}.`,
    primaryQuestion: "What does hormonal imbalance mean, and how is it checked?",
    directAnswer:
      "Hormonal imbalance is a phrase people use for many different problems, not a diagnosis in itself. Changes in your cycle, skin, hair, weight, mood, sleep or temperature can come from conditions such as PCOS, thyroid disease, raised prolactin, perimenopause or the effects of stress and medicines. The useful question is which hormone system is involved and why. A doctor works that out from your symptoms, history and a few targeted tests, rather than a large hormone panel or a supplement promising to balance everything.",
    sections: [
      {
        heading: "Symptoms people describe",
        paragraphs: [
          "Common reasons women ask about hormones include irregular or missed periods, heavy or painful periods, acne or extra hair growth, hair thinning, unexplained weight change, tiredness, low mood or anxiety around the cycle, hot flushes and night sweats, low libido, and milky discharge from the nipples.",
          "Each of these has several possible causes, and some are not hormonal at all. Noting when symptoms started, whether they follow your cycle, and what else changed at the time helps narrow things down.",
        ],
      },
      {
        heading: "Conditions behind the label",
        paragraphs: [
          "PCOS affects ovulation, androgens and metabolism. An underactive or overactive thyroid can change cycles, energy, weight and mood. Raised prolactin, from medicines or a small pituitary growth, can stop periods. Perimenopause brings fluctuating oestrogen, cycle changes and hot flushes, often from the early to mid-40s. Premenstrual disorders such as PMS and PMDD are linked to sensitivity to normal hormone changes rather than abnormal levels.",
          "Stress, under-eating, intense training and some medicines can also disrupt cycles.",
        ],
      },
      {
        heading: "Which tests make sense",
        paragraphs: [
          "Tests are chosen from your story. They may include a pregnancy test, thyroid function, prolactin, androgen levels, and markers of ovarian function, with some timed to a particular day of your cycle. Glucose and cholesterol checks are relevant in PCOS.",
          "In women over 45 with typical symptoms, NICE advises that perimenopause and menopause can usually be diagnosed from symptoms without hormone blood tests. Large direct-to-consumer hormone panels often produce numbers that are hard to interpret without context.",
        ],
      },
      {
        heading: "Treatment and self-care",
        paragraphs: [
          "Treatment depends on the cause: thyroid medicine, managing PCOS, adjusting medicines that raise prolactin, or HRT and other options for menopause symptoms. Sleep, regular meals, movement and stress management support hormone health generally, but no supplement has been shown to fix hormone problems across the board.",
          "Our guide on what hormonal imbalance means explains how symptoms map to different conditions.",
        ],
      },
      {
        heading: "When to seek urgent care",
        paragraphs: [
          "Seek urgent care for very heavy bleeding with dizziness, severe headache with vision changes, chest pain, or sudden weakness or confusion. Bleeding after menopause needs prompt assessment.",
          "Dr. Charmi Shah (OB-GYN) assesses cycle and hormone-related symptoms in Mumbai, Ahmedabad and Valsad and online.",
        ],
      },
    ],
    explainerCards: [
      "Is hormonal imbalance a diagnosis?",
      "Which conditions cause hormone symptoms?",
      "Do I need a full hormone panel?",
      "Can supplements balance hormones?",
    ],
    scene: {
      pack: "perimenopause-symptoms",
      alt: "Woman in her forties experiencing a hot flush at her desk",
      caption:
        "Hot flushes, cycle changes and sleep problems can come from perimenopause, thyroid disease or other causes.",
    },
    anatomy: {
      pack: "what-is-hormonal-imbalance",
      alt: "Three separate icons for thyroid, ovaries and brain",
      caption:
        "Thyroid disease, ovarian cycle changes and menopause can feel similar and still need different assessments.",
    },
    explainerAlt:
      "Hormonal imbalance questions: what the term means, conditions behind it, tests and supplements.",
    references: [
      { label: "NHS: Irregular periods", url: "https://www.nhs.uk/conditions/irregular-periods/" },
      {
        label: "NICE NG23: Menopause: identification and management",
        url: "https://www.nice.org.uk/guidance/ng23/chapter/Recommendations",
      },
      PCOS_GUIDELINE,
    ],
    internalLinks: [
      { anchor: "what hormonal imbalance means", path: "/what-is-hormonal-imbalance/" },
      { anchor: "perimenopause symptoms", path: "/perimenopause-symptoms/" },
      { anchor: "PCOS", path: "/pcos/" },
      { anchor: "PMS", path: "/what-is-pms/" },
    ],
    faqs: [
      {
        question: "What are the signs of hormonal imbalance in women?",
        answer:
          "Cycle changes, acne or extra hair growth, hair thinning, weight change, tiredness, mood changes, hot flushes and low libido are common. Each has several possible causes, so assessment matters.",
      },
      {
        question: "Can a blood test show hormonal imbalance?",
        answer:
          "Targeted tests can confirm conditions such as thyroid disease, raised prolactin or PCOS. A large untargeted panel is rarely helpful on its own.",
      },
      {
        question: "Do I need hormone tests to diagnose perimenopause?",
        answer:
          "Usually not if you are over 45 with typical symptoms. Tests may be used in younger women or when the picture is unclear.",
      },
      {
        question: "Can diet fix hormonal imbalance?",
        answer:
          "Good nutrition, sleep and activity support overall health, but specific conditions usually need specific treatment.",
      },
    ],
    conversionCopy:
      "If you would like your symptoms linked to a clear cause and plan, you can book a consultation with Dr. Charmi Shah.",
    parentHubPath: "/dr-charmi-shah/",
  }),
  hubArticle({
    id: "HUB-FERT-C",
    slug: "fertility",
    lead: "charmi",
    title: "Fertility",
    seoTitle: "Fertility care with Dr. Charmi Shah",
    description: `Fertility and IVF-oriented consults with Dr. Charmi Shah: timing, workup, IUI/IVF orientation. Book via WhatsApp ${CONTACT.phoneE164}.`,
    primaryQuestion: "When should you seek fertility help, and what does it involve?",
    directAnswer:
      "Most couples conceive within a year of regular unprotected sex, and about half of the rest do so in the second year. Seeking help is recommended after 12 months of trying if you are under 35, after 6 months if you are 35 or older, and sooner if you have irregular periods, known endometriosis, previous pelvic surgery or infection, or a known sperm problem. A fertility assessment looks at both partners: ovulation, the fallopian tubes and womb, and a semen analysis. Treatment ranges from timing advice and ovulation medicines to IUI and IVF, depending on the findings.",
    sections: [
      {
        heading: "How long to try before getting help",
        paragraphs: [
          "Age is the strongest single factor in female fertility, which is why the recommended waiting time shortens from 35. Regular sex every two to three days through the cycle gives a good chance of conceiving without needing to pinpoint ovulation exactly.",
          "Some situations justify earlier assessment regardless of age: very irregular or absent periods, severe period pain, a history of endometriosis, pelvic infection or surgery, previous cancer treatment, or a partner with known sperm problems.",
        ],
      },
      {
        heading: "What a first fertility assessment includes",
        paragraphs: [
          "For the woman, tests usually confirm whether ovulation is happening, check ovarian reserve (often with AMH and an ultrasound follicle count), look at the womb and ovaries on ultrasound, and assess whether the fallopian tubes are open. For the man, a semen analysis is a basic and essential test, since male factors contribute in a large share of couples.",
          "AMH helps plan treatment but does not predict whether you will conceive naturally. Our guide on first fertility appointment tests explains each test.",
        ],
      },
      {
        heading: "Treatment options",
        paragraphs: [
          "When ovulation is irregular, medicines such as letrozole can induce ovulation. IUI places prepared sperm in the womb around ovulation and suits some cases of unexplained infertility or mild sperm problems. IVF fertilises eggs in a laboratory and is used for blocked tubes, more significant sperm problems, endometriosis, reduced ovarian reserve, or when other treatments have not worked.",
          "Success rates depend heavily on age and cause. A good clinic explains your personal chances rather than quoting a headline figure.",
        ],
      },
      {
        heading: "Lifestyle and preparation",
        paragraphs: [
          "Taking folic acid, stopping smoking, limiting alcohol, keeping a healthy weight and managing conditions such as thyroid disease or diabetes improve both fertility and pregnancy health. Stress makes trying harder but is rarely the only reason conception is delayed.",
          "Our guide on how to improve fertility covers practical steps for both partners.",
        ],
      },
      {
        heading: "When to seek urgent care",
        paragraphs: [
          "During fertility treatment or early pregnancy, seek urgent care for severe one-sided pelvic pain, shoulder-tip pain, fainting, heavy bleeding, or a rapidly swelling abdomen with breathlessness after IVF stimulation.",
          "Dr. Charmi Shah (OB-GYN / IVF specialist) provides fertility assessment and treatment in Mumbai, Ahmedabad and Valsad, with online consultations for planning and second opinions.",
        ],
      },
    ],
    explainerCards: [
      "How long should we try first?",
      "What does a fertility workup check?",
      "IUI or IVF: which comes first?",
      "Does stress cause infertility?",
    ],
    scene: {
      pack: "when-to-see-a-fertility-specialist",
      alt: "Couple reviewing a calendar while trying to conceive",
      caption:
        "Age, cycle pattern and medical history shape how long to try before a fertility assessment.",
    },
    anatomy: {
      pack: "first-fertility-appointment-tests",
      alt: "Diagram of common first fertility tests: blood tests, ultrasound and semen analysis",
      caption:
        "Initial tests usually cover ovulation, ovarian reserve, the womb and tubes, and a semen analysis.",
    },
    explainerAlt:
      "Fertility questions: how long to try, what a workup checks, IUI versus IVF and stress.",
    references: [
      { label: "NHS: Infertility", url: "https://www.nhs.uk/conditions/infertility/" },
      {
        label: "NICE NG257: Fertility problems: investigation and management",
        url: "https://www.nice.org.uk/guidance/NG257/chapter/investigation-of-fertility-problems-and-management-strategies",
      },
      {
        label: "ASRM: Fertility evaluation of infertile women (2026)",
        url: "https://www.asrm.org/practice-guidance/practice-committee-documents/fertility-evaluation-of-infertile-women-a-committee-opinion-2026",
      },
    ],
    internalLinks: [
      {
        anchor: "when to see a fertility specialist",
        path: "/when-to-see-a-fertility-specialist/",
      },
      { anchor: "first fertility appointment tests", path: "/first-fertility-appointment-tests/" },
      { anchor: "IUI versus IVF", path: "/iui-vs-ivf/" },
      { anchor: "how to improve fertility", path: "/how-to-improve-fertility/" },
    ],
    faqs: [
      {
        question: "Should both partners be tested?",
        answer:
          "Yes. A semen analysis is a basic test, and male factors contribute in a large share of couples having difficulty conceiving.",
      },
      {
        question: "Does a low AMH mean I cannot get pregnant?",
        answer:
          "No. AMH reflects egg quantity and helps plan treatment, but it does not predict natural conception on its own.",
      },
      {
        question: "Do we have to start with IVF?",
        answer:
          "Not usually. Treatment depends on the cause; many couples start with ovulation medicines or IUI, while IVF is first-line for some conditions.",
      },
      {
        question: "Can stress stop me getting pregnant?",
        answer:
          "Stress can affect cycles and make trying harder, but it is rarely the sole cause. Medical causes should still be assessed.",
      },
    ],
    conversionCopy:
      "If you have been trying to conceive and want a clear next step, you can book a consultation with Dr. Charmi Shah.",
    parentHubPath: "/dr-charmi-shah/",
  }),
  hubArticle({
    id: "HUB-PREPLAN-C",
    slug: "pregnancy-planning",
    lead: "charmi",
    title: "Pregnancy Planning",
    seoTitle: "Pregnancy planning: Dr. Charmi Shah",
    description: `Preconception and pregnancy planning with Dr. Charmi Shah: folic acid, timing, health review. Book via WhatsApp ${CONTACT.phoneE164}.`,
    primaryQuestion: "How should you prepare for pregnancy?",
    directAnswer:
      "Preparing for pregnancy gives you the chance to fix things that are easier to address before conception than during it. The key steps are starting folic acid at least a month before trying, reviewing any regular medicines with a doctor, getting long-term conditions such as thyroid disease, diabetes or high blood pressure well controlled, checking vaccinations, and looking at smoking, alcohol and weight. A preconception visit is also a good time to talk about cycle tracking, previous pregnancies, and when to seek fertility help if conception takes longer than expected.",
    sections: [
      {
        heading: "Folic acid and supplements",
        paragraphs: [
          "Folic acid reduces the risk of neural tube defects such as spina bifida. The WHO recommends starting it before conception and continuing through the first trimester. The usual dose is 400 micrograms a day; a higher dose is advised for some women, for example those with diabetes, a previous pregnancy affected by a neural tube defect, or taking certain epilepsy medicines.",
          "Our guide on folic acid before pregnancy covers timing and who needs the higher dose.",
        ],
      },
      {
        heading: "Medicines and long-term conditions",
        paragraphs: [
          "Some medicines need changing before pregnancy, while others should not be stopped suddenly. Review prescriptions, over-the-counter medicines and supplements with your doctor. Conditions such as thyroid disease, diabetes, high blood pressure, epilepsy and PCOS benefit from good control before conception, which lowers risks for you and the baby.",
        ],
      },
      {
        heading: "Vaccinations, screening and lifestyle",
        paragraphs: [
          "Check immunity to rubella and chickenpox, since these vaccines cannot be given during pregnancy. Make sure cervical screening is up to date. Stopping smoking, avoiding alcohol when trying, limiting caffeine, and aiming for a healthy weight all improve fertility and pregnancy outcomes.",
          "Partners matter too: smoking, alcohol and some medicines can affect sperm.",
        ],
      },
      {
        heading: "Timing and tracking ovulation",
        paragraphs: [
          "Sex every two to three days through the cycle gives a good chance of conceiving. If cycles are regular, ovulation usually happens about 14 days before the next period. Ovulation kits and cycle tracking can help, especially with irregular cycles, but are not essential.",
          "Seek fertility advice after 12 months of trying if you are under 35, after 6 months from 35, or sooner if your periods are very irregular or you have a known condition affecting fertility.",
        ],
      },
      {
        heading: "When to seek urgent care",
        paragraphs: [
          "Once you have a positive test, seek urgent care for severe one-sided pelvic pain, shoulder-tip pain, fainting or heavy bleeding, which can be signs of an ectopic pregnancy or miscarriage.",
          "Dr. Charmi Shah (OB-GYN) offers preconception consultations in Mumbai, Ahmedabad and Valsad and online, and continues care into pregnancy and fertility treatment when needed.",
        ],
      },
    ],
    explainerCards: [
      "When should I start folic acid?",
      "Should I review my medicines?",
      "Which vaccines before pregnancy?",
      "How long before seeking fertility help?",
    ],
    scene: {
      pack: "what-is-preconception-planning",
      alt: "Couple planning pregnancy together at a kitchen table",
      caption:
        "Preconception planning reviews folic acid, medicines, vaccines and health conditions before trying.",
    },
    anatomy: {
      pack: "folic-acid-before-pregnancy",
      alt: "Diagram of an early embryo with the developing neural tube",
      caption:
        "The neural tube forms in the first weeks of pregnancy, often before a missed period, which is why folic acid starts early.",
    },
    explainerAlt:
      "Pregnancy planning questions: folic acid, medicines, vaccines and when to seek fertility help.",
    references: [
      {
        label: "NHS: Planning your pregnancy",
        url: "https://www.nhs.uk/pregnancy/trying-for-a-baby/planning-your-pregnancy/",
      },
      {
        label: "WHO eLENA: Periconceptional folic acid supplementation",
        url: "https://www.who.int/tools/elena/interventions/folate-periconceptional",
      },
      {
        label: "NHS: Pregnancy vitamins and supplements",
        url: "https://www.nhs.uk/pregnancy/keeping-well/pregnancy-vitamins-and-supplements/",
      },
    ],
    internalLinks: [
      { anchor: "preconception planning", path: "/what-is-preconception-planning/" },
      { anchor: "folic acid before pregnancy", path: "/folic-acid-before-pregnancy/" },
      { anchor: "tracking ovulation", path: "/how-to-track-ovulation/" },
      { anchor: "fertility", path: "/fertility/" },
    ],
    faqs: [
      {
        question: "How long before pregnancy should I take folic acid?",
        answer:
          "Ideally at least one month before trying, continuing until 12 weeks of pregnancy. Some women need a higher dose; ask your doctor.",
      },
      {
        question: "Should I see a doctor before trying to conceive?",
        answer:
          "It is a good idea, especially if you take regular medicines, have a long-term condition, or have had previous pregnancy complications.",
      },
      {
        question: "How long does it usually take to get pregnant?",
        answer:
          "Most couples conceive within a year of regular unprotected sex. Age and health conditions affect this.",
      },
      {
        question: "Does my partner need to prepare too?",
        answer:
          "Yes. Stopping smoking, limiting alcohol and reviewing medicines can improve sperm health.",
      },
    ],
    conversionCopy:
      "If you would like a preconception check before trying, you can book a consultation with Dr. Charmi Shah.",
    parentHubPath: "/fertility/",
  }),
  hubArticle({
    id: "HUB-ONLINE-GYN-C",
    slug: "online-gynecologist",
    lead: "charmi",
    title: "Online Gynecologist",
    seoTitle: "Online gynecologist: Dr. Charmi Shah",
    description: `Online gynecologist visits with Dr. Charmi Shah: cycles, fertility, PCOS, menopause education. Book via WhatsApp ${CONTACT.phoneE164}.`,
    primaryQuestion: "What can an online gynecologist help with?",
    directAnswer:
      "A video consultation with a gynecologist works well for many concerns that rely on your history and reports rather than a physical examination: cycle changes, PCOS, fertility planning, reviewing scan or blood results, contraception and menopause questions, second opinions, and follow-up after treatment. It cannot replace an examination, cervical screening, procedures or emergency care. A good online consultation tells you clearly which parts of your care can happen remotely and what needs a local in-person visit.",
    sections: [
      {
        heading: "Concerns that suit a video consultation",
        paragraphs: [
          "Irregular, heavy or painful periods, PCOS, hormonal symptoms, preconception planning, fertility test results, early pregnancy questions, menopause and HRT, and follow-up after surgery are common reasons for online visits. Reviewing ultrasound, blood test or surgery reports and planning next steps is often the main value.",
          "Online care also helps people who live far from a specialist or abroad and want continuity with a doctor they trust.",
        ],
      },
      {
        heading: "What still needs an in-person visit",
        paragraphs: [
          "Pelvic and breast examinations, cervical screening (Pap or HPV tests), swabs, ultrasound scans, procedures, and anything urgent need to happen in person. Your doctor can tell you which local tests to arrange and interpret the results once they are shared.",
          "Prescribing online depends on the medicine and the telemedicine rules where you live. Some treatments need an in-person assessment first.",
        ],
      },
      {
        heading: "How to prepare for an online consultation",
        paragraphs: [
          "Write a short timeline of your symptoms, a list of medicines and allergies, your period dates, and your main questions. Upload previous reports in advance. Find a private, quiet space with a stable connection.",
          "Being clear about what you want from the visit, such as a diagnosis, a second opinion or a treatment plan, helps make the time useful.",
        ],
      },
      {
        heading: "Privacy and records",
        paragraphs: [
          "Share medical information through the secure channels your clinic provides rather than public social media. Keep copies of your reports so any local doctor you see can review the same information.",
          "Under India's telemedicine guidelines, your consent and identity are confirmed at the start of the consultation.",
        ],
      },
      {
        heading: "When online care is not the right first step",
        paragraphs: [
          "Seek emergency care for heavy bleeding with dizziness or fainting, severe sudden pelvic pain, fever with pelvic pain, or pain and bleeding with a positive pregnancy test. Bleeding after menopause needs a prompt in-person assessment.",
          "Dr. Charmi Shah (OB-GYN / IVF) offers online gynecology consultations for women in India and abroad, alongside in-person clinics in Mumbai, Ahmedabad and Valsad.",
        ],
      },
    ],
    explainerCards: [
      "What can be handled on video?",
      "What still needs a clinic visit?",
      "How do I prepare for an online visit?",
      "When is online care the wrong choice?",
    ],
    scene: {
      pack: "symptoms-women-should-never-ignore",
      alt: "Woman pausing with a phone, deciding whether symptoms need prompt care",
      caption:
        "Many gynecology questions suit a video visit; red-flag symptoms need local urgent care.",
    },
    anatomy: {
      pack: "symptoms-women-should-never-ignore",
      alt: "Body outline with the lower abdomen and chest marked as places symptoms can start",
      caption:
        "Where a symptom sits, and how fast it starts, changes whether care should be urgent or booked.",
    },
    explainerAlt:
      "Online gynecologist questions: what suits video, what needs a clinic, preparation and emergencies.",
    references: [
      {
        label:
          "Ministry of Health and Family Welfare, India: Telemedicine Practice Guidelines (2020)",
        url: "https://www.mohfw.gov.in/pdf/Telemedicine.pdf",
      },
      NHS_POSTMENOPAUSAL_BLEEDING,
      NHS_ECTOPIC,
    ],
    internalLinks: [
      { anchor: "when to see a gynecologist", path: "/when-should-i-see-a-gynecologist/" },
      { anchor: "symptoms you should not ignore", path: "/symptoms-women-should-never-ignore/" },
      { anchor: "PCOS", path: "/pcos/" },
      { anchor: "fertility", path: "/fertility/" },
    ],
    faqs: [
      {
        question: "Can an online gynecologist prescribe medicines?",
        answer:
          "Sometimes. It depends on the medicine and telemedicine rules where you live. Some treatments need an in-person assessment first.",
      },
      {
        question: "Can I get a Pap smear online?",
        answer: "No. Cervical screening needs an in-person examination by a local clinician.",
      },
      {
        question: "Can I get a second opinion online?",
        answer:
          "Yes. Reviewing your reports and imaging and giving a clear opinion and questions for your local team is a common use of online consultations.",
      },
      {
        question: "What should I have ready for the call?",
        answer:
          "Your symptom timeline, period dates, medicines, previous reports, and a private space with a stable connection.",
      },
    ],
    conversionCopy:
      "If you would like to discuss your concern with a gynecologist by video, you can book an online consultation with Dr. Charmi Shah.",
    parentHubPath: "/dr-charmi-shah/",
  }),
  hubArticle({
    id: "HUB-SEE-GYN-C",
    slug: "when-should-i-see-a-gynecologist",
    lead: "charmi",
    title: "When Should I See a Gynecologist?",
    seoTitle: "When to see a gynecologist",
    description: `When to see a gynecologist with Dr. Charmi Shah: bleeding, pain, fertility, screening. Book via WhatsApp ${CONTACT.phoneE164}.`,
    primaryQuestion: "When should I see a gynecologist?",
    directAnswer:
      "See a gynecologist when something about your periods, pelvic health, sexual health or fertility has changed or is affecting your life, and for planned care such as contraception advice, preconception planning and menopause questions. New bleeding between periods or after sex, periods that become much heavier or more painful, pelvic pain, unusual discharge, and difficulty conceiving are all good reasons to book. Some symptoms, such as heavy bleeding with dizziness or severe sudden pain, need same-day urgent care instead. You do not need to be pregnant to see a gynecologist.",
    sections: [
      {
        heading: "Changes in your periods",
        paragraphs: [
          "Book a review if your periods become irregular, stop for three months or more without pregnancy, become heavy enough to affect daily life, or become more painful over time. Bleeding between periods or after sex should also be checked.",
          "Keeping a record of dates, flow and pain for a few cycles makes the visit more productive.",
        ],
      },
      {
        heading: "Pelvic pain, discharge and sexual health",
        paragraphs: [
          "Ongoing pelvic pain, pain during sex, a change in discharge with itching or odour, sores, or a feeling of pressure or a bulge in the vagina are reasons to see a doctor. Testing for sexually transmitted infections is part of routine care when relevant and is nothing to be embarrassed about.",
        ],
      },
      {
        heading: "Planned and preventive care",
        paragraphs: [
          "A gynecologist can help with choosing contraception, preparing for pregnancy, fertility concerns, managing PCOS or endometriosis, and menopause symptoms and HRT. Cervical screening intervals depend on your age and local programme; ask which schedule applies to you.",
          "Regular review is also useful if you have a long-term condition that affects your cycle or pregnancy plans.",
        ],
      },
      {
        heading: "Fertility and pregnancy",
        paragraphs: [
          "Seek advice if you have been trying to conceive for 12 months under 35 or 6 months from 35, or sooner with irregular periods or known conditions. After a positive pregnancy test, early antenatal care, folic acid and a review of medicines are the next steps.",
        ],
      },
      {
        heading: "Symptoms that should not wait",
        paragraphs: [
          "Seek urgent care for heavy bleeding with dizziness or fainting, severe sudden pelvic pain, fever with pelvic pain, or pain and bleeding with a positive pregnancy test. Any bleeding after menopause needs prompt assessment.",
          "Dr. Charmi Shah (OB-GYN) sees women in Mumbai, Ahmedabad and Valsad and online for both routine and specialist gynecology.",
        ],
      },
    ],
    explainerCards: [
      "Which period changes need a visit?",
      "Is pelvic pain a reason to book?",
      "Do I need to be pregnant to go?",
      "Which symptoms cannot wait?",
    ],
    scene: {
      pack: "pelvic-pain-in-women",
      alt: "Woman resting with a warm pack on her lower abdomen",
      caption:
        "Pelvic pain has many causes, including cycle-related pain, endometriosis, muscle pain and scars.",
    },
    anatomy: {
      pack: "pelvic-pain-in-women",
      alt: "Body outline with the pelvic area highlighted",
      caption:
        "Pain felt in the pelvis can come from the uterus, ovaries, bowel, bladder, muscles or scars.",
    },
    explainerAlt:
      "When to see a gynecologist: period changes, pelvic pain, routine care and urgent symptoms.",
    references: [
      { label: "NHS: Periods", url: "https://www.nhs.uk/conditions/periods/" },
      NHS_POSTMENOPAUSAL_BLEEDING,
      NHS_ECTOPIC,
    ],
    internalLinks: [
      { anchor: "symptoms you should not ignore", path: "/symptoms-women-should-never-ignore/" },
      { anchor: "online gynecologist", path: "/online-gynecologist/" },
      { anchor: "irregular periods", path: "/irregular-periods/" },
      { anchor: "painful periods", path: "/painful-periods/" },
    ],
    faqs: [
      {
        question: "Can I see a gynecologist if I am not pregnant?",
        answer:
          "Yes. Gynecology covers periods, pelvic pain, contraception, fertility, infections and menopause, as well as pregnancy.",
      },
      {
        question: "How often should I have a check-up?",
        answer:
          "It depends on your age, history and local screening programme. Ask your doctor which schedule suits you.",
      },
      {
        question: "Is bleeding after sex serious?",
        answer:
          "It is often caused by something minor, but it should always be checked, especially if it keeps happening.",
      },
      {
        question: "Can I see a gynecologist online?",
        answer:
          "Many concerns can be discussed by video. Examinations, screening and procedures need an in-person visit.",
      },
    ],
    conversionCopy:
      "If something has changed and you would like it checked, you can book a consultation with Dr. Charmi Shah.",
    parentHubPath: "/online-gynecologist/",
  }),
];
