"use client";
import { CustomPagination } from '@/components/shared/CustomPagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { usePayment } from '@/features/payments/hooks/usePayment';

export function PaymentHistory() {
  const { payments, currentPage, totalPages, totalItems, itemsPerPage, hasNextPage, handlePageChange } = usePayment();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Payment History</h1>
      </div>

      <div className="border border-border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="text-foreground font-semibold">Payment Date</TableHead>
              <TableHead className="text-foreground font-semibold">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment, index) => (
              <TableRow key={index} className="border-b border-border hover:bg-muted/50">
                <TableCell className="text-foreground">{new Date(payment.paid_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-foreground">{payment.billing.charges}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
