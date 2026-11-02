import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ClipboardCheck, Phone, Printer } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import FaqSection from "@/components/FaqSection";
import LeadMagnetSignup from "@/components/LeadMagnetSignup";
import RelatedArticles from "@/components/RelatedArticles";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { SITE_PHONE_DISPLAY, SITE_PHONE_HREF } from "@/lib/site";
import { funnelLinks } from "@/lib/funnelLinks";
import TrackedExternalLink from "@/components/TrackedExternalLink";

const PATH = "/first-72-hours";

/** Inline citation of an existing article; in print the URL is spelled out after it. */
const Cite = ({ slug, children }: { slug: string; children: ReactNode }) => (
  <Link to={`/blog/${slug}`} className="f72-cite font-medium text-primary underline underline-offset-2">
    {children}
  </Link>
);

interface ChecklistItem {
  title: string;
  detail: ReactNode;
}

interface ChecklistSection {
  id: string;
  heading: string;
  intro: ReactNode;
  items: ChecklistItem[];
}

const sections: ChecklistSection[] = [
  {
    id: "safety",
    heading: "Safety first",
    intro: (
      <>
        Before any conversation about feelings, blame, or treatment, make sure everyone is alive and out of immediate
        danger. That's the whole job for the first hours.
      </>
    ),
    items: [
      {
        title: "If you can't wake them, treat it as an overdose.",
        detail: (
          <>
            Call 911 first, give naloxone (Narcan) if you have it, and stay with them. Don't try to figure out what they
            took; that's the paramedics' job. From{" "}
            <Cite slug="overdose-safety-plan-for-families">the overdose safety plan every family needs</Cite>.
          </>
        ),
      },
      {
        title: "Know the danger signs. \"Sleeping it off\" is not a plan.",
        detail: (
          <>
            No response to a loud voice or a hard rub on the breastbone, slow or stopped breathing, blue or gray lips,
            a gurgling or snoring sound, vomiting while barely conscious, or a seizure: call 911. If they're unsteady
            but awake, keep them on their side and don't leave them alone. See{" "}
            <Cite slug="what-to-do-after-a-loved-ones-drinking-episode">what to do after a drinking episode</Cite>.
          </>
        ),
      },
      {
        title: "Let the ambulance come, even if they wake up furious.",
        detail: (
          <>
            Naloxone wears off in 30 to 90 minutes, sometimes before the drugs do, so someone can slip back into an
            overdose after seeming fine. Let them be angry and alive.
          </>
        ),
      },
      {
        title: "If anyone is threatened, or someone talks about suicide, call now.",
        detail: (
          <>
            Call 911 for immediate danger, or call or text 988 for a suicide or mental health crisis. Get yourself and
            the kids somewhere safe. When violence or suicide is part of the picture, boundaries need to be planned
            with professional guidance (
            <Cite slug="enabling-vs-supporting-boundaries">enabling vs supporting</Cite>).
          </>
        ),
      },
      {
        title: "Put naloxone where anyone in the house can reach it.",
        detail: (
          <>
            At least two doses, not in a locked drawer, and everyone (teenagers included) knows where it is. It's sold
            over the counter, and it won't hurt someone who isn't overdosing. That's not enabling; it's a seatbelt.
          </>
        ),
      },
      {
        title: "Don't make permanent decisions in a temporary crisis.",
        detail: (
          <>
            No life-altering ultimatums, no packing bags at midnight. Get through the night, then think. From{" "}
            <Cite slug="what-to-do-after-a-relapse-first-24-hours">what to do in the first 24 hours after a relapse</Cite>.
          </>
        ),
      },
    ],
  },
  {
    id: "conversation",
    heading: "The first conversation",
    intro: (
      <>
        You don't need a perfect speech. You need one calm person, a few true sentences, and the discipline to stop
        talking.
      </>
    ),
    items: [
      {
        title: "Wait until they're stable and coherent, not perfectly clear-headed.",
        detail: (
          <>
            Not while they're intoxicated and not at 2 a.m., but don't wait for ideal conditions either. Usually that's
            within a day or two. A shaky, scared yes is still a yes.
          </>
        ),
      },
      {
        title: "Decide who talks: one person, not a committee.",
        detail: (
          <>
            The person with the least history of arguing with them is usually the right choice. From{" "}
            <Cite slug="72-hours-after-crisis-window-of-willingness">the 72 hours after the crisis</Cite>.
          </>
        ),
      },
      {
        title: "Say three things: what you saw, how it affected you, what you're going to do.",
        detail: (
          <>
            "Last night you drove home after drinking. I was scared, and the kids saw it. I'm not covering for this
            anymore. I'm calling someone this week." The last sentence is about what you'll do, not what you demand.
          </>
        ),
      },
      {
        title: "If there's a plan ready, keep it to eleven words.",
        detail: <>"I love you. There's a bed. I'll drive you right now." Make yes the easiest available option.</>,
      },
      {
        title: "Separate the person from the behavior.",
        detail: (
          <>
            "I'm not done with you. I am done watching this run your life." Name it plainly, once, and then go to the
            next small step: "What's the one call you can make today?"
          </>
        ),
      },
    ],
  },
  {
    id: "what-not-to-do",
    heading: "What not to do",
    intro: <>Most of these feel like love in the moment. They close the door anyway.</>,
    items: [
      {
        title: "Don't recite the history.",
        detail: <>"This is the fourth time..." is true, and useless right now. Long speeches give people time to argue.</>,
      },
      {
        title: "Don't ask them to explain what happened.",
        detail: <>They don't know, and the question triggers defense.</>,
      },
      {
        title: "Don't negotiate a smaller version.",
        detail: <>"Maybe just outpatient" almost always becomes nothing.</>,
      },
      {
        title: "Don't clean up the mess.",
        detail: (
          <>
            Calling the boss, paying for the tow, apologizing to the neighbors, telling the kids "Dad's just tired."
            Safety cleanup is different; the rest protects the addiction. Pick one and don't do it this time.
          </>
        ),
      },
      {
        title: "Don't reach for shame.",
        detail: (
          <>
            "I knew this would happen" echoes the voice in their head that says they'll never make it. You may feel it.
            Try not to say it. Accountability says "you can do the next thing better"; shame says "you are this."
          </>
        ),
      },
      {
        title: "Don't mistake the calm for progress.",
        detail: (
          <>
            Within a few days the fear fades, shame comes back, and the story becomes "a bad night, won't happen
            again." The calm after a crisis is the pause before the next one.
          </>
        ),
      },
    ],
  },
  {
    id: "information",
    heading: "Gather information",
    intro: (
      <>
        Every one of these can happen while your loved one is still asleep, still in a holding cell, still on a
        monitor. You're not waiting on them. You're building the ramp.
      </>
    ),
    items: [
      {
        title: "Write down what happened, with dates, while it's fresh.",
        detail: (
          <>
            A few plain sentences: what you saw, what it cost, how it affected you. Memory bends toward hope, and
            addiction bends the truth. See{" "}
            <Cite slug="documenting-a-loved-ones-addiction">why documenting a loved one's addiction matters</Cite>.
          </>
        ),
      },
      {
        title: "List what they use, their prescriptions, and their medical history.",
        detail: (
          <>
            Include prior treatment and any withdrawal history. Alcohol and benzodiazepine withdrawal can be medically
            dangerous, and paramedics and treatment centers will ask.
          </>
        ),
      },
      {
        title: "Get the money question answered.",
        detail: (
          <>
            What insurance covers, what the deposit is, and what you're already paying every month (rent, phone, car,
            legal fees). Real numbers, not guesses.
          </>
        ),
      },
      {
        title: "Find out what the bed situation is today, not next week.",
        detail: (
          <>
            Ask about immediate admission, detox availability, and whether they'll take a direct transfer from the
            hospital or jail.
          </>
        ),
      },
      {
        title: "Solve the logistics they'll use as excuses.",
        detail: <>The dog. The job. The car in the impound lot. The phone. Write them down and start solving them now.</>,
      },
      {
        title: "If they're in jail, use the time.",
        detail: (
          <>
            Talk to their attorney about treatment as part of the outcome, find a facility that accepts a direct
            release, and get the plan in writing.
          </>
        ),
      },
    ],
  },
  {
    id: "support",
    heading: "Line up support",
    intro: <>You were never meant to carry this alone, and you can't be the calm person in the hallway on fumes.</>,
    items: [
      {
        title: "Call a professional before you call a family meeting.",
        detail: (
          <>
            An interventionist or admissions team can tell you in ten minutes what options exist for your situation.
            The first call is a conversation, not a contract (
            <Cite slug="the-phone-call-you-keep-not-making">the phone call you keep not making</Cite>).
          </>
        ),
      },
      {
        title: "Tell at least one person who can actually help.",
        detail: <>Another family member, a trusted friend, or a professional. Secrecy protects the addiction, not the family.</>,
      },
      {
        title: "Talk to the kids, honestly and simply.",
        detail: (
          <>
            "Mom drank too much last night. It's not your fault, and you're safe." Kids can handle the truth. What
            hurts them is everyone pretending.
          </>
        ),
      },
      {
        title: "Get support for yourself.",
        detail: (
          <>
            Al-Anon, a therapist, or a family call like The Family Squares, a free Zoom every Monday night. You don't
            need the whole family on board to start (
            <Cite slug="you-dont-need-whole-family-on-board-to-start">here's why</Cite>).
          </>
        ),
      },
    ],
  },
];

