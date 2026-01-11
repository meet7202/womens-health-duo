import { Heart, Instagram, MessageCircle, Mail, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "917990550754";

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
              Two sisters, one mission: comprehensive women's healthcare combining 
              medical expertise with physiotherapy and wellness.
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
                    className="text-background/70 hover:text-background transition-colors text-sm"
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
                href="tel:+917990550754" 
                className="flex items-center gap-2 hover:text-background transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91-7990550754
              </a>
              <a 
                href="mailto:womenshealthduo@gmail.com" 
                className="flex items-center gap-2 hover:text-background transition-colors"
              >
                <Mail className="w-4 h-4" />
                womenshealthduo@gmail.com
              </a>
              <a
                href="https://www.instagram.com/womenshealthduo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-background transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @womenshealthduo
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-background transition-colors"
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
