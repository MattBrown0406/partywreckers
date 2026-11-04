import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import FaqSection from "@/components/FaqSection";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-patience-in-recovery.jpg";

const SLUG = "patience-in-recovery";
const TITLE = "Patience in Recovery: I Wanted My Whole Life Fixed by Friday";
const DESCRIPTION = "Patience in recovery doesn't come naturally. Matt Brown, 22 years sober, shares why he wanted his life fixed by Friday and what slow healing taught him.";
const linkClass = "text-primary hover:text-primary/80 transition-colors";
const h2 = "text-2xl font-bold text-foreground mt-10";
const faqs = [
  { question: "How long does it take to feel normal after getting sober?", answer: "Many people notice physical improvements within the first few weeks to months, like better sleep and clearer thinking. Emotional stability often takes longer, sometimes a year or more. Everyone's timeline is different, and \"normal\" usually ends up being better than the old normal." },
  { question: "Why do I feel worse in early recovery than when I was drinking?", answer: "Alcohol and drugs numbed feelings that now show up all at once without the cushion. Your brain and body are also readjusting. Feeling worse early on is common and usually temporary, but talk to a doctor or counselor if it's overwhelming." },
  { question: "How long does it take to rebuild trust after addiction?", answer: "Rebuilding trust after addiction often takes months to years of consistent behavior. Trust returns through repeated, reliable actions rather than promises or apologies. Families get to set their own pace, and that's part of healing." },
  { question: "How can families be patient without enabling?", answer: "Patience means giving your loved one time to grow, while enabling means removing the consequences of their choices. You can be patient with progress and still hold firm boundaries around drinking, drug use, money, and honesty." },
  { question: "Is it normal to feel stuck in recovery?", answer: "Yes. Plateaus are a normal part of recovery, and they often come right before real growth. If you feel stuck, look at your actions over the past few months rather than how you feel today, and talk with your sponsor, counselor, or someone with long-term sobriety." },
];

