// app/dashboard/components/sidebar/Sidebar.tsx
'use client';

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Home, FileText, Folder, User, Settings, ChevronDown, PlusCircle, Menu } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function DashboardSidebar() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex h-full">
      {/* Sidebar untuk desktop */}
      <div className="hidden md:block w-[280px] bg-background border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Blog Admin</h2>
        </div>
        <div className="p-4">
          <Link href="/dashboard/posts/create" className="block w-full mb-4">
            <Button className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> New Post
            </Button>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
          <Link href="/dashboard" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent">
            <Home className="inline mr-2 h-4 w-4" /> Dashboard
          </Link>
          <Link href="/dashboard/posts" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent">
            <FileText className="inline mr-2 h-4 w-4" /> Posts
          </Link>
          <Link href="/dashboard/categories" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent">
            <Folder className="inline mr-2 h-4 w-4" /> Categories
          </Link>
          <Link href="/dashboard/users" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent">
            <User className="inline mr-2 h-4 w-4" /> Users
          </Link>
        </nav>
        <div className="p-4 border-t">
          <Accordion type="single" collapsible defaultValue="settings">
            <AccordionItem value="settings">
              <AccordionTrigger className="text-sm font-medium">
                Settings <ChevronDown className="ml-2 h-4 w-4" />
              </AccordionTrigger>
              <AccordionContent>
                <Link href="/dashboard/settings/general" className="block px-3 py-2 text-xs text-muted-foreground hover:text-foreground">
                  General
                </Link>
                <Link href="/dashboard/settings/appearance" className="block px-3 py-2 text-xs text-muted-foreground hover:text-foreground">
                  Appearance
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="p-4 border-t mt-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                Admin User
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                fetch('/api/auth/logout', { method: 'POST' }).then(() => {
                  window.location.href = '/login';
                });
              }}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Sheet untuk mobile */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-0">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <h2 className="text-xl font-bold">Blog Admin</h2>
            </div>
            <div className="p-4">
              <Link href="/dashboard/posts/create" className="block w-full mb-4">
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" /> New Post
                </Button>
              </Link>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
              <Link href="/dashboard" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent">
                <Home className="inline mr-2 h-4 w-4" /> Dashboard
              </Link>
              <Link href="/dashboard/posts" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent">
                <FileText className="inline mr-2 h-4 w-4" /> Posts
              </Link>
              <Link href="/dashboard/categories" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent">
                <Folder className="inline mr-2 h-4 w-4" /> Categories
              </Link>
              <Link href="/dashboard/users" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-accent">
                <User className="inline mr-2 h-4 w-4" /> Users
              </Link>
            </nav>
            <div className="p-4 border-t">
              <Accordion type="single" collapsible defaultValue="settings">
                <AccordionItem value="settings">
                  <AccordionTrigger className="text-sm font-medium">
                    Settings <ChevronDown className="ml-2 h-4 w-4" />
                  </AccordionTrigger>
                  <AccordionContent>
                    <Link href="/dashboard/settings/general" className="block px-3 py-2 text-xs text-muted-foreground hover:text-foreground">
                      General
                    </Link>
                    <Link href="/dashboard/settings/appearance" className="block px-3 py-2 text-xs text-muted-foreground hover:text-foreground">
                      Appearance
                    </Link>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <div className="p-4 border-t mt-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-full justify-start">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    Admin User
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    fetch('/api/auth/logout', { method: 'POST' }).then(() => {
                      window.location.href = '/login';
                    });
                  }}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}