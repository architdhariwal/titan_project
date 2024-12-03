export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    subcategory?: string;
    price: number;
    originalPrice: number;
    discount: number;
    stock: number;
    images: string[];
    rating: number;
    reviewsCount: number;
  }

