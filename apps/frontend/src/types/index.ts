export interface User {
  id: string;
  email: string;
  name: string;
  role: 'buyer' | 'vendor' | 'admin';
  isVerified: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  vendorId: string;
  vendorName: string;
  isHalalCertified: boolean;
  blockchainHash?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'buyer' | 'vendor';
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product & {
    vendor: {
      id: string;
      storeName: string;
    };
  };
}

export interface Cart {
  items: CartItem[];
  total: number;
}

export interface CheckoutData {
  shippingAddress: string;
  paymentMethod: string;
}
