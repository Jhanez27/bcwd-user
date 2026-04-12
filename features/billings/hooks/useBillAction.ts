import { useState } from "react";
import { toast } from "sonner";
import { Billing } from "../type";

export const useBillAction = () => {
    const [isPaying, setIsPaying] = useState(false);

    const handlePay = async (bill: Billing) => {
        if (isPaying) return;
        setIsPaying(true);

        try {
            const response = await fetch("/api/paymongo/create-source", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    billId: bill.id,
                    amount: bill.charges,
                    description: `BCWD Bill #${bill.id} — Due ${new Date(bill.due_date).toLocaleDateString()}`,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.error ?? "Failed to initiate payment. Please try again.");
                return;
            }

            // Redirect to PayMongo GCash checkout
            window.location.href = data.checkoutUrl;
        } catch (error) {
            console.error("[handlePay] error:", error);
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setIsPaying(false);
        }
    };

    return { handlePay, isPaying };
};