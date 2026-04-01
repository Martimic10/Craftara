"use client";

import type { FormField, FormResponse } from "@/components/FormVaultTypes";

type FormResponsesProps = {
  responses: FormResponse[];
  fields: FormField[];
  onExportCsv: () => void;
};

export default function FormResponses({ responses, fields, onExportCsv }: FormResponsesProps) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-base font-semibold text-black">Responses ({responses.length})</h2>
        <button
          type="button"
          onClick={onExportCsv}
          className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Export CSV
        </button>
      </div>

      {responses.length === 0 ? (
        <div className="rounded-xl border border-black/10 bg-[#f9fafb] p-4 text-sm text-black/60">
          No responses yet. Submit the preview form to simulate responses.
        </div>
      ) : (
        <div className="space-y-3">
          {responses.map((response) => (
            <article key={response.id} className="rounded-xl border border-black/10 bg-[#f9fafb] p-3">
              <p className="text-xs font-medium text-black/55">{new Date(response.timestamp).toLocaleString()}</p>
              <div className="mt-2 space-y-1.5">
                {fields.map((field) => (
                  <div key={`${response.id}-${field.id}`} className="text-xs text-black/75">
                    <span className="font-semibold text-black/85">{field.label || field.type}: </span>
                    <span>{response.values[field.id] || "-"}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
