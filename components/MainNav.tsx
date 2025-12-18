// components/MainNav.tsx
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Shield, Briefcase, Tag, BookOpen, Star, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

export default function MainNav() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <img src="/nsecure.png" alt="SecureRemote" className="h-8 w-auto" />
          <span className="hidden text-sm text-gray-600 md:inline">
            Security × Remote Work
          </span>
        </Link>

        {/* Desktop Navigation - Updated with integrated content */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Security Tools - From Protect Yourself Online */}
          <NavDesktopItem title="Security Tools" icon={<Shield size={14} />}>
            <div className="grid grid-cols-2 gap-4 p-4 w-[500px]">
              <div>
                <h4 className="font-medium text-sm mb-2 text-blue-600">Essential Protection</h4>
                <MenuItem href="/vpn" affiliate badge="65%">Best VPNs</MenuItem>
                <MenuItem href="/password-managers" affiliate badge="40%">Password Managers</MenuItem>
                <MenuItem href="/antivirus">Antivirus Software</MenuItem>
                <MenuItem href="/secure-email">Secure Email</MenuItem>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2 text-emerald-600">For Remote Workers</h4>
                <MenuItem href="/security/client-data" featured>Secure Client Data</MenuItem>
                <MenuItem href="/public-wifi-security" featured>Public Wi-Fi Safety</MenuItem>
                <MenuItem href="/hardware-keys">2FA Hardware Keys</MenuItem>
                <MenuItem href="/secure-cloud">Cloud Storage</MenuItem>
              </div>
            </div>
            <div className="px-4 py-2 border-t text-xs text-gray-500">
              💡 Essential for remote work security
            </div>
          </NavDesktopItem>

          {/* Work From Anywhere - From Start Remote Working */}
          <NavDesktopItem title="Work From Anywhere" icon={<Briefcase size={14} />}>
            <div className="grid grid-cols-2 gap-4 p-4 w-[500px]">
              <div>
                <h4 className="font-medium text-sm mb-2 text-blue-600">Find Opportunities</h4>
                <MenuItem href="/remote-jobs" badge="42 New">
                  <div className="flex items-center gap-2">
                    <Search size={12} />
                    Remote Job Boards
                  </div>
                </MenuItem>
                <MenuItem href="/jobs/tech">Tech Remote Jobs</MenuItem>
                <MenuItem href="/jobs/entry-level">Entry-Level Remote</MenuItem>
                <MenuItem href="/freelance-platforms">Freelance Platforms</MenuItem>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2 text-emerald-600">Remote Setup</h4>
                <MenuItem href="/remote-tools" featured>Team Collaboration</MenuItem>
                <MenuItem href="/best-laptops" affiliate badge="5%">Best Laptops</MenuItem>
                <MenuItem href="/best-headsets" affiliate badge="8%">Headsets & Webcams</MenuItem>
                <MenuItem href="/home-office-setup" featured>Home Office Guide</MenuItem>
              </div>
            </div>
          </NavDesktopItem>

          {/* Deals - From Best Tools */}
          <NavDesktopItem title="Deals" icon={<Tag size={14} />}>
            <div className="p-4 w-[350px]">
              <div className="mb-4">
                <h4 className="font-medium text-sm mb-3 text-amber-600">🔥 Hot Deals</h4>
                <div className="space-y-2">
                  <DealItem 
                    label="NordVPN - 63% OFF" 
                    expires="2 days"
                    href="/deals/nordvpn"
                  />
                  <DealItem 
                    label="Dashlane - Free 6 months" 
                    expires="1 week"
                    href="/deals/dashlane"
                  />
                  <DealItem 
                    label="Notion - 40% OFF" 
                    expires="5 days"
                    href="/deals/notion"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">More Discounts</h4>
                <MenuItem href="/deals/vpn">All VPN Deals</MenuItem>
                <MenuItem href="/deals/software">Software Discounts</MenuItem>
                <MenuItem href="/deals/gear">Remote Gear Deals</MenuItem>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                * Affiliate links - We earn commission
              </div>
            </div>
          </NavDesktopItem>

          {/* Guides - Integrated security + remote work */}
          <NavDesktopItem title="Guides" icon={<BookOpen size={14} />}>
            <div className="grid grid-cols-2 gap-4 p-4 w-[500px]">
              <div>
                <h4 className="font-medium text-sm mb-2 text-blue-600">Security Guides</h4>
                <MenuItem href="/guides/cybersecurity-basics">Cybersecurity Basics</MenuItem>
                <MenuItem href="/guides/privacy">Privacy Essentials</MenuItem>
                <MenuItem href="/guides/secure-setup">Secure Workspace</MenuItem>
                <MenuItem href="/guides/digital-footprint">Digital Footprint</MenuItem>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2 text-emerald-600">Remote Work Guides</h4>
                <MenuItem href="/guides/remote-work-starter" featured>Remote Starter Kit</MenuItem>
                <MenuItem href="/guides/productivity">Productivity Tips</MenuItem>
                <MenuItem href="/guides/remote-interview">Ace Remote Interviews</MenuItem>
                <MenuItem href="/guides/digital-nomad">Digital Nomad Guide</MenuItem>
              </div>
            </div>
          </NavDesktopItem>

          {/* Reviews - From Best Tools reviews */}
          <NavDesktopItem title="Reviews" icon={<Star size={14} />}>
            <div className="p-4 w-[300px]">
              <div className="mb-4">
                <h4 className="font-medium text-sm mb-2">Top Picks</h4>
                <MenuItem href="/reviews/software" affiliate>
                  <div className="flex items-center justify-between">
                    Software Reviews
                    <Badge variant="outline" className="text-xs">20+</Badge>
                  </div>
                </MenuItem>
                <MenuItem href="/reviews/hardware" affiliate>
                  <div className="flex items-center justify-between">
                    Hardware Reviews
                    <Badge variant="outline" className="text-xs">15+</Badge>
                  </div>
                </MenuItem>
                <MenuItem href="/reviews/platforms">
                  <div className="flex items-center justify-between">
                    Remote Platforms
                    <Badge variant="outline" className="text-xs">12+</Badge>
                  </div>
                </MenuItem>
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Comparison Charts</h4>
                <MenuItem href="/comparison/vpn">VPN Comparison</MenuItem>
                <MenuItem href="/comparison/password-managers">Password Managers</MenuItem>
                <MenuItem href="/comparison/laptops">Laptop Comparison</MenuItem>
              </div>
            </div>
          </NavDesktopItem>

          {/* CTA Button */}
          <Button
            asChild
            className="bg-linear-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
          >
            <Link href="/job-board" className="hidden lg:flex">
              <Search className="mr-2 h-4 w-4" />
              Job Board
            </Link>
          </Button>
        </div>

        {/* Mobile Trigger & CTA */}
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden md:flex lg:hidden"
          >
            <Link href="/job-board">
              <Search className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-gray-200 overflow-y-auto pt-20 pb-8 px-4">
          <div className="space-y-6">
            {/* Job Board CTA */}
            <div className="mb-6">
              <Button
                asChild
                className="w-full bg-linear-to-r from-blue-600 to-emerald-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link href="/job-board" className="flex items-center justify-center gap-2">
                  <Search className="h-4 w-4" />
                  Browse Job Board
                  <Badge className="ml-2">42 New</Badge>
                </Link>
              </Button>
            </div>

            <NavMobileGroup title="Security Tools">
              <MenuItem href="/vpn" onClose={() => setMobileMenuOpen(false)} affiliate>
                Best VPNs
              </MenuItem>
              <MenuItem href="/password-managers" onClose={() => setMobileMenuOpen(false)} affiliate>
                Password Managers
              </MenuItem>
              <MenuItem href="/antivirus" onClose={() => setMobileMenuOpen(false)}>
                Antivirus
              </MenuItem>
              <div className="ml-4 mt-2 pl-2 border-l-2 border-emerald-200">
                <p className="text-xs text-emerald-600 mb-1 font-medium">For Remote Workers:</p>
                <MenuItem href="/security/client-data" onClose={() => setMobileMenuOpen(false)} featured>
                  Secure Client Data
                </MenuItem>
                <MenuItem href="/public-wifi-security" onClose={() => setMobileMenuOpen(false)} featured>
                  Public Wi-Fi Safety
                </MenuItem>
              </div>
            </NavMobileGroup>

            <NavMobileGroup title="Work From Anywhere">
              <MenuItem href="/remote-jobs" onClose={() => setMobileMenuOpen(false)} badge="42 New">
                Remote Job Boards
              </MenuItem>
              <MenuItem href="/remote-tools" onClose={() => setMobileMenuOpen(false)}>
                Team Collaboration Tools
              </MenuItem>
              <MenuItem href="/best-laptops" onClose={() => setMobileMenuOpen(false)} affiliate>
                Best Laptops for Remote Work
              </MenuItem>
              <MenuItem href="/best-headsets" onClose={() => setMobileMenuOpen(false)} affiliate>
                Best Headsets & Webcams
              </MenuItem>
              <div className="ml-4 mt-2 pl-2 border-l-2 border-emerald-200">
                <p className="text-xs text-emerald-600 mb-1 font-medium">Secure Setup:</p>
                <MenuItem href="/home-office-setup" onClose={() => setMobileMenuOpen(false)} featured>
                  Secure Home Office Guide
                </MenuItem>
              </div>
            </NavMobileGroup>

            <NavMobileGroup title="Deals">
              <div className="mb-3">
                <p className="text-xs text-amber-600 font-medium mb-2">🔥 Active Deals</p>
                <DealItem 
                  label="NordVPN - 63% OFF" 
                  expires="2 days"
                  href="/deals/nordvpn"
                  onClose={() => setMobileMenuOpen(false)}
                  mobile
                />
                <DealItem 
                  label="Dashlane - Free 6mo" 
                  expires="1 week"
                  href="/deals/dashlane"
                  onClose={() => setMobileMenuOpen(false)}
                  mobile
                />
              </div>
              <MenuItem href="/deals/vpn" onClose={() => setMobileMenuOpen(false)}>
                VPN Deals
              </MenuItem>
              <MenuItem href="/deals/software" onClose={() => setMobileMenuOpen(false)}>
                Software Discounts
              </MenuItem>
              <MenuItem href="/deals/gear" onClose={() => setMobileMenuOpen(false)}>
                Remote Gear Deals
              </MenuItem>
            </NavMobileGroup>

            <NavMobileGroup title="Guides">
              <div className="mb-3">
                <p className="text-xs text-blue-600 font-medium mb-1">Security Guides</p>
                <MenuItem href="/guides/cybersecurity-basics" onClose={() => setMobileMenuOpen(false)}>
                  Cybersecurity Basics
                </MenuItem>
                <MenuItem href="/guides/secure-setup" onClose={() => setMobileMenuOpen(false)} featured>
                  Secure Remote Workspace
                </MenuItem>
              </div>
              <div>
                <p className="text-xs text-emerald-600 font-medium mb-1">Remote Work Guides</p>
                <MenuItem href="/guides/remote-work-starter" onClose={() => setMobileMenuOpen(false)} featured>
                  Remote Work Starter Kit
                </MenuItem>
                <MenuItem href="/guides/privacy" onClose={() => setMobileMenuOpen(false)}>
                  Privacy Essentials
                </MenuItem>
              </div>
            </NavMobileGroup>

            <NavMobileGroup title="Reviews">
              <MenuItem href="/reviews/software" onClose={() => setMobileMenuOpen(false)} affiliate>
                Software Reviews
              </MenuItem>
              <MenuItem href="/reviews/hardware" onClose={() => setMobileMenuOpen(false)} affiliate>
                Hardware Reviews
              </MenuItem>
              <MenuItem href="/reviews/platforms" onClose={() => setMobileMenuOpen(false)}>
                Remote Job Platforms
              </MenuItem>
            </NavMobileGroup>

            {/* Disclosure */}
            <div className="pt-6 border-t">
              <p className="text-xs text-gray-500">
                💡 <strong>Note:</strong> Some links are affiliate links. We earn commission at no extra cost to you. We only recommend tools we use and trust.
              </p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// Desktop Navigation Item Component
