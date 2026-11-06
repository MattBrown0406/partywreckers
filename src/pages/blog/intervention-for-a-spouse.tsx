import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import FaqSection from "@/components/FaqSection";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-intervention-for-a-spouse.jpg";

const SLUG = "intervention-for-a-spouse";
const TITLE = "Intervention for a Spouse: What I Tell Husbands and Wives Who Are Scared to Wreck the Marriage";
const DESCRIPTION = "Thinking about an intervention for a spouse? Interventionist Matt Brown shares how to plan it, stay safe, and what really happens to the marriage after.";
const linkClass = "text-primary hover:text-primary/80 transition-colors";
const h2 = "text-2xl font-bold text-foreground mt-10";
const h3 = "text-xl font-bold text-foreground mt-8";
const faqs = [
  { question: "Can I do an intervention on my spouse by myself?", answer: "You can, but I don't recommend it. A one-on-one talk is easy for your spouse to dismiss as just another fight. A small, prepared group, ideally guided by a professional interventionist, carries more weight and keeps the conversation from turning into a marital argument." },
  { question: "Will an intervention on my husband or wife lead to divorce?", answer: "An intervention doesn't cause divorce; untreated addiction is far more likely to end a marriage. Many couples rebuild after treatment, especially when both partners get support. The intervention is often the first truly honest conversation the marriage has had in years." },
  { question: "What if my spouse is a high-functioning alcoholic?", answer: "High-functioning doesn't mean healthy. Spouses usually see the problem first because they see what happens after work and on weekends. A professional interventionist can help you put what you're seeing into words that are much harder to brush off." },
  { question: "Should I tell my spouse an intervention is coming?", answer: "It depends on your spouse, your safety, and your family. Some interventions are a surprise; others use an invitational approach where the person is told ahead of time. A professional interventionist will help you choose the approach that fits." },
  { question: "How much does an intervention for a spouse cost?", answer: "Costs vary based on the interventionist, travel, and how much support is included after treatment begins. Insurance may cover parts of treatment, though rarely the intervention itself. A consultation call is the best way to understand your options before committing to anything." },
];

