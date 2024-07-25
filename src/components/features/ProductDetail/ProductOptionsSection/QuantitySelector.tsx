import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Input } from '@chakra-ui/react';
import { Controller, type UseFormReturn } from 'react-hook-form';

import type { FormValues } from '@/pages/ProductDetail/formSchema';

interface Props {
  control: UseFormReturn<FormValues>['control'];
  maxQuantity: number;
}

export const QuantitySelector = ({ control, maxQuantity }: Props) => {
  return (
    <HStack mt={2}>
      <Controller
        name="quantity"
        control={control}
        render={({ field }) => (
          <>
            <IconButton
              aria-label="Decrease quantity"
              icon={<MinusIcon />}
              onClick={() => field.onChange(Math.max(1, field.value - 1))}
            />
            <Input
              {...field}
              type="number"
              value={field.value}
              onChange={(e) =>
                field.onChange(Math.min(maxQuantity, Math.max(1, Number(e.target.value))))
              }
              width="100%"
            />
            <IconButton
              aria-label="Increase quantity"
              icon={<AddIcon />}
              onClick={() => field.onChange(Math.min(maxQuantity, field.value + 1))}
            />
          </>
        )}
      />
    </HStack>
  );
};
