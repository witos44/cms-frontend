// app/[category]/[section]/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { publicClient } from '@/lib/supabase/public-client'
import { VisitTracker } from '@/components/visitTracker' // ✅ BENAR

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ category: string; section: string; slug: string }>
}) {
  const { category, section, slug } = await params

  const path = `/${category}/${section}/${slug}`

  const { data: post, error } = await publicClient
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .eq('category', category)
    .eq('section', section)
    .eq('slug', slug)
    .single()

  if (error || !post) {
    notFound()
  }

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Not published'

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 mt-20">
      {/* ✅ TRACK UNIQUE VISIT (AMAN, CLIENT SIDE) */}
      <VisitTracker path={path} />

      {/* Header */}
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

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {post.title}
        </h1>

        <div className="flex justify-between text-sm text-gray-500">
          <span>Published on {publishedDate}</span>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {post.read_time || '5 min read'}
          </span>
        </div>
      </div>

      {post.cover_image && (
        <div className="mb-8">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full max-h-[400px] object-cover rounded-lg"
          />
        </div>
      )}

      <Card className="mb-8">
        <CardContent className="p-6 md:p-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
