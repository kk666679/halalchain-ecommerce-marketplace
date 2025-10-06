'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';

interface Integration {
  id: string;
  name: string;
  description: string;
  status: 'connected' | 'disconnected' | 'syncing';
  lastSync?: string;
  category: string;
}

const integrations: Integration[] = [
  // Enterprise Solutions
  {
    id: 'sap',
    name: 'SAP Commerce Cloud',
    description: 'Integrate with SAP Commerce Cloud for enterprise e-commerce solutions',
    status: 'disconnected',
    category: 'Enterprise Solutions',
  },
  {
    id: 'oracle',
    name: 'Oracle Commerce Cloud',
    description: 'Integrate with Oracle\'s comprehensive commerce platform',
    status: 'disconnected',
    category: 'Enterprise Solutions',
  },
  {
    id: 'salesforce',
    name: 'Salesforce Commerce Cloud (B2C & B2B)',
    description: 'Cloud-first commerce platform with AI personalization',
    status: 'disconnected',
    category: 'Enterprise Solutions',
  },
  {
    id: 'adobe',
    name: 'Adobe Commerce Cloud',
    description: 'Link with Adobe Commerce (Magento) for advanced e-commerce features',
    status: 'disconnected',
    category: 'Enterprise Solutions',
  },

  // SMB & D2C Platforms
  {
    id: 'shopify',
    name: 'Shopify',
    description: 'Popular all-in-one commerce platform for SMBs and D2C brands',
    status: 'disconnected',
    category: 'SMB & D2C Platforms',
  },
  {
    id: 'bigcommerce',
    name: 'BigCommerce',
    description: 'Scalable SaaS eCommerce platform for growing businesses',
    status: 'disconnected',
    category: 'SMB & D2C Platforms',
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    description: 'WordPress-based eCommerce plugin for small to medium stores',
    status: 'disconnected',
    category: 'SMB & D2C Platforms',
  },
  {
    id: 'squarespace',
    name: 'Squarespace Commerce',
    description: 'Design-first platform for creatives and small sellers',
    status: 'disconnected',
    category: 'SMB & D2C Platforms',
  },
  {
    id: 'ecwid',
    name: 'Ecwid by Lightspeed',
    description: 'Easy integration for social selling and small web stores',
    status: 'disconnected',
    category: 'SMB & D2C Platforms',
  },
  {
    id: 'akulaku',
    name: 'Akulaku',
    description: 'Indonesian eCommerce platform with financing and installment options',
    status: 'disconnected',
    category: 'SMB & D2C Platforms',
  },

  // Regional & Specialized Platforms
  {
    id: 'alibaba',
    name: 'Alibaba Commerce Cloud',
    description: 'Connect with Alibaba\'s global commerce platform',
    status: 'disconnected',
    category: 'Regional & Specialized Platforms',
  },
  {
    id: 'zalando',
    name: 'Zalando Partner Program (for EU fashion retail)',
    description: 'Sell fashion products across Europe through Zalando',
    status: 'disconnected',
    category: 'Regional & Specialized Platforms',
  },
  {
    id: 'prestashop',
    name: 'PrestaShop',
    description: 'Open-source eCommerce platform popular in Europe',
    status: 'disconnected',
    category: 'Regional & Specialized Platforms',
  },
  {
    id: 'shopee',
    name: 'Shopee',
    description: 'Leading eCommerce platform in Southeast Asia and Taiwan',
    status: 'disconnected',
    category: 'Regional & Specialized Platforms',
  },
  {
    id: 'blibli',
    name: 'Blibli',
    description: 'Popular Indonesian eCommerce platform offering a wide range of products',
    status: 'disconnected',
    category: 'Regional & Specialized Platforms',
  },
  {
    id: 'bulapak',
    name: 'Bulapak',
    description: 'Indonesian B2B eCommerce platform for agricultural products',
    status: 'disconnected',
    category: 'Regional & Specialized Platforms',
  },
  {
    id: 'tokopedia',
    name: 'Tokopedia',
    description: 'One of Indonesia\'s largest online marketplaces',
    status: 'disconnected',
    category: 'Regional & Specialized Platforms',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    description: 'World\'s largest online marketplace and cloud computing platform',
    status: 'disconnected',
    category: 'Regional & Specialized Platforms',
  },
  {
    id: 'ebay',
    name: 'eBay',
    description: 'Global online auction and shopping website',
    status: 'disconnected',
    category: 'Regional & Specialized Platforms',
  },

  // Sales Channel Tools
  {
    id: 'facebook-shop',
    name: 'Facebook Shop',
    description: 'Sell products directly on Facebook and Instagram',
    status: 'disconnected',
    category: 'Sales Channel Tools',
  },
  {
    id: 'google-shopping',
    name: 'Google Shopping',
    description: 'Promote products across Google Search and Shopping',
    status: 'disconnected',
    category: 'Sales Channel Tools',
  },

  // Marketing & Analytics Tools
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Track and analyze website traffic and user behavior',
    status: 'disconnected',
    category: 'Marketing & Analytics Tools',
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Email marketing and automation platform',
    status: 'disconnected',
    category: 'Marketing & Analytics Tools',
  },

  // AI Tools for eCommerce
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'AI-powered customer support and engagement',
    status: 'disconnected',
    category: 'AI Tools for eCommerce',
  },
  {
    id: 'persado',
    name: 'Persado',
    description: 'AI-driven marketing language optimization',
    status: 'disconnected',
    category: 'AI Tools for eCommerce',
  },

  // Payment Gateways
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Online payment processing for internet businesses',
    status: 'disconnected',
    category: 'Payment Gateways',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Global online payment system',
    status: 'disconnected',
    category: 'Payment Gateways',
  },

  // Logistics & Shipping
  {
    id: 'fedex',
    name: 'FedEx',
    description: 'Global courier delivery services',
    status: 'disconnected',
    category: 'Logistics & Shipping',
  },
  {
    id: 'dhl',
    name: 'DHL',
    description: 'International express mail services',
    status: 'disconnected',
    category: 'Logistics & Shipping',
  },

  // Customer Support & CRM
  {
    id: 'zendesk',
    name: 'Zendesk',
    description: 'Customer service and engagement platform',
    status: 'disconnected',
    category: 'Customer Support & CRM',
  },
  {
    id: 'salesforce-crm',
    name: 'Salesforce CRM',
    description: 'Customer relationship management platform',
    status: 'disconnected',
    category: 'Customer Support & CRM',
  },

  // Fraud Detection & Security
  {
    id: 'sift',
    name: 'Sift',
    description: 'Fraud detection and prevention platform',
    status: 'disconnected',
    category: 'Fraud Detection & Security',
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    description: 'Web security and performance services',
    status: 'disconnected',
    category: 'Fraud Detection & Security',
  },
];

