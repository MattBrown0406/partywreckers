import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

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
): Promise<T[]> => {
  const rows: T[] = [];

  for (let from = 0; from < MAX_ROWS; from += PAGE_SIZE) {
    const { data, error } = await supabase
      .from("party_wreckers_funnel_events")
      .select("event_name, source_path, destination_url, cta_label, created_at, metadata")
      .gte("created_at", since)
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
