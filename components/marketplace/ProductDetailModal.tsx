"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Product, ProductVariant, EMIPlan } from "@/types/marketplace";
import { formatINR } from "@/lib/utils";
import { generateEMIPlans } from "@/lib/emiCalculator";
import VariantSelector from "./VariantSelector";
import EMIPlanSelector from "./EMIPlanSelector";
import {
  X,
  Star,
  Check,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Share2,
} from "lucide-react";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  onClose,
}: ProductDetailModalProps) {
  if (!product) return null;

  // Selected variant state
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  // Active image index
  const [activeImage, setActiveImage] = useState(0);
  // Checkout success state
  const [isSuccess, setIsSuccess] = useState(false);

  // Compute dynamic EMI plans based on selected variant price
  const emiPlans = useMemo(() => {
    return generateEMIPlans(
      selectedVariant.price,
      product.availableTenures
    );
  }, [selectedVariant.price, product.availableTenures]);

  // Selected EMI plan state (default to recommended 6 or 12 mo)
  const [selectedPlan, setSelectedPlan] = useState<EMIPlan>(() => {
    return emiPlans.find((p) => p.recommended) || emiPlans[0];
  });

  // Re-adjust selected plan if price changed
  const currentPlan = useMemo(() => {
    return (
      emiPlans.find((p) => p.tenureMonths === selectedPlan.tenureMonths) ||
      emiPlans[0]
    );
  }, [emiPlans, selectedPlan.tenureMonths]);

  const handleProceed = () => {
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-[500px] max-h-[92vh] flex flex-col bg-white rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-6 duration-300">
        {/* Top Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-100 bg-white/95 px-5 py-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#712CDC]">
              {product.brand}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-gray-500 font-medium">
              {product.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: product.name,
                    url: window.location.href,
                  });
                }
              }}
              className="p-2 rounded-full text-gray-400 hover:bg-gray-100 transition-colors"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
          {isSuccess ? (
            /* Order / Application Success View */
            <div className="py-12 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                EMI Application Initialized!
              </h2>
              <p className="text-xs text-gray-500 max-w-[320px]">
                You have selected the <strong>{product.name}</strong> on a{" "}
                <strong>{currentPlan.tenureMonths}-month No-Cost EMI</strong> at{" "}
                <strong>{formatINR(currentPlan.monthlyAmount)}/month</strong>.
              </p>

              <div className="w-full rounded-2xl bg-[#f5f0ff] border border-[#ece5ff] p-4 text-left space-y-2 mt-4">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Product</span>
                  <span className="font-semibold text-gray-900">{product.name}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Variant</span>
                  <span className="font-semibold text-gray-900">
                    {selectedVariant.name}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Monthly EMI</span>
                  <span className="font-bold text-[#712CDC]">
                    {formatINR(currentPlan.monthlyAmount)} / mo
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Pledged Mutual Fund Value</span>
                  <span className="font-semibold text-emerald-600">Verified ✓</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full mt-6 py-3.5 rounded-full bg-[#712CDC] text-white font-bold text-sm shadow-md hover:bg-[#5e23ba] transition-all cursor-pointer"
              >
                Back to Marketplace
              </button>
            </div>
          ) : (
            <>
              {/* Product Gallery */}
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-2">
                <Image
                  src={product.images[activeImage] || product.thumbnail}
                  alt={product.name}
                  fill
                  sizes="460px"
                  className="object-contain p-4"
                  unoptimized
                />
              </div>

              {/* Thumbnail strip if multiple images */}
              {product.images.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(idx)}
                      className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImage === idx
                          ? "border-[#712CDC] ring-2 ring-[#712CDC]/20"
                          : "border-gray-200 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Title & Pricing */}
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    ({product.reviewsCount} reviews)
                  </span>
                </div>

                <h1 className="mt-2 text-lg font-black text-gray-900 leading-snug">
                  {product.name}
                </h1>

                <div className="mt-2 flex items-baseline gap-3">
                  <span className="text-2xl font-black text-gray-900">
                    {formatINR(selectedVariant.price)}
                  </span>
                  {selectedVariant.originalPrice > selectedVariant.price && (
                    <span className="text-sm text-gray-400 line-through font-medium">
                      {formatINR(selectedVariant.originalPrice)}
                    </span>
                  )}
                  {product.discountPercentage > 0 && (
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
                      {product.discountPercentage}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Product Highlights */}
              <div className="rounded-2xl bg-gray-50/80 border border-gray-100 p-3.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Product Highlights
                </h4>
                <ul className="space-y-1.5">
                  {product.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-gray-600"
                    >
                      <Check className="w-3.5 h-3.5 text-[#712CDC] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Variant Selector */}
              <VariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onSelectVariant={(v) => {
                  setSelectedVariant(v);
                }}
              />

              {/* EMI Plan Selector */}
              <EMIPlanSelector
                plans={emiPlans}
                selectedPlan={currentPlan}
                onSelectPlan={(p) => setSelectedPlan(p)}
              />
            </>
          )}
        </div>

        {/* Sticky Bottom Action Bar */}
        {!isSuccess && (
          <div className="sticky bottom-0 z-20 border-t border-gray-100 bg-white px-5 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase font-bold text-gray-400">
                  Selected EMI Plan
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-black text-[#712CDC]">
                    {formatINR(currentPlan.monthlyAmount)}
                  </span>
                  <span className="text-xs font-semibold text-gray-600">
                    / mo × {currentPlan.tenureMonths}m
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleProceed}
                className="flex-1 max-w-[220px] flex items-center justify-center gap-2 rounded-full bg-[#712CDC] py-3 px-4 text-xs sm:text-sm font-bold text-white shadow-[0_4px_16px_rgba(113,44,220,0.3)] hover:bg-[#5e23ba] active:scale-95 transition-all cursor-pointer"
              >
                <span>Proceed with EMI</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

