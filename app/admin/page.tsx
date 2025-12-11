// app/admin/page.tsx
import { createClient } from "@/lib/supabase/server"; 
import Link from "next/link";
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  // ❌ Supabase client harus di-`await`
  const supabase = await createClient(); 

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: userRoles } = await supabase
    .from("user_roles")
    .select("roles!user_roles_role_id_fkey(name)")
    .eq("user_id", user.id);

  const roleName = userRoles?.[0]?.roles?.[0]?.name || 'viewer';

  if (!['admin', 'editor', 'viewer'].includes(roleName)) {
    redirect('/unauthorized'); // redirect jika role tidak diizinkan
  }

  const { data: posts, error } = await supabase
    .from("posts")
    .select("status");

  if (error) {
    return (
      <div className="p-6 bg-red-100 border border-red-400 text-red-700 rounded">
        Error fetching posts: {error.message}
      </div>
    );
  }

  const draftCount = posts.filter(p => p.status === "draft").length;
  const publishedCount = posts.filter(p => p.status === "published").length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Draft Posts"
          value={draftCount}
          color="text-blue-600"
          link="/admin/posts"
          linkText="Manage Drafts"
        />
        <StatCard
          title="Published"
          value={publishedCount}
          color="text-green-600"
          link="/admin/posts"
          linkText="View All"
        />
        <StatCard
          title="Quick Actions"
          value=""
          color=""
          link="/admin/posts/new"
          linkText="+ New Post"
          isButton
        />
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  color,
  link,
  linkText,
  isButton = false,
}: {
  title: string;
  value: string | number;
  color: string;
  link: string;
  linkText: string;
  isButton?: boolean;
}) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">{title}</h2>
      {value !== "" && <p className={`text-3xl font-bold ${color}`}>{value}</p>}
      {isButton ? (
        <Link
          href={link}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
        >
          {linkText}
        </Link>
      ) : (
        <Link href={link} className={`${color} mt-2 inline-block`}>
          {linkText} →
        </Link>
      )}
    </div>
  );
}
