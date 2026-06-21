import { lazy, Suspense, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { scrollToHashWhenReady } from "@/lib/scrollToHash";
import { homeFaqJsonLdPageUrl, homeScrollTargetId, homeSectionSeo } from "@/lib/homeSectionPaths";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { JsonLdFaq } from "@/components/seo/JsonLdFaq";
import { SeoHead } from "@/components/seo/SeoHead";
import { FaqSection } from "@/components/sections/FaqSection";
import { ROUTES } from "@/config/routes";
import { SITE_URL } from "@/config/site";
import { HOME_PAGE_FAQ } from "@/data/homePageFaq";
import { Button } from "@/components/ui/button";

const AboutSection = lazy(() =>
  import("@/components/sections/AboutSection").then((m) => ({ default: m.AboutSection })),
);
const ServicesSection = lazy(() =>
  import("@/components/sections/ServicesSection").then((m) => ({ default: m.ServicesSection })),
);
const TestimonialsSection = lazy(() =>
  import("@/components/sections/TestimonialsSection").then((m) => ({
    default: m.TestimonialsSection,
  })),
);
const ContactSection = lazy(() =>
  import("@/components/sections/ContactSection").then((m) => ({ default: m.ContactSection })),
);
const Footer = lazy(() =>
  import("@/components/layout/Footer").then((m) => ({ default: m.Footer })),
);

function SectionFallback() {
  return (
    <div
      className="min-h-[40vh] w-full animate-pulse motion-reduce:animate-none bg-muted/25"
      aria-hidden
    />
  );
}

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
        <HeroSection seoH1={sectionSeo?.title ?? null} />
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
        <FaqSection
          items={HOME_PAGE_FAQ}
          headingTitle={"Women's Health Duo ,  quick answers"}
          headingIntro="Five common questions about our education platform, clinical lanes, and how to book. Medical decisions belong in a consultation with your clinician."
        />
        <div className="container mx-auto max-w-3xl px-4 pb-16 text-center sm:px-6 lg:px-8">
          <Button variant="outline" asChild>
            <Link to={ROUTES.faq}>View all questions (FAQ)</Link>
          </Button>
        </div>
      </main>
      <Suspense fallback={<div className="h-32 bg-foreground" aria-hidden />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
