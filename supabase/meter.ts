import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getMeterSizes = async () => {
  const { data, error } = await supabase.from("meter_size").select("*");

  if (error) {
    throw error;
  }

  return data;
};
