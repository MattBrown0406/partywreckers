import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import FaqSection from "@/components/FaqSection";
import { ArrowLeft } from "lucide-react";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-forgiving-an-addict-in-recovery.jpg";

const SLUG = "forgiving-an-addict-in-recovery";
const TITLE = "Do I Have to Forgive Them? The Truth About Forgiving an Addict in Recovery";
const DESCRIPTION =
  "Your loved one got sober and everyone expects you to forgive them. Matt Brown on what forgiving an addict in recovery really takes, and what it doesn't.";

const faqs = [
  {
    question: "Do I have to forgive my loved one for their recovery to work?",
    answer:
      "No. A healthy recovery is not dependent on anyone else's forgiveness. If your loved one's sobriety hinges on how you feel, that's a sign they need more support from their own program, not a reason to rush your process.",
  },
  {
    question: "What's the difference between forgiveness and trust in recovery?",
    answer:
      "Forgiveness is an internal release of resentment. Trust is an earned track record built through consistent behavior over time. You can forgive fully and still keep boundaries in place while trust is rebuilt.",
  },
  {
    question: "Should I tell my sober loved one that I'm still angry?",
    answer:
      "Yes, if it's said with care. \"I'm glad you're sober and I'm still working through some hurt\" is honest and fair. A person with solid recovery can hear that without it destabilizing them.",
  },
  {
    question: "What if I forgave them and then they relapsed?",
    answer:
      "Relapse doesn't erase your forgiveness or make it a mistake. It does mean you get to reset your boundaries and take care of yourself first. Forgiving the past never obligated you to accept harm in the present.",
  },
  {
    question: "Where can families get support with forgiveness and recovery?",
    answer:
      "Al-Anon and Nar-Anon are free and everywhere. Family therapists who specialize in addiction can help with specific wounds. Family coaching through SoberHelpline.com is another option for working through the hard stuff with someone who's been on both sides.",
  },
];

