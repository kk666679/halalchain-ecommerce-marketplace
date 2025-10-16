/**
 * Enhanced Motion Components (2025)
 * Reusable animated components with latest Framer Motion features
 */

'use client';

import React, { useRef } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useInView,
  useMotionValue,
  HTMLMotionProps
} from 'framer-motion';
import { 
  springPresets,
  viewportConfig
} from '@/lib/animations';

// ============================================================================
// ENHANCED MOTION WRAPPERS
// ============================================================================

interface MotionBoxProps extends HTMLMotionProps<'div'> {
  variant?: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  children: React.ReactNode;
}

/**
 * Enhanced motion box with automatic viewport detection
 */
export const MotionBox: React.FC<MotionBoxProps> = ({ 
  variant = 'fade', 
  delay = 0, 
  children, 
  ...props 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, viewportConfig);

  const getAnimation = () => {
    switch (variant) {
      case 'slideUp': return { y: 60, opacity: 0 };
      case 'slideLeft': return { x: -100, opacity: 0 };
      case 'slideRight': return { x: 100, opacity: 0 };
      case 'scale': return { scale: 0.8, opacity: 0 };
      default: return { opacity: 0 };
    }
  };

  const getVisibleAnimation = () => {
    switch (variant) {
      case 'slideUp': return { y: 0, opacity: 1 };
      case 'slideLeft': return { x: 0, opacity: 1 };
      case 'slideRight': return { x: 0, opacity: 1 };
      case 'scale': return { scale: 1, opacity: 1 };
      default: return { opacity: 1 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getAnimation()}
      animate={isInView ? getVisibleAnimation() : getAnimation()}
      transition={{ delay, ...springPresets.gentle }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Staggered container for animating lists
 */
interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({ 
  children, 
  staggerDelay = 0.1,
  className 
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, viewportConfig);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

/**
 * Individual stagger item
 */
export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    {children}
  </motion.div>
);

// ============================================================================
// SCROLL-BASED ANIMATIONS
// ============================================================================

/**
 * Parallax motion component with enhanced scroll tracking
 */
interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const Parallax: React.FC<ParallaxProps> = ({ 
  children, 
  speed = 0.5, 
  direction = 'up',
  className 
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const range = speed * 100;
  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'down' ? [0, range] :
    direction === 'left' ? [0, -range] :
    direction === 'right' ? [0, range] :
    [0, -range]
  );
  const springTransform = useSpring(transform, springPresets.gentle);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        [direction === 'left' || direction === 'right' ? 'x' : 'y']: springTransform
      }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Scroll progress indicator
 */
export const ScrollProgress: React.FC<{ className?: string }> = ({ className }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, springPresets.stiff);

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/60 transform-gpu z-50 ${className}`}
      style={{ scaleX, transformOrigin: '0%' }}
    />
  );
};

/**
 * Enhanced card with 3D hover effects
 */
interface MotionCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  enableHover?: boolean;
  enable3D?: boolean;
}

export const MotionCard: React.FC<MotionCardProps> = ({ 
  children, 
  enableHover = true,
  enable3D = true,
  className,
  ...props 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enable3D || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={className}
      initial={{ scale: 1, rotateX: 0, rotateY: 0 }}
      whileHover={enableHover ? { scale: 1.02, rotateX: 5, rotateY: 5 } : undefined}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={enable3D ? {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
};

/**
 * Magnetic button with spring physics
 */
interface MagneticButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  strength = 0.3,
  className,
  ...props 
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springPresets.wobbly);
  const springY = useSpring(y, springPresets.wobbly);

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (event.clientX - centerX) * strength;
    const deltaY = (event.clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={springPresets.gentle}
      {...props}
    >
      {children}
    </motion.button>
  );
};