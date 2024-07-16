import { Box, Center, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { useGetProductDetails } from '@/api/hooks/useGetProductDetails';
import { breakpoints } from '@/styles/variants';

import { ProductDetailSection } from './ProductDetailSection';
import { ProductOrderSection } from './ProductOrderSection';

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
    <Center
      w='100%'
    >
      <Flex
        w='100%'
        maxW={breakpoints.lg}
        flexDirection='column'
      >
        <Flex
          w='100%'
          position='relative'
        >
          <ProductDetailSection {...data} />
          <ProductOrderSection {...data} />
        </Flex>
      </Flex>
    </Center>
  );
};