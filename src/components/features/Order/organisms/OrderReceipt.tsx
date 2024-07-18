import { Box, Divider, VStack } from '@chakra-ui/react';

import { Button } from '@/components/common/Button';
import { OrderSubTitle } from '@/components/features/Order/atoms/OrderSubTitle';
import type { IOrderPrice } from '@/components/features/Order/molecules/OrderPrice';
import { OrderPrice } from '@/components/features/Order/molecules/OrderPrice';
import { OrderRequestCashReceipt } from '@/components/features/Order/molecules/OrderRequestCashReceipt';

export interface IOrderReceipt extends IOrderPrice {}

export const OrderReceipt = ({ totalPrice }: IOrderReceipt) => (
  <Box
    width="100%"
    height="100%"
    borderLeft="1px solid #ededed"
    borderRight="1px solid #ededed"
    padding="16px"
  >
    <VStack spacing="24px">
      <OrderSubTitle subtitle="결제 정보" textAlign="left" />
      <Divider borderColor="#ededed" />
      <OrderRequestCashReceipt />
      <Divider borderColor="#ededed" />
      <OrderPrice totalPrice={totalPrice} />
      <Divider borderColor="#ededed" />
      <Box height="32px" />
      <Button>{totalPrice}원 결제하기</Button>
    </VStack>
  </Box>
);
