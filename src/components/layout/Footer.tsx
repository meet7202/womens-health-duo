import { Heart, Instagram, Mail, Phone, Youtube } from "lucide-react";
import { CONTACT } from "@/config/site";
import { ROUTES } from "@/config/routes";
import { publicPathname } from "@/lib/githubPagesPublicUrl";
import { AppLink as Link } from "@/components/router/AppLink";

const LEGAL_LINKS = [
  { label: "Telemedicine policy", to: ROUTES.telemedicinePolicy },
  { label: "Privacy policy", to: ROUTES.privacyPolicy },
  { label: "Terms of service", to: ROUTES.termsOfService },
  { label: "Refund policy", to: ROUTES.refundPolicy },
  { label: "Medical disclaimer", to: ROUTES.medicalDisclaimer },
  { label: "Editorial policy", to: ROUTES.editorialPolicy },
] as const;

type SectionLink = {
  label: string;
  to: string;
};

const CLASS_LINKS: SectionLink[] = [
  { label: "Prenatal", to: publicPathname(ROUTES.prenatal) },
  { label: "Postnatal", to: publicPathname(ROUTES.postnatal) },
  { label: "Pilates", to: publicPathname(ROUTES.pilates) },
];

const DOCTOR_LINKS: SectionLink[] = [
  { label: "Dr. Charmi Shah", to: publicPathname(ROUTES.drCharmi) },
  { label: "Dr. Zalak Shah", to: publicPathname(ROUTES.drZalak) },
];

const CONSULTATION_LINKS: SectionLink[] = [
  { label: "International", to: publicPathname(ROUTES.internationalConsultation) },
  { label: "Virtual consult", to: publicPathname(ROUTES.onlineConsultation) },
  { label: "Book consult", to: publicPathname(ROUTES.bookConsultation) },
];

const RESOURCE_LINKS: SectionLink[] = [
  { label: "Learn hub", to: publicPathname(ROUTES.learn) },
  { label: "Articles", to: publicPathname(ROUTES.learnArticles) },
  { label: "FAQ", to: publicPathname(ROUTES.faq) },
  { label: "Free WhatsApp community", to: publicPathname(ROUTES.freeWomensHealthCommunity) },
];

const LOCATION_LINKS: SectionLink[] = [
  { label: "Global", to: publicPathname(ROUTES.onlineConsultation) },
  { label: "Ahmedabad", to: publicPathname(ROUTES.ahmedabad) },
  { label: "Mumbai", to: publicPathname(ROUTES.mumbai) },
  { label: "Valsad", to: publicPathname(ROUTES.valsad) },
  { label: "Bangalore", to: publicPathname(ROUTES.bangalore) },
];

/** ≥48×48 CSS px touch target with readable footer link contrast. */
const footerNavLinkClass =
  "inline-flex min-h-12 items-center text-sm text-background/80 hover:text-background transition-colors underline-offset-4 hover:underline";

const footerExternalLinkClass =
  "flex min-h-12 items-center gap-2 text-sm text-background/80 hover:text-background transition-colors";

function FooterNavList({ links }: { links: readonly SectionLink[] }) {
  return (
    <ul className="flex flex-col">
      {links.map(({ label, to }) => (
        <li key={to}>
          <Link to={to} className={footerNavLinkClass}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-background/10 flex items-center justify-center">
                <Heart className="w-4 h-4 text-background" />
              </div>
              <h3 className="font-heading text-lg font-semibold">Women's Health Duo</h3>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Two sisters, one mission: comprehensive women's healthcare combining medical expertise
              with physiotherapy and wellness.
            </p>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-2 text-background/90">Program</h4>
            <FooterNavList links={CLASS_LINKS} />
          </div>

          {/* Doctors */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-2 text-background/90">Doctors</h4>
            <FooterNavList links={DOCTOR_LINKS} />
          </div>

          {/* Consult */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-2 text-background/90">Consult</h4>
            <FooterNavList links={CONSULTATION_LINKS} />
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-2 text-background/90">
              Resources
            </h4>
            <FooterNavList links={RESOURCE_LINKS} />
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-heading text-sm font-semibold mb-2 text-background/90">
              Locations
            </h4>
            <FooterNavList links={LOCATION_LINKS} />
          </div>
        </div>

        {/* Legal & Contact */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-background/10">
          <div>
            <h4 className="font-heading text-sm font-semibold mb-2 text-background/90">Legal</h4>
            <ul className="flex flex-col">
              {LEGAL_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link to={publicPathname(to)} className={footerNavLinkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold mb-2 text-background/90">Connect</h4>
            <div className="flex flex-col">
              <a href={`tel:${CONTACT.phoneE164}`} className={footerExternalLinkClass}>
                <Phone className="w-4 h-4 shrink-0" aria-hidden />
                +91-7990550754
              </a>
              <a href={`mailto:${CONTACT.email}`} className={footerExternalLinkClass}>
                <Mail className="w-4 h-4 shrink-0" aria-hidden />
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={footerExternalLinkClass}
              >
                <Instagram className="w-4 h-4 shrink-0" aria-hidden />
                Instagram
              </a>
              <a
                href={CONTACT.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className={footerExternalLinkClass}
              >
                <Youtube className="w-4 h-4 shrink-0" aria-hidden />
                YouTube
              </a>
            </div>
          </div>

          <div className="col-span-2 md:col-span-2 flex flex-col justify-end">
            <p className="text-background/70 text-sm">
              © {new Date().getFullYear()} Women's Health Duo. All rights reserved.
            </p>
            <p className="text-background/70 text-sm mt-1">Dr. Charmi Shah &amp; Dr. Zalak Shah</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
