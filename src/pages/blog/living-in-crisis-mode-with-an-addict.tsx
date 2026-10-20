import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import FaqSection from "@/components/FaqSection";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-living-in-crisis-mode-with-an-addict.jpg";

const SLUG = "living-in-crisis-mode-with-an-addict";
const TITLE = "Always On Call: Living in Crisis Mode With an Addict (and How to Finally Get Out)";
const DESCRIPTION = "Living in crisis mode with an addict? Interventionist Matt Brown explains why families get stuck putting out fires, and how to stop reacting and start planning.";
const linkClass = "text-primary hover:text-primary/80 transition-colors";
const h2 = "text-2xl font-bold text-foreground mt-10";
const faqs = [
  { question: "What does it mean to live in crisis mode with an addict?", answer: "It means your family's days are driven by emergencies created by your loved one's addiction instead of by planned decisions. You react to one problem after another, which keeps everyone exhausted and keeps the focus off the addiction itself." },
  { question: "Should I answer every call from my addicted loved one?", answer: "Not necessarily. You can love someone and still let a call go to voicemail. Decide ahead of time which situations you'll respond to right away, like medical or safety emergencies, and which ones can wait until you've had time to think." },
  { question: "Is it enabling to bail my loved one out of every crisis?", answer: "Often, yes. When a family absorbs every consequence, the person in active addiction never has to feel the full weight of their choices. Letting a non-life-threatening consequence stand is not cruelty. It's frequently the most loving thing you can do." },
  { question: "What counts as a real emergency with an addicted family member?", answer: "Overdose signs, suicidal statements, violence, a serious medical problem, or a child in danger are real emergencies. Call 911 immediately. Money problems, legal trouble, and lost jobs are serious, but they rarely require you to act within the hour." },
  { question: "When should we stop waiting and call an interventionist?", answer: "If you're asking the question, it's time to have the conversation. A call to an interventionist is not a commitment to anything. It's information, and it's the first step out of reacting and into planning." },
];

