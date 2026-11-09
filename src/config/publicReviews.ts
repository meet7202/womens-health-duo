import type { DoctorSlug } from "@/data/doctorProfiles";
import { EXTERNAL } from "@/config/externalProfiles";

/**
 * Optional public-review provenance for on-page trust signals (SEO-18).
 * Numeric aggregate badges require rating + reviewCount + asOf + a verifiable `sourceUrl`.
 * Do not emit AggregateRating JSON-LD (or on-page rating/count copy) without that URL.
 * Never store rating/reviewCount on a doctor entry until `sourceUrl` is set — callers must not
 * need to remember the gate for unsourced figures to stay unpublished.
 */
export type PublicReviewProvenance = {
  /** ISO date (YYYY-MM-DD) when rating/count were last checked. */
  asOf?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  rating?: number;
  reviewCount?: number;
};

/**
 * Owner-confirmed figures (9 Nov 2026).
 * Charmi prior snapshot (4.9 / 41) is held until a Google Business / reviews `sourceUrl` exists —
 * do not re-add rating/reviewCount without that URL.
 */
export const PUBLIC_REVIEW_PROVENANCE: Record<DoctorSlug, PublicReviewProvenance> = {
  charmi: {
    sourceLabel: "Google reviews",
  },
  zalak: {
    asOf: "2026-11-09",
    sourceUrl: EXTERNAL.drZalak.googleReviewsShare,
    sourceLabel: "Google reviews",
    rating: 5.0,
    reviewCount: 27,
  },
};

/** True when on-page aggregate rating/count copy is authorized (requires live source URL). */
export function publicReviewHasAggregate(p: PublicReviewProvenance): boolean {
  return Boolean(
    p.asOf && p.sourceUrl && typeof p.rating === "number" && typeof p.reviewCount === "number",
  );
}

/** Safe accessors — return undefined unless aggregate provenance is complete. */
export function publicReviewRating(p: PublicReviewProvenance): number | undefined {
  return publicReviewHasAggregate(p) ? p.rating : undefined;
}

export function publicReviewCount(p: PublicReviewProvenance): number | undefined {
  return publicReviewHasAggregate(p) ? p.reviewCount : undefined;
}
