import { AnnouncementWithCategory } from '@/features/announcement/type';
import { AnnouncementCard } from './AnnouncementCard';

export function FeaturedPostSkeleton() {
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
        <div className="h-3 bg-muted rounded w-5/6" />
        <div className="h-3 bg-muted rounded w-2/3" />
      </div>
      <div className="px-6 pb-5">
        <div className="aspect-video rounded-md bg-muted" />
      </div>
      <div className="border-t border-border bg-muted/30 px-6 py-3 h-11" />
    </div>
  );
}

export function FeaturedPost({ announcement }: { announcement: AnnouncementWithCategory }) {
  return <AnnouncementCard announcement={announcement} pinned />;
}
