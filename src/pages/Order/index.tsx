import { Divider, Text, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { type FieldValues, FormProvider, type SubmitHandler } from 'react-hook-form';

import { GiftMessageSection } from '@/components/features/Order/GiftMessageSection';
import { GiftSummarySection } from '@/components/features/Order/GiftSummarySection';
import { PaymentInfoSection } from '@/components/features/Order/PaymentInfoSection';
import { breakpoints } from '@/styles/variants';
import type { ProductDetail, ProductOption } from '@/types';
import { orderLocalStorage } from '@/utils/storage';

import { type FormValues, useOrderForm } from './formSchema';

export const OrderPage = () => {
  const [selectedProduct, setSelectedProduct] = useState<
    (ProductDetail & { selectedOption: ProductOption | null; quantity: number }) | undefined
  >(undefined);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const methods = useOrderForm();

  useEffect(() => {
    const product = orderLocalStorage.get();
    if (product && product.product) {
      setSelectedProduct(product.product);
      const { price, selectedOption, quantity } = product.product;
      const additionalPrice = selectedOption?.additionalPrice || 0;
      setTotalPrice((price.sellingPrice + additionalPrice) * quantity);
    }
  }, [orderLocalStorage, setSelectedProduct, setTotalPrice]);

  const handleOrder: SubmitHandler<FormValues> = (_data) => {
    alert('주문이 완료되었습니다.');
    orderLocalStorage.set(null);
  };

  const handleError = (errors: FieldValues) => {
    if (errors.message) {
      alert(errors.message.message);
    } else if (errors.receiptNumber) {
      alert(errors.receiptNumber.message);
    }
  };

  if (!selectedProduct) {
    return (
      <Wrapper>
        <Text>주문할 상품이 없습니다.</Text>
      </Wrapper>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleOrder, handleError)}>
        <Wrapper>
          <VStack w="1000px" spacing={4} align="stretch">
            <GiftMessageSection />
            <Divider />
            <GiftSummarySection product={selectedProduct} />
          </VStack>
          <PaymentInfoSection totalPrice={totalPrice} />
        </Wrapper>
      </form>
    </FormProvider>
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
