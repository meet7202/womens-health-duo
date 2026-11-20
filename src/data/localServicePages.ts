/**
 * In-person service pages for the clinic cities. These match "near me" searches.
 * Dr. Zalak Shah: Ahmedabad and Bangalore. Dr. Charmi Shah: Mumbai, Ahmedabad, and Valsad.
 * Must not use `@/` imports (loaded from Node for sitemap shells).
 */
import type { FaqItem } from "./siteFaq";
import { BANGALORE_STUDIO } from "../config/practiceLocations";
import { CONTACT } from "../config/site.defaults";
import { formatDocumentTitle } from "../lib/seoTitle";

export type LocalCityKey = "ahmedabad" | "mumbai" | "valsad" | "bangalore";
export type LocalDoctor = "charmi" | "zalak";

type LocalCity = {
  key: LocalCityKey;
  path: string;
  titlePlace: string;
  h1Place: string;
  /** Public segment under `/online-consultation/`. */
  virtualSegment: string;
};

const CITIES: Record<LocalCityKey, LocalCity> = {
  ahmedabad: {
    key: "ahmedabad",
    path: "/ahmedabad",
    titlePlace: "Ahmedabad",
    h1Place: "Ahmedabad",
    virtualSegment: "ahmedabad",
  },
  mumbai: {
    key: "mumbai",
    path: "/mumbai",
    titlePlace: "Mumbai",
    h1Place: "Mumbai",
    virtualSegment: "mumbai",
  },
  valsad: {
    key: "valsad",
    path: "/valsad",
    titlePlace: "Valsad",
    h1Place: "Valsad",
    virtualSegment: "valsad",
  },
  bangalore: {
    key: "bangalore",
    path: "/bangalore",
    titlePlace: "Bangalore",
    h1Place: "Bengaluru (Bangalore)",
    virtualSegment: "bengaluru",
  },
};

