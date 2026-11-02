import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import blogImageFamilyRoles from "@/assets/blog-family-roles.jpg";

const FamilyRoles = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="How Substance Use Changes Family Roles Without Anyone Noticing - Party Wreckers Podcast"
        description="Addiction doesn't just affect the person using substances—it reorganizes the entire family system. This reorganization happens quietly, often without..."
        canonical="/blog/family-roles"
        ogType="article"
        ogImage={blogImageFamilyRoles}
        keywords="addiction, family support, boundaries, communication, recovery"
        publishedTime="January 1, 2026"
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
            src={blogImageFamilyRoles} 
            alt="Family members wearing symbolic masks representing their assigned roles"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-muted-foreground text-sm mb-2">January 1, 2026</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            How Substance Use Changes Family Roles Without Anyone Noticing
          </h1>
        </header>

        <ArticleAnswerSummary slug="family-roles" />

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>
          Addiction doesn't just affect the person using substances—it reorganizes the entire family system. This reorganization happens quietly, often without conscious agreement. Over time, family members slip into roles that feel necessary but become constricting.
        </p>
        
        <p>
          One person becomes the fixer, constantly solving problems before they escalate. Another becomes the peacekeeper, smoothing over conflict and minimizing tension. Someone else may become the truth‑teller, voicing concerns others avoid. Children often become emotionally responsible far beyond their years.
        </p>
        
        <p>
          These roles emerge as coping strategies. They help families function in unpredictable environments. The problem is that roles solidify, even when they are no longer helpful.
        </p>
        
        <p>
          Once roles are established, family members stop relating naturally. Interactions become scripted. Expectations are rigid. Change feels destabilizing, even when the system is unhealthy.
        </p>
        
        <p className="text-foreground font-medium">
          The fixer feels indispensable but exhausted. The peacekeeper feels responsible for everyone's emotions. The truth‑teller feels isolated and blamed. Children feel pressure to perform rather than simply exist.
        </p>
        
        <p>
          Addiction benefits from rigid roles because they keep the system predictable. As long as everyone plays their part, the family continues functioning—albeit painfully.
        </p>
        
        <p>
          Breaking out of roles often triggers anxiety. When one person changes, others feel unsettled. This discomfort can be mistaken for harm, leading families to revert to familiar patterns.
        </p>
        
        <p className="text-foreground font-medium">
          Awareness is the first step toward change. When families recognize how roles have shaped their interactions, they can begin to loosen them intentionally.
        </p>
        
        <p>
          Letting go of a role does not mean abandoning the family. It means reclaiming flexibility, authenticity, and balance. Families heal when people are allowed to be more than their assigned function.
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

export default FamilyRoles;