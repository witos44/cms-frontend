// app/admin/AdminSidebar.tsx

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { logout } from "@/app/actions/auth";

export default async function AdminSidebar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userRoles } = await supabase
    .from("user_roles")
    .select("roles!user_roles_role_id_fkey(name)")
    .eq("user_id", user?.id ?? "");

  const roleName = userRoles?.[0]?.roles?.[0]?.name || "viewer";

  const menuItems = [
    { label: "Dashboard", href: "/admin" },
    { label: "Posts", href: "/admin/posts" },
    { label: "Tags", href: "/admin/tags" },
    ...(roleName === "admin" ? [{ label: "Users", href: "/admin/users" }] : []),
  ];

  return (
    <Sidebar className="fixed top-16 h-[calc(100vh-64px)] w-[256px] bg-white text-black p-0 z-40 border-r border-gray-700">
      <SidebarContent className="flex flex-col h-full justify-between">
        <div>
          <SidebarGroup>
            <SidebarGroupLabel className="text-blue-700 bg-white text-2xl px-4 pt-4">Admin Panel</SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild className="hover:bg-gray-700 hover:text-white">
                      <Link href={item.href}>{item.label}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* 3. Logout dipindah ke bawah agar tidak menumpuk dengan menu utama */}
        <div className="p-4 border-t border-gray-700">
          <form action={logout}>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className="w-full text-red-400 hover:bg-red-900/20 hover:text-red-500" 
                  type="submit"
                >
                  Logout
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </form>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}