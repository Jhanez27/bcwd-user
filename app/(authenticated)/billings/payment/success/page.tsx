"use client";
import { Suspense } from "react";
import { PaymentSuccessContent } from "@/features/payments/components/PaymentSucessContent";

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div>Loading payment details...</div>}>
            <PaymentSuccessContent />
        </Suspense>
    );
}
