import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import blogImagePersonalityChanges from "@/assets/blog-addiction-personality-changes.jpg";

const AddictionPersonalityChangesLovedOne = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="When Addiction Hijacks Personality: Why Your Loved One Feels Like a Stranger - Party Wreckers Podcast"
        description="Addiction can radically change behavior and personality. Learn why this happens, what's temporary, what's not, and how families can cope."
        canonical="/blog/addiction-personality-changes-loved-one"
        ogType="article"
        ogImage={blogImagePersonalityChanges}
        keywords="addiction, family support, boundaries, communication, recovery"
        publishedTime="December 18, 2025"
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
            src={blogImagePersonalityChanges} 
            alt="Fragmented mirror reflection symbolizing identity loss and disconnection from addiction"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-muted-foreground text-sm mb-2">December 18, 2025</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            When Addiction Hijacks Personality: Why Your Loved One Feels Like a Stranger
          </h1>
        </header>

        <ArticleAnswerSummary slug="addiction-personality-changes-loved-one" />

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">"This Isn't the Person I Married"</h3>
        
        <p>
          One of the most painful realities families face is not just the substance use itself, but the feeling that the person they love has disappeared. The warmth, reliability, humor, or integrity that once defined them seems replaced by defensiveness, dishonesty, anger, or emotional distance.
        </p>
        
        <p>Families often ask:</p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>Is this who they really are?</li>
          <li>Did addiction change them permanently?</li>
          <li>Will my loved one ever come back?</li>
        </ul>
        
        <p>
          These questions matter because personality changes are often what finally convince families that something is deeply wrong.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">How Addiction Alters Behavior and Personality</h3>
        
        <p>
          Substance use doesn't simply affect judgment in isolated moments. Over time, it changes how the brain processes stress, reward, memory, and emotion. As addiction progresses, survival of the substance becomes prioritized over values, relationships, and long‑term consequences.
        </p>
        
        <p>This shift can look like:</p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>Chronic irritability or mood swings</li>
          <li>Lying that feels automatic or compulsive</li>
          <li>Loss of empathy or accountability</li>
          <li>Increased secrecy and isolation</li>
          <li>Emotional numbness or apathy</li>
          <li>Sudden aggression or defensiveness</li>
        </ul>
        
        <p>
          To families, it feels personal. In reality, addiction often reprograms behavior around the substance, not around love or morality.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Why Promises and Values Seem to Vanish</h3>
        
        <p>
          Families frequently say, "They know better," and that's often true on an intellectual level. But addiction operates in the emotional and survival centers of the brain, not the logical ones.
        </p>
        
        <p>This explains why someone can:</p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>Genuinely mean their promises</li>
          <li>Truly love their family</li>
          <li>Still repeat the same destructive behavior</li>
        </ul>
        
        <p>
          This does not excuse harm, but it helps families understand why arguing facts, pleading emotionally, or reminding them of their values often fails.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Is This Change Permanent?</h3>
        
        <p>
          One of the biggest fears families carry is that the damage is irreversible. The answer is more nuanced.
        </p>
        
        <p>Some changes are substance‑driven and often improve with sustained sobriety, such as:</p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>Emotional volatility</li>
          <li>Impulsivity</li>
          <li>Poor judgment</li>
          <li>Emotional withdrawal</li>
        </ul>
        
        <p>Other traits may pre‑date addiction or be amplified by it, including:</p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>Untreated anxiety or depression</li>
          <li>Trauma responses</li>
          <li>Poor coping skills</li>
          <li>Avoidance patterns</li>
        </ul>
        
        <p>
          Recovery doesn't magically restore someone to who they were at 22 or before their first drink. But many families are surprised by how much warmth, accountability, and emotional availability returns when addiction is no longer running the show.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Why Families Often Take This Personally</h3>
        
        <p>
          When a loved one lies, lashes out, or chooses substances over family, it feels like rejection. Many spouses and parents internalize this as:
        </p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>"I wasn't enough."</li>
          <li>"They don't love me."</li>
          <li>"If I mattered, they'd stop."</li>
        </ul>
        
        <p>
          Addiction thrives on shame, and families often absorb it by proxy. Understanding that addiction distorts behavior—not love—can help families stop blaming themselves.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">What Families Can Do Right Now</h3>
        
        <p>
          You cannot reason someone out of addiction, but you can protect yourself and reduce chaos.
        </p>
        
        <p>Helpful steps include:</p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>Separating the person from the behavior emotionally</li>
          <li>Setting boundaries based on behavior, not intentions</li>
          <li>Avoiding debates about "who they really are"</li>
          <li>Focusing on safety, stability, and reality</li>
          <li>Getting support for yourself, not just them</li>
        </ul>
        
        <p>
          You are allowed to grieve the loss of who they used to be while still hoping for recovery.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">When the Person You Love Feels Gone</h3>
        
        <p>
          Addiction often creates ambiguous loss—the person is physically present but emotionally absent. That grief is real and deserves acknowledgment.
        </p>
        
        <p>
          <strong>Recovery doesn't begin with convincing them who they used to be. It begins when families stop trying to restore the past and start protecting the present.</strong>
        </p>
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

export default AddictionPersonalityChangesLovedOne;