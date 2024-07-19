import { Box, Text } from '@chakra-ui/react';
import { memo } from 'react';

import type { Products } from '@/api/products/types';
import { Spacing } from '@/components/common/layouts/Spacing';
import { OrderLetter } from '@/components/features/Order/atoms/OrderLetter';
import { OrderSubTitle } from '@/components/features/Order/atoms/OrderSubTitle';
import { OrderList } from '@/components/features/Order/molecules/OrderList';

export interface IOrderListInAView {
  setMessage: (message: string) => void;
  orderList: Products.PaymentThumbnail[];
}

const tempPlaceHolder = `선물과 함께 보낼 메시지를 적어보세요`;

export const OrderListWithMessage = memo(({ setMessage, orderList }: IOrderListInAView) => (
  <Box
    width="100%"
    padding="44px 0 32px"
    border="1px solid #e5e5e5"
    borderTop="0"
    borderBottom="0"
    height="100%"
  >
    <OrderSubTitle subtitle="나에게 주는 선물" />
    <OrderLetter setMessage={setMessage} placeholder={tempPlaceHolder} />
    <Spacing height={8} backgroundColor="#ededed" />
    <Box width="100%" padding="16px">
      <Text fontSize="lg" fontWeight="bold">
        선물내역
      </Text>
      <Box height="16px" />
      <OrderList orderList={orderList} />
    </Box>
  </Box>
));
