"use client";
import { ArrowDownNarrowWide, ArrowUpNarrowWide, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export type SortDirection = 'desc' | 'asc';

export interface CategoryOption {
  name: string;
  count: number;
}

interface AnnouncementFiltersProps {
  categories: CategoryOption[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  sortDirection: SortDirection;
  onChangeSort: (direction: SortDirection) => void;
  totalCount: number;
}

export function AnnouncementFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  sortDirection,
  onChangeSort,
  totalCount,
}: AnnouncementFiltersProps) {
  const allActive = selectedCategory === null;

  return (
    <>
      {/* Mobile / tablet: horizontal */}
      <div className="lg:hidden min-w-0 space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
          <FilterPill active={allActive} count={totalCount} onClick={() => onSelectCategory(null)}>
            All
          </FilterPill>
          {categories.map((c) => (
            <FilterPill
              key={c.name}
              active={selectedCategory === c.name}
              count={c.count}
              onClick={() => onSelectCategory(c.name)}
            >
              {c.name}
            </FilterPill>
          ))}
        </div>
        <div className="flex justify-end">
          <SortToggle direction={sortDirection} onChange={onChangeSort} />
        </div>
      </div>

      {/* Desktop: sticky vertical sidebar */}
      <aside className="hidden lg:block lg:sticky lg:top-24 self-start space-y-6">
        <div>
          <h3 className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-3">
            <Filter className="w-3 h-3" />
            Categories
          </h3>
          <div className="space-y-0.5">
            <FilterRow active={allActive} count={totalCount} onClick={() => onSelectCategory(null)}>
              All notices
            </FilterRow>
            {categories.map((c) => (
              <FilterRow
                key={c.name}
                active={selectedCategory === c.name}
                count={c.count}
                onClick={() => onSelectCategory(c.name)}
              >
                {c.name}
              </FilterRow>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground mb-3">
            Sort by date
          </h3>
          <div className="space-y-0.5">
            <SortRow active={sortDirection === 'desc'} onClick={() => onChangeSort('desc')}>
              <ArrowDownNarrowWide className="w-3.5 h-3.5" />
              Newest first
            </SortRow>
            <SortRow active={sortDirection === 'asc'} onClick={() => onChangeSort('asc')}>
              <ArrowUpNarrowWide className="w-3.5 h-3.5" />
              Oldest first
            </SortRow>
          </div>
        </div>
      </aside>
    </>
  );
}

function FilterPill({
  active,
  count,
  onClick,
  children,
}: {
  active: boolean;
  count: number;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors',
        active
          ? 'bg-primary text-primary-foreground'
          : 'bg-card border border-border text-foreground hover:bg-muted',
      )}
    >
      {children}
      <span
        className={cn(
          'inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full text-[10px] font-bold',
          active ? 'bg-primary-foreground/20 text-primary-foreground' : 'bg-muted text-muted-foreground',
        )}
      >
        {count}
      </span>
    </button>
  );
}

function FilterRow({
  active,
  count,
  onClick,
  children,
}: {
  active: boolean;
  count: number;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors',
        active
          ? 'bg-primary/10 text-primary font-semibold'
          : 'text-foreground hover:bg-muted',
      )}
    >
      <span>{children}</span>
      <span
        className={cn(
          'text-[11px] font-semibold',
          active ? 'text-primary' : 'text-muted-foreground',
        )}
      >
        {count}
      </span>
    </button>
  );
}

function SortRow({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
        active
          ? 'bg-primary/10 text-primary font-semibold'
          : 'text-foreground hover:bg-muted',
      )}
    >
      {children}
    </button>
  );
}

function SortToggle({
  direction,
  onChange,
}: {
  direction: SortDirection;
  onChange: (d: SortDirection) => void;
}) {
  return (
    <button
      onClick={() => onChange(direction === 'desc' ? 'asc' : 'desc')}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-card border border-border text-foreground hover:bg-muted transition-colors"
    >
      {direction === 'desc' ? (
        <>
          <ArrowDownNarrowWide className="w-3.5 h-3.5" />
          Newest first
        </>
      ) : (
        <>
          <ArrowUpNarrowWide className="w-3.5 h-3.5" />
          Oldest first
        </>
      )}
    </button>
  );
}
