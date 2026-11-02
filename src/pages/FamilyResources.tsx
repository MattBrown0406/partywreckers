import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import AeoAnswerBlock from "@/components/AeoAnswerBlock";
import { FAQJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { 
  Heart, 
  BookOpen, 
  Users, 
  Phone, 
  MessageCircle, 
  Shield, 
  ExternalLink,
  Headphones,
  FileText,
  Video,
  AlertCircle,
  CheckCircle,
  Clock,
  MapPin,
  Lightbulb,
  UserCheck,
  AlertTriangle,
  HandHeart,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { primaryAeoAnswers } from "@/lib/aeoContent";

const coreConcepts = [
  {
    id: "moral-failure",
    title: "Addiction Is Not a Moral Failure",
    content: "Addiction is best understood as a chronic stress-related disorder that affects judgment, impulse control, and emotional regulation. This doesn't excuse harmful behavior, but it does explain why willpower, logic, or consequences alone rarely lead to lasting change."
  },
  {
    id: "family-adapts",
    title: "Families Adapt to Addiction—Often Without Realizing It",
    content: "Over time, families reorganize themselves around addiction in an attempt to reduce chaos or prevent harm. These adaptations are usually driven by love and fear, not dysfunction—but they can unintentionally keep unhealthy patterns in place."
  },
  {
    id: "helping-enabling",
    title: "Helping and Enabling Are Not the Same Thing",
    content: "Helping supports growth, responsibility, and accountability. Enabling reduces discomfort in the short term while increasing long-term harm. The difference is not intention—it's outcome. Understanding this distinction is critical for families trying to change course."
  },
  {
    id: "boundaries",
    title: "Boundaries Are About Self-Protection, Not Control",
    content: "Boundaries are not punishments, threats, or ultimatums. They are clear limits that define what you will and will not participate in. Effective boundaries are calm, consistent, and focused on your behavior—not on forcing someone else to change."
  },
  {
    id: "worse-before-better",
    title: "Why Things Often Get Worse Before They Get Better",
    content: "When families begin to change—setting boundaries, stopping rescue behaviors, or speaking more honestly—resistance is common. Escalation does not mean you're doing something wrong; it often means old patterns are being disrupted."
  },
  {
    id: "family-support",
    title: "Families Need Support Too",
    content: "Addiction isolates families and quietly drains emotional and physical resources. Support for families is not a luxury or a sign of failure—it's a necessary part of restoring stability, clarity, and health within the system."
  }
];

const professionalGuidanceTopics = [
  {
    id: "signs-stuck",
    title: "Common Signs Families Are Stuck",
    content: (
      <div className="space-y-3">
        <p className="text-muted-foreground mb-3">It may be time for outside guidance if:</p>
        <ul className="space-y-2 text-foreground/90">
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>The same conversations keep happening with no lasting change</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Boundaries are set, then repeatedly broken or walked back</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Fear or urgency is driving decisions</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Family members are divided or in conflict with one another</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Finances, safety, or emotional health are deteriorating</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>The situation escalates during crises, then returns to "normal"</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Everyone is exhausted, but no one knows what to do differently</li>
        </ul>
        <p className="text-muted-foreground mt-4 italic">These are not signs your family has failed. They are signs the current approach is not working.</p>
      </div>
    )
  },
  {
    id: "what-guidance-does",
    title: "What Professional Guidance Actually Does",
    content: (
      <div className="space-y-3">
        <p className="text-muted-foreground mb-3">A lot of families wait too long because they think outside help means giving up control or forcing treatment. Done well, guidance helps families:</p>
        <ul className="space-y-2 text-foreground/90">
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Understand what's realistic—and what isn't</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Stop reacting to manipulation, threats, or emotional volatility</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Align family members around a clear, consistent approach</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Set boundaries that can actually be held</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Reduce chaos while increasing safety and stability</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Make decisions based on strategy rather than fear</li>
        </ul>
        <p className="text-foreground font-medium mt-4">Even when your loved one is not ready, family guidance can still change the direction of the situation.</p>
      </div>
    )
  },
  {
    id: "waiting-risky",
    title: "When Waiting Becomes Risky",
    content: (
      <div className="space-y-3">
        <p className="text-muted-foreground mb-3">Waiting usually feels less risky than acting, but that is often how families drift deeper into the problem. Guidance matters even more when:</p>
        <ul className="space-y-2 text-foreground/90">
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>There is risk of overdose, violence, or self-harm</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Legal, medical, or child-safety issues are present</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>Substance use is escalating or becoming more unpredictable</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>The family is absorbing consequences to keep peace</li>
        </ul>
        <p className="text-foreground font-medium mt-4">The sooner families get clear, the less likely they are to keep making fear-based decisions.</p>
      </div>
    )
  },
  {
    id: "what-it-doesnt-mean",
    title: "What Reaching Out Does Not Mean",
    content: (
      <div className="space-y-3">
        <p className="text-muted-foreground mb-3">Reaching out for help does not mean:</p>
        <ul className="space-y-2 text-foreground/90">
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>You're committing to an intervention</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>You're giving up on your loved one</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>You're being disloyal or punitive</li>
          <li className="flex items-start gap-2"><span className="text-primary mt-1">•</span>You have to act immediately</li>
        </ul>
        <p className="text-foreground font-medium mt-4">It means you are getting clear before things get even harder.</p>
      </div>
    )
  },
  {
    id: "steadier-forward",
    title: "A Steadier Way Forward",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground">Professional guidance gives families something they are usually missing by the time they land here, a calm outside perspective that is not being pushed around by fear, guilt, or exhaustion.</p>
        <p className="text-muted-foreground">If you are not sure whether it is time, pay attention to that. Families usually do not ask that question when things are working. You do not need a full-blown disaster to justify getting support.</p>
        <p className="text-foreground font-medium italic">You are allowed to need help before the situation gets worse.</p>
      </div>
    )
  }
];

const FamilyResources = () => {
  const faqItems = [
    { question: "Is addiction a moral failure?", answer: "No, addiction is best understood as a chronic stress-related disorder that affects judgment, impulse control, and emotional regulation. This doesn't excuse harmful behavior, but it explains why willpower, logic, or consequences alone rarely lead to lasting change." },
    { question: "What is the difference between helping and enabling someone with addiction?", answer: "Helping supports growth, responsibility, and accountability. Enabling reduces discomfort in the short term while increasing long-term harm. The difference is not intention—it's outcome. For example, covering someone's rent while they continue using without consequences is likely enabling." },
    { question: "What are healthy boundaries with an addicted family member?", answer: "Boundaries are clear limits that define what you will and will not participate in. They are not punishments, threats, or ultimatums. Effective boundaries are calm, consistent, and focused on your behavior—not on forcing someone else to change." },
    { question: "Why do things often get worse when families start setting boundaries?", answer: "When families begin setting boundaries, stopping rescue behaviors, or speaking more honestly, resistance is common. Escalation does not mean you're doing something wrong; it often means old patterns are being disrupted and the system is adjusting." },
    { question: "When should a family seek professional help for addiction?", answer: "Consider professional guidance when: the same conversations keep happening without lasting change, boundaries are repeatedly broken, fear is driving decisions, family members are divided, finances or safety are deteriorating, or everyone is exhausted but no one knows what to do differently." },
    { question: "Do families need support too when dealing with addiction?", answer: "Yes, addiction isolates families and drains emotional and physical resources. Support for families is not a luxury or a sign of failure—it's a necessary part of restoring stability, clarity, and health. Options include Al-Anon, Nar-Anon, family therapy, and support groups." }
  ];

  return (
    <>
      <SEOHead
        title="Family Resources — Free Addiction Support Tools | Party Wreckers"
        description="Free resources for families dealing with a loved one's addiction: reflection exercises, fear inventories, conversation guides, and more."
        canonical="/family-resources"
        keywords="family addiction resources, addiction support for families, enabling vs helping, family boundaries addiction, Al-Anon resources, family intervention help"
      />
      <FAQJsonLd faqs={faqItems} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Family Resources", url: "/family-resources" }
      ]} />
      
      <Navbar />
      
      <main className="min-h-screen bg-background pt-20 sm:pt-24">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30" />
          
          <div className="container px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-6">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground uppercase tracking-widest">Support for Families</span>
              </div>
              
              <h1 className="font-script text-5xl sm:text-6xl text-burgundy mb-8">
                A Message to Families and Loved Ones
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
                If you are here, chances are someone you love is struggling and your family is paying the price. Addiction does not just affect the person using. It changes the mood in the house, the conversations people avoid, the trust that keeps getting damaged, and the way everybody starts organizing life around the next crisis. This page is here to help you understand what is happening, spot where families get stuck, and find practical next steps that are more useful than panic, guilt, or wishful thinking.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/next-step">
                    Find My Next Step
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/help-now">Need Help Right Now?</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container px-4">
            <div className="mx-auto max-w-5xl">
              <AeoAnswerBlock content={primaryAeoAnswers.enablingVsSupport} />
            </div>
          </div>
        </section>

        {/* Core Concepts Accordion */}
        <section className="py-16 sm:py-20">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-background border border-border rounded-2xl p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="font-script text-3xl sm:text-4xl text-burgundy">Core Concepts for Families</h2>
                </div>
                
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  Families dealing with addiction are usually looking for the one answer that will finally make everything click. Most of the time, what they actually need first is a better understanding of the patterns they are living in. These ideas are not quick fixes. They are the core truths that help families stop reacting blindly, reduce confusion, and make stronger decisions over time. Some of them may feel uncomfortable at first. That is normal. Growth usually starts there.
                </p>
                
                <Accordion type="single" collapsible className="w-full space-y-3">
                  {coreConcepts.map((concept) => (
                    <AccordionItem 
                      key={concept.id} 
                      value={concept.id}
                      className="bg-secondary/30 border border-border rounded-xl px-6 data-[state=open]:bg-secondary/50"
                    >
                      <AccordionTrigger className="text-left text-foreground font-semibold hover:no-underline py-5">
                        {concept.title}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                        {concept.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                <p className="text-sm text-muted-foreground mt-8 italic">
                  You do not need to master all of this at once. Come back to these ideas as often as you need to. Families usually need repetition before clarity starts to stick.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Family Reflection Guide Link */}
        <section className="py-16 sm:py-20 bg-secondary/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-gradient-to-br from-amber-900/20 via-orange-900/10 to-background border-2 border-amber-600/30 rounded-2xl overflow-hidden group hover:border-amber-500/50 transition-colors">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-20 -right-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                </div>
                
                <Link to="/family-reflection" className="block relative p-8 sm:p-10">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-amber-600/20 flex items-center justify-center">
                        <FileText className="w-10 h-10 text-amber-400" />
                      </div>
                    </div>
                    
                    <div className="flex-1 text-center lg:text-left">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-600/20 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4">
                        Interactive Guide
                      </span>
                      <h2 className="font-script text-3xl sm:text-4xl text-amber-400 mb-3">
                        "What Have We Tried Already?"
                      </h2>
                      <p className="text-xl text-foreground/90 font-medium mb-2">
                        Family Reflection Exercise
                      </p>
                      <p className="text-muted-foreground">
                        An interactive worksheet to help your family take inventory of past strategies, identify patterns, and make clearer decisions moving forward. Printable for offline use.
                      </p>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg shadow-amber-600/25">
                        Start Reflection
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Conversation Starters Link */}
        <section className="pb-8 sm:pb-10 bg-secondary/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-gradient-to-br from-blue-900/20 via-indigo-900/10 to-background border-2 border-blue-600/30 rounded-2xl overflow-hidden group hover:border-blue-500/50 transition-colors">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                </div>
                
                <Link to="/conversation-starters" className="block relative p-8 sm:p-10">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-blue-600/20 flex items-center justify-center">
                        <MessageCircle className="w-10 h-10 text-blue-400" />
                      </div>
                    </div>
                    
                    <div className="flex-1 text-center lg:text-left">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
                        Printable Guide
                      </span>
                      <h2 className="font-script text-3xl sm:text-4xl text-blue-400 mb-3">
                        Conversation Starters for Families
                      </h2>
                      <p className="text-xl text-foreground/90 font-medium mb-2">
                        Talk Without Escalating
                      </p>
                      <p className="text-muted-foreground">
                        Thoughtful questions to help families slow down, reduce defensiveness, and speak from a calmer place. Printable for offline use.
                      </p>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25">
                        View Guide
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Fear Inventory Link */}
        <section className="pb-16 sm:pb-20 bg-secondary/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-gradient-to-br from-rose-900/20 via-pink-900/10 to-background border-2 border-rose-600/30 rounded-2xl overflow-hidden group hover:border-rose-500/50 transition-colors">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-20 -right-20 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                </div>
                
                <Link to="/fear-inventory" className="block relative p-8 sm:p-10">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-rose-600/20 flex items-center justify-center">
                        <AlertCircle className="w-10 h-10 text-rose-400" />
                      </div>
                    </div>
                    
                    <div className="flex-1 text-center lg:text-left">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-600/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-4">
                        Interactive Guide
                      </span>
                      <h2 className="font-script text-3xl sm:text-4xl text-rose-400 mb-3">
                        "What Are We Afraid Will Happen?"
                      </h2>
                      <p className="text-xl text-foreground/90 font-medium mb-2">
                        Family Fear Inventory
                      </p>
                      <p className="text-muted-foreground">
                        An interactive exercise to identify and examine the fears that quietly drive family decisions around addiction. Understand how fear influences choices and boundaries.
                      </p>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-600/25">
                        Start Inventory
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Guidance Accordion */}
        <section className="py-16 sm:py-20">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-background border border-border rounded-2xl p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-teal-600/20 flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-teal-400" />
                  </div>
                  <h2 className="font-script text-3xl sm:text-4xl text-burgundy">When It's Time for Professional Guidance</h2>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Most families try to handle addiction on their own for far longer than they should. Not because they're stubborn—but because they hope love, logic, or persistence will eventually be enough. Seeking professional guidance is not a failure, an overreaction, or a last resort. It's often the point where families stop reacting and start responding with clarity.
                </p>
                
                <p className="text-foreground font-medium mb-8">
                  Professional support becomes appropriate when effort is high, distress is ongoing, and nothing meaningfully changes.
                </p>
                
                <Accordion type="single" collapsible className="w-full space-y-3">
                  {professionalGuidanceTopics.map((topic) => (
                    <AccordionItem 
                      key={topic.id} 
                      value={topic.id}
                      className="bg-secondary/30 border border-border rounded-xl px-6 data-[state=open]:bg-secondary/50"
                    >
                      <AccordionTrigger className="text-left text-foreground font-semibold hover:no-underline py-5">
                        {topic.title}
                      </AccordionTrigger>
                      <AccordionContent className="pb-5">
                        {topic.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* Crisis Resources */}
        <section className="py-16 sm:py-20">
          <div className="container px-4">
            <div className="max-w-5xl mx-auto">
              <div className="relative bg-gradient-to-br from-red-900/20 via-rose-900/10 to-background border-2 border-red-600/30 rounded-2xl overflow-hidden p-8 sm:p-10 mb-12">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-20 -right-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
                </div>
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center">
                      <AlertCircle className="w-6 h-6 text-red-400" />
                    </div>
                    <h2 className="font-script text-3xl sm:text-4xl text-red-400">Crisis Resources</h2>
                  </div>
                  
                  <p className="text-muted-foreground mb-8">
                    If you or someone you love is in immediate danger, please reach out to these resources right away.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="bg-background/50 backdrop-blur-sm border border-red-600/20 rounded-xl p-6">
                      <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-red-400" />
                        SAMHSA National Helpline
                      </h3>
                      <p className="text-2xl font-bold text-red-400 mb-2">1-800-662-4357</p>
                      <p className="text-sm text-muted-foreground">Free, confidential, 24/7 treatment referral and information service.</p>
                    </div>
                    
                    <div className="bg-background/50 backdrop-blur-sm border border-red-600/20 rounded-xl p-6">
                      <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-red-400" />
                        National Suicide Prevention Lifeline
                      </h3>
                      <p className="text-2xl font-bold text-red-400 mb-2">988</p>
                      <p className="text-sm text-muted-foreground">24/7 crisis support for anyone in emotional distress.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support Groups */}
        <section className="py-16 sm:py-20 bg-secondary/30">
          <div className="container px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 border border-border mb-6">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground uppercase tracking-widest">Community Support</span>
                </div>
                <h2 className="font-script text-4xl sm:text-5xl text-burgundy mb-4">Support Groups</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Connect with others who understand what you're going through.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-background border border-border rounded-2xl p-8 hover:border-primary/30 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">Al-Anon Family Groups</h3>
                  <p className="text-muted-foreground mb-6">
                    A mutual support program for people whose lives have been affected by someone else's drinking. 
                    Find strength and hope through shared experiences.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Free</span>
                    <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">In-Person & Online</span>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="https://al-anon.org" target="_blank" rel="noopener noreferrer">
                      Find a Meeting <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
                
                <div className="bg-background border border-border rounded-2xl p-8 hover:border-primary/30 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Heart className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-3">Nar-Anon Family Groups</h3>
                  <p className="text-muted-foreground mb-6">
                    A twelve-step program for families and friends of those affected by someone else's addiction 
                    to drugs or other mind-altering substances.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">Free</span>
                    <span className="px-3 py-1 bg-secondary text-muted-foreground text-sm rounded-full">In-Person & Online</span>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="https://www.nar-anon.org" target="_blank" rel="noopener noreferrer">
                      Find a Meeting <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* What to Expect Section */}
        <section className="py-16 sm:py-20 bg-secondary/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 border border-border mb-6">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground uppercase tracking-widest">Guidance</span>
                </div>
                <h2 className="font-script text-4xl sm:text-5xl text-burgundy mb-4">Taking the First Steps</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Not sure where to start? Here's a roadmap for families beginning this journey.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Educate Yourself</h3>
                    <p className="text-muted-foreground">
                      Understanding addiction as a disease—not a moral failing—changes everything. 
                      Learn about the science of addiction and what recovery really looks like.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Find Your Support</h3>
                    <p className="text-muted-foreground">
                      You can't pour from an empty cup. Join a support group, find a therapist, 
                      or connect with others who understand what you're going through.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Set Healthy Boundaries</h3>
                    <p className="text-muted-foreground">
                      Learn the difference between helping and enabling. Boundaries protect both 
                      you and your loved one, even when they feel difficult to enforce.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Communicate with Compassion</h3>
                    <p className="text-muted-foreground">
                      When you're ready to have conversations about treatment, lead with love. 
                      CRAFT-based approaches have proven more effective than confrontation.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Know When to Seek Professional Help</h3>
                    <p className="text-muted-foreground">
                      Sometimes families need professional guidance. Interventionists, family therapists, 
                      and addiction specialists can provide the support you need.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Find Treatment Section */}
        <section className="py-16 sm:py-20">
          <div className="container px-4">
            <div className="max-w-5xl mx-auto">
              <div className="relative bg-gradient-to-br from-primary/20 via-burgundy/10 to-background border-2 border-primary/30 rounded-2xl overflow-hidden p-8 sm:p-12">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-burgundy/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                </div>
                
                <div className="relative text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="font-script text-4xl sm:text-5xl text-burgundy mb-4">Find Treatment Options</h2>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
                    When your loved one is ready for help, finding the right treatment center is crucial. 
                    Use SAMHSA's treatment locator to find verified programs near you.
                  </p>
                  <p className="text-foreground font-medium max-w-2xl mx-auto mb-8">
                    Cost should never be a barrier to treatment. These resources include free, sliding-scale, and state-funded programs. 
                    When you call SAMHSA or use the treatment locator, you can filter by payment options including Medicaid, Medicare, 
                    and programs that offer services regardless of ability to pay.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                      <a href="https://findtreatment.gov" target="_blank" rel="noopener noreferrer">
                        <MapPin className="w-4 h-4 mr-2" />
                        Find Treatment Centers
                      </a>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <a href="tel:1-800-662-4357">
                        <Phone className="w-4 h-4 mr-2" />
                        Call SAMHSA Helpline
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container px-4">
            <div className="max-w-5xl mx-auto rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-background to-burgundy/10 p-8 sm:p-10 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-4 py-2 mb-6">
                <HandHeart className="w-4 h-4 text-primary" />
                <span className="text-sm uppercase tracking-widest text-muted-foreground">Choose the next move, not the whole plan</span>
              </div>
              <h2 className="font-script text-4xl sm:text-5xl text-burgundy mb-4">Need help turning this into action?</h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto mb-8">
                If these tools gave you clarity but not a clear next move, use the funnel pages built for triage. Help Now is for urgency. Next Step is for deciding where your family should go from here.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <Link to="/help-now">
                    Help Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/next-step">Find My Next Step</Link>
                </Button>
                <Button variant="ghost" size="lg" asChild>
                  <Link to="/get-help">Send Matt a message</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Remember Section */}
        <section className="py-16 sm:py-20 bg-secondary/30">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="font-script text-4xl sm:text-5xl text-burgundy mb-6">Recovery Takes Time</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Healing isn't linear—for your loved one or for your family. Be patient with the process, 
                celebrate small victories, and remember that seeking help is a sign of strength, not weakness.
              </p>
              <p className="text-foreground font-medium text-xl">
                You're not alone. We're here to help.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default FamilyResources;
