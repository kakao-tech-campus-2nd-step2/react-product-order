import { Radio, RadioGroup, Text, VStack } from '@chakra-ui/react';
import { Controller, type UseFormReturn } from 'react-hook-form';

import type { FormValues } from '@/pages/ProductDetail/formSchema';
import type { ProductOption } from '@/types';

interface Props {
  optionsArray: ProductOption[];
  control: UseFormReturn<FormValues>['control'];
  setValue: UseFormReturn<FormValues>['setValue'];
}

export const OptionSelector = ({ optionsArray, control, setValue }: Props) => {
  return (
    <VStack>
      <Text fontSize="md" as="b">
        옵션 선택
      </Text>
      <Controller
        name="selectedOption"
        control={control}
        render={({ field }) => (
          <RadioGroup
            {...field}
            onChange={(val) => setValue('selectedOption', Number(val))}
            value={field.value?.toString() || ''}
          >
            {optionsArray.map((option) => (
              <Radio key={option.id} value={option.id.toString()}>
                {option.name} (+{option.additionalPrice}원)
              </Radio>
            ))}
          </RadioGroup>
        )}
      />
    </VStack>
  );
};
