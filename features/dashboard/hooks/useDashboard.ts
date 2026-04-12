import { useEffect, useState } from "react"
import { Billing, MeterReading } from "@/features/billings/type"
import { getCurrentUser } from "@/supabase/user"
import { getLatestBilling } from "@/supabase/bills"
import { getLatestMeterReading, getMeterReadings } from "@/supabase/readings"

export const useDashboard = () => {
    const [reading, setReading] = useState<MeterReading>();
    const [billing, setBilling] = useState<Billing>();
    
    useEffect(() => {
        const fetchReadings = async () => {
            const currentUser = await getCurrentUser();
            const reading = await getLatestMeterReading(currentUser.consumer_id) as MeterReading;
            setReading(reading);
        }
        const fetchBillings = async () => {
            const currentUser = await getCurrentUser();
            const billing = await getLatestBilling(currentUser.consumer_id) as Billing;
            setBilling(billing);
        }
        fetchReadings();
        fetchBillings();
    }, []);

    return {
        reading,
        billing
    }
}
