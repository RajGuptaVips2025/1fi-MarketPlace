export interface ProductVariant {
  id: string;
  name: string; // e.g., "128GB - Natural Titanium"
  sku: string;
  storage?: string; // e.g., "128GB", "256GB", "512GB"
  color?: string; // e.g., "Natural Titanium", "Desert Titanium"
  colorHex?: string; // e.g., "#9A958D"
  ram?: string; // e.g., "8GB", "16GB"
  price: number; // in INR
  originalPrice: number; // MRP in INR
  inStock: boolean;
  image?: string;
}

export interface EMIPlan {
  id: string;
  tenureMonths: number; // 3, 6, 9, 12, 18, 24
  monthlyAmount: number; // e.g., ₹6,666 / mo
  totalAmount: number;
  interestRate: number; // 0 for zero-cost
  processingFee: number; // e.g., 0 or 199
  isZeroCost: boolean;
  savingsAmount?: number; // e.g., ₹1,499 saved on interest
  recommended?: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: 'smartphones' | 'laptops' | 'audio' | 'watches' | 'appliances';
  categoryLabel: string;
  description: string;
  highlights: string[];
  thumbnail: string;
  images: string[];
  basePrice: number; // starting price
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  isNewArrival?: boolean;
  variants: ProductVariant[];
  availableTenures: number[]; // e.g., [3, 6, 9, 12, 18, 24]
}

export type ShopTab = 'top-brands' | 'nearby-stores' | 'marketplace';

export interface FilterState {
  category: string;
  searchQuery: string;
  sortBy: 'popular' | 'price-low' | 'price-high' | 'discount';
  tenureFilter?: number;
}

