"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/AuthProvider";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [loading, router, user]);

  if (loading) {
    return <div className="py-16 text-center text-sm text-black/70">Checking your session...</div>;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
