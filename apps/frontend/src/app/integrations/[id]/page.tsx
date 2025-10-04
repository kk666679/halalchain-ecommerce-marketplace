'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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

export default function IntegrationDetailPage({ params }: IntegrationDetailProps) {
  const { id } = params;
  const router = useRouter();

  const integration = integrationDetailsMap[id];

  const [connected, setConnected] = useState(false);
  const [syncing, setSyncing] = useState(false);

  if (!integration) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Integration not found</h1>
        <p className="mt-2">The requested integration does not exist.</p>
        <Button variant="outline" size="sm" onClick={() => router.push('/integrations')}>
          Back to Integrations
        </Button>
      </div>
    );
  }

  const handleConnect = () => {
    setSyncing(true);
    setTimeout(() => {
      setConnected(true);
      setSyncing(false);
    }, 2000);
  };

  const handleDisconnect = () => {
    setConnected(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">{integration.name}</h1>
      <p className="text-gray-700 mb-6">{integration.description}</p>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Connection Status</h2>
        <p className={`inline-block px-3 py-1 rounded-full text-white font-semibold ${
          connected ? 'bg-green-600' : 'bg-gray-500'
        }`}>
          {connected ? 'Connected' : 'Disconnected'}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Actions</h2>
        {!connected && (
          <Button variant="primary" size="md" onClick={handleConnect} disabled={syncing}>
            {syncing ? 'Connecting...' : 'Connect'}
          </Button>
        )}
        {connected && (
          <Button variant="outline" size="md" onClick={handleDisconnect}>
            Disconnect
          </Button>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Configuration</h2>
        <p className="text-gray-600">Configuration options will be available here once connected.</p>
      </div>

      <Button variant="outline" size="sm" onClick={() => router.push('/integrations')}>
        Back to Integrations
      </Button>
    </div>
  );
}
