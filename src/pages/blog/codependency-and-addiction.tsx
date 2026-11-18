import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import FaqSection from "@/components/FaqSection";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-codependency-and-addiction.jpg";

const SLUG = "codependency-and-addiction";
const TITLE = "Codependency and Addiction: \u201CI Used to Paint\u201D";
const DESCRIPTION = "Codependency and addiction feed each other. Interventionist Matt Brown shares the signs, why rescuing backfires, and how families can get their lives back.";
const linkClass = "text-primary hover:text-primary/80 transition-colors";
const h2 = "text-2xl font-bold text-foreground mt-10";
const h3 = "text-xl font-bold text-foreground mt-6";
const faqs = [
  {
    question: "Is codependency the same as enabling?",
    answer: "Not exactly. Enabling is a behavior, like paying a debt or making excuses, that shields someone from consequences. Codependency is the deeper pattern underneath, where your identity and emotions depend on managing them. Most codependent people enable, but changing the behavior is usually the first step toward healing the pattern.",
  },
  {
    question: "Can you be codependent with an adult child?",
    answer: "Yes, and it's one of the most common situations I see. Parents are wired to protect, so it's easy to keep doing for a 28-year-old what you did for an 8-year-old. Loving an adult child means letting them carry adult consequences.",
  },
  {
    question: "Will detaching make my loved one's addiction worse?",
    answer: "Detaching with love doesn't mean withdrawing safety or affection. It means you stop absorbing the consequences of their using, and in my experience that discomfort often moves people toward help. If you're worried about immediate danger, talk with a professional before making big changes.",
  },
  {
    question: "Where can families get help for codependency?",
    answer: "Al-Anon and Nar-Anon are free and available almost everywhere. Family programs at treatment centers, therapists who specialize in addiction, and professional interventionists can all help. You don't have to wait for your loved one to get help before you get your own.",
  },
  {
    question: "Can codependency be fixed?",
    answer: "Yes. Codependency is a learned pattern, which means it can be unlearned. With support and practice, families rebuild boundaries, identity, and peace, often while their loved one is still working out their own recovery.",
  },
];

