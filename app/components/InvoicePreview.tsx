"use client";

import type { InvoiceDraft } from "@/app/components/InvoiceForm";

type InvoicePreviewProps = {
  draft: InvoiceDraft;
};

export default function InvoicePreview({ draft }: InvoicePreviewProps) {
  const subtotal = draft.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const taxAmount = subtotal * (draft.taxPercent / 100);
  const total = Math.max(subtotal + taxAmount - draft.discount, 0);

  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_16px_45px_rgba(0,0,0,0.08)]">
      <div className="mx-auto max-w-[520px] rounded-xl border border-black/10 bg-white p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-black/45">InvoiceSnap</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-black">Invoice</h2>
          </div>
          <div className="text-right text-sm text-black/70">
            <p className="font-semibold text-black">{draft.invoiceNumber}</p>
            <p>{draft.date || "-"}</p>
          </div>
        </div>

        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-black/45">From</p>
            <p className="mt-2 text-base font-semibold text-black">{draft.businessName || "Your Business"}</p>
            <p className="text-sm text-black/70">{draft.businessEmail || "you@business.com"}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-black/45">Bill To</p>
            <p className="mt-2 text-base font-semibold text-black">{draft.clientName || "Client Name"}</p>
            <p className="text-sm text-black/70">{draft.clientEmail || "client@email.com"}</p>
          </div>
        </div>

        <div className="mt-7 overflow-hidden rounded-lg border border-black/10">
          <table className="w-full text-sm">
            <thead className="bg-[#f9fafb]">
              <tr className="text-left text-black/70">
                <th className="px-3 py-2 font-medium">Description</th>
                <th className="px-3 py-2 font-medium">Qty</th>
                <th className="px-3 py-2 font-medium">Price</th>
                <th className="px-3 py-2 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {draft.items.map((item) => (
                <tr key={item.id} className="border-t border-black/10">
                  <td className="px-3 py-2 text-black">{item.description || "-"}</td>
                  <td className="px-3 py-2 text-black/80">{item.quantity}</td>
                  <td className="px-3 py-2 text-black/80">${item.price.toFixed(2)}</td>
                  <td className="px-3 py-2 text-right text-black">${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-2 text-sm">
          <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
          <Row label={`Tax (${draft.taxPercent || 0}%)`} value={`$${taxAmount.toFixed(2)}`} />
          <Row label="Discount" value={`-$${(draft.discount || 0).toFixed(2)}`} />
          <Row
            label="Total"
            value={`$${total.toFixed(2)}`}
            className="border-t border-black/10 pt-2 text-base font-semibold text-black"
          />
        </div>

        {draft.notes.trim() && (
          <div className="mt-6 rounded-lg border border-black/10 bg-[#f9fafb] p-3">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-black/45">Notes</p>
            <p className="mt-1 text-sm text-black/75">{draft.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className={`flex items-center justify-between text-black/80 ${className}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
