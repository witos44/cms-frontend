'use server';

import { createAdminClient } from '@/lib/supabase/admin';

export async function listUsers() {
  const supabase = createAdminClient();

  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) throw error;

  return data.users;
}
