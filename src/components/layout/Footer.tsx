import { Heart, Instagram, Youtube, MessageCircle, Mail, Phone } from "lucide-react";
import { CONTACT } from "@/config/site";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-background" />
              </div>
              <h3 className="font-heading text-xl font-semibold">Women's Health Duo</h3>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Two sisters, one mission: comprehensive women's healthcare combining medical expertise
              with physiotherapy and wellness.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Testimonials", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-background/70 hover:text-background transition-colors text-sm underline-offset-4 hover:underline"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Connect</h4>
            <div className="space-y-2 text-sm text-background/70">
              <a
                href={`tel:${CONTACT.phoneE164}`}
                className="flex items-center gap-2 rounded-md hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/50"
              >
                <Phone className="w-4 h-4" />
                +91-7990550754
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2 rounded-md hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/50"
              >
                <Mail className="w-4 h-4" />
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/50"
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </a>
              <a
                href={CONTACT.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/50"
              >
                <Youtube className="w-4 h-4" />
                YouTube
              </a>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/50"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 text-center text-sm text-background/50">
          <p>© {new Date().getFullYear()} Women's Health Duo. All rights reserved.</p>
          <p className="mt-1">Dr. Charmi Shah (Mumbai) & Dr. Zalak Shah (Bangalore) | India</p>
        </div>
      </div>
    </footer>
  );
};
