/**
 * On-page intro and related written guides for each indexable Learn topic filter.
 * Lanes: Dr. Charmi Shah = OB-GYN / IVF / laparoscopy; Dr. Zalak Shah (PT) = physio / STOTT Pilates.
 */
export type LearnTopicIntro = {
  intro: string;
  guides: readonly { path: string; label: string }[];
};

export const LEARN_TOPIC_INTROS: Readonly<Record<string, LearnTopicIntro>> = {
  Exercise: {
    intro:
      "Short clips on moving safely through pregnancy, after birth and in everyday life. Dr. Zalak Shah (PT) shows how to breathe, brace and progress load; Dr. Charmi Shah explains when an obstetric check should come first.",
    guides: [
      { path: "/is-exercise-safe-during-pregnancy/", label: "Is exercise safe during pregnancy?" },
      { path: "/pregnancy-exercises-by-trimester/", label: "Pregnancy exercises by trimester" },
      { path: "/pilates-after-pregnancy/", label: "Pilates after pregnancy" },
    ],
  },
  Fertility: {
    intro:
      "Fertility videos from Dr. Charmi Shah (OB-GYN, IVF): ovulation, tests at a first visit, IUI and IVF, and how to prepare questions for a consultation. They explain options; they do not predict your outcome.",
    guides: [
      { path: "/fertility/", label: "Fertility guide" },
      { path: "/iui-vs-ivf/", label: "IUI vs IVF" },
      { path: "/what-is-ivf/", label: "What is IVF?" },
    ],
  },
  "Labor & delivery": {
    intro:
      "Clips on preparing for labour and recovering afterwards: breathing and positions from Dr. Zalak Shah (PT), and what to expect from birth and a C-section from Dr. Charmi Shah.",
    guides: [
      { path: "/breathing-exercises-for-labour/", label: "Breathing exercises for labour" },
      { path: "/how-to-recover-after-c-section/", label: "Recovering after a C-section" },
      { path: "/postpartum-recovery/", label: "Postpartum recovery" },
    ],
  },
  "Menstrual health": {
    intro:
      "Videos on heavy, painful and irregular periods, PCOS patterns and when a period problem needs a gynecology visit, led by Dr. Charmi Shah, with pelvic-pain movement tips from Dr. Zalak Shah (PT).",
    guides: [
      { path: "/heavy-periods/", label: "Heavy periods" },
      { path: "/painful-periods/", label: "Painful periods" },
      { path: "/irregular-periods/", label: "Irregular periods" },
    ],
  },
  "Patient education": {
    intro:
      "Plain-language explainers on symptoms, tests and when to see a doctor, so you arrive at a consultation knowing what to ask. Medical topics come from Dr. Charmi Shah; movement and pelvic health from Dr. Zalak Shah (PT).",
    guides: [
      { path: "/when-should-i-see-a-gynecologist/", label: "When should I see a gynecologist?" },
      { path: "/symptoms-women-should-never-ignore/", label: "Symptoms women should never ignore" },
    ],
  },
  "Pelvic floor": {
    intro:
      "Pelvic floor clips from Dr. Zalak Shah (PT): finding and relaxing the muscles, bladder leakage, heaviness and pelvic pain, and why Kegels are not right for everyone.",
    guides: [
      { path: "/pelvic-floor-therapy/", label: "Pelvic floor therapy" },
      { path: "/what-is-the-pelvic-floor/", label: "What is the pelvic floor?" },
      { path: "/bladder-leakage/", label: "Bladder leakage" },
    ],
  },
  Pilates: {
    intro:
      "Mat and Reformer Pilates clips from Dr. Zalak Shah (PT), a STOTT Pilates instructor: core and posture work, pregnancy-safe options and returning to exercise after birth.",
    guides: [
      { path: "/pilates/", label: "Pilates classes" },
      { path: "/what-is-pilates/", label: "What is Pilates?" },
      { path: "/is-pilates-safe-during-pregnancy/", label: "Is Pilates safe during pregnancy?" },
    ],
  },
  Pregnancy: {
    intro:
      "Pregnancy videos from both sisters: early signs, scans and common discomforts with Dr. Charmi Shah, and back, pelvic and breathing work with Dr. Zalak Shah (PT).",
    guides: [
      {
        path: "/positive-pregnancy-test-next-steps/",
        label: "Positive pregnancy test: next steps",
      },
      { path: "/common-pregnancy-discomforts/", label: "Common pregnancy discomforts" },
      { path: "/prenatal-physiotherapy/", label: "Prenatal physiotherapy" },
    ],
  },
  "STOTT Pilates": {
    intro:
      "STOTT Pilates clips from Dr. Zalak Shah (PT), a STOTT Pilates instructor (Mat and Reformer): the method's neutral-spine principles and how sessions are adapted for pregnancy and recovery.",
    guides: [
      { path: "/what-is-stott-pilates/", label: "What is STOTT Pilates?" },
      { path: "/pilates/", label: "Pilates classes" },
    ],
  },
  "Women's health": {
    intro:
      "General women's health videos on hormones, perimenopause and day-to-day symptoms, from Dr. Charmi Shah (OB-GYN), and physiotherapy topics from Dr. Zalak Shah (PT).",
    guides: [
      { path: "/hormonal-imbalance/", label: "Hormonal imbalance" },
      { path: "/perimenopause-symptoms/", label: "Perimenopause symptoms" },
      { path: "/womens-health-physiotherapy/", label: "Women's health physiotherapy" },
    ],
  },
};
