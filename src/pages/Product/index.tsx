import { Flex } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';

import { useCurrentProduct } from '@/api/hooks/useGetProduct';
import { ProductDetailSection } from '@/components/features/Product/ProductDetailSection';
import { ProductOrderSection } from '@/components/features/Product/ProductOrderSection';
import { RouterPath } from '@/routes/path';

export const ProductPage = () => {
  const { productKey = '' } = useParams<{ productKey: string }>();
  const { isRender, currentProduct } = useCurrentProduct(productKey);
  if (!isRender) return null;

  if (!currentProduct) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return (
    <>
      <Flex>
        <ProductDetailSection productKey={productKey} />
        <ProductOrderSection productKey={productKey} />
      </Flex>
    </>
  );
};
