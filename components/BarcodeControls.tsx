"use client";

import { Download, FileDown, RotateCcw } from "lucide-react";

export type BarcodeType = "code128" | "code39" | "ean13" | "upca";

export type BarcodeSettings = {
  value: string;
  barcodeType: BarcodeType;
  width: number;
  height: number;
  showText: boolean;
  lineColor: string;
  backgroundColor: string;
};

type BarcodeControlsProps = {
  settings: BarcodeSettings;
  onChange: <K extends keyof BarcodeSettings>(key: K, value: BarcodeSettings[K]) => void;
  onPreset: (preset: "retail" | "compact" | "large") => void;
  onDownloadPng: () => void;
  onDownloadPdf: () => void;
  onReset: () => void;
};

export default function BarcodeControls({
  settings,
  onChange,
  onPreset,
  onDownloadPng,
  onDownloadPdf,
  onReset,
}: BarcodeControlsProps) {
  return (
    <div className="space-y-4">
      <Card title="Barcode Input">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-black/70">Barcode Value</span>
          <input
            value={settings.value}
            onChange={(e) => onChange("value", e.target.value)}
            placeholder="Enter SKU, number, or text"
            className="h-11 w-full rounded-xl border border-black/15 bg-white px-3 text-sm text-black outline-none transition focus:border-blue-500"
          />
        </label>

        <label className="mt-4 block">
          <span className="mb-1 block text-sm font-medium text-black/70">Barcode Type</span>
          <select
            value={settings.barcodeType}
            onChange={(e) => onChange("barcodeType", e.target.value as BarcodeType)}
            className="h-11 w-full rounded-xl border border-black/15 bg-white px-3 text-sm text-black outline-none transition focus:border-blue-500"
          >
            <option value="code128">Code 128</option>
            <option value="code39">Code 39</option>
            <option value="ean13">EAN-13</option>
            <option value="upca">UPC-A</option>
          </select>
        </label>
      </Card>

      <Card title="Style Settings">
        <Range
          label={`Width (${settings.width})`}
          min={1}
          max={5}
          value={settings.width}
          onChange={(value) => onChange("width", value)}
        />

        <div className="mt-4">
          <Range
            label={`Height (${settings.height})`}
            min={50}
            max={150}
            value={settings.height}
            onChange={(value) => onChange("height", value)}
          />
        </div>

        <label className="mt-4 flex items-center gap-2 rounded-xl border border-black/10 bg-[#f9fafb] px-3 py-2.5">
          <input
            type="checkbox"
            checked={settings.showText}
            onChange={(e) => onChange("showText", e.target.checked)}
            className="h-4 w-4 accent-blue-600"
          />
          <span className="text-sm font-medium text-black/75">Show text</span>
        </label>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-black/70">Line Color</span>
            <input
              type="color"
              value={settings.lineColor}
              onChange={(e) => onChange("lineColor", e.target.value)}
              className="h-11 w-full cursor-pointer rounded-xl border border-black/15 bg-white px-2"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-black/70">Background</span>
            <input
              type="color"
              value={settings.backgroundColor}
              onChange={(e) => onChange("backgroundColor", e.target.value)}
              className="h-11 w-full cursor-pointer rounded-xl border border-black/15 bg-white px-2"
            />
          </label>
        </div>
      </Card>

      <Card title="Presets">
        <div className="grid gap-2 sm:grid-cols-3">
          <PresetButton label="Retail Label" onClick={() => onPreset("retail")} />
          <PresetButton label="Compact" onClick={() => onPreset("compact")} />
          <PresetButton label="Large Print" onClick={() => onPreset("large")} />
        </div>
      </Card>

      <Card title="Actions">
        <button
          type="button"
          onClick={onDownloadPng}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Download className="h-4 w-4" />
          Download PNG
        </button>
        <button
          type="button"
          onClick={onDownloadPdf}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-3 text-sm font-semibold text-black transition hover:bg-black/5"
        >
          <FileDown className="h-4 w-4" />
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

function Range({
  label,
  min,
  max,
  value,
  onChange,
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-black/70">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-blue-600"
      />
    </label>
  );
}

function PresetButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-black/15 bg-white px-3 py-2 text-sm font-medium text-black transition hover:bg-black/5"
    >
      {label}
    </button>
  );
}
