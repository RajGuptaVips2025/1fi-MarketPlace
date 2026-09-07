"use client";

import React from "react";
import { ShopTab } from "@/types/marketplace";

interface ShopTabsProps {
  activeTab: ShopTab;
  onTabChange: (tab: ShopTab) => void;
}

export default function ShopTabs({ activeTab, onTabChange }: ShopTabsProps) {
  const tabs: { id: ShopTab; label: string; badge?: string }[] = [
    { id: "top-brands", label: "Top Brands" },
    { id: "nearby-stores", label: "Nearby Stores" },
    { id: "marketplace", label: "1Fi Marketplace", badge: "NEW" },
  ];

  return (
    <div className="relative z-[2] -mt-6 px-4">
      <div
        className="flex gap-1.5 rounded-full border border-[#ece5ff] bg-[#f5f0ff] p-1.5 shadow-[0_2px_8px_rgba(113,44,220,0.08)] backdrop-blur-md"
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex-1 rounded-full py-2.5 px-2 text-center text-xs sm:text-[13px] font-semibold tracking-[-0.005em] transition-all duration-200 cursor-pointer select-none ${
                isActive
                  ? "bg-white text-[#712CDC] shadow-[0_1px_4px_rgba(20,14,50,0.10),0_0_0_1px_rgba(113,44,220,0.08)]"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <span className="relative flex items-center justify-center gap-1">
                {tab.label}
                {tab.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase transition-colors ${
                      isActive
                        ? "bg-[#712CDC] text-white"
                        : "bg-[#712CDC]/15 text-[#712CDC]"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </span>

              {/* Active Tab Underline Indicator matching 1Fi */}
              {isActive && (
                <span
                  className="absolute bottom-1.5 left-1/2 h-[2.5px] w-[20px] -translate-x-1/2 rounded-full bg-[#712CDC] transition-all"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

