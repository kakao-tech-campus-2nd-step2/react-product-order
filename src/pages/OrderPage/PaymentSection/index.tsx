import { useOrder } from '@/provider/order/useOrder';

import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Container } from '@/components/ui/Layout/Container';
import { Text } from '@/components/ui/Text';

import { CashCheckForm } from './CashCheckForm';
import { FinalPrice } from './FinalPrice';
import { buttonStyle, containerStyle } from './styles';

export const PaymentSection = () => {
  const { orderDetail } = useOrder();

  return (
    <Container flexDirection="column" gap="1rem" css={containerStyle}>
      <Text size="lg" isBold>
        결제 정보
      </Text>
      <Divider />
      <CashCheckForm />
      <Divider />
      <FinalPrice />
      <Divider />
      <Button size="large" css={buttonStyle}>
        {orderDetail.finalPrice} 결제하기
      </Button>
    </Container>
  );
};
