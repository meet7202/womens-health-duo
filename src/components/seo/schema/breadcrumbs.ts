import { SITE_URL, SITE_NAME } from "@/config/site";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";

export type Crumb = { name: string; path: string };

export type Review = {
  name: string;
  quote: string;
  context?: string;
};

export function breadcrumbListSchema(items: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: githubPagesAbsoluteUrl(SITE_URL, item.path),
    })),
  };
}

export function webPageSchema(params: {
  path: string;
  name: string;
  description: string;
  aboutId?: string;
}) {
  const url = githubPagesAbsoluteUrl(SITE_URL, params.path);
  const base: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: params.name,
    description: params.description,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: githubPagesAbsoluteUrl(SITE_URL, "/"),
    },
  };
  if (params.aboutId) {
    base.about = { "@id": params.aboutId };
  }
  return base;
}

export function reviewSchema(params: {
  reviews: Review[];
  itemReviewed: string;
  pageUrl: string;
}) {
  return {
    "@type": "AggregateRating",
    itemReviewed: {
      "@type": "Service",
      name: params.itemReviewed,
    },
    ratingValue: "5",
    reviewCount: params.reviews.length.toString(),
    review: params.reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      reviewBody: review.quote,
    })),
  };
}
