"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Ticket } from 'lucide-react';
import { useTicketsAction } from '@/features/tickets/hooks/useTicketsAction';
import { useForm } from 'react-hook-form';
import { TicketFormValues, ticketSchema } from '@/features/tickets/utils/ticketSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { TicketCategory, TicketPriority } from '@/features/tickets/const';
import { PageHeader } from '@/components/shared/PageHeader';
import { toast } from 'sonner';
import { TicketForm } from './TicketForm';
import { TicketInfoPanel } from './TicketInfoPanel';

export function CreateTicket() {
  const { createTicketAction, loading, error, success } = useTicketsAction();

  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      subject: "",
      category: TicketCategory.BILLING_ISSUE,
      priority: TicketPriority.MEDIUM,
      description: "",
      contact_email: ""
    }
  });

  const handleSubmit = (data: TicketFormValues) => {
    createTicketAction(data);
    if (success) {
      form.reset();
      toast.success("Ticket created successfully!");
    }
    if (error) {
      toast.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Support Ticket"
        description="Need help? Submit a ticket and our support team will assist you."
        badge={
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-xs text-muted-foreground font-medium whitespace-nowrap">
            <Ticket className="w-3.5 h-3.5" />
            Support
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-5 lg:gap-8 lg:items-start">
        <div className="lg:col-span-2 lg:sticky lg:top-24">
          <TicketInfoPanel />
        </div>

        <Card className="border-border lg:col-span-3">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">New Support Ticket</CardTitle>
            <CardDescription>
              Fields marked with <span className="text-red-500">*</span> are required
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TicketForm
              form={form}
              onSubmit={handleSubmit}
              loading={loading}
              error={error}
              success={success}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
