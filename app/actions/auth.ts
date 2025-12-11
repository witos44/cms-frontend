import { createClient } from "@/lib/supabase/server";

export async function logout() {
  const supabase = await createClient(); // ✅ await client dulu
  await supabase.auth.signOut();         // sekarang ini valid
}
