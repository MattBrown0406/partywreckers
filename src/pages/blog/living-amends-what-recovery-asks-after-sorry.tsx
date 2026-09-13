import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-living-amends-recovery.jpg";

const SLUG = "living-amends-what-recovery-asks-after-sorry";
const TITLE = "Living Amends: What Recovery Actually Asks of You After You Say Sorry";
const DESCRIPTION =
  "Saying sorry is the easy part. Interventionist Matt Brown on what a living amends in recovery actually requires — and why it takes years, not an apology.";

const faqs = [
  {
    question: "What's the difference between making amends and a living amends?",
    answer:
      "Making amends is usually a specific act — an apology, a conversation, paying back what was taken. A living amends is the sustained behavior change afterward that proves the apology was real. One is an event; the other is a pattern that has to continue indefinitely.",
  },
  {
    question: "How long does a living amends usually take?",
    answer:
      "There's no fixed timeline. It depends on how much harm occurred and how long it took to happen. Some repairs take months; others, especially around childhood harm or long-term addiction in a marriage, can take years and may never fully \"complete.\"",
  },
  {
    question: "Is it okay to not forgive someone who's apologized and is in recovery?",
    answer:
      "Yes. Forgiveness and trust are two different things, and neither is owed automatically because someone apologized or got sober. You're allowed to wait, watch the pattern, and extend trust at your own pace.",
  },
  {
    question: "What if my loved one keeps apologizing but nothing changes?",
    answer:
      "That's worth naming directly. A repeated apology with no behavior change isn't a living amends — it's a loop. Ask specifically what's different this time, in concrete terms, not in feelings.",
  },
  {
    question: "Can a living amends repair a relationship completely?",
    answer:
      "Sometimes. Sometimes the relationship heals into something close to what it was. Other times it heals into something different — closer in some ways, more guarded in others. Both outcomes can be a success if the harm has genuinely stopped.",
  },
  {
    question: "Where does an interventionist fit into this process?",
    answer:
      "An interventionist's job is usually earlier in the timeline — getting someone into treatment in the first place. But many of us keep working with families well into recovery, because the living amends phase is where relationships either rebuild or quietly fall apart.",
  },
];

