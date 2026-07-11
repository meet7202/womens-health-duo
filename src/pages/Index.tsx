import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToHashWhenReady } from "@/lib/scrollToHash";
import { homeFaqJsonLdPageUrl, homeScrollTargetId, homeSectionSeo } from "@/lib/homeSectionPaths";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { JsonLdFaq } from "@/components/seo/JsonLdFaq";
import { SeoHead } from "@/components/seo/SeoHead";
import { FaqSection } from "@/components/sections/FaqSection";
import { ROUTES } from "@/config/routes";
import { publicPathname } from "@/lib/githubPagesPublicUrl";
import { SITE_URL } from "@/config/site";
import { HOME_PAGE_FAQ } from "@/data/homePageFaq";
import { Button } from "@/components/ui/button";
import { AppLink as Link } from "@/components/router/AppLink";

/**
 * Home sections are imported eagerly (not `lazy`) so production never depends on
 * extra hashed chunk files for the first paint. That avoids 404s when HTML or the
 * entry bundle is briefly out of sync with `/assets/*` after a deploy or CDN swap.
 */

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
        <HeroSection seoH1={sectionSeo?.h1 ?? null} />
        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
        <FaqSection
          items={HOME_PAGE_FAQ}
          tightTop
          headingTitle={"Women's Health Duo ,  quick answers"}
          headingIntro="Five common questions about our education platform, clinical lanes, and how to book. Medical decisions belong in a consultation with your clinician."
        />
        <div className="container mx-auto max-w-3xl px-4 pb-16 text-center sm:px-6 lg:px-8">
          <Button variant="outline" asChild>
            <Link to={publicPathname(ROUTES.faq)}>View all questions (FAQ)</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
