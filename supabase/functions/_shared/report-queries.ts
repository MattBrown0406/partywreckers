import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";
import { HELP_REQUEST_EVENT } from "./funnel-events.ts";

const PAGE_SIZE = 1000; // PostgREST returns at most this many rows per request by default.
const MAX_ROWS = 50_000;

/**
 * Funnel events since `since`, newest first. Pages with .range() because a single
 * request is capped at 1000 rows no matter what .limit() asks for, which silently
 * truncated every report total once traffic passed 1000 events a month. Pages are read
 * oldest-first so events inserted while paging land after the last page instead of
 * shifting rows across a page boundary (which would count one twice).
 */
export const fetchFunnelEventsSince = async <T = Record<string, unknown>>(
  supabase: SupabaseClient,
  since: string,
  options: { eventNames?: string[] } = {},
): Promise<T[]> => {
  const rows: T[] = [];

  for (let from = 0; from < MAX_ROWS; from += PAGE_SIZE) {
    let query = supabase
      .from("party_wreckers_funnel_events")
      .select("event_name, source_path, destination_url, cta_label, created_at, metadata")
      .gte("created_at", since);
    if (options.eventNames) query = query.in("event_name", options.eventNames);
    const { data, error } = await query
      .order("created_at", { ascending: true })
      .order("id", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);

    if (error) throw error;
    rows.push(...((data || []) as T[]));
    if (!data || data.length < PAGE_SIZE) break;
  }

  return rows.reverse();
};

/**
 * Real inbound advertiser inquiries since `since`. Prospects the owner imports through
 * the admin tool share the table and are flagged owner_added_target, so exclude them.
 */
export const countAdvertiserInquiriesSince = async (supabase: SupabaseClient, since: string) => {
  const { count, error } = await supabase
    .from("party_wreckers_advertiser_inquiries")
    .select("id", { count: "exact", head: true })
    .gte("created_at", since)
    .or("metadata->>owner_added_target.is.null,metadata->>owner_added_target.neq.true");

  if (error) throw error;
  return count || 0;
};

const PACIFIC = "America/Los_Angeles";
const DAY_MS = 24 * 60 * 60 * 1000;

/** YYYY-MM-DD of the Monday starting the (Pacific time) week that contains `date`. */
export const pacificWeekStart = (date: Date) => {
  const local = date.toLocaleDateString("en-CA", { timeZone: PACIFIC }); // YYYY-MM-DD
  const day = new Date(`${local}T00:00:00Z`);
  const mondayOffset = (day.getUTCDay() + 6) % 7;
  return new Date(day.getTime() - mondayOffset * DAY_MS).toISOString().slice(0, 10);
};

const WEEKS = 12;

/**
 * The north-star metric: families sending a request for help through the site each
 * week. help_request_submitted is recorded server-side by send-contact-email only.
 */
export const buildNorthStar = async (supabase: SupabaseClient, now = new Date()) => {
  const currentWeek = pacificWeekStart(now);
  const weekStarts = Array.from({ length: WEEKS }, (_, index) =>
    new Date(Date.parse(`${currentWeek}T00:00:00Z`) - (WEEKS - 1 - index) * 7 * DAY_MS).toISOString().slice(0, 10),
  );
  // Start a day early so the oldest Pacific Monday is fully covered in UTC.
  const since = new Date(Date.parse(`${weekStarts[0]}T00:00:00Z`) - DAY_MS).toISOString();

  const rows = await fetchFunnelEventsSince<{ created_at: string; source_path: string | null; metadata: Record<string, unknown> | null }>(
    supabase,
    since,
    { eventNames: [HELP_REQUEST_EVENT] },
  );

  const weekly = new Map(weekStarts.map((week) => [week, 0]));
  const sources = new Map<string, number>();
  const thirtyDaysAgo = now.getTime() - 30 * DAY_MS;

  for (const row of rows) {
    const created = new Date(row.created_at);
    const week = pacificWeekStart(created);
    if (weekly.has(week)) weekly.set(week, (weekly.get(week) || 0) + 1);
    if (created.getTime() >= thirtyDaysAgo) {
      const metadata = row.metadata || {};
      const source =
        (typeof metadata.source_article === "string" && metadata.source_article ? `/blog/${metadata.source_article}` : null) ||
        row.source_path ||
        (typeof metadata.form === "string" ? metadata.form : null) ||
        "unknown";
      sources.set(source, (sources.get(source) || 0) + 1);
    }
  }

  const weeklyList = weekStarts.map((week_start) => ({ week_start, count: weekly.get(week_start) || 0 }));
  return {
    this_week: weeklyList[WEEKS - 1].count,
    last_week: weeklyList[WEEKS - 2].count,
    weekly: weeklyList,
    by_source: [...sources.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10),
  };
};
