import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BillingTableRow } from './BillingTableRow';
import { BillingEmptyState } from './BillingEmptyState';
import type { Billing } from '../type';

interface BillingTableProps {
  billings: Billing[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  isPaying: boolean;
  onPay: (bill: Billing) => void;
}

export function BillingTable({
  billings,
  currentPage,
  itemsPerPage,
  totalItems,
  isPaying,
  onPay,
}: BillingTableProps) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">

      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border gap-2">
        <h2 className="text-sm font-semibold text-foreground">Billing Records</h2>
        {billings.length > 0 && (
          <span className="text-xs text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1}–
            {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
          </span>
        )}
      </div>

      {billings.length === 0 ? (
        <BillingEmptyState />
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold px-5 py-3">
                Due Date
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold py-3">
                Amount
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold py-3">
                Status
              </TableHead>
              <TableHead className="text-xs uppercase tracking-wider text-muted-foreground font-semibold py-3 text-right pr-5">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {billings.map((bill, index) => (
              <BillingTableRow
                key={index}
                bill={bill}
                isPaying={isPaying}
                onPay={onPay}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}