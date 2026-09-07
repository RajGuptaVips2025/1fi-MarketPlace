"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Store,
  ReceiptIndianRupee,
  ChartNoAxesCombined,
  User,
} from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  // Hide BottomNav on product detail pages so the "Proceed to Buy" action bar is unobscured
  if (pathname.startsWith("/shop/") && pathname !== "/shop") {
    return null;
  }

  const navItems = [
    { label: "Home", href: "/dashboard", icon: House, active: pathname === "/dashboard" },
    {
      label: "Shop",
      href: "/shop",
      icon: Store,
      active: pathname.startsWith("/shop") || pathname === "/",
    },
    {
      label: "EMI Dues",
      href: "/emi-dues",
      icon: ReceiptIndianRupee,
      active: pathname === "/emi-dues",
    },
    {
      label: "Limit",
      href: "/limit",
      icon: ChartNoAxesCombined,
      active: pathname === "/limit",
    },
    { label: "Profile", href: "/profile", icon: User, active: pathname === "/profile" },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[calc(12px+env(safe-area-inset-bottom))] pointer-events-none">
      <div className="mx-auto flex max-w-[500px] items-stretch rounded-[28px] bg-white/95 backdrop-blur-md border border-white/40 px-1.5 py-1.5 shadow-[0_8px_32px_rgba(20,14,50,0.12),0_0_0_1px_rgba(255,255,255,0.18)_inset] pointer-events-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`group relative flex min-w-0 flex-1 flex-col items-center justify-center gap-[3px] rounded-[18px] px-1 py-2 text-center transition-all duration-200 select-none ${
                item.active
                  ? "text-[#712CDC]"
                  : "text-gray-400 hover:text-gray-600 active:scale-95"
              }`}
            >
              {item.active && (
                <>
                  {/* Active top pip */}
                  <span
                    className="absolute left-1/2 -top-[3px] h-[3px] w-8 -translate-x-1/2 rounded-full bg-[#712CDC]"
                    aria-hidden="true"
                  />
                  {/* Subtle active radial ambient glow */}
                  <span
                    className="absolute inset-1 rounded-[14px] opacity-60"
                    style={{
                      background:
                        "radial-gradient(ellipse at 50% 30%, rgba(113,44,220,0.14) 0%, transparent 70%)",
                    }}
                    aria-hidden="true"
                  />
                </>
              )}

              <Icon
                className={`relative h-[22px] w-[22px] transition-transform duration-200 group-active:scale-90 ${
                  item.active
                    ? "stroke-[2.25] drop-shadow-[0_0_6px_rgba(113,44,220,0.3)]"
                    : "stroke-[1.75]"
                }`}
              />
              <span
                className={`relative max-w-full truncate text-[10px] tracking-wide ${
                  item.active ? "font-bold text-[#712CDC]" : "font-medium"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

