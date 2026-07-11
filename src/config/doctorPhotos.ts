import type { DoctorSlug } from "../data/doctorProfiles";
import { doctorPhotoAlt, doctorPhotoTitle } from "../lib/mediaSeo";
import drCharmi from "../assets/dr-charmi.jpeg";
import drZalakDisplay from "../assets/dr-zalak.jpeg";

/**
 * Stable public path for Dr. Zalak's prior portrait — keep for JSON-LD / crawlers when the
 * on-site display photo updates (`public/images/dr-zalak-shah.jpg` mirrors `src/assets/dr-zalak.jpg`).
 */
export const DR_ZALAK_SEO_IMAGE_PATH = "/images/dr-zalak-shah.jpg";

export type DoctorPhotoMeta = {
  /** Photo shown in UI (Vite-bundled asset). */
  displaySrc: string;
  width: number;
  height: number;
  alt: string;
  /** Short label for `title` attribute (Google Images context). */
  title: string;
  /** Optional stable site path for schema when displaySrc differs (pathname only). */
  seoImagePath?: string;
};

export const DOCTOR_PHOTOS: Record<DoctorSlug, DoctorPhotoMeta> = {
  charmi: {
    displaySrc: drCharmi,
    width: 849,
    height: 1024,
    alt: doctorPhotoAlt("charmi"),
    title: doctorPhotoTitle("charmi"),
  },
  zalak: {
    displaySrc: drZalakDisplay,
    width: 1182,
    height: 1331,
    alt: doctorPhotoAlt("zalak"),
    title: doctorPhotoTitle("zalak"),
    seoImagePath: DR_ZALAK_SEO_IMAGE_PATH,
  },
};
