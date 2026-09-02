import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const sig = request.headers.get("stripe-signature");

    let event: any;

    try {
      event = JSON.parse(body);
    } catch (parseErr) {
      return NextResponse.json({ success: false, error: "Invalid webhook payload JSON" }, { status: 400 });
    }

    // Handle Stripe checkout.session.completed or payment_intent.succeeded
    if (event.type === "checkout.session.completed" || event.type === "payment_intent.succeeded") {
      const session = event.data?.object;
      const stripeId = session?.id || session?.payment_intent;

      console.log(`Stripe Webhook Received: Event ${event.type} for session ${stripeId}`);

      if (stripeId) {
        try {
          await prisma.order.updateMany({
            where: { stripeId: stripeId },
            data: { status: "PAID" },
          });
        } catch (dbErr) {
          console.warn("DB update error on Stripe webhook:", dbErr);
        }
      }
    }

    return NextResponse.json({ success: true, received: true, eventType: event.type });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Webhook handler error" },
      { status: 500 }
    );
  }
}
