import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import FaqSection from "@/components/FaqSection";
import { ArrowLeft } from "lucide-react";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-when-a-parent-gets-sober.jpg";

const SLUG = "when-a-parent-gets-sober";
const TITLE = "When a Parent Gets Sober: Why Their Kids Don't Always Throw a Party";
const DESCRIPTION =
  "When a parent gets sober, adult children often feel anger or distrust instead of joy. Interventionist Matt Brown explains why, and what actually helps.";

const linkClass = "text-primary hover:text-primary/80 transition-colors";
const h2 = "text-2xl font-bold text-foreground mt-10";
const h3 = "text-xl font-bold text-foreground mt-6";

const faqs = [
  { question: "Is it normal to feel angry when a parent gets sober?", answer: "Yes, it's one of the most common reactions. Many adult children feel anger that their parent found sobriety now, after so many missed years. That anger usually softens with time, honest conversations, and support of your own." },
  { question: "How long does it take to trust a parent in recovery again?", answer: "There's no set timeline. For most families, trust rebuilds over months to years of consistent behavior, not weeks. Let your trust grow in proportion to what you actually see." },
  { question: "Should I let my sober parent spend time with my kids?", answer: "That's your call, and it's fine to start small. Many families begin with supervised or daytime visits and no driving the grandkids, then expand as sobriety holds steady. Clear boundaries protect everyone, including your parent." },
  { question: "Where can adult children of alcoholics or addicts find support?", answer: "Al-Anon, Nar-Anon, and Adult Children of Alcoholics (ACA) offer free meetings in person and online. A therapist experienced with family addiction is another strong option. You don't have to wait for a crisis to reach out." },
  { question: "What if my parent relapses after getting sober?", answer: "Relapse happens, and it doesn't erase the progress that came before it. Keep your boundaries in place and avoid taking on the job of fixing it. If the relapse turns dangerous, a professional interventionist can help your family respond together." },
];

