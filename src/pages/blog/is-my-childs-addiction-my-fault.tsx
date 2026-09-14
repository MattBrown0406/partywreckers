import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import FaqSection from "@/components/FaqSection";
import { ArrowLeft } from "lucide-react";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-is-my-childs-addiction-my-fault.jpg";

const SLUG = "is-my-childs-addiction-my-fault";
const TITLE = "Is My Child's Addiction My Fault? What I Tell Every Parent Who Asks Me That";
const DESCRIPTION =
  "Is my child's addiction my fault? An interventionist with 23 years sober explains where parent guilt comes from, why it keeps families stuck, and what to do instead.";

const faqs = [
  {
    question: "Is my child's addiction my fault if I struggled with addiction too?",
    answer:
      "No. Family history raises the risk of addiction, but risk isn't cause and it isn't blame. Many children of addicted parents never develop addiction, and many with no family history do. What you can control is being honest about your history and modeling recovery now.",
  },
  {
    question: "Why does my addicted child keep blaming me?",
    answer:
      "Because it works. Blame ends hard conversations, produces money and forgiveness, and moves the spotlight off the drinking or using. It's usually not a calculated strategy, just a learned pattern. You can acknowledge what's yours once and then redirect to the present.",
  },
  {
    question: "How do I stop feeling guilty about my child's addiction?",
    answer:
      "Speak it to a safe person, separate what you did from what addiction did, make any real amends once, and set boundaries independent of the past. Guilt fades when it stops being acted on. Counseling or a family support group speeds this up considerably.",
  },
  {
    question: "Should I apologize to my addicted child for past mistakes?",
    answer:
      "If the mistakes were real, yes, one clear apology is healthy. But don't apologize repeatedly, don't apologize while they're intoxicated, and don't attach money or dropped boundaries to it. An amends is a statement, not a payment plan.",
  },
];

