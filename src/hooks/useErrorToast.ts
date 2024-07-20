import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import type { FieldError, FieldErrors } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';

import type { OrderFormData } from '@/hooks/useOrderValidation';

export const useErrorToast = (
  fieldName: keyof OrderFormData | `receipt.${keyof OrderFormData['receipt']}`,
) => {
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
  fieldName: keyof OrderFormData | `receipt.${keyof OrderFormData['receipt']}`,
): FieldError | undefined => {
  if (fieldName.startsWith('receipt.')) {
    const receiptErrors = errors.receipt as FieldErrors<OrderFormData['receipt']>;

    return receiptErrors?.[fieldName.split('.')[1] as keyof OrderFormData['receipt']] as FieldError;
  }

  return errors[fieldName as keyof OrderFormData] as FieldError;
};
