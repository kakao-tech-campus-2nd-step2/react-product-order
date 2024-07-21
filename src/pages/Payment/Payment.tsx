import { Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

import GiftInfo from '@/components/features/Payment/GiftInfo/GiftInfo';
import PaymentInfo from '@/components/features/Payment/PaymentInfo/PaymentInfo';
import type { goodsDetailData } from '@/types';

export const Payment = () => {
  const location = useLocation();
  const productInfo: goodsDetailData = location.state || {};

  return (
    <Box display="flex" flexDirection="row" justifyContent="center">
      <GiftInfo productInfo={productInfo} />
      <PaymentInfo productInfo={productInfo} />
    </Box>
  );
};
