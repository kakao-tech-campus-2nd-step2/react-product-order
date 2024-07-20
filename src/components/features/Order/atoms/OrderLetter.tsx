import { Box, Textarea } from '@chakra-ui/react';
import { memo } from 'react';
import type { UseFormRegister } from 'react-hook-form';

import { useErrorToast } from '@/hooks/useErrorToast';
import type { OrderFormData } from '@/hooks/useOrderValidation';
import { orderLetterPlaceHolder } from '@/pages/Order';

export interface IOrderLetter {
  register: UseFormRegister<OrderFormData>;
}

export const OrderLetter = memo(({ register }: IOrderLetter) => {
  useErrorToast('message');

  return (
    <Box width="100%" padding="26px 30px 30px">
      <Textarea
        placeholder={orderLetterPlaceHolder}
        {...register('message', {
          required: '카드 메세지를 입력해 주세요.',
          maxLength: { value: 100, message: '카드 메세지를 100글자 이내로 입력해 주세요.' },
        })}
      />
    </Box>
  );
});
