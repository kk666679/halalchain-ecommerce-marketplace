'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { ExternalLink, Clock, Plus } from 'lucide-react';
import { MotionCard } from '@/components/motion/MotionComponents';
import { cardVariants, springPresets } from '@/lib/animations';

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

interface IntegrationCardProps {
  integration: Integration;
  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
}

export default function IntegrationCard({ integration, onConnect, onDisconnect }: IntegrationCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'syncing':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case 'coming-soon':
        return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <MotionCard
      className="group bg-card rounded-xl shadow-sm border border-border p-6 relative overflow-hidden cursor-pointer"
      enableHover={true}
      enable3D={true}
      whileHover={{
        y: -8,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        borderColor: 'hsl(var(--primary) / 0.3)'
      }}
      transition={springPresets.gentle}
    >
      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      <div className="relative z-10">
        {/* Header with logo and status */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <motion.div 
              className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden"
              whileHover={{ 
                scale: 1.1, 
                rotate: 5,
                backgroundColor: 'hsl(var(--primary) / 0.1)'
              }}
              transition={springPresets.wobbly}
            >
              <Image
                src={integration.logo}
                alt={`${integration.name} logo`}
                width={32}
                height={32}
                className="object-contain"
              />
            </motion.div>
            <div>
              <motion.h3 
                className="text-lg font-semibold text-card-foreground"
                whileHover={{ color: 'hsl(var(--primary))' }}
                transition={{ duration: 0.2 }}
              >
                {integration.name}
              </motion.h3>
              <motion.span 
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}
                whileHover={{ scale: 1.05 }}
                transition={springPresets.gentle}
              >
                {integration.status === 'coming-soon' ? 'Coming Soon' : 
                 integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
              </motion.span>
            </div>
          </div>
        </div>

        {/* Description */}
        <motion.p 
          className="text-muted-foreground text-sm mb-4 line-clamp-2"
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {integration.description}
        </motion.p>

        {/* Last sync info */}
        {integration.lastSync && (
          <motion.div 
            className="flex items-center text-xs text-muted-foreground mb-4"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Clock className="w-3 h-3 mr-1" />
            </motion.div>
            Last synced: {integration.lastSync}
          </motion.div>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex space-x-2">
            {integration.isComingSoon ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="sm" disabled>
                  <Plus className="w-4 h-4 mr-1" />
                  Notify Me
                </Button>
              </motion.div>
            ) : integration.status === 'disconnected' ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onConnect(integration.id)}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  Connect
                </Button>
              </motion.div>
            ) : integration.status === 'connected' ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDisconnect(integration.id)}
                >
                  Disconnect
                </Button>
              </motion.div>
            ) : (
              <motion.div
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Button variant="outline" size="sm" disabled>
                  Connecting...
                </Button>
              </motion.div>
            )}
          </div>
          
          {!integration.isComingSoon && (
            <Link href={`/integrations/${integration.id}`}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                transition={springPresets.wobbly}
              >
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </motion.div>
            </Link>
          )}
        </div>
      </div>
    </MotionCard>
  );
}