// app/[category]/[section]/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { publicClient } from '@/lib/supabase/public-client';
import { logUniqueVisit } from '@/lib/actions/logUniqueVisit'; // ✅ import action

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ category: string; section: string; slug: string }>;
}) {
  // Unwrap params Promise
  const { category, section, slug } = await params;

  // ✅ Bangun path lengkap
  const path = `/${category}/${section}/${slug}`;

  // ✅ Catat kunjungan unik — ini adalah Server Action
  await logUniqueVisit(path);

  console.log(`Fetching post: ${category}/${section}/${slug}`);

  // Gunakan publicClient untuk akses tanpa login
  const { data: post, error } = await publicClient
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
    <div className="max-w-4xl mx-auto p-4 md:p-6 mt-20">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary" className="capitalize">
            {category}
          </Badge>
          <Separator orientation="vertical" className="h-4" />
          <Badge variant="outline" className="capitalize">
            {section.replace(/-/g, ' ')}
          </Badge>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
          {post.title}
        </h1>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Published on {publishedDate}</span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {post.read_time || '5 min read'}
          </span>
        </div>
      </div>

      {/* Cover Image */}
      {post.cover_image && (
        <div className="mb-8">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Content Card */}
      <Card className="border border-gray-200 bg-white shadow-sm mb-8">
        <CardContent className="p-6 md:p-8">
          <div 
            className="prose prose-lg max-w-none 
                       prose-headings:text-gray-900
                       prose-p:text-gray-700
                       prose-li:text-gray-700
                       prose-strong:text-gray-900
                       prose-a:text-blue-600 hover:prose-a:text-blue-800
                       prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
                       prose-pre:bg-gray-900 prose-pre:text-gray-100
                       prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </CardContent>
      </Card>

      {/* Meta Information */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-medium">Category:</span>
            <Badge variant="outline" className="capitalize">
              {category}
            </Badge>
          </div>
          
          <Separator orientation="vertical" className="h-4" />
          
          <div className="flex items-center gap-2">
            <span className="font-medium">Section:</span>
            <Badge variant="outline" className="capitalize">
              {section.replace(/-/g, ' ')}
            </Badge>
          </div>
          
          {post.tags && post.tags.length > 0 && (
            <>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-2">
                <span className="font-medium">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}