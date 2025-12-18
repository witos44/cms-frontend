import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const formData = await req.formData();

  const file = formData.get('file') as File | null;
  const postId = formData.get('postId') as string | null;

  if (!file || !postId) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  const ext = file.name.split('.').pop();
  const fileName = `covers/${postId}-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('post-images')
    .upload(fileName, file, { upsert: true });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 400 });
  }

  const { data } = supabase.storage
    .from('post-images')
    .getPublicUrl(fileName);

  // 🔥 INI YANG SEBELUMNYA HILANG
  const { error: updateError } = await supabase
    .from('posts')
    .update({ cover_image: data.publicUrl })
    .eq('id', postId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ url: data.publicUrl });
}
