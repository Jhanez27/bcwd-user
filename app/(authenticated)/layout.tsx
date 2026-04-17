"use client";

import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { SetStateAction, useState } from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex relative min-h-screen">
      {/* Layered water effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-90 z-0"
        style={{
          backgroundImage: "url('/sea-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
          WebkitMaskImage: `
            linear-gradient(
              to top,
              rgba(0,0,0,1) 0%,
              rgba(0,0,0,0.9) 25%,
              rgba(0,0,0,0.4) 40%,
              rgba(0,0,0,0) 95%
            )
          `,
          maskImage: `
            linear-gradient(
              to top,
              rgba(0,0,0,1) 0%,
              rgba(0,0,0,0.9) 25%,
              rgba(0,0,0,0.4) 40%,
              rgba(0,0,0,0) 95%
            )
          `,
        }}
      />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Header collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="flex-1 w-full pt-16 relative overflow-hidden z-10">
        <div className="relative z-10 mx-auto max-w-7xl pb-20 xl:pb-10 pt-8 px-5 sm:px-6 xl:px-8 xl:pt-10">
          {children}
        </div>
      </main>
      <Toaster position="top-right" expand={false} richColors closeButton />
    </div>
  );
}
