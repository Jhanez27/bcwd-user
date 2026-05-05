import Link from "next/link";
import { ArrowRight, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Billing } from "@/features/billings/type";
import { formatPeso } from "@/features/billings/utils/formatPeso";
import { daysBetween } from "../utils";
import { cn } from "@/lib/utils";

export function StatusBanner({ billing }: { billing?: Billing }) {
  if (!billing) return null;

  const isPaid = billing.status === "Paid";
  const isOverdue = billing.status === "Overdue";
  const days = billing.due_date ? daysBetween(billing.due_date) : null;
  const dueSoon = days !== null && days >= 0 && days <= 7;

  if (isPaid) {
    return (
      <Banner
        tone="success"
        icon={<CheckCircle2 className="w-5 h-5" />}
        title="You're all caught up"
        message="No pending balance. Thanks for keeping your account in good standing."
      />
    );
  }

  if (isOverdue) {
    return (
      <Banner
        tone="danger"
        icon={<AlertCircle className="w-5 h-5" />}
        title={`Payment overdue · ${formatPeso(billing.charges)}`}
        message={
          billing.disconnection_date
            ? `Settle to avoid disconnection on ${new Date(billing.disconnection_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}.`
            : "Please settle your balance immediately to avoid penalties."
        }
        cta={{ href: "/billings", label: "Pay now" }}
      />
    );
  }

  if (dueSoon) {
    return (
      <Banner
        tone="warning"
        icon={<Clock className="w-5 h-5" />}
        title={`${formatPeso(billing.charges)} due in ${days} ${days === 1 ? "day" : "days"}`}
        message={`Payment due on ${new Date(billing.due_date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}.`}
        cta={{ href: "/billings", label: "Pay now" }}
      />
    );
  }

  return null;
}

function Banner({
  tone,
  icon,
  title,
  message,
  cta,
}: {
  tone: "success" | "warning" | "danger";
  icon: React.ReactNode;
  title: string;
  message: string;
  cta?: { href: string; label: string };
}) {
  const styles = {
    success: {
      wrap: "bg-emerald-50 border-emerald-200",
      icon: "bg-emerald-100 text-emerald-700",
      title: "text-emerald-900",
      msg: "text-emerald-800/80",
      btn: "bg-emerald-600 text-white hover:bg-emerald-700",
    },
    warning: {
      wrap: "bg-amber-50 border-amber-200",
      icon: "bg-amber-100 text-amber-700",
      title: "text-amber-900",
      msg: "text-amber-800/80",
      btn: "bg-amber-600 text-white hover:bg-amber-700",
    },
    danger: {
      wrap: "bg-rose-50 border-rose-200",
      icon: "bg-rose-100 text-rose-700",
      title: "text-rose-900",
      msg: "text-rose-800/80",
      btn: "bg-rose-600 text-white hover:bg-rose-700",
    },
  }[tone];

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border p-4 sm:p-5",
        styles.wrap,
      )}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div
          className={cn(
            "shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
            styles.icon,
          )}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className={cn("text-sm font-bold", styles.title)}>{title}</p>
          <p className={cn("text-xs sm:text-sm mt-0.5 leading-relaxed", styles.msg)}>{message}</p>
        </div>
      </div>
      {cta && (
        <Link
          href={cta.href}
          className={cn(
            "inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0 self-start sm:self-auto",
            styles.btn,
          )}
        >
          {cta.label}
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
