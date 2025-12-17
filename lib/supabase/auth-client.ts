// lib/supabase/auth-client.ts

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ⬇️ BIARKAN INI TETAP ADA
export const createAuthClient = () => {
  return supabase;
};
