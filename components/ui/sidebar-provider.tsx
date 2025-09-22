'use client';
import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { usePathname } from 'next/navigation';
import { ScrollAreaViewport } from '@radix-ui/react-scroll-area';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import {CirclePlus, CircleStar, CircleUser, LucideIcon, Search, Telescope, UsersRound} from 'lucide-react';
import { Compass, LayoutDashboard, Settings } from 'lucide-react';
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip";
import {Input} from "@/components/ui/input";
import {ModeToggle} from "@/components/modetoggle";
import Logo from "@/components/ui/logo";
import { school } from "@/app/config.json"

// Typed link definition for sidebar items
export type NavLink = {
  name: string;
  href: string;
  icon: LucideIcon;
};

// Default links (can be overridden by passing `links` prop)
const defaultLinks: NavLink[] = [
  {
      name: 'Discover',
      href: '/',
      icon: Compass
  },
  {
      name: 'Explore',
      href: '/explore',
      icon: Telescope
  },
  {
      name: 'Followed Accounts',
      href: '/explore/followed',
      icon: UsersRound
  },
    {
        name: 'Premium',
        href: '/explore/premium',
        icon: CircleStar
    },
    {
        name: 'Create',
        href: '/upload',
        icon: CirclePlus,

    },
    {
        name: 'You',
        href: '/explore/you',
        icon: CircleUser,

    },
];
const mobileLinks: NavLink[] = [
    {
        name: 'Discover',
        href: '/',
        icon: Compass
    },
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard
    },
    {
        name: 'Settings',
        href: '/settings',
        icon: Settings
    },
];

export function SidebarProvider({
  children,
  links,
}: {
  children: ReactNode;
  links?: NavLink[];
}) {
  const navLinks = links ?? defaultLinks;
  const mobileNavLinks = links ?? mobileLinks;
  const pathname = usePathname();

  return (
    <div className={cn('flex flex-col h-screen overflow-hidden bg-secondary')}>
      <div className="flex flex-row justify-between p-4 items-center">
        <Logo/>
        <h1>{school.name}</h1>
        <div className="flex items-center gap-2">
            <ModeToggle/>
          <SignedOut>
            <SignUpButton />
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
        <div className={"fixed bottom-0 w-full h-23 pt-2 z-50 bg-secondary p-2 rounded-t-2xl border-t md:hidden"}>
            <nav className="flex flex-row justify-around items-center">
            {mobileNavLinks.map(({ name, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
              >
                          {(() => {
                            const isActive = pathname === href;
                            return (
                              <div
                                className={cn(
                                  "p-2 hover:rounded-md  rounded-2xl flex items-center justify-center",
                                  isActive ? "bg-primary" : "bg-foreground/10"
                                )}
                              >
                                <Icon className={cn("h-4 w-4",
                                isActive ? "text-black" : "text")} aria-hidden="true"/>
                              </div>
                            );
                          })()}
                  <h1>{name}</h1>
              </Link>
            ))}
            </nav>
        </div>
      <div className={' flex flex-row'}>
        <aside className="hidden md:block p-4">
          <nav className="flex flex-col gap-2">
            {navLinks.map(({ name, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
              >
                  <Tooltip>
                      <TooltipTrigger>
                          {(() => {
                            const isActive = pathname === href;
                            return (
                              <div
                                className={cn(
                                  "p-2 hover:rounded-md rounded-2xl transition-all transition",
                                  isActive ? "bg-foreground/10" : "bg-transparent"
                                )}
                              >
                                <Icon className="h-4 w-4" aria-hidden="true"/>
                              </div>
                            );
                          })()}
                      </TooltipTrigger>
                      <TooltipContent side={"right"}>
                          <span>{name}</span>
                      </TooltipContent>
                  </Tooltip>
              </Link>
            ))}
          </nav>
        </aside>

        <div className="bg-background rounded-t-2xl md:rounded-tl-2xl w-full overflow-x-scroll h-screen">
          <ScrollArea >
            <ScrollAreaViewport className={"h-screen slide-in-from-bottom-10 duration-500"}>
              <div className="sticky top-0 rounded-t-2xl md:rounded-tl-2xl z-30 h-10 bg-gradient-to-b from-background to-background/0" />
                <div className={"h-screen"}>{children}</div>
            </ScrollAreaViewport>
            <ScrollBar />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}