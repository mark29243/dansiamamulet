export type Product = {
  id: number;
  legacy_id: number | null;
  slug: string;
  name: string;
  name_th: string | null;
  name_zh: string | null;
  category: string;
  price: number;        // in satang (THB * 100)
  sale_price: number | null;
  stock: number;
  description: string | null;
  description_th: string | null;
  description_zh: string | null;
  short: string | null;
  images: string[];
  is_featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type CartItem = {
  product_id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
};

export type Order = {
  id: string;
  user_id: string | null;
  customer_email: string;
  customer_name: string | null;
  customer_phone: string | null;
  shipping_address: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  shipping_cost: number;
  total: number;
  currency: string;
  stripe_session_id: string | null;
  stripe_payment_id: string | null;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  notes: string | null;
  tracking_number: string | null;
  carrier: string | null;
  created_at: string;
  updated_at: string;
};

export type ShippingAddress = {
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postal_code: string;
  country: string;
};

export type Lang = 'th' | 'en' | 'zh';
