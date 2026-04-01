"use client";

import { useEffect, useState } from "react";
import bwipjs from "bwip-js/browser";
import type { BarcodeSettings } from "@/components/BarcodeControls";

type BarcodePreviewProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  settings: BarcodeSettings;
};

export default function BarcodePreview({ canvasRef, settings }: BarcodePreviewProps) {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!settings.value.trim()) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      canvas.width = 900;
      canvas.height = 360;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#6b7280";
      ctx.font = "24px ui-sans-serif, system-ui, -apple-system, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Enter a barcode value to preview", canvas.width / 2, canvas.height / 2);
      setError(null);
      return;
    }

    try {
      bwipjs.toCanvas(canvas, {
        bcid: settings.barcodeType,
        text: settings.value.trim(),
        scale: settings.width,
        height: settings.height,
        includetext: settings.showText,
        textxalign: "center",
        backgroundcolor: settings.backgroundColor.replace("#", ""),
        barcolor: settings.lineColor.replace("#", ""),
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to render barcode.");
    }
  }, [canvasRef, settings]);

  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-black">Live Preview</h2>
        <span className="rounded-full border border-black/10 bg-[#f9fafb] px-2.5 py-1 text-xs text-black/65">
          {settings.barcodeType.toUpperCase()}
        </span>
      </div>

      <div className="rounded-2xl border border-black/10 bg-[#f9fafb] p-4">
        <div className="mx-auto max-w-[520px] rounded-xl bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <canvas ref={canvasRef} className="mx-auto block w-full rounded-lg border border-black/10" />
        </div>
      </div>

      {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
    </section>
  );
}
