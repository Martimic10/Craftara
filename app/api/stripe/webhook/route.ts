import { headers } from "next/headers";
import Stripe from "stripe";
import { FieldValue } from "firebase-admin/firestore";
import { getAdminDb } from "@/lib/firebase-admin";
import { isProductKey } from "@/lib/billing";

export const runtime = "nodejs";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

if (!webhookSecret) {
  throw new Error("Missing STRIPE_WEBHOOK_SECRET");
}

const stripe = new Stripe(stripeSecretKey);

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const uid = session.metadata?.uid || session.client_reference_id;
  const productKey = session.metadata?.productKey;

  if (!uid || !productKey || !isProductKey(productKey)) {
    return;
  }

  const db = getAdminDb();
  const userRef = db.collection("users").doc(uid);

  if (productKey === "suite") {
    await userRef.set(
      {
        hasPaid: true,
        updatedAt: FieldValue.serverTimestamp(),
        stripeCustomerId: session.customer || null,
      },
      { merge: true },
    );
    return;
  }

  await userRef.set(
    {
      purchasedTools: FieldValue.arrayUnion(productKey),
      updatedAt: FieldValue.serverTimestamp(),
      stripeCustomerId: session.customer || null,
    },
    { merge: true },
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = (await headers()).get("stripe-signature");

    if (!signature) {
      return new Response("Missing stripe signature", { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret!);

    if (event.type === "checkout.session.completed") {
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
    }

    return new Response("ok", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Webhook error", { status: 400 });
  }
}
