// app/terms/page.tsx
import { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Terms of Use | nsecure.store',
  description: 'Legal terms for using our independent reviews.',
};

export default function TermsOfUse() {
  return (
    <StaticPage title="Terms of Use" lastUpdated="December 22, 2025">
      <h2 className="text-xl font-semibold mt-4 mb-3">1. Scope</h2>
      <p>
        These terms govern your use of <strong>nsecure.store</strong>. By accessing this site, you accept these terms in full.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">2. No Professional Advice</h2>
      <p>
        Content on this site is for informational purposes only. It does not constitute legal, cybersecurity, or professional advice. You are solely responsible for:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Your choice of tools</li>
        <li>Your configuration and usage</li>
        <li>Your compliance with local laws</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">3. Accuracy & Changes</h2>
      <p>
        Tools, vendors, and policies change. We update reviews when possible, but we do not guarantee real-time accuracy. Always verify claims independently.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">4. Affiliate Links</h2>
      <p>
        We may earn commissions via affiliate links. This supports our work but does not influence our reviews. See our <a href="/affiliate-disclosure" className="text-primary hover:underline">Affiliate Disclosure</a>.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">5. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, nsecure.store and its operators disclaim all liability for:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Security incidents resulting from tool usage</li>
        <li>Financial loss from affiliate purchases</li>
        <li>Errors or omissions in our content</li>
      </ul>
      <p>
        Use this site at your own risk.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">6. Intellectual Property</h2>
      <p>
        All content is © {new Date().getFullYear()} nsecure.store. You may link to or quote brief excerpts with attribution. Full republication requires written permission.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">7. Contact</h2>
      <p>
        Legal inquiries: <a href="mailto:legal@nsecure.store" className="text-primary hover:underline">legal@nsecure.store</a>.
      </p>
    </StaticPage>
  );
}