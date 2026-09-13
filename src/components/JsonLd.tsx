import mattHeadshot from "@/assets/matt-headshot.jpg";
import { Helmet } from "react-helmet";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

const OG_IMAGE = DEFAULT_OG_IMAGE;

// Podcast Schema
export const PodcastJsonLd = () => {
  const podcastSchema = {
    "@context": "https://schema.org",
    "@type": "PodcastSeries",
    "name": SITE_NAME,
    "description": "Real conversations about addiction, intervention, and recovery. Host Matt Brown helps families find hope and practical guidance.",
    "url": SITE_URL,
    "image": OG_IMAGE,
    "author": {
      "@type": "Person",
      "name": "Matt Brown",
      "url": `${SITE_URL}/host`
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": OG_IMAGE
      }
    },
    "genre": ["Health", "Mental Health", "Addiction", "Family", "Recovery"],
    "inLanguage": "en-US",
    "webFeed": "https://feeds.buzzsprout.com/1941777.rss"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(podcastSchema)}
      </script>
    </Helmet>
  );
};

// Organization Schema
export const OrganizationJsonLd = () => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_NAME,
    "url": SITE_URL,
    "logo": OG_IMAGE,
    "description": "A podcast helping families navigate addiction, intervention, and recovery.",
    "email": "matt@partywreckers.com",
    "sameAs": [
      "https://www.tiktok.com/@mattbrowninterventionist",
      "https://www.instagram.com/mattbrowninterventionist/",
      "https://www.facebook.com/mbrownsober",
      "https://www.youtube.com/@ThePartyWreckers",
      "https://podcasts.apple.com/us/podcast/the-party-wreckers/id1611904917",
      "https://open.spotify.com/show/4YJLvnFuZr5EkcGs9b47fn"
    ],
    "founder": {
      "@type": "Person",
      "name": "Matt Brown"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "matt@partywreckers.com",
      "telephone": "+1-458-298-8004"
    },
    "telephone": "+1-458-298-8004"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(orgSchema)}
      </script>
    </Helmet>
  );
};

// Person Schema for Host page
export const PersonJsonLd = () => {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Matt Brown",
    "jobTitle": "Professional Interventionist",
    "description": "An experienced interventionist with over 20 years helping families navigate addiction and recovery.",
    "url": `${SITE_URL}/host`,
    "image": new URL(mattHeadshot, SITE_URL).href,
    "email": "matt@partywreckers.com",
    "knowsAbout": [
      "Addiction Intervention",
      "Family Recovery",
      "Substance Use Disorder Treatment",
      "Family Therapy",
      "Recovery Coaching",
      "Enabling vs Supporting",
      "Boundary Setting"
    ],
    "sameAs": [
      "https://www.tiktok.com/@mattbrowninterventionist",
      "https://www.instagram.com/mattbrowninterventionist/",
      "https://www.facebook.com/mbrownsober",
      "https://www.youtube.com/@ThePartyWreckers"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": SITE_NAME
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
    </Helmet>
  );
};

// WebSite Schema with SearchAction for Sitelinks Search Box
export const WebsiteJsonLd = () => {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_NAME,
    "url": SITE_URL,
    "description": "Real conversations about addiction, intervention, and recovery.",
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/episodes?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};

// FAQ Schema for Family Resources and other pages
export const FAQJsonLd = ({ faqs }: { faqs: { question: string; answer: string }[] }) => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

