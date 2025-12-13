// app/admin/posts/page.tsx
import { createClient } from "@/lib/supabase/server";

export default async function AdminPostsPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase.from("posts").select("*");

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      {!posts?.length && <p>No posts yet</p>}
    </div>
  );
}
