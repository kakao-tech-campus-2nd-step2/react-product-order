import Container from '@components/atoms/container/Container';
import { defaultBorderColor } from '@styles/colors';
import { Checkbox, Divider, Text } from '@chakra-ui/react';
import { ProductDetailData } from '@/dto';

interface ProductOrderFormProps {
  productDetails: ProductDetailData;
  count: number;
}

function ProductOrderForm({ productDetails, count }: ProductOrderFormProps) {
  return (
    <Container
      elementSize={{
        width: '100%',
        height: '100%',
      }}
      padding="16px"
      flexDirection="column"
      cssProps={{
        borderLeft: `1px solid ${defaultBorderColor}`,
      }}
    >
      <Text padding="16px 0" fontWeight="bold">
        결제 정보
      </Text>
      <Divider borderBottomColor={defaultBorderColor} borderBottomWidth="2px" />
      <Container elementSize="full-width" padding="16px">
        <Checkbox borderColor={defaultBorderColor}>
          현금영수증 신청
        </Checkbox>
      </Container>
    </Container>
  );
}

export default ProductOrderForm;
