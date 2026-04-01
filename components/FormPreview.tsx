"use client";

import type { FormEvent } from "react";
import type { FormField } from "@/components/FormVaultTypes";

type FormPreviewProps = {
  title: string;
  description: string;
  fields: FormField[];
  values: Record<string, string>;
  submitError: string | null;
  onValueChange: (id: string, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function FormPreview({
  title,
  description,
  fields,
  values,
  submitError,
  onValueChange,
  onSubmit,
}: FormPreviewProps) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-black">Live Form Preview</h2>

      <div className="mt-4 rounded-2xl border border-black/10 bg-[#f9fafb] p-4">
        <form onSubmit={onSubmit} className="rounded-xl border border-black/10 bg-white p-5">
          <h3 className="text-2xl font-semibold tracking-tight text-black">{title || "Untitled Form"}</h3>
          <p className="mt-2 text-sm text-black/65">{description || "Form description goes here."}</p>

          <div className="mt-5 space-y-4">
            {fields.map((field) => (
              <label key={field.id} className="block">
                <span className="mb-1 block text-sm font-medium text-black/75">
                  {field.label || "Untitled field"}
                  {field.required && <span className="text-red-500"> *</span>}
                </span>

                {field.type === "textarea" && (
                  <textarea
                    value={values[field.id] ?? ""}
                    onChange={(e) => onValueChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full rounded-xl border border-black/15 px-3 py-2 text-sm outline-none focus:border-blue-500"
                  />
                )}

                {field.type === "dropdown" && (
                  <select
                    value={values[field.id] ?? ""}
                    onChange={(e) => onValueChange(field.id, e.target.value)}
                    className="h-11 w-full rounded-xl border border-black/15 px-3 text-sm outline-none focus:border-blue-500"
                  >
                    <option value="">{field.placeholder || "Select an option"}</option>
                    {field.options.map((option, index) => (
                      <option key={`${field.id}-${index}`} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                )}

                {field.type !== "textarea" && field.type !== "dropdown" && (
                  <input
                    type={field.type}
                    value={values[field.id] ?? ""}
                    onChange={(e) => onValueChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="h-11 w-full rounded-xl border border-black/15 px-3 text-sm outline-none focus:border-blue-500"
                  />
                )}
              </label>
            ))}
          </div>

          {submitError && <p className="mt-3 text-sm font-medium text-red-600">{submitError}</p>}

          <button
            type="submit"
            className="mt-5 inline-flex rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Submit Response
          </button>
        </form>
      </div>
    </section>
  );
}
