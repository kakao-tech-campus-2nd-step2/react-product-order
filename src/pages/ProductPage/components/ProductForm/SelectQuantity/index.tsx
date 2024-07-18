import { ChangeEvent } from 'react';

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
  const limitQuantity = productOptions.giftOrderLimit;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    const valueToNumber = Number(inputValue.match(/\d+/g));
    setQuantity(valueToNumber);
  };

  const handleInputBlur = (value: string) => {
    if (Number(value) > limitQuantity) {
      setQuantity(100);
      return;
    }

    setQuantity(Number(value));
  };

  return (
    <Card flexDirection="column" gap="0.5rem" css={cardStyle}>
      <Text isBold>{productOptions.productName}</Text>
      <Container flexDirection="row" gap="0.5rem">
        <Button
          theme="lightGray"
          size="medium"
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity <= 1}
          css={buttonStyle}
        >
          -
        </Button>
        <Input
          name="quantity"
          value={String(quantity)}
          onChange={handleInputChange}
          onBlur={(e) => handleInputBlur(e.target.value)}
        />
        <Button
          theme="lightGray"
          size="medium"
          onClick={() => setQuantity(quantity + 1)}
          disabled={quantity >= limitQuantity}
          css={buttonStyle}
        >
          +
        </Button>
      </Container>
    </Card>
  );
};
