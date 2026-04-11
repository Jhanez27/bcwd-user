import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getProfile = async (id: number) => {
    const { data, error } = await supabase
        .from("consumer")
        .select("*, contact(*)")
        .eq("id", id)
        .single();
    if (error) throw error;
    console.log(data);
    return data;
}

export const updateProfile = async (id: number, data: any) => {
    const { error } = await supabase
        .from("consumer")
        .update(data)
        .eq("id", id);
    if (error) throw error;
}