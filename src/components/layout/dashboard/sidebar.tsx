'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import { HomeIcon, UserIcon, MenuIcon, PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarNavItems = [
  {
    title: 'Home',
    href: '/dashboard',
    icon: HomeIcon,
  },
  {
    title: 'Products',
    href: '/dashboard/products',
    icon: UserIcon,
  },
];

const NavContent = ({
  collapsed,
  setCollapsed,
}: {
  collapsed?: boolean;
  setCollapsed: (collapsed: boolean) => void;
}) => {
  return (
    <div className='flex flex-col gap-2 p-4'>
      <div className='px-3 py-2'>
        <div className={cn('flex items-center mb-2', collapsed ? 'justify-center' : 'justify-between px-4')}>
          {!collapsed && <h2 className='text-lg font-semibold'>Dashboard</h2>}
          <Button
            variant='ghost'
            size='icon'
            className={cn(collapsed && 'h-9 w-9')}
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <PanelLeftOpenIcon className='h-4 w-4' /> : <PanelLeftCloseIcon className='h-4 w-4' />}
          </Button>
        </div>
        <div className='space-y-1'>
          {sidebarNavItems.map(item => (
            <Button
              key={item.href}
              variant='ghost'
              className={cn('w-full justify-start', collapsed && 'justify-center px-2')}
              asChild
            >
              <Link href={item.href}>
                <item.icon className={cn('h-4 w-4', collapsed ? 'mr-0' : 'mr-2')} />
                {!collapsed && item.title}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Navigation Trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='ghost' size='icon' className='lg:hidden fixed left-4 top-4'>
            <MenuIcon className='h-5 w-5' />
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='w-64 p-0'>
          <NavContent collapsed={collapsed} setCollapsed={setCollapsed} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className={cn('hidden lg:block border-r bg-gray-100/40 dark:bg-gray-800/40', collapsed ? 'w-16' : 'w-64')}>
        <NavContent collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
    </>
  );
};
