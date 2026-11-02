import { PODCAST_PLATFORM_URLS } from "@/lib/podcastPlatforms";

const partyWreckersTracking =
  "source=party_wreckers&utm_source=party_wreckers&utm_medium=referral&utm_campaign=party_wreckers_funnel";

const withTracking = (href: string, content?: string) => {
  const url = new URL(href);
  const params = new URLSearchParams(partyWreckersTracking);
  params.forEach((value, key) => url.searchParams.set(key, value));
  if (content) url.searchParams.set("utm_content", content);
  return url.toString();
};

/** @deprecated Import from "@/lib/podcastPlatforms" instead. */
export const podcastLinks = {
  apple: PODCAST_PLATFORM_URLS.apple,
  spotify: PODCAST_PLATFORM_URLS.spotify,
  youtube: PODCAST_PLATFORM_URLS.youtube,
};

export const funnelLinks = {
  partyWreckersBridge: "/from-party-wreckers",
  familySquares: withTracking("https://soberhelpline.com/family-squares", "family_squares"),
  soberHelpline: withTracking("https://soberhelpline.com/start-here", "sober_helpline_start_here"),
  freedomStartHere: withTracking("https://freedominterventions.com/start-here", "freedom_start_here"),
  freedomConsult: withTracking("https://freedominterventions.com/?type=consultation#booking", "freedom_free_consult"),
  freedomPodcastBridge: withTracking("https://freedominterventions.com/party-wreckers-podcast", "freedom_podcast_bridge"),
  freedomReadiness: withTracking("https://freedominterventions.com/intervention-readiness", "freedom_intervention_readiness"),
  freedomContact: withTracking("https://freedominterventions.com/start-here", "freedom_get_answers_now"),
};

export const openClawPhoneNumbers = {
  partyWreckers: "",
  soberHelpline: "",
  freedomInterventions: "",
};
