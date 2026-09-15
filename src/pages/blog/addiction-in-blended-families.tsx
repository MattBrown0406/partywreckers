import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import FaqSection from "@/components/FaqSection";
import { ArrowLeft } from "lucide-react";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-addiction-in-blended-families.jpg";

const SLUG = "addiction-in-blended-families";
const TITLE = "\"Not My Kid, But My Problem\": How Addiction in Blended Families Splits the House";
const DESCRIPTION =
  "Addiction in blended families hits stepparents, biological parents, and two households at once. Interventionist Matt Brown on why it's harder and what to do.";

const faqs = [
  {
    question: "Should a stepparent be part of an intervention?",
    answer:
      "Yes, if they've been part of the daily life around the addiction. A stepparent's role is usually witness rather than authority: they describe specific things they've seen without delivering a verdict. Excluding them usually confirms the addicted person's story that the stepparent doesn't matter.",
  },
  {
    question: "What if my ex refuses to cooperate with treatment?",
    answer:
      "Ask for the smallest agreement possible, which is that neither home will fund or shelter active use. If your ex won't agree even to that, hold the line in your own home and let a professional make the call to the other house. A third party often gets a yes a former spouse can't.",
  },
  {
    question: "Is my divorce the reason my child is addicted?",
    answer:
      "Divorce can be one stressor among many, but it doesn't cause addiction and it doesn't excuse it. Guilt about the divorce becomes a problem when it makes one parent softer than the other, because the addiction will move toward the softer parent. Treat the guilt separately, ideally with a counselor, so it stops running your decisions.",
  },
  {
    question: "How do we handle addiction when the addicted person goes back and forth between two homes?",
    answer:
      "Both homes need the same bottom line, even if daily rules differ. The bottom line is no money, housing, or cover for active use. Write it down, share it between households, and make sure the addicted person hears it from both sides in the same week.",
  },
  {
    question: "When should a blended family call an interventionist?",
    answer:
      "When the adults can't agree on a plan, when the addicted person is playing one household against another, or when a crisis has already happened and nothing changed. An interventionist's first job in a blended family is often getting the adults aligned before anyone talks to the person using.",
  },
];

