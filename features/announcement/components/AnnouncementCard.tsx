import { Card, CardHeader } from '@/components/ui/card';
import { AnnouncementWithCategory } from '@/features/announcement/type';

interface AnnouncementCardProps {
  announcement: AnnouncementWithCategory;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  return (
    <Card className="border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative h-48 w-full bg-muted">
        <img
          src={announcement.attachment_url}
          alt={announcement.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded text-xs">
          {announcement.announcement_category.name}
        </div>
      </div>
      <CardHeader>
        <h3 className="font-bold text-foreground">{announcement.title}</h3>
        <p className="text-sm text-muted-foreground">{announcement.description}</p>
      </CardHeader>
    </Card>
  );
}
