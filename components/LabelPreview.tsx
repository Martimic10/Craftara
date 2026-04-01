"use client";

import { useEffect } from "react";
import type { LabelSizeKey } from "@/components/LabelControls";
import { LABEL_SIZES } from "@/components/LabelControls";

type LabelPreviewProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  labelSize: LabelSizeKey;
  backgroundColor: string;
  text: string;
  fontSize: number;
  textColor: string;
  logoUrl: string | null;
};

export default function LabelPreview({
  canvasRef,
  labelSize,
  backgroundColor,
  text,
  fontSize,
  textColor,
  logoUrl,
}: LabelPreviewProps) {
  const size = LABEL_SIZES[labelSize];
  const displaySize = labelSize === "small" ? 240 : labelSize === "medium" ? 340 : 460;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = (logoImg?: HTMLImageElement) => {
      canvas.width = size;
      canvas.height = size;

      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, size, size);

      const padding = size * 0.08;
      let currentY = padding;

      if (logoImg) {
        const maxLogoW = size * 0.45;
        const maxLogoH = size * 0.35;
        const ratio = Math.min(maxLogoW / logoImg.width, maxLogoH / logoImg.height, 1);
        const logoW = logoImg.width * ratio;
        const logoH = logoImg.height * ratio;
        const x = (size - logoW) / 2;
        const y = size * 0.18;

        ctx.drawImage(logoImg, x, y, logoW, logoH);
        currentY = y + logoH + size * 0.08;
      } else {
        currentY = size * 0.45;
      }

      ctx.fillStyle = textColor;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `600 ${fontSize}px ui-sans-serif, system-ui, -apple-system, sans-serif`;

      const lines = wrapText(ctx, text || "Your Label", size - padding * 2);
      const lineHeight = fontSize * 1.2;
      let textY = currentY;
      if (!logoImg) {
        textY = size / 2 - ((lines.length - 1) * lineHeight) / 2;
      }

      lines.forEach((line, index) => {
        ctx.fillText(line, size / 2, textY + index * lineHeight);
      });
    };

    if (!logoUrl) {
      draw();
      return;
    }

    const img = new Image();
    img.onload = () => draw(img);
    img.src = logoUrl;
  }, [canvasRef, size, backgroundColor, text, fontSize, textColor, logoUrl]);

  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-black">Live Preview</h2>
        <span className="rounded-full border border-black/10 bg-[#f9fafb] px-2.5 py-1 text-xs text-black/65">
          {size}x{size}
        </span>
      </div>

      <div className="rounded-2xl border border-black/10 bg-[#f9fafb] p-4">
        <div
          className="mx-auto rounded-xl bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
          style={{ width: displaySize + 24, height: displaySize + 24, maxWidth: "100%" }}
        >
          <canvas
            ref={canvasRef}
            className="rounded-lg border border-black/10"
            style={{ width: displaySize, height: displaySize, maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
      </div>
    </section>
  );
}

function wrapText(ctx: CanvasRenderingContext2D, value: string, maxWidth: number) {
  const words = value.trim().split(/\s+/);
  if (!words.length) return [""];

  const lines: string[] = [];
  let line = words[0] ?? "";

  for (let i = 1; i < words.length; i += 1) {
    const word = words[i]!;
    const test = `${line} ${word}`;
    if (ctx.measureText(test).width <= maxWidth) {
      line = test;
    } else {
      lines.push(line);
      line = word;
    }
  }
  lines.push(line);
  return lines.slice(0, 3);
}
