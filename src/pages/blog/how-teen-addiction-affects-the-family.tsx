import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-teen-addiction-whole-family.jpg";

const SLUG = "how-teen-addiction-affects-the-family";
const TITLE = "When the Addict Is Still a Kid: How Teen Addiction Affects the Whole Family";
const DESCRIPTION =
  "How teen addiction affects the family: the fear, the fights between parents, the siblings who go quiet, and what to do when the person in trouble is still a kid.";

const faqs = [
  {
    question: "How does teen addiction affect the family?",
    answer:
      "Teen addiction pulls the whole household into crisis mode. Parents split into strict and lenient roles and start fighting each other, siblings withdraw and become invisible, and the family isolates out of shame. Because parents remain legally responsible for a minor, they cannot detach the way families of addicted adults sometimes can.",
  },
  {
    question: "What should parents do if their teenager is using drugs or alcohol?",
    answer:
      "Start with a professional assessment from someone who specializes in adolescents, not a general addiction program. Then get both parents aligned on a single plan before confronting the teen. Tell at least one trusted adult outside the family, and protect regular, ordinary time with any siblings in the house.",
  },
  {
    question: "Is my teenager's addiction my fault as a parent?",
    answer:
      "No. Addiction is driven by genetics, brain development, trauma, and environment, and it shows up in families with every kind of parenting. Blaming yourself mostly produces shame, and shame keeps families silent and stuck. What you control is your response from here forward.",
  },
  {
    question: "How do I protect my other children when their sibling is addicted?",
    answer:
      "Give them one thing that is consistently about them: a ride, a meal, ten minutes at bedtime where their sibling is not the topic. Tell them the truth in age-appropriate terms so they are not left guessing. And watch the child who seems fine most closely, because that is usually the one who has learned to disappear.",
  },
  {
    question: "Can you do an intervention on a teenager?",
    answer:
      "Yes, but it looks different than an adult intervention. With minors, the process focuses on getting the parents unified, setting clear expectations, and having treatment arranged in advance. It is less about persuasion and more about the family calmly executing a decision they have already made.",
  },
  {
    question: "When should a family get outside help for a teenager's substance use?",
    answer:
      "Sooner than feels comfortable. If you have found substances more than once, if grades or friends have changed suddenly, or if you and your co-parent cannot agree on what to do, it is time. Waiting for proof that it is \u201creal\u201d addiction usually means waiting for something dangerous to happen first.",
  },
];

