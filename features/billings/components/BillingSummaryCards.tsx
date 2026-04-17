import { AlertCircle, Clock, CreditCard, Receipt } from 'lucide-react';
import { SummaryCard } from '@/components/shared/SummaryCard';
import { CardCarousel } from '@/components/shared/CardCarousel';
import { formatPeso } from '../utils/formatPeso';
import { ca } from 'date-fns/locale';

interface BillingSummaryCardsProps {
  totalItems: number;
  unpaidCount: number;
  overdueCount: number;
  totalDue: number;
}

export function BillingSummaryCards({
  totalItems,
  unpaidCount,
  overdueCount,
  totalDue,
}: BillingSummaryCardsProps) {
  const cards = [
    {
      label:       'Total Bills',
      value:       totalItems,
      icon:        Receipt,
      tintColor:   '--secondary',
      accentColor: '--primary',
      borderColor: '--border',
      variant:    'default',
    },
    {
      label:       'Unpaid',
      value:       unpaidCount,
      icon:        Clock,
      tintColor:   '--status-unpaid-bg',
      accentColor: '--status-unpaid',
      borderColor: '--status-unpaid-border',
      variant:    'warning',

    },
    {
      label:       'Overdue',
      value:       overdueCount,
      icon:        AlertCircle,
      tintColor:   '--status-overdue-bg',
      accentColor: '--status-overdue',
      borderColor: '--status-overdue-border',
      variant:    'danger',
    },
    {
      label:       'Total Due',
      value:       formatPeso(totalDue),
      icon:        CreditCard,
      tintColor:   '--status-warning-bg',
      accentColor: '--status-warning',
      borderColor: '--status-warning-border',
      variant:    'info',

    },
  ] as const;

  return (
    <CardCarousel className="lg:grid hidden lg:grid-cols-4 gap-3">
      {cards.map((card, i) => (
        <SummaryCard 
        key={card.label} 
        label={card.label} 
        value={card.value} 
        icon={card.icon} 
        index={i}
        variant={card.variant} />
      ))}
    </CardCarousel>
  );
}