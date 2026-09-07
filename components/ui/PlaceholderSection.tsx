import React from "react";
import Link from "next/link";
import { LucideIcon, Store, ArrowRight } from "lucide-react";

interface PlaceholderSectionProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
}

const DEFAULT_MESSAGE =
  "The 1Fi SDE assignment focuses specifically on implementing the 1Fi Marketplace within the Shop page experience. Head over to the Shop to explore the marketplace.";

export default function PlaceholderSection({
  icon: Icon,
  title,
  subtitle,
  description = DEFAULT_MESSAGE,
  badge = "Assignment Scope",
}: PlaceholderSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center animate-in fade-in duration-300">
      {/* Icon with 1Fi purple radial background */}
      <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#ede8ff] text-[#712CDC] shadow-sm">
        <Icon className="h-9 w-9 stroke-[2]" />
        <span
          className="absolute -top-1 -right-1 flex h-4 w-4"
          aria-hidden="true"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#712CDC] opacity-40"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#712CDC]/80"></span>
        </span>
      </div>

      {/* Badge */}
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f0ff] border border-[#ece5ff] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#712CDC]">
        {badge}
      </span>

      {/* Title */}
      <h1 className="mt-3 text-2xl font-black tracking-tight text-gray-900">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-1 text-sm font-semibold text-[#712CDC]">
          {subtitle}
        </p>
      )}

      {/* Unified Description Message */}
      <p className="mt-3 max-w-[340px] text-xs leading-relaxed text-gray-500">
        {description}
      </p>

      {/* Back to Shop CTA Button */}
      <div className="mt-7 w-full max-w-[280px]">
        <Link
          href="/shop"
          className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-[#712CDC] text-white font-bold text-sm shadow-[0_4px_16px_rgba(113,44,220,0.3)] hover:bg-[#5e23ba] active:scale-95 transition-all"
        >
          <Store className="w-4 h-4" />
          <span>Back to Shop</span>
          <ArrowRight className="w-4 h-4 ml-0.5" />
        </Link>
      </div>
    </div>
  );
}
