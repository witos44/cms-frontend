import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  const { data, error } = await supabase
    .from("post_tags")
    .select("tag_id")
    .eq("post_id", postId);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const tagIds = data.map((pt) => pt.tag_id);
  return NextResponse.json({ tagIds });
}