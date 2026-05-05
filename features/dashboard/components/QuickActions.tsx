import Link from "next/link";
import { ArrowRight, CreditCard, FileText, Megaphone, Ticket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const actions = [
  {
    href: "/billings",
    label: "View All Bills",
    description: "See past statements",
    icon: FileText,
    tone: "primary" as const,
  },
  {
    href: "/payment-history",
    label: "Payment History",
    description: "Review your payments",
    icon: CreditCard,
    tone: "info" as const,
  },
  {
    href: "/create-ticket",
    label: "Submit a Ticket",
    description: "Report an issue or leak",
    icon: Ticket,
    tone: "warning" as const,
  },
  {
    href: "/announcement",
    label: "Announcements",
    description: "BCWD updates & notices",
    icon: Megaphone,
    tone: "success" as const,
  },
];

const toneStyles = {
  primary: "bg-primary/10 text-primary",
  info: "bg-sky-100 text-sky-700",
  warning: "bg-amber-100 text-amber-700",
  success: "bg-emerald-100 text-emerald-700",
};

export function QuickActions() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:gap-1">
          {actions.map(({ href, label, description, icon: Icon, tone }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/60 transition-colors min-w-0"
            >
              <div
                className={cn(
                  "shrink-0 w-9 h-9 rounded-lg flex items-center justify-center",
                  toneStyles[tone],
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors leading-tight truncate">
                  {label}
                </p>
                <p className="hidden lg:block text-xs text-muted-foreground truncate">
                  {description}
                </p>
              </div>
              <ArrowRight className="hidden lg:block w-4 h-4 text-muted-foreground/60 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
