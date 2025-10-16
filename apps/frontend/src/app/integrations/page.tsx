'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Store, Smartphone, Building2, CreditCard, BarChart3, Bot, Truck, Users, Shield, Plus, Cloud, Package } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import IntegrationCard from './components/IntegrationCard';
import Sidebar from './components/Sidebar';
import { StaggerContainer, StaggerItem, ScrollProgress, MotionBox } from '@/components/motion/MotionComponents';
import { fadeVariants, staggerVariants, springPresets } from '@/lib/animations';

interface Integration {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'disconnected' | 'syncing' | 'coming-soon';
  lastSync?: string;
  category: string;
  logo: string;
  isComingSoon?: boolean;
}

const integrations: Integration[] = [
  // E-Commerce Platforms
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'Popular all-in-one commerce platform for SMBs and D2C brands',
    status: 'disconnected',
    category: 'E-Commerce Platforms',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/shopify.svg',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    description: 'World\'s largest online marketplace and cloud computing platform',
    status: 'connected',
    category: 'E-Commerce Platforms',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/amazon.svg',
    lastSync: '2 minutes ago',
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    description: 'WordPress-based eCommerce plugin for small to medium stores',
    status: 'disconnected',
    category: 'E-Commerce Platforms',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/woocommerce.svg',
  },
  {
    id: 'bigcommerce',
    name: 'BigCommerce',
    description: 'Scalable SaaS eCommerce platform for growing businesses',
    status: 'disconnected',
    category: 'E-Commerce Platforms',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/bigcommerce.svg',
  },

  // Social Commerce
  {
    id: 'instagram',
    name: 'Instagram Shopping',
    description: 'Sell products directly through Instagram posts and stories',
    status: 'connected',
    category: 'Social Commerce',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg',
    lastSync: '1 hour ago',
  },
  {
    id: 'tiktok',
    name: 'TikTok Shop',
    description: 'Reach younger audiences through TikTok\'s shopping features',
    status: 'disconnected',
    category: 'Social Commerce',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tiktok.svg',
  },
  {
    id: 'facebook-shop',
    name: 'Facebook Shop',
    description: 'Sell products directly on Facebook and Instagram',
    status: 'syncing',
    category: 'Social Commerce',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg',
  },

  // Enterprise Systems
  {
    id: 'sap',
    name: 'SAP Commerce Cloud',
    description: 'Integrate with SAP Commerce Cloud for enterprise e-commerce solutions',
    status: 'disconnected',
    category: 'Enterprise Systems',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/sap.svg',
  },
  {
    id: 'oracle',
    name: 'Oracle Commerce',
    description: 'Integrate with Oracle\'s comprehensive commerce platform',
    status: 'disconnected',
    category: 'Enterprise Systems',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/oracle.svg',
  },
  {
    id: 'salesforce',
    name: 'Salesforce Commerce',
    description: 'Cloud-first commerce platform with AI personalization',
    status: 'disconnected',
    category: 'Enterprise Systems',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/salesforce.svg',
  },
  {
    id: 'adobe',
    name: 'Adobe Commerce',
    description: 'Link with Adobe Commerce (Magento) for advanced e-commerce features',
    status: 'disconnected',
    category: 'Enterprise Systems',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/adobe.svg',
  },

  // Payment & Finance
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Online payment processing for internet businesses',
    status: 'connected',
    category: 'Payment & Finance',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/stripe.svg',
    lastSync: '5 minutes ago',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Global online payment system',
    status: 'disconnected',
    category: 'Payment & Finance',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/paypal.svg',
  },
  {
    id: 'midtrans',
    name: 'Midtrans',
    description: 'Leading payment gateway in Southeast Asia',
    status: 'disconnected',
    category: 'Payment & Finance',
    logo: '/logos/midtrans.svg',
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    description: 'Complete payment solution for businesses in India',
    status: 'disconnected',
    category: 'Payment & Finance',
    logo: '/logos/razorpay.svg',
  },

  // Analytics & Marketing
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Track and analyze website traffic and user behavior',
    status: 'connected',
    category: 'Analytics & Marketing',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googleanalytics.svg',
    lastSync: '30 minutes ago',
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    description: 'Advertise across Facebook and Instagram platforms',
    status: 'disconnected',
    category: 'Analytics & Marketing',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/meta.svg',
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Email marketing and automation platform',
    status: 'disconnected',
    category: 'Analytics & Marketing',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/mailchimp.svg',
  },

  // Logistics & Shipping
  {
    id: 'fedex',
    name: 'FedEx',
    description: 'Global shipping and logistics services',
    status: 'disconnected',
    category: 'Logistics & Shipping',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/fedex.svg',
  },
  {
    id: 'ups',
    name: 'UPS',
    description: 'Package delivery and supply chain solutions',
    status: 'disconnected',
    category: 'Logistics & Shipping',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/ups.svg',
  },
  {
    id: 'dhl',
    name: 'DHL',
    description: 'International express delivery and logistics',
    status: 'disconnected',
    category: 'Logistics & Shipping',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/dhl.svg',
  },
  {
    id: 'shippo',
    name: 'Shippo',
    description: 'Multi-carrier shipping API and dashboard',
    status: 'disconnected',
    category: 'Logistics & Shipping',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/shippo.svg',
  },
  {
    id: 'pos-laju',
    name: 'Pos Laju',
    description: 'Malaysia\'s leading postal and courier service',
    status: 'disconnected',
    category: 'Logistics & Shipping',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/postal.svg',
  },
  {
    id: 'gd-express',
    name: 'GD Express',
    description: 'Fast and reliable delivery services in Malaysia',
    status: 'disconnected',
    category: 'Logistics & Shipping',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/truck.svg',
  },
  {
    id: 'jt-express',
    name: 'J&T Express',
    description: 'Express delivery network across Southeast Asia',
    status: 'disconnected',
    category: 'Logistics & Shipping',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/truck.svg',
  },

  // CRM & Customer Service
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'All-in-one CRM and marketing automation platform',
    status: 'disconnected',
    category: 'CRM & Customer Service',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/hubspot.svg',
  },
  {
    id: 'zoho-crm',
    name: 'Zoho CRM',
    description: 'Comprehensive CRM solution for businesses',
    status: 'disconnected',
    category: 'CRM & Customer Service',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/zoho.svg',
  },
  {
    id: 'salesforce-service-cloud',
    name: 'Salesforce Service Cloud',
    description: 'Customer service and support platform',
    status: 'disconnected',
    category: 'CRM & Customer Service',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/salesforce.svg',
  },

  // Inventory Management
  {
    id: 'tradegecko',
    name: 'TradeGecko',
    description: 'Cloud-based inventory and order management',
    status: 'disconnected',
    category: 'Inventory Management',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/tradegecko.svg',
  },
  {
    id: 'cin7',
    name: 'Cin7',
    description: 'Inventory management and omnichannel retail',
    status: 'disconnected',
    category: 'Inventory Management',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/cin7.svg',
  },
  {
    id: 'fishbowl',
    name: 'Fishbowl',
    description: 'Inventory management and manufacturing software',
    status: 'disconnected',
    category: 'Inventory Management',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/fishbowl.svg',
  },

  // Point of Sale
  {
    id: 'square-pos',
    name: 'Square POS',
    description: 'Complete POS system for retail and restaurants',
    status: 'disconnected',
    category: 'Point of Sale',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/square.svg',
  },
  {
    id: 'lightspeed',
    name: 'Lightspeed',
    description: 'Retail and restaurant POS software',
    status: 'disconnected',
    category: 'Point of Sale',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/lightspeed.svg',
  },
  {
    id: 'vend',
    name: 'Vend',
    description: 'Cloud-based POS and retail management',
    status: 'disconnected',
    category: 'Point of Sale',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/vend.svg',
  },

  // Blockchain & Crypto
  {
    id: 'ethereum',
    name: 'Ethereum',
    description: 'Decentralized platform for smart contracts',
    status: 'disconnected',
    category: 'Blockchain & Crypto',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/ethereum.svg',
  },
  {
    id: 'polygon',
    name: 'Polygon',
    description: 'Ethereum scaling and infrastructure platform',
    status: 'disconnected',
    category: 'Blockchain & Crypto',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/polygon.svg',
  },
  {
    id: 'solana',
    name: 'Solana',
    description: 'High-performance blockchain platform',
    status: 'disconnected',
    category: 'Blockchain & Crypto',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/solana.svg',
  },

  // AI & Automation
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'AI models and APIs for various applications',
    status: 'disconnected',
    category: 'AI & Automation',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/openai.svg',
  },
  {
    id: 'anthropic-claude',
    name: 'Anthropic Claude',
    description: 'Advanced AI assistant for enterprise use',
    status: 'disconnected',
    category: 'AI & Automation',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/anthropic.svg',
  },
  {
    id: 'google-gemini',
    name: 'Google Gemini',
    description: 'Multimodal large language model',
    status: 'disconnected',
    category: 'AI & Automation',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/google.svg',
  },

  // Cloud Services
  {
    id: 'aws',
    name: 'AWS',
    description: 'Amazon Web Services cloud platform',
    status: 'disconnected',
    category: 'Cloud Services',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/amazonwebservices.svg',
  },
  {
    id: 'google-cloud',
    name: 'Google Cloud',
    description: 'Google\'s cloud computing services',
    status: 'disconnected',
    category: 'Cloud Services',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlecloud.svg',
  },
  {
    id: 'azure',
    name: 'Azure',
    description: 'Microsoft\'s cloud computing platform',
    status: 'disconnected',
    category: 'Cloud Services',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoftazure.svg',
  },

  // Halal Certification
  {
    id: 'jakim-api',
    name: 'JAKIM API',
    description: 'Malaysia\'s halal certification authority API',
    status: 'disconnected',
    category: 'Halal Certification',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/malaysia.svg',
  },
  {
    id: 'halal-food-authority',
    name: 'Halal Food Authority',
    description: 'International halal certification services',
    status: 'disconnected',
    category: 'Halal Certification',
    logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/food.svg',
  },

  // Coming Soon
  {
    id: 'ai-product-sync',
    name: 'AI Product Sync Assistant',
    description: 'Intelligent product synchronization across all platforms',
    status: 'coming-soon',
    category: 'Coming Soon',
    logo: '/logos/ai-assistant.svg',
    isComingSoon: true,
  },
  {
    id: 'multi-channel-orders',
    name: 'Multi-Channel Order Manager',
    description: 'Unified order management across all sales channels',
    status: 'coming-soon',
    category: 'Coming Soon',
    logo: '/logos/order-manager.svg',
    isComingSoon: true,
  },
  {
    id: 'auto-invoice',
    name: 'Automated Invoice Generator',
    description: 'Generate and send invoices automatically',
    status: 'coming-soon',
    category: 'Coming Soon',
    logo: '/logos/invoice.svg',
    isComingSoon: true,
  },
  {
    id: 'cross-platform-chat',
    name: 'Cross-Platform Chat Sync',
    description: 'Synchronize customer conversations across platforms',
    status: 'coming-soon',
    category: 'Coming Soon',
    logo: '/logos/chat-sync.svg',
    isComingSoon: true,
  },
];

