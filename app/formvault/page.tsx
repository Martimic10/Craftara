"use client";

import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/app/components/AuthProvider";
import PaywallModal from "@/app/components/PaywallModal";
import { startCheckout } from "@/lib/client-checkout";
import { decreaseUsage } from "@/lib/usage";
import FormBuilder from "@/components/FormBuilder";
import FormPreview from "@/components/FormPreview";
import FormResponses from "@/components/FormResponses";
import type { FormField, FormFieldType, FormResponse } from "@/components/FormVaultTypes";

const STORAGE_KEY = "craftara:formvault:data";
const isPro = false;

function createField(type: FormFieldType): FormField {
  const defaultLabel = {
    text: "Text Field",
    email: "Email Field",
    number: "Number Field",
    textarea: "Textarea Field",
    dropdown: "Dropdown Field",
  }[type];

  return {
    id: crypto.randomUUID(),
    type,
    label: defaultLabel,
    placeholder: "",
    required: false,
    options: type === "dropdown" ? ["Option 1", "Option 2"] : [],
  };
}

type StoredData = {
  formTitle: string;
  formDescription: string;
  shareId: string;
  fields: FormField[];
  responses: FormResponse[];
};

const DEFAULT_FORM_TITLE = "Customer Feedback Form";
const DEFAULT_FORM_DESCRIPTION = "Share your feedback in less than a minute.";

export default function FormVaultPage() {
  const router = useRouter();
  const { user, freeUsesRemaining, hasPaid, beforeToolRun } = useAuth();
  const [formTitle, setFormTitle] = useState(DEFAULT_FORM_TITLE);
  const [formDescription, setFormDescription] = useState(DEFAULT_FORM_DESCRIPTION);
  const [shareId, setShareId] = useState("");
  const [fields, setFields] = useState<FormField[]>([createField("text"), createField("email")]);
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      setShareId(Math.random().toString(36).slice(2, 8));
      return;
    }
    try {
      const parsed = JSON.parse(saved) as StoredData;
      setFormTitle(parsed.formTitle || DEFAULT_FORM_TITLE);
      setFormDescription(parsed.formDescription || DEFAULT_FORM_DESCRIPTION);
      setShareId(parsed.shareId || Math.random().toString(36).slice(2, 8));
      setFields(parsed.fields?.length ? parsed.fields : [createField("text"), createField("email")]);
      setResponses(parsed.responses ?? []);
    } catch {
      setShareId(Math.random().toString(36).slice(2, 8));
    }
  }, []);

  useEffect(() => {
    const payload: StoredData = { formTitle, formDescription, shareId, fields, responses };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [formTitle, formDescription, shareId, fields, responses]);

  useEffect(() => {
    setValues((prev) => {
      const next: Record<string, string> = {};
      fields.forEach((field) => {
        next[field.id] = prev[field.id] ?? "";
      });
      return next;
    });
  }, [fields]);

  const orderedFieldLabels = useMemo(() => fields.map((f) => f.label || f.type), [fields]);

  const addField = (type: FormFieldType) => {
    setFields((prev) => [...prev, createField(type)]);
  };

  const updateField = (id: string, patch: Partial<FormField>) => {
    setFields((prev) => prev.map((field) => (field.id === id ? { ...field, ...patch } : field)));
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  const moveField = (id: string, direction: "up" | "down") => {
    setFields((prev) => {
      const index = prev.findIndex((field) => field.id === id);
      if (index < 0) return prev;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[targetIndex]] = [next[targetIndex]!, next[index]!];
      return next;
    });
  };

  const addOption = (id: string) => {
    setFields((prev) =>
      prev.map((field) => {
        if (field.id !== id) return field;
        return { ...field, options: [...field.options, `Option ${field.options.length + 1}`] };
      }),
    );
  };

  const updateOption = (id: string, index: number, value: string) => {
    setFields((prev) =>
      prev.map((field) => {
        if (field.id !== id) return field;
        const nextOptions = [...field.options];
        nextOptions[index] = value;
        return { ...field, options: nextOptions };
      }),
    );
  };

  const removeOption = (id: string, index: number) => {
    setFields((prev) =>
      prev.map((field) => {
        if (field.id !== id) return field;
        return { ...field, options: field.options.filter((_, optionIndex) => optionIndex !== index) };
      }),
    );
  };

  const runWithUsageGate = async (action: () => void) => {
    if (!user) {
      router.push("/auth");
      return;
    }
    const usage = await beforeToolRun();
    if (!usage.allowed) {
      setShowPaywall(true);
      return;
    }
    action();
  };

  const submitPreview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const missing = fields.find((field) => field.required && !values[field.id]?.trim());
    if (missing) {
      setSubmitError(`"${missing.label}" is required.`);
      return;
    }
    await runWithUsageGate(() => {
      setSubmitError(null);
      setResponses((prev) => [
        {
          id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          values: { ...values },
        },
        ...prev,
      ]);

      setValues((prev) => {
        const cleared: Record<string, string> = {};
        fields.forEach((field) => {
          cleared[field.id] = "";
        });
        return { ...prev, ...cleared };
      });
    });
  };

  const exportCsv = () => {
    if (!isPro) {
      if (!responses.length) return;
      if (!user) {
        router.push("/auth");
        return;
      }
      if (!hasPaid && freeUsesRemaining <= 0) {
        setShowPaywall(true);
        return;
      }
      const runExport = () => {
        const headers = ["Timestamp", ...orderedFieldLabels];
        const rows = responses.map((response) => {
          const valuesRow = fields.map((field) => response.values[field.id] ?? "");
          return [new Date(response.timestamp).toLocaleString(), ...valuesRow];
        });

        const csv = [headers, ...rows]
          .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
          .join("\n");

        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "formvault-responses.csv";
        link.click();
        URL.revokeObjectURL(url);
      };

      runExport();
      if (!hasPaid) {
        void decreaseUsage(user.uid).catch((error) => {
          console.error("Failed to decrement usage", error);
        });
      }
    }
  };

  const resetAll = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setFormTitle(DEFAULT_FORM_TITLE);
    setFormDescription(DEFAULT_FORM_DESCRIPTION);
    setShareId(Math.random().toString(36).slice(2, 8));
    setFields([createField("text"), createField("email")]);
    setResponses([]);
    setValues({});
    setSubmitError(null);
  };

  return (
    <main className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-black/55">Craftara / Tools / FormVault</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-black">FormVault</h1>
            <p className="mt-2 max-w-2xl text-sm text-black/70">
              Build quick forms for surveys, RSVPs, feedback, and lead capture without backend setup.
            </p>
          </div>
          <button
            type="button"
            onClick={resetAll}
            className="rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-black/5"
          >
            Reset
          </button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)_360px]">
          <FormBuilder
            formTitle={formTitle}
            formDescription={formDescription}
            fields={fields}
            shareId={shareId}
            onFormTitleChange={setFormTitle}
            onFormDescriptionChange={setFormDescription}
            onAddField={addField}
            onUpdateField={updateField}
            onRemoveField={removeField}
            onMoveField={moveField}
            onAddOption={addOption}
            onUpdateOption={updateOption}
            onRemoveOption={removeOption}
          />

          <FormPreview
            title={formTitle}
            description={formDescription}
            fields={fields}
            values={values}
            submitError={submitError}
            onValueChange={(id, value) => setValues((prev) => ({ ...prev, [id]: value }))}
            onSubmit={submitPreview}
          />

          <FormResponses responses={responses} fields={fields} onExportCsv={exportCsv} />
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
