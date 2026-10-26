import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import FaqSection from "@/components/FaqSection";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-documenting-a-loved-ones-addiction.jpg";

const SLUG = "documenting-a-loved-ones-addiction";
const TITLE = "The Spiral Notebook: Why Documenting a Loved One's Addiction Is the Most Underrated Thing You Can Do Tonight";
const DESCRIPTION = "Documenting a loved one's addiction cuts through denial, fuzzy memory, and false hope. Interventionist Matt Brown explains what to write down and how to start.";
const linkClass = "text-primary hover:text-primary/80 transition-colors";
const h2 = "text-2xl font-bold text-foreground mt-10";
const h3 = "text-xl font-bold text-foreground mt-8";
const faqs = [
  { question: "Is it okay to keep a record of someone's addiction without telling them?", answer: "Yes. A private record of what you personally observe is about protecting your own clarity, not spying. Keep it to what crosses your path and keep it secure. You're not required to announce it." },
  { question: "Should I keep the record on paper or on my phone?", answer: "Whichever you'll actually use and can keep private. A phone notes app is easy to update in the moment. A paper notebook is harder for someone else to scroll through. Consistency matters more than format." },
  { question: "How far back should I go when I start?", answer: "Write down the big events you remember clearly from the past year, labeled as \"from memory.\" Then keep current entries going forward. Don't stall trying to reconstruct everything perfectly." },
  { question: "Can a written record be used in an intervention?", answer: "Yes, and it often makes intervention letters far more effective. Specific dates and moments, shared with love, are harder to dismiss than general concern. A good interventionist will help you choose what to include and what to leave out." },
  { question: "Do I need a record before I call an interventionist?", answer: "No. If you're worried, call now. The record helps, but it's never a requirement, and waiting to get it perfect is just another way of waiting." },
];

