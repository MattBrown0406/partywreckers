import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import blogImageSupportingVsCarrying from "@/assets/blog-supporting-vs-carrying.jpg";

const SupportingVsCarrying = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="The Difference Between Supporting Recovery and Carrying the Consequences - Party Wreckers Podcast"
        description="Families often believe they must absorb consequences to protect their loved one. They fear that letting consequences happen is cruel, unsafe, or..."
        canonical="/blog/supporting-vs-carrying"
        ogType="article"
        ogImage={blogImageSupportingVsCarrying}
        keywords="addiction, family support, boundaries, communication, recovery"
        publishedTime="December 31, 2025"
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
            src={blogImageSupportingVsCarrying} 
            alt="Two hands - one weighed down by chains, the other extended in support"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-muted-foreground text-sm mb-2">December 31, 2025</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            The Difference Between Supporting Recovery and Carrying the Consequences
          </h1>
        </header>

        <ArticleAnswerSummary slug="supporting-vs-carrying" />

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>
          Families often believe they must absorb consequences to protect their loved one. They fear that letting consequences happen is cruel, unsafe, or irresponsible. As a result, they step in—again and again—to manage outcomes.
        </p>
        
        <p>
          This pattern is rarely intentional. It begins with compassion. A mistake happens, and the family helps. Then it happens again. Slowly, helping becomes expected.
        </p>
        
        <p>
          Over time, family members take on responsibilities that aren't theirs. They pay bills, make excuses, smooth over conflicts, and fix problems. The addicted person is shielded from the full impact of their choices, while the family carries increasing stress.
        </p>
        
        <p>
          This imbalance creates resentment and burnout. Family members feel trapped between guilt and anger. They want relief but fear what will happen if they step back.
        </p>
        
        <p className="text-foreground font-medium">
          Allowing consequences does not mean withdrawing love. It means allowing reality to function as it naturally would. Consequences are not punishments—they are information.
        </p>
        
        <p>
          When families stop absorbing consequences, several things often happen. The addicted person gains clearer feedback about their behavior. The family regains energy and perspective. The system begins to rebalance.
        </p>
        
        <p>
          This shift is uncomfortable. Anxiety often spikes before it settles. But discomfort is not the same as danger.
        </p>
        
        <p className="text-foreground font-medium">
          Supporting recovery means encouraging responsibility, not preventing discomfort. Families are allowed to step out of roles that are harming them.
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

export default SupportingVsCarrying;