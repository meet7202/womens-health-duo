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
        . Use the same practice name, phone, and website everywhere you list care.
      </p>
    </section>
  );
}
