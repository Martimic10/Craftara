"use client";

import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/app/components/AuthProvider";
import PaywallModal from "@/app/components/PaywallModal";
import { startCheckout } from "@/lib/client-checkout";
import { decreaseUsage } from "@/lib/usage";
import ContractForm, { type ContractDraft } from "@/components/ContractForm";
import ContractPreview from "@/components/ContractPreview";

const STORAGE_KEY = "craftara:contractquick:draft";
const isPro = false;

const templateMeta = {
  "service-agreement": {
    title: "Service Agreement",
    intro:
      "This Service Agreement outlines the terms under which services will be provided by the Provider to the Client.",
  },
  "freelance-contract": {
    title: "Freelance Contract",
    intro:
      "This Freelance Contract defines the project scope, deliverables, payment, and working relationship between both parties.",
  },
  "simple-nda": {
    title: "Simple Non-Disclosure Agreement (NDA)",
    intro:
      "This NDA sets out confidentiality obligations for information shared between both parties during discussions or project work.",
  },
} as const;

function createDefaultDraft(): ContractDraft {
  return {
    templateType: "service-agreement",
    userName: "",
    clientName: "",
    projectDescription: "",
    paymentAmount: "",
    paymentTerms: "Net 7",
    startDate: new Date().toISOString().slice(0, 10),
    endDate: "",
    customClause: "",
  };
}

export default function ContractQuickPage() {
  const router = useRouter();
  const { user, freeUsesRemaining, hasPaid } = useAuth();
  const [draft, setDraft] = useState<ContractDraft>(() => createDefaultDraft());
  const [showPaywall, setShowPaywall] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as ContractDraft;
      setDraft({ ...createDefaultDraft(), ...parsed });
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [draft]);

  const updateField = <K extends keyof ContractDraft>(key: K, value: ContractDraft[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const previewText = useMemo(() => {
    const meta = templateMeta[draft.templateType];
    return {
      title: meta.title,
      intro: meta.intro,
      parties: `This agreement is made between ${draft.userName || "[Your Name / Business Name]"} and ${
        draft.clientName || "[Client Name]"
      }.`,
      scope: draft.projectDescription || "Project scope and deliverables will be detailed here.",
      payment: `The client agrees to pay ${draft.paymentAmount || "[Payment Amount]"}. Payment terms: ${
        draft.paymentTerms || "[Payment Terms]"
      }.`,
      timeline: `Start date: ${draft.startDate || "[Start Date]"} | End date: ${
        draft.endDate || "Not specified"
      }`,
      custom: draft.customClause.trim(),
    };
  }, [draft]);

  const runWithUsageGate = (action: () => void) => {
    if (!user) {
      router.push("/auth");
      return;
    }
    if (hasPaid) {
      action();
      return;
    }
    if (freeUsesRemaining <= 0) {
      setShowPaywall(true);
      return;
    }
    action();
    void decreaseUsage(user.uid).catch((error) => {
      console.error("Failed to decrement usage", error);
    });
  };

  const downloadPdf = () => {
    if (!isPro) {
      runWithUsageGate(() => {
        const doc = new jsPDF({ unit: "pt", format: "a4" });
        const margin = 56;
        const maxWidth = 483;
        let y = 64;

        doc.setFont("times", "bold");
        doc.setFontSize(22);
        doc.text(previewText.title, margin, y);
        y += 24;

        doc.setFont("times", "normal");
        doc.setFontSize(11);
        y = writeParagraph(doc, previewText.intro, margin, y, maxWidth);
        y += 10;

        y = writeSection(doc, "Parties", previewText.parties, margin, y, maxWidth);
        y = writeSection(doc, "Scope of Work", previewText.scope, margin, y, maxWidth);
        y = writeSection(doc, "Payment Terms", previewText.payment, margin, y, maxWidth);
        y = writeSection(doc, "Timeline", previewText.timeline, margin, y, maxWidth);

        if (previewText.custom) {
          y = writeSection(doc, "Custom Clause", previewText.custom, margin, y, maxWidth);
        }

        y += 8;
        doc.setFont("times", "bold");
        doc.setFontSize(13);
        doc.text("Signatures", margin, y);
        y += 24;

        const lineWidth = 200;
        doc.setDrawColor(0);
        doc.line(margin, y, margin + lineWidth, y);
        doc.line(margin + 260, y, margin + 260 + lineWidth, y);
        y += 14;

        doc.setFont("times", "normal");
        doc.setFontSize(10);
        doc.text(draft.userName || "Provider Signature", margin, y);
        doc.text(draft.clientName || "Client Signature", margin + 260, y);

        doc.save(`contractquick-${draft.templateType}.pdf`);
      });
    }
  };

  const resetDraft = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setDraft(createDefaultDraft());
  };

  return (
    <main className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-black/55">Craftara / Tools / ContractQuick</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-black">ContractQuick</h1>
          <p className="mt-2 max-w-2xl text-sm text-black/70">
            Generate practical agreements in minutes, preview them live, and export a clean PDF.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <ContractForm draft={draft} onChange={updateField} onDownloadPdf={downloadPdf} onReset={resetDraft} />
          <ContractPreview draft={draft} />
        </div>
      </div>
      <PaywallModal
        open={showPaywall}
        freeUsesRemaining={freeUsesRemaining}
        onClose={() => setShowPaywall(false)}
        unlocking={unlocking}
        onUnlock={async () => {
          if (!user) {
            router.push("/auth");
            return;
          }
          setUnlocking(true);
          try {
            await startCheckout({
              productKey: "suite",
              uid: user.uid,
              email: user.email,
            });
          } finally {
            setUnlocking(false);
          }
        }}
      />
    </main>
  );
}

function writeSection(
  doc: jsPDF,
  title: string,
  content: string,
  x: number,
  y: number,
  maxWidth: number,
) {
  doc.setFont("times", "bold");
  doc.setFontSize(13);
  doc.text(title, x, y);
  y += 16;
  doc.setFont("times", "normal");
  doc.setFontSize(11);
  y = writeParagraph(doc, content, x, y, maxWidth);
  return y + 8;
}

function writeParagraph(doc: jsPDF, text: string, x: number, y: number, maxWidth: number) {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y);
  return y + lines.length * 14;
}
