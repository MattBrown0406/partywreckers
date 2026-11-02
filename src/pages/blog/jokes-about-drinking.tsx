import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import blogImageJokesAboutDrinking from "@/assets/blog-jokes-about-drinking.jpg";

const JokesAboutDrinking = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="When the Jokes About Drinking Stop Being Funny - Party Wreckers Podcast"
        description="There's a moment most families can identify in hindsight. The jokes that used to land start feeling uncomfortable. What once felt harmless now..."
        canonical="/blog/jokes-about-drinking"
        ogType="article"
        ogImage={blogImageJokesAboutDrinking}
        keywords="addiction, family support, boundaries, communication, recovery"
        publishedTime="December 24, 2025"
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
            src={blogImageJokesAboutDrinking} 
            alt="Empty wine glass on a table at a family gathering with blurred silhouettes in the background looking uncomfortable"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-muted-foreground text-sm mb-2">December 24, 2025</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            When the Jokes About Drinking Stop Being Funny
          </h1>
        </header>

        <ArticleAnswerSummary slug="jokes-about-drinking" />

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>
          There's a moment most families can identify in hindsight. The jokes that used to land start feeling uncomfortable. The stories get repeated. The laughter feels forced. What once felt harmless now carries a quiet edge of concern.
        </p>
        
        <p>
          Culturally, we joke about substance use constantly. We celebrate excess, laugh off hangovers, and bond over shared chaos. Humor makes it all feel manageable. If it's funny, it can't be that serious.
        </p>
        
        <p>Until it is.</p>
        
        <p>
          Families often say they didn't realize how bad things were because everyone laughed along. The memes, the wine jokes, the stories retold at holidays—all of it created a sense that this was just normal adult behavior. Pointing it out felt like being dramatic or judgmental.
        </p>
        
        <p>
          The shift usually happens subtly. The person is still drinking or using, but they're not really present anymore. Irritability replaces humor. Defensiveness creeps in. The jokes stop landing because they're covering something heavier.
        </p>
        
        <p>
          Functioning becomes the punchline. "At least they still work." "At least they're not like that guy." The problem with functioning is that it delays consequences, and delayed consequences delay change.
        </p>
        
        <p>
          No one wants to be the person who ruins the mood. Families often stay quiet because silence feels kinder than confrontation. But silence doesn't protect relationships. It protects avoidance.
        </p>
        
        <p>
          The Party Wreckers approach isn't about killing humor. Humor can be a bridge. It can disarm. It can open doors. But it can't replace honesty. Laughing through discomfort eventually stops working, and when it does, families are left with a choice.
        </p>
        
        <p>
          You don't have to shame. You don't have to lecture. Sometimes the most powerful move is simply not laughing anymore. Letting the silence sit. Letting the moment be what it is.
        </p>
        
        <p className="text-foreground font-medium">
          Addiction doesn't need to be treated like a joke to be approachable. It needs to be taken seriously before the punchline turns into something no one can laugh at.
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

export default JokesAboutDrinking;