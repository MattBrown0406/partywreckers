import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-rebuild-trust-after-addiction.jpg";

const SLUG = "how-to-rebuild-trust-after-addiction";
const TITLE = "How to Rebuild Trust After Addiction: What Actually Works (and What Doesn't)";
const DESCRIPTION =
  "An interventionist with 23 years sober explains how to rebuild trust after addiction — what actually restores it, how long it takes, and what families can do.";

const faqs = [
  {
    question: "How do you rebuild trust after addiction?",
    answer:
      "Trust is rebuilt through consistent, verifiable behavior over time — doing what you say you'll do, volunteering honesty before being asked, and staying calm when questioned. Promises and apologies don't rebuild trust; predictability does.",
  },
  {
    question: "How long does it take to rebuild trust after addiction?",
    answer:
      "Most families see meaningful trust return after one to three years of consistent sobriety, though there's no fixed timeline. A useful rule of thumb: trust tends to come back at roughly the pace it was lost.",
  },
  {
    question: "Should I trust someone in early recovery?",
    answer:
      "Extend opportunity, not blind trust. Early recovery is the time for verification and accountability — checking in, transparency, honest conversation. Trust handed over without evidence doesn't help the person in recovery; earning it is part of their healing.",
  },
  {
    question: "Is it normal to still not trust my loved one after they got sober?",
    answer:
      "Completely normal. Distrust after addiction is a survival skill, not a character flaw, and it fades on the evidence's timeline, not the calendar's. If distrust persists after years of consistent sobriety, consider support like Al-Anon for your own healing.",
  },
  {
    question: "What should I do if my loved one is still using and lying?",
    answer:
      "Then rebuilding trust isn't the priority — getting help is. Stop negotiating with the addiction, get support for yourself, and consider talking with a professional interventionist about next steps.",
  },
];

