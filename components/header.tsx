'use client';

import { LogOut, User } from 'lucide-react';
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
import { Logo } from './logo';

export function Header({ collapsed }: { collapsed: boolean }) {
  const router = useRouter();
  const supabase = createClient();

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getCurrentConsumer().then(setUser);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-16 px-5 bg-[#232323] border-b border-white/10 flex items-center">
      
      {/* LEFT */}
      <div className="flex ml-11 items-center flex-1">
        {collapsed && <Logo />}
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 justify-end flex-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 text-white">
              <span className="text-sm font-medium">
                {user?.first_name || 'User'} {user?.last_name || 'Name'}
              </span>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'} />
                <AvatarFallback>
                  {user ? user.first_name[0] : 'U'}
                  {user ? user.last_name[0] : 'N'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => router.push('/profile')}>
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