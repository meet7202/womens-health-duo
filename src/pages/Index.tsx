import { lazy, Suspense, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToHashWhenReady } from "@/lib/scrollToHash";
import { homeFaqJsonLdPageUrl, homeScrollTargetId, homeSectionSeo } from "@/lib/homeSectionPaths";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { JsonLdFaq } from "@/components/seo/JsonLdFaq";
import { SeoHead } from "@/components/seo/SeoHead";
import { SITE_URL } from "@/config/site";
import { HOME_PAGE_FAQ } from "@/data/homePageFaq";

/**
 * Hero + chrome stay eager. Below-the-fold sections (and framer-motion) load in a
 * separate chunk so LCP is not blocked by About/Services/Contact JS.
 */
const HomeBelowFold = lazy(() => import("./HomeBelowFold"));

const Index = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    const rawHash = location.hash.replace(/^#/, "").trim();
    const hashTarget = rawHash || null;
    const pathTarget = homeScrollTargetId(location.pathname);
    const targetId = hashTarget ?? pathTarget;
    if (!targetId) return;
    return scrollToHashWhenReady(targetId);
  }, [location.hash, location.pathname]);

  const sectionSeo = homeSectionSeo(location.pathname);

  return (
    <div className="min-h-screen bg-background">
      {/* SEO-25: prefer prerendered hero <picture>; build may inject matching homepage-only preload. */}
      <SeoHead
        {...(sectionSeo
          ? {
              title: sectionSeo.title,
              metaDescription: sectionSeo.metaDescription,
              path: sectionSeo.canonicalPath,
            }
          : {})}
      />
      <JsonLd />
      <JsonLdFaq
        items={HOME_PAGE_FAQ}
        pageUrl={homeFaqJsonLdPageUrl(SITE_URL, location.pathname)}
      />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="pb-28">
        <HeroSection />
        <Suspense fallback={<div className="min-h-[40vh] bg-background" aria-hidden="true" />}>
          <HomeBelowFold />
        </Suspense>
      </main>
    </div>
  );
};

export default Index;
