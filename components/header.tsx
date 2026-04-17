"use client";

import { LogOut, Menu, User } from "lucide-react";
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
import { useEffect, useState } from "react";
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

  useEffect(() => {
    getCurrentConsumer().then(setUser);
  }, []);

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
      <div className="flex items-center gap-4 justify-end flex-1">
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
