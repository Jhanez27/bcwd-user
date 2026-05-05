"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAnnouncementData } from "../hooks/useAnnouncementData";
import { cn } from "@/lib/utils";

export function Announcement() {
  const { announcements } = useAnnouncementData();

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Announcements
        </h1>
      </div>

      {/* ── IMPROVED BANNER SECTION ───────────────────────────── */}
      <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950">
        {/* background glow */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-20 -left-20 h-64 w-64 bg-cyan-500 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-64 w-64 bg-blue-500 rounded-full blur-3xl" />
        </div>

        <div className="relative h-64 flex items-center justify-center text-center px-4">
          <div className="space-y-3">
            {/* logo circle */}
            <div className="mx-auto h-24 w-24 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-md">
              <span className="text-xl font-bold text-white">BCWD</span>
            </div>

            {/* text */}
            <div>
              <h2 className="text-2xl font-bold text-white">
                Baybay City Water District
              </h2>
              <p className="text-sm text-blue-200">
                Official Announcements & Updates
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION TITLE */}
      <h2 className="text-2xl font-bold text-foreground">Site announcements</h2>

      {/* GRID */}
      <div
        className={cn(
          "grid gap-6",
          announcements.length > 1 ? "md:grid-cols-3" : "",
        )}>
        {announcements.map((announcement) => (
          <Card
            key={announcement.id}
            className="border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
            <div className="relative h-86 w-full overflow-hidden">
              <img
                src={announcement.attachment_url}
                alt=""
                className="absolute inset-0 w-full h-full object-cover blur-md scale-110"
              />
              <img
                src={announcement.attachment_url}
                alt={announcement.title}
                className="relative w-full h-full object-contain"
              />
            </div>

            <CardHeader>
              <h3 className="font-bold text-foreground">
                {announcement.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {announcement.description}
              </p>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* FEATURED POST */}
      <Card className="border-border mt-8">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-10 w-10 rounded-full bg-primary/20" />
            <div>
              <p className="font-bold text-foreground">
                Baybay City Water District
              </p>
              <p className="text-xs text-muted-foreground">Official Page</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="h-24 bg-muted rounded-md" />
            <div className="h-24 bg-muted rounded-md" />
            <div className="h-24 bg-muted rounded-md relative">
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-md">
                <p className="text-white font-bold">+3</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg text-foreground mb-2">
              The Baybay City Water District (BCWD) conducted a visitation and
              inspection...
            </h3>

            <div className="flex items-center gap-2 text-blue-500">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-sm font-medium">Facebook</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
