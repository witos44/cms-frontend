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
import { useState, useEffect } from 'react';

/* ===================== MAIN NAV ===================== */

export default function MainNav() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
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

      {/* MOBILE DRAWER */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 visible'
            : 'opacity-0 invisible delay-200'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Drawer Content */}
        <div
          className={`absolute left-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl transition-transform duration-300 ease-out ${
            mobileMenuOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }`}
        >
          {/* Header with close button */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <img src="/nsecure.png" alt="nsecure" className="h-7 w-auto" />
              <span className="text-sm text-gray-600">Menu</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
              className="h-9 w-9"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Scrollable Content */}
          <div className="h-[calc(100%-4rem)] overflow-y-auto p-4">
            <NavMobileGroup title="Guides">
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
            </NavMobileGroup>

            <NavMobileGroup title="Deals">
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
              <div className="mt-2 pt-3 border-t">
                <MenuItem href="/deals/vpn-deals">
                  VPN Deals
                </MenuItem>
                <MenuItem href="/deals/software-deals">
                  Software Deals
                </MenuItem>
                <MenuItem href="/deals/gear-deals">
                  Gear Deals
                </MenuItem>
              </div>
            </NavMobileGroup>

            <NavMobileGroup title="Remote Jobs">
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
              <MenuItem href="/remote-jobs/tech-jobs">
                Tech Jobs
              </MenuItem>
              <MenuItem href="/remote-jobs/entry-level">
                Entry Level
              </MenuItem>
              <MenuItem href="/remote-jobs/freelance">
                Freelance
              </MenuItem>
            </NavMobileGroup>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ===================== COMPONENTS ===================== */

function NavDesktopItem({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
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

function NavMobileGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 px-2 text-base font-semibold text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <span>{title}</span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="ml-2 pl-2 border-l-2 border-gray-200 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
}

function MenuItem({
  href,
  children,
  featured,
}: {
  href: string;
  children: React.ReactNode;
  featured?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-lg px-3 py-2.5 text-base transition-all ${
        featured
          ? 'bg-emerald-50 text-emerald-800 border border-emerald-100 hover:bg-emerald-100'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );
}

function DealItem({
  href,
  label,
  expires,
}: {
  href: string;
  label: string;
  expires: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-base hover:bg-amber-100 mb-2 transition-colors"
    >
      <span className="font-medium text-amber-800">
        {label}
      </span>
      <span className="rounded-full bg-amber-200 px-2.5 py-1 text-xs font-medium text-amber-800">
        {expires}
      </span>
    </Link>
  );
}