const IsMyChildsAddictionMyFault = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${TITLE} — Party Wreckers`}
        description={DESCRIPTION}
        canonical={`/blog/${SLUG}`}
        ogType="article"
        ogImage={blogImage}
        keywords="is my child's addiction my fault, parent guilt addiction, blaming yourself addiction, parents of addicts, amends, Matt Brown interventionist"
        publishedTime="2026-09-14"
      />

      <ArticleJsonLd
        title={TITLE}
        description={DESCRIPTION}
        image={blogImage}
        datePublished="2026-09-14"
        dateModified="2026-09-14"
        slug={SLUG}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: "Is My Child's Addiction My Fault?", url: `/blog/${SLUG}` },
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
            alt="A mother in her sixties sitting alone on the edge of a bed at dawn, hands clasped, looking down in thought"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
            width={1344}
            height={768}
          />
          <p className="text-muted-foreground text-sm mb-2">September 14, 2026</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {TITLE}
          </h1>
        </header>

        <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />

        <ArticleAnswerSummary slug={SLUG} />

        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <p>
            There is a question I get asked on almost every first phone call with a parent. Sometimes it comes out in the first two minutes. Sometimes it takes forty. But it's always in the room, and it usually sounds like this: "Is my child's addiction my fault?"
          </p>

          <p>
            I know the question well because my own mother asked it. Not to me. To herself, for years, while I was drinking and lying and disappearing. She went back through my childhood like a detective looking for the moment she broke me. The divorce. The move. The years she worked too much. She built a whole case against herself, and all it produced was exhaustion.
          </p>

          <p>
            Here's what I've learned in 23 years of sobriety and two decades of walking into living rooms where families are asking that same question: the guilt feels like accountability, but it works like anesthesia. So let's talk about it honestly.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">Is My Child's Addiction My Fault? The Short Answer</h2>

          <p>
            No, your child's addiction is not your fault. Addiction develops from a mix of genetics, brain chemistry, environment, timing, and choices, and no single parent controls that mix. You may have made mistakes, but mistakes don't manufacture addiction, and plenty of kids from painful homes never become addicted while plenty from loving homes do.
          </p>

          <p>
            That answer is true, and I know it's unsatisfying. Parents asking this question aren't really asking for a verdict. They're asking whether there was a version of them that could have prevented this. Probably not, and either way, that version of you isn't available anymore. The only parent who can help your child now is the one reading this.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">Where Parent Guilt About Addiction Comes From</h2>

          <p>
            Parent guilt about a child's addiction usually comes from three places: real mistakes that got magnified, the need to feel in control, and a culture that still blames families for addiction. Understanding the source doesn't make the guilt disappear, but it does make it easier to stop obeying it.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">The magnified mistake</h3>

          <p>
            Every parent has a list. The night you lost your temper. The year you were checked out because of your own marriage, drinking, or grief. Those moments were real. But addiction takes an ordinary imperfect childhood and reframes every flaw as the cause. My mother wasn't perfect. She was also not the reason I drank the way I drank.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">The control trade</h3>

          <p>
            This one is sneaky. If it's your fault, you're still in charge. You caused it, so you can fix it. Guilt gives you a job. The alternative, that your child has a disease you didn't create and can't cure, feels like falling. So a lot of parents choose guilt because it's less terrifying than the truth.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">The old script</h3>

          <p>
            For decades, treatment blamed mothers and "broken homes." That script is still in the water. Relatives repeat it. Sometimes your addicted child repeats it, because it's an effective way to end a conversation about their drinking.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">How Guilt Keeps the Whole Family Stuck</h2>

          <p>
            Guilt keeps families stuck because it makes a parent easy to move. A guilty parent hands over money, drops boundaries, and accepts blame, all in an effort to make up for something that wasn't theirs to begin with. Addiction is very good at finding that lever and pulling it.
          </p>

          <p>
            I've sat with parents paying rent for a 34-year-old because of something that happened when he was nine. I've watched a mother apologize to her high daughter, mid-intervention, for a divorce twenty years earlier. The guilt didn't make either of those kids safer. It made them more comfortable staying exactly where they were.
          </p>

          <p>Here's the pattern I see most often:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>The parent feels responsible, so every consequence feels like cruelty, and consequences disappear.</li>
            <li>The addicted child learns, quickly and without malice, that the fastest way to end a hard conversation is to bring up the past.</li>
            <li>The rest of the family, siblings especially, watches the guilty parent get played and quietly stops trusting that parent's judgment.</li>
          </ul>

          <p>
            None of that is because you're weak. Guilt and love got tangled together, and addiction is patient about untangling them in its own favor. It's also part of <Link to="/blog/family-secret-addiction-silence" className="text-primary hover:text-primary/80 transition-colors">why families stop talking about addiction</Link> in the first place.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">What Am I Actually Responsible For?</h2>

          <p>
            You are responsible for your own behavior from this point forward, not for your child's disease. That means how you respond, what you fund, what you tolerate, and whether you get help for yourself. It does not mean managing their sobriety, controlling their choices, or rewriting a childhood that already happened.
          </p>

          <p>
            This distinction changed things for my mother, and I've watched it change things for hundreds of parents since. The question is not "What did I do?" It's "What am I doing?" Only one of those has a useful answer.
          </p>

          <p>
            If there are real amends to make, make them. Once. Clearly. Then stop. A parent who apologizes for the same thing every month isn't making amends. They're paying a subscription, and the addiction is the one collecting. If you want a clearer picture of <Link to="/blog/making-amends-in-recovery" className="text-primary hover:text-primary/80 transition-colors">what making amends in recovery actually looks like</Link>, it's less apology and more changed behavior.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">What to Do Instead of Feeling Guilty</h2>

          <p>
            The alternative to guilt is not denial or coldness. It's clarity and action. Here is what I actually tell parents to do when they call me carrying this weight.
          </p>

          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Say the question out loud to one safe person.</strong> Not your addicted child. A friend in recovery, a counselor, a family support group. Guilt shrinks when spoken and grows when hidden.</li>
            <li><strong>Write two lists: what you did, and what addiction did.</strong> Be honest on the first list. Then look at the second and notice how much longer it is.</li>
            <li><strong>Separate your amends from your boundaries.</strong> You can be sorry for the past and still say no to money today. Those aren't in conflict.</li>
            <li><strong>Stop accepting the accusation in real time.</strong> When your child says "This is because of you," the answer is: "I've owned what I need to own. We're talking about today." Then return to today.</li>
            <li><strong>Get your own support before you try to fix theirs.</strong> Parents who are still drowning in guilt make poor decisions under pressure. That's not a character flaw. It's just true.</li>
          </ol>

          <h2 className="text-2xl font-bold text-foreground mt-10">What I Wish My Mother Had Known</h2>

          <p>
            My mother stopped asking whether it was her fault around the time she started asking a different question: what's true right now? What was true was that her son was in danger and her guilt wasn't helping him. She stopped defending herself and started stating facts. That shift, more than any single confrontation, is part of why I got sober on April 6, 2003.
          </p>

          <p>
            I'm a father now. I have moments where I look at one of my kids and wonder what I've passed down. I don't get to know. What I get is today, and today I can show up honest, present, and clear. That's the whole job. It was the whole job for my mother too. She just didn't know she was allowed to put the rest of it down.
          </p>

          <p>
            You're allowed to put it down. Not because you were perfect, but because carrying it isn't helping the person you're carrying it for.
          </p>

          <div className="mt-10 space-y-3">
            <h3 className="text-xl font-bold text-foreground">Related Reading</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><Link to="/blog/family-secret-addiction-silence" className="text-primary hover:text-primary/80 transition-colors">The Family Secret: How Addiction Teaches Everyone to Stop Talking</Link></li>
              <li><Link to="/blog/making-amends-in-recovery" className="text-primary hover:text-primary/80 transition-colors">What Making Amends in Recovery Actually Looks Like</Link></li>
              <li><Link to="/blog/adult-child-addiction-parents" className="text-primary hover:text-primary/80 transition-colors">When Your Adult Child Is the One With the Addiction</Link></li>
            </ul>
          </div>

          <p className="text-foreground font-medium italic mt-8">
            If this hit close to home, you're not the villain of this story. Listen to <Link to="/episodes" className="text-primary hover:text-primary/80">The Party Wreckers podcast</Link>, where I talk every week with families who've been exactly where you are. And if your family needs help now, reach out at <a href="https://freedominterventions.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">FreedomInterventions.com</a>. You don't have to have it figured out to make the call.
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

export default IsMyChildsAddictionMyFault;