const PatienceInRecovery = () => (
  <div className="min-h-screen bg-background">
    <SEOHead title={`${TITLE} | Party Wreckers`} description={DESCRIPTION} canonical={`/blog/${SLUG}`} ogType="article" ogImage={blogImage} keywords="patience in recovery, early sobriety, recovery timeline, rebuilding trust, Matt Brown" publishedTime="2026-11-04" />
    <ArticleJsonLd title={TITLE} description={DESCRIPTION} image={blogImage} datePublished="2026-11-04" dateModified="2026-11-04" slug={SLUG} />
    <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }, { name: "Patience in Recovery", url: `/blog/${SLUG}` }]} />
    <FAQJsonLd faqs={faqs} />
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-8 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link>
      <header className="mb-8">
        <img src={blogImage} alt="A young adult man pausing with a notebook and pen in a parked car outside a community meeting building" className="w-full aspect-video object-cover rounded-lg mb-6" width={1344} height={768} />
        <p className="text-muted-foreground text-sm mb-2">By Matt Brown · November 4, 2026</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">{TITLE}</h1>
      </header>
      <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />
      <ArticleAnswerSummary slug={SLUG} />
      <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>About three weeks into sobriety, I sat in my car outside a meeting and made a list. Not a gratitude list. I'd get to that later, kicking and screaming. This was a to-do list. Fix my credit. Get my reputation back. Make my family trust me again. Lose the weight. Figure out God.</p>
        <p>I gave myself until the end of the month. Patience in recovery? Never heard of it. I'm only exaggerating a little.</p>
        <p>I believed that because I'd stopped drinking, the rest of my life owed me a fast turnaround. I'd done the hard part, right? Where was my refund? Twenty-two years later, I can tell you that patience in recovery was one of the hardest lessons I ever learned, and one of the most important. If you're early in sobriety, or you love someone who is, this one's for you.</p>

        <h2 className={h2}>Why Is Patience in Recovery So Hard?</h2>
        <p>Patience in recovery is hard because addiction trains your brain to expect instant relief. For years, I fixed every bad feeling in about ninety seconds with a drink. Sobriety asks you to wait on things that don't come in a bottle: trust, peace, sleep, money, self-respect.</p>
        <p>That's the part nobody puts on the brochure. When you get sober, the feelings show up right away. The rewards take their sweet time.</p>
        <p>I was a guy who microwaved coffee because the coffee maker took too long. Now I was being told the good stuff would come "in time." I wanted a date. Nobody would give me one.</p>

        <h2 className={h2}>What Does the Recovery Timeline Really Look Like?</h2>
        <p>Recovery doesn't move in a straight line, and different parts of your life heal at different speeds. Your body often starts bouncing back in weeks. Relationships, finances, and trust can take years. Knowing that going in saves a lot of heartbreak.</p>
        <p>Here's roughly how it went for me. Your mileage will vary, but I hear versions of this from almost everyone I work with:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>The first few weeks:</strong> My sleep was a mess, my hands didn't know what to do, and I cried at a commercial for car insurance.</li>
          <li><strong>The first 90 days:</strong> The fog started lifting. I could remember conversations. I also remembered things I'd rather not have.</li>
          <li><strong>The first year:</strong> My body felt better. My bank account and my family's trust did not, at least not yet.</li>
          <li><strong>Years two through five:</strong> This is when life actually started rebuilding. Slowly. Brick by brick.</li>
        </ul>

        <h2 className={h2}>How Impatience Almost Cost Me My Sobriety</h2>
        <p>Impatience is one of the quietest relapse risks there is. It doesn't look dangerous. It looks like frustration, resentment, and a little voice that says, "What's the point of all this if nothing's changing?"</p>
        <p>Around four months sober, I went to a family member to make things right. I had my speech ready. I expected tears, a hug, maybe a nice moment we'd talk about at Thanksgiving. Instead, I got a polite nod and a "We'll see."</p>
        <p>I was furious. I drove around for an hour building a case in my head. I'm doing everything right. Nobody notices. Why bother? That's a dangerous little speech for a guy four months off the bottle.</p>
        <p>I called my sponsor and told him the whole story. He let me finish, then said, "You've been sober four months. You were drunk for years. Do the math." Then he hung up to go eat dinner. That was the most useful math lesson of my life.</p>

        <h2 className={h2}>How Do You Build Patience in Early Recovery?</h2>
        <p>You build patience in early recovery by shrinking the timeline, measuring actions instead of outcomes, and letting other people heal at their own speed. Patience isn't a personality trait you're born with. It's a muscle, and sobriety gives you plenty of reps.</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Shrink the timeline.</strong> "One day at a time" isn't a cute slogan. It's a survival strategy. I couldn't fix five years of damage today, but I could not drink today.</li>
          <li><strong>Track actions, not results.</strong> Did I go to a meeting? Call someone? Show up to work on time? Those are wins, even when nothing outside looks different yet.</li>
          <li><strong>Keep a "then and now" list.</strong> Once a month, write down what's different from last month. Small things count. Sleeping through the night counts.</li>
          <li><strong>Let others heal on their schedule.</strong> My amends were my job. Their forgiveness was not my job, and it wasn't on my timeline.</li>
          <li><strong>Talk to someone with more time.</strong> People with years of sobriety are walking proof that slow change is real change.</li>
          <li><strong>Expect the plateau.</strong> There will be stretches where nothing seems to move. That's not failure. That's the foundation setting.</li>
        </ol>

        <h2 className={h2}>What Should Families Know About Patience in Recovery?</h2>
        <p>Families need patience in recovery too, but patience isn't the same as being passive. Give your loved one time to rebuild while still keeping your boundaries and expecting consistent action. You can be patient and still have standards.</p>
        <p>I see this all the time in my work as an interventionist. A family waits years for their person to get help. Then six months into sobriety, they're frustrated he isn't the guy they remember yet. Everybody wants it fixed by Friday, on both sides of the kitchen table.</p>
        <p>Here's the truth: trust comes back through a long string of boring, reliable days. Not through one big apology. If your loved one is showing up, doing the work, and staying sober, that's the evidence. Let it pile up. And get support for yourself while you wait, because you've been through something too.</p>

        <h2 className={h2}>The Slow Stuff Is the Good Stuff</h2>
        <p>Here's what I couldn't see from that parking lot twenty-two years ago. Everything on that list got handled. Not by the end of the month, and not in the order I wanted, but it got handled. And the things that took the longest are the things I'm proudest of today.</p>
        <p>The relationships that rebuilt slowly are the strongest ones I have. The self-respect that came back one kept promise at a time is the kind that doesn't crack under pressure. Quick fixes were my whole drinking career. Slow healing turned out to be the real thing.</p>
        <p>So if you're early and frustrated, I see you. Keep showing up. The math works out. It just doesn't work out by Friday.</p>
      </article>
      <FaqSection title="Frequently Asked Questions About Patience in Recovery" faqs={faqs} />
      <section className="prose prose-lg max-w-none text-foreground/90 space-y-6 mt-10">
        <h2 className={h2}>Keep the Conversation Going</h2>
        <p>If this one hit home, listen to <Link to="/episodes" className={linkClass}>The Party Wreckers podcast</Link>, where I talk honestly about addiction, recovery, and the messy, slow, beautiful work of getting better. Follow me for new episodes and articles every week.</p>
        <p>And if someone you love is still stuck in active addiction, you don't have to wait for them to be ready. <a href="https://freedominterventions.com/contact" target="_blank" rel="noopener noreferrer" className={linkClass}>Reach out to our team at FreedomInterventions.com</a>. We'll help your family figure out the next right step.</p>
        <h3 className="text-xl font-bold text-foreground mt-8">Related Reading</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><Link to="/blog/first-year-sobriety-what-to-expect" className={linkClass}>First year of sobriety: what to expect</Link></li>
          <li><Link to="/blog/rebuilding-trust-in-recovery-families" className={linkClass}>Rebuilding trust in recovery: what families need to know</Link></li>
        </ul>
      </section>
      <div className="mt-12 pt-8 border-t"><Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link></div>
    </main>
    <Footer />
  </div>
);

export default PatienceInRecovery;