const timeline: Array<{ id: string; heading: string; items: string[] }> = [
  {
    id: "day-1",
    heading: "Hours 0 to 24",
    items: [
      "Everyone is safe, and someone is staying with them.",
      "One call made to an interventionist, a treatment center, or a helpline.",
      "Bed availability, detox, and insurance checked.",
      "The excuses list started: pets, work, car, phone, kids.",
    ],
  },
  {
    id: "day-2",
    heading: "Hours 24 to 48",
    items: [
      "One calm person has the short conversation, with the plan in hand.",
      "If they say yes, you drive them. If they change their mind on the way, stay calm and keep driving.",
      "What happened is written down, with dates.",
    ],
  },
  {
    id: "day-3",
    heading: "Hours 48 to 72",
    items: [
      "If they said no, you haven't lost anything: you know what to prepare differently next time.",
      "Your boundary is written down: the line, what you will do, and the support you'll still offer.",
      "The plan stays current (facility, contact, coverage, transportation) so the next window doesn't find you guessing.",
      "You've put your own support on the calendar.",
    ],
  },
];

const fillIns = [
  "Treatment center or interventionist (name and number)",
  "Insurance company and member ID",
  "The one person who will do the talking",
  "Who's covering kids, pets, work, and the car",
  "Where the naloxone is kept",
];

