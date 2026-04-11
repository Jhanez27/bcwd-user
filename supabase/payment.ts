import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getPayments = async (userId: string) => {
    const { data, error } = await supabase
        .from('payment')
        .select(`
            *,
            billing!inner(
                *,
                meter_reading!inner(
                    *,
                    meter!inner(consumer_id)
                )
            )
        `)
        .eq('billing.meter_reading.meter.consumer_id', userId)
        .order('payment_date', { ascending: false });
    if (error) throw error;
    return data;
}

export const getPaginatedPayments = async (userId: string, page: number, limit: number) => {
    const { data, error } = await supabase
        .from('payment')
        .select(`
            *,
            billing!inner(
                *,
                meter_reading!inner(
                    *,
                    meter!inner(consumer_id)
                )
            )
        `)
        .eq('billing.meter_reading.meter.consumer_id', userId)
        .order('paid_at', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);
    if (error) throw error;
    return data;
}