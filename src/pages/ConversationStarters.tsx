import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  AlertTriangle,
  Heart,
  Shield,
  Compass,
  Pause,
  Printer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const ConversationStarters = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <SEOHead
        title="How to Talk About Addiction — Conversation Starters | Party Wreckers"
        description="Not sure how to bring it up? These conversation starters help families begin the hardest — and most important — conversation about addiction."
        canonical="/conversation-starters"
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Family Resources", url: "/family-resources" },
        { name: "Conversation Starters", url: "/conversation-starters" }
      ]} />
      
      <Navbar />
      
      <main className="min-h-screen bg-background pt-20 sm:pt-24 print:pt-0">
        {/* Print-only header */}
        <div className="hidden print:block print:mb-8">
          <h2 className="text-3xl font-bold text-center mb-2">Conversation Starters for Families</h2>
          <p className="text-center text-sm text-gray-600">The Party Wreckers Podcast • Family Resources</p>
        </div>

        {/* Navigation - hide on print */}
        <div className="container px-4 py-6 print:hidden">
          <Link 
            to="/family-resources" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Family Resources
          </Link>
        </div>

        {/* Hero Section - hide on print */}
        <section className="py-12 sm:py-16 bg-gradient-hero relative overflow-hidden print:hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30" />
          
          <div className="container px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-6">
                <MessageCircle className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground uppercase tracking-widest">Printable Guide</span>
              </div>
              
              <h1 className="font-script text-5xl sm:text-6xl text-burgundy mb-6">
                Conversation Starters for Families
              </h1>
              
              <Button 
                onClick={handlePrint}
                size="lg" 
                variant="outline"
                className="border-primary/30 hover:bg-primary/10"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print This Guide
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 sm:py-16 print:py-0">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto">
              
              {/* Introduction */}
              <div className="prose prose-lg max-w-none mb-12 print:mb-8">
                <p className="text-lg text-muted-foreground leading-relaxed print:text-gray-700">
                  Talking about addiction inside a family is almost never just about the words. By the time most people try to bring it up, fear is already high, trust is already thin, and everyone is walking in carrying old arguments, old resentment, and old panic. That is why so many conversations either explode, shut down, or go nowhere.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed mt-4 print:text-gray-700">
                  These conversation starters are not here to help you corner someone, win an argument, or force a breakthrough. They are here to help families slow the moment down, lower defensiveness, and speak from a place that is steadier and more honest.
                </p>
                <p className="text-foreground font-medium mt-6 italic print:text-gray-900">
                  You do not need to use every question. Use the ones that fit where your family actually is, not where you wish it was.
                </p>
              </div>

              {/* Before You Start */}
              <div className="bg-secondary/50 border border-border rounded-2xl p-8 mb-10 print:bg-gray-100 print:border-gray-300 print:mb-6 print:break-inside-avoid">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-amber-600/20 flex items-center justify-center print:bg-amber-100">
                    <AlertTriangle className="w-5 h-5 text-amber-400 print:text-amber-600" />
                  </div>
                  <h2 className="font-script text-2xl sm:text-3xl text-burgundy print:text-gray-900">Before You Start</h2>
                </div>
                <ul className="space-y-3 text-muted-foreground print:text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1 print:text-gray-600">•</span>
                    <span>Check your own state first. If fear, panic, or urgency are running you, the conversation will usually go bad fast.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1 print:text-gray-600">•</span>
                    <span>Get grounded before you start. Pause, breathe, take a walk, pray, write, whatever helps you stop reacting.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1 print:text-gray-600">•</span>
                    <span>Choose a time when nobody is already activated, defensive, or looking for a fight</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1 print:text-gray-600">•</span>
                    <span>Do not try to have this conversation during or right after substance use</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1 print:text-gray-600">•</span>
                    <span>Go in trying to understand and stay clear, not trying to force an outcome</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1 print:text-gray-600">•</span>
                    <span>Pause or end it if things become unsafe, manipulative, or too emotionally charged to be useful</span>
                  </li>
                </ul>
                <p className="text-foreground font-semibold mt-6 italic print:text-gray-900">
                  The calmer and clearer you are, the less likely fear is to run the whole conversation.
                </p>
              </div>

              {/* Question Sections */}
              <div className="space-y-10 print:space-y-6">
                
                {/* Understanding What's Really Happening */}
                <div className="print:break-inside-avoid">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center print:bg-blue-100">
                      <MessageCircle className="w-5 h-5 text-blue-400 print:text-blue-600" />
                    </div>
                    <h2 className="font-script text-2xl sm:text-3xl text-burgundy print:text-gray-900">Understanding What's Really Happening</h2>
                  </div>
                  <p className="text-muted-foreground mb-4 print:text-gray-600">
                    These questions help people get underneath the usual arguments and talk about what is really happening.
                  </p>
                  <ul className="space-y-3 bg-secondary/30 rounded-xl p-6 print:bg-gray-50 print:border print:border-gray-200">
                    <li className="text-foreground print:text-gray-800">"What feels hardest about this for you right now?"</li>
                    <li className="text-foreground print:text-gray-800">"What do you think we're all reacting to?"</li>
                    <li className="text-foreground print:text-gray-800">"What worries you the most that you don't usually say out loud?"</li>
                    <li className="text-foreground print:text-gray-800">"What do you feel like we're missing or not talking about?"</li>
                  </ul>
                </div>

                {/* Exploring Impact Without Blame */}
                <div className="print:break-inside-avoid">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-600/20 flex items-center justify-center print:bg-purple-100">
                      <Heart className="w-5 h-5 text-purple-400 print:text-purple-600" />
                    </div>
                    <h2 className="font-script text-2xl sm:text-3xl text-burgundy print:text-gray-900">Exploring Impact Without Blame</h2>
                  </div>
                  <p className="text-muted-foreground mb-4 print:text-gray-600">
                    Use these when you need to name impact honestly without turning the conversation into blame and counterattack.
                  </p>
                  <ul className="space-y-3 bg-secondary/30 rounded-xl p-6 print:bg-gray-50 print:border print:border-gray-200">
                    <li className="text-foreground print:text-gray-800">"How has this been affecting the family?"</li>
                    <li className="text-foreground print:text-gray-800">"What has changed in ways we haven't really talked about?"</li>
                    <li className="text-foreground print:text-gray-800">"What feels different now compared to before?"</li>
                    <li className="text-foreground print:text-gray-800">"What are we all doing now that we weren't doing before?"</li>
                  </ul>
                </div>

                {/* Helping vs. Enabling */}
                <div className="print:break-inside-avoid">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-orange-600/20 flex items-center justify-center print:bg-orange-100">
                      <AlertTriangle className="w-5 h-5 text-orange-400 print:text-orange-600" />
                    </div>
                    <h2 className="font-script text-2xl sm:text-3xl text-burgundy print:text-gray-900">Helping vs. Enabling</h2>
                  </div>
                  <p className="text-muted-foreground mb-4 print:text-gray-600">
                    These questions matter when your family keeps bouncing between rescuing, resentment, and exhaustion.
                  </p>
                  <ul className="space-y-3 bg-secondary/30 rounded-xl p-6 print:bg-gray-50 print:border print:border-gray-200">
                    <li className="text-foreground print:text-gray-800">"What are we doing that helps in the short term but hurts in the long term?"</li>
                    <li className="text-foreground print:text-gray-800">"What would support look like if it didn't involve fixing or rescuing?"</li>
                    <li className="text-foreground print:text-gray-800">"What are we afraid would happen if we stopped stepping in?"</li>
                  </ul>
                </div>

                {/* Boundaries and Safety */}
                <div className="print:break-inside-avoid">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-green-600/20 flex items-center justify-center print:bg-green-100">
                      <Shield className="w-5 h-5 text-green-400 print:text-green-600" />
                    </div>
                    <h2 className="font-script text-2xl sm:text-3xl text-burgundy print:text-gray-900">Boundaries and Safety</h2>
                  </div>
                  <p className="text-muted-foreground mb-4 print:text-gray-600">
                    These questions help families think about limits clearly, without making empty threats or trying to control someone else.
                  </p>
                  <ul className="space-y-3 bg-secondary/30 rounded-xl p-6 print:bg-gray-50 print:border print:border-gray-200">
                    <li className="text-foreground print:text-gray-800">"What do we need in order to feel safe and stable?"</li>
                    <li className="text-foreground print:text-gray-800">"What are we willing to participate in—and what are we not?"</li>
                    <li className="text-foreground print:text-gray-800">"What boundary would protect us, even if it doesn't change them?"</li>
                  </ul>
                </div>

                {/* Looking Forward */}
                <div className="print:break-inside-avoid">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-teal-600/20 flex items-center justify-center print:bg-teal-100">
                      <Compass className="w-5 h-5 text-teal-400 print:text-teal-600" />
                    </div>
                    <h2 className="font-script text-2xl sm:text-3xl text-burgundy print:text-gray-900">Looking Forward</h2>
                  </div>
                  <p className="text-muted-foreground mb-4 print:text-gray-600">
                    Use these when the family is ready to stop reacting only to the current crisis and think about what has to change long term.
                  </p>
                  <ul className="space-y-3 bg-secondary/30 rounded-xl p-6 print:bg-gray-50 print:border print:border-gray-200">
                    <li className="text-foreground print:text-gray-800">"What would a healthier version of this look like for us?"</li>
                    <li className="text-foreground print:text-gray-800">"What do we need help with that we can't do alone?"</li>
                    <li className="text-foreground print:text-gray-800">"What's one small change we could make that we could actually hold?"</li>
                  </ul>
                </div>

                {/* When to Pause */}
                <div className="bg-rose-900/20 border border-rose-600/30 rounded-2xl p-8 print:bg-red-50 print:border-red-200 print:break-inside-avoid">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-rose-600/20 flex items-center justify-center print:bg-red-100">
                      <Pause className="w-5 h-5 text-rose-400 print:text-red-600" />
                    </div>
                    <h2 className="font-script text-2xl sm:text-3xl text-rose-400 print:text-red-800">When to Pause the Conversation</h2>
                  </div>
                  <p className="text-muted-foreground mb-4 print:text-gray-600">
                    End or pause the conversation if any of this starts happening:
                  </p>
                  <ul className="space-y-2 text-foreground mb-6 print:text-gray-800">
                    <li className="flex items-start gap-3">
                      <span className="text-rose-400 mt-1 print:text-red-600">•</span>
                      <span>Voices escalate or threats appear</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-rose-400 mt-1 print:text-red-600">•</span>
                      <span>Someone is intoxicated</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-rose-400 mt-1 print:text-red-600">•</span>
                      <span>The conversation becomes emotionally or physically unsafe</span>
                    </li>
                  </ul>
                  <p className="text-foreground font-semibold italic print:text-gray-900">
                    Pausing is not weakness. It is choosing clarity over more damage.
                  </p>
                </div>

              </div>

              {/* Closing Reminder */}
              <div className="mt-12 pt-10 border-t border-border print:mt-8 print:pt-6 print:border-gray-300">
                <h2 className="font-script text-2xl sm:text-3xl text-burgundy mb-4 print:text-gray-900">Closing Reminder</h2>
                <p className="text-muted-foreground leading-relaxed mb-4 print:text-gray-700">
                  These conversations are about changing patterns, not forcing some perfect breakthrough. Do not measure success by whether everyone agrees in the moment. Measure it by whether you stayed grounded, told the truth, and stopped feeding the usual cycle.
                </p>
                <p className="text-foreground font-semibold text-lg italic print:text-gray-900">
                  Real progress usually looks like more clarity, better boundaries, and fewer panic-driven conversations.
                </p>
              </div>

              <div className="mt-12 rounded-2xl border border-border bg-secondary/30 p-8 print:hidden">
                <h2 className="font-script text-2xl sm:text-3xl text-burgundy mb-4">What should we do after this conversation?</h2>
                <p className="text-muted-foreground mb-6">
                  If this guide helped you slow the conversation down, the next move is deciding what your family needs afterward, more education, more structure, or direct support.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild>
                    <Link to="/next-step">
                      Find My Next Step
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/help-now">Help Now</Link>
                  </Button>
                  <Button onClick={handlePrint} size="lg" className="bg-primary hover:bg-primary/90">
                    <Printer className="w-4 h-4 mr-2" />
                    Print This Guide
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      
      <Footer />

      {/* Print styles */}
      <style>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          nav, footer, .print\\:hidden {
            display: none !important;
          }
          main {
            padding-top: 0 !important;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid;
          }
        }
      `}</style>
    </>
  );
};

export default ConversationStarters;
