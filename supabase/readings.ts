import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getLatestMeterReading = async (userId: string) => {
    const { data, error } = await supabase
        .from('meter_reading')
        .select(`
            *,
            meter!inner(consumer_id)
        `)
        .eq('meter.consumer_id', userId)
        .order('added_at', { ascending: false })
        .limit(1)
        .maybeSingle();
    if (error) throw error;
    return data;
}

export const getMeterReadings = async (userId: string) => {
    const { data, error } = await supabase
        .from('meter_reading')
        .select(`
            *,
            meter!inner(consumer_id)
        `)
        .eq('meter.consumer_id', userId)
        .order('added_at', { ascending: false });
    if (error) throw error;
    return data;
}

export const getPaginatedMeterReadings = async (userId: string, page: number, limit: number) => {
    const { data, error } = await supabase
        .from('meter_reading')
        .select(`
            *,
            meter!inner(consumer_id)
        `)
        .eq('meter.consumer_id', userId)
        .order('added_at', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);
    if (error) throw error;
    return data;
}

