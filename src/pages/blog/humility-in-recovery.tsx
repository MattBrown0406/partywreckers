import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import FaqSection from "@/components/FaqSection";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-humility-in-recovery.jpg";

const SLUG = "humility-in-recovery";
const TITLE = "Humility in Recovery: I Was the Smartest Guy in a Room Full of People Who Were Staying Sober";
const DESCRIPTION = "Humility in recovery isn't thinking less of yourself. Interventionist Matt Brown shares how being the smartest guy in the room almost kept him drinking.";
const linkClass = "text-primary hover:text-primary/80 transition-colors";
const h2 = "text-2xl font-bold text-foreground mt-10";
const h3 = "text-xl font-bold text-foreground mt-8";
const faqs = [
  { question: "What is humility in recovery?", answer: "Humility in recovery is seeing yourself accurately, including your strengths, defects, and limits, and staying willing to learn from others. It's about being right-sized, not worthless, so you can actually accept help." },
  { question: "What is the difference between humility and shame in recovery?", answer: "Shame says, \"I am bad.\" Humility says, \"I am human, and I need help.\" Shame isolates people and fuels relapse. Humility connects people to support." },
  { question: "Why is ego dangerous in addiction recovery?", answer: "Ego tells you that you're the exception and can handle it alone. That thinking leads people to skip meetings, ignore warning signs, and stop asking for help." },
  { question: "How do you practice humility in early sobriety?", answer: "Start small. Call someone before you're in crisis, listen more than you talk in meetings, admit mistakes quickly, and try suggestions before you fully understand them." },
  { question: "How can families practice humility when a loved one is addicted?", answer: "Families practice humility by admitting that what they've tried hasn't worked and inviting outside help, like an interventionist or a family support group. Asking for help is a strength, not a failure." },
];

