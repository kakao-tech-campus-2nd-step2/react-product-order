import { Button, HStack, Input } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';

export type QuantitySelectorProps = {
  initialQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
};

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initialQuantity = 1,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      if (onQuantityChange) onQuantityChange(newQuantity);
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity - 1;
      if (onQuantityChange) onQuantityChange(newQuantity);
      return newQuantity;
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(1, Number(event.target.value));
    setQuantity(newQuantity);
    if (onQuantityChange) onQuantityChange(newQuantity);
  };

  return (
    <HStack>
      <Button onClick={handleDecrement}>-</Button>
      <Input
        type="number"
        value={quantity}
        onChange={handleChange}
        width="60px"
        textAlign="center"
      />
      <Button onClick={handleIncrement}>+</Button>
    </HStack>
  );
};
