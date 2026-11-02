import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import blogImageEnablingSurvival from "@/assets/blog-enabling-survival.jpg";

const EnablingSurvival = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Enabling Isn't About Weakness—It's About Survival - Party Wreckers Podcast"
        description="Many families recoil at the word 'enabling.' It sounds accusatory, as if someone is choosing to make addiction worse. In reality, enabling behaviors..."
        canonical="/blog/enabling-survival"
        ogType="article"
        ogImage={blogImageEnablingSurvival}
        keywords="addiction, family support, boundaries, communication, recovery"
        publishedTime="December 28, 2025"
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
            src={blogImageEnablingSurvival} 
            alt="Family silhouettes stepping from shadows into warm light, symbolizing liberation from enabling patterns"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-muted-foreground text-sm mb-2">December 28, 2025</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Enabling Isn't About Weakness—It's About Survival
          </h1>
        </header>

        <ArticleAnswerSummary slug="enabling-survival" />

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>
          Many families recoil at the word "enabling." It sounds accusatory, as if someone is choosing to make addiction worse. In reality, enabling behaviors usually emerge as survival strategies, not conscious decisions.
        </p>
        
        <p>
          Families step in because chaos feels unbearable. They cover mistakes because consequences feel too harsh. They smooth things over because conflict feels dangerous. Each action makes sense in isolation.
        </p>
        
        <p>
          Over time, however, these survival strategies harden into roles. Family members become managers, mediators, financiers, and protectors. Their own needs slowly disappear beneath the constant effort to keep things from unraveling.
        </p>
        
        <p>
          Enabling persists because it works in the short term. It reduces immediate tension. It prevents blowups. It keeps life moving forward. The long‑term cost, however, is immense.
        </p>
        
        <p>
          The addicted person loses opportunities to experience responsibility and consequence. The family becomes exhausted, resentful, and disconnected from their own lives. Everyone adapts to a system that revolves around addiction.
        </p>
        
        <p>
          Breaking enabling patterns is frightening because it feels like stepping into uncertainty. Families worry that things will fall apart if they stop intervening. They fear being blamed if outcomes worsen.
        </p>
        
        <p>
          What often surprises families is that reducing enabling doesn't necessarily create chaos—it creates clarity. Problems that were previously hidden become visible. Responsibility shifts back where it belongs. Family members regain emotional space.
        </p>
        
        <p>
          Stopping enabling is not an act of punishment. It is an act of honesty. It allows families to stop sacrificing themselves in an attempt to manage something they cannot control.
        </p>
        
        <p className="text-foreground font-medium">
          Families are allowed to step out of roles they never agreed to take on. Supporting someone does not require losing yourself in the process.
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

export default EnablingSurvival;