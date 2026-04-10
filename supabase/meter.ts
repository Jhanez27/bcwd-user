import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getMeterSizes = async () => {
    console.log('Fetching meter sizes...');
    const { data, error } = await supabase
    .from('meter_size')
    .select('*');

    console.log('Meter sizes:', data);

    if(error) {
        throw error;
    }

    return data;
}