// app/api/admin/post-tags/post/[postId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const supabase = await createClient(); // 🔥 FIX DI SINI

  const { postId } = params;

  const { data, error } = await supabase
    .from("post_tags")
    .select("tag_id")
    .eq("post_id", postId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
