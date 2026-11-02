export const SITE_URL = "https://partywreckers.com";

export const SITE_NAME = "The Party Wreckers Podcast";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const SITE_PHONE_DISPLAY = "(458) 298-8004";
export const SITE_PHONE_TEL = "+14582988004";
export const SITE_PHONE_HREF = `tel:${SITE_PHONE_TEL}`;

/**
 * Self-serve booking page for a free 15-minute call (Calendly, Cal.com, etc.).
 * Set VITE_BOOKING_URL (or paste the link here); until then booking buttons are hidden.
 */
export const BOOKING_URL = ((import.meta.env.VITE_BOOKING_URL as string | undefined) || "").trim();

export const isBookingEnabled = BOOKING_URL.startsWith("https://");
