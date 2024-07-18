import { Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { createContext } from 'react';
import { useParams } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Section1, Section2 } from '@/components/features/products';
import type { GoodsData } from '@/types/index';

export const ProductContext = createContext<GoodsData | undefined>(undefined);

const ProductsPage = () => {
  const param = useParams();
  const { productId } = param;
  const fetchProduct = async () => {
    const response = await axios.get(
      `https://kakao-tech-campus-mock-sercer-root-yongjin.vercel.app/api/v1/products/${productId}/detail`,
    );
    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['products', productId],
    queryFn: fetchProduct,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="1280px">
      <Flex w="100%" h="100vh">
        <ProductContext.Provider value={data?.detail}>
          <Section1 />
          <Section2 productId={productId} />
        </ProductContext.Provider>
      </Flex>
    </Container>
  );
};

export default ProductsPage;
