import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Spacing } from '@/components/common/layouts/Spacing';
import { OrderLetter } from '@/components/features/Order/OrderLetter';
import { OrderList } from '@/components/features/Order/OrderList';
import { OrderSubTitle } from '@/components/features/Order/OrderSubTitle';
import { ProductTemplate } from '@/components/templates/ProductTemplate';

const tempPlaceHolder = `선물과 함께 보낼 메시지를 적어보세요`;

export const OrderPage = () => {
  const location = useLocation();
  const [message, setMessage] = useState('');
  const { state } = location;
  const { defaultKey, cntMap } = state;
  const currentProduct = cntMap.get(defaultKey);
  console.log(message, currentProduct);
  return (
    <ProductTemplate
      leftMain={
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
            <OrderList orderList={[currentProduct]} />
          </Box>
        </Box>
      }
      rightSide={<div>right side hi</div>}
    />
  );
};
