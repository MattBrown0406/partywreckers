import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { buildNorthStar, countAdvertiserInquiriesSince, fetchFunnelEventsSince } from "../_shared/report-queries.ts";
import {
  ADVERTISER_INTENT_EVENTS,
  HELP_REQUEST_EVENT,
  LISTENER_LEAD_EVENTS,
  PAGE_VIEW_EVENT,
  REVENUE_INTENT_EVENTS,
  SPONSOR_EVENTS,
  inSet,
} from "../_shared/funnel-events.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-report-secret",
};

type EventRow = {
  event_name: string | null;
  source_path: string | null;
  destination_url: string | null;
  cta_label: string | null;
  created_at: string;
  metadata?: Record<string, unknown> | null;
};

const countBy = (
  rows: Array<Record<string, unknown>>,
  pick: string | ((row: Record<string, unknown>) => string | null | undefined),
) => {
  const counts = new Map<string, number>();

  for (const row of rows) {
    const raw = typeof pick === "string" ? row[pick] : pick(row);
    const value = String(raw || "unknown");
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
    const expectedSecret = Deno.env.get("PARTY_WRECKERS_REPORT_SECRET");
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

    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const [allRows, advertiserCount, northStar] = await Promise.all([
      fetchFunnelEventsSince<EventRow>(supabase, since),
      countAdvertiserInquiriesSince(supabase, since),
      buildNorthStar(supabase),
    ]);

    // Page views are counted on their own; the click/activity breakdowns below use the
    // remaining events so one page view per visit doesn't drown them out.
    const pageViewRows = allRows.filter((row) => row.event_name === PAGE_VIEW_EVENT);
    const rows = allRows.filter((row) => row.event_name !== PAGE_VIEW_EVENT);
    const helpRequests = rows.filter((row) => row.event_name === HELP_REQUEST_EVENT).length;

    const getAnswers = rows.filter((row) => row.event_name === "get_answers_now_click").length;
    const readiness = rows.filter((row) => row.event_name === "intervention_readiness_click").length;
    const familySquares = rows.filter((row) => row.event_name === "family_squares_click").length;
    const advertiserClicks = rows.filter((row) => row.event_name === "advertiser_inquiry_click").length;
    const advertiserStarts = rows.filter((row) => row.event_name === "advertiser_inquiry_start").length;
    const packageClicks = rows.filter((row) => row.event_name === "advertiser_package_click").length;
    const emailClicks = rows.filter((row) => row.event_name === "advertiser_email_click").length;

    const listenerLeadEvents = rows.filter((row) => inSet(LISTENER_LEAD_EVENTS)(row.event_name));
    const advertiserEvents = rows.filter((row) => inSet(ADVERTISER_INTENT_EVENTS)(row.event_name));
    const revenueIntentClicks = rows.filter((row) => inSet(REVENUE_INTENT_EVENTS)(row.event_name)).length;
    const sponsorEvents = rows.filter((row) => inSet(SPONSOR_EVENTS)(row.event_name));
    const sponsorImpressionRows = rows.filter((row) => row.event_name === "sponsor_impression");
    const sponsorClickRows = rows.filter((row) => row.event_name === "sponsor_click");
    const pickPackage = (row: Record<string, unknown>) => {
      const metadata = (row.metadata as Record<string, unknown> | null) || {};
      return (metadata.package_type as string | undefined) || (row.cta_label as string | null);
    };
    const pickSponsor = (row: Record<string, unknown>) => {
      const metadata = (row.metadata as Record<string, unknown> | null) || {};
      return (
        (metadata.sponsor_name as string | undefined) ||
        (metadata.sponsor_id as string | undefined) ||
        (row.cta_label as string | null)
      );
    };
    const pickPlacement = (row: Record<string, unknown>) => {
      const metadata = (row.metadata as Record<string, unknown> | null) || {};
      return (metadata.placement as string | undefined) || "unknown";
    };
    const sponsorClickThroughRate = sponsorImpressionRows.length
      ? Number((sponsorClickRows.length / sponsorImpressionRows.length).toFixed(4))
      : 0;

    return new Response(
      JSON.stringify({
        window_days: 30,
        totals: {
          help_requests: helpRequests,
          page_views: pageViewRows.length,
          events: allRows.length,
          family_squares_clicks: familySquares,
          get_answers_now_clicks: getAnswers,
          intervention_readiness_clicks: readiness,
          advertiser_inquiry_clicks: advertiserClicks,
          advertiser_inquiry_starts: advertiserStarts,
          advertiser_package_clicks: packageClicks,
          advertiser_email_clicks: emailClicks,
          advertiser_inquiries: advertiserCount || 0,
          sponsor_impressions: sponsorImpressionRows.length,
          sponsor_clicks: sponsorClickRows.length,
          sponsor_click_through_rate: sponsorClickThroughRate,
          revenue_intent_clicks: revenueIntentClicks,
        },
        north_star: northStar,
        top_viewed_pages: countBy(pageViewRows as unknown as Array<Record<string, unknown>>, "source_path"),
        by_event: countBy(rows, "event_name"),
        top_pages: countBy(rows, "source_path"),
        top_destinations: countBy(rows, "destination_url"),
        listener_lead_pages: countBy(listenerLeadEvents as unknown as Array<Record<string, unknown>>, "source_path"),
        listener_lead_destinations: countBy(listenerLeadEvents as unknown as Array<Record<string, unknown>>, "destination_url"),
        advertiser_pages: countBy(advertiserEvents as unknown as Array<Record<string, unknown>>, "source_path"),
        sponsor_package_interest: countBy(advertiserEvents as unknown as Array<Record<string, unknown>>, pickPackage),
        sponsor_impressions_by_sponsor: countBy(
          sponsorImpressionRows as unknown as Array<Record<string, unknown>>,
          pickSponsor,
        ),
        sponsor_clicks_by_sponsor: countBy(sponsorClickRows as unknown as Array<Record<string, unknown>>, pickSponsor),
        sponsor_placements: countBy(sponsorEvents as unknown as Array<Record<string, unknown>>, pickPlacement),
        sponsor_pages: countBy(sponsorEvents as unknown as Array<Record<string, unknown>>, "source_path"),
        latest_events: rows.slice(0, 25),
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
