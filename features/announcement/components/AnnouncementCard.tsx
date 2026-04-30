"use client";
import { useState } from 'react';
import { AnnouncementWithCategory } from '@/features/announcement/type';
import {
  Calendar,
  Clock,
  ExternalLink,
  Megaphone,
  Pin,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatAnnouncementDate, getPriorityStyle } from '../utils';

const SEE_MORE_THRESHOLD = 180;

const accentBarByPriority: Record<string, string> = {
  urgent: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-amber-500',
  low: 'bg-emerald-500',
};

export function AnnouncementCard({
  announcement,
  pinned,
}: {
  announcement: AnnouncementWithCategory;
  pinned?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const priority = getPriorityStyle(announcement.priority);
  const accentBar = accentBarByPriority[announcement.priority?.toLowerCase()] ?? 'bg-primary';
  const description = announcement.description ?? '';
  const isLong = description.length > SEE_MORE_THRESHOLD;
  const shown = !isLong || expanded
    ? description
    : description.slice(0, SEE_MORE_THRESHOLD).trimEnd() + '…';

  return (
    <article className="relative overflow-hidden bg-card border border-border rounded-lg shadow-sm w-full min-w-0">
      {/* Priority accent bar */}
      <div className={cn('absolute left-0 top-0 bottom-0 w-1', accentBar)} aria-hidden />

      {/* Header — letterhead style */}
      <header className="px-4 sm:px-6 pt-4 sm:pt-5 pb-3 sm:pb-4 border-b border-dashed border-border flex items-center gap-2 sm:gap-3">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-primary/10 ring-1 ring-primary/15 flex items-center justify-center shrink-0">
          <Megaphone className="w-4 h-4 text-primary" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] sm:tracking-[0.2em] text-muted-foreground truncate">
            Announcement · No. {String(announcement.id).padStart(4, '0')}
          </p>
          <p className="text-xs font-semibold text-foreground mt-0.5 truncate">
            {announcement.announcement_category.name}
          </p>
        </div>
        {pinned && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-full ring-1 ring-primary/15 shrink-0">
            <Pin className="w-3 h-3 fill-current" />
            <span className="hidden xs:inline sm:inline">Pinned</span>
          </span>
        )}
      </header>

      {/* Body */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-3 min-w-0">
        <h3 className="font-bold text-lg sm:text-xl leading-tight tracking-tight text-foreground wrap-break-word">
          {announcement.title}
        </h3>
        <p className="text-sm leading-relaxed text-foreground/85 whitespace-pre-line wrap-break-word">
          {shown}{' '}
          {isLong && !expanded && (
            <button
              onClick={() => setExpanded(true)}
              className="text-primary font-semibold hover:underline"
            >
              Read more
            </button>
          )}
          {isLong && expanded && (
            <button
              onClick={() => setExpanded(false)}
              className="block mt-2 text-primary font-semibold hover:underline"
            >
              Show less
            </button>
          )}
        </p>
      </div>

      {/* Image — full visible, click to open full size */}
      {announcement.attachment_url && (
        <div className="px-4 sm:px-6 pb-4 sm:pb-5">
          <a
            href={announcement.attachment_url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/image relative block bg-muted/40 rounded-md overflow-hidden border border-border"
            aria-label="Open full-size image"
          >
            <img
              src={announcement.attachment_url}
              alt={announcement.title}
              className="w-full max-h-[600px] object-contain"
            />
            <span className="absolute top-2 right-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-foreground bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full ring-1 ring-border opacity-0 group-hover/image:opacity-100 transition-opacity duration-200">
              <ExternalLink className="w-3 h-3" />
              View full
            </span>
          </a>
        </div>
      )}

      {/* Footer — issued / valid-until / priority */}
      <footer className="border-t border-border bg-muted/30 px-4 sm:px-6 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 text-xs">
        <div className="flex items-center gap-x-4 gap-y-1 flex-wrap text-muted-foreground min-w-0">
          <span className="inline-flex items-center gap-1.5 min-w-0">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span className="font-medium text-foreground/70">Posted</span>
            <span className="truncate">{formatAnnouncementDate(announcement.date_posted)}</span>
          </span>
          {announcement.expiry_date && (
            <span className="inline-flex items-center gap-1.5 min-w-0">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span className="font-medium text-foreground/70">Valid until</span>
              <span className="truncate">{formatAnnouncementDate(announcement.expiry_date)}</span>
            </span>
          )}
        </div>
        {priority && (
          <span
            className={cn(
              'self-start sm:self-auto inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shrink-0',
              priority.pill,
            )}
          >
            <span className={cn('w-1.5 h-1.5 rounded-full', priority.dot)} />
            {priority.label} priority
          </span>
        )}
      </footer>
    </article>
  );
}
