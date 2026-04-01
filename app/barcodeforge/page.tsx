"use client";

import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import PaywallModal from "@/app/components/PaywallModal";
import { useAuth } from "@/app/components/AuthProvider";
import { startCheckout } from "@/lib/client-checkout";
import { decreaseUsage } from "@/lib/usage";
import BarcodeControls, { type BarcodeSettings } from "@/components/BarcodeControls";
import BarcodePreview from "@/components/BarcodePreview";

const isPro = false;
const STORAGE_KEY = "craftara:barcodeforge:settings";

const DEFAULT_SETTINGS: BarcodeSettings = {
  value: "CF-10001",
  barcodeType: "code128",
  width: 2,
  height: 90,
  showText: true,
  lineColor: "#000000",
  backgroundColor: "#ffffff",
};

export default function BarcodeForgePage() {
  const router = useRouter();
  const { user, freeUsesRemaining, hasPaid } = useAuth();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [settings, setSettings] = useState<BarcodeSettings>(DEFAULT_SETTINGS);
  const [showPaywall, setShowPaywall] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as BarcodeSettings;
      setSettings({ ...DEFAULT_SETTINGS, ...parsed });
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof BarcodeSettings>(key: K, value: BarcodeSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: "retail" | "compact" | "large") => {
    if (preset === "retail") {
      setSettings((prev) => ({ ...prev, width: 2, height: 90, showText: true }));
      return;
    }
    if (preset === "compact") {
      setSettings((prev) => ({ ...prev, width: 1, height: 60, showText: false }));
      return;
    }
    setSettings((prev) => ({ ...prev, width: 4, height: 130, showText: true }));
  };

  const runWithUsageGate = (action: () => void) => {
    if (!user) {
      router.push("/auth");
      return;
    }
    if (hasPaid) {
      action();
      return;
    }
    if (freeUsesRemaining <= 0) {
      setShowPaywall(true);
      return;
    }
    action();
    void decreaseUsage(user.uid).catch((error) => {
      console.error("Failed to decrement usage", error);
    });
  };

  const downloadPng = () => {
    if (!isPro) {
      runWithUsageGate(() => {
        if (!canvasRef.current) return;
        const dataUrl = canvasRef.current.toDataURL("image/png", 1.0);
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `barcodeforge-${settings.value || "barcode"}.png`;
        link.click();
      });
    }
  };

  const downloadPdf = () => {
    if (!isPro) {
      runWithUsageGate(() => {
        if (!canvasRef.current) return;
        const doc = new jsPDF({ unit: "pt", format: "a4" });
        const pageW = doc.internal.pageSize.getWidth();
        const pageH = doc.internal.pageSize.getHeight();

        const imageData = canvasRef.current.toDataURL("image/png", 1.0);
        const canvasW = canvasRef.current.width || 900;
        const canvasH = canvasRef.current.height || 360;

        const maxW = pageW - 120;
        const maxH = pageH - 180;
        const ratio = Math.min(maxW / canvasW, maxH / canvasH);
        const renderW = canvasW * ratio;
        const renderH = canvasH * ratio;
        const x = (pageW - renderW) / 2;
        const y = (pageH - renderH) / 2;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("BarcodeForge Export", 60, 56);

        doc.addImage(imageData, "PNG", x, y, renderW, renderH);
        doc.save(`barcodeforge-${settings.value || "barcode"}.pdf`);
      });
    }
  };

  const resetSettings = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <main className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-black/55">Craftara / Tools / BarcodeForge</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-black">BarcodeForge</h1>
          <p className="mt-2 max-w-2xl text-sm text-black/70">
            Generate clean barcodes for product labels, inventory systems, and packaging in seconds.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <BarcodeControls
            settings={settings}
            onChange={updateSetting}
            onPreset={applyPreset}
            onDownloadPng={downloadPng}
            onDownloadPdf={downloadPdf}
            onReset={resetSettings}
          />
          <BarcodePreview canvasRef={canvasRef} settings={settings} />
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
