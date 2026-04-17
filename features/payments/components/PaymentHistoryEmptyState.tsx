import { FileText } from 'lucide-react';

export function PaymentHistoryEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-5">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
        <FileText className="w-6 h-6 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">No payments yet</h3>
      <p className="text-sm text-muted-foreground text-center max-w-xs">
        Your payment history will appear here once you make a payment.
      </p>
    </div>
  );
}
