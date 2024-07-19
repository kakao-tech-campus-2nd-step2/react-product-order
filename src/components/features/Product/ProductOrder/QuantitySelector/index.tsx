import React, { useEffect } from 'react';
import { Input, Button, useNumberInput, HStack } from '@chakra-ui/react';

interface QuantitySelectorProps {
  giftOrderLimit?: number;
  onSetCount: (value: number) => void;
}

export default function QuantitySelector({ giftOrderLimit, onSetCount }: QuantitySelectorProps) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: giftOrderLimit,
  });
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  useEffect(() => {
    onSetCount(Number(input.value));
  }, [input.value, onSetCount]);

  return (
    <HStack maxW="320px">
      <Button {...dec}>-</Button>
      <Input {...input} />
      <Button {...inc}>+</Button>
    </HStack>
  );
}
