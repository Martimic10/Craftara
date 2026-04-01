import Link from "next/link";

export default function UpgradePage() {
  return (
    <main className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-black">Upgrade</h1>
        <p className="mt-3 text-black/70">
          Stripe entitlement checks will be connected here soon. For now, all tools are in demo
          mode.
        </p>
        <Link href="/invoicesnap" className="mt-6 inline-block rounded-xl bg-blue-600 px-4 py-2 text-white">
          Back to InvoiceSnap
        </Link>
      </div>
    </main>
  );
}
