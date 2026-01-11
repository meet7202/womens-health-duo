import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Stethoscope, Heart, Award, GraduationCap, Users } from "lucide-react";
import drZalak from "@/assets/dr-zalak.jpg";
import drCharmi from "@/assets/dr-charmi.jpeg";

const doctors = [
  {
    name: "Dr. Charmi Shah",
    title: "Obstetrician & Gynecologist, IVF Specialist & Laparoscopic Surgeon",
    description:
      "Dr. Charmi Shah holds an MBBS and MS in Obstetrics & Gynecology, with specialized fellowship training in Laparoscopy and IVF. With over a decade of clinical experience, she has successfully managed thousands of high-risk pregnancies, complex gynecological surgeries, and fertility treatments. Her expertise spans minimally invasive laparoscopic procedures, advanced reproductive techniques, and comprehensive women's healthcare.",
    specialties: ["Obstetrics & Gynecology", "IVF & Fertility", "Laparoscopic Surgery", "High-Risk Pregnancy", "PCOS Management", "Menopause Care"],
    rating: "4.9",
    reviews: "41",
    location: "Mumbai, India",
    phone: "+91-7990550754",
    icon: Stethoscope,
    image: drCharmi,
  },
  {
    name: "Dr. Zalak Shah (PT)",
    title: "Women's Health Physiotherapist & Pilates Instructor",
    description:
      "Dr. Zalak Shah is a qualified Physiotherapist with a Bachelor's and Master's degree in Physiotherapy, certified as a STOTT Pilates Instructor. With years of experience across leading hospitals and her fully-equipped Pilates studio, she integrates evidence-based physiotherapy with Pilates methodology to deliver superior patient outcomes. Her holistic approach addresses pelvic health, pre and postnatal care, and musculoskeletal rehabilitation.",
    specialties: ["Pelvic Floor Rehabilitation", "Antenatal & Postnatal Care", "STOTT Pilates", "Diastasis Recti", "Urinary Incontinence", "Core Strengthening"],
    rating: "5.0",
    reviews: "23",
    location: "Bangalore, India",
    phone: "+91-7990550754",
    icon: Heart,
    image: drZalak,
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">About Us</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mt-4 mb-6">
            Meet the <span className="text-primary italic">Sisters</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Two sisters united by their passion for women's health, combining medical expertise 
            with physiotherapy to provide holistic care at every stage of life.
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-card rounded-3xl p-8 shadow-card border border-border/50 hover:shadow-elevated transition-shadow duration-300"
            >
              <div className="flex flex-col items-center text-center gap-6">
                <div className="w-40 h-48 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col items-center gap-2 mb-2">
                    <h3 className="font-heading text-2xl font-semibold text-foreground">
                      {doctor.name}
                    </h3>
                    <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                      {doctor.rating}★ ({doctor.reviews} reviews)
                    </span>
                  </div>
                  <p className="text-primary font-medium mb-4">{doctor.title}</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {doctor.description}
                  </p>

                  {/* Specialties */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {doctor.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="bg-secondary text-secondary-foreground text-xs font-medium px-3 py-1.5 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* Contact Info */}
                  <div className="pt-4 border-t border-border/50 space-y-2">
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-sage/20 flex items-center justify-center text-xs">📍</span>
                      {doctor.location}
                    </p>
                    <p className="text-sm text-foreground font-medium flex items-center justify-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center text-xs">📞</span>
                      {doctor.phone}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: GraduationCap, label: "Medical Experts", value: "MBBS, MS (OBG), BPT, MPT" },
            { icon: Award, label: "Experience", value: "10+ Years Combined" },
            { icon: Users, label: "Patients Treated", value: "5000+" },
            { icon: Stethoscope, label: "Specializations", value: "12+ Areas" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-accent/50 border border-border/30"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="font-heading text-lg font-semibold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
