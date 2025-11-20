export interface Product {
  dateAdded?: string;
  id: string;
  category: string;
  name: string;
  description?: string;
  size?: string;
  price: number;
  features?: string[];
  image?: string;
  stock?: number;
  rating?: number;
  tags?: string[];
  material?: string;
  isDeleted: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export type ProductSortOption =
  | 'price-low-to-high'
  | 'price-high-to-low'
  | 'date-added-newest'
  | 'rating-high-to-low'
  | 'name:asc' // Matches backend generic handler
  | 'name:desc' // Matches backend generic handler
  | 'createdAt:asc' // Matches backend generic handler
  | undefined;
