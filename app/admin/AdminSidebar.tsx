// app/admin/AdminSidebar.tsx
"use client";

import Link from "next/link";

export default function AdminSidebar() {
  return (
    <aside className="w-64 border-r p-4">
      <h2 className="text-lg font-bold mb-4">Admin Panel</h2>
      <nav className="space-y-2">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/posts">Posts</Link>
        <Link href="/admin/tags">Tags</Link>
      </nav>
    </aside>
  );
}
