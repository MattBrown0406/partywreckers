import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  FileText, 
  Printer, 
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const strategiesUsed = [
  "Talking, reasoning, or pleading",
  "Making promises or deals",
  "Covering up consequences (lying to others, calling in sick, fixing problems)",
  "Providing money, housing, transportation, or bail",
  "Threats or ultimatums that weren't enforced",
  "Emotional outbursts, anger, or withdrawal",
  "Ignoring the problem and hoping it would resolve",
  "Researching treatment or recovery options",
  "Attending therapy, Al-Anon, or support groups",
  "Setting boundaries (briefly or inconsistently)",
  "Interventions—formal or informal",
  "Waiting for a \"rock bottom\""
];

const familyCosts = [
  "Increased stress or resentment",
  "Conflict between family members",
  "Financial strain",
  "Loss of trust or safety",
  "Exhaustion or burnout"
];

const FamilyReflection = () => {
  const [checkedStrategies, setCheckedStrategies] = useState<string[]>([]);
  const [checkedCosts, setCheckedCosts] = useState<string[]>([]);
  const [customStrategies, setCustomStrategies] = useState("");
  const [goalReflection, setGoalReflection] = useState("");
  const [changeReflection, setChangeReflection] = useState("");
  const [patternReflection, setPatternReflection] = useState("");
  const [customCosts, setCustomCosts] = useState("");

  const handleStrategyToggle = (strategy: string) => {
    setCheckedStrategies(prev => 
      prev.includes(strategy) 
        ? prev.filter(s => s !== strategy)
        : [...prev, strategy]
    );
  };

  const handleCostToggle = (cost: string) => {
    setCheckedCosts(prev => 
      prev.includes(cost) 
        ? prev.filter(c => c !== cost)
        : [...prev, cost]
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear all your responses? This cannot be undone.")) {
      setCheckedStrategies([]);
      setCheckedCosts([]);
      setCustomStrategies("");
      setGoalReflection("");
      setChangeReflection("");
      setPatternReflection("");
      setCustomCosts("");
    }
  };

  return (
    <>
      <SEOHead
        title="Family Reflection Exercise — Free Tool | Party Wreckers"
        description="A guided reflection exercise for families affected by addiction. Take a step back, assess your situation, and identify what you can change today."
        canonical="/family-reflection"
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Family Resources", url: "/family-resources" },
        { name: "Family Reflection Guide", url: "/family-reflection" }
      ]} />
      
      {/* Print styles */}
      <style>
        {`
          @media print {
            .no-print {
              display: none !important;
            }
            .print-break {
              page-break-before: always;
            }
            body {
              background: white !important;
              color: black !important;
            }
            .print-container {
              max-width: 100% !important;
              padding: 20px !important;
            }
            .print-section {
              break-inside: avoid;
              margin-bottom: 20px;
            }
            textarea {
              border: 1px solid #ccc !important;
              min-height: 80px !important;
            }
          }
        `}
      </style>
      
      <div className="no-print">
        <Navbar />
      </div>
      
      <main className="min-h-screen bg-background pt-20 sm:pt-24 print:pt-0">
        {/* Header */}
        <section className="py-12 sm:py-16 bg-gradient-hero relative overflow-hidden no-print">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30" />
          
          <div className="container px-4 relative">
            <div className="max-w-4xl mx-auto">
              <Link 
                to="/family-resources" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Family Resources
              </Link>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-amber-600/20 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-amber-400" />
                </div>
                <h1 className="font-script text-4xl sm:text-5xl text-burgundy">
                  Family Reflection Guide
                </h1>
              </div>
              
              <p className="text-lg text-muted-foreground mb-6">
                "What Have We Tried Already?" — a guided exercise for families who need a clearer read on reality
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button onClick={handlePrint} variant="outline" className="gap-2">
                  <Printer className="w-4 h-4" />
                  Print This Guide
                </Button>
                <Button onClick={handleReset} variant="ghost" className="gap-2 text-muted-foreground">
                  <RotateCcw className="w-4 h-4" />
                  Reset All
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Print Header */}
        <div className="hidden print:block p-8 text-center border-b">
          <h2 className="text-3xl font-bold mb-2">"What Have We Tried Already?"</h2>
          <p className="text-lg">Family Reflection Guide — The Party Wreckers Podcast</p>
        </div>

        {/* Main Content */}
        <section className="py-12 sm:py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto print-container">
              {/* Introduction */}
              <div className="bg-background border border-border rounded-2xl p-8 sm:p-10 mb-8 print-section print:border print:rounded-none">
                <p className="text-muted-foreground mb-6 leading-relaxed print:text-black">
                  When addiction has been in a family for any length of time, most people have tried more than they can even remember. They have talked, pleaded, covered, threatened, forgiven, adjusted, researched, waited, and hoped. This reflection is not about blame. It is about slowing the whole thing down long enough to look honestly at what has already been tried, what drove those choices, and what actually happened next.
                </p>
                
                <p className="text-foreground font-medium print:text-black">
                  Use this on your own or with other family members. Write honestly. You are not trying to look good here, you are trying to get clear.
                </p>
              </div>
              
              {/* Step 1 */}
              <div className="bg-background border border-border rounded-2xl p-8 sm:p-10 mb-8 print-section print:border print:rounded-none">
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3 print:text-black">
                  <span className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold print:bg-gray-200 print:text-black">1</span>
                  List the Strategies We've Used
                </h2>
                <p className="text-muted-foreground mb-6 print:text-gray-600">Check any that fit. Most families will recognize more of these than they expect.</p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {strategiesUsed.map((strategy, index) => (
                    <label 
                      key={index} 
                      className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg cursor-pointer hover:bg-secondary/70 transition-colors print:bg-white print:border"
                    >
                      <Checkbox 
                        checked={checkedStrategies.includes(strategy)}
                        onCheckedChange={() => handleStrategyToggle(strategy)}
                        className="mt-0.5"
                      />
                      <span className="text-sm text-foreground/90 print:text-black">{strategy}</span>
                    </label>
                  ))}
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block print:text-black">
                    Other strategies we've tried:
                  </label>
                  <Textarea 
                    value={customStrategies}
                    onChange={(e) => setCustomStrategies(e.target.value)}
                    placeholder="Add any additional strategies your family has tried..."
                    className="min-h-[100px] print:border print:border-gray-300"
                  />
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="bg-background border border-border rounded-2xl p-8 sm:p-10 mb-8 print-section print:border print:rounded-none print-break">
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3 print:text-black">
                  <span className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold print:bg-gray-200 print:text-black">2</span>
                  What Was the Goal at the Time?
                </h2>
                <p className="text-muted-foreground mb-4 print:text-gray-600">For the biggest things your family has tried, ask:</p>
                
                <ul className="space-y-2 text-foreground/90 mb-6 print:text-black">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 print:text-black">•</span>
                    What were we hoping would happen?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 print:text-black">•</span>
                    What fear was driving this choice?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 print:text-black">•</span>
                    Were we trying to help, protect, avoid conflict, or restore peace?
                  </li>
                </ul>
                
                <Textarea 
                  value={goalReflection}
                  onChange={(e) => setGoalReflection(e.target.value)}
                  placeholder="Write your reflections here..."
                  className="min-h-[150px] print:border print:border-gray-300"
                />
              </div>
              
              {/* Step 3 */}
              <div className="bg-background border border-border rounded-2xl p-8 sm:p-10 mb-8 print-section print:border print:rounded-none">
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3 print:text-black">
                  <span className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold print:bg-gray-200 print:text-black">3</span>
                  What Actually Changed?
                </h2>
                <p className="text-muted-foreground mb-4 print:text-gray-600">Be concrete, not hopeful:</p>
                
                <ul className="space-y-2 text-foreground/90 mb-6 print:text-black">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 print:text-black">•</span>
                    Did the behavior stop, improve, or escalate?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 print:text-black">•</span>
                    Did the family feel calmer—or more anxious?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 print:text-black">•</span>
                    Were changes short-term or sustainable?
                  </li>
                </ul>
                
                <Textarea 
                  value={changeReflection}
                  onChange={(e) => setChangeReflection(e.target.value)}
                  placeholder="Write your reflections here..."
                  className="min-h-[150px] print:border print:border-gray-300"
                />
              </div>
              
              {/* Step 4 */}
              <div className="bg-background border border-border rounded-2xl p-8 sm:p-10 mb-8 print-section print:border print:rounded-none print-break">
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3 print:text-black">
                  <span className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold print:bg-gray-200 print:text-black">4</span>
                  What Did This Cost the Family?
                </h2>
                <p className="text-muted-foreground mb-6 print:text-gray-600">Look at the real cost, emotional, relational, financial, and physical.</p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {familyCosts.map((cost, index) => (
                    <label 
                      key={index} 
                      className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg cursor-pointer hover:bg-secondary/70 transition-colors print:bg-white print:border"
                    >
                      <Checkbox 
                        checked={checkedCosts.includes(cost)}
                        onCheckedChange={() => handleCostToggle(cost)}
                        className="mt-0.5"
                      />
                      <span className="text-sm text-foreground/90 print:text-black">{cost}</span>
                    </label>
                  ))}
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block print:text-black">
                    Other costs or impacts:
                  </label>
                  <Textarea 
                    value={customCosts}
                    onChange={(e) => setCustomCosts(e.target.value)}
                    placeholder="Describe any additional costs your family has experienced..."
                    className="min-h-[100px] print:border print:border-gray-300"
                  />
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="bg-background border border-border rounded-2xl p-8 sm:p-10 mb-8 print-section print:border print:rounded-none">
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3 print:text-black">
                  <span className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold print:bg-gray-200 print:text-black">5</span>
                  What Patterns Do We See Now?
                </h2>
                <p className="text-muted-foreground mb-4 print:text-gray-600">Look at the patterns without defending them:</p>
                
                <ul className="space-y-2 text-foreground/90 mb-6 print:text-black">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 print:text-black">•</span>
                    Which strategies keep repeating?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 print:text-black">•</span>
                    What do we do when things get worse?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1 print:text-black">•</span>
                    What are we most afraid to stop doing?
                  </li>
                </ul>
                
                <Textarea 
                  value={patternReflection}
                  onChange={(e) => setPatternReflection(e.target.value)}
                  placeholder="Write your reflections here..."
                  className="min-h-[150px] print:border print:border-gray-300"
                />
              </div>
              
              {/* Closing Reminder */}
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 sm:p-10 print-section print:border print:border-gray-300 print:bg-gray-50">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-primary print:text-black" />
                  <h2 className="text-xl font-semibold text-foreground print:text-black">Closing Reminder</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 print:text-gray-700">
                  If you see that a lot of your family’s choices were driven by fear, urgency, guilt, or exhaustion, that does not mean you failed. It means you were trying to survive something painful with the tools you had. The point now is not to rewrite the past. It is to learn from it so the next decisions are clearer, calmer, and less reactive.
                </p>
                <p className="text-foreground font-medium italic print:text-black">
                  You do not need the whole plan today. Clarity comes before strategy.
                </p>
              </div>
              
              <div className="mt-10 rounded-2xl border border-border bg-secondary/30 p-8 no-print">
                <h2 className="font-script text-2xl sm:text-3xl text-burgundy mb-4 text-center">Ready to turn reflection into direction?</h2>
                <p className="text-muted-foreground text-center mb-6">
                  Once your family can see what it has already tried, the next job is choosing a steadier path instead of repeating the same cycle.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg">
                    <Link to="/next-step">
                      Find My Next Step
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/help-now">Help Now</Link>
                  </Button>
                  <Button onClick={handlePrint} size="lg" className="gap-2">
                    <Printer className="w-4 h-4" />
                    Print Your Reflection
                  </Button>
                  <Button asChild variant="ghost" size="lg">
                    <Link to="/family-resources">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Resources
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <div className="no-print">
        <Footer />
      </div>
    </>
  );
};

export default FamilyReflection;
