import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import blogImageEnablingFearHousehold from "@/assets/blog-enabling-fear-household.jpg";

const EnablingFearHousehold = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Enabling Isn't Weakness — It's What Happens When Fear Runs the Household - Party Wreckers Podcast"
        description="Families often recoil from the word 'enabling.' It sounds accusatory, as if they are intentionally supporting destructive behavior. In reality,..."
        canonical="/blog/enabling-fear-household"
        ogType="article"
        ogImage={blogImageEnablingFearHousehold}
        keywords="addiction, family support, boundaries, communication, recovery"
        publishedTime="January 3, 2026"
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
            src={blogImageEnablingFearHousehold} 
            alt="Family in living room walking on eggshells with storm clouds visible through window"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-muted-foreground text-sm mb-2">January 3, 2026</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Enabling Isn't Weakness — It's What Happens When Fear Runs the Household
          </h1>
        </header>

        <ArticleAnswerSummary slug="enabling-fear-household" />

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>
          Families often recoil from the word "enabling." It sounds accusatory, as if they are intentionally supporting destructive behavior. In reality, enabling is rarely a conscious choice. It is what happens when fear becomes the organizing principle of the household.
        </p>
        
        <p className="text-foreground font-medium italic">
          Fear of conflict. Fear of consequences. Fear of losing connection. Fear of what might happen if help is withdrawn.
        </p>
        
        <p>
          When fear drives decisions, families prioritize short‑term relief over long‑term health. They pay bills to avoid eviction. They lie to employers to avoid embarrassment. They absorb emotional fallout to prevent escalation. Each action makes sense in isolation.
        </p>
        
        <p>
          Over time, however, these actions form a pattern. Responsibility shifts away from the addicted person and onto the family. The system becomes unbalanced, and everyone feels it.
        </p>
        
        <p>
          Enabling is often fueled by hope. Families believe that if they just hold things together long enough, change will occur naturally. Unfortunately, addiction is not passive. It adapts to whatever environment allows it to continue.
        </p>
        
        <p>
          This does not mean families should become punitive or detached overnight. Abrupt changes without support can increase chaos. Healthy disengagement is structured, intentional, and grounded in clarity rather than anger.
        </p>
        
        <p className="text-foreground font-medium">
          One of the hardest realizations for families is that preventing consequences can prolong suffering. Consequences are not punishments; they are feedback. When consequences are consistently buffered, addiction has no reason to change course.
        </p>
        
        <p>
          Addressing enabling requires compassion for the family, not condemnation. Fear is understandable. Letting go is difficult. Support helps families tolerate discomfort without rushing to fix it.
        </p>
        
        <p>
          Reducing enabling does not mean loving less. It means trusting that adults are capable of facing the results of their choices—and that families are allowed to reclaim their own lives.
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

export default EnablingFearHousehold;