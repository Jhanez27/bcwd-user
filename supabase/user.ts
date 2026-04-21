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

export const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
}

export const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
}