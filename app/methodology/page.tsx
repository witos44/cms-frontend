// app/methodology/page.tsx
import { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';
import { Badge } from '@/components/ui/badge';
import { 
  Beaker, 
  Filter, 
  Cpu, 
  Shield, 
  Eye, 
  FileText, 
  RefreshCw, 
  Lock, 
  CheckCircle,
  Award,
  AlertTriangle,
  Monitor,
  Server,
  FileCode,
  Users
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Review Methodology | nsecure.store',
  description: 'How we test and evaluate privacy and security tools.',
};

export default function MethodologyPage() {
  return (
    <StaticPage 
      title="Review Methodology" 
      lastUpdated="December 26, 2025"
    >
      {/* Hero Statement */}
      <div className="not-prose bg-primary/5 rounded-xl p-8 mb-10 border border-primary/20">
        <div className="flex items-start gap-6">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Beaker className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold mb-3">
              Our reviews are not opinions. They are technical audits.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Every evaluation follows a standardized, repeatable process designed to measure tools 
              on technical merit, privacy protection, and real-world usability. No shortcuts, 
              no assumptions—just evidence-based analysis.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Tool Selection */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Filter className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold">1. Tool Selection</h3>
            </div>
            <div className="space-y-3">
              <p>Tools are selected based on objective criteria:</p>
              <div className="space-y-2">
                {[
                  {
                    icon: <Users className="w-4 h-4" />,
                    text: 'Community reputation (Reddit, Hacker News, FOSS communities)',
                    color: 'text-blue-500'
                  },
                  {
                    icon: <FileCode className="w-4 h-4" />,
                    text: 'Technical architecture (open-source, E2E encryption, audit history)',
                    color: 'text-green-500'
                  },
                  {
                    icon: <Eye className="w-4 h-4" />,
                    text: 'Absence of known privacy violations or security incidents',
                    color: 'text-red-500'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`p-1 rounded ${item.color}/10 ${item.color}`}>
                      {item.icon}
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
              <Badge variant="outline" className="gap-2 mt-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                We do not accept vendor review requests
              </Badge>
            </div>
          </div>

          {/* Testing Environment */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Cpu className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold">2. Testing Environment</h3>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    title: 'Operating Systems',
                    items: ['Ubuntu 24.04', 'Windows 11', 'macOS Sonoma'],
                    icon: '💻'
                  },
                  {
                    title: 'Network Analysis',
                    items: ['Wireshark', 'Little Snitch', 'HTTP Toolkit'],
                    icon: '📡'
                  },
                  {
                    title: 'Storage Inspection',
                    items: ['Encryption audit', 'Local data mapping', 'Backup analysis'],
                    icon: '💾'
                  },
                  {
                    title: 'Account Testing',
                    items: ['Signup flow', 'Password recovery', 'Data export'],
                    icon: '🔐'
                  }
                ].map((category, index) => (
                  <div key={index} className="bg-muted/30 p-3 rounded border">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{category.icon}</span>
                      <p className="font-semibold text-sm">{category.title}</p>
                    </div>
                    <ul className="space-y-1">
                      {category.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-xs text-muted-foreground flex items-center gap-1">
                          <div className="w-1 h-1 bg-purple-500 rounded-full" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scoring System */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Award className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold">4. Scoring & Recommendations</h3>
            </div>
            <div className="space-y-3">
              <p>We avoid star ratings. Instead, we provide:</p>
              <div className="space-y-2">
                {[
                  {
                    title: 'Technical Summary',
                    description: 'Detailed architecture analysis and risk assessment',
                    badge: '📊'
                  },
                  {
                    title: 'Privacy Verdict',
                    description: 'Acceptable / Caution / Avoid classification',
                    badge: '🛡️'
                  },
                  {
                    title: 'Recommendation Tier',
                    description: 'Top Pick / Solid Choice / Niche Use categorization',
                    badge: '🏆'
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded border">
                    <div className="text-xl">{item.badge}</div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Evaluation Criteria */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Shield className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-lg font-bold">3. Evaluation Criteria</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-3 font-semibold">Category</th>
                    <th className="text-left pb-3 font-semibold">Key Questions</th>
                    <th className="text-left pb-3 font-semibold">Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    {
                      category: 'Privacy',
                      icon: '👁️',
                      questions: 'Does it collect IP, device ID, or usage data? Is it GDPR-compliant?',
                      weight: '40%'
                    },
                    {
                      category: 'Security',
                      icon: '🔒',
                      questions: 'Is encryption end-to-end? Is the code audited? Are 2FA/security keys supported?',
                      weight: '30%'
                    },
                    {
                      category: 'Transparency',
                      icon: '📖',
                      questions: 'Is the source code public? Is the business model clear? Are security reports acknowledged?',
                      weight: '20%'
                    },
                    {
                      category: 'Usability',
                      icon: '🎯',
                      questions: 'Can a non-technical user set it up? Is documentation clear? Does it work reliably?',
                      weight: '10%'
                    }
                  ].map((row, index) => (
                    <tr key={index} className="hover:bg-muted/30">
                      <td className="py-3 font-medium">
                        <div className="flex items-center gap-2">
                          <span>{row.icon}</span>
                          {row.category}
                        </div>
                      </td>
                      <td className="py-3 text-muted-foreground">{row.questions}</td>
                      <td className="py-3">
                        <Badge variant="secondary">{row.weight}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Updates & Corrections */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <RefreshCw className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-bold">5. Updates & Corrections</h3>
            </div>
            <div className="space-y-3">
              <p>Reviews are updated when:</p>
              <div className="space-y-2">
                {[
                  'A major security vulnerability is discovered',
                  'The vendor significantly changes its privacy policy',
                  'A superior alternative becomes available',
                  'User feedback reveals critical issues'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-red-500/5 p-3 rounded border border-red-500/20">
                <p className="text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  Corrections are prominently noted at the top of each review
                </p>
              </div>
            </div>
          </div>

          {/* Independence Guarantee */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Lock className="w-5 h-5 text-indigo-500" />
              </div>
              <h3 className="text-lg font-bold">6. Independence Guarantee</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-primary/5 p-4 rounded border border-primary/20">
                <p className="font-semibold text-primary text-center">
                  No vendor has ever reviewed, edited, or approved our content before publication.
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                Full methodology documentation, including raw test data and analysis notes, 
                is available upon request to accredited researchers and journalists.
              </p>
              <Badge variant="outline" className="gap-2">
                <FileText className="w-3.5 h-3.5" />
                Documentation available for academic review
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Testing Timeline */}
      <div className="mb-12">
        <h3 className="text-xl font-bold mb-6">Standard Testing Timeline</h3>
        <div className="relative">
          <div className="hidden lg:block absolute left-0 right-0 top-1/2 h-0.5 bg-muted -translate-y-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                phase: 'Phase 1',
                title: 'Initial Setup',
                duration: '2-3 days',
                tasks: ['Environment prep', 'Basic functionality', 'First impressions'],
                color: 'border-blue-500 bg-blue-500/5'
              },
              {
                phase: 'Phase 2',
                title: 'Deep Analysis',
                duration: '4-5 days',
                tasks: ['Network monitoring', 'Security audit', 'Privacy inspection'],
                color: 'border-green-500 bg-green-500/5'
              },
              {
                phase: 'Phase 3',
                title: 'Real-world Testing',
                duration: '3-4 days',
                tasks: ['Daily usage', 'Edge cases', 'Performance metrics'],
                color: 'border-amber-500 bg-amber-500/5'
              },
              {
                phase: 'Phase 4',
                title: 'Documentation',
                duration: '1-2 days',
                tasks: ['Report writing', 'Evidence collection', 'Peer review'],
                color: 'border-purple-500 bg-purple-500/5'
              }
            ].map((phase, index) => (
              <div key={index} className={`p-6 rounded-xl border ${phase.color} relative z-10`}>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="outline">{phase.phase}</Badge>
                  <Badge variant="secondary">{phase.duration}</Badge>
                </div>
                <h4 className="font-bold text-lg mb-3">{phase.title}</h4>
                <ul className="space-y-1">
                  {phase.tasks.map((task, taskIndex) => (
                    <li key={taskIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                      <CheckCircle className="w-3 h-3" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quality Assurance */}
      <div className="bg-muted/30 rounded-lg p-8 border">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex flex-col items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Quality Assurance Process</h3>
              <p className="text-muted-foreground mb-4">
                Every review undergoes a three-stage verification process before publication.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    step: 'Technical Review',
                    description: 'Peer verification of all test results and findings'
                  },
                  {
                    step: 'Editorial Review',
                    description: 'Fact-checking and clarity assessment'
                  },
                  {
                    step: 'Legal Review',
                    description: 'Compliance check for accuracy and fairness'
                  }
                ].map((step, index) => (
                  <div key={index} className="p-4 bg-card rounded border">
                    <div className="font-semibold mb-2">{step.step}</div>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>Methodology Version 2.3 • Updated quarterly</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>Transparency is our methodology</span>
          </div>
        </div>
      </div>
    </StaticPage>
  );
}