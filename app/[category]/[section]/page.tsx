// app/[category]/[section]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { publicClient } from '@/lib/supabase/public-client';

// Helper untuk ambil excerpt - gunakan yang dari database dulu
function getExcerpt(content: string | null, dbExcerpt: string | null, maxLength = 150) {
  // Prioritize excerpt from database
  if (dbExcerpt && dbExcerpt.trim()) {
    return dbExcerpt.length > maxLength ? dbExcerpt.substring(0, maxLength) + '...' : dbExcerpt;
  }
  
  // Fallback to extracting from content
  if (!content) return '';
  const text = content.replace(/<[^>]*>/g, '');
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ category: string; section: string }>;
}) {
  const { category, section } = await params;

  if (!category || !section) {
    notFound();
  }

  // Tambahkan 'excerpt' ke query karena kolom ini ADA di database
  const { data: posts, error } = await publicClient
    .from('posts')
    .select('id, title, slug, content, cover_image, published_at, excerpt')
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
      <div className="max-w-6xl mx-auto py-20 px-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 capitalize">
            {section.replace(/-/g, ' ')}
          </h1>
          <p className="text-gray-500">No posts found in this section.</p>
        </div>
      </div>
    );
  }

  // Ambil post pertama untuk featured
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 capitalize">
          {section.replace(/-/g, ' ')}
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Latest reviews and guides in this category
        </p>
        <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-500">
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'}
          </span>
          <span>•</span>
          <span>Sorted by latest</span>
        </div>
      </div>

      {/* Featured Post (Full Width) */}
      <div className="mb-12">
        <Link
          href={`/${category}/${section}/${featuredPost.slug}`}
          className="group block border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="md:flex">
            {featuredPost.cover_image && (
              <div className="md:w-2/5">
                <img
                  src={featuredPost.cover_image}
                  alt={featuredPost.title}
                  className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div className="md:w-3/5 p-8">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                Featured
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-blue-600 transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {getExcerpt(featuredPost.content, featuredPost.excerpt, 200)}
              </p>
              <div className="flex items-center justify-between">
                {featuredPost.published_at && (
                  <span className="text-sm text-gray-500">
                    {new Date(featuredPost.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                )}
                <span className="text-blue-600 font-medium group-hover:text-blue-700">
                  Read full review →
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Grid Posts (2 Columns) */}
      {remainingPosts.length > 0 && (
        <>
          <h3 className="text-2xl font-bold mb-6">More from this section</h3>
          <div className="grid gap-8 md:grid-cols-2">
            {remainingPosts.map((post, index) => {
              const excerpt = getExcerpt(post.content, post.excerpt);
              return (
                <Link
                  key={post.id}
                  href={`/${category}/${section}/${post.slug}`}
                  className="group block border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {post.cover_image && (
                    <div className="mb-5 overflow-hidden rounded-lg">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <h4 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                  {excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    {post.published_at && (
                      <span className="text-gray-500">
                        {new Date(post.published_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    )}
                    <span className="text-blue-600 font-medium">
                      Read more →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}

      {/* If only one post exists */}
      {remainingPosts.length === 0 && (
        <div className="text-center py-12 border-t mt-12">
          <p className="text-gray-500">
            Check back soon for more posts in this section.
          </p>
        </div>
      )}
    </div>
  );
}