import React, { useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function ShopHeader() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#2D1263] via-[#3B187B] to-[#5C16C5]">
      {/* 1Fi High-Res Hero Banner */}
      <div className="relative w-full aspect-[16/10] max-h-[260px] overflow-hidden">
        <Image
          src="https://cdn.1fi.in/banners/shop-page%201536x1024.webp"
          alt="Shop today, Pay later using Mutual funds"
          fill
          priority
          sizes="(max-width: 500px) 100vw, 500px"
          className={`object-cover object-center transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          unoptimized
        />

        {/* Fallback Banner Graphic if CDN or network takes a moment */}
        {!imageLoaded && (
          <div className="absolute inset-0 flex flex-col justify-center px-6 py-6 text-white">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wider text-white backdrop-blur-md w-fit">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              NO-COST EMIs
            </div>
            <h1 className="mt-3 text-2xl font-black leading-tight tracking-tight">
              Shop today,
              <br />
              Pay later using
              <br />
              Mutual funds.
            </h1>
            <p className="mt-1.5 text-xs text-purple-200">
              No credit score required. No interest.
              <br />
              Backed by your investments.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

