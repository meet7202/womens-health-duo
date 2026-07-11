import { DOCTOR_BY_SLUG, type DoctorSlug } from "@/data/doctorProfiles";
import { whatsappUrlWithMessage } from "@/lib/whatsappCta";

export type ConsultationMode = "video" | "audio" | "chat";
export type ConsultationVisitType = "first" | "follow-up";

export type BookingFormData = {
  doctor: DoctorSlug | "";
  consultationMode: ConsultationMode;
  visitType: ConsultationVisitType;
  fullName: string;
  ageOrDob: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  country: string;
  emergencyContact: string;
  chiefComplaint: string;
  symptomDuration: string;
  severity: string;
  currentMedications: string;
  allergies: string;
  previousDiagnosis: string;
  previousSurgeries: string;
  pregnancyStatus: string;
  breastfeeding: string;
  familyHistory: string;
  height: string;
  weight: string;
  bloodPressure: string;
  bloodSugar: string;
  recentInvestigations: string;
  consentTimestamp: string;
};

export const BOOKING_STEPS = [
  "Choose doctor",
  "Consultation type",
  "Patient details",
  "Medical history",
  "Consent",
  "Review & book",
] as const;

export function defaultBookingFormData(): BookingFormData {
  return {
    doctor: "",
    consultationMode: "video",
    visitType: "first",
    fullName: "",
    ageOrDob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    country: "",
    emergencyContact: "",
    chiefComplaint: "",
    symptomDuration: "",
    severity: "",
    currentMedications: "",
    allergies: "",
    previousDiagnosis: "",
    previousSurgeries: "",
    pregnancyStatus: "",
    breastfeeding: "",
    familyHistory: "",
    height: "",
    weight: "",
    bloodPressure: "",
    bloodSugar: "",
    recentInvestigations: "",
    consentTimestamp: "",
  };
}

function line(label: string, value: string): string | null {
  const v = value.trim();
  return v ? `*${label}:* ${v}` : null;
}

export function buildBookingWhatsAppMessage(data: BookingFormData): string {
  const doctor = data.doctor ? DOCTOR_BY_SLUG[data.doctor] : null;
  const doctorLabel = doctor?.name ?? "Not selected";

  const modeLabel =
    data.consultationMode === "video"
      ? "Video"
      : data.consultationMode === "audio"
        ? "Audio"
        : "Chat (WhatsApp)";

  const visitLabel =
    data.visitType === "first"
      ? "First consultation (new patient / new condition / >6 months)"
      : "Follow-up (same doctor, same condition, within 6 months)";

  const sections = [
    "*Teleconsultation booking request — Women's Health Duo*",
    "",
    "*Doctor:* " + doctorLabel,
    "*Consultation mode:* " + modeLabel,
    "*Visit type:* " + visitLabel,
    "",
    "*Patient details*",
    ...[
      line("Full name", data.fullName),
      line("Age / DOB", data.ageOrDob),
      line("Gender", data.gender),
      line("Phone", data.phone),
      line("Email", data.email),
      line("Address", data.address),
      line("Country", data.country),
      line("Emergency contact", data.emergencyContact),
    ].filter(Boolean),
    "",
    "*Medical history*",
    ...[
      line("Chief complaint", data.chiefComplaint),
      line("Duration", data.symptomDuration),
      line("Severity", data.severity),
      line("Current medications", data.currentMedications),
      line("Allergies", data.allergies),
      line("Previous diagnosis", data.previousDiagnosis),
      line("Previous surgeries", data.previousSurgeries),
      line("Pregnancy status", data.pregnancyStatus),
      line("Breastfeeding", data.breastfeeding),
      line("Family history", data.familyHistory),
      line("Height", data.height),
      line("Weight", data.weight),
      line("Blood pressure", data.bloodPressure),
      line("Blood sugar", data.bloodSugar),
      line("Recent investigations", data.recentInvestigations),
    ].filter(Boolean),
    "",
    "*Documents:* Please attach lab reports, imaging, and government ID in this chat when relevant.",
    "",
    `*Telemedicine consent accepted:* ${data.consentTimestamp || new Date().toISOString()}`,
    "",
    "Payment and slot confirmation will be coordinated in this chat.",
    "---",
    "Sent via womenshealthduo.com/book-consultation",
  ];

  return sections.join("\n");
}

export function openBookingWhatsApp(data: BookingFormData): void {
  window.open(
    whatsappUrlWithMessage(buildBookingWhatsAppMessage(data)),
    "_blank",
    "noopener,noreferrer",
  );
}

export const TELEMEDICINE_CONSENT_STORAGE_KEY = "whd-telemedicine-consent-at";

export function recordTelemedicineConsentTimestamp(): string {
  const iso = new Date().toISOString();
  try {
    localStorage.setItem(TELEMEDICINE_CONSENT_STORAGE_KEY, iso);
  } catch {
    /* private browsing / storage blocked */
  }
  return iso;
}

export function lastTelemedicineConsentTimestamp(): string | null {
  try {
    return localStorage.getItem(TELEMEDICINE_CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function validateBookingStep(step: number, data: BookingFormData): string | null {
  switch (step) {
    case 0:
      return data.doctor ? null : "Please select a doctor.";
    case 1:
      return data.consultationMode ? null : "Please select a consultation mode.";
    case 2:
      if (!data.fullName.trim()) return "Full name is required.";
      if (!data.ageOrDob.trim()) return "Age or date of birth is required.";
      if (!data.gender.trim()) return "Gender is required.";
      if (!data.phone.trim()) return "Phone number is required.";
      if (!data.email.trim()) return "Email is required.";
      if (!data.address.trim()) return "Complete address is required.";
      if (!data.country.trim()) return "Country is required.";
      return null;
    case 3:
      if (!data.chiefComplaint.trim()) return "Chief complaint is required.";
      return null;
    case 4:
      if (!data.consentTimestamp) return "Telemedicine consent is required.";
      return null;
    default:
      return null;
  }
}
