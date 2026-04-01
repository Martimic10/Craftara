import Link from "next/link";

export default function BillingSuccessPage() {
  return (
    <main className="px-4 pb-16 pt-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl rounded-2xl border border-black/10 bg-white/90 p-8 text-center shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight text-black">Payment successful</h1>
        <p className="mt-3 text-sm text-black/70">
          Your access is being updated. You can now return to your dashboard.
        </p>
        <Link
          href="/app"
          className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