const ForgivingAnAddictInRecovery = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${TITLE} — Party Wreckers`}
        description={DESCRIPTION}
        canonical={`/blog/${SLUG}`}
        ogType="article"
        ogImage={blogImage}
        keywords="forgiving an addict in recovery, forgiveness and addiction, rebuilding trust after addiction, family recovery, Matt Brown interventionist"
        publishedTime="2026-09-22"
      />

      <ArticleJsonLd
        title={TITLE}
        description={DESCRIPTION}
        image={blogImage}
        datePublished="2026-09-22"
        dateModified="2026-09-22"
        slug={SLUG}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: "Forgiving an Addict in Recovery", url: `/blog/${SLUG}` },
        ]}
      />

      <FAQJsonLd faqs={faqs} />

      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          to="/blog"
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <header className="mb-8">
          <img
            src={blogImage}
            alt="A woman and a man in their late forties sitting across a kitchen table in morning light having an honest conversation"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
            width={1344}
            height={768}
          />
          <p className="text-muted-foreground text-sm mb-2">September 22, 2026</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {TITLE}
          </h1>
        </header>

        <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />

        <ArticleAnswerSummary slug={SLUG} />

        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <p>
            About eighteen months into my sobriety, I sat across a kitchen table from someone I had hurt badly during my drinking years. I had done my apology. I had meant it. And then I waited for the part where they told me it was okay.
          </p>

          <p>
            They didn't. What they said was, "I believe you. I'm just not there yet." I drove home furious. I had done the work, hadn't I? I was the sober one now. Where was my forgiveness?
          </p>

          <p>
            It took me a few more years of recovery to understand what that person gave me that day. They told me the truth instead of a comfortable lie. And they taught me the first thing I now tell every family who asks me about forgiving an addict in recovery: forgiveness is not a reward you owe someone for getting sober. It's something that happens in you, on your timeline, and it's not the same thing as saying what happened was fine.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">Do You Have to Forgive an Addict in Recovery?</h2>

          <p>
            No. You don't owe anyone forgiveness, including a loved one who just got sober. Forgiveness that's demanded, scheduled, or handed over to keep the peace isn't forgiveness at all. It's a performance, and everyone at the table can usually feel it.
          </p>

          <p>
            Here's what I see constantly in families I work with. The person in recovery hits 60 or 90 days, starts working the steps, and shows up with an amends. And the family, who has been holding their breath for years, suddenly feels a new kind of pressure. Now that they're doing well, aren't we supposed to let it go? Won't we hurt their recovery if we don't?
          </p>

          <p>
            I understand the fear. But your loved one's sobriety cannot depend on your emotional state. If it does, it was never going to hold. A solid recovery is built to survive a spouse who's still angry, a parent who's still guarded, and a sibling who isn't returning calls yet.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">Why Forgiving an Addict in Recovery Feels So Complicated</h2>

          <p>
            It feels complicated because you're being asked to forgive someone who is, in a real sense, no longer the person who hurt you. Sober, they're apologetic, present, and often kind. The drunk or high version of them, the one who did the damage, seems to have disappeared. So who are you even angry at?
          </p>

          <p>
            Families tell me this creates a kind of grief with no place to land. The anger is real, but the target keeps moving. A few things make this harder than it needs to be:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Nobody grieved during the crisis.</strong> When someone is actively using, families run on adrenaline. There's no time to feel the losses. Sobriety is often the first quiet moment, and that's when the grief shows up, uninvited.</li>
            <li><strong>The apology came before you were ready to hear it.</strong> Step nine amends happen on the recovering person's timeline, which is not the same as yours.</li>
            <li><strong>Everyone else moved on.</strong> Extended family and friends see the sober person and celebrate. You're left looking like the one holding a grudge. That's a big part of why families are <Link to="/blog/still-angry-after-loved-one-gets-sober" className="text-primary hover:text-primary/80 transition-colors">still angry after a loved one gets sober</Link>.</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-10">What Forgiveness Is Not</h2>

          <p>
            Forgiveness is not forgetting, and it's not trust. Those three things get bundled together constantly, and separating them is the single most useful thing a family can do in early recovery.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">It's not trust</h3>

          <p>
            Trust is rebuilt through consistent, observable behavior over time. It's a track record, not a feeling. You can forgive someone completely and still not hand them the checkbook. Those aren't in conflict. If you want the mechanics, here's <Link to="/blog/how-to-rebuild-trust-after-addiction" className="text-primary hover:text-primary/80 transition-colors">how to rebuild trust after addiction</Link>.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">It's not forgetting</h3>

          <p>
            You are allowed to remember. In fact, remembering keeps you honest. The families who "just want to put it all behind us" are often the ones who miss the early signs of relapse because they've decided not to look.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">It's not saying it was okay</h3>

          <p>
            Some of what happened during active addiction was not okay. Forgiveness doesn't require you to revise that. It requires you to stop carrying it as a live wound, which is a different thing entirely.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">How Do You Actually Move Toward Forgiveness?</h2>

          <p>
            You move toward forgiveness by getting honest about what you're still holding, saying it out loud to someone safe, and letting the recovering person's actions, not their words, do the persuading. It's slow, and it's not linear.
          </p>

          <p>Here's what I've watched work, both in families I've sat with and in my own life on the receiving end:</p>

          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Name the specific injuries.</strong> "You put us through hell" is too big to forgive. "You missed your daughter's graduation and lied about why" is something you can actually look at, feel, and eventually set down.</li>
            <li><strong>Say the true thing to the person in recovery.</strong> "I'm glad you're sober and I'm still hurt" is a complete sentence. Both halves are allowed. A person with real recovery can hear it.</li>
            <li><strong>Get your own support.</strong> Al-Anon, a therapist, a family coaching call. Your loved one has a whole program built around their healing. You need something too.</li>
            <li><strong>Watch for the pattern, not the moment.</strong> One heartfelt apology is a moment. Six months of showing up when they said they would is a pattern. Let the pattern move you. That's also <Link to="/blog/making-amends-in-recovery" className="text-primary hover:text-primary/80 transition-colors">what making amends in recovery actually looks like</Link>.</li>
            <li><strong>Stop waiting to feel it.</strong> Forgiveness rarely arrives as a single warm feeling. More often you notice one day that the thing you used to think about every morning hasn't crossed your mind in a week.</li>
          </ol>

          <h2 className="text-2xl font-bold text-foreground mt-10">What If They Relapse Before You've Forgiven Them?</h2>

          <p>
            Then you'll be glad you didn't rush. This is the part nobody wants to say out loud, but it's true. Forgiveness given too early, out of pressure, is the forgiveness that turns into rage when a relapse happens. "I let it go and you did it again" is one of the most painful sentences I hear in this work.
          </p>

          <p>
            Forgiveness that came slowly, on your own terms, holds up better. Not because you expected the worst, but because it wasn't conditional on a perfect outcome. You forgave the past. You didn't sign a contract about the future. If it does happen, know <Link to="/blog/what-to-do-after-a-relapse-first-24-hours" className="text-primary hover:text-primary/80 transition-colors">what to do in the first 24 hours after a relapse</Link>.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">What I'd Say to That Person at the Kitchen Table Now</h2>

          <p>
            I'd say thank you. Not because it felt good, but because it was real. They gave me something more valuable than a quick "it's fine." They gave me the truth, and the truth gave me something to keep earning.
          </p>

          <p>
            Some years later, that same person told me they'd gotten there. It didn't feel like a verdict. It felt like two people who'd both done their own work finally standing in the same place.
          </p>

          <p>
            That's what forgiving an addict in recovery can look like when nobody forces it. It isn't owed. It's arrived at. And if you're not there yet, you're not behind. You're just being honest, which is exactly what recovery asks of everyone in the room.
          </p>

          <div className="mt-10 space-y-3">
            <h3 className="text-xl font-bold text-foreground">Related Reading</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><Link to="/blog/how-to-rebuild-trust-after-addiction" className="text-primary hover:text-primary/80 transition-colors">How to Rebuild Trust After Addiction</Link></li>
              <li><Link to="/blog/making-amends-in-recovery" className="text-primary hover:text-primary/80 transition-colors">What Making Amends in Recovery Actually Looks Like</Link></li>
              <li><Link to="/blog/still-angry-after-loved-one-gets-sober" className="text-primary hover:text-primary/80 transition-colors">They Got Sober. So Why Are You Still Angry?</Link></li>
            </ul>
          </div>

          <p className="text-foreground font-medium italic mt-8">
            If this hit close to home, <Link to="/episodes" className="text-primary hover:text-primary/80">The Party Wreckers podcast</Link> goes deeper on what recovery actually asks of families, week after week. And if your family is still on the other side of this, still waiting for someone to get sober, reach out at <a href="https://freedominterventions.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">FreedomInterventions.com</a>. Sometimes the most loving thing you can do is wreck the party.
          </p>
        </article>

        <FaqSection faqs={faqs} />

        <div className="mt-12 pt-8 border-t">
          <Link
            to="/blog"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgivingAnAddictInRecovery;
