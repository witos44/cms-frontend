// app/[category]/[section]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { publicClient } from '@/lib/supabase/public-client';

// Helper untuk ambil excerpt
function extractExcerpt(html: string | null, maxLength = 150) {
  if (!html) return '';
  const text = html.replace(/<[^>]*>/g, '');
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ category: string; section: string }>;
}) {
  // PERBAIKAN: Await params karena Next.js 15 params adalah Promise
  const { category, section } = await params;

  if (!category || !section) {
    console.error('Missing category or section params:', { category, section });
    notFound();
  }

  console.log(`Fetching posts for ${category}/${section}`);

  // HAPUS 'excerpt' dari query select karena kolom tidak ada
  const { data: posts, error } = await publicClient
    .from('posts')
    .select('id, title, slug, content, cover_image, published_at')
    .eq('category', category)
    .eq('section', section)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('SectionPage fetch error:', error);
    notFound();
  }

  console.log(`Found ${posts?.length || 0} posts for ${category}/${section}`);

  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4">
        <h1 className="text-2xl font-semibold mb-4">
          {category} / {section}
        </h1>
        <p className="text-gray-500">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-3xl font-bold mb-8 capitalize">{section.replace(/-/g, ' ')}</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map(post => {
          // Selalu gunakan extractExcerpt karena kolom excerpt tidak ada
          const excerpt = extractExcerpt(post.content);
          return (
            <Link
              key={post.id}
              href={`/${category}/${section}/${post.slug}`}
              className="block border rounded-lg p-5 hover:bg-gray-50 transition hover:shadow-md"
            >
              {post.cover_image && (
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="text-xl font-semibold">{post.title}</h2>
              {excerpt && <p className="text-gray-600 mt-2 line-clamp-3">{excerpt}</p>}
              {post.published_at && (
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(post.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}