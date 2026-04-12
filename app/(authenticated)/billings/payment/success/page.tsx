"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const billId = searchParams.get("bill_id");

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full text-center space-y-6">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center">
                        <CheckCircle className="w-14 h-14 text-green-500" />
                    </div>
                </div>

                {/* Text */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-foreground">Payment Successful!</h1>
                    <p className="text-muted-foreground">
                        Your GCash payment{billId ? ` for Bill #${billId}` : ""} has been received.
                    </p>
                </div>

                {/* Note */}
                <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
                    Your bill status will be updated once the payment is confirmed. This may take a few minutes.
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={() => router.push("/billings")} variant="default">
                        Back to Bills
                    </Button>
                    <Button onClick={() => router.push("/dashboard")} variant="outline">
                        Go to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
}
