import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import blogImageAddictionFamilyExhaustion from "@/assets/blog-addiction-family-exhaustion.jpg";

const AddictionFamilyExhaustion = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Why You're Exhausted — And It's Not Just the Drinking - Party Wreckers Podcast"
        description="You tell yourself it's the late nights. The arguments. The chaos. But the exhaustion runs deeper than that. Loving someone with addiction creates a kind of fatigue that sleep doesn't fix."
        canonical="/blog/addiction-family-exhaustion"
        ogType="article"
        ogImage={blogImageAddictionFamilyExhaustion}
        keywords="addiction family exhaustion, hypervigilance addiction family, emotional fatigue loving an addict, nervous system burnout addiction, caregiver stress substance abuse, living with addiction stress"
        publishedTime="February 13, 2026"
      />
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
            src={blogImageAddictionFamilyExhaustion} 
            alt="Exhausted middle-aged woman sitting at kitchen table early morning with cold coffee, eyes unfocused, showing chronic emotional depletion from living with addiction"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-muted-foreground text-sm mb-2">February 13, 2026</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Why You're Exhausted — And It's Not Just the Drinking
          </h1>
        </header>

        <ArticleAnswerSummary slug="addiction-family-exhaustion" />

        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <p>
            You tell yourself it's the late nights. The arguments. The chaos. But the exhaustion runs deeper than that. Loving someone with addiction creates a kind of fatigue that sleep doesn't fix. It's mental. Emotional. Physiological. You are not just tired from their drinking. You're tired from living in constant anticipation. Understanding addiction-related family exhaustion is the first step toward reclaiming your energy.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8">The Hypervigilance Effect</h2>
          <p>When addiction is in the home, your nervous system rarely fully powers down.</p>
          <p>You scan constantly for:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Mood shifts</li>
            <li>Tone changes</li>
            <li>Signs of use</li>
            <li>Financial red flags</li>
            <li>Late arrivals</li>
          </ul>
          <p>This scanning becomes automatic.</p>
          <p>Even when nothing dramatic is happening, your body remains on alert.</p>
          <p>Chronic hypervigilance drains energy faster than visible crisis.</p>

          <h2 className="text-2xl font-bold text-foreground mt-8">Living in Anticipation</h2>
          <p>Addiction creates unpredictability.</p>
          <p>You start living in "What if?" mode:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>What if they relapse?</li>
            <li>What if there's a DUI call?</li>
            <li>What if they lose their job?</li>
            <li>What if tonight escalates?</li>
          </ul>
          <p>Anticipation keeps adrenaline elevated.</p>
          <p>Adrenaline is useful in short bursts.</p>
          <p>Chronic adrenaline is exhausting.</p>

          <h2 className="text-2xl font-bold text-foreground mt-8">The Emotional Labor Nobody Sees</h2>
          <p>You manage:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Your own feelings</li>
            <li>Their feelings</li>
            <li>The kids' feelings</li>
            <li>Extended family questions</li>
            <li>Social explanations</li>
          </ul>
          <p>You regulate conversations. You soften conflicts. You rehearse responses.</p>
          <p>Emotional labor compounds quietly.</p>
          <p>Over time, it becomes depletion.</p>

          <h2 className="text-2xl font-bold text-foreground mt-8">The Conflict Loop</h2>
          <p>Even when arguments are brief, the mental replay continues.</p>
          <p>You think about:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>What you said</li>
            <li>What they meant</li>
            <li>What you should have said</li>
            <li>What might happen next</li>
          </ul>
          <p>Your brain rarely rests.</p>
          <p>Exhaustion is not just physical. It's cognitive.</p>

          <h2 className="text-2xl font-bold text-foreground mt-8">The Rollercoaster Pattern</h2>
          <p>Calm. Crisis. Apology. Hope. Calm again.</p>
          <p>This cycle destabilizes your nervous system.</p>
          <p>Your body never knows whether to relax or brace.</p>
          <p>Rollercoasters are fun at amusement parks.</p>
          <p>In real life, they are draining.</p>

          <h2 className="text-2xl font-bold text-foreground mt-8">The "I'm Fine" Illusion</h2>
          <p>You may tell yourself:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>"I'm handling it."</li>
            <li>"It's not that bad."</li>
            <li>"We're managing."</li>
          </ul>
          <p>Functioning does not equal thriving.</p>
          <p>You can hold it together while running on empty.</p>
          <p>Addiction family exhaustion often becomes normalized.</p>
          <p>That doesn't mean it's sustainable.</p>

          <h2 className="text-2xl font-bold text-foreground mt-8">The Identity Shift</h2>
          <p>Over time, you may notice:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>You're more reactive</li>
            <li>You're less patient</li>
            <li>You're emotionally numb</li>
            <li>You've stopped prioritizing yourself</li>
          </ul>
          <p>Living in a reactive system changes you.</p>
          <p>Not because you're weak.</p>
          <p>Because chronic stress rewires patterns.</p>

          <h2 className="text-2xl font-bold text-foreground mt-8">Why Rest Alone Doesn't Fix It</h2>
          <p>A weekend away may help temporarily.</p>
          <p>But if the underlying system remains unstable, your body returns to vigilance.</p>
          <p>True restoration requires:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Clear boundaries</li>
            <li>Reduced responsibility overload</li>
            <li>Emotional detachment from chaos</li>
            <li>Strategic planning</li>
          </ul>
          <p>Rest without structural change is temporary.</p>

          <h2 className="text-2xl font-bold text-foreground mt-8">The Guilt of Stepping Back</h2>
          <p>You may feel guilty wanting space.</p>
          <p>You think:</p>
          <p>"If I relax, everything will fall apart."</p>
          <p>But constant monitoring does not prevent addiction.</p>
          <p>It only drains you.</p>
          <p>Stepping back is not abandonment.</p>
          <p>It is sustainability.</p>

          <h2 className="text-2xl font-bold text-foreground mt-8">Reclaiming Energy Strategically</h2>
          <p>Energy returns when:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>You stop over-explaining</li>
            <li>You reduce emotional rescuing</li>
            <li>You clarify boundaries</li>
            <li>You limit argument loops</li>
            <li>You seek structured support</li>
          </ul>
          <p>You do not need to fix everything to regain strength.</p>
          <p>You need to stop carrying what is not yours.</p>

          <h2 className="text-2xl font-bold text-foreground mt-8">The Nervous System Reset</h2>
          <p>Small changes help:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Consistent sleep</li>
            <li>Physical movement</li>
            <li>Limiting late-night conflict</li>
            <li>Scheduling time away from addiction-focused conversation</li>
            <li>Reducing financial or logistical overfunctioning</li>
          </ul>
          <p>These actions signal safety to your nervous system.</p>
          <p>Safety restores energy.</p>

          <h2 className="text-2xl font-bold text-foreground mt-8">When Professional Support Is Necessary</h2>
          <p>If exhaustion feels chronic, resentment builds, or clarity fades, professional guidance can help.</p>
          <p>An experienced interventionist can:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Evaluate system imbalance</li>
            <li>Reduce chaos cycles</li>
            <li>Clarify responsibility</li>
            <li>Introduce structured next steps</li>
          </ul>
          <p>You cannot think clearly when depleted.</p>
          <p>Clarity restores power.</p>

          <h2 className="text-2xl font-bold text-foreground mt-8">A Party Wreckers Reality Check</h2>
          <p>You are not exhausted because you're dramatic.</p>
          <p>You are exhausted because you've been living in chronic uncertainty.</p>
          <p>Hypervigilance. Emotional labor. Anticipation. Conflict loops.</p>
          <p>Addiction drains entire systems—not just individuals.</p>
          <p>You deserve stability too.</p>
          <p className="text-foreground font-medium">Reducing chaos is not selfish. It's necessary.</p>
        </article>

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

export default AddictionFamilyExhaustion;