type ServiceImage = {
  src: string;
  srcSet?: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

type ServiceTemplate = {
  slug: string;
  doctor: LocalDoctor;
  cities: readonly LocalCityKey[];
  titleLead: string;
  h1Lead: string;
  analyticsService: string;
  bookingService: string;
  onlineSlug: string;
  intro: string;
  covers: readonly string[];
  parent: { path: string; label: string };
  guides: readonly { path: string; label: string }[];
  image: ServiceImage;
};

function diagram(slug: string, alt: string, caption: string): ServiceImage {
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

const SERVICES: readonly ServiceTemplate[] = [
  {
    slug: "prenatal-classes",
    doctor: "zalak",
    cities: ["ahmedabad", "bangalore"],
    titleLead: "Prenatal classes",
    h1Lead: "Prenatal classes with Dr. Zalak Shah",
    analyticsService: "prenatal",
    bookingService: "antenatal-postnatal-care",
    onlineSlug: "antenatal-postnatal-care",
    intro:
      "In-person prenatal classes for pregnancy movement, birth preparation, and pelvic-floor awareness. Dr. Zalak Shah (PT) teaches them. This is physiotherapy-led education, not an obstetric visit.",
    covers: [
      "Trimester-by-trimester movement that is comfortable for your pregnancy",
      "Positions and breathing to practise before labour",
      "Pelvic-floor coordination, including when to relax as well as strengthen",
      "What to pause and ask Dr. Charmi Shah, or your own obstetrician, about",
    ],
    parent: { path: "/prenatal", label: "Prenatal classes" },
    guides: [
      { path: "/is-exercise-safe-during-pregnancy", label: "Is exercise safe during pregnancy?" },
      { path: "/what-is-the-pelvic-floor", label: "What is the pelvic floor?" },
    ],
    image: {
      src: "/images/classes/prenatal-class-4.jpg",
      alt: "Women's health physiotherapy session explaining pelvic anatomy to expecting parents",
      caption: "Pregnancy education with Dr. Zalak Shah. The same teaching is used in her classes.",
      width: 1024,
      height: 768,
    },
  },
  {
    slug: "postnatal-diastasis-recti",
    doctor: "zalak",
    cities: ["ahmedabad", "bangalore"],
    titleLead: "Diastasis recti care",
    h1Lead: "Postnatal diastasis recti care with Dr. Zalak Shah",
    analyticsService: "diastasis",
    bookingService: "antenatal-postnatal-care",
    onlineSlug: "antenatal-postnatal-care",
    intro:
      "In-person postnatal physiotherapy for abdominal separation, caesarean or vaginal recovery, and a graded return to exercise. Dr. Zalak Shah (PT) assesses you before giving a class plan.",
    covers: [
      "A check for diastasis recti and how the abdominal wall is loading",
      "Early recovery after a vaginal birth or caesarean, once you are cleared to start",
      "Breathing, pelvic floor, and core work that matches the gap you have",
      "When to add Pilates, and when to stay with slower rehab",
    ],
    parent: { path: "/postnatal", label: "Postnatal classes" },
    guides: [
      { path: "/what-is-diastasis-recti", label: "What is diastasis recti?" },
      { path: "/how-to-check-for-diastasis-recti", label: "How to check for diastasis recti" },
    ],
    image: {
      src: "/images/classes/postnatal-class-1.jpg",
      alt: "Talk on diastasis recti with a slide comparing a normal abdomen and separated abdominal muscles",
      caption: "Postnatal teaching on diastasis recti and core recovery.",
      width: 1024,
      height: 768,
    },
  },
  {
    slug: "pelvic-floor-physiotherapy",
    doctor: "zalak",
    cities: ["ahmedabad", "bangalore"],
    titleLead: "Pelvic floor physio",
    h1Lead: "Pelvic floor physiotherapy with Dr. Zalak Shah",
    analyticsService: "incontinence",
    bookingService: "pelvic-floor-rehabilitation",
    onlineSlug: "pelvic-floor-rehabilitation",
    intro:
      "In-person pelvic floor physiotherapy for leaks, heaviness, constipation, and painful sex or exercise. Dr. Zalak Shah (PT) plans the work. Medical causes are reviewed with Dr. Charmi Shah when needed.",
    covers: [
      "Leaking with cough, lift, or exercise, and urgency that is hard to hold",
      "A feeling of heaviness or bulging that needs a physiotherapy check",
      "Coordination training: strengthen, relax, or both, depending on the exam",
      "A home plan you can continue, including online follow-up between visits",
    ],
    parent: { path: "/pelvic-floor-therapy", label: "Pelvic floor therapy" },
    guides: [
      { path: "/what-is-the-pelvic-floor", label: "What is the pelvic floor?" },
      {
        path: "/how-do-i-know-if-my-pelvic-floor-is-weak",
        label: "How do I know if my pelvic floor is weak?",
      },
    ],
    image: diagram(
      "what-is-the-pelvic-floor",
      "Diagram of the pelvic floor muscles supporting the bladder, uterus, and bowel",
      "The pelvic floor supports the bladder, uterus, and bowel.",
    ),
  },
  {
    slug: "womens-health-physiotherapy",
    doctor: "zalak",
    cities: ["ahmedabad", "bangalore"],
    titleLead: "Women's health physio",
    h1Lead: "Women's health physiotherapy with Dr. Zalak Shah",
    analyticsService: "womens-health-physiotherapy",
    bookingService: "musculoskeletal-physiotherapy",
    onlineSlug: "musculoskeletal-physiotherapy",
    intro:
      "In-person women's health physiotherapy for pregnancy, postpartum, pelvic floor, and muscle or joint pain that is affecting daily life. Dr. Zalak Shah (PT) sees you by appointment and can add Pilates when it fits the plan.",
    covers: [
      "Pregnancy and postnatal aches that are limiting walking, feeding, or work",
      "Back, hip, or pelvic pain assessed with women's health in mind",
      "A decision between physiotherapy, a class, or a medical visit with Dr. Charmi Shah",
      "Follow-up by video if you travel or cannot come every week",
    ],
    parent: {
      path: "/what-is-womens-health-physiotherapy",
      label: "What is women's health physiotherapy?",
    },
    guides: [
      {
        path: "/what-is-womens-health-physiotherapy",
        label: "What is women's health physiotherapy?",
      },
      { path: "/pelvic-floor-therapy", label: "Pelvic floor therapy" },
    ],
    image: {
      src: "/images/classes/pilates-class-5.jpg",
      alt: "Woman doing a seated side stretch on a mat in a Pilates studio",
      caption: "Studio movement used alongside women's health physiotherapy.",
      width: 684,
      height: 1024,
    },
  },
  {
    slug: "pilates-classes",
    doctor: "zalak",
    cities: ["ahmedabad", "bangalore"],
    titleLead: "Pilates classes",
    h1Lead: "Pilates classes with Dr. Zalak Shah",
    analyticsService: "stott-pilates",
    bookingService: "stott-pilates",
    onlineSlug: "stott-pilates",
    intro:
      "In-person Mat and Reformer Pilates taught by Dr. Zalak Shah (PT), a STOTT Pilates instructor. Classes sit beside physiotherapy. They are not a replacement for a medical or pelvic-floor assessment.",
    covers: [
      "Mat and Reformer sessions for strength, posture, and pregnancy or postnatal goals",
      "STOTT Pilates on Mat and Reformer, used as the method rather than the headline",
      "Modifications when you are pregnant, newly postnatal, or working on diastasis",
      "A physiotherapy check first if you have leaks, pain, or a large abdominal gap",
    ],
    parent: { path: "/pilates", label: "Pilates classes" },
    guides: [
      { path: "/what-is-pilates", label: "What is Pilates?" },
      { path: "/prenatal", label: "Prenatal classes" },
    ],
    image: {
      src: "/images/classes/pilates-class-3.jpg",
      alt: "Woman holding a Pilates teaser position on a mat outdoors",
      caption: "Mat work from Dr. Zalak Shah's Pilates teaching.",
      width: 576,
      height: 1024,
    },
  },
  {
    slug: "gynecology",
    doctor: "charmi",
    cities: ["mumbai", "ahmedabad", "valsad"],
    titleLead: "Gynecology consult",
    h1Lead: "Gynecology consult with Dr. Charmi Shah",
    analyticsService: "gynecological-care",
    bookingService: "gynecological-care",
    onlineSlug: "gynecological-care",
    intro:
      "In-person gynecology with Dr. Charmi Shah (MBBS, MS Obstetrics & Gynecology, fellowship training in laparoscopy and IVF). Visits cover periods, pelvic pain, infections, contraception questions, and a check of whether surgery or fertility care is needed.",
    covers: [
      "Painful, heavy, or irregular periods",
      "Pelvic pain, ovarian cysts, and fibroids discussed after an examination",
      "Infections and screening questions that need an in-person visit",
      "A plan for what can wait for a video follow-up and what needs the clinic",
    ],
    parent: { path: "/dr-charmi-shah", label: "Dr. Charmi Shah" },
    guides: [
      { path: "/pelvic-pain-in-women", label: "Pelvic pain in women" },
      { path: "/what-causes-heavy-periods", label: "What causes heavy periods?" },
    ],
    image: diagram(
      "endometriosis-symptoms-diagnosis",
      "Diagram of endometriosis patches on the ovaries and pelvic lining",
      "Pelvic pain has several causes. An in-person visit is how Dr. Charmi Shah sorts them.",
    ),
  },
  {
    slug: "ivf",
    doctor: "charmi",
    cities: ["mumbai", "ahmedabad", "valsad"],
    titleLead: "IVF consult",
    h1Lead: "IVF consult with Dr. Charmi Shah",
    analyticsService: "ivf-fertility-treatments",
    bookingService: "ivf-fertility-treatments",
    onlineSlug: "ivf-fertility-treatments",
    intro:
      "In-person fertility and IVF consultation with Dr. Charmi Shah. She reviews your history, scans, and hormones and explains whether trying longer, IUI, or IVF is the relevant next step. Treatment is planned for you. Nothing here is a success-rate promise.",
    covers: [
      "Fertility history, cycle pattern, and previous treatment",
      "Which blood tests and scans are still worth doing",
      "IUI and IVF discussed only when they fit the findings",
      "A video follow-up if you live away and travel in for procedures",
    ],
    parent: { path: "/what-is-ivf", label: "What is IVF?" },
    guides: [
      { path: "/amh-test-fertility", label: "AMH test and fertility" },
      { path: "/after-unsuccessful-ivf-cycle", label: "After an unsuccessful IVF cycle" },
    ],
    image: diagram(
      "what-is-ivf",
      "Diagram of IVF steps from ovary to lab dish to embryo transfer into the womb",
      "IVF steps Dr. Charmi Shah explains in a fertility consult.",
    ),
  },
  {
    slug: "laparoscopy",
    doctor: "charmi",
    cities: ["mumbai", "ahmedabad", "valsad"],
    titleLead: "Laparoscopy consult",
    h1Lead: "Laparoscopy consult with Dr. Charmi Shah",
    analyticsService: "laparoscopic-surgery",
    bookingService: "laparoscopic-surgery",
    onlineSlug: "laparoscopic-surgery",
    intro:
      "In-person consultation for gynecologic laparoscopy with Dr. Charmi Shah, including fibroids, ovarian cysts, and endometriosis when surgery is being considered. The visit decides whether an operation is appropriate. It is not a booking for surgery on the same day.",
    covers: [
      "Review of pain, bleeding, and previous scans or surgery",
      "Whether laparoscopy, medicine, or watching is the better next step",
      "What recovery affects for work, exercise, and a future pregnancy",
      "Physiotherapy with Dr. Zalak Shah afterwards, when movement rehab will help",
    ],
    parent: {
      path: "/endometriosis-symptoms-diagnosis",
      label: "Endometriosis symptoms and diagnosis",
    },
    guides: [
      { path: "/pelvic-pain-in-women", label: "Pelvic pain in women" },
      { path: "/what-causes-heavy-periods", label: "What causes heavy periods?" },
    ],
    image: diagram(
      "endometriosis-symptoms-diagnosis",
      "Diagram of endometriosis patches on the ovaries and pelvic lining",
      "Endometriosis is one reason laparoscopy is discussed. Dr. Charmi Shah confirms the plan in person.",
    ),
  },
  {
    slug: "pregnancy-care",
    doctor: "charmi",
    cities: ["mumbai", "ahmedabad", "valsad"],
    titleLead: "High-risk pregnancy",
    h1Lead: "Pregnancy care with Dr. Charmi Shah",
    analyticsService: "pregnancy-high-risk-obstetrics",
    bookingService: "pregnancy-high-risk-obstetrics",
    onlineSlug: "pregnancy-high-risk-obstetrics",
    intro:
      "In-person pregnancy care with Dr. Charmi Shah, including high-risk pregnancy planning. She is the obstetrician. Movement and pelvic-floor classes, when you want them, are with Dr. Zalak Shah in Ahmedabad or Bangalore, or online.",
    covers: [
      "Antenatal questions, scans, and blood pressure, thyroid, or diabetes in pregnancy",
      "Planning after a previous loss or a complicated birth",
      "What must be done in clinic and what can be a video check-in",
      "When to go to a hospital the same day rather than wait for a routine visit",
    ],
    parent: { path: "/dr-charmi-shah", label: "Dr. Charmi Shah" },
    guides: [
      { path: "/bleeding-in-early-pregnancy", label: "Bleeding in early pregnancy" },
      { path: "/positive-pregnancy-test-next-steps", label: "Positive pregnancy test: next steps" },
    ],
    image: diagram(
      "positive-pregnancy-test-next-steps",
      "Diagram of early pregnancy implanted in the womb lining",
      "Early pregnancy questions Dr. Charmi Shah covers in an obstetric visit.",
    ),
  },
  {
    slug: "pcos",
    doctor: "charmi",
    cities: ["mumbai", "ahmedabad", "valsad"],
    titleLead: "PCOS treatment",
    h1Lead: "PCOS care with Dr. Charmi Shah",
    analyticsService: "pcos-hormonal-disorders",
    bookingService: "pcos-hormonal-disorders",
    onlineSlug: "pcos-hormonal-disorders",
    intro:
      "In-person PCOS and hormone care with Dr. Charmi Shah. She confirms whether the pattern fits PCOS and talks through cycles, skin and hair, metabolic health, and pregnancy plans. Medication is prescribed only when it is appropriate for you.",
    covers: [
      "Irregular cycles and what else, besides PCOS, can cause them",
      "Acne, hair growth, and weight change discussed with the hormone picture",
      "Trying to conceive with PCOS, including when fertility treatment comes in",
      "A follow-up by video if you cannot attend every review in person",
    ],
    parent: { path: "/what-is-pcos", label: "What is PCOS?" },
    guides: [
      { path: "/pcos-insulin-resistance", label: "PCOS and insulin resistance" },
      { path: "/can-i-get-pregnant-with-pcos", label: "Can I get pregnant with PCOS?" },
    ],
    image: diagram(
      "what-is-pcos",
      "Diagram of ovaries with multiple small follicles around the edge",
      "PCOS: many small follicles, irregular ovulation, and hormone changes.",
    ),
  },
];

const DOCTOR_NAME: Record<LocalDoctor, string> = {
  zalak: "Dr. Zalak Shah (PT)",
  charmi: "Dr. Charmi Shah",
};

const PROFILE_PATH: Record<LocalDoctor, string> = {
  zalak: "/dr-zalak-shah",
  charmi: "/dr-charmi-shah",
};

export type LocalServicePage = {
  path: string;
  city: LocalCity;
  service: ServiceTemplate;
  title: string;
  h1: string;
  metaDescription: string;
  doctorName: string;
  profilePath: string;
  faqs: readonly FaqItem[];
};

function buildFaqs(service: ServiceTemplate, city: LocalCity): FaqItem[] {
  const doctor = DOCTOR_NAME[service.doctor];
  const place = city.h1Place;
  const studio =
    city.key === "bangalore" && service.doctor === "zalak" ? BANGALORE_STUDIO : undefined;
  return [
    {
      question: `Which clinic offers ${service.titleLead.toLowerCase()} in ${city.titlePlace}?`,
      answer: `Women's Health Duo, ${city.titlePlace}. ${doctor} sees patients in person for this, by appointment. ${
        studio
          ? `The studio is ${studio.area}.`
          : "The room for that day is confirmed when you book."
      } Message WhatsApp ${CONTACT.phoneE164}. English, Hindi, and Gujarati are commonly used.`,
    },
    {
      question: `Can I see ${doctor} in person in ${place}?`,
      answer: `Yes. ${service.titleLead} in ${city.titlePlace} is an in-person visit with ${doctor}, by appointment. Video follow-up is available if you cannot come every time.`,
    },
    {
      question: `Is this the same as an online consult for ${city.titlePlace}?`,
      answer: `No. This page is the clinic visit in ${place}. The online page for the same service is a video consult and does not replace an examination when you need one.`,
    },
    {
      question: `How do I book ${service.titleLead.toLowerCase()} in ${city.titlePlace}?`,
      answer: `Message Women's Health Duo on WhatsApp at ${CONTACT.phoneE164} or use the booking page. Say ${city.titlePlace} and ${service.titleLead.toLowerCase()} in the first message. Visits are by appointment.`,
    },
  ];
}

function buildPage(service: ServiceTemplate, city: LocalCity): LocalServicePage {
  const primary = `${service.titleLead} in ${city.titlePlace}`;
  const title = formatDocumentTitle(primary);
  if (title.includes("…")) {
    throw new Error(`local service title was truncated: ${primary}`);
  }
  const metaDescription = `${service.titleLead} in ${city.titlePlace} with ${DOCTOR_NAME[service.doctor]}. In-person by appointment. Book on WhatsApp ${CONTACT.phoneE164}.`;
  if (metaDescription.length < 25 || metaDescription.length > 160) {
    throw new Error(`local service meta length ${metaDescription.length}: ${metaDescription}`);
  }
  return {
    path: `${city.path}/${service.slug}`,
    city,
    service,
    title,
    h1: `${service.h1Lead} in ${city.h1Place}`,
    metaDescription,
    doctorName: DOCTOR_NAME[service.doctor],
    profilePath: PROFILE_PATH[service.doctor],
    faqs: buildFaqs(service, city),
  };
}

export const LOCAL_SERVICE_PAGES: readonly LocalServicePage[] = SERVICES.flatMap((service) =>
  service.cities.map((key) => buildPage(service, CITIES[key])),
);

const BY_PATH = new Map(LOCAL_SERVICE_PAGES.map((page) => [page.path, page]));

export const LOCAL_SERVICE_PATHS: readonly string[] = LOCAL_SERVICE_PAGES.map((page) => page.path);

export function localServicePageByPath(pathname: string): LocalServicePage | undefined {
  const path = pathname.replace(/\/+$/, "") || "/";
  return BY_PATH.get(path);
}

export function localServicePagesForCity(city: LocalCityKey): readonly LocalServicePage[] {
  return LOCAL_SERVICE_PAGES.filter((page) => page.city.key === city);
}
