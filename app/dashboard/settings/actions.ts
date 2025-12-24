'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function getSettings() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('settings')
    .select('key,value');

  if (error) throw error;

  return Object.fromEntries(
    data.map((item) => [item.key, item.value])
  ) as Record<string, string>;
}

export async function updateSettings(formData: FormData) {
  const supabase = createAdminClient();

  const keys = [
    'site_title',
    'site_description',
    'admin_email',
    'maintenance_mode',
  ];

  for (const key of keys) {
    const value = formData.get(key);
    if (value !== null) {
      await supabase
        .from('settings')
        .update({ value: String(value) })
        .eq('key', key);
    }
  }

  revalidatePath('/dashboard/settings');
}
