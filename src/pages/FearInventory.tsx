import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  AlertTriangle, 
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

const commonFears = [
  "They will get worse if we stop helping",
  "They will overdose or die",
  "They will end up homeless or incarcerated",
  "They will cut us off completely",
  "They will never forgive us",
  "We will look cruel or heartless to others",
  "We will regret this if something bad happens",
  "We will lose control of the situation",
  "The family will fall apart",
  "Our marriage or relationships won't survive",
  "We'll be blamed if recovery doesn't happen",
  "We don't trust ourselves to hold boundaries",
  "We don't know what to do instead"
];

const fearCosts = [
  "Chronic anxiety or hypervigilance",
  "Avoidance of conflict or hard conversations",
  "Inconsistent boundaries",
  "Emotional distance between family members",
  "Loss of sleep, health, or peace"
];

const FearInventory = () => {
  const [checkedFears, setCheckedFears] = useState<string[]>([]);
  const [checkedCosts, setCheckedCosts] = useState<string[]>([]);
  const [customFears, setCustomFears] = useState("");
  const [fearActionsReflection, setFearActionsReflection] = useState("");
  const [customCosts, setCustomCosts] = useState("");
  const [responsibilityReflection, setResponsibilityReflection] = useState("");
  const [changeReflection, setChangeReflection] = useState("");

  const handleFearToggle = (fear: string) => {
    setCheckedFears(prev => 
      prev.includes(fear) 
        ? prev.filter(f => f !== fear)
        : [...prev, fear]
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
      setCheckedFears([]);
      setCheckedCosts([]);
      setCustomFears("");
      setFearActionsReflection("");
      setCustomCosts("");
      setResponsibilityReflection("");
      setChangeReflection("");
    }
  };

  return (
    <>
      <SEOHead
        title="Fear Inventory Exercise — Identify What's Holding You Back | Party Wreckers"
        description="Fear keeps families stuck. This exercise helps you name your fears, examine them honestly, and start moving toward action instead of paralysis."
        canonical="/fear-inventory"
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Family Resources", url: "/family-resources" },
        { name: "Fear Inventory", url: "/fear-inventory" }
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
                <div className="w-12 h-12 rounded-full bg-rose-600/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-rose-400" />
                </div>
                <h1 className="font-script text-4xl sm:text-5xl text-burgundy">
                  Family Fear Inventory
                </h1>
              </div>
              
              <p className="text-lg text-muted-foreground mb-6">
                "What Are We Afraid Will Happen?" — a guided exercise for families living under pressure
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
          <h2 className="text-3xl font-bold mb-2">"What Are We Afraid Will Happen?"</h2>
          <p className="text-lg">Family Fear Inventory — The Party Wreckers Podcast</p>
        </div>

        {/* Main Content */}
        <section className="py-12 sm:py-16">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto print-container">
              {/* Introduction */}
              <div className="bg-background border border-border rounded-2xl p-8 sm:p-10 mb-8 print-section print:border print:rounded-none">
                <p className="text-muted-foreground mb-6 leading-relaxed print:text-black">
                  Fear drives more family decisions around addiction than most people want to admit. It sits underneath the rescuing, the overexplaining, the second chances, the inconsistent boundaries, and the constant urge to keep everything from falling apart. This inventory is here to bring those fears into the open so your family can see how much influence they have really had.
                </p>
                
                <p className="text-foreground font-medium print:text-black">
                  Do this on your own or with other family members. Be honest. You are not grading yourself here, you are naming what has been running the system.
                </p>
              </div>
              
              {/* Step 1 */}
              <div className="bg-background border border-border rounded-2xl p-8 sm:p-10 mb-8 print-section print:border print:rounded-none">
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3 print:text-black">
                  <span className="w-10 h-10 rounded-full bg-rose-600/20 flex items-center justify-center text-rose-500 font-bold print:bg-gray-200 print:text-black">1</span>
                  Identify the Fears That Feel Most Real
                </h2>
                <p className="text-muted-foreground mb-6 print:text-gray-600">Check any that feel true, even if they seem to contradict each other. Families usually carry several fears at once.</p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {commonFears.map((fear, index) => (
                    <label 
                      key={index} 
                      className="flex items-start gap-3 p-4 bg-secondary/50 rounded-lg cursor-pointer hover:bg-secondary/70 transition-colors print:bg-white print:border"
                    >
                      <Checkbox 
                        checked={checkedFears.includes(fear)}
                        onCheckedChange={() => handleFearToggle(fear)}
                        className="mt-0.5"
                      />
                      <span className="text-sm text-foreground/90 print:text-black">{fear}</span>
                    </label>
                  ))}
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block print:text-black">
                    Other fears we carry:
                  </label>
                  <Textarea 
                    value={customFears}
                    onChange={(e) => setCustomFears(e.target.value)}
                    placeholder="Add any additional fears that resonate with your family..."
                    className="min-h-[100px] print:border print:border-gray-300"
                  />
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="bg-background border border-border rounded-2xl p-8 sm:p-10 mb-8 print-section print:border print:rounded-none print-break">
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3 print:text-black">
                  <span className="w-10 h-10 rounded-full bg-rose-600/20 flex items-center justify-center text-rose-500 font-bold print:bg-gray-200 print:text-black">2</span>
                  What Does This Fear Push Us to Do?
                </h2>
                <p className="text-muted-foreground mb-4 print:text-gray-600">For the fears that feel biggest, ask:</p>
                
                <ul className="space-y-2 text-foreground/90 mb-6 print:text-black">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-1 print:text-black">•</span>
                    What actions does this fear justify?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-1 print:text-black">•</span>
                    What behaviors do we engage in because of it?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-1 print:text-black">•</span>
                    How does it shape our communication?
                  </li>
                </ul>
                
                <Textarea 
                  value={fearActionsReflection}
                  onChange={(e) => setFearActionsReflection(e.target.value)}
                  placeholder="Write your reflections here..."
                  className="min-h-[150px] print:border print:border-gray-300"
                />
              </div>
              
              {/* Step 3 */}
              <div className="bg-background border border-border rounded-2xl p-8 sm:p-10 mb-8 print-section print:border print:rounded-none">
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3 print:text-black">
                  <span className="w-10 h-10 rounded-full bg-rose-600/20 flex items-center justify-center text-rose-500 font-bold print:bg-gray-200 print:text-black">3</span>
                  What Has This Fear Cost Us So Far?
                </h2>
                <p className="text-muted-foreground mb-6 print:text-gray-600">Look at what fear-based decisions have already cost your family:</p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {fearCosts.map((cost, index) => (
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
              
              {/* Step 4 */}
              <div className="bg-background border border-border rounded-2xl p-8 sm:p-10 mb-8 print-section print:border print:rounded-none print-break">
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3 print:text-black">
                  <span className="w-10 h-10 rounded-full bg-rose-600/20 flex items-center justify-center text-rose-500 font-bold print:bg-gray-200 print:text-black">4</span>
                  Separate Fear from Responsibility
                </h2>
                <p className="text-muted-foreground mb-4 print:text-gray-600">Get honest about the line between responsibility and control:</p>
                
                <ul className="space-y-2 text-foreground/90 mb-6 print:text-black">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-1 print:text-black">•</span>
                    What outcomes are truly within our control?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-1 print:text-black">•</span>
                    What are we trying to manage that we realistically can't?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-1 print:text-black">•</span>
                    What responsibility are we carrying that may not belong to us?
                  </li>
                </ul>
                
                <Textarea 
                  value={responsibilityReflection}
                  onChange={(e) => setResponsibilityReflection(e.target.value)}
                  placeholder="Write your reflections here..."
                  className="min-h-[150px] print:border print:border-gray-300"
                />
              </div>
              
              {/* Step 5 */}
              <div className="bg-background border border-border rounded-2xl p-8 sm:p-10 mb-8 print-section print:border print:rounded-none">
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3 print:text-black">
                  <span className="w-10 h-10 rounded-full bg-rose-600/20 flex items-center justify-center text-rose-500 font-bold print:bg-gray-200 print:text-black">5</span>
                  What Might Change If Fear Wasn't in Charge?
                </h2>
                <p className="text-muted-foreground mb-4 print:text-gray-600">You are not being asked to eliminate fear. Just imagine what changes if fear is no longer driving every decision:</p>
                
                <ul className="space-y-2 text-foreground/90 mb-6 print:text-black">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-1 print:text-black">•</span>
                    How would our decisions look different?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-1 print:text-black">•</span>
                    What boundary might finally be possible?
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500 mt-1 print:text-black">•</span>
                    What support would we allow ourselves to seek?
                  </li>
                </ul>
                
                <Textarea 
                  value={changeReflection}
                  onChange={(e) => setChangeReflection(e.target.value)}
                  placeholder="Write your reflections here..."
                  className="min-h-[150px] print:border print:border-gray-300"
                />
              </div>
              
              {/* Closing Reminder */}
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-8 sm:p-10 print-section print:border print:border-gray-300 print:bg-gray-50">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-6 h-6 text-rose-500 print:text-black" />
                  <h2 className="text-xl font-semibold text-foreground print:text-black">Closing Reminder</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4 print:text-gray-700">
                  Fear is not weakness. It is what shows up when people love someone and feel out of control. But when fear is running the house, families stay trapped in the same cycle. Naming it takes away some of its power and makes room for clearer decisions.
                </p>
                <p className="text-foreground font-medium italic print:text-black">
                  You do not have to fix everything today. Seeing fear clearly is already a real step forward.
                </p>
              </div>
              
              <div className="mt-10 rounded-2xl border border-border bg-secondary/30 p-8 no-print">
                <h2 className="font-script text-2xl sm:text-3xl text-burgundy mb-4 text-center">What do we do with what we just learned?</h2>
                <p className="text-muted-foreground text-center mb-6">
                  If this exercise exposed the fear running your family, do not let that clarity disappear. Choose the next move while it is fresh.
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
                    Print Your Inventory
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

export default FearInventory;
