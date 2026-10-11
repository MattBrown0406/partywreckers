import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import FaqSection from "@/components/FaqSection";
import { ArrowLeft } from "lucide-react";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-talk-to-kids-parent-in-rehab.jpg";

const SLUG = "how-to-talk-to-kids-about-a-parent-in-rehab";
const TITLE = "How to Talk to Kids About a Parent in Rehab: What I Tell Every Family";
const DESCRIPTION =
  "Not sure how to talk to kids about a parent in rehab? Interventionist Matt Brown shares what to say at every age, what to avoid, and how to help kids cope.";

const linkClass = "text-primary hover:text-primary/80 transition-colors";
const h2 = "text-2xl font-bold text-foreground mt-10";
const h3 = "text-xl font-bold text-foreground mt-6";

const faqs = [
  { question: "What age should you tell a child about a parent's addiction?", answer: "There's no minimum age for honesty — only for detail. Even preschoolers can understand \"Daddy is sick and getting help.\" As children get older, you can add more information, including the word \"addiction\" and how it works." },
  { question: "Should kids visit a parent in rehab?", answer: "Often, yes, if the treatment center allows it and the parent is stable. Many programs offer structured family visits or family weekends designed with kids in mind. Ask the clinical team what's right for your child's age." },
  { question: "What if my child is angry at the parent in rehab?", answer: "Let them be angry. Anger is a normal, healthy response to being hurt and scared. Give them safe ways to express it — talking, drawing, writing, or seeing a counselor." },
  { question: "How do I explain relapse to a child?", answer: "Keep it honest and calm: \"Mom's sickness came back for a while, and she's getting help again.\" Remind them it still isn't their fault and that relapse doesn't erase the progress the parent made." },
  { question: "Where can kids get support when a parent has an addiction?", answer: "Alateen offers peer support for teenagers, and many treatment centers run family or children's programs. A school counselor or a therapist who works with kids from addicted families can also help." },
];

