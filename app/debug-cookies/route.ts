// app/debug-cookies/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  
  // Filter hanya cookie Supabase (opsional)
  const supabaseCookies = allCookies.filter(cookie => 
    cookie.name.startsWith('sb-') && cookie.name.endsWith('-auth-token')
  );

  return NextResponse.json({
    all_cookies: allCookies.map(c => c.name),
    supabase_session_cookies: supabaseCookies.map(c => ({
      name: c.name,
      value_present: c.value.length > 0,
      domain: c.name // domain tidak tersedia di Next.js headers, tapi cookie ada
    })),
    has_supabase_session: supabaseCookies.length > 0
  });
}