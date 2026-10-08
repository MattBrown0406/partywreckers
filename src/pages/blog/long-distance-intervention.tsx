import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import FaqSection from "@/components/FaqSection";
import { ArrowLeft } from "lucide-react";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-long-distance-intervention.jpg";

const SLUG = "long-distance-intervention";
const TITLE = "My Family Lives in Four Time Zones. Can a Long-Distance Intervention Still Work?";
const DESCRIPTION =
  "Family scattered across states? A long-distance intervention can still work. Interventionist Matt Brown explains what to do in person, on video, and on paper.";

const linkClass = "text-primary hover:text-primary/80 transition-colors";
const h2 = "text-2xl font-bold text-foreground mt-10";
const h3 = "text-xl font-bold text-foreground mt-6";

const faqs = [
  { question: "Can an intervention be done over Zoom?", answer: "Yes, but it works best as a supporting tool, not the whole plan. Video is excellent for family preparation and for including people who can't travel. For the main conversation, having at least a few people physically present makes it much harder for your loved one to disconnect." },
  { question: "How many family members need to travel for a long-distance intervention?", answer: "Usually two or three. Choose the people your loved one respects most and who can stay calm under pressure. Others can participate through letters, recorded messages, or a live video call." },
  { question: "Who pays for travel in a long-distance intervention?", answer: "Families handle this many different ways, and there's no single right answer. Some split costs evenly, some pool money toward travel and treatment, and some have one person cover more. Talk about money openly during planning so it doesn't become a fight later." },
  { question: "What if the only family member nearby is burned out?", answer: "That's very common, and it's a good reason to bring in a professional. The local family member shouldn't have to carry the planning, the confrontation, and the aftermath alone. Spread out the jobs, and make sure that person gets support of their own." },
  { question: "How do far-away families stay involved after treatment starts?", answer: "Most treatment programs offer family sessions by video. Family members can also join support groups like Al-Anon or online family recovery groups, keep a regular call schedule, and help plan aftercare. Consistent, honest contact matters more than being close by." },
];

