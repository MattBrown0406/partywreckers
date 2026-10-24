import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import { ArrowLeft } from "lucide-react";
import blogImage from "@/assets/blog-recovery-roadmap.jpg";

const RecoveryRoadmap = () => {
  const articleUrl = "https://partywreckers.com/blog/recovery-roadmap";
  const articleTitle = "Why I Built the Recovery Roadmap";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Why I Built the Recovery Roadmap — Free Family Addiction Guide | Party Wreckers"
        description="Matt Brown explains why he created the Recovery Roadmap on SoberHelpline.com — a free, stage-based action plan for families navigating addiction. No marketing. No generic advice. Just 20 years of real intervention experience."
        canonical="/blog/recovery-roadmap"
        ogType="article"
        ogImage={blogImage}
        keywords="recovery roadmap addiction, family addiction guide, addiction stages assessment, free addiction help families, sober helpline roadmap, intervention action plan, addiction family support tool"
        publishedTime="2026-03-05"
        modifiedTime="2026-03-05"
      >
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": articleTitle,
            "description": "Matt Brown explains why he built the Recovery Roadmap — a free, stage-based action plan giving families of people with addiction specific steps instead of generic advice.",
            "image": new URL(blogImage, "https://partywreckers.com").href,
            "author": {
              "@type": "Person",
              "name": "Matt Brown",
              "url": "https://partywreckers.com/host"
            },
            "publisher": {
              "@type": "Organization",
              "name": "The Party Wreckers Podcast",
              "url": "https://partywreckers.com"
            },
            "datePublished": "2026-03-05",
            "dateModified": "2026-03-05",
            "mainEntityOfPage": articleUrl
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the Recovery Roadmap?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The Recovery Roadmap is a free, stage-based action plan on SoberHelpline.com that identifies which of eight addiction stages a family is in and provides specific weekly action steps, things to avoid, and guidance on when to call a professional."
                }
              },
              {
                "@type": "Question",
                "name": "How is the Recovery Roadmap different from other addiction resources?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Unlike treatment center blogs designed to sell programs or generic AI chatbots, the Recovery Roadmap is built from 20 years of real intervention experience. It provides personalized, stage-specific action plans rather than one-size-fits-all advice."
                }
              },
              {
                "@type": "Question",
                "name": "How do I use the Recovery Roadmap?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Go to SoberHelpline.com/roadmap, take a five-minute assessment to identify your stage, and receive a personalized action plan with specific steps to take this week."
                }
              }
            ]
          })}
        </script>
      </SEOHead>

      <Navbar />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Back to Blog */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Link>

        {/* Hero Image */}
        <div className="rounded-xl overflow-hidden mb-8">
          <img
            src={blogImage}
            alt="Hand-drawn recovery roadmap on a wooden desk with coffee cup and phone showing family photo, representing a structured guide for families navigating addiction"
            className="w-full h-auto object-cover aspect-video"
            loading="eager"
          />
        </div>

        {/* Title & Meta */}
        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
            Why I Built the Recovery Roadmap
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <span>By Matt Brown</span>
            <span>•</span>
            <time dateTime="2026-03-05">March 5, 2026</time>
          </div>
        </header>

        {/* Social Share */}
        <SocialShareButtons url={articleUrl} title={articleTitle} />

        {/* Article Content */}
        <div className="prose prose-lg max-w-none text-foreground/90 space-y-6 mt-8">
          <p className="text-xl leading-relaxed font-medium text-foreground">
            I got a call last month. A mom in Phoenix. Her son was 26, using fentanyl, and she'd found him unconscious in the bathroom for the second time. She'd already called three treatment centers — two of them tried to sell her a program before asking her son's name. The third put her on hold for 40 minutes and never came back.
          </p>

          <p>
            When she finally got to me, the first thing she said was: <em>"I don't even know what I'm supposed to be doing right now. Nobody will just tell me what to do."</em>
          </p>

          <p>
            That sentence has been haunting me for 20 years. Because she's not the first person to say it. She's the thousandth.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">The Gap Nobody Fills</h2>

          <p>
            Here's the reality of the addiction support landscape: treatment centers market to the insurance company. Therapists see you for 50 minutes a week. Support groups meet on Tuesday nights. But between those moments? Families are completely alone, making decisions in the dark that can literally mean life or death.
          </p>

          <p>
            I've done over a thousand interventions. And in almost every single one, the family says some version of the same thing: <em>"If we'd known what to do sooner, we would've done it sooner."</em>
          </p>

          <p>
            They're not lying. They would have. But nobody gave them a roadmap.
          </p>

          <p className="text-lg font-semibold text-primary">So I built one.</p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">What the Recovery Roadmap Actually Is</h2>

          <p>
            Over 20 years of doing this work, I've watched every family go through the same stages. The names change, the substances change, the cities change — but the journey is almost always the same. Suspicion turns into confirmation. Confirmation turns into crisis. Crisis turns into either intervention or years of spinning.
          </p>

          <p>
            I mapped those stages. Eight of them, from "I think something might be wrong" all the way through long-term recovery — and yes, through relapse, because that's part of the reality for many families.
          </p>

          <p>
            Then I turned each stage into a step-by-step action plan. Not articles. Not generic advice. Specific things to do this week. Specific things to avoid. Specific moments where you need to pick up the phone and call a professional.
          </p>

          <p>
            The <strong>Recovery Roadmap</strong> lives on{" "}
            <a href="https://soberhelpline.com/roadmap" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              SoberHelpline.com
            </a>
            . It's free. You take a five-minute assessment, it identifies which stage you're in, and it gives you your roadmap. Personalized actions based on where you actually are — not where some website thinks you should be.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Why It's Different From Everything Else Out There</h2>

          <p>I'm going to be blunt. Most of what's on the internet about addiction is either:</p>

          <p>
            <strong>Marketing disguised as education.</strong> Every treatment center has a blog. Every page ends with "call our admissions team." The information isn't wrong — it's just designed to sell you a $30,000 program, not to actually help you navigate Tuesday morning.
          </p>

          <p>
            <strong>Peer support with no quality control.</strong> Facebook groups for families of addicts are full of well-meaning people giving dangerous advice. "Just let them hit rock bottom" has killed people. I'm not exaggerating.
          </p>

          <p>
            <strong>Generic AI chatbots.</strong> No addiction expertise. No clinical understanding. Dangerously general.
          </p>

          <p>
            The Recovery Roadmap is different because it's built from my actual playbook. Not research papers. Not marketing copy. Twenty years of sitting across from families in the worst moments of their lives, watching what works and what doesn't, and writing it all down.
          </p>

          <p>
            When the Roadmap says "stop giving them money," it's because I've watched a thousand families fund their loved one's addiction while thinking they were helping. When it says "don't search their room without a plan," it's because I've seen that backfire so many times I lost count. When it says "call a professional, even this early," it's because the average family waits two years between knowing there's a problem and getting help. <strong>Two years.</strong>
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">The Part That Matters Most</h2>

          <p>
            Here's what I want you to hear, especially if you're listening to this podcast at midnight because you can't sleep because you're worried about someone you love:
          </p>

          <p className="text-lg font-semibold text-foreground">
            You are not too late.
          </p>
          <p>
            I don't care if they've been using for six months or six years. I don't care if they've been to treatment three times. I don't care if you've "tried everything." You haven't tried everything — because you haven't had a map.
          </p>

          <p className="text-lg font-semibold text-foreground">
            This is not your fault.
          </p>
          <p>
            Addiction is a chronic medical illness. You didn't cause it with your parenting, your marriage, your genetics, or your choices. You can't control it and you can't cure it. But you CAN respond to it differently starting today.
          </p>

          <p className="text-lg font-semibold text-foreground">
            Your family deserves a guide.
          </p>
          <p>
            Not just the person using. You. The parent lying awake at 3 AM. The spouse pretending everything is fine. The sibling who stopped calling. The kid who's watching all of it and doesn't understand why nobody will explain what's happening. All of you deserve better than Googling in the dark.
          </p>

          <p>
            That's why I built this. Not as a product. Not as a funnel. As the thing I wish existed 20 years ago when I started doing this work — when families would call me desperate, and all I could say was "let me explain what we're going to do." Now they can find that explanation before they ever call me. And if they do call me, they'll be better prepared, more informed, and further along than any family I've ever worked with.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Try It</h2>

          <p>
            Go to{" "}
            <a href="https://soberhelpline.com/roadmap" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80 font-semibold">
              SoberHelpline.com/roadmap
            </a>
            . Take the assessment. Find your stage. Read the action plan. Check things off. And when you're ready to talk to someone — I'm here. I've always been here.
          </p>

          {/* CTA Button */}
          <div className="my-10 text-center">
            <a
              href="https://soberhelpline.com/roadmap"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-primary-foreground font-bold text-lg px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Take the Free Recovery Roadmap Assessment →
            </a>
          </div>

          <p>You don't have to figure this out alone. That's the whole point.</p>

          {/* Author Bio */}
          <hr className="border-border my-10" />
          <p className="text-muted-foreground text-sm italic">
            Matt Brown is the host of{" "}
            <Link to="/" className="text-primary underline hover:text-primary/80">
              The Party Wreckers Podcast
            </Link>
            , founder of{" "}
            <a href="https://freedominterventions.com" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              Freedom Interventions
            </a>
            , and creator of the Recovery Roadmap on{" "}
            <a href="https://soberhelpline.com/roadmap" target="_blank" rel="noopener noreferrer" className="text-primary underline hover:text-primary/80">
              SoberHelpline.com
            </a>
            . For a free consultation, call{" "}
            <a href="tel:+14582988000" className="text-primary underline hover:text-primary/80">
              (458) 298-8000
            </a>
            .
          </p>
          <p className="text-muted-foreground text-sm italic">
            Listen to more episodes at{" "}
            <Link to="/" className="text-primary underline hover:text-primary/80">
              partywreckers.com
            </Link>
            {" "}or wherever you get your podcasts.
          </p>
        </div>

        {/* Bottom Social Share */}
        <div className="mt-12">
          <SocialShareButtons url={articleUrl} title={articleTitle} />
        </div>

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Articles
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default RecoveryRoadmap;
