"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type { FormField, FormFieldType } from "@/components/FormVaultTypes";

type FormBuilderProps = {
  formTitle: string;
  formDescription: string;
  fields: FormField[];
  shareId: string;
  onFormTitleChange: (value: string) => void;
  onFormDescriptionChange: (value: string) => void;
  onAddField: (type: FormFieldType) => void;
  onUpdateField: (id: string, patch: Partial<FormField>) => void;
  onRemoveField: (id: string) => void;
  onMoveField: (id: string, direction: "up" | "down") => void;
  onAddOption: (id: string) => void;
  onUpdateOption: (id: string, index: number, value: string) => void;
  onRemoveOption: (id: string, index: number) => void;
};

export default function FormBuilder({
  formTitle,
  formDescription,
  fields,
  shareId,
  onFormTitleChange,
  onFormDescriptionChange,
  onAddField,
  onUpdateField,
  onRemoveField,
  onMoveField,
  onAddOption,
  onUpdateOption,
  onRemoveOption,
}: FormBuilderProps) {
  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-black">Form Settings</h2>
        <label className="mt-3 block">
          <span className="mb-1 block text-sm font-medium text-black/70">Form Title</span>
          <input
            value={formTitle}
            onChange={(e) => onFormTitleChange(e.target.value)}
            className="h-11 w-full rounded-xl border border-black/15 px-3 text-sm outline-none transition focus:border-blue-500"
          />
        </label>
        <label className="mt-3 block">
          <span className="mb-1 block text-sm font-medium text-black/70">Form Description</span>
          <textarea
            value={formDescription}
            onChange={(e) => onFormDescriptionChange(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-black/15 px-3 py-2 text-sm outline-none transition focus:border-blue-500"
          />
        </label>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-black">Add Fields</h2>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <AddButton label="Add Text Field" onClick={() => onAddField("text")} />
          <AddButton label="Add Email Field" onClick={() => onAddField("email")} />
          <AddButton label="Add Number Field" onClick={() => onAddField("number")} />
          <AddButton label="Add Textarea" onClick={() => onAddField("textarea")} />
          <AddButton label="Add Dropdown" onClick={() => onAddField("dropdown")} />
        </div>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-black">Fields</h2>
        <div className="mt-3 space-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="rounded-xl border border-black/10 bg-[#f9fafb] p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-[0.12em] text-black/45">{field.type}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onMoveField(field.id, "up")}
                    disabled={index === 0}
                    className="rounded-md border border-black/15 p-1 text-black/70 disabled:opacity-40"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onMoveField(field.id, "down")}
                    disabled={index === fields.length - 1}
                    className="rounded-md border border-black/15 p-1 text-black/70 disabled:opacity-40"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveField(field.id)}
                    className="rounded-md border border-red-200 p-1 text-red-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-black/65">Label</span>
                <input
                  value={field.label}
                  onChange={(e) => onUpdateField(field.id, { label: e.target.value })}
                  className="h-10 w-full rounded-lg border border-black/15 px-3 text-sm outline-none focus:border-blue-500"
                />
              </label>

              <label className="mt-2 block">
                <span className="mb-1 block text-xs font-medium text-black/65">Placeholder</span>
                <input
                  value={field.placeholder}
                  onChange={(e) => onUpdateField(field.id, { placeholder: e.target.value })}
                  className="h-10 w-full rounded-lg border border-black/15 px-3 text-sm outline-none focus:border-blue-500"
                />
              </label>

              <label className="mt-2 inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-2.5 py-2">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) => onUpdateField(field.id, { required: e.target.checked })}
                  className="h-4 w-4 accent-blue-600"
                />
                <span className="text-xs font-medium text-black/70">Required</span>
              </label>

              {field.type === "dropdown" && (
                <div className="mt-3 rounded-lg border border-black/10 bg-white p-2.5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-black/70">Options</span>
                    <button
                      type="button"
                      onClick={() => onAddOption(field.id)}
                      className="inline-flex items-center gap-1 rounded-md border border-black/15 px-2 py-1 text-xs font-medium"
                    >
                      <Plus className="h-3 w-3" />
                      Add
                    </button>
                  </div>
                  <div className="space-y-2">
                    {field.options.map((option, optionIndex) => (
                      <div key={`${field.id}-option-${optionIndex}`} className="flex items-center gap-2">
                        <input
                          value={option}
                          onChange={(e) => onUpdateOption(field.id, optionIndex, e.target.value)}
                          className="h-9 w-full rounded-md border border-black/15 px-2 text-xs outline-none focus:border-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => onRemoveOption(field.id, optionIndex)}
                          className="rounded-md border border-red-200 p-1 text-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-black">Share Form</h2>
        <div className="mt-3 rounded-xl border border-black/10 bg-[#f9fafb] px-3 py-2 text-sm text-black/70">
          craftara.app/form/{shareId}
        </div>
      </section>
    </div>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-black/15 bg-white px-3 py-2 text-sm font-medium transition hover:bg-black/5"
    >
      {label}
    </button>
  );
}
