import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { ArrowLeft } from "lucide-react";
import blogImageNegotiatingWithAddiction from "@/assets/blog-negotiating-with-addiction.jpg";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";

const NegotiatingWithAddiction = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Why Families Start Negotiating With Addiction (and Lose Every Time) - Party Wreckers Podcast"
        description="At some point, almost every family starts negotiating with addiction. Not formally, of course — it's more subtle than that. Negotiation feels..."
        canonical="/blog/negotiating-with-addiction"
        ogType="article"
        ogImage={blogImageNegotiatingWithAddiction}
        keywords="addiction, family support, boundaries, communication, recovery"
        publishedTime="January 11, 2026"
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
            src={blogImageNegotiatingWithAddiction} 
            alt="Family at negotiation table across from shadowy addiction figure with chess pieces and scattered papers"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-muted-foreground text-sm mb-2">January 11, 2026</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Why Families Start Negotiating With Addiction (and Lose Every Time)
          </h1>
        </header>

        <ArticleAnswerSummary slug="negotiating-with-addiction" />

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>
          At some point, almost every family starts negotiating with addiction. Not formally, of course — it's more subtle than that.
        </p>
        
        <p className="text-foreground font-medium italic">
          "If you just cut back."<br />
          "If you promise this is the last time."<br />
          "If we can just get through this week."
        </p>
        
        <p>
          Negotiation feels reasonable. It sounds collaborative. It gives everyone hope that compromise will lead to stability. The problem is that addiction does not negotiate in good faith.
        </p>
        
        <p className="text-foreground font-medium">
          Families don't start negotiating because they're naïve. They do it because the alternative feels harsh. Negotiation feels like love with boundaries. In reality, it's often fear dressed up as flexibility.
        </p>
        
        <p>
          From lived experience, I can tell you that addiction loves negotiations. Every concession becomes precedent. Every exception becomes expectation. The rules change constantly — always in addiction's favor.
        </p>
        
        <p>
          Negotiation also keeps families emotionally invested in outcomes they cannot control. They replay conversations, track compliance, and reset expectations after each disappointment. Exhaustion becomes the norm.
        </p>
        
        <p className="text-foreground font-medium italic">
          Humor helps here, because if families didn't laugh about these negotiations, they'd cry. People joke about being lawyers, diplomats, or hostage negotiators in their own homes. The joke lands because it's painfully accurate.
        </p>
        
        <p>
          What families eventually discover is that clarity works better than compromise. Clear expectations. Clear boundaries. Clear responses. Not emotional bargaining.
        </p>
        
        <p className="text-foreground font-medium">
          The Party Wreckers exists to call out the patterns that sound reasonable but keep families stuck. Negotiation is one of the biggest.
        </p>
        
        <p>
          If you've been negotiating and nothing has changed, it's not because you did it wrong. It's because negotiation was never the solution.
        </p>
        
        <p className="text-foreground font-medium italic">
          This is The Party Wreckers. We don't wreck parties — we wreck the deals addiction tricks families into making.
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

export default NegotiatingWithAddiction;