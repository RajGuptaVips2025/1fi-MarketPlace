"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/marketplace";
import { formatINR } from "@/lib/utils";
import { getLowestMonthlyEMI } from "@/lib/emiCalculator";
import { Sparkles, Star, ChevronRight } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export default function ProductCard({ product }: ProductCardProps) {
  const lowestMonthly = getLowestMonthlyEMI(product.basePrice, product.availableTenures);

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group relative flex gap-3.5 rounded-[22px] border border-gray-100 bg-white p-3.5 shadow-[0_2px_10px_rgba(20,14,50,0.03)] hover:shadow-[0_6px_20px_rgba(113,44,220,0.08)] hover:border-[#ece5ff] transition-all duration-200 cursor-pointer active:scale-[0.99] select-none block"
    >
      {/* Product Image Thumbnail */}
      <div className="relative h-24 w-24 shrink-0 rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center p-1">
        <Image
          src={product.thumbnail}
          alt={product.name}
          fill
          sizes="96px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized
        />

        {product.discountPercentage > 0 && (
          <span className="absolute top-1.5 left-1.5 rounded-full bg-emerald-600 px-1.5 py-0.5 text-[9px] font-bold text-white shadow-sm">
            {product.discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* Product Metadata */}
      <div className="flex flex-1 flex-col justify-between min-w-0 py-0.5">
        <div>
          <div className="flex items-center justify-between gap-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#712CDC]">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded-full">
              <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="mt-0.5 text-[14px] font-bold text-gray-900 line-clamp-1 group-hover:text-[#712CDC] transition-colors">
            {product.name}
          </h3>

          {/* Pricing Row */}
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-[15px] font-black text-gray-900">
              {formatINR(product.basePrice)}
            </span>
            {product.originalPrice > product.basePrice && (
              <span className="text-[12px] text-gray-400 line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* 1Fi Signature No-Cost EMI Tag */}
        <div className="mt-2 flex items-center justify-between">
          <div className="inline-flex items-center gap-1 rounded-full border border-[#ece5ff] bg-[#f5f0ff] px-2.5 py-1 text-[11px] font-semibold text-[#712CDC]">
            <Sparkles className="w-3 h-3 text-[#712CDC]" />
            <span>EMI from {formatINR(lowestMonthly)}/mo</span>
          </div>

          <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#712CDC] group-hover:translate-x-0.5 transition-all" />
        </div>
      </div>
    </Link>
  );
}
