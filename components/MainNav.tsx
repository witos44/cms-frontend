"use client";

import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function MainNav() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // 🔥 PENTING

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-white/80 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center">
          <img src="/nsecure.png" alt="SecureRemote" className="h-8 w-auto" />
        </Link>

        <div className="flex items-center space-x-4">
          <NavPopover title="Security Tools">
            <MenuItem href="/vpn">Best VPNs</MenuItem>
            <MenuItem href="/password-managers">Password Managers</MenuItem>
            <MenuItem href="/antivirus">Antivirus</MenuItem>
            <MenuItem href="/secure-cloud">Secure Cloud Storage</MenuItem>
            <MenuItem href="/hardware-keys">2FA Hardware Keys</MenuItem>
            <MenuItem href="/secure-email">Secure Email Providers</MenuItem>
          </NavPopover>

          <NavPopover title="Work From Anywhere">
            <MenuItem href="/remote-jobs">Remote Job Boards</MenuItem>
            <MenuItem href="/remote-tools">Team Collaboration Tools</MenuItem>
            <MenuItem href="/best-laptops">Best Laptops for Remote Work</MenuItem>
            <MenuItem href="/best-headsets">Best Headsets & Webcams</MenuItem>
          </NavPopover>

          <NavPopover title="Deals">
            <MenuItem href="/deals/vpn">VPN Deals</MenuItem>
            <MenuItem href="/deals/software">Software Discounts</MenuItem>
            <MenuItem href="/deals/gear">Remote Gear Deals</MenuItem>
          </NavPopover>

          <NavPopover title="Guides">
            <MenuItem href="/guides/cybersecurity-basics">Cybersecurity Basics</MenuItem>
            <MenuItem href="/guides/remote-work-starter">Remote Work Starter Kit</MenuItem>
            <MenuItem href="/guides/secure-setup">Secure Remote Workspace</MenuItem>
            <MenuItem href="/guides/privacy">Privacy Essentials</MenuItem>
          </NavPopover>

          <NavPopover title="Reviews">
            <MenuItem href="/reviews/software">Software Reviews</MenuItem>
            <MenuItem href="/reviews/hardware">Hardware Reviews</MenuItem>
            <MenuItem href="/reviews/platforms">Remote Job Platforms</MenuItem>
          </NavPopover>
        </div>
      </div>
    </nav>
  );
}

function NavPopover({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Popover>
      <PopoverTrigger className="flex items-center gap-1 text-sm font-medium hover:underline">
        {title} <ChevronDown size={14} />
      </PopoverTrigger>
      <PopoverContent className="w-[350px] p-4 bg-white" align="start">
        {children}
      </PopoverContent>
    </Popover>
  );
}

function MenuItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block rounded px-3 py-2 text-sm transition hover:bg-gray-100"
    >
      {children}
    </Link>
  );
}
