import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface PDFOptions {
  title?: string;
  filename?: string;
  format?: 'a4' | 'letter';
  orientation?: 'portrait' | 'landscape';
}

export class PDFGenerator {
  private doc: jsPDF;

  constructor(options: PDFOptions = {}) {
    const { format = 'a4', orientation = 'portrait' } = options;
    this.doc = new jsPDF({
      orientation,
      unit: 'mm',
      format,
    });
  }

  async addPageFromElement(element: HTMLElement, options: { scale?: number } = {}): Promise<void> {
    const { scale = 2 } = options;

    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Add first page
    this.doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      this.doc.addPage();
      this.doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
  }

  async addPageFromHTML(html: string, options: { scale?: number } = {}): Promise<void> {
    // Create a temporary element to render HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px';
    tempDiv.style.top = '-9999px';
    tempDiv.style.width = '210mm'; // A4 width
    document.body.appendChild(tempDiv);

    try {
      await this.addPageFromElement(tempDiv, options);
    } finally {
      document.body.removeChild(tempDiv);
    }
  }

  addText(text: string, x: number, y: number, options: { fontSize?: number; font?: string } = {}): void {
    const { fontSize = 12, font = 'helvetica' } = options;
    this.doc.setFont(font);
    this.doc.setFontSize(fontSize);
    this.doc.text(text, x, y);
  }

  addImage(imageData: string, x: number, y: number, width: number, height: number): void {
    this.doc.addImage(imageData, 'PNG', x, y, width, height);
  }

  addPage(): void {
    this.doc.addPage();
  }

  save(filename: string = 'document.pdf'): void {
    this.doc.save(filename);
  }

  getBlob(): Blob {
    return this.doc.output('blob');
  }

  getDataURL(): string {
    return this.doc.output('dataurlstring');
  }
}

// Simple markdown to HTML converter
const markdownToHtml = (markdown: string): string => {
  return markdown
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\n\n/gim, '</p><p>')
    .replace(/\n/gim, '<br>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
};

