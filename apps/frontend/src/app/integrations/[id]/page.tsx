import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/Button';

interface IntegrationDetailProps {
  params: {
    id: string;
  };
}

const integrationDetailsMap: Record<string, { name: string; description: string }> = {
  sap: {
    name: 'SAP Commerce Cloud',
    description: 'Enterprise e-commerce platform by SAP.',
  },
  alibaba: {
    name: 'Alibaba Commerce Cloud',
    description: 'Global commerce platform by Alibaba.',
  },
  adobe: {
    name: 'Adobe Commerce Cloud',
    description: 'Advanced e-commerce platform by Adobe (Magento).',
  },
  oracle: {
    name: 'Oracle Commerce Cloud',
    description: 'Comprehensive commerce platform by Oracle.',
  },
};

export async function generateStaticParams() {
  return [
    { id: 'sap' },
    { id: 'alibaba' },
    { id: 'adobe' },
    { id: 'oracle' },
  ];
}

export default function IntegrationDetailPage({ params }: IntegrationDetailProps) {
  const { id } = params;
  const integration = integrationDetailsMap[id];

  if (!integration) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-destructive">Integration not found</h1>
        <p className="mt-2 text-muted-foreground">The requested integration does not exist.</p>
        <Link href="/integrations">
          <Button variant="outline" size="sm">
            Back to Integrations
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-foreground mb-4">{integration.name}</h1>
      <p className="text-muted-foreground mb-6">{integration.description}</p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Connection Status</h2>
        <p className="inline-block px-3 py-1 rounded-full text-primary-foreground font-semibold bg-muted">
          Disconnected
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Actions</h2>
        <Button variant="primary" size="md">
          Connect
        </Button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-2">Configuration</h2>
        <p className="text-muted-foreground">Configuration options will be available here once connected.</p>
      </div>

      <Link href="/integrations">
        <Button variant="outline" size="sm">
          Back to Integrations
        </Button>
      </Link>
    </div>
  );
}
