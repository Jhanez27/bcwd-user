import { NextRequest, NextResponse } from "next/server";

const PAYMONGO_API = "https://api.paymongo.com/v1";

export async function POST(req: NextRequest) {
    try {
        const { amount, billId, description } = await req.json();

        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: "Invalid amount" },
                { status: 400 }
            );
        }

        const secretKey = process.env.PAYMONGO_SECRET_KEY;
        if (!secretKey) {
            return NextResponse.json(
                { error: "PayMongo secret key is not configured" },
                { status: 500 }
            );
        }

        const baseUrl = req.nextUrl.origin;
        const successUrl = `${baseUrl}/billings/payment/success?bill_id=${billId}`;
        const failedUrl = `${baseUrl}/billings/payment/failed?bill_id=${billId}`;

        const response = await fetch(`${PAYMONGO_API}/sources`, {
            method: "POST",
            headers: {
                accept: "application/json",
                "content-type": "application/json",
                authorization: `Basic ${Buffer.from(secretKey + ":").toString("base64")}`,
            },
            body: JSON.stringify({
                data: {
                    attributes: {
                        amount: Math.round(amount * 100), // PayMongo uses centavos
                        currency: "PHP",
                        type: "gcash",
                        description: description ?? `Bill #${billId} payment`,
                        redirect: {
                            success: successUrl,
                            failed: failedUrl,
                        },
                    },
                },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("[PayMongo] Source creation failed:", data);
            return NextResponse.json(
                { error: data.errors?.[0]?.detail ?? "Failed to create PayMongo source" },
                { status: response.status }
            );
        }

        const checkoutUrl = data?.data?.attributes?.redirect?.checkout_url;

        if (!checkoutUrl) {
            return NextResponse.json(
                { error: "No checkout URL returned from PayMongo" },
                { status: 500 }
            );
        }

        return NextResponse.json({ checkoutUrl, sourceId: data.data.id });
    } catch (error) {
        console.error("[PayMongo] Unexpected error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
