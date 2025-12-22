"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <footer className={`border-t bg-gray-50 mt-12 ${isAdminPage ? "md:ml-64" : ""}`}>
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center">
            <img src="/nsecure.png" alt="nsecure" className="h-8 w-auto" />
          </Link>
          <p className="text-sm text-gray-600 mt-2">
            Independent reviews and guides for privacy-first tools. No sponsored rankings—just honest security advice.
          </p>
        </div>

        {/* Reviews */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Reviews
          </h3>
          <ul className="space-y-2 text-sm">
            <FooterLink href="/reviews/best-vpn">Best VPNs</FooterLink>
            <FooterLink href="/reviews/password-managers">Password Managers</FooterLink>
            <FooterLink href="/reviews/encrypted-email">Encrypted Email</FooterLink>
            <FooterLink href="/reviews/yubikey">2FA Hardware Keys</FooterLink>
            <FooterLink href="/reviews/privacy-browsers">Privacy Browsers</FooterLink>
          </ul>
        </div>

        {/* Guides */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Guides
          </h3>
          <ul className="space-y-2 text-sm">
            <FooterLink href="/guides/privacy-checklist">Privacy Checklist</FooterLink>
            <FooterLink href="/guides/leave-google">Leave Google Guide</FooterLink>
            <FooterLink href="/guides/secure-browsing">Secure Browsing</FooterLink>
            <FooterLink href="/guides/security-basics">Security Basics</FooterLink>
            <FooterLink href="/guides/self-hosted-tools">Self-Hosted Alternatives</FooterLink>
          </ul>
        </div>

        {/* Company & Legal */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Resources
          </h3>
          <ul className="space-y-2 text-sm">
            <FooterLink href="/about">About Us</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/tools">All Tools</FooterLink>
            <FooterLink href="/deals">Latest Deals</FooterLink>
          </ul>
        </div>
      </div>

      <div className="border-t mx-auto max-w-7xl px-6 py-6 flex flex-col md:flex-row justify-between text-sm text-gray-600">
        <p>© {new Date().getFullYear()} nsecure.store. All rights reserved.</p>
        <div className="flex flex-wrap gap-4 mt-3 md:mt-0">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms of Use
          </Link>
          <Link href="/affiliate-disclosure" className="hover:underline">
            Affiliate Disclosure
          </Link>
          <Link href="/methodology" className="hover:underline">
            Review Methodology
          </Link>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link href={href} className="hover:text-gray-900 transition">
        {children}
      </Link>
    </li>
  );
}