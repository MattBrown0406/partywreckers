import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Heart, ExternalLink, Phone, Users, BookOpen, Shield, CheckCircle, MessageCircle, Headphones, Clock, Video, HeartHandshake, Target, Calendar, Zap, Smile, MessageSquare, Laptop, UserCheck, BadgePercent, Globe, Mic, Sparkles, DollarSign, Gift, TrendingUp, Radio, Mail, Brain, Eye, MapPin, Vote } from "lucide-react";
import { Button } from "@/components/ui/button";
import soberHelplineLogo from "@/assets/sober-helpline-logo.png";
import familybridgeLogo from "@/assets/familybridge-logo.png";
import betterhelpLogo from "@/assets/betterhelp-logo.png";
import SEOHead from "@/components/SEOHead";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import TrackedExternalLink from "@/components/TrackedExternalLink";
import SponsorPlacement from "@/components/SponsorPlacement";
import { funnelLinks } from "@/lib/funnelLinks";
import { sponsors } from "@/lib/sponsorInventory";

const Sponsors = () => {
  return (
    <>
      <SEOHead
        title="Sponsor The Party Wreckers Podcast | Partnership Opportunities"
        description="Partner with The Party Wreckers Podcast to reach families navigating addiction and recovery. Ethical sponsorship opportunities available."
        canonical="/sponsors"
      />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Sponsors", url: "/sponsors" }
      ]} />
      
      <Navbar />
      
      <main className="min-h-screen bg-background pt-20 sm:pt-24">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 bg-gradient-hero relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30" />
          
          <div className="container px-4 relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border mb-6">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground uppercase tracking-widest">Our Partners</span>
              </div>
              
              <h1 className="font-script text-5xl sm:text-6xl text-burgundy mb-6">
                Support Our Sponsors
              </h1>
              
              <p className="text-lg sm:text-xl text-muted-foreground mb-6">
                These are resources and partners we believe can genuinely help families, listeners, and the larger mission behind The Party Wreckers. This page is here to connect you with things that are actually useful, not random sponsorship noise.
              </p>
              
              {/* Direct Support CTA - Top */}
              <div className="relative bg-gradient-to-r from-burgundy/20 via-primary/10 to-burgundy/20 border border-primary/30 rounded-2xl p-6 sm:p-8 overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-0 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-pulse" />
                  <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-burgundy/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
                </div>
                
                <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                      <Mic className="w-7 h-7 text-primary" />
                    </div>
                    <div className="text-center sm:text-left">
                      <p className="text-foreground font-semibold text-lg">Support the Podcast Directly</p>
                      <p className="text-muted-foreground text-sm">Small monthly support helps us keep making honest resources for families who need them</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" asChild>
                      <TrackedExternalLink
                        href="https://www.buzzsprout.com/1941777/support"
                        target="_blank"
                        rel="noopener noreferrer"
                        eventName="sponsor_click"
                        ctaLabel="Buzzsprout support contribution"
                      >
                        <Gift className="w-4 h-4 mr-2" />
                        Contribute Now
                      </TrackedExternalLink>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sponsor Directory */}
        <section className="border-y border-border bg-card py-12 sm:py-16">
          <div className="container px-4">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
                <div>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">Sponsor directory</p>
                  <h2 className="font-script text-4xl text-burgundy sm:text-5xl">Useful Partners, Cleanly Organized</h2>
                </div>
                <p className="text-muted-foreground">
                  We keep sponsor placement selective so the site stays trustworthy for listeners and valuable for partners.
                  Sponsors here should make sense for families, recovery, mental health, or the podcast community.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {sponsors.map((sponsor) => (
                  <article key={sponsor.id} className="rounded-lg border border-border bg-background p-5">
                    <div className="mb-4 flex h-16 items-center justify-center rounded-lg bg-white p-3">
                      {sponsor.image ? (
                        <img src={sponsor.image} alt={sponsor.imageAlt || sponsor.name} className="max-h-full max-w-full object-contain" loading="lazy" decoding="async" />
                      ) : (
                        <span className="font-semibold text-foreground">{sponsor.name}</span>
                      )}
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">{sponsor.label}</p>
                    <h3 className="mt-2 text-xl font-semibold text-foreground">{sponsor.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{sponsor.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {sponsor.fit.map((item) => (
                        <span key={item} className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-muted-foreground">
                          {item}
                        </span>
                      ))}
                    </div>
                    <Button className="mt-5 w-full" variant={sponsor.featured ? "default" : "outline"} asChild>
                      <TrackedExternalLink
                        href={sponsor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        eventName="sponsor_click"
                        ctaLabel={`Sponsors directory ${sponsor.name}`}
                        metadata={{ sponsor_id: sponsor.id, sponsor_name: sponsor.name, placement: "sponsors_directory" }}
                      >
                        {sponsor.cta}
                        <ExternalLink className="h-4 w-4" />
                      </TrackedExternalLink>
                    </Button>
                  </article>
                ))}
              </div>

              <div className="mt-8">
                <SponsorPlacement placement="sponsors" title="Featured sponsor" />
              </div>
            </div>
          </div>
        </section>

        {/* Sponsors Content */}
        <section className="py-16 sm:py-24">
          <div className="container px-4">
            <div className="max-w-5xl mx-auto">
              {/* Sober Helpline - Dynamic Featured Sponsor Card */}
              <div className="relative bg-gradient-to-br from-emerald-900/20 via-teal-900/10 to-background border-2 border-emerald-600/30 rounded-2xl overflow-hidden group">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-20 -right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
                </div>
                
                {/* Featured Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 text-emerald-50 text-xs font-semibold uppercase tracking-wider shadow-lg">
                    <Shield className="w-3.5 h-3.5" />
                    Featured Partner
                  </span>
                </div>
                
                <div className="relative p-8 sm:p-12">
                  {/* Header Section */}
                  <div className="flex flex-col lg:flex-row items-center gap-8 mb-10">
                    <div className="flex-shrink-0">
                      <TrackedExternalLink
                        href={funnelLinks.soberHelpline}
                        target="_blank"
                        rel="noopener noreferrer"
                        eventName="sponsor_click"
                        ctaLabel="Sponsor page Sober Helpline logo"
                        className="block transform transition-transform duration-300 hover:scale-105"
                      >
                        <div className="bg-white rounded-xl p-4 shadow-xl">
                          <img 
                            src={soberHelplineLogo} 
                            alt="Sober Helpline - Addiction Education Resources" 
                            className="w-72 h-auto"
                          />
                        </div>
                      </TrackedExternalLink>
                    </div>
                    
                    <div className="flex-1 text-center lg:text-left">
                      <h2 className="font-script text-4xl sm:text-5xl text-emerald-400 mb-4">
                        Sober Helpline
                      </h2>
                      <p className="text-xl text-foreground/90 font-medium mb-2">
                        Addiction Education Resources for Families
                      </p>
                      <p className="text-muted-foreground text-lg mb-2">
                        Built to help families understand addiction more clearly, find steadier footing, and make better decisions about treatment and support.
                      </p>
                      <p className="text-emerald-400 font-semibold">
                        🟢 Free Weekly Family Support Zoom Calls — Every Monday
                      </p>
                    </div>
                  </div>
                  
                  {/* Features Grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <div className="bg-background/50 backdrop-blur-sm border border-emerald-600/20 rounded-xl p-6 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10">
                      <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Family Discussion Forum</h3>
                      <p className="text-sm text-muted-foreground">A place for families to stop feeling isolated, hear from other people living it, and get grounded in something more useful than panic.</p>
                    </div>
                    
                    <div className="bg-background/50 backdrop-blur-sm border border-emerald-600/20 rounded-xl p-6 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10">
                      <div className="w-12 h-12 rounded-full bg-teal-600/20 flex items-center justify-center mb-4">
                        <BookOpen className="w-6 h-6 text-teal-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">DSM-5 Based Assessments</h3>
                      <p className="text-sm text-muted-foreground">Structured screening tools that help families understand whether what they are seeing rises to the level of a real substance use disorder.</p>
                    </div>
                    
                    <div className="bg-background/50 backdrop-blur-sm border border-emerald-600/20 rounded-xl p-6 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10">
                      <div className="w-12 h-12 rounded-full bg-cyan-600/20 flex items-center justify-center mb-4">
                        <Headphones className="w-6 h-6 text-cyan-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Guided Meditations</h3>
                      <p className="text-sm text-muted-foreground">Resources to help family members slow down, regulate, and stop letting fear call every shot.</p>
                    </div>
                    
                    <div className="bg-background/50 backdrop-blur-sm border border-emerald-600/20 rounded-xl p-6 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10">
                      <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center mb-4">
                        <CheckCircle className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Enabling Self-Assessment</h3>
                      <p className="text-sm text-muted-foreground">A clearer look at how love, fear, and good intentions can accidentally keep the cycle going.</p>
                    </div>
                    
                    <div className="bg-background/50 backdrop-blur-sm border border-emerald-600/20 rounded-xl p-6 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10">
                      <div className="w-12 h-12 rounded-full bg-teal-600/20 flex items-center justify-center mb-4">
                        <Shield className="w-6 h-6 text-teal-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Vetted Providers</h3>
                      <p className="text-sm text-muted-foreground">Find treatment providers and resources through a more thoughtful, family-centered lens.</p>
                    </div>
                    
                    <div className="bg-background/50 backdrop-blur-sm border border-emerald-600/20 rounded-xl p-6 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10">
                      <div className="w-12 h-12 rounded-full bg-cyan-600/20 flex items-center justify-center mb-4">
                        <MessageCircle className="w-6 h-6 text-cyan-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">60+ Premium Resources</h3>
                      <p className="text-sm text-muted-foreground">Exercises, videos, and practical tools built for families who need more than generic advice.</p>
                    </div>
                  </div>
                  
                  {/* CTA Section */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-emerald-600/20">
                    <Button 
                      size="lg" 
                      className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/25 transition-all duration-300 hover:shadow-emerald-500/40"
                      asChild
                    >
                      <TrackedExternalLink
                        href={funnelLinks.soberHelpline}
                        target="_blank"
                        rel="noopener noreferrer"
                        eventName="sponsor_click"
                        ctaLabel="Sponsor page Sober Helpline"
                      >
                        Visit SoberHelpline.com
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </TrackedExternalLink>
                    </Button>

                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-emerald-600/40 text-emerald-400 hover:bg-emerald-600/10"
                      asChild
                    >
                      <TrackedExternalLink
                        href={funnelLinks.familySquares}
                        target="_blank"
                        rel="noopener noreferrer"
                        eventName="family_squares_click"
                        ctaLabel="Sponsor page Monday call"
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Join Free Monday Zoom Call
                      </TrackedExternalLink>
                    </Button>
                    
                    <a
                      href="tel:+14582988008"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-emerald-600/30 text-emerald-400 hover:bg-emerald-600/10 transition-colors font-medium"
                    >
                      <Phone className="w-4 h-4" />
                      (458) 298-8008
                    </a>
                  </div>
                </div>
              </div>

              {/* FamilyBridge - Dynamic Sponsor Card */}
              <div className="mt-12 relative bg-gradient-to-br from-teal-900/20 via-cyan-900/10 to-background border-2 border-teal-600/30 rounded-2xl overflow-hidden group">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-20 -left-20 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
                </div>
                
                {/* AI-Powered Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-600 text-teal-50 text-xs font-semibold uppercase tracking-wider shadow-lg">
                    <Brain className="w-3.5 h-3.5" />
                    AI-Powered
                  </span>
                </div>
                
                <div className="relative p-8 sm:p-12">
                  {/* Header Section */}
                  <div className="flex flex-col lg:flex-row items-center gap-8 mb-10">
                    <div className="flex-shrink-0">
                      <a
                        href="https://familybridgeapp.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block transform transition-transform duration-300 hover:scale-105"
                      >
                        <div className="bg-white rounded-xl p-4 shadow-xl">
                          <img 
                            src={familybridgeLogo} 
                            alt="FamilyBridge - Healing Starts with Connection"
                            className="w-48 h-auto"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </a>
                    </div>
                    
                    <div className="flex-1 text-center lg:text-left">
                      <h2 className="font-script text-4xl sm:text-5xl text-teal-400 mb-4">
                        FamilyBridge
                      </h2>
                      <p className="text-xl text-foreground/90 font-medium mb-2">
                        Healing Starts with Connection
                      </p>
                      <p className="text-muted-foreground text-lg">
                        An AI-powered platform that helps families affected by addiction communicate safely, rebuild trust, and support their loved ones on the path to recovery.
                      </p>
                    </div>
                  </div>
                  
                  {/* Value Proposition Highlight */}
                  <div className="bg-gradient-to-r from-teal-600/20 to-cyan-600/20 border border-teal-500/30 rounded-xl p-6 mb-10 text-center">
                    <p className="text-lg text-foreground/90 mb-2">
                      <span className="text-teal-400 font-bold">Rebuild Trust Through Transparency</span>
                    </p>
                    <p className="text-muted-foreground">A secure space for families to stay connected, set healthy boundaries, and support recovery—without enabling.</p>
                  </div>
                  
                  {/* Features Grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <div className="bg-background/50 backdrop-blur-sm border border-teal-600/20 rounded-xl p-6 transition-all duration-300 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10">
                      <div className="w-12 h-12 rounded-full bg-teal-600/20 flex items-center justify-center mb-4">
                        <Eye className="w-6 h-6 text-teal-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">AI Pattern Intelligence</h3>
                      <p className="text-sm text-muted-foreground">Analyzes interactions to identify concerning patterns early, allowing for proactive intervention before crises occur.</p>
                    </div>
                    
                    <div className="bg-background/50 backdrop-blur-sm border border-teal-600/20 rounded-xl p-6 transition-all duration-300 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10">
                      <div className="w-12 h-12 rounded-full bg-cyan-600/20 flex items-center justify-center mb-4">
                        <MessageSquare className="w-6 h-6 text-cyan-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">AI Chat Moderation</h3>
                      <p className="text-sm text-muted-foreground">Real-time filtering of harmful or toxic language keeps family communication constructive and safe.</p>
                    </div>
                    
                    <div className="bg-background/50 backdrop-blur-sm border border-teal-600/20 rounded-xl p-6 transition-all duration-300 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10">
                      <div className="w-12 h-12 rounded-full bg-teal-600/20 flex items-center justify-center mb-4">
                        <DollarSign className="w-6 h-6 text-teal-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Transparent Financial Requests</h3>
                      <p className="text-sm text-muted-foreground">AI-monitored money requests with family voting for accountability—no more enabling through hidden transactions.</p>
                    </div>
                    
                    <div className="bg-background/50 backdrop-blur-sm border border-teal-600/20 rounded-xl p-6 transition-all duration-300 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10">
                      <div className="w-12 h-12 rounded-full bg-cyan-600/20 flex items-center justify-center mb-4">
                        <MapPin className="w-6 h-6 text-cyan-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Verified Meeting Check-Ins</h3>
                      <p className="text-sm text-muted-foreground">Location verification for recovery meeting attendance builds trust through consistency and accountability.</p>
                    </div>
                    
                    <div className="bg-background/50 backdrop-blur-sm border border-teal-600/20 rounded-xl p-6 transition-all duration-300 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10">
                      <div className="w-12 h-12 rounded-full bg-teal-600/20 flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-teal-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Family Groups</h3>
                      <p className="text-sm text-muted-foreground">Create private family groups where everyone stays connected and informed throughout the recovery journey.</p>
                    </div>
                    
                    <div className="bg-background/50 backdrop-blur-sm border border-teal-600/20 rounded-xl p-6 transition-all duration-300 hover:border-teal-500/40 hover:shadow-lg hover:shadow-teal-500/10">
                      <div className="w-12 h-12 rounded-full bg-cyan-600/20 flex items-center justify-center mb-4">
                        <Shield className="w-6 h-6 text-cyan-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Professional Oversight</h3>
                      <p className="text-sm text-muted-foreground">AI-generated insights for treatment centers and private practitioners to facilitate better family guidance.</p>
                    </div>
                  </div>
                  
                  {/* CTA Section */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-teal-600/20">
                    <Button 
                      size="lg" 
                      className="bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/25 transition-all duration-300 hover:shadow-teal-500/40"
                      asChild
                    >
                      <a
                        href="https://familybridgeapp.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Start Your Family's Journey
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                    
                    <Button 
                      variant="outline"
                      size="lg" 
                      className="border-teal-600/30 text-teal-400 hover:bg-teal-600/10"
                      asChild
                    >
                      <a
                        href="https://familybridgeapp.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Create Your Family Group
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* BetterHelp - Dynamic Sponsor Card */}
              <div className="mt-12 relative bg-gradient-to-br from-green-900/20 via-lime-900/10 to-background border-2 border-green-600/30 rounded-2xl overflow-hidden group">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-20 -right-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-lime-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
                </div>
                
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-600 text-green-50 text-xs font-semibold uppercase tracking-wider shadow-lg">
                    <BadgePercent className="w-3.5 h-3.5" />
                    10% Off First Month
                  </span>
                </div>
                
                <div className="relative p-8 sm:p-12">
                  {/* Header Section */}
                  <div className="flex flex-col lg:flex-row items-center gap-8 mb-10">
                    <div className="flex-shrink-0">
                      <a
                        href="https://betterhelp.com/partywreckers"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block transform transition-transform duration-300 hover:scale-105"
                      >
                        <div className="bg-[#3a5a40] rounded-xl p-6 shadow-xl">
                          <img 
                            src={betterhelpLogo} 
                            alt="BetterHelp - You Deserve to Be Happy"
                            className="w-64 h-auto"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      </a>
                    </div>
                    
                    <div className="flex-1 text-center lg:text-left">
                      <h2 className="font-script text-4xl sm:text-5xl text-green-400 mb-4">
                        BetterHelp
                      </h2>
                      <p className="text-xl text-foreground/90 font-medium mb-2">
                        You Deserve to Be Happy
                      </p>
                      <p className="text-muted-foreground text-lg">
                        The world's largest therapy service. 100% online. Professional, licensed, and vetted therapists who you can trust.
                      </p>
                    </div>
                  </div>
                  
                  {/* Stats Highlight */}
                  <div className="grid grid-cols-3 gap-4 mb-10">
                    <div className="bg-gradient-to-br from-green-600/20 to-green-700/10 border border-green-500/20 rounded-xl p-4 text-center">
                      <p className="text-green-400 font-bold text-2xl sm:text-3xl">35,000+</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">Licensed Therapists</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-600/20 to-green-700/10 border border-green-500/20 rounded-xl p-4 text-center">
                      <p className="text-green-400 font-bold text-2xl sm:text-3xl">6M+</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">People Helped</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-600/20 to-green-700/10 border border-green-500/20 rounded-xl p-4 text-center">
                      <p className="text-green-400 font-bold text-2xl sm:text-3xl">HSA/FSA</p>
                      <p className="text-muted-foreground text-xs sm:text-sm">Accepted</p>
                    </div>
                  </div>
                  
                  {/* Features Grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <div className="bg-background/50 backdrop-blur-sm border border-green-600/20 rounded-xl p-6 transition-all duration-300 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10">
                      <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-green-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Individual Therapy</h3>
                      <p className="text-sm text-muted-foreground">Personal one-on-one therapy sessions tailored to your unique needs and goals.</p>
                    </div>
                    
                    <div className="bg-background/50 backdrop-blur-sm border border-green-600/20 rounded-xl p-6 transition-all duration-300 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10">
                      <div className="w-12 h-12 rounded-full bg-lime-600/20 flex items-center justify-center mb-4">
                        <HeartHandshake className="w-6 h-6 text-lime-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Couples Therapy</h3>
                      <p className="text-sm text-muted-foreground">Strengthen your relationship with professional guidance for you and your partner.</p>
                    </div>
                    
                    <div className="bg-background/50 backdrop-blur-sm border border-green-600/20 rounded-xl p-6 transition-all duration-300 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10">
                      <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center mb-4">
                        <Smile className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Teen Therapy</h3>
                      <p className="text-sm text-muted-foreground">Specialized support for teens navigating life's challenges with age-appropriate care.</p>
                    </div>
                    
                    <div className="bg-background/50 backdrop-blur-sm border border-green-600/20 rounded-xl p-6 transition-all duration-300 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10">
                      <div className="w-12 h-12 rounded-full bg-green-600/20 flex items-center justify-center mb-4">
                        <MessageSquare className="w-6 h-6 text-green-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Multiple Formats</h3>
                      <p className="text-sm text-muted-foreground">Messages, live chat, phone calls, or video sessions—communicate however works for you.</p>
                    </div>
                    
                    <div className="bg-background/50 backdrop-blur-sm border border-green-600/20 rounded-xl p-6 transition-all duration-300 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10">
                      <div className="w-12 h-12 rounded-full bg-lime-600/20 flex items-center justify-center mb-4">
                        <UserCheck className="w-6 h-6 text-lime-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">Vetted Therapists</h3>
                      <p className="text-sm text-muted-foreground">All therapists are licensed, accredited, and experienced professionals you can trust.</p>
                    </div>
                    
                    <div className="bg-background/50 backdrop-blur-sm border border-green-600/20 rounded-xl p-6 transition-all duration-300 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10">
                      <div className="w-12 h-12 rounded-full bg-emerald-600/20 flex items-center justify-center mb-4">
                        <Globe className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">100% Online</h3>
                      <p className="text-sm text-muted-foreground">Access therapy from anywhere, anytime. No commute, no waiting rooms.</p>
                    </div>
                  </div>
                  
                  {/* Family Support Note */}
                  <div className="bg-green-600/10 border border-green-500/20 rounded-xl p-6 mb-10 text-center">
                    <p className="text-foreground/90">
                      <span className="font-medium">Supporting a loved one through addiction?</span> Having a professional to talk to can make all the difference. Whether you're dealing with anxiety, depression, relationship issues, or caregiver stress—BetterHelp is here for you.
                    </p>
                  </div>
                  
                  {/* CTA Section */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t border-green-600/20">
                    <Button 
                      size="lg" 
                      className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/25 transition-all duration-300 hover:shadow-green-500/40"
                      asChild
                    >
                      <a
                        href="https://betterhelp.com/partywreckers"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Started — 10% Off
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                    
                    <p className="text-sm text-muted-foreground">
                      Use our partner link for your discount
                    </p>
                  </div>
                </div>
              </div>

              {/* Become a Sponsor - Dynamic Banner */}
              <div className="mt-12 relative overflow-hidden rounded-2xl">
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-burgundy via-primary to-burgundy bg-[length:200%_100%] animate-[shimmer_3s_ease-in-out_infinite]" />
                
                {/* Overlay pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50" />
                
                {/* Floating elements */}
                <div className="absolute top-4 left-8 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse" />
                <div className="absolute bottom-4 right-12 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
                <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white/5 rounded-full blur-lg animate-pulse" style={{ animationDelay: "0.5s" }} />
                
                <div className="relative px-6 py-10 sm:px-12 sm:py-12">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    {/* Left content */}
                    <div className="flex-1 text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                        <TrendingUp className="w-4 h-4 text-white" />
                        <span className="text-white/90 text-sm font-medium">Growing Audience</span>
                      </div>
                      
                      <h3 className="font-script text-3xl sm:text-4xl text-white mb-3">
                        Partner With Us
                      </h3>
                      
                      <p className="text-white/80 text-lg max-w-lg">
                        Reach families actively seeking help with addiction and recovery. Your brand in front of an engaged, grateful audience.
                      </p>
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center gap-6 sm:gap-8">
                      <div className="text-center">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-2">
                          <Radio className="w-7 h-7 text-white" />
                        </div>
                        <p className="text-white font-bold text-xl">75+</p>
                        <p className="text-white/70 text-xs">Episodes & Growing</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-2">
                          <Users className="w-7 h-7 text-white" />
                        </div>
                        <p className="text-white font-bold text-xl">25K+</p>
                        <p className="text-white/70 text-xs">Listeners</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-2">
                          <Heart className="w-7 h-7 text-white" />
                        </div>
                        <p className="text-white font-bold text-xl">100%</p>
                        <p className="text-white/70 text-xs">Mission-Driven</p>
                      </div>
                    </div>
                    
                    {/* CTA */}
                    <div className="flex-shrink-0">
                      <Button 
                        size="lg" 
                        className="bg-white text-burgundy hover:bg-white/90 shadow-xl shadow-black/20 font-semibold group"
                        asChild
                      >
                        <Link to="/advertise">
                          <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                          Become a Sponsor
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
                
              {/* Direct Support CTA - Bottom */}
              <div className="mt-8 relative bg-gradient-to-br from-primary/10 via-burgundy/5 to-primary/10 border border-primary/20 rounded-xl p-6 overflow-hidden">
                {/* Animated elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-burgundy/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
                </div>
                
                <div className="relative text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-primary animate-pulse" />
                    </div>
                    <h4 className="font-script text-2xl text-primary normal-case">Support Directly</h4>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Love what we do? Your direct contribution helps us produce more episodes, reach more families, and keep spreading hope.
                  </p>
                  
                  {/* Contribution options */}
                  <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                    <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-background/50 border border-border">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-foreground">1</span>
                    </div>
                    <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-background/50 border border-border">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-foreground">5</span>
                    </div>
                    <div className="flex items-center gap-1 px-4 py-2 rounded-full bg-primary/20 border border-primary/30">
                      <DollarSign className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-foreground">10</span>
                      <Sparkles className="w-3 h-3 text-primary ml-1" />
                    </div>
                    <span className="text-muted-foreground text-sm">or any amount</span>
                  </div>
                  
                  <Button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" asChild>
                    <TrackedExternalLink
                      href="https://www.buzzsprout.com/1941777/support"
                      target="_blank"
                      rel="noopener noreferrer"
                      eventName="sponsor_click"
                      ctaLabel="Bottom Buzzsprout support"
                    >
                      <Gift className="w-4 h-4 mr-2" />
                      Support The Party Wreckers
                    </TrackedExternalLink>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
};

export default Sponsors;
