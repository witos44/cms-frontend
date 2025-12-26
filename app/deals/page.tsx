// app/deals/page.tsx
import { publicClient } from '@/lib/supabase/public-client'
import { Metadata } from 'next'
import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Tag, 
  Zap, 
  Clock, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Star
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy & Security Deals | nsecure.store',
  description: 'Verified discounts on privacy tools we independently recommend. Updated weekly.',
  keywords: ['privacy deals', 'security discounts', 'vpn deals', 'password manager discounts'],
}

interface DealPost {
  title: string
  slug: string
  published_at: string | null
  excerpt?: string
  section?: string
}

const dealCategories = {
  'vpn': { label: 'VPN Deal', color: 'bg-blue-500/10 text-blue-700 border-blue-300' },
  'password-manager': { label: 'Password Manager', color: 'bg-emerald-500/10 text-emerald-700 border-emerald-300' },
  'email': { label: 'Encrypted Email', color: 'bg-purple-500/10 text-purple-700 border-purple-300' },
  'security': { label: 'Security Tools', color: 'bg-red-500/10 text-red-700 border-red-300' },
  'hardware': { label: 'Hardware', color: 'bg-amber-500/10 text-amber-700 border-amber-300' },
}

export default async function DealsPage() {
  const { data: deals, error } = await publicClient
    .from('posts')
    .select('title, slug, published_at, excerpt, section')
    .eq('category', 'deals')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error || !deals) {
    return (
      <div className="container max-w-2xl py-16 text-center">
        <div className="space-y-4">
          <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20 inline-block mx-auto">
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold">Failed to load deals</h2>
          <p className="text-muted-foreground">
            Please check your connection and try again.
          </p>
        </div>
      </div>
    )
  }

  const activeDeals = (deals as DealPost[]).filter(deal => 
    new Date(deal.published_at || '') > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  )

  const expiredDeals = (deals as DealPost[]).filter(deal => 
    new Date(deal.published_at || '') <= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  )

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-amber-50/10 to-white">
      {/* Hero Section */}
      <div className="container max-w-7xl py-12 px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-700 px-4 py-2 rounded-full text-sm font-medium">
            <Tag className="w-4 h-4" />
            Verified Deals • Updated Weekly
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Privacy Tools Deals
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Exclusive discounts on tools we've independently tested and recommend. 
            Every deal is manually verified for legitimacy.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Badge variant="outline" className="gap-2 bg-white">
              <Shield className="w-4 h-4" />
              Only Verified Vendors
            </Badge>
            <Badge variant="outline" className="gap-2 bg-white">
              <CheckCircle className="w-4 h-4" />
              No Affiliate Bias
            </Badge>
            <Badge variant="outline" className="gap-2 bg-white">
              <Clock className="w-4 h-4" />
              Time-Sensitive Offers
            </Badge>
          </div>
        </div>

        {/* Active Deals */}
        <section className="mb-16">
          <div className="flex items-center justify-between border-b pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Zap className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Active Deals</h2>
                <p className="text-sm text-muted-foreground">
                  Limited-time offers from trusted vendors
                </p>
              </div>
            </div>
            <Badge className="bg-amber-500 text-white">
              {activeDeals.length} Active
            </Badge>
          </div>

          {activeDeals.length === 0 ? (
            <div className="text-center py-12 bg-amber-50/50 rounded-2xl border border-amber-200">
              <div className="space-y-4">
                <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20 inline-block mx-auto">
                  <Clock className="w-12 h-12 text-amber-500" />
                </div>
                <h3 className="text-xl font-bold">No Active Deals</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Check back soon for new exclusive discounts on privacy tools.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeDeals.map((deal) => {
                const category = deal.section || 'security'
                const categoryInfo = dealCategories[category as keyof typeof dealCategories] || dealCategories.security
                
                return (
                  <Card 
                    key={deal.slug}
                    className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-amber-200"
                  >
                    {/* Ribbon */}
                    <div className="absolute -right-10 top-4 bg-amber-500 text-white text-xs font-bold px-10 py-1 transform rotate-45">
                      DEAL
                    </div>
                    
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-3">
                        <Badge className={`${categoryInfo.color}`}>
                          {categoryInfo.label}
                        </Badge>
                        {deal.published_at && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {new Date(deal.published_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </div>
                        )}
                      </div>
                      
                      <CardTitle className="text-lg font-bold group-hover:text-amber-700 transition-colors">
                        <Link 
                          href={`/reviews/${deal.slug}`}
                          className="hover:underline"
                        >
                          {deal.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="pb-4">
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {deal.excerpt || 'Exclusive discount on a privacy tool we independently recommend.'}
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="font-medium">Verified Deal</span>
                        <span className="text-muted-foreground text-xs">• Manually checked</span>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="border-t pt-4">
                      <Link
                        href={`/reviews/${deal.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 text-sm font-bold bg-amber-500 text-white hover:bg-amber-600 py-2.5 px-4 rounded-lg transition-colors group/link"
                      >
                        View Exclusive Deal
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </CardFooter>
                  </Card>
                )
              })}
            </div>
          )}
        </section>

        {/* Expired Deals (Archive) */}
        {expiredDeals.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between border-b pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-500/10 rounded-lg">
                  <Clock className="w-5 h-5 text-gray-500" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Recent Expired Deals</h2>
                  <p className="text-sm text-muted-foreground">
                    Past offers for reference only
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-gray-500">
                {expiredDeals.length} Expired
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {expiredDeals.map((deal) => (
                <Card 
                  key={deal.slug}
                  className="opacity-70 hover:opacity-100 transition-opacity border-dashed"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base font-medium text-gray-500">
                        <span className="line-through">{deal.title}</span>
                      </CardTitle>
                      <Badge variant="outline" className="text-gray-400 border-gray-300">
                        Expired
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-3">
                    <p className="text-sm text-gray-400">
                      This deal is no longer available. Check for current offers.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* How We Verify Deals */}
        <div className="mt-16">
          <div className="bg-linear-to-r from-amber-500/5 to-orange-500/5 rounded-2xl p-8 border border-amber-200">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-3">Our Deal Verification Process</h3>
                <p className="text-muted-foreground mb-4">
                  Every discount listed is manually verified to ensure legitimacy. 
                  We only promote deals from vendors who meet our privacy standards.
                </p>
                <div className="space-y-3">
                  {[
                    'Direct vendor confirmation of discount validity',
                    'Price comparison with regular rates',
                    'Terms of service and privacy policy review',
                    'Expiration date verification'
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white rounded-xl p-6 border shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold">Deal Statistics</h4>
                      <p className="text-sm text-muted-foreground">Last 30 days</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Active Deals</span>
                      <span className="font-bold text-amber-600">{activeDeals.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Avg. Discount</span>
                      <span className="font-bold text-emerald-600">30-50%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Verified Vendors</span>
                      <span className="font-bold text-blue-600">20+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">User Savings</span>
                      <span className="font-bold text-purple-600">$50K+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col items-center gap-4 max-w-2xl mx-auto">
            <div className="p-3 bg-blue-500/10 rounded-full">
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Important Disclaimer</h3>
              <p className="text-sm text-muted-foreground">
                All deals are manually verified. We only promote vendors who meet our{' '}
                <Link href="/methodology" className="text-blue-600 hover:underline font-medium">
                  review standards
                </Link>
                . Discounts are time-sensitive and subject to change. 
                We earn commissions through affiliate links, which never influence our recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}