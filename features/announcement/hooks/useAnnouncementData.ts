"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { AnnouncementCategory, AnnouncementWithCategory } from "../type";

export const useAnnouncementData = () => {
    const [announcements, setAnnouncements] = useState<AnnouncementWithCategory[]>([]);
    const [categories, setCategories] = useState<AnnouncementCategory[]>([]);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();

    useEffect(() => {
        fetchAnnouncements();
        fetchCategory();
    }, []);

    const fetchAnnouncements = async () => {
        setLoading(true);
        try {
            const currentDate = new Date().toISOString();
            const { data, error } = await supabase
                .from('announcement')
                .select('*, announcement_category(*)')
                .or(`expiry_date.lt.${currentDate},expiry_date.is.null`)
                .order('date_posted', { ascending: false });
            console.log(data)
            console.log(error)
            if (error) throw error;
            setAnnouncements(data);
        } catch (error) {
            console.error('Error fetching announcements:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategory = async () => {
        try {
            const { data, error } = await supabase
                .from('announcement_category')
                .select('*');
            if (error) throw error;
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    return { announcements, loading, categories };
}