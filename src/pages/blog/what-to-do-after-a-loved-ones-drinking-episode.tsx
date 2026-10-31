import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import FaqSection from "@/components/FaqSection";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-morning-after-drinking-episode.jpg";

const SLUG = "what-to-do-after-a-loved-ones-drinking-episode";
const TITLE = "The Morning After Halloween: What to Do After a Loved One's Drinking Episode";
const DESCRIPTION = "The morning after a loved one's drinking episode, most families clean up and go quiet. Interventionist Matt Brown shares what to do instead, step by step.";
const CONTACT = "https://freedominterventions.com/contact";
const linkClass = "text-primary hover:text-primary/80 transition-colors";
const h2 = "text-2xl font-bold text-foreground mt-10";
const faqs = [
  { question: "Should I confront my loved one while they're drunk?", answer: "No. Someone who is intoxicated can't process what you're saying, and the conversation is likely to escalate. Focus on safety in the moment, then talk when they're sober, usually within a day or two." },
  { question: "Is it enabling to take care of someone after a drinking episode?", answer: "Keeping someone physically safe is not enabling. Enabling is cleaning up the consequences that belong to them, like calling in sick for them, paying for damage, or covering the story. Protect their life, not their drinking." },
  { question: "What if they don't remember what happened?", answer: "Blackouts are common with heavy drinking, and they're a serious warning sign on their own. Tell them plainly and factually what you saw. Don't argue about whose memory is right; your experience of the night is real." },
  { question: "How many bad nights before we should get help?", answer: "There's no magic number. If you're searching for what to do after a loved one's drinking episode, that's a strong sign it's time to talk to someone. Early guidance beats waiting for a crisis." },
  { question: "What if they get angry when I bring it up?", answer: "Expect some defensiveness; it's normal, and it doesn't mean you did it wrong. Stay calm, say your three sentences, and don't get pulled into a debate. Then follow through on what you said you'd do." },
];

