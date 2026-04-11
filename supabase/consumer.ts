
import { SignUpFormValues } from "@/features/authentication/types";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export const getCurrentConsumer = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    const { data: consumer, error: consumerError } = await supabase
        .from('consumer')
        .select(`
            *,
            meter!inner(brand, size)
        `)
        .eq('consumer_uuid', user?.id)
        .maybeSingle();
    if (consumerError) throw consumerError;
    console.log(consumer);
    return consumer;
}

export const verifyAccountDetails = async (data: SignUpFormValues) => {
    try {
        console.log(data);
        const { data: consumer, error } = await supabase
            .from('consumer')
            .select(`
                *,
                meter!inner(brand, size)
            `)
            .eq('account_number', data.accountNumber)
            .eq('last_name', data.lastName)
            .eq('first_name', data.firstName)
            .is('consumer_uuid', null)
            .eq('meter.brand', data.meterBrand)
            .eq('meter.size', data.meterSize)
            .maybeSingle(); 
        if (error) throw error;

        if (!consumer) {
            throw new Error('Account verification failed: Consumer or Meter details are incorrect.');
        }

        const { meter, ...consumerData } = consumer;
        
        return consumerData;

    } catch (error) {
        throw error;
    }
}

export const createConsumerAccount = async (email: string, password: string, consumerId: number, username: string) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                consumer_id: consumerId,
                username: username,
            }
        }
    });

    if (authError) throw authError;

    const newUserId = authData.user?.id;
    if (!newUserId) throw new Error('User creation failed, no ID returned.');

    const { error: profileError } = await supabase
        .from('profile')
        .insert({
            user_uuid: newUserId,
            user_role: 'consumer',
            created_at: new Date().toISOString(),
        });

    if (profileError) throw profileError;

    const { error: updateError } = await supabase
        .from('consumer')
        .update({ consumer_uuid: newUserId })
        .eq('id', consumerId);

    if (updateError) throw updateError;

    await supabase.auth.signOut();

    return authData;
}

export const loginConsumer = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) throw error;

    return data;
}