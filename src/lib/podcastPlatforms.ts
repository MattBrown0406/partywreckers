import { useSyncExternalStore } from "react";
import { trackPartyWreckersEvent } from "@/lib/funnelTracking";

/** The one place the show's podcast-app URLs live. */
export type PodcastPlatformId = "apple" | "spotify" | "youtube" | "amazon";

export interface PodcastPlatform {
  id: PodcastPlatformId;
  name: string;
  url: string;
}

export const PODCAST_PLATFORM_URLS: Record<PodcastPlatformId, string> = {
  apple: "https://podcasts.apple.com/us/podcast/the-party-wreckers/id1611904917",
  spotify: "https://open.spotify.com/show/4YJLvnFuZr5EkcGs9b47fn",
  youtube: "https://www.youtube.com/@ThePartyWreckers",
  amazon: "https://music.amazon.com/podcasts/b7bf2801-8447-4dfc-9857-aa41cd4cfc64/the-party-wreckers",
};

export const PODCAST_PLATFORMS: Record<PodcastPlatformId, PodcastPlatform> = {
  apple: { id: "apple", name: "Apple Podcasts", url: PODCAST_PLATFORM_URLS.apple },
  spotify: { id: "spotify", name: "Spotify", url: PODCAST_PLATFORM_URLS.spotify },
  youtube: { id: "youtube", name: "YouTube", url: PODCAST_PLATFORM_URLS.youtube },
  amazon: { id: "amazon", name: "Amazon Music", url: PODCAST_PLATFORM_URLS.amazon },
};

/** Brand colour for each platform's icon (Tailwind arbitrary values). */
export const PLATFORM_ICON_COLOR: Record<PodcastPlatformId, string> = {
  apple: "text-[#B150E2]",
  spotify: "text-[#1DB954]",
  youtube: "text-[#FF0000]",
  amazon: "text-[#25D1DA]",
};

/** Apple's show page, opened on the ratings & reviews section. */
export const APPLE_PODCASTS_REVIEWS_URL = `${PODCAST_PLATFORM_URLS.apple}?see-all=reviews`;

/** Order used for the server render and before the device is known. */
export const NEUTRAL_PLATFORM_ORDER: PodcastPlatformId[] = ["apple", "spotify", "youtube", "amazon"];

export type ListenerDevice = "unknown" | "apple" | "android" | "desktop";

const DEVICE_PLATFORM_ORDER: Record<ListenerDevice, PodcastPlatformId[]> = {
  unknown: NEUTRAL_PLATFORM_ORDER,
  apple: ["apple", "spotify", "youtube", "amazon"],
  android: ["spotify", "youtube", "amazon", "apple"],
  desktop: ["spotify", "apple", "youtube", "amazon"],
};

/** How many platforms get a full-size button for each device (the rest are "other apps"). */
const DEVICE_FEATURED_COUNT: Record<ListenerDevice, number> = {
  unknown: 0,
  apple: 1,
  android: 2,
  desktop: 2,
};

interface NavigatorLike {
  userAgent?: string;
  platform?: string;
  maxTouchPoints?: number;
}

export const detectListenerDevice = (nav: NavigatorLike | undefined): ListenerDevice => {
  if (!nav) return "unknown";
  const ua = nav.userAgent ?? "";
  if (/android/i.test(ua)) return "android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "apple";
  // iPadOS reports itself as a Mac; Macs themselves ship with Apple Podcasts too.
  if (/Macintosh|Mac OS X/i.test(ua) || /^Mac/i.test(nav.platform ?? "")) return "apple";
  return "desktop";
};

let cachedDevice: ListenerDevice | null = null;
const getClientDevice = (): ListenerDevice => {
  if (cachedDevice === null) {
    cachedDevice = detectListenerDevice(typeof navigator === "undefined" ? undefined : navigator);
  }
  return cachedDevice;
};
const getServerDevice = (): ListenerDevice => "unknown";
const subscribeNoop = () => () => {};

/**
 * The visitor's device class. Prerendered HTML and the hydration pass always see
 * "unknown" (so markup matches), then React re-renders with the real device right
 * after hydrating. Client-side navigations get the real value immediately.
 */
export const useListenerDevice = (): ListenerDevice =>
  useSyncExternalStore(subscribeNoop, getClientDevice, getServerDevice);

export interface PlatformOrder {
  device: ListenerDevice;
  /** Every platform, best match for this device first. */
  ordered: PodcastPlatform[];
  /** Platforms that deserve a full-size button (empty until the device is known). */
  featured: PodcastPlatform[];
  /** Everything else. */
  others: PodcastPlatform[];
  /** The single best platform, or null before the device is known. */
  primary: PodcastPlatform | null;
}

export const getPlatformOrder = (device: ListenerDevice): PlatformOrder => {
  const ordered = DEVICE_PLATFORM_ORDER[device].map((id) => PODCAST_PLATFORMS[id]);
  const featuredCount = DEVICE_FEATURED_COUNT[device];
  return {
    device,
    ordered,
    featured: ordered.slice(0, featuredCount),
    others: ordered.slice(featuredCount),
    primary: featuredCount > 0 ? ordered[0] : null,
  };
};

export const usePlatformOrder = (): PlatformOrder => getPlatformOrder(useListenerDevice());

/** Where "Rate the show" should send this visitor: Spotify on Android, Apple everywhere else. */
export const getRateTarget = (device: ListenerDevice): { platform: PodcastPlatformId; url: string; name: string } =>
  device === "android"
    ? { platform: "spotify", url: PODCAST_PLATFORM_URLS.spotify, name: "Spotify" }
    : { platform: "apple", url: APPLE_PODCASTS_REVIEWS_URL, name: "Apple Podcasts" };

/** Every podcast-app click goes through here so the funnel report sees one event shape. */
export const trackPlatformClick = (
  platform: string,
  placement: string,
  destinationUrl: string,
  extra?: Record<string, string | number | boolean | null | undefined>,
) => {
  trackPartyWreckersEvent({
    eventName: "podcast_platform_click",
    ctaLabel: `${placement} ${platform}`,
    destinationUrl,
    metadata: { platform, placement, ...extra },
  });
};
