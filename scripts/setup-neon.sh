#!/bin/bash

echo "🚀 Setting up HalalChain with Neon PostgreSQL..."

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update DATABASE_URL in .env with your Neon PostgreSQL connection string"
    echo "   Format: postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/halalchain?sslmode=require"
    read -p "Press Enter after updating .env file..."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Push schema to database
echo "🗄️  Pushing schema to Neon database..."
npx prisma db push

# Seed database
echo "🌱 Seeding database with sample data..."
npm run db:seed

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "   1. Start backend: cd apps/backend && npm run start:dev"
echo "   2. Start frontend: cd apps/frontend && npm run dev"
echo "   3. Visit: http://localhost:3000"
echo ""
echo "📊 Database Studio: npx prisma studio"