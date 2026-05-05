import { createClient } from "@/utils/supabase/client";

export const usePaymentAction = () => {
  const supabase = createClient();

  const paymentActionUpdateStatus = async (billId: number, amount: number) => {
    // 1. Update billing table
    const { data: billData, error: billError } = await supabase
      .from("billing")
      .update({ status: "Paid" })
      .eq("id", billId)
      .select()
      .single();

    if (billError) throw billError;

    // 2. Insert into payment table
    const { data: paymentData, error: paymentError } = await supabase
      .from("payment")
      .insert([
        {
          bill_id: billId,
          paid_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (paymentError) throw paymentError;

    return {
      bill: billData,
      payment: paymentData,
    };
  };

  return {
    paymentActionUpdateStatus,
  };
};
