// lib/supabase/server.ts
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function createClient() {
  const cookieStore = await cookies();

  // Tentukan domain dan secure berdasarkan host
  const host = cookieStore.get('__next_host')?.value || 
               (typeof window === 'undefined' ? process.env.VERCEL_URL || 'localhost' : window.location.host);

  let domain = '';
  if (host?.endsWith('.vercel.app')) {
    domain = '.vercel.app';
  } else if (host && !host.startsWith('localhost')) {
    const cleanHost = host.split(':')[0];
    if (cleanHost.includes('.')) {
      domain = `.${cleanHost}`;
    }
  }

  const secure = !host?.startsWith('localhost');

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // ⚠️ Hanya set cookie jika diizinkan
          try {
            cookieStore.set({
              name,
              value,
              ...options,
              ...(domain ? { domain } : {}),
              secure,
              sameSite: 'lax',
              path: '/',
            });
          } catch (error) {
            // Abaikan error — terjadi di Page Component (Next.js 16+)
            console.warn(`Failed to set cookie "${name}" (expected in Page Component)`);
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({
              name,
              value: '',
              ...options,
              ...(domain ? { domain } : {}),
              secure,
              sameSite: 'lax',
              path: '/',
              maxAge: 0,
            });
          } catch (error) {
            // Abaikan error
            console.warn(`Failed to remove cookie "${name}"`);
          }
        },
      },
    }
  );
}

// Client publik tanpa sesi (untuk data publik seperti pencarian)
export function createPublicClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get() {
          return null;
        },
        set() {
          // Tidak pernah set cookie untuk client publik
          throw new Error('Public client cannot set cookies');
        },
        remove() {
          throw new Error('Public client cannot remove cookies');
        },
      },
    }
  );
}