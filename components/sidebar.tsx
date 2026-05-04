"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CreditCard,
  Ticket,
  FileText,
  Megaphone,
  Menu,
} from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

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

  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/dashboard") return true;
    return pathname.startsWith(href) && href !== "/dashboard";
  };

  return (
    <>
      {/* Mobile backdrop (UNCHANGED) */}
      {!collapsed && (
        <div
          className="fixed inset-0 bg-black/40 z-40 h-svh xl:hidden"
          onClick={() => setCollapsed(true)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 flex flex-col shrink-0 h-svh z-50 text-white",
          "bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950",
          "border-r border-blue-800/40",
          "backdrop-blur-md transition-all duration-200 ease-in-out",
          "xl:sticky xl:top-0",
          collapsed
            ? "-translate-x-full xl:translate-x-0 xl:w-[70px] w-60"
            : "translate-x-0 w-60",
        )}>
        {/* HEADER */}
        <div
          className={cn(
            "flex items-center h-16 px-3 border-b border-blue-800/40",
            collapsed ? "justify-center" : "justify-start",
          )}>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/10 transition">
            <Menu className="w-4 h-4 text-blue-100" />
          </button>

          {!collapsed && (
            <div className="ml-3">
              <Logo />
            </div>
          )}
        </div>

        {/* NAV */}
        <nav className="flex-1 px-2 py-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "relative flex items-center rounded-lg transition-all group",
                  collapsed ? "justify-center p-3" : "px-3 py-2.5",

                  active
                    ? "bg-blue-700/30 text-white"
                    : "text-blue-200/70 hover:text-white hover:bg-white/10",
                )}>
                {/* Active indicator */}
                {active && (
                  <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r bg-cyan-400" />
                )}

                <Icon
                  className={cn(
                    "shrink-0 transition-colors",
                    collapsed ? "w-5 h-5" : "w-4 h-4",
                  )}
                />

                {!collapsed && (
                  <span className="ml-3 text-sm font-medium truncate">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
