import { Box, Divider, VStack } from '@chakra-ui/react';
import React from 'react';

import { OrderCacheReceiptInput } from '@/components/features/Order/atoms/OrderCacheReceiptInput';
import { OrderCashReceiptSelect } from '@/components/features/Order/atoms/OrderCacheReceiptSelect';
import { OrderCacheCheckbox } from '@/components/features/Order/atoms/OrderChacheCheckbox';

export interface IOrderRequestCashReceipt {
  cacheReceiptRefs: (
    | React.ForwardedRef<HTMLSelectElement>
    | React.ForwardedRef<HTMLInputElement>
  )[];
}

export const OrderRequestCashReceipt = ({ cacheReceiptRefs }: IOrderRequestCashReceipt) => {
  const [checkboxRef, selectRef, numberRef] = cacheReceiptRefs;
  return (
    <Box width="100%" padding="16px">
      <VStack spacing="16px" align="start">
        <OrderCacheCheckbox ref={checkboxRef} />
        <Divider />
        <OrderCashReceiptSelect ref={selectRef} />
        <Divider />
        <OrderCacheReceiptInput ref={numberRef} />
      </VStack>
    </Box>
  );
};