const AddictionInBlendedFamilies = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${TITLE} — Party Wreckers`}
        description={DESCRIPTION}
        canonical={`/blog/${SLUG}`}
        ogType="article"
        ogImage={blogImage}
        keywords="addiction in blended families, stepparent addiction, co-parenting addiction, two households addiction rules, blended family intervention, Matt Brown interventionist"
        publishedTime="2026-09-15"
      />

      <ArticleJsonLd
        title={TITLE}
        description={DESCRIPTION}
        image={blogImage}
        datePublished="2026-09-15"
        dateModified="2026-09-15"
        slug={SLUG}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: "Addiction in Blended Families", url: `/blog/${SLUG}` },
        ]}
      />

      <FAQJsonLd faqs={faqs} />

      <Navbar />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          to="/blog"
          className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <header className="mb-8">
          <img
            src={blogImage}
            alt="A stepfather standing in a kitchen doorway with arms crossed while his wife stands apart at the counter late at night"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
            width={1344}
            height={768}
          />
          <p className="text-muted-foreground text-sm mb-2">September 15, 2026</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {TITLE}
          </h1>
        </header>

        <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />

        <ArticleAnswerSummary slug={SLUG} />

        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <p>
            A few years ago I sat in a living room with a family getting ready for an intervention, and the stepdad was standing in the kitchen doorway. Not sitting. Standing, arms crossed, halfway out of the room. When I asked him to join us he said, "I'm not sure I'm supposed to be here. He's not my kid." His wife's face told me they'd had that exact conversation about forty times.
          </p>

          <p>
            He'd been paying the kid's phone bill for six years. He'd found the pills. He'd driven to the ER at 2 a.m. He was as deep in this as anyone in that room, and had no idea whether he was allowed an opinion.
          </p>

          <p>
            Addiction in blended families runs on that exact confusion. Who's allowed to speak. Whose kid it is. Which house the rules live in. I've watched it stall more interventions than the addicted person ever did. And as a guy whose own family once had to figure out what to do with me, I can tell you: the person using is counting on the adults not being able to agree.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">Why is addiction harder in blended families?</h2>

          <p>
            Addiction is harder in blended families because the authority is split before the crisis even starts. Every family with addiction struggles to hold a line. Blended families have to first agree on who's holding it, and often two or three households have to agree.
          </p>

          <p>
            A first-marriage family has one set of parents, one house, one history. A blended family might have a mom, a stepdad, a dad, a stepmom, half-siblings, and two sets of grandparents who don't speak to each other. Each of them has a different version of the story, and the person using has learned every seam.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">The stepparent's trap: no authority, all the fallout</h2>

          <p>
            Stepparents usually get the consequences of the addiction without the standing to do anything about it. They see the theft and feel the tension, and they've been told to stay out of it.
          </p>

          <p>
            So they do one of two things. They go quiet and build resentment in a spare bedroom of their heart, or they finally explode and confirm the family's suspicion that they "never liked him anyway." Neither one helps.
          </p>

          <p>
            If you're the stepparent, here's what's true right now: you don't need to be the parent to be a witness. Your job in this family is to say what you see, plainly, once, without a verdict. "I found a bottle in the garage on Tuesday. I'm telling you because I love you and I'm not going to pretend I didn't see it." That sentence carries weight precisely because it isn't a threat.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">The biological parent's trap: guilt with a two-decade backlog</h2>

          <p>
            The biological parent in a blended family usually carries two kinds of guilt, and the addiction feeds on both. Standard parent guilt, and divorce guilt. The one that says the addiction is the bill coming due for the marriage ending, the moves, the new partner, the years the kid had to adjust.
          </p>

          <p>
            "He was fine before the divorce." Maybe some of that is true. It doesn't matter the way you think it does. Divorce didn't put the substance in your kid's hand, and your guilt about it is not a treatment plan. If that question is living in your chest, it's worth reading <Link to="/blog/is-my-childs-addiction-my-fault" className="text-primary hover:text-primary/80 transition-colors">what I tell every parent who asks whether their child's addiction is their fault</Link>.
          </p>

          <p>
            Where it gets dangerous is when that guilt turns into a private deal: I'll go easier on him because I already put him through enough. Your spouse sees you make that deal. Your kid sees it too. That's the seam.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">The quiet marriage cost</h2>

          <p>
            Addiction in blended families tends to break the couple before it breaks the kid. The stepparent feels unheard and outranked. The parent feels attacked and torn. Every conversation about the addicted child is secretly a conversation about the marriage. If your marriage has become a courtroom with your kid's addiction as the case file, that's a sign you need help for the two of you, not just for him.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">Two houses, two sets of rules, one addiction</h2>

          <p>
            When the addicted person moves between households, the addiction goes with them, and it always finds the softer house. A person in active addiction will not stay where the rules are firm when there's a place ten miles away where they aren't.
          </p>

          <p>
            This is where the ex comes in. I know what you're thinking: I can't get my ex to agree on Christmas pickup, and you want us to agree on drug treatment? Yes. Not on everything. On one thing. It's the same math I walk through in <Link to="/blog/co-parenting-with-an-addicted-ex" className="text-primary hover:text-primary/80 transition-colors">co-parenting with an addicted ex</Link>.
          </p>

          <p>
            The one thing is this: neither house will fund, house, or cover for active use. That's it. You don't have to like each other. You don't have to co-parent well. You have to close the back door, because as long as it's open, everything you do at the front door is theater.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">What can blended families do about addiction right now?</h2>

          <p>
            The most useful move a blended family can make is to get every adult who matters in the same conversation, with a clear job, before anyone talks to the person who's using. Here's how I run it with the families I work with.
          </p>

          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Name the roster.</strong> Write down every adult with real influence: parents, stepparents, the ex, the ex's partner, the grandparent who sends money. If they can affect the outcome, they're on the list, whether you like them or not.</li>
            <li><strong>Make the smallest possible agreement.</strong> Don't try to align on parenting philosophy. Align on one sentence: We will not support active use in any home. Get every adult to say it out loud.</li>
            <li><strong>Give the stepparent a real role.</strong> Witness, logistics, the person who researches treatment options. Something concrete, so they're not standing in the doorway.</li>
            <li><strong>Separate the marriage conversation from the addiction conversation.</strong> Have the first one with a counselor if you need to. Do it before the intervention, not during it.</li>
            <li><strong>Get a third party in the room.</strong> A blended family arguing about an addicted kid can't referee itself. That's not weakness. It's structure.</li>
          </ol>

          <p>
            Do it in that order. Most families jump straight to step five and skip the rest. If you're close to that call, here's <Link to="/blog/what-to-expect-when-you-call-an-interventionist" className="text-primary hover:text-primary/80 transition-colors">what to expect when you call an interventionist</Link>.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">The kid in the room</h2>

          <p>
            When we finally got that stepdad a chair and a job, which was to tell one true story about what he'd seen, he cried before the second sentence. His stepson, who'd spent years saying the guy didn't care, went quiet in a way I've learned to trust.
          </p>

          <p>
            I was that kid once. Not in a blended family, but I was the one everyone was managing, and I knew exactly which adult was going to fold. Every addict does. The gift you give the person you love isn't a united front for its own sake. It's the experience of running out of seams. That's usually the day the party ends, and I say that as someone who's proud to be the one who wrecks it.
          </p>

          <div className="mt-10 space-y-3">
            <h3 className="text-xl font-bold text-foreground">Related Reading</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><Link to="/blog/co-parenting-with-an-addicted-ex" className="text-primary hover:text-primary/80 transition-colors">Co-Parenting With an Addicted Ex</Link></li>
              <li><Link to="/blog/is-my-childs-addiction-my-fault" className="text-primary hover:text-primary/80 transition-colors">Is My Child's Addiction My Fault?</Link></li>
              <li><Link to="/blog/who-should-be-at-an-intervention" className="text-primary hover:text-primary/80 transition-colors">Who Should Be at an Intervention?</Link></li>
            </ul>
          </div>

          <p className="text-foreground font-medium italic mt-8">
            If this hits close to home, listen to <Link to="/episodes" className="text-primary hover:text-primary/80">The Party Wreckers podcast</Link>, where I talk every week with families who've lived exactly this. If your family, blended or otherwise, is stuck and needs someone to help get the adults in the same room, reach out at <a href="https://freedominterventions.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">FreedomInterventions.com</a>. I'll help you find the seams before your loved one does.
          </p>
        </article>

        <FaqSection faqs={faqs} />

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

export default AddictionInBlendedFamilies;