const WhenAParentGetsSober = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${TITLE} | Party Wreckers`}
        description={DESCRIPTION}
        canonical={`/blog/${SLUG}`}
        ogType="article"
        ogImage={blogImage}
        keywords="when a parent gets sober, adult children of alcoholics, parent in recovery, rebuilding trust with sober parent, Matt Brown interventionist"
        publishedTime="2026-10-14"
      />
      <ArticleJsonLd title={TITLE} description={DESCRIPTION} image={blogImage} datePublished="2026-10-14" dateModified="2026-10-14" slug={SLUG} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: "When a Parent Gets Sober", url: `/blog/${SLUG}` },
        ]}
      />
      <FAQJsonLd faqs={faqs} />

      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <header className="mb-8">
          <img
            src={blogImage}
            alt="A woman in her early thirties and her father in his sixties sitting apart on a porch bench with coffee, a cautious distance between them"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
            width={1344}
            height={768}
          />
          <p className="text-muted-foreground text-sm mb-2">October 14, 2026</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">{TITLE}</h1>
        </header>

        <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />

        <ArticleAnswerSummary slug={SLUG} />

        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <p>I've wrecked a lot of parties in my life. Some on purpose, for a living. Some by accident, back when I was the one drinking. But one of the quietest, most important moments in my work happens after the party is already over: when a parent gets sober, and their grown kids don't feel like celebrating.</p>
          <p>A while back I sat in on a family session at a treatment center. Dad was 60 days sober, clear-eyed and proud, and he had just read a letter to his three grown kids. When he looked up, his oldest daughter said, "Everyone keeps telling me I should be happy. I'm not. Is something wrong with me?"</p>
          <p>Nothing was wrong with her. When a parent gets sober, adult children often feel just about everything except the joy everyone expects. I know this from both sides. When I got sober 22 years ago, I wanted my family to celebrate. What I got was caution. It stung. It was also completely fair.</p>

          <h2 className={h2}>Why Don't Adult Children Feel Happy When a Parent Gets Sober?</h2>
          <p>Because sobriety ends the drinking, not the history. Adult children have usually spent years, sometimes their whole lives, adapting to a parent's addiction, and those adaptations don't switch off the day Mom or Dad walks into treatment. Relief, anger, grief, and suspicion often show up all at once.</p>
          <p>Think about what a kid in an addicted home learns. Read the room. Keep the peace. Don't count on the good days. Those weren't character flaws. They were survival skills, and now the parent is asking them to drop the very guard that kept them safe.</p>
          <p>There's another piece nobody talks about. Recovery can feel like it's all about the parent again. Their meetings, their milestones, their chips. For someone who spent childhood orbiting a parent's drinking, orbiting a parent's sobriety can feel strangely familiar.</p>

          <h2 className={h2}>The Feelings Nobody Warns You About</h2>
          <p>The most common reactions I see in adult children of a newly sober parent are anger, grief, distrust, and numbness. All of them are normal, and none of them mean you don't love your parent.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Anger:</strong> "Why could you do it now and not when I was eight?" This one comes up in almost every family I work with, and it deserves to be said out loud.</li>
            <li><strong>Grief:</strong> Meeting the sober version of your parent can show you exactly what you missed growing up. That loss is real, even if the parent is right in front of you.</li>
            <li><strong>Distrust:</strong> If you've watched them quit before, you're braced for the other shoe. That isn't cynicism. It's experience.</li>
            <li><strong>Numbness:</strong> Sometimes you just don't feel much. After enough disappointments, a lot of kids stop investing so they can stop getting hurt.</li>
          </ul>
          <p>Here's my side of it. In early recovery, I took my family's caution personally. I had a few months sober. Didn't that count for something? It took me a while to understand they weren't punishing me. They were protecting themselves from a guy who had earned that protection.</p>

          <h2 className={h2}>What Should Adult Children Do When a Parent Gets Sober?</h2>
          <p>You don't have to move on your parent's timeline. The healthiest approach is to let your trust follow their actions instead of their words, and to get some support of your own while you figure out what you actually feel.</p>
          <h3 className={h3}>Let trust come back in small, boring pieces</h3>
          <p>Trust doesn't return through one big speech. It returns through ordinary Tuesdays. Showing up when they said they would. Calling when they said they would. Watch the pattern over months, not the promise in a single conversation.</p>
          <h3 className={h3}>Say what you need, even if it's distance</h3>
          <p>You're allowed to say, "I'm glad you're sober, and I'm not ready for Sunday dinners yet." Both things can be true. If you have kids of your own, it's okay to set clear rules around time with Grandma or Grandpa while everybody finds their footing.</p>
          <h3 className={h3}>Get support that's about you</h3>
          <p>Your parent has a whole program built around their recovery. You deserve something too. Al-Anon, Nar-Anon, and <Link to="/blog/adult-children-of-addicts-patterns" className={linkClass}>Adult Children of Alcoholics</Link> (ACA) meetings are full of people who get it without you having to explain. A therapist who understands family addiction can help you untangle what's yours to carry and what never was.</p>

          <h2 className={h2}>How Can a Parent in Recovery Rebuild Trust With Their Kids?</h2>
          <p>Stay sober, stay consistent, and stop asking to be celebrated. When a parent gets sober, <Link to="/blog/living-amends-what-recovery-asks-after-sorry" className={linkClass}>living amends</Link>, meaning changed behavior over time, do far more to repair trust with adult children than any apology letter ever will.</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Don't keep score out loud.</strong> Your sober time matters, but announcing it to earn credit puts the focus back on you.</li>
            <li><strong>Let them be angry without defending yourself.</strong> "You're right, and I'm sorry" beats any explanation.</li>
            <li><strong>Ask instead of assuming.</strong> "What would feel good to you right now?" might get you lunch, or it might get you space. Both are answers.</li>
            <li><strong>Be patient on their timeline.</strong> They spent years waiting on you. You can wait a while on them.</li>
          </ol>
          <p>Early on, a guy with a lot more sober time than me said, "Your family didn't get sick in a day, and they won't get well in one." I didn't love hearing it. He was right.</p>

          <h2 className={h2}>Sobriety Is the Start of the Story, Not the Ending</h2>
          <p>Back to that daughter in the family session. Her dad didn't argue with her. He nodded and said, "That's fair. I'm going to keep showing up." Last I heard, they were meeting for lunch once a month. Not a fairy tale. Something better. Something real. (Details changed, as always, to protect the family.)</p>
          <p>If your parent got sober and you're not celebrating, you're not broken and you're not ungrateful. You're a person with a history, doing the slow work of deciding whether it's safe to hope again. Take your time. Hope that's earned holds up better than hope that's rushed.</p>

          <div className="mt-10 space-y-3">
            <h3 className="text-xl font-bold text-foreground">Related Reading</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><Link to="/blog/living-amends-what-recovery-asks-after-sorry" className={linkClass}>Living Amends: What Recovery Asks After Sorry</Link></li>
              <li><Link to="/blog/adult-children-of-addicts-patterns" className={linkClass}>Adult Children of Addicts: The Patterns That Follow You</Link></li>
              <li><Link to="/blog/still-angry-after-loved-one-gets-sober" className={linkClass}>They Got Sober. So Why Are You Still Angry?</Link></li>
            </ul>
          </div>

          <h2 className={h2}>Keep the Conversation Going</h2>
          <p className="text-foreground font-medium italic">
            If this one hit close to home, listen to <Link to="/episodes" className={linkClass}>The Party Wreckers podcast</Link>, where we talk honestly about intervention, addiction, and recovery from every side of the family table. Follow me, Matt Brown, for more real talk from 22 years sober and 20-plus years in the intervention world. And if your family needs help right now, whether your loved one is still using or just got sober, <a href="https://freedominterventions.com" target="_blank" rel="noopener noreferrer" className={linkClass}>reach out to FreedomInterventions.com</a>. You don't have to figure this out alone.
          </p>
        </article>

        <FaqSection title="Frequently Asked Questions About When a Parent Gets Sober" faqs={faqs} />

        <div className="mt-12 pt-8 border-t">
          <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default WhenAParentGetsSober;