const DocumentingALovedOnesAddiction = () => (
  <div className="min-h-screen bg-background">
    <SEOHead title={`${TITLE} | Party Wreckers`} description={DESCRIPTION} canonical={`/blog/${SLUG}`} ogType="article" ogImage={blogImage} keywords="documenting a loved one's addiction, addiction record keeping, intervention preparation, family addiction support, Matt Brown" publishedTime="2026-10-26" />
    <ArticleJsonLd title={TITLE} description={DESCRIPTION} image={blogImage} datePublished="2026-10-26" dateModified="2026-10-26" slug={SLUG} />
    <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }, { name: "Documenting a Loved One's Addiction", url: `/blog/${SLUG}` }]} />
    <FAQJsonLd faqs={faqs} />
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-8 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link>
      <header className="mb-8">
        <img src={blogImage} alt="A woman in her fifties writing in a green spiral notebook at her kitchen table late at night by warm lamplight" className="w-full aspect-video object-cover rounded-lg mb-6" width={1344} height={768} />
        <p className="text-muted-foreground text-sm mb-2">By Matt Brown · October 26, 2026</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">{TITLE}</h1>
      </header>
      <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />
      <ArticleAnswerSummary slug={SLUG} />
      <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>A few years ago, a mother sat across from me at her kitchen table and slid a green spiral notebook toward me. "I don't know if this helps," she said. "I just started writing things down." She didn't know it yet, but documenting a loved one's addiction was the smartest move she'd made all year.</p>
        <p>It held fourteen months of entries. Dates. A missed Thanksgiving. Four hundred dollars gone from her purse. A 2 a.m. phone call where her son was slurring so badly she couldn't understand him. In more than 20 years of doing interventions, that notebook is still one of the most useful things a family has ever handed me. Not because it was dramatic. Because it was true.</p>
        <p>That's why writing it down is one of the first things I ask families to do. It costs nothing, it takes five minutes, and you can start tonight.</p>
        <p>I also know what that notebook would have looked like about me. My family didn't keep one. If they had, it would have been awfully hard for me to argue with. And believe me, back then I argued with everything.</p>
        <h2 className={h2}>What Does Documenting a Loved One's Addiction Actually Mean?</h2>
        <p>It means keeping a simple, private, dated record of what you see, what happens, and how it affects you. It's not a case file and it's not a surveillance log. It's just facts, written down close to when they happen.</p>
        <p>Think of it as a weather report instead of a diary. You're not writing your feelings into ten pages of prose (though you can do that somewhere else, and it might help). You're noting what happened, when, and what it cost.</p>
        <h2 className={h2}>Why Should Families Write Down What's Happening?</h2>
        <p>Because memory bends toward hope, and addiction bends the truth. A written record keeps you anchored to what actually happened, not what you were told happened or what you wish happened.</p>
        <h3 className={h3}>Your memory is working against you</h3>
        <p>Families living with addiction run on hope, and hope edits. One good week can quietly erase a terrible month. I've had parents tell me "it's not that bad lately," then open their notes and find three incidents in ten days. They weren't lying to me. They were exhausted, and exhausted people forget.</p>
        <h3 className={h3}>The addiction is working against you too</h3>
        <p>"That's not what happened." "It was one time." "You're exaggerating." I said all of those, and I said them with total confidence. In active addiction, I was a master of revisionist history. A dated entry doesn't get into a debate. It just sits there being accurate.</p>
        <h3 className={h3}>It helps the people trying to help you</h3>
        <p>When you call an interventionist, a treatment center, or a family therapist, the first questions are about patterns. How long? How often? What's changed? A record turns "I don't know, it's been a while" into real answers, and real answers lead to the right level of care.</p>
        <h2 className={h2}>What Should I Write Down When Documenting a Loved One's Addiction?</h2>
        <p>Write down dates, specific behaviors, consequences, and your own reactions. Keep each entry short and stick to what you saw or heard yourself.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>The date and time</li>
          <li>What you saw or heard, described plainly: "slurred speech and smelled of alcohol at 4 p.m." instead of "he was a mess"</li>
          <li>Substances, bottles, or paraphernalia you came across</li>
          <li>Money that went missing, was borrowed, or can't be explained</li>
          <li>Missed work, school, family events, or court and legal letters</li>
          <li>Promises made, like "I'll stop after the holidays"</li>
          <li>Safety concerns: driving impaired, nodding off, overdose scares</li>
          <li>How it affected you, your kids, or others in the house</li>
        </ul>
        <p>A real entry can be this simple: "Oct 12, 9:40 p.m. Came home two hours late, said traffic. Eyes pinned, couldn't finish sentences. Our daughter asked if Dad was sick. I didn't sleep." That's it. That's a powerful sentence.</p>
        <h2 className={h2}>How Do I Keep a Record Without Becoming the Addiction Police?</h2>
        <p>Write down what crosses your path; don't go hunting for it. The point is clarity for you, not a weapon and not a second full-time job. If you've already been <Link to="/blog/monitoring-an-addicted-loved-one" className={linkClass}>monitoring an addicted loved one</Link> around the clock, this is the healthier version of that instinct.</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Keep it private and secure: a notebook somewhere safe, or a locked notes app on your phone.</li>
          <li>Never read it aloud in the middle of a fight. It's not ammunition.</li>
          <li>Write the good days too. Honesty cuts both ways, and it keeps you fair.</li>
          <li>Cap it at five minutes. If it's taking an hour, it's taking over.</li>
        </ul>
        <p>Here's my self-aware moment: if you catch yourself checking his car mileage at midnight, you don't need a better notebook. You need support for you. That's not a failure. That's information.</p>
        <h2 className={h2}>What Do I Do With the Record Once I Have It?</h2>
        <p>Read it back after two or three weeks. Most families see a pattern they couldn't see while living inside it, and that pattern is usually the push they needed to ask for help.</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Read it in one sitting, start to finish.</li>
          <li>Circle what repeats: the same excuses, the same days, the same consequences.</li>
          <li>Bring it to your first call with a professional. You'll be amazed how much clearer that conversation gets.</li>
          <li>If an intervention happens, use it to write your letter. Specific, loving examples land in a way that general worry never does.</li>
        </ol>
        <p>One important note: if someone is in danger right now, don't write it down. Call 911.</p>
        <h2 className={h2}>You Don't Need a Plan. You Need a Pen.</h2>
        <p>That mom's son went to treatment. At his intervention, her letter was built from that green notebook, and later he told me something I'll never forget: "I could argue with how she felt. I couldn't argue with the dates."</p>
        <p>You don't have to have it all figured out tonight. You don't have to know what you'll say or when you'll say it. Start with one honest line on one page. That line is the beginning of the end of guessing, and the beginning of doing something.</p>
      </article>
      <FaqSection title="Frequently Asked Questions About Documenting a Loved One's Addiction" faqs={faqs} />
      <section className="prose prose-lg max-w-none text-foreground/90 space-y-6 mt-10">
        <h2 className={h2}>Keep Listening, Keep Going</h2>
        <p>If this one hit home, listen to <Link to="/episodes" className={linkClass}>The Party Wreckers podcast</Link>, where we talk honestly about intervention, addiction, and recovery from both sides of the kitchen table. Follow me, Matt Brown, for more real talk for families in crisis.</p>
        <p>And if you're ready to talk to someone about your family's situation, <a href="https://freedominterventions.com/contact" target="_blank" rel="noopener noreferrer" className={linkClass}>reach out to an interventionist at FreedomInterventions.com</a>. You don't have to do this alone.</p>
        <h3 className={h3}>Related Reading</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><Link to="/blog/what-to-say-at-an-intervention" className={linkClass}>What to Say at an Intervention: Scripts & Steps That Actually Work</Link></li>
          <li><Link to="/blog/monitoring-an-addicted-loved-one" className={linkClass}>Monitoring an Addicted Loved One: Counting Pills</Link></li>
        </ul>
      </section>
      <div className="mt-12 pt-8 border-t"><Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link></div>
    </main>
    <Footer />
  </div>
);

export default DocumentingALovedOnesAddiction;
