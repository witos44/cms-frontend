// app/tools/page.tsx
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
  Shield, 
  Lock, 
  Eye, 
  Zap, 
  ExternalLink, 
  ChevronRight,
  Star,
  CheckCircle,
  Cpu,
  Server,
  FileCode
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Tools Directory | nsecure.store',
  description: 'Curated list of independently reviewed privacy-respecting software and hardware.',
  keywords: ['privacy tools', 'security software', 'encrypted apps', 'open source tools'],
}

interface ToolPost {
  title: string
  slug: string
  section: string | null
  excerpt?: string
}

const sectionIcons: Record<string, React.ReactNode> = {
  'vpn': <Shield className="w-5 h-5" />,
  'password-managers': <Lock className="w-5 h-5" />,
  'encrypted-email': <Eye className="w-5 h-5" />,
  'browsers': <Cpu className="w-5 h-5" />,
  'messaging': <Server className="w-5 h-5" />,
  'open-source': <FileCode className="w-5 h-5" />,
  'other': <Zap className="w-5 h-5" />,
}

const sectionColors: Record<string, string> = {
  'vpn': 'bg-blue-500/10 text-blue-600 border-blue-200',
  'password-managers': 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
  'encrypted-email': 'bg-purple-500/10 text-purple-600 border-purple-200',
  'browsers': 'bg-amber-500/10 text-amber-600 border-amber-200',
  'messaging': 'bg-red-500/10 text-red-600 border-red-200',
  'open-source': 'bg-green-500/10 text-green-600 border-green-200',
  'other': 'bg-gray-500/10 text-gray-600 border-gray-200',
}

const sectionLabels: Record<string, string> = {
  'vpn': 'VPN Services',
  'password-managers': 'Password Managers',
  'encrypted-email': 'Encrypted Email',
  'browsers': 'Privacy Browsers',
  'messaging': 'Secure Messaging',
  'open-source': 'Open Source Tools',
  'other': 'Other Tools',
}

export default async function ToolsPage() {
  const { data: tools, error } = await publicClient
    .from('posts')
    .select('title, slug, section, excerpt')
    .eq('category', 'tools')
    .eq('status', 'published')
    .order('title', { ascending: true })

  if (error || !tools) {
    return (
      <div className="container max-w-2xl py-16 text-center">
        <div className="space-y-4">
          <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20 inline-block mx-auto">
            <Zap className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold">Failed to load tools</h2>
          <p className="text-muted-foreground">
            Please check your connection and try again.
          </p>
        </div>
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
    <div className="min-h-screen bg-linear-to-b from-white via-blue-50/10 to-white">
      {/* Hero Section */}
      <div className="container max-w-7xl py-12 px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <Shield className="w-4 h-4" />
            Independently Reviewed Tools
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Privacy Tools Directory
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Every tool listed has passed our rigorous testing process. No trackers, 
            no telemetry, just privacy-respecting software and hardware.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Badge variant="outline" className="gap-2">
              <CheckCircle className="w-4 h-4" />
              Zero Telemetry Verified
            </Badge>
            <Badge variant="outline" className="gap-2">
              <Star className="w-4 h-4" />
              7-Day Minimum Testing
            </Badge>
            <Badge variant="outline" className="gap-2">
              <Eye className="w-4 h-4" />
              Network Traffic Audited
            </Badge>
          </div>
        </div>

        {/* Tools Grid */}
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-16">
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 inline-block mx-auto">
                <Shield className="w-12 h-12 text-blue-500" />
              </div>
              <h2 className="text-xl font-bold">No tools published yet</h2>
              <p className="text-muted-foreground">
                Check back soon for our curated privacy tools.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(grouped).map(([group, items]) => (
              <section key={group} className="space-y-6">
                {/* Section Header */}
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${sectionColors[group]}`}>
                      {sectionIcons[group] || <Zap className="w-5 h-5" />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        {sectionLabels[group] || group.replace(/-/g, ' ')}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Tools that respect your privacy in this category
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="px-3 py-1">
                    {items.length} {items.length === 1 ? 'tool' : 'tools'}
                  </Badge>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((tool) => (
                    <Card 
                      key={tool.slug}
                      className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border hover:border-blue-200"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                              <Link 
                                href={`/reviews/${tool.slug}`}
                                className="hover:underline flex items-center gap-2"
                              >
                                {tool.title}
                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Link>
                            </CardTitle>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${sectionColors[group]} border`}
                            >
                              {sectionLabels[group] || group.replace(/-/g, ' ')}
                            </Badge>
                          </div>
                          <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pb-4">
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {tool.excerpt || 'Privacy-focused software that has passed our rigorous testing standards.'}
                        </p>
                      </CardContent>
                      
                      <CardFooter className="border-t pt-4">
                        <Link
                          href={`/reviews/${tool.slug}`}
                          className="w-full inline-flex items-center justify-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 py-2 px-4 rounded-md transition-colors"
                        >
                          Read Full Review
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* Methodology Callout */}
        <div className="mt-16">
          <div className="bg-linear-to-r from-blue-500/5 to-emerald-500/5 rounded-2xl p-8 border">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-3">How We Review Tools</h3>
                <p className="text-muted-foreground mb-4">
                  Every tool listed undergoes a minimum 7-day testing period with 
                  network traffic analysis, privacy policy review, and real-world usage.
                </p>
                <Link
                  href="/methodology"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Our Full Methodology
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="md:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Network Analysis', value: 'Wireshark + HTTP Toolkit' },
                    { label: 'Testing Period', value: '7+ Days Minimum' },
                    { label: 'Privacy Audit', value: 'Zero Telemetry Check' },
                    { label: 'Real-World Test', value: 'Daily Usage Simulated' },
                  ].map((item, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-semibold">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ArrowRight icon component
const ArrowRight = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
)