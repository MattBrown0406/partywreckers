import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import blogImageEnablingVsSupporting from "@/assets/blog-enabling-vs-supporting.jpg";

const EnablingVsSupportingBoundaries = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Enabling vs Supporting—A Boundary Blueprint for Families - Party Wreckers Podcast"
        description="Learn the difference between enabling and supporting. Get a step-by-step boundary plan, examples of enabling behaviors, and what to do instead."
        canonical="/blog/enabling-vs-supporting-boundaries"
        ogType="article"
        ogImage={blogImageEnablingVsSupporting}
        keywords="addiction, family support, boundaries, communication, recovery"
        publishedTime="December 17, 2025"
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
            src={blogImageEnablingVsSupporting} 
            alt="Two hands representing the balance between supportive and boundary-setting gestures in family relationships"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
          />
          <p className="text-muted-foreground text-sm mb-2">December 17, 2025</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            Enabling vs Supporting—A Boundary Blueprint for Families
          </h1>
        </header>

        <ArticleAnswerSummary slug="enabling-vs-supporting-boundaries" />

        {/* Article Content */}
        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <div className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Why This Is So Confusing (And So Painful)</h3>
        
        <p>Most enabling starts as love.</p>
        
        <p>You help because:</p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>You're terrified they'll overdose, get hurt, or die</li>
          <li>You feel responsible for keeping the peace</li>
          <li>You're trying to protect children, parents, or a reputation</li>
          <li>You remember who they were "before"</li>
          <li>You've been manipulated, guilted, or threatened</li>
        </ul>
        
        <p>
          Enabling isn't "being stupid." It's what people do when they're desperate to stop suffering—yours and theirs.
        </p>
        
        <p>
          The problem is that enabling often reduces consequences in a way that unintentionally makes addiction easier to continue.
        </p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Enabling vs Supporting: The Simple Difference</h3>
        
        <p><strong>Enabling</strong> = Actions that protect the addiction from consequences.</p>
        <p><strong>Supporting</strong> = Actions that support recovery and safety (without rescuing).</p>
        
        <p>A quick test:</p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>Does this action reduce immediate discomfort but keep the pattern going?</li>
          <li>Or does it support health while still allowing reality to be real?</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Common Enabling Patterns (That Look Like Love)</h3>
        
        <p>Enabling can be obvious—handing over cash—or subtle.</p>
        
        <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">Financial enabling</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Paying rent repeatedly after money is spent on substances</li>
          <li>"Loaning" money without accountability</li>
          <li>Covering legal fees without conditions</li>
        </ul>
        
        <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">Responsibility enabling</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Calling their boss to say they're sick</li>
          <li>Completing their chores, parenting duties, or school responsibilities</li>
          <li>Making excuses to friends and family</li>
        </ul>
        
        <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">Emotional enabling</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Walking on eggshells to prevent them from using</li>
          <li>Avoiding hard conversations to "keep them stable"</li>
          <li>Accepting disrespect because "they're going through something"</li>
        </ul>
        
        <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">Crisis-cycle enabling</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Rescuing them from every consequence</li>
          <li>Letting the household become a revolving door after binges</li>
          <li>Repeating "last chance" promises with no follow-through</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">What Supporting Looks Like Instead</h3>
        
        <p>Supporting focuses on what helps recovery, not what helps comfort.</p>
        
        <p>Support can include:</p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>Offering rides to counseling or a professional evaluation</li>
          <li>Helping research treatment options with consent</li>
          <li>Encouraging healthy routines (sleep, meals, accountability)</li>
          <li>Being honest about impact: "I'm scared and this can't continue"</li>
          <li>Attending family support groups or counseling</li>
          <li>Holding boundaries consistently</li>
        </ul>
        
        <p><strong>Key point:</strong> Supporting does not require you to tolerate chaos.</p>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">The Boundary Blueprint: 5 Steps Families Can Follow</h3>
        
        <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">1) Define the "Non-Negotiables" (Safety Rules)</h4>
        
        <p>Start with safety and stability—especially with kids in the home.</p>
        
        <p>Examples:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>No intoxication in the home</li>
          <li>No driving after using</li>
          <li>No violence, threats, or destruction</li>
          <li>No drugs/alcohol stored in shared spaces</li>
          <li>No theft, borrowing, or financial access</li>
        </ul>
        
        <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">2) Decide What You Will Do (Not What They Must Do)</h4>
        
        <p>Boundaries work best when they're about your actions.</p>
        
        <p>Instead of: "You have to stop using."<br/>
        Try: "If you use in the home, I will leave / you will need to stay elsewhere."</p>
        
        <p>Instead of: "You need treatment."<br/>
        Try: "I won't fund your lifestyle. I will help fund recovery steps."</p>
        
        <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">3) Write It Down (Yes, Really)</h4>
        
        <p>When you're exhausted, you'll forget the plan and revert to rescue mode.</p>
        
        <p>Write:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>The boundary</li>
          <li>The consequence (your action)</li>
          <li>The support you're still willing to offer</li>
        </ul>
        
        <p><em>Example:</em><br/>
        "If you come home intoxicated, you cannot stay here that night. I will still help you get to an evaluation in the morning."</p>
        
        <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">4) Communicate Calmly, Briefly, and Once</h4>
        
        <p>You don't need a courtroom argument.</p>
        
        <p><em>Script:</em><br/>
        "I love you. I'm not doing this to punish you. I'm doing this because our home has to be safe and the pattern has to change."</p>
        
        <p>Avoid over-explaining. Over-explaining invites negotiation.</p>
        
        <h4 className="text-lg font-semibold text-foreground mt-6 mb-3">5) Hold the Line—Expect Pushback</h4>
        
        <p>Pushback doesn't mean your boundary is wrong. It often means the boundary is working.</p>
        
        <p>You may hear:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>"You don't love me."</li>
          <li>"You're abandoning me."</li>
          <li>"I'll never talk to you again."</li>
          <li>"You're the reason I use."</li>
        </ul>
        
        <p>Respond with:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>"I love you. I'm still not doing that."</li>
          <li>"I won't argue. The boundary stands."</li>
          <li>"When you're ready for help, I'll support recovery."</li>
        </ul>
        
        <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">When Families Need Extra Support</h3>
        
        <p>
          If your loved one is medically fragile, suicidal, violent, or at high overdose risk, boundaries should be planned with professional guidance. Families also benefit from resources and coping strategies as they support a loved one.
        </p>
        
        <p>
          <strong>Boundaries are not cruelty. They're clarity. And clarity is often the first step toward change.</strong>
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

export default EnablingVsSupportingBoundaries;