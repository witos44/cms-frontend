// components/MainNav.tsx
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function MainNav() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center">
          <img src="/nsecure.png" alt="SecureRemote" className="h-8 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <NavDesktopItem title="Security Tools">
            <MenuItem href="/vpn">Best VPNs</MenuItem>
            <MenuItem href="/password-managers">Password Managers</MenuItem>
            <MenuItem href="/antivirus">Antivirus</MenuItem>
            <MenuItem href="/secure-cloud">Secure Cloud Storage</MenuItem>
            <MenuItem href="/hardware-keys">2FA Hardware Keys</MenuItem>
            <MenuItem href="/secure-email">Secure Email Providers</MenuItem>
          </NavDesktopItem>

          <NavDesktopItem title="Work From Anywhere">
            <MenuItem href="/remote-jobs">Remote Job Boards</MenuItem>
            <MenuItem href="/remote-tools">Team Collaboration Tools</MenuItem>
            <MenuItem href="/best-laptops">Best Laptops for Remote Work</MenuItem>
            <MenuItem href="/best-headsets">Best Headsets & Webcams</MenuItem>
          </NavDesktopItem>

          <NavDesktopItem title="Deals">
            <MenuItem href="/deals/vpn">VPN Deals</MenuItem>
            <MenuItem href="/deals/software">Software Discounts</MenuItem>
            <MenuItem href="/deals/gear">Remote Gear Deals</MenuItem>
          </NavDesktopItem>

          <NavDesktopItem title="Guides">
            <MenuItem href="/guides/cybersecurity-basics">Cybersecurity Basics</MenuItem>
            <MenuItem href="/guides/remote-work-starter">Remote Work Starter Kit</MenuItem>
            <MenuItem href="/guides/secure-setup">Secure Remote Workspace</MenuItem>
            <MenuItem href="/guides/privacy">Privacy Essentials</MenuItem>
          </NavDesktopItem>

          <NavDesktopItem title="Reviews">
            <MenuItem href="/reviews/software">Software Reviews</MenuItem>
            <MenuItem href="/reviews/hardware">Hardware Reviews</MenuItem>
            <MenuItem href="/reviews/platforms">Remote Job Platforms</MenuItem>
          </NavDesktopItem>
        </div>

        {/* Mobile Trigger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="p-4 space-y-3">
            <NavMobileItem title="Security Tools">
              <MenuItem href="/vpn">Best VPNs</MenuItem>
              <MenuItem href="/password-managers">Password Managers</MenuItem>
              <MenuItem href="/antivirus">Antivirus</MenuItem>
              <MenuItem href="/secure-cloud">Secure Cloud Storage</MenuItem>
              <MenuItem href="/hardware-keys">2FA Hardware Keys</MenuItem>
              <MenuItem href="/secure-email">Secure Email Providers</MenuItem>
            </NavMobileItem>

            <NavMobileItem title="Work From Anywhere">
              <MenuItem href="/remote-jobs">Remote Job Boards</MenuItem>
              <MenuItem href="/remote-tools">Team Collaboration Tools</MenuItem>
              <MenuItem href="/best-laptops">Best Laptops for Remote Work</MenuItem>
              <MenuItem href="/best-headsets">Best Headsets & Webcams</MenuItem>
            </NavMobileItem>

            <NavMobileItem title="Deals">
              <MenuItem href="/deals/vpn">VPN Deals</MenuItem>
              <MenuItem href="/deals/software">Software Discounts</MenuItem>
              <MenuItem href="/deals/gear">Remote Gear Deals</MenuItem>
            </NavMobileItem>

            <NavMobileItem title="Guides">
              <MenuItem href="/guides/cybersecurity-basics">Cybersecurity Basics</MenuItem>
              <MenuItem href="/guides/remote-work-starter">Remote Work Starter Kit</MenuItem>
              <MenuItem href="/guides/secure-setup">Secure Remote Workspace</MenuItem>
              <MenuItem href="/guides/privacy">Privacy Essentials</MenuItem>
            </NavMobileItem>

            <NavMobileItem title="Reviews">
              <MenuItem href="/reviews/software">Software Reviews</MenuItem>
              <MenuItem href="/reviews/hardware">Hardware Reviews</MenuItem>
              <MenuItem href="/reviews/platforms">Remote Job Platforms</MenuItem>
            </NavMobileItem>
          </div>
        </div>
      )}
    </nav>
  );
}

// Desktop: Gunakan Popover seperti sebelumnya
function NavDesktopItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-sm font-medium hover:underline">
        {title} <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
      </button>
      <div className="absolute left-0 mt-1 w-[350px] p-4 bg-white border rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {children}
      </div>
    </div>
  );
}

// Mobile: Gunakan collapsible accordion
function NavMobileItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="flex items-center justify-between w-full text-left font-medium py-2"
        onClick={() => setOpen(!open)}
      >
        {title}
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="ml-4 mt-2 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
}

function MenuItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block rounded px-3 py-2 text-sm transition hover:bg-gray-100"
      onClick={(e) => {
        // Tutup mobile menu saat klik
        const mobileMenu = document.querySelector('[class*="md:hidden"]');
        if (mobileMenu) {
          const button = mobileMenu.previousElementSibling?.querySelector('button');
          button?.click();
        }
      }}
    >
      {children}
    </Link>
  );
}

// Impor ikon yang dibutuhkan
import { ChevronDown } from "lucide-react";