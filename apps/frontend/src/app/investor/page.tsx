'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Truck, Globe, BarChart3, Download, Calendar, CheckCircle } from 'lucide-react';
import { MotionBox, StaggerContainer, StaggerItem, Parallax, ScrollProgress } from '@/components/motion/MotionComponents';
import { EnhancedButton } from '@/components/motion/EnhancedButton';
import { springPresets } from '@/lib/animations';

export default function InvestorPage() {
  return (
    <>
      <ScrollProgress />
      <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-emerald-50 to-white py-20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300695c' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <MotionBox variant="slideUp" className="mb-6">
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ ...springPresets.gentle, delay: 0.2 }}
              >
                <motion.span
                  className="inline-block bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Invest in Integrity. Trust Starts Here 
                </motion.span>
                <br />
                <motion.span
                  className="text-emerald-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Power the Future of Halal Commerce.
                </motion.span>
              </motion.h1>
            </MotionBox>

            <MotionBox variant="slideUp" delay={0.4} className="mb-8">
              <motion.p
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, ...springPresets.gentle }}
              >
                HalalChain is building the world&apos;s most trusted digital ecosystem, seamlessly connecting logistics, supply chain, and a global multivendor marketplace on a foundation of Sharia-compliance and blockchain technology.
              </motion.p>
            </MotionBox>
          </div>
        </section>

        {/* Vision Section */}
        <Parallax speed={0.2} className="py-20 bg-emerald-50">
          <div className="container mx-auto px-4">
            <MotionBox variant="slideUp" className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-emerald-800 mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={springPresets.gentle}
                viewport={{ once: true }}
              >
                The HalalChain Vision
              </motion.h2>
            </MotionBox>

            <MotionBox variant="slideUp" delay={0.2}>
              <motion.p
                className="text-lg text-gray-700 max-w-4xl mx-auto text-center leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, ...springPresets.gentle }}
                viewport={{ once: true }}
              >
                We envision a world where every Halal product can be traced back to its source with absolute certainty. We are digitizing trust, creating unprecedented efficiency, and unlocking the vast economic potential of the global Muslim community.
              </motion.p>
            </MotionBox>
          </div>
        </Parallax>

        {/* Ecosystem Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <MotionBox variant="slideUp" className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-emerald-800 mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={springPresets.gentle}
                viewport={{ once: true }}
              >
                Our Integrated Ecosystem
              </motion.h2>
            </MotionBox>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Truck,
                  title: 'Halal-Certified Logistics',
                  description: 'Smart, Compliant Logistics. Our asset-light logistics platform ensures Halal integrity at every mile. From temperature-controlled storage for perishables to dedicated handling, we guarantee products meet Sharia standards from warehouse to doorstep.',
                  color: 'from-emerald-500 to-emerald-600'
                },
                {
                  icon: Shield,
                  title: 'Transparent Supply Chain',
                  description: 'Blockchain-Verified Provenance. We leverage our proprietary "HalalChain" blockchain to provide an immutable record of a product&apos;s journey. Investors, vendors, and consumers can scan a QR code to verify origin, ingredients, and handling—eliminating fraud.',
                  color: 'from-emerald-600 to-emerald-700'
                },
                {
                  icon: Globe,
                  title: 'Multivendor Marketplace',
                  description: 'The Global Halal Superstore. A curated Amazon-style platform for thousands of Halal vendors. We connect trusted brands with conscious consumers, creating a vibrant economy and capturing value across the entire chain.',
                  color: 'from-emerald-700 to-emerald-800'
                }
              ].map((pillar, index) => {
                const IconComponent = pillar.icon;
                return (
                  <StaggerItem key={pillar.title}>
                    <motion.div
                      className="bg-white p-8 rounded-lg shadow-lg border border-emerald-100 hover:shadow-xl transition-shadow"
                      whileHover={{ y: -5 }}
                      transition={springPresets.gentle}
                    >
                      <motion.div
                        className="relative bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden"
                        whileHover={{
                          scale: 1.1,
                          boxShadow: '0 10px 30px -10px rgba(0, 105, 92, 0.3)'
                        }}
                        transition={springPresets.wobbly}
                      >
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-r ${pillar.color} opacity-0 hover:opacity-20 transition-opacity duration-300`}
                        />
                        <IconComponent className="w-8 h-8 text-emerald-600 relative z-10" />
                      </motion.div>
                      <motion.h3
                        className="text-xl font-semibold mb-4 text-emerald-800 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {pillar.title}
                      </motion.h3>
                      <motion.p
                        className="text-gray-600 text-center leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {pillar.description}
                      </motion.p>
                    </motion.div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* Market Opportunity Section */}
        <Parallax speed={0.3} className="py-20 bg-emerald-50">
          <div className="container mx-auto px-4">
            <MotionBox variant="slideUp" className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-emerald-800 mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={springPresets.gentle}
                viewport={{ once: true }}
              >
                A Trillion-Dollar Market Awaiting Disruption
              </motion.h2>
            </MotionBox>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <MotionBox variant="slideUp" delay={0.2}>
                <motion.p
                  className="text-lg text-gray-700 leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, ...springPresets.gentle }}
                  viewport={{ once: true }}
                >
                  The global Halal market is projected to exceed $3 trillion by 2025. A young, growing, and digitally-savvy Muslim population is driving demand. Current solutions are fragmented and lack end-to-end verification. Our Target: We are the first-mover building the entire infrastructure, not just a piece of it.
                </motion.p>
              </MotionBox>

              {/* Placeholder Graph */}
              <MotionBox variant="slideUp" delay={0.4}>
                <motion.div
                  className="bg-white p-8 rounded-lg shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, ...springPresets.gentle }}
                  viewport={{ once: true }}
                >
                  <BarChart3 className="w-12 h-12 text-emerald-600 mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold text-center mb-4">Market Growth Projection</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">2023</span>
                      <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4">
                        <div className="bg-emerald-500 h-4 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="text-sm font-semibold">$2.1T</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">2025</span>
                      <div className="flex-1 mx-4 bg-gray-200 rounded-full h-4">
                        <div className="bg-emerald-500 h-4 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                      <span className="text-sm font-semibold">$3.2T</span>
                    </div>
                  </div>
                </motion.div>
              </MotionBox>
            </div>
          </div>
        </Parallax>

        {/* Why Invest Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <MotionBox variant="slideUp" className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-emerald-800 mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={springPresets.gentle}
                viewport={{ once: true }}
              >
                Why Invest in HalalChain?
              </motion.h2>
            </MotionBox>

            <StaggerContainer className="max-w-4xl mx-auto">
              {[
                'First-Mover Advantage: The only integrated platform solving the core problem of trust in the Halal economy.',
                'Proprietary Technology: Our blockchain-based verification is a significant moat and a scalable B2B service.',
                'Multiple Revenue Streams: Fees from logistics, marketplace commissions, SaaS subscriptions for supply chain verification, and data analytics.',
                'Exceptional Team: Seasoned executives from Fortune 500 logistics, top-tier e-commerce, and Islamic finance.',
                'Sharia-Compliant Structure: The company and its financial operations are structured to be fully Sharia-compliant, appealing to a vast pool of ethical capital.'
              ].map((point, _index) => (
                <StaggerItem key={_index}>
                  <motion.div
                    className="flex items-start space-x-4 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: _index * 0.1, ...springPresets.gentle }}
                    viewport={{ once: true }}
                  >
                    <CheckCircle className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 leading-relaxed">{point}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* Asks & Future Section */}
        <Parallax speed={0.2} className="py-20 bg-emerald-50">
          <div className="container mx-auto px-4">
            <MotionBox variant="slideUp" className="text-center mb-12">
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-emerald-800 mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={springPresets.gentle}
                viewport={{ once: true }}
              >
                Our Asks & The Future
              </motion.h2>
            </MotionBox>

            <MotionBox variant="slideUp" delay={0.2}>
              <motion.div
                className="max-w-4xl mx-auto text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, ...springPresets.gentle }}
                viewport={{ once: true }}
              >
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Current Round: Series A. Goal: Raise funds to accelerate technology stack development and blockchain integration, expansion into key Southeast Asian and Middle Eastern markets, and aggressive vendor acquisition and marketing campaigns.
                </p>
              </motion.div>
            </MotionBox>
          </div>
        </Parallax>

        {/* CTA Section */}
        <section className="py-20 bg-emerald-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <MotionBox variant="slideUp">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={springPresets.gentle}
                viewport={{ once: true }}
              >
                Ready to Invest in the Future?
              </motion.h2>
            </MotionBox>

            <MotionBox variant="slideUp" delay={0.2}>
              <motion.p
                className="text-xl mb-8 max-w-2xl mx-auto opacity-90"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, ...springPresets.gentle }}
                viewport={{ once: true }}
              >
                This is an opportunity to do well by doing good. Join us in building a legacy of trust, transparency, and prosperity for the global Halal community.
              </motion.p>
            </MotionBox>

            <MotionBox variant="scale" delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/investor-deck.pdf" target="_blank">
                  <EnhancedButton
                    variant="secondary"
                    size="lg"
                    magnetic={true}
                    glow={true}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black border-yellow-500"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download the Investor Deck
                  </EnhancedButton>
                </Link>
                <Link href="mailto:investors@halalchain.com">
                  <EnhancedButton
                    variant="outline"
                    size="lg"
                    magnetic={true}
                    className="border-white text-white hover:bg-white hover:text-emerald-600"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule a Meeting with Our Leadership
                  </EnhancedButton>
                </Link>
              </div>
            </MotionBox>
          </div>
        </section>
      </div>
    </>
  );
}
