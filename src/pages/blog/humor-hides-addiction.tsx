import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import blogImageHumorHidesAddiction from "@/assets/blog-humor-hides-addiction.jpg";

const HumorHidesAddiction = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="How Addiction Hides Behind Humor Until Nobody's Laughing Anymore - Party Wreckers Podcast"
        description="We joke about substance use constantly. It's part of our culture. Wine memes. Party stories. Laughter makes excess feel harmless, even relatable...."
        canonical="/blog/humor-hides-addiction"
        ogType="article"
        ogImage={blogImageHumorHidesAddiction}
        keywords="addiction, family support, boundaries, communication, recovery"
        publishedTime="December 25, 2025"
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
            src={blogImageHumorHidesAddiction} 
            alt="Person at a party with a forced smile holding a drink, emotionally distant despite being surrounded by people"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-muted-foreground text-sm mb-2">December 25, 2025</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            How Addiction Hides Behind Humor Until Nobody's Laughing Anymore
          </h1>
        </header>

        <ArticleAnswerSummary slug="humor-hides-addiction" />

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>
          We joke about substance use constantly. It's part of our culture. Wine memes. Party stories. Self-deprecating humor about hangovers and bad decisions. Laughter makes excess feel harmless, even relatable.
        </p>
        
        <p>Until it doesn't.</p>
        
        <p>
          Most families can point to a moment when the jokes stopped being funny. Not because the behavior suddenly changed, but because the emotional cost became impossible to ignore. The laughter felt forced. The stories got repetitive. The charm wore thin.
        </p>
        
        <p>
          Humor is a powerful shield. It keeps difficult conversations at bay. If everyone's laughing, nobody has to ask hard questions. If it's "just how we unwind," nobody has to look too closely at what's being avoided.
        </p>
        
        <p>The problem is that addiction doesn't need secrecy to grow. It just needs normalization.</p>
        
        <p>
          Families often say they didn't realize how serious things were because nothing ever looked serious. Their loved one was still functioning. Still showing up. Still cracking jokes. Functioning becomes the punchline, and that punchline delays accountability.
        </p>
        
        <p>
          The Party Wreckers approach isn't about shaming humor or taking life too seriously. Humor can be a bridge. It can open conversations that would otherwise feel unbearable. But humor becomes dangerous when it replaces honesty.
        </p>
        
        <p>
          There's a subtle shift families feel first. The person is there, but not really there. Irritability replaces warmth. Defensiveness creeps in. Emotional availability disappears behind sarcasm or silence. The jokes start feeling like distractions rather than connection.
        </p>
        
        <p>
          Nobody wants to be the one who ruins the mood. Calling attention to the problem feels like being dramatic or judgmental. So families laugh along, even as anxiety builds.
        </p>
        
        <p>
          Addiction thrives in this space. Not because families don't care, but because care is being expressed in ways that avoid discomfort rather than address it.
        </p>
        
        <p>
          The moment families stop laughing isn't a betrayal. It's an act of honesty. It doesn't require confrontation or ultimatums. Sometimes it's as simple as letting silence sit where a joke used to be.
        </p>
        
        <p className="text-foreground font-medium">
          Addiction doesn't need to be treated like a joke to be approachable. It needs to be taken seriously before the laughter turns into regret.
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

export default HumorHidesAddiction;