const faqs = [
  {
    question: "What should a family do first after an overdose, arrest, or ER visit?",
    answer:
      "Make sure everyone is safe first: call 911 for an overdose or any immediate danger, and call or text 988 for a suicide or mental health crisis. Then, before calling a family meeting, call a professional to find out what treatment options and beds exist today, and solve the logistics your loved one might use as excuses.",
  },
  {
    question: "Why does the first 72 hours after a crisis matter so much?",
    answer:
      "For a short window, usually 24 to 72 hours, fear is bigger than shame, and someone who normally refuses help may say yes. Once they feel physically better, the fear fades and the excuses come back. Families who have the plan ready can often move within hours instead of days.",
  },
  {
    question: "Is keeping naloxone in the house enabling?",
    answer:
      "No. Enabling protects someone from the consequences of their choices. Naloxone protects them from dying, which isn't a consequence anyone learns from. It's sold over the counter and won't harm someone who isn't overdosing.",
  },
  {
    question: "What if the window already closed?",
    answer:
      "Then you missed one window, not the only one. Keep the plan current, stop cushioning the consequences so the next crisis lands on them instead of you, and get your own support in place. Preparation is never wasted.",
  },
  {
    question: "Can I print this checklist?",
    answer:
      "Yes. Use the Print or save as PDF button at the top of the page. The printout drops the menus and forms and keeps the checklist, the crisis numbers, and space to write in the details you'll need.",
  },
];

