'use client';

import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function AISiteGeneratorLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
