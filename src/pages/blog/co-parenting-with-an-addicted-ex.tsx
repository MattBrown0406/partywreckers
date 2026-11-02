import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-co-parenting-with-an-addicted-ex.jpg";

const SLUG = "co-parenting-with-an-addicted-ex";
const TITLE = "Co-Parenting With an Addicted Ex: Protecting Your Kids Without Losing Yourself";
const DESCRIPTION =
  "Co-parenting with an addicted ex? An interventionist with 23 years sober shares how to protect your kids, set boundaries, and know when to get help.";

const faqs = [
  {
    question: "Can I stop visitation if my ex is drinking again?",
    answer:
      "Usually not on your own — custody orders stay in force until a court changes them, and withholding visitation unilaterally can backfire legally. Document what you're seeing, talk to a family law attorney, and know that emergency motions exist for genuine danger. I'm an interventionist, not a lawyer — get real legal advice for your state.",
  },
  {
    question: "Should I tell my kids their parent is an addict?",
    answer:
      "Tell them the truth at a level they can carry. Kids sense the problem long before anyone names it, and silence teaches them to distrust their own eyes. Use the word \"disease,\" keep blame out of it, and repeat the essentials: it's not their fault and it's not their job to fix.",
  },
  {
    question: "What do I do if my ex shows up impaired for a pickup?",
    answer:
      "Don't hand over the kids. Stay calm, keep it short, and offer a rescheduled visit rather than a fight in the driveway. Document what happened while it's fresh. If they attempt to drive away with the kids anyway, that's a call-the-police situation, full stop.",
  },
  {
    question: "Can an intervention work on an ex-spouse?",
    answer:
      "Yes. Interventions are about the people the addicted person still loves and listens to, and kids are often the most powerful voice in the room. An ex-spouse participating for the children's sake can carry enormous weight. A professional interventionist can help you decide whether it makes sense in your situation.",
  },
  {
    question: "Am I enabling my ex if I cover for them with the kids?",
    answer:
      "If you're inventing excuses to protect your kids from the truth, yes — that's enabling, and it costs your kids their grip on reality. Protecting kids from harm is your job. Protecting them from accurate information about a disease in their family is not the same thing.",
  },
];

