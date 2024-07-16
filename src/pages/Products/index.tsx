import { Navigate, useParams } from 'react-router-dom';

import { useGetProduct } from '@/api/hooks/useGetProduct';
import { ProductDetail } from '@/components/features/ProductDetail';
import { RouterPath } from '@/routes/path';

export const Products = () => {
  const { productId = '' } = useParams<{ productId: string }>();
  const { data } = useGetProduct(productId);

  console.log(data);
  if (!data) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return (
    <>
      <ProductDetail />
    </>
  );
};
