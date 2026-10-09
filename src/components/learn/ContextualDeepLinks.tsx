import { ROUTES } from "@/config/routes";
import { AppLink as Link } from "@/components/router/AppLink";

export type ContextualDeepLinksProps = {
  context: "learn" | "doctor";
  doctorName?: string;
};

export function ContextualDeepLinks({ context, doctorName }: ContextualDeepLinksProps) {
  const doctorPath = doctorName === "Dr. Charmi Shah" ? ROUTES.drCharmi : ROUTES.drZalak;

  const items =
    context === "learn"
      ? [
          { label: "Book consultation", to: ROUTES.bookConsultation },
          { label: "Virtual consultation hub", to: ROUTES.onlineConsultation },
          { label: "Dr. Charmi profile", to: ROUTES.drCharmi },
          { label: "Dr. Zalak profile", to: ROUTES.drZalak },
          { label: "All Learn articles", to: ROUTES.learnArticles },
        ]
      : [
          { label: `Book with ${doctorName ?? "this doctor"}`, to: ROUTES.bookConsultation },
          { label: "Virtual consults", to: ROUTES.onlineConsultation },
          { label: "All doctors", to: ROUTES.homeAbout },
          { label: "Learn hub", to: ROUTES.learn },
          { label: "FAQ", to: ROUTES.faq },
        ];

  return (
    <aside className="mb-10 rounded-2xl border border-primary/20 bg-primary/5 p-5 shadow-soft">
      <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
        {context === "learn" ? "Quick links to next steps" : "Jump to the next step"}
      </h2>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="inline-flex items-center rounded-full border border-primary/30 bg-background px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
          >
            {item.label}
          </Link>
        ))}
        {context === "doctor" && doctorPath ? (
          <Link
            to={doctorPath}
            className="inline-flex items-center rounded-full border border-primary/30 bg-background px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
          >
            {doctorName ? `View ${doctorName}` : "Doctor profile"}
          </Link>
        ) : null}
      </div>
    </aside>
  );
}
