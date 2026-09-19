import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import FaqSection from "@/components/FaqSection";
import { ArrowLeft } from "lucide-react";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-monitoring-an-addicted-loved-one.jpg";

const SLUG = "monitoring-an-addicted-loved-one";
const TITLE = "Monitoring an Addicted Loved One: Why Counting Their Pills Is Costing You Your Life";
const DESCRIPTION =
  "Counting pills, checking phones, searching rooms. Interventionist Matt Brown on why monitoring an addicted loved one keeps you stuck, and what actually works.";

const faqs = [
  {
    question: "Should I check my addicted loved one's phone?",
    answer:
      "Only if you believe there's an immediate safety emergency, like an overdose or suicide risk. Ongoing phone checks to confirm drug or alcohol use don't stop the using; they teach the person to hide better and turn you into the enforcer instead of a family member. If you already know they're using, another check won't change what you need to do next.",
  },
  {
    question: "Is monitoring an addicted loved one a form of enabling?",
    answer:
      "It can be. Monitoring shifts responsibility for the addiction onto the family, which lets the addicted person avoid feeling the consequences of their own choices. It also keeps the family locked in the addiction cycle instead of preparing a real response like treatment or an intervention.",
  },
  {
    question: "What should I do if I find drugs or alcohol in my house?",
    answer:
      "Decide ahead of time what your response will be, and follow through calmly. Tell your loved one what you found and what happens now, without a lecture. If you don't have a plan yet, that's the signal to call a professional and build one before the next time.",
  },
  {
    question: "Should I drug test my adult child at home?",
    answer:
      "Home drug testing rarely works long-term. Tests are easy to beat, they create constant conflict, and a clean result doesn't mean the problem is solved. Testing is most useful when it's part of a structured treatment or monitoring program run by professionals, not a parent standing outside a bathroom door.",
  },
  {
    question: "How do I stop worrying if I stop monitoring?",
    answer:
      "You replace watching with planning. Know what treatment options exist, know your own limits, and have support of your own, like a family group or a coach. The fear doesn't disappear, but it stops running your day once you have something concrete to do with it.",
  },
  {
    question: "When should I call an interventionist instead of watching and waiting?",
    answer:
      "If you've known about the addiction for months, you've confirmed it more than once, and nothing has changed, it's time. An interventionist helps the family stop managing the addiction and start responding to it with a plan the addicted person can actually say yes to.",
  },
];

