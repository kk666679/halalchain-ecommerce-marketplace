'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { StatsCards } from '@/components/marketplace/stats-cards';
import { QuickActions } from '@/components/marketplace/quick-actions';
import { RecentActivity } from '@/components/marketplace/recent-activity';
import { MotionBox, StaggerContainer, StaggerItem } from '@/components/motion/MotionComponents';
import { ScrollProgress } from '@/components/motion/MotionComponents';

type MarketplaceModule = 'SEO' | 'CMS' | 'CRM';

export default function MarketplacePage() {
  const [selectedModule, setSelectedModule] = useState<MarketplaceModule>('SEO');
  const router = useRouter();

  const handleAction = (action: string) => {
    console.log(`Action triggered: ${action} for module ${selectedModule}`);
    // Handle different actions based on module and action type
    switch (action) {
      case 'add-keyword':
        // Navigate to SEO keyword management
        break;
      case 'run-audit':
        // Trigger site audit
        break;
      case 'view-reports':
        // Show SEO reports
        break;
      case 'new-article':
        // Navigate to article creation
        break;
      case 'upload-media':
        // Open media upload modal
        break;
      case 'content-calendar':
        // Show content calendar
        break;
      case 'add-contact':
        // Navigate to contact creation
        break;
      case 'create-deal':
        router.push('/checkout');
        break;
      case 'schedule-meeting':
        // Open meeting scheduler
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />

      {/* Header */}
      <MotionBox className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                className="text-3xl font-bold text-card-foreground mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                HalalChain Marketplace
              </motion.h1>
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                Discover powerful tools to manage your business operations.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button variant="primary" size="lg" onClick={() => router.push('/checkout')}>
                Upgrade Plan
              </Button>
            </motion.div>
          </div>
        </div>
      </MotionBox>

      <div className="container mx-auto px-4 py-8">
        {/* Module Selector */}
        <MotionBox className="mb-8">
          <div className="flex flex-wrap gap-4 mb-6">
            {(['SEO', 'CMS', 'CRM'] as const).map((module, index) => (
              <motion.button
                key={module}
                onClick={() => setSelectedModule(module)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedModule === module
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-card text-card-foreground hover:bg-muted border border-border'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {module}
              </motion.button>
            ))}
          </div>
        </MotionBox>

        {/* Stats Cards */}
        <MotionBox className="mb-8">
          <StatsCards module={selectedModule} />
        </MotionBox>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <MotionBox className="lg:col-span-1">
            <QuickActions module={selectedModule} onAction={handleAction} />
          </MotionBox>

          {/* Recent Activity */}
          <MotionBox className="lg:col-span-2">
            <RecentActivity module={selectedModule} />
          </MotionBox>
        </div>

        {/* Additional Features */}
        <StaggerContainer className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StaggerItem>
            <motion.div
              className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Analytics Dashboard</h3>
              <p className="text-muted-foreground text-sm mb-4">
                View detailed analytics and performance metrics for your business.
              </p>
              <Button variant="outline" size="sm" onClick={() => router.push('/checkout')}>View Analytics</Button>
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <motion.div
              className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Integration Hub</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Connect with third-party services and expand your capabilities.
              </p>
              <Button variant="outline" size="sm" onClick={() => router.push('/checkout')}>Manage Integrations</Button>
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <motion.div
              className="bg-card rounded-lg p-6 border border-border hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Support Center</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Get help with your account and access documentation.
              </p>
              <Button variant="outline" size="sm" onClick={() => router.push('/checkout')}>Get Support</Button>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </div>
  );
}
