import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { defaultDeps, handleListenerQuestion } from "./handler.ts";

// The logic lives in handler.ts (with injectable dependencies) so it can be unit-tested
// without a network or a database: see supabase/functions/tests/.
const createServiceClient = () => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) throw new Error("Supabase service role is not configured");
  return createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });
};

serve((req) => handleListenerQuestion(req, defaultDeps(createServiceClient)));
