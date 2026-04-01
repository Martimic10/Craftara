"use client";

import { useState } from "react";
import CheckoutButton from "@/app/components/CheckoutButton";
import type { ProductKey } from "@/lib/billing";

const toolPricing = [
  { id: "barcodeforge", name: "BarcodeForge", price: 15 },
  { id: "invoicesnap", name: "InvoiceSnap", price: 25 },
  { id: "labelcraft", name: "LabelCraft", price: 15 },
  { id: "formvault", name: "FormVault", price: 20 },
  { id: "contractquick", name: "ContractQuick", price: 35 },
] as const;

export default function IndividualToolsPricingCard() {
  const [selectedTool, setSelectedTool] = useState<(typeof toolPricing)[number]>(toolPricing[0]!);

  return (
    <article className="rounded-2xl border border-black/15 bg-white/85 p-8 shadow-sm lg:p-9">
      <h3 className="text-4xl font-semibold tracking-tight text-black">Individual Tools</h3>
      <p className="mt-2 text-base font-semibold text-black">
        Selected: {selectedTool.name}
      </p>
      <p className="mt-3 text-5xl font-semibold leading-none text-black">${selectedTool.price}</p>
      <p className="mt-1 text-sm text-black/55">/tool, one-time payment</p>
      <ul className="mt-7 space-y-3 text-sm text-black/80">
        <li className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-600" /> Lifetime access
        </li>
        <li className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-600" /> Pick any of the 5 tools
        </li>
        <li className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-600" /> Commercial use
        </li>
      </ul>

      <div className="mt-6">
        <label htmlFor="individual-tool-select" className="mb-2 block text-sm font-medium text-black/70">
          Choose your tool:
        </label>
        <select
          id="individual-tool-select"
          value={selectedTool.id}
          onChange={(event) => {
            const next = toolPricing.find((tool) => tool.id === event.target.value);
            if (next) setSelectedTool(next);
          }}
          className="h-11 w-full rounded-xl border border-black/15 bg-white px-3 text-sm font-medium text-black outline-none transition focus:border-blue-500"
        >
          {toolPricing.map((tool) => (
            <option key={tool.id} value={tool.id}>
              {tool.name} (${tool.price})
            </option>
          ))}
        </select>
      </div>

      <CheckoutButton
        productKey={selectedTool.id as ProductKey}
        className="mt-8 block w-full rounded-full bg-blue-600 px-4 py-3.5 text-center text-sm font-semibold text-white"
      >
        Get Individual Tool
      </CheckoutButton>
    </article>
  );
}
