// app/gdpr/page.tsx
import { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  CheckCircle, 
  FileText, 
  Eye, 
  Mail, 
  Lock, 
  Download, 
  Users,
  Globe,
  AlertTriangle,
  Clock,
  Database,
  UserCheck,
  Server
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'GDPR Compliance Statement | nsecure.store',
  description: 'Our commitment to data protection and GDPR compliance for European users.',
};

export default function GDPRPage() {
  return (
    <StaticPage 
      title="GDPR Compliance Statement" 
      lastUpdated="December 26, 2025"
    >
      {/* Hero Section */}
      <div className="not-prose bg-blue-500/5 rounded-xl p-8 mb-10 border border-blue-500/20">
        <div className="flex items-start gap-6">
          <div className="p-3 bg-blue-500/10 rounded-lg">
            <Shield className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3">
              Our GDPR Commitment
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              nsecure.store is committed to protecting the privacy rights of all users, 
              with special attention to the requirements of the European Union's 
              General Data Protection Regulation (GDPR). Our privacy-by-design approach 
              exceeds basic compliance requirements.
            </p>
            <Badge className="mt-4 gap-2">
              <CheckCircle className="w-4 h-4" />
              Fully GDPR Compliant Since 2025
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column - Rights & Principles */}
        <div className="space-y-8">
          {/* Data Subject Rights */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <UserCheck className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-lg font-bold">Your GDPR Rights</h3>
            </div>
            <div className="space-y-4">
              <p>
                As a data subject under GDPR, you have the following rights which we fully support:
              </p>
              <div className="space-y-3">
                {[
                  {
                    right: 'Right to Access',
                    icon: <Eye className="w-4 h-4" />,
                    description: 'Request confirmation of whether we process your personal data'
                  },
                  {
                    right: 'Right to Erasure',
                    icon: <Database className="w-4 h-4" />,
                    description: 'Request deletion of your personal data ("right to be forgotten")'
                  },
                  {
                    right: 'Right to Rectification',
                    icon: <FileText className="w-4 h-4" />,
                    description: 'Request correction of inaccurate personal data'
                  },
                  {
                    right: 'Right to Data Portability',
                    icon: <Download className="w-4 h-4" />,
                    description: 'Receive your data in a structured, commonly used format'
                  },
                  {
                    right: 'Right to Object',
                    icon: <AlertTriangle className="w-4 h-4" />,
                    description: 'Object to processing of your personal data'
                  },
                  {
                    right: 'Right to Restriction',
                    icon: <Lock className="w-4 h-4" />,
                    description: 'Request restriction of processing under certain circumstances'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 p-3 bg-muted/30 rounded border">
                    <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-semibold">{item.right}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Data Protection Principles */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Shield className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold">Our Data Protection Principles</h3>
            </div>
            <div className="space-y-3">
              {[
                {
                  principle: 'Lawfulness, Fairness & Transparency',
                  description: 'We process data lawfully, fairly, and transparently',
                  color: 'bg-purple-500'
                },
                {
                  principle: 'Purpose Limitation',
                  description: 'We collect data only for specified, explicit, legitimate purposes',
                  color: 'bg-blue-500'
                },
                {
                  principle: 'Data Minimization',
                  description: 'We collect only data that is adequate, relevant, and necessary',
                  color: 'bg-green-500'
                },
                {
                  principle: 'Accuracy',
                  description: 'We keep personal data accurate and up-to-date',
                  color: 'bg-amber-500'
                },
                {
                  principle: 'Storage Limitation',
                  description: 'We store personal data only as long as necessary',
                  color: 'bg-red-500'
                },
                {
                  principle: 'Integrity & Confidentiality',
                  description: 'We ensure appropriate security of personal data',
                  color: 'bg-indigo-500'
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color} mt-1.5 shrink-0`} />
                  <div>
                    <p className="font-medium">{item.principle}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Implementation & Details */}
        <div className="space-y-8">
          {/* Our Implementation */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Server className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold">Our Implementation</h3>
            </div>
            <div className="space-y-4">
              <p>
                nsecure.store's technical architecture is designed from the ground up 
                for GDPR compliance:
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    title: 'Data Collection',
                    status: 'Minimal',
                    description: 'No personal data collected',
                    icon: '📊'
                  },
                  {
                    title: 'Cookies',
                    status: 'Essential Only',
                    description: 'No tracking cookies',
                    icon: '🍪'
                  },
                  {
                    title: 'Third Parties',
                    status: 'None',
                    description: 'No data sharing',
                    icon: '🔗'
                  },
                  {
                    title: 'Data Retention',
                    status: '30 Days',
                    description: 'Server logs only',
                    icon: '⏰'
                  }
                ].map((item, index) => (
                  <div key={index} className="p-3 bg-muted/30 rounded border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl">{item.icon}</span>
                      <Badge variant="secondary">{item.status}</Badge>
                    </div>
                    <p className="font-semibold text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* International Data Transfers */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Globe className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold">International Data Transfers</h3>
            </div>
            <div className="space-y-3">
              <p>
                Our infrastructure is hosted in GDPR-compliant jurisdictions:
              </p>
              <div className="space-y-2">
                {[
                  {
                    location: 'Primary Hosting',
                    provider: 'Vercel (EU Region)',
                    status: 'GDPR Compliant',
                    color: 'border-green-500/20 bg-green-500/5'
                  },
                  {
                    location: 'Backup Storage',
                    provider: 'AWS EU (Frankfurt)',
                    status: 'Adequacy Decision',
                    color: 'border-blue-500/20 bg-blue-500/5'
                  },
                  {
                    location: 'Email Processing',
                    provider: 'Self-hosted (EU)',
                    status: 'No Third Parties',
                    color: 'border-purple-500/20 bg-purple-500/5'
                  }
                ].map((item, index) => (
                  <div key={index} className={`p-3 rounded border ${item.color}`}>
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold">{item.location}</p>
                      <Badge variant="outline" className="text-xs">
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.provider}</p>
                  </div>
                ))}
              </div>
              <div className="bg-blue-500/5 p-3 rounded border border-blue-500/20">
                <p className="text-sm font-medium">
                  All data processing occurs within EU-approved jurisdictions with adequate protection.
                </p>
              </div>
            </div>
          </div>

          {/* Data Protection Officer */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Users className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-bold">Data Protection Officer</h3>
            </div>
            <div className="space-y-3">
              <p>
                While not legally required due to our minimal data processing, 
                we have designated a Data Protection Officer (DPO) to ensure 
                ongoing compliance and handle inquiries.
              </p>
              <div className="bg-muted/30 p-4 rounded border">
                <p className="font-semibold mb-1">Contact Our DPO:</p>
                <a 
                  href="mailto:dpo@nsecure.store"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Mail className="w-4 h-4" />
                  dpo@nsecure.store
                </a>
                <p className="text-sm text-muted-foreground mt-2">
                  Response within 72 hours for all GDPR-related inquiries.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breach Notification */}
      <div className="mb-12">
        <h3 className="text-xl font-bold mb-6">Data Breach Notification Protocol</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              stage: 'Detection',
              time: 'Immediate',
              actions: ['Automated monitoring', 'Security alerts', 'Manual review'],
              icon: '🔍',
              color: 'border-red-500/20 bg-red-500/5'
            },
            {
              stage: 'Assessment',
              time: 'Within 24 hours',
              actions: ['Impact analysis', 'Scope determination', 'Risk evaluation'],
              icon: '📋',
              color: 'border-amber-500/20 bg-amber-500/5'
            },
            {
              stage: 'Notification',
              time: 'Within 72 hours',
              actions: ['Regulator notification', 'Affected individuals', 'Remediation plan'],
              icon: '📢',
              color: 'border-green-500/20 bg-green-500/5'
            }
          ].map((stage, index) => (
            <div key={index} className={`p-6 rounded-xl border ${stage.color}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{stage.icon}</span>
                  <h4 className="font-bold">{stage.stage}</h4>
                </div>
                <Badge variant="outline">{stage.time}</Badge>
              </div>
              <ul className="space-y-2">
                {stage.actions.map((action, actionIndex) => (
                  <li key={actionIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance Documentation */}
      <div className="bg-muted/30 rounded-lg p-8 border mb-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex flex-col items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-full">
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Compliance Documentation</h3>
              <p className="text-muted-foreground mb-4">
                We maintain comprehensive documentation of our GDPR compliance measures.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    document: 'Data Protection Policy',
                    status: 'Current',
                    audience: 'Internal'
                  },
                  {
                    document: 'Record of Processing Activities',
                    status: 'Maintained',
                    audience: 'Regulatory'
                  },
                  {
                    document: 'Data Protection Impact Assessments',
                    status: 'Available',
                    audience: 'Upon Request'
                  }
                ].map((doc, index) => (
                  <div key={index} className="p-4 bg-card rounded border">
                    <div className="font-semibold mb-2">{doc.document}</div>
                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="outline">{doc.status}</Badge>
                      <span className="text-muted-foreground">{doc.audience}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Resources */}
      <div className="text-center border-t pt-10">
        <div className="inline-flex flex-col items-center gap-4 max-w-2xl mx-auto">
          <div className="p-3 bg-blue-500/10 rounded-full">
            <Mail className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">GDPR Inquiries</h3>
            <p className="text-muted-foreground mb-4">
              For GDPR rights requests, questions about our compliance, 
              or to report a potential data protection issue:
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="mailto:gdpr@nsecure.store"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                <Mail className="w-5 h-5" />
                gdpr@nsecure.store
              </a>
              <a 
                href="/privacy"
                className="inline-flex items-center gap-2 px-6 py-3 bg-card border rounded-lg hover:bg-muted transition-colors font-medium"
              >
                <FileText className="w-5 h-5" />
                Full Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>This statement reviewed quarterly for updates</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span>GDPR Compliance Version 1.2 • Effective December 26, 2025</span>
          </div>
        </div>
      </div>
    </StaticPage>
  );
}