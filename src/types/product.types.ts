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
  numberOfClicks: number;
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
  | 'date-added-oldest'
  | 'rating-high-to-low'
  | 'name-a-z'
  | 'name-z-a'
  | undefined;
