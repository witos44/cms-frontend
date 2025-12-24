// app/dashboard/layout.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DashboardSidebar } from './components/sidebar/Sidebar';
import { DashboardNavbar } from './components/navbar/Navbar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Cek langsung keberadaan cookie sesi
  const cookieStore = await cookies();
  const hasSession = cookieStore.has('sb-jctrdakpkahdkqmwbgzs-auth-token'); // ← GANTI DENGAN PREFIX ANDA

  if (!hasSession) {
    redirect('/login');
  }

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