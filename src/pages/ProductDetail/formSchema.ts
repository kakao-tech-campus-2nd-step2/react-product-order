import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

export const schema = z.object({
  selectedOption: z.number().nullable(),
  quantity: z
    .number()
    .min(1, '최소 수량은 1입니다.')
    .max(100, '최대 수량을 초과했습니다.')
    .refine((val) => val > 0, '수량은 0보다 커야 합니다.'),
});

export type FormValues = z.infer<typeof schema>;

export const useProductDetailForm = (): UseFormReturn<FormValues> => {
  return useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      selectedOption: null,
      quantity: 1,
    },
  });
};
