import { EXTERNAL } from "@/config/externalProfiles";

/**
 * Context on major Indian health directories (no claim of an active listing).
 */
export function DirectoryPresence() {
  return (
    <section
      className="rounded-2xl border border-border/50 bg-muted/20 p-6 sm:p-8"
      aria-labelledby="dir-presence-heading"
    >
      <h2 id="dir-presence-heading" className="font-heading text-xl font-semibold text-foreground">
        Find doctors on health platforms
      </h2>
      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
        Many patients discover specialists through national directories. Official profiles for our
        doctors are linked on their pages where available. You can also search by name on platforms
        such as{" "}
        <a
          href={EXTERNAL.directories.practo}
          className="text-primary underline underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Practo
        </a>
        ,{" "}
        <a
          href={EXTERNAL.directories.lybrate}
          className="text-primary underline underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lybrate
        </a>
        , and{" "}
        <a
          href={EXTERNAL.directories.curofy}
          className="text-primary underline underline-offset-4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Curofy
        </a>
        .
      </p>
      <h3 className="font-heading text-base font-semibold text-foreground mt-6 mb-2">
        Google Maps &amp; hours
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        For Dr. Zalak Shah&apos;s in-person visits, pick the city you plan to see her in—each
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