const First72Hours = () => (
  <div className="f72 min-h-screen bg-background">
    <SEOHead
      title="The First 72 Hours: A Family's Checklist After an Addiction Crisis | Party Wreckers"
      description="A free, printable checklist for families after an overdose, arrest, ER visit, or relapse: safety first, the first conversation, what not to do, and the next 72 hours."
      canonical={PATH}
      keywords="what to do after a loved one overdoses, after an addiction crisis, family crisis checklist, window of willingness, first 72 hours after overdose, printable addiction checklist"
    />
    <FAQJsonLd faqs={faqs} />
    <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "The First 72 Hours", url: PATH }]} />
    {/* Print stylesheet: drop the site chrome, keep the checklist and the crisis numbers. */}
    <style
      dangerouslySetInnerHTML={{
        __html: `
@media print {
  @page { margin: 14mm 14mm 16mm; }
  html, body { background: #fff !important; }
  [data-print-hide], .fixed, [role="dialog"], [data-radix-popper-content-wrapper] { display: none !important; }
  .f72, .f72 * { color: #111 !important; background: transparent !important; box-shadow: none !important; }
  .f72 main { padding-top: 0 !important; }
  .f72 .f72-box { border: 1.5pt solid #111 !important; }
  .f72 .f72-card { border: 1pt solid #888 !important; padding: 10pt 12pt !important; break-inside: avoid; }
  .f72 .f72-timeline { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; break-inside: avoid; }
  .f72 h1 { font-size: 22pt !important; margin-top: 0 !important; }
  .f72 h2 { font-size: 14pt !important; break-after: avoid; }
  .f72 li, .f72 .f72-closing { break-inside: avoid; }
  .f72 p, .f72 li { font-size: 10.5pt !important; line-height: 1.4 !important; }
  .f72 a { text-decoration: none !important; }
  .f72 a.f72-cite::after { content: " (partywreckers.com" attr(href) ")"; font-size: 8.5pt; font-weight: 400; }
  .f72 input[type="checkbox"] { width: 12pt !important; height: 12pt !important; -webkit-appearance: none; appearance: none; border: 1.2pt solid #111 !important; border-radius: 2pt; flex-shrink: 0; }
  .f72 input[type="checkbox"]:checked { background: #111 !important; }
  .f72 .f72-fill { border-bottom: 1pt solid #555 !important; min-height: 20pt; }
  .f72 .f72-print-only { display: block !important; }
  .f72 .f72-section { padding-top: 8pt !important; padding-bottom: 8pt !important; }
}
`,
      }}
    />

    <div data-print-hide>
      <Navbar />
    </div>

    <main className="pt-24 sm:pt-28">
      <div className="container mx-auto max-w-3xl px-4">
        <p className="f72-print-only hidden text-xs">partywreckers.com/first-72-hours · Matt Brown, The Party Wreckers</p>

        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Free printable checklist</p>
        <h1 className="mt-3 text-3xl font-bold leading-tight text-foreground sm:text-4xl md:text-5xl">
          The First 72 Hours: a family's checklist after an addiction crisis
        </h1>
        <section
          aria-labelledby="f72-danger"
          className="f72-box mt-6 rounded-xl border-2 border-destructive/60 bg-destructive/10 p-5 sm:p-6"
        >
          <h2 id="f72-danger" className="text-xl font-bold text-foreground">
            If anyone is in danger right now, stop reading and call.
          </h2>
          <ul className="mt-3 space-y-2 text-foreground">
            <li>
              <strong>Immediate danger or overdose:</strong>{" "}
              <a href="tel:911" className="whitespace-nowrap font-semibold underline">
                Call 911
              </a>
            </li>
            <li>
              <strong>Suicide or mental health crisis:</strong>{" "}
              <a href="tel:988" className="whitespace-nowrap font-semibold underline">
                Call or text 988
              </a>
            </li>
            <li>
              <strong>SAMHSA National Helpline</strong> (free, confidential, 24/7 treatment referrals):{" "}
              <a href="tel:18006624357" className="whitespace-nowrap font-semibold underline">
                1-800-662-4357
              </a>
            </li>
          </ul>
        </section>
        <p className="mt-6 text-lg text-muted-foreground">
          An overdose. An arrest. A 2 a.m. call from the ER. A relapse after months of doing well. I've sat in a lot of
          hospital hallways with families asking, "So what do we do now?" Here's my honest answer: you have a short
          window, usually a day or three, when the person you love is scared enough to say yes to help. That's not a
          reason to panic. It's a reason to be ready.
        </p>
        <p className="mt-4 text-muted-foreground">
          Everything on this list comes from what I've written here before, from 23 years sober and 20-plus years of
          doing interventions. Check things off as you go. You don't have to do it all tonight.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row" data-print-hide>
          <Button type="button" onClick={() => window.print()}>
            <Printer className="h-4 w-4" aria-hidden="true" />
            <span className="ml-2">Print or save as PDF</span>
          </Button>
          <Button asChild variant="outline">
            <a href="#email-checklist">Email it to me</a>
          </Button>
          <Button asChild variant="ghost">
            <Link to="/family-check-in">
              <ClipboardCheck className="h-4 w-4" aria-hidden="true" />
              <span className="ml-2">Take the family check-in</span>
            </Link>
          </Button>
        </div>


        {sections.map((section, sectionIndex) => (
          <section key={section.id} aria-labelledby={`f72-${section.id}`} className="f72-section py-8 sm:py-10">
            <h2 id={`f72-${section.id}`} className="text-2xl font-semibold text-foreground">
              {sectionIndex + 1}. {section.heading}
            </h2>
            <p className="mt-2 text-muted-foreground">{section.intro}</p>
            <ul className="mt-5 space-y-4">
              {section.items.map((item, itemIndex) => {
                const id = `f72-${section.id}-${itemIndex}`;
                return (
                  <li key={id} className="flex gap-3">
                    <input
                      type="checkbox"
                      id={id}
                      className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-[hsl(var(--primary))]"
                    />
                    <div>
                      <label htmlFor={id} className="cursor-pointer font-semibold text-foreground">
                        {item.title}
                      </label>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <section aria-labelledby="f72-plan" className="f72-section py-8 sm:py-10">
          <h2 id="f72-plan" className="text-2xl font-semibold text-foreground">
            {sections.length + 1}. Plan the next 72 hours
          </h2>
          <p className="mt-2 text-muted-foreground">
            The families who use a window well had usually gotten ready before it showed up. If you're past the window,
            this is how you get ready for the next one.
          </p>
          <div className="f72-timeline mt-5 grid gap-4 md:grid-cols-3">
            {timeline.map((block) => (
              <div key={block.id} className="f72-card rounded-xl border border-border bg-card p-4">
                <h3 className="font-semibold text-foreground">{block.heading}</h3>
                <ul className="mt-3 space-y-3">
                  {block.items.map((text, index) => {
                    const id = `f72-${block.id}-${index}`;
                    return (
                      <li key={id} className="flex gap-2">
                        <input
                          type="checkbox"
                          id={id}
                          className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[hsl(var(--primary))]"
                        />
                        <label htmlFor={id} className="cursor-pointer text-sm text-muted-foreground">
                          {text}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="f72-card mt-6 rounded-xl border border-border bg-card p-4 sm:p-5">
            <h3 className="font-semibold text-foreground">Keep these in one place</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Fill it in on paper. The difference is often whether the phone number was already in somebody's pocket.
            </p>
            <dl className="mt-3 space-y-3">
              {fillIns.map((label) => (
                <div key={label} className="f72-fill border-b border-border pb-3">
                  <dt className="text-sm text-muted-foreground">{label}</dt>
                  <dd className="sr-only">Write it in on the printed copy</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="f72-closing">
          <p className="mt-6 text-sm text-muted-foreground">
            Want to talk it through? Call{" "}
            <a href={SITE_PHONE_HREF} className="inline-flex items-center gap-1 font-semibold text-primary underline">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {SITE_PHONE_DISPLAY}
            </a>{" "}
            or <Link to="/get-help" className="font-semibold text-primary underline">tell Matt what's going on</Link>. For
            yourself, join{" "}
            <TrackedExternalLink
              href={funnelLinks.familySquares}
              target="_blank"
              rel="noopener noreferrer"
              eventName="family_squares_click"
              ctaLabel="First 72 Hours checklist"
              className="font-semibold text-primary underline"
            >
              The Family Squares
            </TrackedExternalLink>
            , free on Zoom every Monday at 7:00 PM Pacific.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            This checklist is general guidance from a professional interventionist, not medical or legal advice. In an
            emergency, call 911.
          </p>
          </div>
        </section>

        <div id="email-checklist" className="scroll-mt-28 pb-4" data-print-hide>
          <LeadMagnetSignup source="lead_72_hours" />
        </div>
      </div>

      <div data-print-hide>
        <RelatedArticles
          slugs={[
            "72-hours-after-crisis-window-of-willingness",
            "overdose-safety-plan-for-families",
            "what-to-do-after-a-relapse-first-24-hours",
          ]}
        />
        <FaqSection title="Questions families ask" faqs={faqs} />
      </div>
    </main>

    <div data-print-hide>
      <Footer />
    </div>
  </div>
);

export default First72Hours;
