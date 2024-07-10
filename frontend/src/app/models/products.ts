export type Products = Product[];

export interface ProductRatings {
  averageRating: number;
  totalRatings: number;
}

export interface ProductImages {
  url: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  thumbnail: string;
  ratings: ProductRatings;
  screen: string;
  backCamera: string;
  frontCamera: string;
  brand: string;
  category: string;
  owner: string;
  description: string;
  productStatus: string;
  color: string;
  ram: string;
  storage: string;
  price: number;
  promotionalPrice: number;
  promotionStatus: boolean;
  stockQuantity: number;
  images: ProductImages[];
}

export interface NewProduct {
  name: string;
  slug: string;
  thumbnail: string;
  ratings: ProductRatings;
  screen: string;
  backCamera: string;
  frontCamera: string;
  brand: string;
  category: string;
  description: string;
  productStatus: string;
  ram: string;
  storage: string;
  price: number;
  promotionalPrice: number;
  promotionStatus: boolean;
  stockQuantity: number;
  images: ProductImages[];
}
