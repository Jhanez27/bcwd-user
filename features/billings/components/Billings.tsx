"use client";

import { FileText } from 'lucide-react';
import { useBills } from '@/features/billings/hooks/useBills';
import { useBillAction } from '@/features/billings/hooks/useBillAction';
import { CustomPagination } from '@/components/shared/CustomPagination';
import { PageHeader } from '@/components/shared/PageHeader';
import { BillingSummaryCards } from './BillingSummaryCards';
import { BillingTable } from './BillingTable';

export function Billings() {
  const {
    billings,
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    handlePageChange,
  } = useBills();

  const { handlePay, isPaying } = useBillAction();

  const unpaidCount  = billings.filter((b) => b.status === 'Unpaid').length;
  const overdueCount = billings.filter((b) => b.status === 'Overdue').length;
  const totalDue     = billings
    .filter((b) => b.status !== 'Paid')
    .reduce((sum, b) => sum + b.charges, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Billings"
        description="Manage and track your water billing records"
        badge={
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs text-muted-foreground font-medium whitespace-nowrap">
            <FileText className="w-3.5 h-3.5" />
            {totalItems} {totalItems === 1 ? 'record' : 'records'}
          </div>
        }
      />

      {/*For future use*/}
      {/* <BillingSummaryCards
        totalItems={totalItems}
        unpaidCount={unpaidCount}
        overdueCount={overdueCount}
        totalDue={totalDue}
      /> */}

      <BillingTable
        billings={billings}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        isPaying={isPaying}
        onPay={handlePay}
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