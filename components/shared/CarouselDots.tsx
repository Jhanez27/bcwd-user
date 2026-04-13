import { cn } from '@/lib/utils';

interface CarouselDotsProps {
  total: number;
  active: number;
  onDotClick: (index: number) => void;
  className?: string;
}

export function CarouselDots({ total, active, onDotClick, className }: CarouselDotsProps) {
  return (
    <div className={cn('flex items-center justify-center gap-1.5', className)}>
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          aria-label={`Go to item ${i + 1}`}
          className={cn(
            'rounded-full transition-all duration-200',
            i === active
              ? 'w-4 h-1.5 bg-primary'
              : 'w-1.5 h-1.5 bg-border hover:bg-muted-foreground',
          )}
        />
      ))}
    </div>
  );
}