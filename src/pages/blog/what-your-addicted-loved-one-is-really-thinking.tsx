import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import { ArrowLeft } from "lucide-react";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-end-of-the-table.jpg";

const SLUG = "what-your-addicted-loved-one-is-really-thinking";
const TITLE = "I Was the One at the End of the Table: What Your Addicted Loved One Is Really Thinking";
const DESCRIPTION =
  "A 23-years-sober interventionist reveals what your addicted loved one is thinking when you confront them — and what actually gets through. From someone who lived it.";

const faqs = [
  {
    question: "Does my addicted loved one know they have a problem?",
    answer:
      "Almost certainly, yes. Denial is rarely true blindness — it's a defense against shame. Your job isn't to convince them there's a problem; it's to make change feel safer than staying the same.",
  },
  {
    question: "Why does my loved one get angry when I bring up their addiction?",
    answer:
      "Anger is a bodyguard for fear and shame. Confrontation threatens the substance, which the addicted brain treats as survival gear. The anger usually isn't about you, even when it's aimed at you.",
  },
  {
    question: "Do guilt trips ever work on someone with addiction?",
    answer:
      "In my experience, no. Guilt feeds shame, and shame drives use. Calm boundaries and consistent consequences reach people far more reliably than emotional pressure ever does.",
  },
  {
    question: "What should I say to someone in active addiction?",
    answer:
      "Keep it short and repeatable: what you see, what you'll no longer do, and what you'll do the moment they're ready. One caring sentence delivered consistently beats a prepared speech delivered once.",
  },
  {
    question: "When is it time to call a professional interventionist?",
    answer:
      "When the same conversation keeps happening with the same result, or when things are escalating faster than the family can respond. If you're asking the question, it's usually time for at least a consultation.",
  },
];

