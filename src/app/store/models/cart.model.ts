export interface Cart {
  id: number;
  product: Product;
  quantity: number;
}

export interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  created_at: string;
  updated_at: string;
  total: string;
}