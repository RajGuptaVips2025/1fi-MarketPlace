import { NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { generateEMIPlans } from "@/lib/emiCalculator";
import { delay } from "@/lib/utils";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await delay(250);
  const { id } = await params;

  const product = MOCK_PRODUCTS.find((p) => p.id === id || p.slug === id);

  if (!product) {
    return NextResponse.json(
      { success: false, error: "Product not found" },
      { status: 404 }
    );
  }

  // Pre-calculate base EMI plans for convenience
  const defaultEMIPlans = generateEMIPlans(
    product.basePrice,
    product.availableTenures
  );

  return NextResponse.json({
    success: true,
    data: {
      ...product,
      emiPlans: defaultEMIPlans,
    },
  });
}

