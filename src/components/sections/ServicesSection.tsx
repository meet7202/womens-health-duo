import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Baby,
  Heart,
  Flower2,
  Dumbbell,
  Stethoscope,
  Activity,
  Sparkles,
  Users,
  Video,
  Scissors,
  HeartPulse,
  Move,
  Zap,
  ShieldCheck,
} from "lucide-react";

const services = [
  {
    category: "Dr. Charmi Shah",
    tagline: "Obstetrics, Gynecology, IVF & Laparoscopy",
    color: "primary",
    items: [
      {
        icon: Baby,
        title: "Pregnancy & High-Risk Obstetrics",
        description: "Comprehensive antenatal care, high-risk pregnancy management, and safe delivery support.",
      },
      {
        icon: Flower2,
        title: "IVF & Fertility Treatments",
        description: "Advanced reproductive techniques including IVF, IUI, ovulation induction, and complete infertility workup.",
      },
      {
        icon: Scissors,
        title: "Laparoscopic Surgery",
        description: "Minimally invasive surgical procedures for fibroids, ovarian cysts, endometriosis, and hysterectomy.",
      },
      {
        icon: HeartPulse,
        title: "PCOS & Hormonal Disorders",
        description: "Expert management of polycystic ovarian syndrome, menstrual irregularities, and hormonal imbalances.",
      },
      {
        icon: Stethoscope,
        title: "Gynecological Care",
        description: "Routine check-ups, Pap smears, cervical cancer screening, and treatment of infections.",
      },
      {
        icon: ShieldCheck,
        title: "Menopause & Wellness",
        description: "Compassionate care for menopausal symptoms, osteoporosis prevention, and women's wellness.",
      },
    ],
  },
  {
    category: "Dr. Zalak Shah",
    tagline: "Women's Health Physiotherapy & Pilates",
    color: "terracotta",
    items: [
      {
        icon: Activity,
        title: "Pelvic Floor Rehabilitation",
        description: "Specialized treatment for pelvic floor dysfunction, urinary incontinence, pelvic organ prolapse, and pelvic pain.",
      },
      {
        icon: Baby,
        title: "Antenatal & Postnatal Care",
        description: "Pregnancy exercises, birth preparation, diastasis recti treatment, and postpartum recovery programs.",
      },
      {
        icon: Dumbbell,
        title: "STOTT Pilates",
        description: "Certified Pilates instruction for core strength, flexibility, posture correction, and overall fitness.",
      },
      {
        icon: Move,
        title: "Musculoskeletal Physiotherapy",
        description: "Treatment for back pain, neck pain, joint issues, and sports injuries specific to women.",
      },
      {
        icon: Zap,
        title: "Core & Functional Training",
        description: "Personalized exercise programs for core stability, strength building, and functional movement.",
      },
      {
        icon: Sparkles,
        title: "Women's Wellness Programs",
        description: "Holistic rehabilitation combining physiotherapy and Pilates for optimal health outcomes.",
      },
    ],
  },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Our Services</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mt-4 mb-6">
            Comprehensive <span className="text-primary italic">Care</span> for Every Woman
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            From fertility and pregnancy to postpartum recovery and beyond, we offer integrated 
            healthcare solutions tailored to your unique needs.
          </p>
        </motion.div>

        {/* Online Consultation Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-primary/10 rounded-2xl p-6 mb-12 text-center border border-primary/20"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Video className="w-6 h-6 text-primary" />
            <h3 className="font-heading text-xl font-semibold text-foreground">Online Consultations Available</h3>
          </div>
          <p className="text-muted-foreground">
            Can't visit in person? Book a video consultation from the comfort of your home. 
            Get expert advice from both our specialists remotely.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="space-y-16">
          {services.map((serviceGroup, groupIndex) => (
            <motion.div
              key={serviceGroup.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: groupIndex * 0.2 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  <h3 className="font-heading text-2xl font-semibold text-foreground">
                    {serviceGroup.category}
                  </h3>
                </div>
                <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full">
                  {serviceGroup.tagline}
                </span>
              </div>

              {/* Service Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceGroup.items.map((service, index) => (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 * index + groupIndex * 0.3 }}
                    className="group bg-background rounded-2xl p-6 shadow-soft border border-border/30 hover:shadow-card hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-heading text-xl font-semibold text-foreground mb-2">
                      {service.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-4">
            Not sure which service you need?
          </p>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Book a consultation to discuss your needs
            <span>→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
