import { Button, HStack, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetProductOptions } from '@/api/hooks/products';

export type QuantitySelectorProps = {
  initialQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
};

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initialQuantity = 1,
  onQuantityChange,
}) => {
  const { productId } = useParams<{ productId: string }>();
  const { data } = useGetProductOptions(productId || '');
  const [quantity, setQuantity] = useState(initialQuantity);

  const giftOrderLimit = data?.giftOrderLimit || Infinity;

  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = Math.min(prevQuantity + 1, giftOrderLimit);
      if (onQuantityChange) onQuantityChange(newQuantity);
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = Math.max(prevQuantity - 1, 1);
      if (onQuantityChange) onQuantityChange(newQuantity);
      return newQuantity;
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.min(Math.max(1, Number(event.target.value)), giftOrderLimit);
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
