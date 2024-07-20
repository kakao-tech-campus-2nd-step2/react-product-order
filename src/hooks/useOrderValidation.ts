import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import type { IOrderItemInfo } from '@/hooks/useProductPreReceipt';

export interface OrderFormData {
  message: string;
  receipt: {
    checkbox: boolean;
    number: string;
    type: string;
  };
}

export const useOrderValidation = (orderListAndPrice: IOrderItemInfo[]) => {
  const methods = useForm<OrderFormData>({
    defaultValues: {
      message: '',
      receipt: {
        checkbox: false,
        number: '',
      },
    },
  });

  const onSubmit: SubmitHandler<OrderFormData> = (data) => {
    if (isFormDataInvalid(data)) {
      return;
    }

    alert('주문이 완료되었습니다.');
    console.log(orderListAndPrice);
  };

  return { onSubmit, ...methods };
};

const isFormDataInvalid = (data: OrderFormData) => {
  const { message, receipt } = data;
  const { checkbox: isChecked, number: receiptNumber } = receipt;

  if (isCardMessageInvalid(message)) return;

  if (isCashReceiptInvalid(isChecked, receiptNumber)) return;

  return false;
};

const isCardMessageInvalid = (message: string) => {
  if (message.length === 0) {
    return true;
  }
  if (message.length > 100) {
    return true;
  }
  return false;
};

const isCashReceiptInvalid = (isChecked: boolean, receiptNumber: string) => {
  if (!isChecked) return false;

  if (!receiptNumber) {
    return true;
  }
  if (!/^\d+$/.test(receiptNumber)) {
    return true;
  }

  return false;
};
