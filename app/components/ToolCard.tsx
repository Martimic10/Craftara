import Link from "next/link";
import type { ComponentType } from "react";
import { ArrowRight } from "lucide-react";

type ToolCardProps = {
  name: string;
  description: string;
  tag: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

export default function ToolCard({ name, description, tag, href, icon: Icon }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group block h-full rounded-2xl border border-black/15 bg-white/85 p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-[0_12px_32px_rgba(37,99,235,0.16)]"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="rounded-lg border border-black/10 bg-black/90 p-2">
          <Icon className="h-4 w-4 text-white" />
        </div>
        <span className="rounded-full border border-black/10 bg-white px-2.5 py-1 text-xs text-black/65">
          {tag}
        </span>
      </div>

      <h3 className="text-2xl font-semibold leading-tight tracking-tight text-black">{name}</h3>
      <p className="mt-3 min-h-14 text-sm text-black/70">{description}</p>

      <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 transition group-hover:text-blue-800">
        Try Tool
        <ArrowRight className="h-4 w-4" />
      </div>
    </Link>
  );
}
