import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type SummaryVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

interface SummaryCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  variant?: SummaryVariant;
  index?: number;
  className?: string;
}

const variantStyles = {
  default: {
    tint: "from-primary/10 to-transparent",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    border: "border-border",
  },
  success: {
    tint: "from-emerald-200/40 to-transparent",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    border: "border-emerald-200",
  },
  warning: {
    tint: "from-amber-200/40 to-transparent",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    border: "border-amber-200",
  },
  danger: {
    tint: "from-rose-200/40 to-transparent",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    border: "border-rose-200",
  },
  info: {
    tint: "from-sky-200/40 to-transparent",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    border: "border-sky-200",
  },
  neutral: {
    tint: "from-slate-200/40 to-transparent",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
    border: "border-slate-200",
  },
};

export function SummaryCard({
  label,
  value,
  icon: Icon,
  variant = "default",
  index = 0,
  className,
}: SummaryCardProps) {
  const styles = variantStyles[variant];

  return (
    <Card
      className={cn(
        "relative overflow-hidden group",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-px hover:shadow-sm",
        "animate-in fade-in slide-in-from-bottom-2",
        styles.border,
        className,
      )}
      style={{
        animationDelay: `${index * 75}ms`,
        animationFillMode: "both",
      }}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-linear-to-br opacity-70",
          styles.tint,
        )}
      />

      {/* Glow */}
      <div
        className={cn(
          "pointer-events-none absolute -top-6 -right-6 h-16 w-16 rounded-full blur-2xl opacity-10",
          styles.iconBg,
        )}
      />

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xs font-bold uppercase tracking-widest group-hover:text-muted-foreground transition-colors duration-300 text-muted-foreground truncate leading-none">
          {label}
        </CardTitle>
        <div
          className={cn(
            "shrink-0 flex items-center justify-center rounded-lg",
            "h-9 w-9",
            styles.iconBg
          )}
        >
          <Icon className={cn("h-4 w-4", styles.iconColor)} />
        </div>
        </CardHeader>

        <CardContent
          className={cn(
            "mt-1 font-bold leading-none tabular-nums tracking-tight truncate",
            styles.iconColor,
          )}
          style={{
            fontSize: "clamp(1.05rem, 2.5vw, 1.35rem)",
          }}
        >
          <div className={cn(
              "text-3xl font-bold tracking-tight",
              "bg-linear-to-br from-foreground to-foreground/80 bg-clip-text text-transparent",
              "transition-all duration-300 group-hover:scale-105"
            )}>
              {value}
            </div>
        </CardContent>      
    </Card>
  );
}
