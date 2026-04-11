import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const updateContact = async (id: number, contact: { phone_number: string }) => {
    const { data, error } = await supabase
        .from("contact")
        .update(contact)
        .eq("consumer_id", id)
        .select()
        .single();
    if (error) throw error;
    return data;
}