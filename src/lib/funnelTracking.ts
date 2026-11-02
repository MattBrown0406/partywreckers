import { supabase } from "@/integrations/supabase/client";
import { safeGetItem, safeSetItem } from "@/lib/safeStorage";

type FunnelEventMetadata = Record<string, string | number | boolean | null | undefined>;

export interface PartyWreckersFunnelEvent {
  eventName: string;
  ctaLabel?: string;
  destinationUrl?: string;
  sourcePath?: string;
  metadata?: FunnelEventMetadata;
}

const anonymousIdKey = "party_wreckers_anonymous_id";

const getAnonymousId = () => {
  if (typeof window === "undefined") return "server";

  const existingId = safeGetItem(anonymousIdKey);
  if (existingId) return existingId;

  const newId = window.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  safeSetItem(anonymousIdKey, newId);
  return newId;
};

const getUrlParams = () => {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
    source: params.get("source"),
  };
};

export const trackPartyWreckersEvent = ({
  eventName,
  ctaLabel,
  destinationUrl,
  sourcePath,
  metadata,
}: PartyWreckersFunnelEvent) => {
  if (typeof window === "undefined") return;

  const payload = {
    event_name: eventName,
    cta_label: ctaLabel,
    destination_url: destinationUrl,
    source_path: sourcePath ?? `${window.location.pathname}${window.location.search}`,
    page_title: document.title,
    referrer: document.referrer || null,
    anonymous_id: getAnonymousId(),
    user_agent: navigator.userAgent,
    metadata: {
      ...getUrlParams(),
      ...metadata,
    },
  };

  void supabase.functions.invoke("track-party-wreckers-event", {
    body: payload,
  }).catch(() => {
    // Tracking should never block a family from reaching help.
  });
};
