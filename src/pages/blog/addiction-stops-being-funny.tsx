import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import blogImageAddictionStopsBeingFunny from "@/assets/blog-addiction-stops-being-funny.jpg";

const AddictionStopsBeingFunny = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="When Addiction Stops Being Funny and Starts Being Familiar - Party Wreckers Podcast"
        description="We live in a culture that jokes about substance use constantly. Drinking memes. Stories about wild weekends. Humor makes excess feel normal, even..."
        canonical="/blog/addiction-stops-being-funny"
        ogType="article"
        ogImage={blogImageAddictionStopsBeingFunny}
        keywords="addiction, family support, boundaries, communication, recovery"
        publishedTime="December 27, 2025"
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
            src={blogImageAddictionStopsBeingFunny} 
            alt="People at a social gathering laughing while one person appears disconnected and distant"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-muted-foreground text-sm mb-2">December 27, 2025</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            When Addiction Stops Being Funny and Starts Being Familiar
          </h1>
        </header>

        <ArticleAnswerSummary slug="addiction-stops-being-funny" />

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>
          We live in a culture that jokes about substance use constantly. Drinking memes. Stories about wild weekends. Casual references to needing something to "take the edge off." Humor makes excess feel normal, even charming.
        </p>
        
        <p>Families often laugh along longer than they should.</p>
        
        <p>
          At first, the jokes land. The stories are entertaining. The behavior feels social, relatable, harmless. Over time, something shifts. The laughter feels thinner. The stories repeat. The charm fades. What once felt funny starts feeling familiar in a way that's uncomfortable.
        </p>
        
        <p>
          Addiction hides well behind humor. If everyone's laughing, no one has to ask hard questions. If it's "just how we unwind," no one has to look too closely at what's being avoided.
        </p>
        
        <p>
          Functioning becomes the punchline. "At least they still work." "At least they're not like that guy." As long as responsibilities are met, concerns feel unreasonable. Families worry about being the buzzkill, the overreactor, the one who ruins the mood.
        </p>
        
        <p>
          The shift usually happens quietly. The person is still there, but not really present. Irritability replaces warmth. Defensiveness creeps in. Emotional availability disappears behind sarcasm or silence. The jokes stop connecting people and start deflecting them.
        </p>
        
        <p>
          The Party Wreckers exists in this uncomfortable middle space—where humor still has value, but honesty matters more. Addiction doesn't need to be treated like a joke to be approachable. It needs to be talked about before the laughter turns into regret.
        </p>
        
        <p>
          Sometimes the most powerful change families make isn't confrontation. It's stopping the performance. Letting silence sit where a joke used to be. Refusing to normalize what no longer feels okay.
        </p>
        
        <p className="text-foreground font-medium">
          When addiction stops being funny, it's often already been serious for a long time.
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

export default AddictionStopsBeingFunny;