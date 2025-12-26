// app/api/admin/publish/route.ts
import { createAdminClient } from '@/lib/supabase/admin';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createAdminClient();
  const { id, category, section } = await request.json();

  if (!id || !category) {
    return NextResponse.json({ error: 'ID and category required' }, { status: 400 });
  }

  const { error } = await supabase
    .from('posts')
    .update({
      status: 'published',
      published_at: new Date().toISOString(),
      category,
      section: section || null, // ✅ ini wajib ada
    })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}