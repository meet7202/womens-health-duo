import type { DoctorSlug } from "../data/doctorProfiles";
import { doctorPhotoAlt, doctorPhotoTitle } from "../lib/mediaSeo";
import drCharmi320w from "../assets/dr-charmi-320w.jpg";
import drCharmi480w from "../assets/dr-charmi-480w.jpg";
import drCharmi640w from "../assets/dr-charmi-640w.jpg";
import drCharmi320wWebp from "../assets/dr-charmi-320w.webp";
import drCharmi480wWebp from "../assets/dr-charmi-480w.webp";
import drCharmi640wWebp from "../assets/dr-charmi-640w.webp";
import drZalak320w from "../assets/dr-zalak-320w.jpg";
import drZalak480w from "../assets/dr-zalak-480w.jpg";
import drZalak640w from "../assets/dr-zalak-640w.jpg";
import drZalak320wWebp from "../assets/dr-zalak-320w.webp";
import drZalak480wWebp from "../assets/dr-zalak-480w.webp";
import drZalak640wWebp from "../assets/dr-zalak-640w.webp";

/**
 * Stable public path for Dr. Zalak's prior portrait — keep for JSON-LD / crawlers when the
 * on-site display photo updates (`public/images/dr-zalak-shah.jpg` mirrors `src/assets/dr-zalak.jpg`).
 */
export const DR_ZALAK_SEO_IMAGE_PATH = "/images/dr-zalak-shah.jpg";

export type DoctorPhotoMeta = {
  /** Photo shown in UI (Vite-bundled asset). */
  displaySrc: string;
  /** Intrinsic display dimensions (responsive UI). */
  width: number;
  height: number;
  alt: string;
  /** Short label for `title` attribute (Google Images context). */
  title: string;
  /** Optional stable site path for schema when displaySrc differs (pathname only). */
  seoImagePath?: string;
  /** Dimensions of bytes at `seoImagePath` / schema contentUrl (SEO-22). */
  seoWidth?: number;
  seoHeight?: number;
  /** Responsive JPEG `srcset`. */
  srcSetJpeg: string;
  /** Responsive WebP `srcset`. */
  srcSetWebp: string;
};

export const DOCTOR_PHOTOS: Record<DoctorSlug, DoctorPhotoMeta> = {
  charmi: {
    /** `<img src>` fallback — keep ≤640w so missing srcset never pulls a full portrait. */
    displaySrc: drCharmi640w,
    width: 640,
    height: 772,
    alt: doctorPhotoAlt("charmi"),
    title: doctorPhotoTitle("charmi"),
    srcSetJpeg: `${drCharmi320w} 320w, ${drCharmi480w} 480w, ${drCharmi640w} 640w`,
    srcSetWebp: `${drCharmi320wWebp} 320w, ${drCharmi480wWebp} 480w, ${drCharmi640wWebp} 640w`,
  },
  zalak: {
    displaySrc: drZalak640w,
    width: 640,
    height: 721,
    alt: doctorPhotoAlt("zalak"),
    title: doctorPhotoTitle("zalak"),
    seoImagePath: DR_ZALAK_SEO_IMAGE_PATH,
    seoWidth: 479,
    seoHeight: 563,
    srcSetJpeg: `${drZalak320w} 320w, ${drZalak480w} 480w, ${drZalak640w} 640w`,
    srcSetWebp: `${drZalak320wWebp} 320w, ${drZalak480wWebp} 480w, ${drZalak640wWebp} 640w`,
  },
};
