export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: string;
};

export type Seller = {
  id: string;
  name: string;
  avatar: string;
  email: string;
  bio: string | null;
  created_at: string;
  location: string;
  joined: string;
  productsCount: number;
  rating: number;
  products: SellerProduct[];
};

export interface SellerProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: string | undefined;
  category: string | null;
  seller_id: string;
  created_at: string;
};

export type ProductWithSeller = Product & {
  seller_name: string;
  seller_email: string;
};

export type Order = {
  id: string;
  user_id: string;
  total: number | null;
  status: string | null;
  created_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
};