// One definition of the funnel events, shared by the tracker and both reports so the
// numbers mean the same thing everywhere.

/** Fired by FunnelRouteTracker on every route change, i.e. one per page view. */
export const PAGE_VIEW_EVENT = "party_wreckers_arrival";

/** Families moving toward help: support group, answers, readiness check, or a call. */
export const LISTENER_LEAD_EVENTS = [
  "family_squares_click",
  "get_answers_now_click",
  "intervention_readiness_click",
  "freedom_bridge_click",
  "openclaw_phone_click",
] as const;

/** Sponsors and advertisers showing buying intent. */
export const ADVERTISER_INTENT_EVENTS = [
  "advertiser_package_click",
  "advertiser_inquiry_start",
  "advertiser_inquiry_click",
  "advertiser_email_click",
] as const;

/** Revenue intent = any family lead click or advertiser intent event. */
export const REVENUE_INTENT_EVENTS = [...LISTENER_LEAD_EVENTS, ...ADVERTISER_INTENT_EVENTS] as const;

export const READINESS_EVENTS = ["intervention_readiness_click"] as const;

export const SPONSOR_EVENTS = ["sponsor_impression", "sponsor_click"] as const;

export const QUIZ_EVENTS = ["quiz_started", "quiz_completed"] as const;

/**
 * Events the public tracker endpoint accepts from browsers. Form submissions are NOT in
 * this list: they're recorded server-side by the form functions themselves, so the
 * north-star count can't be inflated by anyone posting to the tracker.
 */
export const BROWSER_TRACKABLE_EVENTS = new Set<string>([
  PAGE_VIEW_EVENT,
  ...LISTENER_LEAD_EVENTS,
  ...ADVERTISER_INTENT_EVENTS,
  ...SPONSOR_EVENTS,
  "podcast_platform_click",
  "aeo_answer_cta_click",
  "aeo_source_cta_click",
  // Family check-in quiz at /family-check-in (metadata: the result id only, never answers).
  ...QUIZ_EVENTS,
]);

/** Recorded server-side by send-contact-email: the site's north-star metric. */
export const HELP_REQUEST_EVENT = "help_request_submitted";
export const NEWSLETTER_SIGNUP_EVENT = "newsletter_signup_submitted";
export const ADVERTISER_INQUIRY_EVENT = "advertiser_inquiry_submitted";

export const inSet = (names: readonly string[]) => {
  const set = new Set<string>(names);
  return (eventName: string | null | undefined) => !!eventName && set.has(eventName);
};
