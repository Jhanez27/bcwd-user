"use client";

import { Bell, LogOut, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useRef, useState } from "react";
import { getCurrentConsumer } from "@/supabase/consumer";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

export function Header({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);
  const [hasUnread, setHasUnread] = useState(false);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  useEffect(() => {
    getCurrentConsumer().then(setUser);
  }, []);

  // ── Notification logic ────────────────────────────────────────────────
  const storageKey = user?.id ? `bcwd_bell_seen_${user.id}` : null;

  const checkUnread = useCallback(async () => {
    if (!user?.id) return;
    const lastSeen = storageKey ? localStorage.getItem(storageKey) : null;

    let query = supabase
      .from("billing")
      .select("id, created_at, meter_reading!inner(meter!inner(consumer_id))")
      .eq("meter_reading.meter.consumer_id", user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const { data } = await query;
    if (!data) { setHasUnread(false); return; }

    if (!lastSeen) {
      setHasUnread(true);
    } else {
      setHasUnread(new Date(data.created_at) > new Date(lastSeen));
    }
  }, [user?.id, storageKey, supabase]);

  useEffect(() => {
    checkUnread();
  }, [checkUnread]);

  // Subscribe to new billing inserts via Supabase Realtime
  useEffect(() => {
    if (!user?.id) return;
    channelRef.current = supabase
      .channel(`billing_notify_${user.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "billing" },
        () => { checkUnread(); }
      )
      .subscribe();

    return () => {
      if (channelRef.current) supabase.removeChannel(channelRef.current);
    };
  }, [user?.id, checkUnread, supabase]);

  const handleBellClick = () => {
    if (storageKey) localStorage.setItem(storageKey, new Date().toISOString());
    setHasUnread(false);
    router.push("/billings");
  };
  // ─────────────────────────────────────────────────────────────────────

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-40 h-16 px-5 border-b items-center flex bg-black/70",
        "transition-[left] duration-200 ease-in-out",
        collapsed ? "xl:left-15 left-0" : "xl:left-60 left-0",
      )}
    >
      <div className="flex items-center gap-2 flex-1">
        {/* Mobile toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="xl:hidden flex items-center justify-center w-9 h-9 rounded-md
               hover:bg-white/10 transition"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>

        {collapsed && <Logo />}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-0 justify-end flex-1">
        {/* Bell notification button */}
        <Button
          variant="ghost"
          size="sm"
          className="relative gap-2 text-white hover:bg-white/10"
          onClick={handleBellClick}
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {hasUnread && (
            <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
          )}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 text-white">
              <span className="text-sm font-medium">
                {user?.first_name || "User"} {user?.last_name || "Name"}
              </span>
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={
                    user?.avatar_url ||
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                  }
                />
                <AvatarFallback>
                  {user ? user.first_name[0] : "U"}
                  {user ? user.last_name[0] : "N"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push("/profile")}>
              <User className="h-4 w-4 mr-2" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