// Business Documentation Content - Updated to reflect current implementation
const businessDocumentation = `# HalalChain E-commerce Platform - Current Implementation Status

## 📋 Executive Summary

HalalChain is a blockchain-powered, AI-driven multivendor e-commerce platform currently in development, specifically designed for Halal-certified products. The platform combines modern web technologies with Islamic compliance standards to create a transparent marketplace serving the global Muslim community.

### Current Mission
"To build a trustworthy digital marketplace that connects Halal product vendors with conscious consumers through technology and transparency."

### Core Objectives (Implemented)
- ✅ Establish basic user authentication and role-based access (Customer, Vendor, Admin, Auditor)
- ✅ Create product catalog with Halal certification tracking
- ✅ Implement shopping cart and basic order management
- ✅ Develop AI-powered site generation tools
- ✅ Build responsive frontend with modern animations

### Core Objectives (In Development)
- 🔄 Expand blockchain integration for immutable certifications
- 🔄 Implement comprehensive supply chain management
- 🔄 Deploy multi-agent AI system for business intelligence
- 🔄 Launch multivendor marketplace features

---

## 🏗️ Current Technology Stack

### Frontend (Next.js 15)
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion + Lenis for smooth scrolling
- **State Management**: React Context + custom hooks
- **UI Components**: Radix UI primitives, Lucide icons
- **Charts**: Chart.js + Recharts for analytics

### Backend (NestJS 11)
- **Framework**: NestJS 11 with modular architecture
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with Passport.js
- **Validation**: Class-validator + class-transformer
- **AI Integration**: Anthropic Claude 3.5 Sonnet SDK

### Database (PostgreSQL + Prisma)
- **Schema**: Comprehensive e-commerce models with supply chain support
- **Features**: Full-text search, optimized indexes, foreign key constraints
- **Entities**: Users, Vendors, Products, Orders, Inventory, Certifications, AI Agents

### AI System (Current Implementation)
- **Model**: Anthropic Claude 3.5 Sonnet
- **Features**: Site generation, database queries, API calls, translation, SEO analysis
- **Architecture**: Single-agent with tool-calling capabilities
- **Database Integration**: Safe SQL queries via Prisma

### Blockchain (Basic Integration)
- **Network**: Ethereum/Polygon support
- **Features**: Certification tracking, smart contract models
- **Storage**: Database-backed with IPFS planning

---

## 📦 Current Features (Implemented)

### ✅ Core E-commerce
- **User Management**: Registration, login, JWT authentication, role-based access
- **Product Catalog**: CRUD operations, search, filtering, image uploads
- **Shopping Cart**: Add/remove items, quantity management, persistence
- **Order System**: Basic order creation, status tracking, payment integration
- **Vendor System**: Vendor profiles, product management, basic dashboards

### ✅ AI Tools
- **Site Generator**: Prompt-based website creation using Claude 3.5 Sonnet
- **Tool Integration**: Database queries, API calls, translation, SEO analysis
- **Fallback Mode**: Mock responses when API key unavailable

### ✅ Frontend Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animations**: Framer Motion with magnetic buttons, parallax effects
- **Navigation**: Multi-level menu, theme toggle, accessibility features
- **PDF Generation**: Dynamic investor deck creation from business docs

### ✅ Blockchain Basics
- **Certification Model**: Database-backed Halal certification tracking
- **Smart Contract Schema**: Models for blockchain transactions
- **Transaction Logging**: Basic blockchain event tracking

### ✅ Developer Experience
- **Monorepo Setup**: NPM workspaces for coordinated development
- **TypeScript**: Full type safety across frontend and backend
- **Testing**: Jest setup for backend unit tests
- **Linting**: ESLint + Prettier for code quality

---

## 🚧 Features In Development

### 🔄 Advanced E-commerce
- **Order Fulfillment**: Complete order lifecycle with shipping integration
- **Payment Processing**: Stripe/PayPal integration with multiple currencies
- **Review System**: Product ratings, vendor feedback, moderation
- **Inventory Management**: Multi-warehouse support, stock alerts

### 🔄 Supply Chain Intelligence
- **Warehouse Management**: Multi-location inventory tracking
- **Procurement System**: Automated supplier ordering
- **Shipment Tracking**: Real-time logistics integration
- **Quality Control**: AI-powered product inspection

### 🔄 Multi-Agent AI System
- **Fraud Detection**: Transaction monitoring and anomaly detection
- **Sentiment Analysis**: Customer review processing and insights
- **Compliance Agent**: Automated Halal certification verification
- **Demand Forecasting**: Sales prediction and inventory optimization

### 🔄 Enhanced Blockchain
- **Smart Contracts**: Solidity contracts for certification verification
- **IPFS Integration**: Decentralized certificate storage
- **Multi-Network Support**: Ethereum, Polygon, BSC compatibility
- **Wallet Integration**: User-controlled certification ownership

---

## 💰 Current Revenue Model

### Implemented Revenue Streams
- **Platform Fees**: Transaction commissions (planned 2-5%)
- **AI Tool Usage**: Claude API costs (currently development-only)
- **Premium Features**: Subscription tiers for vendors (planned)

### Development Focus
- **MVP Launch**: Core marketplace functionality
- **Vendor Acquisition**: Onboard initial Halal product vendors
- **User Growth**: Build consumer base through organic marketing
- **Feature Expansion**: Add premium services and integrations

### Cost Structure (Current)
- **Development**: Engineering and design resources
- **Infrastructure**: Cloud hosting, database, AI API usage
- **Operations**: Basic customer support and maintenance
- **Marketing**: Digital presence and community building

---

## 🔄 Current Development Status

### ✅ Completed Milestones
- **Architecture Setup**: Monorepo with Next.js + NestJS
- **Database Design**: Comprehensive Prisma schema for e-commerce
- **Authentication**: JWT-based user management with roles
- **Core CRUD**: Products, users, orders, cart functionality
- **AI Integration**: Claude 3.5 Sonnet with tool-calling
- **Frontend Polish**: Modern UI with animations and responsiveness
- **PDF Generation**: Dynamic investor deck from business documentation

### 🔄 Active Development
- **Order Processing**: Complete fulfillment workflow
- **Vendor Dashboard**: Comprehensive vendor management tools
- **Payment Integration**: Secure payment processing
- **Mobile Optimization**: Enhanced mobile experience
- **API Documentation**: Comprehensive developer resources

### 📋 Planned Features
- **Multi-Agent AI**: Fraud detection, sentiment analysis, compliance
- **Advanced Blockchain**: Smart contracts, IPFS storage, multi-network
- **Supply Chain**: Warehouse management, procurement automation
- **Analytics**: Business intelligence and reporting dashboards
- **Integrations**: Third-party platforms, payment gateways, logistics

---

## 🛠️ Technical Architecture

### System Overview
\`\`\`mermaid
graph TB
    A[Next.js Frontend] --> B[NestJS API Gateway]
    B --> C[Auth Module]
    B --> D[Products Module]
    B --> E[Cart Module]
    B --> F[Blockchain Module]
    B --> G[AI Tools Module]

    C --> H[(PostgreSQL)]
    D --> H
    E --> H
    F --> I[Blockchain Network]
    G --> J[Claude 3.5 Sonnet]

    A --> K[Framer Motion UI]
    A --> L[Lenis Scrolling]
    A --> M[PDF Generator]
\`\`\`

### Database Schema Highlights
- **Users**: Multi-role support (Customer, Vendor, Admin, Auditor)
- **Products**: Comprehensive catalog with Halal certification
- **Orders**: Full e-commerce order lifecycle
- **Inventory**: Multi-warehouse stock management
- **AI Agents**: Extensible agent system for future multi-agent features
- **Blockchain**: Transaction logging and certification tracking

### API Structure
- **RESTful Endpoints**: Standard HTTP methods with JSON responses
- **Authentication**: JWT tokens with role-based guards
- **Validation**: Request/response validation with Zod
- **Error Handling**: Structured error responses with proper HTTP codes

---

## 📊 Performance & Quality

### ✅ Recent Improvements
- **TypeScript Errors**: All compilation errors resolved
- **Dependencies**: Updated to latest versions (React 19, Next.js 15)
- **Animations**: Enhanced Framer Motion integration with accessibility
- **Build Process**: Optimized with Turbopack and proper monorepo setup

### 🔄 Quality Assurance
- **Testing**: Backend unit tests with Jest
- **Linting**: ESLint and Prettier configuration
- **Type Safety**: Full TypeScript coverage
- **Performance**: Optimized queries and efficient re-renders

### 📈 Monitoring & Analytics
- **Error Tracking**: Basic error handling and logging
- **Performance Metrics**: Response times and database query optimization
- **User Analytics**: Basic usage tracking (planned expansion)

---

## 🚀 Deployment & Operations

### Current Environment
- **Development**: Local development with hot reload
- **Database**: Neon PostgreSQL for cloud hosting
- **AI**: Anthropic API with fallback to mock responses
- **Hosting**: Vercel/Netlify planning for frontend

### Deployment Strategy
- **Frontend**: Static generation with Vercel
- **Backend**: Node.js deployment with PM2 or Docker
- **Database**: Managed PostgreSQL with automated backups
- **CI/CD**: GitHub Actions for automated testing and deployment

### Scaling Considerations
- **Database**: Connection pooling and query optimization
- **API**: Rate limiting and caching strategies
- **AI**: Cost monitoring and usage optimization
- **Frontend**: CDN distribution and performance monitoring

---

## 👥 Team & Development

### Current Team Structure
- **Development**: Full-stack development with modern practices
- **Architecture**: Monorepo setup with clear separation of concerns
- **Quality**: Code reviews, testing, and documentation
- **Agile Process**: Feature-driven development with regular updates

### Development Workflow
- **Version Control**: Git with feature branches and PR reviews
- **Documentation**: Comprehensive README and API documentation
- **Testing**: Unit tests and integration testing
- **Deployment**: Automated CI/CD pipelines

---

## 🎯 Roadmap & Next Steps

### Immediate Priorities (0-3 months)
- **Complete MVP**: Finish core e-commerce functionality
- **Payment Integration**: Implement secure payment processing
- **Vendor Onboarding**: Streamlined vendor registration and management
- **Mobile Optimization**: Enhanced mobile user experience
- **Testing**: Comprehensive test coverage and QA

### Medium-term Goals (3-6 months)
- **AI Expansion**: Multi-agent system implementation
- **Blockchain Enhancement**: Smart contract deployment and IPFS integration
- **Supply Chain**: Warehouse and inventory management
- **Analytics**: Business intelligence dashboards
- **Integrations**: Third-party platform connections

### Long-term Vision (6-12 months)
- **Market Launch**: Full platform launch with vendor partnerships
- **Global Expansion**: Multi-language support and international markets
- **Enterprise Features**: White-label solutions and advanced customizations
- **Innovation**: Continuous technology improvements and new features

---

## 📞 Contact & Resources

### Development Team
- **Repository**: Current implementation with active development
- **Documentation**: Comprehensive docs in /docs folder
- **Issues**: GitHub issues for bug reports and feature requests

### Technical Resources
- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: NestJS 11, Prisma, PostgreSQL
- **AI**: Anthropic Claude 3.5 Sonnet
- **Blockchain**: Ethereum/Polygon integration

### Business Resources
- **Business Documentation**: Comprehensive market analysis and strategy
- **Technical Analysis**: Recent improvements and architecture decisions
- **Investor Materials**: Dynamic PDF generation from business docs

---

*This documentation reflects the current implementation status as of December 2024. Features marked with ✅ are implemented, 🔄 are in development, and planned features are noted for future implementation.*`;

