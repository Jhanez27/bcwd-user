import { createClient } from "@/utils/supabase/client";

export const usePaymentAction = () => {
    const supabase = createClient();
    const paymentActionUpdateStatus = async (billId: number) => {
        const { data, error } = await supabase
            .from('billing')
            .update({ status: 'Paid' })
            .eq('id', billId);
        if (error) throw error;
        return data;
    }   

    return {
        paymentActionUpdateStatus
    }
}