import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import ErrorBoundary from '@/components/common/ErrorBoundary';
import { Spinner } from '@/components/common/Spinner';
import { ProductTemplate } from '@/pages/Product';
import { RouterPath } from '@/routes/path';

export const ProductRoute = () => {
  const { productKey } = useParams();
  const { reset } = useQueryErrorResetBoundary();

  if (!productKey) {
    return <Navigate to={RouterPath.root} />;
  }

  return (
    <ErrorBoundary
      fallback={<Navigate to={RouterPath.root} />}
      onReset={reset}
      resetKey={productKey}
    >
      <Suspense fallback={<Spinner />}>
        <ProductTemplate productKey={productKey} />
      </Suspense>
    </ErrorBoundary>
  );
};
