"use client";

import { Loader2, X } from "lucide-react";

type PaywallModalProps = {
  open: boolean;
  freeUsesRemaining: number;
  onClose: () => void;
  onUnlock: () => Promise<void> | void;
  unlocking?: boolean;
};

export default function PaywallModal({
  open,
  freeUsesRemaining,
  onClose,
  onUnlock,
  unlocking = false,
}: PaywallModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/35 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tight text-black">You&apos;re out of free uses</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-black/60 transition hover:bg-black/5 hover:text-black"
            aria-label="Close paywall"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-sm text-black/70">
          Unlock unlimited access to all tools with a one-time payment
        </p>

        {freeUsesRemaining > 0 ? (
          <p className="mt-3 text-sm font-medium text-black">
            Remaining uses: <span className="text-blue-700">{freeUsesRemaining}</span>
          </p>
        ) : null}

        <button
          type="button"
          onClick={onUnlock}
          disabled={unlocking}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-85"
        >
          {unlocking ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Unlock Unlimited Access
        </button>
      </div>
    </div>
  );
}
