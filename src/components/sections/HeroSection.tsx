import { motion } from "framer-motion";
import { Heart, ArrowDown, MessageCircle } from "lucide-react";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { appRouterTo } from "@/lib/githubPagesPublicUrl";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { HOME_HERO_LEDE } from "@/config/site";
import { homePermalinkForScrollId } from "@/lib/homeSectionPaths";
import { HOME_DEFAULT_H1 } from "@/lib/pageSeoCopy";
import { whatsappIntentFromPathname, whatsappUrlWithMessage } from "@/lib/whatsappCta";
import { cn } from "@/lib/utils";
import heroImage from "@/assets/hero-doctors.jpg";

const heroH1VisualClass =
  "font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-5 text-[hsl(20_28%_11%)] [text-shadow:0_1px_0_hsl(30_40%_99%),0_0_24px_hsl(30_40%_98%_/_0.9)] text-balance";

export type HeroSectionProps = {
  /**
   * Homepage section permalink (`/about`, …): use as the sole document `<h1>` (same string as
   * `<title>` from `homeSectionSeo`). The default marketing headline moves to a styled paragraph.
   */
  seoH1?: string | null;
};

const heroDoctorCardClass = "rounded-2xl bg-background/95 p-4 shadow-card backdrop-blur-sm";

type HeroDoctorCardProps = {
  title: string;
  subtitle: string;
  className?: string;
  initialX?: number;
  delay?: number;
};

function HeroDoctorCard({
  title,
  subtitle,
  className,
  initialX = 0,
  delay = 0.8,
}: HeroDoctorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: initialX }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={cn(heroDoctorCardClass, className)}
    >
      <p className="font-heading text-lg font-semibold text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </motion.div>
  );
}

