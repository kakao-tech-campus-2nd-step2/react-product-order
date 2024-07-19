import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormFieldContext } from './FormContext';

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);

  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField은 <FormField>과 함께 사용해야합니다.');
  }

  return {
    name: fieldContext.name,
    ...fieldState,
  };
};
