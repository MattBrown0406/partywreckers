import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import blogImage from "@/assets/blog-grandparents-raising-grandchildren.jpg";

const faqs = [
  {
    question: "Is addiction really a common reason grandparents raise grandchildren?",
    answer:
      "Yes. Parental substance use is one of the leading reasons children end up in a grandparent's care, alongside incarceration and death — which are often addiction-related themselves. If you're in this situation, you are far from alone.",
  },
  {
    question: "Should I pursue legal custody or guardianship of my grandchild?",
    answer:
      "In most cases, some formal legal arrangement is worth exploring, because it lets you enroll the child in school, consent to medical care, and provide stability. Talk to a family law attorney or a kinship care program in your state. Informal arrangements often collapse at the worst moments.",
  },
  {
    question: "Should my grandchild still see their addicted parent?",
    answer:
      "Contact can be healthy when the parent is sober and safe, and harmful when they're not. A clear rule — sober visits only, supervised if needed — protects the child and gives the parent a concrete reason to pursue recovery.",
  },
  {
    question: "Am I enabling my adult child by raising their kids?",
    answer:
      "No. Protecting children from the consequences of addiction is not enabling — it's the whole point. Enabling is protecting the addicted adult from their consequences. Keep the kids safe; let the adult feel the weight of their choices.",
  },
  {
    question: "Can my adult child still recover?",
    answer:
      "Yes. Recovery is always possible, but it can't be purchased for someone. Support treatment relentlessly; stop funding everything else.",
  },
  {
    question: "Where can grandparents raising grandchildren find help?",
    answer:
      "Start with your state's kinship care or relative caregiver program, a local support group for families of addicted loved ones, and — if the family is stuck — a professional interventionist who can help you address the addiction itself, not just its fallout.",
  },
];