export default function IntegrationsPage() {
  const [integrationsState, setIntegrationsState] = useState<Integration[]>(integrations);

  const handleConnect = (id: string) => {
    setIntegrationsState(prev =>
      prev.map(integration =>
        integration.id === id
          ? { ...integration, status: 'syncing' as const }
          : integration
      )
    );

    // Simulate connection process
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-green-600 bg-green-100';
      case 'syncing':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Group integrations by category
  const groupedIntegrations = integrationsState.reduce((groups, integration) => {
    if (!groups[integration.category]) {
      groups[integration.category] = [];
    }
    groups[integration.category].push(integration);
    return groups;
  }, {} as Record<string, Integration[]>);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Commerce Cloud Integrations</h1>
          <p className="text-muted-foreground">
            Connect your HalalChain marketplace with major commerce platforms to expand your reach and streamline operations.
          </p>
        </div>

        {Object.entries(groupedIntegrations).map(([category, integrations]) => (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {integrations.map((integration) => (
                <div key={integration.id} className="bg-card rounded-lg shadow-md p-6 border">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-card-foreground mb-2">{integration.name}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{integration.description}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                      {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                    </span>
                  </div>

                  {integration.lastSync && (
                    <p className="text-sm text-muted-foreground mb-4">
                      Last synced: {integration.lastSync}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      {integration.status === 'disconnected' && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleConnect(integration.id)}
                        >
                          Connect
                        </Button>
                      )}
                      {integration.status === 'connected' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDisconnect(integration.id)}
                        >
                          Disconnect
                        </Button>
                      )}
                      {integration.status === 'syncing' && (
                        <Button variant="outline" size="sm" disabled>
                          Connecting...
                        </Button>
                      )}
                    </div>
                    <Link href={`/integrations/${integration.id}`}>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-8 bg-muted/50 rounded-lg p-6 border">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">Integration Benefits</h3>
          <ul className="text-muted-foreground text-sm space-y-1">
            <li>• Automatic product synchronization across platforms</li>
            <li>• Unified order management and fulfillment</li>
            <li>• Real-time inventory updates</li>
            <li>• Enhanced customer experience with consistent branding</li>
            <li>• Analytics and reporting across all connected platforms</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
