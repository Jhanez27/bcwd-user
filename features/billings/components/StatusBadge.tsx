import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BillStatus = 'Paid' | 'Unpaid' | 'Overdue' | string;

const variants: Record<string, { icon: React.ReactNode; className: string }> = {
  Paid: {
    icon: <CheckCircle2 className="w-3 h-3" />,
    className:
      'bg-[var(--status-paid-bg)] text-[var(--status-paid)] border border-[var(--status-paid-border)]',
  },
  Unpaid: {
    icon: <Clock className="w-3 h-3" />,
    className:
      'bg-[var(--status-unpaid-bg)] text-[var(--status-unpaid)] border border-[var(--status-unpaid-border)]',
  },
  Overdue: {
    icon: <AlertCircle className="w-3 h-3" />,
    className:
      'bg-[var(--status-overdue-bg)] text-[var(--status-overdue)] border border-[var(--status-overdue-border)]',
  },
};

interface StatusBadgeProps {
  status: BillStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { icon, className } = variants[status] ?? variants.Unpaid;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold',
        className,
      )}
    >
      {icon}
      {status}
    </span>
  );
}