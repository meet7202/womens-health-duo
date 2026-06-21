import { cn } from "@/lib/utils";

type InclusiveSeoListFootnoteProps = {
  /** What kind of list this follows (wording only). */
  variant: "cities" | "countries" | "services" | "city-services";
  className?: string;
};

const COPY: Record<InclusiveSeoListFootnoteProps["variant"], string> = {
  cities:
    "…and many more cities worldwide, we offer the same online visits wherever you live. If yours is not listed, message us on WhatsApp or email.",
  countries:
    "…and many more countries and regions, we welcome patients globally. Contact us if your country is not shown.",
  services:
    "…and more visit types and questions by arrangement, tell us what you need if you do not see a match.",
  "city-services":
    "…and more visit types by arrangement. We welcome patients in many more cities worldwide than appear on this site, WhatsApp or email us from anywhere.",
};

/**
 * Short inclusive line after curated SEO lists (not exhaustive).
 */
export function InclusiveSeoListFootnote({ variant, className }: InclusiveSeoListFootnoteProps) {
  return (
    <p className={cn("mt-3 text-sm text-muted-foreground leading-relaxed", className)}>
      {COPY[variant]}
    </p>
  );
}