const CodependencyAndAddiction = () => (
  <div className="min-h-screen bg-background">
    <SEOHead
      title={`${TITLE} | Party Wreckers`}
      description={DESCRIPTION}
      canonical={`/blog/${SLUG}`}
      ogType="article"
      ogImage={blogImage}
      keywords="codependency and addiction, codependency signs, enabling an addicted loved one, detaching with love, family recovery, Matt Brown"
      publishedTime="2026-11-18"
    />
    <ArticleJsonLd title={TITLE} description={DESCRIPTION} image={blogImage} datePublished="2026-11-18" dateModified="2026-11-18" slug={SLUG} />
    <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }, { name: "Codependency and Addiction", url: `/blog/${SLUG}` }]} />
    <FAQJsonLd faqs={faqs} />
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-8 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link>
      <header className="mb-8">
        <img src={blogImage} alt="A mother quietly painting a watercolor of her backyard at her kitchen table, with her phone face down nearby" className="w-full aspect-video object-cover rounded-lg mb-6" width={1344} height={768} />
        <p className="text-muted-foreground text-sm mb-2">By Matt Brown · November 18, 2026</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">{TITLE}</h1>
      </header>
      <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />
      <ArticleAnswerSummary slug={SLUG} />
      <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>A few years ago I sat at a kitchen table with a family the night before an intervention. We'd gone over the letters, the plan, and the bed waiting at treatment. Then I asked the mom a question I ask almost everyone: "What do you do for you?"</p>
        <p>She stared at me like I'd spoken another language. Then she started crying and said, "I used to paint."</p>
        <p>She hadn't touched a brush in nine years. Nine years of tracking her son's moods, his phone location, his bank account, and his lies. That's what codependency and addiction look like when they move into the same house. One person disappears into the drug. The other disappears into the person using it.</p>
        <p>I know both sides of that table. Twenty-two years ago, I was the guy everybody was orbiting. I didn't notice the people burning themselves out trying to keep me alive. I was too busy making it hard for them. So today I want to talk to the people doing the orbiting.</p>

        <h2 className={h2}>What Is Codependency in Addiction?</h2>
        <p>Codependency in addiction is when your well-being becomes tied to managing someone else's using. Your mood, your schedule, and your sense of worth start rising and falling with theirs. It isn't a character flaw. It's what love does when it's been scared for too long.</p>
        <p>Most families I work with don't recognize it, because it looks like being a good parent, a loyal spouse, or a devoted sister. Nobody wakes up and decides to become codependent. You answer one 2 a.m. call. Then you answer all of them. Then your phone never leaves your hand.</p>
        <p>Here's the simple version: if their addiction is running your life, you're in it too.</p>

        <h2 className={h2}>How Do I Know If I'm Codependent With an Addicted Loved One?</h2>
        <p>You're likely codependent if you feel responsible for their choices, can't relax until you know where they are, and feel like saying no to them is dangerous. A few honest questions will tell you more than any online quiz.</p>
        <p>Here are the signs I see over and over:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You can read their mood from the way they shut the car door.</li>
          <li>You've canceled your own plans so many times that your friends stopped asking.</li>
          <li>You feel guilty when you do something nice for yourself.</li>
          <li>You rehearse conversations with them in the shower.</li>
          <li>You quietly fix consequences, like the overdraft, the missed shift, or the dented bumper, so nobody else finds out.</li>
          <li>When someone asks how you're doing, you answer with how they're doing.</li>
        </ul>
        <p>That last one is the giveaway. Ask a codependent mom how she is, and she'll tell you her son had a decent week. I've watched it happen at more kitchen tables than I can count.</p>
        <p>If money is one of the ways you've been rescuing them, this guide to <Link to="/blog/giving-money-to-an-addicted-loved-one" className={linkClass}>enabling an addicted loved one</Link> is a useful place to start.</p>

        <h2 className={h2}>Why Do Codependency and Addiction Feed Each Other?</h2>
        <p>Codependency and addiction feed each other because the rescuer absorbs the pain that might otherwise push the addicted person toward help. When you catch every fall, the person using never feels the floor.</p>
        <p>I'll be blunt about my own story. I didn't get sober because I suddenly saw the light. I got sober because the cushions ran out. The people around me stopped absorbing my wreckage, and for the first time it landed on me.</p>
        <p>That's not a knock on families. Rescuing comes from love and terror, usually in equal parts. But addiction is a clever disease. It learns exactly who will cover, who will pay, and who will believe <Link to="/blog/believing-an-addicts-promises" className={linkClass}>"this time is different."</Link> It stays comfortable as long as someone else is uncomfortable on its behalf.</p>
        <p>There's a second piece, too. The codependent person often gets something out of the arrangement: purpose, a sense of control, the feeling of being needed. I say that with zero judgment. It's just why letting go can feel like losing a limb.</p>

        <h2 className={h2}>How Do You Stop Being Codependent Without Abandoning the Person You Love?</h2>
        <p>You stop being codependent by moving your energy from controlling their addiction to caring for yourself, while staying clear that you love them. Detaching isn't leaving. It's stepping out of the way so consequences can do their work.</p>
        <p>Here's where I start families:</p>
        <h3 className={h3}>1. Name What You're Carrying</h3>
        <p>Write down every job you've taken on for them: wake-up calls, rent, excuses to their boss, checking on them at night. Seeing the list on paper is sobering. Most people find a dozen jobs they never agreed to.</p>
        <h3 className={h3}>2. Hand Back One Thing This Week</h3>
        <p>Don't try to quit everything at once. Pick one job, like calling their work when they're "sick," and hand it back. Tell them calmly, once. Then let it be.</p>
        <h3 className={h3}>3. Get Your Own Support</h3>
        <p>Try Al-Anon, Nar-Anon, a family program, or a therapist who understands addiction. You need a room where people talk about you. Your loved one isn't the only one who needs a recovery plan. A <a href="https://freedominterventions.com/contact" target="_blank" rel="noopener noreferrer" className={linkClass}>professional interventionist</a> can also help your family decide what to stop carrying and what to do next.</p>
        <h3 className={h3}>4. Reclaim One Hour</h3>
        <p>Find one hour a week that belongs only to you. A walk, a class, coffee with the friend you've been ghosting. For the mom at that table, it was a twelve-dollar set of watercolors. Small things rebuild a self.</p>

        <h2 className={h2}>What Happens to the Addict When the Family Gets Healthy?</h2>
        <p>When the family gets healthy, the addiction loses its support system, and the person using is often more willing to accept help. A healthy family doesn't guarantee recovery, but it stops making active addiction easy.</p>
        <p>This is what wrecking the party really means. It's not yelling, and it's not an ambush. It's a family that stops catering the party of active addiction.</p>
        <p>I've seen it again and again. Mom starts going to meetings. Dad stops paying the phone bill. A sister finally says, "I love you, and I'm not lying for you anymore." Suddenly the person using looks around and realizes the room got quiet. That quiet is often where change begins.</p>
        <p>And here's the part nobody tells you: even if your loved one doesn't change right away, you get your life back.</p>

        <h2 className={h2}>You're Allowed to Have a Life Again</h2>
        <p>The mom who used to paint? Her son went to treatment the next morning. But what I remember most came months later, when she texted me a photo of a small, slightly crooked painting of her backyard.</p>
        <p>You didn't cause this, and you can't control it. But you can stop disappearing into it. Your loved one needs you healthy far more than they need you exhausted.</p>
      </article>
      <FaqSection title="Frequently Asked Questions About Codependency and Addiction" faqs={faqs} />
      <section className="prose prose-lg max-w-none text-foreground/90 space-y-6 mt-10">
        <h2 className={h2}>Keep the Conversation Going</h2>
        <p>If this one hit close to home, listen to <Link to="/episodes" className={linkClass}>The Party Wreckers podcast</Link>, where I talk honestly about intervention, addiction, and recovery from both sides of the table. Follow me for more real talk about families and recovery. And if you're ready to get help for someone you love, <a href="https://freedominterventions.com/contact" target="_blank" rel="noopener noreferrer" className={linkClass}>reach out to my team at FreedomInterventions.com</a>. You don't have to keep orbiting alone.</p>
        <h3 className="text-xl font-bold text-foreground mt-8">Related Reading</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><Link to="/blog/giving-money-to-an-addicted-loved-one" className={linkClass}>The Loan That Was Never a Loan: Why Families Keep Giving Money to an Addicted Loved One</Link></li>
          <li><Link to="/blog/believing-an-addicts-promises" className={linkClass}>“This Time Is Different”: Why Families Keep Believing an Addict's Promises</Link></li>
        </ul>
      </section>
      <div className="mt-12 pt-8 border-t"><Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link></div>
    </main>
    <Footer />
  </div>
);

export default CodependencyAndAddiction;
