//lib/actions/logUniqueVisit.ts

'use server'

import { headers, cookies } from 'next/headers'
import { randomUUID } from 'crypto'
import { createAdminClient } from '@/lib/supabase/admin'

export async function logUniqueVisit(path: string) {
  const supabase = createAdminClient()

  const h = await headers()
  const cookieStore = await cookies()

  const ip =
    h.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown'

  let sessionId = cookieStore.get('uv_session')?.value

  if (!sessionId) {
    sessionId = randomUUID()
    cookieStore.set('uv_session', sessionId, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })
  }

  const today = new Date().toISOString().slice(0, 10)

  await supabase
    .from('unique_visits')
    .insert({
      path,
      ip,
      session_id: sessionId,
      visited_date: today,
    })
    .throwOnError()
}
