export type Products = Product[];

export interface ProductRatings {
  averageRating: number;
}

export interface ProductTechnicalInfoContent {
  name: string;
  description: string;
}

export interface ProductTechnicalInfo {
  title: string;
  content: ProductTechnicalInfoContent[];
}

export interface ProductVariantsImages {
  mainImage: string;
  imageGallery: string[];
}

export interface ProductVariants {
  images: ProductVariantsImages;
  productStatus: string;
  color: string;
  ram: string;
  storage: string;
  price: number;
  promotionalPrice: number;
  promotionStatus: boolean;
  stockQuantity: number;
}

export interface Product {
  id: number;
  productName: string;
  productCode: string;
  releaseDate: string;
  description: string;

  starRating: number;
  imageUrl: string;
  code: string;
  des: string;
  inStock: number;

  thumbnail: string;
  ratings: ProductRatings;
  _id: string;
  technicalInfo: ProductTechnicalInfo[];
  variants: ProductVariants[];
  screen: string;
  backCamera: string;
  frontCamera: string;
  brand: string;
  category: string;
  owner: string;
  name: string;
  shortDescription: string;
  detailedDescription: string;
  productStatus: string;
  color: string;
  ram: string;
  storage: string;
  price: number;
  promotionalPrice: number;
  promotionStatus: boolean;
  stockQuantity: number;
  images: [];
}
