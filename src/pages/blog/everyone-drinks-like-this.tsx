import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import blogImageEveryoneDrinks from "@/assets/blog-everyone-drinks-like-this.jpg";

const EveryoneDrinksLikeThis = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="When &quot;Everyone Drinks Like This&quot; Stops Being Funny - Party Wreckers Podcast"
        description="There's a moment in a lot of families where the jokes stop landing. What used to be funny—stories, memes, eye-rolling—starts feeling uncomfortable...."
        canonical="/blog/everyone-drinks-like-this"
        ogType="article"
        ogImage={blogImageEveryoneDrinks}
        keywords="addiction, family support, boundaries, communication, recovery"
        publishedTime="December 23, 2025"
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
            src={blogImageEveryoneDrinks} 
            alt="Vintage microphone with deflated party balloon on dimly lit stage symbolizing how humor fades when addiction becomes serious"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-muted-foreground text-sm mb-2">December 23, 2025</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            When "Everyone Drinks Like This" Stops Being Funny
          </h1>
        </header>

        <ArticleAnswerSummary slug="everyone-drinks-like-this" />

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>
          There's a moment in a lot of families where the jokes stop landing. What used to be funny—stories, memes, eye-rolling—starts feeling uncomfortable. The laughter gets forced. The hangovers get heavier. The stories stop being harmless.
        </p>
        
        <p>
          Addiction doesn't start with drama. It starts with normalization.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">How Humor Becomes Cover</h3>
        
        <p>Culturally, we joke about substance use constantly:</p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>"Wine o'clock"</li>
          <li>"I earned this"</li>
          <li>"That's just how we blow off steam"</li>
        </ul>
        
        <p>
          Humor makes behavior untouchable. If it's funny, it's not serious—right?
        </p>
        
        <p>Until it is.</p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">The Shift Families Feel First</h3>
        
        <p>Families often sense the shift before anyone else:</p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>The person isn't present anymore</li>
          <li>Conversations repeat</li>
          <li>Irritability replaces humor</li>
          <li>Defensiveness shows up</li>
          <li>"Jokes" feel sharp instead of light</li>
        </ul>
        
        <p>
          The problem isn't the joke. It's what the joke is hiding.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">When Functioning Becomes the Excuse</h3>
        
        <p>
          We love a "hot mess who still shows up." The problem is that functioning masks deterioration.
        </p>
        
        <p>
          Functioning delays consequences. Delayed consequences delay change.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Why Calling It Out Feels Risky</h3>
        
        <p>Nobody wants to be the buzzkill. Families fear:</p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>Being dramatic</li>
          <li>Losing connection</li>
          <li>Being labeled controlling</li>
        </ul>
        
        <p>
          So they laugh along—while anxiety grows.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">The Real Party Wrecker</h3>
        
        <p>
          Addiction isn't the party wrecker. Silence is.
        </p>
        
        <p>
          The moment families stop pretending it's funny is often the moment things start to shift.
        </p>
        
        <p>
          You don't need to shame. You don't need to lecture. You just need to stop laughing when it's not funny anymore.
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

export default EveryoneDrinksLikeThis;