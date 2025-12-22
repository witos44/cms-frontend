// app/tools/page.tsx
import { publicClient } from '@/lib/supabase/public-client'
import { Metadata } from 'next'
import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: 'All Privacy Tools | nsecure.store',
  description: 'Curated list of privacy-respecting software and hardware.',
}

interface ToolPost {
  title: string
  slug: string
  section: string | null
}

export default async function ToolsPage() {
  const { data: tools, error } = await publicClient
    .from('posts')
    .select('title, slug, section')
    .eq('category', 'tools')
    .eq('status', 'published')
    .order('title', { ascending: true })

  if (error || !tools) {
    return (
      <div className="container max-w-2xl py-16 text-center">
        <p className="text-muted-foreground">Failed to load tools.</p>
      </div>
    )
  }

  const grouped: Record<string, ToolPost[]> = {}

  for (const tool of tools as ToolPost[]) {
    const group = tool.section || 'other'
    if (!grouped[group]) grouped[group] = []
    grouped[group].push(tool)
  }

  return (
    <div className="container max-w-5xl py-16 space-y-12">
      <header className="text-center space-y-3">
        <h1 className="text-3xl font-bold">Privacy Tools Directory</h1>
        <p className="text-muted-foreground">
          Independently reviewed tools that respect your privacy and security.
        </p>
      </header>

      {Object.keys(grouped).length === 0 ? (
        <p className="text-center text-muted-foreground">
          No tools published yet.
        </p>
      ) : (
        Object.entries(grouped).map(([group, items]) => (
          <section key={group} className="space-y-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold capitalize">
                {group.replace(/-/g, ' ')}
              </h2>
              <Badge variant="secondary">{items.length}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((tool) => (
                <Card key={tool.slug} className="hover:shadow-sm transition">
                  <CardHeader>
                    <CardTitle className="text-base">
                      <Link
                        href={`/reviews/${tool.slug}`}
                        className="hover:underline"
                      >
                        {tool.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Privacy-focused software or service
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}
