"use client"

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/sonner';
import { useState } from 'react';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Header collapsed={collapsed}/>
      <main className="flex-1">
        <div className="mx-auto max-w-7xl pb-20 xl:pb-10 pt-18 px-5 sm:px-6 xl:px-8 xl:pt-25">
        {children}
        </div>
      </main>
      <Toaster position="top-right" expand={false} richColors closeButton />
    </div>
  );
}
