import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-high-functioning-alcoholic-intervention.jpg";

const SLUG = "high-functioning-alcoholic-intervention";
const TITLE = "The Intervention Nobody Thinks They Need: Getting Through to the High-Functioning Alcoholic";
const DESCRIPTION =
  "A high-functioning alcoholic intervention is different. Interventionist Matt Brown explains why the job, the money, and the good manners make it harder — and how families break through.";
const IMAGE_ALT =
  "A well-dressed man in his early forties standing in a dimly lit home wine cellar at night holding a glass of red wine, looking away with a weary expression";

const faqs = [
  {
    question: "Can you do an intervention on a high-functioning alcoholic?",
    answer:
      "Yes, and it's often the most effective time to do one. The person still has a job, a family, and a reputation worth protecting, which gives them real reasons to accept help. Waiting for a visible collapse means waiting until they have less to fight for.",
  },
  {
    question: "What are the signs of a high-functioning alcoholic?",
    answer:
      "Drinking daily or in large amounts while maintaining work and obligations, hiding or minimizing how much they drink, irritability or anxiety when they can't drink, and a growing gap between their public performance and their private behavior. Family members usually notice long before coworkers do.",
  },
  {
    question: "Will an intervention cost them their job or professional license?",
    answer:
      "It rarely does when planned properly. Many professions have confidential recovery programs, and treatment can often be arranged under medical leave. The bigger risk to a career is untreated addiction — a DUI, a medical error, a missed deadline that finally can't be explained away.",
  },
  {
    question: "How do you respond when they say they're not as bad as other people?",
    answer:
      "Don't take the bait. Comparing themselves to worse drinkers is a way to change the subject. Bring it back to specific things you've witnessed and how they affected you. You're not there to prove a diagnosis; you're there to describe reality.",
  },
];

