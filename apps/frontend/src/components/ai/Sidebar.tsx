'use client';

import { useState, useOptimistic, startTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Utensils,
  Shirt,
  HeartPulse,
  Coins,
  Plane,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

const defaultCategories: Category[] = [
  {
    id: 'food',
    name: 'Halal Food & Beverages',
    icon: 'Utensils',
    description: 'Premium halal-certified food products'
  },
  {
    id: 'fashion',
    name: 'Modest Fashion & Apparel',
    icon: 'Shirt',
    description: 'Islamic modest clothing and fashion'
  },
  {
    id: 'health',
    name: 'Halal Health & Wellness',
    icon: 'HeartPulse',
    description: 'Halal pharmaceuticals and wellness products'
  },
  {
    id: 'finance',
    name: 'Islamic Finance & Banking',
    icon: 'Coins',
    description: 'Sharia-compliant financial services'
  },
  {
    id: 'travel',
    name: 'Halal Travel & Hospitality',
    icon: 'Plane',
    description: 'Muslim-friendly travel and accommodation'
  },
];

const iconMap = {
  Utensils,
  Shirt,
  HeartPulse,
  Coins,
  Plane,
};

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [categories, setCategories] = useOptimistic(defaultCategories);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleGenerateSite = async (categoryId: string) => {
    startTransition(() => {
      // Optimistically update categories with AI-generated content
      const optimisticCategories = categories.map(cat =>
        cat.id === categoryId
          ? { ...cat, description: `${cat.description} (Generating...)` }
          : cat
      );
      setCategories(optimisticCategories);
    });

    try {
      const response = await fetch('/api/ai-tools/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: categoryId,
          type: 'storefront',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Update with AI-generated content
        startTransition(() => {
          setCategories(prev => prev.map(cat =>
            cat.id === categoryId
              ? { ...cat, ...data.category }
              : cat
          ));
        });
      }
    } catch (error) {
      console.error('Failed to generate site:', error);
      // Revert optimistic update
      startTransition(() => {
        setCategories(defaultCategories);
      });
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ width: isOpen ? 320 : 64 }}
        animate={{ width: isOpen ? 320 : 64 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed left-0 top-0 h-full bg-card border-r border-border z-50 md:relative md:z-auto',
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="open"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <Sparkles className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold text-lg">HalalChain AI</h2>
                </motion.div>
              ) : (
                <motion.div
                  key="closed"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sparkles className="h-5 w-5 text-primary mx-auto" />
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={toggleSidebar}
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>

          {/* Categories */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-2">
              <AnimatePresence>
                {categories.map((category) => {
                  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Utensils;

                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="p-3 hover:bg-accent transition-colors cursor-pointer group">
                        <div className="flex items-start gap-3">
                          <IconComponent className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />

                          <AnimatePresence mode="wait">
                            {isOpen ? (
                              <motion.div
                                key="open-content"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex-1 min-w-0"
                              >
                                <h3 className="font-medium text-sm leading-tight">
                                  {category.name}
                                </h3>
                                {category.description && (
                                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                    {category.description}
                                  </p>
                                )}

                                <Button
                                  size="sm"
                                  className="mt-2 w-full text-xs"
                                  onClick={() => handleGenerateSite(category.id)}
                                >
                                  <Sparkles className="h-3 w-3 mr-1" />
                                  Generate Site
                                </Button>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="closed-content"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex-1"
                              />
                            )}
                          </AnimatePresence>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="open-footer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-xs text-muted-foreground text-center">
                    Powered by HalalChain AI
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="closed-footer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
