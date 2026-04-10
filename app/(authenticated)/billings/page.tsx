import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';

const bills = [
  { date: '07-12-2025', amount: 'P 192.50', status: 'Unpaid' },
  { date: '07-12-2025', amount: 'P 192.50', status: 'Overdue' },
  { date: '07-12-2025', amount: 'P 192.50', status: 'Paid' },
];

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case 'Paid':
      return 'default';
    case 'Unpaid':
      return 'secondary';
    case 'Overdue':
      return 'destructive';
    default:
      return 'default';
  }
}

function getStatusColor(status: string) {
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

export default function BillingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Bills</h1>
      </div>

      <div className="border border-border rounded-lg bg-card">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-border hover:bg-transparent">
              <TableHead className="text-foreground font-semibold">Payment Date</TableHead>
              <TableHead className="text-foreground font-semibold">Amount</TableHead>
              <TableHead className="text-foreground font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bills.map((bill, index) => (
              <TableRow key={index} className="border-b border-border hover:bg-muted/50">
                <TableCell className="text-foreground">{bill.date}</TableCell>
                <TableCell className="text-foreground">{bill.amount}</TableCell>
                <TableCell>
                  <span className={`text-sm font-medium ${getStatusColor(bill.status)}`}>
                    {bill.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">10</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
