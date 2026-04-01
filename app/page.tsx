import Link from "next/link";
import CheckoutButton from "@/app/components/CheckoutButton";
import IndividualToolsPricingCard from "@/app/components/IndividualToolsPricingCard";
import LandingAuthActions from "@/app/components/LandingAuthActions";
import SmartCtaButton from "@/app/components/SmartCtaButton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  BadgeCheck,
  Barcode,
  FileSpreadsheet,
  FileText,
  LayoutGrid,
  Package,
  Receipt,
  ShieldCheck,
  Sparkles,
  Stamp,
  Workflow,
} from "lucide-react";

const tools = [
  {
    name: "BarcodeForge",
    description: "Generate accurate barcodes for products and fulfillment.",
    tag: "Inventory",
    icon: Barcode,
  },
  {
    name: "InvoiceSnap",
    description: "Create polished invoices and payment-ready records fast.",
    tag: "Payments",
    icon: Receipt,
  },
  {
    name: "LabelCraft",
    description: "Design print-ready product, shipping, and packaging labels.",
    tag: "Shipping",
    icon: Stamp,
  },
  {
    name: "FormVault",
    description: "Build reusable forms for intake, requests, and operations.",
    tag: "Operations",
    icon: FileText,
  },
  {
    name: "ContractQuick",
    description: "Draft professional agreements with clear, structured templates.",
    tag: "Legal",
    icon: ShieldCheck,
  },
];

