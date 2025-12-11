// app/admin/layout.tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex bg-white min-h-screen w-full">
        {/* Sidebar */}
        <div className="hidden md:block">
          <AdminSidebar />
        </div>

        {/* Main Content — tambahkan margin & padding */}
        <main className="flex-1 md:ml-256px pt-16 p-6">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}