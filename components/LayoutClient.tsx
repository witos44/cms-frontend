"use client";

import { usePathname } from "next/navigation";
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";
import AdminLayout from "@/components/AdminLayout";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return (
    <>
      <MainNav />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
