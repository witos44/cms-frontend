import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

// POST: buat tag baru
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, slug } = body;
  if (!name || !slug) {
    return NextResponse.json({ error: "name and slug required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("tags")
    .insert({ name, slug })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

// GET: semua tag
export async function GET() {
  const { data, error } = await supabase.from("tags").select("*").order("name");
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}