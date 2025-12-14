// app/api/admin/seo/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// ==============================
// POST: upsert SEO meta
// ==============================
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const body = await req.json();

  const {
    postId,
    meta_title,
    meta_description,
    og_image,
    canonical_url
  } = body;

  if (!postId) {
    return NextResponse.json({ error: "postId required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("seo_meta")
    .upsert(
      {
        post_id: postId,
        meta_title,
        meta_description,
        og_image,
        canonical_url
      },
      { onConflict: "post_id" }
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

// ==============================
// GET: semua SEO meta
// ==============================
export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("seo_meta").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}