const LivingAmendsRecovery = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${TITLE} — Party Wreckers`}
        description={DESCRIPTION}
        canonical={`/blog/${SLUG}`}
        ogType="article"
        ogImage={blogImage}
        keywords="living amends in recovery, making amends, step nine, rebuilding trust after addiction, Matt Brown interventionist, family recovery"
        publishedTime="2026-06-22"
      />

      <ArticleJsonLd
        title={TITLE}
        description={DESCRIPTION}
        image={blogImage}
        datePublished="2026-06-22"
        dateModified="2026-06-22"
        slug={SLUG}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: "Living Amends in Recovery", url: `/blog/${SLUG}` },
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
            alt="A father in his early fifties on a dim front porch at dusk talking quietly with his young adult daughter who stands with arms crossed listening"
            className="w-full rounded-lg shadow-lg"
            width={1920}
            height={1088}
          />
        </div>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
            {TITLE}
          </h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>By Matt Brown</span>
            <span>|</span>
            <time dateTime="2026-06-22">June 22, 2026</time>
          </div>
        </header>

        <div className="mb-8">
          <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />
        </div>

        <ArticleAnswerSummary slug={SLUG} />

        <div className="prose prose-lg max-w-none text-foreground">
          <p>
            My oldest is 22 now. When she was a teenager, I sat her down and apologized for the years I wasn't really there — present in the room, absent everywhere else. She listened, she nodded, and then she said something I've never forgotten: "Okay. So what's different now?"
          </p>

          <p>
            Not "I forgive you." Not "thank you." She asked for evidence.
          </p>

          <p>
            That's the moment I actually understood amends. I'd said sorry plenty of times in early sobriety. What I hadn't done yet was the part that costs something — the part that shows up after the apology and keeps showing up. In recovery, we call that a living amends. It's the work nobody claps for.
          </p>

          <h2>What Is a Living Amends?</h2>

          <p>
            A living amends is the ongoing, behavioral proof that you've changed — not a one-time statement that you're sorry. It's what you do consistently, over months and years, that the people you hurt can actually observe and rely on.
          </p>

          <p>
            Step Nine in the recovery world talks about{" "}
            <Link to="/blog/making-amends-in-recovery" className="text-primary hover:underline">
              making amends
            </Link>{" "}
            "wherever possible," but it doesn't say the work ends with the conversation. For a lot of harm — broken trust, missed years, money lost, promises broken — there's no single sentence that repairs it. The repair happens in pattern, not in speech.
          </p>

          <p>
            This matters for families too. If your loved one is newly sober and says all the right things, that's a start. It's not the proof. The proof is six months from now, when they're still doing what they said they'd do on an ordinary Tuesday with nothing riding on it.
          </p>

          <h2>Why Saying Sorry Wasn't Enough For Me</h2>

          <p>
            I meant every apology I gave my kids. That was never the problem. The problem was that an apology is fast and a relationship is slow, and I wanted the fast version to count for the slow thing.
          </p>

          <p>
            Here's the short-term payoff of an apology: the discomfort lifts. You said the hard thing, the room feels lighter, you get to feel like a person who's dealing with it. Here's the long-term cost if you stop there: the people you hurt learn that your words and your follow-through are two different currencies. That's a hard pattern to undo once it's set.
          </p>

          <p>
            My daughter wasn't being cold when she asked what was different. She was being accurate. Words are cheap to produce and expensive to verify. She'd been burned by my words before. She wasn't going to spend trust on them again without proof.
          </p>

          <h3>What Living Amends Actually Looks Like, Day to Day</h3>

          <p>
            It's smaller and more boring than people expect. A living amends rarely looks like a grand gesture. It looks like reliability on ordinary days, repeated long enough that it stops being surprising.
          </p>

          <p>For me, that meant:</p>

          <ul>
            <li>Showing up for the things I said I'd show up for, including the small ones nobody would notice if I skipped.</li>
            <li>Telling the truth even when a smaller version of the truth would've been easier and nobody would've checked.</li>
            <li>Not asking for credit. The amends isn't for you — it's not a performance that needs an audience.</li>
            <li>Tolerating the silence when someone wasn't ready to trust me yet, instead of pushing them to hurry up and forgive me.</li>
          </ul>

          <h3>Showing Up on the Boring Days</h3>

          <p>
            The hardest part isn't the big repair conversation. It's Tuesday. It's the unremarkable day when no one's watching and there's no emotional payoff for following through — and you do it anyway. That's the rep that actually rebuilds trust. One impressive gesture doesn't outweigh a hundred boring, consistent ones; a hundred boring, consistent ones eventually outweigh the years of harm.
          </p>

          <h3>How Families Can Tell the Difference Between Words and a Living Amends</h3>

          <p>
            You can tell the difference by watching what holds up under inconvenience. Anyone can keep a promise when it's easy. A living amends shows up when it's not — when they're tired, inconvenienced, or there's no one around to see it.
          </p>

          <p>A few honest questions to ask yourself:</p>

          <ul>
            <li>Has anything actually changed, or has the apology become the thing that's supposed to substitute for change?</li>
            <li>Are they asking you to move faster than you're ready to, using the apology as leverage?</li>
            <li>Is the change happening on its own terms, or only when there's an audience — you, a therapist, an interventionist?</li>
          </ul>

          <p>
            You're allowed to wait for proof. Wanting to see consistency before you re-extend trust — part of{" "}
            <Link to="/blog/rebuilding-trust-in-recovery-families" className="text-primary hover:underline">
              rebuilding trust after addiction
            </Link>{" "}
            — isn't punishment. It's just accurate. Don't let anyone, including someone you love, tell you that needing time to verify a pattern makes you the unreasonable one.
          </p>

          <h2>When the Living Amends Takes Years, Not Months</h2>

          <p>
            Some harm takes a long time to repair, and that's not a sign anything's broken — it's the actual size of what happened. The amends for a single broken promise might take weeks. The amends for a childhood spent walking on eggshells around a parent's addiction can take years, and sometimes the relationship changes shape permanently rather than fully "resolving."
          </p>

          <p>
            I'm 23 years sober. I'm still doing parts of this amends with my kids — not because I haven't changed, but because rebuilding 18 years of a marriage's worth of distance, and the years before that, doesn't run on my preferred timeline. It runs on theirs. My job is to stay decided and keep showing up, not to demand a finish line.
          </p>

          <p>
            If you're the one trying to make amends: stop measuring your progress by how forgiven you feel. Measure it by whether your actions this month would hold up if someone wrote them down and compared them to your words.
          </p>

          <p>
            If you're the one waiting to see if it's real: you don't owe anyone instant trust because they apologized well. Watch the pattern. It'll tell you the truth faster than any conversation will.
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
            <h3 className="text-xl font-bold mb-2">Listen, Follow, Reach Out</h3>
            <p>
              If you're in the middle of this — apologizing, waiting, or trying to figure out if the change is real — you're not doing it wrong by needing time. Listen to this week's episode of <strong>The Party Wreckers podcast</strong> for more on what recovery actually requires once the applause stops.
            </p>
            <p>
              And if your family needs help having this conversation, reach out at{" "}
              <a href="https://freedominterventions.com/contact" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                FreedomInterventions.com
              </a>
              .
            </p>
          </div>

          <div className="border-t border-border pt-8 mt-12">
            <h3 className="text-xl font-bold mb-4">Related Articles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog/making-amends-in-recovery" className="text-primary hover:underline">
                  Making Amends in Recovery
                </Link>
              </li>
              <li>
                <Link to="/blog/rebuilding-trust-in-recovery-families" className="text-primary hover:underline">
                  Rebuilding Trust in Recovery: Families
                </Link>
              </li>
              <li>
                <Link to="/blog/apologies-dont-equal-change" className="text-primary hover:underline">
                  Why Apologies Don't Equal Change
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

export default LivingAmendsRecovery;
