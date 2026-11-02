import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import blogImageAdviceDoesntHelp from "@/assets/blog-advice-doesnt-help.jpg";

const AdviceDoesntHelp = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="What Families Are Told About Addiction That Sounds Good—but Doesn't Actually Help - Party Wreckers Podcast"
        description="After two decades in recovery and intervention work, one thing has become painfully clear: families are surrounded by advice that sounds comforting..."
        canonical="/blog/advice-doesnt-help"
        ogType="article"
        ogImage={blogImageAdviceDoesntHelp}
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
            src={blogImageAdviceDoesntHelp} 
            alt="Family sitting together looking confused surrounded by well-meaning but unhelpful advice"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-muted-foreground text-sm mb-2">December 31, 2025</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            What Families Are Told About Addiction That Sounds Good—but Doesn't Actually Help
          </h1>
        </header>

        <ArticleAnswerSummary slug="advice-doesnt-help" />

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>
          After two decades in recovery and intervention work, one thing has become painfully clear: families are surrounded by advice that sounds comforting but rarely holds up in real life. Some of it comes from pop psychology. Some from social media. Some from well-meaning friends who have never lived inside addiction.
        </p>
        
        <p>Most of it fails families when they need it most.</p>
        
        <p>
          You've heard the phrases. "They have to want it." "You can't help someone who won't help themselves." "Just love them where they're at." These statements aren't always wrong, but they are dangerously incomplete. They offer simplicity in situations that are anything but simple.
        </p>
        
        <p>
          Families cling to these ideas because they reduce anxiety. If someone has to want recovery on their own, then families can step back and wait. If love is the answer, then endurance becomes a virtue. If boundaries are framed as ultimatums, then avoiding them feels compassionate.
        </p>
        
        <p className="text-foreground font-medium">What these narratives ignore is how addiction actually functions in families.</p>
        
        <p>
          Addiction does not develop in a vacuum. It reshapes relationships, roles, and communication. Families respond to instability by adapting. They manage emotions, smooth consequences, and carry responsibilities that aren't theirs. Over time, the family becomes part of the system that keeps addiction stable—not because they want to, but because they're trying to survive.
        </p>
        
        <p>
          Popular advice rarely acknowledges this complexity. It tells families what not to do without explaining what to do instead. It emphasizes detachment without teaching discernment. It praises patience without acknowledging the cost of prolonged uncertainty.
        </p>
        
        <p>
          As someone who has been on both sides of this equation, I've seen how damaging these oversimplifications can be. Families feel ashamed for being exhausted. They blame themselves for not handling things "correctly." They wait far too long to seek support because they believe action would violate some unspoken rule.
        </p>
        
        <p>
          What families actually need is permission to respond to reality. Permission to acknowledge patterns instead of promises. Permission to protect themselves without being labeled controlling or unloving.
        </p>
        
        <p>
          Humor has a place here, because sometimes the advice families receive is so disconnected from lived experience that it borders on absurd. But beneath the humor is a serious point: bad advice keeps families stuck.
        </p>
        
        <p>
          The Party Wreckers exists to challenge these narratives—not with cynicism, but with honesty. Recovery is rarely linear. Motivation is rarely pure. Change often begins when systems shift, not just individuals.
        </p>
        
        <p className="text-foreground font-medium">
          Families deserve more than slogans. They deserve guidance that reflects real life, real messiness, and real hope grounded in action rather than fantasy.
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

export default AdviceDoesntHelp;