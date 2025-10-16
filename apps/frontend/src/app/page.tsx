'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/Button';
import { Shield, ShoppingBag, Users, Zap, ArrowRight, User } from 'lucide-react';
import { MotionBox, Parallax, ScrollProgress } from '@/components/motion/MotionComponents';
import { fadeVariants, slideVariants, staggerVariants } from '@/lib/animations';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleAuthAction = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <>
      <ScrollProgress />
      <HeroSection />

      <FeaturesSection />

      {/* Secure User Experience Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Secure & Personalized Navigation
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Our intuitive navigation provides seamless access to your dashboard, orders, and settings.
            Log in to unlock personalized features like order tracking and Halal certification management.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="text-center md:text-left">
              <User className="mx-auto md:ml-0 h-16 w-16 text-primary mb-4" />
              <h3 className="text-2xl font-semibold text-foreground mb-2">User-Centric Design</h3>
              <p className="text-muted-foreground">
                Responsive menu with profile access, mobile hamburger, and theme toggle for the best experience.
              </p>
            </div>
            <Button
              onClick={handleAuthAction}
              className="px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {user ? 'Go to Dashboard' : 'Get Started'} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
