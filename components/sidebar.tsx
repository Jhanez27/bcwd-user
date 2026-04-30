"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  CreditCard,
  Ticket,
  FileText,
  Megaphone,
  Menu,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { getCurrentConsumer } from "@/supabase/consumer";
import { createClient } from "@/utils/supabase/client";

const menuItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/billings", label: "Billings", icon: FileText },
  { href: "/payment-history", label: "Payment History", icon: CreditCard },
  { href: "/create-ticket", label: "Create Ticket", icon: Ticket },
  { href: "/announcement", label: "Announcement", icon: Megaphone },
];

export function Sidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getCurrentConsumer().then(setUser);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 1279px)").matches;
    document.body.style.overflow = !collapsed && isMobile ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [collapsed]);

  const closeSidebarOnMobile = () => {
    if (window.matchMedia("(max-width: 1279px)").matches) setCollapsed(true);
  };

  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/dashboard") return true;
    return pathname.startsWith(href) && href !== "/dashboard";
  };

  return (
    <>
      {/* Mobile backdrop */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 xl:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 flex flex-col shrink-0 bg-[#0D163A] backdrop-blur-md transition-all duration-200 ease-in-out h-svh z-50 text-white",
          "xl:sticky xl:top-0",
          collapsed
            ? "-translate-x-full xl:translate-x-0 xl:w-15 w-60"
            : "translate-x-0 w-60"
        )}
      >
      <div
        className={cn(
          "flex items-center h-18 px-3 gap-2 shrink-0 border-sidebar-border",
          collapsed && "justify-center px-0",
        )}
      >
        <button
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-md shrink-0",
            "text-[var(--sidebar-icon-color)]",
            "hover:bg-[var(--sidebar-icon-hover-bg)] hover:text-sidebar-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
            "transition-colors duration-150",
          )}
        >
          <span className="sr-only">{collapsed ? "Expand" : "Collapse"}</span>
          {collapsed ? (
            <Menu className="w-4 h-4" />
          ) : (
            <Menu className="w-4 h-4" />
          )}
        </button>

        {!collapsed && (
          <div className="flex-1 overflow-hidden">
            <Logo />
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3 space-y-0.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              title={collapsed ? item.label : undefined}
              onClick={closeSidebarOnMobile}
              className={cn(
                "group relative flex items-center gap-3 rounded-md text-sm mb-2",
                "transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-1",
                collapsed ? "justify-center p-2" : "px-3 py-2",
                active
                  ? "font-semibold scale-[1.05] text-[var(--sidebar-nav-item-active)] bg-[var(--sidebar-nav-item-active-bg)]"
                  : "font-normal text-[var(--sidebar-nav-item-muted)] hover:bg-[var(--sidebar-nav-item-hover-bg)] hover:text-[var(--sidebar-nav-item)]",
              )}
            >
              <Icon
                className={cn(
                  "shrink-0 transition-colors duration-150",
                  collapsed ? "w-5 h-5" : "w-4 h-4",
                  active
                    ? "text-[var(--sidebar-nav-item-active-indicator)]"
                    : "text-[var(--sidebar-nav-item-muted)] group-hover:text-[var(--sidebar-nav-item)]",
                )}
              />

              {!collapsed && (
                <span className="truncate leading-none">{item.label}</span>
              )}

              {/* Underline indicator — matches Figma's active treatment */}
              {active && !collapsed && (
                <span
                  aria-hidden
                  className="absolute bottom-1 left-3 right-3 h-px rounded-full bg-[var(--sidebar-nav-item-active-indicator)]"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── User footer — mobile only ── */}
      <div className="xl:hidden shrink-0 border-t border-white/10 px-3 py-3">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarImage
              src={
                user?.avatar_url ||
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
              }
            />
            <AvatarFallback className="bg-white/10 text-white text-xs">
              {user?.first_name?.[0]}
              {user?.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.first_name} {user?.last_name}
            </p>
            <Link
              href="/profile"
              onClick={closeSidebarOnMobile}
              className="text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              View profile
            </Link>
          </div>
          <button
            onClick={handleLogout}
            aria-label="Logout"
            className="flex items-center justify-center w-8 h-8 rounded-md text-white/50 hover:bg-white/10 hover:text-white transition-colors shrink-0"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}
