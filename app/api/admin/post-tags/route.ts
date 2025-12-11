import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

// POST: tambahkan tag ke post
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { postId, tagId } = body;
  if (!postId || !tagId) {
    return NextResponse.json({ error: "postId and tagId required" }, { status: 400 });
  }

  const { error } = await supabase.from("post_tags").insert({ post_id: postId, tag_id: tagId });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// DELETE: hapus kaitan tag dari post
export async function DELETE(req: NextRequest) {
  const body = await req.json();
  const { postId, tagId } = body;
  if (!postId || !tagId) {
    return NextResponse.json({ error: "postId and tagId required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("post_tags")
    .delete()
    .match({ post_id: postId, tag_id: tagId });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}