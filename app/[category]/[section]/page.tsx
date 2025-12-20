// app/[category]/[section]/page.tsx
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Helper: Hapus HTML tags dan potong teks
function extractExcerpt(html: string | null, maxLength = 150): string {
  if (!html) return '';
  // Hapus semua tag HTML
  const text = html.replace(/<[^>]*>/g, '');
  // Potong dan tambahkan "..." jika terlalu panjang
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ category: string; section: string }>;
}) {
  const { category, section } = await params;
  const supabase = await createClient();

  const { data: posts, error } = await supabase
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
      <h1 className="text-3xl font-bold mb-8 capitalize">
        {section.replace("-", " ")}
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => {
          const excerpt = extractExcerpt(post.content);
          return (
            <Link
              key={post.id}
              href={`/${category}/${section}/${post.slug}`}
              className="block border rounded-lg p-5 hover:bg-gray-50 transition"
            >
              {post.cover_image && (
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="text-xl font-semibold">{post.title}</h2>
              {excerpt && (
                <p className="text-gray-600 mt-2 line-clamp-3">
                  {excerpt}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}