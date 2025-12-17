// app/api/admin/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// =========================
// GET DETAIL POST
// =========================
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;

  if (!id || id === "undefined") {
    return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json({ data });
}

// =========================
// UPDATE POST
// =========================
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    if (!id || id === "undefined") {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const body = await req.json();

    const { error } = await supabase
      .from("posts")
      .update({
        title: body.title,
        slug: body.slug,
        content: body.content || "",
        // updated_at: new Date().toISOString(), // 💡 Sementara dihapus jika kolom tidak ada
      })
      .eq("id", id);

    if (error) {
      console.error("Update error:", error); // 🔥 Log ke Vercel
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("Unexpected error:", e);
    return NextResponse.json({ error: e.message || "Internal server error" }, { status: 500 });
  }
}

// =========================
// DELETE POST
// =========================
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;

  if (!id || id === "undefined") {
    return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
  }

  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}