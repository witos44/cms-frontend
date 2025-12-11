import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 401 });
    }

    // Ambil role user
    const { data: roleData, error: roleError } = await supabase
      .from("user_roles")
      .select("roles!user_roles_role_id_fkey(name)")
      .eq("user_id", authData.user.id);

    if (roleError) {
      return NextResponse.json({ error: roleError.message }, { status: 500 });
    }

    const roleName = roleData?.[0]?.roles?.[0]?.name ?? null;

    return NextResponse.json({
      user: authData.user,
      role: roleName,
    });
  } catch (e) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
