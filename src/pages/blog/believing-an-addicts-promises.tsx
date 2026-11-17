import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import FaqSection from "@/components/FaqSection";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-believing-an-addicts-promises.jpg";

const SLUG = "believing-an-addicts-promises";
const TITLE = "\u201CThis Time Is Different\u201D: Why Families Keep Believing an Addict's Promises";
const DESCRIPTION = "Why do families keep believing an addict's promises? 22-years-sober interventionist Matt Brown on the \"this time is different\" cycle and what to trust.";
const linkClass = "text-primary hover:text-primary/80 transition-colors";
const h2 = "text-2xl font-bold text-foreground mt-10";
const h3 = "text-xl font-bold text-foreground mt-6";
const faqs = [
  { question: "Why does an addict keep making promises they can't keep?", answer: "Most people in active addiction sincerely mean their promises when they make them. Addiction changes the brain's priorities, so the urge to use overrides good intentions. The promise is real; the ability to keep it without help usually isn't." },
  { question: "Should I trust an addict who says they'll quit on their own?", answer: "Be cautious. \"I'll quit on my own\" often means \"please stop pushing.\" Ask for a specific, scheduled step, like an assessment or detox appointment, and let their actions earn your trust." },
  { question: "Is it enabling to believe an addict's promises?", answer: "Believing alone isn't enabling, but rewarding promises with money, rescue, or removed consequences often is. The healthier approach is to hope for change while letting privileges follow actions, not apologies." },
  { question: "How many broken promises is too many?", answer: "There's no magic number, but if you've heard the same promise more than a couple of times with the same result, the pattern is telling you something. That's usually the right time to talk to a professional interventionist." },
  { question: "What do I say when my loved one promises to stop drinking?", answer: "Try: \"I hope so. What's the first step, and when are you taking it?\" This shows love while asking for a concrete plan instead of a promise." },
];

