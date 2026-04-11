"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../utils/profileSchema";
import { z } from "zod";
import { updateProfile } from "@/supabase/profile";
import { toast } from "sonner";
import { getCurrentUser } from "@/supabase/user";
import { useProfile } from "./useProfile";
import { updateContact } from "@/supabase/contact";

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const useProfileActions = () => {
    const { profile, loading, error } = useProfile();

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            phone: "",
            username: "",
            address: "",
            municipal_zone: "",
            zone_number: "",
        },
        values: profile ? {
            first_name: profile.first_name || "",
            last_name: profile.last_name || "",
            phone: profile.contact[0].phone_number || "",
            username: profile.username || "",
            address: profile.address || "",
            municipal_zone: profile.municipal_zone || "",
            zone_number: profile.zone_number || "",
        } : undefined,
    });

    useEffect(() => {
        if (profile) {
            console.log("Profile data arrived:", profile);
        }
    }, [profile]);

    const onSubmit = async (data: ProfileFormValues) => {
        try {
            const user = await getCurrentUser();
            const { phone, ...rest } = data;
            await updateProfile(user.consumer_id, rest);
            await updateContact(user.consumer_id, { phone_number: phone });
            toast.success("Profile updated successfully");
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return { form, onSubmit, loading, error };
}