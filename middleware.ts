import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function middleware(req: NextRequest) {
  const supabase = await createClient(); // ✅ wajib await

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const { data: userRoles, error } = await supabase
    .from("user_roles")
    .select(`roles!user_roles_role_id_fkey(name)`)
    .eq("user_id", user.id);

  if (error || !userRoles || userRoles.length === 0) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  const roleName = userRoles[0].roles?.[0]?.name;

  if (!roleName || (roleName !== "admin" && roleName !== "editor")) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