const WhatYourAddictedLovedOneIsReallyThinking = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${TITLE} — Party Wreckers`}
        description={DESCRIPTION}
        canonical={`/blog/${SLUG}`}
        ogType="article"
        ogImage={blogImage}
        keywords="what your addicted loved one is thinking, confronting an addict, why addicts get angry, guilt trips addiction, how to talk to someone in active addiction"
        publishedTime="2026-08-04"
      />

      <ArticleJsonLd
        title={TITLE}
        description={DESCRIPTION}
        image={blogImage}
        datePublished="2026-08-04"
        dateModified="2026-08-04"
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
          <img
            src={blogImage}
            alt="A man in his early 30s sitting at the end of a kitchen table with blurred family members gathered at the other end"
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
            <time dateTime="2026-08-04">August 4, 2026</time>
          </div>
        </header>

        <div className="mb-8">
          <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />
        </div>

        <ArticleAnswerSummary slug={SLUG} />

        <div className="prose prose-lg max-w-none text-foreground">
          <p>
            Before I ever sat in a living room as a professional interventionist, I sat in one as the problem. My family didn't hire anyone. They just cornered me in my mother's kitchen one afternoon, and my sister said the sentence every family eventually says: "We're worried about you."
          </p>

          <p>
            I remember exactly what I was thinking. It wasn't gratitude. It wasn't relief. And it definitely wasn't "they're right." If you're trying to reach someone you love right now, understanding what your addicted loved one is thinking during those conversations might be the most useful thing I can give you. Because I've been on both sides of that table, and the view is completely different from each seat.
          </p>

          <p>So let me tell you what was actually going on in my head — and what finally got through.</p>

          <h2>What Is Your Addicted Loved One Actually Thinking When You Confront Them?</h2>

          <p>
            Here's the direct answer: they are almost never thinking about whether you're right. They're thinking about how to make the conversation end. In active addiction, every confrontation registers as a threat to the one thing keeping the whole fragile system running — the substance — and the brain goes straight to defense.
          </p>

          <p>
            That afternoon in my mother's kitchen, I nodded. I said I understood. I may have even teared up, and some of that was real. But underneath the nodding, a much faster calculation was running: What do I need to say to get out of this room? What do they actually know versus what are they guessing? Who told them what?
          </p>

          <p>
            I wasn't a monster. I loved my family. But addiction had turned me into a full-time defense attorney for my own worst habit, and I was good at my job.
          </p>

          <h2>The Three Voices Running in My Head</h2>

          <p>
            Looking back — and after twenty-plus years of sitting with families as an interventionist — I can name the three voices that were talking over my sister that day. Your loved one likely has the same three.
          </p>

          <ul>
            <li>
              <strong>Fear.</strong> Not fear of dying, oddly. Fear of living without the substance. The drink and the drug weren't my problem in my mind — they were my solution. You were asking me to hand over my life raft in the middle of the ocean.
            </li>
            <li>
              <strong>Shame.</strong> I knew. Please hear that: I knew. Nobody was informing me of anything. The shame was so loud that any confrontation, however gentle, felt like being handed a mirror I'd been avoiding for years. Shame doesn't produce surrender. It produces defense.
            </li>
            <li>
              <strong>Calculation.</strong> The addicted mind is a brilliant negotiator. While you're speaking from your heart, it's scanning for loopholes: Which family member is the softest? What promise will buy me a month? "You're right, I'll cut back" is not a commitment. It's an exit strategy.
            </li>
          </ul>

          <p>
            None of this means the conversation is pointless. It means the conversation has to be built for the audience it's actually reaching.
          </p>

          <h3>Why "Do You Know What You're Doing to Us?" Never Worked on Me</h3>

          <p>
            The short answer: yes, I knew, and the knowing made me use more. Guilt is fuel for addiction, not a brake. When my family listed the ways I was hurting them, I didn't experience a wake-up call. I experienced more evidence that I was exactly the failure I already believed I was — and I treated that feeling the only way I knew how.
          </p>

          <p>
            This is the hardest thing for families to accept, and I say it with love: the speech you've been rehearsing, the one that finally makes them see — it usually doesn't exist. Not because your loved one doesn't care about you. Because the disease has a firewall built specifically for that speech.
          </p>

          <p>What got past my firewall wasn't an argument. Arguments I could win. I'd been training for years.</p>

          <h3>What Finally Got Through to Me</h3>

          <p>Two things reached me, and neither was clever.</p>

          <p>
            The first was consistency without rescue. Somewhere along the line, the people around me stopped absorbing my consequences. Nobody screamed. Nobody lectured. The safety net just quietly came down, and for the first time, the full weight of my life landed on me instead of on them. Addiction can argue with words all day. It has a much harder time arguing with reality.
          </p>

          <p>
            The second was one calm sentence from someone who loved me: "You don't have to live like this, and when you're ready, I'll help you get well — but I won't help you stay sick." No anger. No script. A door, left open, with the terms clearly posted.
          </p>

          <p>
            I got sober on April 6, 2003. Twenty-three years later, I still remember that sentence better than any lecture I ever received. That's not an accident. It's the whole blueprint.
          </p>

          <h2>What This Means for Your Next Conversation</h2>

          <p>
            If you're wondering what your addicted loved one is thinking so you can plan your next move, here's what I'd tell you to do differently — the things I now build into every intervention I lead:
          </p>

          <ul>
            <li>
              <strong>Trade the courtroom for the doorway.</strong> Skip the prosecution — the evidence, the timeline, the witnesses. State what you see, say what you'll do, and leave the door open. Short beats thorough.
            </li>
            <li>
              <strong>Stop negotiating with the calculator.</strong> Vague promises ("I'll slow down," "after the holidays") are the disease buying time. A real response is a concrete step with a date attached. Everything else is weather.
            </li>
            <li>
              <strong>Let consequences do the talking.</strong> Every consequence you absorb is one your loved one doesn't feel. You're not punishing them by stepping back — you're{" "}
              <Link to="/blog/helping-vs-enabling" className="text-primary hover:underline">
                letting reality get a word in
              </Link>
              .
            </li>
          </ul>

          <p>
            And if the conversations keep going in circles, bring in help. Not because you've failed, but because you're too close. I couldn't hear my own family, but I could hear someone who'd been where I was. That's most of the reason I do this work. If you're not sure where you are in that process,{" "}
            <Link to="/blog/stop-waiting-for-a-sign-when-to-call-professional-interventionist" className="text-primary hover:underline">
              here's how to know when it's time to call a professional
            </Link>
            .
          </p>

          <h2>The Person Under the Addiction Is Still In There</h2>

          <p>
            One more thing, because families forget it in the exhaustion: while all that fear and shame and calculation was running, another part of me was watching my family fight for me. It couldn't speak up yet. But it kept score.
          </p>

          <p>
            Every calm boundary, every open door, every "when you're ready" — the real me was collecting them like stones to stand on later. When I finally surrendered, those stones were what I walked across to get out.
          </p>

          <p>
            Your loved one is keeping score too. Keep giving them stones. Just stop giving them softness where the disease can hide.
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
            <h3 className="text-xl font-bold mb-2">You Don't Have to Figure This Out Alone</h3>
            <p>
              If someone you love is at the end of the table right now, I hope this helps you see past the nodding and the promises to what's really going on underneath. There's a person in there keeping score. Reach for that person. For more from the other side of the table, listen to{" "}
              <Link to="/episodes" className="text-primary hover:underline">
                The Party Wreckers podcast
              </Link>{" "}
              — wherever you get your podcasts. And if your family is ready for help now, reach out through{" "}
              <a
                href="https://freedominterventions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                FreedomInterventions.com
              </a>
              . I answer those messages personally.
            </p>
          </div>

          <div className="border-t border-border pt-8 mt-12">
            <h3 className="text-xl font-bold mb-4">Related Articles</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog/i-didnt-want-to-get-sober" className="text-primary hover:underline">
                  I Didn't Want to Get Sober. I Got Sober Anyway.
                </Link>
              </li>
              <li>
                <Link to="/blog/the-phone-call-you-keep-not-making" className="text-primary hover:underline">
                  The Phone Call You Keep Not Making
                </Link>
              </li>
              <li>
                <Link to="/blog/who-should-be-at-an-intervention" className="text-primary hover:underline">
                  Who Should Be at an Intervention?
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

export default WhatYourAddictedLovedOneIsReallyThinking;
