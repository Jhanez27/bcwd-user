
export function getStatusColor(status: string) {
  switch (status) {
    case 'Paid':
      return 'text-green-600';
    case 'Unpaid':
      return 'text-primary';
    case 'Overdue':
      return 'text-red-500';
    default:
      return 'text-foreground';
  }
}