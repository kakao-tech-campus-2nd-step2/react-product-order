import { Box, Image, Text, VStack } from '@chakra-ui/react';
import { Fragment } from 'react';

import type { Products } from '@/api/products/types';

export interface IOrderListItem {
  orderItem: Products.PaymentThumbnail;
}

export const OrderListItem = ({ orderItem }: IOrderListItem) => {
  return (
    <Fragment>
      <Box borderWidth="1px" borderColor="rgba(0, 0, 0, 0.05)" borderRadius="4px" overflow="hidden">
        <Image src={orderItem.imageUrl} width="86px" height="86px" objectFit="cover" />
      </Box>
      <VStack align="start" spacing="3px">
        <Text fontSize="13px" color="#888" fontWeight="400">
          {orderItem.brandName}
        </Text>
        <Text fontSize="14px" color="#222" fontWeight="400">
          {orderItem.key} X {orderItem.cnt}개
        </Text>
      </VStack>
    </Fragment>
  );
};
