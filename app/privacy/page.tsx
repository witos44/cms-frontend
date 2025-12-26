// app/privacy/page.tsx
import { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';
import { Shield, Cookie, Server, Link, EyeOff, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Privacy Policy | nsecure.store',
  description: 'We collect nothing. Here’s proof.',
};

export default function PrivacyPolicy() {
  return (
    <StaticPage title="Privacy Policy" lastUpdated="December 26, 2025">
      {/* Hero Statement */}
      <div className="not-prose bg-primary/5 rounded-lg p-6 mb-8 border border-primary/20">
        <div className="flex items-start gap-4">
          <Shield className="w-10 h-10 text-primary mt-1 shrink-0" />
          <div>
            <h2 className="text-xl font-bold mb-2">
              This website collects zero personal data.
            </h2>
            <p className="text-muted-foreground">
              We do not track, profile, or store information about visitors. Below is a full technical 
              accounting of our data practices—or lack thereof.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* What We Don't Track */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <EyeOff className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-bold">What We Do Not Use</h3>
            </div>
            <ul className="space-y-3">
              {[
                { text: 'Analytics services (Google, Plausible, etc.)', icon: '✗' },
                { text: 'Advertising trackers (Meta Pixel, TikTok Pixel)', icon: '✗' },
                { text: 'User accounts or comment systems', icon: '✗' },
                { text: 'Newsletter or lead collection forms', icon: '✗' },
                { text: 'Behavioral tracking scripts', icon: '✗' },
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-red-500 text-xs">{item.icon}</span>
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Architecture */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Server className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-bold">Server-Side Logging</h3>
            </div>
            <div className="space-y-3">
              <p>
                Our hosting provider (Vercel) maintains standard HTTP logs for security purposes only.
              </p>
              <div className="bg-muted/30 rounded-lg p-4 border">
                <h4 className="font-semibold mb-2 text-sm">Log Retention Policy:</h4>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    <span>Logs retained for <strong>30 days</strong> maximum</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    <span>No access for analytics or profiling</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    <span>Used exclusively for security monitoring</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="space-y-6">
          {/* Affiliate Links */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Link className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold">Affiliate Links</h3>
            </div>
            <div className="space-y-3">
              <p>
                When you click an affiliate link, you are redirected to the vendor's site. 
                Our relationship with you ends at that click.
              </p>
              <Badge variant="outline" className="gap-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                Vendor Privacy Policy Applies
              </Badge>
              <p className="text-sm text-muted-foreground">
                We do not receive or store any data about your activity on external sites.
              </p>
            </div>
          </div>

          {/* Technical Isolation */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Shield className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-lg font-bold">Technical Isolation</h3>
            </div>
            <ul className="space-y-3">
              {[
                'All assets self-hosted (CSS, JavaScript, fonts)',
                'No external CDNs or third-party scripts',
                'No embedded social widgets or videos',
                'First-party resources only',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Policy Updates & Commitment */}
      <div className="border-t pt-8 mt-8">
        <h3 className="text-xl font-bold mb-6">Policy Integrity</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Changes & Updates */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-purple-500" />
              </div>
              <h4 className="font-bold">Policy Changes</h4>
            </div>
            <div className="space-y-3">
              <p>
                We will never add tracking without updating this policy and announcing 
                changes prominently on our homepage.
              </p>
              <div className="bg-primary/5 p-3 rounded border border-primary/20">
                <p className="text-sm font-medium text-primary">
                  Given our mission, adding tracking would contradict our core principles.
                </p>
              </div>
            </div>
          </div>

          {/* Contact & Verification */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Shield className="w-5 h-5 text-blue-500" />
              </div>
              <h4 className="font-bold">Verification & Questions</h4>
            </div>
            <div className="space-y-4">
              <p>
                Want to verify our claims? We provide technical documentation on request.
              </p>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Contact our privacy team:</p>
                <a 
                  href="mailto:privacy@nsecure.store"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  <Shield className="w-4 h-4" />
                  privacy@nsecure.store
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Verification */}
      <div className="mt-10 p-6 bg-muted/30 rounded-lg border">
        <h4 className="font-bold mb-3">How to Verify Our Claims</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p className="font-medium">Browser Developer Tools:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Check Network tab for third-party requests</li>
              <li>• Inspect cookies in Application tab</li>
              <li>• Review loaded scripts in Sources tab</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-medium">Technical Tools:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Use browser extensions like uBlock Origin</li>
              <li>• Monitor traffic with Wireshark</li>
              <li>• Check DNS queries for trackers</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cookie Notice */}
      <div className="mt-8 p-4 bg-amber-500/5 rounded-lg border border-amber-500/20">
        <div className="flex items-start gap-3">
          <Cookie className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium mb-1">Essential Cookies Notice</p>
            <p className="text-sm text-muted-foreground">
              This site uses only essential Next.js routing cookies. No cookies are used 
              for tracking, analytics, or advertising purposes.
            </p>
          </div>
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-10 pt-6 border-t">
        <p className="text-sm text-center text-muted-foreground">
          This document is a living commitment to privacy. Last verified: December 26, 2025
        </p>
      </div>
    </StaticPage>
  );
}