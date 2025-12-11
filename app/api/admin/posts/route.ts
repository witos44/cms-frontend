// app/api/admin/posts/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server"; // gunakan factory, bukan instance global

// ========== Create Posts ==========
export async function POST(req: NextRequest) {
  const supabase = createClient(); // <— bikin client per request
  const body = await req.json();

  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        title: body.title,
        slug: body.slug,
        content: body.content || "",
        status: "draft",
      },
    ])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

// ======= List Posts =======
export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
