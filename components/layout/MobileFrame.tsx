import React from "react";

interface MobileFrameProps {
  children: React.ReactNode;
}

export default function MobileFrame({ children }: MobileFrameProps) {
  return (
    <div className="min-h-screen w-full bg-[#f3f4f8] flex justify-center">
      {/* Centered mobile viewport matching 1Fi's max-w-[500px] design */}
      <div className="w-full max-w-[500px] min-h-screen bg-white relative flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.06)] border-x border-gray-100">
        {children}
      </div>
    </div>
  );
}