const HowToTalkToKidsAboutAParentInRehab = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${TITLE} | Party Wreckers`}
        description={DESCRIPTION}
        canonical={`/blog/${SLUG}`}
        ogType="article"
        ogImage={blogImage}
        keywords="how to talk to kids about a parent in rehab, explaining addiction to children, parent in treatment, Alateen, family recovery, Matt Brown interventionist"
        publishedTime="2026-10-11"
      />
      <ArticleJsonLd title={TITLE} description={DESCRIPTION} image={blogImage} datePublished="2026-10-11" dateModified="2026-10-11" slug={SLUG} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: "Talking to Kids About a Parent in Rehab", url: `/blog/${SLUG}` },
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
            alt="A mother in her late thirties sitting alone at a kitchen table at dusk with a mug and a handwritten note, a stuffed rabbit resting on the chair beside her"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
            width={1344}
            height={768}
          />
          <p className="text-muted-foreground text-sm mb-2">October 11, 2026</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">{TITLE}</h1>
        </header>

        <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />

        <ArticleAnswerSummary slug={SLUG} />

        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <p>There's a moment that happens in almost every intervention I run, usually right after the hardest part is over. The person has said yes. The bag is packed. The car is idling in the driveway. And then someone — usually a mom, sometimes a dad, once a grandmother still holding a juice box — turns to me and asks, "What do we tell the kids?"</p>
          <p>I love that question. It means the family is already thinking past today. After 20-plus years doing this work and 22 years of my own sobriety, I've learned that knowing how to talk to kids about a parent in rehab matters almost as much as getting that parent through the door.</p>
          <p>Here's the truth: kids already know something is wrong. They've known for a while. What they don't know is what it means, whether it's their fault, and whether they're going to be okay. You don't need perfect words. You need to answer those three questions.</p>
          <h2 className={h2}>Should You Tell Kids Their Parent Is in Rehab?</h2>
          <p>Yes. In almost every case, kids handle the truth — told at their level — far better than they handle silence. Secrecy doesn't protect children. It just leaves them alone with their imagination.</p>
          <p>Kids are little detectives. They notice the slammed doors, the empty chair at dinner, the way your voice changes on the phone. When nobody explains, they invent a story — and it often stars them as the reason everything fell apart.</p>
          <p>I was once the person my family had to intervene on, and I can tell you the silence around my drinking didn't protect anybody. It just meant everyone suffered separately. Telling kids doesn't mean telling them everything. It means telling them the truth, sized for them.</p>
          <h2 className={h2}>How to Talk to Kids About a Parent in Rehab at Every Age</h2>
          <p>Match the explanation to the child's age: simple and concrete for little ones, more honest and detailed for teens. The core message never changes — Mom or Dad is sick, they're getting help, and it is not your fault.</p>
          <h3 className={h3}>Ages 3 to 6: Keep It Short and Concrete</h3>
          <p>Try something like: "Daddy has a sickness that makes him act different sometimes. He's going to a special place with doctors who will help him get better." Little kids care most about routine — who picks them up from school, who reads the bedtime story. Answer those first.</p>
          <h3 className={h3}>Ages 7 to 12: Name It and Explain It</h3>
          <p>School-age kids can handle the word "addiction." Explain it as a sickness that makes the brain want alcohol or drugs even when they're hurting the person. Be ready for big questions like "Is she going to die?" or "Can I talk to her?" Answer honestly: "Right now she's safe, and the people there are really good at helping."</p>
          <h3 className={h3}>Teenagers: Be Straight With Them</h3>
          <p>Your teenager probably knows more than you think. Use real words, invite their questions, and make room for their anger. This is also the age to talk honestly about family risk — addiction tends to run in families, and teens deserve to know that.</p>
          <h2 className={h2}>What Should You Never Say to Kids About a Parent's Addiction?</h2>
          <p>Avoid lies, blame, and promises you can't keep. Lines like "Dad's on a work trip" or "She'll be all better in 30 days" feel kind in the moment, but they set kids up for confusion and broken trust later.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Don't lie about where the parent is.</strong> Kids find out. When they do, the lesson they learn is that adults can't be trusted.</li>
            <li><strong>Don't trash the parent.</strong> "Your father is a selfish drunk" may feel earned. But a child hears "half of you is bad."</li>
            <li><strong>Don't promise a cure.</strong> Recovery is real, but it isn't a 30-day guarantee. Say "Mom is working hard to get better," not "Mom will be fixed."</li>
            <li><strong>Don't ask kids to keep secrets.</strong> "Don't tell Grandma" puts adult-sized weight on very small shoulders.</li>
          </ul>
          <h2 className={h2}>What Are the Three Things Every Kid Needs to Hear?</h2>
          <p>When you talk to kids about addiction in the family, three messages matter more than anything else. (For the bigger picture, see <Link to="/blog/parentified-child-addiction-family" className={linkClass}>how addiction affects children in the family</Link>.) Say them early, and say them often — kids need to hear them more than once before they believe them.</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>It's not your fault.</strong> Kids are wired to believe they caused whatever is happening around them. There's a phrase used in family recovery circles that even young kids can learn: "I didn't cause it, I can't control it, and I can't cure it." Teach it to them.</li>
            <li><strong>You're not alone.</strong> Millions of kids grow up with a parent who struggles with alcohol or drugs. Your child isn't the only one.</li>
            <li><strong>You will be taken care of.</strong> Be specific. "Aunt Sarah is picking you up on Tuesdays. I'm making dinner every night. Your soccer practice isn't changing." Concrete plans calm anxious kids faster than reassuring speeches.</li>
          </ol>
          <h2 className={h2}>How Can Kids Stay Connected to a Parent in Rehab?</h2>
          <p>Many treatment programs allow family contact after an initial settling-in period, and many offer family programming. Use what's available — healthy connection helps the child, and it often gives the parent a powerful reason to keep going.</p>
          <p>I'll never forget a dad I worked with who taped his seven-year-old's crayon drawing above his bed in treatment. He told me later that on the nights he wanted to walk out, he'd stare at that drawing until the urge passed.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ask the treatment center about phone schedules, visiting rules, and family weekends. Policies vary, and some limit contact for the first week or two.</li>
            <li>Encourage letters and drawings. They give kids a way to say what they can't put into words.</li>
            <li>Keep home routines steady. Same bedtime, same school drop-off, same Friday pizza. Predictability is medicine for a scared kid.</li>
            <li>Find kids' support. Alateen is built for teens with a family member who drinks, and many communities offer groups for younger children affected by a parent's substance use.</li>
          </ul>
          <h2 className={h2}>You Don't Have to Get This Perfect</h2>
          <p>You're going to stumble over your words. You might cry, or say the wrong thing and have to try again tomorrow. That's okay. Kids learn more from watching you repair than from watching you pretend.</p>
          <p>The families I see heal best aren't the ones with the perfect script. They're the ones who stop keeping the secret. When you tell your kids the truth, gently and at their level, you're wrecking the party addiction has been throwing in your house — the one where everybody pretends and nobody talks. And that's a party worth wrecking.</p>

          <div className="mt-10 space-y-3">
            <h3 className="text-xl font-bold text-foreground">Related Reading</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><Link to="/blog/parentified-child-addiction-family" className={linkClass}>The Parentified Child in an Addiction Family</Link></li>
              <li><Link to="/blog/coming-home-from-rehab-what-families-arent-prepared-for" className={linkClass}>Coming Home From Rehab: What Families Aren't Prepared For</Link></li>
              <li><Link to="/blog/co-parenting-with-an-addicted-ex" className={linkClass}>Co-Parenting With an Addicted Ex</Link></li>
            </ul>
          </div>

          <p className="text-foreground font-medium italic mt-8">
            If this hit home, I talk about family recovery every week on <Link to="/episodes" className={linkClass}>The Party Wreckers podcast</Link> — real stories, no clinical jargon, and plenty of hope. And if your family is stuck and you don't know what to do next, <a href="https://freedominterventions.com" target="_blank" rel="noopener noreferrer" className={linkClass}>reach out to my team at FreedomInterventions.com</a>. We help families stop waiting and start moving — kids included.
          </p>
        </article>

        <FaqSection faqs={faqs} />

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

export default HowToTalkToKidsAboutAParentInRehab;
