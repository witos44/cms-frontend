// app/[category]/[section]/[slug]/page.tsx
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ category: string; section: string; slug: string }>;
}) {
  const { category, section, slug } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .eq('category', category)
    .eq('section', section)
    .eq('slug', slug)
    .single();

  if (error || !post) {
    console.error('Post not found:', { category, section, slug, error });
    notFound();
  }

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Not published';

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Card utama - tambahkan border dan background putih */}
      <Card className="border border-gray-200 bg-white shadow-sm">
        <CardHeader className="p-0 pb-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="flex-1">
              <Badge variant="secondary" className="mb-3">
                {category}
              </Badge>
              <CardTitle className="text-3xl font-bold leading-tight">
                {post.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Published on {publishedDate}
              </p>
            </div>
            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full md:w-48 h-40 object-cover rounded-lg"
              />
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Card konten - tambahkan border dan background putih */}
      <Card className="mt-8 border border-gray-200 bg-white shadow-sm">
        <CardContent className="prose prose-lg dark:prose-invert max-w-none p-6">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </CardContent>
      </Card>

      <div className="mt-10 flex flex-wrap gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>Category:</span>
          <Badge variant="outline">{category}</Badge>
        </div>
        <Separator orientation="vertical" className="h-4" />
        <div className="flex items-center gap-2">
          <span>Section:</span>
          <Badge variant="outline">{section}</Badge>
        </div>
      </div>
    </div>
  );
}