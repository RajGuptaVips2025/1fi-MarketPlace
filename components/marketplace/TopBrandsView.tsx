import React from "react";
import Image from "next/image";
import { Store } from "lucide-react";

export default function TopBrandsView() {
  const brands = [
    {
      name: "Apple Premium Reseller",
      emi: "No-cost EMIs upto 24 months",
      logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=120&q=80",
    },
    {
      name: "Air India",
      emi: "No-cost EMIs upto 18 months",
      logo: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=120&q=80",
    },
    {
      name: "CaratLane Jewellery",
      emi: "No-cost EMIs upto 12 months",
      logo: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=120&q=80",
    },
  ];

  return (
    <div className="space-y-3 pb-8">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-900">Partner Brands</h3>
        <span className="text-xs text-gray-400">Shop in-store or online</span>
      </div>

      <div className="space-y-2.5">
        {brands.map((brand, i) => (
          <div
            key={i}
            className="flex items-center gap-3.5 p-3.5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:border-[#ece5ff] transition-all"
          >
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gray-100 shrink-0">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">{brand.name}</h4>
              <p className="text-xs text-[#712CDC] font-medium">{brand.emi}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

