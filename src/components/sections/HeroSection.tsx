import { Heart, ArrowDown, MessageCircle } from "lucide-react";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { appRouterTo } from "@/lib/githubPagesPublicUrl";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { HOME_HERO_LEDE } from "@/config/site";
import { homePermalinkForScrollId } from "@/lib/homeSectionPaths";
import { HOME_DEFAULT_H1, HOME_DEFAULT_H1_SUBTITLE } from "@/lib/pageSeoCopy";
import { trackWhatsAppClick } from "@/lib/analytics";
import { whatsappIntentFromPathname, whatsappUrlWithMessage } from "@/lib/whatsappCta";
import { cn } from "@/lib/utils";
import heroImage640 from "@/assets/hero-doctors-640w.jpg";
import heroImage800 from "@/assets/hero-doctors-800w.jpg";
import heroImage960 from "@/assets/hero-doctors-960w.jpg";
import heroImage1280 from "@/assets/hero-doctors-1280w.jpg";
import heroImage1536 from "@/assets/hero-doctors-1536w.jpg";
import heroImage640Webp from "@/assets/hero-doctors-640w.webp";
import heroImage800Webp from "@/assets/hero-doctors-800w.webp";
import heroImage960Webp from "@/assets/hero-doctors-960w.webp";
import heroImage1280Webp from "@/assets/hero-doctors-1280w.webp";
import heroImage1536Webp from "@/assets/hero-doctors-1536w.webp";
import { HERO_IMAGE_ALT, HERO_IMAGE_TITLE } from "@/lib/mediaSeo";

/** Shared with Index preload so LCP discovery matches the responsive `<picture>`. */
export const HERO_IMAGE_SIZES = "(min-width: 768px) min(45vw, 560px), min(100vw, 448px)";
export const HERO_WEBP_SRCSET = `${heroImage640Webp} 640w, ${heroImage800Webp} 800w, ${heroImage960Webp} 960w, ${heroImage1280Webp} 1280w, ${heroImage1536Webp} 1536w`;
export const HERO_JPEG_SRCSET = `${heroImage640} 640w, ${heroImage800} 800w, ${heroImage960} 960w, ${heroImage1280} 1280w, ${heroImage1536} 1536w`;

const heroH1VisualClass =
  "font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-5 text-[hsl(20_28%_11%)] [text-shadow:0_1px_0_hsl(30_40%_99%),0_0_24px_hsl(30_40%_98%_/_0.9)] text-balance";

const heroDoctorCardClass = "rounded-2xl bg-background/95 p-4 shadow-card backdrop-blur-sm";

type HeroDoctorCardProps = {
  title: string;
  subtitle: string;
  className?: string;
};

function HeroDoctorCard({ title, subtitle, className }: HeroDoctorCardProps) {
  return (
    <div className={cn(heroDoctorCardClass, className)}>
      <p className="font-heading text-lg font-semibold text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

export const HeroSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const bookWhatsAppHref = useMemo(
    () => whatsappUrlWithMessage(whatsappIntentFromPathname(location.pathname)),
    [location.pathname],
  );
  const handleWhatsAppClick = () =>
    trackWhatsAppClick({
      ctaPlacement: "hero",
      pagePath: location.pathname,
    });

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
          {/* Primary copy stays visible on first paint (SEO-28) — no opacity-0 entrance. */}
          <div className="order-2 text-center md:order-1 md:text-left">
            <div className="inline-flex items-center gap-2 border border-primary/25 bg-primary/15 px-4 py-2 rounded-full mb-6 shadow-sm">
              <Heart className="w-4 h-4 text-terracotta" aria-hidden />
              <span className="text-sm font-semibold text-terracotta">
                OB-GYN · IVF · Women&apos;s Health Physio · Pilates
              </span>
            </div>

            <h1 className={heroH1VisualClass}>{HOME_DEFAULT_H1}</h1>
            <p className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold leading-snug mb-5 text-[hsl(20_22%_18%)] text-balance">
              {HOME_DEFAULT_H1_SUBTITLE}
            </p>

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
                className="bg-whatsapp hover:bg-whatsapp-hover text-white border-0 shadow-elevated text-base px-8 py-6 min-h-[3.25rem] sm:min-w-[12rem]"
              >
                <a
                  href={bookWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                >
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
            <div className="flex justify-center md:justify-start gap-8 mt-12 pt-8 border-t border-border/50">
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
            </div>
          </div>

          {/* Image ,  first on mobile so it shows without scrolling */}
          <div className="relative order-1 mx-auto w-full max-w-md md:order-2 md:mx-0 md:max-w-none">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elevated">
              <picture>
                <source type="image/webp" srcSet={HERO_WEBP_SRCSET} sizes={HERO_IMAGE_SIZES} />
                <source type="image/jpeg" srcSet={HERO_JPEG_SRCSET} sizes={HERO_IMAGE_SIZES} />
                <img
                  src={heroImage640}
                  alt={HERO_IMAGE_ALT}
                  title={HERO_IMAGE_TITLE}
                  className="h-full w-full object-cover"
                  width={640}
                  height={800}
                  sizes={HERO_IMAGE_SIZES}
                  decoding="async"
                  loading="eager"
                  fetchPriority="high"
                />
              </picture>
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
            <div className="absolute -right-4 top-1/4 max-md:hidden bg-background/95 backdrop-blur-sm rounded-2xl p-4 shadow-card">
              <p className="font-heading text-lg font-semibold text-foreground">
                Obstetrician &amp; Gynecologist
              </p>
              <p className="text-sm text-muted-foreground">
                IVF Specialist &amp; Laparoscopic Surgeon
              </p>
            </div>

            <div className="absolute -left-4 bottom-1/4 max-md:hidden bg-background/95 backdrop-blur-sm rounded-2xl p-4 shadow-card">
              <p className="font-heading text-lg font-semibold text-foreground">
                Women&apos;s Health Physiotherapy
              </p>
              <p className="text-sm text-muted-foreground">
                STOTT Pilates &amp; pelvic / prenatal care
              </p>
            </div>

            {/* Mobile: below photo so badges never cover faces */}
            <div className="mt-4 grid gap-3 sm:grid-cols-2 md:hidden">
              <HeroDoctorCard
                title="Obstetrician & Gynecologist"
                subtitle="IVF Specialist & Laparoscopic Surgeon"
              />
              <HeroDoctorCard
                title="Women's Health Physiotherapy"
                subtitle="STOTT Pilates & pelvic / prenatal care"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <button
          type="button"
          aria-label="Scroll to about"
          onClick={() => goToHomeSection("about")}
          className="p-2 text-muted-foreground hover:text-primary transition-colors motion-safe:animate-bounce"
        >
          <ArrowDown className="w-6 h-6" aria-hidden />
        </button>
      </div>
    </section>
  );
};
