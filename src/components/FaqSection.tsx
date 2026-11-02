import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/lib/aeoContent";

interface FaqSectionProps {
  title?: string;
  description?: string;
  faqs: FaqItem[];
}

const FaqSection = ({
  title = "Frequently Asked Questions",
  description,
  faqs,
}: FaqSectionProps) => (
  <section className="py-12 sm:py-16">
    <div className="container px-4">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h2 className="font-script text-4xl text-burgundy sm:text-5xl">{title}</h2>
          {description && <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{description}</p>}
        </div>
        <Accordion
          type="single"
          collapsible
          className="rounded-lg border border-border bg-card px-4 sm:px-6 [&_[role=region][data-state=closed]]:hidden"
        >
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger className="text-left text-base font-semibold">{faq.question}</AccordionTrigger>
              {/* forceMount keeps answers in the prerendered HTML so crawlers see the answers the FAQ
                  schema advertises; closed panels are hidden by the Accordion's class above. */}
              <AccordionContent forceMount className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FaqSection;
