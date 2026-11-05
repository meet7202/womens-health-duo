import type { DoctorSlug } from "@/data/doctorProfiles";
import { EXTERNAL } from "@/config/externalProfiles";

/**
 * Optional public-review provenance for on-page trust signals (SEO-18).
 * Only emit rating / reviewCount when both `asOf` and `sourceUrl` are set by an owner refresh.
 * Do not invent aggregate numbers or foreign-law summaries.
 */
export type PublicReviewProvenance = {
  /** ISO date (YYYY-MM-DD) when rating/count were last checked. */
  asOf?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  rating?: number;
  reviewCount?: number;
};

export const PUBLIC_REVIEW_PROVENANCE: Record<DoctorSlug, PublicReviewProvenance> = {
  charmi: {
    // No verified Google Business share URL in repo yet — omit aggregates until owner adds asOf + sourceUrl.
  },
  zalak: {
    sourceUrl: EXTERNAL.drZalak.googleReviewsShare,
    sourceLabel: "Google reviews",
    // rating / reviewCount / asOf intentionally omitted until owner re-checks live GBP.
  },
};

export function publicReviewHasAggregate(p: PublicReviewProvenance): boolean {
  return Boolean(
    p.asOf && p.sourceUrl && typeof p.rating === "number" && typeof p.reviewCount === "number",
  );
}
