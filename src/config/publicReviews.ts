import type { DoctorSlug } from "@/data/doctorProfiles";
import { EXTERNAL } from "@/config/externalProfiles";

/**
 * Optional public-review provenance for on-page trust signals (SEO-18).
 * A star-only badge (`4.9★`) may use an owner-confirmed `rating` without a source URL.
 * Review counts and AggregateRating JSON-LD still require rating + reviewCount + asOf + `sourceUrl`.
 * Never store `reviewCount` until `sourceUrl` is set.
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
 * Owner-confirmed figures (9 Nov 2026; star-only display confirmed 18 Nov 2026).
 * Homepage name badges show the star only (`5.0★`, `4.9★`) — never the review count.
 * Charmi's count stays unpublished until a Google Business / reviews `sourceUrl` exists.
 * Do not re-add her `reviewCount` without that URL. Do not emit AggregateRating JSON-LD.
 */
export const PUBLIC_REVIEW_PROVENANCE: Record<DoctorSlug, PublicReviewProvenance> = {
  charmi: {
    sourceLabel: "Google reviews",
    rating: 4.9,
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

/** Star figure for the homepage name badge. Does not authorize a review count. */
export function publicReviewStarRating(p: PublicReviewProvenance): number | undefined {
  return typeof p.rating === "number" ? p.rating : undefined;
}

/** Safe accessors — return undefined unless aggregate provenance is complete. */
export function publicReviewRating(p: PublicReviewProvenance): number | undefined {
  return publicReviewHasAggregate(p) ? p.rating : undefined;
}

export function publicReviewCount(p: PublicReviewProvenance): number | undefined {
  return publicReviewHasAggregate(p) ? p.reviewCount : undefined;
}
