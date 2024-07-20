import { Box, Spacer, Text, VStack } from '@chakra-ui/react';
import { type UseFormReturn } from 'react-hook-form';

import type { FormValues } from '@/pages/ProductDetail/formSchema';
import type { ProductDetail, ProductOption } from '@/types';

import { GiftButton } from './GiftButton';
import { OptionSelector } from './OptionSelector';
import { QuantitySelector } from './QuantitySelector';
import { TotalPrice } from './TotalPrice';

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
        <OptionSelector optionsArray={optionsArray} control={control} setValue={setValue} />
        <QuantitySelector control={control} maxQuantity={maxQuantity} />
      </Box>
      <Spacer />
      <TotalPrice totalPrice={totalPrice} />
      <GiftButton product={product} productOptions={productOptions} />
    </VStack>
  );
};
