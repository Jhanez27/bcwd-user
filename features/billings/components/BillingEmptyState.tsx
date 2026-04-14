import { Receipt } from 'lucide-react';

export function BillingEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-4">
        <Receipt className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">No bills yet</h3>
      <p className="text-sm text-muted-foreground max-w-xs">
        Your billing records will appear here once your account has been set up.
      </p>
    </div>
  );
}