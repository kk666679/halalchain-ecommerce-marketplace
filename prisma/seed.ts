import { PrismaClient, UserRole, HalalStatus, SupplierStatus, AIAgentType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@halalchain.com' },
    update: {},
    create: {
      email: 'admin@halalchain.com',
      password: adminPassword,
      name: 'HalalChain Admin',
      role: UserRole.ADMIN,
      isVerified: true,
    },
  });

  // Create vendor users
  const vendorPassword = await bcrypt.hash('vendor123', 10);
  const vendor1 = await prisma.user.create({
    data: {
      email: 'vendor1@halalchain.com',
      password: vendorPassword,
      name: 'Halal Meats Co Owner',
      role: UserRole.VENDOR,
      isVerified: true,
    },
  });

  const vendor2 = await prisma.user.create({
    data: {
      email: 'vendor2@halalchain.com',
      password: vendorPassword,
      name: 'Desert Fruits Owner',
      role: UserRole.VENDOR,
      isVerified: true,
    },
  });

  // Create vendor profiles
  const vendorProfile1 = await prisma.vendor.create({
    data: {
      userId: vendor1.id,
      storeName: 'Halal Meats Co',
      description: 'Premium halal-certified meat products',
      rating: 4.8,
      isVerified: true,
      businessLicense: 'BL-001-2024',
    },
  });

  const vendorProfile2 = await prisma.vendor.create({
    data: {
      userId: vendor2.id,
      storeName: 'Desert Fruits',
      description: 'Organic dates and dried fruits',
      rating: 4.6,
      isVerified: true,
      businessLicense: 'BL-002-2024',
    },
  });

  // Create warehouses
  const warehouse1 = await prisma.warehouse.create({
    data: {
      name: 'Main Warehouse - NYC',
      vendorId: vendorProfile1.id,
      address: {
        street: '123 Warehouse St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
      },
      capacity: 10000,
    },
  });

  const warehouse2 = await prisma.warehouse.create({
    data: {
      name: 'West Coast Hub',
      vendorId: vendorProfile2.id,
      address: {
        street: '456 Storage Ave',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90001',
      },
      capacity: 5000,
    },
  });

  // Create suppliers
  const supplier1 = await prisma.supplier.create({
    data: {
      name: 'Premium Halal Farms',
      email: 'contact@halalfarms.com',
      phone: '+1-555-0101',
      address: {
        street: '789 Farm Road',
        city: 'Austin',
        state: 'TX',
        zip: '73301',
      },
      vendorId: vendorProfile1.id,
      status: SupplierStatus.ACTIVE,
      rating: 4.9,
    },
  });

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Halal Chicken Breast',
        description: 'Fresh, premium halal-certified chicken breast',
        price: 12.99,
        category: 'Meat',
        subcategory: 'Poultry',
        sku: 'HCB-001',
        vendorId: vendorProfile1.id,
        halalCertified: true,
        stockQuantity: 100,
        minStockLevel: 20,
        images: ['chicken-breast.jpg'],
        tags: ['halal', 'fresh', 'protein'],
        rating: 4.7,
        reviewCount: 23,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Organic Medjool Dates',
        description: 'Premium Medjool dates from certified organic farms',
        price: 8.50,
        category: 'Fruits',
        subcategory: 'Dried Fruits',
        sku: 'OMD-001',
        vendorId: vendorProfile2.id,
        halalCertified: true,
        stockQuantity: 200,
        minStockLevel: 50,
        images: ['medjool-dates.jpg'],
        tags: ['organic', 'halal', 'natural'],
        rating: 4.9,
        reviewCount: 45,
      },
    }),
  ]);

  // Create inventory records
  await Promise.all([
    prisma.inventory.create({
      data: {
        productId: products[0].id,
        warehouseId: warehouse1.id,
        quantity: 100,
        availableQty: 100,
        location: 'A-1-01',
        binLocation: 'Freezer Section A',
      },
    }),
    prisma.inventory.create({
      data: {
        productId: products[1].id,
        warehouseId: warehouse2.id,
        quantity: 200,
        availableQty: 200,
        location: 'B-2-05',
        binLocation: 'Dry Storage B',
      },
    }),
  ]);

  // Create certifications
  await Promise.all([
    prisma.certification.create({
      data: {
        productId: products[0].id,
        blockchainTx: '0x1234567890abcdef',
        halalScore: 95,
        status: HalalStatus.VERIFIED,
        issuedBy: 'Islamic Food and Nutrition Council of America',
      },
    }),
    prisma.certification.create({
      data: {
        productId: products[1].id,
        blockchainTx: '0xabcdef1234567890',
        halalScore: 98,
        status: HalalStatus.VERIFIED,
        issuedBy: 'Halal Food Authority',
      },
    }),
  ]);

  // Create AI Agents
  const aiAgents = await Promise.all([
    prisma.aIAgent.create({
      data: {
        name: 'Fraud Detection Agent',
        type: AIAgentType.FRAUD_DETECTION,
        description: 'Monitors transactions for fraudulent activities',
        config: {
          threshold: 0.8,
          checkInterval: 300,
        },
        accuracy: 0.92,
        priority: 5,
      },
    }),
    prisma.aIAgent.create({
      data: {
        name: 'Halal Compliance Monitor',
        type: AIAgentType.HALAL_COMPLIANCE,
        description: 'Ensures all products meet halal standards',
        config: {
          strictMode: true,
          autoFlag: true,
        },
        accuracy: 0.95,
        priority: 4,
      },
    }),
    prisma.aIAgent.create({
      data: {
        name: 'Demand Forecasting Engine',
        type: AIAgentType.DEMAND_FORECASTING,
        description: 'Predicts product demand and optimizes inventory',
        config: {
          forecastDays: 30,
          algorithm: 'ARIMA',
        },
        accuracy: 0.87,
        priority: 3,
      },
    }),
    prisma.aIAgent.create({
      data: {
        name: 'Price Optimization Agent',
        type: AIAgentType.PRICE_OPTIMIZATION,
        description: 'Dynamically adjusts prices based on market conditions',
        config: {
          adjustmentLimit: 0.15,
          competitorAnalysis: true,
        },
        accuracy: 0.89,
        priority: 3,
      },
    }),
    prisma.aIAgent.create({
      data: {
        name: 'Inventory Prediction AI',
        type: AIAgentType.INVENTORY_PREDICTION,
        description: 'Predicts optimal inventory levels',
        config: {
          safetyStock: 1.5,
          reorderPoint: 20,
        },
        accuracy: 0.91,
        priority: 4,
      },
    }),
    prisma.aIAgent.create({
      data: {
        name: 'Customer Insight Engine',
        type: AIAgentType.CUSTOMER_INSIGHT,
        description: 'Analyzes customer behavior and preferences',
        config: {
          segmentation: true,
          churnPrediction: true,
        },
        accuracy: 0.85,
        priority: 2,
      },
    }),
  ]);

  // Create sample customer
  const customerPassword = await bcrypt.hash('customer123', 10);
  const customer = await prisma.user.create({
    data: {
      email: 'customer@example.com',
      password: customerPassword,
      name: 'John Doe',
      role: UserRole.CUSTOMER,
      isVerified: true,
    },
  });

  // Create customer address
  await prisma.address.create({
    data: {
      userId: customer.id,
      type: 'shipping',
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Main St',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      isDefault: true,
    },
  });

  console.log('✅ Database seeded successfully!');
  console.log(`👤 Admin: admin@halalchain.com / admin123`);
  console.log(`🏪 Vendor 1: vendor1@halalchain.com / vendor123`);
  console.log(`🏪 Vendor 2: vendor2@halalchain.com / vendor123`);
  console.log(`🛒 Customer: customer@example.com / customer123`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });