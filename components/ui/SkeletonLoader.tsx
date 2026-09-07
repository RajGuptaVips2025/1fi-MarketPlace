import React from "react";

export function ProductCardSkeleton() {
  return (
    <div className="flex animate-pulse gap-3.5 rounded-[20px] border border-gray-100 bg-white p-3.5 shadow-sm">
      <div className="h-20 w-20 shrink-0 rounded-2xl bg-zinc-100" />
      <div className="min-w-0 flex-1 py-1 space-y-2">
        <div className="h-4 w-3/4 rounded-md bg-zinc-200" />
        <div className="h-3 w-1/2 rounded bg-zinc-100" />
        <div className="flex items-center gap-2 pt-1">
          <div className="h-4 w-20 rounded bg-purple-100" />
          <div className="h-4 w-28 rounded-full bg-purple-50" />
        </div>
      </div>
    </div>
  );
}

export function MarketplaceSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3, 4].map((i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

