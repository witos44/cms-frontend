// app/contact/page.tsx
import { Metadata } from 'next';
import { StaticPage } from '@/components/StaticPage';

export const metadata: Metadata = {
  title: 'Contact Us | nsecure.store',
  description: 'Get in touch with our team directly via email.',
};

export default function ContactPage() {
  return (
    <StaticPage title="Contact">
      <p>
        We do not use contact forms, live chat, or social media DMs — because they often involve third-party tracking or data retention.
      </p>
      <p>
        Instead, we provide direct email addresses for specific purposes. All messages are read by our core team.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">General Inquiries</h2>
      <p>
        For questions about the site, tool suggestions, or feedback:  
        <br />
        <a href="mailto:hello@nsecure.store" className="text-primary hover:underline font-mono">
          hello@nsecure.store
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Technical & Security Issues</h2>
      <p>
        Found a broken link, outdated review, or security concern?  
        <br />
        <a href="mailto:security@nsecure.store" className="text-primary hover:underline font-mono">
          security@nsecure.store
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">Press & Collaboration</h2>
      <p>
        For media, research, or ethical collaboration requests:  
        <br />
        <a href="mailto:press@nsecure.store" className="text-primary hover:underline font-mono">
          press@nsecure.store
        </a>
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3">What to Expect</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>We respond to all emails within 5 business days</li>
        <li>We do not share your message with third parties</li>
        <li>We do not store your email beyond our email client’s retention policy</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3">What We Don’t Do</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Provide individual security consultations</li>
        <li>Accept guest posts or sponsored content</li>
        <li>Respond to unsolicited partnership requests from vendors</li>
      </ul>

      <p className="mt-6">
        Thank you for helping us keep the internet a little more private.
      </p>
    </StaticPage>
  );
}