export const HeroSection = ({ seoH1 = null }: HeroSectionProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookWhatsAppHref = useMemo(
    () => whatsappUrlWithMessage(whatsappIntentFromPathname(location.pathname)),
    [location.pathname],
  );
  const resolvedSeoH1 = seoH1?.trim() || null;

  const goToHomeSection = (scrollId: string) => {
    const path = homePermalinkForScrollId(scrollId);
    if (path) {
      void navigate(appRouterTo(path), { replace: true });
      return;
    }
    void navigate(appRouterTo({ pathname: ROUTES.home, hash: scrollId }), { replace: true });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-start gradient-hero overflow-hidden md:items-center"
    >
      {/* Decorative elements ,  keep low opacity so headline stays crisp */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-rose-light/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cream/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
          {/* Copy ,  second on mobile so the photo is above the fold */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 text-center md:order-1 md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 border border-primary/25 bg-primary/15 px-4 py-2 rounded-full mb-6 shadow-sm"
            >
              <Heart className="w-4 h-4 text-terracotta" aria-hidden />
              <span className="text-sm font-semibold text-terracotta">
                OB-GYN · IVF · Women&apos;s Health Physio · Pilates
              </span>
            </motion.div>

            {resolvedSeoH1 ? (
              <>
                <h1 className={heroH1VisualClass}>{resolvedSeoH1}</h1>
                <p className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold leading-snug mb-5 text-[hsl(20_22%_18%)] text-balance">
                  {HOME_DEFAULT_H1}
                </p>
              </>
            ) : (
              <h1 className={heroH1VisualClass}>{HOME_DEFAULT_H1}</h1>
            )}

            <p className="text-base sm:text-lg max-w-xl mx-auto md:mx-0 mb-4 leading-relaxed font-medium text-[hsl(20_22%_18%)]">
              {HOME_HERO_LEDE}
            </p>

            <p className="text-base sm:text-lg max-w-xl mx-auto md:mx-0 mb-8 leading-relaxed text-[hsl(20_22%_18%)]">
              Led by Dr. Charmi Shah (OB-GYN, IVF, laparoscopy) and Dr. Zalak Shah (women&apos;s
              health physiotherapy and STOTT Pilates on Mat &amp; Reformer).
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start max-w-xl mx-auto md:mx-0">
              <Button
                size="lg"
                asChild
                className="bg-[#25D366] hover:bg-[#1ebe57] text-white border-0 shadow-elevated text-base px-8 py-6 min-h-[3.25rem] sm:min-w-[12rem]"
              >
                <a href={bookWhatsAppHref} target="_blank" rel="noopener noreferrer">
                  <span className="inline-flex items-center justify-center gap-2">
                    <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
                    Book on WhatsApp
                  </span>
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => goToHomeSection("services")}
                className="border-primary/35 text-foreground hover:bg-primary/5 text-base px-8 py-6 min-h-[3.25rem] sm:min-w-[12rem]"
              >
                View services
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex justify-center md:justify-start gap-8 mt-12 pt-8 border-t border-border/50"
            >
              <div className="text-center">
                <p className="font-heading text-3xl font-bold text-primary">4.9★</p>
                <p className="text-sm font-medium text-[hsl(20_18%_28%)]">Google Rating</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-3xl font-bold text-primary">5000+</p>
                <p className="text-sm font-medium text-[hsl(20_18%_28%)]">Patients Treated</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-3xl font-bold text-primary">10+</p>
                <p className="text-sm font-medium text-[hsl(20_18%_28%)]">Years Experience</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Image ,  first on mobile so it shows without scrolling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0, duration: 0.55 }}
            className="relative order-1 mx-auto w-full max-w-md md:order-2 md:mx-0 md:max-w-none"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={heroImage}
                alt="Dr. Charmi Shah and Dr. Zalak Shah ,  Women's Health Duo"
                className="h-full w-full object-cover"
                width={640}
                height={800}
                sizes="(min-width: 768px) 45vw, 100vw"
                decoding="async"
                loading="eager"
              />
              {/* Mobile: bottom scrim only (legible names); desktop: full gradient unchanged */}
              <div className="absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-foreground/55 to-transparent md:hidden" />
              <div className="absolute inset-0 hidden bg-gradient-to-t from-foreground/40 via-foreground/10 to-transparent md:block" />
              <div className="absolute bottom-4 left-4 right-4 text-white sm:bottom-6 sm:left-6 sm:right-6 md:bottom-6 md:left-6 md:right-6">
                <p className="font-heading text-lg font-semibold drop-shadow-lg sm:text-2xl">
                  Dr. Charmi &amp; Dr. Zalak Shah
                </p>
                <p className="text-sm text-white drop-shadow-md font-medium sm:text-base">
                  Sisters in Care, Partners in Health
                </p>
              </div>
            </div>

            {/* Desktop: match live site (womenshealthduo.com) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -right-4 top-1/4 max-md:hidden bg-background/95 backdrop-blur-sm rounded-2xl p-4 shadow-card"
            >
              <p className="font-heading text-lg font-semibold text-foreground">
                Obstetrician &amp; Gynecologist
              </p>
              <p className="text-sm text-muted-foreground">
                IVF Specialist &amp; Laparoscopic Surgeon
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -left-4 bottom-1/4 max-md:hidden bg-background/95 backdrop-blur-sm rounded-2xl p-4 shadow-card"
            >
              <p className="font-heading text-lg font-semibold text-foreground">
                Women&apos;s Health Physiotherapy
              </p>
              <p className="text-sm text-muted-foreground">
                STOTT Pilates &amp; pelvic / prenatal care
              </p>
            </motion.div>

            {/* Mobile: below photo so badges never cover faces */}
            <div className="mt-4 grid gap-3 sm:grid-cols-2 md:hidden">
              <HeroDoctorCard
                title="Obstetrician & Gynecologist"
                subtitle="IVF Specialist & Laparoscopic Surgeon"
                initialX={0}
                delay={0.85}
              />
              <HeroDoctorCard
                title="Women's Health Physiotherapy"
                subtitle="STOTT Pilates & pelvic / prenatal care"
                initialX={0}
                delay={0.95}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.button
          type="button"
          aria-label="Scroll to about"
          onClick={() => goToHomeSection("about")}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="p-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowDown className="w-6 h-6" aria-hidden />
        </motion.button>
      </motion.div>
    </section>
  );
};
