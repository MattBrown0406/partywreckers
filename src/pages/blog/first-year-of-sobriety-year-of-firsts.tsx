import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import FaqSection from "@/components/FaqSection";
import { ArrowLeft } from "lucide-react";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-first-year-sobriety-year-of-firsts.jpg";

const SLUG = "first-year-of-sobriety-year-of-firsts";
const TITLE = "The Year of Firsts: Getting Through the First Year of Sobriety One Awkward Event at a Time";
const DESCRIPTION =
  "The first year of sobriety is a year of firsts: first holiday, first wedding, first funeral without a drink. Interventionist Matt Brown on how families can help.";

const faqs = [
  {
    question: "Should we cancel holidays or events during someone's first year of sobriety?",
    answer:
      "Usually no. Canceling life teaches the person that sobriety means missing out, which is the story addiction already tells them. Keep the events, adjust the plan, and give them a clear way to leave early.",
  },
  {
    question: "Should we remove all alcohol from the house for a family gathering?",
    answer:
      "Ask the person. Some people in early recovery want a dry house and some feel embarrassed by it. There is no wrong answer, but there is a wrong process: deciding for them and announcing it in front of everyone.",
  },
  {
    question: "How do I know if an event is too risky for them to attend?",
    answer:
      "Look for three things: a plan, a person they can call, and a way to leave. If all three are missing, it is a risk. If they have all three, let them decide. They need the practice.",
  },
  {
    question: "When should a family reach out for professional help in the first year?",
    answer:
      "Reach out if there is a relapse the person will not talk about, if the old patterns of lying or hiding return, or if the family cannot agree on how to handle things. A short conversation with an interventionist or family coach can save months of guessing.",
  },
];