const InterventionForASpouse = () => (
  <div className="min-h-screen bg-background">
    <SEOHead title={`${TITLE} | Party Wreckers`} description={DESCRIPTION} canonical={`/blog/${SLUG}`} ogType="article" ogImage={blogImage} keywords="intervention for a spouse, intervention for husband, intervention for wife, addiction and marriage, Matt Brown" publishedTime="2026-11-06" />
    <ArticleJsonLd title={TITLE} description={DESCRIPTION} image={blogImage} datePublished="2026-11-06" dateModified="2026-11-06" slug={SLUG} />
    <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }, { name: "Intervention for a Spouse", url: `/blog/${SLUG}` }]} />
    <FAQJsonLd faqs={faqs} />
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-8 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link>
      <header className="mb-8">
        <img src={blogImage} alt="A worried woman in her late thirties whispering on the phone from the driver's seat of her car parked in a dark garage at night" className="w-full aspect-video object-cover rounded-lg mb-6" width={1536} height={864} />
        <p className="text-muted-foreground text-sm mb-2">By Matt Brown · November 6, 2026</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">{TITLE}</h1>
      </header>
      <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />
      <ArticleAnswerSummary slug={SLUG} />
      <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>The call came in at 9:40 on a Tuesday night, and the woman on the other end was whispering. She was sitting in her car, in her own garage, because it was the only place he couldn't hear her. "I think I need an intervention for my husband," she said. "But if I do this, I don't know if we'll still be married when it's over."</p>
        <p>I've gotten some version of that call, a husband or wife quietly asking about an intervention for a spouse, more times than I can count in 20-plus years of doing this work. (Details changed, as always. But the whisper is real. It's almost always a whisper.)</p>
        <p>I understand it from the other side, too. Twenty-two years ago, I was the guy people whispered about. The people who loved me had to decide whether saying it out loud was worth the blowup. I'm grateful every single day that they decided it was.</p>
        <p>So here's what I want you to know up front: you're not wrecking your marriage. Addiction is already doing that. You'd be wrecking the party it's been throwing in your house.</p>

        <h2 className={h2}>What Is an Intervention for a Spouse?</h2>
        <p>An intervention for a spouse is a planned, guided conversation where you, usually alongside a few other people who love your partner, ask your husband or wife to accept help for their addiction. It works like any other intervention, with one big difference: the person leading the charge shares a bed, a bank account, and often kids with the person being confronted.</p>
        <p>That difference changes the whole plan. When a parent intervenes on an adult child, they get to go home afterward. When you intervene on your spouse, you are home. Whatever happens in that room follows you into the kitchen that night.</p>

        <h2 className={h2}>Why Does an Intervention on Your Husband or Wife Feel Like Betrayal?</h2>
        <p>Almost every spouse tells me it feels like going behind their partner's back. That feeling is normal, and it's also the disease talking, just through you.</p>
        <p>Addiction trains families to keep secrets. Over the years, you learned that protecting the marriage meant protecting the drinking or using: covering for missed work, smoothing things over with friends, keeping the peace at all costs. So the moment you consider telling the truth to other people, every instinct you've built screams "traitor."</p>
        <p>Here's how I reframe it: loyalty to your partner and loyalty to their addiction are not the same thing. You only get to pick one. An intervention is you picking the person.</p>

        <h2 className={h2}>How Do You Plan an Intervention for a Spouse Without Making Things Worse?</h2>
        <p>You plan it quietly, carefully, and with your own safety and finances handled first. Spouses have more to protect than anyone else in the family, so the prep work has to cover more ground.</p>
        <p>Here's what I walk husbands and wives through before we ever set a date:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li><strong>Get honest about safety.</strong> If your spouse has ever been violent or threatening, or you're afraid of how they'll react, tell your interventionist on the very first call. That changes the plan, sometimes completely. If you're ever in immediate danger, call 911.</li>
          <li><strong>Know your financial picture.</strong> Find out what's in the accounts, what your insurance covers for treatment, and who can access what. Not to punish anyone. Just so you're not blindsided.</li>
          <li><strong>Decide your bottom line before you're in the room.</strong> What will you do if they say no? Separate bedrooms? Ask them to leave? Only say what you'll actually follow through on.</li>
          <li><strong>Line up treatment in advance.</strong> The bed should be held and the bag packed before the conversation starts. A yes with nowhere to go turns into "I'll go Monday."</li>
          <li><strong>Get your own support.</strong> Al-Anon, a therapist, a friend who knows the whole story. You can't carry this and the marriage with nobody holding you up.</li>
          <li><strong>Don't tip your hand.</strong> Spouses are the most likely to blurt it out mid-fight: "Your whole family's worried about you!" Understandable. It's also how interventions fall apart.</li>
        </ol>

        <h2 className={h2}>Who Should Be in the Room When You Intervene on Your Spouse?</h2>
        <p>Keep the group small and choose people your spouse respects, not just the people who are angriest. Usually that's three to six people: you, maybe a parent or sibling of theirs, a close friend, sometimes an adult child. If you're wondering <Link to="/blog/who-should-be-at-an-intervention" className={linkClass}>who should be at an intervention</Link>, that post walks through the whole team.</p>
        <h3 className={h3}>Should our kids be part of it?</h3>
        <p>Young children should not be in the room. Period. Older teens and adult children sometimes can be, but only if they want to and only after we've talked it through with them. A letter they write can be just as powerful as their presence, and sometimes more.</p>
        <h3 className={h3}>What if my spouse's family takes sides?</h3>
        <p>It happens a lot. In-laws often defend their kid out of reflex. A good interventionist talks with every potential team member ahead of time, and anyone who can't commit to the plan stays home. One person undermining the room does more damage than an empty chair.</p>

        <h2 className={h2}>What Happens to the Marriage After an Intervention for a Spouse?</h2>
        <p>The marriage changes, and that's the point. Some couples come out the other side closer than they've been in years. Some don't. But I've rarely seen a marriage survive untreated addiction in any shape the spouse would actually want.</p>
        <p>When your partner goes to treatment, you'll have your own work to do: family programs, your own meetings, and learning to retire from your job as the household's full-time detective. Recovery asks both people to change, not just the one who went away.</p>
        <p>And if your spouse says no? Your bottom line kicks in, and that's not the end of the story. Plenty of people I've worked with said no in the living room and yes three days later, once they realized their husband or wife meant every word.</p>

        <h2 className={h2}>You're Not the Bad Guy Here</h2>
        <p>The woman in the garage went through with it. Her husband was furious for about forty minutes. Then he cried. Then he got in the car.</p>
        <p>I can't promise you that ending. Nobody honest can. What I can promise is that waiting doesn't make this easier, and silence has never gotten one person sober. You love your spouse enough to be scared. Love them enough to act, too.</p>
      </article>
      <FaqSection title="Frequently Asked Questions About Intervention for a Spouse" faqs={faqs} />
      <section className="prose prose-lg max-w-none text-foreground/90 space-y-6 mt-10">
        <h2 className={h2}>Listen, Follow, and Reach Out</h2>
        <p>If this one hit close to home, listen to <Link to="/episodes" className={linkClass}>The Party Wreckers podcast</Link> wherever you get your podcasts. Follow me, Matt Brown, for more straight talk on addiction and the people it touches. And if you're ready to talk about an intervention for your spouse, <a href="https://freedominterventions.com/contact" target="_blank" rel="noopener noreferrer" className={linkClass}>reach out to my team at FreedomInterventions.com</a>. You don't have to whisper this one alone.</p>
        <h3 className={h3}>Related Reading</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><Link to="/blog/who-should-be-at-an-intervention" className={linkClass}>Who Should Be at an Intervention? Building the Right Team</Link></li>
          <li><Link to="/blog/intervention-objections-ill-go-monday" className={linkClass}>"I'll Go Monday": The Intervention Objections I Hear Every Week</Link></li>
        </ul>
      </section>
      <div className="mt-12 pt-8 border-t"><Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link></div>
    </main>
    <Footer />
  </div>
);

export default InterventionForASpouse;
