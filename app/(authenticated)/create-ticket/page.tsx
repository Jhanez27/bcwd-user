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

export default function CreateTicketPage() {
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
          <form className="space-y-6">
            {/* Subject */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Subject</label>
              <Input
                type="text"
                placeholder="Brief description of your issue"
                className="h-10"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category</label>
              <Select>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="billing">Billing Issue</SelectItem>
                  <SelectItem value="payment">Payment Problem</SelectItem>
                  <SelectItem value="account">Account Issue</SelectItem>
                  <SelectItem value="technical">Technical Problem</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Priority</label>
              <Select>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select priority level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea
                placeholder="Please provide detailed information about your issue..."
                className="min-h-32"
              />
            </div>

            {/* Contact Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Contact Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                className="h-10"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Submit Ticket
              </Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
