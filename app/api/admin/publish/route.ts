// app/api/admin/publish/route.ts
import { createAdminClient } from '@/lib/supabase/admin'; // ✅
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createAdminClient(); // ✅ tidak perlu await

  const { id, category, section } = await request.json();

  if (!id || !category || !section) {
    return NextResponse.json(
      { error: 'Missing required fields: id, category, or section' },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from('posts')
    .update({
      status: 'published',
      published_at: new Date().toISOString(),
      category: category.trim(),
      section: section.trim(),
    })
    .eq('id', id);

  if (error) {
    console.error('Publish error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}