// app/page.tsx
import Link from "next/link";
import { 
  Shield, 
  Lock, 
  Eye, 
  CheckCircle, 
  ArrowRight, 
  Download, 
  Star,
  Zap,
  Users,
  Globe,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "In-Depth Technical Reviews",
      description: "Lab-tested VPNs, password managers, and encrypted tools—verified through network analysis and real-world usage.",
      link: "/reviews",
      color: "from-blue-500 to-cyan-500",
      stat: "200+ Tools Tested"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Step-by-Step Privacy Guides",
      description: "Practical tutorials to secure your devices, encrypt communications, and build a self-hosted privacy stack.",
      link: "/guides",
      color: "from-emerald-500 to-green-500",
      stat: "50+ Expert Guides"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Curated Tools & Exclusive Deals",
      description: "Hand-picked privacy software and special discounts on tools that pass our rigorous standards.",
      link: "/tools",
      color: "from-purple-500 to-pink-500",
      stat: "Weekly Updates"
    }
  ];

  const testimonials = [
    {
      quote: "Finally, a review site that doesn't feel like an affiliate farm. The technical depth here is unmatched.",
      author: "Security Engineer",
      company: "Tech Startup",
      badge: "Verified User"
    },
    {
      quote: "Switched my entire team's tools based on nsecure.store recommendations. Zero regrets.",
      author: "CTO",
      company: "Remote-First Company",
      badge: "Team License"
    },
    {
      quote: "As a journalist, I trust nsecure.store for tool recommendations that protect my sources.",
      author: "Investigative Reporter",
      company: "Independent Media",
      badge: "High-Risk User"
    }
  ];

  const methodologyHighlights = [
    { icon: "🔍", text: "7-day minimum testing period" },
    { icon: "📡", text: "Network traffic analysis" },
    { icon: "🔒", text: "Zero telemetry verification" },
    { icon: "📝", text: "Vendor policy audits" }
  ];

  return (
    <main className="min-h-screen bg-linear-to-b from-white via-blue-50/20 to-white">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 md:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 left-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Content */}
            <div className="lg:w-1/2 space-y-8">
              <div className="space-y-4">
                <Badge className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200">
                  <ShieldCheck className="w-4 h-4" />
                  Independent • Technical • Uncompromising
                </Badge>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Take Back Control of Your{" "}
                  <span className="bg-linear-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                    Digital Life
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Evidence-based reviews, practical guides, and trusted tools to protect your data, 
                  privacy, and identity—without the hype.
                </p>
              </div>

              {/* Methodology Highlights */}
              <div className="grid grid-cols-2 gap-3">
                {methodologyHighlights.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/guides/privacy-checklist"
                  className="group inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Download className="w-5 h-5" />
                  Get Free Privacy Starter Kit
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/reviews"
                  className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-gray-400 text-gray-800 font-semibold py-4 px-8 rounded-xl transition-all hover:shadow-sm"
                >
                  <Sparkles className="w-5 h-5" />
                  Explore Top Reviews
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Trusted by 50K+ privacy-conscious users</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span>Zero sponsored content</span>
                </div>
              </div>
            </div>

            {/* Right Content - Visual Card */}
            <div className="lg:w-1/2 relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-linear-to-r from-blue-600 to-emerald-600 rounded-2xl blur-lg opacity-20"></div>
                <div className="relative bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-800 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Shield className="w-8 h-8 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Verified Privacy Stack</h3>
                        <p className="text-gray-400">Tools that pass our 4-stage audit process</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { name: "Proton", category: "Encrypted Email", status: "Top Pick" },
                        { name: "Bitwarden", category: "Password Manager", status: "Recommended" },
                        { name: "NordVPN", category: "No-Logs VPN", status: "Audited" },
                        { name: "Yubico", category: "Security Keys", status: "Essential" }
                      ].map((tool, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-800">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                              <Star className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-white">{tool.name}</p>
                              <p className="text-sm text-gray-400">{tool.category}</p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                            {tool.status}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-gray-800">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Last updated: Today</span>
                        <Link 
                          href="/methodology" 
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1"
                        >
                          View Methodology
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 bg-emerald-100 text-emerald-700 border-emerald-200">
              Why Choose nsecure.store
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Complete Privacy Toolkit
            </h2>
            <p className="text-lg text-gray-600">
              We combine technical expertise with practical advice to help you build 
              a privacy-first digital life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-linear-to-b from-white to-gray-50 rounded-2xl p-8 border border-gray-200 hover:border-transparent transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute -inset-0.5 bg-linear-to-r opacity-0 group-hover:opacity-100 blur transition duration-500 rounded-2xl" />
                <div className="relative">
                  <div className={`p-3 rounded-xl bg-linear-to-r ${feature.color} bg-opacity-10 w-fit mb-6`}>
                    <div className={`text-transparent bg-linear-to-r ${feature.color} bg-clip-text`}>
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-sm">
                      {feature.stat}
                    </Badge>
                    <Link
                      href={feature.link}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium group/link"
                    >
                      Explore
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-200">
              Trusted By Experts
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Privacy Professionals Trust Us
            </h2>
            <p className="text-gray-600">
              Don't just take our word for it—here's what our community says.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 italic text-lg mb-6">
                  "{testimonial.quote}"
                </p>
                
                <div className="pt-6 border-t">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-gray-600 text-sm">{testimonial.company}</p>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    {testimonial.badge}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-linear-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
            <Zap className="w-4 h-4" />
            Limited Time Offer
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Start Your Privacy Journey Today
          </h2>
          
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get our free Privacy Starter Kit—packed with checklists, tool recommendations, 
            and exclusive discounts on verified privacy tools.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/guides/privacy-checklist"
              className="group inline-flex items-center justify-center gap-3 bg-white text-gray-900 font-bold py-4 px-10 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5" />
              Download Free Kit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 text-white font-semibold py-4 px-10 rounded-xl hover:bg-white/10 transition-colors"
            >
              <Globe className="w-5 h-5" />
              Learn About Our Mission
            </Link>
          </div>
          
          <p className="text-gray-400 text-sm mt-8">
            Join 50,000+ privacy-conscious users. No spam, ever.
          </p>
        </div>
      </section>

      {/* Footer Trust Section */}
      <section className="py-12 px-4 md:px-8 bg-white border-t">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Zero affiliate bias</p>
                <p className="text-sm text-gray-600">Our reviews are never influenced by commissions</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Lock className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">No tracking</p>
                <p className="text-sm text-gray-600">We don't collect or sell your data</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Transparent methodology</p>
                <p className="text-sm text-gray-600">See exactly how we test and review</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}