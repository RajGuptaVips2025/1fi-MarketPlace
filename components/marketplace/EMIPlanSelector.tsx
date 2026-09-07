"use client";

import React from "react";
import { EMIPlan } from "@/types/marketplace";
import { formatINR } from "@/lib/utils";
import { Sparkles, ShieldCheck, CheckCircle2 } from "lucide-react";

interface EMIPlanSelectorProps {
  plans: EMIPlan[];
  selectedPlan: EMIPlan;
  onSelectPlan: (plan: EMIPlan) => void;
}

export default function EMIPlanSelector({
  plans,
  selectedPlan,
  onSelectPlan,
}: EMIPlanSelectorProps) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
            Choose EMI Tenure
          </label>
          <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
            <ShieldCheck className="w-3 h-3" />
            0% Interest
          </span>
        </div>
        <span className="text-[11px] font-medium text-gray-400">
          Backed by your Portfolio
        </span>
      </div>

      {/* Plans List */}
      <div className="space-y-2.5">
        {plans.map((plan) => {
          const isSelected = selectedPlan.id === plan.id;
          return (
            <div
              key={plan.id}
              onClick={() => onSelectPlan(plan)}
              className={`relative flex flex-col p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-[#712CDC] bg-[#f5f0ff] ring-2 ring-[#712CDC]/20 shadow-[0_2px_12px_rgba(113,44,220,0.10)]"
                  : "border-gray-200 bg-white hover:border-purple-200 hover:bg-gray-50/60"
              }`}
            >
              {/* Recommended Badge */}
              {plan.recommended && (
                <span className="absolute -top-2.5 right-4 rounded-full bg-gradient-to-r from-[#712CDC] to-[#9333EA] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-sm flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Popular
                </span>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                      isSelected
                        ? "border-[#712CDC] bg-[#712CDC] text-white"
                        : "border-gray-300 bg-white text-transparent"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[15px] font-black text-gray-900">
                        {formatINR(plan.monthlyAmount)}
                        <span className="text-xs font-medium text-gray-500">
                          {" "}
                          / mo
                        </span>
                      </span>
                      {plan.isZeroCost && (
                        <span className="rounded-full bg-[#ede8ff] px-2 py-0.5 text-[10px] font-bold text-[#712CDC]">
                          No-Cost EMI
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-semibold text-gray-600">
                      for {plan.tenureMonths} Months
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-gray-900">
                    Total: {formatINR(plan.totalAmount)}
                  </div>
                  {plan.savingsAmount && plan.savingsAmount > 0 ? (
                    <div className="text-[10px] font-medium text-emerald-600">
                      Save ~{formatINR(plan.savingsAmount)} in interest
                    </div>
                  ) : (
                    <div className="text-[10px] text-gray-400">
                      Zero processing fee
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Notice */}
      <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-2.5 text-[11px] text-gray-500">
        <Sparkles className="h-4 w-4 text-[#712CDC] shrink-0" />
        <span>
          Zero impact on credit score. Your investments continue growing while you repay.
        </span>
      </div>
    </div>
  );
}

