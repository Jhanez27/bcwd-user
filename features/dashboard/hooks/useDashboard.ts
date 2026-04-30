"use client";
import { useEffect, useState } from "react";
import { Billing, MeterReading } from "@/features/billings/type";
import { getCurrentConsumer } from "@/supabase/consumer";
import { getLatestBilling, getBillings } from "@/supabase/bills";
import { getLatestMeterReading, getMeterReadings } from "@/supabase/readings";

export const useDashboard = () => {
    const [user, setUser] = useState<any>();
    const [reading, setReading] = useState<MeterReading>();
    const [billing, setBilling] = useState<Billing>();
    const [recentReadings, setRecentReadings] = useState<MeterReading[]>([]);
    const [recentBillings, setRecentBillings] = useState<Billing[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const consumer = await getCurrentConsumer();
                setUser(consumer);

                if (consumer?.id) {
                    const [r, b, rs, bs] = await Promise.all([
                        getLatestMeterReading(consumer.id),
                        getLatestBilling(consumer.id),
                        getMeterReadings(consumer.id).catch(() => []),
                        getBillings(consumer.id).catch(() => []),
                    ]);
                    setReading(r as MeterReading);
                    setBilling(b as Billing);
                    setRecentReadings((rs as MeterReading[]) ?? []);
                    setRecentBillings((bs as Billing[]) ?? []);
                }
            } catch (error) {
                console.error("Dashboard load error:", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    return {
        user,
        reading,
        billing,
        recentReadings,
        recentBillings,
        loading,
    };
};
