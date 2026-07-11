import { Link } from "react-router-dom";
import { EXTERNAL } from "@/config/externalProfiles";
import { ROUTES } from "@/config/routes";
import { publicPathname } from "@/lib/githubPagesPublicUrl";

/**
 * On-site paths to book Dr. Charmi Shah and Dr. Zalak Shah, plus Maps for in-person locations.
 */
export function DirectoryPresence() {
  return (
    <section
      className="rounded-2xl border border-border/50 bg-muted/20 p-6 sm:p-8"
      aria-labelledby="dir-presence-heading"
    >
      <h2 id="dir-presence-heading" className="font-heading text-xl font-semibold text-foreground">
        Book Dr. Charmi Shah or Dr. Zalak Shah
      </h2>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        The clearest way to plan care is with our team directly. Read{" "}
        <Link
          to={publicPathname(ROUTES.drCharmi)}
          className="text-primary font-medium underline underline-offset-4"
        >
          Dr. Charmi Shah&apos;s profile
        </Link>{" "}
        (OB-GYN and IVF) and{" "}
        <Link
          to={publicPathname(ROUTES.drZalak)}
          className="text-primary font-medium underline underline-offset-4"
        >
          Dr. Zalak Shah&apos;s profile
        </Link>{" "}
        (women&apos;s health physiotherapy and STOTT Pilates), then message us on WhatsApp or email
        from those pages, or open{" "}
        <Link
          to={publicPathname(ROUTES.onlineConsultation)}
          className="text-primary font-medium underline underline-offset-4"
        >
          virtual online consultations
        </Link>{" "}
        to see how video visits work and how to book from wherever you are.
      </p>
      <h3 className="font-heading text-base font-semibold text-foreground mt-6 mb-2">
        Google Maps &amp; hours
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        For Dr. Zalak Shah&apos;s in-person visits, pick the city you plan to see her in, each
        listing has directions, hours, and phone:{" "}
        <a
          href={EXTERNAL.drZalak.googleBusinessAhmedabad}
          className="text-primary underline underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ahmedabad
        </a>{" "}
        and{" "}
        <a
          href={EXTERNAL.drZalak.googleBusinessBangalore}
          className="text-primary underline underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bengaluru (Bangalore)
        </a>
        .
      </p>
    </section>
  );
}
