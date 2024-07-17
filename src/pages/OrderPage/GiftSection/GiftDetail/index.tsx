import { useOrder } from '@/provider/order/useOrder';

import { Card } from '@/components/Card';
import { Image } from '@/components/ui/Image/Default';
import { Container } from '@/components/ui/Layout/Container';
import { Text } from '@/components/ui/Text';

import { cardStyle, containerStyle, subtitleStyle } from './styles';

export const GiftDetail = () => {
  const { orderDetail } = useOrder();
  const productDetail = orderDetail.productDetail;

  return (
    <Container flexDirection="column" gap="1rem" css={containerStyle}>
      <Text isBold>선물내역</Text>
      <Card gap="0.5rem" css={cardStyle}>
        <Image
          src={productDetail.imageURL}
          ratio="square"
          width="7rem"
          radius={0.2}
        />
        <Container flexDirection="column">
          <Text size="sm" css={subtitleStyle}>
            {productDetail.brandName}
          </Text>
          <Text size="sm">{productDetail.productName}</Text>
        </Container>
      </Card>
    </Container>
  );
};
