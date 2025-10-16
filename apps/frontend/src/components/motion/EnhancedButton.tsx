/**
 * Enhanced Button Component with Advanced Framer Motion Features
 */

'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { springPresets } from '@/lib/animations';

interface EnhancedButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'magnetic';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  magnetic?: boolean;
  glow?: boolean;
}

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  magnetic = false,
  glow = false
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, springPresets.wobbly);
  const springY = useSpring(y, springPresets.wobbly);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const baseClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const variantClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-border bg-transparent hover:bg-muted',
    ghost: 'bg-transparent hover:bg-muted',
    magnetic: 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground'
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!magnetic || disabled) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((event.clientX - centerX) * 0.3);
    y.set((event.clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      className={`
        relative rounded-lg font-medium transition-all duration-200 
        ${baseClasses[size]} 
        ${variantClasses[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${glow ? 'shadow-lg shadow-primary/25' : ''}
        ${className}
      `}
      style={magnetic ? { x: springX, y: springY, rotateX, rotateY } : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { 
        scale: 1.05,
        boxShadow: glow ? '0 10px 30px -5px hsl(var(--primary) / 0.4)' : undefined
      }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      transition={springPresets.gentle}
    >
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-white/20"
        initial={{ scale: 0, opacity: 0 }}
        whileTap={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Content */}
      <span className="relative z-10">{children}</span>
      
      {/* Glow effect */}
      {glow && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary to-primary/60 blur-md -z-10"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
};