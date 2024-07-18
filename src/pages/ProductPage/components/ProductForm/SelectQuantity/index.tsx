import { useRef } from 'react';

import { ProductOptions } from '@/types/productType';

import { Card } from '@/components/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input/Default';
import { Container } from '@/components/ui/Layout/Container';
import { Text } from '@/components/ui/Text';

import { buttonStyle, cardStyle } from './styles';

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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDecreaseButton = () => {
    if (inputRef.current) {
      const updateQuantity = Math.max(1, quantity - 1);
      setQuantity(updateQuantity);
      inputRef.current.value = String(updateQuantity);
    }
  };

  const handleIncreaseButton = () => {
    if (inputRef.current) {
      const updateQuantity = Math.min(maxQuantity, quantity + 1);
      setQuantity(updateQuantity);
      inputRef.current.value = String(updateQuantity);
    }
  };

  const handleInputBlur = () => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      const validateValue = Math.max(
        1,
        Math.min(Number(inputValue), maxQuantity)
      );
      setQuantity(validateValue);
      inputRef.current.value = String(validateValue);
    }
  };

  return (
    <Card flexDirection="column" gap="0.5rem" css={cardStyle}>
      <Text isBold>{productOptions.productName}</Text>
      <Container flexDirection="row" gap="0.5rem">
        <Button
          theme="lightGray"
          size="medium"
          onClick={handleDecreaseButton}
          disabled={quantity <= 1}
          css={buttonStyle}
        >
          -
        </Button>
        <Input
          name="quantity"
          type="number"
          defaultValue={String(quantity)}
          ref={inputRef}
          onBlur={handleInputBlur}
        />
        <Button
          theme="lightGray"
          size="medium"
          onClick={handleIncreaseButton}
          disabled={quantity >= maxQuantity}
          css={buttonStyle}
        >
          +
        </Button>
      </Container>
    </Card>
  );
};
