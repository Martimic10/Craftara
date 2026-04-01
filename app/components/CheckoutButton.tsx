"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/app/components/AuthProvider";
import { startCheckout } from "@/lib/client-checkout";
import type { ProductKey } from "@/lib/billing";

type CheckoutButtonProps = {
  productKey: ProductKey;
  className: string;
  children: ReactNode;
};

export default function CheckoutButton({ productKey, className, children }: CheckoutButtonProps) {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (loading) return;
    if (!user) {
      router.push("/auth");
      return;
    }

    setErrorMessage(null);
    setSubmitting(true);
    try {
      await startCheckout({
        productKey,
        uid: user.uid,
        email: user.email,
      });
    } catch (error) {
      console.error(error);
      setErrorMessage(error instanceof Error ? error.message : "Checkout failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <button type="button" onClick={handleCheckout} disabled={submitting || loading} className={className}>
        {submitting ? <Loader2 className="mr-2 inline h-4 w-4 animate-spin" /> : null}
        {children}
      </button>
      {errorMessage ? <p className="mt-2 text-xs text-red-600">{errorMessage}</p> : null}
    </div>
  );
}
