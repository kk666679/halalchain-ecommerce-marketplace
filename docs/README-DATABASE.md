# HalalChain Database Setup

## Enhanced Prisma Schema

The database schema includes comprehensive models for:

### Core E-commerce
- **Users** - Customer, vendor, admin, auditor roles
- **Vendors** - Store profiles with verification
- **Products** - Enhanced with SKU, images, ratings
- **Orders** - Complete order management
- **Cart** - Shopping cart functionality

### Supply Chain Intelligence
- **Inventory** - Multi-warehouse stock management
- **Warehouses** - Storage facility management
- **Suppliers** - Vendor supplier relationships
- **Procurement** - Automated purchasing
- **Shipments** - Logistics tracking

### Blockchain & AI
- **Certifications** - Halal verification on blockchain
- **AI Agents** - Multi-agent system management
- **Analytics** - Business intelligence metrics

### Customer Experience
- **Reviews** - Product ratings and feedback
- **Addresses** - Shipping/billing addresses
- **Payments** - Transaction management

## Neon PostgreSQL Setup

### 1. Create Neon Database
```bash
# Visit https://neon.tech and create a new project
# Copy the connection string
```

### 2. Configure Environment
```bash
cp .env.example .env
# Update DATABASE_URL with your Neon connection string
```

### 3. Run Setup Script
```bash
./scripts/setup-neon.sh
```

### 4. Manual Setup (Alternative)
```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with sample data
npm run db:seed
```

## Database Commands

```bash
# Generate Prisma client
npm run db:generate

# Push schema changes
npm run db:push

# Create migration
npm run db:migrate

# Seed database
npm run db:seed

# Open Prisma Studio
npm run db:studio

# Reset database
npm run db:reset
```

## Sample Data

The seed script creates:
- Admin user: `admin@halalchain.com` / `admin123`
- Vendor users: `vendor1@halalchain.com` / `vendor123`
- Customer: `customer@example.com` / `customer123`
- Sample products with halal certifications
- Warehouses and inventory
- AI agents for automation

## Performance Optimizations

### Indexes Created
- Full-text search on products and vendors
- Category and vendor filtering
- Order and cart lookups
- Certification verification
- Analytics queries

### Extensions Enabled
- `pg_trgm` - Trigram matching for search
- `btree_gin` - Optimized indexing

## Schema Highlights

### Enhanced Product Model
```prisma
model Product {
  sku             String   @unique
  images          String[] @default([])
  rating          Float?   @default(0)
  reviewCount     Int      @default(0)
  minStockLevel   Int      @default(10)
  tags            String[] @default([])
  // ... other fields
}
```

### Supply Chain Integration
```prisma
model Inventory {
  availableQty    Int
  reservedQty     Int     @default(0)
  binLocation     String?
  // ... warehouse relations
}
```

### AI Agent System
```prisma
model AIAgent {
  type        AIAgentType
  config      Json        @default("{}")
  logs        AIAgentLog[]
}
```

## Migration Strategy

1. **Development**: Use `prisma db push` for rapid iteration
2. **Production**: Use `prisma migrate deploy` for versioned migrations
3. **Backup**: Regular Neon automated backups
4. **Monitoring**: Use Prisma metrics and Neon dashboard