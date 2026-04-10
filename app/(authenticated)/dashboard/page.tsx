"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Billing, MeterReading } from '@/features/billings/type';
import { getBillings } from '@/supabase/bills';
import { getLatestMeterReading, getMeterReadings } from '@/supabase/readings';
import { getCurrentUser } from '@/supabase/user';
import { FileText } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [readings, setReadings] = useState<MeterReading[]>([]);
  const [billings, setBillings] = useState<Billing[]>([]);
  
  useEffect(() => {
    const fetchReadings = async () => {
      const currentUser = await getCurrentUser();
      console.log(currentUser);
      const readings = await getMeterReadings(currentUser.consumer_id) as MeterReading[];
      setReadings(readings);
    }
    const fetchBillings = async () => {
      const currentUser = await getCurrentUser();
      const billing = await getBillings(currentUser.consumer_id) as Billing[];
      setBillings(billing);
    }
    fetchReadings();
    fetchBillings();
    console.log(billings)
    console.log(readings)
  }, []);
  console.log(billings)
  console.log(readings)
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
            {readings.map((reading) => (
              <>
                <div key={reading.id} className="flex flex-col justify-between py-2 border-b border-border">
                  <span className="font-medium text-foreground">From:</span>
                  <span className="text-muted-foreground">{new Date(reading.reading_from).toLocaleDateString()}</span>
                </div>

                <div className="flex justify-between py-2 border-b border-border">
                  <span className="font-medium text-foreground">To:</span>
                  <span className="text-muted-foreground">{new Date(reading.reading_to).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="font-medium text-foreground">Previous Reading:</span>
                  <span className="text-muted-foreground">{reading.previous_reading}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="font-medium text-foreground">Current Reading:</span>
                  <span className="text-muted-foreground">{reading.current_reading}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium text-foreground">Usage:</span>
                  <span className="text-muted-foreground">{reading.usage}</span>
                </div>
            </>
            ))}
            
          </CardContent>
        </Card>

        {/* Due Dates and Amount */}
        <div className="space-y-4">
          <Card className="border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Due Dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {billings.map((billing) => (
                <>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="font-medium text-foreground">Due Date:</span>
                    <span className="text-muted-foreground">{new Date(billing.due_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-foreground">Disconnection:</span>
                    <span className="text-muted-foreground">{new Date(billing.disconnection_date).toLocaleDateString()}</span>
                  </div>
                </>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span className="font-medium">Total Amount Due:</span>
                </div>
                <span className="text-2xl font-bold text-primary">{billings.reduce((acc, billing) => acc + billing.charges, 0)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
