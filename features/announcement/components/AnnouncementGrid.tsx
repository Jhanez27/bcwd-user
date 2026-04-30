import { cn } from '@/lib/utils';
import { AnnouncementWithCategory } from '@/features/announcement/type';
import { AnnouncementCard } from './AnnouncementCard';

interface AnnouncementGridProps {
  announcements: AnnouncementWithCategory[];
}

export function AnnouncementGrid({ announcements }: AnnouncementGridProps) {
  return (
    <div className={cn('grid gap-6', announcements.length > 1 ? 'md:grid-cols-3' : '')}>
      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}
    </div>
  );
}
