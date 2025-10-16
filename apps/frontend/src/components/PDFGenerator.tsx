'use client';

import React, { useState } from 'react';
import { Download, FileText, Loader2 } from 'lucide-react';
import { PDFGenerator, generateInvestorDeck, generateProductCatalog, generateReport } from '@/lib/pdfGenerator';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';

interface PDFGeneratorProps {
  variant?: 'investor-deck' | 'product-catalog' | 'report' | 'custom';
  data?: {
    element?: HTMLElement;
    products?: Product[];
    [key: string]: unknown;
  };
  title?: string;
  filename?: string;
  children?: React.ReactNode;
  className?: string;
}

export const PDFGeneratorComponent: React.FC<PDFGeneratorProps> = ({
  variant = 'custom',
  data,
  title = 'Document',
  filename,
  children,
  className = ''
}) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      switch (variant) {
        case 'investor-deck':
          if (data?.element) {
            await generateInvestorDeck(data.element);
          }
          break;
        case 'product-catalog':
          if (data?.products) {
            await generateProductCatalog(data.products);
          }
          break;
        case 'report':
          await generateReport(title, data || {}, data?.element);
          break;
        case 'custom':
          if (data?.element) {
            const generator = new PDFGenerator({ title, filename });
            await generator.addPageFromElement(data.element);
            generator.save(filename || `${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
          }
          break;
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleGeneratePDF}
      disabled={isGenerating}
      className={`flex items-center gap-2 ${className}`}
      variant="outline"
    >
      {isGenerating ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Download className="w-4 h-4" />
      )}
      {isGenerating ? 'Generating...' : children || 'Download PDF'}
    </Button>
  );
};

// Specialized components for common use cases
export const InvestorDeckGenerator: React.FC<{ element?: HTMLElement }> = ({ element }) => {
  return (
    <PDFGeneratorComponent
      variant="investor-deck"
      data={{ element }}
      title="HalalChain Investor Deck"
      filename="halalchain-investor-deck.pdf"
    >
      <FileText className="w-4 h-4 mr-2" />
      Download Investor Deck
    </PDFGeneratorComponent>
  );
};

export const ProductCatalogGenerator: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <PDFGeneratorComponent
      variant="product-catalog"
      data={{ products }}
      title="HalalChain Product Catalog"
      filename="halalchain-product-catalog.pdf"
    >
      <FileText className="w-4 h-4 mr-2" />
      Download Product Catalog
    </PDFGeneratorComponent>
  );
};

export const ReportGenerator: React.FC<{
  title: string;
  data: Record<string, unknown>;
  element?: HTMLElement;
}> = ({ title, data, element }) => {
  return (
    <PDFGeneratorComponent
      variant="report"
      data={{ ...data, element }}
      title={title}
    >
      <FileText className="w-4 h-4 mr-2" />
      Download Report
    </PDFGeneratorComponent>
  );
};
