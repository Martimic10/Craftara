"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Barcode, FileText, Lock, Receipt, ShieldCheck, Stamp } from "lucide-react";
import RequireAuth from "@/app/components/RequireAuth";
import { useAuth } from "@/app/components/AuthProvider";
import { isProductKey, type ProductKey } from "@/lib/billing";
import { grantPurchasedAccess } from "@/lib/usage";

const dashboardTools = [
  {
    key: "barcodeforge",
    name: "BarcodeForge",
    description: "Generate barcodes instantly",
    href: "/barcodeforge",
    icon: Barcode,
  },
  {
    key: "invoicesnap",
    name: "InvoiceSnap",
    description: "Create professional invoices in seconds",
    href: "/invoicesnap",
    icon: Receipt,
  },
  {
    key: "labelcraft",
    name: "LabelCraft",
    description: "Design polished labels and stickers",
    href: "/labelcraft",
    icon: Stamp,
  },
  {
    key: "formvault",
    name: "FormVault",
    description: "Build smart forms in seconds",
    href: "/formvault",
    icon: FileText,
  },
  {
    key: "contractquick",
    name: "ContractQuick",
    description: "Generate AI-powered contracts",
    href: "/contractquick",
    icon: ShieldCheck,
  },
] as const;

export default function DashboardPage() {
  const router = useRouter();
  const { user, hasPaid, freeUsesRemaining, purchasedTools, resetTestAccess } = useAuth();
  const [resetting, setResetting] = useState(false);
  const [syncingPurchase, setSyncingPurchase] = useState(false);
  const hasProcessedCheckoutRef = useRef(false);
  const canReset = hasPaid || purchasedTools.length > 0 || freeUsesRemaining !== 3;

  useEffect(() => {
    if (!user || hasProcessedCheckoutRef.current) return;
    const params = new URLSearchParams(window.location.search);
    const isSuccess = params.get("checkout") === "success";
    const product = params.get("product");
    if (!isSuccess || !product || !isProductKey(product)) return;

    hasProcessedCheckoutRef.current = true;
    setSyncingPurchase(true);

    void grantPurchasedAccess(user.uid, product as ProductKey)
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setSyncingPurchase(false);
        router.replace("/app");
      });
  }, [router, user]);

  return (
    <RequireAuth>
      <main className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="text-4xl font-semibold tracking-tight text-black">Welcome back, {user?.displayName}</h1>
          <p className="mt-2 text-black/70">Create and manage your tools</p>
          <p className="mt-2 text-sm font-medium text-black/70">
            {hasPaid ? "Unlimited access unlocked" : `Free uses remaining: ${freeUsesRemaining}`}
          </p>
          {syncingPurchase ? <p className="mt-2 text-sm text-black/70">Finalizing your purchase...</p> : null}
          {canReset ? (
            <button
              type="button"
              onClick={async () => {
                setResetting(true);
                try {
                  await resetTestAccess();
                } finally {
                  setResetting(false);
                }
              }}
              className="mt-4 rounded-xl border border-black/15 bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={resetting}
            >
              {resetting ? "Resetting..." : "Reset to New User State"}
            </button>
          ) : null}

          <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {dashboardTools.map((tool) => {
              const isUnlocked = hasPaid || purchasedTools.includes(tool.key);
              if (isUnlocked) {
                return (
                  <Link
                    key={tool.name}
                    href={tool.href}
                    className="group rounded-2xl border border-black/10 bg-white/85 p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md"
                  >
                    <tool.icon className="h-5 w-5 text-blue-600" />
                    <h2 className="mt-4 text-2xl font-semibold tracking-tight text-black">{tool.name}</h2>
                    <p className="mt-2 text-sm text-black/70">{tool.description}</p>
                    <span className="mt-6 inline-flex rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition group-hover:bg-blue-700">
                      Open Tool
                    </span>
                  </Link>
                );
              }
              return (
                <article
                  key={tool.name}
                  className="rounded-2xl border border-black/10 bg-white/50 p-6 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <tool.icon className="h-5 w-5 text-black/30" />
                    <Lock className="h-4 w-4 text-black/30" />
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-black/40">{tool.name}</h2>
                  <p className="mt-2 text-sm text-black/40">{tool.description}</p>
                  <Link
                    href="/?from=app#pricing"
                    className="mt-6 inline-flex rounded-xl bg-black/8 px-4 py-2 text-sm font-semibold text-black/50 transition hover:bg-blue-600 hover:text-white"
                  >
                    Buy Tool
                  </Link>
                </article>
              );
            })}
          </section>
        </div>
      </main>
    </RequireAuth>
  );
}
