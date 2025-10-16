'use client';

import React, { useState } from 'react';
import { ChevronRight, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { springPresets } from '@/lib/animations';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
}

interface SidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (categoryId: string | null) => void;
}

export default function Sidebar({ categories, selectedCategory, onCategorySelect }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.div 
      className="bg-card border-r border-border h-full"
      animate={{ width: isCollapsed ? 64 : 256 }}
      transition={springPresets.gentle}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.h2 
                className="text-lg font-semibold text-card-foreground"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={springPresets.gentle}
              >
                Categories
              </motion.h2>
            )}
          </AnimatePresence>
          <motion.button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-md hover:bg-muted transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={springPresets.wobbly}
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 0 : 90 }}
              transition={springPresets.gentle}
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>

        <motion.div 
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {/* All Categories */}
          <motion.button
            onClick={() => onCategorySelect(null)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
              selectedCategory === null
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted text-muted-foreground hover:text-foreground'
            }`}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            transition={springPresets.gentle}
          >
            <motion.div
              animate={{ 
                rotate: selectedCategory === null ? [0, 10, -10, 0] : 0
              }}
              transition={{ duration: 0.5 }}
            >
              <Store className="w-5 h-5 flex-shrink-0" />
            </motion.div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  className="flex items-center justify-between w-full"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={springPresets.gentle}
                >
                  <span className="font-medium">All Integrations</span>
                  <motion.span 
                    className="text-xs bg-muted px-2 py-1 rounded-full"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      backgroundColor: selectedCategory === null ? 'hsl(var(--primary) / 0.2)' : undefined
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {categories.reduce((sum, cat) => sum + cat.count, 0)}
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Category List */}
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              transition={springPresets.gentle}
            >
              <motion.div 
                className="flex-shrink-0"
                animate={{ 
                  rotate: selectedCategory === category.id ? [0, 15, -15, 0] : 0,
                  scale: selectedCategory === category.id ? [1, 1.1, 1] : 1
                }}
                transition={{ duration: 0.5 }}
              >
                {category.icon}
              </motion.div>
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.div
                    className="flex items-center justify-between w-full"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ ...springPresets.gentle, delay: index * 0.05 }}
                  >
                    <span className="font-medium text-sm">{category.name}</span>
                    <motion.span 
                      className="text-xs bg-muted px-2 py-1 rounded-full"
                      animate={{ 
                        scale: selectedCategory === category.id ? [1, 1.2, 1] : 1,
                        backgroundColor: selectedCategory === category.id ? 'hsl(var(--primary) / 0.2)' : undefined
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {category.count}
                    </motion.span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}