"use client";

import type { ReactNode } from "react";
import type { ContractDraft } from "@/components/ContractForm";

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

type ContractPreviewProps = {
  draft: ContractDraft;
};

export default function ContractPreview({ draft }: ContractPreviewProps) {
  const meta = templateMeta[draft.templateType];

  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-black">Live Contract Preview</h2>

      <div className="mt-4 rounded-2xl border border-black/10 bg-[#f9fafb] p-4">
        <article className="rounded-xl border border-black/10 bg-white p-6 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <h1 className="text-4xl font-semibold tracking-tight text-black">{meta.title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-black/75">{meta.intro}</p>

          <ContractSection title="Parties">
            This agreement is made between <strong>{draft.userName || "[Your Name / Business Name]"}</strong> and{" "}
            <strong>{draft.clientName || "[Client Name]"}</strong>.
          </ContractSection>

          <ContractSection title="Scope of Work">
            {draft.projectDescription || "Project scope and deliverables will be detailed here."}
          </ContractSection>

          <ContractSection title="Payment Terms">
            The client agrees to pay <strong>{draft.paymentAmount || "[Payment Amount]"}</strong>. Payment terms:{" "}
            <strong>{draft.paymentTerms || "[Payment Terms]"}</strong>.
          </ContractSection>

          <ContractSection title="Timeline">
            Start date: <strong>{draft.startDate || "[Start Date]"}</strong>
            <br />
            End date: <strong>{draft.endDate || "Not specified"}</strong>
          </ContractSection>

          {draft.customClause.trim() && (
            <ContractSection title="Custom Clause">{draft.customClause}</ContractSection>
          )}

          <ContractSection title="Signatures">
            <div className="mt-4 grid gap-8 sm:grid-cols-2">
              <SignatureBlock label={draft.userName || "Provider Signature"} />
              <SignatureBlock label={draft.clientName || "Client Signature"} />
            </div>
          </ContractSection>
        </article>
      </div>
    </section>
  );
}

function ContractSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6">
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-black/80">{children}</p>
    </section>
  );
}

function SignatureBlock({ label }: { label: string }) {
  return (
    <div>
      <div className="h-10 border-b border-black/30" />
      <p className="mt-2 text-xs text-black/60">{label}</p>
    </div>
  );
}
