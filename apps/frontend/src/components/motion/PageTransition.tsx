/**
 * Page Transition Component for Next.js 15 App Router
 * Enhanced with latest Framer Motion features
 */

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { pageVariants, springPresets } from '@/lib/animations';

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Page transition wrapper for Next.js app router
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

/**
 * Route-specific transition variants
 */
const routeTransitions = {
  '/': {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 }
  },
  '/products': {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  },
  '/integrations': {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  }
};

/**
 * Enhanced page transition with route-specific animations
 */
export const EnhancedPageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const transition = routeTransitions[pathname as keyof typeof routeTransitions] || pageVariants;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={transition}
        transition={springPresets.gentle}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};