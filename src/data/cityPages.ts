import { ROUTES } from "../config/routes";

export type CityKey = "ahmedabad" | "mumbai" | "valsad" | "bangalore";

export type CityPageData = {
  key: CityKey;
  path: string;
  /** Plain city name for sentences and FAQ questions (not the H1). */
  cityName: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  /** In-person / primary focus for this city */
  doctors: { name: string; role: string; profilePath: string }[];
  highlights: string[];
  /**
   * Surfaces Dr. Zalak's two Google Business listings (Ahmedabad vs Bengaluru).
   * Use `both` when the page is not her primary in-person city (e.g. Mumbai).
   */
  drZalakGoogleBusinessPresentation: "both" | "ahmedabad-primary" | "bangalore-primary";
};

export const CITY_PAGES: Record<CityKey, CityPageData> = {
  ahmedabad: {
    key: "ahmedabad",
    path: ROUTES.ahmedabad,
    cityName: "Ahmedabad",
    title: "Women's Health Duo in Ahmedabad | OB-GYN, IVF & Women's Health Physio",
    metaDescription:
      "Online-first: Women's Health Duo in Ahmedabad for Dr. Charmi Shah (OB-GYN, IVF, laparoscopy) and Dr. Zalak Shah (women's health physio, STOTT Pilates). Global telehealth from the same practice.",
    h1: "Women's healthcare in Ahmedabad",
    intro:
      "In Ahmedabad, both sisters see patients in person by appointment. Dr. Charmi Shah provides obstetrics, gynecology, fertility evaluation with IVF and IUI, and laparoscopic surgery. Dr. Zalak Shah (PT) provides women's health physiotherapy and STOTT Pilates on Mat and Reformer for pregnancy, postpartum recovery, pelvic floor and musculoskeletal goals. Families who live elsewhere can start with an online consult using the same phone number and email.",
    doctors: [
      {
        name: "Dr. Charmi Shah",
        role: "OB-GYN, IVF & laparoscopic surgery",
        profilePath: ROUTES.drCharmi,
      },
      {
        name: "Dr. Zalak Shah (PT)",
        role: "Women's health physiotherapy & STOTT Pilates",
        profilePath: ROUTES.drZalak,
      },
    ],
    highlights: [
      "Integrated OB-GYN and physiotherapy perspective for many women's health journeys",
      "Fertility evaluation and IVF/IUI pathways discussed in consult",
      "Pelvic floor, prenatal and postnatal rehab with Pilates-informed programming",
      "Same practice contact channels for both sisters (phone, WhatsApp, email)",
    ],
    drZalakGoogleBusinessPresentation: "ahmedabad-primary",
  },
  mumbai: {
    key: "mumbai",
    path: ROUTES.mumbai,
    cityName: "Mumbai",
    title: "Women's Health Duo in Mumbai | OB-GYN, IVF & Laparoscopy",
    metaDescription:
      "Online-first for NRIs: Women's Health Duo in Mumbai with Dr. Charmi Shah (OB-GYN, IVF, laparoscopy); Dr. Zalak Shah online physio / Pilates worldwide.",
    h1: "Women's healthcare in Mumbai",
    intro:
      "If you are abroad, start with an online OB-GYN or physio consult, telehealth is central to how Women's Health Duo serves NRIs and global families. In Mumbai, Dr. Charmi Shah leads obstetrics, gynecology, IVF, and minimally invasive surgical care with structured prenatal and high-risk pregnancy planning, fertility workups, and laparoscopic options where appropriate. Dr. Zalak Shah's physiotherapy and STOTT Pilates work is available online worldwide and in person in Bangalore and Ahmedabad.",
    doctors: [
      {
        name: "Dr. Charmi Shah",
        role: "OB-GYN, IVF & laparoscopic surgery",
        profilePath: ROUTES.drCharmi,
      },
      {
        name: "Dr. Zalak Shah",
        role: "Women's health physio & Pilates (online worldwide; in person Bangalore & Ahmedabad)",
        profilePath: ROUTES.drZalak,
      },
    ],
    highlights: [
      "High-risk pregnancy and delivery planning with OB-GYN-led care",
      "IVF, IUI, and infertility evaluation pathways",
      "Laparoscopic surgery for fibroids, endometriosis, cysts, and related conditions when indicated",
      "Coordination with physio and Pilates programs through Women's Health Duo",
    ],
    drZalakGoogleBusinessPresentation: "both",
  },
  valsad: {
    key: "valsad",
    path: ROUTES.valsad,
    cityName: "Valsad",
    title: "Women's Health Duo in Valsad | OB-GYN, IVF & Laparoscopy",
    metaDescription:
      "Women's Health Duo in Valsad (Gujarat): Dr. Charmi Shah for in-person OB-GYN, IVF, and laparoscopy; online consults worldwide. Dr. Zalak Shah for women's health physio & STOTT Pilates online and in Bangalore and Ahmedabad.",
    h1: "Women's healthcare in Valsad",
    intro:
      "Many families start with a video OB-GYN or physio consult, then plan in-person visits when they are in Gujarat. In Valsad, Dr. Charmi Shah provides obstetrics, gynecology, IVF and fertility discussion, and laparoscopic gynecology pathways with clear communication and evidence-based planning. Dr. Zalak Shah's physiotherapy and STOTT Pilates work is available online worldwide and in person in Bangalore and Ahmedabad.",
    doctors: [
      {
        name: "Dr. Charmi Shah",
        role: "OB-GYN, IVF & laparoscopic surgery",
        profilePath: ROUTES.drCharmi,
      },
      {
        name: "Dr. Zalak Shah",
        role: "Women's health physio & Pilates (online worldwide; in person Bangalore & Ahmedabad)",
        profilePath: ROUTES.drZalak,
      },
    ],
    highlights: [
      "OB-GYN-led pregnancy and high-risk obstetrics planning",
      "IVF, IUI, and infertility evaluation consults",
      "Laparoscopic surgery for fibroids, endometriosis, cysts, and related conditions when indicated",
      "Same practice contact channels for both sisters (phone, WhatsApp, email)",
    ],
    drZalakGoogleBusinessPresentation: "both",
  },
  bangalore: {
    key: "bangalore",
    path: ROUTES.bangalore,
    cityName: "Bengaluru (Bangalore)",
    title: "Women's Health Duo in Bangalore | Women's Health Physio & STOTT Pilates",
    metaDescription:
      "Women's health physiotherapy and STOTT Pilates in Bengaluru with Dr. Zalak Shah (PT): pelvic floor, prenatal, postnatal, diastasis recti. Book on WhatsApp.",
    h1: "Women's healthcare in Bengaluru (Bangalore)",
    intro:
      "In Bengaluru (Bangalore), Dr. Zalak Shah (PT) sees women in person for women's health physiotherapy and STOTT Pilates on Mat and Reformer. Care covers pelvic floor rehabilitation, prenatal and postnatal physiotherapy, diastasis recti, and musculoskeletal rehab for women. Visits are by appointment, and follow-up sessions can continue online. When you need medical input, Dr. Charmi Shah (OB-GYN, IVF and laparoscopy) consults online and sees patients in person in Mumbai, Ahmedabad and Valsad.",
    doctors: [
      {
        name: "Dr. Zalak Shah (PT)",
        role: "Women's health physiotherapy & STOTT Pilates",
        profilePath: ROUTES.drZalak,
      },
      {
        name: "Dr. Charmi Shah",
        role: "OB-GYN & IVF (Mumbai, Ahmedabad & Valsad in person; online where appropriate)",
        profilePath: ROUTES.drCharmi,
      },
    ],
    highlights: [
      "Pelvic floor–aware training integrated with physiotherapy assessment",
      "Prenatal and postnatal pathways with Pilates-informed exercise",
      "Mat and Reformer STOTT Pilates for progressive strength and mobility",
      "Shared Women's Health Duo contact for booking and questions",
    ],
    drZalakGoogleBusinessPresentation: "bangalore-primary",
  },
};
