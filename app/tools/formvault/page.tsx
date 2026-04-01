"use client";

import Link from "next/link";
import RequireAuth from "@/app/components/RequireAuth";

export default function DashboardFormVaultPage() {
  return (
    <RequireAuth>
      <main className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-2xl border border-black/10 bg-white/85 p-8 shadow-sm">
          <h1 className="text-3xl font-semibold tracking-tight text-black">FormVault</h1>
          <p className="mt-3 text-black/70">Build and export responses from the full FormVault workspace.</p>
          <Link
            href="/formvault"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Open Full Tool
          </Link>
        </div>
      </main>
    </RequireAuth>
  );
}
