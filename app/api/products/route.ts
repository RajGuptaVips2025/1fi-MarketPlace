import { NextResponse } from "next/server";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { delay } from "@/lib/utils";

export async function GET(request: Request) {
  // Artificial network latency to demonstrate real-world loading skeletons
  await delay(350);

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase().trim() || "";
  const category = searchParams.get("category")?.toLowerCase().trim() || "";
  const sort = searchParams.get("sort") || "popular";

  let results = [...MOCK_PRODUCTS];

  // Filter by category
  if (category && category !== "all") {
    results = results.filter((p) => p.category.toLowerCase() === category);
  }

  // Filter by search keyword
  if (search) {
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
    );
  }

  // Sorting
  switch (sort) {
    case "price-low":
      results.sort((a, b) => a.basePrice - b.basePrice);
      break;
    case "price-high":
      results.sort((a, b) => b.basePrice - a.basePrice);
      break;
    case "discount":
      results.sort((a, b) => b.discountPercentage - a.discountPercentage);
      break;
    case "popular":
    default:
      results.sort((a, b) => b.rating - a.rating);
      break;
  }

  return NextResponse.json({
    success: true,
    count: results.length,
    data: results,
  });
}

