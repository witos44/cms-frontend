'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardSidebar } from './components/sidebar/Sidebar';
import { DashboardNavbar } from './components/navbar/Navbar';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem('supabase.auth.token');
    if (!session) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardNavbar />

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