const MonitoringAnAddictedLovedOne = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${TITLE} — Party Wreckers`}
        description={DESCRIPTION}
        canonical={`/blog/${SLUG}`}
        ogType="article"
        ogImage={blogImage}
        keywords="monitoring an addicted loved one, counting pills, checking phone addiction, drug testing adult child, Matt Brown interventionist"
        publishedTime="2026-09-19"
      />

      <ArticleJsonLd
        title={TITLE}
        description={DESCRIPTION}
        image={blogImage}
        datePublished="2026-09-19"
        dateModified="2026-09-19"
        slug={SLUG}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: "Monitoring an Addicted Loved One", url: `/blog/${SLUG}` },
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
            alt="A woman in her late fifties sitting alone on the edge of a bed at night holding a prescription bottle and her phone"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
            width={1344}
            height={768}
          />
          <p className="text-muted-foreground text-sm mb-2">September 19, 2026</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {TITLE}
          </h1>
        </header>

        <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />

        <ArticleAnswerSummary slug={SLUG} />

        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <p>
            A mother once told me she could tell from the driveway whether her son had used that day. The angle he parked. Whether the porch light was on. She'd developed a whole detective system: counting pills in a bottle she'd hidden in her closet, checking his location on her phone every twenty minutes, doing a sweep of his room while he showered. She was exhausted, and she was very, very good at it. What she wasn't good at anymore was sleeping, working, or talking to her other kids.
          </p>

          <p>
            I recognized her, because I was on the other side of that system once. My family monitored me too. And I want to tell you something that might sting: monitoring an addicted loved one has almost never stopped anyone from using. I know, because it didn't stop me. It just taught me to get better at hiding.
          </p>

          <p>
            This one's about surveillance. The counting, the checking, the tracking, the sniffing. Why families do it, why it doesn't work, and what to do with all that energy instead.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">Why Do Families Start Monitoring an Addicted Loved One?</h2>

          <p>
            Families monitor because it feels like control in a situation that has none. If you can't stop the drinking, at least you can know about it. Knowing feels like doing something, and doing something feels better than sitting with fear.
          </p>

          <p>
            There's also a practical origin story. Usually monitoring starts with one real event. You found the bottle. You saw the text. Something got confirmed, and now you can't unsee it. So you start looking for the next one, and the next one, until looking becomes the job. It's the same nervous system that keeps a family <Link to="/blog/family-constant-alert" className="text-primary hover:text-primary/80 transition-colors">walking on eggshells around an addicted loved one</Link>.
          </p>

          <p>
            I want to be fair here: the instinct is love. Nobody counts pills because they're bored. They count pills because they're terrified of a phone call at 3 a.m. That fear is legitimate. The strategy is what's broken.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">What Monitoring an Addicted Loved One Actually Does</h2>

          <p>
            Monitoring shifts the responsibility for the addiction from the person who has it onto the person watching. That's the core problem. The moment you become the pill-counter, the addiction becomes something the two of you are managing together, and the addicted person gets to stop managing it at all.
          </p>

          <p>Here's what it looked like from my side, back when I was the one being watched:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li><strong>I learned the schedule.</strong> If someone checks the bottle Sunday night, you use Monday morning and top it off Saturday. Addicts are excellent project managers when the project is using.</li>
            <li><strong>I got angrier, and I used the anger.</strong> Every search of my room gave me a fresh reason to feel wronged, and feeling wronged is great fuel for drinking. "They don't trust me anyway" is a very comfortable place to drink from.</li>
            <li><strong>I stopped having to feel anything about my own behavior.</strong> My family was doing all the worrying. Why would I add to it?</li>
          </ul>

          <p>
            The person being watched doesn't get sober from being watched. They get sneaky. And the person watching doesn't get peace. They get a second full-time job with no pay and no days off.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">Is Checking Their Phone or Room Ever Okay?</h2>

          <p>
            There is one situation where I'll tell a family to look: immediate safety. If you believe someone may have overdosed, is suicidal, or a child is in danger, you open the door, you check, you call for help. That isn't surveillance. That's a rescue, and it's a one-time act with a clear purpose. If that's where you are, build an <Link to="/blog/overdose-safety-plan-for-families" className="text-primary hover:text-primary/80 transition-colors">overdose safety plan</Link> before you need it.
          </p>

          <p>
            Everything else is different. Ongoing monitoring to confirm what you already know isn't safety. It's evidence-gathering for a trial that's never going to be held. Ask yourself this honestly: if you found what you're looking for, what would you do differently tomorrow? If the answer is "nothing, I'd just know," then the search isn't for them. It's a way to manage your own anxiety, and it's a bad one.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">The question that ends most searches</h3>

          <p>
            When a family member tells me they need to check the phone "just to be sure," I ask: sure of what? You already know. You've known for a while. The last twelve searches confirmed it. The thirteenth won't change the situation, but it will cost you another night.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">What to Do With All That Energy Instead</h2>

          <p>
            The energy you spend monitoring an addicted loved one is real energy, and it can go somewhere useful. The shift is from watching them to preparing yourself. Here's what that looks like in practice.
          </p>

          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Stop the secret surveillance and say so.</strong> Out loud. "I've been checking your phone and counting your pills. I'm going to stop, because it isn't helping either of us. I know what's happening. You don't have to hide it from me, and I'm not going to pretend I don't see it." That sentence changes the whole relationship. It takes the game away.</li>
            <li><strong>Replace the question "Did they use today?" with "What is my plan?"</strong> Families spend years knowing exactly what their loved one did last night and having no idea what they themselves will do next month. Flip that ratio.</li>
            <li><strong>Decide your actual limits and put them in writing.</strong> Not threats. Limits. What you will and won't fund, allow in your home, or cover for. That's the real work of <Link to="/blog/enabling-vs-supporting-boundaries" className="text-primary hover:text-primary/80 transition-colors">setting boundaries with an addicted loved one</Link>. Then live by them whether or not you found anything in the drawer.</li>
            <li><strong>Get eyes on the actual solution.</strong> Talk to a professional about what treatment options exist, what it would cost, and <Link to="/blog/what-to-expect-when-you-call-an-interventionist" className="text-primary hover:text-primary/80 transition-colors">what to expect when you call an interventionist</Link>. Do this before the next crisis, not during it.</li>
            <li><strong>Put the time back into your life.</strong> The Monday night calls, the gym, dinner with your other kids, whatever it is. Your addicted loved one will notice you have a life again. That's not cruelty. That's a mirror.</li>
          </ol>

          <p>
            You'll feel worse for about a week. Not knowing is its own kind of terror, and you've been medicating it with information. But the fear settles, and what replaces it is something you haven't had in a long time: your own attention.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">What Happened With the Mom in the Driveway</h2>

          <p>
            She stopped. It took her a couple of tries, and she cheated once, which she told me about with real embarrassment. But she stopped. She told her son what she'd been doing and that she was done. She told him what she would do if she found drugs in her home again, and what she would help pay for if he wanted treatment.
          </p>

          <p>
            He didn't get sober that week. Nobody does on that timeline. But about two months later he asked her for the number of the place she'd mentioned. He said, and she quoted this to me, "I figured you'd stopped caring." She hadn't. She'd just stopped watching. And with nobody watching, he finally had to look at himself.
          </p>

          <p>
            That's the whole trade. You give up knowing, and they get handed back the weight. Sometimes that weight is what finally moves them.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">Closing Thought</h2>

          <p>
            I was watched for years, and I got very good at being watched. The thing that eventually got through to me wasn't a search. It was people who loved me deciding they were going to live their lives and offering me a door if I wanted one. Put down the pill bottle. You already know what's in it. Pick up your own life instead, and get somebody in your corner who can help you plan what comes next.
          </p>

          <div className="mt-10 space-y-3">
            <h3 className="text-xl font-bold text-foreground">Related Reading</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><Link to="/blog/family-constant-alert" className="text-primary hover:text-primary/80 transition-colors">The Family on Constant Alert</Link></li>
              <li><Link to="/blog/enabling-vs-supporting-boundaries" className="text-primary hover:text-primary/80 transition-colors">Enabling vs. Supporting: Where the Boundary Goes</Link></li>
              <li><Link to="/blog/giving-money-to-an-addicted-loved-one" className="text-primary hover:text-primary/80 transition-colors">The Loan That Was Never a Loan</Link></li>
            </ul>
          </div>

          <p className="text-foreground font-medium italic mt-8">
            If this sounds like your house, you're not alone and you're not crazy. Listen to <Link to="/episodes" className="text-primary hover:text-primary/80">The Party Wreckers podcast</Link> for real conversations about what families go through and what actually helps. And when you're ready to talk about a plan, reach out at <a href="https://freedominterventions.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">FreedomInterventions.com</a>. I'd rather help you build the next step than have you count one more pill.
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

export default MonitoringAnAddictedLovedOne;
