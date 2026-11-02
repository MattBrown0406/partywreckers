import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import FaqSection from "@/components/FaqSection";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-intervention-what-to-say.jpg";

const pageFaqs = [
  {
    question: "What should I say at an intervention?",
    answer: "Prepare a personal impact statement that includes one or two specific incidents, how they made you feel using 'I' statements, a statement of love and belief in recovery, and a direct ask to accept treatment."
  },
  {
    question: "What should I avoid saying at an intervention?",
    answer: "Avoid accusatory 'you' statements, relitigating old arguments, making ultimatums you won't follow through on, and improvising instead of reading a prepared statement."
  },
  {
    question: "Do I need a professional interventionist?",
    answer: "Consider a professional if there's a history of violence, co-occurring mental health conditions, previous failed attempts, significant family conflict, or severe physical dependence requiring medical supervision."
  },
  {
    question: "How long should an intervention last?",
    answer: "A well-run intervention typically lasts 45 to 90 minutes. Rehearsing beforehand helps ensure it stays focused and doesn't run too long."
  }
];

const WhatToSayAtAnIntervention = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="What to Say at an Intervention: Scripts & Steps That Actually Work | Party Wreckers"
        description="A professional interventionist explains exactly what to say at an intervention — including word-for-word script examples, what NOT to say, and step-by-step preparation tips for families."
        canonical="/blog/what-to-say-at-an-intervention"
        ogType="article"
        ogImage={blogImage}
        keywords="what to say at an intervention, how to stage an intervention, intervention for addiction, drug intervention steps, intervention script examples"
        publishedTime="2026-03-08"
      />

      <ArticleJsonLd
        title="What to Say at an Intervention: Scripts & Steps That Actually Work"
        image={blogImage}
        datePublished="2026-03-08"
        dateModified="2026-03-08"
        slug="what-to-say-at-an-intervention"
        description="A professional interventionist explains exactly what to say at an intervention — including word-for-word script examples, what NOT to say, and step-by-step preparation tips for families."
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: "What to Say at an Intervention", url: "/blog/what-to-say-at-an-intervention" }
        ]}
      />

      <FAQJsonLd faqs={pageFaqs} />

      <Navbar />

      <main className="container mx-auto px-4 py-8">
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
            alt="Family gathered in a warm living room preparing for an addiction intervention conversation with notes on a table"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-muted-foreground text-sm mb-2">March 8, 2026</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            What to Say at an Intervention: Scripts and Steps That Actually Work
          </h1>
        </header>

        <ArticleAnswerSummary slug="what-to-say-at-an-intervention" />

        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <p>
            You know something needs to change. You've watched someone you love disappear into their addiction — the missed birthdays, the broken promises, the fear every time your phone rings late at night. You're ready to do something. But when you sit down to think about the actual intervention, one question freezes you in your tracks:
          </p>

          <p className="text-foreground font-medium italic text-xl">
            What do I even say?
          </p>

          <p>
            It's the most common thing families ask me before an intervention. And it makes sense — the stakes feel impossibly high. Say the wrong thing and your loved one walks out. Say nothing and nothing changes.
          </p>

          <p>
            This guide gives you the practical framework professional interventionists use: what to say, how to say it, what to avoid, and how to prepare so that when the moment comes, your words land with love and purpose — not anger or chaos.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">First: Understand What an Intervention Is Actually For</h2>

          <p>
            Most people think an intervention is about confronting someone with a list of their failures. TV has done a lot of damage here. The classic image — a semicircle of crying people ambushing an addict — often does more harm than good.
          </p>

          <p>
            A well-run intervention is not a confrontation. It is a structured, rehearsed conversation designed to do three things:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Help your loved one see, clearly and compassionately, how their addiction is affecting the people who love them.</li>
            <li>Present a specific treatment plan and ask them to accept it immediately.</li>
            <li>Set clear, loving consequences if they choose not to accept help.</li>
          </ul>

          <div className="bg-muted/50 border-l-4 border-primary p-6 rounded-r-lg my-8">
            <p className="font-semibold text-foreground mb-2">Key Insight from the Field</p>
            <p>
              The goal is not to "win" the conversation. The goal is to open a door wide enough that your loved one can walk through it — even if they're scared. When families walk in ready to fight, the intervention almost always fails. When they walk in ready to love, the odds shift dramatically.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-foreground mt-10">Step-by-Step: How to Prepare What You're Going to Say</h2>

          <h3 className="text-xl font-bold text-foreground mt-8">Step 1: Write Your Impact Statement — Not a List of Grievances</h3>

          <p>
            Your impact statement is the heart of what you'll say. It is NOT a timeline of every bad thing that's happened. It is a personal, specific, emotionally honest expression of what their addiction has cost — and what you're hoping for.
          </p>

          <p>A strong impact statement follows this structure:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>One or two specific memories or incidents (not a list — pick the most meaningful)</li>
            <li>How those moments made you feel — using "I" statements, not accusations</li>
            <li>A statement of love and belief in their ability to recover</li>
            <li>A direct ask: "I am asking you today to accept the help we've arranged."</li>
          </ul>

          <div className="bg-muted/50 border-l-4 border-primary p-6 rounded-r-lg my-8">
            <p className="font-semibold text-foreground mb-2">Sample Script — Feel free to adapt this</p>
            <p className="italic">
              "I want to start by telling you that I love you. That hasn't changed. But I have to be honest with you about what I've been experiencing.
            </p>
            <p className="italic mt-3">
              Last Thanksgiving, when you came to dinner and you were barely able to stay awake at the table — I watched our kids look at you, and then look at me, and I had no words for them. That moment broke something in me.
            </p>
            <p className="italic mt-3">
              I'm not saying this to hurt you. I'm saying this because I believe you deserve better than this, and I believe the person I married is still in there.
            </p>
            <p className="italic mt-3">
              We've made arrangements at [treatment center name]. Everything is ready. Today, I am asking you to say yes — not for me, not for the kids, but because your life matters and there's a way out of this."
            </p>
          </div>

          <h3 className="text-xl font-bold text-foreground mt-8">Step 2: Write Your Consequences — And Mean Every Word</h3>

          <p>
            This is where most families stumble. Every person at the intervention must be prepared to state what they will stop doing if their loved one refuses help. This is not a threat — it is a loving boundary.
          </p>

          <p>Common examples include:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>"I will no longer give you money or cover your bills."</li>
            <li>"You will need to find another place to live."</li>
            <li>"I will not attend family events with you while you're actively using."</li>
          </ul>

          <p>
            The critical rule: do not say anything you are not fully prepared to follow through on. Empty consequences teach your loved one that you don't mean what you say — and it erodes the foundation of the entire process.
          </p>

          <div className="bg-muted/50 border-l-4 border-primary p-6 rounded-r-lg my-8">
            <p className="font-semibold text-foreground mb-2">From the Trenches</p>
            <p>
              I've sat in hundreds of interventions. The ones that fail almost always fail at this step — someone threatens a consequence they're not ready to enforce, the person in addiction calls their bluff, and the whole structure collapses. Prepare your consequences carefully. Say only what you'll actually do.
            </p>
          </div>

          <h3 className="text-xl font-bold text-foreground mt-8">Step 3: Rehearse Out Loud</h3>

          <p>
            Reading your statement silently is not enough. You need to say it out loud — ideally in front of the other team members — before the real intervention happens. You'll be surprised how different it sounds when you hear yourself say it, and how emotions you thought were under control suddenly surface.
          </p>

          <p>Rehearsal helps you:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Identify and prepare for moments where you might lose your composure</li>
            <li>Ensure your tone stays loving, not accusatory</li>
            <li>Time out the full intervention so it doesn't run too long (45–90 minutes is the sweet spot)</li>
          </ul>

          <h2 className="text-2xl font-bold text-foreground mt-10">What NOT to Say at an Intervention</h2>

          <p>
            What you leave out of an intervention matters as much as what you include. Here are the phrases and patterns that most often derail a family intervention:
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">Avoid Accusatory "You" Statements</h3>

          <p>
            "You ruined our vacation." "You never think about anyone but yourself." — These put your loved one on the defensive immediately. Replace every "you" accusation with an "I" feeling statement.
          </p>

          <p>Instead of: <span className="italic">"You embarrassed me at the wedding."</span></p>
          <p>Try: <span className="italic">"When what happened at the wedding occurred, I felt humiliated and scared, and I didn't know how to explain it to people I care about."</span></p>

          <h3 className="text-xl font-bold text-foreground mt-8">Avoid Bringing Up Old Arguments</h3>

          <p>
            An intervention is not the time to relitigate old fights. If a team member has unresolved resentments, they may need to process those separately — before the intervention — so those feelings don't hijack the room.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">Avoid Ultimatums That Are Actually Bluffs</h3>

          <p>
            If you say "I'm leaving you if you don't go to treatment" and you're not actually prepared to leave, don't say it. Your loved one, regardless of how impaired they are, will often sense the difference between a genuine boundary and a performance.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">Don't Wing It</h3>

          <p>
            Improvising in an intervention almost never works. High emotion, long silences, tangents — these erode the focused, intentional energy the process needs. Write it down. Practice it. Stick to it.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">Do You Need a Professional Interventionist?</h2>

          <p>
            This is a question worth addressing honestly. Not every family does — and not every family can afford one. But here's a clear breakdown to help you decide:
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">Consider a professional interventionist if:</h3>

          <ul className="list-disc pl-6 space-y-2">
            <li>Your loved one has a history of violence or volatile reactions</li>
            <li>There are co-occurring mental health conditions alongside the addiction</li>
            <li>Previous intervention attempts have failed</li>
            <li>The family is deeply divided or has significant conflict among team members</li>
            <li>You're dealing with severe physical dependence that may require immediate medical supervision</li>
          </ul>

          <h3 className="text-xl font-bold text-foreground mt-8">A family-led intervention can be appropriate if:</h3>

          <ul className="list-disc pl-6 space-y-2">
            <li>The addiction is caught early and the person has some acknowledgment of the problem</li>
            <li>The family is relatively unified and not in significant conflict</li>
            <li>The person is not physically dangerous or a serious flight risk</li>
          </ul>

          <div className="bg-muted/50 border-l-4 border-primary p-6 rounded-r-lg my-8">
            <p className="font-semibold text-foreground mb-2">About Party Wreckers</p>
            <p>
              Matt Brown and the Party Wreckers team offer Intervention on Call — a way to get professional guidance without the full cost of an in-person interventionist. One-hour coaching sessions are available for families who want expert support to prepare their intervention. Learn more at partywreckers.com.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-foreground mt-10">Quick Reference: What to Say at Each Stage</h2>

          <h3 className="text-xl font-bold text-foreground mt-8">Opening (by the lead speaker):</h3>

          <p className="italic text-foreground font-medium">
            "[Name], we're here because we love you and we're scared. Nothing we say today comes from anger. It comes from wanting you to live."
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">During each person's statement:</h3>

          <p>
            Each person reads their prepared impact statement. Keep statements to 2–3 minutes maximum. No interruptions, no debate.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">The ask:</h3>

          <p className="italic text-foreground font-medium">
            "We've arranged a spot at [treatment center]. It's ready today. We are asking you — right now — to accept this help. Will you go?"
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">If they say yes:</h3>

          <p>
            Move immediately. Do not delay to "let them say goodbye" or "get a few things." Have a bag packed if possible. Every hour of delay is a risk.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">If they say no:</h3>

          <p>
            Each team member calmly states their consequence. Do not argue, beg, or negotiate. Leave together. Follow through.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">You Don't Have to Do This Alone</h2>

          <p>
            Preparing for an intervention is one of the most emotionally demanding things a family can do. The fact that you're researching it, thinking about the words, and trying to do it right — that already says a great deal about how much you love this person.
          </p>

          <p>
            If you want guidance from a professional before you sit down with your loved one, Matt Brown and the Party Wreckers team are here to help. Whether you need an hour of coaching, support for the whole team, or just someone who gets it — reach out.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">Resources:</h3>

          <ul className="list-disc pl-6 space-y-2">
            <li>Party Wreckers Intervention Coaching: <a href="https://partywreckers.com" className="text-primary hover:underline">partywreckers.com</a></li>
            <li>Association of Intervention Specialists: <a href="https://associationofinterventionspecialists.org" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">associationofinterventionspecialists.org</a></li>
            <li>SAMHSA National Helpline: <a href="tel:18006624357" className="text-primary hover:underline">1-800-662-4357</a> (free, confidential, 24/7)</li>
            <li>Freedom Interventions: <a href="https://freedominterventions.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">freedominterventions.com</a></li>
          </ul>

          <h3 className="text-xl font-bold text-foreground mt-8">References & Further Reading:</h3>

          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Mayo Clinic – Intervention: Help a loved one overcome addiction (2023)</li>
            <li>SAMHSA – Alcohol, Tobacco and Other Drugs Resource Guide (2024)</li>
            <li>American Addiction Centers – How to Stage a Drug or Alcohol Intervention (2024)</li>
            <li>Johnson, V.E. – Intervention: How to Help Someone Who Doesn't Want Help (1986, Johnson Institute)</li>
          </ul>
        </article>
        <FaqSection faqs={pageFaqs} />

        <div className="mt-8">
          <SocialShareButtons
            url="https://partywreckers.com/blog/what-to-say-at-an-intervention"
            title="What to Say at an Intervention: Scripts and Steps That Actually Work"
          />
        </div>

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

export default WhatToSayAtAnIntervention;