const RebuildTrustAfterAddiction = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${TITLE} — Party Wreckers`}
        description={DESCRIPTION}
        canonical={`/blog/${SLUG}`}
        ogType="article"
        ogImage={blogImage}
        keywords="how to rebuild trust after addiction, trust after sobriety, family recovery, verification, accountability, Matt Brown interventionist"
        publishedTime="2026-07-22"
      />

      <ArticleJsonLd
        title={TITLE}
        description={DESCRIPTION}
        image={blogImage}
        datePublished="2026-07-22"
        dateModified="2026-07-22"
        slug={SLUG}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: "How to Rebuild Trust After Addiction", url: `/blog/${SLUG}` },
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
            alt="A young adult son and his mother sitting at a kitchen table with coffee mugs in warm morning light, having an honest conversation"
            className="w-full rounded-lg shadow-lg"
            width={1024}
            height={1024}
          />
        </div>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            {TITLE}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>By Matt Brown</span>
            <span>|</span>
            <time dateTime="2026-07-22">July 22, 2026</time>
          </div>
        </header>

        <div className="mb-8">
          <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />
        </div>

        <ArticleAnswerSummary slug={SLUG} />

        <div className="prose prose-lg max-w-none text-foreground">
          <p>
            About six months into my sobriety, I asked my family a question I thought was reasonable: "When are you going to start trusting me again?" The silence that followed taught me more than any meeting I'd sat in. I had been sober for six months. I had been lying to them for years. I was asking them to balance those two things on a scale, and I was genuinely surprised the scale didn't tip my way.
          </p>

          <p>
            Twenty-three years later, I sit in living rooms for a living, and I hear my old question coming out of other people's mouths all the time. Newly sober sons asking why Mom still checks their eyes when they walk in. Wives asking me when they're supposed to stop looking at the bank account every night. So let's talk about how to rebuild trust after addiction — from someone who had to earn it back himself, and who now watches families do it every week.
          </p>

          <h2>Why Is Trust the Last Thing to Come Back After Addiction?</h2>

          <p>
            Trust is the last thing to return because it was the first thing to go, and it left in a thousand small pieces. Sobriety can begin in a single day. Trust cannot, because trust isn't a decision — it's a prediction. Your family trusts you when their nervous system stops bracing for the next lie, and nervous systems only update with evidence over time.
          </p>

          <p>
            Here's what I tell the newly sober person in the room: your family didn't stop trusting you because they're bitter. They stopped trusting you because you trained them to. Every "I'm fine" that wasn't fine, every missing twenty, every 2 a.m. phone call — that was the training. It took years to teach them not to trust you. It's not unreasonable that it takes more than ninety days to teach them something new.
          </p>

          <p>
            And here's what I tell the family: your distrust is not a character flaw. It's a survival skill you developed honestly. You don't have to apologize for it. You also don't get to use it as a weapon forever. More on that in a minute.
          </p>

          <h2>What Actually Rebuilds Trust After Addiction?</h2>

          <p>
            Trust is rebuilt through predictability, not promises. That's the whole formula. Not grand gestures, not tearful apologies, not the perfect amends letter. Trust comes back when what you say you're going to do and what you actually do match, over and over, for a long time, especially when it's inconvenient.
          </p>

          <p>In practice, that looks smaller and more boring than most people expect:</p>

          <ul>
            <li>Say where you're going, go there, and come home when you said you would. A hundred times in a row. This does more than any speech.</li>
            <li>Volunteer information before you're asked. Secrecy was the disease's native language. Transparency — offering your location, your phone, your bank statement without being cornered into it — speaks the new one.</li>
            <li>Keep tiny commitments. Take out the trash when you said you would. Show up at your kid's game on time. Trust isn't rebuilt at the big moments; it's rebuilt in the small ones nobody's grading.</li>
            <li>Stay calm when you're questioned. If your wife asks whether you've been drinking and you explode, you just confirmed her fear — not about the drinking, but about whether it's safe to be honest with you.</li>
          </ul>

          <p>
            That last one is where most early trust-building falls apart. Being asked "have you been using?" when you're clean stings. But the sober answer is, "No — and I understand why you're asking. Ask me anytime." Say that enough times, calmly, and one day they'll stop asking.
          </p>

          <h3>How Long Does It Take to Rebuild Trust After Addiction?</h3>

          <p>
            Longer than the sober person wants and often shorter than the family fears — most families I work with describe real shifts somewhere between one and three years of consistent sobriety. Not perfection. Consistency. There's no fixed timeline, because trust doesn't return on the addicted person's schedule. It returns on the evidence's schedule.
          </p>

          <p>
            A rough rule I share in living rooms: trust tends to come back at about the pace it left. If the lying went on for eight years, the first year of sobriety is a down payment, not a payoff. That's not punishment. That's just math the family's nervous system is doing whether anyone likes it or not.
          </p>

          <h3>What Families Get Wrong About Trust</h3>

          <p>
            The family has a job in this too, and it's the part nobody wants to hear. Distrust that was protective during active addiction can quietly become a habit — even a form of control — long after the evidence has changed. I've watched loved ones stay sober for three, four, five years while a spouse or parent kept treating them like it was day thirty. At some point, "I'm just being careful" becomes "I'm keeping you in debt."
          </p>

          <p>
            Here's the distinction I offer families: verification is healthy; surveillance forever is not. Early on, checking is reasonable — that's what accountability looks like. But if your loved one has years of consistent, verifiable sobriety and you're still leading with suspicion, the trust problem may no longer be about them. It may be about a wound in you that needs its own recovery. Al-Anon exists for exactly this reason, and I've never once sent a family member there who regretted going.
          </p>

          <h3>When Trust Shouldn't Come Back Yet</h3>

          <p>
            Let me be direct about the other side: if your loved one is still using, still lying, or newly sober and already demanding your trust as a condition of their recovery — don't hand it over. Trust extended without evidence isn't love. It's enabling with better branding. The kindest thing you can do for someone early in recovery is let them earn it, because earning it is part of what heals them.
          </p>

          <p>
            If you're stuck in that earlier chapter — the one where sobriety hasn't started yet and the lies are still coming — trust isn't the conversation to have. Getting help is. See{" "}
            <Link to="/blog/living-amends-what-recovery-asks-after-sorry" className="text-primary hover:underline">
              living amends
            </Link>{" "}
            for what recovery asks after sorry, or{" "}
            <Link to="/blog/coming-home-from-rehab-what-families-arent-prepared-for" className="text-primary hover:underline">
              coming home from rehab
            </Link>{" "}
            for what families aren't prepared for after treatment.
          </p>

          <h2>The Day the Scale Tips</h2>

          <p>
            I can't tell you exactly when my family started trusting me again, because there was no ceremony. No one handed me a certificate. What I can tell you is that somewhere along the way, my mom stopped pausing before she believed me. My kids grew up never once wondering if Dad would show up. That's what rebuilt trust looks like — not a moment, but an absence of bracing.
          </p>

          <p>
            If you're the one earning it back: keep going. Boring, predictable, honest — a hundred times in a row. If you're the one deciding whether to give it: you don't have to rush, and you don't have to stay locked up forever either. Trust is a bridge you build from both ends. It meets in the middle, usually later than everyone hoped, and it holds.
          </p>

          <h2>Frequently Asked Questions About Rebuilding Trust After Addiction</h2>

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
              If this hit home, come listen to <strong>The Party Wreckers</strong> podcast — new episodes weekly, real conversations about addiction, recovery, and the families caught in the middle. Follow along, share it with someone who needs it, and if your family is somewhere earlier in this story — still in the lying, still in the fear —{" "}
              <a href="https://freedominterventions.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                talk with a professional interventionist at FreedomInterventions.com
              </a>
              . The first conversation costs nothing but the willingness to have it.
            </p>
          </div>

          <div className="border-t border-border pt-8 mt-12">
            <h3 className="text-xl font-bold mb-4">Related Articles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog/living-amends-what-recovery-asks-after-sorry" className="text-primary hover:underline">
                  Living Amends: What Recovery Asks After Sorry
                </Link>
              </li>
              <li>
                <Link to="/blog/coming-home-from-rehab-what-families-arent-prepared-for" className="text-primary hover:underline">
                  Coming Home From Rehab: What Families Aren't Prepared For
                </Link>
              </li>
              <li>
                <Link to="/blog/still-angry-after-loved-one-gets-sober" className="text-primary hover:underline">
                  They Got Sober. So Why Are You Still Angry?
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

export default RebuildTrustAfterAddiction;
