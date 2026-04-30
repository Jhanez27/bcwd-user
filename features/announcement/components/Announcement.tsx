"use client"
import { useMemo, useState } from 'react';
import { Megaphone } from 'lucide-react';
import { useAnnouncementData } from '../hooks/useAnnouncementData';
import { PageHeader } from '@/components/shared/PageHeader';
import { AnnouncementGrid } from './AnnouncementGrid';
import { FeaturedPost, FeaturedPostSkeleton } from './FeaturedPost';
import { AnnouncementFilters, SortDirection } from './AnnouncementFilters';
//import { mockAnnouncements, mockCategories } from '../mockData';

export function Announcement() {
  const { announcements, categories, loading } = useAnnouncementData();
  // const {announcements, categories, loading} = { announcements: mockAnnouncements, categories: mockCategories, loading: false };
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const categoryOptions = useMemo(() => {
    const counts = new Map<string, number>();
    for (const a of announcements) {
      const name = a.announcement_category.name;
      counts.set(name, (counts.get(name) ?? 0) + 1);
    }
    return categories.map((c) => ({ name: c.name, count: counts.get(c.name) ?? 0 }));
  }, [announcements, categories]);

  const filtered = useMemo(() => {
    const list = selectedCategory
      ? announcements.filter((a) => a.announcement_category.name === selectedCategory)
      : announcements;
    return [...list].sort((a, b) => {
      const da = new Date(a.date_posted).getTime();
      const db = new Date(b.date_posted).getTime();
      return sortDirection === 'desc' ? db - da : da - db;
    });
  }, [announcements, selectedCategory, sortDirection]);

  const featured = filtered[0] ?? null;
  const rest = filtered.slice(1);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Announcements"
        description="Official notices and updates from Baybay City Water District"
        badge={
          !loading ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs text-muted-foreground font-medium whitespace-nowrap">
              <Megaphone className="w-3.5 h-3.5" />
              {announcements.length} {announcements.length === 1 ? 'notice' : 'notices'}
            </div>
          ) : null
        }
      />

      <div className="grid gap-5 lg:gap-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <AnnouncementFilters
          categories={categoryOptions}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          sortDirection={sortDirection}
          onChangeSort={setSortDirection}
          totalCount={announcements.length}
        />

        <div className="min-w-0 max-w-2xl w-full">
          {loading ? (
            <div className="space-y-4">
              <FeaturedPostSkeleton />
              <AnnouncementGrid announcements={[]} loading />
            </div>
          ) : filtered.length === 0 ? (
            <AnnouncementGrid announcements={[]} />
          ) : (
            <div className="space-y-4">
              {featured && <FeaturedPost announcement={featured} />}
              {rest.length > 0 && <AnnouncementGrid announcements={rest} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
