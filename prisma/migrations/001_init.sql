-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CUSTOMER', 'VENDOR', 'ADMIN', 'AUDITOR');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "HalalStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "SupplierStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "ShipmentStatus" AS ENUM ('PENDING', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "AIAgentType" AS ENUM ('FRAUD_DETECTION', 'SENTIMENT_ANALYSIS', 'HALAL_COMPLIANCE', 'VENDOR_PERFORMANCE', 'SUPPLY_CHAIN_OPTIMIZATION', 'DEMAND_FORECASTING');

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "btree_gin";

-- Create indexes for full-text search
CREATE INDEX IF NOT EXISTS "products_name_search_idx" ON "products" USING gin(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS "products_description_search_idx" ON "products" USING gin(to_tsvector('english', description));
CREATE INDEX IF NOT EXISTS "vendors_store_name_search_idx" ON "vendors" USING gin(to_tsvector('english', "storeName"));

-- Performance indexes
CREATE INDEX IF NOT EXISTS "products_category_idx" ON "products"("category");
CREATE INDEX IF NOT EXISTS "products_vendor_idx" ON "products"("vendorId");
CREATE INDEX IF NOT EXISTS "products_halal_certified_idx" ON "products"("halalCertified");
CREATE INDEX IF NOT EXISTS "orders_user_idx" ON "orders"("userId");
CREATE INDEX IF NOT EXISTS "orders_status_idx" ON "orders"("status");
CREATE INDEX IF NOT EXISTS "cart_items_user_idx" ON "cart_items"("userId");
CREATE INDEX IF NOT EXISTS "inventories_product_warehouse_idx" ON "inventories"("productId", "warehouseId");
CREATE INDEX IF NOT EXISTS "certifications_product_idx" ON "certifications"("productId");
CREATE INDEX IF NOT EXISTS "reviews_product_idx" ON "reviews"("productId");
CREATE INDEX IF NOT EXISTS "analytics_metric_date_idx" ON "analytics"("metric", "date");