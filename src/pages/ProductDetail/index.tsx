import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { useGetProductDetails } from '@/api/hooks/useGetProductDetails';

export const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data, isError, isLoading } = useGetProductDetails(productId!);

  if (isLoading) {
    return <Box>Loading!!!!</Box>
  }

  if (isError) {
    return <Box>Error!!!!</Box>
  }

  if (!data) {
    return null;
  }

  return (
   <Box>
    Product {productId} Detail Page!!!!
   </Box>
  );
};