import { useEffect, useState } from "react"
import { Billing, MeterReading } from "@/features/billings/type"
import { getCurrentUser } from "@/supabase/user"
import { getBillings } from "@/supabase/bills"
import { getMeterReadings } from "@/supabase/readings"

export const useDashboard = () => {
    const [readings, setReadings] = useState<MeterReading[]>([]);
    const [billings, setBillings] = useState<Billing[]>([]);
    
    useEffect(() => {
        const fetchReadings = async () => {
        const currentUser = await getCurrentUser();
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
    }, []);

    return {
        readings,
        billings
    }
}
