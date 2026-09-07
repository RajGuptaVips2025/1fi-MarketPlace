"use client";

import React from "react";
import { ProductVariant } from "@/types/marketplace";
import { formatINR } from "@/lib/utils";
import { Check } from "lucide-react";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

export default function VariantSelector({
  variants,
  selectedVariant,
  onSelectVariant,
}: VariantSelectorProps) {
  if (variants.length <= 1) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
          Select Variant / Model
        </label>
        <span className="text-xs font-medium text-[#712CDC]">
          {selectedVariant.name}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {variants.map((variant) => {
          const isSelected = selectedVariant.id === variant.id;
          return (
            <button
              key={variant.id}
              type="button"
              onClick={() => onSelectVariant(variant)}
              className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-[#712CDC] bg-[#f5f0ff] ring-1 ring-[#712CDC]/30 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Color Swatch Circle if present */}
                {variant.colorHex && (
                  <span
                    className="w-5 h-5 rounded-full border border-gray-300 shadow-inner shrink-0"
                    style={{ backgroundColor: variant.colorHex }}
                  />
                )}
                <div>
                  <div className="text-xs font-bold text-gray-900">
                    {variant.storage || variant.color || variant.name}
                  </div>
                  {variant.storage && variant.color && (
                    <div className="text-[11px] text-gray-500">
                      {variant.color}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-900">
                  {formatINR(variant.price)}
                </span>
                <div
                  className={`w-4 h-4 rounded-full flex items-center justify-center border transition-colors ${
                    isSelected
                      ? "border-[#712CDC] bg-[#712CDC] text-white"
                      : "border-gray-300 bg-transparent text-transparent"
                  }`}
                >
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

