// app/affiliate-disclosure/page.tsx
import { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle, DollarSign, Lock, Eye, Mail, ExternalLink, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | nsecure.store',
  description: 'How we fund independent reviews—without compromising integrity.',
};

export default function AffiliateDisclosure() {
  const partners = [
    { name: 'Proton', description: 'End-to-end encrypted suite', category: 'Email & Drive' },
    { name: 'NordVPN', description: 'Independently audited, no-logs VPN', category: 'VPN' },
    { name: '1Password', description: 'Zero-knowledge password manager', category: 'Security' },
    { name: 'Yubico', description: 'Open hardware, FIDO2 certified', category: 'Hardware' },
    { name: 'Bitwarden', description: 'Open-source, self-hostable', category: 'Password Manager' },
  ];

  return (
    <StaticPage 
      title="Affiliate Disclosure" 
      lastUpdated="December 26, 2025"
    >
      {/* Hero Section with Subtitle */}
      <div className="not-prose mb-10">
        <h2 className="text-2xl font-bold text-center mb-3">
          Transparent Funding for Independent Reviews
        </h2>
        <div className="bg-primary/5 rounded-xl p-8 border border-primary/20">
          <div className="flex items-start gap-6">
            <div className="p-3 bg-primary/10 rounded-lg">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                nsecure.store is funded exclusively through affiliate commissions from vendors 
                whose products pass our rigorous, independent testing. This model enables us 
                to operate without advertising or sponsored content while maintaining complete 
                editorial independence.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Our Funding Model */}
        <div className="space-y-6">
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Heart className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-lg font-bold">Our Funding Model</h3>
            </div>
            <div className="space-y-3">
              <p>
                This model allows us to maintain true independence:
              </p>
              <div className="space-y-2">
                {[
                  'Operate without advertising or sponsorships',
                  'Reject all paid placements and sponsored content',
                  'Maintain complete editorial independence',
                  'Fund ongoing testing and research'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Our Process */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Eye className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold">Our Review Process</h3>
            </div>
            <ol className="space-y-3">
              {[
                {
                  step: '1',
                  title: 'Independent Testing',
                  description: 'Minimum 7-day real-world testing with full technical audit'
                },
                {
                  step: '2',
                  title: 'Unbiased Review Draft',
                  description: 'Review written before checking affiliate program availability'
                },
                {
                  step: '3',
                  title: 'Standards Verification',
                  description: 'Only apply for affiliate program if tool meets all criteria'
                },
                {
                  step: '4',
                  title: 'Publication',
                  description: 'Vendor never sees review before publication—no approval process'
                }
              ].map((item) => (
                <li key={item.step} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Our Partners & Transparency */}
        <div className="space-y-6">
          {/* Our Partners */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Shield className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold">Our Trusted Partners</h3>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground mb-3">
                We only partner with vendors who share our commitment to privacy and security:
              </p>
              <div className="space-y-2">
                {partners.map((partner) => (
                  <div key={partner.name} className="p-3 bg-muted/30 rounded border flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{partner.name}</p>
                      <p className="text-sm text-muted-foreground">{partner.description}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {partner.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Transparency in Practice */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Lock className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold">Transparency in Practice</h3>
            </div>
            <div className="space-y-3">
              <p>Every product page includes clear disclosures:</p>
              <div className="space-y-2">
                {[
                  'Clear "Affiliate Link" badge on all commission-earning links',
                  'Direct links to vendor privacy policies',
                  'Full testing methodology and criteria',
                  'Date of last review verification'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What We Never Do */}
      <div className="mb-12">
        <h3 className="text-xl font-bold mb-6">Our Non-Negotiables</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'No Paid Reviews',
              description: 'We never accept payment to review a product. All reviews are initiated by our team based on user interest and market relevance.',
              icon: '✗',
              color: 'border-red-500/20 bg-red-500/5'
            },
            {
              title: 'No Commission Bias',
              description: 'Commission rates never influence our ratings. We\'ve recommended tools with lower commission rates over higher-paying alternatives.',
              icon: '⚖️',
              color: 'border-blue-500/20 bg-blue-500/5'
            },
            {
              title: 'No Censorship',
              description: 'We never hide negative findings to preserve partnerships. If a tool fails our tests, we say so—regardless of partnership status.',
              icon: '🔍',
              color: 'border-green-500/20 bg-green-500/5'
            }
          ].map((item, index) => (
            <div key={index} className={`p-6 rounded-xl border ${item.color}`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">{item.icon}</div>
                <h4 className="font-bold">{item.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Commission Disclosure */}
      <div className="bg-muted/30 rounded-lg p-8 border mb-10">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-4">Commission Structure</h3>
          <div className="bg-card rounded-lg p-6 border mb-4">
            <p className="text-lg">
              Typical commissions range from <strong>10-30%</strong> of product revenue.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              These commissions support our testing infrastructure, research time, and website operations.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ExternalLink className="w-4 h-4" />
            <p>
              Vendor commission rates are subject to change and do not affect our reviews.
            </p>
          </div>
        </div>
      </div>

      {/* Contact & Ethics */}
      <div className="text-center border-t pt-10">
        <div className="inline-flex flex-col items-center gap-4 max-w-md mx-auto">
          <div className="p-3 bg-primary/10 rounded-full">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Questions About Our Ethics?</h3>
            <p className="text-muted-foreground mb-4">
              We welcome scrutiny and are happy to provide additional documentation.
            </p>
            <a 
              href="mailto:ethics@nsecure.store"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <Mail className="w-5 h-5" />
              ethics@nsecure.store
            </a>
          </div>
        </div>
      </div>

      {/* Last Updated & Verification */}
      <div className="mt-12 pt-8 border-t">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>This disclosure is reviewed quarterly for accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>Version 3.1 • Last verified December 26, 2025</span>
          </div>
        </div>
      </div>
    </StaticPage>
  );
}