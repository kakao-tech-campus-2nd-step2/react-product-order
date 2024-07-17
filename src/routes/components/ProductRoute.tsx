import { Navigate, useParams } from 'react-router-dom';

import { EbSusBoundary } from '@/components/common/EbSusBoundary';
import { Spinner } from '@/components/common/Spinner';
import { ProductPage } from '@/pages/Products';
import { RouterPath } from '@/routes/path';

export const ProductRoute = () => {
  const { productKey } = useParams();

  if (!productKey) {
    return <Navigate to={RouterPath.root} />;
  }

  return (
    <EbSusBoundary ebFallback={<Navigate to={RouterPath.root} />} susFallback={<Spinner />}>
      <ProductPage productKey={productKey} />
    </EbSusBoundary>
  );
};
