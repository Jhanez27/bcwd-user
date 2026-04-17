import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PaymentHistoryRow } from './PaymentHistoryRow';
import { PaymentHistoryEmptyState } from './PaymentHistoryEmptyState';
import type { BillPayment } from '../type';

interface PaymentHistoryTableProps {
  payments: BillPayment[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export function PaymentHistoryTable({
  payments,
  currentPage,
  itemsPerPage,
  totalItems,
}: PaymentHistoryTableProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border gap-2">
        <h2 className="text-sm font-semibold text-foreground">Payment Records</h2>
        {payments.length > 0 && (
          <span className="text-xs text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1}–
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
          </span>
        )}
      </div>

      {payments.length === 0 ? (
        <PaymentHistoryEmptyState />
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold px-5 py-3">
                Payment Date
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold py-3">
                Amount
              </TableHead>
              {/* <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold py-3">
                OR Number
              </TableHead> */}
            </TableRow>
          </TableHeader>

          <TableBody>
            {payments.map((payment, index) => (
              <PaymentHistoryRow key={index} payment={payment} />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
