import { Box, Textarea, useToast } from '@chakra-ui/react';
import { memo, useEffect } from 'react';
import type { UseFormRegister } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

import type { OrderFormData } from '@/hooks/useOrderValidation';
import { orderLetterPlaceHolder } from '@/pages/Order';

export interface IOrderLetter {
  register: UseFormRegister<OrderFormData>;
}

export const OrderLetter = memo(({ register }: IOrderLetter) => {
  const { formState } = useFormContext<OrderFormData>();
  const toast = useToast();

  useEffect(() => {
    if (formState.errors.message) {
      toast({
        title: formState.errors.message.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
    }
  }, [formState.errors.message, toast]);

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
