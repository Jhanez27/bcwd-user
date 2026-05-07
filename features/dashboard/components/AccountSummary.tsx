import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Gauge, Hash } from "lucide-react";

interface AccountSummaryProps {
  user?: any;
  loading?: boolean;
}

export function AccountSummary({ user, loading }: AccountSummaryProps) {
  if (loading) {
    return (
      <Card className="border-border overflow-hidden animate-pulse">
        <div className="bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-4 sm:p-5 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-2.5 w-24 bg-muted rounded-full" />
              <div className="h-3.5 w-32 bg-muted rounded" />
            </div>
          </div>
        </div>
        <CardContent className="p-4 sm:p-5 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="h-3 w-16 bg-muted rounded" />
            <div className="h-3 w-20 bg-muted rounded" />
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="h-3 w-16 bg-muted rounded" />
            <div className="h-3 w-24 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const meter = user?.meter;
  const initials =
    `${user?.first_name?.[0] ?? ""}${user?.last_name?.[0] ?? ""}`.toUpperCase() || "?";

  return (
    <Card className="border-border overflow-hidden">
      <div className="bg-linear-to-br from-primary/10 via-primary/5 to-transparent p-4 sm:p-5 pb-4 border-b border-border">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="w-12 h-12 ring-2 ring-background shadow-sm shrink-0">
            <AvatarImage src={user?.avatar_url} />
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Account holder
            </p>
            <p className="text-sm font-bold text-foreground truncate">
              {user?.first_name || user?.last_name
                ? `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim()
                : "—"}
            </p>
          </div>
        </div>
      </div>
      <CardContent className="p-4 sm:p-5 space-y-3 text-sm">
        <Row icon={<Hash className="w-3.5 h-3.5" />} label="Account #">
          <span className="font-mono">{user?.account_number ?? "—"}</span>
        </Row>
        <Row icon={<Gauge className="w-3.5 h-3.5" />} label="Meter">
          <span className="truncate">
            {meter?.brand
              ? `${meter.brand}${meter.size ? ` · ${meter.size}"` : ""}`
              : "—"}
          </span>
        </Row>
      </CardContent>
    </Card>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 min-w-0">
      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
        <span className="text-muted-foreground/70">{icon}</span>
        {label}
      </span>
      <span className="text-foreground font-semibold text-right truncate">{children}</span>
    </div>
  );
}
