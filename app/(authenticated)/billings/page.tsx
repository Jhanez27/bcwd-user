"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useBills } from '@/features/billings/hooks/useBills';
import { Pagination } from '@/components/shared/Paganation';
import { getStatusColor } from '@/features/billings/utils/statusColor';

export default function BillingsPage() {
  const { billings, currentPage, totalPages, totalItems, itemsPerPage, hasNextPage, handlePageChange } = useBills();
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Bills</h1>
      </div>

      <div className="border border-border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="text-foreground font-semibold">Due Date</TableHead>
              <TableHead className="text-foreground font-semibold">Amount</TableHead>
              <TableHead className="text-foreground font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {billings.map((bill, index) => (
              <TableRow key={index} className="border-b border-border hover:bg-muted/50">
                <TableCell className="text-foreground">{new Date(bill.due_date).toLocaleDateString()}</TableCell>
                <TableCell className="text-foreground">{bill.charges}</TableCell>
                <TableCell>
                  <span className={`text-sm font-medium ${getStatusColor(bill.status)}`}>
                    {bill.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
          <Pagination
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
