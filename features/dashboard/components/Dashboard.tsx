"use client";
import { Hash } from "lucide-react";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { PageHeader } from "@/components/shared/PageHeader";
import { DashboardStats } from "./DashboardStats";
import { StatusBanner } from "./StatusBanner";
import { CurrentBillCard } from "./CurrentBillCard";
import { QuickActions } from "./QuickActions";
import { AccountSummary } from "./AccountSummary";
import { formatLongDate, getGreeting } from "../utils";

export function Dashboard() {
  const { user, reading, billing, recentReadings, loading } = useDashboard();
  const greeting = getGreeting();
  const firstName = user?.first_name ?? "there";

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${greeting}, ${firstName}`}
        description={formatLongDate()}
        badge={
          user?.account_number ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs text-muted-foreground font-medium whitespace-nowrap">
              <Hash className="w-3.5 h-3.5" />
              Account · {user.account_number}
            </div>
          ) : null
        }
      />

      <StatusBanner billing={billing} />

      <DashboardStats billing={billing} reading={reading} loading={loading} />

      <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
        <div className="lg:col-span-2 space-y-6">
          <CurrentBillCard
            billing={billing}
            reading={reading}
            loading={loading}
          />{" "}
        </div>

        <div className="space-y-6 lg:sticky lg:top-24">
          <AccountSummary user={user} loading={loading} />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
