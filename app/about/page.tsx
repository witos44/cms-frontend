// app/about/page.tsx
import { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';
import { Shield, Target, EyeOff, Award, Heart, Mail, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'About Us | nsecure.store',
  description: 'Independent, technical, and uncompromising reviews of privacy tools.',
  keywords: ['privacy tools', 'security reviews', 'independent testing', 'digital security'],
};

export default function AboutPage() {
  return (
    <StaticPage 
      title="About nsecure.store"
      lastUpdated={new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}
    >
      {/* Hero Statement */}
      <div className="not-prose bg-linear-to-r from-blue-600 to-emerald-600 rounded-lg p-6 mb-8 border">
        <div className="flex items-start gap-4">
          <Shield className="w-10 h-10 text-white mt-1 shrink-0" />
          <div>
            <h3 className="text-xl text-white font-bold mb-3">
              nsecure.store is not a blog. It's a public service.
            </h3>
            <p className="text-amber-50 leading-relaxed">
              We exist to counter the noise of sponsored rankings, affiliate-driven hype, 
              and vague "security" claims that dominate the internet. Every review is 
              a technical audit, every recommendation is earned through rigorous testing.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Our Methodology */}
        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Target className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold">Our Methodology</h3>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
              <span><strong>7-day real-world testing</strong> on clean systems</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
              <span><strong>Network traffic analysis</strong> via Wireshark</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
              <span><strong>Privacy policy audit</strong> and source verification</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
              <span><strong>Direct vendor engagement</strong> required</span>
            </li>
          </ul>
        </div>

        {/* Our Standards */}
        <div className="bg-card rounded-lg p-6 border shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Award className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-bold">Our Standards</h3>
          </div>
          <p className="text-muted-foreground mb-3">Must meet all criteria:</p>
          <div className="space-y-2">
            <Badge variant="secondary" className="w-full justify-start gap-2 py-1.5">
              <EyeOff className="w-3.5 h-3.5" />
              <span>Zero telemetry (packet-verified)</span>
            </Badge>
            <Badge variant="secondary" className="w-full justify-start gap-2 py-1.5">
              <Shield className="w-3.5 h-3.5" />
              <span>No mandatory accounts (unless E2EE)</span>
            </Badge>
            <Badge variant="secondary" className="w-full justify-start gap-2 py-1.5">
              <Heart className="w-3.5 h-3.5" />
              <span>Transparent business model</span>
            </Badge>
            <Badge variant="secondary" className="w-full justify-start gap-2 py-1.5">
              <Mail className="w-3.5 h-3.5" />
              <span>Responsive to security reports</span>
            </Badge>
          </div>
        </div>
      </div>

      {/* What We Reject */}
      <h3 className="text-xl font-bold mt-8 mb-4">What We Reject</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        {[
          { text: '"Free" tools that monetize via user data', icon: <X className="w-4 h-4" /> },
          { text: 'Vendors who pay for placement or rankings', icon: <X className="w-4 h-4" /> },
          { text: 'Closed-source clients without justification', icon: <X className="w-4 h-4" /> },
          { text: 'AI-generated or outsourced reviews', icon: <X className="w-4 h-4" /> },
        ].map((item, index) => (
          <div 
            key={index}
            className="p-4 rounded-lg border border-destructive/20 bg-destructive/5 hover:bg-destructive/10 transition-colors flex items-center gap-3"
          >
            <div className="w-7 h-7 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
              <X className="w-3.5 h-3.5 text-destructive" />
            </div>
            <span className="font-medium">{item.text}</span>
          </div>
        ))}
      </div>

      {/* Funding & Independence */}
      <div className="bg-muted/30 rounded-lg p-6 border mb-8">
        <h3 className="text-xl font-bold mb-4">Funding & Independence</h3>
        <div className="space-y-4">
          <p>
            We are funded <strong>solely through affiliate commissions</strong> from vendors who meet our standards. 
            No direct payments, sponsorships, or advertising revenue influences our reviews.
          </p>
          <p>
            Our <a href="/affiliate-disclosure" className="text-primary hover:underline font-medium">
              Affiliate Disclosure
            </a> details our transparent selection and compensation process.
          </p>
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-center font-bold text-primary">
              We own no equity in any reviewed product.
            </p>
            <p className="text-center text-sm text-muted-foreground mt-1">
              Our only incentive is to earn and maintain your trust.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="text-center border-t pt-8">
        <div className="inline-flex flex-col items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Mail className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Contact Us</h3>
            <p className="text-muted-foreground mb-4">
              Technical inquiry? Found an error? We read every message.
            </p>
            <a 
              href="mailto:team@nsecure.store"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <Mail className="w-4 h-4" />
              team@nsecure.store
            </a>
          </div>
        </div>
      </div>
    </StaticPage>
  );
}