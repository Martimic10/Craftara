import Link from "next/link";
import ToolCard from "@/app/components/ToolCard";
import {
  Barcode,
  FileText,
  LayoutGrid,
  Receipt,
  ShieldCheck,
  Sparkles,
  Stamp,
} from "lucide-react";

const toolCards = [
  {
    name: "BarcodeForge",
    description: "Generate barcodes for products, inventory, and packaging.",
    tag: "Inventory",
    href: "/barcodeforge",
    icon: Barcode,
  },
  {
    name: "InvoiceSnap",
    description: "Create professional invoices and receipts in seconds.",
    tag: "Payments",
    href: "/invoicesnap",
    icon: Receipt,
  },
  {
    name: "LabelCraft",
    description: "Design product labels, stickers, and packaging designs.",
    tag: "Design",
    href: "/labelcraft",
    icon: Stamp,
  },
  {
    name: "FormVault",
    description: "Build forms for surveys, RSVPs, and data collection.",
    tag: "Forms",
    href: "/formvault",
    icon: FileText,
  },
  {
    name: "ContractQuick",
    description: "Generate simple contracts, proposals, and agreements.",
    tag: "Legal",
    href: "/contractquick",
    icon: ShieldCheck,
  },
];

export default function ToolsPage() {
  return (
    <main>
      <section className="px-4 pb-14 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-black/10 bg-white/75 p-7 shadow-sm sm:p-10">
          <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-blue-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 right-0 h-64 w-64 rounded-full bg-white/60 blur-3xl" />

          <div className="relative max-w-3xl">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl">
              Explore Craftara Tools
            </h1>
            <p className="mt-4 text-base text-black/70 sm:text-lg">
              Everything you need to create professional business outputs in seconds — invoices,
              labels, barcodes, forms, and contracts.
            </p>
            <div className="mt-6 max-w-xl rounded-xl border border-black/15 bg-white/90 px-3 py-3 text-sm text-black/45">
              Search tools...
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {toolCards.map((tool) => (
              <ToolCard key={tool.name} {...tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-6xl rounded-2xl border border-black/10 bg-white/80 p-6 sm:p-8">
          <h2 className="text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            Built for real-world business workflows.
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "No subscriptions — ever",
                description: "One-time payment options with lifetime access.",
                icon: Sparkles,
              },
              {
                title: "Export ready files (PDF, PNG, CSV, SVG)",
                description: "Generate outputs that are immediately usable in real workflows.",
                icon: FileText,
              },
              {
                title: "Made for freelancers, Etsy sellers, and small businesses",
                description: "Tools designed for practical day-to-day operations.",
                icon: LayoutGrid,
              },
            ].map((item, index) => (
              <article key={item.title} className="rounded-xl border border-black/10 bg-white p-5">
                <item.icon className="mb-3 h-5 w-5 text-blue-600" />
                <p className="text-xs font-medium text-black/55">Step {index + 1}</p>
                <h3 className="mt-1 text-xl font-semibold text-black">{item.title}</h3>
                <p className="mt-2 text-sm text-black/70">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/15 bg-[#0d1016] shadow-[0_18px_50px_rgba(0,0,0,0.32)]">
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.045)_0px,rgba(255,255,255,0.045)_2px,transparent_2px,transparent_10px)]" />

          <div className="relative p-7 text-center sm:p-10">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to build professional outputs in seconds?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-white/80 sm:text-base">
              One-time payment. Lifetime access to all tools.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/#pricing"
                className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-100"
              >
                Get Full Access ($99)
              </Link>
              <Link
                href="/invoicesnap"
                className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Try Tools Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-lg font-semibold text-black">Craftara</p>
            <p className="mt-2 text-sm text-black/70">
              Built for creators, freelancers, and small businesses.
            </p>
            <p className="mt-3 text-xs text-black/50">© {new Date().getFullYear()} Craftara. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-5 text-sm text-black/80">
            <Link href="/" className="transition hover:text-black">
              Home
            </Link>
            <Link href="/tools" className="transition hover:text-black">
              Tools
            </Link>
            <Link href="/#pricing" className="transition hover:text-black">
              Pricing
            </Link>
            <Link href="/#faq" className="transition hover:text-black">
              FAQ
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
