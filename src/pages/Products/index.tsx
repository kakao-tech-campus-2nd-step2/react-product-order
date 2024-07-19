import { Flex } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { createContext } from 'react';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { Section1, Section2 } from '@/components/features/products';
import { PaymentContext } from '@/provider/Payment/index';
import type { GoodsData } from '@/types/index';

type ProductContextType = {
  data: { detail: GoodsData };
  totalCount: number;
  setTotalCount: (count: number) => void;
  productId: string;
};
export const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductsPage = () => {
  const param = useParams();
  const payment = useContext(PaymentContext);
  const [totalCount, setTotalCount] = useState(1);
  const setPaymentInfo = payment?.setPaymentInfo;

  const { productId = '' } = param;
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

  useEffect(() => {
    if (!isLoading && data && productId && setPaymentInfo) {
      setPaymentInfo({
        productId: productId,
        imageURL: data.detail.imageURL,
        count: totalCount,
      });
    }
  }, [isLoading, data, productId, setPaymentInfo, totalCount]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="1280px">
      <Flex w="100%" h="100vh">
        <ProductContext.Provider value={{ data, totalCount, setTotalCount, productId }}>
          <Section1 />
          <Section2 />
        </ProductContext.Provider>
      </Flex>
    </Container>
  );
};

export default ProductsPage;
