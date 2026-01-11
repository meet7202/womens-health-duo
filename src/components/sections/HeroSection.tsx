import { motion } from "framer-motion";
import { Heart, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-doctors.jpg";
import drZalak from "@/assets/dr-zalak.png";
import drCharmi from "@/assets/dr-charmi.jpeg";

export const HeroSection = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-rose-light/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cream/50 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full mb-6 shadow-sm"
            >
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Two Sisters, One Mission</span>
            </motion.div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold leading-tight mb-6" style={{ color: 'hsl(20 15% 12%)' }}>
              A Holistic Approach to{" "}
              <span className="text-primary italic font-bold">Women's Health</span>
            </h1>

            <p className="text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed font-medium" style={{ color: 'hsl(20 10% 35%)' }}>
              Comprehensive care from pregnancy to postpartum, fertility to pelvic health. 
              We combine medical expertise with physiotherapy and pilates for complete wellness.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => scrollToSection("#contact")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-elevated text-base px-8 py-6"
              >
                Book Online Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("#about")}
                className="border-primary/30 text-foreground hover:bg-primary/5 text-base px-8 py-6"
              >
                Meet the Doctors
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex justify-center lg:justify-start gap-8 mt-12 pt-8 border-t border-border/50"
            >
              <div className="text-center">
                <p className="font-heading text-3xl font-semibold text-primary">4.9★</p>
                <p className="text-sm text-muted-foreground">Google Rating</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-3xl font-semibold text-primary">5000+</p>
                <p className="text-sm text-muted-foreground">Patients Treated</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-3xl font-semibold text-primary">10+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-elevated">
              <img 
                src={heroImage} 
                alt="Dr. Charmi Shah and Dr. Zalak Shah - Women's Health Duo"
                className="w-full h-full object-cover"
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
              <p className="font-heading text-lg font-semibold text-foreground">Obstetrician & Gynecologist</p>
              <p className="text-sm text-muted-foreground">IVF Specialist & Laparoscopic Surgeon</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -left-4 bottom-1/4 bg-background/95 backdrop-blur-sm rounded-2xl p-4 shadow-card"
            >
              <p className="font-heading text-lg font-semibold text-foreground">Women's Health Physiotherapist</p>
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollToSection("#about")}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="p-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </section>
  );
};
