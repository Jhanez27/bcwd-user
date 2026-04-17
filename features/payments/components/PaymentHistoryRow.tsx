import { TableCell, TableRow } from '@/components/ui/table';
import type { BillPayment } from '../type';

interface PaymentHistoryRowProps {
  payment: BillPayment;
}

export function PaymentHistoryRow({ payment }: PaymentHistoryRowProps) {
  const paidDate = new Date(payment.paid_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const amount = typeof payment.billing.charges === 'number'
    ? `₱${payment.billing.charges.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : payment.billing.charges;

  return (
    <TableRow className="border-b border-border hover:bg-muted/50">
      <TableCell className="text-foreground font-medium px-5">{paidDate}</TableCell>
      <TableCell className="text-foreground font-medium">{amount}</TableCell>
      <TableCell className="text-foreground text-xs text-muted-foreground">
        {payment.or_number}
      </TableCell>
    </TableRow>
  );
}
