"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useBills } from '@/features/billings/hooks/useBills';
import { CustomPagination } from '@/components/shared/CustomPagination';
import { getStatusColor } from '@/features/billings/utils/statusColor';
import { Button } from '@/components/ui/button';
import { useBillAction } from '@/features/billings/hooks/useBillAction';
import { Loader2 } from 'lucide-react';

export function Billings() {
  const { billings, currentPage, totalPages, totalItems, itemsPerPage, hasNextPage, handlePageChange } = useBills();
  const { handlePay, isPaying } = useBillAction();
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
              <TableHead className="text-foreground font-semibold">Actions</TableHead>
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
                <TableCell>
                  {bill.status !== 'Paid' ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePay(bill)}
                      disabled={isPaying || bill.status === 'paid'}
                    >
                      {isPaying ? (
                        <>
                          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                          Processing…
                        </>
                      ) : (
                        'Pay via GCash'
                      )}
                    </Button>
                  ) : (
                    <span className="text-sm font-medium text-muted-foreground">No Action</span>
                  )}
                </TableCell>
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
