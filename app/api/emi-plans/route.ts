import { NextResponse } from "next/server";
import { generateEMIPlans } from "@/lib/emiCalculator";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { price, tenures } = body;

    if (!price || typeof price !== "number" || price <= 0) {
      return NextResponse.json(
        { success: false, error: "A valid positive price is required" },
        { status: 400 }
      );
    }

    const plans = generateEMIPlans(
      price,
      Array.isArray(tenures) && tenures.length > 0 ? tenures : [3, 6, 9, 12, 18, 24]
    );

    return NextResponse.json({
      success: true,
      data: {
        price,
        plans,
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request payload" },
      { status: 400 }
    );
  }
}

