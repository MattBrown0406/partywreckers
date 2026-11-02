import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import blogImageAdviceFailsSpectacularly from "@/assets/blog-advice-fails-spectacularly.jpg";

const AdviceFailsSpectacularly = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Why the Advice Families Get About Addiction Sounds Great—and Fails Spectacularly in Real Life - Party Wreckers Podcast"
        description="After years in recovery and working with families, I've noticed something almost comical if it weren't so damaging: the advice families get about..."
        canonical="/blog/advice-fails-spectacularly"
        ogType="article"
        ogImage={blogImageAdviceFailsSpectacularly}
        keywords="addiction, family support, boundaries, communication, recovery"
        publishedTime="January 2, 2026"
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
            src={blogImageAdviceFailsSpectacularly} 
            alt="Frustrated family at kitchen table surrounded by hollow advice speech bubbles"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-muted-foreground text-sm mb-2">January 2, 2026</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Why the Advice Families Get About Addiction Sounds Great—and Fails Spectacularly in Real Life
          </h1>
        </header>

        <ArticleAnswerSummary slug="advice-fails-spectacularly" />

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>
          After years in recovery and working with families, I've noticed something almost comical if it weren't so damaging: the advice families get about addiction is usually delivered with absolute confidence and almost no usefulness.
        </p>
        
        <p>
          It's the kind of advice that works beautifully in theory and collapses immediately in practice.
        </p>
        
        <p className="text-foreground font-medium italic">
          "You can't want it more than they do."<br />
          "They have to hit their own bottom."<br />
          "Just detach with love."
        </p>
        
        <p>
          These phrases sound wise. They feel clean. They give people something simple to say when a situation is painfully complex. Unfortunately, they also leave families stranded without a roadmap.
        </p>
        
        <p>
          Families cling to these ideas because they reduce anxiety. If someone has to want recovery on their own, then waiting becomes the plan. If detachment is the goal, then emotional withdrawal can be framed as healthy. If love is the answer, then endurance becomes the measure of success.
        </p>
        
        <p className="text-foreground font-medium">
          The problem is that addiction doesn't operate on slogans.
        </p>
        
        <p>
          Addiction operates in systems. Families adapt. Roles form. Consequences get redistributed. Over time, everyone adjusts around the addiction, not because they're weak, but because they're trying to survive.
        </p>
        
        <p>
          Bad advice ignores this reality. It tells families what not to do without explaining what to do instead. It praises patience without acknowledging the cost of prolonged uncertainty. It frames boundaries as ultimatums and leaves families terrified of setting them.
        </p>
        
        <p>
          From lived experience, I can tell you that most families aren't trying to control anyone. They're trying to stop the bleeding.
        </p>
        
        <p>
          Humor helps expose how absurd some of this advice really is. Telling a terrified parent to "just detach" without offering structure is like telling someone in a burning house to "stay calm." It's not wrong—it's incomplete.
        </p>
        
        <p>
          The Party Wreckers exists to challenge these narratives with honesty and a little irreverence. Recovery is rarely clean. Motivation is rarely pure. Change often begins not with insight, but with pressure and support applied thoughtfully.
        </p>
        
        <p className="text-foreground font-medium">
          Families deserve better than catchphrases. They deserve guidance grounded in reality, compassion, and lived experience—not just things that sound good on social media.
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

export default AdviceFailsSpectacularly;