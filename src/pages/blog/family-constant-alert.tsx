import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import blogImageFamilyConstantAlert from "@/assets/blog-family-constant-alert.jpg";

const FamilyConstantAlert = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="When Addiction Turns Family Life Into a Constant State of Alert - Party Wreckers Podcast"
        description="Families living with addiction often describe their lives using the same language reserved for emergencies. They are always watching, always..."
        canonical="/blog/family-constant-alert"
        ogType="article"
        ogImage={blogImageFamilyConstantAlert}
        keywords="addiction, family support, boundaries, communication, recovery"
        publishedTime="December 26, 2025"
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
            src={blogImageFamilyConstantAlert} 
            alt="Family sitting together in a living room looking tense and on edge despite ordinary domestic setting"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-muted-foreground text-sm mb-2">December 26, 2025</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            When Addiction Turns Family Life Into a Constant State of Alert
          </h1>
        </header>

        <ArticleAnswerSummary slug="family-constant-alert" />

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>
          Families living with addiction often describe their lives using the same language reserved for emergencies. They are always watching, always listening, always waiting for the next disruption. Even during calm periods, tension lingers just beneath the surface, ready to spike without warning. This constant state of alertness becomes so familiar that many families no longer recognize it as stress.
        </p>
        
        <p>
          At first, the vigilance feels justified. A loved one has been unpredictable. There have been broken promises, emotional outbursts, or frightening close calls. Staying alert feels like protection. It feels responsible. Over time, however, this hyper-awareness begins to reshape family life in ways that are difficult to reverse.
        </p>
        
        <p>
          Conversations become cautious. Tone is carefully managed. Certain topics are avoided altogether. Family members learn to scan moods before speaking, adjusting their behavior to prevent conflict. What starts as adaptation slowly becomes self-erasure.
        </p>
        
        <p>
          Children raised in these environments often become emotionally attuned beyond their years. They learn to anticipate reactions and manage tension, sometimes at the cost of their own needs. Adults, too, may lose touch with what they feel, focusing instead on keeping the environment stable.
        </p>
        
        <p>
          This constant alertness is not a personality trait. It is a response to chronic uncertainty. Addiction creates instability not only through substance use, but through emotional inconsistency. Families never quite know which version of their loved one they will encounter, and the body responds accordingly.
        </p>
        
        <p>
          Living this way takes a toll. Anxiety becomes normalized. Sleep is disrupted. Joy feels risky, as if relaxing might invite disaster. Families may pride themselves on being resilient, but resilience built on constant stress is fragile.
        </p>
        
        <p>
          What makes this state especially damaging is how invisible it is from the outside. Loved ones may still be working, parenting, or socializing. There may be no obvious crisis to justify the exhaustion. This invisibility often leads families to dismiss their own experience, telling themselves they should be able to handle it.
        </p>
        
        <p>
          Recognizing this hyper-vigilance as a consequence of addiction—not a personal failure—can be a turning point. It allows families to see that their nervous systems have been living in survival mode, even if life looks "normal" on the surface.
        </p>
        
        <p className="text-foreground font-medium">
          Families deserve more than endurance. They deserve peace, predictability, and emotional safety. Reclaiming those things often requires stepping out of constant alertness and acknowledging how much the environment has been shaped by addiction.
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

export default FamilyConstantAlert;