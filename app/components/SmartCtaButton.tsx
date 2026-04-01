"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/components/AuthProvider";

type SmartCtaButtonProps = {
  className: string;
  children: ReactNode;
};

export default function SmartCtaButton({ className, children }: SmartCtaButtonProps) {
  const router = useRouter();
  const { user, loading } = useAuth();

  return (
    <button
      type="button"
      onClick={() => {
        if (loading) return;
        router.push(user ? "/app" : "/auth");
      }}
      className={className}
      disabled={loading}
    >
      {children}
    </button>
  );
}
