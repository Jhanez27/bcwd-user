import { TableCell, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CheckCircle2, CreditCard, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatusBadge } from './StatusBadge';
import { formatPeso } from '../utils/formatPeso';
import type { Billing } from '../type';

interface BillingTableRowProps {
  bill: Billing;
  isPaying: boolean;
  onPay: (bill: Billing) => void;
}

export function BillingTableRow({ bill, isPaying, onPay }: BillingTableRowProps) {
  const isOverdue = bill.status === 'Overdue';
  const isPaid = bill.status === 'Paid';

  return (
    <TableRow
      className={cn(
        'border-b border-border transition-colors hover:bg-muted/40',
        isOverdue && 'bg-[var(--status-overdue-bg)]/30 hover:bg-[var(--status-overdue-bg)]/50',
      )}
    >
      <TableCell className="px-5 py-3.5">
        <span className="text-sm text-foreground font-medium tabular-nums">
          {new Date(bill.due_date).toLocaleDateString('en-PH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </TableCell>

      <TableCell className="py-3.5">
        <span className="text-sm font-semibold text-foreground tabular-nums">
          {formatPeso(bill.charges)}
        </span>
      </TableCell>

      <TableCell className="py-3.5">
        <StatusBadge status={bill.status} />
      </TableCell>

      <TableCell className="py-3.5 text-right pr-5">
        {!isPaid ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => onPay(bill)}
            disabled={isPaying}
            className={cn(
              'text-xs h-7 px-3 gap-1.5 font-medium',
              isOverdue &&
                'border-[var(--status-overdue-border)] text-[var(--status-overdue)] hover:bg-[var(--status-overdue-bg)]',
            )}
          >
            {isPaying ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                Processing…
              </>
            ) : (
              <>
                <CreditCard className="h-3 w-3" />
                Pay via GCash
              </>
            )}
          </Button>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--status-paid)]" />
            Settled
          </span>
        )}
      </TableCell>
    </TableRow>
  );
}