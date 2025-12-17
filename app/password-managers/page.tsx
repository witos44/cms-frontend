// Ganti NAMA_HALAMAN dan KATEGORI sesuai kebutuhan
import { createClient } from '@/lib/supabase/server';

export default async function NamaHalamanPage() {
  const supabase = await createClient();
  const {  data, error } = await supabase
    .from('posts')
    .select('title, slug, published_at')
    .eq('category', 'security-tools') // ← Ganti ini
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    return <div className="max-w-4xl mx-auto p-6">Failed to load content.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Judul Halaman</h1>
      <p className="text-gray-600 mb-6">Deskripsi singkat tentang topik ini.</p>
      <div className="space-y-4">
        {data && data.length > 0 ? (
          data.map((post) => (
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