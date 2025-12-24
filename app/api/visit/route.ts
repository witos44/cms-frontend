import { NextResponse } from 'next/server'
import { logUniqueVisit } from '@/lib/actions/logUniqueVisit'

export async function POST(req: Request) {
  const { path } = await req.json()
  await logUniqueVisit(path)
  return NextResponse.json({ ok: true })
}
