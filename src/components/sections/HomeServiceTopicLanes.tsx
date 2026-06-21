import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { Activity, HeartPulse, Baby, Dumbbell, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { whatsappIntentFromPathname, whatsappUrlWithMessage } from "@/lib/whatsappCta";

const topicLanes = [
  {
    id: "hormonal-health",
    title: "Hormonal health",
    icon: Activity,
    text: "Cycle hormones, PCOS patterns, perimenopause questions, short clips plus a real OB-GYN consult when you're ready.",
  },
  {
    id: "menstrual-health",
    title: "Menstrual health",
    icon: HeartPulse,
    text: "Heavy or painful periods, fibroids, endometriosis concerns, education first, then structured care with Dr. Charmi.",
  },
  {
    id: "fertility",
    title: "Fertility",
    icon: Baby,
    text: "Fertility pathways, IVF/IUI questions, and pregnancy planning, especially helpful for NRIs who want continuity.",
  },
  {
    id: "stott-pilates",
    title: "Physio and Pilates",
    icon: Dumbbell,
    text: "Mat & Reformer work and women's health physiotherapy with Dr. Zalak, pelvic floor, prenatal/postnatal, and recovery.",
  },
] as const;

/**
 * Slim “topic lane” strip at the top of `#services`. Keeps `#pillars` for SEO / inbound links
 * without duplicating the full service catalog below.
 */
export function HomeServiceTopicLanes() {
  const location = useLocation();
  const bookWhatsAppHref = useMemo(
    () => whatsappUrlWithMessage(whatsappIntentFromPathname(location.pathname)),
    [location.pathname],
  );

  return (
    <div
      id="pillars"
      className="scroll-mt-28 border-b border-border/40 bg-background py-16 md:py-20"
      aria-labelledby="service-topic-lanes-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-wider text-primary">
            Quick map
          </span>
          <h2
            id="service-topic-lanes-heading"
            className="font-heading mt-3 text-3xl font-semibold text-foreground sm:text-4xl"
          >
            Four ways people find us
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A light overview so you know you&apos;re in the right place, the{" "}
            <span className="font-medium text-foreground">full service list by doctor</span> is
            right below this block.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {topicLanes.map((lane, index) => (
            <motion.article
              key={lane.id}
              id={lane.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-soft"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <lane.icon className="h-5 w-5 text-primary" aria-hidden />
              </div>
              <h3 className="font-heading mb-2 text-xl font-semibold text-foreground">
                {lane.title}
              </h3>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{lane.text}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={ROUTES.learn}>Learn hub</Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-primary" asChild>
                  <a href={bookWhatsAppHref} target="_blank" rel="noopener noreferrer">
                    <span className="inline-flex items-center gap-1.5">
                      <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      Book on WhatsApp
                    </span>
                  </a>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
