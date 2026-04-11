"use client";
import { useState, useEffect } from "react";
import { getProfile } from "@/supabase/profile";
import { getCurrentUser } from "@/supabase/user";

export const useProfile = () => {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user = await getCurrentUser();
                const profileData = await getProfile(user.consumer_id);
                setProfile(profileData);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    return { profile, loading, error };
}