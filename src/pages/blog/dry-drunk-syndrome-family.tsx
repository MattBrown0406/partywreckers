import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import blogImageDryDrunk from "@/assets/blog-dry-drunk-syndrome.jpg";

const DryDrunkSyndromeFamily = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Why Sobriety Alone Isn't Enough: Understanding &quot;Dry Drunk&quot; Behavior in Early Recovery - Party Wreckers Podcast"
        description="Sobriety doesn't automatically heal addiction behaviors. Learn what 'dry drunk' behavior looks like, why it happens, and how families can respond."
        canonical="/blog/dry-drunk-syndrome-family"
        ogType="article"
        ogImage={blogImageDryDrunk}
        keywords="addiction, family support, boundaries, communication, recovery"
        publishedTime="December 19, 2025"
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
            src={blogImageDryDrunk} 
            alt="Empty glass symbolizing sobriety without inner healing and the gap between stopping substances and true recovery"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-muted-foreground text-sm mb-2">December 19, 2025</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Why Sobriety Alone Isn't Enough: Understanding "Dry Drunk" Behavior in Early Recovery
          </h1>
        </header>

        <ArticleAnswerSummary slug="dry-drunk-syndrome-family" />

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">"They're Sober, But Nothing Feels Better"</h3>
        
        <p>
          Families often reach a breaking point, then finally get what they've prayed for: their loved one stops drinking or using. But instead of relief, they feel confused and disappointed. The chaos hasn't disappeared—it's just changed shape.
        </p>
        
        <p>Your loved one may be sober, yet still:</p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>Angry, resentful, or emotionally volatile</li>
          <li>Blaming everyone else</li>
          <li>Rigid, controlling, or defensive</li>
          <li>Unwilling to take responsibility</li>
          <li>Distant or emotionally unavailable</li>
        </ul>
        
        <p>
          This experience is often referred to as "dry drunk" behavior—a non‑clinical term families use to describe someone who has stopped using substances but hasn't yet changed the underlying thinking, coping patterns, or emotional responses that fueled addiction.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Sobriety vs. Recovery: The Critical Difference</h3>
        
        <p>
          <strong>Sobriety</strong> is the absence of substances.<br/>
          <strong>Recovery</strong> is the rebuilding of a healthy internal and external life.
        </p>
        
        <p>When someone stops drinking or using without addressing:</p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>Emotional regulation</li>
          <li>Stress tolerance</li>
          <li>Accountability</li>
          <li>Relationship skills</li>
          <li>Shame and resentment</li>
        </ul>
        
        <p>
          …the addiction often remains active internally, even if substances are gone.
        </p>
        
        <p>
          Families feel this disconnect acutely because they expected sobriety to bring peace.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Why Dry Drunk Behavior Happens</h3>
        
        <p>Several factors contribute to this phase:</p>
        
        <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">1. Loss of the primary coping tool</h4>
        <p>
          Substances were often used to manage anxiety, anger, trauma, or inadequacy. Without them, emotions can feel raw and overwhelming.
        </p>
        
        <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">2. Unrealistic expectations</h4>
        <p>
          Some people believe stopping substance use should immediately earn trust, forgiveness, or relief from consequences.
        </p>
        
        <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">3. Avoidance of deeper work</h4>
        <p>
          Without honest self‑reflection, therapy, or structured growth, behavior patterns remain unchanged.
        </p>
        
        <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">4. Family dynamics haven't reset</h4>
        <p>
          Families may still be hypervigilant, resentful, or emotionally exhausted, which can fuel tension.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Why Families Take This Personally</h3>
        
        <p>Many family members think:</p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>"If they were really serious, they'd be kinder."</li>
          <li>"They're sober, so why are they still so difficult?"</li>
          <li>"Maybe this is just who they are."</li>
        </ul>
        
        <p>
          This creates resentment and fear that recovery "isn't working." In reality, early recovery is often emotionally destabilizing before it becomes stabilizing.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">What Helps—and What Doesn't</h3>
        
        <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">What doesn't help:</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Lecturing about gratitude</li>
          <li>Comparing them to others in recovery</li>
          <li>Rushing forgiveness</li>
          <li>Pretending everything is fine</li>
          <li>Re‑trusting without consistency</li>
        </ul>
        
        <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">What helps:</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Clear behavioral boundaries</li>
          <li>Allowing time for emotional adjustment</li>
          <li>Encouraging accountability and growth</li>
          <li>Seeking family support for yourself</li>
          <li>Letting actions—not time sober—rebuild trust</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">A Message Families Need to Hear</h3>
        
        <p>
          Dry drunk behavior doesn't mean sobriety has failed. It means sobriety is incomplete.
        </p>
        
        <p>
          Recovery is not just stopping a substance—it's learning how to live without escaping yourself. That process is uncomfortable, uneven, and slow.
        </p>
        
        <p>
          <strong>You are allowed to acknowledge progress and still require respectful behavior.</strong>
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

export default DryDrunkSyndromeFamily;