const LivingInCrisisMode = () => (
  <div className="min-h-screen bg-background">
    <SEOHead title={`${TITLE} | Party Wreckers`} description={DESCRIPTION} canonical={`/blog/${SLUG}`} ogType="article" ogImage={blogImage} keywords="living in crisis mode with an addict, family addiction crisis, enabling addiction, planned intervention, Matt Brown interventionist" publishedTime="2026-10-20" />
    <ArticleJsonLd title={TITLE} description={DESCRIPTION} image={blogImage} datePublished="2026-10-20" dateModified="2026-10-20" slug={SLUG} />
    <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }, { name: "Living in Crisis Mode With an Addict", url: `/blog/${SLUG}` }]} />
    <FAQJsonLd faqs={faqs} />
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-8 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link>
      <header className="mb-8">
        <img src={blogImage} alt="An exhausted adult couple at a kitchen table late at night, watching a phone and waiting for the next call" className="w-full aspect-video object-cover rounded-lg mb-6" width={1344} height={768} />
        <p className="text-muted-foreground text-sm mb-2">By Matt Brown · October 20, 2026</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">{TITLE}</h1>
      </header>
      <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />
      <ArticleAnswerSummary slug={SLUG} />
      <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>When I was drinking, I knew exactly who in my family would pick up the phone at 2 a.m. I knew who to call for gas money, who to call for a ride, and who to call when I needed someone to tell me I wasn't as bad as everybody said. I didn't think of it as a strategy. But it was one, and it worked for years.</p>
        <p>Twenty-plus years into this work, I see the other side of it every week: families living in crisis mode with an addict. They're exhausted, brilliant at putting out fires, and can't remember the last time they planned anything. If that's you, this one's for you.</p>

        <h2 className={h2}>What does living in crisis mode with an addict look like?</h2>
        <p>Living in crisis mode with an addict means your family runs on emergencies instead of decisions. You react to whatever your loved one's addiction throws at you that day, and the next crisis always arrives before you've recovered from the last one.</p>
        <p>Here's what I hear from families who are stuck in it:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Your phone never leaves your hand, and your stomach drops every time it buzzes.</li>
          <li>You've cancelled plans, vacations, or work to handle "just one more" emergency.</li>
          <li>Family conversations are only about the latest problem: the arrest, the overdraft, the car, the job.</li>
          <li>You can't remember the last time you talked about the addiction itself instead of its fallout.</li>
          <li>When things go quiet for a week, you don't relax. You brace.</li>
        </ul>
        <p>That last one matters. When calm feels more frightening than chaos, crisis mode isn't something happening to your family anymore. It's how your family operates.</p>

        <h2 className={h2}>Why do families get stuck in crisis mode with addiction?</h2>
        <p>Families get stuck because addiction manufactures urgency, and each emergency feels too real to ignore. Responding feels like love. Not responding feels like abandonment. So you respond, every single time.</p>
        <p>There's also a quieter reason nobody likes to admit: crisis gives you something to do. When you're scared and powerless, rushing to the jail or wiring rent money feels like control. Sitting still with the fear feels unbearable. I've watched brave, loving people burn themselves out on adrenaline alone.</p>

        <h2 className={h2}>How crisis mode protects the addiction</h2>
        <p>Here's the part that changed my thinking. Every time a family absorbs a crisis, the conversation stays on the fire and never gets to the arson. Nobody asks why the car got impounded. Everybody just scrambles to get it out.</p>
        <p>I know this because I benefited from it. As long as my family was busy cleaning up after me, nobody had the time or energy to sit me down and say, "This is about your drinking, and it stops now." The chaos was my cover.</p>

        <h2 className={h2}>How do you tell a real emergency from a manufactured one?</h2>
        <p>A real emergency is one where someone's life or safety is at immediate risk, and the answer is to call 911. Almost everything else, no matter how loud it is, can wait 24 hours while you think.</p>
        <p>Here's the rough sorting I give families:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Real emergencies (act now):</strong> signs of an overdose, talk of suicide, violence or threats, a medical crisis, a child in danger. Call 911. If opioids are involved, keep naloxone (Narcan) in the house and know how to use it.</li>
          <li><strong>Manufactured emergencies (can wait):</strong> bail money, rent that's due "tonight," an impounded car, a lost phone, a dealer they owe, a job they're about to lose, "I just need $200 and I swear this is the last time."</li>
        </ul>
        <p>The second list feels urgent because it's designed to. Addiction is a world-class salesman, and urgency is its best closing technique. The consequence is real, but it's theirs, and it rarely needs solving by you before sunrise.</p>

        <h2 className={h2}>How do you stop living in crisis mode with an addict?</h2>
        <p>You stop living in crisis mode by deciding ahead of time how you'll respond, so the next phone call doesn't get to decide for you. It's not about caring less. It's about moving your decisions out of the panic and into the daylight.</p>
        <p>Here's where I'd start:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Adopt a 24-hour rule.</strong> Unless it's a true emergency, you don't give money, make calls, or show up for at least a day. Most "emergencies" look very different the next morning.</li>
          <li><strong>Write your script before you need it.</strong> Something like: "I love you. I'm not going to fix this tonight. I'll call you tomorrow." Tape it by the phone if you have to. You will not think clearly at 2 a.m., and you don't have to.</li>
          <li><strong>Get the family on one page.</strong> Crisis mode thrives when your loved one can call Mom after Dad says no. Agree together on what you will and won't do, and stick to it.</li>
          <li><strong>Use the quiet weeks to plan, not just to recover.</strong> The calm stretches are your best window to call a professional, research treatment, and get ready. Don't waste them bracing.</li>
          <li><strong>Get your own support.</strong> Al-Anon, Nar-Anon, a family therapist, a family recovery program. You can't break a family pattern while you're running on empty.</li>
        </ol>
        <p>The first time you don't jump, it will feel awful. Usually you're just finally letting the consequence land where it belongs.</p>

        <h2 className={h2}>Why is a planned intervention the opposite of crisis mode?</h2>
        <p>Crisis mode is reactive. A professional intervention is planned: the family chooses the time, the words, and the treatment bed in advance. That shift from reacting to deciding is often what finally changes the outcome.</p>
        <p>So many families tell me, "We'll do something after this next thing blows over." But in active addiction, the next thing is already on the calendar. Waiting for calm usually means waiting forever.</p>
        <p>When my family finally stopped catching me and started confronting me, it didn't feel like love to me at the time. It felt like they'd wrecked my party. They had. It's the best thing anyone ever did for me.</p>

        <h2 className={h2}>You're allowed to put the phone down</h2>
        <p>If you've been living in crisis mode with an addict for months or years, please hear this: you haven't failed. You've survived. Surviving was the job for a while. It doesn't have to be the job forever.</p>
        <p>You're allowed to sleep with the phone in another room. And you're allowed to stop fighting fires long enough to go after the thing that keeps starting them.</p>

        <div className="mt-10 space-y-3">
          <h3 className="text-xl font-bold text-foreground">Related Reading</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><Link to="/blog/enabling-addiction-families" className={linkClass}>enabling addiction and how families unknowingly fuel it</Link></li>
            <li><a href="https://freedominterventions.com/how-it-works" target="_blank" rel="noopener noreferrer" className={linkClass}>what happens during a professional intervention</a></li>
          </ul>
        </div>

        <h2 className={h2}>Take the Next Step</h2>
        <p>If this hit close to home, listen to <Link to="/episodes" className={linkClass}>The Party Wreckers podcast</Link>, where I talk honestly with families and people in recovery about intervention, addiction, and what comes after. Follow me for new episodes and articles every week.</p>
        <p className="text-foreground font-medium">And if your family is stuck in crisis mode right now, you don't have to wait for the next phone call. <a href="https://freedominterventions.com/contact" target="_blank" rel="noopener noreferrer" className={linkClass}>Reach out to my team at FreedomInterventions.com</a>. We'll help you stop reacting and start planning.</p>
      </article>
      <FaqSection title="Frequently Asked Questions" faqs={faqs} />
      <div className="mt-12 pt-8 border-t"><Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link></div>
    </main>
    <Footer />
  </div>
);

export default LivingInCrisisMode;