const HumilityInRecovery = () => (
  <div className="min-h-screen bg-background">
    <SEOHead title={`${TITLE} | Party Wreckers`} description={DESCRIPTION} canonical={`/blog/${SLUG}`} ogType="article" ogImage={blogImage} keywords="humility in recovery, ego in recovery, early sobriety, terminal uniqueness, Matt Brown" publishedTime="2026-11-05" />
    <ArticleJsonLd title={TITLE} description={DESCRIPTION} image={blogImage} datePublished="2026-11-05" dateModified="2026-11-05" slug={SLUG} />
    <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }, { name: "Humility in Recovery", url: `/blog/${SLUG}` }]} />
    <FAQJsonLd faqs={faqs} />
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-8 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link>
      <header className="mb-8">
        <img src={blogImage} alt="A young adult man listening thoughtfully to an older adult in a church basement recovery meeting with other adults seated nearby" className="w-full aspect-video object-cover rounded-lg mb-6" width={1536} height={864} />
        <p className="text-muted-foreground text-sm mb-2">By Matt Brown · November 5, 2026</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">{TITLE}</h1>
      </header>
      <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />
      <ArticleAnswerSummary slug={SLUG} />
      <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>Nobody wanted to hear about humility in recovery less than I did.</p>
        <p>In my first few months of sobriety, I sat in the back row of a church basement and graded people. Not out loud. I wasn't a monster. But in my head, I was running a full review panel. This guy talks too long. That woman cries every week. The old-timer by the coffee pot keeps repeating the same three slogans like they're breaking news.</p>
        <p>I had a decent vocabulary and an opinion about everything. I was sure I was the smartest guy in the room. I was also the guy with the least sober time and the shakiest hands. Funny how that works.</p>
        <p>Humility was the thing I resisted hardest and needed most. I thought it meant shrinking. It turned out to mean finally seeing myself at the right size: not the genius, not the garbage, just a guy who needed help and could learn. Twenty-two years later, I'm still learning it.</p>

        <h2 className={h2}>What Does Humility in Recovery Actually Mean?</h2>
        <p>Humility in recovery means seeing yourself accurately (your strengths, your defects, and your limits) and staying willing to be taught. It isn't humiliation, and it isn't thinking you're worthless. It's being right-sized.</p>
        <p>Most of us show up to recovery swinging between two extremes. One minute I was the smartest guy in the room. The next minute, alone in my car, I was the worst person alive. Both were lies, and both kept me drinking.</p>
        <p>Grandiosity says, "I don't need help." Shame says, "I don't deserve help." Humility is the narrow middle ground where you can actually receive something. The old-timers called it being right-sized, and I rolled my eyes the first fifty times I heard it.</p>

        <h2 className={h2}>Why Was Humility So Hard for Me in Early Sobriety?</h2>
        <p>Because my ego had been running the show for years, and it was very good at its job. In active addiction, your ego works like a full-time defense attorney. It explains, it minimizes, and it compares.</p>
        <p>In early sobriety, that same attorney kept showing up for work. I'd hear someone's story and immediately start hunting for the differences. I never lost a house. I never drank in the morning. Well, not on weekdays.</p>
        <p>There's a phrase for this in the rooms: terminal uniqueness. It's the belief that you're the exception, and it takes out a lot of good people.</p>
        <p>My sponsor didn't argue with me. He just asked, "How's being the smartest guy working out for you?" I didn't have a good answer. My best thinking had earned me a folding chair in that church basement.</p>

        <h2 className={h2}>What Does Humility in Recovery Look Like Day to Day?</h2>
        <p>Day-to-day humility in recovery is mostly small, unglamorous behavior: asking, listening, admitting, and doing what's suggested even when you'd rather not. Here's what it looked like for me.</p>
        <h3 className={h3}>Asking for help before it's an emergency</h3>
        <p>I used to call people only when the house was already on fire. Humility meant calling my sponsor on a boring Tuesday to say, "I'm a little off today." Just honesty early, while it was still cheap.</p>
        <h3 className={h3}>Being teachable when the teacher doesn't impress you</h3>
        <p>That old-timer by the coffee pot with the three slogans? He had decades. I had ninety days. Eventually I realized a message doesn't have to be clever to be true. Some of the most useful things I've ever heard came from people I'd written off in the first five seconds.</p>
        <h3 className={h3}>Saying "I was wrong" fast</h3>
        <p>Not three days later. Right then. "You're right, I snapped at you, and I'm sorry." The first few times it felt like swallowing a golf ball. Now it's just maintenance.</p>
        <h3 className={h3}>Trying the suggestion before you understand it</h3>
        <p>Make the call. Go to the meeting. Write the list. I wanted the full explanation first. Humility meant doing it and letting the understanding catch up.</p>

        <h2 className={h2}>Does Humility in Recovery Get Easier After 22 Years?</h2>
        <p>Not really, and that's exactly why it matters. Long-term sobriety comes with its own ego trap: you start believing your time makes you the expert on everything. People with long-term sobriety relapse too, and pride is often part of that story.</p>
        <p>It shows up in my work, too. After more than twenty years as an interventionist, I could easily walk into a living room assuming I already know how this goes.</p>
        <p>A few years back, I was planning an intervention with a family whose youngest son barely said a word during our prep meeting. I had the morning mapped out. Then he mentioned that his sister never listened to their parents, but she always listened to their grandmother.</p>
        <p>I almost brushed past it. I'm glad I didn't. We changed who spoke first, and it changed the whole day. I was the professional in the room. He was the one who was right. Staying teachable long after you think you've earned the right to stop is the whole job, in sobriety and in this work.</p>

        <h2 className={h2}>What Can Families Learn From Humility in Recovery?</h2>
        <p>Families need humility too. Not because they caused the addiction, but because they can't fix it alone. The parents and spouses I work with are often some of the most capable people I've ever met, and that's part of the problem.</p>
        <p>When you've held everything together for years, asking for help feels like failure. It isn't. A few humble moves that change everything:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Admit that what you've tried hasn't worked. That's not giving up. It's information.</li>
          <li>Let someone outside the family see the whole picture. Secrets protect the disease, not the people.</li>
          <li>Be willing to change your part. Boundaries, enabling, and how you talk about the problem are all on the table.</li>
          <li>Stop waiting until you've figured it out. You don't need a plan to make the first call. That's what the call is for.</li>
        </ul>
        <p>Some of the bravest people I know are moms and dads who finally said, "We don't know what to do anymore."</p>

        <h2 className={h2}>Right-Sized, One Day at a Time</h2>
        <p>I still catch myself grading people sometimes. Occasionally in a meeting, if I'm being truthful. The difference now is that I notice it, laugh at myself a little, and remember the guy in the back row with the shaky hands.</p>
        <p>That guy didn't need to be smarter. He needed to be willing. If you're new, or if you love someone who is, you don't have to have it all figured out. You just have to stay teachable for one more day. It's worked for me for twenty-two years.</p>
      </article>
      <FaqSection title="Frequently Asked Questions About Humility in Recovery" faqs={faqs} />
      <section className="prose prose-lg max-w-none text-foreground/90 space-y-6 mt-10">
        <h2 className={h2}>Keep the Conversation Going</h2>
        <p>Listen to <Link to="/episodes" className={linkClass}>The Party Wreckers podcast</Link> wherever you get your podcasts for real conversations about intervention, addiction, and recovery. Follow me, Matt Brown, for stories from the front lines of wrecking the party of active addiction.</p>
        <p>And if someone you love is stuck and your family doesn't know what to do next, reach out to <a href="https://freedominterventions.com/contact" target="_blank" rel="noopener noreferrer" className={linkClass}>FreedomInterventions.com</a>. You don't have to have it figured out first.</p>
        <h3 className={h3}>Related Reading</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><Link to="/blog/i-didnt-want-to-get-sober" className={linkClass}>I Didn't Want to Get Sober. I Got Sober Anyway.</Link></li>
          <li><Link to="/blog/service-in-recovery" className={linkClass}>Service in Recovery: The Year I Made the Coffee (and Why It Kept Me Sober)</Link></li>
        </ul>
      </section>
      <div className="mt-12 pt-8 border-t"><Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link></div>
    </main>
    <Footer />
  </div>
);

export default HumilityInRecovery;