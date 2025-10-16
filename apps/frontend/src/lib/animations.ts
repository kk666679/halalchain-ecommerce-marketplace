/**
 * Framer Motion Animation Configuration (2025)
 * Modern animation variants, transitions, and utilities
 */

import { Transition } from 'framer-motion';

// ============================================================================
// SPRING PRESETS
// ============================================================================

export const springPresets = {
  gentle: { type: 'spring', stiffness: 120, damping: 20, mass: 1 },
  wobbly: { type: 'spring', stiffness: 180, damping: 12, mass: 1 },
  stiff: { type: 'spring', stiffness: 300, damping: 30, mass: 1 },
  slow: { type: 'spring', stiffness: 80, damping: 25, mass: 1.2 },
  molasses: { type: 'spring', stiffness: 50, damping: 20, mass: 1.5 }
} as const;

// ============================================================================
// EASING PRESETS
// ============================================================================

export const easingPresets = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  sharp: [0.4, 0, 0.6, 1],
  smooth: [0.25, 0.46, 0.45, 0.94],
  bounce: [0.68, -0.55, 0.265, 1.55]
} as const;

// ============================================================================
// ANIMATION VARIANTS (Simplified)
// ============================================================================

export const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

export const slideVariants = {
  slideInUp: {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  },
  slideInLeft: {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  },
  slideInRight: {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  }
};

export const scaleVariants = {
  scaleIn: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  }
};

export const staggerVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  item: {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }
};

export const cardVariants = {
  rest: { scale: 1, rotateX: 0, rotateY: 0 },
  hover: { scale: 1.02, rotateX: 5, rotateY: 5 }
};

export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

// ============================================================================
// VIEWPORT CONFIGURATION
// ============================================================================

export const viewportConfig = {
  once: true,
  amount: 0.3
};

// ============================================================================
// THEME TRANSITION UTILITIES
// ============================================================================

export const themeTransition: Transition = {
  type: 'tween',
  duration: 0.3,
  ease: 'easeInOut'
};

export const layoutTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.8
};