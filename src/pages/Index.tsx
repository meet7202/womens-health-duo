import { lazy, Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { SeoHead } from "@/components/seo/SeoHead";

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
  return (
    <div className="min-h-screen bg-background">
      <SeoHead />
      <JsonLd />
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <HeroSection />
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
      </main>
      <Suspense fallback={<div className="h-32 bg-foreground" aria-hidden />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
