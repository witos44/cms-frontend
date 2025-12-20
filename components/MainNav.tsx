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
  Briefcase,
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
              Security × Remote Work
            </span>
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-6">
            {/* GUIDES */}
            <NavDesktopItem title="Guides" icon={<BookOpen size={14} />}>
              <div className="grid grid-cols-2 gap-4 p-4 w-[480px]">
                <div>
                  <h4 className="text-sm font-medium text-blue-600 mb-2">
                    Security
                  </h4>
                  <MenuItem href="/guides/security-basics">
                    Security Basics
                  </MenuItem>
                  <MenuItem href="/guides/privacy-essentials">
                    Privacy Essentials
                  </MenuItem>
                  <MenuItem href="/guides/secure-workspace">
                    Secure Workspace
                  </MenuItem>
                  <MenuItem href="/guides/digital-footprint">
                    Digital Footprint
                  </MenuItem>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-emerald-600 mb-2">
                    Remote Work
                  </h4>
                  <MenuItem href="/guides/remote-starter-kit" featured>
                    Remote Starter Kit
                  </MenuItem>
                  <MenuItem href="/guides/productivity">
                    Productivity
                  </MenuItem>
                  <MenuItem href="/guides/remote-interview">
                    Remote Interview
                  </MenuItem>
                  <MenuItem href="/guides/digital-nomad">
                    Digital Nomad
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
                    href="/deals/nordvpn"
                    label="NordVPN - 63% OFF"
                    expires="2 days"
                  />
                  <DealItem
                    href="/deals/dashlane"
                    label="Dashlane - Free 6 Months"
                    expires="1 week"
                  />
                  <DealItem
                    href="/deals/notion"
                    label="Notion - 40% OFF"
                    expires="5 days"
                  />
                </div>

                <div className="mt-4 border-t pt-3 space-y-1">
                  <MenuItem href="/deals/vpn-deals">VPN Deals</MenuItem>
                  <MenuItem href="/deals/software-deals">
                    Software Deals
                  </MenuItem>
                  <MenuItem href="/deals/gear-deals">Gear Deals</MenuItem>
                </div>
              </div>
            </NavDesktopItem>

            {/* REMOTE JOBS */}
            <NavDesktopItem
              title="Remote Jobs"
              icon={<Briefcase size={14} />}
            >
              <div className="p-4 w-[360px]">
                <MenuItem
                  href="/remote-jobs/job-boards"
                  featured
                >
                  <div className="flex items-center gap-2">
                    <Search size={14} />
                    Browse Job Board
                    <Badge className="ml-auto">New</Badge>
                  </div>
                </MenuItem>

                <div className="mt-3 space-y-1">
                  <MenuItem href="/remote-jobs/tech-jobs">
                    Tech Jobs
                  </MenuItem>
                  <MenuItem href="/remote-jobs/entry-level">
                    Entry Level
                  </MenuItem>
                  <MenuItem href="/remote-jobs/freelance">
                    Freelance
                  </MenuItem>
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
              {/* GUIDES */}
              <NavMobileGroup title="Guides" icon={<BookOpen size={16} />}>
                <MobileMenuItem href="/guides/security-basics">
                  Security Basics
                </MobileMenuItem>
                <MobileMenuItem href="/guides/privacy-essentials">
                  Privacy Essentials
                </MobileMenuItem>
                <MobileMenuItem href="/guides/secure-workspace">
                  Secure Workspace
                </MobileMenuItem>
                <MobileMenuItem href="/guides/digital-footprint">
                  Digital Footprint
                </MobileMenuItem>
                <MobileMenuItem href="/guides/remote-starter-kit" featured>
                  <div className="flex items-center justify-between">
                    Remote Starter Kit
                    <Badge className="ml-2 bg-emerald-100 text-emerald-800">
                      Popular
                    </Badge>
                  </div>
                </MobileMenuItem>
                <MobileMenuItem href="/guides/productivity">
                  Productivity
                </MobileMenuItem>
                <MobileMenuItem href="/guides/remote-interview">
                  Remote Interview
                </MobileMenuItem>
                <MobileMenuItem href="/guides/digital-nomad">
                  Digital Nomad
                </MobileMenuItem>
              </NavMobileGroup>

              {/* DEALS */}
              <NavMobileGroup title="Deals" icon={<Tag size={16} />}>
                {/* Hot Deals Section */}
                <div className="space-y-2 mb-3">
                  <div className="bg-linear-to-r from-amber-50 to-orange-50 rounded-lg p-3 border border-amber-200">
                    <h4 className="text-xs font-semibold text-amber-800 mb-2">🔥 Hot Deals</h4>
                    <div className="space-y-2">
                      <MobileDealItem
                        href="/deals/nordvpn"
                        label="NordVPN - 63% OFF"
                        expires="2 days"
                      />
                      <MobileDealItem
                        href="/deals/dashlane"
                        label="Dashlane - Free 6 Months"
                        expires="1 week"
                      />
                      <MobileDealItem
                        href="/deals/notion"
                        label="Notion - 40% OFF"
                        expires="5 days"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <MobileMenuItem href="/deals/vpn-deals">VPN Deals</MobileMenuItem>
                  <MobileMenuItem href="/deals/software-deals">Software Deals</MobileMenuItem>
                  <MobileMenuItem href="/deals/gear-deals">Gear Deals</MobileMenuItem>
                </div>
              </NavMobileGroup>

              {/* REMOTE JOBS */}
              <NavMobileGroup title="Remote Jobs" icon={<Briefcase size={16} />}>
                <div className="space-y-1">
                  <MobileMenuItem href="/remote-jobs/job-boards" featured>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Search size={14} />
                        Job Board
                      </div>
                      <Badge className="ml-2">New</Badge>
                    </div>
                  </MobileMenuItem>
                  <MobileMenuItem href="/remote-jobs/tech-jobs">
                    Tech Jobs
                  </MobileMenuItem>
                  <MobileMenuItem href="/remote-jobs/entry-level">
                    Entry Level
                  </MobileMenuItem>
                  <MobileMenuItem href="/remote-jobs/freelance">
                    Freelance
                  </MobileMenuItem>
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