const FirstYearOfSobrietyYearOfFirsts = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${TITLE} — Party Wreckers`}
        description={DESCRIPTION}
        canonical={`/blog/${SLUG}`}
        ogType="article"
        ogImage={blogImage}
        keywords="first year of sobriety, year of firsts sobriety, first holiday sober, first wedding sober, early recovery family support, Matt Brown interventionist"
        publishedTime="2026-09-21"
      />

      <ArticleJsonLd
        title={TITLE}
        description={DESCRIPTION}
        image={blogImage}
        datePublished="2026-09-21"
        dateModified="2026-09-21"
        slug={SLUG}
      />

      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: "The Year of Firsts", url: `/blog/${SLUG}` },
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
            alt="A man in his early thirties standing at the edge of a wedding reception holding a glass of sparkling water while other guests raise a toast"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
            width={1344}
            height={768}
          />
          <p className="text-muted-foreground text-sm mb-2">September 21, 2026</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {TITLE}
          </h1>
        </header>

        <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />

        <ArticleAnswerSummary slug={SLUG} />

        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <p>
            About four months into my first year of sobriety, I went to a wedding. I had a plan: leave early, stand near the exit, drink so much club soda the bartender would think I had a condition. Then the toast came. A server walked down the row handing out champagne, and before I could say anything, there was a glass in my hand. Everyone stood. Everyone raised their glass. And I stood there holding a drink I did not order.
          </p>

          <p>
            I set it down. Nobody noticed. I went to the bathroom and called a sober friend from a stall, which is not the glamorous recovery moment you see in movies. But I made it home sober, and that wedding became one of the firsts I got through.
          </p>

          <p>
            The first year of sobriety is really a year of firsts. First holiday. First birthday. First wedding, first funeral, first Friday night with nothing to do. Every one of these used to have alcohol or drugs built into it, and now it does not. Families ask me what they can do to help in early recovery. A lot of the answer is in how you handle the firsts.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">Why Is the First Year of Sobriety So Full of Landmines?</h2>

          <p>
            The first year of sobriety is hard because the person is doing everything for the first time without their primary coping tool. Their brain is still healing, their routines are gone, and every event on the calendar is a test they have never taken sober. It is not weakness. It is inexperience.
          </p>

          <p>
            Someone who drank for fifteen years has fifteen years of practice at weddings and tense family dinners with a drink in hand, and zero years of practice doing those things sober. The first Thanksgiving is not just Thanksgiving. It is the first time they have ever sat through that table, that uncle, and that conversation without something to take the edge off.
          </p>

          <p>
            The events are rarely the problem. The problem is what comes with them: old friends, old places, old feelings, and a hundred small moments where a drink used to live. Recovery people call these triggers. I call them the old life showing up and asking if you are still in.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">What Are the Hardest Firsts in the First Year of Sobriety?</h2>

          <p>
            The hardest firsts are the ones tied to strong emotion, either celebration or grief. Weddings, holidays, and funerals top the list. The quieter firsts, like the first boring Saturday, catch people off guard too.
          </p>

          <p>Here is what I see most often:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li><strong>The first holiday.</strong> Family, expectations, and a fully stocked bar all in one house for days.</li>
            <li><strong>The first celebration.</strong> Weddings, birthdays, graduations. Joy is a trigger too. The old brain says, this is what drinking is for.</li>
            <li><strong>The first loss.</strong> A funeral, a breakup, a layoff. Pain used to have one solution. Now it has to be felt.</li>
            <li><strong>The first nothing.</strong> A Friday night with no plans. Boredom has ended more sobriety than any wedding ever did.</li>
          </ul>

          <p>
            My first funeral sober came in year one. I stood in the back and realized I had never once grieved anyone without being numb. I did not know what to do with my hands. It turns out you just stand there and feel it, and it does not kill you. That was news to me.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">How Can Families Support Someone Through Their First Year of Sobriety?</h2>

          <p>
            Families help most by planning ahead, asking instead of assuming, and making the event easier to get through without taking over the person's recovery. You do not have to hide every bottle in the state. You do have to stop pretending the event is normal when it is not.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">Ask before the event, not during it</h3>

          <p>
            A week before Thanksgiving, ask one question: what would make this easier for you? Then listen. Some people want the alcohol gone. Some need permission to leave early. Some want a job to do, like cooking or wrangling kids, so they are not standing around with a plate in one hand and nothing in the other. Guessing wrong feels like a setup.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">Give them an exit without making it a scene</h3>

          <p>
            Agree ahead of time that leaving is allowed. No explanation, no guilt. If your son slips out of the reception at nine instead of midnight, the right response is a text that says, proud of you, drive safe. Not, why did you leave so early.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">Do not make them the main event</h3>

          <p>
            There is a version of family support that is really family surveillance. Everybody watching the sober person's cup. Everybody talking in that careful voice. It is exhausting to be the project at the party. Treat them like a guest, keep an eye out, and save the check-in for the car ride home. If you recognize yourself in that description, read <Link to="/blog/monitoring-an-addicted-loved-one" className="text-primary hover:text-primary/80 transition-colors">why monitoring a loved one costs you your own life</Link>.
          </p>

          <h3 className="text-xl font-bold text-foreground mt-8">Get to the toast first</h3>

          <p>
            If you are hosting, have something sparkling that is not champagne, and hand it to them before the server does. If you are a guest, order the club soda with lime next to them so they are not the only one. You are not required to quit drinking because they did. You are allowed to make one toast easier.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">What If They Relapse During a First?</h2>

          <p>
            A relapse during a first-year event is common and is not the end of recovery. It is information. The response is the same as any relapse: get them back to their support the same day, skip the lecture, and look at what the event revealed so the next first goes differently. If you are in it right now, here is <Link to="/blog/what-to-do-after-a-relapse-first-24-hours" className="text-primary hover:text-primary/80 transition-colors">what to do after a relapse in the first 24 hours</Link>.
          </p>

          <p>
            The person who drinks at the first wedding and calls their sponsor that night is in better shape than the person who white-knuckles the wedding, tells no one how hard it was, and drinks alone the following Tuesday. Honesty about the firsts matters more than perfection at the firsts.
          </p>

          <p>
            If your loved one slips, ask if they are safe. Ask what they are going to do about it in the next 24 hours. Then step back and let them do it. If the answer is nothing, that is a different conversation, and it may be the one where you reach out for help.
          </p>

          <h2 className="text-2xl font-bold text-foreground mt-10">Closing Thought</h2>

          <p>
            The second holiday is easier than the first, because now there is proof. Every event survived sober becomes evidence the next time the old brain says you cannot. By my second Christmas sober I was arguing about the football game like a normal person. That came from getting through the first one badly and the second one a little better. Recovery is mostly that: a lot of a little better.
          </p>

          <p>
            And if you are the one in the first year, and somebody hands you a glass you did not ask for, set it down. Nobody is watching as closely as you think. Except the people who love you, and they are just glad you came.
          </p>

          <div className="mt-10 space-y-3">
            <h3 className="text-xl font-bold text-foreground">Related Reading</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><Link to="/blog/first-year-sobriety-what-to-expect" className="text-primary hover:text-primary/80 transition-colors">The First Year Nobody Warned Me About</Link></li>
              <li><Link to="/blog/what-to-do-after-a-relapse-first-24-hours" className="text-primary hover:text-primary/80 transition-colors">What to Do After a Relapse: The First 24 Hours</Link></li>
              <li><Link to="/blog/nobody-warned-me-about-the-boredom" className="text-primary hover:text-primary/80 transition-colors">Nobody Warned Me About the Boredom</Link></li>
            </ul>
          </div>

          <p className="text-foreground font-medium italic mt-8">
            The <Link to="/episodes" className="text-primary hover:text-primary/80">Party Wreckers podcast</Link> is where I tell the stories that do not fit in a blog post. New episodes drop weekly wherever you get your podcasts. And if your family is staring down a first and not sure how to handle it, reach out at <a href="https://freedominterventions.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">FreedomInterventions.com</a>. You do not have to figure out the year of firsts on your own.
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

export default FirstYearOfSobrietyYearOfFirsts;
