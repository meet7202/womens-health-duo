import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/data/siteFaq";
import { cn } from "@/lib/utils";

type FaqSectionProps = {
  items: FaqItem[];
  /** When true, show intro line + id for in-page anchor */
  showHeading?: boolean;
  /** Root section id (default `faq`) */
  sectionId?: string;
  /** Eyebrow label above the title (default: FAQ) */
  headingLabel?: string;
  /** Section heading (default: Common questions) */
  headingTitle?: string;
  /** Short intro under the heading */
  headingIntro?: string;
  /** Less top padding when stacked right after another section (e.g. contact → FAQ). */
  tightTop?: boolean;
};

const DEFAULT_HEADING_INTRO =
  "General information about how Women's Health Duo works. Medical decisions belong in a consultation with your clinician.";

export function FaqSection({
  items,
  showHeading = true,
  sectionId = "faq",
  headingLabel = "FAQ",
  headingTitle = "Common questions",
  headingIntro = DEFAULT_HEADING_INTRO,
  tightTop = false,
}: FaqSectionProps) {
  return (
    <section
      id={sectionId}
      className={cn(
        "bg-secondary/25 border-y border-border/40 pb-20",
        tightTop ? "pt-10" : "pt-20",
      )}
      aria-labelledby="faq-heading"
    >
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {showHeading ? (
          <div className="text-center mb-10">
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              {headingLabel}
            </span>
            <h2
              id="faq-heading"
              className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mt-3"
            >
              {headingTitle}
            </h2>
            <p className="text-muted-foreground mt-3 leading-relaxed">{headingIntro}</p>
          </div>
        ) : null}
        <Accordion type="single" collapsible className="w-full space-y-2">
          {items.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`q-${index}`}
              className="rounded-xl border border-border/50 bg-card px-4"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
