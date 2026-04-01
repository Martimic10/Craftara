"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import LabelControls, { type LabelSizeKey } from "@/components/LabelControls";
import LabelPreview from "@/components/LabelPreview";

const isPro = false;
const DEFAULT_LABEL_SIZE: LabelSizeKey = "medium";
const DEFAULT_BACKGROUND_COLOR = "#ffffff";
const DEFAULT_TEXT = "Your Brand";
const DEFAULT_FONT_SIZE = 42;
const DEFAULT_TEXT_COLOR = "#111111";

export default function LabelCraftPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [labelSize, setLabelSize] = useState<LabelSizeKey>(DEFAULT_LABEL_SIZE);
  const [backgroundColor, setBackgroundColor] = useState(DEFAULT_BACKGROUND_COLOR);
  const [text, setText] = useState(DEFAULT_TEXT);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [textColor, setTextColor] = useState(DEFAULT_TEXT_COLOR);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const canExport = useMemo(() => {
    return true;
  }, []);

  useEffect(() => {
    return () => {
      if (logoUrl) URL.revokeObjectURL(logoUrl);
    };
  }, [logoUrl]);

  const handleUploadLogo = (file: File | null) => {
    if (!file) return;
    if (logoUrl) URL.revokeObjectURL(logoUrl);
    const nextUrl = URL.createObjectURL(file);
    setLogoUrl(nextUrl);
  };

  const handleRemoveLogo = () => {
    if (logoUrl) URL.revokeObjectURL(logoUrl);
    setLogoUrl(null);
  };

  const handleDownloadPng = () => {
    if (!isPro) {
      if (!canExport || !canvasRef.current) return;
      const dataUrl = canvasRef.current.toDataURL("image/png", 1.0);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `labelcraft-${labelSize}.png`;
      link.click();
      return;
    }
  };

  const handleReset = () => {
    if (logoUrl) URL.revokeObjectURL(logoUrl);
    setLabelSize(DEFAULT_LABEL_SIZE);
    setBackgroundColor(DEFAULT_BACKGROUND_COLOR);
    setText(DEFAULT_TEXT);
    setFontSize(DEFAULT_FONT_SIZE);
    setTextColor(DEFAULT_TEXT_COLOR);
    setLogoUrl(null);
  };

  return (
    <main className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-black/55">Craftara / Tools / LabelCraft</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-black">LabelCraft</h1>
          <p className="mt-2 max-w-2xl text-sm text-black/70">
            Build clean product labels and stickers fast. Upload a logo, style your text, and export high-quality PNG
            files in seconds.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <LabelControls
            labelSize={labelSize}
            backgroundColor={backgroundColor}
            text={text}
            fontSize={fontSize}
            textColor={textColor}
            logoUrl={logoUrl}
            onLabelSizeChange={setLabelSize}
            onBackgroundColorChange={setBackgroundColor}
            onTextChange={setText}
            onFontSizeChange={setFontSize}
            onTextColorChange={setTextColor}
            onLogoUpload={handleUploadLogo}
            onRemoveLogo={handleRemoveLogo}
            onDownload={handleDownloadPng}
            onReset={handleReset}
          />

          <LabelPreview
            canvasRef={canvasRef}
            labelSize={labelSize}
            backgroundColor={backgroundColor}
            text={text}
            fontSize={fontSize}
            textColor={textColor}
            logoUrl={logoUrl}
          />
        </div>
      </div>
    </main>
  );
}
