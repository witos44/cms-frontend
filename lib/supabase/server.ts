import { cookies, headers } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

export async function createClient() {
  const cookieStore = await cookies();
  const headersList = await headers();

  const host = headersList.get('host') || 'localhost';

  let domain = '';
  if (host.endsWith('.vercel.app')) {
    domain = '.vercel.app';
  } else if (!host.startsWith('localhost')) {
    const cleanHost = host.split(':')[0];
    if (cleanHost.includes('.')) {
      domain = `.${cleanHost}`;
    }
  }

  const secure = !host.startsWith('localhost');

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
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
          } catch {}
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
          } catch {}
        },
      },
    }
  );
}
