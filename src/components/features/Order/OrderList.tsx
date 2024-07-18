import { Box, HStack } from '@chakra-ui/react';

import type { Products } from '@/api/products/types';
import { OrderListItem } from '@/components/features/Order/OrderListItem';

export interface IOrderList {
  orderList: Products.PaymentThumbnail[];
}

export const OrderList = ({ orderList }: IOrderList) => (
  <Box
    width="100%"
    padding="20px 16px 16px"
    borderRadius="8px"
    borderWidth="1px"
    borderColor="#ededed"
    boxShadow="0 4px 8px rgba(0, 0, 0, 0.02)"
  >
    <HStack spacing="8px" height="100%">
      {orderList.map((orderItem) => (
        <OrderListItem key={orderItem.key} orderItem={orderItem} />
      ))}
    </HStack>
  </Box>
);
