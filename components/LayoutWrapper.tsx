// components/LayoutWrapper.tsx
"use client";

import { usePathname } from 'next/navigation';
import MainNav from "@/components/MainNav";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPath = pathname.startsWith('/admin');

  return (
    <>
      {/* Sembunyikan MainNav & Footer jika di path admin */}
      {!isAdminPath && <MainNav />}
      
      <main className="min-h-screen">
        {children}
      </main>
      
      {!isAdminPath && <Footer />}
    </>
  );
}