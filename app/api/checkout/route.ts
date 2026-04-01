import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getPriceIdForProduct, isProductKey } from "@/lib/billing";

export const runtime = "nodejs";

type CheckoutRequestBody = {
  productKey?: string;
  uid?: string;
  email?: string;
};

export async function POST(request: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
    }
    const stripe = new Stripe(stripeSecretKey);

    const body = (await request.json()) as CheckoutRequestBody;
    const productKey = body.productKey;
    const uid = body.uid;
    const email = body.email;

    if (!productKey || !isProductKey(productKey)) {
      return NextResponse.json({ error: "Invalid product key." }, { status: 400 });
    }

    if (!uid) {
      return NextResponse.json({ error: "Missing user id." }, { status: 400 });
    }

    const priceId = getPriceIdForProduct(productKey);
    if (!priceId) {
      return NextResponse.json({ error: "Missing Stripe price mapping for product." }, { status: 500 });
    }

    const forwardedProto = request.headers.get("x-forwarded-proto");
    const forwardedHost = request.headers.get("x-forwarded-host");
    const host = forwardedHost || request.headers.get("host");
    const protocol = forwardedProto || "http";
    const fallbackUrl = new URL(request.url);
    const baseUrl = host ? `${protocol}://${host}` : `${fallbackUrl.protocol}//${fallbackUrl.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/app?checkout=success&product=${productKey}`,
      cancel_url: `${baseUrl}/app`,
      client_reference_id: uid,
      customer_email: email || undefined,
      metadata: {
        uid,
        productKey,
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: "Stripe checkout URL was not created." }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Unable to create checkout session.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
