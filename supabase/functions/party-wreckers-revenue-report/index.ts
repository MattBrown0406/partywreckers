import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { countAdvertiserInquiriesSince, fetchFunnelEventsSince } from "../_shared/report-queries.ts";
import {
  ADVERTISER_INTENT_EVENTS,
  HELP_REQUEST_EVENT,
  LISTENER_LEAD_EVENTS,
  PAGE_VIEW_EVENT,
  READINESS_EVENTS,
  REVENUE_INTENT_EVENTS,
  SPONSOR_EVENTS,
  inSet,
} from "../_shared/funnel-events.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-report-secret",
};

type EventRow = {
  event_name: string | null;
  source_path: string | null;
  destination_url: string | null;
  cta_label: string | null;
  created_at: string;
  metadata: Record<string, unknown> | null;
};

const countBy = (
  rows: Array<Record<string, unknown>>,
  pick: (row: Record<string, unknown>) => string | null | undefined,
) => {
  const counts = new Map<string, number>();
  for (const row of rows) {
    const raw = pick(row);
    if (!raw) continue;
    const value = String(raw);
    counts.set(value, (counts.get(value) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 12);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const expectedSecret = Deno.env.get("PARTY_WRECKERS_REVENUE_SECRET");
    const providedSecret = req.headers.get("x-report-secret");

    if (!expectedSecret || providedSecret !== expectedSecret) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) {
      throw new Error("Supabase service role is not configured");
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const [allRows, advertiserCount] = await Promise.all([
      fetchFunnelEventsSince<EventRow>(supabase, since),
      countAdvertiserInquiriesSince(supabase, since),
    ]);
    const pageViews = allRows.filter((r) => r.event_name === PAGE_VIEW_EVENT).length;
    const rows = allRows.filter((r) => r.event_name !== PAGE_VIEW_EVENT);
    const helpRequests = rows.filter((r) => r.event_name === HELP_REQUEST_EVENT).length;

    const revenueIntent = rows.filter((r) => inSet(REVENUE_INTENT_EVENTS)(r.event_name)).length;
    const readiness = rows.filter((r) => inSet(READINESS_EVENTS)(r.event_name)).length;
    const advertiserIntent = rows.filter((r) => inSet(ADVERTISER_INTENT_EVENTS)(r.event_name));
    const listenerLeadEvents = rows.filter((r) => inSet(LISTENER_LEAD_EVENTS)(r.event_name));
    const sponsorEvents = rows.filter((r) => inSet(SPONSOR_EVENTS)(r.event_name));
    const sponsorImpressionRows = rows.filter((r) => r.event_name === "sponsor_impression");
    const sponsorClickRows = rows.filter((r) => r.event_name === "sponsor_click");

    const pickPage = (row: Record<string, unknown>) => {
      const meta = (row.metadata as Record<string, unknown> | null) || {};
      return (
        (row.source_path as string | null) ||
        (meta.page_path as string | undefined) ||
        (meta.page as string | undefined) ||
        (meta.location as string | undefined) ||
        null
      );
    };

    const pickDestination = (row: Record<string, unknown>) => {
      const meta = (row.metadata as Record<string, unknown> | null) || {};
      return (
        (row.destination_url as string | null) ||
        (row.cta_label as string | null) ||
        (meta.destination as string | undefined) ||
        (meta.cta as string | undefined) ||
        (meta.offer as string | undefined) ||
        null
      );
    };
    const pickSponsor = (row: Record<string, unknown>) => {
      const meta = (row.metadata as Record<string, unknown> | null) || {};
      return (
        (meta.sponsor_name as string | undefined) ||
        (meta.sponsor_id as string | undefined) ||
        (row.cta_label as string | null) ||
        null
      );
    };
    const pickPlacement = (row: Record<string, unknown>) => {
      const meta = (row.metadata as Record<string, unknown> | null) || {};
      return (meta.placement as string | undefined) || "unknown";
    };
    const sponsorClickThroughRate = sponsorImpressionRows.length
      ? Number((sponsorClickRows.length / sponsorImpressionRows.length).toFixed(4))
      : 0;

    const latest = rows.slice(0, 25).map((r) => ({
      event_name: r.event_name,
      page_path: pickPage(r as unknown as Record<string, unknown>),
      destination: pickDestination(r as unknown as Record<string, unknown>),
      created_at: r.created_at,
    }));

    return new Response(
      JSON.stringify({
        window_days: 30,
        totals: {
          events: allRows.length,
          page_views: pageViews,
          help_requests: helpRequests,
          revenue_intent_clicks: revenueIntent,
          consultation_requests: helpRequests,
          intervention_readiness_clicks: readiness,
          advertiser_intent_events: advertiserIntent.length,
          advertiser_inquiries: advertiserCount || 0,
          sponsor_impressions: sponsorImpressionRows.length,
          sponsor_clicks: sponsorClickRows.length,
          sponsor_click_through_rate: sponsorClickThroughRate,
          registrations: 0,
        },
        by_event: countBy(rows as unknown as Array<Record<string, unknown>>, (r) => r.event_name as string | null),
        top_pages: countBy(rows as unknown as Array<Record<string, unknown>>, pickPage),
        top_destinations: countBy(rows as unknown as Array<Record<string, unknown>>, pickDestination),
        listener_lead_pages: countBy(listenerLeadEvents as unknown as Array<Record<string, unknown>>, pickPage),
        advertiser_pages: countBy(advertiserIntent as unknown as Array<Record<string, unknown>>, pickPage),
        sponsor_activity_by_sponsor: countBy(sponsorEvents as unknown as Array<Record<string, unknown>>, pickSponsor),
        sponsor_pages: countBy(sponsorEvents as unknown as Array<Record<string, unknown>>, pickPage),
        sponsor_placements: countBy(sponsorEvents as unknown as Array<Record<string, unknown>>, pickPlacement),
        latest_events: latest,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
