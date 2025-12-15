// components/MainNav.tsx
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white overflow-y-auto pt-16 pb-4 px-4">
          <div className="space-y-6">
            <NavMobileGroup title="Security Tools">
              <MenuItem href="/vpn" onClose={() => setMobileMenuOpen(false)}>Best VPNs</MenuItem>
              <MenuItem href="/password-managers" onClose={() => setMobileMenuOpen(false)}>Password Managers</MenuItem>
              <MenuItem href="/antivirus" onClose={() => setMobileMenuOpen(false)}>Antivirus</MenuItem>
              <MenuItem href="/secure-cloud" onClose={() => setMobileMenuOpen(false)}>Secure Cloud Storage</MenuItem>
              <MenuItem href="/hardware-keys" onClose={() => setMobileMenuOpen(false)}>2FA Hardware Keys</MenuItem>
              <MenuItem href="/secure-email" onClose={() => setMobileMenuOpen(false)}>Secure Email Providers</MenuItem>
            </NavMobileGroup>

            <NavMobileGroup title="Work From Anywhere">
              <MenuItem href="/remote-jobs" onClose={() => setMobileMenuOpen(false)}>Remote Job Boards</MenuItem>
              <MenuItem href="/remote-tools" onClose={() => setMobileMenuOpen(false)}>Team Collaboration Tools</MenuItem>
              <MenuItem href="/best-laptops" onClose={() => setMobileMenuOpen(false)}>Best Laptops for Remote Work</MenuItem>
              <MenuItem href="/best-headsets" onClose={() => setMobileMenuOpen(false)}>Best Headsets & Webcams</MenuItem>
            </NavMobileGroup>

            <NavMobileGroup title="Deals">
              <MenuItem href="/deals/vpn" onClose={() => setMobileMenuOpen(false)}>VPN Deals</MenuItem>
              <MenuItem href="/deals/software" onClose={() => setMobileMenuOpen(false)}>Software Discounts</MenuItem>
              <MenuItem href="/deals/gear" onClose={() => setMobileMenuOpen(false)}>Remote Gear Deals</MenuItem>
            </NavMobileGroup>

            <NavMobileGroup title="Guides">
              <MenuItem href="/guides/cybersecurity-basics" onClose={() => setMobileMenuOpen(false)}>Cybersecurity Basics</MenuItem>
              <MenuItem href="/guides/remote-work-starter" onClose={() => setMobileMenuOpen(false)}>Remote Work Starter Kit</MenuItem>
              <MenuItem href="/guides/secure-setup" onClose={() => setMobileMenuOpen(false)}>Secure Remote Workspace</MenuItem>
              <MenuItem href="/guides/privacy" onClose={() => setMobileMenuOpen(false)}>Privacy Essentials</MenuItem>
            </NavMobileGroup>

            <NavMobileGroup title="Reviews">
              <MenuItem href="/reviews/software" onClose={() => setMobileMenuOpen(false)}>Software Reviews</MenuItem>
              <MenuItem href="/reviews/hardware" onClose={() => setMobileMenuOpen(false)}>Hardware Reviews</MenuItem>
              <MenuItem href="/reviews/platforms" onClose={() => setMobileMenuOpen(false)}>Remote Job Platforms</MenuItem>
            </NavMobileGroup>
          </div>
        </div>
      )}
    </nav>
  );
}

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

function NavMobileGroup({ title, children }: { title: string; children: React.ReactNode }) {
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

// ✅ Tambahkan tipe untuk MenuItem
interface MenuItemProps {
  href: string;
  children: React.ReactNode;
  onClose?: () => void;
}

function MenuItem({ href, children, onClose }: MenuItemProps) {
  return (
    <Link
      href={href}
      className="block rounded px-3 py-2 text-sm transition hover:bg-gray-100"
      onClick={onClose}
    >
      {children}
    </Link>
  );
}