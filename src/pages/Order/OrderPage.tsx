import { Flex, HStack, VStack } from '@chakra-ui/react';
import type { SubmitHandler } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { useOrderForm } from '@/api/hooks/useOrderFoam';
import { GiftDetails } from '@/components/features/Order/GiftDetails';
import { OrderForm } from '@/components/features/Order/OrderFoam';
import { PaymentDetails } from '@/components/features/Order/PaymentDetails';

export interface OrderFormData {
  message: string;
  checkedReceipt: boolean;
  receiptNumber: string;
}

export const OrderPage = () => {
  const location = useLocation();
  const { imageURL, name, totalPrice, brandName } = location.state || {};

  const {
    message,
    setMessage,
    isReceiptChecked,
    setIsReceiptChecked,
    receiptNumber,
    setReceiptNumber,
    handleClick,
  } = useOrderForm();

  const onSubmit: SubmitHandler<OrderFormData> = (data) => {
    const errorMessage = validateOrder(data);

    if (errorMessage) {
      alert(errorMessage);
    } else {
      alert('주문이 정상적으로 처리 되었습니다.');
    }
  };

  return (
    <Flex minHeight="100vh" alignItems="top" justifyContent="center" padding="4">
      <HStack
        as="form"
        onSubmit={methods.handleSubmit(onSubmit)}
        borderLeft="1px"
        borderRight="1px"
        borderColor="gray.200"
      >
        <FormProvider {...methods}>
          <VStack px="60px" w="899px" h="100%">
            <OrderForm />
            <GiftDetails imageURL={imageURL} name={name} brandName={brandName} />
          </VStack>
          <PaymentDetails totalPrice={totalPrice} />
        </FormProvider>
      </HStack>
    </Flex>
  );
};