const HighFunctioningAlcoholicIntervention = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${TITLE} \u2014 Party Wreckers`}
        description={DESCRIPTION}
        canonical={`/blog/${SLUG}`}
        ogType="article"
        ogImage={blogImage}
        keywords="high-functioning alcoholic intervention, high functioning alcoholic, intervention for a professional, alcoholic doctor lawyer intervention, signs of a high functioning alcoholic"
        publishedTime="2026-09-09"
      />

      <ArticleJsonLd
        title={TITLE}
        description={DESCRIPTION}
        image={blogImage}
        datePublished="2026-09-09"
        dateModified="2026-09-09"
        slug={SLUG}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: TITLE, url: `/blog/${SLUG}` },
        ]}
      />

      <FAQJsonLd faqs={faqs} />

      <Navbar />

      <article className="max-w-3xl mx-auto px-4 pt-24 pb-16">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link to="/blog" className="hover:text-primary flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </nav>

        <div className="mb-8">
          <img src={blogImage} alt={IMAGE_ALT} className="w-full rounded-lg shadow-lg" width={1920} height={1088} />
        </div>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{TITLE}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>By Matt Brown</span>
            <span>|</span>
            <time dateTime="2026-09-09">September 9, 2026</time>
          </div>
        </header>

        <div className="mb-8">
          <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />
        </div>

        <ArticleAnswerSummary slug={SLUG} />

        <div className="prose prose-lg max-w-none text-foreground">
          <p>
            The nicest house I ever did an intervention in had a wine cellar. The man who lived there had built it himself. He was a surgeon, a marathon runner, a guy who coached his daughter&rsquo;s soccer team and never missed a game. When I walked in, he shook my hand, offered me coffee, and told me &mdash; politely, warmly &mdash; that this was all a misunderstanding.
          </p>

          <p>
            He was drinking a bottle and a half of wine every night, plus whatever happened at lunch. His wife had found the empties. His partners had started quietly rerouting his early surgeries. But he&rsquo;d never missed a mortgage payment, never gotten a DUI, never fallen down in public. So in his mind, and honestly in most of his family&rsquo;s minds, he wasn&rsquo;t the kind of person who needed an intervention.
          </p>

          <p>
            I recognized him immediately, because I used to be him. A high-functioning alcoholic intervention is one of the hardest jobs I do, and after twenty-plus years of them, I want to tell you why &mdash; and what actually works.
          </p>

          <h2>What Is a High-Functioning Alcoholic Intervention?</h2>

          <p>
            A high-functioning alcoholic intervention is a structured, planned conversation for someone whose drinking or drug use is severe but whose outward life &mdash; job, income, reputation &mdash; is still mostly intact. The goal is the same as any intervention: get the person to accept help today. The difference is what you&rsquo;re up against. You&rsquo;re not fighting chaos. You&rsquo;re fighting competence.
          </p>

          <p>
            Most people picture an intervention for someone who&rsquo;s lost everything. The high-functioning version is for someone who&rsquo;s lost almost nothing yet, at least on paper. That &ldquo;yet&rdquo; is the whole reason to act.
          </p>

          <h2>Why It&rsquo;s Harder Than a Typical Intervention</h2>

          <p>
            It&rsquo;s harder because the person&rsquo;s success becomes the argument against treatment, and the family has usually been half-persuaded by it. I&rsquo;ve had spouses tell me, &ldquo;He drinks too much, but he&rsquo;s the top producer in his firm.&rdquo; That sentence is doing a lot of work. It sounds like a description. It&rsquo;s actually a defense.
          </p>

          <p>Here&rsquo;s what I run into with high-functioning drinkers that I rarely see with someone whose life has visibly collapsed:</p>

          <ul>
            <li>They&rsquo;re better at arguing than you are. They negotiate for a living. They&rsquo;ll find the flaw in your logic before you&rsquo;ve finished the sentence.</li>
            <li>They have receipts. A paycheck, a promotion, a clean record. They&rsquo;ll hold those up like a shield.</li>
            <li>The family is afraid of the fallout &mdash; the license, the neighbors, the business. Those fears keep families silent for years.</li>
            <li>They&rsquo;re used to being the most capable person in the room. Being told they have a problem they can&rsquo;t manage is an identity threat, not just an inconvenience.</li>
          </ul>

          <p>
            None of that means the intervention won&rsquo;t work. It means you can&rsquo;t wing it. I&rsquo;ve watched families try to do this one at the kitchen table and get out-lawyered by their own loved one in ten minutes.
          </p>

          <h2>How Do You Intervene on Someone Who Says They&rsquo;re Fine?</h2>

          <p>
            You stop arguing about whether they&rsquo;re fine and start talking about what you&rsquo;ve actually seen. The person in the chair can dispute a diagnosis all day. They cannot dispute that their daughter found them asleep in the car in the driveway at 6 a.m. Evidence beats labels every time.
          </p>

          <p>
            In the pre-intervention meetings, I have each family member write down specific moments. Not &ldquo;you drink too much.&rdquo; Dates. Places. What they saw. What they felt. When the surgeon&rsquo;s fourteen-year-old daughter read that she stopped inviting friends over because she never knew which version of Dad would be home, there was no negotiation left. You can argue with a chart. You can&rsquo;t argue with your kid.
          </p>

          <p>A few things I coach families on before we walk in:</p>

          <ol>
            <li>Drop the word &ldquo;alcoholic&rdquo; from your letters. It invites a debate about definitions. Describe behavior instead.</li>
            <li>Don&rsquo;t compare them to worse drinkers. They will win that comparison, and it&rsquo;s beside the point.</li>
            <li>Lead with love and specifics, not with consequences. The consequences come later, if we need them.</li>
            <li>Have every logistical objection already solved. Who covers the practice? Who tells the board? Who drives the carpool? If you leave a hole, they&rsquo;ll walk through it.</li>
          </ol>

          <p>
            If you&rsquo;ve never done this before, it helps to know{" "}
            <Link to="/blog/what-to-expect-when-you-call-an-interventionist" className="text-primary hover:underline">
              what to expect when you call an interventionist
            </Link>
            .
          </p>

          <h2>What About Their Career?</h2>

          <p>
            This is the objection that stalls more high-functioning interventions than any other. So we plan for it before we&rsquo;re in the room. For licensed professionals &mdash; doctors, lawyers, pilots, nurses &mdash; there are confidential programs specifically built for this, and treatment can often be arranged in a way that protects rather than endangers a license. For business owners, we map out coverage for thirty to ninety days in advance. I&rsquo;ve had interventions where the person&rsquo;s own business partner was in the room saying, &ldquo;We&rsquo;ve got it handled. Go.&rdquo; That&rsquo;s a game changer.
          </p>

          <p className="font-medium">
            The truth I say out loud in these rooms: your career is not what&rsquo;s at risk from treatment. Your career is what&rsquo;s at risk from the next two years of this.
          </p>

          <h2>What Happens When They Say Yes</h2>

          <p>
            Usually something surprising: relief. Not always right away, and not always pretty. But the people who&rsquo;ve been holding a double life together are exhausted in a way they can&rsquo;t admit to anyone. The surgeon told me on the drive to the airport that he&rsquo;d been waiting for someone to make him stop for three years. He just couldn&rsquo;t be the one to say it. He&rsquo;d built a whole life on being the guy who didn&rsquo;t need help.
          </p>

          <p>
            I knew exactly what he meant. When my family finally got through to me, I had a job, a car, and a very good explanation for everything. What I didn&rsquo;t have was a single honest relationship, including with myself. Twenty-three years sober now, and I can tell you the thing I was protecting &mdash; my image as a guy who had it together &mdash; was the thing that was killing me.
          </p>

          <h2>What Families Should Do Right Now</h2>

          <p>
            If you&rsquo;re reading this because someone you love looks fine to the world and doesn&rsquo;t look fine to you, trust what you&rsquo;re seeing. You live with it. The world gets the highlight reel.
          </p>

          <ul>
            <li>Start writing down what you observe, with dates. You&rsquo;ll need it, and it will keep you from talking yourself out of it.</li>
            <li>Stop covering. Every excuse you make to the office, the school, the in-laws is one more brick in the wall.</li>
            <li>
              Talk to a professional before you talk to them. A high-functioning alcoholic intervention is a chess match, and you want someone who&rsquo;s played it before &mdash; here&rsquo;s{" "}
              <Link to="/blog/how-to-choose-an-interventionist" className="text-primary hover:underline">
                how to choose an interventionist
              </Link>
              .
            </li>
          </ul>

          <p>
            The wine cellar guy is four years sober. He still runs marathons. He still coaches. He&rsquo;s also, by his own account, a much better surgeon than he was, because he&rsquo;s not operating on four hours of sleep and a hangover he&rsquo;d learned to hide. Nobody lost their license. Nobody lost the house. The only thing that got wrecked was the party, and that was the point.
          </p>

          <h2>Frequently Asked Questions</h2>

          <div className="space-y-6 my-8">
            {faqs.map((f) => (
              <div key={f.question}>
                <h3 className="text-lg font-semibold mb-2">{f.question}</h3>
                <p>{f.answer}</p>
              </div>
            ))}
          </div>

          <div className="bg-muted/50 border border-border rounded-lg p-6 my-8">
            <h3 className="text-xl font-bold mb-2">Listen to The Party Wreckers</h3>
            <p>
              If this sounds like someone in your life, you&rsquo;re not imagining it, and you&rsquo;re not overreacting. Listen to{" "}
              <Link to="/episodes" className="text-primary hover:underline">
                The Party Wreckers podcast
              </Link>{" "}
              wherever you get your shows &mdash; we talk about the interventions nobody thinks they need. And when you&rsquo;re ready to stop managing it alone, reach out at{" "}
              <a
                href="https://freedominterventions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                FreedomInterventions.com
              </a>
              . I&rsquo;d be glad to help you wreck the right party.
            </p>
            <p className="mt-4">&mdash; Matt Brown</p>
          </div>

          <div className="border-t border-border pt-8 mt-12">
            <h3 className="text-xl font-bold mb-4">Related Articles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog/what-to-expect-when-you-call-an-interventionist" className="text-primary hover:underline">
                  What to Expect When You Call an Interventionist
                </Link>
              </li>
              <li>
                <Link to="/blog/how-to-choose-an-interventionist" className="text-primary hover:underline">
                  How to Choose an Interventionist
                </Link>
              </li>
              <li>
                <Link to="/blog/functional-addiction-hiding" className="text-primary hover:underline">
                  When Addiction Hides Behind a Functioning Life
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default HighFunctioningAlcoholicIntervention;
