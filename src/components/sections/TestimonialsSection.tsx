import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Monika Kothari",
    text: "I was experiencing significant discomfort due to menopause. I consulted Dr. Charmi, and she provided me with exceptional care. Not only did she help me with the side effects, but her guidance and prescribed medications also helped regulate my menstrual cycle. I am truly grateful for her expertise and support. Thank you, Dr. Charmi—you are truly a genius.",
    rating: 5,
    doctor: "Dr. Charmi Shah",
    source: "Google Review",
  },
  {
    name: "Vaishali Kale",
    text: "Dr. Charmi is an exceptional surgeon with remarkable skill and precision. She combines medical expertise with deep compassion, ensuring her patients feel supported every step of the way. Her dedication to patient care goes beyond the operating room, providing comfort and confidence during recovery. She listens attentively, explains thoroughly, and treats every patient with kindness and respect.",
    rating: 5,
    doctor: "Dr. Charmi Shah",
    source: "Google Review",
  },
  {
    name: "Saleha Mansuri",
    text: "From the moment I arrived, the staff was friendly and welcoming. The treatment I received was excellent and reasonably priced, making healthcare accessible for everyone. Dr. Charmi is truly outstanding.",
    rating: 5,
    doctor: "Dr. Charmi Shah",
    source: "Google Review",
  },
  {
    name: "Chaitali Zaveri",
    text: "In my 9th month pregnancy all of a sudden I started having horrible pelvic pain, which restricted me in any kind of movements like walking, getting up, sitting down, etc. My pain was so severe that pain killers were also not working. Dr Zalak did some case study and showed me exercises which would help in relieving my pain. Within 2-3 days I was able to walk properly without support. My pain got decreased by 70-80% within a week. I highly recommend Dr Zalak for any women physiotherapy related challenges.",
    rating: 5,
    doctor: "Dr. Zalak Shah",
    source: "Google Review",
  },
  {
    name: "Ekta Ruhalyan",
    text: "Zalak mam is one of the few people who I really want to thank for making my pregnancy period much smoother. Under her guidance I enjoyed doing antenatal exercises. Birth prep session by her helped and motivated me till the delivery time. Thank you for all the support and care. Keep serving the society especially mothers with your great work.",
    rating: 5,
    doctor: "Dr. Zalak Shah",
    source: "Google Review",
  },
  {
    name: "Hir Patel",
    text: "Over the last few months, Pilates has completely transformed my life. Not only has it strengthened my body, improving my posture and core stability, but it has also become a powerful tool for stress relief and mental clarity. I feel more connected to my body, moving with greater ease and confidence. What started as a workout has become a form of self-care, leaving me feeling stronger, more balanced, and truly rejuvenated, with all thanks to Dr. Zalak Shah for believing in me and making me believe in myself.",
    rating: 5,
    doctor: "Dr. Zalak Shah",
    source: "Google Review",
  },
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mt-4 mb-6">
            What Our <span className="text-primary italic">Patients</span> Say
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Real experiences from women who trusted us with their health journey.
          </p>
        </motion.div>

        {/* Ratings Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          <div className="flex items-center gap-4 bg-card rounded-2xl px-6 py-4 shadow-soft">
            <div>
              <p className="font-heading text-3xl font-semibold text-foreground">4.9</p>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground">Dr. Charmi Shah</p>
              <p className="text-sm text-muted-foreground">41 Google Reviews</p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-card rounded-2xl px-6 py-4 shadow-soft">
            <div>
              <p className="font-heading text-3xl font-semibold text-foreground">5.0</p>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground">Dr. Zalak Shah</p>
              <p className="text-sm text-muted-foreground">23 Google Reviews</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-card rounded-2xl p-6 shadow-soft border border-border/30 hover:shadow-card transition-shadow duration-300"
            >
              <Quote className="w-8 h-8 text-primary/20 mb-4" />
              <p className="text-foreground leading-relaxed mb-4 text-sm">
                "{testimonial.text}"
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border/50">
                <div>
                  <p className="font-medium text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.doctor}</p>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
