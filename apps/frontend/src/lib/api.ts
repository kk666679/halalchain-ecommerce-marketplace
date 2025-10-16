import axios from 'axios';
import { AuthResponse, LoginRequest, RegisterRequest, Product, User } from '@/types';

interface GeneratedSite {
  hero?: string;
  features?: string;
  contact?: string;
  [key: string]: unknown;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

// Products API
export const productsApi = {
  getAll: async (params?: { category?: string; search?: string }): Promise<Product[]> => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  getById: async (id: string): Promise<Product> => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  create: async (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    const response = await api.post('/products', data);
    return response.data;
  },

  update: async (id: string, data: Partial<Product>): Promise<Product> => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },

  verifyHalal: async (id: string): Promise<{ isValid: boolean; hash: string }> => {
    const response = await api.get(`/blockchain/product/${id}/halal-status`);
    return response.data;
  },
};

// Cart API
export const cartApi = {
  getCart: async (): Promise<unknown> => {
    const response = await api.get('/cart');
    return response.data;
  },

  addToCart: async (productId: string, quantity: number): Promise<unknown> => {
    const response = await api.post('/cart/add', { productId, quantity });
    return response.data;
  },

  updateCartItem: async (cartItemId: string, quantity: number): Promise<unknown> => {
    const response = await api.patch(`/cart/item/${cartItemId}`, { quantity });
    return response.data;
  },

  removeFromCart: async (cartItemId: string): Promise<void> => {
    await api.delete(`/cart/item/${cartItemId}`);
  },

  checkout: async (): Promise<unknown> => {
    const response = await api.post('/cart/checkout');
    return response.data;
  },
};

// Blockchain API
export const blockchainApi = {
  getHalalStatus: async (productId: string): Promise<unknown> => {
    const response = await api.get(`/blockchain/product/${productId}/halal-status`);
    return response.data;
  },

  getCertifications: async (): Promise<unknown> => {
    const response = await api.get('/blockchain/certifications');
    return response.data;
  },
};

// AI Tools API
export const aiToolsApi = {
  generateSite: async (prompt: string): Promise<GeneratedSite> => {
    const response = await api.post('/api/generate-site', { prompt });
    return response.data;
  },
};

// Chat API
export const chatApi = {
  sendMessage: async (messages: Array<{ role: string; content: string }>) => {
    const response = await api.post('/api/chat', { messages });
    return response.data;
  },
};

export default api;
