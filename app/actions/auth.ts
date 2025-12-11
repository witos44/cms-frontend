"use server";

import { createClient } from "@/lib/supabase/server";

export async function logout() {
  const supabase = createClient(); // panggil fungsi untuk buat client
  await supabase.auth.signOut();
}
