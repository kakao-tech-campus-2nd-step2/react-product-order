import { Box, Divider, VStack } from '@chakra-ui/react';
import type { UseFormRegister } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

import { OrderCacheReceiptInput } from '@/components/features/Order/atoms/OrderCacheReceiptInput';
import { OrderCashReceiptSelect } from '@/components/features/Order/atoms/OrderCacheReceiptSelect';
import { OrderCacheCheckbox } from '@/components/features/Order/atoms/OrderChacheCheckbox';
import { useErrorToast } from '@/hooks/useErrorToast';
import type { OrderFormData } from '@/hooks/useOrderValidation';

export interface IOrderRequestCashReceipt {
  register: UseFormRegister<OrderFormData>;
}

export const OrderRequestCacheReceipt = ({ register }: IOrderRequestCashReceipt) => {
  useErrorToast('receipt.number');
  const { watch } = useFormContext<OrderFormData>();
  const isCheckboxChecked = watch('receipt.checkbox');

  return (
    <Box width="100%" padding="16px">
      <VStack spacing="16px" align="start">
        <OrderCacheCheckbox {...register('receipt.checkbox')} />
        <Divider />
        <OrderCashReceiptSelect {...register('receipt.type')} />
        <Divider />
        <OrderCacheReceiptInput
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