const TeenAddictionWholeFamily = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${TITLE} — Party Wreckers`}
        description={DESCRIPTION}
        canonical={`/blog/${SLUG}`}
        ogType="article"
        ogImage={blogImage}
        keywords="how teen addiction affects the family, teenage addiction, parents of addicted teens, siblings of addicted teen, teen intervention, Matt Brown interventionist"
        publishedTime="2026-09-13"
      />

      <ArticleJsonLd
        title={TITLE}
        description={DESCRIPTION}
        image={blogImage}
        datePublished="2026-09-13"
        dateModified="2026-09-13"
        slug={SLUG}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: "How Teen Addiction Affects the Whole Family", url: `/blog/${SLUG}` },
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
          <img
            src={blogImage}
            alt="Two worried parents sitting apart at a kitchen table late at night with an empty chair between them"
            className="w-full rounded-lg shadow-lg"
            width={1024}
            height={1024}
          />
        </div>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{TITLE}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>By Matt Brown</span>
            <span>|</span>
            <time dateTime="2026-09-13">September 13, 2026</time>
          </div>
        </header>

        <div className="mb-8">
          <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />
        </div>

        <ArticleAnswerSummary slug={SLUG} />

        <div className="prose prose-lg max-w-none text-foreground">
          <p>
            I was sixteen the first time my mother searched my room. I know that because I remember standing in the doorway watching her, and I remember the thing I felt was not guilt. It was contempt. She was crying and going through my dresser and I stood there thinking she was the one with the problem.
          </p>

          <p>
            Twenty-plus years sober now, I still think about her hands in that drawer. I have spent two decades sitting with parents doing the exact same thing, and I finally understand it. She was not looking for pills. She was looking for her kid.
          </p>

          <p>
            Most of what gets written about how teen addiction affects the family focuses on the teenager. But there is a whole house full of people getting rearranged by that one bedroom, and almost nobody is watching them. Today, that is who we are talking about.
          </p>

          <h2>Why Is Teen Addiction Harder on a Family Than Adult Addiction?</h2>

          <p>
            Teen addiction hits families harder in one specific way: you are still legally and morally responsible for the person who is hurting you. With an adult child, a spouse, or a parent, you eventually get to say "this is your life." With a fifteen-year-old, you cannot. They live in your house, eat your food, and ride in your car, and you are still the one who is supposed to keep them alive.
          </p>

          <p>
            That responsibility removes every exit. You cannot detach. You cannot let them hit bottom, because their bottom might be a funeral. So most parents do the only thing left: they tighten their grip. Tracking apps. Drug tests. Searched rooms. Locks on the liquor cabinet, then the medicine cabinet, then their own bedroom door.
          </p>

          <p>
            None of that is wrong, exactly. It just turns a home into a checkpoint. And the teenager, already wired to push against control, now has a real reason to lie. The addiction and the adolescence start working together, and the family cannot tell which one they are fighting.
          </p>

          <h2>How Teen Addiction Affects the Family: Parents Start Fighting Each Other</h2>

          <p>
            The most predictable effect of a teenager's addiction is that the parents turn on each other. One goes hard and one goes soft, and within six months they are angrier at each other than at the drugs. I have seen it in married couples, divorced couples, and couples who were fine until they found the vape pen that was not nicotine.
          </p>

          <p>
            Both parents are terrified, and terror needs somewhere to go. The strict parent is terrified the kid will die, so they clamp down. The lenient parent is terrified the kid will run, so they keep the door open. Each looks at the other and sees the reason it is not working. The teenager learns very quickly which parent to go to for what.
          </p>

          <p>
            Hear me: your spouse is not the enemy. You are both looking at the same fire and reaching for different hoses. Pick a position together, even an imperfect one, and hold it. A consistent B-minus plan beats two competing A-plus plans every time.
          </p>

          <h2>What Happens to the Other Kids?</h2>

          <p>
            The siblings of a teenager in addiction almost always disappear. Not physically. They just go quiet, get good, stop needing things, and slide out of the center of the family while everyone is looking at the crisis. I did this to my own siblings and did not notice for years.
          </p>

          <p>
            Younger siblings watch everything. They learn that the way to get attention in this house is to be a problem. Some file that away and use it later. Others become so responsible, so easy, so fine, that nobody checks on them until they are twenty-five and falling apart in a therapist's office. If you want the longer version of that, read more about{" "}
            <Link to="/blog/parentified-child-addiction-family" className="text-primary hover:underline">
              the child who grows up too fast in an addicted family
            </Link>
            .
          </p>

          <p>
            I know you have nothing left to give. But the siblings do not need much. They need one thing to be about them. A drive to school where nobody mentions their brother. Ten minutes at bedtime where you ask about their day and actually listen. That is not nothing. That is the whole thing.
          </p>

          <h2>Why Do Parents of Addicted Teens Feel So Ashamed?</h2>

          <p>
            Parents of addicted teenagers carry a particular kind of shame, because a teenager's problems are read as a parent's failure. Nobody says it to your face. They do not have to. You say it to yourself at two in the morning while you wait for the garage door.
          </p>

          <p>
            This shame is why families stay silent so long. You do not tell the school. You do not tell your sister. You definitely do not tell the other parents at the game. The silence feels protective. It is actually the thing that keeps you from getting help — the same dynamic behind{" "}
            <Link to="/blog/family-secret-addiction-silence" className="text-primary hover:underline">
              the family secret nobody talks about
            </Link>
            .
          </p>

          <p>
            What I wish someone had said to my mother: this is not a referendum on your parenting. Good parents raise addicted kids. Terrible parents raise sober ones. Addiction does not check your credentials at the door. What you control is what you do now, and shame is the biggest thing standing between you and doing it.
          </p>

          <h2>What Can a Family Actually Do About a Teenager's Addiction?</h2>

          <p>
            Families of addicted teenagers can do more than families of addicted adults, not less, because they still have leverage and legal authority. Use both. Here is where I would start:
          </p>

          <ol>
            <li><strong>Get an assessment from someone who treats adolescents specifically.</strong> Teen substance use is not adult substance use in a smaller body.</li>
            <li><strong>Get the parents in the same room</strong>, with a professional if needed, before you do anything else. If you cannot agree on the plan, the plan will not survive contact with your kid.</li>
            <li><strong>Stop investigating and start deciding.</strong> You already know enough. Another search of the room will not change what needs to happen next; it just delays it.</li>
            <li><strong>Tell one trusted adult outside the house.</strong> You need one place where you do not have to pretend.</li>
            <li><strong>Put something on the calendar for the other kids</strong> that has nothing to do with the crisis. Then keep it, even the week things blow up. Especially that week.</li>
          </ol>

          <p>
            And if you have tried all of that and your teenager is still slipping away, it may be time to bring in someone whose whole job is this. An intervention for a teenager looks different than one for an adult. It is quieter, and more about the parents than the kid. But it works, and it works better the earlier you do it. Here is{" "}
            <Link to="/blog/what-to-expect-when-you-call-an-interventionist" className="text-primary hover:underline">
              what to expect when you call an interventionist
            </Link>
            .
          </p>

          <h2>A Word to the Parent Reading This at Two in the Morning</h2>

          <p>
            It took me years to be able to say thank you to my mother for going through that drawer. So I am saying it to you too, because you are her, sitting up in the dark, wondering if you are ruining your child by caring too much or not enough.
          </p>

          <p>
            You are not ruining anything. You are doing the hardest job there is with no manual and no sleep. Your kid is still in there. I was contemptuous and dishonest and sixteen, and I still made it out.
          </p>

          <p>
            Keep going. Get help. Let the other kids see your face. And stop searching the room. You already found what you were looking for. Now go get them.
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
            <h3 className="text-xl font-bold mb-2">Ready for the Next Step?</h3>
            <p>
              If this hit close to home, listen to <strong>The Party Wreckers</strong> podcast, where Matt talks every week with families who have lived through exactly this. And if your teenager is in trouble and you are done waiting,{" "}
              <a href="https://freedominterventions.com/contact" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                reach out at FreedomInterventions.com
              </a>
              . You do not have to have the whole plan. You just have to make the call.
            </p>
          </div>

          <div className="border-t border-border pt-8 mt-12">
            <h3 className="text-xl font-bold mb-4">Related Articles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog/parentified-child-addiction-family" className="text-primary hover:underline">
                  The Child Who Grew Up Too Fast
                </Link>
              </li>
              <li>
                <Link to="/blog/family-roles-in-addiction" className="text-primary hover:underline">
                  The Roles Every Family Hands Out
                </Link>
              </li>
              <li>
                <Link to="/blog/what-to-expect-when-you-call-an-interventionist" className="text-primary hover:underline">
                  What to Expect When You Call an Interventionist
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

export default TeenAddictionWholeFamily;
