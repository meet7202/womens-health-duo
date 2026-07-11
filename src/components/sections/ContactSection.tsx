import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { Phone, MapPin, Clock, Instagram, Youtube, MessageCircle, Users, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CONTACT } from "@/config/site";
import {
  PRACTICE_CHARMI_LOCATIONS_LINE,
  PRACTICE_ZALAK_LOCATIONS_LINE,
} from "@/config/practiceLocations";
import { whatsappIntentFromPathname, whatsappUrlWithMessage } from "@/lib/whatsappCta";
import { ROUTES } from "@/config/routes";
import { BookingMedicalDisclaimer } from "@/components/compliance/BookingMedicalDisclaimer";
import { WHATSAPP_COMMUNITY_INVITE_URL } from "@/config/whatsappCommunity";

export const ContactSection = () => {
  const location = useLocation();
  const directWhatsAppHref = useMemo(
    () => whatsappUrlWithMessage(whatsappIntentFromPathname(location.pathname)),
    [location.pathname],
  );
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

    const doctorName =
      doctor === "charmi"
        ? "Dr. Charmi Shah (OBG & IVF)"
        : doctor === "zalak"
          ? "Dr. Zalak Shah (Women's Health Physio & Pilates)"
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

    setIsSubmitting(false);
    window.open(whatsappUrlWithMessage(message), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="pt-24 pb-10 bg-secondary/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Contact Us
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mt-4 mb-6">
            Book Your <span className="text-primary italic">Consultation</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Fastest way to reach us: use our{" "}
            <Link
              to={ROUTES.bookConsultation}
              className="text-primary underline underline-offset-4"
            >
              Book consultation
            </Link>{" "}
            form (patient details + telemedicine consent) or message on{" "}
            <strong className="text-foreground font-medium">WhatsApp</strong>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-12 flex flex-col items-center justify-center gap-3 text-center"
        >
          <Button asChild size="lg" variant="default" className="px-8 py-6 text-base">
            <Link to={ROUTES.bookConsultation}>Book teleconsultation</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-[#25D366] hover:bg-[#1ebe57] text-white border-0 shadow-lg px-8 py-6 text-base"
          >
            <a href={directWhatsAppHref} target="_blank" rel="noopener noreferrer">
              <span className="inline-flex items-center gap-2">
                <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
                Book on WhatsApp , direct message
              </span>
            </a>
          </Button>
          <p className="text-sm text-muted-foreground max-w-md">
            Same WhatsApp as the rest of this site ({CONTACT.phoneE164}). This is a{" "}
            <strong className="text-foreground font-medium">private chat with the practice</strong>,
            not a public group.
          </p>
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
                  <option value="zalak">
                    Dr. Zalak Shah (Women&apos;s Health Physio &amp; Pilates)
                  </option>
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
                    Send details in WhatsApp
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Submit opens a <strong className="text-foreground">direct WhatsApp chat</strong>{" "}
                with Women&apos;s Health Duo using the same practice number as our green buttons,
                not a community group.
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
              <p className="text-sm text-primary font-medium mb-3">
                Obstetrician & Gynecologist, IVF Specialist
              </p>
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
                  <span>{PRACTICE_CHARMI_LOCATIONS_LINE}</span>
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
              <p className="text-sm text-primary font-medium mb-3">
                Women's Health Physiotherapist & Pilates Instructor
              </p>
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
                  <span>{PRACTICE_ZALAK_LOCATIONS_LINE}</span>
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
                <Button
                  asChild
                  variant="default"
                  className="w-full bg-[#25D366] hover:bg-[#1ebe57]"
                >
                  <a href={directWhatsAppHref} target="_blank" rel="noopener noreferrer">
                    <span className="inline-flex items-center justify-center gap-2">
                      <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
                      Book on WhatsApp
                    </span>
                  </a>
                </Button>
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-primary hover:underline underline-offset-4"
                >
                  <Instagram className="w-6 h-6 shrink-0" />
                  @womenshealthduo on Instagram
                </a>
                <a
                  href={CONTACT.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-primary hover:underline underline-offset-4"
                >
                  <Youtube className="w-6 h-6 shrink-0" />
                  Women&apos;s Health Duo on YouTube
                </a>
                <p className="text-sm text-muted-foreground">
                  A holistic approach to women's health! Follow us for tips on pregnancy, fertility,
                  pelvic health, and wellness.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mx-auto mt-14 max-w-2xl rounded-2xl border border-border/50 bg-muted/30 p-6 text-center"
        >
          <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
            <Users className="h-5 w-5 shrink-0 text-muted-foreground" aria-hidden />
            <h3 className="font-heading inline-flex flex-wrap items-center justify-center gap-2 text-base font-semibold text-foreground">
              <span>Women&apos;s Health Duo community</span>
              <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
                Free
              </span>
            </h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Come join us for health tips, workshop updates, and real conversations with other women
            on similar journeys, learning together in a friendly WhatsApp space. This community is
            for inspiration and connection, not for booking consults or personal medical advice.{" "}
            <strong className="text-foreground">To book, use the direct WhatsApp</strong> buttons
            above (private chat with the practice).
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link to={ROUTES.freeWomensHealthCommunity}>Learn more about the free community</Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={WHATSAPP_COMMUNITY_INVITE_URL} target="_blank" rel="noopener noreferrer">
                Join on WhatsApp
              </a>
            </Button>
          </div>
        </motion.div>

        <BookingMedicalDisclaimer className="max-w-3xl mx-auto mt-6" />
      </div>
    </section>
  );
};
