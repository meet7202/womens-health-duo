import { ROUTES } from "@/config/routes";

export type CityKey = "ahmedabad" | "mumbai" | "bangalore";

export type CityPageData = {
  key: CityKey;
  path: string;
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
    title: "Women's Health Duo in Ahmedabad | OB-GYN, IVF & Women's Health Physio",
    metaDescription:
      "Online-first: Women's Health Duo in Ahmedabad for Dr. Charmi Shah (OB-GYN, IVF, laparoscopy) and Dr. Zalak Shah (women's health physio, STOTT Pilates). Global telehealth from the same practice.",
    h1: "Women's healthcare in Ahmedabad",
    intro:
      "Online consults worldwide use the same practice number and email—many families book video visits before or after travel to India. On the ground in Ahmedabad, Dr. Charmi Shah provides obstetrics, gynecology, IVF, and laparoscopic surgery with evidence-based treatment and clear communication. Dr. Zalak Shah offers women's health physiotherapy and STOTT Pilates–aligned training for Mat and Reformer, supporting pregnancy, postpartum, pelvic floor, and musculoskeletal goals.",
    doctors: [
      {
        name: "Dr. Charmi Shah",
        role: "OB-GYN, IVF & laparoscopic surgery",
        profilePath: ROUTES.drCharmi,
      },
      {
        name: "Dr. Zalak Shah",
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
    title: "Women's Health Duo in Mumbai | OB-GYN, IVF & Laparoscopy",
    metaDescription:
      "Online-first for NRIs: Women's Health Duo in Mumbai with Dr. Charmi Shah — OB-GYN, IVF, laparoscopy; Dr. Zalak Shah online physio / Pilates worldwide.",
    h1: "Women's healthcare in Mumbai",
    intro:
      "If you are abroad, start with an online OB-GYN or physio consult—telehealth is central to how Women's Health Duo serves NRIs and global families. In Mumbai, Dr. Charmi Shah leads obstetrics, gynecology, IVF, and minimally invasive surgical care with structured prenatal and high-risk pregnancy planning, fertility workups, and laparoscopic options where appropriate. Dr. Zalak Shah's physiotherapy and STOTT Pilates work is available online worldwide and in person in Bangalore and Ahmedabad.",
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
  bangalore: {
    key: "bangalore",
    path: ROUTES.bangalore,
    title: "Women's Health Duo in Bangalore | Women's Health Physio & STOTT Pilates",
    metaDescription:
      "Online-first women's health physio: Dr. Zalak Shah in Bengaluru (Bangalore) for physiotherapy & STOTT Pilates; Dr. Charmi Shah for online OB-GYN worldwide and in-person OB-GYN in Mumbai and Ahmedabad.",
    h1: "Women's healthcare in Bengaluru (Bangalore)",
    intro:
      "Online women's health physio and Pilates programs are how most international patients train with Dr. Zalak first—book from any time zone. In Bengaluru (Bangalore), she leads in-person women's health physiotherapy and STOTT Pilates on Mat and Reformer. Care spans pelvic floor rehabilitation, prenatal and postnatal programs, diastasis recti, and musculoskeletal rehab tailored to women. Dr. Charmi Shah offers online OB-GYN consultations worldwide and in-person OB-GYN in Mumbai and Ahmedabad—use the contact channels to coordinate.",
    doctors: [
      {
        name: "Dr. Zalak Shah",
        role: "Women's health physiotherapy & STOTT Pilates",
        profilePath: ROUTES.drZalak,
      },
      {
        name: "Dr. Charmi Shah",
        role: "OB-GYN & IVF (Mumbai & Ahmedabad in person; online where appropriate)",
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