function NavDesktopItem({ 
  title, 
  children, 
  icon 
}: { 
  title: string; 
  children: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
        {icon}
        {title} 
        <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
      </button>
      <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 p-0 bg-white border border-gray-200 rounded-lg shadow-xl z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {children}
      </div>
    </div>
  );
}

// Mobile Group Component
function NavMobileGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="flex items-center justify-between w-full text-left font-medium py-3 text-gray-800"
        onClick={() => setOpen(!open)}
      >
        {title}
        <ChevronDown size={16} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="ml-3 mt-1 space-y-1 border-l pl-3">
          {children}
        </div>
      )}
    </div>
  );
}

// Menu Item Component
interface MenuItemProps {
  href: string;
  children: React.ReactNode;
  onClose?: () => void;
  affiliate?: boolean;
  badge?: string;
  featured?: boolean;
}

function MenuItem({ href, children, onClose, affiliate, badge, featured }: MenuItemProps) {
  return (
    <Link
      href={href}
      className={`block rounded-lg px-3 py-2.5 text-sm transition-all ${
        featured 
          ? 'bg-linear-to-r from-emerald-50 to-emerald-100 text-emerald-800 border border-emerald-200 hover:from-emerald-100 hover:to-emerald-200' 
          : 'hover:bg-gray-50 text-gray-700'
      }`}
      onClick={onClose}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {affiliate && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
              $
            </span>
          )}
          <span>{children}</span>
        </div>
        {badge && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
            {badge}
          </span>
        )}
      </div>
    </Link>
  );
}

// Deal Item Component
interface DealItemProps {
  label: string;
  expires: string;
  href: string;
  onClose?: () => void;
  mobile?: boolean;
}

function DealItem({ label, expires, href, onClose, mobile = false }: DealItemProps) {
  return (
    <Link
      href={href}
      className={`block rounded-lg px-3 py-2.5 text-sm transition-all bg-linear-to-r from-amber-50 to-white border border-amber-200 hover:from-amber-100 hover:to-white ${
        mobile ? 'mb-2' : ''
      }`}
      onClick={onClose}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium text-amber-800">{label}</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
          {expires}
        </span>
      </div>
    </Link>
  );
}