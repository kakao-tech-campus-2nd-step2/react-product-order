import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import { z } from 'zod';

import { useProductDetail } from '@/api/hooks/useProductDetail';
import { OrderSchema } from '@/schema/index';

import { Button } from '@/components/ui/Button';
import { Divider } from '@/components/ui/Divider';
import { Container } from '@/components/ui/Layout/Container';
import { Text } from '@/components/ui/Text';

import { CashCheckForm } from './CashCheckForm';
import { buttonStyle, containerStyle } from './styles';

type PaymentSectionProps = {
  form: ReturnType<typeof useForm<z.infer<typeof OrderSchema>>>;
};

export const PaymentSection = ({ form }: PaymentSectionProps) => {
  const location = useLocation();
  const { productId, quantity } = location.state;
  const { productPrice } = useProductDetail(productId);

  const finalPrice = productPrice * quantity;

  return (
    <Container flexDirection="column" gap="1rem" css={containerStyle}>
      <Text size="lg" isBold>
        결제 정보
      </Text>
      <Divider />
      <CashCheckForm form={form} />
      <Divider />
      <Container justifyContent="space-between" alignItems="center">
        <Text isBold>최종 결제금액</Text>
        <Text size="lg" isBold>
          {finalPrice} 원
        </Text>
      </Container>
      <Divider />
      <Button size="large" type="submit" css={buttonStyle}>
        {finalPrice} 결제하기
      </Button>
    </Container>
  );
};
