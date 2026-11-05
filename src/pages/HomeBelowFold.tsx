import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { AppLink as Link } from "@/components/router/AppLink";
import { ROUTES } from "@/config/routes";
import { publicPathname } from "@/lib/githubPagesPublicUrl";
import { HOME_PAGE_FAQ } from "@/data/homePageFaq";

/**
 * Below-the-fold homepage body in a separate chunk so hero/header paint without
 * framer-motion or section JS on the critical path (Lighthouse unused-JS / SI).
 */
export default function HomeBelowFold() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
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
        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}