// BreadcrumbList Schema
export const BreadcrumbJsonLd = ({ items }: { items: { name: string; url: string }[] }) => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${SITE_URL}${item.url}`
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

// Article/BlogPosting Schema for blog articles
export const ArticleJsonLd = ({
  title,
  description,
  image,
  datePublished,
  dateModified,
  slug,
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  slug: string;
}) => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Person",
      "name": "Matt Brown",
      "url": `${SITE_URL}/host`
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": OG_IMAGE
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
    </Helmet>
  );
};

// HowTo Schema for guides and resources (AEO optimization)
export const HowToJsonLd = ({
  name,
  description,
  steps,
  totalTime,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
  totalTime?: string;
}) => {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    ...(totalTime && { "totalTime": totalTime }),
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(howToSchema)}
      </script>
    </Helmet>
  );
};

// Speakable Schema for voice search optimization (AEO)
export const SpeakableJsonLd = ({
  url,
  cssSelectors,
}: {
  url: string;
  cssSelectors: string[];
}) => {
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": cssSelectors
    },
    "url": url
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(speakableSchema)}
      </script>
    </Helmet>
  );
};

// Episode Schema for podcast episodes
export const PodcastEpisodeJsonLd = ({
  title,
  description,
  episodeNumber,
  datePublished,
  duration,
  audioUrl,
}: {
  title: string;
  description: string;
  episodeNumber: number;
  datePublished: string;
  duration: number;
  audioUrl: string;
}) => {
  const episodeSchema = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "name": title,
    "description": description,
    "episodeNumber": episodeNumber,
    "datePublished": datePublished,
    "timeRequired": `PT${Math.floor(duration / 60)}M`,
    "associatedMedia": {
      "@type": "AudioObject",
      "contentUrl": audioUrl
    },
    "partOfSeries": {
      "@type": "PodcastSeries",
      "name": "The Party Wreckers Podcast",
      "url": SITE_URL
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(episodeSchema)}
      </script>
    </Helmet>
  );
};

// ItemList Schema for episode listings (AEO - helps with carousel results)
export const EpisodeListJsonLd = ({
  episodes,
}: {
  episodes: { title: string; url: string; position: number }[];
}) => {
  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": episodes.map((ep) => ({
      "@type": "ListItem",
      "position": ep.position,
      "name": ep.title,
      "url": ep.url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(listSchema)}
      </script>
    </Helmet>
  );
};

// EducationalOccupationalCredential for expertise (E-E-A-T signals)
export const ExpertiseJsonLd = () => {
  const expertiseSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Matt Brown",
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Addiction Interventionist",
      "description": "Professional interventionist specializing in helping families navigate addiction crises"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(expertiseSchema)}
      </script>
    </Helmet>
  );
};

// Medical/Health specific schema for addiction-related content
export const MedicalWebPageJsonLd = ({
  name,
  description,
  url,
  lastReviewed,
}: {
  name: string;
  description: string;
  url: string;
  lastReviewed?: string;
}) => {
  const medicalSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": name,
    "description": description,
    "url": url,
    "audience": {
      "@type": "PeopleAudience",
      "audienceType": "Families affected by addiction"
    },
    "specialty": {
      "@type": "MedicalSpecialty",
      "name": "Addiction Medicine"
    },
    ...(lastReviewed && { "lastReviewed": lastReviewed }),
    "reviewedBy": {
      "@type": "Person",
      "name": "Matt Brown",
      "jobTitle": "Professional Interventionist"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(medicalSchema)}
      </script>
    </Helmet>
  );
};

export const WebPageJsonLd = ({
  name,
  description,
  url,
  about,
}: {
  name: string;
  description: string;
  url: string;
  about?: string[];
}) => {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    "url": url,
    "isPartOf": {
      "@type": "WebSite",
      "name": SITE_NAME,
      "url": SITE_URL
    },
    "author": {
      "@type": "Person",
      "name": "Matt Brown",
      "url": `${SITE_URL}/host`
    },
    ...(about && {
      "about": about.map((topic) => ({
        "@type": "Thing",
        "name": topic
      }))
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>
    </Helmet>
  );
};

export const DefinedTermSetJsonLd = ({
  name,
  description,
  url,
  terms,
}: {
  name: string;
  description: string;
  url: string;
  terms: { term: string; definition: string }[];
}) => {
  const termSetSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": name,
    "description": description,
    "url": url,
    "hasDefinedTerm": terms.map((item) => ({
      "@type": "DefinedTerm",
      "name": item.term,
      "description": item.definition,
      "inDefinedTermSet": url
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(termSetSchema)}
      </script>
    </Helmet>
  );
};

export const CollectionPageJsonLd = ({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string; description?: string }[];
}) => {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": name,
    "description": description,
    "url": url,
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "WebPage",
          "name": item.name,
          "url": item.url,
          ...(item.description && { "description": item.description })
        }
      }))
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(collectionSchema)}
      </script>
    </Helmet>
  );
};
