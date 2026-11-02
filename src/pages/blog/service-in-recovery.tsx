import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import SocialShareButtons from "@/components/SocialShareButtons";
import ArticleAnswerSummary from "@/components/ArticleAnswerSummary";
import FaqSection from "@/components/FaqSection";
import { ArticleJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import blogImage from "@/assets/blog-service-in-recovery.jpg";

const SLUG = "service-in-recovery";
const TITLE = "Service in Recovery: The Year I Made the Coffee (and Why It Kept Me Sober)";
const DESCRIPTION = "At 90 days sober I got handed the coffee job. How service in recovery got me out of my own head, and why helping others keeps me sober 22 years later.";
const linkClass = "text-primary hover:text-primary/80 transition-colors";
const h2 = "text-2xl font-bold text-foreground mt-10";
const faqs = [
  { question: "What does service mean in addiction recovery?", answer: "Service means helping others without expecting anything in return. In recovery, that can include setting up meetings, making coffee, sponsoring, or simply talking with a newcomer. It shifts your focus off yourself, which is the opposite of how addiction operates." },
  { question: "How soon in sobriety can you start doing service?", answer: "You can start on day one. Many simple jobs, like setting up chairs or greeting people at the door, need no clean time at all. Bigger roles, like sponsoring or holding a group position, usually come later, once you have some stability." },
  { question: "Does doing service actually help prevent relapse?", answer: "Many people in long-term recovery credit service as a key part of staying sober. It builds connection, accountability, and purpose, and those are the things that isolation and addiction take away." },
  { question: "Can you do too much service in recovery?", answer: "Yes. If service becomes a way to avoid your feelings, prove your worth, or please everyone, it can lead to burnout and resentment. Healthy service is balanced with rest, honesty, and taking care of your own recovery first." },
  { question: "How can family members practice service in their own recovery?", answer: "Family members can attend support groups like Al-Anon, share their experience with other families, and help newcomers feel less alone. The key difference is that healthy service is a choice, not rescuing or covering for the person who is still using." },
];

const ServiceInRecovery = () => (
  <div className="min-h-screen bg-background">
    <SEOHead title={`${TITLE} | Party Wreckers`} description={DESCRIPTION} canonical={`/blog/${SLUG}`} ogType="article" ogImage={blogImage} keywords="service in recovery, helping others in sobriety, AA service work, early sobriety, Matt Brown" publishedTime="2026-11-02" />
    <ArticleJsonLd title={TITLE} description={DESCRIPTION} image={blogImage} datePublished="2026-11-02" dateModified="2026-11-02" slug={SLUG} />
    <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }, { name: "Service in Recovery", url: `/blog/${SLUG}` }]} />
    <FAQJsonLd faqs={faqs} />
    <Navbar />
    <main className="container mx-auto px-4 pt-24 pb-8 max-w-4xl">
      <Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-6"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link>
      <header className="mb-8">
        <img src={blogImage} alt="A young adult man in a flannel shirt pouring coffee from a large urn into cups in a church basement meeting room" className="w-full aspect-video object-cover rounded-lg mb-6" width={1344} height={768} />
        <p className="text-muted-foreground text-sm mb-2">By Matt Brown · November 2, 2026</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">{TITLE}</h1>
      </header>
      <SocialShareButtons url={`https://partywreckers.com/blog/${SLUG}`} title={TITLE} />
      <ArticleAnswerSummary slug={SLUG} />
      <article className="prose prose-lg max-w-none text-foreground/90 space-y-6">
        <p>At about ninety days sober, an old-timer at my home group handed me a key and said, "You're on coffee. Tuesdays. Six-fifteen." That was it. No welcome speech, no job description. Just a key to a church basement, a 40-cup urn, and my first real lesson in service in recovery.</p>
        <p>I was insulted. I wish I were kidding. A few months earlier I'd been convinced I was the smartest guy in every room, and now I was measuring Folgers into a filter at dawn for a bunch of people who were mostly going to complain that it was too weak. That coffee job turned out to be one of the most important things that ever happened to me.</p>
        <p>Twenty-two years later, I'm an interventionist. Helping people is literally my job. But I learned the real lesson in that basement, with coffee grounds on my shoes.</p>

        <h2 className={h2}>What Is Service in Recovery?</h2>
        <p>Service in recovery means doing something useful for other people, usually without being paid or praised for it. It can be as small as setting up chairs or as big as sponsoring someone. The point isn't the task. The point is getting out of your own head long enough to show up for somebody else.</p>
        <p>In active addiction, my whole world was me. What I wanted, what I needed, how I felt, who had wronged me. Every decision ran through one question: what's in it for me? Service flips that question around. It's a small, daily practice of thinking about someone else first.</p>

        <h2 className={h2}>Why Does Service in Recovery Work When Willpower Doesn't?</h2>
        <p>Service works because it gives you something addiction can't: a reason to show up that isn't about you. It builds accountability, connection, and self-respect at the same time. And it does it through action, not through thinking, which is good, because my thinking was the problem.</p>
        <p>Here's what that coffee job actually did for me:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>It got me out of bed.</strong> When you're the coffee guy, twenty people are counting on you. On the mornings I didn't care about myself, I still didn't want to be the reason there was no coffee.</li>
          <li><strong>It made me part of something.</strong> I wasn't the new guy standing in the back anymore. People knew my name because they knew my coffee.</li>
          <li><strong>It gave me self-respect I couldn't think my way into.</strong> I'd spent years feeling like a fraud. Showing up every Tuesday for a year was a small, boring, undeniable fact. I did that. Nobody could argue with it, including me.</li>
          <li><strong>It kept me close to newcomers.</strong> Every week I'd see someone walk in shaking, and I'd remember exactly where I'd been. That's the best relapse prevention I know.</li>
        </ul>
        <p>There's an old saying in the rooms that you can't keep it unless you give it away. I used to roll my eyes at that one. Now I think it's the whole program in one sentence.</p>

        <h2 className={h2}>What Counts as Service in Early Sobriety?</h2>
        <p>Almost anything that helps someone else counts as service in early sobriety. You don't need years of clean time, a good story, or a single wise thing to say. You just need to be willing to show up and do something useful.</p>
        <p>If you're new and wondering where to start, try one of these:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Make the coffee, or ask the person who does if they need help.</li>
          <li>Set up chairs before the meeting or stack them after.</li>
          <li>Stand at the door and say hello to people as they come in.</li>
          <li>Clean up. Wipe tables, take out the trash, wash the mugs nobody else will touch.</li>
          <li>Pick up the phone when someone newer than you calls. Even if you're only two weeks ahead of them.</li>
        </ol>
        <p>None of these are glamorous. My ego wanted a speaking slot and a round of applause. What I needed was a sponge and a little humility.</p>

        <h2 className={h2}>When Does Service Turn Into People-Pleasing?</h2>
        <p>Service turns into people-pleasing when you're doing it to be liked, to avoid your own feelings, or because you can't say no. Healthy service leaves you more connected. Unhealthy service leaves you resentful and exhausted.</p>
        <p>I'll be honest: around year two, I overdid it. I was chairing meetings, sponsoring too many guys, answering every phone call at all hours. It looked great. Inside, I was running from my own stuff, just in a more respectable way. My sponsor finally asked me, "When's the last time you did any of this for you?" I didn't have an answer.</p>

        <h2 className={h2}>A Note for Families</h2>
        <p>If you love someone in addiction, this part matters for you, too. A lot of family members have been in "service" for years: covering, rescuing, fixing, smoothing things over. That isn't service. That's survival. Real service includes taking care of yourself so you have something left to give.</p>

        <h2 className={h2}>What Does Service in Recovery Look Like 22 Years Later?</h2>
        <p>Twenty-two years in, service looks like my work, my family, and still, occasionally, a stack of folding chairs. I wreck parties for a living now. The party of active addiction, that is. I get called into living rooms on the worst day of a family's life, and I get to say, "There's a way out. I know, because I took it."</p>
        <p>But I don't count my job as my service. It's too easy to hide behind a business card. So <Link to="/blog/why-i-still-go-to-meetings-after-23-years-sober" className={linkClass}>I still go to meetings</Link>. I still take the late-night call from a guy at thirty days who's white-knuckling it. And every so often I still get there early and make the coffee, because it keeps me honest about where I came from.</p>
        <p>That old-timer passed away years ago. I never really thanked him for that key. I think he'd tell me I'm thanking him every time I hand it to someone else.</p>

        <h2 className={h2}>If You're New, Here's Your Key</h2>
        <p>If you're early in sobriety and feel useless, restless, or stuck in your own head, find one small way to be of service this week. Don't wait until you feel ready or worthy. The feeling follows the action, not the other way around.</p>
        <p>And if you're a family member watching someone you love struggle, hold on to this: the person you're scared for might one day be the one holding the door for someone else. I've watched it happen hundreds of times. I was one of them.</p>
        <p>Make the coffee. Show up. Let it change you.</p>
      </article>
      <FaqSection title="Frequently Asked Questions About Service in Recovery" faqs={faqs} />
      <section className="prose prose-lg max-w-none text-foreground/90 space-y-6 mt-10">
        <h2 className={h2}>Keep the Conversation Going</h2>
        <p>If this story hit home, listen to <Link to="/episodes" className={linkClass}>The Party Wreckers podcast</Link>, where I talk honestly about addiction, intervention, and what recovery actually looks like day to day. Follow me for new episodes and articles. And if someone you love is struggling right now, you don't have to figure this out alone. <a href="https://freedominterventions.com/contact" target="_blank" rel="noopener noreferrer" className={linkClass}>Reach out to my team at FreedomInterventions.com</a>. We help families every day, and the first call is where the way out begins.</p>
        <h3 className="text-xl font-bold text-foreground mt-8">Related Reading</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><Link to="/blog/why-i-still-go-to-meetings-after-23-years-sober" className={linkClass}>Long-Term Sobriety: Why I Still Go to Meetings After 23 Years</Link></li>
          <li><Link to="/blog/resentment-in-recovery" className={linkClass}>Resentment in Recovery: The List I Didn't Want to Write</Link></li>
        </ul>
      </section>
      <div className="mt-12 pt-8 border-t"><Link to="/blog" className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"><ArrowLeft className="w-4 h-4 mr-2" />Back to Blog</Link></div>
    </main>
    <Footer />
  </div>
);

export default ServiceInRecovery;