const LongDistanceIntervention = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${TITLE} | Party Wreckers`}
        description={DESCRIPTION}
        canonical={`/blog/${SLUG}`}
        ogType="article"
        ogImage={blogImage}
        keywords="long-distance intervention, family in different states, intervention over Zoom, remote intervention planning, Matt Brown interventionist"
        publishedTime="2026-10-08"
      />
      <ArticleJsonLd title={TITLE} description={DESCRIPTION} image={blogImage} datePublished="2026-10-08" dateModified="2026-10-08" slug={SLUG} />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: "Long-Distance Intervention", url: `/blog/${SLUG}` },
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
            alt="A woman in her fifties at a home desk on an evening video call with several adult family members"
            className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg mb-6"
            width={1344}
            height={768}
          />
          <p className="text-muted-foreground text-sm mb-2">October 8, 2026</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">{TITLE}</h1>
        </header>

        <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />

        <ArticleAnswerSummary slug={SLUG} />

        <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
          <p>The first planning call for that long-distance intervention had six faces on the screen and four different clocks behind them. A sister in Seattle was eating breakfast. A brother in Atlanta was in his car on lunch break. Their dad was in Phoenix, and the person they were worried about, their younger brother, was alone in a condo in Florida, drinking his way through the afternoon.</p>
          <p>Somebody finally said what everyone was thinking: "How are we supposed to do an intervention when none of us live near him?" I hear that question a lot. A long-distance intervention feels impossible to families before they start. It almost never is.</p>
          <p>I get why it feels that way. When I was drinking, distance was one of my best friends. The farther away my family was, the easier it was to sound fine on the phone. So let's talk about how families close that gap.</p>
          <h2 className={h2}>Can You Do an Intervention When Family Lives Far Away?</h2>
          <p>Yes. A long-distance intervention works when most of the preparation happens remotely and the key conversation happens in person whenever possible. Distance changes the logistics, not the purpose. The family still needs one plan, one voice, and a treatment bed ready to go.</p>
          <p>Most of what I do with a family never happens in the living room anyway. It happens in the weeks before: learning about addiction, writing letters, agreeing on boundaries, and lining up treatment. All of that can happen by phone and video. The scattered family I mentioned did every bit of their prep on video calls, and they were some of the best-prepared people I've worked with.</p>
          <h2 className={h2}>Should a Long-Distance Intervention Happen on Video or in Person?</h2>
          <p>In person is best for the actual intervention whenever you can make it happen. Video works well for planning, family education, and including people who truly can't travel. The person you love should see real faces in the room, not a laptop they can close.</p>
          <p>I've seen what happens when the whole conversation runs through a screen. The person says "my Wi-Fi is acting up," or they just hang up. It's a lot harder to walk away from your sister who flew two thousand miles to sit on your couch. Her being there says something no letter can.</p>
          <h3 className={h3}>Who Needs to Be in the Room?</h3>
          <p>You don't need the whole family there. You need two or three people who matter most to your loved one and who can stay calm. (More on <Link to="/blog/who-should-be-at-an-intervention" className={linkClass}>who should be at an intervention</Link>.) Everyone else can still take part in other ways:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Join by video from a phone or tablet, set up ahead of time by someone in the room.</li>
            <li>Write a letter that a family member reads out loud.</li>
            <li>Record a short audio or video message, under two minutes, played at the right moment.</li>
            <li>Commit to a specific role afterward, like weekly calls or attending family sessions.</li>
          </ul>
          <h2 className={h2}>How Do You Plan a Long-Distance Intervention?</h2>
          <p>Start by picking one coordinator and one location. A long-distance intervention falls apart when five people are planning five different versions of it. Decide who's in charge of communication, where the conversation will happen, and who's traveling.</p>
          <p>Here's the order I usually walk families through:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Hold a family video call to share what everyone has seen. You'll be surprised how many people are holding a different piece of the story.</li>
            <li>Bring in a professional interventionist early, before anyone confronts anyone. Here's <Link to="/blog/how-to-choose-an-interventionist" className={linkClass}>how to choose an interventionist</Link>.</li>
            <li>Choose the date around the person's patterns, usually a morning when they're most likely to be sober.</li>
            <li>Book travel for the people who will be in the room, with a flexible return date.</li>
            <li>Line up a treatment bed and confirm insurance or payment before anyone gets on a plane.</li>
            <li>Plan transportation from the intervention to treatment, including who rides along.</li>
            <li>Do one full rehearsal on video, with every letter read out loud.</li>
          </ol>
          <h3 className={h3}>Keep the Secret Without Keeping Secrets</h3>
          <p>Scattered families are often used to talking around each other instead of to each other. Group texts, side conversations, and "don't tell Mom I told you" are how a lot of families survive addiction. For this to work, everyone involved needs the same information at the same time. One group thread, one plan.</p>
          <h2 className={h2}>What Are the Biggest Mistakes With a Long-Distance Intervention?</h2>
          <p>The biggest mistake is letting distance become a reason to wait. Families tell themselves they'll handle it at Thanksgiving, or when Dad visits in the spring. Meanwhile the person is getting sicker by themselves.</p>
          <p>A few other mistakes I see often:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Showing up with no plan.</strong> A surprise visit without treatment lined up usually turns into a fight and a long flight home.</li>
            <li><strong>Letting the nearby relative carry everything.</strong> The one sibling who lives close often gets stuck doing every rescue. That person needs backup, not more chores.</li>
            <li><strong>Using video as the only plan because it's easier.</strong> Easy for the family isn't the same as effective for your loved one.</li>
            <li><strong>Forgetting the day after.</strong> The far-away family members go home, and the person in treatment feels the room empty out.</li>
          </ul>
          <h2 className={h2}>What Happens After the Family Flies Home?</h2>
          <p>This is where distance actually helps. Recovery support can travel anywhere a phone can. Once your loved one is in treatment, family programs, weekly calls, and online support groups keep everyone connected no matter where they live.</p>
          <p>That Florida family? The brother agreed to go. His sister flew back to Seattle two days later, but she joined every family session by video. Their dad started going to an Al-Anon meeting in Phoenix. The brother told me months later that the thing that got him wasn't the letters. It was watching his dad walk through the door with a carry-on bag. "He hates flying," he said. "I knew it was real."</p>
          <h2 className={h2}>Distance Isn't the Thing Keeping Your Family Stuck</h2>
          <p>If you're reading this from a different state than the person you're worried about, I know the helplessness. You lie awake thinking about every phone call that went to voicemail. You wonder if you'll be the one who gets the bad news.</p>
          <p>But distance is a logistics problem, and logistics problems have answers. The harder part is deciding to act together. Once a family does that, the miles matter a lot less than they thought.</p>

          <div className="mt-10 space-y-3">
            <h3 className="text-xl font-bold text-foreground">Related Reading</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><Link to="/blog/who-should-be-at-an-intervention" className={linkClass}>Who Should Be at an Intervention?</Link></li>
              <li><Link to="/blog/how-to-choose-an-interventionist" className={linkClass}>How to Choose an Interventionist</Link></li>
              <li><Link to="/blog/intervention-after-failed-rehab" className={linkClass}>Can an Intervention After Failed Rehab Still Work?</Link></li>
            </ul>
          </div>

          <p className="text-foreground font-medium italic mt-8">
            If your family is spread across the map, you're not alone, and you're not out of options. Listen to <Link to="/episodes" className={linkClass}>The Party Wreckers podcast</Link> for real stories from the intervention world. And if you're ready to stop waiting for the next holiday to do something, <a href="https://freedominterventions.com" target="_blank" rel="noopener noreferrer" className={linkClass}>talk to an interventionist today</a> at FreedomInterventions.com. We work with families wherever they live, and we'll help you build a plan that brings everyone to the same table.
          </p>
        </article>

        <FaqSection title="Frequently Asked Questions About Long-Distance Intervention" faqs={faqs} />

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

export default LongDistanceIntervention;
