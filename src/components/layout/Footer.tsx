import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Instagram, Mail, MessageCircle, Phone, Youtube } from "lucide-react";
import { CONTACT } from "@/config/site";
import { ROUTES } from "@/config/routes";
import { publicPathname } from "@/lib/githubPagesPublicUrl";
import { whatsappIntentFromPathname, whatsappUrlWithMessage } from "@/lib/whatsappCta";
import { BRAND_ENTITY_LINE } from "@/config/brandLine";

const LEGAL_LINKS = [
  { label: "Telemedicine policy", to: ROUTES.telemedicinePolicy },
  { label: "Privacy policy", to: ROUTES.privacyPolicy },
  { label: "Terms of service", to: ROUTES.termsOfService },
  { label: "Refund policy", to: ROUTES.refundPolicy },
  { label: "Medical disclaimer", to: ROUTES.medicalDisclaimer },
  { label: "Editorial policy", to: ROUTES.editorialPolicy },
] as const;

const SECTION_LINKS = [
  { label: "About", to: publicPathname(ROUTES.homeAbout) },
  { label: "Services", to: publicPathname(ROUTES.homeServicesSection) },
  { label: "Testimonials", to: publicPathname(ROUTES.homeTestimonials) },
  { label: "Contact", to: publicPathname(ROUTES.homeContact) },
] as const;

export const Footer = () => {
  const location = useLocation();
  const footerWhatsappHref = useMemo(
    () => whatsappUrlWithMessage(whatsappIntentFromPathname(location.pathname)),
    [location.pathname],
  );

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
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
            <p className="text-background/85 text-sm leading-relaxed mt-3 border-t border-background/15 pt-3">
              {BRAND_ENTITY_LINE}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to={publicPathname(ROUTES.home)}
                  className="text-background/70 hover:text-background transition-colors text-sm underline-offset-4 hover:underline"
                >
                  Home
                </Link>
              </li>
              {SECTION_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-background/70 hover:text-background transition-colors text-sm underline-offset-4 hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to={publicPathname(ROUTES.internationalConsultation)}
                  className="text-background/70 hover:text-background transition-colors underline-offset-4 hover:underline"
                >
                  International consultation
                </Link>
              </li>
              <li>
                <Link
                  to={publicPathname(ROUTES.onlineConsultation)}
                  className="text-background/70 hover:text-background transition-colors underline-offset-4 hover:underline"
                >
                  Virtual online consultations
                </Link>
              </li>
              <li>
                <Link
                  to={publicPathname(ROUTES.drCharmi)}
                  className="text-background/70 hover:text-background transition-colors underline-offset-4 hover:underline"
                >
                  Dr. Charmi Shah
                </Link>
              </li>
              <li>
                <Link
                  to={publicPathname(ROUTES.drZalak)}
                  className="text-background/70 hover:text-background transition-colors underline-offset-4 hover:underline"
                >
                  Dr. Zalak Shah
                </Link>
              </li>
              <li>
                <span className="text-background/50">India: </span>
                <Link
                  to={publicPathname(ROUTES.ahmedabad)}
                  className="text-background/70 hover:text-background transition-colors underline-offset-4 hover:underline"
                >
                  Ahmedabad
                </Link>
                <span className="text-background/40"> · </span>
                <Link
                  to={publicPathname(ROUTES.mumbai)}
                  className="text-background/70 hover:text-background transition-colors underline-offset-4 hover:underline"
                >
                  Mumbai
                </Link>
                <span className="text-background/40"> · </span>
                <Link
                  to={publicPathname(ROUTES.valsad)}
                  className="text-background/70 hover:text-background transition-colors underline-offset-4 hover:underline"
                >
                  Valsad
                </Link>
                <span className="text-background/40"> · </span>
                <Link
                  to={publicPathname(ROUTES.bangalore)}
                  className="text-background/70 hover:text-background transition-colors underline-offset-4 hover:underline"
                >
                  Bangalore
                </Link>
              </li>
              <li>
                <Link
                  to={publicPathname(ROUTES.learn)}
                  className="text-background/70 hover:text-background transition-colors underline-offset-4 hover:underline"
                >
                  Learn
                </Link>
              </li>
              <li>
                <Link
                  to={publicPathname(ROUTES.freeWomensHealthCommunity)}
                  className="text-background/70 hover:text-background transition-colors underline-offset-4 hover:underline"
                >
                  Free WhatsApp community
                </Link>
              </li>
              <li>
                <Link
                  to={publicPathname(ROUTES.bookConsultation)}
                  className="text-background/70 hover:text-background transition-colors underline-offset-4 hover:underline"
                >
                  Book teleconsultation
                </Link>
              </li>
              <li>
                <Link
                  to={publicPathname(ROUTES.faq)}
                  className="text-background/70 hover:text-background transition-colors underline-offset-4 hover:underline"
                >
                  FAQ
                </Link>
              </li>
              {LEGAL_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={publicPathname(to)}
                    className="text-background/70 hover:text-background transition-colors underline-offset-4 hover:underline"
                  >
                    {label}
                  </Link>
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
                href={footerWhatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md hover:text-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/50"
              >
                <MessageCircle className="w-4 h-4" />
                Book on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10 text-center text-sm text-background/50">
          <p>© {new Date().getFullYear()} Women's Health Duo. All rights reserved.</p>
          <p className="mt-1">Dr. Charmi Shah &amp; Dr. Zalak Shah | Women&apos;s Health Duo</p>
        </div>
      </div>
    </footer>
  );
};
