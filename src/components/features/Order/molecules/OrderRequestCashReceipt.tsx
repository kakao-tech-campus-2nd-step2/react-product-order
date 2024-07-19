import { Box, Checkbox, Divider, VStack } from '@chakra-ui/react';
import React from 'react';

import { OrderCacheReceiptInput } from '@/components/features/Order/atoms/OrderCacheReceiptInput';
import { OrderCashReceiptSelect } from '@/components/features/Order/atoms/OrderCacheReceiptSelect';

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
        <Checkbox colorScheme="yellow" size="lg">
          현금영수증 신청
        </Checkbox>
        <Divider />
        <OrderCashReceiptSelect ref={cacheReceiptRefs[0]} />
        <Divider />
        <OrderCacheReceiptInput ref={cacheReceiptRefs[1]} />
      </VStack>
    </Box>
  );
};
