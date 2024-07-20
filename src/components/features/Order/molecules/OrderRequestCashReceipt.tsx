import { Box, Divider, VStack } from '@chakra-ui/react';
import type { UseFormRegister } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

import { OrderCashCheckbox } from '@/components/features/Order/atoms/OrderCashCheckbox';
import { OrderCashReceiptInput } from '@/components/features/Order/atoms/OrderCashReceiptInput';
import { OrderCashReceiptSelect } from '@/components/features/Order/atoms/OrderCashReceiptSelect';
import { useErrorToast } from '@/hooks/useErrorToast';
import type { OrderFormData } from '@/hooks/useOrderValidation';

export interface IOrderRequestCashReceipt {
  register: UseFormRegister<OrderFormData>;
}

export const OrderRequestCashReceipt = ({ register }: IOrderRequestCashReceipt) => {
  useErrorToast('receipt.number');
  const { watch } = useFormContext<OrderFormData>();
  const isCheckboxChecked = watch('receipt.checkbox');

  return (
    <Box width="100%" padding="16px">
      <VStack spacing="16px" align="start">
        <OrderCashCheckbox {...register('receipt.checkbox')} />
        <Divider />
        <OrderCashReceiptSelect {...register('receipt.type')} />
        <Divider />
        <OrderCashReceiptInput
          {...register('receipt.number', {
            required: isCheckboxChecked
              ? '현금영수증을 신청하셨다면 번호를 기입해 주셔야해요.'
              : false,
            pattern: {
              value: /^\d+$/,
              message: '현금영수증 번호는 숫자만 입력해 주세요.',
            },
          })}
        />
      </VStack>
    </Box>
  );
};
