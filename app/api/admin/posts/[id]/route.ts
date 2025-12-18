// app/api/admin/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/* ======================================================
   HELPERS
====================================================== */

// extract filenames from HTML <img src="">
function extractImagePaths(html: string): string[] {
  if (!html) return [];

  const regex = /<img[^>]+src="([^">]+)"/g;
  const paths: string[] = [];
  let match;

  while ((match = regex.exec(html)) !== null) {
    try {
      const url = new URL(match[1]);
      const parts = url.pathname.split("/");
      const fileName = parts[parts.length - 1];
      if (fileName) paths.push(fileName);
    } catch {
      // ignore invalid urls
    }
  }

  return paths;
}

/* ======================================================
   GET DETAIL POST
====================================================== */
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

/* ======================================================
   UPDATE POST
====================================================== */
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
        category: body.category || null,
        cover_image: body.cover_image || null,
      })
      .eq("id", id);

    if (error) {
      console.error("Update error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("Unexpected error:", e);
    return NextResponse.json(
      { error: e.message || "Internal server error" },
      { status: 500 }
    );
  }
}

/* ======================================================
   DELETE POST + CLEANUP IMAGES
====================================================== */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const supabase = await createClient();
  const { id } = await params;

  if (!id || id === "undefined") {
    return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
  }

  // 1️⃣ Ambil content + cover_image dulu
  const { data: post, error: fetchError } = await supabase
    .from("posts")
    .select("content, cover_image")
    .eq("id", id)
    .single();

  if (fetchError || !post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  // 2️⃣ Hapus image di bucket
  const imagesFromContent = extractImagePaths(post.content);
  const imagesToDelete = [...imagesFromContent];

  if (post.cover_image) {
    try {
      const url = new URL(post.cover_image);
      const file = url.pathname.split("/").pop();
      if (file) imagesToDelete.push(file);
    } catch {}
  }

  if (imagesToDelete.length > 0) {
    const { error: storageError } = await supabase.storage
      .from("post-images")
      .remove(imagesToDelete);

    if (storageError) {
      console.error("Storage cleanup error:", storageError);
    }
  }

  // 3️⃣ Hapus post
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
