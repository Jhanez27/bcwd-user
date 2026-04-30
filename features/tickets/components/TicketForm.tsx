import { Controller, UseFormReturn } from 'react-hook-form';
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
import { TicketCategory, TicketPriority } from '@/features/tickets/const';
import { TicketFormValues } from '@/features/tickets/utils/ticketSchema';
import { TicketFormField } from './TicketFormField';
import { cn } from '@/lib/utils';
import {
  Droplets,
  FlaskConical,
  Gauge,
  HelpCircle,
  Loader2,
  Receipt,
  SendHorizonal,
} from 'lucide-react';

const categoryIcons = {
  [TicketCategory.METER_ISSUE]: Gauge,
  [TicketCategory.BILLING_ISSUE]: Receipt,
  [TicketCategory.LEAKAGE]: Droplets,
  [TicketCategory.WATER_QUALITY]: FlaskConical,
  [TicketCategory.OTHER]: HelpCircle,
} as const;

const priorityConfig = {
  [TicketPriority.LOW]: {
    active: 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
    inactive: 'border-border text-muted-foreground hover:border-emerald-300 hover:text-emerald-600',
  },
  [TicketPriority.MEDIUM]: {
    active: 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300',
    inactive: 'border-border text-muted-foreground hover:border-amber-300 hover:text-amber-600',
  },
  [TicketPriority.HIGH]: {
    active: 'border-orange-500 bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300',
    inactive: 'border-border text-muted-foreground hover:border-orange-300 hover:text-orange-600',
  },
  [TicketPriority.URGENT]: {
    active: 'border-red-500 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300',
    inactive: 'border-border text-muted-foreground hover:border-red-300 hover:text-red-600',
  },
} as const;

interface TicketFormProps {
  form: UseFormReturn<TicketFormValues>;
  onSubmit: (data: TicketFormValues) => void;
  loading: boolean;
  error?: string | null;
  success?: boolean;
}

export function TicketForm({ form, onSubmit, loading }: TicketFormProps) {
  return (
    <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
      <TicketFormField label="Subject" error={form.formState.errors.subject?.message} required>
        <Input
          type="text"
          placeholder="Brief description of your issue"
          className="h-10"
          {...form.register('subject')}
        />
      </TicketFormField>

      <TicketFormField label="Category">
        <Controller
          control={form.control}
          name="category"
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(TicketCategory).map(([key, value]) => {
                  const Icon = categoryIcons[value as keyof typeof categoryIcons];
                  return (
                    <SelectItem key={key} value={value}>
                      <span className="flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                        {value}
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        />
      </TicketFormField>

      <TicketFormField label="Priority" hint="Select the urgency level of your issue">
        <Controller
          control={form.control}
          name="priority"
          render={({ field }) => (
            <div className="grid grid-cols-4 gap-2">
              {Object.values(TicketPriority).map((value) => {
                const cfg = priorityConfig[value as keyof typeof priorityConfig];
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => field.onChange(value)}
                    className={cn(
                      'h-9 rounded-lg border text-xs font-semibold transition-all',
                      field.value === value ? cfg.active : cfg.inactive
                    )}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          )}
        />
      </TicketFormField>

      <TicketFormField
        label="Description"
        error={form.formState.errors.description?.message}
        required
      >
        <Textarea
          placeholder="Please provide detailed information about your issue — the more detail you include, the faster we can help."
          className="min-h-32 resize-none"
          {...form.register('description')}
        />
      </TicketFormField>

      <TicketFormField
        label="Contact Email"
        error={form.formState.errors.contact_email?.message}
        hint="We'll send updates and resolution details to this address"
        required
      >
        <Input
          type="email"
          placeholder="your@email.com"
          className="h-10"
          {...form.register('contact_email')}
        />
      </TicketFormField>

      <div className="flex items-center gap-3 pt-3 border-t border-border">
        <Button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <SendHorizonal className="h-4 w-4" />
              Submit Ticket
            </>
          )}
        </Button>
        <Button type="button" variant="ghost" className="text-muted-foreground" onClick={() => form.reset()}>
          Clear form
        </Button>
      </div>
    </form>
  );
}
