import { useProductOptions } from '@/api/hooks/useProductOptions';
import { useNavigateToOrder } from '@/pages/ProductPage/hooks/useNavigateToOrder';
import { useTotalPrice } from '@/pages/ProductPage/hooks/useTotalPrice';

import { OneTextContainer } from '@/components/OneTextContainer';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Layout/Container';

import { QuantityInput } from './QuantityInput';
import { TotalPriceCallout } from './TotalPriceCallout';
import { containerStyle } from './style';

type ProductFormProps = {
  productId: number;
};

export const ProductForm = ({ productId }: ProductFormProps) => {
  const { data, error } = useProductOptions(productId);
  const { totalPrice, quantity, updateQuantity } = useTotalPrice(productId);
  const { navigateToOrder } = useNavigateToOrder(productId, quantity);

  if (error) {
    return <OneTextContainer>{error.message}</OneTextContainer>;
  }

  return (
    <Container
      flexDirection="column"
      justifyContent="space-between"
      css={containerStyle}
    >
      <QuantityInput
        productOptions={data}
        quantity={quantity}
        setQuantity={updateQuantity}
      />
      <Container flexDirection="column" gap="1rem">
        <TotalPriceCallout totalPrice={totalPrice} />
        <Button
          theme="black"
          size="large"
          onClick={navigateToOrder}
          css={{ height: '3.5rem' }}
        >
          나에게 선물하기
        </Button>
      </Container>
    </Container>
  );
};
