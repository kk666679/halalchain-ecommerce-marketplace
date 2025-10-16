/**
 * Custom hooks for scroll-based animations
 * Enhanced with latest Framer Motion scroll features
 */

'use client';

import { useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { springPresets } from '@/lib/animations';

/**
 * Enhanced parallax hook with customizable options
 */
export const useParallax = (speed: number = 0.5, direction: 'vertical' | 'horizontal' = 'vertical') => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const range = speed * 100;
  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'vertical' ? [0, -range] : [0, range]
  );

  const springTransform = useSpring(transform, springPresets.gentle);

  return { ref, transform: springTransform };
};

/**
 * Scroll-triggered reveal animation hook
 */
export const useScrollReveal = (threshold: number = 0.3) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, threshold, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, threshold], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, threshold], [50, 0]);

  return { ref, opacity, scale, y };
};

/**
 * Smooth scroll progress hook
 */
export const useScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, springPresets.stiff);
  
  return { scrollYProgress, scaleX };
};

/**
 * Section-based scroll tracking
 */
export const useSectionScroll = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return { ref, scrollYProgress, opacity, scale };
};

/**
 * Mouse-following animation hook
 */
export const useMouseFollow = (strength: number = 0.1) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springPresets.wobbly);
  const springY = useSpring(y, springPresets.wobbly);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      const xPct = (clientX / innerWidth - 0.5) * 2;
      const yPct = (clientY / innerHeight - 0.5) * 2;

      x.set(xPct * strength * 100);
      y.set(yPct * strength * 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, strength]);

  return { x: springX, y: springY };
};

/**
 * Viewport-based animation trigger
 */
export const useViewportAnimation = (threshold: number = 0.3) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const isInView = useTransform(scrollYProgress, [0, threshold], [0, 1]);
  
  return { ref, isInView, scrollYProgress };
};