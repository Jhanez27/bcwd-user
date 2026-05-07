import { Calendar, Droplets, Receipt, ShieldCheck } from "lucide-react";
import { Billing, MeterReading } from "@/features/billings/type";
import { SummaryCard } from "@/components/shared/SummaryCard";
import { CardCarousel } from "@/components/shared/CardCarousel";
import { formatPeso } from "@/features/billings/utils/formatPeso";
import { daysBetween } from "../utils";

interface DashboardStatsProps {
  billing?: Billing;
  reading?: MeterReading;
  loading?: boolean;
}

function StatSkeleton() {
  return (
    <div className="rounded-xl border border-border p-5 bg-card animate-pulse space-y-3">
      <div className="flex items-center justify-between">
        <div className="h-3 w-20 bg-muted rounded-full" />
        <div className="h-9 w-9 rounded-lg bg-muted" />
      </div>
      <div className="h-7 w-2/3 bg-muted rounded" />
    </div>
  );
}

export function DashboardStats({ billing, reading, loading }: DashboardStatsProps) {
  if (loading) {
    return (
      <CardCarousel className="lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: 4 }).map((_, i) => <StatSkeleton key={i} />)}
      </CardCarousel>
    );
  }

  const isPaid = billing?.status === "Paid";
  const days = billing?.due_date ? daysBetween(billing.due_date) : null;

  const dueValue = !billing
    ? "—"
    : isPaid
      ? "Paid"
      : formatPeso(billing.charges);

  const dueLabel = !billing
    ? "No bill on record"
    : isPaid
      ? "All caught up"
      : days !== null && days < 0
        ? `${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} overdue`
        : days !== null
          ? `Due in ${days} day${days === 1 ? "" : "s"}`
          : "Awaiting due date";

  const dueVariant = !billing
    ? "neutral"
    : isPaid
      ? "success"
      : days !== null && days < 0
        ? "danger"
        : days !== null && days <= 7
          ? "warning"
          : "info";

  const statusValue = billing?.status ?? "—";
  const statusVariant = !billing
    ? "neutral"
    : billing.status === "Overdue"
      ? "danger"
      : billing.status === "Unpaid"
        ? "warning"
        : "success";

  return (
    <CardCarousel className="lg:grid-cols-4 gap-3 sm:gap-4">
      <SummaryCard
        label="Amount Due"
        value={dueValue}
        icon={Receipt}
        variant={dueVariant}
        index={0}
      />
      <SummaryCard
        label={dueLabel}
        value={
          billing?.due_date
            ? new Date(billing.due_date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "—"
        }
        icon={Calendar}
        variant={dueVariant === "success" ? "success" : "default"}
        index={1}
      />
      <SummaryCard
        label="Latest Usage"
        value={reading?.usage != null ? `${reading.usage} m³` : "—"}
        icon={Droplets}
        variant="info"
        index={2}
      />
      <SummaryCard
        label="Account Status"
        value={statusValue}
        icon={ShieldCheck}
        variant={statusVariant}
        index={3}
      />
    </CardCarousel>
  );
}
