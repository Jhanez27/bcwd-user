import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* Statement of Account */}
      <div className="bg-gradient-to-r from-secondary/50 to-accent/50 rounded-lg p-6 border border-secondary/30">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">Statement of Account</h2>
            <p className="text-muted-foreground">January 2026</p>
          </div>
          <div className="bg-accent/40 rounded-full p-4">
            <FileText className="h-8 w-8 text-primary" />
          </div>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Readings Card */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Readings
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="font-medium text-foreground">From:</span>
              <span className="text-muted-foreground">08-02-2025</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="font-medium text-foreground">To:</span>
              <span className="text-muted-foreground">09-02-2025</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="font-medium text-foreground">Prev:</span>
              <span className="text-muted-foreground">991</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="font-medium text-foreground">Curr:</span>
              <span className="text-muted-foreground">998</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium text-foreground">Usage:</span>
              <span className="text-muted-foreground">8</span>
            </div>
          </CardContent>
        </Card>

        {/* Due Dates and Amount */}
        <div className="space-y-4">
          <Card className="border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Due Dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="font-medium text-foreground">Due Date:</span>
                <span className="text-muted-foreground">08-02-2025</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium text-foreground">Disconnection:</span>
                <span className="text-muted-foreground">09-02-2025</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="font-medium">Total Amount Due:</span>
                </div>
                <span className="text-2xl font-bold text-primary">230.50</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
