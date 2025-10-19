import { ReactNode } from 'react';
import { Sidebar } from '@/components/ai/Sidebar';

interface AISiteGeneratorLayoutProps {
  children: ReactNode;
}

export default function AISiteGeneratorLayout({
  children,
}: AISiteGeneratorLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
