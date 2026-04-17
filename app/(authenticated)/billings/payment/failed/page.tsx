"use client";
import { Suspense } from "react";
import { PaymentFailedContent } from "@/features/payments/components/PaymentFailedContent";

export default function PaymentFailedPage() {
    return (
        <Suspense fallback={<div>Loading payment details...</div>}>
            <PaymentFailedContent />
        </Suspense>
    );
}
