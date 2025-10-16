// Enums matching Prisma schema
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  VENDOR = 'VENDOR',
  ADMIN = 'ADMIN',
  AUDITOR = 'AUDITOR',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum HalalStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
}

export enum SupplierStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
}

export enum ShipmentStatus {
  PENDING = 'PENDING',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum AIAgentType {
  FRAUD_DETECTION = 'FRAUD_DETECTION',
  SENTIMENT_ANALYSIS = 'SENTIMENT_ANALYSIS',
  HALAL_COMPLIANCE = 'HALAL_COMPLIANCE',
  VENDOR_PERFORMANCE = 'VENDOR_PERFORMANCE',
  SUPPLY_CHAIN_OPTIMIZATION = 'SUPPLY_CHAIN_OPTIMIZATION',
  DEMAND_FORECASTING = 'DEMAND_FORECASTING',
  PRICE_OPTIMIZATION = 'PRICE_OPTIMIZATION',
  INVENTORY_PREDICTION = 'INVENTORY_PREDICTION',
  CUSTOMER_INSIGHT = 'CUSTOMER_INSIGHT',
  MARKET_ANALYSIS = 'MARKET_ANALYSIS',
  QUALITY_ASSURANCE = 'QUALITY_ASSURANCE',
}

// Core Models
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: UserRole;
  isVerified: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vendor {
  id: string;
  userId: string;
  storeName: string;
  description?: string;
  logo?: string;
  rating?: number;
  totalSales: number;
  isVerified: boolean;
  businessLicense?: string;
  taxId?: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  products: Product[];
  suppliers: Supplier[];
  warehouses: Warehouse[];
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  compareAtPrice?: number;
  category: string;
  subcategory?: string;
  sku: string;
  barcode?: string;
  weight?: number;
  dimensions?: string;
  images: string[];
  vendorId: string;
  isHalalCertified: boolean;
  blockchainHash?: string;
  stockQuantity: number;
  minStockLevel: number;
  maxStockLevel: number;
  isActive: boolean;
  tags: string[];
  rating?: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
  vendor: Vendor;
  orderItems: OrderItem[];
  inventories: Inventory[];
  certifications: Certification[];
  cartItems: CartItem[];
  reviews: Review[];
  procurements: Procurement[];
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingAddress: Record<string, unknown>; // JSON
  billingAddress?: Record<string, unknown>; // JSON
  notes?: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  orderItems: OrderItem[];
  payments: Payment[];
  shipments: Shipment[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  order: Order;
  product: Product;
}

export interface Inventory {
  id: string;
  productId: string;
  warehouseId: string;
  quantity: number;
  reservedQty: number;
  availableQty: number;
  location: string;
  binLocation?: string;
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
  warehouse: Warehouse;
}

export interface Certification {
  id: string;
  productId: string;
  blockchainTx: string;
  halalScore: number;
  status: HalalStatus;
  issuedBy: string;
  issuedAt: Date;
  expiresAt?: Date;
  certificateUrl?: string;
  auditTrail: Record<string, unknown>; // JSON
  smartContract?: string;
  product: Product;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  product: Product;
}

export interface Address {
  id: string;
  userId: string;
  type: string; // 'shipping', 'billing'
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: User;
}

export interface Payment {
  id: string;
  orderId?: string;
  userId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod: string; // 'stripe', 'paypal', 'crypto'
  transactionId?: string;
  gatewayResponse?: Record<string, unknown>; // JSON
  createdAt: Date;
  updatedAt: Date;
  order?: Order;
  user: User;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  rating: number; // 1-5
  title?: string;
  comment?: string;
  images: string[];
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
  user: User;
}

export interface Warehouse {
  id: string;
  name: string;
  vendorId?: string;
  address: Record<string, unknown>; // JSON
  capacity?: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  vendor?: Vendor;
  inventories: Inventory[];
  shipments: Shipment[];
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address: Record<string, unknown>; // JSON
  vendorId?: string;
  status: SupplierStatus;
  rating?: number;
  paymentTerms?: string;
  createdAt: Date;
  updatedAt: Date;
  vendor?: Vendor;
  procurements: Procurement[];
}

export interface Procurement {
  id: string;
  productId: string;
  supplierId: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  status: string;
  orderDate: Date;
  expectedDate?: Date;
  receivedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
  supplier: Supplier;
}

export interface Shipment {
  id: string;
  orderId: string;
  warehouseId: string;
  trackingNumber: string;
  carrier: string;
  status: ShipmentStatus;
  shippingAddress: Record<string, unknown>; // JSON
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
  order: Order;
  warehouse: Warehouse;
}

export interface AIAgent {
  id: string;
  name: string;
  type: AIAgentType;
  description?: string;
  config: Record<string, unknown>; // JSON
  isActive: boolean;
  lastRun?: Date;
  performance: Record<string, unknown>; // JSON
  accuracy?: number;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
  logs: AIAgentLog[];
  recommendations: AIRecommendation[];
}

export interface AIAgentLog {
  id: string;
  agentId: string;
  action: string;
  input?: Record<string, unknown>; // JSON
  output?: Record<string, unknown>; // JSON
  status: string; // 'SUCCESS', 'ERROR', 'RUNNING'
  duration?: number; // milliseconds
  confidence?: number; // AI confidence score
  metadata?: Record<string, unknown>; // JSON
  createdAt: Date;
  agent: AIAgent;
}

export interface AIRecommendation {
  id: string;
  agentId: string;
  type: string; // 'PRICE_SUGGESTION', 'INVENTORY_ALERT', 'QUALITY_CHECK', etc.
  targetId: string; // ID of the entity being recommended for (product, order, etc.)
  targetType: string; // 'PRODUCT', 'ORDER', 'VENDOR', etc.
  title: string;
  description: string;
  confidence: number;
  impact: string; // 'HIGH', 'MEDIUM', 'LOW'
  status: string; // 'PENDING', 'APPLIED', 'REJECTED'
  appliedAt?: Date;
  createdAt: Date;
  agent: AIAgent;
}

export interface Analytics {
  id: string;
  metric: string; // 'sales', 'inventory_turnover', 'customer_satisfaction'
  value: number;
  metadata?: Record<string, unknown>; // JSON
  date: Date;
  createdAt: Date;
}

export interface BlockchainTransaction {
  id: string;
  txHash: string;
  blockNumber?: bigint;
  blockHash?: string;
  fromAddress: string;
  toAddress?: string;
  value?: string; // Wei for ETH, satoshis for BTC
  gasUsed?: bigint;
  gasPrice?: bigint;
  status: string; // 'PENDING', 'CONFIRMED', 'FAILED'
  network: string; // 'ethereum', 'polygon', 'bsc', etc.
  contractAddress?: string;
  eventName?: string;
  eventData?: Record<string, unknown>; // JSON
  entityId: string; // Related entity ID (product, certification, etc.)
  entityType: string; // 'CERTIFICATION', 'PRODUCT', 'ORDER', etc.
  confirmedAt?: Date;
  createdAt: Date;
}

export interface SmartContract {
  id: string;
  name: string;
  address: string;
  network: string; // 'ethereum', 'polygon', 'bsc', etc.
  abi: Record<string, unknown>; // JSON
  bytecode?: string;
  deployedAt?: Date;
  deployer?: string;
  verified: boolean;
  sourceCode?: string;
  compiler?: string;
  license?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Auth Types
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
  role: UserRole;
}

// Cart Types
export interface Cart {
  items: CartItem[];
  total: number;
}

export interface CheckoutData {
  shippingAddress: string;
  paymentMethod: string;
}

// Marketplace Types
export type MarketplaceRole = 'Admin' | 'SEO Manager' | 'Content Editor' | 'Sales Rep';

export interface Permission {
  module: 'SEO' | 'CMS' | 'CRM';
  actions: string[];
}

export interface RolePermissions {
  [key: string]: Permission[];
}

// SEO Types
export interface KeywordData {
  id: string;
  keyword: string;
  position: number;
  volume: number;
  difficulty: number;
  trend: number[];
}

export interface BacklinkData {
  id: string;
  domain: string;
  url: string;
  anchor: string;
  da: number;
  status: 'active' | 'broken' | 'pending';
}

export interface SiteAuditData {
  id: string;
  url: string;
  score: number;
  issues: {
    type: 'error' | 'warning' | 'info';
    message: string;
    count: number;
  }[];
}

// CMS Types
export interface ContentItem {
  id: string;
  title: string;
  status: 'draft' | 'published' | 'scheduled';
  author: string;
  publishDate: string;
  category: string;
}

export interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  size: number;
  url: string;
  uploadedAt: string;
}

// CRM Types
export interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'lead' | 'prospect' | 'customer';
  lastContact: string;
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed';
  contactId: string;
  expectedClose: string;
}

export interface Interaction {
  id: string;
  contactId: string;
  type: 'call' | 'email' | 'meeting';
  date: string;
  notes: string;
}
