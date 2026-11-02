import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { ArrowLeft } from "lucide-react";
import blogImageHighFunctioningCocaine from "@/assets/blog-high-functioning-cocaine.jpg";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";

const HighFunctioningCocaineUse = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="High-Functioning Cocaine Use: Why It Looks Controlled—Until It Isn't - Party Wreckers Podcast"
        description="Cocaine has a reputation problem—and a camouflage advantage. Unlike substances that sedate or visibly impair, cocaine often makes people look..."
        canonical="/blog/high-functioning-cocaine-use"
        ogType="article"
        ogImage={blogImageHighFunctioningCocaine}
        keywords="addiction, family support, boundaries, communication, recovery"
        publishedTime="February 5, 2026"
      />
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back to Blog Link */}
        <Link 
          to="/blog" 
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <img 
            src={blogImageHighFunctioningCocaine} 
            alt="Young adult male in business suit working at a sleek office desk late at night with a cracked coffee mug and scattered documents, representing the facade of high-functioning stimulant addiction"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-muted-foreground text-sm mb-2">February 5, 2026</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            High-Functioning Cocaine Use: Why It Looks Controlled—Until It Isn't
          </h1>
        </header>

        <ArticleAnswerSummary slug="high-functioning-cocaine-use" />

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>
          Cocaine has a reputation problem—and a camouflage advantage. Unlike substances that sedate or visibly impair, cocaine often makes people look energetic, confident, and productive. That's why families miss it. High-functioning cocaine use can look controlled for years—until the cracks widen fast. Understanding the binge-crash cycle, financial secrecy, and mood volatility behind stimulant addiction helps families see what's really happening before things escalate.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Why Cocaine Is So Easy to Miss</h2>

        <p>Cocaine is a stimulant.</p>

        <p>It increases:</p>

        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
          <li>Dopamine</li>
          <li>Energy</li>
          <li>Confidence</li>
          <li>Talkativeness</li>
          <li>Focus (at least temporarily)</li>
        </ul>

        <p>In professional or social settings, that can look like:</p>

        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
          <li>Ambition</li>
          <li>Charisma</li>
          <li>Drive</li>
          <li>Success</li>
        </ul>

        <p>Families often say:<br />
        "They're still working."<br />
        "They're doing well."<br />
        "They're not falling apart."</p>

        <p className="text-foreground font-medium">That's exactly why it's dangerous.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">The Short Half-Life Problem</h2>

        <p>Cocaine has a short half-life.</p>

        <p>The high:</p>

        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
          <li>Peaks quickly</li>
          <li>Fades quickly</li>
          <li>Leaves a crash behind</li>
        </ul>

        <p>This creates a binge pattern:<br />
        Use → spike → crash → repeat.</p>

        <p>The crash often includes:</p>

        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
          <li>Irritability</li>
          <li>Anxiety</li>
          <li>Depression</li>
          <li>Fatigue</li>
          <li>Emotional volatility</li>
        </ul>

        <p>Families often focus on the high.<br />
        They live with the crash.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Why It Feels "Controlled"</h2>

        <p>Cocaine doesn't usually cause daily sedation or visible withdrawal symptoms the way opioids or alcohol can.</p>

        <p>Users often:</p>

        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
          <li>Maintain employment</li>
          <li>Avoid legal trouble (for a while)</li>
          <li>Appear socially engaged</li>
        </ul>

        <p>This creates the illusion of control.</p>

        <p>But high-functioning is not the same as low-risk.</p>

        <p className="text-foreground font-medium">It simply means the external consequences haven't caught up yet.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">The Financial Secrecy Factor</h2>

        <p>Cocaine is expensive.</p>

        <p>High-functioning users often:</p>

        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
          <li>Justify increased spending</li>
          <li>Hide cash withdrawals</li>
          <li>Move money between accounts</li>
          <li>Blame lifestyle inflation</li>
        </ul>

        <p>Families may notice:</p>

        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
          <li>Financial strain</li>
          <li>Inconsistent explanations</li>
          <li>Sudden defensiveness around money</li>
        </ul>

        <p>Because there's no obvious collapse, these signs get rationalized away.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Mood Instability Families Live With</h2>

        <p>One of the biggest indicators families experience isn't productivity—it's mood.</p>

        <p>Stimulant crashes produce:</p>

        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
          <li>Sharp irritability</li>
          <li>Emotional reactivity</li>
          <li>Impatience</li>
          <li>Withdrawal</li>
          <li>Paranoia in heavier use</li>
        </ul>

        <p>Families describe "walking on eggshells."</p>

        <p>They don't connect this volatility to cocaine because:<br />
        "They're not drunk."<br />
        "They're not slurring."<br />
        "They're not nodding off."</p>

        <p className="text-foreground font-medium">But stimulant crash cycles are emotionally destabilizing.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">The Social Camouflage</h2>

        <p>Cocaine use often happens in:</p>

        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
          <li>Professional networking</li>
          <li>Social settings</li>
          <li>"High-performing" environments</li>
          <li>Party culture</li>
        </ul>

        <p>It gets framed as:</p>

        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
          <li>A boost</li>
          <li>A stress reliever</li>
          <li>A productivity hack</li>
          <li>A reward</li>
        </ul>

        <p>Families struggle to challenge this because it's normalized socially.</p>

        <p>When everyone around them seems fine, concern feels dramatic.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">The Illusion of Productivity</h2>

        <p>Cocaine can temporarily increase output.</p>

        <p>But over time:</p>

        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
          <li>Focus fragments</li>
          <li>Sleep declines</li>
          <li>Decision-making deteriorates</li>
          <li>Risk-taking increases</li>
        </ul>

        <p>High-performing individuals may actually be compensating for:</p>

        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
          <li>Increasing fatigue</li>
          <li>Emotional instability</li>
          <li>Dopamine depletion</li>
        </ul>

        <p>From the outside, it still looks like ambition.</p>

        <p className="text-foreground font-medium">Underneath, it's unsustainable.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">When Paranoia Enters the Picture</h2>

        <p>With heavier or prolonged use, paranoia can appear.</p>

        <p>Signs include:</p>

        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
          <li>Suspicion</li>
          <li>Defensiveness</li>
          <li>Hypervigilance</li>
          <li>Accusations without evidence</li>
        </ul>

        <p>Families often mistake this for stress or personality change.</p>

        <p className="text-foreground font-medium">In reality, stimulant-induced paranoia is a neurological effect.</p>

        <p>This stage shortens the runway significantly.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Why High-Functioning Doesn't Last</h2>

        <p>Cocaine tolerance builds.</p>

        <p>As tolerance increases:</p>

        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
          <li>Doses increase</li>
          <li>Frequency increases</li>
          <li>Crashes deepen</li>
          <li>Emotional volatility intensifies</li>
        </ul>

        <p>At some point:</p>

        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
          <li>Work performance slips</li>
          <li>Relationships fracture</li>
          <li>Financial strain surfaces</li>
          <li>Health declines</li>
        </ul>

        <p>The collapse often feels sudden.</p>

        <p className="text-foreground font-medium">It isn't.<br />
        It was building quietly.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Why Families Wait Too Long</h2>

        <p>Because there is no immediate catastrophe, families delay action.</p>

        <p>They think:<br />
        "It's not that bad."<br />
        "They're still managing."<br />
        "This is just stress."</p>

        <p>High-functioning status buys time.</p>

        <p className="text-foreground font-medium">But time in stimulant addiction usually increases intensity, not stability.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">What Families Should Watch For</h2>

        <p>Key warning signs include:</p>

        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
          <li>Repeated all-nighters</li>
          <li>Nosebleeds or sinus issues</li>
          <li>Sharp personality shifts</li>
          <li>Secretive behavior</li>
          <li>Unexplained financial gaps</li>
          <li>Extreme mood swings after social events</li>
        </ul>

        <p className="text-foreground font-medium">Functioning does not eliminate risk.<br />
        It masks it.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">The Role of Early Intervention</h2>

        <p>Intervening with high-functioning stimulant users requires strategy.</p>

        <p>Because there's no obvious collapse, confrontation often leads to:</p>

        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
          <li>Minimization</li>
          <li>Justification</li>
          <li>Counter-accusation</li>
        </ul>

        <p>Professional guidance helps families:</p>

        <ul className="list-disc pl-6 space-y-2 text-foreground/80">
          <li>Align messaging</li>
          <li>Avoid emotional escalation</li>
          <li>Present structured options</li>
          <li>Act before crisis forces the issue</li>
        </ul>

        <p>Early action preserves dignity.<br />
        Late action invites damage control.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">A Party Wreckers Reality Check</h2>

        <p>If success protected people from addiction, cocaine wouldn't have a market.</p>

        <p>High-functioning is not immunity.<br />
        It's a phase.</p>

        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Final Takeaway</h2>

        <p>High-functioning cocaine use looks controlled—until it isn't.</p>

        <p>Families don't miss it because they're naive.<br />
        They miss it because productivity hides instability.</p>

        <p>If you're noticing mood volatility, financial secrecy, and subtle personality shifts, it's worth taking seriously—even if everything "looks fine."</p>

        <p>Early consultation with a qualified interventionist is not dramatic.<br />
        It's preventative.</p>

        <p><strong>Because stimulant addiction rarely collapses slowly.<br />
        It accelerates.</strong></p>
      </div>
        </article>

        {/* Back to Blog Link (bottom) */}
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

export default HighFunctioningCocaineUse;