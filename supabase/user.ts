import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getCurrentUser = async () => {
    const { data: user, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user.user.user_metadata;
}

export const getCurrentUserRole = async () => {
    const { data: user, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user.user?.user_metadata.user_role;
}