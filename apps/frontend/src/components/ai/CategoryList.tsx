'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  icon: string;
  description?: string;
  isAIGenerated?: boolean;
  storefrontUrl?: string;
}

interface CategoryListProps {
  categories: Category[];
  onGenerateSite?: (categoryId: string) => void;
  className?: string;
}

export function CategoryList({ categories, onGenerateSite, className }: CategoryListProps) {
  const [generatingIds, setGeneratingIds] = useState<Set<string>>(new Set());

  const handleGenerate = async (categoryId: string) => {
    if (generatingIds.has(categoryId)) return;

    setGeneratingIds(prev => new Set(prev).add(categoryId));

    try {
      await onGenerateSite?.(categoryId);
    } finally {
      setGeneratingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(categoryId);
        return newSet;
      });
    }
  };

  return (
    <div className={`grid gap-4 md:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {categories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="h-full hover:shadow-lg transition-shadow group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    {category.isAIGenerated && (
                      <Badge variant="secondary" className="text-xs mt-1">
                        AI Generated
                      </Badge>
                    )}
                  </div>
                </div>
                {category.storefrontUrl && (
                  <Link href={category.storefrontUrl} target="_blank">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {category.description && (
                <CardDescription className="mb-4">
                  {category.description}
                </CardDescription>
              )}

              <Button
                onClick={() => handleGenerate(category.id)}
                disabled={generatingIds.has(category.id)}
                className="w-full"
                size="sm"
              >
                {generatingIds.has(category.id) ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Storefront
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
