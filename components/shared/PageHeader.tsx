import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: ReactNode;
  className?: string;
}

export function PageHeader({ title, description, badge, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-1 min-w-0 items-start justify-between gap-4 pb-5',
        'border-b border-border',
        'animate-in fade-in slide-in-fr om-bottom-2 duration-300 ease-out',
        className,
      )}
    >
      {/* ── Left block ── */}
      <div className="flex items-start gap-4 min-w-0">

        {/* Accent bar */}
        <div
          aria-hidden
          className={cn(
            'shrink-0 w-0.75 rounded-full mt-0.75',
            'bg-linear-to-b from-primary via-accent to-primary/20',
            description ? 'h-11' : 'h-7',
            'animate-in fade-in zoom-in-75 duration-500 delay-100 ease-out',
          )}
        />

        <div className="min-w-0">
          {/* Eyebrow — subtle category label above the title */}
          <p
            className={cn(
              'text-[11px] font-semibold tracking-[0.12em] uppercase',
              'text-primary/70',
              'mb-1',
              'animate-in fade-in slide-in-from-left-3 duration-300 delay-75 ease-out',
            )}
          >
            BCWD Billing System
          </p>

          {/* Title */}
          <h1
            className={cn(
              'text-2xl font-bold leading-none tracking-[-0.02em]',  
              'bg-linear-to-r from-foreground via-foreground to-foreground/70',
              'bg-clip-text text-transparent',
              'animate-in fade-in slide-in-from-left-3 duration-300 delay-100 ease-out',
            )}
          >
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p
              className={cn(
                'mt-1.5 text-sm leading-snug text-muted-foreground',
                'max-w-md',
                'animate-in fade-in slide-in-from-left-3 duration-300 delay-150 ease-out',
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      {/* ── Right slot — badge / actions ── */}
      {badge && (
        <div
          className={cn(
            'shrink-0 self-center',
            'animate-in fade-in slide-in-from-right-3 duration-300 delay-150 ease-out',
          )}
        >
          {badge}
        </div>
      )}
    </div>
  );
}