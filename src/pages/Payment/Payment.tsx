import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import GiftInfo from '@/components/features/Payment/GiftInfo/GiftInfo';
import PaymentInfo from '@/components/features/Payment/PaymentInfo/PaymentInfo';
import type { goodsDetailData } from '@/types';

export const Payment = () => {
  const [message, setMessage] = useState<string>('');
  const location = useLocation();
  const productInfo: goodsDetailData = location.state || {};

  return (
    <Box display="flex" flexDirection="row" justifyContent="center">
      <GiftInfo message={message} setMessage={setMessage} productInfo={productInfo} />
      <PaymentInfo message={message} setMessage={setMessage} productInfo={productInfo} />
    </Box>
  );
};