const CoParentingWithAnAddictedEx = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${TITLE} — Party Wreckers`}
        description={DESCRIPTION}
        canonical={`/blog/${SLUG}`}
        ogType="article"
        ogImage={blogImage}
        keywords="co-parenting with an addicted ex, custody and addiction, addicted ex-spouse, protecting kids from addiction, co-parenting boundaries"
        publishedTime="2026-08-11"
      />

      <ArticleJsonLd
        title={TITLE}
        description={DESCRIPTION}
        image={blogImage}
        datePublished="2026-08-11"
        dateModified="2026-08-11"
        slug={SLUG}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: TITLE, url: `/blog/${SLUG}` },
        ]}
      />

      <FAQJsonLd faqs={faqs} />

      <Navbar />

      <article className="max-w-3xl mx-auto px-4 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link to="/blog" className="hover:text-primary flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </nav>

        <div className="mb-8">
          <img
            src={blogImage}
            alt="A mother standing alone in a dim kitchen at night, holding her phone and watching an empty driveway"
            className="w-full rounded-lg shadow-lg"
            width={1024}
            height={1024}
          />
        </div>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{TITLE}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>By Matt Brown</span>
            <span>|</span>
            <time dateTime="2026-08-11">August 11, 2026</time>
          </div>
        </header>

        <div className="mb-8">
          <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />
        </div>

        <ArticleAnswerSummary slug={SLUG} />

        <div className="prose prose-lg max-w-none text-foreground">
          <p>
            A few years back, I got a call on a Sunday night from a mom I'll call Dana. Details changed, as always. Her ex-husband was three hours late bringing their kids home. Again. She'd called his phone. She'd called his mother. She was pacing her kitchen trying to decide whether this was a call-the-police night or a he'll-show-up-smelling-like-a-bar night. Years of marriage had taught her the difference. Divorce made it harder, not easier, because now she couldn't see it coming.
          </p>

          <p>
            If you're co-parenting with an addicted ex, you know that exact feeling. The not-knowing. You divorced the chaos, and the chaos kept visitation rights. This one's for you.
          </p>

          <h2>What Does Co-Parenting With an Addicted Ex Actually Look Like?</h2>

          <p>
            Co-parenting with an addicted ex means working two jobs at once: raising your kids and monitoring a disease you have no control over. Your job is not to fix your ex or manage their recovery. Your job is to keep your kids safe and steady while their other parent's addiction runs its course.
          </p>

          <p>
            Nobody tells you this at the divorce table: the papers end the marriage, not the relationship. With kids, you're tied to this person for years. And the patterns you built in the marriage — checking up, covering, negotiating — don't dissolve when the judge signs. They follow you into the custody schedule.
          </p>

          <p>
            I've watched people enable an ex harder than they ever enabled a spouse, because guilt is now driving. The shift is this: you're no longer managing them. You're managing your kids' exposure to them. Those are different jobs, and the second one is actually possible.
          </p>

          <h2>Is It Safe for My Kids to Be With Their Addicted Parent?</h2>

          <p>
            Sometimes yes, sometimes no — and the honest answer can change month to month. Safety is about current behavior, not history and not how you feel about the divorce. Plenty of people in active addiction can parent adequately for a weekend. Plenty can't. Your job is knowing which one you're dealing with right now.
          </p>

          <p>These are the signs that mean act, not wait:</p>

          <ul>
            <li>Driving with the kids while impaired, even once.</li>
            <li>Drinking or using to the point of blacking out or passing out during visits.</li>
            <li>Unsafe people or unsafe situations in the home during parenting time.</li>
            <li>
              Your kids coming home describing how they took care of their parent — making dinner, waking them up, keeping the younger sibling quiet.
            </li>
          </ul>

          <p>
            There's a difference between discomfort and danger. Cereal for dinner is discomfort. Driving them home after four drinks is danger. Courts respond to patterns and documentation, not to your anxiety. So document — dates, times, what you saw, what the kids said unprompted. Not to build a weapon. To build a record.
          </p>

          <h2>How Do I Talk to My Kids About Their Parent's Addiction?</h2>

          <p>
            Tell the truth in age-sized pieces. Your kids already know something is wrong — they've known longer than you think. When you say nothing, you don't protect them. You teach them not to trust what they can plainly see. This is one of the clearest ways{" "}
            <Link to="/blog/how-addiction-affects-siblings" className="text-primary hover:underline">
              addiction affects children in the family
            </Link>
            .
          </p>

          <p>
            For a young child, it can be as simple as: "Dad has a sickness that makes him make unsafe choices when he drinks. It's not your fault, and it's not your job to fix it." Older kids can handle more, and they'll respect you for the honesty. Every kid, at every age, needs those two sentences somewhere in the conversation: not your fault, not your job.
          </p>

          <p>
            Two hard rules. First, your kids are never messengers, spies, or reporters. "What was Dad doing this weekend?" asked with an agenda puts them in the middle of something they didn't choose. Second, you don't trash the other parent — ever. Your kid is half of them, and they hear an attack on your ex as an attack on themselves. Name the disease without shredding the person.
          </p>

          <h2>What Boundaries Work When You're Co-Parenting With an Addicted Ex?</h2>

          <p>
            The boundaries that hold are about behavior, not sobriety. You can't enforce "don't drink." You've already proven that — the marriage was the experiment. You can enforce "you don't drive our kids if you've been drinking" and "if you show up impaired, the visit doesn't happen."
          </p>

          <p>A few that I've watched work in real families:</p>

          <ul>
            <li>
              Keep communication in writing — text or a co-parenting app. Logistics only. Written words are calmer, and they create a record.
            </li>
            <li>
              Stop covering. When your ex misses a pickup, the answer is "Dad couldn't make it today," not an invented work emergency. You don't have to narrate their failure, but you don't get to fictionalize it either.
            </li>
            <li>
              Put sobriety terms in the parenting plan where the situation warrants it — sober visits, testing, supervised time. That's not vindictive. That's structure.
            </li>
            <li>
              Let consequences land. If they lose parenting time because of their choices, that loss belongs to them. You didn't take it. They spent it.
            </li>
          </ul>

          <p>
            This is the same thing I teach intact families: a boundary is not a punishment. It's a decision about what you will do, held calmly, regardless of how they respond. If the line between the two still feels blurry, read{" "}
            <Link to="/blog/enabling-vs-supporting-boundaries" className="text-primary hover:underline">
              enabling versus supporting
            </Link>
            .
          </p>

          <h2>When Should You Get Professional Help?</h2>

          <p>
            Earlier than you think. If safety concerns keep recurring, if your kids seem anxious or are acting like little adults, or if your whole life is organized around what your ex might do next — that's the line. You're past it.
          </p>

          <p>
            Family recovery doesn't require a shared address. Al-Anon works for ex-spouses. Therapy for kids works. And most people don't know this:{" "}
            <a
              href="https://freedominterventions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              professional interventions
            </a>{" "}
            can include an ex. Some of the most effective interventions I've done had the former spouse in the room — not for the marriage, but for the kids caught between. You can be done with someone and still show up for the moment that might save their life.
          </p>

          <p>
            Dana's story didn't end that Sunday night. He showed up at 9:40, defensive and slurring, and this time she documented, called an attorney, and eventually called me. Her ex went to treatment eight months later. Not because she managed him into it — because she stopped absorbing the consequences that finally got his attention. That's not a fairy tale. It's{" "}
            <Link to="/blog/what-families-should-know-before-calling-interventionist" className="text-primary hover:underline">
              what happens when families get help
            </Link>
            , sometimes, when one parent gets steady enough to stop holding everything up.
          </p>

          <p>
            You can't control what your ex does with their disease. You can control what your kids come home to. Start there.
          </p>

          <h2>Frequently Asked Questions</h2>

          <div className="space-y-6 my-8">
            {faqs.map((f) => (
              <div key={f.question}>
                <h3 className="text-lg font-semibold mb-2">{f.question}</h3>
                <p>{f.answer}</p>
              </div>
            ))}
          </div>

          <div className="bg-muted/50 border border-border rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold mb-2">You Don't Have to Figure This Out Alone</h3>
            <p>
              If this hits close to home,{" "}
              <Link to="/episodes" className="text-primary hover:underline">
                The Party Wreckers podcast
              </Link>{" "}
              is where I talk through situations exactly like this one — episodes for families who are done pretending things are fine. Follow along wherever you listen. And if your family needs real help now,{" "}
              <a
                href="https://freedominterventions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                reach out through FreedomInterventions.com
              </a>
              . The first conversation is just that — a conversation.
            </p>
          </div>

          <div className="border-t border-border pt-8 mt-12">
            <h3 className="text-xl font-bold mb-4">Related Articles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog/how-addiction-affects-siblings" className="text-primary hover:underline">
                  How Addiction Affects Siblings
                </Link>
              </li>
              <li>
                <Link to="/blog/enabling-vs-supporting-boundaries" className="text-primary hover:underline">
                  Enabling vs. Supporting: Where the Line Actually Is
                </Link>
              </li>
              <li>
                <Link to="/blog/grandparents-raising-grandchildren-addiction" className="text-primary hover:underline">
                  When Grandparents Become Parents Again
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default CoParentingWithAnAddictedEx;
