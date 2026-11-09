import type { DoctorSlug } from "@/data/doctorProfiles";
import { EXTERNAL } from "@/config/externalProfiles";

/**
 * Optional public-review provenance for on-page trust signals (SEO-18).
 * Numeric aggregate badges require rating + reviewCount + asOf + a verifiable `sourceUrl`.
 * Do not emit AggregateRating JSON-LD (or on-page rating/count copy) without that URL.
 * Charmi’s figures may be stored for a future GBP link; they must not show as aggregates until sourced.
 */
export type PublicReviewProvenance = {
  /** ISO date (YYYY-MM-DD) when rating/count were last checked. */
  asOf?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  rating?: number;
  reviewCount?: number;
};

/** Owner-confirmed prior figures (9 Nov 2026). Zalak has a share URL; Charmi does not yet. */
export const PUBLIC_REVIEW_PROVENANCE: Record<DoctorSlug, PublicReviewProvenance> = {
  charmi: {
    asOf: "2026-11-09",
    sourceLabel: "Google reviews",
    rating: 4.9,
    reviewCount: 41,
    // No verified Google Business share URL — omit aggregate badge until owner adds sourceUrl.
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
