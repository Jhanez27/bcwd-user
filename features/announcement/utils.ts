export const priorityStyles: Record<string, { label: string; pill: string; dot: string }> = {
  urgent: {
    label: 'Urgent',
    pill: 'bg-red-50 text-red-700 ring-1 ring-red-600/20',
    dot: 'bg-red-500',
  },
  high: {
    label: 'High',
    pill: 'bg-orange-50 text-orange-700 ring-1 ring-orange-600/20',
    dot: 'bg-orange-500',
  },
  medium: {
    label: 'Medium',
    pill: 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20',
    dot: 'bg-amber-500',
  },
  low: {
    label: 'Low',
    pill: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20',
    dot: 'bg-emerald-500',
  },
};

export function getPriorityStyle(priority?: string) {
  if (!priority) return null;
  return priorityStyles[priority.toLowerCase()] ?? null;
}

export function formatAnnouncementDate(date: Date | string, opts: { long?: boolean } = {}) {
  return new Date(date).toLocaleDateString('en-US', {
    month: opts.long ? 'long' : 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
