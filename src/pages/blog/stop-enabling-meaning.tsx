import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import blogImageStopEnablingMeaning from "@/assets/blog-stop-enabling-meaning.jpg";

const StopEnablingMeaning = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Why Families Are Told to &quot;Stop Enabling&quot; Without Being Told What That Actually Means - Party Wreckers Podcast"
        description="If families were paid for every time they were told to 'stop enabling,' most of them wouldn't need financial support anymore. It's one of the most..."
        canonical="/blog/stop-enabling-meaning"
        ogType="article"
        ogImage={blogImageStopEnablingMeaning}
        keywords="addiction, family support, boundaries, communication, recovery"
        publishedTime="January 8, 2026"
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
            src={blogImageStopEnablingMeaning} 
            alt="Family standing at crossroads with confusing road signs pointing in different directions showing vague advice phrases"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-muted-foreground text-sm mb-2">January 8, 2026</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Why Families Are Told to "Stop Enabling" Without Being Told What That Actually Means
          </h1>
        </header>

        <ArticleAnswerSummary slug="stop-enabling-meaning" />

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>
          If families were paid for every time they were told to "stop enabling," most of them wouldn't need financial support anymore. It's one of the most overused phrases in the addiction world—and one of the least explained.
        </p>
        
        <p className="text-foreground font-medium">
          From lived experience, I can tell you that most families aren't enabling because they're naïve or weak. They're enabling because things feel unstable and they're trying to prevent disaster. Bills need to be paid. Emotions need to be managed. Someone has to keep the wheels on the bus.
        </p>
        
        <p>
          So when someone casually says, "You just need to stop enabling," families are left wondering which part they're supposed to drop. The rent? The groceries? The emotional support? The relationship?
        </p>
        
        <p>
          Without clarity, "stop enabling" turns into emotional withdrawal or guilt-fueled paralysis—neither of which helps anyone.
        </p>
        
        <p className="text-foreground font-medium">
          Enabling isn't about helping too much. It's about consistently removing consequences that belong to someone else. The problem is that families rarely recognize this while they're in it. They're responding to emergencies, not patterns.
        </p>
        
        <p>
          Humor helps here, because some of the advice families get sounds like it was written for people who have never actually lived with addiction. Real life doesn't pause while families figure things out.
        </p>
        
        <p className="text-foreground font-medium italic">
          Healthy change isn't about flipping a switch. It's about learning how to help without managing, care without controlling, and step back without disappearing.
        </p>
        
        <p>
          The Party Wreckers exists to translate theory into reality. We talk about addiction the way families actually experience it—messy, exhausting, and confusing. And yes, sometimes you have to laugh at yourself just to stay sane.
        </p>
        
        <p>
          If you've ever thought, "If I stop doing this, everything will fall apart," you're not alone. That fear is common—and often exaggerated by years of instability.
        </p>
        
        <p className="text-foreground font-medium italic">
          This is The Party Wreckers. We don't wreck parties—we wreck bad advice that leaves families confused and stuck.
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

export default StopEnablingMeaning;