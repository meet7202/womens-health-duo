import { motion } from "framer-motion";
import { Heart, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import heroImage from "@/assets/hero-doctors.jpg";

export const HeroSection = () => {
  const navigate = useNavigate();

  const goToHomeSection = (hash: string) => {
    void navigate({ pathname: ROUTES.home, hash }, { replace: true });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-start gradient-hero overflow-hidden md:items-center"
    >
      {/* Decorative elements — keep low opacity so headline stays crisp */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-rose-light/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cream/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16 items-center">
          {/* Copy — second on mobile so the photo is above the fold */}
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
              <Heart className="w-4 h-4 text-terracotta" />
              <span className="text-sm font-semibold text-terracotta">
                OB-GYN · IVF · Physio · STOTT Pilates
              </span>
            </motion.div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-6 text-[hsl(20_28%_11%)] [text-shadow:0_1px_0_hsl(30_40%_99%),0_0_24px_hsl(30_40%_98%_/_0.9)]">
              A Holistic Approach to{" "}
              <span className="text-[hsl(12_58%_36%)] italic font-extrabold">
                Women&apos;s Health
              </span>
            </h1>

            <p className="text-lg sm:text-xl max-w-xl mx-auto md:mx-0 mb-8 leading-relaxed font-semibold text-[hsl(20_22%_18%)]">
              Comprehensive care from pregnancy to postpartum, fertility to pelvic health. We
              combine medical expertise with physiotherapy and STOTT Pilates for complete wellness.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start max-w-xl mx-auto md:mx-0">
              <Button
                size="lg"
                onClick={() => goToHomeSection("contact")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elevated text-base px-8 py-6 min-h-[3.25rem] sm:min-w-[12rem]"
              >
                Book consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => goToHomeSection("about")}
                className="border-primary/35 text-foreground hover:bg-primary/5 text-base px-8 py-6 min-h-[3.25rem] sm:min-w-[12rem]"
              >
                Meet the Sisters
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

          {/* Image — first on mobile so it shows without scrolling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0, duration: 0.55 }}
            className="relative order-1 mx-auto w-full max-w-md md:order-2 md:mx-0 md:max-w-none"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elevated">
              <img
                src={heroImage}
                alt="Dr. Charmi Shah and Dr. Zalak Shah — Women's Health Duo"
                className="h-full w-full object-cover"
                width={640}
                height={800}
                sizes="(min-width: 768px) 45vw, 100vw"
                decoding="async"
                fetchPriority="high"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-foreground/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="font-heading text-2xl font-semibold drop-shadow-lg">
                  Dr. Charmi & Dr. Zalak Shah
                </p>
                <p className="text-white drop-shadow-md font-medium">
                  Sisters in Care, Partners in Health
                </p>
              </div>
            </div>

            {/* Floating cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute -right-4 top-1/4 bg-background/95 backdrop-blur-sm rounded-2xl p-4 shadow-card"
            >
              <p className="font-heading text-lg font-semibold text-foreground">
                Obstetrician & Gynecologist
              </p>
              <p className="text-sm text-muted-foreground">IVF Specialist & Laparoscopic Surgeon</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -left-4 bottom-1/4 bg-background/95 backdrop-blur-sm rounded-2xl p-4 shadow-card"
            >
              <p className="font-heading text-lg font-semibold text-foreground">
                Women's Health Physiotherapist
              </p>
              <p className="text-sm text-muted-foreground">& Pilates Instructor</p>
            </motion.div>
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
          aria-label="Scroll to About section"
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
