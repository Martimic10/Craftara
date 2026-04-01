"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/app/components/AuthProvider";
import { signInWithGoogle } from "@/lib/auth";

export default function AuthPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/app");
    }
  }, [loading, router, user]);

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    try {
      await signInWithGoogle();
      router.replace("/app");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="px-4 pb-16 pt-14 sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-[55vh] max-w-md items-center justify-center">
        <section className="w-full rounded-2xl border border-black/10 bg-white/85 p-6 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-black">Sign in to Craftara</h1>
          <p className="mt-2 text-sm text-black/70">Continue with Google to open your dashboard.</p>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={submitting}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-80"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Continue with Google
          </button>
        </section>
      </div>
    </main>
  );
}
