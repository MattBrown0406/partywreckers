import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import blogImageWineOclock from "@/assets/blog-wine-oclock-humor.jpg";

const WineOclockHumorAddiction = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="&quot;It's Just Wine O'Clock&quot;…Until It's Not: How We Joke About Addiction Right Up Until We Can't - Party Wreckers Podcast"
        description="Addiction has a strange relationship with humor. We laugh about it, normalize it, and minimize it right up until someone crosses an invisible..."
        canonical="/blog/wine-oclock-humor-addiction"
        ogType="article"
        ogImage={blogImageWineOclock}
        keywords="addiction, family support, boundaries, communication, recovery"
        publishedTime="December 22, 2025"
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
            src={blogImageWineOclock} 
            alt="Wine glass with comedy and tragedy theater masks symbolizing how humor masks addiction problems"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-muted-foreground text-sm mb-2">December 22, 2025</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            "It's Just Wine O'Clock"…Until It's Not: How We Joke About Addiction Right Up Until We Can't
          </h1>
        </header>

        <ArticleAnswerSummary slug="wine-oclock-humor-addiction" />

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>
          If you've spent any time on social media, you've seen it. Memes about "mommy juice." Jokes about needing a drink to survive parenting. Viral videos celebrating blackout weekends as badges of honor. It's all funny—until it's not.
        </p>
        
        <p>
          Addiction has a strange relationship with humor. We laugh about it, normalize it, and minimize it right up until someone crosses an invisible line—and suddenly it's deadly serious.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">How Humor Hides Real Problems</h3>
        
        <p>Humor can be a coping mechanism. It can also be camouflage.</p>
        
        <p>Many families say:</p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>"We always joked about their drinking."</li>
          <li>"Everyone laughed it off."</li>
          <li>"It was never serious…until it was."</li>
        </ul>
        
        <p>
          When substance use is wrapped in humor, it becomes harder to question. Jokes create permission. Permission delays intervention.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">When "Functioning" Becomes the Punchline</h3>
        
        <p>
          One of the most dangerous jokes in addiction culture is the idea of the "functional mess." The person who drinks too much but still works. Who uses but still shows up. Who's a disaster—but a lovable one.
        </p>
        
        <p>Until they're not lovable anymore.</p>
        
        <p>
          Functioning is not a diagnosis. It's a phase—and often a temporary one.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Families Laugh Because They're Uncomfortable</h3>
        
        <p>
          Families often laugh along because calling attention to the issue feels awkward, dramatic, or judgmental. Humor becomes a way to avoid being "that person."
        </p>
        
        <p>But addiction doesn't care about social comfort.</p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">When the Tone Has to Change</h3>
        
        <p>There's often a moment when the jokes stop landing:</p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>The hangovers get worse</li>
          <li>The stories stop being funny</li>
          <li>The behavior starts scaring people</li>
          <li>The laughter feels forced</li>
        </ul>
        
        <p>
          That moment matters. It's often the first intuitive signal that things have crossed into dangerous territory.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Using Humor Without Avoidance</h3>
        
        <p>
          The Party Wreckers approach isn't about killing humor—it's about using it honestly. Humor can open conversations. It can disarm defensiveness. But it can't replace truth.
        </p>
        
        <p>
          Laughing with awareness is different than laughing to avoid awareness.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">The Real Punchline</h3>
        
        <p>
          Addiction doesn't need to be treated like a joke to be approachable—but it does need to be taken seriously before the punchline becomes tragedy.
        </p>
        
        <p>
          If the laughter in your family feels thinner than it used to, that's worth paying attention to.
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

export default WineOclockHumorAddiction;