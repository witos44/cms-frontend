// app/admin/proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const supabase = await createClient(); // <= FIX

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { data: userRoles } = await supabase
    .from("user_roles")
    .select("roles!user_roles_role_id_fkey(name)")
    .eq("user_id", user.id);

  const roleName = userRoles?.[0]?.roles?.[0]?.name;

  if (!roleName || !["admin", "editor"].includes(roleName)) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
