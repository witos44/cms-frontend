// app/about/page.tsx
import { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'About Us | nsecure.store',
  description: 'Independent, technical, and uncompromising reviews of privacy tools.',
};

export default function AboutPage() {
  return (
    <StaticPage title="About nsecure.store">
      <p>
        <strong>nsecure.store is not a blog. It’s a public service.</strong> We exist to counter the noise of sponsored rankings, affiliate-driven hype, and vague “security” claims that dominate the internet.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Our Methodology</h2>
      <p>
        Every tool we review is tested in real-world conditions for a minimum of 7 days. We install it on clean machines, audit its network traffic (via Wireshark), inspect privacy policies, and verify open-source claims. If a vendor refuses to answer technical questions, we don’t review it.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Our Standards</h2>
      <p>
        To be recommended, a tool must meet all of the following:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>No telemetry</strong> — verified via packet inspection</li>
        <li><strong>No mandatory account</strong> — unless end-to-end encrypted</li>
        <li><strong>Transparent business model</strong> — preferably open-core or donation-based</li>
        <li><strong>Responsive to security reports</strong> — we’ve tested this</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">What We Reject</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>“Free” tools that monetize via data</li>
        <li>Vendors who pay for placement</li>
        <li>Tools with closed-source clients (unless justified)</li>
        <li>Reviews written by AI or outsourced writers</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">Funding & Independence</h2>
      <p>
        We are funded solely through affiliate commissions from vendors who meet our standards. We do not accept direct payments, sponsorships, or advertising. Our <a href="/affiliate-disclosure" className="text-primary hover:underline">Affiliate Disclosure</a> details our process.
      </p>
      <p>
        <strong>We own no equity in any reviewed product.</strong> Our only incentive is to earn your trust.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Contact</h2>
      <p>
        Technical inquiry? Found an error? Email us at{' '}
        <a href="mailto:team@nsecure.store" className="text-primary hover:underline">
          team@nsecure.store
        </a>
        . We read every message.
      </p>
    </StaticPage>
  );
}