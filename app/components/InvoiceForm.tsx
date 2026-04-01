"use client";

import { Plus, Trash2 } from "lucide-react";
import type { ReactNode } from "react";

export type InvoiceLineItem = {
  id: string;
  description: string;
  quantity: number;
  price: number;
};

export type InvoiceDraft = {
  invoiceNumber: string;
  date: string;
  businessName: string;
  businessEmail: string;
  clientName: string;
  clientEmail: string;
  items: InvoiceLineItem[];
  taxPercent: number;
  discount: number;
  notes: string;
};

type InvoiceFormProps = {
  draft: InvoiceDraft;
  updateField: <K extends keyof InvoiceDraft>(key: K, value: InvoiceDraft[K]) => void;
  addItem: () => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, key: "description" | "quantity" | "price", value: string | number) => void;
};

export default function InvoiceForm({
  draft,
  updateField,
  addItem,
  removeItem,
  updateItem,
}: InvoiceFormProps) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-semibold tracking-tight text-black">Invoice Details</h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Invoice Number">
          <input
            value={draft.invoiceNumber}
            onChange={(e) => updateField("invoiceNumber", e.target.value)}
            className="h-11 w-full rounded-xl border border-black/15 px-3 text-sm outline-none transition focus:border-blue-500"
          />
        </Field>
        <Field label="Date">
          <input
            type="date"
            value={draft.date}
            onChange={(e) => updateField("date", e.target.value)}
            className="h-11 w-full rounded-xl border border-black/15 px-3 text-sm outline-none transition focus:border-blue-500"
          />
        </Field>
      </div>

      <div className="mt-6">
        <h3 className="text-base font-semibold text-black">Business Info</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Field label="Your Business Name">
            <input
              value={draft.businessName}
              onChange={(e) => updateField("businessName", e.target.value)}
              className="h-11 w-full rounded-xl border border-black/15 px-3 text-sm outline-none transition focus:border-blue-500"
            />
          </Field>
          <Field label="Your Email">
            <input
              type="email"
              value={draft.businessEmail}
              onChange={(e) => updateField("businessEmail", e.target.value)}
              className="h-11 w-full rounded-xl border border-black/15 px-3 text-sm outline-none transition focus:border-blue-500"
            />
          </Field>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-base font-semibold text-black">Client Info</h3>
        <div className="mt-3 grid gap-4 sm:grid-cols-2">
          <Field label="Client Name">
            <input
              value={draft.clientName}
              onChange={(e) => updateField("clientName", e.target.value)}
              className="h-11 w-full rounded-xl border border-black/15 px-3 text-sm outline-none transition focus:border-blue-500"
            />
          </Field>
          <Field label="Client Email">
            <input
              type="email"
              value={draft.clientEmail}
              onChange={(e) => updateField("clientEmail", e.target.value)}
              className="h-11 w-full rounded-xl border border-black/15 px-3 text-sm outline-none transition focus:border-blue-500"
            />
          </Field>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-black">Line Items</h3>
          <button
            onClick={addItem}
            type="button"
            className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </button>
        </div>

        <div className="space-y-3">
          {draft.items.map((item) => (
            <div key={item.id} className="rounded-xl border border-black/10 bg-[#f9fafb] p-3">
              <div className="grid gap-3 sm:grid-cols-[1fr_110px_110px_auto]">
                <input
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                  className="h-11 w-full rounded-lg border border-black/15 px-3 text-sm outline-none transition focus:border-blue-500"
                />
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                  className="h-11 w-full rounded-lg border border-black/15 px-3 text-sm outline-none transition focus:border-blue-500"
                />
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={item.price}
                  onChange={(e) => updateItem(item.id, "price", Number(e.target.value))}
                  className="h-11 w-full rounded-lg border border-black/15 px-3 text-sm outline-none transition focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-red-200 px-3 text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Tax %">
          <input
            type="number"
            min={0}
            value={draft.taxPercent}
            onChange={(e) => updateField("taxPercent", Number(e.target.value))}
            className="h-11 w-full rounded-xl border border-black/15 px-3 text-sm outline-none transition focus:border-blue-500"
          />
        </Field>
        <Field label="Discount">
          <input
            type="number"
            min={0}
            value={draft.discount}
            onChange={(e) => updateField("discount", Number(e.target.value))}
            className="h-11 w-full rounded-xl border border-black/15 px-3 text-sm outline-none transition focus:border-blue-500"
          />
        </Field>
      </div>

      <div className="mt-4">
        <Field label="Notes">
          <textarea
            value={draft.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-black/15 px-3 py-2 text-sm outline-none transition focus:border-blue-500"
          />
        </Field>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-black/70">{label}</span>
      {children}
    </label>
  );
}
