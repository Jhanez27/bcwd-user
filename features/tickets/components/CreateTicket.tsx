"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useTicketsAction } from '@/features/tickets/hooks/useTicketsAction';
import { useForm, Controller } from 'react-hook-form';
import { TicketFormValues, ticketSchema } from '@/features/tickets/utils/ticketSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { TicketCategory, TicketPriority } from '@/features/tickets/const';
import { toast } from 'sonner';

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
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Create Support Ticket</h1>
        <p className="text-muted-foreground mt-2">
          Need help? Submit a ticket and our support team will assist you shortly.
        </p>
      </div>

      <Card className="border-border">
        <CardHeader>
          <CardTitle>New Support Ticket</CardTitle>
          <CardDescription>
            Fill in the details below to create a support ticket
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Subject</label>
              <Input
                type="text"
                placeholder="Brief description of your issue"
                className="h-10"
                {...form.register("subject")}
              />
              {form.formState.errors.subject && (
                <p className="text-sm text-red-500">{form.formState.errors.subject.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category</label>
              <Controller
                control={form.control}
                name="category"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(TicketCategory).map(([key, value]) => (
                        <SelectItem key={key} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Priority</label>
              <Controller
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(TicketPriority).map(([key, value]) => (
                        <SelectItem key={key} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea
                placeholder="Please provide detailed information about your issue..."
                className="min-h-32"
                {...form.register("description")}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Contact Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                className="h-10"
                {...form.register("contact_email")}
              />
              {form.formState.errors.contact_email && (
                <p className="text-sm text-red-500">{form.formState.errors.contact_email.message}</p>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading} className="bg-primary hover:bg-primary/90 text-primary-foreground">
                {loading ? "Submitting..." : "Submit Ticket"}
              </Button>
              <Button type="button" variant="outline" onClick={() => form.reset()}>
                Cancel
              </Button>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-500">Ticket submitted successfully!</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
