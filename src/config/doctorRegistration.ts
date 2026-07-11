import type { DoctorSlug } from "../data/doctorProfiles";

/** Medical council registration — required under India's Telemedicine Practice Guidelines (March 2020). */
export type DoctorRegistration = {
  registrationNumber: string;
  registrationCouncil: string;
  /** Year of registration with the council (when known). */
  yearRegistered?: number;
  yearsExperience: string;
};

/**
 * Single source for registration numbers on doctor profiles, telemedicine policy, and schema.
 */
export const DOCTOR_REGISTRATION: Record<DoctorSlug, DoctorRegistration> = {
  charmi: {
    registrationNumber: "G-62388",
    registrationCouncil: "Gujarat Medical Council",
    yearRegistered: 2018,
    yearsExperience: "10+ years",
  },
  zalak: {
    registrationNumber: "GPC-7598",
    registrationCouncil: "Gujarat State Council for Physiotherapy (GSCPT)",
    yearsExperience: "6+ years",
  },
};

export function doctorRegistrationLine(slug: DoctorSlug): string {
  const r = DOCTOR_REGISTRATION[slug];
  const year = r.yearRegistered ? ` (${r.yearRegistered})` : "";
  return `${r.registrationCouncil} Reg. No. ${r.registrationNumber}${year}`;
}
