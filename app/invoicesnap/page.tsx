"use client";

import { jsPDF } from "jspdf";
import { Download, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import InvoiceForm, { type InvoiceDraft } from "@/app/components/InvoiceForm";
import InvoicePreview from "@/app/components/InvoicePreview";

const STORAGE_KEY = "craftara:invoice-snap:draft";
const isPro = false;

function generateInvoiceNumber() {
  return `INV-${Math.floor(10000 + Math.random() * 90000)}`;
}

function createDefaultDraft(): InvoiceDraft {
  return {
    invoiceNumber: generateInvoiceNumber(),
    date: new Date().toISOString().slice(0, 10),
    businessName: "",
    businessEmail: "",
    clientName: "",
    clientEmail: "",
    items: [{ id: crypto.randomUUID(), description: "", quantity: 1, price: 0 }],
    taxPercent: 0,
    discount: 0,
    notes: "",
  };
}

export default function InvoiceSnapPage() {
  const [draft, setDraft] = useState<InvoiceDraft>(() => createDefaultDraft());

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as InvoiceDraft;
      if (parsed && parsed.items?.length) {
        setDraft(parsed);
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [draft]);

  const totals = useMemo(() => {
    const subtotal = draft.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const taxAmount = subtotal * (draft.taxPercent / 100);
    const total = Math.max(subtotal + taxAmount - draft.discount, 0);
    return { subtotal, taxAmount, total };
  }, [draft.items, draft.taxPercent, draft.discount]);

  const updateField = <K extends keyof InvoiceDraft>(key: K, value: InvoiceDraft[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const addItem = () => {
    setDraft((prev) => ({
      ...prev,
      items: [...prev.items, { id: crypto.randomUUID(), description: "", quantity: 1, price: 0 }],
    }));
  };

  const removeItem = (id: string) => {
    setDraft((prev) => {
      const nextItems = prev.items.filter((item) => item.id !== id);
      return {
        ...prev,
        items: nextItems.length ? nextItems : [{ id: crypto.randomUUID(), description: "", quantity: 1, price: 0 }],
      };
    });
  };

  const updateItem = (id: string, key: "description" | "quantity" | "price", value: string | number) => {
    setDraft((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          [key]: key === "description" ? String(value) : Number(value),
        };
      }),
    }));
  };

  const downloadPdf = () => {
    if (!isPro) {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const left = 48;
      let y = 56;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(24);
      doc.text("Invoice", left, y);
      y += 24;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Invoice Number: ${draft.invoiceNumber}`, left, y);
      y += 14;
      doc.text(`Date: ${draft.date}`, left, y);
      y += 28;

      doc.setFont("helvetica", "bold");
      doc.text("From", left, y);
      doc.text("Bill To", 300, y);
      y += 14;

      doc.setFont("helvetica", "normal");
      doc.text(draft.businessName || "-", left, y);
      doc.text(draft.clientName || "-", 300, y);
      y += 14;
      doc.text(draft.businessEmail || "-", left, y);
      doc.text(draft.clientEmail || "-", 300, y);
      y += 24;

      doc.setFont("helvetica", "bold");
      doc.text("Description", left, y);
      doc.text("Qty", 330, y);
      doc.text("Price", 390, y);
      doc.text("Amount", 500, y, { align: "right" });
      y += 12;
      doc.line(left, y, 548, y);
      y += 14;

      doc.setFont("helvetica", "normal");
      draft.items.forEach((item) => {
        const amount = item.quantity * item.price;
        doc.text(item.description || "-", left, y);
        doc.text(String(item.quantity), 330, y);
        doc.text(`$${item.price.toFixed(2)}`, 390, y);
        doc.text(`$${amount.toFixed(2)}`, 500, y, { align: "right" });
        y += 16;
      });

      y += 8;
      doc.line(300, y, 548, y);
      y += 16;
      doc.text("Subtotal", 390, y);
      doc.text(`$${totals.subtotal.toFixed(2)}`, 500, y, { align: "right" });
      y += 16;
      doc.text(`Tax (${draft.taxPercent}%)`, 390, y);
      doc.text(`$${totals.taxAmount.toFixed(2)}`, 500, y, { align: "right" });
      y += 16;
      doc.text("Discount", 390, y);
      doc.text(`-$${draft.discount.toFixed(2)}`, 500, y, { align: "right" });
      y += 18;

      doc.setFont("helvetica", "bold");
      doc.text("Total", 390, y);
      doc.text(`$${totals.total.toFixed(2)}`, 500, y, { align: "right" });
      y += 30;

      if (draft.notes.trim()) {
        doc.setFont("helvetica", "bold");
        doc.text("Notes", left, y);
        y += 14;
        doc.setFont("helvetica", "normal");
        doc.text(draft.notes, left, y, { maxWidth: 500 });
      }

      doc.save(`${draft.invoiceNumber}.pdf`);
      return;
    }
  };

  const resetDraft = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setDraft(createDefaultDraft());
  };

  return (
    <main className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-black/55">Craftara / Tools / InvoiceSnap</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-black">InvoiceSnap</h1>
            <p className="mt-2 max-w-2xl text-sm text-black/70">
              Create professional invoices, preview them live, and export clean PDFs in seconds.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetDraft}
              className="inline-flex items-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-black/5"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
            <button
              onClick={downloadPdf}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <InvoiceForm
            draft={draft}
            updateField={updateField}
            addItem={addItem}
            removeItem={removeItem}
            updateItem={updateItem}
          />
          <InvoicePreview draft={draft} />
        </div>
      </div>
    </main>
  );
}
