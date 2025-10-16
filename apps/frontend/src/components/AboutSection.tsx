import React from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About HalalChain
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            HalalChain is a revolutionary platform that leverages blockchain technology and AI to ensure the authenticity and compliance of halal products. Our mission is to provide transparency, trust, and efficiency in the halal commerce ecosystem.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Blockchain Verification</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Every product on HalalChain is verified on the blockchain, ensuring tamper-proof certification and traceability.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">AI-Powered Insights</h3>
            <p className="text-gray-700 dark:text-gray-300">
              Our AI tools analyze market trends and consumer behavior to provide actionable insights for vendors and buyers.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
