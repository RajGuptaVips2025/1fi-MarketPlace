import React from "react";
import { LucideIcon, Search } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon: Icon = Search,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-[24px] border border-zinc-100 bg-white px-6 py-10 text-center shadow-[0_2px_8px_rgba(20,14,50,0.04)]">
      <div className="mb-3.5 flex h-14 w-14 items-center justify-center rounded-full bg-[#ede8ff] text-[#712CDC]">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-base font-bold tracking-[-0.015em] text-gray-900">
        {title}
      </h3>
      <p className="mt-1.5 max-w-[32ch] text-[13px] leading-[1.45] text-gray-500">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-[#712CDC] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#5e23ba] active:scale-95 transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

