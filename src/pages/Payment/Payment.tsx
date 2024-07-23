import { Box } from '@chakra-ui/react';
import type { UseFormReturn } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import GiftInfo from '@/components/features/Payment/GiftInfo/GiftInfo';
import PaymentInfo from '@/components/features/Payment/PaymentInfo/PaymentInfo';
import type { FormValues, goodsDetailData } from '@/types';

export const Payment = () => {
  const location = useLocation();
  const productInfo: goodsDetailData = location.state || {};
  const methods: UseFormReturn<FormValues> = useForm<FormValues>();

  return (
    <FormProvider {...methods}>
      <Box display="flex" flexDirection="row" justifyContent="center">
        <GiftInfo methods={methods} productInfo={productInfo} />
        <PaymentInfo methods={methods} productInfo={productInfo} />
      </Box>
    </FormProvider>
  );
};
