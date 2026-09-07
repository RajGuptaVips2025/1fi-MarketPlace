import { EMIPlan } from "@/types/marketplace";

/**
 * Dynamically computes EMI options for a given product price and tenure.
 * Simulates mutual-fund backed / no-cost EMI offerings characteristic of 1Fi.
 */
export function generateEMIPlans(price: number, tenures: number[] = [3, 6, 9, 12, 18, 24]): EMIPlan[] {
  return tenures.map((months) => {
    // 1Fi specializes in No-Cost EMIs backed by Mutual Funds.
    // Tenures up to 12 months are No-Cost (0% interest, 0 processing fee).
    // Longer tenures (18, 24 mo) have nominal subsidized interest.
    const isZeroCost = months <= 12;
    const interestRate = isZeroCost ? 0 : months === 18 ? 9.5 : 11.5;
    const processingFee = 0; // 1Fi USP: zero processing fee

    let monthlyAmount = 0;
    let totalAmount = price;

    if (isZeroCost) {
      monthlyAmount = Math.round(price / months);
      totalAmount = monthlyAmount * months;
    } else {
      // Standard Reducing Balance or Flat monthly interest calculation
      const monthlyRate = interestRate / 12 / 100;
      const emiFactor = Math.pow(1 + monthlyRate, months);
      monthlyAmount = Math.round((price * monthlyRate * emiFactor) / (emiFactor - 1));
      totalAmount = monthlyAmount * months + processingFee;
    }

    // Baseline commercial interest for comparison (typically 15% p.a. on credit cards)
    const commercialRate = 0.15 / 12;
    const commercialFactor = Math.pow(1 + commercialRate, months);
    const commercialMonthly = (price * commercialRate * commercialFactor) / (commercialFactor - 1);
    const commercialTotal = commercialMonthly * months;
    const savingsAmount = isZeroCost ? Math.max(0, Math.round(commercialTotal - totalAmount)) : undefined;

    return {
      id: `emi-${months}m`,
      tenureMonths: months,
      monthlyAmount,
      totalAmount,
      interestRate,
      processingFee,
      isZeroCost,
      savingsAmount,
      recommended: months === 6 || months === 12,
    };
  });
}

/**
 * Returns the lowest monthly EMI for display on product listing badges
 */
export function getLowestMonthlyEMI(price: number, tenures: number[] = [3, 6, 9, 12]): number {
  const maxTenure = Math.max(...tenures);
  return Math.round(price / maxTenure);
}

