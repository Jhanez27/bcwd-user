import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getBillings = async (userId: string) => {
    const { data, error } = await supabase
        .from('billing')
        .select(`
            *,
            meter_reading!inner(
                *,
                meter!inner(consumer_id)
            )
        `)
        .eq('meter_reading.meter.consumer_id', userId)
        .order('due_date', { ascending: false });
    if (error) throw error;
    return data;
}