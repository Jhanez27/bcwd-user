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

export const getPaginatedBillings = async (userId: string, page: number, limit: number) => {
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
        .order('due_date', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);
    if (error) throw error;
    return data;
}