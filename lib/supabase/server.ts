// lib/supabase/server.ts
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function createClient() {
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === 'production';
  
  // ✅ Ambil domain dari request (hindari hardcode)
  const domain = isProduction ? '.vercel.app' : undefined;

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
            domain, // ✅ pastikan cookie berlaku di seluruh subdomain Vercel
            secure: isProduction,
            sameSite: 'lax',
            path: '/',
          });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({
            name,
            value: '',
            ...options,
            domain,
            secure: isProduction,
            sameSite: 'lax',
            path: '/',
          });
        },
      },
    }
  );
}