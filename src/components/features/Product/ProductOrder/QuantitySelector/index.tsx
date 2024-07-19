import React from 'react';
import { Input, Button, useNumberInput, HStack } from '@chakra-ui/react';

interface QuantitySelectorProps {
  giftOrderLimit?: number;
}

export default function QuantitySelector({ giftOrderLimit }: QuantitySelectorProps) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: giftOrderLimit,
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack maxW="320px">
      <Button {...dec}>-</Button>
      <Input {...input} />
      <Button {...inc}>+</Button>
    </HStack>
  );
}
