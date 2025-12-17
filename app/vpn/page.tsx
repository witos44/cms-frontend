// app/vpn/page.tsx

export const dynamic = "force-dynamic";
import { createClient } from '@/lib/supabase/server';

export default async function VpnPage() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from('posts')
    .select('title, slug, published_at')
    .eq('category', 'security-tools')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch posts:', error);
    return <div className="max-w-4xl mx-auto p-6">Failed to load content.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Best VPNs</h1>
      <p className="text-gray-600 mb-6">Reviewed and tested by our security team.</p>
      <div className="space-y-4">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.slug} className="border-l-4 border-blue-500 pl-4 py-2">
              <a href={`/${post.slug}`} className="text-blue-600 hover:underline">
                {post.title}
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No published posts in this category yet.</p>
        )}
      </div>
    </div>
  );
}