"use client";

import React, { useState, useMemo, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { ProductVariant, EMIPlan } from "@/types/marketplace";
import { formatINR } from "@/lib/utils";
import { generateEMIPlans } from "@/lib/emiCalculator";
import VariantSelector from "@/components/marketplace/VariantSelector";
import EMIPlanSelector from "@/components/marketplace/EMIPlanSelector";
import {
  ArrowLeft,
  Star,
  Check,
  ShieldCheck,
  ArrowRight,
  Share2,
  X,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  // Find product by slug or id
  const product = MOCK_PRODUCTS.find(
    (p) => p.slug === slug || p.id === slug
  );

  if (!product) {
    notFound();
  }

  // Selected variant state
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0]
  );
  // Active gallery image index
  const [activeImage, setActiveImage] = useState(0);

  // Buy confirmation dialog state
  const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Dynamically compute EMI plans based on selected variant price
  const emiPlans = useMemo(() => {
    return generateEMIPlans(
      selectedVariant.price,
      product.availableTenures
    );
  }, [selectedVariant.price, product.availableTenures]);

  // Selected EMI plan state (defaults to recommended 6 or 12 mo)
  const [selectedPlan, setSelectedPlan] = useState<EMIPlan>(() => {
    return emiPlans.find((p) => p.recommended) || emiPlans[0];
  });

  // Re-adjust plan when variant price changes
  const currentPlan = useMemo(() => {
    return (
      emiPlans.find((p) => p.tenureMonths === selectedPlan.tenureMonths) ||
      emiPlans[0]
    );
  }, [emiPlans, selectedPlan.tenureMonths]);

  const handleShare = () => {
    if (typeof window !== "undefined" && navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      }).catch(() => {});
    }
  };

  const handleOpenBuyDialog = () => {
    setIsOrderPlaced(false);
    setIsBuyDialogOpen(true);
  };

  const handleConfirmOrder = () => {
    setIsOrderPlaced(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* Top Sticky Header Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-100 bg-white/95 px-4 py-3.5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            href="/shop"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 text-gray-700 hover:bg-[#f5f0ff] hover:text-[#712CDC] transition-all active:scale-90"
            aria-label="Back to Shop"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#712CDC]">
              {product.brand}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              {product.categoryLabel}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Share product"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 py-5 space-y-6 pb-28">
        {/* Product Image Gallery */}
        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-3 shadow-sm">
          <Image
            src={product.images[activeImage] || product.thumbnail}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 500px) 100vw, 500px"
            className="object-contain p-4 transition-all duration-300"
            unoptimized
          />
        </div>

        {/* Thumbnail Gallery Strip */}
        {product.images.length > 1 && (
          <div className="flex gap-2.5 justify-center">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImage(idx)}
                className={`relative w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImage === idx
                    ? "border-[#712CDC] ring-2 ring-[#712CDC]/25 scale-105"
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

        {/* Title, Rating & Pricing */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2.5 py-0.5 rounded-full">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
              <span>{product.rating}</span>
            </div>
            <span className="text-xs text-gray-400">
              ({product.reviewsCount} customer reviews)
            </span>
          </div>

          <h1 className="text-xl font-black text-gray-900 leading-snug">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3 pt-1">
            <span className="text-2xl font-black text-gray-900">
              {formatINR(selectedVariant.price)}
            </span>
            {selectedVariant.originalPrice > selectedVariant.price && (
              <span className="text-sm text-gray-400 line-through font-medium">
                {formatINR(selectedVariant.originalPrice)}
              </span>
            )}
            {product.discountPercentage > 0 && (
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Product Highlights */}
        <div className="rounded-2xl bg-gray-50/90 border border-gray-100 p-4 space-y-2.5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Key Highlights
          </h2>
          <ul className="space-y-2">
            {product.highlights.map((highlight, index) => (
              <li
                key={index}
                className="flex items-start gap-2.5 text-xs text-gray-600 leading-relaxed"
              >
                <Check className="w-3.5 h-3.5 text-[#712CDC] shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Variant Selector */}
        <VariantSelector
          variants={product.variants}
          selectedVariant={selectedVariant}
          onSelectVariant={(variant) => {
            setSelectedVariant(variant);
          }}
        />

        {/* Interactive EMI Plan Selector */}
        <EMIPlanSelector
          plans={emiPlans}
          selectedPlan={currentPlan}
          onSelectPlan={(plan) => setSelectedPlan(plan)}
        />
      </main>

      {/* Sticky Bottom Action Bar with Proceed to Buy Button */}
      <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(12px+env(safe-area-inset-bottom))] pointer-events-none">
        <div className="mx-auto flex max-w-[500px] items-center justify-between gap-4 rounded-[28px] bg-white/95 backdrop-blur-md border border-gray-200/80 px-4 py-3 shadow-[0_8px_32px_rgba(20,14,50,0.16)] pointer-events-auto">
          <div>
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
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

          {/* Explicit "Proceed to Buy" CTA */}
          <button
            type="button"
            onClick={handleOpenBuyDialog}
            className="flex-1 max-w-[210px] flex items-center justify-center gap-2 rounded-full bg-[#712CDC] py-3.5 px-5 text-xs sm:text-sm font-bold text-white shadow-[0_4px_16px_rgba(113,44,220,0.35)] hover:bg-[#5e23ba] active:scale-95 transition-all cursor-pointer"
          >
            <span>Proceed to Buy</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Buy Confirmation Dialog Box / Modal */}
      {isBuyDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-[440px] rounded-[30px] bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200 relative border border-gray-100">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsBuyDialogOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {isOrderPlaced ? (
              /* Success confirmation state */
              <div className="py-6 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-in zoom-in-50 duration-300">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-xl font-black text-gray-900">
                  Order Successfully Placed!
                </h2>
                <p className="text-xs text-gray-500 max-w-[320px]">
                  Your purchase of <strong>{product.name}</strong> ({selectedVariant.name}) is confirmed on a{" "}
                  <strong>{currentPlan.tenureMonths}-month No-Cost EMI</strong>.
                </p>

                <div className="w-full rounded-2xl bg-[#f5f0ff] border border-[#ece5ff] p-4 text-left space-y-2 mt-2">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Monthly Installment</span>
                    <span className="font-bold text-[#712CDC]">
                      {formatINR(currentPlan.monthlyAmount)} / mo
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Mutual Fund Collateral</span>
                    <span className="font-semibold text-emerald-600">Verified & Pledged ✓</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Interest & Processing</span>
                    <span className="font-semibold text-gray-900">₹0 (Zero Cost)</span>
                  </div>
                </div>

                <div className="flex gap-2 w-full pt-2">
                  <button
                    type="button"
                    onClick={() => setIsBuyDialogOpen(false)}
                    className="flex-1 py-3 rounded-full border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50 transition-colors"
                  >
                    Stay on Page
                  </button>
                  <Link
                    href="/shop"
                    className="flex-1 py-3 rounded-full bg-[#712CDC] text-white font-bold text-xs text-center hover:bg-[#5e23ba] shadow-md transition-colors"
                  >
                    Back to Shop
                  </Link>
                </div>
              </div>
            ) : (
              /* Review & Confirm Dialog */
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f5f0ff] text-[#712CDC]">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-gray-900">
                      Confirm EMI Purchase
                    </h2>
                    <p className="text-[11px] text-gray-400">
                      Backed by your mutual fund portfolio
                    </p>
                  </div>
                </div>

                {/* Product Summary Card */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-white border border-gray-200 shrink-0">
                    <Image
                      src={product.thumbnail}
                      alt={product.name}
                      fill
                      className="object-contain p-1"
                      unoptimized
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-bold text-gray-900 truncate">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-gray-500 truncate">
                      {selectedVariant.name}
                    </p>
                    <p className="text-xs font-black text-gray-900 mt-0.5">
                      {formatINR(selectedVariant.price)}
                    </p>
                  </div>
                </div>

                {/* Selected EMI Plan Details */}
                <div className="rounded-2xl border border-[#ece5ff] bg-[#f5f0ff] p-3.5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600 font-medium">Selected Tenure</span>
                    <span className="font-bold text-gray-900">
                      {currentPlan.tenureMonths} Months
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600 font-medium">Monthly Installment</span>
                    <span className="text-sm font-black text-[#712CDC]">
                      {formatINR(currentPlan.monthlyAmount)} / mo
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-600 font-medium">Interest Rate</span>
                    <span className="font-bold text-emerald-600">
                      {currentPlan.isZeroCost ? "0% (No-Cost EMI)" : `${currentPlan.interestRate}%`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs border-t border-purple-100 pt-2">
                    <span className="text-gray-600 font-medium">Processing Fee</span>
                    <span className="font-bold text-gray-900">₹0 (Free)</span>
                  </div>
                </div>

                {/* Mutual Fund Trust Badge */}
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-[11px] text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Mutual fund portfolio limits verified. No credit card required.</span>
                </div>

                {/* Confirm Action Button */}
                <button
                  type="button"
                  onClick={handleConfirmOrder}
                  className="w-full mt-2 py-3.5 rounded-full bg-[#712CDC] text-white font-bold text-sm shadow-[0_4px_16px_rgba(113,44,220,0.35)] hover:bg-[#5e23ba] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Confirm & Pledge EMI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
