import { podcastFeedSnapshot } from "@/data/podcastFeedSnapshot";

const episodeCount = new Set(podcastFeedSnapshot.episodes.map((episode) => episode.id)).size;
const latestRelease = new Date(podcastFeedSnapshot.episodes[0].pubDate).toISOString().slice(0, 10);

export const advertiserFit = [
  "Ethical treatment providers",
  "Family support services",
  "Recovery-centered technology",
  "Sober living and continuing care",
  "Books, trainings, and professional education",
  "Brands serving parents, partners, and loved ones",
];

export const inventoryOptions = [
  "Any available inventory",
  "Episode sponsorship",
  "Monthly website placement",
  "Category partner availability",
  "Podcast mention only",
  "Custom bundle",
];

export const sponsorPackages = [
  {
    name: "Episode Sponsor",
    price: "Starts at $500",
    fit: "Best for a provider, author, coach, or recovery brand that wants a focused podcast placement around one relevant topic.",
    inventory: "One episode placement plus show-note link",
    deliverables: ["Host-read episode intro", "Show-note link", "Sponsor click tracking", "Monthly activity snapshot"],
    event: "episode_sponsor",
    bestFor: "Specific offers, launches, webinars, books, or treatment/service awareness.",
  },
  {
    name: "Monthly Site Sponsor",
    price: "Starts at $750/mo",
    fit: "Best for a sponsor that wants consistent visibility near evergreen family, addiction, and recovery content.",
    inventory: "Monthly site placement with tracked CTA",
    deliverables: ["Sponsor placement on selected pages", "Tracked sponsor CTA", "Sponsor directory listing", "Monthly activity summary"],
    event: "monthly_site_sponsor",
    bestFor: "Treatment centers, sober living, family coaching, therapy groups, or recovery tech.",
  },
  {
    name: "Bundle Sponsor",
    price: "Custom monthly package",
    fit: "Best for a serious partner that wants podcast, website, and resource-page visibility packaged together.",
    inventory: "Podcast plus site plus reportable clicks",
    deliverables: ["Podcast placement", "Selected website placements", "Sponsor directory feature", "Monthly sponsor report"],
    event: "bundle_package",
    bestFor: "Category partners and sponsors who want a larger share of attention.",
  },
];

export const proofPoints = [
  {
    label: `${episodeCount} podcast episodes`,
    body: `Feed library counted by unique episode ID; latest release ${latestRelease}. Episode numbering is not the library count.`,
  },
  {
    label: "High-intent audience",
    body: "People arrive while researching treatment, boundaries, family support, intervention, and what to do next.",
  },
  {
    label: "Podcast plus website",
    body: "Sponsors can appear in audio, show notes, resource pages, article placements, and referral paths.",
  },
  {
    label: "Monthly reporting",
    body: "Sponsor impressions, clicks, page activity, and package interest can be turned into a simple sponsor report.",
  },
];

export const proposalSteps = [
  "Choose the package that matches the sponsor's current goal.",
  "Confirm topic fit, audience fit, placement availability, and any category conflicts.",
  "Launch with tracked sponsor links and clear sponsor labels.",
  "Review the monthly sponsor summary and adjust the next placement.",
];
