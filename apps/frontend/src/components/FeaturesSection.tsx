import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ShoppingBag, Users, Zap } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Halal Certification',
    description: 'Blockchain-verified halal certification for all products.'
  },
  {
    icon: ShoppingBag,
    title: 'E-commerce Platform',
    description: 'Seamless shopping experience with integrated payment solutions.'
  },
  {
    icon: Users,
    title: 'Multi-vendor Support',
    description: 'Connect with trusted vendors and suppliers worldwide.'
  },
  {
    icon: Zap,
    title: 'AI-Powered Tools',
    description: 'Intelligent recommendations and automated processes.'
  }
];

export default function FeaturesSection() {
  return (
    <section className="py-20" style={{ background: 'var(--neon-bg-gradient)' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text" style={{ color: 'var(--primary-neon)', textShadow: '0 0 10px var(--primary-neon)' }}>
            Why Choose HalalChain?
          </h2>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Discover the features that make HalalChain the leading platform for halal commerce.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-lg glass hover:neonGlow transition-all duration-300"
            >
              <feature.icon className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--primary-neon)' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {feature.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
