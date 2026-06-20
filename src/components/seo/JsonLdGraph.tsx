type JsonLdGraphProps = {
  graph: Record<string, unknown>[];
};

/** Additional `@graph` payload (breadcrumb, WebPage, FAQPage, etc.). */
export function JsonLdGraph({ graph }: JsonLdGraphProps) {
  const payload = { "@context": "https://schema.org", "@graph": graph };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
