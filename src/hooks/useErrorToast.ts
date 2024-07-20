import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import type { FieldError, FieldErrors } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

import type { OrderFormData } from '@/hooks/useOrderValidation';

/**
 * interface OrderFormData {
 *   message: string;
 *   receipt: {
 *     checkbox: boolean;
 *     number: string;
 *     type: string;
 *   };
 * }
 */
type OrderFormFieldReceipt = OrderFormData['receipt'];
type OrderFormFields = keyof OrderFormData | `receipt.${keyof OrderFormFieldReceipt}`;

export const useErrorToast = (fieldName: OrderFormFields) => {
  const { formState } = useFormContext<OrderFormData>();
  const toast = useToast();

  useEffect(() => {
    const errorField = getErrorField(formState.errors, fieldName);

    if (errorField?.message) {
      toast({
        title: errorField.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
    }
  }, [formState, fieldName, toast]);
};

const getErrorField = (
  errors: FieldErrors<OrderFormData>,
  fieldName: OrderFormFields,
): FieldError | undefined => {
  if (fieldName.startsWith('receipt.')) {
    const receiptErrors = errors.receipt as FieldErrors<OrderFormFieldReceipt>;

    return receiptErrors?.[fieldName.split('.')[1] as keyof OrderFormFieldReceipt] as FieldError;
  }

  return errors[fieldName as keyof OrderFormData] as FieldError;
};