// Utility functions for common PDF generation tasks
export const generateInvestorDeck = async (element?: HTMLElement, useBusinessDoc: boolean = false): Promise<void> => {
  const generator = new PDFGenerator({
    title: 'HalalChain Investor Deck',
    filename: 'halalchain-investor-deck.pdf'
  });

  if (useBusinessDoc) {
    const htmlContent = markdownToHtml(businessDocumentation);
    await generator.addPageFromHTML(htmlContent);
  } else if (element) {
    await generator.addPageFromElement(element);
  }

  generator.save('halalchain-investor-deck.pdf');
};

export const generateProductCatalog = async (products: Array<{name: string; price: number; vendor?: {storeName?: string}}>): Promise<void> => {
  const generator = new PDFGenerator({
    title: 'HalalChain Product Catalog',
    filename: 'halalchain-product-catalog.pdf'
  });

  // Add title page
  generator.addText('HalalChain Product Catalog', 20, 30, { fontSize: 24 });
  generator.addText(`Generated on ${new Date().toLocaleDateString()}`, 20, 50);

  // Add products
  products.forEach((product, index) => {
    if (index > 0 && index % 5 === 0) {
      generator.addPage();
    }

    const y = 70 + (index % 5) * 50;
    generator.addText(product.name, 20, y);
    generator.addText(`Price: $${product.price}`, 20, y + 10);
    generator.addText(`Vendor: ${product.vendor?.storeName || 'Unknown'}`, 20, y + 20);
  });

  generator.save();
};

export const generateReport = async (
  title: string,
  data: Record<string, unknown>,
  element?: HTMLElement
): Promise<void> => {
  const generator = new PDFGenerator({
    title,
    filename: `${title.toLowerCase().replace(/\s+/g, '-')}.pdf`
  });

  if (element) {
    await generator.addPageFromElement(element);
  } else {
    // Generate basic report from data
    generator.addText(title, 20, 30, { fontSize: 20 });

    let y = 60;
    Object.entries(data).forEach(([key, value]) => {
      generator.addText(`${key}: ${value}`, 20, y);
      y += 15;
      if (y > 270) {
        generator.addPage();
        y = 30;
      }
    });
  }

  generator.save();
};
