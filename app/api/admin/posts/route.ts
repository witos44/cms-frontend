import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

// ========== Create Post (Admin) ==========
export async function POST(req: NextRequest) {
  const supabase = createAdminClient();
  const body = await req.json();

  const { data, error } = await supabase
    .from("posts")
    .insert({
      title: body.title,
      slug: body.slug,
      content: body.content || "",
      status: "draft",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ data });
}

// ========== List Posts (Admin) ==========
export async function GET() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("posts")
    .select("id, title, slug, status, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ data });
}
