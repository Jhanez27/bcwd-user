import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Droplets,
  FileText,
  Gauge,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Billing, MeterReading } from "@/features/billings/type";
import { StatusBadge } from "@/features/billings/components/StatusBadge";
import { formatPeso } from "@/features/billings/utils/formatPeso";
import { cn } from "@/lib/utils";

interface CurrentBillCardProps {
  billing?: Billing;
  reading?: MeterReading;
  loading?: boolean;
}

export function CurrentBillCard({ billing, reading, loading }: CurrentBillCardProps) {
  if (loading) {
    return (
      <Card className="border-border animate-pulse">
        <CardHeader className="border-b border-border">
          <div className="h-5 bg-muted rounded w-40" />
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="h-12 bg-muted rounded w-1/2" />
          <div className="h-3 bg-muted rounded w-full" />
          <div className="h-3 bg-muted rounded w-2/3" />
          <div className="h-10 bg-muted rounded w-32" />
        </CardContent>
      </Card>
    );
  }

  if (!billing) {
    return (
      <Card className="border-border">
        <CardContent className="p-8 text-center space-y-2">
          <FileText className="w-8 h-8 mx-auto text-muted-foreground/60" />
          <p className="text-sm font-semibold text-foreground">No billing record yet</p>
          <p className="text-xs text-muted-foreground">Your statement will appear here once issued.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border overflow-hidden">
      <CardHeader className="bg-linear-to-br from-primary/5 to-transparent border-b border-border pb-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div className="pt-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Statement of Account
            </p>
            <CardTitle className="mt-1 text-base sm:text-lg">
              {reading?.billing_period ?? "—"}
            </CardTitle>
          </div>
          <StatusBadge status={billing.status} />
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-5">
        {/* Total amount — focal point */}
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Total Amount Due
          </p>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold tabular-nums text-foreground tracking-tight wrap-break-word">
            {formatPeso(billing.charges)}
          </p>
          {billing.penalty > 0 && (
            <p className="text-xs text-rose-600 font-medium">
              Includes {formatPeso(billing.penalty)} late penalty
            </p>
          )}
        </div>

        {/* Detail grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:gap-x-4 sm:gap-y-4 pt-4 border-t border-border">
          <Detail
            icon={<Gauge className="w-3.5 h-3.5" />}
            label="Previous Reading"
            value={reading?.previous_reading != null ? `${reading.previous_reading} m³` : "—"}
          />
          <Detail
            icon={<Gauge className="w-3.5 h-3.5" />}
            label="Current Reading"
            value={reading?.current_reading != null ? `${reading.current_reading} m³` : "—"}
          />
          <Detail
            icon={<Droplets className="w-3.5 h-3.5" />}
            label="Consumption"
            value={reading?.usage != null ? `${reading.usage} m³` : "—"}
            highlight
          />
          <Detail
            icon={<Calendar className="w-3.5 h-3.5" />}
            label="Due Date"
            value={billing.due_date ? formatShort(billing.due_date) : "—"}
          />
          <Detail
            icon={<Calendar className="w-3.5 h-3.5" />}
            label="Reading Period"
            value={
              reading?.reading_from && reading?.reading_to
                ? `${formatShort(reading.reading_from)} – ${formatShort(reading.reading_to)}`
                : "—"
            }
            className="col-span-2 sm:col-span-1"
          />
          <Detail
            icon={<Calendar className="w-3.5 h-3.5" />}
            label="Disconnection"
            value={billing.disconnection_date ? formatShort(billing.disconnection_date) : "—"}
            tone={billing.disconnection_date ? "danger" : undefined}
            className="col-span-2 sm:col-span-1"
          />
        </div>

        {/* CTA */}
        {billing.status !== "Paid" && (
          <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              Pay online to keep your account in good standing.
            </p>
            <Link
              href="/billings"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Settle bill
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Detail({
  icon,
  label,
  value,
  highlight,
  tone,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
  tone?: "danger";
  className?: string;
}) {
  return (
    <div className={cn("space-y-1 min-w-0", className)}>
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        <span className="text-muted-foreground/70">{icon}</span>
        <span className="truncate">{label}</span>
      </p>
      <p
        className={cn(
          "text-sm font-semibold tabular-nums truncate",
          highlight && "text-primary text-base",
          tone === "danger" && "text-rose-600",
          !highlight && tone !== "danger" && "text-foreground",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function formatShort(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
