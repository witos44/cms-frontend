import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  const { id, category } = await req.json();

  if (!id || !category) {
    return NextResponse.json(
      { error: 'Missing id or category' },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  const { error } = await supabase
    .from('posts')
    .update({
      status: 'published',
      category, // ✅ FIX UTAMA
      published_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
