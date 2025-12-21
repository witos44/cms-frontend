// lib/supabase/server.ts
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { headers } from 'next/headers';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

export async function createClient() {
  const cookieStore = await cookies();
  const headersList = await headers();
  const host = headersList.get('host'); // e.g., "nsecure.store" or "nsecure.vercel.app"

  let domain = '';
  if (host?.endsWith('vercel.app')) {
    domain = '.vercel.app';
  } else if (host && host !== 'localhost:3000') {
    // Remove port if present (e.g., "nsecure.store:3000" → "nsecure.store")
    const cleanHost = host.split(':')[0];
    if (cleanHost.includes('.')) {
      domain = `.${cleanHost}`;
    }
  }

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({
            name,
            value,
            ...options,
            ...(domain ? { domain } : {}),
            secure: host !== 'localhost:3000',
            sameSite: 'lax',
            path: '/',
          });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({
            name,
            value: '',
            ...options,
            ...(domain ? { domain } : {}),
            secure: host !== 'localhost:3000',
            sameSite: 'lax',
            path: '/',
          });
        },
      },
    }
  );
}

// Client khusus untuk akses publik tanpa session (untuk halaman yang diakses tanpa login)
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    }
  );
}