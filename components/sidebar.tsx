'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CreditCard, Ticket, FileText, Megaphone } from 'lucide-react';
import { Logo } from './logo';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/payment-history', label: 'Payment History', icon: CreditCard },
    { href: '/create-ticket', label: 'Create Ticket', icon: Ticket },
    { href: '/billings', label: 'Billings', icon: FileText },
    { href: '/announcement', label: 'Announcement', icon: Megaphone },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard' && pathname === '/dashboard') return true;
    return pathname.startsWith(href) && href !== '/dashboard';
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-48 border-r border-sidebar-border bg-sidebar p-4 flex flex-col">
      <div className="mb-8">
        <Logo />
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors',
                active
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