const BelievingAnAddictsPromises = () => (
  <div className="min-h-screen bg-background">
    <SEOHead title={`${TITLE} | Party Wreckers`} description={DESCRIPTION} canonical={`/blog/${SLUG}`} ogType="article" ogImage={blogImage} keywords="believing an addict's promises, this time is different, broken promises addiction, enabling, Matt Brown" publishedTime="2026-11-17" />
    <ArticleJsonLd title={TITLE} description={DESCRIPTION} image={blogImage} datePublished="2026-11-17" dateModified="2026-11-17" slug={SLUG} />
    <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }, { name: "Believing an Addict's Promises", url: `/blog/${SLUG}` }]} />
    <FAQJsonLd faqs={faqs} />
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-8 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link>
      <header className="mb-8">
        <img src={blogImage} alt="A weary mother reading a text at her kitchen table while her adult son stands apologetically in the doorway" className="w-full aspect-video object-cover rounded-lg mb-6" width={1536} height={864} />
        <p className="text-muted-foreground text-sm mb-2">By Matt Brown · November 17, 2026</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">{TITLE}</h1>
      </header>
      <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />
      <ArticleAnswerSummary slug={SLUG} />
      <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>I was a world-class promiser. I promised my family I'd cut back. I promised I'd only drink on weekends. I promised I'd be there for the birthday dinner, and I promised, with tears in my eyes, that last night was the last time. Here's the part that still stings, 22 years sober: I meant every single one of them.</p>
        <p>That's what makes believing an addict's promises so complicated. The person making the promise usually isn't lying in the moment. They're sincere. They're scared. And they have absolutely no power to keep their word. After two decades as an interventionist, I can tell you the promise is rarely the problem. The problem is what the family does with it.</p>
        <p>With Thanksgiving a week out, a lot of you are about to hear some version of "I'll be good this year." So let's talk about it.</p>

        <h2 className={h2}>Why Do Families Keep Believing an Addict's Promises?</h2>
        <p>Families keep believing an addict's promises because hope is cheaper than a hard decision. Believing the promise means you don't have to confront, set a consequence, or make the call you've been dreading. It buys everyone a few more weeks of peace.</p>
        <p>I don't say that to shame anybody. My mom believed me for years, and she wasn't foolish. She loved me, and the promise gave her something to hold onto. Every family I work with has a version of this. They come to me with a long history of "he swore he was done" and "she said she'd go to meetings."</p>
        <p>There's also a nasty little reward built into the cycle. When the promise comes after a blowup, things usually get better for a few days. The drinking slows. The apologies are heartfelt. Everyone exhales. That short stretch of relief trains the whole family to keep reaching for the next promise. (I call it the <Link to="/blog/good-days-trap-intermittent-reinforcement" className={linkClass}>good days trap</Link>.)</p>

        <h2 className={h2}>What Does the "This Time Is Different" Cycle Look Like?</h2>
        <p>The cycle almost always follows the same four beats: crisis, promise, relief, and relapse. Once you see it, you can't unsee it. Most families I meet have run this loop dozens of times without ever naming it.</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Crisis:</strong> the DUI, the missed pickup, the 2 a.m. phone call, the drained account.</li>
          <li><strong>Promise:</strong> "I'm done. I swear. I'll get help. I just need you to trust me."</li>
          <li><strong>Relief:</strong> a honeymoon stretch where everyone wants to believe it's over.</li>
          <li><strong>Relapse:</strong> the slow slide back, often hidden at first, until the next crisis.</li>
        </ol>
        <p>Notice what never shows up in that loop: an actual plan. No phone call to a treatment center. No appointment. No sponsor. Just words and good intentions. In my experience, a promise with no action attached is really a request for more time.</p>

        <h2 className={h2}>How Do I Know If an Addict's Promises Are Real?</h2>
        <p>You know an addict's promises are real when behavior shows up before trust is asked for. Real change looks like action you can see, not reassurance you're asked to accept. If the promise is mostly "just believe me," that's your answer.</p>
        <p>Here's the gut-check list I give families:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Is there a specific, scheduled step, like an assessment, a detox bed, or a first meeting, with a date and time?</li>
          <li>Did they make the call themselves, or are they waiting for you to set it up "later"?</li>
          <li>Are they willing to be accountable to someone besides you, like a counselor, sponsor, or treatment program?</li>
          <li>Is the promise about stopping, or about getting help to stop? Those are very different things.</li>
          <li>Have you heard these exact words before? If so, what happened next time?</li>
        </ul>
        <p>When I was drinking, my promises were always about willpower. "I'll handle it." The day things finally changed, I didn't promise anything. I just got in the car and went. My family didn't need my word. They needed my feet to move.</p>

        <h2 className={h2}>What Should I Do Instead of Believing an Addict's Promises?</h2>
        <p>Instead of believing or rejecting the promise, respond to it with a plan. You don't have to call your loved one a liar. You just stop letting words substitute for action, and you decide ahead of time what you'll do if the promise breaks.</p>
        <h3 className={h3}>Say "I Hope So" and Then Name the Next Step</h3>
        <p>Try something like: "I really hope this time is different. What's the first step, and when are you taking it?" That's not cold. It's loving and clear. It takes the promise seriously enough to ask for follow-through.</p>
        <h3 className={h3}>Decide Your "If/Then" Before the Next Crisis</h3>
        <p>Sit down with your spouse or the rest of the family and agree on what happens if the promise breaks. If he drinks before Thanksgiving dinner, then he doesn't come. If she uses again, then we call the treatment center together. Write it down. Decisions made calmly hold up far better than ones made at midnight.</p>
        <h3 className={h3}>Stop Paying for the Promise</h3>
        <p>A lot of families reward the promise itself: the money gets released, the car keys come back, the threat to move out quietly disappears. Let the privileges follow the action, not the apology. That one shift breaks more cycles than any heart-to-heart I've ever witnessed.</p>

        <h2 className={h2}>When Is It Time to Stop Waiting for the Next Promise?</h2>
        <p>It's time to stop waiting when you can count the broken promises and you're running out of fingers. If the same words keep producing the same results, another promise isn't going to change the pattern. A different response from the family will.</p>
        <p>That's where intervention comes in. A good intervention isn't an ambush or a shouting match. It's the family finally saying, together and with love, "We're done trading words for words. Here's the help, here's the bed, and here's what changes today." I've watched people who promised for ten years say yes in an hour once the family stopped accepting promises as payment.</p>

        <h2 className={h2}>A Word from the Other Side of the Promises</h2>
        <p>If you've believed the promises and gotten burned, you're not naive. You're a person who loves somebody. I'm grateful my family eventually stopped taking my word for it, because that's what made room for something real.</p>
        <p>You can keep the hope. Just let the action carry the weight. Hope and a plan, together, is how this party finally gets wrecked.</p>
      </article>
      <FaqSection title="Frequently Asked Questions About Believing an Addict's Promises" faqs={faqs} />
      <section className="prose prose-lg max-w-none text-foreground/90 space-y-6 mt-10">
        <h2 className={h2}>Take the Next Step</h2>
        <p>If this hit home, listen to <Link to="/episodes" className={linkClass}>The Party Wreckers podcast</Link>, where I talk about real families, real interventions, and the road out of addiction. Follow me, Matt Brown, for more straight talk on recovery. And if you're done waiting for the next promise, <a href="https://freedominterventions.com/contact" target="_blank" rel="noopener noreferrer" className={linkClass}>reach out to my team at FreedomInterventions.com</a>. We'll help you figure out what to do next.</p>
        <h3 className="text-xl font-bold text-foreground mt-8">Related Reading</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><Link to="/blog/good-days-trap-intermittent-reinforcement" className={linkClass}>The Good Days Trap: Intermittent Reinforcement in Addiction Families</Link></li>
          <li><Link to="/blog/loved-one-wants-to-leave-rehab-early" className={linkClass}>The 2 A.M. Phone Call: When a Loved One Wants to Leave Rehab Early</Link></li>
        </ul>
      </section>
      <div className="mt-12 pt-8 border-t"><Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link></div>
    </main>
    <Footer />
  </div>
);

export default BelievingAnAddictsPromises;
