import { useParams } from "react-router-dom";
import { AppNavigate as Navigate } from "@/components/router/AppNavigate";
import NotFound from "@/pages/NotFound";
import { ZALAK_GROUP_CLASS_CONTENT } from "@/data/zalakGroupClasses";

/**
 * Nested `/dr-zalak-shah/*-classes/` aliases redirect to short canonical class URLs.
 * Unknown class slugs are true not-found (SEO-33/F) — do not canonicalize to the doctor profile.
 * Edge 301/308 remains the preferred permanent redirect (see `docs/seo-cloudflare-redirects.md`).
 */
export function ZalakGroupClassPage() {
  const { classSlug } = useParams<{ classSlug: string }>();
  const content = classSlug
    ? Object.values(ZALAK_GROUP_CLASS_CONTENT).find((item) => item.slug === classSlug)
    : undefined;

  if (content) {
    return <Navigate to={content.path} replace />;
  }

  return <NotFound />;
}
