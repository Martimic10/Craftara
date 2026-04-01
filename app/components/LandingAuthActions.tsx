"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/app/components/AuthProvider";

export default function LandingAuthActions() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    const fromApp = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("from") === "app";
    if (!loading && user && !fromApp) {
      router.replace("/app");
    }
  }, [loading, router, user]);

  return (
    <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
      <Link
        href="/auth"
        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Get started
      </Link>
      <Link
        href="/tools"
        className="rounded-xl border border-black/15 bg-white/70 px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-white"
      >
        View Tools
      </Link>
    </div>
  );
}
