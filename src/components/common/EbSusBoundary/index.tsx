import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import type { ReactElement } from 'react';
import { Suspense } from 'react';

import ErrorBoundary from '@/components/common/ErrorBoundary';

export interface IAsyncErrorBoundary {
  children: ReactElement;
  ebFallback: ReactElement;
  susFallback: ReactElement;
  resetKey?: string;
}

export const EbSusBoundary = ({
  children,
  ebFallback,
  susFallback,
  resetKey = '',
}: IAsyncErrorBoundary) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary fallback={ebFallback} onReset={reset} resetKey={resetKey}>
      <Suspense fallback={susFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};
