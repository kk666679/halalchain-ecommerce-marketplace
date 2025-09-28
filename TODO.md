
# HalalChain E-commerce Platform Scaffold TODO

## Step 1: Create monorepo folder structure
- [x] Set up `apps/frontend` (Next.js)
- [x] Set up `apps/backend` (NestJS)
- [x] Create supporting directories: `prisma/`, `docs/`, `.github/workflows/`

## Step 2: Generate Prisma schema
- [x] Define schema.prisma with Users, Vendors, Products, Orders, Inventory, Certifications

## Step 3: Implement auth module boilerplate
- [x] NestJS auth module with JWT, NextAuth integration, RBAC guards

## Step 4: Provide boilerplate for key modules
- [ ] Product service (with Magento sync)
  - [x] Create products.dto.ts with CreateProductDto and UpdateProductDto
  - [ ] Update products.service.ts: Add syncFromMagento() method
  - [ ] Update products.controller.ts: Add @Post('sync') endpoint
  - [ ] Update products.module.ts: Import HttpModule
  - [x] Update package.json: Add dependencies (@nestjs/axios, axios, class-validator, class-transformer)
  - [x] Install dependencies with npm install
  - [ ] Test sync endpoint
- [ ] Blockchain service (Ethereum verification)
- [ ] AI agent skeleton (multi-agent for fraud/demand)
- [ ] Redis caching (sessions/rate limiting)

## Step 5: Write Docker Compose
- [ ] Services for backend, frontend, PostgreSQL, Redis, Magento

## Step 6: Suggest CI/CD pipeline
- [ ] GitHub Actions workflow for build, test, lint, deploy

## Step 7: Recommend best practices
- [ ] Logging with Winston, monitoring with Prometheus/Grafana, scaling with Kubernetes

## Step 8: Create initial documentation
- [ ] Setup guide, run commands, testing instructions, developer onboarding
