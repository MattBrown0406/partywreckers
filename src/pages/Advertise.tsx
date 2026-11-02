import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, CheckCircle, FileText, Mail, Megaphone, Radio, ShieldCheck, Target, TrendingUp, Users } from "lucide-react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SEOHead from "@/components/SEOHead";
import AeoAnswerBlock from "@/components/AeoAnswerBlock";
import FaqSection from "@/components/FaqSection";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import HoneypotField from "@/components/HoneypotField";
import TurnstileWidget, { type TurnstileHandle } from "@/components/TurnstileWidget";
import { submitForm } from "@/lib/formSubmit";
import { coreFaqs, primaryAeoAnswers } from "@/lib/aeoContent";
import { trackPartyWreckersEvent } from "@/lib/funnelTracking";
import { advertiserFit, inventoryOptions, proofPoints, sponsorPackages } from "@/lib/sponsorPackages";

const audienceSignals = [
  ["High-intent context", "Listeners are often researching treatment, boundaries, intervention, or family support."],
  ["Trusted host voice", "Matt's work across Party Wreckers, Sober Helpline, and Freedom Interventions creates a practical bridge from education to action."],
  ["Reportable actions", "Sponsor interest, package clicks, inquiry submissions, and listener path clicks can be measured in the owner report."],
];

const placementInventory = [
  ["Podcast", "Host-read mentions, episode sponsorships, and show-note links around relevant conversations."],
  ["Website", "Sponsor directory cards, episode-page sponsor blocks, and selected high-intent article placements."],
  ["Funnel", "Tracked sponsor clicks, sponsor impressions, package interest, and inquiry activity."],
  ["Content", "Sponsor-fit placement near addiction education, family support, intervention, and recovery resources."],
];

const reportItems = [
  "Sponsor impressions by sponsor",
  "Sponsor clicks by sponsor",
  "Top sponsor placements",
  "Top sponsor pages",
  "Package interest clicks",
  "Advertiser inquiry starts",
];

