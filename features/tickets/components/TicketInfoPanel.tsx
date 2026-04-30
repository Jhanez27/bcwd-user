import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Clock, Droplets, Mail, MessageSquare, ShieldCheck } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Submit your ticket',
    desc: 'Fill in the details and we receive your request immediately.',
  },
  {
    icon: Clock,
    title: 'Reviewed within 24 hours',
    desc: 'Our support team prioritizes and assigns your ticket.',
  },
  {
    icon: CheckCircle2,
    title: 'Resolution via email',
    desc: "We'll reach out to your contact email with updates.",
  },
];

export function TicketInfoPanel() {
  return (
    <div className="space-y-4">
      <Card className="border-border bg-primary/5">
        <CardContent className="px-5 pt-6 pb-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm">BCWD Support</p>
              <p className="text-xs text-muted-foreground">We're here to help</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Submit a ticket for any concern about your water service and our team
            will get back to you promptly.
          </p>
        </CardContent>
      </Card>

      <Card className="border-border">
        <CardContent className="px-5 pt-5 pb-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            How it works
          </p>
          <div className="space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px h-6 bg-border mt-1" />
                    )}
                  </div>
                  <div className="pb-5">
                    <p className="text-sm font-medium text-foreground leading-none mb-1">
                      {step.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* <Card className="border-border">
        <CardContent className="px-5 py-4">
          <div className="flex items-start gap-3">
            <Droplets className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-medium text-foreground">For emergencies</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                If you have a major leak or water outage, please call our
                hotline directly for faster response.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
            <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs font-medium text-foreground">Email</p>
              <p className="text-xs text-muted-foreground">support@bcwd.gov.ph</p>
            </div>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
