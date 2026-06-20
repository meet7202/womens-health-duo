import { SITE_URL, SITE_NAME } from "@/config/site";

export type Crumb = { name: string; path: string };

export function breadcrumbListSchema(items: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${item.path}`,
    })),
  };
}

export function webPageSchema(params: {
  path: string;
  name: string;
  description: string;
  aboutId?: string;
}) {
  const url = params.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${params.path}`;
  const base: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: params.name,
    description: params.description,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
  };
  if (params.aboutId) {
    base.about = { "@id": params.aboutId };
  }
  return base;
}
