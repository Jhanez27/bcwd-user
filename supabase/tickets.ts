import { TicketFormValues } from "@/features/tickets/utils/ticketSchema";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const createTicket = async (ticket: TicketFormValues, consumerId: number) => {
    const { data, error } = await supabase
        .from("ticket")
        .insert({
            ...ticket,
            consumer_id: consumerId,
            ticket_status: "open",
            created_at: new Date(),
            updated_at: new Date()
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}