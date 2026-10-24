import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

import TrackedExternalLink from "@/components/TrackedExternalLink";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AnswerBlockContent } from "@/lib/aeoContent";

interface AeoAnswerBlockProps {
  content: AnswerBlockContent;
  className?: string;
}

const AeoAnswerBlock = ({ content, className = "" }: AeoAnswerBlockProps) => (
  <Card className={`border-border bg-card shadow-sm ${className}`}>
    <CardHeader>
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">{content.eyebrow}</p>
      <CardTitle className="text-2xl leading-tight text-foreground">{content.title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <p className="text-base leading-relaxed text-muted-foreground">{content.answer}</p>

      <div className="grid gap-3 sm:grid-cols-2">
        {content.bullets.map((bullet) => (
          <div key={bullet} className="flex gap-3 rounded-lg border border-border bg-background p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-primary" />
            <p className="text-sm leading-relaxed text-foreground">{bullet}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-secondary/40 p-5">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">Best next steps</h3>
        <ol className="space-y-2 text-sm text-foreground">
          {content.nextSteps.map((step, index) => (
            <li key={step} className="flex gap-3">
              <span className="font-semibold text-primary">{index + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {content.links.map((link) => (
          <Button key={`${link.label}-${link.href}`} variant="outline" className="h-auto min-h-10 whitespace-normal break-words py-2 text-center" asChild>
            {link.external ? (
              <TrackedExternalLink
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                eventName="aeo_answer_cta_click"
                ctaLabel={link.label}
              >
                {link.label}
                <ArrowRight className="h-4 w-4" />
              </TrackedExternalLink>
            ) : (
              <Link to={link.href}>
                {link.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
            )}
          </Button>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default AeoAnswerBlock;