const Advertise = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    packageInterest: "",
    inventoryInterest: inventoryOptions[0],
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [hasTrackedStart, setHasTrackedStart] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [website, setWebsite] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);

  const trackInquiryStart = () => {
    if (hasTrackedStart) return;
    setHasTrackedStart(true);
    trackPartyWreckersEvent({
      eventName: "advertiser_inquiry_start",
      ctaLabel: "Advertise form started",
    });
  };

  const selectPackage = (packageName: string, event: string) => {
    setForm((current) => ({ ...current, packageInterest: packageName }));
    trackPartyWreckersEvent({
      eventName: "advertiser_package_click",
      ctaLabel: packageName,
      metadata: {
        package_type: event,
      },
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    trackPartyWreckersEvent({
      eventName: "advertiser_inquiry_click",
      ctaLabel: "Advertise form submit",
      metadata: {
        company: form.company,
        package_interest: form.packageInterest,
        inventory_interest: form.inventoryInterest,
      },
    });

    setErrorMessage("");
    const token = (await turnstileRef.current?.getToken()) ?? null;

    const sourcePath = `${window.location.pathname}${window.location.search}`;
    const result = await submitForm("send-advertiser-inquiry", {
      ...form,
      source_path: sourcePath,
      website,
      turnstile_token: token ?? undefined,
      metadata: {
        source: "party_wreckers_advertise_page",
        package_interest: form.packageInterest,
        inventory_interest: form.inventoryInterest,
      },
    });
    turnstileRef.current?.reset();

    if (!result.ok && (result.status === 400 || result.status === 429)) {
      // A validation, verification or rate-limit answer: retrying elsewhere won't help.
      setStatus("error");
      setErrorMessage(result.message || "");
      return;
    }

    if (!result.ok) {
      // Server problem: fall back to the plain contact email so the lead isn't lost.
      // Bot-check tokens are single-use, so wait for a fresh one first.
      const fallbackToken = (await turnstileRef.current?.getToken()) ?? null;
      const fallback = await submitForm("send-contact-email", {
        name: form.name,
        email: form.email,
        message: `Advertiser inquiry\n\nCompany: ${form.company}\nPackage interest: ${form.packageInterest || "Not provided"}\nInventory interest: ${form.inventoryInterest}\n\n${form.message}`,
        form: "advertise_fallback",
        source_path: sourcePath,
        website,
        turnstile_token: fallbackToken ?? undefined,
      });
      turnstileRef.current?.reset();

      if (!fallback.ok) {
        setStatus("error");
        setErrorMessage(fallback.message || "");
        return;
      }
    }

    setStatus("success");
    setForm({ name: "", email: "", company: "", packageInterest: "", inventoryInterest: inventoryOptions[0], message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Advertise on The Party Wreckers Podcast"
        description="Reach families, recovery professionals, and loved ones looking for ethical addiction, intervention, treatment, and family support resources."
        canonical="/advertise"
        keywords="addiction podcast advertising, recovery podcast sponsor, treatment center podcast ads, family recovery advertising"
      />
      <FAQJsonLd faqs={coreFaqs.sponsorInfo} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Advertise", url: "/advertise" }]} />

      <Navbar />

      <main className="pt-20 pb-16">
        <section className="bg-gradient-hero py-14 sm:py-20">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 mb-6">
                <Radio className="w-4 h-4 text-primary" />
                <span className="text-sm uppercase tracking-widest text-muted-foreground">Premium sponsor channel</span>
              </div>
              <h1 className="font-script text-5xl sm:text-6xl text-burgundy mb-6">
                Reach families while the topic is urgent.
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Party Wreckers is a sponsor channel for brands that belong near addiction education, family support, intervention, treatment, recovery, and the hard decisions people make before they ask for help.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  variant="hero"
                  size="xl"
                  asChild
                  onClick={() =>
                    trackPartyWreckersEvent({
                      eventName: "advertiser_inquiry_start",
                      ctaLabel: "Advertise hero request sponsor info",
                    })
                  }
                >
                  <a href="#sponsor-inquiry">
                    Request Availability
                    <Mail className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <a href="#media-kit">
                    View Media Kit
                    <FileText className="w-5 h-5" />
                  </a>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <Link to="/sponsor-kit">
                    Sponsor Kit
                    <FileText className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl" asChild>
                  <TrackedExternalLink
                    href="/party-wreckers-media-kit.pdf"
                    eventName="advertiser_package_click"
                    ctaLabel="Download media kit PDF"
                    metadata={{ package_type: "media_kit_download" }}
                    download
                  >
                    Download PDF
                    <FileText className="w-5 h-5" />
                  </TrackedExternalLink>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container px-4">
            <div className="mx-auto max-w-5xl">
              <AeoAnswerBlock content={primaryAeoAnswers.sponsorInfo} />
            </div>
          </div>
        </section>

        <section id="media-kit" className="py-12 sm:py-16">
          <div className="container px-4">
            <div className="grid gap-6 max-w-6xl mx-auto md:grid-cols-3">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5 text-burgundy" />Audience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Families in active decision moments, recovery professionals, and people who trust Matt's voice because the show is direct and useful.</p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-burgundy" />Standards</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Sponsor fit matters. The show should only carry offers that make sense for families and do not exploit fear or desperation.</p>
                </CardContent>
              </Card>

              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-burgundy" />Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Podcast placements, sponsor page features, newsletter mentions, and funnel-aligned referral paths can be packaged together.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card py-12">
          <div className="container px-4">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-sm uppercase font-semibold text-primary mb-2">Media kit snapshot</p>
                <h2 className="font-script text-4xl sm:text-5xl text-burgundy">A clean sponsor story in one place.</h2>
                <p className="mt-4 text-muted-foreground">
                  The pitch is simple: useful sponsor placements near addiction and family decision content, measured with sponsor impressions, clicks, page performance, and package interest.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {placementInventory.map(([title, body]) => (
                  <div key={title} className="rounded-lg border border-border bg-background p-5">
                    <Target className="mb-3 h-5 w-5 text-primary" />
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 border-y border-border bg-card">
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end mb-8">
                <div>
                  <p className="text-sm uppercase font-semibold text-primary mb-2">Sponsor packages</p>
                  <h2 className="font-script text-4xl sm:text-5xl text-burgundy">Simple inventory, clean reporting.</h2>
                </div>
                <p className="text-muted-foreground">
                  Packages can be sold individually or bundled depending on sponsor fit. The goal is useful placement, not clutter.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {sponsorPackages.map((sponsorPackage) => (
                  <Card key={sponsorPackage.name} className="border-border bg-background">
                    <CardHeader>
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Megaphone className="h-5 w-5" />
                        </div>
                        <span className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-semibold uppercase text-muted-foreground">
                          {sponsorPackage.price}
                        </span>
                      </div>
                      <CardTitle className="text-xl">{sponsorPackage.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{sponsorPackage.fit}</p>
                      <p className="text-xs uppercase tracking-widest text-primary mb-4">{sponsorPackage.inventory}</p>
                      <p className="mb-4 rounded-lg border border-border bg-secondary/40 p-3 text-sm text-foreground">
                        <span className="font-semibold">Best for:</span> {sponsorPackage.bestFor}
                      </p>
                      <ul className="mb-5 space-y-2">
                        {sponsorPackage.deliverables.map((deliverable) => (
                          <li key={deliverable} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                            <span>{deliverable}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant={form.packageInterest === sponsorPackage.name ? "default" : "outline"}
                        size="sm"
                        className="w-full"
                        onClick={() => selectPackage(sponsorPackage.name, sponsorPackage.event)}
                      >
                        {form.packageInterest === sponsorPackage.name ? "Selected" : "Ask About This"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="mt-5 text-sm text-muted-foreground">
                Introductory rates can be adjusted as audience reporting matures. Best-fit sponsors can reserve a category, episode theme, or monthly site placement depending on availability.
              </p>
              <div className="mt-6">
                <Button variant="outline" asChild>
                  <Link to="/advertise/packages">View Sponsor Proposal Page</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-4">
            <div className="max-w-6xl mx-auto grid gap-4 md:grid-cols-3">
              {[...audienceSignals, ...proofPoints.slice(0, 1)].map((item) => {
                const title = Array.isArray(item) ? item[0] : item.label;
                const body = Array.isArray(item) ? item[1] : item.body;
                return (
                <div key={title} className="rounded-lg border border-border bg-card p-5">
                  <BarChart3 className="w-5 h-5 text-primary mb-3" />
                  <p className="font-semibold text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground mt-2">{body}</p>
                </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card py-12">
          <div className="container px-4">
            <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase text-primary">Monthly sponsor report</p>
                <h2 className="font-script text-4xl text-burgundy sm:text-5xl">Sponsors should see more than a logo.</h2>
                <p className="mt-4 text-muted-foreground">
                  Every sponsor package can be backed by a simple monthly activity summary that shows where the sponsor appeared, how often the placement was seen, and how many people clicked.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {reportItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-lg border border-border bg-background p-4">
                    <BarChart3 className="h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-4">
            <div className="grid gap-8 max-w-6xl mx-auto lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rounded-lg border border-border bg-secondary/30 p-6">
                <h2 className="font-script text-3xl sm:text-4xl text-burgundy mb-4">Best-fit advertisers</h2>
                <div className="grid gap-3">
                  {advertiserFit.map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-lg border border-border bg-background/70 p-3">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground mb-3">
                    Looking for listener-facing help instead?
                  </p>
                  <Button variant="outline" asChild>
                    <Link to="/from-party-wreckers">Go to the Listener Path</Link>
                  </Button>
                </div>
              </div>

              <Card id="sponsor-inquiry" className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="font-script text-3xl text-burgundy">Request sponsor info</CardTitle>
                </CardHeader>
                <CardContent>
                  {status === "success" ? (
                    <div className="rounded-lg border border-primary/30 bg-primary/10 p-6 text-center">
                      <CheckCircle className="w-10 h-10 text-primary mx-auto mb-3" />
                      <p className="font-semibold text-foreground">Your inquiry was sent.</p>
                      <p className="text-sm text-muted-foreground mt-1">Matt will have the details and can follow up with sponsor fit and package options.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} onFocus={trackInquiryStart} className="space-y-4">
                      <HoneypotField value={website} onChange={setWebsite} />
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Input required maxLength={120} placeholder="Your name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
                        <Input required type="email" maxLength={254} placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
                      </div>
                      <Input required maxLength={200} placeholder="Company or organization" value={form.company} onChange={(event) => setForm({ ...form, company: event.target.value })} />
                      <label className="block">
                        <span className="mb-2 block text-sm font-medium text-foreground">Available inventory</span>
                        <select
                          value={form.inventoryInterest}
                          onChange={(event) => setForm({ ...form, inventoryInterest: event.target.value })}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"
                        >
                          {inventoryOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </label>
                      <Input maxLength={200} placeholder="Package interest" value={form.packageInterest} onChange={(event) => setForm({ ...form, packageInterest: event.target.value })} />
                      <Textarea required maxLength={4000} placeholder="Tell us what you offer and what kind of audience you want to reach." className="min-h-[140px]" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} />
                      {hasTrackedStart && <TurnstileWidget ref={turnstileRef} action="advertise" />}
                      <Button type="submit" disabled={status === "loading"} className="w-full">
                        {status === "loading" ? "Sending..." : "Send Sponsor Inquiry"}
                      </Button>
                      {status === "error" && (
                        <p className="text-sm text-destructive" role="alert">{errorMessage || "Something went wrong. Please email matt@partywreckers.com directly."}</p>
                      )}
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto rounded-lg border border-primary/20 bg-primary/10 p-6 text-center">
              <p className="text-muted-foreground mb-4">Already know this is a fit?</p>
              <Button variant="outline" asChild>
                <TrackedExternalLink href="mailto:matt@partywreckers.com?subject=Party%20Wreckers%20Sponsor%20Inquiry" eventName="advertiser_email_click" ctaLabel="Advertise direct email">
                  Email Matt Directly
                </TrackedExternalLink>
              </Button>
            </div>
          </div>
        </section>

        <FaqSection
          faqs={coreFaqs.sponsorInfo}
          title="Sponsor FAQ"
          description="Short answers for advertisers evaluating whether Party Wreckers is a fit."
        />
      </main>

      <Footer />
    </div>
  );
};

export default Advertise;
