import { Flex } from '@chakra-ui/react';

import { ProductDetailSection } from '@/components/features/Product/ProductDetailSection';
import { ProductOrderSection } from '@/components/features/Product/ProductOrderSection';

export const ProductPage = () => {
  return (
    <>
      <Flex>
        <ProductDetailSection />
        <ProductOrderSection />
      </Flex>
    </>
  );
};
