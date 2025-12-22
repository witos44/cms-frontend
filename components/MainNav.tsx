'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Menu,
  X,
  ChevronDown,
  BookOpen,
  Tag,
  FileText,
  Wrench,
  Search,
} from 'lucide-react';
import { useState, useEffect, ReactNode } from 'react';

/* ===================== MAIN NAV ===================== */

export default function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/nsecure.png" alt="nsecure" className="h-8 w-auto" />
            <span className="hidden md:inline text-sm text-gray-600">
              Security × Privacy
            </span>
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-6">
            {/* REVIEWS */}
            <NavDesktopItem title="Reviews" icon={<FileText size={14} />}>
              <div className="grid grid-cols-2 gap-4 p-4 w-[480px]">
                <div>
                  <h4 className="text-sm font-medium text-blue-600 mb-2">
                    Core Tools
                  </h4>
                  <MenuItem href="/reviews/best-vpns">Best VPNs</MenuItem>
                  <MenuItem href="/reviews/password-managers">
                    Password Managers
                  </MenuItem>
                  <MenuItem href="/reviews/antivirus">Antivirus</MenuItem>
                  <MenuItem href="/reviews/encrypted-email">
                    Encrypted Email
                  </MenuItem>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-emerald-600 mb-2">
                    Hardware & Apps
                  </h4>
                  <MenuItem href="/reviews/yubikey-2fa-keys" featured>
                    YubiKey & 2FA Keys
                  </MenuItem>
                  <MenuItem href="/reviews/privacy-browsers">
                    Privacy Browsers
                  </MenuItem>
                  <MenuItem href="/reviews/secure-note-apps">
                    Secure Note Apps
                  </MenuItem>
                  <MenuItem href="/reviews/self-hosted-alternatives">
                    Self-Hosted Alternatives
                  </MenuItem>
                </div>
              </div>
            </NavDesktopItem>

            {/* GUIDES */}
            <NavDesktopItem title="Guides" icon={<BookOpen size={14} />}>
              <div className="grid grid-cols-2 gap-4 p-4 w-[480px]">
                <div>
                  <h4 className="text-sm font-medium text-blue-600 mb-2">
                    Privacy
                  </h4>
                  <MenuItem href="/guides/privacy-checklist">
                    Privacy Checklist
                  </MenuItem>
                  <MenuItem href="/guides/leave-google-guide">
                    Leave Google Guide
                  </MenuItem>
                  <MenuItem href="/guides/secure-browsing">
                    Secure Browsing
                  </MenuItem>
                  <MenuItem href="/guides/reduce-digital-footprint">
                    Reduce Digital Footprint
                  </MenuItem>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-emerald-600 mb-2">
                    Security
                  </h4>
                  <MenuItem href="/guides/security-basics" featured>
                    Security Basics
                  </MenuItem>
                  <MenuItem href="/guides/2fa-setup-guide">2FA Setup Guide</MenuItem>
                  <MenuItem href="/guides/encrypted-backups">
                    Encrypted Backups
                  </MenuItem>
                  <MenuItem href="/guides/home-network-security">
                    Home Network Security
                  </MenuItem>
                </div>
              </div>
            </NavDesktopItem>

            {/* TOOLS */}
            <NavDesktopItem title="Tools" icon={<Wrench size={14} />}>
              <div className="p-4 w-[360px]">
                <h4 className="text-sm font-medium text-purple-600 mb-3">
                  🔍 Discover Privacy Tools
                </h4>

                <div className="space-y-2">
                  <MenuItem href="/tools/vpns">VPNs</MenuItem>
                  <MenuItem href="/tools/password-managers">
                    Password Managers
                  </MenuItem>
                  <MenuItem href="/tools/encryption-tools">
                    Encryption Tools
                  </MenuItem>
                  <MenuItem href="/tools/open-source-only">
                    Open Source Only
                  </MenuItem>
                  <MenuItem href="/tools/self-hosted-tools">
                    Self-Hosted Tools
                  </MenuItem>
                </div>
              </div>
            </NavDesktopItem>

            {/* DEALS */}
            <NavDesktopItem title="Deals" icon={<Tag size={14} />}>
              <div className="p-4 w-[360px]">
                <h4 className="text-sm font-medium text-amber-600 mb-3">
                  🔥 Hot Deals
                </h4>

                <div className="space-y-2">
                  <DealItem
                    href="/deals/nordvpn-deals"
                    label="NordVPN - 63% OFF"
                    expires="2 days"
                  />
                  <DealItem
                    href="/deals/1password-deals"
                    label="1Password - 30% OFF"
                    expires="4 days"
                  />
                  <DealItem
                    href="/deals/proton-unlimited-deals"
                    label="Proton Unlimited - 20% OFF"
                    expires="1 week"
                  />
                </div>

                <div className="mt-4 border-t pt-3 space-y-1">
                  <MenuItem href="/deals/vpn-deals">VPN Deals</MenuItem>
                  <MenuItem href="/deals/software-deals">
                    Software Deals
                  </MenuItem>
                  <MenuItem href="/deals/hardware-deals">Hardware Deals</MenuItem>
                </div>
              </div>
            </NavDesktopItem>
          </div>

          {/* MOBILE TOGGLE */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {/* MOBILE DRAWER - SEPARATE FROM NAV FOR HIGHER Z-INDEX */}
      {mobileMenuOpen && (
        <>
          {/* Overlay - with highest z-index */}
          <div 
            className="fixed inset-0 bg-black/50 z-9998 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu drawer - even higher z-index */}
          <div className="fixed inset-y-0 left-0 w-80 bg-white z-9999 md:hidden overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b p-4 z-10">
              <div className="flex items-center justify-between">
                <Link 
                  href="/" 
                  className="flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <img src="/nsecure.png" alt="nsecure" className="h-7 w-auto" />
                  <span className="text-sm font-medium text-gray-700">Menu</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={20} />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-1">
              {/* REVIEWS */}
              <NavMobileGroup title="Reviews" icon={<FileText size={16} />}>
                <MobileMenuItem href="/reviews/best-vpns">
                  Best VPNs
                </MobileMenuItem>
                <MobileMenuItem href="/reviews/password-managers">
                  Password Managers
                </MobileMenuItem>
                <MobileMenuItem href="/reviews/antivirus">
                  Antivirus
                </MobileMenuItem>
                <MobileMenuItem href="/reviews/encrypted-email">
                  Encrypted Email
                </MobileMenuItem>
                <MobileMenuItem href="/reviews/yubikey-2fa-keys" featured>
                  <div className="flex items-center justify-between">
                    YubiKey & 2FA Keys
                    <Badge className="ml-2 bg-blue-100 text-blue-800">
                      Top Pick
                    </Badge>
                  </div>
                </MobileMenuItem>
                <MobileMenuItem href="/reviews/privacy-browsers">
                  Privacy Browsers
                </MobileMenuItem>
                <MobileMenuItem href="/reviews/secure-note-apps">
                  Secure Note Apps
                </MobileMenuItem>
                <MobileMenuItem href="/reviews/self-hosted-tools">
                  Self-Hosted Tools
                </MobileMenuItem>
              </NavMobileGroup>

              {/* GUIDES */}
              <NavMobileGroup title="Guides" icon={<BookOpen size={16} />}>
                <MobileMenuItem href="/guides/privacy-checklist">
                  Privacy Checklist
                </MobileMenuItem>
                <MobileMenuItem href="/guides/leave-google-guide">
                  Leave Google Guide
                </MobileMenuItem>
                <MobileMenuItem href="/guides/secure-browsing">
                  Secure Browsing
                </MobileMenuItem>
                <MobileMenuItem href="/guides/reduce-digital-footprint">
                  Reduce Digital Footprint
                </MobileMenuItem>
                <MobileMenuItem href="/guides/security-basics" featured>
                  <div className="flex items-center justify-between">
                    Security Basics
                    <Badge className="ml-2 bg-emerald-100 text-emerald-800">
                      Starter
                    </Badge>
                  </div>
                </MobileMenuItem>
                <MobileMenuItem href="/guides/2fa-setup-guide">
                  2FA Setup Guide
                </MobileMenuItem>
                <MobileMenuItem href="/guides/encrypted-backups">
                  Encrypted Backups
                </MobileMenuItem>
                <MobileMenuItem href="/guides/home-network-security">
                  Home Network Security
                </MobileMenuItem>
              </NavMobileGroup>

              {/* TOOLS */}
              <NavMobileGroup title="Tools" icon={<Wrench size={16} />}>
                <div className="space-y-1">
                  <MobileMenuItem href="/tools/vpns">VPNs</MobileMenuItem>
                  <MobileMenuItem href="/tools/password-managers">
                    Password Managers
                  </MobileMenuItem>
                  <MobileMenuItem href="/tools/encryption-tools">
                    Encryption Tools
                  </MobileMenuItem>
                  <MobileMenuItem href="/tools/open-source-only">
                    Open Source Only
                  </MobileMenuItem>
                  <MobileMenuItem href="/tools/self-hosted-tools">
                    Self-Hosted Tools
                  </MobileMenuItem>
                </div>
              </NavMobileGroup>

              {/* DEALS */}
              <NavMobileGroup title="Deals" icon={<Tag size={16} />}>
                <div className="space-y-2 mb-3">
                  <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-lg p-3 border border-amber-200">
                    <h4 className="text-xs font-semibold text-amber-800 mb-2">🔥 Hot Deals</h4>
                    <div className="space-y-2">
                      <MobileDealItem
                        href="/deals/nordvpn-deals"
                        label="NordVPN - 63% OFF"
                        expires="2 days"
                      />
                      <MobileDealItem
                        href="/deals/1password-deals"
                        label="1Password - 30% OFF"
                        expires="4 days"
                      />
                      <MobileDealItem
                        href="/deals/proton-unlimited-deals"
                        label="Proton Unlimited - 20% OFF"
                        expires="1 week"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <MobileMenuItem href="/deals/vpn-deals">VPN Deals</MobileMenuItem>
                  <MobileMenuItem href="/deals/software-deals">Software Deals</MobileMenuItem>
                  <MobileMenuItem href="/deals/hardware-deals">Hardware Deals</MobileMenuItem>
                </div>
              </NavMobileGroup>

              {/* FOOTER LINKS */}
              <div className="pt-4 border-t mt-4">
                <div className="grid grid-cols-2 gap-2">
                  <MobileFooterLink href="/about">About</MobileFooterLink>
                  <MobileFooterLink href="/contact">Contact</MobileFooterLink>
                  <MobileFooterLink href="/privacy">Privacy</MobileFooterLink>
                  <MobileFooterLink href="/terms">Terms</MobileFooterLink>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

/* ===================== TYPE DEFINITIONS ===================== */

interface NavDesktopItemProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

interface MenuItemProps {
  href: string;
  children: ReactNode;
  featured?: boolean;
}

interface DealItemProps {
  href: string;
  label: string;
  expires: string;
}

interface MobileMenuItemProps {
  href: string;
  children: ReactNode;
  featured?: boolean;
}

interface MobileDealItemProps {
  href: string;
  label: string;
  expires: string;
}

interface MobileFooterLinkProps {
  href: string;
  children: ReactNode;
}

interface NavMobileGroupProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

/* ===================== COMPONENTS ===================== */

function NavDesktopItem({ title, icon, children }: NavDesktopItemProps) {
  return (
    <div className="relative group">
      <button
        type="button"
        className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-blue-600"
      >
        {icon}
        {title}
        <ChevronDown
          size={14}
          className="transition-transform group-hover:rotate-180"
        />
      </button>

      <div className="absolute left-1/2 z-50 mt-2 -translate-x-1/2 rounded-lg border bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {children}
      </div>
    </div>
  );
}

function MenuItem({ href, children, featured = false }: MenuItemProps) {
  return (
    <Link
      href={href}
      className={`block rounded-md px-3 py-2 text-sm transition ${
        featured
          ? 'bg-emerald-100 text-emerald-800'
          : 'hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );
}

function DealItem({ href, label, expires }: DealItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm hover:bg-amber-100"
    >
      <span className="font-medium text-amber-800">
        {label}
      </span>
      <span className="rounded-full bg-amber-200 px-2 py-0.5 text-xs text-amber-800">
        {expires}
      </span>
    </Link>
  );
}

/* MOBILE COMPONENTS */
function NavMobileGroup({ title, icon, children }: NavMobileGroupProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b last:border-b-0 pb-3">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 px-2 text-sm font-semibold text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <div className="flex items-center gap-2">
          {icon}
          {title}
        </div>
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="ml-2 pl-2 border-l-2 border-gray-200 space-y-1 mt-1">
          {children}
        </div>
      )}
    </div>
  );
}

function MobileMenuItem({ href, children, featured = false }: MobileMenuItemProps) {
  return (
    <Link
      href={href}
      className={`block rounded-lg px-3 py-2.5 text-sm transition-all active:scale-[0.98] ${
        featured
          ? 'bg-linear-to-r from-emerald-50 to-green-50 text-emerald-800 border border-emerald-200'
          : 'text-gray-700 hover:bg-gray-50 border border-transparent hover:border-gray-200'
      }`}
    >
      {children}
    </Link>
  );
}

function MobileDealItem({ href, label, expires }: MobileDealItemProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between bg-white rounded-lg border border-amber-300 p-2.5 hover:shadow-sm transition-shadow active:scale-[0.98]"
    >
      <span className="text-xs font-medium text-amber-900">
        {label}
      </span>
      <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
        {expires}
      </span>
    </Link>
  );
}

function MobileFooterLink({ href, children }: MobileFooterLinkProps) {
  return (
    <Link
      href={href}
      className="text-xs text-gray-600 hover:text-gray-900 py-1.5 text-center hover:bg-gray-50 rounded"
    >
      {children}
    </Link>
  );
}