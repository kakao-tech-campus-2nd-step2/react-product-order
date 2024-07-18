import { Divider, Text, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { GiftMessageSection } from '@/components/features/Order/GiftMessageSection';
import { GiftSummarySection } from '@/components/features/Order/GiftSummarySection';
import { PaymentInfoSection } from '@/components/features/Order/PaymentInfoSection';
import { breakpoints } from '@/styles/variants';
import type { ProductDetail, ProductOption } from '@/types';
import { orderLocalStorage } from '@/utils/storage';

export const OrderPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<
    (ProductDetail & { selectedOption: ProductOption | null; quantity: number }) | undefined
  >(undefined);
  const [message, setMessage] = useState('');
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const product = orderLocalStorage.get();
    if (product && product.product) {
      setSelectedProduct(product.product);
      const { price, selectedOption, quantity } = product.product;
      const additionalPrice = selectedOption?.additionalPrice || 0;
      setTotalPrice((price.sellingPrice + additionalPrice) * quantity);
    }
  }, []);

  const handleOrder = () => {
    alert('주문이 완료되었습니다.');
    orderLocalStorage.set(null);
  };

  if (!selectedProduct) {
    return (
      <Wrapper>
        <Text>주문할 상품이 없습니다.</Text>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <VStack w="1000px" spacing={4} align="stretch">
        <GiftMessageSection message={message} setMessage={setMessage} />
        <Divider />
        <GiftSummarySection product={selectedProduct} />
      </VStack>
      <PaymentInfoSection handleOrder={handleOrder} totalPrice={totalPrice} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  max-width: ${breakpoints.lg};
  min-height: 100vh;
  margin: 0 auto;

  @media screen and (min-width: ${breakpoints.md}) {
    flex-direction: row;
  }
`;
