'use client';

import { Bell, Settings, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { getCurrentConsumer } from '@/supabase/consumer';

export function Header() {
  const router = useRouter();
  const supabase = createClient();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  }
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentConsumer();
      setUser(user);
    }
    fetchUser();
  }, []);
  return (
    <header className="fixed right-0 top-0 left-48 border-b border-border bg-background p-4 flex items-center justify-between">
      <div className="flex-1" />

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <span className="text-sm font-medium">{user?.first_name || "User"} {user?.last_name || "Name"}</span>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar_url || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"} alt="User" />
                <AvatarFallback>{user ? user?.first_name![0] : "U"}{user ? user?.last_name![0] : "N"}</AvatarFallback>
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
