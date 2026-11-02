// Public, read-only: listener questions Matt has answered on the show AND approved for
// the site (status 'answered', is_public, with an edited public_question).
//   ?episode=<slug>  questions answered in that episode
//   (no episode)     the latest 12
// Only the approved wording, topic and first name (or "A listener") are returned: never
// emails, the raw question text, or audio.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/http.ts";

const TABLE = "party_wreckers_listener_questions";
const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]{0,199}$/;
const LATEST_LIMIT = 12;
const EPISODE_LIMIT = 50;

const respond = (body: unknown, status = 200, maxAge = 300) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      "Content-Type": "application/json",
      "Cache-Control": `public, max-age=${maxAge}`,
    },
  });

interface PublicRow {
  public_question: string | null;
  topic: string | null;
  display_name: string | null;
  answered_at: string | null;
  episode_slug: string | null;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "GET" && req.method !== "POST") return respond({ error: "Method not allowed" }, 405, 0);

  const episode = new URL(req.url).searchParams.get("episode")?.trim().toLowerCase() || null;
  if (episode && !SLUG_PATTERN.test(episode)) return respond({ error: "Invalid episode" }, 400, 0);

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) throw new Error("Supabase service role is not configured");
    const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });

    let query = supabase
      .from(TABLE)
      .select("public_question, topic, display_name, answered_at, episode_slug")
      .eq("is_public", true)
      .eq("status", "answered")
      .not("public_question", "is", null);
    if (episode) query = query.eq("episode_slug", episode);

    const { data, error } = await query
      .order("answered_at", { ascending: false, nullsFirst: false })
      .limit(episode ? EPISODE_LIMIT : LATEST_LIMIT);
    if (error) throw error;

    const questions = ((data || []) as PublicRow[])
      .filter((row) => row.public_question && row.public_question.trim())
      .map((row) => ({
        public_question: (row.public_question as string).trim(),
        topic: row.topic,
        display_name: row.display_name?.trim() || "A listener",
        answered_at: row.answered_at,
        episode_slug: row.episode_slug,
      }));

    return respond(questions);
  } catch (error) {
    // Read-only and purely decorative on the site: answer with an empty list (briefly
    // cached) rather than an error, e.g. before the migration has been applied.
    console.error("[get-answered-questions]", error instanceof Error ? error.message : (error as { message?: string })?.message ?? error);
    return respond([], 200, 60);
  }
});