const faqs = [
  {
    question: "Is this a subscription?",
    answer: "No. Craftara is a one-time payment product with lifetime access to what you purchase.",
  },
  {
    question: "What file formats can I export?",
    answer: "You can export ready-to-use files in PDF, PNG, CSV, and SVG based on the selected tool.",
  },
  {
    question: "Can I use this commercially?",
    answer: "Yes. Craftara outputs are designed for commercial workflows used by freelancers and businesses.",
  },
  {
    question: "Do I need an account?",
    answer: "You can explore tools immediately. Some flows may require an account to save and manage your workspace.",
  },
  {
    question: "Is this mobile friendly?",
    answer: "Yes. The landing experience and dashboard components are designed to work across modern devices.",
  },
  {
    question: "Will more tools be added?",
    answer: "Yes. New tools and improvements are planned to expand the Craftara suite over time.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#d3d3d3] text-black">
      <section className="px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6 text-center lg:text-left">
            <p className="inline-flex rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-black/70">
              One-time payment. Lifetime access.
            </p>
            <h1 className="text-balance text-5xl font-semibold leading-[1.04] tracking-tight text-black sm:text-6xl lg:text-7xl xl:text-[5.2rem]">
              Craft professional business outputs in seconds.
            </h1>
            <p className="mx-auto max-w-xl text-base text-black/70 sm:text-lg lg:mx-0">
              One hub for invoices, labels, barcodes, forms, and contracts. No subscriptions. Just tools that work.
            </p>
            <LandingAuthActions />
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-black/10 bg-white/85 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.16)] lg:p-6">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-white/40 blur-3xl" />
            <div className="relative">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-semibold text-black">Dashboard Preview</span>
                <span className="rounded-full border border-black/10 bg-white px-2.5 py-1 text-[11px] font-medium text-black/60">
                  5 Tools
                </span>
              </div>
              <div className="rounded-2xl border border-black/10 bg-[#0f1218] p-4 sm:p-5">
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-white/50">Outputs</p>
                    <p className="mt-1 text-2xl font-semibold text-white">2,540</p>
                    <p className="text-xs text-emerald-400">+18% this week</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-gradient-to-br from-blue-600/30 to-white/[0.03] p-3">
                    <p className="text-[10px] uppercase tracking-[0.12em] text-white/50">Avg. time</p>
                    <p className="mt-1 text-2xl font-semibold text-white">12s</p>
                    <p className="text-xs text-white/70">per export flow</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {tools.map((tool) => (
                    <div key={tool.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                      <tool.icon className="mb-2 h-4 w-4 text-blue-400" />
                      <p className="text-sm font-medium text-white">{tool.name}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-16 rounded-xl border border-white/10 bg-gradient-to-r from-blue-500/25 via-blue-400/10 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="inline-flex rounded-md border border-black/10 bg-white/80 px-3 py-1 text-xs font-medium text-black/70">
              Benefits
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-black sm:text-4xl lg:text-5xl">
              Why Craftara works for real business workflows
            </h2>
            <p className="mt-4 text-sm text-black/65 sm:text-base">
              Practical tools that stay simple, export fast, and help you finish professional outputs without the
              overhead.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-5">
            <article className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md lg:col-span-2">
              <BadgeCheck className="mb-4 h-5 w-5 text-blue-600" />
              <h3 className="text-2xl font-semibold leading-tight text-black">No subscriptions. Ever.</h3>
              <p className="mt-3 text-sm text-black/70">Pay once and keep lifetime access to the tools you choose.</p>
              <div className="mt-6 overflow-hidden rounded-xl border border-black/10 bg-[#111318] p-4">
                <div className="mb-3 flex items-center justify-between rounded-lg bg-white/95 px-3 py-2">
                  <p className="text-xs font-semibold text-black">Pay once</p>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                    Lifetime
                  </span>
                </div>
                <div className="space-y-2">
                  {["No monthly fees", "No hidden plans", "Keep access forever"].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/80"
                    >
                      <span>{item}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </div>
                  ))}
                </div>
              </div>
            </article>
            <article className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md lg:col-span-3">
              <FileSpreadsheet className="mb-4 h-5 w-5 text-blue-600" />
              <h3 className="text-2xl font-semibold leading-tight text-black">
                Instant export-ready files (PDF, PNG, CSV, SVG)
              </h3>
              <p className="mt-3 text-sm text-black/70">Generate clean outputs instantly, ready to send or print.</p>
              <div className="mt-6 grid gap-3 rounded-xl border border-black/10 bg-[#111318] p-4 sm:grid-cols-4">
                {["PDF", "PNG", "CSV", "SVG"].map((file) => (
                  <div key={file} className="rounded-lg border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-white/55">Export</p>
                    <p className="mt-2 text-lg font-semibold text-white">{file}</p>
                    <p className="mt-1 text-[11px] text-emerald-400">Ready</p>
                  </div>
                ))}
              </div>
            </article>
            <article className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md lg:col-span-3">
              <Sparkles className="mb-4 h-5 w-5 text-blue-600" />
              <h3 className="text-2xl font-semibold leading-tight text-black">
                Built for Etsy sellers, freelancers, and small businesses
              </h3>
              <p className="mt-3 text-sm text-black/70">Purpose-built workflows for solo operators and growing teams.</p>
              <div className="mt-6 rounded-xl border border-black/10 bg-[#111318] p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-medium text-white/80">User Profiles</p>
                  <p className="text-[11px] text-emerald-400">Optimized</p>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  {["Etsy seller", "Freelancer", "Small business"].map((profile) => (
                    <div
                      key={profile}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/85"
                    >
                      {profile}
                    </div>
                  ))}
                </div>
              </div>
            </article>
            <article className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md lg:col-span-2">
              <LayoutGrid className="mb-4 h-5 w-5 text-blue-600" />
              <h3 className="text-2xl font-semibold leading-tight text-black">Everything in one clean dashboard</h3>
              <p className="mt-3 text-sm text-black/70">Access every core workflow in one focused workspace.</p>
              <div className="mt-6 rounded-xl border border-black/10 bg-[#111318] p-4">
                <div className="mb-3 grid grid-cols-5 gap-2">
                  {tools.map((tool) => (
                    <div key={tool.name} className="h-7 rounded-md border border-white/10 bg-white/[0.03]" />
                  ))}
                </div>
                <div className="h-20 rounded-md border border-white/10 bg-gradient-to-r from-blue-600/30 via-blue-500/10 to-transparent" />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="features" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 grid gap-5 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="inline-flex rounded-md border border-black/10 bg-white/80 px-3 py-1 text-xs font-medium text-black/70">
                Features
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl">
                All the tools, none of the complexity
              </h2>
            </div>
            <p className="max-w-lg text-sm text-black/65 sm:text-base lg:justify-self-end">
              Craftara brings your core business workflows into one focused workspace, so you can generate clean
              outputs fast and stay organized.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
              {tools.slice(0, 4).map((tool) => (
                <article key={tool.name} className="rounded-2xl border border-black/10 bg-white/80 p-5 shadow-sm">
                  <div className="mb-6 inline-flex rounded-lg border border-black/10 bg-black/90 p-2">
                    <tool.icon className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-3xl font-semibold leading-[1.06] tracking-tight text-black">{tool.name}</h3>
                  <p className="mt-3 text-sm text-black/70">{tool.description}</p>
                </article>
              ))}
            </div>
            <article className="rounded-2xl border border-black/15 bg-[#0f1218] p-5 shadow-[0_18px_42px_rgba(0,0,0,0.22)] lg:col-span-3">
              <div className="rounded-xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm font-semibold text-white">{tools[4].name}</p>
                <p className="mt-2 text-xs text-emerald-400">Live and ready to export</p>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[312, 248, 198].map((n) => (
                    <div key={n} className="rounded-md border border-white/10 bg-black/35 p-2">
                      <p className="text-[10px] text-white/45">Prepared</p>
                      <p className="mt-1 text-sm font-semibold text-white">{n}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-20 rounded-md border border-white/10 bg-gradient-to-r from-blue-500/25 via-blue-400/10 to-transparent" />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex rounded-md border border-black/10 bg-white/80 px-3 py-1 text-xs font-medium text-black/70">
              How it works
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl">
              Three steps to faster business outputs
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-black/65 sm:text-base">
              From input to export in less time than a coffee break.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {[
              { title: "1. Choose a tool", desc: "Select BarcodeForge, InvoiceSnap, LabelCraft, FormVault, or ContractQuick.", icon: LayoutGrid },
              { title: "2. Enter your details", desc: "Fill in your business data once with guided, clean inputs.", icon: FileText },
              { title: "3. Export instantly (PDF / PNG / CSV)", desc: "Generate ready-to-use outputs in seconds, with no extra formatting.", icon: Workflow },
            ].map((step, index) => (
              <article key={step.title} className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 inline-flex rounded-lg border border-black/10 bg-black/90 p-2">
                  <step.icon className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-4xl font-semibold leading-[1.08] tracking-tight text-black">{step.title}</h3>
                <p className="mt-3 text-sm text-black/70">{step.desc}</p>
                <div className="mt-6 rounded-xl border border-black/10 bg-[#111318] p-3">
                  {index === 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-3 py-2">
                        <span className="text-xs text-white/85">Last sync</span>
                        <span className="text-xs text-white/60">1 min ago</span>
                      </div>
                      {["Active tools - 5", "Ready templates - 12"].map((row) => (
                        <div
                          key={row}
                          className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-3 py-2"
                        >
                          <span className="text-xs text-white/80">{row}</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        </div>
                      ))}
                    </div>
                  )}

                  {index === 1 && (
                    <div className="space-y-2">
                      {[
                        { label: "High priority", value: "5", color: "bg-rose-400" },
                        { label: "Medium priority", value: "10", color: "bg-amber-400" },
                        { label: "Low priority", value: "12", color: "bg-emerald-400" },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.03] px-3 py-2"
                        >
                          <div className="flex items-center gap-2">
                            <span className={`h-1.5 w-1.5 rounded-full ${row.color}`} />
                            <span className="text-xs text-white/80">{row.label}</span>
                          </div>
                          <span className="text-xs text-white/70">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {index === 2 && (
                    <div>
                      <p className="mb-2 text-xs text-white/70">Total outputs</p>
                      <div className="grid h-24 grid-cols-5 items-end gap-2 rounded-md border border-white/10 bg-black/30 px-2 pb-2 pt-3">
                        {[88, 76, 62, 48, 34].map((h) => (
                          <div key={h} className="rounded-sm bg-emerald-400/95" style={{ height: `${h}%` }} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex rounded-md border border-black/10 bg-white/80 px-3 py-1 text-xs font-medium text-black/70">
              Pricing
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl">
              Simple one-time pricing
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <IndividualToolsPricingCard />

            <article className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#0d1016] p-8 shadow-[0_16px_45px_rgba(0,0,0,0.3)] lg:p-9">
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.045)_0px,rgba(255,255,255,0.045)_2px,transparent_2px,transparent_10px)]" />
              <div className="relative">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-4xl font-semibold tracking-tight text-white">Craftara Suite</h3>
                  <span className="rounded-md border border-emerald-500/25 bg-[#121820] px-3 py-1.5 text-sm font-semibold text-emerald-400">Most popular</span>
                </div>
                <p className="mt-3 text-5xl font-semibold leading-none text-white">$99</p>
                <p className="mt-1 text-sm text-white/70">one-time payment</p>
                <p className="mt-5 text-sm text-white/90">All 5 tools in one clean dashboard. Best value.</p>
                <ul className="mt-7 space-y-3 text-sm text-white/95">
                  <li className="flex items-center gap-2"><Package className="h-4 w-4 text-blue-300" /> All 5 tools</li>
                  <li className="flex items-center gap-2"><Package className="h-4 w-4 text-blue-300" /> Best value</li>
                  <li className="flex items-center gap-2"><Package className="h-4 w-4 text-blue-300" /> Lifetime access</li>
                </ul>
                <CheckoutButton
                  productKey="suite"
                  className="mt-8 block w-full rounded-full bg-white px-4 py-3.5 text-center text-sm font-semibold text-black"
                >
                  Get Full Suite
                </CheckoutButton>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="faq" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="inline-flex rounded-md border border-black/10 bg-white/80 px-3 py-1 text-xs font-medium text-black/70">FAQ</p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-black sm:text-5xl">Frequently asked questions</h2>
          </div>
          <div className="mx-auto mt-12 max-w-4xl">
            <Accordion type="single" collapsible>
              {faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger className="py-6 text-left text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="max-w-3xl pb-6 text-base leading-relaxed text-black/70">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-8 lg:pb-24">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/15 bg-[#0d1016] shadow-[0_18px_50px_rgba(0,0,0,0.32)]">
          <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(255,255,255,0.045)_0px,rgba(255,255,255,0.045)_2px,transparent_2px,transparent_10px)]" />
          <div className="relative grid items-center gap-8 p-7 sm:p-10 lg:grid-cols-2 lg:p-12">
            <div>
              <h2 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl">
                Start building professional outputs in seconds.
              </h2>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white">
                <p className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />One-time payment</p>
                <p className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />Lifetime access</p>
              </div>
              <SmartCtaButton className="mt-8 inline-flex w-full justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-gray-100 sm:w-auto sm:min-w-80">
                Get Craftara
              </SmartCtaButton>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#11151d]">
              <div className="grid grid-cols-[0.9fr_1.4fr]">
                <div className="border-r border-white/10 p-4">
                  <p className="text-3xl font-semibold tracking-tight text-white">Craftara</p>
                  <div className="mt-4 space-y-3 text-sm text-white/75">
                    <p>Dashboard</p>
                    <p>Tools</p>
                    <p>Exports</p>
                    <p>Templates</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                      <p className="text-xs text-white/55">Total outputs</p>
                      <p className="mt-1 text-4xl font-semibold text-white">1,200</p>
                      <p className="text-xs text-emerald-400">+11%</p>
                    </div>
                    <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                      <p className="text-xs text-white/55">Avg export time</p>
                      <p className="mt-1 text-4xl font-semibold text-white">3.4s</p>
                      <p className="text-xs text-emerald-400">-3%</p>
                    </div>
                  </div>
                  <div className="mt-2 h-20 rounded-lg border border-white/10 bg-gradient-to-r from-white/10 via-blue-400/10 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-black/10 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-lg font-semibold text-black">Craftara</p>
            <p className="mt-2 text-sm text-black/70">Built for freelancers, creators, and small businesses.</p>
            <p className="mt-3 text-xs text-black/50">© {new Date().getFullYear()} Craftara. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-5 text-sm text-black/80">
            <Link href="/#features" className="transition hover:text-black">Features</Link>
            <Link href="/#pricing" className="transition hover:text-black">Pricing</Link>
            <Link href="/#faq" className="transition hover:text-black">FAQ</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
