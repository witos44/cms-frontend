// app/dashboard/layout.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem('supabase.auth.token');
    if (!session) {
      router.push('/login');
    }
  }, [router]);

  return <>{children}</>;
}