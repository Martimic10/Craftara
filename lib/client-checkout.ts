"use client";

import type { ProductKey } from "@/lib/billing";

type CheckoutPayload = {
  productKey: ProductKey;
  uid: string;
  email?: string | null;
};

export async function startCheckout(payload: CheckoutPayload) {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(errorData?.error || "Unable to start checkout.");
  }

  const data = (await response.json()) as { url?: string };
  if (!data.url) {
    throw new Error("Checkout URL missing.");
  }

  window.location.href = data.url;
}
