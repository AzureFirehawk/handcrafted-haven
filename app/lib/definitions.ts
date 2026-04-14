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
};

export type SellerProfile = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  location: string | null;
  joined: string;
  productsCount: number;
  rating: number;
  products: SellerProduct[];
};

export type SellerProduct = {
  id: string;
  name: string;
  price: number;
  image: string | null;
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

export type Review = {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  title: string;
  comment: string | null;
  created_at: string;
};

export type ReviewWithUser = Review & {
  user_name: string;
};

export type RatingSummary = {
  average: number;
  count: number;
};