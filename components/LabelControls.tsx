"use client";

import Image from "next/image";
import type { ChangeEvent } from "react";
import { Download, RotateCcw, Upload, X } from "lucide-react";

export type LabelSizeKey = "small" | "medium" | "large";

export const LABEL_SIZES: Record<LabelSizeKey, number> = {
  small: 300,
  medium: 500,
  large: 800,
};

type LabelControlsProps = {
  labelSize: LabelSizeKey;
  backgroundColor: string;
  text: string;
  fontSize: number;
  textColor: string;
  logoUrl: string | null;
  onLabelSizeChange: (value: LabelSizeKey) => void;
  onBackgroundColorChange: (value: string) => void;
  onTextChange: (value: string) => void;
  onFontSizeChange: (value: number) => void;
  onTextColorChange: (value: string) => void;
  onLogoUpload: (file: File | null) => void;
  onRemoveLogo: () => void;
  onDownload: () => void;
  onReset: () => void;
};

export default function LabelControls({
  labelSize,
  backgroundColor,
  text,
  fontSize,
  textColor,
  logoUrl,
  onLabelSizeChange,
  onBackgroundColorChange,
  onTextChange,
  onFontSizeChange,
  onTextColorChange,
  onLogoUpload,
  onRemoveLogo,
  onDownload,
  onReset,
}: LabelControlsProps) {
  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    onLogoUpload(event.target.files?.[0] ?? null);
  };

  return (
    <div className="space-y-4">
      <Card title="Label Settings">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-black/70">Label Size</span>
          <select
            value={labelSize}
            onChange={(e) => onLabelSizeChange(e.target.value as LabelSizeKey)}
            className="h-11 w-full rounded-xl border border-black/15 bg-white px-3 text-sm text-black outline-none transition focus:border-blue-500"
          >
            <option value="small">Small (300x300)</option>
            <option value="medium">Medium (500x500)</option>
            <option value="large">Large (800x800)</option>
          </select>
        </label>

        <label className="mt-4 block">
          <span className="mb-1 block text-sm font-medium text-black/70">Background Color</span>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => onBackgroundColorChange(e.target.value)}
            className="h-11 w-full cursor-pointer rounded-xl border border-black/15 bg-white px-2"
          />
        </label>
      </Card>

      <Card title="Text Editor">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-black/70">Text</span>
          <input
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            placeholder="Your label text"
            className="h-11 w-full rounded-xl border border-black/15 bg-white px-3 text-sm text-black outline-none transition focus:border-blue-500"
          />
        </label>

        <label className="mt-4 block">
          <span className="mb-1 block text-sm font-medium text-black/70">Font Size ({fontSize})</span>
          <input
            type="range"
            min={12}
            max={72}
            value={fontSize}
            onChange={(e) => onFontSizeChange(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </label>

        <label className="mt-4 block">
          <span className="mb-1 block text-sm font-medium text-black/70">Text Color</span>
          <input
            type="color"
            value={textColor}
            onChange={(e) => onTextColorChange(e.target.value)}
            className="h-11 w-full cursor-pointer rounded-xl border border-black/15 bg-white px-2"
          />
        </label>

        <div className="mt-4">
          <span className="mb-1 block text-sm font-medium text-black/70">Alignment</span>
          <div className="h-11 rounded-xl border border-black/15 bg-[#f9fafb] px-3 text-sm leading-[44px] text-black/65">
            Center (MVP)
          </div>
        </div>
      </Card>

      <Card title="Logo Upload">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-black/15 bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-black/5">
          <Upload className="h-4 w-4" />
          Upload PNG/JPG
          <input type="file" accept="image/png,image/jpeg,image/jpg" onChange={handleFileInput} className="hidden" />
        </label>

        {logoUrl ? (
          <div className="mt-4 rounded-xl border border-black/10 bg-[#f9fafb] p-3">
            <Image src={logoUrl} alt="Logo preview" width={80} height={80} unoptimized className="rounded-md object-contain" />
            <button
              type="button"
              onClick={onRemoveLogo}
              className="mt-3 inline-flex items-center gap-1 rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
            >
              <X className="h-3.5 w-3.5" />
              Remove logo
            </button>
          </div>
        ) : (
          <p className="mt-3 text-sm text-black/60">No logo uploaded yet.</p>
        )}
      </Card>

      <Card title="Actions">
        <button
          type="button"
          onClick={onDownload}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Download className="h-4 w-4" />
          Download PNG
        </button>
        <button
          type="button"
          onClick={onReset}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-black/5"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>
      </Card>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-black">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
