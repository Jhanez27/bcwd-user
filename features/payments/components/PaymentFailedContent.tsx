"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PaymentFailedContent = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const billId = searchParams.get("bill_id");

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="max-w-md w-full text-center space-y-6">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center">
                        <XCircle className="w-14 h-14 text-red-500" />
                    </div>
                </div>

                {/* Text */}
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-foreground">Payment Failed</h1>
                    <p className="text-muted-foreground">
                        Your GCash payment{billId ? ` for Bill #${billId}` : ""} was not completed.
                    </p>
                </div>

                {/* Note */}
                <div className="rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
                    No charges were made to your account. You can try again from the Bills page.
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={() => router.push("/billings")} variant="default">
                        Try Again
                    </Button>
                    <Button onClick={() => router.push("/dashboard")} variant="outline">
                        Go to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
}