const GrandparentsRaisingGrandchildrenAddiction = () => {
  const url = "https://partywreckers.com/blog/grandparents-raising-grandchildren-addiction";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "When Grandparents Become Parents Again: Raising Grandchildren Because of Addiction",
    image: [new URL(blogImage, "https://partywreckers.com").href],
    datePublished: "2026-07-14",
    author: { "@type": "Person", name: "Matt Brown" },
    publisher: { "@type": "Organization", name: "The Party Wreckers Podcast" },
    mainEntityOfPage: url,
    description:
      "Millions of grandparents are raising grandchildren because of addiction. An interventionist explains the grief, the boundaries, and where to find real support.",
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Grandparents Raising Grandchildren Because of Addiction | Party Wreckers"
        description="Millions of grandparents are raising grandchildren because of addiction. An interventionist explains the grief, the boundaries, and where to find real support."
        canonical="/blog/grandparents-raising-grandchildren-addiction"
        ogType="article"
        ogImage={blogImage}
        keywords="grandparents raising grandchildren because of addiction, kinship care, family addiction, grandparent boundaries, addicted adult child"
        publishedTime="July 14, 2026"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <header className="mb-8">
          <img
            src={blogImage}
            alt="A grandmother and grandfather sitting on a couch in a warm living room with a young grandchild between them"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
            width={1024}
            height={1024}
          />
          <p className="text-muted-foreground text-sm mb-2">July 14, 2026 · By Matt Brown</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            When Grandparents Become Parents Again: Raising Grandchildren Because of Addiction
          </h1>
        </header>

        <ArticleAnswerSummary slug="grandparents-raising-grandchildren-addiction" />

        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <p>
            Last year I became a grandfather. Holding that baby rearranged something in me. And almost immediately, my mind went to the grandparents I meet in my work — the ones who aren&#x2019;t just visiting their grandkids on Sundays, but raising them. Packing lunches at 68. Learning the school pickup line at 71. Grandparents raising grandchildren because of addiction is one of the most common and least talked-about realities I see as an interventionist. If that&#x2019;s you, this one&#x2019;s for you.
          </p>
          <p>
            You did your parenting. You were supposed to be done. And then addiction took your adult child out of commission — through active use, through jail, through treatment, or through death — and a small person needed someone. So you said yes. Of course you did.
          </p>
          <p>
            Here&#x2019;s what I want you to know: saying yes to your grandchild does not mean saying yes to everything else. Let&#x2019;s talk about it.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Why Are So Many Grandparents Raising Their Grandchildren?</h2>
          <p>
            Addiction is one of the leading reasons grandparents end up raising grandchildren. When a parent&#x2019;s substance use makes the home unsafe — or when overdose, incarceration, or treatment removes them entirely — grandparents are usually the first call, long before the foster system.
          </p>
          <p>
            Millions of children in this country live in a grandparent&#x2019;s care, and in a large share of those homes, a parent&#x2019;s drug or alcohol use is the reason. I see it constantly. The family quietly reorganizes around the crisis, Grandma becomes Mom again, and everyone acts like it&#x2019;s temporary. Sometimes it is. Often it isn&#x2019;t.
          </p>
          <p>
            If this is your situation, the first thing to hear is this: you&#x2019;re not an exception or a failure. You&#x2019;re part of an enormous, mostly invisible group of people doing the hardest volunteer work in America.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">The Grief Nobody Names</h2>
          <p>
            Grandparents in this position carry a double grief. You&#x2019;re grieving the adult child addiction has taken from you — the person they were, the parent they were supposed to be. And you&#x2019;re grieving the retirement, the rest, the version of grandparenting you expected: the fun one, the spoil-them-and-send-them-home one.
          </p>
          <p>
            Most grandparents I meet won&#x2019;t say any of that out loud. It feels disloyal. How can I grieve my own life when this child lost their parent? So the grief goes underground, and it comes out sideways — as exhaustion, resentment, health problems, or a short fuse with a kid who didn&#x2019;t cause any of this.
          </p>
          <p className="text-foreground font-medium">
            Name the grief. To a friend, a counselor, a support group, God — somewhere. Grief that gets named gets smaller. Grief that gets buried runs the house.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">How Do You Talk to Grandchildren About Their Parent&#x2019;s Addiction?</h2>
          <p>
            Tell the truth in age-sized pieces. Kids don&#x2019;t need details, but they do need three things said plainly: your mom or dad has a sickness called addiction, it is not your fault, and you are safe here.
          </p>
          <p>
            Silence doesn&#x2019;t protect children — it teaches them the topic is too dangerous to touch, and they fill the silence with self-blame. Kids are world-class at making everything their fault. If nobody explains why Dad disappeared, a seven-year-old will quietly conclude it was something they did.
          </p>
          <p>A few things that help:</p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/80">
            <li>Use simple, honest language: &#x201C;Your mom has an illness that makes her make unsafe choices. Doctors and helpers are trying to help her.&#x201D;</li>
            <li>Repeat &#x201C;it&#x2019;s not your fault&#x201D; more times than feels necessary. Once is not enough.</li>
            <li>Let them love their parent. Don&#x2019;t make the child carry your anger at your adult child. They need permission to miss their mom without betraying you.</li>
          </ul>
          <p>You don&#x2019;t have to get the words perfect. Present and honest beats polished and avoidant every time.</p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Boundaries With Your Adult Child When You&#x2019;re Raising Their Kids</h2>
          <p>
            This is the hardest part, so I&#x2019;ll be direct: raising your grandchild and rescuing your adult child are two different jobs, and you cannot do both. Caring for the grandkids is love. Handing your adult child money, cover stories, and consequence-free chaos is not — that&#x2019;s fuel.
          </p>
          <p>
            I was on the other side of this once. Twenty-three years ago, I was the adult child a family didn&#x2019;t know what to do with. The people who loved me most kept softening my landings, and every soft landing bought me more time to keep using. What finally helped me wasn&#x2019;t another rescue. It was people who loved me enough to stop.
          </p>
          <p>Some boundaries worth considering:</p>
          <ul className="list-disc pl-6 space-y-2 text-foreground/80">
            <li>Visits with the kids happen sober, or they don&#x2019;t happen. No exceptions, no negotiations in front of the children.</li>
            <li>You will always support treatment — rides, phone calls, showing up at family programs. You will not fund the addiction, pay the fines it creates, or lie to cover for it.</li>
            <li>Your home has rules. Living there, or even landing there for &#x201C;a few days,&#x201D; requires sobriety and respect for the kids&#x2019; stability.</li>
          </ul>
          <p>
            Boundaries like these will feel cruel the first time you hold them. They&#x2019;re not. They&#x2019;re the most loving sentence you can say to someone in active addiction: I love you too much to help you stay sick.
          </p>
          <p>
            For more on this distinction, see our guide on <Link to="/enabling-vs-support" className="text-primary hover:underline">enabling vs. supporting</Link>.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">You Can&#x2019;t Pour From an Empty Grandparent</h2>
          <p>
            Take care of yourself, and don&#x2019;t treat it as optional. Grandparents raising grandchildren because of addiction burn out at alarming rates — physically, financially, emotionally — and a collapsed grandparent helps no one.
          </p>
          <p>
            Practical places to start: ask about kinship care support in your state (many states offer financial help, respite care, and legal aid to relative caregivers); find a support group for kinship families or families of addicted loved ones — sitting in a room with people who get it changes everything; and see your own doctor, because chronic stress is not a personality trait, it&#x2019;s a health risk.
          </p>
          <p>
            And get support for the family disease, not just the childcare logistics. Addiction reorganizes entire families. The grandparents who do best are the ones who get help for themselves, whether or not their adult child ever accepts it.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">You Said Yes to the Right Thing</h2>
          <p>
            If you&#x2019;re raising a grandchild because addiction took a parent off the field, you stepped into a gap most people never see. It&#x2019;s heavy. It&#x2019;s not what you planned. And it matters more than almost anything else you&#x2019;ll ever do.
          </p>
          <p>
            You don&#x2019;t have to carry it perfectly. You don&#x2019;t have to carry it silently. And you don&#x2019;t have to give up on your adult child to protect their kids — you just have to stop confusing rescue with love. Hope, in my experience, isn&#x2019;t a feeling. It&#x2019;s a next step, taken today. Take one.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Frequently Asked Questions</h2>
          {faqs.map((f) => (
            <div key={f.question} className="mb-4">
              <h3 className="text-xl font-semibold text-foreground mb-2">{f.question}</h3>
              <p>{f.answer}</p>
            </div>
          ))}

          <div className="mt-10 p-6 rounded-lg border border-border bg-muted/30">
            <h2 className="text-2xl font-bold text-foreground mb-3">You Don&#x2019;t Have to Do This Alone</h2>
            <p>
              If this hit close to home, keep listening to The Party Wreckers, where we talk every week with families walking through exactly this. For more on next steps, explore our guides on <Link to="/family-addiction-help" className="text-primary hover:underline">family addiction help</Link>, <Link to="/blog/when-to-consider-intervention" className="text-primary hover:underline">when to consider an intervention</Link>, and <Link to="/blog/how-to-choose-an-interventionist" className="text-primary hover:underline">how to choose an interventionist</Link>.
            </p>
            <p className="mt-3">— Matt Brown</p>
          </div>
        </article>

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

export default GrandparentsRaisingGrandchildrenAddiction;
