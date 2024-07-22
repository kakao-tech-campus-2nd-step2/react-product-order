import { Center } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router-dom';

import { useGetProduct } from '@/api/hooks/useGetProduct';
import { Spinner } from '@/components/common/Spinner';
import { ProductDetail } from '@/components/features/ProductDetail';
import { RouterPath } from '@/routes/path';

export const ProductsPage = () => {
  const { productId = '' } = useParams<{ productId: string }>();
  const { data, isLoading } = useGetProduct(productId);

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }
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
