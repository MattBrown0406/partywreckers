import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { PodcastJsonLd, OrganizationJsonLd, WebsiteJsonLd, FAQJsonLd, ExpertiseJsonLd } from "@/components/JsonLd";
import EpisodeStarterPath from "@/components/EpisodeStarterPath";
import AdvertiserMediaStrip from "@/components/AdvertiserMediaStrip";
import ListenerRevenuePath from "@/components/ListenerRevenuePath";
import SourcePageLinks from "@/components/SourcePageLinks";
import FamilyBridgeBanner from "@/components/FamilyBridgeBanner";
import ListenerReviews from "@/components/ListenerReviews";
import { podcastFeedSnapshot } from "@/data/podcastFeedSnapshot";

// AEO-optimized FAQs for AI answer extraction
const homepageFAQs = [
  {
    question: "What is The Party Wreckers Podcast about?",
    answer: "The Party Wreckers Podcast is a show for families, loved ones, and professionals navigating substance use disorders. Hosted by Matt Brown, a professional interventionist with 20+ years of experience, the podcast covers addiction, intervention strategies, enabling vs. supporting, setting boundaries, and family recovery."
  },
  {
    question: "How can I help a family member with addiction?",
    answer: "Start by educating yourself about addiction as a disease, not a moral failure. Set healthy boundaries focused on your own behavior, not controlling theirs. Avoid enabling behaviors that reduce short-term discomfort but increase long-term harm. Consider professional guidance if conversations keep repeating without change, or if fear is driving your decisions."
  },
  {
    question: "What is the difference between helping and enabling?",
    answer: "Helping supports growth, responsibility, and accountability. Enabling reduces discomfort in the short term while increasing long-term harm. The difference is not intention—it's outcome. Paying rent so someone doesn't become homeless might be helping. Paying rent repeatedly while they continue using substances without consequences is likely enabling."
  },
  {
    question: "When should a family consider an intervention?",
    answer: "Consider professional intervention when: the same conversations keep happening without lasting change, boundaries are set then repeatedly broken, fear or urgency is driving decisions, family members are divided, finances or safety are deteriorating, or everyone is exhausted but no one knows what to do differently."
  },
  {
    question: "Who hosts The Party Wreckers Podcast?",
    answer: "Matt Brown hosts The Party Wreckers Podcast. He is a professional interventionist with over 20 years of experience helping families navigate addiction crises. He founded Freedom Interventions and has guided hundreds of families through difficult moments with compassion and practical strategies."
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="The Party Wreckers Podcast | Addiction, Intervention & Recovery"
        description="Real conversations about addiction, intervention, and recovery. Host Matt Brown helps families find hope and practical guidance with 20+ years of experience."
        canonical="/"
        keywords="addiction podcast, intervention help, family recovery, addiction support, Matt Brown interventionist, enabling vs supporting, addiction treatment, family addiction resources"
      />
      <PodcastJsonLd />
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <FAQJsonLd faqs={homepageFAQs} />
      <ExpertiseJsonLd />
      
      <Navbar />
      <main>
        <HeroSection />
        <SourcePageLinks />
        <EpisodeStarterPath episodes={podcastFeedSnapshot.episodes} />
        <ListenerReviews placement="home_rate_strip" />
        <FamilyBridgeBanner />
        <section id="about">
          <AboutSection />
        </section>
        <ListenerRevenuePath />
        <AdvertiserMediaStrip />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
