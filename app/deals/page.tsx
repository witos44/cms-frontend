// app/deals/page.tsx
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
  title: 'Latest Security Deals | nsecure.store',
  description: 'Exclusive discounts on privacy tools — updated weekly.',
}

interface DealPost {
  title: string
  slug: string
  published_at: string | null
}

export default async function DealsPage() {
  const { data: deals, error } = await publicClient
    .from('posts')
    .select('title, slug, published_at')
    .eq('category', 'deals')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error || !deals) {
    return (
      <div className="container max-w-2xl py-16 text-center">
        <p className="text-muted-foreground">Failed to load deals.</p>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-16 space-y-10">
      <header className="text-center space-y-3">
        <h1 className="text-3xl font-bold">Latest Privacy Deals</h1>
        <p className="text-muted-foreground">
          Verified discounts on tools we independently recommend.
        </p>
      </header>

      {deals.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No active deals at the moment.
        </p>
      ) : (
        <div className="space-y-4">
          {deals.map((deal: DealPost) => (
            <Card
              key={deal.slug}
              className="border-amber-200 bg-amber-50"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-base text-amber-900">
                  {deal.title}
                </CardTitle>

                {deal.published_at && (
                  <Badge
                    variant="outline"
                    className="text-amber-800 border-amber-300"
                  >
                    {new Date(deal.published_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Badge>
                )}
              </CardHeader>

              <CardContent>
                <Link
                  href={`/reviews/${deal.slug}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  View deal →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <p className="text-center text-sm text-muted-foreground">
        All deals are manually verified. We only promote vendors who meet our{' '}
        <Link href="/methodology" className="underline">
          review standards
        </Link>
        .
      </p>
    </div>
  )
}
