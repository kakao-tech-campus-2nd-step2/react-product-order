import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { IconButton, Input, useNumberInput } from '@chakra-ui/react';

import { ProductOptions } from '@/types/productType';

import { Card } from '@/components/Card';
import { Container } from '@/components/ui/Layout/Container';
import { Text } from '@/components/ui/Text';

import { cardStyle } from './styles';

type SelectQuantityProps = {
  productOptions: ProductOptions;
  quantity: number;
  setQuantity: (newQuantity: number) => void;
};

export const SelectQuantity = ({
  productOptions,
  quantity,
  setQuantity,
}: SelectQuantityProps) => {
  const maxQuantity = productOptions.giftOrderLimit;

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: quantity,
      min: 1,
      max: maxQuantity,
      onChange: (valueAsNumber) => {
        setQuantity(Number(valueAsNumber));
      },
    });

  const dec = getDecrementButtonProps();
  const inc = getIncrementButtonProps();
  const input = getInputProps();

  return (
    <Card flexDirection="column" gap="0.5rem" css={cardStyle}>
      <Text isBold>{productOptions.productName}</Text>
      <Container flexDirection="row" gap="0.5rem">
        <IconButton
          aria-label="Decrease Quantity"
          icon={<MinusIcon />}
          {...dec}
        />
        <Input {...input} />
        <IconButton
          aria-label="Decrease Quantity"
          icon={<AddIcon />}
          {...inc}
        />
      </Container>
    </Card>
  );
};
