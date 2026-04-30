import { AnnouncementWithCategory } from '@/features/announcement/type';
import { Megaphone } from 'lucide-react';
import { AnnouncementCard } from './AnnouncementCard';

interface AnnouncementGridProps {
  announcements: AnnouncementWithCategory[];
  loading?: boolean;
}

function PostSkeleton() {
  return (
    <div className="relative bg-card border border-border rounded-lg shadow-sm overflow-hidden animate-pulse">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-muted" />
      <div className="px-6 pt-5 pb-4 border-b border-dashed border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-md bg-muted shrink-0" />
        <div className="flex-1 space-y-1.5">
          <div className="h-2.5 bg-muted rounded w-48" />
          <div className="h-3 bg-muted rounded w-28" />
        </div>
      </div>
      <div className="px-6 py-5 space-y-3">
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-2/3" />
      </div>
      <div className="px-6 pb-5">
        <div className="aspect-video rounded-md bg-muted" />
      </div>
      <div className="border-t border-border bg-muted/30 px-6 py-3 h-11" />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center gap-3 bg-card border border-dashed border-border rounded-lg">
      <div className="w-12 h-12 rounded-md bg-primary/10 ring-1 ring-primary/15 flex items-center justify-center">
        <Megaphone className="w-5 h-5 text-primary" strokeWidth={1.5} />
      </div>
      <p className="text-sm font-semibold text-foreground">No announcements posted</p>
      <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
        Official notices and updates from BCWD will be posted on this page.
      </p>
    </div>
  );
}

export function AnnouncementGrid({ announcements, loading }: AnnouncementGridProps) {
  if (loading) {
    return (
      <div className="space-y-5">
        {Array.from({ length: 2 }).map((_, i) => <PostSkeleton key={i} />)}
      </div>
    );
  }

  if (announcements.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-5">
      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}
    </div>
  );
}
