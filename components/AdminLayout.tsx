"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "@/app/admin/AdminSidebar"; // langsung import

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <div className="w-64 shrink-0">
          <AdminSidebar />   {/* Server component */}
        </div>

        <main className="flex-1 p-6 bg-white">{children}</main>
      </div>
    </SidebarProvider>
  );
}
