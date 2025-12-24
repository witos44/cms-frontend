// app/search/page.tsx
import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q: query } = await searchParams;

  let posts: any[] = [];

  if (query) {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, category, section, published_at, excerpt, cover_image') // ✅ termasuk section
      .eq('status', 'published')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
      .order('published_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Search error:', error);
      notFound();
    }

    posts = data || [];
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Search Form */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Search Content</h1>
        <form action="/search" method="get" className="max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              type="search"
              placeholder="Enter keywords (e.g. VPN, privacy, security)..."
              defaultValue={query || ''}
              className="pl-10 pr-20"
              required
            />
            <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
              Search
            </Button>
          </div>
        </form>
      </div>

      {/* Results */}
      {query && (
        <div>
          <h2 className="text-xl font-semibold mb-6">
            {posts.length > 0 ? `Found ${posts.length} result${posts.length > 1 ? 's' : ''}` : 'No results found'}
          </h2>

          {posts.length > 0 ? (
            <div className="grid gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/${post.category}/${post.section}/${post.slug}`} // ✅ SESUAI STRUKTUR [section]
                  className="block border rounded-lg p-5 hover:bg-gray-50 transition"
                >
                  <div className="flex gap-4">
                    {post.cover_image && (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="w-24 h-24 object-cover rounded-md shrink-0"
                      />
                    )}
                    <div>
                      <div className="text-sm text-muted-foreground mb-1 capitalize">
                        {post.category} / {post.section}
                      </div>
                      <h3 className="text-lg font-medium mb-1">{post.title}</h3>
                      {post.excerpt && (
                        <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No content matches your search for "<strong>{query}</strong>".</p>
              <p className="mt-2">Try different keywords.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}