const categoryIcons = {
  'E-Commerce Platforms': <Store className="w-5 h-5" />,
  'Social Commerce': <Smartphone className="w-5 h-5" />,
  'Enterprise Systems': <Building2 className="w-5 h-5" />,
  'Payment & Finance': <CreditCard className="w-5 h-5" />,
  'Analytics & Marketing': <BarChart3 className="w-5 h-5" />,
  'Coming Soon': <Bot className="w-5 h-5" />,
  'Logistics & Shipping': <Truck className="w-5 h-5" />,
  'CRM & Customer Service': <Users className="w-5 h-5" />,
  'Inventory Management': <BarChart3 className="w-5 h-5" />,
  'Point of Sale': <CreditCard className="w-5 h-5" />,
  'Blockchain & Crypto': <Shield className="w-5 h-5" />,
  'AI & Automation': <Bot className="w-5 h-5" />,
  'Cloud Services': <Building2 className="w-5 h-5" />,
  'Halal Certification': <Shield className="w-5 h-5" />,
};

export default function IntegrationsPage() {
  const [integrationsState, setIntegrationsState] = useState<Integration[]>(integrations);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleConnect = (id: string) => {
    setIntegrationsState(prev =>
      prev.map(integration =>
        integration.id === id
          ? { ...integration, status: 'syncing' as const }
          : integration
      )
    );

    setTimeout(() => {
      setIntegrationsState(prev =>
        prev.map(integration =>
          integration.id === id
            ? { ...integration, status: 'connected' as const, lastSync: new Date().toLocaleString() }
            : integration
        )
      );
    }, 2000);
  };

  const handleDisconnect = (id: string) => {
    setIntegrationsState(prev =>
      prev.map(integration =>
        integration.id === id
          ? { ...integration, status: 'disconnected' as const, lastSync: undefined }
          : integration
      )
    );
  };

  // Filter integrations
  const filteredIntegrations = integrationsState.filter(integration => {
    const matchesCategory = !selectedCategory || integration.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get categories with counts
  const categories = Object.entries(
    integrationsState.reduce((acc, integration) => {
      acc[integration.category] = (acc[integration.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, count]) => ({
    id: name,
    name,
    icon: categoryIcons[name as keyof typeof categoryIcons] || <Store className="w-5 h-5" />,
    count,
  }));

  return (
    <>
      <ScrollProgress />
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={springPresets.gentle}
        >
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={setSelectedCategory}
          />
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
          {/* Header */}
          <MotionBox variant="slideUp" className="mb-8">
            <motion.h1 
              className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...springPresets.gentle }}
            >
              Integration Hub
            </motion.h1>
            <motion.p 
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ...springPresets.gentle }}
            >
              Connect your HalalChain marketplace with leading platforms to expand reach and streamline operations.
            </motion.p>
          </MotionBox>

          {/* Search Bar */}
          <MotionBox variant="slideUp" delay={0.3} className="mb-8">
            <div className="relative max-w-md">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </motion.div>
              <motion.input
                type="text"
                placeholder="Search integrations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                whileFocus={{ 
                  scale: 1.02,
                  boxShadow: '0 0 0 3px hsl(var(--primary) / 0.1)'
                }}
                transition={springPresets.gentle}
              />
            </div>
          </MotionBox>

          {/* Integration Cards Grid */}
          <StaggerContainer 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            staggerDelay={0.1}
          >
            {filteredIntegrations.map((integration, index) => (
              <StaggerItem key={integration.id}>
                <IntegrationCard
                  integration={integration}
                  onConnect={handleConnect}
                  onDisconnect={handleDisconnect}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filteredIntegrations.length === 0 && (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={springPresets.gentle}
            >
              <div className="text-muted-foreground mb-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                >
                  <Store className="w-12 h-12 mx-auto mb-4 opacity-50" />
                </motion.div>
                <p>No integrations found matching your criteria.</p>
              </div>
            </motion.div>
          )}

          {/* Benefits Section */}
          <MotionBox variant="slideUp" delay={0.5} className="mt-12">
            <motion.div 
              className="bg-gradient-to-r from-primary/5 to-transparent rounded-xl p-6 border"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 10px 30px -10px hsl(var(--primary) / 0.2)'
              }}
              transition={springPresets.gentle}
            >
              <motion.h3 
                className="text-xl font-semibold text-card-foreground mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Why Integrate?
              </motion.h3>
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                {[
                  'Automatic product synchronization',
                  'Unified order management', 
                  'Real-time inventory updates',
                  'Cross-platform analytics'
                ].map((benefit, index) => (
                  <StaggerItem key={benefit}>
                    <div className="flex items-center space-x-2">
                      <motion.div 
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2
                        }}
                      />
                      <span>{benefit}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
          </MotionBox>
        </div>
      </div>
    </div>
    </>
  );
}