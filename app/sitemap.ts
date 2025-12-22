// app/sitemap.ts
import { MetadataRoute } from 'next'
import { publicClient } from '@/lib/supabase/public-client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.nsecure.store'

  // ambil semua post published
  const { data: posts } = await publicClient
    .from('posts')
    .select('slug, updated_at')
    .eq('status', 'published')

  const postUrls =
    posts?.map((post) => ({
      url: `${baseUrl}/reviews/${post.slug}`,
      lastModified: post.updated_at
        ? new Date(post.updated_at)
        : new Date(),
    })) ?? []

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/deals`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
    },
    ...postUrls,
  ]
}
