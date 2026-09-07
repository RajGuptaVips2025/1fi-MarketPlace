"use client";

import React, { useState } from "react";
import { ShopTab } from "@/types/marketplace";
import ShopHeader from "@/components/layout/ShopHeader";
import ShopTabs from "@/components/layout/ShopTabs";
import ProductGrid from "@/components/marketplace/ProductGrid";
import TopBrandsView from "@/components/marketplace/TopBrandsView";
import NearbyStoresView from "@/components/marketplace/NearbyStoresView";

export default function ShopPage() {
  // Default to the newly implemented Marketplace tab to immediately showcase the assignment work
  const [activeTab, setActiveTab] = useState<ShopTab>("marketplace");

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* 1Fi Hero Banner */}
      <ShopHeader />

      {/* 3-Tab Selector matching 1Fi pill style */}
      <ShopTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Dynamic Tab Body */}
      <div className="flex-1 px-4 pt-5 pb-10">
        {activeTab === "marketplace" && <ProductGrid />}
        {activeTab === "top-brands" && <TopBrandsView />}
        {activeTab === "nearby-stores" && <NearbyStoresView />}
      </div>
    </div>
  );
}

