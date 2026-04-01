"use client";

import type { ReactNode } from "react";
import { RotateCcw } from "lucide-react";

export type ContractTemplateType = "service-agreement" | "freelance-contract" | "simple-nda";

export type ContractDraft = {
  templateType: ContractTemplateType;
  userName: string;
  clientName: string;
  projectDescription: string;
  paymentAmount: string;
  paymentTerms: string;
  startDate: string;
  endDate: string;
  customClause: string;
};

type ContractFormProps = {
  draft: ContractDraft;
  onChange: <K extends keyof ContractDraft>(key: K, value: ContractDraft[K]) => void;
  onDownloadPdf: () => void;
  onReset: () => void;
};

export default function ContractForm({ draft, onChange, onDownloadPdf, onReset }: ContractFormProps) {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-black">Contract Template</h2>
        <label className="mt-3 block">
          <span className="mb-1 block text-sm font-medium text-black/70">Template Type</span>
          <select
            value={draft.templateType}
            onChange={(e) => onChange("templateType", e.target.value as ContractTemplateType)}
            className="h-11 w-full rounded-xl border border-black/15 bg-white px-3 text-sm outline-none transition focus:border-blue-500"
          >
            <option value="service-agreement">Service Agreement</option>
            <option value="freelance-contract">Freelance Contract</option>
            <option value="simple-nda">Simple NDA</option>
          </select>
        </label>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-black">Contract Details</h2>
        <div className="mt-3 space-y-3">
          <Field label="Your Name / Business Name">
            <input
              value={draft.userName}
              onChange={(e) => onChange("userName", e.target.value)}
              className="h-11 w-full rounded-xl border border-black/15 px-3 text-sm outline-none transition focus:border-blue-500"
            />
          </Field>

          <Field label="Client Name">
            <input
              value={draft.clientName}
              onChange={(e) => onChange("clientName", e.target.value)}
              className="h-11 w-full rounded-xl border border-black/15 px-3 text-sm outline-none transition focus:border-blue-500"
            />
          </Field>

          <Field label="Project Description">
            <textarea
              value={draft.projectDescription}
              onChange={(e) => onChange("projectDescription", e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-black/15 px-3 py-2 text-sm outline-none transition focus:border-blue-500"
            />
          </Field>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Payment Amount">
              <input
                value={draft.paymentAmount}
                onChange={(e) => onChange("paymentAmount", e.target.value)}
                placeholder="$1000"
                className="h-11 w-full rounded-xl border border-black/15 px-3 text-sm outline-none transition focus:border-blue-500"
              />
            </Field>

            <Field label="Payment Terms">
              <input
                value={draft.paymentTerms}
                onChange={(e) => onChange("paymentTerms", e.target.value)}
                placeholder="Net 7"
                className="h-11 w-full rounded-xl border border-black/15 px-3 text-sm outline-none transition focus:border-blue-500"
              />
            </Field>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Start Date">
              <input
                type="date"
                value={draft.startDate}
                onChange={(e) => onChange("startDate", e.target.value)}
                className="h-11 w-full rounded-xl border border-black/15 px-3 text-sm outline-none transition focus:border-blue-500"
              />
            </Field>

            <Field label="End Date (optional)">
              <input
                type="date"
                value={draft.endDate}
                onChange={(e) => onChange("endDate", e.target.value)}
                className="h-11 w-full rounded-xl border border-black/15 px-3 text-sm outline-none transition focus:border-blue-500"
              />
            </Field>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-black">Additional Section</h2>
        <label className="mt-3 block">
          <span className="mb-1 block text-sm font-medium text-black/70">Custom Clause (optional)</span>
          <textarea
            value={draft.customClause}
            onChange={(e) => onChange("customClause", e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-black/15 px-3 py-2 text-sm outline-none transition focus:border-blue-500"
          />
        </label>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
        <p className="text-xs text-black/60">
          This document is a general template and not legal advice.
        </p>
        <button
          type="button"
          onClick={onDownloadPdf}
          className="mt-4 inline-flex w-full justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Download PDF
        </button>
        <button
          type="button"
          onClick={onReset}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-black/5"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </section>
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
