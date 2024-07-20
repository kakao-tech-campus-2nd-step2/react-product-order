import type { OrderFormData } from '@/pages/Order/OrderPage';

interface ValidationRule {
  isValid: (state: OrderFormData) => boolean;
  errorMessage: string;
}

const validationRules: ValidationRule[] = [
  {
    isValid: ({ message }) => message.length <= 99,
    errorMessage: '메시지는 100자 이내로 입력해주세요.',
  },
  {
    isValid: ({ message }) => message.trim() !== '',
    errorMessage: '메시지를 입력해주세요.',
  },
  {
    isValid: ({ checkedReceipt, receiptNumber }) =>
      !checkedReceipt || /^[0-9]+$/.test(receiptNumber.trim()),
    errorMessage: '현금영수증 번호에는 숫자만 입력해주세요.',
  },
  {
    isValid: ({ checkedReceipt, receiptNumber }) => !checkedReceipt || receiptNumber.trim() !== '',
    errorMessage: '현금영수증 번호를 입력해주세요.',
  },
];

export const useOrderValidation = () => {
  const validateOrder = (state: OrderFormData): string | null => {
    for (const rule of validationRules) {
      if (!rule.isValid(state)) {
        return rule.errorMessage;
      }
    }
    return null;
  };

  return validateOrder;
};
