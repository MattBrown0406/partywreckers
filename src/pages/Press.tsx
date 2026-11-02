import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Mail, 
  Mic, 
  Users, 
  Star, 
  Calendar, 
  ExternalLink,
  Image,
  FileText,
  Quote,
  Headphones,
  Heart,
  Award,
  MessageSquare
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
// The 1024px PNG (2.3 MB) is only for the press-kit download; the page shows the 512px WebP.
import logo from "@/assets/party-wreckers-logo-2026.png";
import logoDisplay from "@/assets/party-wreckers-logo-512.webp";
import mattHeadshot from "@/assets/matt-headshot.jpg";

const Press = () => {
  const stats = [
    { label: "Episodes", value: "75+", icon: Mic },
    { label: "Families Helped", value: "1000s", icon: Users },
    { label: "Apple Podcasts Rating", value: "4.9★", icon: Star },
    { label: "Years Experience", value: "20+", icon: Calendar },
  ];

  const topics = [
    "Understanding addiction as a family disease",
    "Intervention strategies and planning",
    "Enabling vs. supporting loved ones",
    "Setting healthy boundaries",
    "Recovery and relapse prevention",
    "Family roles in addiction dynamics",
    "Treatment options and navigation",
    "Codependency and self-care for families",
  ];

  const sampleQuestions = [
    "What are the early warning signs families often miss?",
    "How do you approach an intervention conversation?",
    "What's the difference between helping and enabling?",
    "How can families support recovery without controlling?",
    "What should families know about treatment options?",
    "How do you rebuild trust after addiction?",
  ];

  return (
    <>
      <SEOHead
        title="Press & Media — The Party Wreckers Podcast"
        description="Press kit, media appearances, and interview requests for The Party Wreckers Podcast and host Matt Brown."
        canonical="/press"
        keywords="The Party Wreckers press kit, Matt Brown media, addiction podcast press, interventionist speaker, addiction expert interview"
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Press & Media Kit", url: "/press" }
      ]} />
      
      <Navbar />
      
      <main className="min-h-screen bg-background pt-20 sm:pt-24">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30" />
          
          <div className="container px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-6">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground uppercase tracking-widest">Media Resources</span>
              </div>
              
              <h1 className="font-script text-5xl sm:text-6xl text-burgundy mb-6">
                Press & Media Kit
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground mb-8">
                Everything you need to feature The Party Wreckers Podcast or book Matt Brown for interviews, speaking engagements, and straight talk about addiction, intervention, and what families actually go through.
              </p>
              
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <a href="mailto:matt@partywreckers.com?subject=Media%20Inquiry%20-%20The%20Party%20Wreckers%20Podcast">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact for Media Inquiries
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 border-b border-border">
          <div className="container px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="font-script text-3xl text-burgundy">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About the Show */}
        <section className="py-16 sm:py-20">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="font-script text-4xl text-burgundy mb-6">About the Show</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">The Party Wreckers</strong> is a weekly podcast for families, loved ones, and professionals who are tired of watching addiction damage relationships while everybody keeps pretending the next conversation will somehow fix it.
                    </p>
                    <p>
                      Hosted by Matt Brown, a professional interventionist with more than 20 years in the field, the show tackles enabling, boundaries, relapse, treatment, intervention, and family recovery in plain language that people can actually use.
                    </p>
                    <p>
                      Each episode is built to do more than raise awareness. It helps listeners get clearer, calmer, and more honest about what is happening, so they can stop reacting to chaos and start making better decisions.
                    </p>
                    <p>
                      The voice is direct, compassionate, and practical, rooted in the belief that addiction is a medical disease with a spiritual solution, and that families need truth and guidance, not more empty reassurance.
                    </p>
                  </div>
                </div>
                
                <div className="bg-card border border-border rounded-2xl p-8 text-center">
                  <img 
                    src={logoDisplay} width={512} height={512}
                    alt="The Party Wreckers Podcast Logo"
                    className="w-full max-w-xs mx-auto mb-6"
                    loading="lazy"
                    decoding="async"
                  />
                  <p className="text-sm text-muted-foreground mb-4">Official Podcast Logo</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href={logo} download="party-wreckers-logo.png">
                      <Download className="w-4 h-4 mr-2" />
                      Download Logo
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About the Host */}
        <section className="py-16 sm:py-20 bg-secondary/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 bg-card border border-border rounded-2xl p-8 text-center">
                  <img 
                    src={mattHeadshot} 
                    alt="Matt Brown - Interventionist and Host of The Party Wreckers Podcast" 
                    className="w-48 h-48 rounded-full mx-auto mb-6 object-cover border-4 border-primary/20"
                    loading="lazy"
                    decoding="async"
                  />
                  <h3 className="font-semibold text-xl text-foreground mb-1">Matt Brown</h3>
                  <p className="text-muted-foreground mb-4">Host & Interventionist</p>
                  <Button variant="outline" size="sm" asChild>
                    <a href={mattHeadshot} download="matt-brown-headshot.jpg">
                      <Download className="w-4 h-4 mr-2" />
                      Download Headshot
                    </a>
                  </Button>
                </div>
                
                <div className="order-1 lg:order-2">
                  <h2 className="font-script text-4xl text-burgundy mb-6">About the Host</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Matt Brown</strong> is a professional interventionist with over 20 years of experience helping families navigate addiction crises, treatment decisions, and the fallout that happens when fear starts running the home.
                    </p>
                    <p>
                      As the founder of Freedom Interventions, Matt has guided hundreds of families through some of the most painful and confusing moments of their lives. His work combines hard-earned field experience, recovery insight, and a practical understanding of what families can and cannot control.
                    </p>
                    <p>
                      He is known for telling the truth clearly, helping people understand the difference between helping and enabling, and giving families language they can actually use when emotions are high and the stakes are real.
                    </p>
                    <p>
                      Matt is available for interviews, speaking engagements, expert commentary, and panel conversations on addiction, intervention, family systems, and recovery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Topics Covered */}
        <section className="py-16 sm:py-20">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-script text-4xl text-burgundy mb-4 text-center">Topics & Expertise</h2>
              <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
                These are the conversations Matt is best known for, especially when the goal is to help families and audiences understand what addiction is really doing inside a home.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {topics.map((topic) => (
                  <div 
                    key={topic}
                    className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Headphones className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sample Interview Questions */}
        <section className="py-16 sm:py-20 bg-secondary/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-script text-4xl text-burgundy mb-4 text-center">Sample Interview Questions</h2>
              <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
                If you want to get past surface-level talking points, these are the kinds of questions that usually lead to the strongest conversations.
              </p>
              
              <div className="space-y-4">
                {sampleQuestions.map((question, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border"
                  >
                    <div className="w-10 h-10 rounded-full bg-burgundy/10 flex items-center justify-center flex-shrink-0">
                      <Quote className="w-5 h-5 text-burgundy" />
                    </div>
                    <p className="text-foreground text-lg">{question}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Booking & Contact */}
        <section className="py-16 sm:py-20">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-script text-4xl text-burgundy mb-4">Book Matt for Your Show</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Interested in having Matt Brown as a guest on your podcast, conference, 
                or media outlet? Get in touch for booking inquiries.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Mic className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Podcast Interviews</h3>
                  <p className="text-sm text-muted-foreground">
                    Available for remote podcast interviews on addiction, intervention, and family recovery topics.
                  </p>
                </div>
                
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">Expert Commentary</h3>
                  <p className="text-sm text-muted-foreground">
                    Available for media commentary on addiction-related news, trends, and family dynamics.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <a href="mailto:matt@partywreckers.com?subject=Booking%20Inquiry%20-%20Matt%20Brown">
                    <Mail className="w-4 h-4 mr-2" />
                    matt@partywreckers.com
                  </a>
                </Button>
                
              </div>
            </div>
          </div>
        </section>

        {/* Podcast Links */}
        <section className="py-16 sm:py-20 bg-gradient-hero">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-script text-4xl text-burgundy mb-4">Listen to the Podcast</h2>
              <p className="text-muted-foreground mb-8">
                The Party Wreckers is available on all major podcast platforms.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Button variant="outline" asChild>
                  <a
                    href="https://podcasts.apple.com/us/podcast/the-party-wreckers/id1611904917"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apple Podcasts
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://open.spotify.com/show/4YJLvnFuZr5EkcGs9b47fn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Spotify
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://www.youtube.com/@ThePartyWreckers"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    YouTube
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://music.amazon.com/podcasts/b7bf2801-8447-4dfc-9857-aa41cd4cfc64/the-party-wreckers"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Amazon Music
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Press;
