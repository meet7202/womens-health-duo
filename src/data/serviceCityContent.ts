/**
 * Service-specific body copy for `/online-consultation/:city/:service` pages. Written per service
 * (not per city) so the pages say what a video visit can and cannot do for that concern.
 * City-specific facts come from `virtualServiceCityLocalFacts()`.
 */
export type ServiceCityImage = {
  src: string;
  srcSet?: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export type ServiceCityContent = {
  /** Search-facing label used in titles and H1, e.g. "Online pelvic floor physiotherapy". */
  queryLabel: string;
  covers: readonly string[];
  inPerson: readonly string[];
  prepare: readonly string[];
  /** Indexable international landing that owns this service across countries. */
  parent: { path: string; label: string };
  guides: readonly { path: string; label: string }[];
  image: ServiceCityImage;
};

function articleDiagram(slug: string, alt: string, caption: string): ServiceCityImage {
  const base = `/images/articles/${slug}/${slug}-anatomy`;
  return {
    src: `${base}.webp`,
    srcSet: `${base}-800.webp 800w, ${base}.webp 1600w`,
    alt,
    caption,
    width: 1600,
    height: 1067,
  };
}

const PRENATAL_CLASS_PHOTO: ServiceCityImage = {
  src: "/images/classes/prenatal-class-4.jpg",
  alt: "Women's health physiotherapy session explaining pelvic anatomy on a screen to expecting parents",
  caption:
    "A pregnancy education session with Dr. Zalak Shah. Online sessions use the same teaching.",
  width: 1024,
  height: 768,
};

const POSTNATAL_CLASS_PHOTO: ServiceCityImage = {
  src: "/images/classes/postnatal-class-1.jpg",
  alt: "Talk on diastasis recti with a slide comparing a normal abdomen and separated abdominal muscles",
  caption: "Postnatal education on diastasis recti and core recovery.",
  width: 1024,
  height: 768,
};

const PILATES_MAT_PHOTO: ServiceCityImage = {
  src: "/images/classes/pilates-class-3.jpg",
  alt: "Woman holding a Pilates teaser position on a mat outdoors",
  caption:
    "Mat Pilates needs only a mat and enough floor space, which is why it works well by video.",
  width: 576,
  height: 1024,
};

const PILATES_STUDIO_PHOTO: ServiceCityImage = {
  src: "/images/classes/pilates-class-5.jpg",
  alt: "Woman doing a seated side stretch on a mat in a Pilates studio",
  caption: "Mobility and core work in a Pilates studio.",
  width: 684,
  height: 1024,
};

export const SERVICE_CITY_CONTENT: Record<string, ServiceCityContent> = {
  "pregnancy-high-risk-obstetrics": {
    queryLabel: "Online pregnancy consultation",
    covers: [
      "Reviewing your scan reports, blood tests and the plan from your local obstetrician",
      "Questions about a previous pregnancy loss, high blood pressure, diabetes or thyroid conditions in pregnancy",
      "Planning the next pregnancy after a complicated one",
      "A second opinion when you want the plan explained in Hindi, Gujarati or English",
    ],
    inPerson: [
      "Scans, blood pressure checks, internal examinations and monitoring",
      "Bleeding, severe pain, reduced baby movements or fluid leaking: go to your local maternity unit",
      "Your delivery and antenatal visits stay with your local obstetric team",
    ],
    prepare: [
      "Your latest scan reports and blood test results",
      "Your current medicines and supplements with doses",
      "Weeks of pregnancy and your due date",
    ],
    parent: {
      path: "/international-consultation/high-risk-pregnancy-counselling",
      label: "High-risk pregnancy counselling online",
    },
    guides: [
      { path: "/positive-pregnancy-test-next-steps", label: "Positive pregnancy test: next steps" },
      { path: "/bleeding-in-early-pregnancy", label: "Bleeding in early pregnancy" },
      { path: "/pregnancy-nausea-when-to-seek-care", label: "Pregnancy nausea: when to seek care" },
    ],
    image: articleDiagram(
      "positive-pregnancy-test-next-steps",
      "Diagram of early pregnancy implanted in the womb lining",
      "Early pregnancy: what the first scan and blood tests check.",
    ),
  },
  "ivf-fertility-treatments": {
    queryLabel: "Online IVF and fertility consultation",
    covers: [
      "Going through AMH, hormone, semen analysis and scan results with you",
      "Explaining IUI and IVF options, and what a previous failed cycle may mean",
      "A second opinion on a treatment plan from your local clinic",
      "Questions to take back to your fertility clinic",
    ],
    inPerson: [
      "Follicle scans, egg collection, embryo transfer and IUI are done at a fertility clinic",
      "Medicines for a cycle are prescribed and monitored by the clinic treating you",
    ],
    prepare: [
      "Both partners' test reports, with dates",
      "Cycle details from any previous IUI or IVF: medicines, egg numbers, embryo reports",
      "How long you have been trying and your cycle pattern",
    ],
    parent: {
      path: "/international-consultation/ivf-second-opinion",
      label: "IVF second opinion online",
    },
    guides: [
      { path: "/what-is-ivf", label: "What is IVF?" },
      { path: "/after-unsuccessful-ivf-cycle", label: "After an unsuccessful IVF cycle" },
      { path: "/amh-test-fertility", label: "AMH test and fertility" },
    ],
    image: articleDiagram(
      "what-is-ivf",
      "Diagram of IVF steps from ovary to lab dish to embryo transfer into the womb",
      "IVF steps: stimulation, egg collection, lab fertilisation and embryo transfer.",
    ),
  },
  "laparoscopic-surgery": {
    queryLabel: "Online laparoscopy consultation",
    covers: [
      "Whether surgery is worth discussing for fibroids, ovarian cysts or suspected endometriosis",
      "Reading your ultrasound or MRI report and explaining the options",
      "What keyhole surgery involves, recovery time, and questions for your surgeon",
    ],
    inPerson: [
      "The surgery itself, the pre-operative examination and any scans",
      "Sudden severe pelvic pain or heavy bleeding: go to local emergency care",
    ],
    prepare: [
      "Ultrasound or MRI reports and images if you have them",
      "Your symptoms, how long they have lasted, and treatments tried",
      "Any surgery you have been offered locally",
    ],
    parent: {
      path: "/international-consultation/endometriosis-second-opinion",
      label: "Endometriosis second opinion online",
    },
    guides: [
      { path: "/endometriosis-symptoms-diagnosis", label: "Endometriosis symptoms and diagnosis" },
      { path: "/what-causes-heavy-periods", label: "What causes heavy periods?" },
      { path: "/pelvic-pain-in-women", label: "Pelvic pain in women" },
    ],
    image: articleDiagram(
      "endometriosis-symptoms-diagnosis",
      "Diagram of endometriosis patches on the ovaries and pelvic lining",
      "Endometriosis: where patches can sit, and why laparoscopy is sometimes discussed.",
    ),
  },
  "pcos-hormonal-disorders": {
    queryLabel: "Online PCOS consultation",
    covers: [
      "Whether your periods, skin, hair and scan findings fit PCOS",
      "Explaining your hormone and insulin results",
      "Diet, activity and medicine options, and what to expect from each",
      "Planning for pregnancy when you have PCOS",
    ],
    inPerson: [
      "Blood tests and pelvic ultrasound are arranged locally",
      "Starting or changing prescription medicines depends on rules where you live",
    ],
    prepare: [
      "Dates of your last few periods",
      "Hormone, sugar, thyroid and ultrasound reports",
      "Your goals: regular periods, skin and hair, or pregnancy",
    ],
    parent: {
      path: "/international-consultation/pcos-consultation-online",
      label: "PCOS consultation online",
    },
    guides: [
      { path: "/what-is-pcos", label: "What is PCOS?" },
      { path: "/pcos-insulin-resistance", label: "PCOS and insulin resistance" },
      { path: "/can-i-get-pregnant-with-pcos", label: "Can I get pregnant with PCOS?" },
    ],
    image: articleDiagram(
      "what-is-pcos",
      "Diagram of ovaries with multiple small follicles around the edge",
      "PCOS: many small follicles, irregular ovulation and hormone changes.",
    ),
  },
  "gynecological-care": {
    queryLabel: "Online gynaecologist consultation",
    covers: [
      "Heavy, painful or irregular periods",
      "Discharge, recurring infections and pelvic discomfort",
      "Explaining Pap smear, ultrasound and blood test results",
      "When a symptom needs an examination and how soon",
    ],
    inPerson: [
      "Pelvic examinations, swabs, smears and scans",
      "Heavy bleeding with dizziness, severe pain or fever: go to local emergency care",
    ],
    prepare: [
      "Your period dates and the symptom you want to discuss",
      "Recent test and scan reports",
      "Current medicines, including contraception",
    ],
    parent: {
      path: "/international-consultation/gynecology-report-review",
      label: "Gynecology report review online",
    },
    guides: [
      { path: "/when-should-i-see-a-gynecologist", label: "When should I see a gynecologist?" },
      { path: "/why-are-my-periods-irregular", label: "Why are my periods irregular?" },
      { path: "/why-are-my-periods-painful", label: "Why are my periods painful?" },
    ],
    image: articleDiagram(
      "what-causes-heavy-periods",
      "Diagram comparing normal and thickened womb lining with a small fibroid",
      "Heavy periods: lining changes and fibroids are two common causes to check.",
    ),
  },
  "menopause-wellness": {
    queryLabel: "Online menopause consultation",
    covers: [
      "Hot flushes, sleep, mood, vaginal dryness and period changes in perimenopause",
      "The benefits and risks of HRT for you, and non-hormonal options",
      "Bone, heart and weight questions in midlife",
      "Questions to take to your local doctor about treatment",
    ],
    inPerson: [
      "Blood pressure, breast checks, smears and bone density scans happen locally",
      "Prescriptions for HRT depend on the rules where you live and are usually issued by your local doctor",
      "Bleeding after menopause needs a prompt local examination",
    ],
    prepare: [
      "Your symptoms and how long they have been going on",
      "Date of your last period",
      "Your own and family history of breast cancer, clots, heart disease or osteoporosis",
    ],
    parent: {
      path: "/international-consultation/menopause-consultation-online",
      label: "Menopause consultation online",
    },
    guides: [
      { path: "/perimenopause-symptoms", label: "Perimenopause symptoms" },
      { path: "/menopause-hrt-questions", label: "Questions about menopause HRT" },
      { path: "/symptoms-women-should-never-ignore", label: "Symptoms women should never ignore" },
    ],
    image: articleDiagram(
      "menopause-hrt-questions",
      "Diagram of oestrogen effects on brain, bones and heart",
      "Why falling oestrogen can affect sleep, mood, bones and the heart.",
    ),
  },
  "pelvic-floor-rehabilitation": {
    queryLabel: "Online pelvic floor physiotherapy",
    covers: [
      "A detailed history of leaking, urgency, heaviness or pelvic pain",
      "Teaching you to find and relax the pelvic floor, with breathing and posture cues on camera",
      "A graded exercise plan with check-ins as it progresses",
      "Bladder habits and fluid advice, and how to fit exercises into your day",
    ],
    inPerson: [
      "An internal pelvic floor examination is not done by video. If it is needed, a local pelvic health physiotherapist can do it",
      "Blood in urine, fever, or new loss of bladder or bowel control: see a doctor promptly",
    ],
    prepare: [
      "A three-day bladder diary if leaking or urgency is the problem",
      "A quiet private room, a mat or bed, and comfortable clothes",
      "Any reports from your doctor or a previous physiotherapist",
    ],
    parent: {
      path: "/international-consultation/pelvic-floor-physiotherapy-online",
      label: "Pelvic floor physiotherapy online",
    },
    guides: [
      {
        path: "/how-do-i-know-if-my-pelvic-floor-is-weak",
        label: "How do I know if my pelvic floor is weak?",
      },
      { path: "/why-do-i-leak-urine-when-i-cough", label: "Why do I leak urine when I cough?" },
      { path: "/are-kegels-right-for-everyone", label: "Are Kegels right for everyone?" },
    ],
    image: articleDiagram(
      "what-is-the-pelvic-floor",
      "Top-down diagram of the pelvic floor muscles between pubic bone and tailbone",
      "The pelvic floor muscles, the focus of pelvic floor physiotherapy.",
    ),
  },
  "antenatal-postnatal-care": {
    queryLabel: "Online prenatal and postnatal physiotherapy",
    covers: [
      "Exercise that suits your trimester, and back, hip or pelvic pain in pregnancy",
      "Breathing and positions to practise for labour",
      "Recovery after vaginal birth or C-section: pelvic floor, core and posture",
      "Checking for diastasis recti and building a return-to-exercise plan",
    ],
    inPerson: [
      "Your obstetrician or midwife confirms it is safe to exercise in pregnancy and after birth",
      "Bleeding, fluid leaking, chest pain or calf swelling: stop and get local medical care",
    ],
    prepare: [
      "Weeks of pregnancy, or the date and type of delivery",
      "Any advice from your obstetrician about activity",
      "A mat, a cushion and enough floor space to lie down",
    ],
    parent: {
      path: "/international-consultation/prenatal-postnatal-physio-online",
      label: "Prenatal and postnatal physiotherapy online",
    },
    guides: [
      { path: "/what-is-prenatal-physiotherapy", label: "What is prenatal physiotherapy?" },
      {
        path: "/how-long-does-postpartum-recovery-take",
        label: "How long does postpartum recovery take?",
      },
      { path: "/what-is-diastasis-recti", label: "What is diastasis recti?" },
    ],
    image: PRENATAL_CLASS_PHOTO,
  },
  "mat-pilates-online": {
    queryLabel: "Online Mat Pilates with a physiotherapist",
    covers: [
      "Live sessions with form cues on camera from a women's health physiotherapist",
      "Exercise choices adjusted for pregnancy, postpartum recovery, back pain or pelvic floor symptoms",
      "A home routine you can repeat between sessions",
    ],
    inPerson: [
      "Reformer and equipment work needs a studio. Dr. Zalak teaches in person in Bangalore and Ahmedabad",
      "If a movement causes pain, leaking or heaviness, mention it so it can be changed or checked",
    ],
    prepare: [
      "A mat and enough floor space to lie down and stretch your arms",
      "A laptop or phone placed so your whole body is in view",
      "Any pregnancy, surgery or injury you are recovering from",
    ],
    parent: {
      path: "/international-consultation/mat-pilates-online-international",
      label: "Mat Pilates online for international clients",
    },
    guides: [
      { path: "/is-online-pilates-effective", label: "Is online Pilates effective?" },
      { path: "/what-is-pilates", label: "What is Pilates?" },
      { path: "/is-pilates-safe-during-pregnancy", label: "Is Pilates safe during pregnancy?" },
    ],
    image: PILATES_MAT_PHOTO,
  },
  "stott-pilates": {
    queryLabel: "STOTT Pilates coaching online",
    covers: [
      "STOTT Pilates mat repertoire taught by video, with posture and breathing cues",
      "Programming for women's health goals such as postnatal core recovery or back pain",
      "Advice on progressing Reformer work if you train at a studio near you",
    ],
    inPerson: [
      "Reformer sessions need equipment. Dr. Zalak teaches in person in Bangalore and Ahmedabad",
      "Pain, leaking or heaviness during exercise should be checked before progressing",
    ],
    prepare: [
      "A mat and space to lie down",
      "Your Pilates experience and any studio you attend",
      "Injuries, pregnancy or recent surgery",
    ],
    parent: {
      path: "/international-consultation/stott-pilates-online-international",
      label: "STOTT Pilates online for international clients",
    },
    guides: [
      { path: "/what-is-stott-pilates", label: "What is STOTT Pilates?" },
      { path: "/pilates-after-pregnancy", label: "Pilates after pregnancy" },
      { path: "/pilates", label: "Pilates with Dr. Zalak Shah" },
    ],
    image: PILATES_STUDIO_PHOTO,
  },
  "musculoskeletal-physiotherapy": {
    queryLabel: "Online women's health physiotherapy",
    covers: [
      "Assessment of back, neck, hip and shoulder pain by history and movement on camera",
      "Pain linked to pregnancy, feeding, carrying a baby or desk work",
      "An exercise plan and posture changes for your home and work setup",
    ],
    inPerson: [
      "Hands-on treatment and any imaging are arranged locally",
      "Numbness, weakness in the legs, or loss of bladder or bowel control: urgent local care",
    ],
    prepare: [
      "Where the pain is, how long you have had it, and what makes it worse",
      "Any X-ray or MRI reports",
      "Space to stand, bend and lie down in view of the camera",
    ],
    parent: {
      path: "/online-womens-health-physiotherapy",
      label: "Online women's health physiotherapy",
    },
    guides: [
      {
        path: "/what-happens-during-a-physiotherapy-session",
        label: "What happens during a physiotherapy session?",
      },
      { path: "/postpartum-back-pain", label: "Postpartum back pain" },
      { path: "/how-to-relieve-back-pain-during-pregnancy", label: "Back pain during pregnancy" },
    ],
    image: articleDiagram(
      "postpartum-back-pain",
      "Diagram of spinal load while holding a baby",
      "How lifting and holding a baby loads the spine.",
    ),
  },
  "core-functional-training": {
    queryLabel: "Online core rehab with a physiotherapist",
    covers: [
      "Rebuilding the deep core after pregnancy, C-section or abdominal surgery once you are cleared",
      "Checking for diastasis recti and choosing exercises that suit it",
      "Lifting, carrying and returning to running or the gym step by step",
    ],
    inPerson: [
      "Your surgeon or obstetrician confirms when you can start after surgery or birth",
      "A painful bulge near the belly button or scar needs a local doctor's check",
    ],
    prepare: [
      "Date and type of any delivery or surgery",
      "A mat and space to lie down",
      "The activity you want to get back to",
    ],
    parent: {
      path: "/international-consultation/diastasis-recti-consultation-online",
      label: "Diastasis recti consultation online",
    },
    guides: [
      {
        path: "/how-to-rebuild-core-after-pregnancy",
        label: "How to rebuild your core after pregnancy",
      },
      { path: "/how-to-check-for-diastasis-recti", label: "How to check for diastasis recti" },
      { path: "/when-can-i-exercise-after-delivery", label: "When can I exercise after delivery?" },
    ],
    image: POSTNATAL_CLASS_PHOTO,
  },
  "womens-wellness-programs": {
    queryLabel: "Online women's physio and Pilates programme",
    covers: [
      "A structured plan combining physiotherapy exercises and Pilates-based movement",
      "Goals such as posture, strength, pelvic floor health or recovery after pregnancy",
      "Regular video check-ins to progress the plan",
    ],
    inPerson: [
      "Medical symptoms are reviewed by a doctor before or alongside the programme",
      "Studio and Reformer sessions are in Bangalore and Ahmedabad",
    ],
    prepare: [
      "Your main goal and how much time you have each week",
      "Health conditions, pregnancy or recent surgery",
      "A mat and space to move",
    ],
    parent: { path: "/womens-health-physiotherapy", label: "Women's health physiotherapy" },
    guides: [
      {
        path: "/what-is-womens-health-physiotherapy",
        label: "What is women's health physiotherapy?",
      },
      { path: "/what-is-pilates", label: "What is Pilates?" },
      { path: "/pelvic-floor-therapy", label: "Pelvic floor therapy" },
    ],
    image: PILATES_STUDIO_PHOTO,
  },
};
