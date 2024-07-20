import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { z, ZodIssueCode } from 'zod';

export const validationMessages = {
  messageRequired: '메시지를 입력해주세요.',
  messageMaxLength: '메시지는 100자 이내로 입력해주세요.',
  receiptNumberRequired: '현금영수증 번호를 입력해주세요.',
  receiptNumberDigitsOnly: '현금영수증 번호는 숫자로만 입력해주세요.',
};

export const schema = z
  .object({
    message: z
      .string()
      .min(1, validationMessages.messageRequired)
      .max(100, validationMessages.messageMaxLength),
    cashReceipt: z.boolean(),
    receiptType: z.string().optional(),
    receiptNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.cashReceipt && !data.receiptNumber) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        path: ['receiptNumber'],
        message: validationMessages.receiptNumberRequired,
      });
    } else if (data.receiptNumber && !/^\d+$/.test(data.receiptNumber)) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        path: ['receiptNumber'],
        message: validationMessages.receiptNumberDigitsOnly,
      });
    }
  });

export type FormValues = z.infer<typeof schema>;

export const useOrderForm = (): UseFormReturn<FormValues> => {
  return useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      message: '',
      cashReceipt: false,
      receiptType: '',
      receiptNumber: '',
    },
  });
};
