import { Text, Textarea } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

import type { OrderFormData } from '@/pages/Order/OrderPage';

export const OrderForm = () => {
  const { register } = useFormContext<OrderFormData>();

  return (
    <>
      <Text fontSize="18px" fontWeight="bold">
        나에게 주는 선물
      </Text>
      <Textarea
        variant="filled"
        w="100%"
        h="100px"
        placeholder="선물과 함께 보낼 메시지를 적어주세요"
        padding="12px 16px"
        textAlign="left"
        {...register('message')}
      />
    </>
  );
};
