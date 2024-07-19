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
  const [cashReceipt, setCashReceipt] = useState(false);
  const [receiptType, setReceiptType] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');

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
    if (!message.trim()) {
      alert('메시지를 입력해주세요.');
      return;
    }
    if (message.length > 100) {
      alert('메시지는 100자 이내로 입력해주세요.');
      return;
    }
    if (cashReceipt) {
      if (!receiptNumber.trim()) {
        alert('현금영수증 번호를 입력해주세요.');
        return;
      }
      if (!/^\d+$/.test(receiptNumber)) {
        alert('현금영수증 번호는 숫자로만 입력해주세요.');
        return;
      }
    }
    alert('주문이 완료되었습니다.');
    orderLocalStorage.set(null);
  };

  const paymentInfo = {
    cashReceipt,
    setCashReceipt,
    receiptType,
    setReceiptType,
    receiptNumber,
    setReceiptNumber,
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
      <PaymentInfoSection
        handleOrder={handleOrder}
        totalPrice={totalPrice}
        paymentInfo={paymentInfo}
      />
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
