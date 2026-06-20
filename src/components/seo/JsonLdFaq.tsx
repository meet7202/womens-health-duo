import type { FaqItem } from "@/data/siteFaq";

type JsonLdFaqProps = {
  items: FaqItem[];
  /** Canonical URL of the page where this FAQ is visible */
  pageUrl: string;
};

export function JsonLdFaq({ items, pageUrl }: JsonLdFaqProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: pageUrl,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
