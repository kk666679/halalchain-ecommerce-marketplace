'use client';

import { ReactNode } from 'react';

interface Theme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
}

interface PreviewContainerProps {
  theme: Theme;
  children: ReactNode;
}

export function PreviewContainer({ theme, children }: PreviewContainerProps) {
  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Desktop Preview */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-gray-800 text-white text-xs p-1 text-center">Desktop</div>
          <div
            className="h-64 overflow-auto"
            style={{
              backgroundColor: theme.background,
              color: theme.text,
              '--primary': theme.primary,
              '--secondary': theme.secondary,
            } as React.CSSProperties}
          >
            <div className="scale-75 origin-top-left transform">
              {children}
            </div>
          </div>
        </div>
        {/* Tablet Preview */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-gray-800 text-white text-xs p-1 text-center">Tablet</div>
          <div
            className="h-64 overflow-auto"
            style={{
              backgroundColor: theme.background,
              color: theme.text,
              '--primary': theme.primary,
              '--secondary': theme.secondary,
            } as React.CSSProperties}
          >
            <div className="scale-50 origin-top-left transform w-2/3 mx-auto">
              {children}
            </div>
          </div>
        </div>
        {/* Mobile Preview */}
        <div className="border border-border rounded-lg overflow-hidden">
          <div className="bg-gray-800 text-white text-xs p-1 text-center">Mobile</div>
          <div
            className="h-64 overflow-auto"
            style={{
              backgroundColor: theme.background,
              color: theme.text,
              '--primary': theme.primary,
              '--secondary': theme.secondary,
            } as React.CSSProperties}
          >
            <div className="scale-25 origin-top-left transform w-1/3 mx-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
