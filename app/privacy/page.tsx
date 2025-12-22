// app/privacy/page.tsx
import { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Privacy Policy | nsecure.store',
  description: 'We collect nothing. Here’s proof.',
};

export default function PrivacyPolicy() {
  return (
    <StaticPage title="Privacy Policy" lastUpdated="December 22, 2025">
      <p>
        <strong>This website collects zero personal data.</strong> We do not track, profile, or store information about visitors. Below is a full technical accounting.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">1. What We Do Not Use</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Cookies (except for essential Next.js routing)</li>
        <li>Google Analytics, Plausible, or any analytics service</li>
        <li>Meta Pixel, TikTok Pixel, or ad trackers</li>
        <li>Comment systems, user accounts, or forums</li>
        <li>Newsletter signup forms</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">2. Server-Side Logging</h2>
      <p>
        Our host (Vercel) logs standard HTTP request data (IP, user agent, path) for security and debugging. These logs:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Are retained for 30 days</li>
        <li>Are not accessible to us</li>
        <li>Are not used for analytics or advertising</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">3. Affiliate Links</h2>
      <p>
        When you click an affiliate link, you are redirected to the vendor’s site. At that point, the vendor’s privacy policy applies. We do not receive or store any data about your activity on their site.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">4. No Third Parties</h2>
      <p>
        This site loads only first-party assets. All CSS, JavaScript, and fonts are self-hosted. No external CDNs. No embedded videos. No social widgets.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">5. Changes</h2>
      <p>
        We will never add tracking without updating this policy and announcing it prominently. Given our mission, such a change is effectively impossible.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Questions?</h2>
      <p>
        Email <a href="mailto:privacy@nsecure.store" className="text-primary hover:underline">privacy@nsecure.store</a>. We’ll provide technical details on request.
      </p>
    </StaticPage>
  );
}