"use client";

import { CreditCard } from 'lucide-react';
import { usePayment } from '@/features/payments/hooks/usePayment';
import { CustomPagination } from '@/components/shared/CustomPagination';
import { PageHeader } from '@/components/shared/PageHeader';
import { PaymentHistoryTable } from './PaymentHistoryTable';

export function PaymentHistory() {
  const {
    payments,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    handlePageChange,
  } = usePayment();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payment History"
        description="View your payment records and transaction details"
        badge={
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs text-muted-foreground font-medium whitespace-nowrap">
            <CreditCard className="w-3.5 h-3.5" />
            {totalItems} {totalItems === 1 ? 'payment' : 'payments'}
          </div>
        }
      />

      <PaymentHistoryTable
        payments={payments}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
      />

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
