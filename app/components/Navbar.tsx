"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Barcode, ChevronDown, FileText, Menu, Receipt, ShieldCheck, Stamp, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/app/components/AuthProvider";
import { logoutUser } from "@/lib/auth";

const navLinks = [
  { label: "Tools", href: "/tools" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

const featureMenu = [
  {
    name: "BarcodeForge",
    description: "Generate barcodes for products, inventory, and packaging.",
    href: "/barcodeforge",
    icon: Barcode,
  },
  {
    name: "InvoiceSnap",
    description: "Create professional invoices and receipts in seconds.",
    href: "/invoicesnap",
    icon: Receipt,
  },
  {
    name: "LabelCraft",
    description: "Design product labels, stickers, and packaging designs.",
    href: "/labelcraft",
    icon: Stamp,
  },
  {
    name: "FormVault",
    description: "Build forms for surveys, RSVPs, and data collection.",
    href: "/formvault",
    icon: FileText,
  },
  {
    name: "ContractQuick",
    description: "Generate simple contracts, proposals, and agreements.",
    href: "/contractquick",
    icon: ShieldCheck,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuth();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openFeatures, setOpenFeatures] = useState(false);
  const isDashboardRoute = pathname === "/app" || pathname.startsWith("/app/");
  const isAuthRoute = pathname === "/auth" || pathname.startsWith("/auth/");

  if (isAuthRoute) {
    return null;
  }

  const handleLogout = async () => {
    await logoutUser();
    router.replace("/");
  };

  if (isDashboardRoute) {
    return (
      <header className="sticky top-0 z-50 border-b border-black/10 bg-[#d3d3d3]/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <Link href="/?from=app" className="flex items-center gap-3 rounded-full px-1 py-1 transition hover:bg-black/5">
            <span className="relative block h-8 w-8 overflow-hidden rounded-md bg-blue-100">
              <span className="absolute left-0 top-0 h-4 w-4 rounded-br-[10px] bg-blue-600" />
              <span className="absolute bottom-0 right-0 h-4 w-4 rounded-tl-[10px] bg-blue-600" />
            </span>
            <span className="text-xl font-semibold tracking-tight text-black">ToolSuite</span>
          </Link>

          <div className="flex items-center gap-3">
            {user?.photoURL ? (
              <div
                role="img"
                aria-label={user.displayName ?? "User avatar"}
                className="h-9 w-9 rounded-full border border-black/10 bg-cover bg-center"
                style={{ backgroundImage: `url("${user.photoURL}")` }}
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-xs font-semibold text-black">
                {(user?.displayName || "U").charAt(0).toUpperCase()}
              </div>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 px-4 pb-3 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center rounded-full border border-transparent bg-transparent px-3">
        <Link href="/" className="flex items-center gap-3 rounded-full px-3 py-2 transition hover:bg-black/5">
          <span className="relative block h-8 w-8 overflow-hidden rounded-md bg-blue-100">
            <span className="absolute left-0 top-0 h-4 w-4 rounded-br-[10px] bg-blue-600" />
            <span className="absolute bottom-0 right-0 h-4 w-4 rounded-tl-[10px] bg-blue-600" />
          </span>
          <span className="text-xl font-semibold tracking-tight text-black">Craftara</span>
        </Link>

        <div className="mx-auto hidden md:block">
          <div className="relative">
            <nav className="flex items-center gap-7">
              <button
                onClick={() => setOpenFeatures((prev) => !prev)}
                onMouseEnter={() => setOpenFeatures(true)}
                onMouseLeave={() => setOpenFeatures(false)}
                className="inline-flex items-center gap-1 rounded-full bg-transparent px-4 py-2 text-[15px] font-medium text-black transition hover:bg-black/10"
              >
                Features
                <ChevronDown className={`h-4 w-4 transition ${openFeatures ? "rotate-180" : ""}`} />
              </button>

              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[15px] font-medium transition ${
                    pathname === link.href ? "text-black" : "text-black/75 hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div
              className={`absolute left-1/2 top-full w-[40rem] -translate-x-1/2 pt-2 transition-all duration-200 ${
                openFeatures ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
              }`}
              onMouseEnter={() => setOpenFeatures(true)}
              onMouseLeave={() => setOpenFeatures(false)}
            >
              <div className="grid grid-cols-2 divide-x divide-black/10 rounded-2xl border border-black/10 bg-white p-3 shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
                <div className="space-y-1 pr-3">
                  {featureMenu.slice(0, 3).map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpenFeatures(false)}
                      className="group flex gap-3 rounded-xl p-3 transition hover:bg-black/5"
                    >
                      <item.icon className="mt-0.5 h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-xl font-semibold tracking-tight text-black">{item.name}</p>
                        <p className="mt-1 text-sm text-black/65">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="space-y-1 pl-3">
                  {featureMenu.slice(3).map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setOpenFeatures(false)}
                      className="group flex gap-3 rounded-xl p-3 transition hover:bg-black/5"
                    >
                      <item.icon className="mt-0.5 h-5 w-5 text-blue-600" />
                      <div>
                        <p className="text-xl font-semibold tracking-tight text-black">{item.name}</p>
                        <p className="mt-1 text-sm text-black/65">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/auth"
          className="ml-auto hidden rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 md:inline-flex"
        >
          Get Craftara
        </Link>

        <button
          onClick={() => setOpenMobileMenu((prev) => !prev)}
          className="ml-auto rounded-full p-2 text-black transition hover:bg-black/10 md:hidden"
          aria-label="Toggle menu"
        >
          {openMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {openMobileMenu && (
        <div className="mx-auto mt-3 max-w-6xl rounded-2xl border border-black/10 bg-white/95 p-4 shadow-[0_10px_28px_rgba(0,0,0,0.12)] md:hidden">
          <div className="space-y-1">
            {featureMenu.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpenMobileMenu(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-black transition hover:bg-black/5"
              >
                <item.icon className="h-4 w-4 text-blue-600" />
                {item.name}
              </Link>
            ))}
          </div>
          <div className="my-3 h-px bg-black/10" />
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpenMobileMenu(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-black transition hover:bg-black/5"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/auth"
            onClick={() => setOpenMobileMenu(false)}
            className="mt-3 block w-full rounded-full bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Get Craftara
          </Link>
        </div>
      )}
    </header>
  );
}
