export interface Product {
  id: string;
  description: string;
  inStock: number;
  price: number;
  sizes: Size[];
  colors: string[];
  slug: string;
  tags: string[];
  title: string;
  discount: number | null;
  discountEnd: Date | null;
  //TODO type: Type;
  gender: Category;
  categoryId: string;
}

export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  size: Size;
  color: string;
  colors: Product['colors'];
  image: string;
}

export interface FullProduct extends Product {
  ProductImage: ProductImage[];
  category: Category;
}

export interface ProductWithImages extends Product {
  images: string[];
}

export interface ProductImage {
  id: number;
  url: string;
  productId?: string;
}
type Category = 'men' | 'women' | 'kid' | 'unisex';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type Type = 'shirt' | 'pant' | 'hoodie' | 'hat' | 'sweatshirt';
