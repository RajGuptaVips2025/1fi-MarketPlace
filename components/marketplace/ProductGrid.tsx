"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Product } from "@/types/marketplace";
import ProductCard from "./ProductCard";
import SearchBar from "@/components/ui/SearchBar";
import { MarketplaceSkeleton } from "@/components/ui/SkeletonLoader";
import EmptyState from "@/components/ui/EmptyState";
import { Sparkles, SlidersHorizontal } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Items" },
  { id: "smartphones", label: "Smartphones" },
  { id: "laptops", label: "Laptops" },
  { id: "audio", label: "Audio & ANC" },
  { id: "watches", label: "Smartwatches" },
  { id: "appliances", label: "Appliances" },
];

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [, startTransition] = useTransition();

  // Fetch products dynamically from the API route
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const controller = new AbortController();
    const queryParams = new URLSearchParams();

    if (selectedCategory !== "all") {
      queryParams.set("category", selectedCategory);
    }
    if (searchQuery.trim()) {
      queryParams.set("search", searchQuery.trim());
    }
    if (sortBy) {
      queryParams.set("sort", sortBy);
    }

    fetch(`/api/products?${queryParams.toString()}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success) {
          setProducts(data.data);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Failed to load products:", err);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <SearchBar
        value={searchQuery}
        onChange={(val) => {
          startTransition(() => {
            setSearchQuery(val);
          });
        }}
        placeholder="Search Apple, Samsung, Sony..."
      />

      {/* Category Pills Scroller */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer select-none ${
                isSelected
                  ? "bg-[#712CDC] text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Subheader with Count & Sort filter */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-bold text-gray-900">
            Marketplace Catalog
          </span>
          <span className="text-xs font-semibold text-gray-400">
            ({products.length} items)
          </span>
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-1">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-semibold text-gray-600 bg-transparent border-0 outline-none cursor-pointer hover:text-gray-900"
          >
            <option value="popular">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Biggest Discount</option>
          </select>
        </div>
      </div>

      {/* Mutual Fund Backed Banner */}
      <div className="flex items-center gap-2.5 rounded-2xl border border-[#ece5ff] bg-gradient-to-r from-[#f5f0ff] to-white p-3 shadow-sm">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#712CDC] text-white shadow-sm">
          <Sparkles className="h-4 w-4 text-yellow-300" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-bold text-gray-900">
            100% Zero-Cost EMIs
          </h4>
          <p className="text-[11px] text-gray-500 truncate">
            No credit score or CIBIL check. Pay using your mutual fund limits.
          </p>
        </div>
      </div>

      {/* Product List / Skeletons / Empty State */}
      {loading ? (
        <MarketplaceSkeleton />
      ) : products.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Try selecting a different category or adjusting your search keyword."
          actionLabel="Reset Filters"
          onAction={() => {
            setSelectedCategory("all");
            setSearchQuery("");
            setSortBy("popular");
          }}
        />
      ) : (
        <div className="flex flex-col gap-3 pb-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
