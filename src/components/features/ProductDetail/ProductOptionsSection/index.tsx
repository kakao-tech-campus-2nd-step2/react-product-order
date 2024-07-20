import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  IconButton,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Controller, type UseFormReturn } from 'react-hook-form';

import type { FormValues } from '@/pages/ProductDetail/formSchema';
import type { ProductDetail, ProductOption } from '@/types';

import { GiftButton } from './GiftButton';

interface Props {
  product: ProductDetail;
  productOptions: ProductOption[];
  formMethods: UseFormReturn<FormValues>;
}

export const ProductOptionsSection = ({ product, productOptions = [], formMethods }: Props) => {
  const { control, watch, setValue } = formMethods;

  const selectedOption = watch('selectedOption');
  const quantity = watch('quantity');
  const optionsArray = Array.isArray(productOptions) ? productOptions : [];
  const selectedProductOption = optionsArray.find((option) => option.id === selectedOption);
  const maxQuantity = selectedProductOption?.giftOrderLimit || 100;

  const totalPrice =
    product.price.sellingPrice * quantity +
    (selectedOption
      ? optionsArray.find((option) => option.id === selectedOption)?.additionalPrice || 0
      : 0);

  return (
    <VStack>
      <Box border="1px" borderColor="blackAlpha.100" p={4}>
        <Text fontSize="md" as="b">
          {product.name}
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
      </Box>
      <Spacer />
      <Box
        bg="blackAlpha.50"
        p={4}
        my={4}
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="sm" as="b">
          총 결제 금액
        </Text>
        <Text fontSize="xl" as="b">
          {totalPrice}원
        </Text>
      </Box>
      <GiftButton product={product} productOptions={productOptions} />
    </VStack>
  );
};
