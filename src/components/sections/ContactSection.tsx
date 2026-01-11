import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, MapPin, Clock, Instagram, MessageCircle, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const WHATSAPP_NUMBER = "917990550754";
const WHATSAPP_COMMUNITY_LINK = "https://chat.whatsapp.com/IzlxjOf8wp9GqMdSbCQ3Xj";

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const doctor = formData.get("doctor") as string;
    const concern = formData.get("concern") as string;

    const doctorName = doctor === "charmi" 
      ? "Dr. Charmi Shah (OBG & IVF)" 
      : doctor === "zalak" 
        ? "Dr. Zalak Shah (Physio & Pilates)" 
        : "Not sure - Need guidance";

    const message = `*New Consultation Request*

*Name:* ${firstName} ${lastName}
*Email:* ${email}
*Phone:* ${phone}
*Preferred Doctor:* ${doctorName}

*Health Concern:*
${concern}

---
Sent from Women's Health Duo Website`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    setIsSubmitting(false);
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section id="contact" className="py-24 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">Contact Us</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mt-4 mb-6">
            Book Your <span className="text-primary italic">Consultation</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Ready to take the next step in your health journey? Fill out the form below 
            and we'll connect you with the right specialist.
          </p>
        </motion.div>

        {/* WhatsApp Community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-2xl p-6 mb-12 text-center border border-green-500/20"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <Users className="w-6 h-6 text-green-600" />
            <h3 className="font-heading text-xl font-semibold text-foreground">Join Our WhatsApp Community</h3>
          </div>
          <p className="text-muted-foreground mb-4">
            Get exclusive health tips, updates on workshops, and connect with other women on their wellness journey.
          </p>
          <a
            href={WHATSAPP_COMMUNITY_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              Join WhatsApp Community
            </Button>
          </a>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background rounded-3xl p-8 shadow-card border border-border/30"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="Your first name"
                    className="bg-secondary/50 border-border/50 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="Your last name"
                    className="bg-secondary/50 border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="bg-secondary/50 border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="bg-secondary/50 border-border/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doctor">Preferred Doctor</Label>
                <select
                  id="doctor"
                  name="doctor"
                  className="w-full h-10 px-3 rounded-md bg-secondary/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground"
                >
                  <option value="">Select a doctor</option>
                  <option value="charmi">Dr. Charmi Shah (OBG & IVF)</option>
                  <option value="zalak">Dr. Zalak Shah (Physio & Pilates)</option>
                  <option value="both">Not sure - Need guidance</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="concern">Health Concern / Query *</Label>
                <Textarea
                  id="concern"
                  name="concern"
                  required
                  placeholder="Please describe your health concern or what you'd like to consult about..."
                  rows={4}
                  className="bg-secondary/50 border-border/50 focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white shadow-soft py-6"
              >
                {isSubmitting ? (
                  "Opening WhatsApp..."
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Send via WhatsApp
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Clicking submit will open WhatsApp with your consultation details pre-filled.
              </p>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Dr. Charmi Info */}
            <div className="bg-background rounded-2xl p-6 shadow-soft border border-border/30">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                Dr. Charmi Shah
              </h3>
              <p className="text-sm text-primary font-medium mb-3">Obstetrician & Gynecologist, IVF Specialist</p>
              <div className="space-y-3">
                <a
                  href="tel:+917990550754"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  +91-7990550754
                </a>
                <a
                  href="mailto:womenshealthduo@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  womenshealthduo@gmail.com
                </a>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Mumbai, India</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  Mon-Fri: 10am-7pm | Sat: 10am-1pm
                </div>
              </div>
            </div>

            {/* Dr. Zalak Info */}
            <div className="bg-background rounded-2xl p-6 shadow-soft border border-border/30">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                Dr. Zalak Shah (PT)
              </h3>
              <p className="text-sm text-primary font-medium mb-3">Women's Health Physiotherapist & Pilates Instructor</p>
              <div className="space-y-3">
                <a
                  href="tel:+917990550754"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5 text-primary" />
                  +91-7990550754
                </a>
                <a
                  href="mailto:womenshealthduo@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  womenshealthduo@gmail.com
                </a>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Bangalore, India</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  Mon-Sat: 9am-5pm
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                Connect With Us
              </h3>
              <div className="space-y-3">
                <a
                  href="https://www.instagram.com/womenshealthduo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-primary hover:underline"
                >
                  <Instagram className="w-6 h-6" />
                  @womenshealthduo
                </a>
                <p className="text-sm text-muted-foreground">
                  A holistic approach to women's health! Follow us for tips on pregnancy, fertility, 
                  pelvic health, and wellness.
                </p>
                <div className="pt-3">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
