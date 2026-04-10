import { createClient } from "@/utils/supabase/server";
import { SignUpFormValues } from "@/features/authentication/types";

export const verifyAccountDetails = async (data: SignUpFormValues) => {
    const supabase = await createClient();
    const { data: consumer, error } = await supabase
    .from('consumer')
    .select('*')
    .eq('account_number', data.accountNumber)
    .eq('last_name', data.lastName)
    .eq('first_name', data.firstName)
    .single();

  if (error) {
    throw error;
  }

  return consumer;
  
}