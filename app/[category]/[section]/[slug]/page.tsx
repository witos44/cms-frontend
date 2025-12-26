// app/[category]/[section]/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { publicClient } from '@/lib/supabase/public-client'
import { VisitTracker } from '@/components/visitTracker' // ✅ BENAR
import { CalendarDays, Clock, User, Eye } from 'lucide-react'

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
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* ✅ TRACK UNIQUE VISIT (AMAN, CLIENT SIDE) */}
      <VisitTracker path={path} />

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Category & Section Badges */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Badge 
            variant="secondary" 
            className="capitalize px-4 py-2 text-sm font-semibold bg-blue-50 text-blue-700 border-blue-200"
          >
            {category}
          </Badge>
          <Separator orientation="vertical" className="h-5" />
          <Badge 
            variant="outline" 
            className="capitalize px-4 py-2 text-sm font-medium text-gray-700 border-gray-300"
          >
            {section.replace(/-/g, ' ')}
          </Badge>
        </div>

        {/* Article Header */}
        <article className="mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 text-gray-600">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              <span className="text-sm md:text-base">{publishedDate}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm md:text-base">{post.read_time || '5 min'} read</span>
            </div>
            
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm md:text-base">{post.author}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2 ml-auto">
              <Eye className="w-4 h-4" />
              <span className="text-sm md:text-base">Views</span>
            </div>
          </div>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="mb-10 overflow-hidden rounded-2xl shadow-xl">
              <img
                src={post.cover_image}
                alt={post.title}
                className="w-full h-auto max-h-[500px] object-cover transition-transform duration-500 hover:scale-105"
              />
              {post.image_caption && (
                <p className="text-center text-sm text-gray-500 italic mt-2 px-4">
                  {post.image_caption}
                </p>
              )}
            </div>
          )}
        </article>

        {/* Article Content */}
        <Card className="border-none shadow-xl overflow-hidden bg-white rounded-2xl">
          <CardContent className="p-6 md:p-10 lg:p-12">
            <div 
              className="prose prose-lg max-w-none 
                        prose-headings:text-gray-900 prose-headings:font-bold
                        prose-p:text-gray-700 prose-p:leading-relaxed
                        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4 prose-blockquote:italic
                        prose-ul:list-disc prose-ol:list-decimal
                        prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
                        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg
                        prose-img:rounded-lg prose-img:shadow-md
                        prose-hr:border-gray-200"
              dangerouslySetInnerHTML={{ __html: post.content || '' }}
            />
          </CardContent>
        </Card>

        {/* Article Footer */}
        {post.tags && (
          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              <span className="text-gray-600 mr-2">Tags:</span>
              {post.tags.split(',').map((tag: string, index: number) => (
                <Badge 
                  key={index} 
                  variant="outline"
                  className="px-3 py-1 text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  {tag.trim()}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  )
}