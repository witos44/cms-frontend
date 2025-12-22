// app/methodology/page.tsx
// app/methodology/page.tsx
import { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Review Methodology | nsecure.store',
  description: 'How we test and evaluate privacy and security tools.',
};

export default function MethodologyPage() {
  return (
    <StaticPage title="Review Methodology">
      <p>
        Our reviews are not opinions. They are the result of a standardized, repeatable testing process designed to evaluate tools on technical merit, privacy, and real-world usability.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">1. Tool Selection</h2>
      <p>
        Tools are selected based on:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Community reputation (Reddit, Hacker News, FOSS communities)</li>
        <li>Technical architecture (open-source, E2E encryption, audit history)</li>
        <li>Absence of known privacy violations</li>
      </ul>
      <p>
        We do not review tools upon vendor request.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">2. Testing Environment</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>OS</strong>: Clean installs of Ubuntu 24.04, Windows 11, and macOS Sonoma</li>
        <li><strong>Network monitoring</strong>: Wireshark + Little Snitch to detect hidden telemetry</li>
        <li><strong>Storage inspection</strong>: Verify local data encryption</li>
        <li><strong>Account testing</strong>: Assess signup flow, password recovery, and data portability</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">3. Evaluation Criteria</h2>
      <table className="w-full text-sm mt-3">
        <thead>
          <tr className="border-b">
            <th className="text-left pb-2">Category</th>
            <th className="text-left pb-2">Key Questions</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="py-2 font-medium">Privacy</td>
            <td>Does it collect IP, device ID, or usage data? Is it GDPR-compliant?</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-medium">Security</td>
            <td>Is encryption end-to-end? Is the code audited? Are 2FA/security keys supported?</td>
          </tr>
          <tr className="border-b">
            <td className="py-2 font-medium">Transparency</td>
            <td>Is the source code public? Is the business model clear? Are security reports acknowledged?</td>
          </tr>
          <tr>
            <td className="py-2 font-medium">Usability</td>
            <td>Can a non-technical user set it up? Is documentation clear? Does it work reliably?</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mt-6 mb-3">4. Scoring</h2>
      <p>
        We do not use star ratings. Instead, we provide:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>A <strong>technical summary</strong> of architecture and risks</li>
        <li>A <strong>privacy verdict</strong> (Acceptable / Caution / Avoid)</li>
        <li>A <strong>recommendation tier</strong> (Top Pick / Solid Choice / Niche Use)</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">5. Updates & Corrections</h2>
      <p>
        Reviews are updated when:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>A major security flaw is discovered</li>
        <li>The vendor changes its privacy policy</li>
        <li>A superior alternative emerges</li>
      </ul>
      <p>
        Corrections are noted at the top of the review with a timestamp.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">6. Independence Guarantee</h2>
      <p>
        No vendor has ever reviewed, edited, or approved one of our reviews prior to publication. Full methodology documentation is available upon request to researchers and journalists.
      </p>
    </StaticPage>
  );
}