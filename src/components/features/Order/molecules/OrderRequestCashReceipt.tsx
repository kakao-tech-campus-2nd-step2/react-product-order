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
  return (
    <Box width="100%" padding="16px">
      <VStack spacing="16px" align="start">
        <OrderCacheCheckbox ref={cacheReceiptRefs[0]} />
        <Divider />
        <OrderCashReceiptSelect ref={cacheReceiptRefs[1]} />
        <Divider />
        <OrderCacheReceiptInput ref={cacheReceiptRefs[2]} />
      </VStack>
    </Box>
  );
};
