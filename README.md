# HalalChain Multivendor E-commerce Platform 🕌

*A blockchain-powered, AI-driven multivendor e-commerce platform built for Halal products, ensuring end-to-end supply chain transparency and compliance.*

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-22.x-green.svg)
![NestJS](https://img.shields.io/badge/NestJS-10-red.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-orange.svg)
![Redis](https://img.shields.io/badge/Redis-7.x-red.svg)
![Magento](https://img.shields.io/badge/Magento-2.4-EE672E.svg)
![Blockchain](https://img.shields.io/badge/Blockchain-Ethereum-3C3C3D.svg)
![AI](https://img.shields.io/badge/AI--Agents-Multi--Agent-FF6B35.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

🔗 **Live Demo**: [halalchain.xyz](https://halalchain.xyz)
📖 **Documentation**: [docs.halalchain.xyz](https://docs.halalchain.xyz)

---

## 🌟 Key Features

### 🏪 Implemented Core Features

* **User Authentication** – Secure login/register with JWT and role-based access (Customer, Vendor, Admin)
* **Product Catalog** – Browse, search, and view Halal-certified products
* **Shopping Cart** – Add/remove items, manage quantities
* **Blockchain Verification** – Basic Halal certification tracking via blockchain hashes
* **AI Site Generator** – Prompt-based site creation and analysis tools
* **Responsive Navigation** – User profile dropdown, mobile menu, theme toggle, accessibility features

### 🚧 Planned Features

* **Multivendor Marketplace** – Vendor management and dashboards
* **Order Processing** – Full order lifecycle with payments and shipments
* **Supply Chain Intelligence** – Inventory optimization, warehouse management, logistics integration
* **Advanced AI System** – Multi-agent automation for fraud detection, forecasting, and compliance
* **Real-time Analytics** – Live dashboards for business insights
* **Integrations** – Magento synchronization, payment gateways (Stripe, PayPal)

### 🔧 Technical Foundation

* **Modern Stack** – Next.js 15 (frontend), NestJS 11 (backend), Prisma ORM
* **Performance** – Turbopack for dev, Framer Motion animations, optimized queries
* **Security** – JWT authentication, RBAC guards, encrypted data
* **Database** – PostgreSQL with comprehensive schema for e-commerce entities

---

## 🏗️ System Architecture

```mermaid
graph TB
    WEB[Next.js Frontend<br/>Tailwind CSS + Framer Motion]
    GW[API Gateway<br/>NestJS]

    AUTH[Auth Service]
    PROD[Product Service]
    CART[Cart Service]
    BLOCKCHAIN[Blockchain Service]
    AI[AI Tools Service]

    DB[(PostgreSQL Neon)]
    BC[Blockchain Network]

    WEB --> GW
    GW --> AUTH & PROD & CART & BLOCKCHAIN & AI
    AUTH --> DB
    PROD --> DB
    CART --> DB
    BLOCKCHAIN --> BC
    AI --> DB
```

*Note: Additional services (Orders, Vendors, Inventory, Supply Chain, etc.) are defined in the database schema and planned for future implementation.*

---

## 📊 Real-Time Data Flow

```mermaid
sequenceDiagram
    participant C as Customer
    participant F as Next.js Frontend
    participant G as API Gateway
    participant M as Magento Backend
    participant P as Product Service
    participant I as Inventory Service
    participant B as Blockchain
    participant AI as AI Agent
    participant S as Supplier
    
    C->>F: Browse Halal Products
    F->>G: GET /api/products?halalScore=90
    G->>M: GraphQL query (Magento)
    M->>G: Return product data
    G->>P: Enhance with Halal info
    P->>I: Check stock availability
    I->>P: Stock status
    P->>B: Verify certification
    B->>P: Certification valid
    P->>AI: Compute trust score
    AI->>P: Return analysis
    P->>G: Enhanced data
    G->>F: Response
    F->>C: Verified product list
    
    Note over I,S: Low stock detected
    I->>S: Auto-replenishment request
    S->>AI: Supplier ranking
    AI->>S: Optimal supplier chosen
    S->>P: Procurement order created
```

---

## 🚀 Quick Start

### Prerequisites

* Node.js **22.x+**
* PostgreSQL (Neon recommended)

### Installation

```bash
git clone https://github.com/halalchain/halalchain-ecommerce.git
cd halalchain-ecommerce
npm install
cp .env.example .env
# Edit .env with your database URL and other configs
nano .env
```

### Database Setup

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### Development

```bash
npm run dev          # Full stack (backend + frontend)
npm run backend:dev  # Backend only
npm run frontend:dev # Frontend only
npm test             # Backend unit tests
npm run test:e2e     # Backend end-to-end tests
```

### Production

```bash
npm run build
npm run start
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# JWT
JWT_SECRET="your-jwt-secret-key"

# Blockchain (optional)
BLOCKCHAIN_RPC_URL="https://your-blockchain-rpc"
BLOCKCHAIN_PRIVATE_KEY="your-private-key"

# AI (optional)
ANTHROPIC_API_KEY="your-anthropic-key"

# Frontend
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

### Database Configuration

The application uses Prisma with PostgreSQL. The schema includes all necessary models for e-commerce, supply chain, and AI features. See [docs/README-DATABASE.md](docs/README-DATABASE.md) for detailed database setup.

---

## 🧩 Project Structure

```
halalchain/
├── apps/
│   ├── frontend/        # Next.js app with App Router
│   │   ├── src/
│   │   │   ├── app/           # Pages and API routes
│   │   │   ├── components/    # Reusable UI components
│   │   │   ├── contexts/      # React contexts (Auth, Cart)
│   │   │   ├── hooks/         # Custom hooks
│   │   │   └── lib/           # Utilities and configs
│   └── backend/         # NestJS app
│       ├── src/
│       │   ├── modules/
│       │   │   ├── auth/      # Authentication & authorization
│       │   │   ├── products/  # Product management
│       │   │   ├── cart/      # Shopping cart
│       │   │   ├── blockchain/# Halal certification verification
│       │   │   └── ai-tools/  # AI-powered tools
│       │   └── common/        # Shared services (Prisma)
├── prisma/              # Database schema and migrations
├── docs/                # Documentation and analysis reports
└── README.md
```

---

## 🔌 API Highlights

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Products
- `GET /products` - List all products
- `GET /products/search?q=term` - Search products
- `GET /products/:id` - Get product details

### Cart
- `GET /cart` - Get user's cart
- `POST /cart/add` - Add item to cart
- `POST /cart/remove` - Remove item from cart

### Blockchain
- `POST /blockchain/verify` - Verify Halal certification
- `POST /blockchain/certify` - Create new certification

### AI Tools
- `POST /ai-tools/generate` - Generate content with AI
- `POST /ai-tools/analyze` - Analyze product/vendor data

**Base URL**: `http://localhost:3001` (development)

For complete API documentation, see the NestJS Swagger docs at `/api` when running the backend.

---

## 📈 Current Status

### ✅ Implemented Features

- **Core E-commerce**: User authentication, product catalog, shopping cart
- **Blockchain Integration**: Halal certification verification
- **AI Tools**: Basic AI-powered features for site generation and analysis
- **Modern Frontend**: Next.js with animations, responsive design, dark/light mode
- **Database**: Comprehensive Prisma schema for all entities

### 🚧 In Development

- **Order Management**: Order processing and fulfillment
- **Vendor Dashboard**: Multivendor marketplace features
- **Supply Chain**: Inventory, procurement, logistics automation
- **Advanced AI**: Multi-agent system for fraud detection, forecasting
- **Integrations**: Magento sync, payment gateways

### 📊 Recent Improvements

- Fixed TypeScript compilation errors
- Enhanced animations with Framer Motion and Lenis
- Improved accessibility and performance
- Updated dependencies for React 19 compatibility

See [docs/ANALYSIS_REPORT.md](docs/ANALYSIS_REPORT.md) for detailed fixes.

---

## 🛠️ Development Notes

- **Monorepo Setup**: Uses npm workspaces for coordinated builds
- **Frontend**: Turbopack for fast development, Framer Motion for animations
- **Backend**: NestJS with modular architecture, Prisma for ORM
- **Styling**: Tailwind CSS with custom themes and CSS variables
- **Testing**: Jest for backend, focus on API testing

---

## 🤖 AI Agent System

### Current Implementation

The AI system uses Anthropic Claude 3.5 Sonnet with tool-calling capabilities for intelligent content generation and data analysis.

#### Site Generation Workflow

```mermaid
graph TD
    A[User Prompt] --> B[AI Tools Controller]
    B --> C[Claude 3.5 Sonnet]
    C --> D{Uses Tools?}
    D -->|Yes| E[Tool Execution]
    E --> F[Database Query/API Call/Translation/SEO Analysis]
    F --> G[Tool Results]
    G --> C
    D -->|No| H[Direct Response]
    H --> I[Parse Site Structure]
    G --> I
    I --> J[Return Generated Site]
```

#### Available Tools

- **Database Query**: Safe SELECT queries for dynamic data retrieval
- **API Request**: Authenticated external API calls
- **Translation**: Multi-language text translation via LibreTranslate
- **SEO Analyzer**: Webpage SEO assessment and recommendations

#### Planned Multi-Agent System

```mermaid
graph TB
    A[AI Orchestrator] --> B[Fraud Detection Agent]
    A --> C[Customer Sentiment Agent]
    A --> D[Halal Compliance Agent]
    A --> E[Vendor Performance Agent]
    A --> F[Supply Chain Optimization Agent]
    A --> G[Demand Forecasting Agent]

    B --> H[Blockchain Verification]
    C --> I[Review Analysis]
    D --> J[Certification Checks]
    E --> K[Metrics Calculation]
    F --> L[Inventory Forecasting]
    G --> M[Sales Prediction]
```

For detailed AI implementation, see [docs/AI_README.md](docs/AI_README.md).

---

## 🚀 Deployment

- **Frontend**: Deploy to Vercel or similar with `npm run frontend:build`
- **Backend**: Deploy Node.js app with `npm run backend:build` and `npm run backend:start`
- **Database**: Use Neon PostgreSQL in production

---

## 📈 Monitoring & Security

* Real-time vendor dashboards
* Inventory, logistics & AI metrics
* JWT + RBAC + Redis rate limiting
* Encrypted data & blockchain immutability

---

## 🤝 Contributing

We welcome contributions to HalalChain! Please follow these guidelines:

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/halalchain-ecommerce.git`
3. Install dependencies: `npm install`
4. Set up the database: Follow the [Database Setup](#database-setup) instructions
5. Start development: `npm run dev`

### Code Style
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use meaningful commit messages
- Write tests for new features

### Pull Request Process
1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes and ensure tests pass: `npm test`
3. Commit your changes: `git commit -m 'Add: brief description of changes'`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request with a clear description

### Areas for Contribution
- Frontend UI/UX improvements
- Backend API development
- Blockchain integration enhancements
- AI tool expansions
- Supply chain features
- Documentation updates

### Reporting Issues
- Use GitHub Issues for bugs and feature requests
- Provide detailed steps to reproduce bugs
- Include environment information (Node.js version, OS, etc.)

---

## 📄 License

MIT License – see [LICENSE.md](LICENSE.md)

---

<div align="center">

**Built with ❤️ for the Global Muslim Community**

*Ensuring Halal integrity through technology and transparency*

[![Star History Chart](https://api.star-history.com/svg?repos=halalchain/halalchain-ecommerce\&type=Date)](https://star-history.com/#halalchain/halalchain-ecommerce&Date)

</div>  
