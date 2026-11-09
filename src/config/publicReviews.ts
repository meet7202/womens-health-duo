import type { DoctorSlug } from "@/data/doctorProfiles";
import { EXTERNAL } from "@/config/externalProfiles";

/**
 * Optional public-review provenance for on-page trust signals (SEO-18).
 * On-page star badges need rating + reviewCount + asOf (owner-authorized).
 * Prefer a live Google Business / reviews `sourceUrl` when available; Charmi has no share URL yet.
 * Do not emit AggregateRating JSON-LD from these figures without a verifiable source URL.
 */
export type PublicReviewProvenance = {
  /** ISO date (YYYY-MM-DD) when rating/count were last checked. */
  asOf?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  rating?: number;
  reviewCount?: number;
};

/** Owner-confirmed prior on-page figures (9 Nov 2026): Charmi 4.9 / 41; Zalak 5.0 / 27. */
export const PUBLIC_REVIEW_PROVENANCE: Record<DoctorSlug, PublicReviewProvenance> = {
  charmi: {
    asOf: "2026-11-09",
    sourceLabel: "Google reviews",
    rating: 4.9,
    reviewCount: 41,
  },
  zalak: {
    asOf: "2026-11-09",
    sourceUrl: EXTERNAL.drZalak.googleReviewsShare,
    sourceLabel: "Google reviews",
    rating: 5.0,
    reviewCount: 27,
  },
};

/** True when on-page aggregate badge copy is authorized. */
export function publicReviewHasAggregate(p: PublicReviewProvenance): boolean {
  return Boolean(p.asOf && typeof p.rating === "number" && typeof p.reviewCount === "number");
}
