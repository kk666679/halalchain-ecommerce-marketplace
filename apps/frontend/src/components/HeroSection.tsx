import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center" style={{ background: 'var(--neon-bg-gradient)' }}>
      <div className="container mx-auto px-4 text-center glass p-8 rounded-lg max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-6 neon-text"
          style={{ color: 'var(--primary-neon)', textShadow: '0 0 10px var(--primary-neon), 0 0 20px var(--primary-neon)' }}
        >
          Welcome to HalalChain
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl mb-8 max-w-2xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
        >
          Trust Starts Here: Blockchain Driven and AI-Powered Halal Commerce
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" className="neonGlow bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="glass text-primary border-primary hover:neonGlow">
            Learn More
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
