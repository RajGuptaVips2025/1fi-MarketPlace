"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search products, brands, gadgets...",
}: SearchBarProps) {
  return (
    <div className="flex items-center gap-2.5 h-[46px] rounded-full border border-gray-200 bg-white px-4 shadow-[0_2px_8px_rgba(20,14,50,0.03)] transition-all focus-within:border-[#712CDC] focus-within:ring-2 focus-within:ring-[#712CDC]/15">
      <Search className="h-[18px] w-[18px] text-gray-400 shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent border-0 outline-none text-[13.5px] text-gray-900 placeholder:text-gray-400 font-medium"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="p-1 rounded-full text-gray-400 hover:text-gray-600 active:scale-95"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

