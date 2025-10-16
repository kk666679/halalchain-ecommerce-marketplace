'use client';

import { useOptimistic } from 'react';

export function LoadingState() {
  const [optimisticLoading] = useOptimistic(true);

  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">
          {optimisticLoading ? 'Generating your site...' : 'Almost ready...'}
        </p>
      </div>
    </div>
  );
}
