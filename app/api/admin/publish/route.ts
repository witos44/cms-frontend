import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = createClient(); // WAJIB
  const body = await req.json();

  const { error } = await supabase
    .from("posts")
    .update({
      status: "published",
      section: body.section,
      category_slug: body.category_slug,
      published_at: new Date().toISOString()
    })
    .eq("id", body.postId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
