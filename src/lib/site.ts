export const SITE_URL = "https://partywreckers.com";

export const SITE_NAME = "The Party Wreckers Podcast";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const SITE_PHONE_DISPLAY = "(458) 298-8004";
export const SITE_PHONE_TEL = "+14582988004";
export const SITE_PHONE_HREF = `tel:${SITE_PHONE_TEL}`;

/**
 * Self-serve booking page for a free 30-minute call with Matt (Calendly). It's a public
 * link, so it lives in code; VITE_BOOKING_URL overrides it. An empty value hides the buttons.
 */
export const BOOKING_URL = (
  (import.meta.env.VITE_BOOKING_URL as string | undefined) || "https://calendly.com/matt-freedominterventions/30min"
).trim();

export const isBookingEnabled = BOOKING_URL.startsWith("https://");
