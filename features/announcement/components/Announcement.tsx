"use client"
import { Megaphone } from 'lucide-react';
import { useAnnouncementData } from '../hooks/useAnnouncementData';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnnouncementGrid } from './AnnouncementGrid';
import { FeaturedPost } from './FeaturedPost';

export function Announcement() {
  const { announcements } = useAnnouncementData();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Announcements"
        description="Stay updated with the latest news and updates from BCWD"
        badge={
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs text-muted-foreground font-medium whitespace-nowrap">
            <Megaphone className="w-3.5 h-3.5" />
            {announcements.length} {announcements.length === 1 ? 'announcement' : 'announcements'}
          </div>
        }
      />
      <AnnouncementGrid announcements={announcements} />
      <FeaturedPost />
    </div>
  );
}
