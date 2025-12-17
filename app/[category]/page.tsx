// app/[category]/page.tsx
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function CategoryPage({
  params,
}: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const supabase = await createClient();

  const validCategories = ['security-tools', 'remote-work', 'deals', 'guides', 'reviews'];
  if (!validCategories.includes(category)) {
    notFound();
  }

  const { data: posts } = await supabase
    .from('posts')
    .select('title, slug, published_at')
    .eq('category', category)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 capitalize">
        {category.replace('-', ' ')}
      </h1>
      <div className="space-y-4">
        {posts?.map((post) => (
          <div key={post.slug} className="border-l-4 border-blue-500 pl-4 py-2">
            <a href={`/${post.slug}`} className="text-blue-600 hover:underline">
              {post.title}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}