const MorningAfterDrinkingEpisode = () => (
  <div className="min-h-screen bg-background">
    <SEOHead title={`${TITLE} | Party Wreckers`} description={DESCRIPTION} canonical={`/blog/${SLUG}`} ogType="article" ogImage={blogImage} keywords="what to do after a loved one's drinking episode, morning after drinking, enabling, intervention, Matt Brown" publishedTime="2026-10-31" />
    <ArticleJsonLd title={TITLE} description={DESCRIPTION} image={blogImage} datePublished="2026-10-31" dateModified="2026-10-31" slug={SLUG} />
    <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }, { name: "What to Do After a Loved One's Drinking Episode", url: `/blog/${SLUG}` }]} />
    <FAQJsonLd faqs={faqs} />
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-8 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link>
      <header className="mb-8">
        <img src={blogImage} alt="A worried woman in her late forties sitting alone at her kitchen table in early morning light with a cold cup of coffee and autumn leaves on the table" className="w-full aspect-video object-cover rounded-lg mb-6" width={1344} height={768} />
        <p className="text-muted-foreground text-sm mb-2">By Matt Brown · October 31, 2026</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">{TITLE}</h1>
      </header>
      <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />
      <ArticleAnswerSummary slug={SLUG} />
      <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>This one is for anyone waking up tomorrow and wondering what to do after a loved one's drinking episode. The broken glass. The half-remembered fight. I know that morning well, because for a lot of years, I was the reason for it.</p>
        <p>Halloween used to be my favorite holiday, and not because of the candy. It was the one night a year a grown man could put on a ridiculous costume, drink like a college sophomore, and nobody blinked. It was basically a permission slip.</p>
        <p>One year in my twenties, I went to a party dressed as a pirate. I don't remember most of the night. I do remember waking up in my old bedroom at my parents' house with no idea how I got there. My costume was hanging neatly on the closet door. My mom had made breakfast.</p>
        <p>And nobody said a word. We ate eggs and talked about the weather. At the time, that silence felt like kindness. From 22 years sober, I can tell you it was the most dangerous part of the whole night. So here's what I wish my family had known, and what I tell the families I work with now.</p>

        <h2 className={h2}>What Should You Do After a Loved One's Drinking Episode?</h2>
        <p>The most important thing to do after a loved one's drinking or using episode is to make sure everyone is safe, and then refuse to pretend it didn't happen. Let the dust settle, wait until they're sober, and name what happened calmly. The morning after isn't a time for silence. It's one of the best openings you'll get.</p>
        <p>Families go quiet because they're exhausted and scared of making it worse. I get it. But silence teaches the person you love one very clear lesson: no matter what I do, it gets cleaned up and forgotten. Every bad night that disappears makes the next one easier.</p>

        <h2 className={h2}>First, Is Anyone in Danger Right Now?</h2>
        <p>Before any conversation, check on safety. Call 911 right away if your loved one:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Can't be woken up, or wakes and immediately passes out again</li>
          <li>Has slow, shallow, or irregular breathing</li>
          <li>Is vomiting while barely conscious, or having a seizure</li>
          <li>Has bluish or pale, clammy skin</li>
          <li>May have used opioids (if you have naloxone/Narcan, use it, then call)</li>
        </ul>
        <p>"Let them sleep it off" is not a plan when someone can't respond. If they're unsteady but conscious, keep them on their side and don't leave them alone. You can sort out everything else later.</p>

        <h2 className={h2}>Why Shouldn't You Clean Up the Mess?</h2>
        <p>Because the mess is information, for them and for you. When families quietly erase the consequences of a drinking episode, they also erase the evidence the person needs to see. This isn't about punishment.</p>
        <p>I'm not talking about leaving broken glass where the kids walk. Safety always comes first. But there's a long list of "cleanup" that has nothing to do with safety, and most families do all of it on autopilot:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Calling their boss to say they're sick</li>
          <li>Apologizing to the host or the neighbors on their behalf</li>
          <li>Paying for the damage, the tow, or the ticket</li>
          <li>Rewriting the story for the rest of the family</li>
          <li>Telling the kids "Dad's just tired"</li>
        </ul>
        <p>Pick one of those and simply don't do it this time. Let the consequence that belongs to them stay with them.</p>

        <h2 className={h2}>When Is the Right Time to Talk After a Drinking Episode?</h2>
        <p>Talk when they're sober and rested and you're calm, usually within 24 to 48 hours. Not while they're intoxicated, not at 2 a.m., and not while your hands are still shaking. Keep it short and specific.</p>
        <p>Trying to reason with someone who's drunk is like reasoning with the inflatable pumpkin on your neighbor's lawn. None of it sticks. The next day, if you come in swinging, they'll get defensive. If you come in clear and calm, something can land.</p>

        <h2 className={h2}>What Do You Actually Say?</h2>
        <p>You don't need a perfect speech. You need three sentences:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>What you saw: "Last night you drove home after drinking, and you fell on the stairs."</li>
          <li>How it affected you: "I was scared, and the kids saw it."</li>
          <li>What you're going to do: "I'm not covering for this anymore. I'm calling someone this week to get help, for me and hopefully for you."</li>
        </ol>
        <p>Then stop talking. Don't bring up every bad night since 2014. Notice the third sentence is about what you'll do, not what you're demanding. That's the part you control.</p>

        <h2 className={h2}>Who Should You Tell After a Loved One's Drinking Episode?</h2>
        <p>Tell at least one person who can actually help: another family member, a trusted friend, or a professional. Secrecy protects the addiction, not the family. You were never meant to carry this alone.</p>
        <p>The first instinct after a bad night is containment. But the other adults who love this person deserve the truth, and you deserve backup. While it's fresh, <Link to="/blog/documenting-a-loved-ones-addiction" className={linkClass}>jot down the date and what happened</Link> in a few plain sentences. Memories soften fast, especially yours.</p>
        <p>And talk to the kids. They already know something happened. Give them an honest, age-appropriate version: "Mom drank too much last night. It's not your fault, and you're safe." Kids can handle truth. What hurts them is the feeling that everyone is pretending.</p>

        <h2 className={h2}>How Do You Turn the Morning After Into a Turning Point?</h2>
        <p><Link to="/blog/stop-waiting-for-a-sign-when-to-call-professional-interventionist" className={linkClass}>Make one call this week</Link>, while the details are fresh and the motivation is real. The hardest thing about bad nights is how fast they fade. By Thursday it will feel like an overreaction.</p>
        <p>In 20-plus years of doing interventions, I've lost count of how many families started their first call with, "It was Halloween," or "It was the wedding," or "It was Thanksgiving." One night became the line. Not because it was the worst night, but because someone decided it would be the last one they stayed quiet about.</p>
        <p>Calling an interventionist, a counselor, or an Al-Anon group isn't a commitment to anything. It's a question. And asking a question is how most recoveries, mine included, actually start.</p>

        <h2 className={h2}>The Costume Comes Off</h2>
        <p>My family loved me with every plate of eggs they made. They just didn't know yet that love could also sound like, "We're not doing this anymore." When they finally said it, years later, it changed the direction of my life.</p>
        <p>Tomorrow morning, you don't have to fix everything. You just have to not pretend. That's how you start wrecking the party, and I'll be right here cheering you on.</p>
      </article>
      <FaqSection title="Frequently Asked Questions About the Morning After a Drinking Episode" faqs={faqs} />
      <section className="prose prose-lg max-w-none text-foreground/90 space-y-6 mt-10">
        <h2 className={h2}>Keep the Conversation Going</h2>
        <p>If this hit home, listen to <Link to="/episodes" className={linkClass}>The Party Wreckers podcast</Link> wherever you get your podcasts, and follow me for honest conversations about addiction, intervention, and recovery. And if your family is waking up to another morning after, you don't have to figure out the next step alone. <a href={CONTACT} target="_blank" rel="noopener noreferrer" className={linkClass}>Reach out to my team at FreedomInterventions.com</a>. One conversation can change everything.</p>
        <h3 className="text-xl font-bold text-foreground mt-8">Related Reading</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><Link to="/blog/documenting-a-loved-ones-addiction" className={linkClass}>Documenting a Loved One's Addiction: The Spiral Notebook</Link></li>
          <li><Link to="/blog/stop-waiting-for-a-sign-when-to-call-professional-interventionist" className={linkClass}>Stop Waiting for a Sign: When It's Time to Call a Professional Interventionist</Link></li>
        </ul>
      </section>
      <div className="mt-12 pt-8 border-t"><Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link></div>
    </main>
    <Footer />
  </div>
);

export default MorningAfterDrinkingEpisode;
