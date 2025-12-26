// app/terms/page.tsx
import { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';
import { Scale, AlertTriangle, RefreshCw, Link, Shield, Copyright, Mail, FileText, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Terms of Use | nsecure.store',
  description: 'Legal terms for using our independent reviews.',
};

export default function TermsOfUse() {
  return (
    <StaticPage title="Terms of Use" lastUpdated="December 26, 2025">
      {/* Disclaimer Banner */}
      <div className="not-prose bg-amber-500/5 rounded-lg p-6 mb-8 border border-amber-500/20">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-10 h-10 text-amber-500 mt-1 shrink-0" />
          <div>
            <h3 className="text-lg font-bold mb-2 text-amber-600">Important Legal Notice</h3>
            <p className="text-muted-foreground">
              By accessing nsecure.store, you agree to these terms. Our content is informational—not professional advice. 
              Use your own judgment when making security decisions.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Core Terms */}
        <div className="space-y-8">
          {/* Scope */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Scale className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold">1. Scope & Acceptance</h3>
                <p className="text-sm text-muted-foreground">Effective December 26, 2025</p>
              </div>
            </div>
            <div className="space-y-3">
              <p>
                These Terms of Use govern your access to and use of <strong className="text-primary">nsecure.store</strong>. 
                By accessing this website, you acknowledge that you have read, understood, and agree to be bound by these terms.
              </p>
              <Badge variant="outline" className="gap-2">
                <FileText className="w-3.5 h-3.5" />
                Full agreement available upon request
              </Badge>
            </div>
          </div>

          {/* No Professional Advice */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-bold">2. No Professional Advice</h3>
            </div>
            <div className="space-y-3">
              <p>
                All content on nsecure.store is provided for <strong>informational purposes only</strong>. 
                It does not constitute:
              </p>
              <ul className="space-y-2">
                {[
                  'Legal advice',
                  'Cybersecurity consultation',
                  'Professional endorsement',
                  'Guarantee of tool efficacy'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="bg-muted/30 p-3 rounded border">
                <p className="text-sm font-medium mb-1">You are solely responsible for:</p>
                <ul className="text-sm space-y-1">
                  <li>• Your choice and configuration of security tools</li>
                  <li>• Compliance with applicable laws and regulations</li>
                  <li>• Verifying vendor claims independently</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Accuracy & Changes */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <RefreshCw className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="text-lg font-bold">3. Accuracy & Changes</h3>
            </div>
            <div className="space-y-3">
              <p>
                The digital privacy landscape evolves rapidly. We strive to maintain accurate reviews, but:
              </p>
              <ul className="space-y-2">
                {[
                  'Tools and vendors change policies and features',
                  'We update reviews on a best-effort basis',
                  'No real-time accuracy guarantees are provided'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Badge variant="secondary" className="gap-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                Always verify vendor claims independently
              </Badge>
            </div>
          </div>
        </div>

        {/* Right Column - Additional Terms */}
        <div className="space-y-8">
          {/* Affiliate Links */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Link className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-lg font-bold">4. Affiliate Links</h3>
            </div>
            <div className="space-y-3">
              <p>
                We participate in affiliate programs to fund our independent research. 
                Our compensation does not influence our editorial integrity.
              </p>
              <a 
                href="/affiliate-disclosure"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                View Affiliate Disclosure
              </a>
              <div className="bg-primary/5 p-3 rounded border border-primary/20">
                <p className="text-sm font-medium">
                  Affiliate commissions support our work but never affect our reviews.
                </p>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <Shield className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-lg font-bold">5. Limitation of Liability</h3>
            </div>
            <div className="space-y-3">
              <p>
                To the maximum extent permitted by applicable law, nsecure.store and its operators disclaim all liability for:
              </p>
              <div className="bg-red-500/5 p-4 rounded border border-red-500/10">
                <ul className="space-y-2 text-sm">
                  {[
                    'Security incidents resulting from tool usage',
                    'Financial losses from purchases made through affiliate links',
                    'Errors, omissions, or inaccuracies in our content',
                    'Third-party actions or service disruptions'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-center font-semibold">
                Use this site at your own risk.
              </p>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-500/10 rounded-lg">
                <Copyright className="w-5 h-5 text-indigo-500" />
              </div>
              <h3 className="text-lg font-bold">6. Intellectual Property</h3>
            </div>
            <div className="space-y-3">
              <p>
                All content © {new Date().getFullYear()} nsecure.store. All rights reserved.
              </p>
              <div className="bg-muted/30 p-3 rounded border">
                <p className="font-medium mb-2 text-sm">Permitted Uses:</p>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <span>Linking to our content with attribution</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    <span>Quoting brief excerpts for commentary</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    <span>Full republication requires written permission</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Jurisdiction */}
      <div className="mt-10 p-8 bg-muted/30 rounded-xl border">
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-4 max-w-2xl mx-auto">
            <div className="p-3 bg-blue-500/10 rounded-full">
              <Mail className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Legal Inquiries</h3>
              <p className="text-muted-foreground mb-4">
                For legal matters, DMCA takedown requests, or permission inquiries:
              </p>
              <a 
                href="mailto:legal@nsecure.store"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                <Mail className="w-5 h-5" />
                legal@nsecure.store
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Governing Law */}
      <div className="mt-8 p-6 bg-card rounded-lg border">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold mb-1">Governing Law</h4>
            <p className="text-sm text-muted-foreground">
              These terms are governed by the laws of the United States, without regard to conflict of law principles.
            </p>
          </div>
          <Badge variant="outline">
            Legal Version 2.0
          </Badge>
        </div>
      </div>

      {/* Update Notice */}
      <div className="mt-8 pt-6 border-t">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <RefreshCw className="w-4 h-4" />
          <p>
            These terms may be updated periodically. Continued use constitutes acceptance of updated terms.
          </p>
        </div>
      </div>
    </StaticPage>
  );
}