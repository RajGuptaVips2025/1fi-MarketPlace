import React from "react";
import { MapPin, Navigation } from "lucide-react";

export default function NearbyStoresView() {
  const stores = [
    {
      name: "Pacholi Suzuki Railway Road",
      distance: "2.0 km",
      address: "64/9, New Railway Rd, near DSD college, Subhash Nagar",
    },
    {
      name: "Atelier Forbidden Journeys",
      distance: "3.4 km",
      address: "Sector 40, Main Market Complex, Gurugram",
    },
  ];

  return (
    <div className="space-y-3 pb-8">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-900">Nearby Stores</h3>
        <span className="inline-flex items-center gap-1 text-xs text-[#712CDC] font-semibold bg-[#f5f0ff] px-2 py-0.5 rounded-full">
          <MapPin className="w-3 h-3" /> Gurugram
        </span>
      </div>

      <div className="space-y-2.5">
        {stores.map((store, i) => (
          <div
            key={i}
            className="flex items-start justify-between p-3.5 rounded-2xl border border-gray-100 bg-white shadow-sm hover:border-[#ece5ff] transition-all"
          >
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-gray-900">{store.name}</h4>
              <p className="text-xs text-gray-500 max-w-[280px]">{store.address}</p>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-full shrink-0">
              <Navigation className="w-3 h-3 text-[#712CDC]" />
              {store.distance}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

