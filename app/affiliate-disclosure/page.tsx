// app/affiliate-disclosure/page.tsx
import { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Affiliate Disclosure | nsecure.store',
  description: 'How we fund independent reviews—without compromising integrity.',
};

export default function AffiliateDisclosure() {
  return (
    <StaticPage title="Affiliate Disclosure">
      <p>
        nsecure.store is funded exclusively through affiliate commissions from vendors whose products we independently test and recommend. This model allows us to:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Operate without advertising</li>
        <li>Reject sponsored content</li>
        <li>Maintain editorial independence</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">Our Process</h2>
      <ol className="list-decimal pl-5 space-y-1">
        <li>We test a tool for at least 7 days</li>
        <li>We draft the review without knowing if an affiliate program exists</li>
        <li>Only if the tool meets our standards do we apply for the program</li>
        <li>The vendor never sees the review before publication</li>
      </ol>

      <h2 className="text-xl font-semibold mt-6 mb-3">Our Partners</h2>
      <p>
        We only partner with vendors who share our commitment to privacy:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Proton</strong> — end-to-end encrypted suite</li>
        <li><strong>NordVPN</strong> — independently audited, no-logs</li>
        <li><strong>1Password</strong> — zero-knowledge architecture</li>
        <li><strong>Yubico</strong> — open hardware, FIDO2 certified</li>
        <li><strong>Bitwarden</strong> — open-source, self-hostable</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">Transparency in Practice</h2>
      <p>
        Every product page includes:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>A clear notice: “We may earn a commission”</li>
        <li>Direct links to the vendor’s privacy policy</li>
        <li>Our full testing methodology</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">What We Never Do</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Accept payment to review a product</li>
        <li>Give favorable reviews to earn higher commissions</li>
        <li>Hide negative findings to preserve partnerships</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">Questions?</h2>
      <p>
        Email <a href="mailto:ethics@nsecure.store" className="text-primary hover:underline">ethics@nsecure.store</a>.
      </p>
    </StaticPage>
  );
}